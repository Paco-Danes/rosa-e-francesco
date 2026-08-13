/**
 * Validatore dei dati di gioco: scene, sprite, memorie.
 * Uso: npx tsx scripts/validate.ts
 */
import { SCENES } from '../src/game/maps/registry'
import { PALETTE, type PixelSprite } from '../src/game/art/format'
import { TILES } from '../src/game/art/tiles'
import { PROPS } from '../src/game/art/props'
import { CHARACTERS } from '../src/game/art/characters'
import { MEMORIES, type MemoryId } from '../src/content/memories'
import type { Scene } from '../src/game/maps/types'

let errors = 0
let warnings = 0
const err = (m: string) => {
  errors++
  console.error('  ✗', m)
}
const warn = (m: string) => {
  warnings++
  console.warn('  ⚠', m)
}

function checkSpriteChars(sp: PixelSprite, name: string) {
  for (const row of sp.px) {
    for (const ch of row) {
      if (ch === '.' || ch === ' ') continue
      if (!PALETTE[ch]) err(`${name}: carattere '${ch}' non in PALETTE`)
    }
  }
}

// ── arte condivisa ──
console.log('▸ arte condivisa')
for (const [k, t] of Object.entries(TILES)) {
  if (!t?.frames?.length) {
    err(`tile ${k}: nessun frame`)
    continue
  }
  t.frames.forEach((f, i) => {
    if (f.w !== 16 || f.h !== 16) warn(`tile ${k}[${i}]: ${f.w}×${f.h} (atteso 16×16)`)
    checkSpriteChars(f, `tile ${k}[${i}]`)
  })
}
for (const [k, p] of Object.entries(PROPS)) {
  if (!p?.sprite) {
    err(`prop ${k}: manca sprite`)
    continue
  }
  checkSpriteChars(p.sprite, `prop ${k}`)
  if (p.footprint.w < 1 || p.footprint.h < 1) err(`prop ${k}: footprint non valido`)
}
for (const [k, c] of Object.entries(CHARACTERS)) {
  for (const dir of ['down', 'up', 'left', 'right'] as const) {
    const frames = c?.[dir]
    if (!frames?.length) {
      err(`character ${k}.${dir}: nessun frame`)
      continue
    }
    frames.forEach((f, i) => checkSpriteChars(f, `character ${k}.${dir}[${i}]`))
  }
}

// ── scene ──
const seenMemoryIds = new Set<string>()

