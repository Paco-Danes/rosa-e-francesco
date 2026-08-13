/**
 * Motore di gioco — esplorazione top-down 2.5D a griglia in stile Pokémon
 * (epoca HGSS / Bianco&Nero): movimento tile-per-tile con svolta sul posto,
 * camera fluida clampata, ordinamento per la Y della base (si passa dietro
 * a edifici e alberi), ambienti (tramonto / notte con glow dei lampioni),
 * effetti particellari e transizioni con dissolvenza tra le scene.
 *
 * Dipende SOLO dai contratti (TILES / PROPS / CHARACTERS / SCENES) ed è
 * difensivo: ogni chiave sconosciuta viene segnalata una volta e saltata.
 */
import { decodeSprite } from '../art/format'
import type { PixelSprite } from '../art/format'
import { TILES } from '../art/tiles'
import { PROPS } from '../art/props'
import { CHARACTERS } from '../art/characters'
import type {
  CharacterKey,
  CharacterSet,
  PropKey,
  PropSpec,
  TileKey,
  TileSpec,
} from '../art/catalog'
import { SCENES } from '../maps/registry'
import type { Dir, ExitDef, NpcDef, Scene, SceneId } from '../maps/types'
import { Fireworks, Petals } from './effects'
import type { Fx } from './effects'
import type { EngineCallbacks } from './types'

const TILE = 16
const STEP_MS = 170 // durata di un passo del player
const BOAT_STEP_MS = 260 // la barchetta rema piano
const NPC_STEP_MS = 220
const TURN_MS = 80 // svolta sul posto prima di camminare
const TILE_ANIM_MS = 350
const NPC_ANIM_MS = 600
const FADE_MS = 250

const DIRS: Dir[] = ['up', 'down', 'left', 'right']
const DX: Record<Dir, number> = { up: 0, down: 0, left: -1, right: 1 }
const DY: Record<Dir, number> = { up: -1, down: 1, left: 0, right: 0 }
const OPPOSITE: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' }

const warned = new Set<string>()
function warnOnce(msg: string) {
  if (warned.has(msg)) return
  warned.add(msg)
  console.warn('[gioco]', msg)
}

function clampInt(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v
}

function keyDir(k: string): Dir | null {
  switch (k) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      return 'up'
    case 'ArrowDown':
    case 's':
    case 'S':
      return 'down'
    case 'ArrowLeft':
    case 'a':
    case 'A':
      return 'left'
    case 'ArrowRight':
    case 'd':
    case 'D':
      return 'right'
    default:
      return null
  }
}

/** Frame di camminata Pokémon: [1, 0, 2, 0] — passo nella prima metà. */
function walkFrame(frames: PixelSprite[], k: number, parity: boolean): PixelSprite {
  if (k < 0.5) {
    const i = parity ? 1 : 2
    const f = frames[i] ?? frames[i === 2 ? 1 : 0]
    return f ?? frames[0]
  }
  return frames[0]
}

interface Step {
  fx: number
  fy: number
  t0: number
  dur: number
}

interface NpcState {
  def: NpcDef
  x: number
  y: number
  dir: Dir
  step: Step | null
  parity: boolean
  nextWander: number
}

interface Entry {
  kind: 0 | 1 | 2 // 0 = statico, 1 = player, 2 = npc
  img: HTMLCanvasElement | null
  px: number
  py: number
  baseY: number
  npc: NpcState | null
}

const byBase = (a: Entry, b: Entry) => a.baseY - b.baseY

