import { BaseView } from './BaseView'

const FEATURES = [
  { icon: '<circle cx="12" cy="12" r="10"/><path d="M8 12h4l2 4M8 8l1 2"/><circle cx="12" cy="12" r="3"/>', title: 'Inteligencia Artificial', desc: 'IA personalizada que aprende los hábitos y preferencias del usuario para un acompañamiento genuino y contextual.', tag: 'IA adaptativa' },
  { icon: '<path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/>', title: 'Conectividad IoT', desc: 'LTE-M y NB-IoT garantizan conexión constante incluso en zonas de cobertura limitada, sin depender de Wi-Fi.', tag: 'LTE-M / NB-IoT' },
  { icon: '<path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/>', title: 'Voz Inteligente', desc: 'Interacción completamente por voz. Sin botones, sin menús. Solo hablar para comunicarse o recibir sugerencias.', tag: 'Voice-first' },
  { icon: '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" stroke-width="2"/>', title: 'Vibración Háptica', desc: 'Notificaciones táctiles discretas e intuitivas que no requieren ver ninguna pantalla. Comunicación silenciosa.', tag: 'Háptico' },
  { icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', title: 'Sin pantallas complejas', desc: 'Sin apps que instalar, sin configuraciones complicadas, sin fricción digital. Diseñado para el primer día.', tag: 'Plug & play' },
  { icon: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>', title: 'Acompañamiento social', desc: 'Conecta a los usuarios con su comunidad local de manera proactiva, sugiriendo actividades y creando vínculos.', tag: 'Comunidad' },
]

export class SolutionView extends BaseView {
  render(): HTMLElement {
    const section = this.el('section', 'section section-alt')
    section.id = 'solucion'

    section.innerHTML = `
      <div class="glow-blob" style="top:-5rem;right:-5rem;width:30rem;height:30rem;background:var(--turquoise)"></div>
      <div class="glow-blob" style="bottom:-5rem;left:-5rem;width:25rem;height:25rem;background:var(--cyan);opacity:.03"></div>
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">La Solución</span>
          <h2 class="section-title">NEXA reúne lo mejor de la <span class="gradient-text">tecnología moderna</span></h2>
          <p class="section-subtitle">Una smartband diseñada desde cero para el bienestar emocional, la autonomía y la conexión social de las personas mayores.</p>
        </div>
        <div class="grid-3 stagger">
          ${FEATURES.map(f => `
            <div class="glass-card feature-card reveal">
              <div class="feature-card-header">
                <div class="icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${f.icon}</svg>
                </div>
                <span class="tag">${f.tag}</span>
              </div>
              <div>
                <h3>${f.title}</h3>
                <p>${f.desc}</p>
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
