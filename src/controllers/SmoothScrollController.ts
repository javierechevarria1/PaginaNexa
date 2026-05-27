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
      }, 350)
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

    const t     = this.targetY
    const vh    = window.innerHeight
    const maxY  = document.documentElement.scrollHeight - vh

    // Si el usuario scrolleó hacia abajo y está a menos de medio viewport del final,
    // dejarlo llegar al fondo sin snap (footer, etc.)
    if (dir > 0 && t > maxY - vh * 0.5) {
      this.targetY = maxY
      return
    }

    // Section whose top is at-or-before targetY
    let above = tops[0]
    for (const top of tops) if (top <= t + 4) above = top

    // First section strictly after targetY
    const below = tops.find(top => top > t + 4) ?? above

    const pastAbove    = t - above          // how far past "above" start
    const beforeBelow  = below - t          // how far before "below" start
    const sectionH     = below - above      // approximate height of current section

    // Forward snap threshold:
    // – If section fits in the viewport → snap after scrolling 70 % of viewport
    // – If section is TALLER than viewport → must be near the bottom
    const fwdThreshold = sectionH > vh
      ? sectionH - vh * 0.4                  // tall section: close to its bottom
      : Math.max(sectionH * 0.7, vh * 0.6)   // normal section: need 70% seen

    // Backward snap threshold = 60 % of viewport (less eager to go back)
    const bwdThreshold = vh * 0.6

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
