import { BaseView } from '../BaseView'

const SOCIAL = [
  { label: 'Twitter',   path: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>' },
  { label: 'LinkedIn',  path: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>' },
  { label: 'Instagram', path: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>' },
]

const COL1 = [
  { l: 'Características', h: '#solucion' }, { l: 'Cómo funciona', h: '#como-funciona' },
  { l: 'Beneficios', h: '#beneficios' },    { l: 'Precios', h: '#plan' },
]
const COL2 = [
  { l: 'Valores', h: '#valores' },   { l: 'Impacto social', h: '#impacto' },
  { l: 'Ecosistema', h: '#ecosistema' }, { l: 'Contacto', h: '#contacto' },
]
const LEGAL = ['Política de Privacidad', 'Términos de Uso', 'Cookies', 'Aviso Legal']

export class FooterView extends BaseView {
  render(): HTMLElement {
    const footer = this.el('footer', 'footer')

    footer.innerHTML = `
      <div class="footer-top-line"></div>
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="#inicio" class="footer-logo" data-nav>
              <div class="footer-logo-icon">N</div>
              NEXA
            </a>
            <p class="footer-tagline"><span class="gradient-text" style="font-weight:600">Conectar, cuidar y acompañar.</span><br/>La smartband que combate la soledad y mejora el bienestar de las personas mayores con IA, IoT y voz inteligente.</p>
            <div class="footer-social">
              ${SOCIAL.map(s => `
                <a href="#" class="social-link" aria-label="${s.label}">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">${s.path}</svg>
                </a>
              `).join('')}
            </div>
          </div>
          <div class="footer-col">
            <h4>Producto</h4>
            <div class="footer-links">
              ${COL1.map(l => `<a href="${l.h}" class="footer-link" data-nav>${l.l}</a>`).join('')}
            </div>
          </div>
          <div class="footer-col">
            <h4>Empresa</h4>
            <div class="footer-links">
              ${COL2.map(l => `<a href="${l.h}" class="footer-link" data-nav>${l.l}</a>`).join('')}
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copy">© 2025 NEXA Technology S.L. Todos los derechos reservados.</p>
          <div class="footer-legal">
            ${LEGAL.map(l => `<a href="#">${l}</a>`).join('')}
          </div>
        </div>
      </div>
    `

    this.container = footer
    return footer
  }

  getNavLinks(): NodeListOf<HTMLAnchorElement> {
    return this.container.querySelectorAll('[data-nav]')
  }
}
