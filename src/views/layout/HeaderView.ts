import { BaseView } from '../BaseView'

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Producto', href: '#solucion' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Planes', href: '#plan' },
  { label: 'Contacto', href: '#contacto' },
]

export class HeaderView extends BaseView {
  private burger!: HTMLButtonElement
  private mobileNav!: HTMLElement
  private navEl!: HTMLElement

  render(): HTMLElement {
    const header = this.el('header', 'nav-header')

    header.innerHTML = `
      <div class="nav-inner">
        <a href="#inicio" class="nav-logo" data-nav>
          <div class="nav-logo-icon">N</div>
          NEXA
        </a>
        <nav class="nav-links">
          ${NAV_LINKS.map(l => `<a href="${l.href}" class="nav-link" data-nav>${l.label}</a>`).join('')}
        </nav>
        <a href="#activar" class="nav-cta" data-nav>Ya tengo mi pulsera</a>
        <button class="nav-burger" id="nav-burger" aria-label="Menú">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-mobile" id="nav-mobile">
        <div class="nav-mobile-inner">
          ${NAV_LINKS.map(l => `<a href="${l.href}" class="nav-link" data-nav>${l.label}</a>`).join('')}
          <a href="#activar" class="nav-cta" data-nav>Ya tengo mi pulsera</a>
        </div>
      </div>
    `

    this.navEl = header
    this.burger = header.querySelector('#nav-burger')!
    this.mobileNav = header.querySelector('#nav-mobile')!
    this.container = header
    return header
  }

  setScrolled(scrolled: boolean): void {
    this.navEl.classList.toggle('scrolled', scrolled)
  }

  setMenuOpen(open: boolean): void {
    this.burger.classList.toggle('open', open)
    this.mobileNav.classList.toggle('open', open)
  }

  getBurger(): HTMLButtonElement { return this.burger }
  getNavLinks(): NodeListOf<HTMLAnchorElement> {
    return this.container.querySelectorAll('[data-nav]')
  }
}
