"use strict";(()=>{var d=class{constructor(){this.events=new Map}on(e,t){this.events.has(e)||this.events.set(e,new Set),this.events.get(e).add(t)}off(e,t){this.events.get(e)?.delete(t)}emit(e){this.events.get(e)?.forEach(t=>t())}},m=class o extends d{constructor(){super(...arguments);this.state={isScrolled:!1,menuOpen:!1,activeSection:"inicio"}}static getInstance(){return o.instance||(o.instance=new o),o.instance}setScrolled(t){this.state.isScrolled!==t&&(this.state.isScrolled=t,this.emit("scroll"))}toggleMenu(){this.state.menuOpen=!this.state.menuOpen,this.emit("menu")}closeMenu(){this.state.menuOpen&&(this.state.menuOpen=!1,this.emit("menu"))}setActiveSection(t){this.state.activeSection!==t&&(this.state.activeSection=t,this.emit("section"))}};var h=class extends d{constructor(){super(...arguments);this.data={name:"",email:"",phone:"",message:""};this.status="idle";this.errors={}}update(t,i){this.data[t]=i,this.errors[t]&&(delete this.errors[t],this.emit("change"))}validate(){return this.errors={},this.data.name.trim()||(this.errors.name="El nombre es obligatorio."),this.data.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.data.email)||(this.errors.email="Email inv\xE1lido."):this.errors.email="El email es obligatorio.",this.data.message.trim()||(this.errors.message="El mensaje es obligatorio."),this.emit("change"),Object.keys(this.errors).length===0}async submit(){this.validate()&&(this.status="sending",this.emit("status"),await new Promise(t=>setTimeout(t,2e3)),this.status="sent",this.emit("status"))}};var X=/^NEXA-[A-Z0-9]{6,10}$/i,u=class extends d{constructor(){super(...arguments);this.id="";this.status="idle";this.error=""}setId(t){this.id=t.toUpperCase(),this.error="",this.emit("change")}validate(){return this.id.trim()?X.test(this.id.trim())?!0:(this.error="Formato inv\xE1lido. Ejemplo: NEXA-ABC123456",this.emit("change"),!1):(this.error="Por favor, introduce tu ID de dispositivo.",this.emit("change"),!1)}async activate(){this.validate()&&(this.status="validating",this.error="",this.emit("status"),await new Promise(t=>setTimeout(t,2e3)),this.status="success",this.emit("status"))}reset(){this.id="",this.status="idle",this.error="",this.emit("status"),this.emit("change")}};var n=class{el(e,t){let i=document.createElement(e);return t&&(i.className=t),i}html(e,t,i){let s=document.createElement(e);return i&&(s.className=i),s.innerHTML=t,s}svgIcon(e,t=24){let i=document.createElementNS("http://www.w3.org/2000/svg","svg");return i.setAttribute("width",String(t)),i.setAttribute("height",String(t)),i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("fill","none"),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.innerHTML=e,i}getContainer(){return this.container}};var j=[{label:"Inicio",href:"#inicio"},{label:"Producto",href:"#solucion"},{label:"C\xF3mo funciona",href:"#como-funciona"},{label:"Beneficios",href:"#beneficios"},{label:"Planes",href:"#plan"},{label:"Contacto",href:"#contacto"}],g=class extends n{render(){let e=this.el("header","nav-header");return e.innerHTML=`
      <div class="nav-inner">
        <a href="#inicio" class="nav-logo" data-nav>
          <div class="nav-logo-icon">N</div>
          NEXA
        </a>
        <nav class="nav-links">
          ${j.map(t=>`<a href="${t.href}" class="nav-link" data-nav>${t.label}</a>`).join("")}
        </nav>
        <a href="#activar" class="nav-cta" data-nav>Ya tengo mi pulsera</a>
        <button class="nav-burger" id="nav-burger" aria-label="Men\xFA">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-mobile" id="nav-mobile">
        <div class="nav-mobile-inner">
          ${j.map(t=>`<a href="${t.href}" class="nav-link" data-nav>${t.label}</a>`).join("")}
          <a href="#activar" class="nav-cta" data-nav>Ya tengo mi pulsera</a>
        </div>
      </div>
    `,this.navEl=e,this.burger=e.querySelector("#nav-burger"),this.mobileNav=e.querySelector("#nav-mobile"),this.container=e,e}setScrolled(e){this.navEl.classList.toggle("scrolled",e)}setMenuOpen(e){this.burger.classList.toggle("open",e),this.mobileNav.classList.toggle("open",e)}getBurger(){return this.burger}getNavLinks(){return this.container.querySelectorAll("[data-nav]")}};var P=[{label:"Twitter",path:'<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>'},{label:"LinkedIn",path:'<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>'},{label:"Instagram",path:'<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>'}],D=[{l:"Caracter\xEDsticas",h:"#solucion"},{l:"C\xF3mo funciona",h:"#como-funciona"},{l:"Beneficios",h:"#beneficios"},{l:"Precios",h:"#plan"}],O=[{l:"Valores",h:"#valores"},{l:"Impacto social",h:"#impacto"},{l:"Ecosistema",h:"#ecosistema"},{l:"Contacto",h:"#contacto"}],R=["Pol\xEDtica de Privacidad","T\xE9rminos de Uso","Cookies","Aviso Legal"],b=class extends n{render(){let e=this.el("footer","footer");return e.innerHTML=`
      <div class="footer-top-line"></div>
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="#inicio" class="footer-logo" data-nav>
              <div class="footer-logo-icon">N</div>
              NEXA
            </a>
            <p class="footer-tagline"><span class="gradient-text" style="font-weight:600">Conectar, cuidar y acompa\xF1ar.</span><br/>La smartband que combate la soledad y mejora el bienestar de las personas mayores con IA, IoT y voz inteligente.</p>
            <div class="footer-social">
              ${P.map(t=>`
                <a href="#" class="social-link" aria-label="${t.label}">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">${t.path}</svg>
                </a>
              `).join("")}
            </div>
          </div>
          <div class="footer-col">
            <h4>Producto</h4>
            <div class="footer-links">
              ${D.map(t=>`<a href="${t.h}" class="footer-link" data-nav>${t.l}</a>`).join("")}
            </div>
          </div>
          <div class="footer-col">
            <h4>Empresa</h4>
            <div class="footer-links">
              ${O.map(t=>`<a href="${t.h}" class="footer-link" data-nav>${t.l}</a>`).join("")}
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copy">\xA9 2025 NEXA Technology S.L. Todos los derechos reservados.</p>
          <div class="footer-legal">
            ${R.map(t=>`<a href="#">${t}</a>`).join("")}
          </div>
        </div>
      </div>
    `,this.container=e,e}getNavLinks(){return this.container.querySelectorAll("[data-nav]")}};var f=class extends n{render(){let e=this.el("section","hero-section");return e.id="inicio",e.innerHTML=`
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
            Tecnolog\xEDa que
            <span class="gradient-text glow-text"> conecta personas,</span>
            no solo dispositivos
          </h1>

          <p class="hero-subtitle">
            NEXA ayuda a las personas mayores a mantenerse
            <strong style="color:#fff">acompa\xF1adas, activas y conectadas.</strong>
            Sin pantallas complejas. Solo vida plena.
          </p>

          <div class="hero-stats">
            <div>
              <div class="hero-stat-value gradient-text" data-counter="4.7" data-suffix="M">4.7M</div>
              <div class="hero-stat-label">personas en Espa\xF1a afectadas</div>
            </div>
            <div>
              <div class="hero-stat-value gradient-text">24/7</div>
              <div class="hero-stat-label">acompa\xF1amiento IA</div>
            </div>
            <div>
              <div class="hero-stat-value gradient-text">1 click</div>
              <div class="hero-stat-label">activaci\xF3n total</div>
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
                        <div class="screen-meta-unit">bater\xEDa</div>
                      </div>
                    </div>
                    <div class="screen-msg">IA: "\xA1Buen d\xEDa, Mar\xEDa! \u2600\uFE0F"</div>
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
    `,this.container=e,e}getCanvas(){return this.container.querySelector("#hero-canvas")}getScrollButtons(){return this.container.querySelectorAll("[data-scroll]")}};var G=[{value:"4.7M",counter:4.7,suffix:"M",label:"personas mayores en Espa\xF1a viven en soledad no deseada"},{value:"68%",counter:68,suffix:"%",label:"de mayores de 65 a\xF1os siente dificultades con la tecnolog\xEDa actual"},{value:"3x",counter:3,suffix:"x",label:"m\xE1s riesgo de deterioro cognitivo por el aislamiento social"}],K=[{icon:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',title:"Soledad no deseada",desc:"Millones de personas mayores viven aisladas, sin interacciones sociales significativas durante d\xEDas enteros."},{icon:'<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',title:"Brecha digital",desc:"Smartphones y tablets resultan demasiado complejos. La tecnolog\xEDa actual excluye en lugar de incluir."},{icon:'<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>',title:"Aislamiento social",desc:"La falta de conexi\xF3n social acelera el deterioro cognitivo y reduce dr\xE1sticamente la calidad de vida."}],w=class extends n{render(){let e=this.el("section","section");return e.id="problema",e.innerHTML=`
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">El Problema</span>
          <h2 class="section-title">La soledad es una crisis <span class="gradient-text">silenciosa</span></h2>
          <p class="section-subtitle">El envejecimiento activo es posible, pero millones quedan atrapadas en el aislamiento. La tecnolog\xEDa existente no est\xE1 dise\xF1ada para ellas.</p>
        </div>

        <div class="stats-grid stagger">
          ${G.map(t=>`
            <div class="glass-card stat-card reveal">
              <div class="stat-value gradient-text" data-counter="${t.counter}" data-suffix="${t.suffix}">${t.value}</div>
              <p class="stat-label">${t.label}</p>
              <div class="stat-bar"></div>
            </div>
          `).join("")}
        </div>

        <div class="grid-3 stagger">
          ${K.map(t=>`
            <div class="glass-card problem-card reveal">
              <div class="icon-box icon-box-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${t.icon}</svg>
              </div>
              <div>
                <h3>${t.title}</h3>
                <p>${t.desc}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `,this.container=e,e}};var U=[{icon:'<circle cx="12" cy="12" r="10"/><path d="M8 12h4l2 4M8 8l1 2"/><circle cx="12" cy="12" r="3"/>',title:"Inteligencia Artificial",desc:"IA personalizada que aprende los h\xE1bitos y preferencias del usuario para un acompa\xF1amiento genuino y contextual.",tag:"IA adaptativa"},{icon:'<path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/>',title:"Conectividad IoT",desc:"LTE-M y NB-IoT garantizan conexi\xF3n constante incluso en zonas de cobertura limitada, sin depender de Wi-Fi.",tag:"LTE-M / NB-IoT"},{icon:'<path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/>',title:"Voz Inteligente",desc:"Interacci\xF3n completamente por voz. Sin botones, sin men\xFAs. Solo hablar para comunicarse o recibir sugerencias.",tag:"Voice-first"},{icon:'<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" stroke-width="2"/>',title:"Vibraci\xF3n H\xE1ptica",desc:"Notificaciones t\xE1ctiles discretas e intuitivas que no requieren ver ninguna pantalla. Comunicaci\xF3n silenciosa.",tag:"H\xE1ptico"},{icon:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',title:"Sin pantallas complejas",desc:"Sin apps que instalar, sin configuraciones complicadas, sin fricci\xF3n digital. Dise\xF1ado para el primer d\xEDa.",tag:"Plug & play"},{icon:'<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',title:"Acompa\xF1amiento social",desc:"Conecta a los usuarios con su comunidad local de manera proactiva, sugiriendo actividades y creando v\xEDnculos.",tag:"Comunidad"}],y=class extends n{render(){let e=this.el("section","section section-alt");return e.id="solucion",e.innerHTML=`
      <div class="glow-blob" style="top:-5rem;right:-5rem;width:30rem;height:30rem;background:var(--turquoise)"></div>
      <div class="glow-blob" style="bottom:-5rem;left:-5rem;width:25rem;height:25rem;background:var(--cyan);opacity:.03"></div>
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">La Soluci\xF3n</span>
          <h2 class="section-title">NEXA re\xFAne lo mejor de la <span class="gradient-text">tecnolog\xEDa moderna</span></h2>
          <p class="section-subtitle">Una smartband dise\xF1ada desde cero para el bienestar emocional, la autonom\xEDa y la conexi\xF3n social de las personas mayores.</p>
        </div>
        <div class="grid-3 stagger">
          ${U.map(t=>`
            <div class="glass-card feature-card reveal">
              <div class="feature-card-header">
                <div class="icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${t.icon}</svg>
                </div>
                <span class="tag">${t.tag}</span>
              </div>
              <div>
                <h3>${t.title}</h3>
                <p>${t.desc}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `,this.container=e,e}};var W=[{n:"01",icon:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',title:"Recibes tu pulsera",desc:"Tu NEXA llega lista para usar. Sin configuraciones complejas, sin manuales extensos. Solo la abres y ya."},{n:"02",icon:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>',title:"Activas el ID \xFAnico",desc:"Cada NEXA tiene un identificador \xFAnico. T\xFA o un familiar lo introduce en nuestra plataforma para vincularlo."},{n:"03",icon:'<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M12 2v2M4.93 4.93l1.41 1.41M2 12h2M4.93 19.07l1.41-1.41M12 20v2M19.07 19.07l-1.41-1.41M20 12h2"/>',title:"Configuras preferencias",desc:"Defines intereses, actividades favoritas y contactos cercanos. La IA aprende y adapta la experiencia desde el d\xEDa 1."},{n:"04",icon:'<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',title:"NEXA recomienda actividades",desc:"La IA sugiere planes sociales cercanos, detecta cambios de \xE1nimo y mantiene contacto con familiares. Siempre acompa\xF1ado."}],x=class extends n{render(){let e=this.el("section","section");return e.id="como-funciona",e.innerHTML=`
      <div class="glow-blob" style="inset:0;width:100%;height:100%;background:radial-gradient(ellipse at 50% 50%,rgba(0,229,195,.02),transparent 70%);border-radius:0;opacity:1"></div>
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">Proceso</span>
          <h2 class="section-title">C\xF3mo funciona <span class="gradient-text">NEXA</span></h2>
          <p class="section-subtitle">Cuatro pasos simples para empezar a disfrutar de una vida m\xE1s conectada y acompa\xF1ada.</p>
        </div>
        <div class="steps-grid stagger">
          <div class="steps-connector"></div>
          ${W.map(t=>`
            <div class="glass-card step-card reveal">
              <div class="step-icon-wrap">
                <div class="icon-box icon-box-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${t.icon}</svg>
                </div>
                <div class="step-number">${t.n}</div>
              </div>
              <div>
                <h3>${t.title}</h3>
                <p>${t.desc}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `,this.container=e,e}};var q=[{id:"band",label:"SmartBand",sub:"Hardware IoT",icon:'<rect x="5" y="2" width="14" height="20" rx="3"/><line x1="9" y1="7" x2="15" y2="7"/><circle cx="12" cy="14" r="2"/>',x:50,y:82},{id:"ai",label:"IA en la Nube",sub:"Procesamiento",icon:'<path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>',x:50,y:12},{id:"web",label:"Plataforma Web",sub:"Gesti\xF3n & Familia",icon:'<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',x:8,y:47},{id:"community",label:"Comunidad",sub:"Social & Actividades",icon:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',x:92,y:47}],Y=[["band","ai"],["band","web"],["band","community"],["ai","web"],["ai","community"]],M=class extends n{render(){let e=this.el("section","section section-alt");e.id="ecosistema";let t=Y.map(([s,a])=>{let r=q.find(c=>c.id===s),l=q.find(c=>c.id===a);return`<line x1="${r.x}" y1="${r.y}" x2="${l.x}" y2="${l.y}" stroke="url(#lg)" stroke-width="0.4" class="eco-line" stroke-dasharray="5 4"/>`}).join(""),i=q.map(s=>`
      <div class="eco-node" style="left:${s.x}%;top:${s.y}%">
        <div class="eco-node-inner">
          <div class="icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${s.icon}</svg>
          </div>
          <div class="eco-node-label">${s.label}</div>
          <div class="eco-node-sub">${s.sub}</div>
          <div class="eco-pulse"></div>
        </div>
      </div>
    `).join("");return e.innerHTML=`
      <div class="glow-blob" style="top:50%;left:50%;transform:translate(-50%,-50%);width:38rem;height:38rem;background:var(--turquoise)"></div>
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">Ecosistema</span>
          <h2 class="section-title">El ecosistema <span class="gradient-text">NEXA</span></h2>
          <p class="section-subtitle">SmartBand, IA en la nube, plataforma web y comunidad social, todos conectados en tiempo real.</p>
        </div>
        <div class="reveal">
          <div class="eco-diagram">
            <svg class="eco-svg" viewBox="0 0 100 75" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#00E5C3" stop-opacity="0.4"/>
                  <stop offset="100%" stop-color="#00CFFF" stop-opacity="0.4"/>
                </linearGradient>
              </defs>
              ${t}
            </svg>
            ${i}
          </div>
        </div>
        <div class="eco-features stagger">
          ${[{e:"\u26A1",t:"Sincronizaci\xF3n en tiempo real",d:"Datos de salud y bienestar actualizados al instante entre la pulsera y la plataforma."},{e:"\u{1F512}",t:"Seguridad end-to-end",d:"Todos los datos est\xE1n cifrados con protocolos de seguridad bancaria. Tu privacidad es sagrada."},{e:"\u2601\uFE0F",t:"Escalabilidad infinita",d:"La arquitectura en nube permite crecer sin l\xEDmites, adapt\xE1ndose a millones de usuarios."}].map(s=>`
            <div class="glass-card eco-feature reveal">
              <span class="eco-feature-emoji">${s.e}</span>
              <div>
                <h4>${s.t}</h4>
                <p>${s.d}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `,this.container=e,e}};var Z=[{icon:'<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',title:"Reduce la soledad",desc:"IA proactiva que detecta patrones de aislamiento y act\xFAa antes de que el usuario lo perciba conscientemente.",color:"#00E5C3"},{icon:'<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',title:"Bienestar emocional",desc:"Monitorizaci\xF3n del estado emocional con respuestas emp\xE1ticas y personalizadas que mejoran la calidad de vida.",color:"#00CFFF"},{icon:'<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',title:"Recomienda actividades",desc:"Propone planes, talleres, paseos y eventos seg\xFAn los intereses y la ubicaci\xF3n del usuario cada d\xEDa.",color:"#00FFD5"},{icon:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',title:"Conecta personas",desc:"Crea microcomunidades de personas con intereses similares. Relaciones reales, no solo digitales.",color:"#00E5C3"},{icon:'<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .17h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>',title:"Notifica a familiares",desc:"Alertas inteligentes a familiares sobre el bienestar, sin invadir la privacidad del usuario.",color:"#00CFFF"},{icon:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',title:"F\xE1cil de usar",desc:"Cero aplicaciones, cero pantallas complejas. Solo la pulsera en el mu\xF1eca y la voz para interactuar.",color:"#00FFD5"}],E=class extends n{render(){let e=this.el("section","section");return e.id="beneficios",e.innerHTML=`
      <div class="glow-blob" style="bottom:-5rem;left:50%;transform:translateX(-50%);width:44rem;height:18rem;background:var(--turquoise);border-radius:50%"></div>
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">Beneficios</span>
          <h2 class="section-title">Por qu\xE9 elegir <span class="gradient-text">NEXA</span></h2>
          <p class="section-subtitle">Cada funci\xF3n de NEXA est\xE1 dise\xF1ada con un \xFAnico objetivo: mejorar la vida de las personas mayores.</p>
        </div>
        <div class="grid-3 stagger">
          ${Z.map(t=>`
            <div class="glass-card benefit-card reveal">
              <div class="benefit-glow" style="background:${t.color}"></div>
              <div class="icon-box icon-box-lg" style="background:${t.color}18;border-color:${t.color}30;color:${t.color}">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${t.icon}</svg>
              </div>
              <div>
                <h3>${t.title}</h3>
                <p>${t.desc}</p>
              </div>
              <div class="benefit-bar" style="background:linear-gradient(90deg,${t.color},transparent)"></div>
            </div>
          `).join("")}
        </div>
      </div>
    `,this.container=e,e}};var J=["Pulsera NEXA incluida","IA personalizada 24/7","Soporte t\xE9cnico dedicado","Actualizaciones autom\xE1ticas","Gesti\xF3n de actividades sociales","Mantenimiento preventivo","Alertas a familiares","Comunidad NEXA premium"],Q='<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',L=class extends n{render(){let e=this.el("section","section section-alt");return e.id="plan",e.innerHTML=`
      <div class="glow-blob" style="top:50%;left:50%;transform:translate(-50%,-50%);width:30rem;height:30rem;background:var(--turquoise);opacity:.05"></div>
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">Precios</span>
          <h2 class="section-title">Un plan sencillo, <span class="gradient-text">sin sorpresas</span></h2>
          <p class="section-subtitle">Todo lo que necesitas para un bienestar completo. Sin letras peque\xF1as.</p>
        </div>

        <div class="plan-wrapper reveal">
          <div class="plan-border">
            <div class="plan-card">
              <div class="plan-bg"></div>
              <span class="plan-badge">M\xC1S POPULAR</span>
              <p class="plan-name">Plan Premium</p>
              <div class="plan-price-row">
                <span class="plan-price-int">14</span>
                <div>
                  <span class="plan-price-dec gradient-text">,90</span>
                  <span class="plan-price-sym"> \u20AC</span>
                  <p class="plan-price-per">/mes</p>
                </div>
              </div>
              <p class="plan-note">Sin permanencia \xB7 Cancela cuando quieras</p>
              <div class="plan-divider"></div>
              <ul class="plan-features">
                ${J.map(t=>`
                  <li class="plan-feature">
                    <div class="plan-check">${Q}</div>
                    <span>${t}</span>
                  </li>
                `).join("")}
              </ul>
              <button class="plan-cta" data-scroll="#contacto">Empezar ahora</button>
              <p class="plan-cta-note">Primer mes de prueba sin compromiso</p>
            </div>
          </div>
        </div>

        <div class="plan-trust reveal">
          ${[["\u{1F512}","Pago seguro SSL"],["\u21A9\uFE0F","Devoluci\xF3n 30 d\xEDas"],["\u{1F6E1}\uFE0F","RGPD cumplimiento"],["\u26A1","Activaci\xF3n inmediata"]].map(([t,i])=>`
            <div class="trust-item"><span>${t}</span><span>${i}</span></div>
          `).join("")}
        </div>
      </div>
    `,this.container=e,e}getCTA(){return this.container.querySelector(".plan-cta")}};var _=[{icon:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',title:"Microcomunidades",stat:"+2,400",statLabel:"conexiones creadas",desc:"NEXA crea grupos locales de personas con intereses comunes, fomentando amistades reales y duraderas."},{icon:'<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',title:"Envejecimiento activo",stat:"87%",statLabel:"m\xE1s actividad f\xEDsica",desc:"Promueve estilos de vida saludables y activos adaptados a las capacidades y gustos de cada persona."},{icon:'<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16"/>',title:"Inclusi\xF3n digital",stat:"100%",statLabel:"accesibilidad",desc:"Tecnolog\xEDa dise\xF1ada para todos, sin excepci\xF3n. NEXA cierra la brecha digital con simplicidad radical."},{icon:'<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',title:"Tecnolog\xEDa humana",stat:"9.4/10",statLabel:"satisfacci\xF3n usuarios",desc:"En NEXA, la tecnolog\xEDa est\xE1 al servicio de las personas. Cada decisi\xF3n de dise\xF1o es emp\xE1tica."}],k=class extends n{render(){let e=this.el("section","section");return e.id="impacto",e.innerHTML=`
      <div class="glow-blob" style="top:0;left:0;width:25rem;height:25rem;background:var(--turquoise)"></div>
      <div class="glow-blob" style="bottom:0;right:0;width:25rem;height:25rem;background:var(--cyan)"></div>
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">Impacto Social</span>
          <h2 class="section-title">Transformando <span class="gradient-text">vidas reales</span></h2>
          <p class="section-subtitle">NEXA no es solo un dispositivo. Es un movimiento hacia una sociedad m\xE1s conectada, inclusiva y humana.</p>
        </div>
        <div class="grid-4 stagger">
          ${_.map(t=>`
            <div class="glass-card impact-card reveal">
              <div class="icon-box icon-box-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${t.icon}</svg>
              </div>
              <div>
                <div class="impact-stat gradient-text" data-counter-text="${t.stat}">${t.stat}</div>
                <div class="impact-stat-label">${t.statLabel}</div>
                <h3>${t.title}</h3>
                <p>${t.desc}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `,this.container=e,e}};var F=[{e:"\u{1F499}",t:"Empat\xEDa",d:"Cada decisi\xF3n de dise\xF1o parte de escuchar y comprender las necesidades reales de las personas mayores y sus familias.",grad:"rgba(0,229,195,.15),rgba(0,207,255,.1)",border:"rgba(0,229,195,.2)"},{e:"\u{1F30D}",t:"Inclusi\xF3n",d:"Creemos que la tecnolog\xEDa debe ser para todos. Sin barreras de edad, capacidad digital ni condici\xF3n econ\xF3mica.",grad:"rgba(0,207,255,.15),rgba(0,229,195,.1)",border:"rgba(0,207,255,.2)"},{e:"\u{1F680}",t:"Innovaci\xF3n",d:"IA, IoT y dise\xF1o de vanguardia al servicio del bienestar humano. Innovamos porque creemos que lo mejor est\xE1 por venir.",grad:"rgba(0,229,195,.15),rgba(0,255,213,.1)",border:"rgba(0,229,195,.2)"},{e:"\u{1F331}",t:"Sostenibilidad",d:"Hardware duradero, software actualizable y una huella digital responsable. Construimos para el largo plazo.",grad:"rgba(0,255,213,.15),rgba(0,207,255,.1)",border:"rgba(0,255,213,.2)"},{e:"\u2696\uFE0F",t:"\xC9tica",d:"Privacidad por dise\xF1o, transparencia total y cumplimiento RGPD. Los datos de nuestros usuarios nunca se venden.",grad:"rgba(0,207,255,.15),rgba(0,229,195,.1)",border:"rgba(0,207,255,.2)"}],S=class extends n{render(){let e=this.el("section","section section-alt");return e.id="valores",e.innerHTML=`
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">Nuestros valores</span>
          <h2 class="section-title">Lo que nos <span class="gradient-text">define</span></h2>
          <p class="section-subtitle">M\xE1s que una empresa tecnol\xF3gica, somos un equipo comprometido con el bienestar de las personas.</p>
        </div>
        <div class="grid-3 stagger" style="margin-bottom:1.5rem">
          ${F.slice(0,3).map(t=>`
            <div class="glass-card value-card reveal" style="background:linear-gradient(135deg,${t.grad});border-color:${t.border}">
              <div class="value-emoji">${t.e}</div>
              <h3>${t.t}</h3>
              <p>${t.d}</p>
            </div>
          `).join("")}
        </div>
        <div class="grid-2 stagger" style="max-width:50rem;margin:0 auto">
          ${F.slice(3).map(t=>`
            <div class="glass-card value-card reveal" style="background:linear-gradient(135deg,${t.grad});border-color:${t.border}">
              <div class="value-emoji">${t.e}</div>
              <h3>${t.t}</h3>
              <p>${t.d}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `,this.container=e,e}};var ee='<svg class="spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke-linecap="round"/></svg>',te='<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>',A=class extends n{render(){let e=this.el("section","section");return e.id="activar",e.innerHTML=`
      <div class="glow-blob" style="top:50%;left:50%;transform:translate(-50%,-50%);width:38rem;height:38rem;background:var(--turquoise);opacity:.04"></div>
      <div class="container">
        <div class="section-center reveal">
          <span class="section-label">Activaci\xF3n</span>
          <h2 class="section-title">Ya tengo mi <span class="gradient-text">pulsera NEXA</span></h2>
          <p class="section-subtitle">Introduce el ID \xFAnico impreso en tu pulsera o en la tarjeta de activaci\xF3n para vincularla.</p>
        </div>
        <div class="activate-outer reveal">
          <div class="activate-border">
            <div class="activate-card">

              <!-- Success state -->
              <div class="activate-success" id="activate-success" style="display:none">
                <div class="activate-success-icon" style="color:var(--bg)">${te}</div>
                <div>
                  <h3>\xA1Pulsera activada!</h3>
                  <p>Tu NEXA <span class="activate-id" id="activated-id"></span> est\xE1 lista. Recibir\xE1s un email de confirmaci\xF3n en breve.</p>
                </div>
                <button class="activate-reset" id="activate-reset">Activar otro dispositivo</button>
              </div>

              <!-- Form state -->
              <div class="activate-form" id="activate-form">
                <div class="input-info">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2"/></svg>
                  <span>El ID \xFAnico se encuentra en la <strong style="color:#fff">parte trasera de tu pulsera</strong> o en la <strong style="color:#fff">tarjeta de activaci\xF3n</strong>. Formato: NEXA-XXXXXXXX</span>
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
    `,this.container=e,this.formEl=e.querySelector("#activate-form"),this.successEl=e.querySelector("#activate-success"),this.inputEl=e.querySelector("#device-id"),this.errorEl=e.querySelector("#device-error"),this.submitBtn=e.querySelector("#activate-btn"),e}getInput(){return this.inputEl}getSubmitBtn(){return this.submitBtn}getResetBtn(){return this.container.querySelector("#activate-reset")}showError(e){let t=this.errorEl.querySelector("#device-error-msg");t.textContent=e,this.errorEl.style.display="flex"}clearError(){this.errorEl.style.display="none"}setValidating(e){this.submitBtn.disabled=e,this.submitBtn.innerHTML=e?`${ee} Verificando dispositivo\u2026`:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-linecap="round" stroke-linejoin="round"/></svg> Activar mi pulsera NEXA'}showSuccess(e){let t=this.container.querySelector("#activated-id");t.textContent=e,this.formEl.style.display="none",this.successEl.style.display="flex"}reset(){this.inputEl.value="",this.clearError(),this.setValidating(!1),this.successEl.style.display="none",this.formEl.style.display="flex"}};var ie='<svg class="spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke-linecap="round"/></svg>',ae='<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--bg)"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>',T=class extends n{render(){let e=this.el("section","section section-alt");return e.id="contacto",e.innerHTML=`
      <div class="glow-blob" style="top:50%;left:50%;transform:translate(-50%,-50%);width:30rem;height:30rem;background:var(--cyan);opacity:.03"></div>
      <div class="container">
        <div class="contact-grid">

          <!-- Info -->
          <div class="contact-info reveal-left">
            <div>
              <span class="section-label">Contacto</span>
              <h2 class="contact-info-title">\xBFTienes alguna <span class="gradient-text">pregunta?</span></h2>
              <p class="contact-info-sub">Nuestro equipo est\xE1 aqu\xED para ayudarte. Escr\xEDbenos y te responderemos en menos de 24 horas.</p>
            </div>
            <div class="contact-items">
              ${[{icon:'<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .17h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>',lbl:"Tel\xE9fono",val:"+34 900 123 456"},{icon:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',lbl:"Email",val:"hola@nexaband.es"},{icon:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',lbl:"Sede",val:"Madrid, Espa\xF1a"}].map(t=>`
                <div class="glass-card contact-item">
                  <div class="contact-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${t.icon}</svg>
                  </div>
                  <div>
                    <div class="contact-item-lbl">${t.lbl}</div>
                    <div class="contact-item-val">${t.val}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Form -->
          <div class="reveal-right">
            <div class="form-border">
              <div class="form-card">

                <!-- Success -->
                <div class="form-success" id="form-success" style="display:none">
                  <div class="form-success-icon">${ae}</div>
                  <h3>\xA1Mensaje enviado!</h3>
                  <p>Te responderemos en menos de 24 horas.</p>
                </div>

                <!-- Form -->
                <form id="contact-form">
                  <div class="form-grid" style="margin-bottom:1.25rem">
                    <div class="form-group">
                      <label class="input-label" for="f-name">Nombre completo *</label>
                      <input id="f-name" name="name" type="text" class="input-field" placeholder="Ana Garc\xEDa" required/>
                      <div class="input-error" id="err-name" style="display:none"><span></span></div>
                    </div>
                    <div class="form-group">
                      <label class="input-label" for="f-phone">Tel\xE9fono</label>
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
                    <textarea id="f-msg" name="message" class="input-field" rows="4" placeholder="\xBFC\xF3mo podemos ayudarte?" required style="resize:none"></textarea>
                    <div class="input-error" id="err-msg" style="display:none"><span></span></div>
                  </div>
                  <button type="submit" class="btn btn-primary form-submit" id="form-submit">Enviar mensaje</button>
                </form>

              </div>
            </div>
          </div>

        </div>
      </div>
    `,this.container=e,e}getForm(){return this.container.querySelector("#contact-form")}getSubmitBtn(){return this.container.querySelector("#form-submit")}showFieldError(e,t){let i=this.container.querySelector(`#err-${e}`);if(!i)return;let s=i.querySelector("span");s.textContent=t,i.style.display="flex"}clearErrors(){this.container.querySelectorAll(".input-error").forEach(e=>e.style.display="none")}setSending(e){let t=this.getSubmitBtn();t.disabled=e,t.innerHTML=e?`${ie} Enviando\u2026`:"Enviar mensaje"}showSuccess(){let e=this.container.querySelector("#contact-form"),t=this.container.querySelector("#form-success");e.style.display="none",t.style.display="flex"}};var C=class{constructor(e,t,i){this.model=e;this.headerView=t;this.footerView=i}init(){this.bindScroll(),this.bindBurger(),this.bindNavLinks(this.headerView.getNavLinks()),this.bindNavLinks(this.footerView.getNavLinks()),this.bindModelEvents()}bindScroll(){window.addEventListener("scroll",()=>{this.model.setScrolled(window.scrollY>20)},{passive:!0})}bindBurger(){this.headerView.getBurger().addEventListener("click",()=>{this.model.toggleMenu()})}bindNavLinks(e){e.forEach(t=>{t.addEventListener("click",i=>{i.preventDefault();let s=t.getAttribute("href");s&&s.startsWith("#")&&(this.scrollTo(s),this.model.closeMenu())})})}bindModelEvents(){this.model.on("scroll",()=>{this.headerView.setScrolled(this.model.state.isScrolled)}),this.model.on("menu",()=>{this.headerView.setMenuOpen(this.model.state.menuOpen)})}scrollTo(e){let t=document.querySelector(e);t&&t.scrollIntoView({behavior:"smooth"})}};var z=["#00E5C3","#00CFFF","#00FFD5","rgba(0,207,255,0.6)"],$=class{constructor(e){this.canvas=e;this.particles=[];this.animId=0;this.loop=()=>{let{ctx:e,canvas:t,particles:i}=this;e.clearRect(0,0,t.width,t.height);for(let s=0;s<i.length;s++){let a=i[s];a.x+=a.vx,a.y+=a.vy,(a.x<0||a.x>t.width)&&(a.vx*=-1),(a.y<0||a.y>t.height)&&(a.vy*=-1),e.beginPath(),e.arc(a.x,a.y,a.r,0,Math.PI*2),e.fillStyle=a.color,e.globalAlpha=a.alpha,e.fill();for(let r=s+1;r<i.length;r++){let l=i[r],c=a.x-l.x,p=a.y-l.y,v=Math.sqrt(c*c+p*p);v<120&&(e.beginPath(),e.moveTo(a.x,a.y),e.lineTo(l.x,l.y),e.strokeStyle="#00E5C3",e.globalAlpha=(1-v/120)*.12,e.lineWidth=.5,e.stroke())}}e.globalAlpha=1,this.animId=requestAnimationFrame(this.loop)};this.ctx=e.getContext("2d")}init(){this.resize(),window.addEventListener("resize",()=>this.resize(),{passive:!0});for(let e=0;e<120;e++)this.particles.push(this.spawn());this.loop()}destroy(){cancelAnimationFrame(this.animId)}resize(){this.canvas.width=this.canvas.offsetWidth,this.canvas.height=this.canvas.offsetHeight}spawn(){return{x:Math.random()*this.canvas.width,y:Math.random()*this.canvas.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*2+.5,alpha:Math.random()*.6+.2,color:z[Math.floor(Math.random()*z.length)]}}};var H=class{constructor(){this.observer=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("visible"),this.observer.unobserve(t.target))})},{threshold:.08,rootMargin:"0px 0px -50px 0px"})}observe(){document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(e=>this.observer.observe(e))}};var V=class{constructor(){this.observer=new IntersectionObserver(e=>{e.forEach(t=>{if(t.isIntersecting){let i=t.target,s=parseFloat(i.dataset.counter??"0"),a=i.dataset.suffix??"";this.animate(i,s,a),this.observer.unobserve(i)}})},{threshold:.5})}observe(){document.querySelectorAll("[data-counter]").forEach(e=>this.observer.observe(e))}animate(e,t,i){let a=Date.now(),r=()=>{let l=Date.now()-a,c=Math.min(l/1800,1),p=1-Math.pow(1-c,3),v=t*p;e.textContent=(Number.isInteger(t)?Math.round(v):parseFloat(v.toFixed(1)))+i,c<1&&requestAnimationFrame(r)};requestAnimationFrame(r)}};var B=class{constructor(e,t){this.model=e;this.view=t}init(){let e=this.view.getForm();e.addEventListener("submit",async t=>{t.preventDefault(),this.view.clearErrors();let i=new FormData(e);if(this.model.update("name",String(i.get("name")??"")),this.model.update("email",String(i.get("email")??"")),this.model.update("phone",String(i.get("phone")??"")),this.model.update("message",String(i.get("message")??"")),!this.model.validate()){this.model.errors.name&&this.view.showFieldError("name",this.model.errors.name),this.model.errors.email&&this.view.showFieldError("email",this.model.errors.email),this.model.errors.message&&this.view.showFieldError("msg",this.model.errors.message);return}this.view.setSending(!0),await this.model.submit(),this.view.setSending(!1),this.model.status==="sent"&&this.view.showSuccess()})}};var I=class{constructor(e,t){this.model=e;this.view=t}init(){let e=this.view.getInput(),t=this.view.getSubmitBtn(),i=this.view.getResetBtn();e.addEventListener("input",()=>{this.model.setId(e.value),e.value=this.model.id,this.view.clearError()}),e.addEventListener("keydown",s=>{s.key==="Enter"&&t.click()}),t.addEventListener("click",async()=>{if(this.view.clearError(),!this.model.validate()){this.view.showError(this.model.error);return}this.view.setValidating(!0),await this.model.activate(),this.view.setValidating(!1),this.model.status==="success"&&this.view.showSuccess(this.model.id)}),i.addEventListener("click",()=>{this.model.reset(),this.view.reset()})}};var se=()=>{let o=document.createElement("div");return o.className="section-divider",o},N=class{constructor(){this.appModel=m.getInstance();this.formModel=new h;this.deviceModel=new u;this.headerView=new g;this.heroView=new f;this.problemView=new w;this.solutionView=new y;this.howItWorksView=new x;this.ecosystemView=new M;this.benefitsView=new E;this.planView=new L;this.socialImpactView=new k;this.valuesView=new S;this.activateDeviceView=new A;this.contactView=new T;this.footerView=new b}init(){let e=document.getElementById("app");if(!e)throw new Error("#app element not found");e.appendChild(this.headerView.render());let t=document.createElement("main"),i=[this.heroView,this.problemView,this.solutionView,this.howItWorksView,this.ecosystemView,this.benefitsView,this.planView,this.socialImpactView,this.valuesView,this.activateDeviceView,this.contactView];i.forEach((a,r)=>{t.appendChild(a.render()),r<i.length-1&&t.appendChild(se())}),e.appendChild(t),e.appendChild(this.footerView.render()),this.heroView.getScrollButtons().forEach(a=>{a.addEventListener("click",()=>{let r=a.dataset.scroll;r&&document.querySelector(r)?.scrollIntoView({behavior:"smooth"})})}),this.planView.getCTA()?.addEventListener("click",()=>{document.querySelector("#contacto")?.scrollIntoView({behavior:"smooth"})}),new C(this.appModel,this.headerView,this.footerView).init(),new H().observe(),new V().observe(),new B(this.formModel,this.contactView).init(),new I(this.deviceModel,this.activateDeviceView).init(),requestAnimationFrame(()=>{let a=this.heroView.getCanvas();a&&new $(a).init()})}};document.addEventListener("DOMContentLoaded",()=>{new N().init()});})();
