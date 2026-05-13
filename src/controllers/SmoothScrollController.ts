export class SmoothScrollController {
  private y       = 0
  private targetY = 0
  private readonly ease = 0.085
  private active  = false

  init(): void {
    this.y = this.targetY = window.scrollY

    // Touch devices use native scroll
    if (window.matchMedia('(pointer: coarse)').matches) return
    this.active = true

    let snapTimer  = 0
    let lastDeltaY = 0

    const sectionTops = (): number[] =>
      Array.from(document.querySelectorAll<HTMLElement>('.hero-section, .section'))
        .map(el => Math.round(el.getBoundingClientRect().top + this.y))
        .sort((a, b) => a - b)

    window.addEventListener('wheel', (e) => {
      e.preventDefault()
      clearTimeout(snapTimer)
      lastDeltaY = e.deltaY
      this.targetY = this.clamp(this.targetY + e.deltaY)

      // After wheel stops, snap toward the section we're most aligned with
      snapTimer = window.setTimeout(() => {
        const tops = sectionTops()
        const vh   = window.innerHeight

        // Find the last section start at or before current scroll
        let idx = 0
        for (let i = 0; i < tops.length; i++) {
          if (tops[i] <= this.targetY + 4) idx = i
        }

        const curTop  = tops[idx]
        const nextTop = tops[idx + 1] ?? curTop
        const progress = (this.targetY - curTop) / vh   // 0 = at section start

        if (lastDeltaY > 0 && progress > 0.38 && nextTop !== curTop) {
          // Scrolled enough down into next section → snap forward
          this.targetY = this.clamp(nextTop)
        } else {
          // Not enough scroll or going up → snap to current section start
          this.targetY = this.clamp(curTop)
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

  // getBoundingClientRect().top + this.y = absolute document position, always correct
  scrollToEl(el: Element): void {
    const absTop = el.getBoundingClientRect().top + this.y
    this.targetY = this.clamp(absTop)
    if (!this.active) el.scrollIntoView({ behavior: 'smooth' })
  }

  private clamp(y: number): number {
    return Math.max(0, Math.min(y, document.documentElement.scrollHeight - window.innerHeight))
  }
}
