// Cielo notturno su canvas: stelle che brillano su 3 profondità con lenta
// deriva parallasse, stelle cadenti (automatiche e al click), polvere di
// stelle dietro al cursore. Tutto rAF, zero layout thrash.
import { useEffect, useRef } from 'react'

const STAR_COLORS = ['#ffffff', '#ffffff', '#ffffff', '#fff4dc', '#ffd98f', '#ff9eb8', '#cdd6ff']

interface Star {
  x: number
  y: number
  r: number
  depth: number
  base: number
  amp: number
  phase: number
  tw: number
  color: string
}

interface Meteor {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
}

interface Dust {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
  r: number
  color: string
}

export default function StarrySky() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let dpr = 1
    let stars: Star[] = []
    const meteors: Meteor[] = []
    const dust: Dust[] = []
    let raf = 0
    let last = performance.now()
    let nextMeteor = 3.5 + Math.random() * 5

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      const count = Math.round(Math.min(240, Math.max(160, (w * h) / 5800)))
      stars = []
      for (let i = 0; i < count; i++) {
        const depth = i % 3
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: (0.45 + Math.random() * 0.8) * (1 + depth * 0.5),
          depth,
          base: 0.22 + Math.random() * 0.45,
          amp: 0.14 + Math.random() * 0.34,
          phase: Math.random() * Math.PI * 2,
          tw: 0.35 + Math.random() * 1.35,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        })
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const spawnMeteor = (x?: number, y?: number) => {
      const dir = Math.random() < 0.5 ? 1 : -1
      const speed = 420 + Math.random() * 260
      const ang = (Math.PI / 180) * (26 + Math.random() * 20)
      meteors.push({
        x: x ?? Math.random() * w,
        y: y ?? Math.random() * h * 0.45,
        vx: Math.cos(ang) * speed * dir,
        vy: Math.sin(ang) * speed,
        life: 0,
        max: 0.65 + Math.random() * 0.5,
      })
    }

    const onClick = (e: MouseEvent) => {
      if (!reduced) spawnMeteor(e.clientX, e.clientY)
    }

    let lastDust = 0
    const onMove = (e: PointerEvent) => {
      if (reduced) return
      const t = performance.now()
      if (t - lastDust < 22) return
      lastDust = t
      for (let i = 0; i < 2; i++) {
        const a = Math.random() * Math.PI * 2
        const s = 5 + Math.random() * 24
        dust.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s - 10,
          life: 0,
          max: 0.4 + Math.random() * 0.5,
          r: 0.6 + Math.random() * 1.2,
          color: Math.random() < 0.45 ? '#ffd98f' : Math.random() < 0.5 ? '#ff9eb8' : '#ffffff',
        })
      }
      if (dust.length > 240) dust.splice(0, dust.length - 240)
    }
    window.addEventListener('click', onClick)
    window.addEventListener('pointermove', onMove)

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      let dt = (now - last) / 1000
      last = now
      if (dt > 0.05) dt = 0.05

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const t = now / 1000
      const twSpeed = reduced ? 0.3 : 1

      // stelle
      for (const s of stars) {
        if (!reduced) {
          s.x += (1.8 + s.depth * 2.4) * dt
          s.y -= (0.35 + s.depth * 0.45) * dt
          if (s.x > w + 4) s.x = -4
          if (s.y < -4) s.y = h + 4
        }
        const a = s.base + s.amp * Math.sin(s.phase + t * s.tw * twSpeed)
        ctx.globalAlpha = Math.max(0.04, a)
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
        // scintilla a croce sulle stelle più vicine, al picco di luce
        if (s.depth === 2 && a > 0.58) {
          ctx.globalAlpha = (a - 0.58) * 0.55
          ctx.fillRect(s.x - s.r * 3, s.y - 0.5, s.r * 6, 1)
          ctx.fillRect(s.x - 0.5, s.y - s.r * 3, 1, s.r * 6)
        }
      }

      if (!reduced) {
        // stelle cadenti
        nextMeteor -= dt
        if (nextMeteor <= 0) {
          spawnMeteor()
          nextMeteor = 8 + Math.random() * 7
        }
        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i]
          m.life += dt
          m.x += m.vx * dt
          m.y += m.vy * dt
          const k = m.life / m.max
          if (k >= 1 || m.x < -80 || m.x > w + 80 || m.y > h + 80) {
            meteors.splice(i, 1)
            continue
          }
          const fade = k < 0.15 ? k / 0.15 : 1 - (k - 0.15) / 0.85
          const tail = 0.16
          const g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * tail, m.y - m.vy * tail)
          g.addColorStop(0, `rgba(255, 246, 220, ${0.92 * fade})`)
          g.addColorStop(1, 'rgba(255, 217, 143, 0)')
          ctx.globalAlpha = 1
          ctx.strokeStyle = g
          ctx.lineWidth = 1.6
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(m.x, m.y)
          ctx.lineTo(m.x - m.vx * tail, m.y - m.vy * tail)
          ctx.stroke()
          ctx.globalAlpha = 0.95 * fade
          ctx.fillStyle = '#fff8e6'
          ctx.beginPath()
          ctx.arc(m.x, m.y, 1.7, 0, Math.PI * 2)
          ctx.fill()
        }

        // polvere di stelle del cursore
        for (let i = dust.length - 1; i >= 0; i--) {
          const d = dust[i]
          d.life += dt
          if (d.life >= d.max) {
            dust.splice(i, 1)
            continue
          }
          d.x += d.vx * dt
          d.y += d.vy * dt
          d.vx *= 0.96
          d.vy = d.vy * 0.96 - 5 * dt
          const k = 1 - d.life / d.max
          ctx.globalAlpha = 0.7 * k
          ctx.fillStyle = d.color
          ctx.beginPath()
          ctx.arc(d.x, d.y, d.r * k + 0.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', onClick)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} className="sky-canvas" aria-hidden="true" />
}
