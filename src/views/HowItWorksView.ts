import { BaseView } from './BaseView'

const STEPS = [
  { n: '01', icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>', title: 'Recibes tu pulsera', desc: 'Tu NEXA llega lista para usar. Sin configuraciones complejas, sin manuales extensos. Solo la abres y ya.' },
  { n: '02', icon: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>', title: 'Activas el ID único', desc: 'Cada NEXA tiene un identificador único. Tú o un familiar lo introduce en nuestra plataforma para vincularlo.' },
  { n: '03', icon: '<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M12 2v2M4.93 4.93l1.41 1.41M2 12h2M4.93 19.07l1.41-1.41M12 20v2M19.07 19.07l-1.41-1.41M20 12h2"/>', title: 'Configuras preferencias', desc: 'Defines intereses, actividades favoritas y contactos cercanos. La IA aprende y adapta la experiencia desde el día 1.' },
  { n: '04', icon: '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>', title: 'NEXA recomienda actividades', desc: 'La IA sugiere planes sociales cercanos, detecta cambios de ánimo y mantiene contacto con familiares. Siempre acompañado.' },
]

export class HowItWorksView extends BaseView {
  render(): HTMLElement {
    const section = this.el('section', 'section')
    section.id = 'como-funciona'

    section.innerHTML = `
      <div class="glow-blob" style="inset:0;width:100%;height:100%;background:radial-gradient(ellipse at 50% 50%,rgba(0,229,195,.02),transparent 70%);border-radius:0;opacity:1"></div>
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">Proceso</span>
          <h2 class="section-title">Cómo funciona <span class="gradient-text">NEXA</span></h2>
          <p class="section-subtitle">Cuatro pasos simples para empezar a disfrutar de una vida más conectada y acompañada.</p>
        </div>
        <div class="steps-grid stagger">
          <div class="steps-connector"></div>
          ${STEPS.map(s => `
            <div class="glass-card step-card reveal">
              <div class="step-icon-wrap">
                <div class="icon-box icon-box-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${s.icon}</svg>
                </div>
                <div class="step-number">${s.n}</div>
              </div>
              <div>
                <h3>${s.title}</h3>
                <p>${s.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `

    this.container = section
    return section
  }
}
