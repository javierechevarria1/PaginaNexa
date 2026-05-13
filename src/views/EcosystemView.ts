import { BaseView } from './BaseView'

interface EcoNode { id: string; label: string; sub: string; icon: string; x: number; y: number }

const NODES: EcoNode[] = [
  { id: 'band',      label: 'SmartBand',      sub: 'Hardware IoT',        icon: '<rect x="5" y="2" width="14" height="20" rx="3"/><line x1="9" y1="7" x2="15" y2="7"/><circle cx="12" cy="14" r="2"/>',                                   x: 50, y: 82 },
  { id: 'ai',        label: 'IA en la Nube',  sub: 'Procesamiento',       icon: '<path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>',                                                                                                   x: 50, y: 12 },
  { id: 'web',       label: 'Plataforma Web', sub: 'Gestión & Familia',   icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',                         x: 8,  y: 47 },
  { id: 'community', label: 'Comunidad',      sub: 'Social & Actividades',icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',                   x: 92, y: 47 },
]

const EDGES = [['band','ai'],['band','web'],['band','community'],['ai','web'],['ai','community']]

export class EcosystemView extends BaseView {
  render(): HTMLElement {
    const section = this.el('section', 'section section-alt')
    section.id = 'ecosistema'

    const lines = EDGES.map(([a, b]) => {
      const na = NODES.find(n => n.id === a)!
      const nb = NODES.find(n => n.id === b)!
      return `<line x1="${na.x}" y1="${na.y}" x2="${nb.x}" y2="${nb.y}" stroke="url(#lg)" stroke-width="0.4" class="eco-line" stroke-dasharray="5 4"/>`
    }).join('')

    const nodeEls = NODES.map(n => `
      <div class="eco-node" style="left:${n.x}%;top:${n.y}%">
        <div class="eco-node-inner">
          <div class="icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${n.icon}</svg>
          </div>
          <div class="eco-node-label">${n.label}</div>
          <div class="eco-node-sub">${n.sub}</div>
          <div class="eco-pulse"></div>
        </div>
      </div>
    `).join('')

    section.innerHTML = `
      <div class="glow-blob" style="top:50%;left:50%;transform:translate(-50%,-50%);width:38rem;height:38rem;background:var(--turquoise)"></div>
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">Ecosistema</span>
          <h2 class="section-title">El ecosistema <span class="gradient-text">NEXA</span></h2>
          <p class="section-subtitle">SmartBand, IA en la nube, plataforma web y comunidad social, todos conectados en tiempo real.</p>
        </div>
        <div class="reveal">
          <div class="eco-diagram">
            <svg class="eco-svg" viewBox="0 0 100 75" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#00E5C3" stop-opacity="0.4"/>
                  <stop offset="100%" stop-color="#00CFFF" stop-opacity="0.4"/>
                </linearGradient>
              </defs>
              ${lines}
            </svg>
            ${nodeEls}
          </div>
        </div>
        <div class="eco-features stagger">
          ${[
            { e: '⚡', t: 'Sincronización en tiempo real', d: 'Datos de salud y bienestar actualizados al instante entre la pulsera y la plataforma.' },
            { e: '🔒', t: 'Seguridad end-to-end',          d: 'Todos los datos están cifrados con protocolos de seguridad bancaria. Tu privacidad es sagrada.' },
            { e: '☁️', t: 'Escalabilidad infinita',        d: 'La arquitectura en nube permite crecer sin límites, adaptándose a millones de usuarios.' },
          ].map(f => `
            <div class="glass-card eco-feature reveal">
              <span class="eco-feature-emoji">${f.e}</span>
              <div>
                <h4>${f.t}</h4>
                <p>${f.d}</p>
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