function validateScene(scene: Scene) {
  console.log(`▸ scena ${scene.id} (${scene.width}×${scene.height})`)
  const { width: W, height: H } = scene

  if (scene.ground.length !== H) err(`ground ha ${scene.ground.length} righe, attese ${H}`)
  scene.ground.forEach((row, y) => {
    if (row.length !== W) err(`ground riga ${y}: ${row.length} caratteri, attesi ${W}`)
    for (const ch of row) if (!scene.legend[ch]) err(`ground riga ${y}: carattere legend sconosciuto '${ch}'`)
  })
  for (const [ch, def] of Object.entries(scene.legend)) {
    if (!TILES[def.base]) err(`legend '${ch}': tile base sconosciuto '${def.base}'`)
  }

  // griglia di solidità
  const solid: boolean[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => {
      const d = scene.legend[scene.ground[y]?.[x] ?? '']
      return !d || !!d.solid
    })
  )
  const mark = (x: number, y: number, why: string) => {
    if (x < 0 || y < 0 || x >= W || y >= H) {
      warn(`${why}: tile solido fuori mappa (${x},${y})`)
      return
    }
    solid[y][x] = true
  }
  for (const b of scene.buildings) {
    checkSpriteChars(b.sprite, `${scene.id} building @(${b.x},${b.y})`)
    for (let dy = 0; dy < b.solid.h; dy++)
      for (let dx = 0; dx < b.solid.w; dx++) mark(b.x + b.solid.x + dx, b.y + b.solid.y + dy, `${scene.id} building`)
  }
  for (const p of scene.props) {
    const spec = PROPS[p.prop]
    if (!spec) {
      err(`prop sconosciuto '${p.prop}'`)
      continue
    }
    if (spec.solid)
      for (let dy = 0; dy < spec.footprint.h; dy++)
        for (let dx = 0; dx < spec.footprint.w; dx++) mark(p.x + dx, p.y - dy, `${scene.id} prop ${p.prop}`)
  }
  for (const s of scene.signs) {
    if ((s.kind ?? 'wood') !== 'none') mark(s.x, s.y, `${scene.id} sign`)
    if (s.memoryId) {
      if (!MEMORIES[s.memoryId as MemoryId]) err(`sign (${s.x},${s.y}): memoryId inesistente '${s.memoryId}'`)
      else seenMemoryIds.add(s.memoryId)
    }
  }
  const npcTiles = new Set(scene.npcs.map((n) => `${n.x},${n.y}`))

  // spawn e raggiungibilità (BFS; gli NPC non bloccano il BFS ma avvisiamo se coincidono)
  const inB = (x: number, y: number) => x >= 0 && y >= 0 && x < W && y < H
  if (!inB(scene.spawn.x, scene.spawn.y) || solid[scene.spawn.y][scene.spawn.x])
    err(`spawn (${scene.spawn.x},${scene.spawn.y}) non calpestabile`)
  if (npcTiles.has(`${scene.spawn.x},${scene.spawn.y}`)) err(`spawn coincide con un NPC`)

  const reach: boolean[][] = Array.from({ length: H }, () => Array(W).fill(false))
  const queue: Array<[number, number]> = []
  if (inB(scene.spawn.x, scene.spawn.y) && !solid[scene.spawn.y][scene.spawn.x]) {
    reach[scene.spawn.y][scene.spawn.x] = true
    queue.push([scene.spawn.x, scene.spawn.y])
  }
  while (queue.length) {
    const [x, y] = queue.shift()!
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = x + dx
      const ny = y + dy
      if (inB(nx, ny) && !solid[ny][nx] && !reach[ny][nx]) {
        reach[ny][nx] = true
        queue.push([nx, ny])
      }
    }
  }
  const adjReachable = (x: number, y: number) =>
    [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [0, 0],
    ].some(([dx, dy]) => inB(x + dx, y + dy) && reach[y + dy][x + dx])

  for (const s of scene.signs)
    if (!adjReachable(s.x, s.y)) err(`sign '${s.label ?? s.memoryId ?? '?'}' (${s.x},${s.y}) irraggiungibile`)
  for (const n of scene.npcs) if (!adjReachable(n.x, n.y)) warn(`npc ${n.character} (${n.x},${n.y}) irraggiungibile`)
  for (const e of scene.exits) {
    if (!SCENES[e.to]) {
      err(`exit → scena sconosciuta '${e.to}'`)
      continue
    }
    let ok = false
    for (let dy = 0; dy < e.h && !ok; dy++)
      for (let dx = 0; dx < e.w && !ok; dx++)
        if (inB(e.x + dx, e.y + dy) && reach[e.y + dy][e.x + dx]) ok = true
    if (!ok) err(`exit → ${e.to} (${e.x},${e.y} ${e.w}×${e.h}) irraggiungibile`)
  }
  if (scene.playerSprite && !CHARACTERS[scene.playerSprite]) err(`playerSprite sconosciuto '${scene.playerSprite}'`)
  for (const n of scene.npcs) {
    if (!CHARACTERS[n.character]) err(`npc character sconosciuto '${n.character}'`)
    if (n.custom) n.custom.forEach((f, i) => checkSpriteChars(f, `${scene.id} npc custom[${i}]`))
  }
}

for (const [key, scene] of Object.entries(SCENES)) {
  if (scene.id !== key) err(`registry '${key}' contiene scena con id '${scene.id}'`)
  validateScene(scene)
}

// ── copertura memorie ──
console.log('▸ copertura memorie')
for (const id of Object.keys(MEMORIES)) {
  if (!seenMemoryIds.has(id)) warn(`memoria '${id}' non collegata a nessun cartello`)
}

console.log(`\n${errors} errori, ${warnings} avvisi`)
process.exit(errors ? 1 : 0)
