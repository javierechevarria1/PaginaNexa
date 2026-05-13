export class CounterController {
  private observer: IntersectionObserver

  constructor() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const target = parseFloat(el.dataset['counter'] ?? '0')
            const suffix = el.dataset['suffix'] ?? ''
            this.animate(el, target, suffix)
            this.observer.unobserve(el)
          }
        })
      },
      { threshold: 0.5 },
    )
  }

  observe(): void {
    document.querySelectorAll('[data-counter]')
      .forEach(el => this.observer.observe(el))
  }

  private animate(el: HTMLElement, target: number, suffix: string): void {
    const duration = 1800
    const start    = Date.now()
    const tick = (): void => {
      const elapsed  = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const ease     = 1 - Math.pow(1 - progress, 3)
      const value    = target * ease
      el.textContent = (Number.isInteger(target) ? Math.round(value) : parseFloat(value.toFixed(1))) + suffix
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }
}
