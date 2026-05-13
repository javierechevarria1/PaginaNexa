import { EventEmitter } from './AppModel'

export type DeviceStatus = 'idle' | 'validating' | 'success' | 'error'

const ID_PATTERN = /^NEXA-[A-Z0-9]{6,10}$/i

export class DeviceModel extends EventEmitter {
  id = ''
  status: DeviceStatus = 'idle'
  error = ''

  setId(value: string): void {
    this.id = value.toUpperCase()
    this.error = ''
    this.emit('change')
  }

  validate(): boolean {
    if (!this.id.trim()) {
      this.error = 'Por favor, introduce tu ID de dispositivo.'
      this.emit('change')
      return false
    }
    if (!ID_PATTERN.test(this.id.trim())) {
      this.error = 'Formato inválido. Ejemplo: NEXA-ABC123456'
      this.emit('change')
      return false
    }
    return true
  }

  async activate(): Promise<void> {
    if (!this.validate()) return
    this.status = 'validating'
    this.error = ''
    this.emit('status')
    await new Promise<void>(r => setTimeout(r, 2000))
    this.status = 'success'
    this.emit('status')
  }

  reset(): void {
    this.id = ''
    this.status = 'idle'
    this.error = ''
    this.emit('status')
    this.emit('change')
  }
}
