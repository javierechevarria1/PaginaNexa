import { BaseView } from '../BaseView'

const IMPACTS = [
  { icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>', title: 'Microcomunidades',    stat: '+2,400', statLabel: 'conexiones creadas',      desc: 'NEXA crea grupos locales de personas con intereses comunes, fomentando amistades reales y duraderas.' },
  { icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',                                                                                                             title: 'Envejecimiento activo', stat: '87%',    statLabel: 'más actividad física',   desc: 'Promueve estilos de vida saludables y activos adaptados a las capacidades y gustos de cada persona.' },
  { icon: '<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16"/>',                                                                                                   title: 'Inclusión digital',    stat: '100%',   statLabel: 'accesibilidad',          desc: 'Tecnología diseñada para todos, sin excepción. NEXA cierra la brecha digital con simplicidad radical.' },
  { icon: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',              title: 'Tecnología humana',    stat: '9.4/10', statLabel: 'satisfacción usuarios', desc: 'En NEXA, la tecnología está al servicio de las personas. Cada decisión de diseño es empática.' },
]

export class SocialImpactView extends BaseView {
  render(): HTMLElement {
    const section = this.el('section', 'section')
    section.id = 'impacto'

    section.innerHTML = `
      <div class="glow-blob" style="top:0;left:0;width:25rem;height:25rem;background:var(--turquoise)"></div>
      <div class="glow-blob" style="bottom:0;right:0;width:25rem;height:25rem;background:var(--cyan)"></div>
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">Impacto Social</span>
          <h2 class="section-title">Transformando <span class="gradient-text">vidas reales</span></h2>
          <p class="section-subtitle">NEXA no es solo un dispositivo. Es un movimiento hacia una sociedad más conectada, inclusiva y humana.</p>
        </div>
        <div class="grid-4 stagger">
          ${IMPACTS.map(i => `
            <div class="glass-card impact-card reveal">
              <div class="icon-box icon-box-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${i.icon}</svg>
              </div>
              <div>
                <div class="impact-stat gradient-text" data-counter-text="${i.stat}">${i.stat}</div>
                <div class="impact-stat-label">${i.statLabel}</div>
                <h3>${i.title}</h3>
                <p>${i.desc}</p>
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
