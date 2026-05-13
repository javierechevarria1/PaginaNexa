import { BaseView } from '../BaseView'

const VALUES = [
  { e: '💙', t: 'Empatía',       d: 'Cada decisión de diseño parte de escuchar y comprender las necesidades reales de las personas mayores y sus familias.', grad: 'rgba(0,229,195,.15),rgba(0,207,255,.1)', border: 'rgba(0,229,195,.2)' },
  { e: '🌍', t: 'Inclusión',     d: 'Creemos que la tecnología debe ser para todos. Sin barreras de edad, capacidad digital ni condición económica.', grad: 'rgba(0,207,255,.15),rgba(0,229,195,.1)', border: 'rgba(0,207,255,.2)' },
  { e: '🚀', t: 'Innovación',    d: 'IA, IoT y diseño de vanguardia al servicio del bienestar humano. Innovamos porque creemos que lo mejor está por venir.', grad: 'rgba(0,229,195,.15),rgba(0,255,213,.1)', border: 'rgba(0,229,195,.2)' },
  { e: '🌱', t: 'Sostenibilidad',d: 'Hardware duradero, software actualizable y una huella digital responsable. Construimos para el largo plazo.', grad: 'rgba(0,255,213,.15),rgba(0,207,255,.1)', border: 'rgba(0,255,213,.2)' },
  { e: '⚖️', t: 'Ética',         d: 'Privacidad por diseño, transparencia total y cumplimiento RGPD. Los datos de nuestros usuarios nunca se venden.', grad: 'rgba(0,207,255,.15),rgba(0,229,195,.1)', border: 'rgba(0,207,255,.2)' },
]

export class ValuesView extends BaseView {
  render(): HTMLElement {
    const section = this.el('section', 'section section-alt')
    section.id = 'valores'

    section.innerHTML = `
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">Nuestros valores</span>
          <h2 class="section-title">Lo que nos <span class="gradient-text">define</span></h2>
          <p class="section-subtitle">Más que una empresa tecnológica, somos un equipo comprometido con el bienestar de las personas.</p>
        </div>
        <div class="grid-3 stagger" style="margin-bottom:1.5rem">
          ${VALUES.slice(0,3).map(v => `
            <div class="glass-card value-card reveal" style="background:linear-gradient(135deg,${v.grad});border-color:${v.border}">
              <div class="value-emoji">${v.e}</div>
              <h3>${v.t}</h3>
              <p>${v.d}</p>
            </div>
          `).join('')}
        </div>
        <div class="grid-2 stagger" style="max-width:50rem;margin:0 auto">
          ${VALUES.slice(3).map(v => `
            <div class="glass-card value-card reveal" style="background:linear-gradient(135deg,${v.grad});border-color:${v.border}">
              <div class="value-emoji">${v.e}</div>
              <h3>${v.t}</h3>
              <p>${v.d}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `

    this.container = section
    return section
  }
}
