import { AppModel } from '../models/AppModel'
import { HeaderView } from '../views/layout/HeaderView'
import { FooterView } from '../views/layout/FooterView'
import { SmoothScrollController } from './SmoothScrollController'

export class NavigationController {
  constructor(
    private model: AppModel,
    private headerView: HeaderView,
    private footerView: FooterView,
    private smoothScroll: SmoothScrollController,
  ) {}

  init(): void {
    this.bindScroll()
    this.bindBurger()
    this.bindNavLinks(this.headerView.getNavLinks())
    this.bindNavLinks(this.footerView.getNavLinks())
    this.bindModelEvents()
  }

  private bindScroll(): void {
    window.addEventListener('scroll', () => {
      this.model.setScrolled(window.scrollY > 20)
    }, { passive: true })
  }

  private bindBurger(): void {
    this.headerView.getBurger().addEventListener('click', () => {
      this.model.toggleMenu()
    })
  }

  private bindNavLinks(links: NodeListOf<HTMLAnchorElement>): void {
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault()
        const href = link.getAttribute('href')
        if (href?.startsWith('#')) {
          const el = document.querySelector(href)
          if (el) this.smoothScroll.scrollToEl(el)
          this.model.closeMenu()
        }
      })
    })
  }

  private bindModelEvents(): void {
    this.model.on('scroll', () => {
      this.headerView.setScrolled(this.model.state.isScrolled)
    })
    this.model.on('menu', () => {
      this.headerView.setMenuOpen(this.model.state.menuOpen)
    })
  }
}
