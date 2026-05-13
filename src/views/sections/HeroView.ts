import { BaseView } from '../BaseView'

export class HeroView extends BaseView {
  render(): HTMLElement {
    const section = this.el('section', 'hero-section')
    section.id = 'inicio'

    section.innerHTML = `
      <canvas class="hero-canvas" id="hero-canvas"></canvas>
      <div class="glow-blob hero-glow-1"></div>
      <div class="glow-blob hero-glow-2"></div>

      <div class="hero-inner">
        <!-- Content -->
        <div class="hero-content reveal">
          <div class="hero-badge">
            <span class="hero-badge-dot"></span>
            Smartband con IA para personas mayores
          </div>

          <h1 class="hero-title">
            Tecnología que
            <span class="gradient-text glow-text"> conecta personas,</span>
            no solo dispositivos
          </h1>

          <p class="hero-subtitle">
            NEXA ayuda a las personas mayores a mantenerse
            <strong style="color:#fff">acompañadas, activas y conectadas.</strong>
            Sin pantallas complejas. Solo vida plena.
          </p>

          <div class="hero-stats">
            <div>
              <div class="hero-stat-value gradient-text" data-counter="4.7" data-suffix="M">4.7M</div>
              <div class="hero-stat-label">personas en España afectadas</div>
            </div>
            <div>
              <div class="hero-stat-value gradient-text">24/7</div>
              <div class="hero-stat-label">acompañamiento IA</div>
            </div>
            <div>
              <div class="hero-stat-value gradient-text">1 click</div>
              <div class="hero-stat-label">activación total</div>
            </div>
          </div>

          <div class="hero-actions">
            <button class="btn btn-primary" data-scroll="#solucion">Conoce NEXA</button>
            <button class="btn btn-secondary" data-scroll="#activar">Activar dispositivo</button>
          </div>
        </div>

        <!-- Band Visual -->
        <div class="hero-visual reveal">
          <div class="smartband-rings">
            <div class="ring ring-1"></div>
            <div class="ring ring-2"></div>
            <div class="ring ring-3"></div>
            <div class="ring ring-glow"></div>
          </div>

          <div class="nexa-band-scene">
            <div class="nexa-band-img-wrap">
              <div class="nexa-band-img" role="img" aria-label="NEXA Smartband"></div>
            </div>

            <div class="float-badge float-badge-1">
              <div class="float-badge-title">IA activa</div>
              <div class="float-badge-sub">24/7</div>
            </div>
            <div class="float-badge float-badge-2">
              <div class="float-badge-title">LTE-M</div>
              <div class="float-badge-sub">conectado</div>
            </div>
          </div>
        </div>
      </div>

      <div class="scroll-indicator">
        <span>Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="#00E5C3" stroke-width="1.5"/>
          <rect x="6.5" y="5" width="3" height="6" rx="1.5" fill="#00E5C3"/>
        </svg>
      </div>
    `

    this.container = section
    return section
  }

  getCanvas(): HTMLCanvasElement | null {
    return this.container.querySelector('#hero-canvas')
  }

  getScrollButtons(): NodeListOf<HTMLButtonElement> {
    return this.container.querySelectorAll('[data-scroll]')
  }
}
