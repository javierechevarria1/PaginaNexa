import { BaseView } from '../BaseView'

const SPINNER = `<svg class="spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke-linecap="round"/></svg>`
const CHECK_ICON = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--bg)"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`

export class ContactView extends BaseView {
  render(): HTMLElement {
    const section = this.el('section', 'section section-alt')
    section.id = 'contacto'

    section.innerHTML = `
      <div class="glow-blob" style="top:50%;left:50%;transform:translate(-50%,-50%);width:30rem;height:30rem;background:var(--cyan);opacity:.03"></div>
      <div class="container">
        <div class="contact-grid">

          <!-- Info -->
          <div class="contact-info reveal-left">
            <div>
              <span class="section-label">Contacto</span>
              <h2 class="contact-info-title">¿Tienes alguna <span class="gradient-text">pregunta?</span></h2>
              <p class="contact-info-sub">Nuestro equipo está aquí para ayudarte. Escríbenos y te responderemos en menos de 24 horas.</p>
            </div>
            <div class="contact-items">
              ${[
                { icon: '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .17h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>', lbl: 'Teléfono', val: '+34 900 123 456' },
                { icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',                                                                                                                                                                                                                                                           lbl: 'Email',    val: 'javiecheva99@gmail.com' },
                { icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',                                                                                                                                                                                                                                                                                                 lbl: 'Sede',     val: 'Cantabria, España' },
              ].map(c => `
                <div class="glass-card contact-item">
                  <div class="contact-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${c.icon}</svg>
                  </div>
                  <div>
                    <div class="contact-item-lbl">${c.lbl}</div>
                    <div class="contact-item-val">${c.val}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Form -->
          <div class="reveal-right">
            <div class="form-border">
              <div class="form-card">

                <!-- Success -->
                <div class="form-success" id="form-success" style="display:none">
                  <div class="form-success-icon">${CHECK_ICON}</div>
                  <h3>¡Mensaje enviado!</h3>
                  <p>Te responderemos en menos de 24 horas.</p>
                </div>

                <!-- Form -->
                <form id="contact-form">
                  <div class="form-grid" style="margin-bottom:1.25rem">
                    <div class="form-group">
                      <label class="input-label" for="f-name">Nombre completo *</label>
                      <input id="f-name" name="name" type="text" class="input-field" placeholder="Ana García" required/>
                      <div class="input-error" id="err-name" style="display:none"><span></span></div>
                    </div>
                    <div class="form-group">
                      <label class="input-label" for="f-phone">Teléfono</label>
                      <input id="f-phone" name="phone" type="tel" class="input-field" placeholder="+34 600 000 000"/>
                    </div>
                  </div>
                  <div class="form-group" style="margin-bottom:1.25rem">
                    <label class="input-label" for="f-email">Email *</label>
                    <input id="f-email" name="email" type="email" class="input-field" placeholder="ana@ejemplo.com" required/>
                    <div class="input-error" id="err-email" style="display:none"><span></span></div>
                  </div>
                  <div class="form-group" style="margin-bottom:1.5rem">
                    <label class="input-label" for="f-msg">Mensaje *</label>
                    <textarea id="f-msg" name="message" class="input-field" rows="4" placeholder="¿Cómo podemos ayudarte?" required style="resize:none"></textarea>
                    <div class="input-error" id="err-msg" style="display:none"><span></span></div>
                  </div>
                  <button type="submit" class="btn btn-primary form-submit" id="form-submit">Enviar mensaje</button>
                </form>

              </div>
            </div>
          </div>

        </div>
      </div>
    `

    this.container = section
    return section
  }

  getForm(): HTMLFormElement { return this.container.querySelector('#contact-form')! }
  getSubmitBtn(): HTMLButtonElement { return this.container.querySelector('#form-submit')! }

  showFieldError(field: string, msg: string): void {
    const err = this.container.querySelector(`#err-${field}`)
    if (!err) return
    const span = err.querySelector('span')!
    span.textContent = msg;
    (err as HTMLElement).style.display = 'flex'
  }

  clearErrors(): void {
    this.container.querySelectorAll('.input-error').forEach(e => ((e as HTMLElement).style.display = 'none'))
  }

  setSending(loading: boolean): void {
    const btn = this.getSubmitBtn()
    btn.disabled = loading
    btn.innerHTML = loading ? `${SPINNER} Enviando…` : 'Enviar mensaje'
  }

  showSuccess(): void {
    const form = this.container.querySelector('#contact-form') as HTMLElement
    const success = this.container.querySelector('#form-success') as HTMLElement
    form.style.display = 'none'
    success.style.display = 'flex'
  }
}
