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
    document.documentElement.style.scrollBehavior = 'auto'

    this.calcTops()
    window.addEventListener('resize', () => this.calcTops(), { passive: true })

    let snapTimer = 0
    let netDelta  = 0

    window.addEventListener('wheel', (e) => {
      e.preventDefault()
      clearTimeout(snapTimer)
      netDelta     += e.deltaY
      this.targetY  = this.clamp(this.targetY + e.deltaY)

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
    this.targetY = this.clamp(this.absTop(el as HTMLElement))
    if (!this.active) el.scrollIntoView({ behavior: 'smooth' })
  }

  // ── private ──────────────────────────────────────────────────────────────

  private snap(dir: number): void {
    const tops = this.tops
    if (!tops.length) return

    const t  = this.targetY
    const vh = window.innerHeight

    // Section whose top is at-or-before targetY
    let above = tops[0]
    for (const top of tops) if (top <= t + 4) above = top

    // First section strictly after targetY
    const below = tops.find(top => top > t + 4) ?? above

    const pastAbove    = t - above          // how far past "above" start
    const beforeBelow  = below - t          // how far before "below" start
    const sectionH     = below - above      // approximate height of current section

    // Forward snap threshold = 60 % of the section's own height.
    // This guarantees the user has seen the ENTIRE section before snapping forward,
    // regardless of whether the section is taller or shorter than the viewport.
    const fwdThreshold = Math.max(sectionH * 0.6, vh * 0.45)

    // Backward snap threshold = 50 % of viewport
    const bwdThreshold = vh * 0.5

    if (dir > 0) {
      this.targetY = this.clamp(pastAbove > fwdThreshold ? below : above)
    } else {
      this.targetY = this.clamp(beforeBelow > bwdThreshold ? above : below)
    }
  }

  private calcTops(): void {
    this.tops = Array.from(
      document.querySelectorAll<HTMLElement>('.hero-section, .section')
    ).map(el => this.absTop(el)).sort((a, b) => a - b)
  }

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
