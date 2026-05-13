import { AppModel }             from '../models/AppModel'
import { FormModel }            from '../models/FormModel'
import { DeviceModel }          from '../models/DeviceModel'

import { HeaderView }           from '../views/layout/HeaderView'
import { FooterView }           from '../views/layout/FooterView'
import { HeroView }             from '../views/sections/HeroView'
import { ProblemView }          from '../views/sections/ProblemView'
import { SolutionView }         from '../views/sections/SolutionView'
import { HowItWorksView }       from '../views/sections/HowItWorksView'
import { EcosystemView }        from '../views/sections/EcosystemView'
import { BenefitsView }         from '../views/sections/BenefitsView'
import { PlanView }             from '../views/sections/PlanView'
import { SocialImpactView }     from '../views/sections/SocialImpactView'
import { ValuesView }           from '../views/sections/ValuesView'
import { ActivateDeviceView }   from '../views/sections/ActivateDeviceView'
import { ContactView }          from '../views/sections/ContactView'

import { NavigationController }   from './NavigationController'
import { SmoothScrollController } from './SmoothScrollController'
import { ParticleController }     from './ParticleController'
import { ScrollRevealController } from './ScrollRevealController'
import { CounterController }      from './CounterController'
import { FormController }         from './FormController'
import { DeviceController }       from './DeviceController'

const DIVIDER = (): HTMLElement => {
  const d = document.createElement('div')
  d.className = 'section-divider'
  return d
}

export class AppController {
  private appModel    = AppModel.getInstance()
  private formModel   = new FormModel()
  private deviceModel = new DeviceModel()

  private headerView         = new HeaderView()
  private heroView           = new HeroView()
  private problemView        = new ProblemView()
  private solutionView       = new SolutionView()
  private howItWorksView     = new HowItWorksView()
  private ecosystemView      = new EcosystemView()
  private benefitsView       = new BenefitsView()
  private planView           = new PlanView()
  private socialImpactView   = new SocialImpactView()
  private valuesView         = new ValuesView()
  private activateDeviceView = new ActivateDeviceView()
  private contactView        = new ContactView()
  private footerView         = new FooterView()

  init(): void {
    const root = document.getElementById('app')
    if (!root) throw new Error('#app element not found')

    // ── Mount views ──
    root.appendChild(this.headerView.render())

    const main = document.createElement('main')
    const sections = [
      this.heroView,
      this.problemView,
      this.solutionView,
      this.howItWorksView,
      this.ecosystemView,
      this.benefitsView,
      this.planView,
      this.socialImpactView,
      this.valuesView,
      this.activateDeviceView,
      this.contactView,
    ]
    sections.forEach((view, i) => {
      main.appendChild(view.render())
      if (i < sections.length - 1) main.appendChild(DIVIDER())
    })
    root.appendChild(main)
    root.appendChild(this.footerView.render())

    // ── Smooth scroll (desktop inertia + section snap) ──
    const smoothScroll = new SmoothScrollController()
    smoothScroll.init()

    // ── Wire scroll buttons in Hero ──
    this.heroView.getScrollButtons().forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset['scroll']
        const el = target ? document.querySelector(target) : null
        if (el) smoothScroll.scrollToEl(el)
      })
    })

    // ── Plan CTA ──
    const planCTA = this.planView.getCTA()
    planCTA?.addEventListener('click', () => {
      const el = document.querySelector('#contacto')
      if (el) smoothScroll.scrollToEl(el)
    })

    // ── Controllers ──
    new NavigationController(this.appModel, this.headerView, this.footerView, smoothScroll).init()
    new ScrollRevealController().observe()
    new CounterController().observe()
    new FormController(this.formModel, this.contactView).init()
    new DeviceController(this.deviceModel, this.activateDeviceView).init()

    // Particles after a short delay so canvas has proper dimensions
    requestAnimationFrame(() => {
      const canvas = this.heroView.getCanvas()
      if (canvas) new ParticleController(canvas).init()
    })
  }
}
