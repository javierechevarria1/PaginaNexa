import { BaseView } from './BaseView'

const BENEFITS = [
  { icon: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>', title: 'Reduce la soledad', desc: 'IA proactiva que detecta patrones de aislamiento y actúa antes de que el usuario lo perciba conscientemente.', color: '#00E5C3' },
  { icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>', title: 'Bienestar emocional', desc: 'Monitorización del estado emocional con respuestas empáticas y personalizadas que mejoran la calidad de vida.', color: '#00CFFF' },
  { icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>', title: 'Recomienda actividades', desc: 'Propone planes, talleres, paseos y eventos según los intereses y la ubicación del usuario cada día.', color: '#00FFD5' },
  { icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>', title: 'Conecta personas', desc: 'Crea microcomunidades de personas con intereses similares. Relaciones reales, no solo digitales.', color: '#00E5C3' },
  { icon: '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .17h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>', title: 'Notifica a familiares', desc: 'Alertas inteligentes a familiares sobre el bienestar, sin invadir la privacidad del usuario.', color: '#00CFFF' },
  { icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>', title: 'Fácil de usar', desc: 'Cero aplicaciones, cero pantallas complejas. Solo la pulsera en el muñeca y la voz para interactuar.', color: '#00FFD5' },
]

export class BenefitsView extends BaseView {
  render(): HTMLElement {
    const section = this.el('section', 'section')
    section.id = 'beneficios'

    section.innerHTML = `
      <div class="glow-blob" style="bottom:-5rem;left:50%;transform:translateX(-50%);width:44rem;height:18rem;background:var(--turquoise);border-radius:50%"></div>
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">Beneficios</span>
          <h2 class="section-title">Por qué elegir <span class="gradient-text">NEXA</span></h2>
          <p class="section-subtitle">Cada función de NEXA está diseñada con un único objetivo: mejorar la vida de las personas mayores.</p>
        </div>
        <div class="grid-3 stagger">
          ${BENEFITS.map(b => `
            <div class="glass-card benefit-card reveal">
              <div class="benefit-glow" style="background:${b.color}"></div>
              <div class="icon-box icon-box-lg" style="background:${b.color}18;border-color:${b.color}30;color:${b.color}">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${b.icon}</svg>
              </div>
              <div>
                <h3>${b.title}</h3>
                <p>${b.desc}</p>
              </div>
              <div class="benefit-bar" style="background:linear-gradient(90deg,${b.color},transparent)"></div>
            </div>
          `).join('')}
        </div>
      </div>
    `

    this.container = section
    return section
  }
}
