import { BaseView } from './BaseView'

const SPINNER = `<svg class="spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke-linecap="round"/></svg>`
const CHECK_ICON = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`

export class ActivateDeviceView extends BaseView {
  private formEl!: HTMLElement
  private successEl!: HTMLElement
  private inputEl!: HTMLInputElement
  private errorEl!: HTMLElement
  private submitBtn!: HTMLButtonElement

  render(): HTMLElement {
    const section = this.el('section', 'section')
    section.id = 'activar'

    section.innerHTML = `
      <div class="glow-blob" style="top:50%;left:50%;transform:translate(-50%,-50%);width:38rem;height:38rem;background:var(--turquoise);opacity:.04"></div>
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">Activación</span>
          <h2 class="section-title">Ya tengo mi <span class="gradient-text">pulsera NEXA</span></h2>
          <p class="section-subtitle">Introduce el ID único impreso en tu pulsera o en la tarjeta de activación para vincularla.</p>
        </div>
        <div class="activate-outer reveal">
          <div class="activate-border">
            <div class="activate-card">

              <!-- Success state -->
              <div class="activate-success" id="activate-success" style="display:none">
                <div class="activate-success-icon" style="color:var(--bg)">${CHECK_ICON}</div>
                <div>
                  <h3>¡Pulsera activada!</h3>
                  <p>Tu NEXA <span class="activate-id" id="activated-id"></span> está lista. Recibirás un email de confirmación en breve.</p>
                </div>
                <button class="activate-reset" id="activate-reset">Activar otro dispositivo</button>
              </div>

              <!-- Form state -->
              <div class="activate-form" id="activate-form">
                <div class="input-info">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2"/></svg>
                  <span>El ID único se encuentra en la <strong style="color:#fff">parte trasera de tu pulsera</strong> o en la <strong style="color:#fff">tarjeta de activación</strong>. Formato: NEXA-XXXXXXXX</span>
                </div>
                <div>
                  <label class="input-label" for="device-id">ID del dispositivo</label>
                  <input id="device-id" type="text" class="input-field activate-input-id" placeholder="NEXA-XXXXXXXX" maxlength="20" autocomplete="off" spellcheck="false"/>
                  <div class="input-error" id="device-error" style="display:none">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2"/></svg>
                    <span id="device-error-msg"></span>
                  </div>
                </div>
                <button class="activate-btn" id="activate-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Activar mi pulsera NEXA
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    `

    this.container = section
    this.formEl    = section.querySelector('#activate-form')!
    this.successEl = section.querySelector('#activate-success')!
    this.inputEl   = section.querySelector('#device-id')!
    this.errorEl   = section.querySelector('#device-error')!
    this.submitBtn = section.querySelector('#activate-btn')!
    return section
  }

  getInput(): HTMLInputElement { return this.inputEl }
  getSubmitBtn(): HTMLButtonElement { return this.submitBtn }
  getResetBtn(): HTMLButtonElement { return this.container.querySelector('#activate-reset')! }

  showError(msg: string): void {
    const span = this.errorEl.querySelector('#device-error-msg')!
    span.textContent = msg
    this.errorEl.style.display = 'flex'
  }

  clearError(): void { this.errorEl.style.display = 'none' }

  setValidating(loading: boolean): void {
    this.submitBtn.disabled = loading
    this.submitBtn.innerHTML = loading
      ? `${SPINNER} Verificando dispositivo…`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-linecap="round" stroke-linejoin="round"/></svg> Activar mi pulsera NEXA`
  }

  showSuccess(id: string): void {
    const span = this.container.querySelector('#activated-id')!
    span.textContent = id
    this.formEl.style.display = 'none'
    this.successEl.style.display = 'flex'
  }

  reset(): void {
    this.inputEl.value = ''
    this.clearError()
    this.setValidating(false)
    this.successEl.style.display = 'none'
    this.formEl.style.display = 'flex'
  }
}
