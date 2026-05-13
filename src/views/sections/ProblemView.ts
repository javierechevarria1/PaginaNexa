import { BaseView } from '../BaseView'

const STATS = [
  { value: '4.7M', counter: 4.7, suffix: 'M', label: 'personas mayores en España viven en soledad no deseada' },
  { value: '68%', counter: 68, suffix: '%', label: 'de mayores de 65 años siente dificultades con la tecnología actual' },
  { value: '3x',  counter: 3,  suffix: 'x', label: 'más riesgo de deterioro cognitivo por el aislamiento social' },
]

const PROBLEMS = [
  {
    icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
    title: 'Soledad no deseada',
    desc: 'Millones de personas mayores viven aisladas, sin interacciones sociales significativas durante días enteros.',
  },
  {
    icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    title: 'Brecha digital',
    desc: 'Smartphones y tablets resultan demasiado complejos. La tecnología actual excluye en lugar de incluir.',
  },
  {
    icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>',
    title: 'Aislamiento social',
    desc: 'La falta de conexión social acelera el deterioro cognitivo y reduce drásticamente la calidad de vida.',
  },
]

export class ProblemView extends BaseView {
  render(): HTMLElement {
    const section = this.el('section', 'section')
    section.id = 'problema'

    section.innerHTML = `
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">El Problema</span>
          <h2 class="section-title">La soledad es una crisis <span class="gradient-text">silenciosa</span></h2>
          <p class="section-subtitle">El envejecimiento activo es posible, pero millones quedan atrapadas en el aislamiento. La tecnología existente no está diseñada para ellas.</p>
        </div>

        <div class="stats-grid stagger">
          ${STATS.map(s => `
            <div class="glass-card stat-card reveal">
              <div class="stat-value gradient-text" data-counter="${s.counter}" data-suffix="${s.suffix}">${s.value}</div>
              <p class="stat-label">${s.label}</p>
              <div class="stat-bar"></div>
            </div>
          `).join('')}
        </div>

        <div class="grid-3 stagger">
          ${PROBLEMS.map(p => `
            <div class="glass-card problem-card reveal">
              <div class="icon-box icon-box-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${p.icon}</svg>
              </div>
              <div>
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
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
