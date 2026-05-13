import { DeviceModel } from '../models/DeviceModel'
import { ActivateDeviceView } from '../views/sections/ActivateDeviceView'

export class DeviceController {
  constructor(
    private model: DeviceModel,
    private view: ActivateDeviceView,
  ) {}

  init(): void {
    const input     = this.view.getInput()
    const submitBtn = this.view.getSubmitBtn()
    const resetBtn  = this.view.getResetBtn()

    input.addEventListener('input', () => {
      this.model.setId(input.value)
      input.value = this.model.id
      this.view.clearError()
    })

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') submitBtn.click()
    })

    submitBtn.addEventListener('click', async () => {
      this.view.clearError()
      if (!this.model.validate()) {
        this.view.showError(this.model.error)
        return
      }
      this.view.setValidating(true)
      await this.model.activate()
      this.view.setValidating(false)
      if (this.model.status === 'success') {
        this.view.showSuccess(this.model.id)
      }
    })

    resetBtn.addEventListener('click', () => {
      this.model.reset()
      this.view.reset()
    })
  }
}
