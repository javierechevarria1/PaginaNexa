export abstract class BaseView {
  protected container!: HTMLElement

  abstract render(): HTMLElement

  protected el<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    className?: string,
  ): HTMLElementTagNameMap[K] {
    const el = document.createElement(tag)
    if (className) el.className = className
    return el
  }

  protected html<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    markup: string,
    className?: string,
  ): HTMLElementTagNameMap[K] {
    const el = document.createElement(tag)
    if (className) el.className = className
    el.innerHTML = markup
    return el
  }

  protected svgIcon(path: string, size = 24): SVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', String(size))
    svg.setAttribute('height', String(size))
    svg.setAttribute('viewBox', `0 0 24 24`)
    svg.setAttribute('fill', 'none')
    svg.setAttribute('stroke', 'currentColor')
    svg.setAttribute('stroke-width', '1.5')
    svg.setAttribute('stroke-linecap', 'round')
    svg.setAttribute('stroke-linejoin', 'round')
    svg.innerHTML = path
    return svg
  }

  getContainer(): HTMLElement {
    return this.container
  }
}
