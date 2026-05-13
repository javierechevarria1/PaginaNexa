import { FormModel } from '../models/FormModel'
import { ContactView } from '../views/ContactView'

export class FormController {
  constructor(
    private model: FormModel,
    private view: ContactView,
  ) {}

  init(): void {
    const form = this.view.getForm()

    form.addEventListener('submit', async e => {
      e.preventDefault()
      this.view.clearErrors()

      const data = new FormData(form)
      this.model.update('name',    String(data.get('name')    ?? ''))
      this.model.update('email',   String(data.get('email')   ?? ''))
      this.model.update('phone',   String(data.get('phone')   ?? ''))
      this.model.update('message', String(data.get('message') ?? ''))

      if (!this.model.validate()) {
        if (this.model.errors.name)    this.view.showFieldError('name',  this.model.errors.name)
        if (this.model.errors.email)   this.view.showFieldError('email', this.model.errors.email)
        if (this.model.errors.message) this.view.showFieldError('msg',   this.model.errors.message)
        return
      }

      this.view.setSending(true)
      await this.model.submit()
      this.view.setSending(false)

      if (this.model.status === 'sent') this.view.showSuccess()
    })
  }
}
