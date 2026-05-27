import { BaseView } from '../BaseView'

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/javier-echevarría-traspuesto-ab3755258',
    path: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/javierechevarria1',
    path: '<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>',
  },
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
              <img src="images/LogoNexa.png" alt="NEXA" class="footer-logo-img" />
            </a>
            <p class="footer-tagline"><span class="gradient-text" style="font-weight:600">Conectar, cuidar y acompañar.</span><br/>La smartband que combate la soledad y mejora el bienestar de las personas mayores con IA, IoT y voz inteligente.</p>
            <div class="footer-social">
              ${SOCIAL.map(s => `
                <a href="${s.href}" class="social-link" aria-label="${s.label}" target="_blank" rel="noopener noreferrer">
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
