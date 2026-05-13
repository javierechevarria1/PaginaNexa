import { EventEmitter } from './AppModel'

export interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

export type FormStatus = 'idle' | 'sending' | 'sent'

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export class FormModel extends EventEmitter {
  data: FormData = { name: '', email: '', phone: '', message: '' }
  status: FormStatus = 'idle'
  errors: FormErrors = {}

  update(field: keyof FormData, value: string): void {
    this.data[field] = value
    if (this.errors[field as keyof FormErrors]) {
      delete this.errors[field as keyof FormErrors]
      this.emit('change')
    }
  }

  validate(): boolean {
    this.errors = {}
    if (!this.data.name.trim()) this.errors.name = 'El nombre es obligatorio.'
    if (!this.data.email.trim()) {
      this.errors.email = 'El email es obligatorio.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.data.email)) {
      this.errors.email = 'Email inválido.'
    }
    if (!this.data.message.trim()) this.errors.message = 'El mensaje es obligatorio.'
    this.emit('change')
    return Object.keys(this.errors).length === 0
  }

  async submit(): Promise<void> {
    if (!this.validate()) return
    this.status = 'sending'
    this.emit('status')
    await new Promise<void>(r => setTimeout(r, 2000))
    this.status = 'sent'
    this.emit('status')
  }
}
