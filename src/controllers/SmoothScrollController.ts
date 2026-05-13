export class SmoothScrollController {
  private y       = 0
  private targetY = 0
  private readonly ease = 0.085
  private active  = false

  init(): void {
    this.y = this.targetY = window.scrollY

    // Touch devices get native scroll — don't intercept
    if (window.matchMedia('(pointer: coarse)').matches) return
    this.active = true

    let snapTimer = 0
    const sections = (): number[] =>
      Array.from(document.querySelectorAll('.hero-section, .section'))
        .map(el => (el as HTMLElement).offsetTop)
        .sort((a, b) => a - b)

    window.addEventListener('wheel', (e) => {
      e.preventDefault()
      clearTimeout(snapTimer)
      this.targetY = this.clamp(this.targetY + e.deltaY)

      // After wheel stops, snap to nearest section start
      snapTimer = window.setTimeout(() => {
        const closest = sections().reduce((prev, cur) =>
          Math.abs(cur - this.targetY) < Math.abs(prev - this.targetY) ? cur : prev
        )
        if (Math.abs(closest - this.targetY) < window.innerHeight * 0.45) {
          this.targetY = this.clamp(closest)
        }
      }, 120)
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
    this.targetY = this.clamp((el as HTMLElement).offsetTop)
    if (!this.active) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  private clamp(y: number): number {
    return Math.max(0, Math.min(y, document.documentElement.scrollHeight - window.innerHeight))
  }
}
