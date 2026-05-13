import { AppModel }             from '../models/AppModel'
import { FormModel }            from '../models/FormModel'
import { DeviceModel }          from '../models/DeviceModel'

import { HeaderView }           from '../views/HeaderView'
import { HeroView }             from '../views/HeroView'
import { ProblemView }          from '../views/ProblemView'
import { SolutionView }         from '../views/SolutionView'
import { HowItWorksView }       from '../views/HowItWorksView'
import { EcosystemView }        from '../views/EcosystemView'
import { BenefitsView }         from '../views/BenefitsView'
import { PlanView }             from '../views/PlanView'
import { SocialImpactView }     from '../views/SocialImpactView'
import { ValuesView }           from '../views/ValuesView'
import { ActivateDeviceView }   from '../views/ActivateDeviceView'
import { ContactView }          from '../views/ContactView'
import { FooterView }           from '../views/FooterView'

import { NavigationController } from './NavigationController'
import { ParticleController }   from './ParticleController'
import { ScrollRevealController } from './ScrollRevealController'
import { CounterController }    from './CounterController'
import { FormController }       from './FormController'
import { DeviceController }     from './DeviceController'

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

    // ── Wire scroll buttons in Hero ──
    this.heroView.getScrollButtons().forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset['scroll']
        if (target) document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
      })
    })

    // ── Plan CTA ──
    const planCTA = this.planView.getCTA()
    planCTA?.addEventListener('click', () => {
      document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })
    })

    // ── Controllers ──
    new NavigationController(this.appModel, this.headerView, this.footerView).init()
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
