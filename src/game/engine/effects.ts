/**
 * Effetti particellari di scena: fuochi d'artificio e petali di rosa.
 * Tutte le particelle vivono in pool preallocati: zero allocazioni per frame.
 */
import type { EffectDef } from '../maps/types'

const TILE = 16

export interface Fx {
  update(now: number, dt: number): void
  draw(
    ctx: CanvasRenderingContext2D,
    camX: number,
    camY: number,
    vw: number,
    vh: number,
    now: number,
  ): void
}

/* ── Fuochi d'artificio ─────────────────────────────────────────── */

const FW_COLORS = ['#ffd98f', '#f2b13c', '#ffb3c8', '#ffffff', '#ff9eb8']

interface Spark {
  active: boolean
  x: number
  y: number
  vx: number
  vy: number
  born: number
  ttl: number
  color: string
}

export class Fireworks implements Fx {
  private x: number
  private y: number
  private w: number
  private h: number
  private pool: Spark[]
  private rocket = { active: false, x: 0, y: 0, targetY: 0 }
  private next = -1

  constructor(def: EffectDef) {
    this.x = def.x * TILE
    this.y = def.y * TILE
    this.w = Math.max(1, def.w) * TILE
    this.h = Math.max(1, def.h) * TILE
    this.pool = []
    for (let i = 0; i < 160; i++) {
      this.pool.push({ active: false, x: 0, y: 0, vx: 0, vy: 0, born: 0, ttl: 1, color: '#fff' })
    }
  }

  update(now: number, dt: number) {
    const s = dt / 1000
    if (this.next < 0) this.next = now + 400 + Math.random() * 1200
    if (!this.rocket.active && now >= this.next) {
      this.rocket.active = true
      this.rocket.x = this.x + 8 + Math.random() * Math.max(1, this.w - 16)
      this.rocket.y = this.y + this.h
      this.rocket.targetY = this.y + Math.random() * this.h * 0.45
    }
    if (this.rocket.active) {
      this.rocket.y -= 150 * s
      if (this.rocket.y <= this.rocket.targetY) {
        this.rocket.active = false
        this.burst(now, this.rocket.x, this.rocket.y)
        this.next = now + 1200 + Math.random() * 1300
      }
    }
    for (const p of this.pool) {
      if (!p.active) continue
      if (now - p.born > p.ttl) {
        p.active = false
        continue
      }
      p.vy += 26 * s // gravità dolce
      p.x += p.vx * s
      p.y += p.vy * s
    }
  }

  private burst(now: number, bx: number, by: number) {
    const base = FW_COLORS[(Math.random() * FW_COLORS.length) | 0]
    const n = 25 + ((Math.random() * 16) | 0) // 25–40 scintille
    let spawned = 0
    for (const p of this.pool) {
      if (spawned >= n) break
      if (p.active) continue
      const ang = Math.random() * Math.PI * 2
      const spd = 18 + Math.random() * 46
      p.active = true
      p.x = bx
      p.y = by
      p.vx = Math.cos(ang) * spd
      p.vy = Math.sin(ang) * spd - 12
      p.born = now
      p.ttl = 800 + Math.random() * 700
      p.color = Math.random() < 0.72 ? base : '#ffffff'
      spawned++
    }
  }

  draw(ctx: CanvasRenderingContext2D, camX: number, camY: number, vw: number, vh: number, now: number) {
    if (this.rocket.active) {
      const rx = Math.round(this.rocket.x - camX)
      const ry = Math.round(this.rocket.y - camY)
      if (rx >= -2 && ry >= -10 && rx <= vw + 2 && ry <= vh + 10) {
        ctx.fillStyle = '#ffd98f'
        ctx.fillRect(rx, ry, 1, 3)
        ctx.globalAlpha = 0.45
        ctx.fillRect(rx, ry + 3, 1, 4)
        ctx.globalAlpha = 0.2
        ctx.fillRect(rx, ry + 7, 1, 3)
        ctx.globalAlpha = 1
      }
    }
    for (const p of this.pool) {
      if (!p.active) continue
      const px = Math.round(p.x - camX)
      const py = Math.round(p.y - camY)
      if (px < -2 || py < -2 || px > vw + 2 || py > vh + 2) continue
      const k = (now - p.born) / p.ttl
      ctx.globalAlpha = Math.max(0, 1 - k * k)
      ctx.fillStyle = p.color
      ctx.fillRect(px, py, 2, 2)
    }
    ctx.globalAlpha = 1
  }
}

/* ── Petali di rosa ─────────────────────────────────────────────── */

const PETAL_COLORS = ['#ffb3c8', '#ffd9e2', '#e86a92']

interface Petal {
  x0: number
  y: number
  speed: number
  phase: number
  amp: number
  ci: number
}

export class Petals implements Fx {
  private x: number
  private y: number
  private w: number
  private h: number
  private petals: Petal[]

  constructor(def: EffectDef) {
    this.x = def.x * TILE
    this.y = def.y * TILE
    this.w = Math.max(1, def.w) * TILE
    this.h = Math.max(1, def.h) * TILE
    const count = Math.min(42, Math.max(6, Math.round((def.w * def.h) / 5)))
    this.petals = []
    for (let i = 0; i < count; i++) {
      this.petals.push({
        x0: this.x + Math.random() * this.w,
        y: this.y + Math.random() * this.h,
        speed: 8 + Math.random() * 7,
        phase: Math.random() * Math.PI * 2,
        amp: 3 + Math.random() * 5,
        ci: (Math.random() * PETAL_COLORS.length) | 0,
      })
    }
  }

  update(_now: number, dt: number) {
    const s = dt / 1000
    for (const p of this.petals) {
      p.y += p.speed * s
      if (p.y > this.y + this.h) {
        p.y = this.y - 4 - Math.random() * 14
        p.x0 = this.x + Math.random() * this.w
        p.phase = Math.random() * Math.PI * 2
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, camX: number, camY: number, vw: number, vh: number, now: number) {
    for (const p of this.petals) {
      const sway = Math.sin(now / 1100 + p.phase)
      const px = Math.round(p.x0 + sway * p.amp - camX)
      const py = Math.round(p.y - camY)
      if (px < -2 || py < -2 || px > vw + 2 || py > vh + 2) continue
      ctx.globalAlpha = 0.9
      ctx.fillStyle = PETAL_COLORS[p.ci]
      // leggero "sfarfallio": il petalo si stringe quando cambia verso
      if (Math.abs(sway) > 0.55) ctx.fillRect(px, py, 2, 2)
      else ctx.fillRect(px, py, 2, 1)
    }
    ctx.globalAlpha = 1
  }
}
