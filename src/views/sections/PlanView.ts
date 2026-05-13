import { BaseView } from '../BaseView'

const FEATURES = [
  'Pulsera NEXA incluida', 'IA personalizada 24/7', 'Soporte técnico dedicado',
  'Actualizaciones automáticas', 'Gestión de actividades sociales', 'Mantenimiento preventivo',
  'Alertas a familiares', 'Comunidad NEXA premium',
]

const CHECK = `<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`

export class PlanView extends BaseView {
  render(): HTMLElement {
    const section = this.el('section', 'section section-alt')
    section.id = 'plan'

    section.innerHTML = `
      <div class="glow-blob" style="top:50%;left:50%;transform:translate(-50%,-50%);width:30rem;height:30rem;background:var(--turquoise);opacity:.05"></div>
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">Precios</span>
          <h2 class="section-title">Un plan sencillo, <span class="gradient-text">sin sorpresas</span></h2>
          <p class="section-subtitle">Todo lo que necesitas para un bienestar completo. Sin letras pequeñas.</p>
        </div>

        <div class="plan-wrapper reveal">
          <div class="plan-border">
            <div class="plan-card">
              <div class="plan-bg"></div>
              <span class="plan-badge">MÁS POPULAR</span>
              <p class="plan-name">Plan Premium</p>
              <div class="plan-price-row">
                <span class="plan-price-int">14</span>
                <div>
                  <span class="plan-price-dec gradient-text">,90</span>
                  <span class="plan-price-sym"> €</span>
                  <p class="plan-price-per">/mes</p>
                </div>
              </div>
              <p class="plan-note">Sin permanencia · Cancela cuando quieras</p>
              <div class="plan-divider"></div>
              <ul class="plan-features">
                ${FEATURES.map(f => `
                  <li class="plan-feature">
                    <div class="plan-check">${CHECK}</div>
                    <span>${f}</span>
                  </li>
                `).join('')}
              </ul>
              <button class="plan-cta" data-scroll="#contacto">Empezar ahora</button>
              <p class="plan-cta-note">Primer mes de prueba sin compromiso</p>
            </div>
          </div>
        </div>

        <div class="plan-trust reveal">
          ${[['🔒','Pago seguro SSL'],['↩️','Devolución 30 días'],['🛡️','RGPD cumplimiento'],['⚡','Activación inmediata']].map(([i,t]) => `
            <div class="trust-item"><span>${i}</span><span>${t}</span></div>
          `).join('')}
        </div>
      </div>
    `

    this.container = section
    return section
  }

  getCTA(): HTMLButtonElement | null {
    return this.container.querySelector('.plan-cta')
  }
}
