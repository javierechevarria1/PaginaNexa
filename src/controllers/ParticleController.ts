interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number; alpha: number
  color: string
}

const COLORS = ['#00E5C3', '#00CFFF', '#00FFD5', 'rgba(0,207,255,0.6)']

export class ParticleController {
  private ctx: CanvasRenderingContext2D
  private particles: Particle[] = []
  private animId = 0

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!
  }

  init(): void {
    this.resize()
    window.addEventListener('resize', () => this.resize(), { passive: true })
    for (let i = 0; i < 120; i++) this.particles.push(this.spawn())
    this.loop()
  }

  destroy(): void {
    cancelAnimationFrame(this.animId)
  }

  private resize(): void {
    this.canvas.width  = this.canvas.offsetWidth
    this.canvas.height = this.canvas.offsetHeight
  }

  private spawn(): Particle {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }
  }

  private loop = (): void => {
    const { ctx, canvas, particles } = this
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.globalAlpha = p.alpha
      ctx.fill()

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j]
        const dx = p.x - q.x, dy = p.y - q.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(q.x, q.y)
          ctx.strokeStyle = '#00E5C3'
          ctx.globalAlpha = (1 - dist / 120) * 0.12
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
    ctx.globalAlpha = 1
    this.animId = requestAnimationFrame(this.loop)
  }
}
