export class SmoothScrollController {
  private y       = 0
  private targetY = 0
  private readonly ease = 0.085
  private active  = false
  private tops:   number[] = []

  init(): void {
    this.y = this.targetY = window.scrollY
    if (window.matchMedia('(pointer: coarse)').matches) return

    this.active = true
    // Disable CSS smooth-scroll so it doesn't double-animate our JS scroll
    document.documentElement.style.scrollBehavior = 'auto'

    // Calculate section positions once and on resize
    this.calcTops()
    window.addEventListener('resize', () => this.calcTops(), { passive: true })

    let snapTimer = 0
    let netDelta  = 0   // accumulate direction over a burst of wheel events

    window.addEventListener('wheel', (e) => {
      e.preventDefault()
      clearTimeout(snapTimer)
      netDelta       += e.deltaY
      this.targetY    = this.clamp(this.targetY + e.deltaY)

      snapTimer = window.setTimeout(() => {
        const dir = netDelta >= 0 ? 1 : -1
        netDelta  = 0
        this.snap(dir)
      }, 150)
    }, { passive: false })

    const loop = () => {
      const diff = this.targetY - this.y
      if (Math.abs(diff) > 0.1) {
        this.y += diff * this.ease
        window.scrollTo(0, this.y)
      }
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
  }

  scrollToEl(el: Element): void {
    // Use absTop (layout-based, not affected by CSS transforms) for accuracy
    this.targetY = this.clamp(this.absTop(el as HTMLElement))
    if (!this.active) el.scrollIntoView({ behavior: 'smooth' })
  }

  // ── private ──────────────────────────────────────────────────────────────

  private snap(dir: number): void {
    const tops = this.tops
    if (!tops.length) return

    const t  = this.targetY
    const vh = window.innerHeight

    // Section directly at-or-above targetY
    let above = tops[0]
    for (const top of tops) if (top <= t + 4) above = top

    // First section strictly below targetY
    const below = tops.find(top => top > t + 4) ?? above

    const pastAbove  = t - above   // how far we've gone past the "above" section (≥ 0)
    const beforeBelow = below - t  // how far we still are before "below" section (≥ 0)

    if (dir > 0) {
      // Scrolling DOWN: advance if we've crossed 38 % of viewport, else snap back
      this.targetY = this.clamp(pastAbove > vh * 0.38 ? below : above)
    } else {
      // Scrolling UP: return to "below" unless we've pulled back > 38 % of viewport
      this.targetY = this.clamp(beforeBelow > vh * 0.38 ? above : below)
    }
  }

  private calcTops(): void {
    this.tops = Array.from(
      document.querySelectorAll<HTMLElement>('.hero-section, .section')
    ).map(el => this.absTop(el)).sort((a, b) => a - b)
  }

  // Walk the offsetParent chain for a layout-accurate absolute top (ignores transforms)
  private absTop(el: HTMLElement): number {
    let top = 0
    let cur: HTMLElement | null = el
    while (cur) {
      top += cur.offsetTop
      cur  = cur.offsetParent as HTMLElement | null
    }
    return top
  }

  private clamp(y: number): number {
    return Math.max(0, Math.min(y, document.documentElement.scrollHeight - window.innerHeight))
  }
}
