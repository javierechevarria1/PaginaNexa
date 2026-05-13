export class ScrollRevealController {
  private observer: IntersectionObserver

  constructor() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            this.observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' },
    )
  }

  observe(): void {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
      .forEach(el => this.observer.observe(el))
  }
}