function makeGlow(): HTMLCanvasElement {
  const cv = document.createElement('canvas')
  cv.width = 96
  cv.height = 96
  const ctx = cv.getContext('2d')!
  const g = ctx.createRadialGradient(48, 48, 2, 48, 48, 46)
  g.addColorStop(0, 'rgba(255, 217, 143, 0.85)')
  g.addColorStop(0.35, 'rgba(255, 195, 110, 0.38)')
  g.addColorStop(1, 'rgba(255, 180, 90, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 96, 96)
  return cv
}

export class Engine {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private cb: EngineCallbacks
  private raf = 0
  private last = 0
  private vw = 320
  private vh = 240
  private scaleCss = 0

  private scene: Scene | null = null
  private tileFrames: (HTMLCanvasElement[] | null)[] = []
  private solid = new Uint8Array(0)
  private signBlock = new Uint8Array(0)
  private staticEntries: Entry[] = []
  private npcs: NpcState[] = []
  private npcEntries: Entry[] = []
  private playerEntry: Entry = { kind: 1, img: null, px: 0, py: 0, baseY: 0, npc: null }
  private drawList: Entry[] = []
  private lamps: { x: number; y: number }[] = []
  private fx: Fx[] = []
  private sunsetGrad: CanvasGradient | null = null
  private glow: HTMLCanvasElement | null = null

  private player = {
    x: 0,
    y: 0,
    dir: 'down' as Dir,
    step: null as Step | null,
    parity: false,
    turnT0: 0,
  }
  private playerChar: CharacterSet | null = null
  private isBoat = false
  private stepDur = STEP_MS

  private owReturn: { x: number; y: number; dir: Dir } | null = null
  private exitsArmed = true
  private fade: { mode: 'out' | 'in'; t0: number; exit?: ExitDef } | null = null

  private dirStack: Dir[] = []
  private virtualDir: Dir | null = null

  constructor(canvas: HTMLCanvasElement, cb: EngineCallbacks) {
    this.canvas = canvas
    this.cb = cb
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) throw new Error('canvas 2d non disponibile')
    this.ctx = ctx
    this.ctx.imageSmoothingEnabled = false
  }

  /* ── ciclo di vita ──────────────────────────────────────────── */

  start() {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
    window.addEventListener('blur', this.onBlur)
    this.loadScene('overworld')
    this.fade = { mode: 'in', t0: performance.now() }
    this.last = performance.now()
    this.raf = requestAnimationFrame(this.tick)
  }

  destroy() {
    cancelAnimationFrame(this.raf)
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
    window.removeEventListener('blur', this.onBlur)
  }

  setSize(w: number, h: number, scale: number) {
    if (w === this.vw && h === this.vh && scale === this.scaleCss) return
    this.vw = w
    this.vh = h
    this.scaleCss = scale
    this.canvas.width = w
    this.canvas.height = h
    this.canvas.style.width = `${w * scale}px`
    this.canvas.style.height = `${h * scale}px`
    this.ctx.imageSmoothingEnabled = false
    this.sunsetGrad = null
  }

  setVirtualDir(d: Dir | null) {
    this.virtualDir = d
  }

  /* ── input ──────────────────────────────────────────────────── */

  private onKeyDown = (e: KeyboardEvent) => {
    const d = keyDir(e.key)
    if (d) {
      e.preventDefault()
      if (!this.dirStack.includes(d)) this.dirStack.push(d)
      return
    }
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'e' || e.key === 'E') {
      e.preventDefault()
      if (!e.repeat) this.cb.onActionKey()
      return
    }
    if (e.key === 'Escape' && !e.repeat) this.cb.onEscape()
  }

  private onKeyUp = (e: KeyboardEvent) => {
    const d = keyDir(e.key)
    if (!d) return
    const i = this.dirStack.indexOf(d)
    if (i >= 0) this.dirStack.splice(i, 1)
  }

  private onBlur = () => {
    this.dirStack.length = 0
    this.virtualDir = null
  }

  private activeDir(): Dir | null {
    return this.virtualDir ?? this.dirStack[this.dirStack.length - 1] ?? null
  }

  /* ── caricamento scena ──────────────────────────────────────── */

  private loadScene(id: SceneId, spawn?: { x: number; y: number; dir: Dir }) {
    const scene = (SCENES as Partial<Record<SceneId, Scene>>)[id]
    if (!scene) {
      warnOnce(`scena sconosciuta: '${id}'`)
      return
    }
    this.scene = scene
    const w = scene.width
    const h = scene.height
    this.solid = new Uint8Array(w * h)
    this.signBlock = new Uint8Array(w * h)
    this.tileFrames = new Array<HTMLCanvasElement[] | null>(w * h).fill(null)

    // terreno + collisioni della legend
    for (let y = 0; y < h; y++) {
      const row = scene.ground[y] ?? ''
      for (let x = 0; x < w; x++) {
        const ch = row[x]
        if (ch === undefined) continue
        const def = scene.legend[ch]
        if (!def) {
          warnOnce(`[${id}] carattere di legend sconosciuto: '${ch}'`)
          continue
        }
        const i = y * w + x
        const spec = (TILES as Partial<Record<TileKey, TileSpec>>)[def.base]
        if (!spec || !spec.frames || spec.frames.length === 0) {
          warnOnce(`[${id}] tile sconosciuto: '${def.base}'`)
        } else {
          this.tileFrames[i] = spec.frames.map(decodeSprite)
        }
        if (def.solid) this.solid[i] = 1
      }
    }

    // edifici (rettangolo solido relativo, tetto attraversabile)
    this.staticEntries.length = 0
    this.lamps.length = 0
    for (const b of scene.buildings ?? []) {
      const img = decodeSprite(b.sprite)
      this.staticEntries.push({
        kind: 0,
        img,
        px: b.x * TILE,
        py: b.y * TILE,
        baseY: b.y * TILE + img.height,
        npc: null,
      })
      const r = b.solid
      for (let ty = b.y + r.y; ty < b.y + r.y + r.h; ty++) {
        for (let tx = b.x + r.x; tx < b.x + r.x + r.w; tx++) {
          if (tx >= 0 && ty >= 0 && tx < w && ty < h) this.solid[ty * w + tx] = 1
        }
      }
    }

    // props (footprint ancorato in basso a sinistra)
    for (const p of scene.props ?? []) {
      const spec = (PROPS as Partial<Record<PropKey, PropSpec>>)[p.prop]
      if (!spec) {
        warnOnce(`[${id}] prop sconosciuto: '${p.prop}'`)
        continue
      }
      const img = decodeSprite(spec.sprite)
      const py = (p.y + 1) * TILE - img.height
      this.staticEntries.push({
        kind: 0,
        img,
        px: p.x * TILE,
        py,
        baseY: (p.y + 1) * TILE,
        npc: null,
      })
      if (spec.solid) {
        const f = spec.footprint
        for (let ty = p.y - f.h + 1; ty <= p.y; ty++) {
          for (let tx = p.x; tx < p.x + f.w; tx++) {
            if (tx >= 0 && ty >= 0 && tx < w && ty < h) this.solid[ty * w + tx] = 1
          }
        }
      }
      if (p.prop === 'lamp') this.lamps.push({ x: p.x * TILE + 8, y: py + 8 })
    }

    // cartelli
    const signSpec = (PROPS as Partial<Record<PropKey, PropSpec>>)['sign']
    for (const s of scene.signs ?? []) {
      const inside = s.x >= 0 && s.y >= 0 && s.x < w && s.y < h
      if (inside) this.signBlock[s.y * w + s.x] = 1
      if ((s.kind ?? 'wood') === 'none') continue
      if (inside) this.solid[s.y * w + s.x] = 1
      if (signSpec) {
        const img = decodeSprite(signSpec.sprite)
        this.staticEntries.push({
          kind: 0,
          img,
          px: s.x * TILE,
          py: (s.y + 1) * TILE - img.height,
          baseY: (s.y + 1) * TILE,
          npc: null,
        })
      } else {
        warnOnce(`[${id}] prop 'sign' mancante nel catalogo`)
      }
    }

    // npc
    this.npcs.length = 0
    this.npcEntries.length = 0
    const now = performance.now()
    for (const nd of scene.npcs ?? []) {
      const hasCustom = !!nd.custom && nd.custom.length > 0
      const set = (CHARACTERS as Partial<Record<CharacterKey, CharacterSet>>)[nd.character]
      if (!hasCustom && !set) {
        warnOnce(`[${id}] personaggio sconosciuto: '${nd.character}'`)
        continue
      }
      const st: NpcState = {
        def: nd,
        x: nd.x,
        y: nd.y,
        dir: nd.dir ?? 'down',
        step: null,
        parity: false,
        nextWander: now + 1500 + Math.random() * 2000,
      }
      this.npcs.push(st)
      this.npcEntries.push({ kind: 2, img: null, px: 0, py: 0, baseY: 0, npc: st })
    }

    // sprite del player (override di scena, es. 'boat' sul Danubio)
    const charKey: CharacterKey = scene.playerSprite ?? 'rosa'
    let set = (CHARACTERS as Partial<Record<CharacterKey, CharacterSet>>)[charKey]
    if (!set) {
      warnOnce(`[${id}] playerSprite sconosciuto: '${charKey}'`)
      set = (CHARACTERS as Partial<Record<CharacterKey, CharacterSet>>)['rosa']
    }
    this.playerChar = set ?? null
    this.isBoat = charKey === 'boat'
    this.stepDur = this.isBoat ? BOAT_STEP_MS : STEP_MS

    // effetti
    this.fx.length = 0
    for (const e of scene.effects ?? []) {
      if (e.type === 'fireworks') this.fx.push(new Fireworks(e))
      else if (e.type === 'petals') this.fx.push(new Petals(e))
      else warnOnce(`[${id}] effetto sconosciuto: '${(e as { type: string }).type}'`)
    }

    // spawn
    const sp = spawn ?? scene.spawn
    const px = clampInt(sp.x, 0, w - 1)
    const py = clampInt(sp.y, 0, h - 1)
    this.player.x = px
    this.player.y = py
    this.player.dir = sp.dir
    this.player.step = null
    this.player.parity = false
    this.player.turnT0 = 0
    // se si nasce dentro un'uscita (ritorno all'overworld) non ritriggerarla
    this.exitsArmed = !this.exitAt(px, py)
    this.sunsetGrad = null
    this.cb.onBanner(scene.name)
  }

  private exitAt(x: number, y: number): ExitDef | null {
    const s = this.scene
    if (!s) return null
    for (const e of s.exits ?? []) {
      if (x >= e.x && x < e.x + e.w && y >= e.y && y < e.y + e.h) return e
    }
    return null
  }

  /* ── collisioni ─────────────────────────────────────────────── */

  private freeForPlayer(x: number, y: number): boolean {
    const s = this.scene
    if (!s) return false
    if (x < 0 || y < 0 || x >= s.width || y >= s.height) return false
    if (this.solid[y * s.width + x]) return false
    for (const n of this.npcs) {
      if (n.x === x && n.y === y) return false
      if (n.step && n.step.fx === x && n.step.fy === y) return false
    }
    return true
  }

  private freeForNpc(self: NpcState, x: number, y: number): boolean {
    const s = this.scene
    if (!s) return false
    if (x < 0 || y < 0 || x >= s.width || y >= s.height) return false
    const i = y * s.width + x
    if (this.solid[i] || this.signBlock[i]) return false
    if (this.exitAt(x, y)) return false
    const p = this.player
    if (p.x === x && p.y === y) return false
    if (p.step && p.step.fx === x && p.step.fy === y) return false
    for (const n of this.npcs) {
      if (n === self) continue
      if (n.x === x && n.y === y) return false
      if (n.step && n.step.fx === x && n.step.fy === y) return false
    }
    return true
  }

  /* ── interazione ────────────────────────────────────────────── */

  interact() {
    const s = this.scene
    if (!s || this.fade) return
    const p = this.player
    const tx = p.x + DX[p.dir]
    const ty = p.y + DY[p.dir]
    for (const sg of s.signs ?? []) {
      if (sg.x !== tx || sg.y !== ty) continue
      const lines = sg.lines ?? []
      if (lines.length > 0 || sg.memoryId) {
        this.cb.onDialog({ label: sg.label, lines, memoryId: sg.memoryId })
      }
      return
    }
    for (const n of this.npcs) {
      if (n.x !== tx || n.y !== ty || n.step) continue
      n.dir = OPPOSITE[p.dir] // si gira verso il player
      n.nextWander = performance.now() + 4000
      const lines = n.def.lines ?? []
      if (lines.length > 0) this.cb.onDialog({ label: n.def.label, lines })
      return
    }
  }

  /* ── update ─────────────────────────────────────────────────── */

  private tick = (now: number) => {
    const dt = Math.min(50, now - this.last)
    this.last = now
    this.update(now, dt)
    this.draw(now)
    this.raf = requestAnimationFrame(this.tick)
  }

  private update(now: number, dt: number) {
    if (!this.scene) return
    const locked = this.cb.isLocked()

    // dissolvenza / cambio scena
    if (this.fade) {
      const t = now - this.fade.t0
      if (this.fade.mode === 'out' && t >= FADE_MS) {
        const exit = this.fade.exit
        if (exit) {
          if (this.scene.id === 'overworld') {
            this.owReturn = { x: this.player.x, y: this.player.y, dir: this.player.dir }
          }
          const spawn = exit.to === 'overworld' ? (this.owReturn ?? exit.spawn) : exit.spawn
          this.loadScene(exit.to, spawn)
        }
        this.fade = { mode: 'in', t0: now }
      } else if (this.fade.mode === 'in' && t >= FADE_MS) {
        this.fade = null
      }
    }

    // passo del player in corso
    const p = this.player
    if (p.step && now - p.step.t0 >= p.step.dur) {
      const over = Math.min(now - p.step.t0 - p.step.dur, 40)
      p.step = null
      this.afterStep(now, over, locked)
    }
    if (!locked && (!this.fade || this.fade.mode === 'in')) this.handleMove(now)

    // npc: fine passo + passeggiata casuale
    for (const n of this.npcs) {
      if (n.step && now - n.step.t0 >= n.step.dur) n.step = null
      if (locked || this.fade || !n.def.wander || n.step) continue
      if (now < n.nextWander) continue
      n.nextWander = now + 1500 + Math.random() * 2000
      const d = DIRS[(Math.random() * 4) | 0]
      n.dir = d
      const nx = n.x + DX[d]
      const ny = n.y + DY[d]
      if (this.freeForNpc(n, nx, ny)) {
        n.step = { fx: n.x, fy: n.y, t0: now, dur: NPC_STEP_MS }
        n.x = nx
        n.y = ny
        n.parity = !n.parity
      }
    }

    for (const f of this.fx) f.update(now, dt)
  }

  private handleMove(now: number) {
    const p = this.player
    if (p.step) return
    const d = this.activeDir()
    if (!d) return
    if (d !== p.dir) {
      // prima ci si GIRA sul posto, senza muoversi
      p.dir = d
      p.turnT0 = now
      return
    }
    if (now - p.turnT0 < TURN_MS) return
    this.tryStep(now, 0)
  }

  private tryStep(now: number, over: number) {
    const p = this.player
    const nx = p.x + DX[p.dir]
    const ny = p.y + DY[p.dir]
    if (!this.freeForPlayer(nx, ny)) return
    p.step = { fx: p.x, fy: p.y, t0: now - over, dur: this.stepDur }
    p.x = nx
    p.y = ny
    p.parity = !p.parity
  }

  private afterStep(now: number, over: number, locked: boolean) {
    const p = this.player
    const ex = this.exitAt(p.x, p.y)
    if (ex) {
      if (this.exitsArmed && !this.fade) {
        this.fade = { mode: 'out', t0: now, exit: ex }
        return
      }
    } else {
      this.exitsArmed = true
    }
    if (locked || this.fade) return
    const d = this.activeDir()
    if (d && d === p.dir) this.tryStep(now, over) // passo concatenato, fluido
  }

  /* ── frame dei personaggi ───────────────────────────────────── */

  private playerFrame(now: number): PixelSprite | null {
    const set = this.playerChar
    if (!set) return null
    const frames = set[this.player.dir] ?? set.down
    if (!frames || frames.length === 0) return null
    if (this.isBoat) return frames[((now / TILE_ANIM_MS) | 0) % frames.length]
    const st = this.player.step
    if (st) return walkFrame(frames, (now - st.t0) / st.dur, this.player.parity)
    return frames[0]
  }

  private npcFrame(n: NpcState, now: number): PixelSprite | null {
    const custom = n.def.custom
    if (custom && custom.length > 0) return custom[((now / NPC_ANIM_MS) | 0) % custom.length]
    const set = (CHARACTERS as Partial<Record<CharacterKey, CharacterSet>>)[n.def.character]
    if (!set) return null
    const frames = set[n.dir] ?? set.down
    if (!frames || frames.length === 0) return null
    if (n.step) return walkFrame(frames, (now - n.step.t0) / n.step.dur, n.parity)
    return frames[0]
  }

  /* ── render ─────────────────────────────────────────────────── */

  private draw(now: number) {
    const ctx = this.ctx
    const s = this.scene
    ctx.fillStyle = '#0d0a18'
    ctx.fillRect(0, 0, this.vw, this.vh)
    if (!s) return

    // posizione pixel del player (interpolata durante il passo)
    const p = this.player
    let px: number
    let py: number
    if (p.step) {
      const k = Math.min(1, (now - p.step.t0) / p.step.dur)
      px = (p.step.fx + (p.x - p.step.fx) * k) * TILE
      py = (p.step.fy + (p.y - p.step.fy) * k) * TILE
    } else {
      px = p.x * TILE
      py = p.y * TILE
    }

    // camera centrata e clampata (mappe piccole: centrate)
    const mapW = s.width * TILE
    const mapH = s.height * TILE
    let camX = Math.round(px + TILE / 2 - this.vw / 2)
    let camY = Math.round(py + TILE / 2 - this.vh / 2)
    camX = mapW <= this.vw ? -((this.vw - mapW) >> 1) : clampInt(camX, 0, mapW - this.vw)
    camY = mapH <= this.vh ? -((this.vh - mapH) >> 1) : clampInt(camY, 0, mapH - this.vh)

    // terreno (solo i tile visibili, animazione ~350 ms)
    const tf = (now / TILE_ANIM_MS) | 0
    const x0 = Math.max(0, (camX / TILE) | 0)
    const y0 = Math.max(0, (camY / TILE) | 0)
    const x1 = Math.min(s.width - 1, Math.floor((camX + this.vw - 1) / TILE))
    const y1 = Math.min(s.height - 1, Math.floor((camY + this.vh - 1) / TILE))
    for (let ty = y0; ty <= y1; ty++) {
      const rowOff = ty * s.width
      const dy = ty * TILE - camY
      for (let tx = x0; tx <= x1; tx++) {
        const frames = this.tileFrames[rowOff + tx]
        if (!frames) continue
        const img = frames.length === 1 ? frames[0] : frames[tf % frames.length]
        ctx.drawImage(img, tx * TILE - camX, dy)
      }
    }

    // lista di disegno ordinata per la Y della base (2.5D)
    const list = this.drawList
    list.length = 0
    for (const e of this.staticEntries) {
      const img = e.img
      if (!img) continue
      if (
        e.px + img.width > camX &&
        e.px < camX + this.vw &&
        e.py + img.height > camY &&
        e.py < camY + this.vh
      ) {
        list.push(e)
      }
    }
    for (const e of this.npcEntries) {
      const n = e.npc
      if (!n) continue
      if (n.step) {
        const k = Math.min(1, (now - n.step.t0) / n.step.dur)
        e.px = (n.step.fx + (n.x - n.step.fx) * k) * TILE
        e.py = (n.step.fy + (n.y - n.step.fy) * k) * TILE
      } else {
        e.px = n.x * TILE
        e.py = n.y * TILE
      }
      e.baseY = e.py + TILE + 0.5
      if (
        e.px + TILE > camX - 8 &&
        e.px < camX + this.vw + 8 &&
        e.py + TILE > camY - 16 &&
        e.py < camY + this.vh + 16
      ) {
        list.push(e)
      }
    }
    const pe = this.playerEntry
    pe.px = px
    pe.py = py
    pe.baseY = py + TILE + 0.5
    list.push(pe)
    list.sort(byBase)

    for (const e of list) {
      if (e.kind === 0) {
        ctx.drawImage(e.img!, e.px - camX, e.py - camY)
        continue
      }
      const sp = e.kind === 1 ? this.playerFrame(now) : this.npcFrame(e.npc!, now)
      if (!sp) continue
      const img = decodeSprite(sp)
      let top = e.py + TILE - img.height
      if (e.kind === 1 && this.isBoat) top += Math.round(Math.sin(now / 300) * 1.5) // galleggiamento
      ctx.drawImage(
        img,
        Math.round(e.px - camX + (TILE - img.width) / 2),
        Math.round(top - camY),
      )
    }

    this.drawAmbience(ctx, camX, camY, now)
    for (const f of this.fx) f.draw(ctx, camX, camY, this.vw, this.vh, now)

    // dissolvenza di transizione
    if (this.fade) {
      const t = (now - this.fade.t0) / FADE_MS
      const a = this.fade.mode === 'out' ? Math.min(1, t) : Math.max(0, 1 - t)
      if (a > 0) {
        ctx.globalAlpha = a
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, this.vw, this.vh)
        ctx.globalAlpha = 1
      }
    }
  }

  private drawAmbience(ctx: CanvasRenderingContext2D, camX: number, camY: number, now: number) {
    const s = this.scene
    if (!s) return
    const amb = s.ambience ?? 'day'
    if (amb === 'sunset') {
      ctx.fillStyle = 'rgba(255, 122, 92, 0.16)'
      ctx.fillRect(0, 0, this.vw, this.vh)
      if (!this.sunsetGrad) {
        const g = ctx.createLinearGradient(0, 0, 0, this.vh * 0.45)
        g.addColorStop(0, 'rgba(255, 176, 138, 0.32)')
        g.addColorStop(1, 'rgba(255, 176, 138, 0)')
        this.sunsetGrad = g
      }
      ctx.fillStyle = this.sunsetGrad
      ctx.fillRect(0, 0, this.vw, this.vh * 0.45)
    } else if (amb === 'night') {
      ctx.fillStyle = 'rgba(10, 15, 60, 0.35)'
      ctx.fillRect(0, 0, this.vw, this.vh)
      if (this.lamps.length > 0) {
        if (!this.glow) this.glow = makeGlow()
        const g = this.glow
        ctx.globalCompositeOperation = 'screen'
        for (let i = 0; i < this.lamps.length; i++) {
          const l = this.lamps[i]
          const gx = l.x - camX
          const gy = l.y - camY
          if (gx < -56 || gy < -56 || gx > this.vw + 56 || gy > this.vh + 56) continue
          ctx.globalAlpha = 0.5 + 0.07 * Math.sin(now / 260 + i * 1.7)
          ctx.drawImage(g, gx - g.width / 2, gy - g.height / 2)
        }
        ctx.globalAlpha = 1
        ctx.globalCompositeOperation = 'source-over'
      }
    }
  }
}
