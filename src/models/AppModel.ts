type Listener = () => void

export class EventEmitter {
  private events: Map<string, Set<Listener>> = new Map()

  on(event: string, listener: Listener): void {
    if (!this.events.has(event)) this.events.set(event, new Set())
    this.events.get(event)!.add(listener)
  }

  off(event: string, listener: Listener): void {
    this.events.get(event)?.delete(listener)
  }

  emit(event: string): void {
    this.events.get(event)?.forEach(l => l())
  }
}

interface NavState {
  isScrolled: boolean
  menuOpen: boolean
  activeSection: string
}

export class AppModel extends EventEmitter {
  private static instance: AppModel
  readonly state: NavState = {
    isScrolled: false,
    menuOpen: false,
    activeSection: 'inicio',
  }

  static getInstance(): AppModel {
    if (!AppModel.instance) AppModel.instance = new AppModel()
    return AppModel.instance
  }

  setScrolled(value: boolean): void {
    if (this.state.isScrolled === value) return
    this.state.isScrolled = value
    this.emit('scroll')
  }

  toggleMenu(): void {
    this.state.menuOpen = !this.state.menuOpen
    this.emit('menu')
  }

  closeMenu(): void {
    if (!this.state.menuOpen) return
    this.state.menuOpen = false
    this.emit('menu')
  }

  setActiveSection(id: string): void {
    if (this.state.activeSection === id) return
    this.state.activeSection = id
    this.emit('section')
  }
}
