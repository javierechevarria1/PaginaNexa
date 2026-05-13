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

        <!-- 3D Band Visual -->
        <div class="hero-visual reveal">
          <div class="smartband-rings">
            <div class="ring ring-1"></div>
            <div class="ring ring-2"></div>
            <div class="ring ring-3"></div>
            <div class="ring ring-glow"></div>
          </div>

          <div class="nexa-band-scene">
            <div class="nexa-band">

              <!-- Top strap -->
              <div class="nexa-strap nexa-strap-top">
                <div class="nexa-strap-shine"></div>
                <div class="nexa-strap-edge-r"></div>
              </div>

              <!-- Main module -->
              <div class="nexa-module">
                <div class="nexa-module-front">
                  <!-- LED indicator -->
                  <div class="nexa-led"></div>
                  <!-- Screen -->
                  <div class="nexa-screen">
                    <div class="screen-top">
                      <span class="screen-brand">NEXA</span>
                      <div class="screen-dots">
                        <span class="screen-dot screen-dot-1"></span>
                        <span class="screen-dot screen-dot-2"></span>
                      </div>
                    </div>
                    <div class="screen-bpm">
                      <svg width="16" height="14" viewBox="0 0 24 22" fill="none">
                        <path d="M12 21.5C12 21.5 1 13.5 1 7.5C1 4.18629 3.68629 1.5 7 1.5C9.12 1.5 11 2.6 12 4.29C13 2.6 14.88 1.5 17 1.5C20.3137 1.5 23 4.18629 23 7.5C23 13.5 12 21.5 12 21.5Z" fill="#00E5C3"/>
                      </svg>
                      <div>
                        <div class="screen-bpm-value">72</div>
                        <div class="screen-bpm-label">BPM</div>
                      </div>
                    </div>
                    <svg class="screen-wave" viewBox="0 0 96 32" fill="none">
                      <polyline points="0,16 12,16 18,4 24,28 30,10 36,22 48,16 60,16 66,8 72,24 78,12 84,20 96,16"
                        stroke="#00E5C3" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
                    </svg>
                    <div class="screen-meta">
                      <div style="text-align:center">
                        <div class="screen-meta-val screen-meta-val-t">4,231</div>
                        <div class="screen-meta-unit">pasos</div>
                      </div>
                      <div class="screen-meta-sep"></div>
                      <div style="text-align:center">
                        <div class="screen-meta-val screen-meta-val-g">98%</div>
                        <div class="screen-meta-unit">batería</div>
                      </div>
                    </div>
                    <div class="screen-msg">IA: "¡Buen día, María! ☀️"</div>
                  </div>
                </div>
                <!-- Visible side faces for 3D depth -->
                <div class="nexa-module-edge-r"></div>
                <div class="nexa-module-edge-b"></div>
                <!-- Side button -->
                <div class="nexa-module-btn"></div>
              </div>

              <!-- Bottom strap -->
              <div class="nexa-strap nexa-strap-bottom">
                <div class="nexa-strap-shine"></div>
                <div class="nexa-strap-edge-r"></div>
                <div class="nexa-strap-holes">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>

            </div>

            <!-- Floating badges -->
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
