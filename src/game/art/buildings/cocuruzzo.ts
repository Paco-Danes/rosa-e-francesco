/**
 * COCURUZZO — edifici del borgo in festa (notte).
 *
 * Stile HGSS: facciate frontali in pietra calda, tetti inclinati verso chi
 * guarda, finestre accese (y) per la sera della festa. La chiesetta col
 * campanile è il cuore della scena: portale spalancato di luce dorata,
 * rosone acceso, campana d'oro, festoni di lucine sulla facciata.
 */
import { sprite } from '../format'
import type { PixelSprite } from '../format'

/** n puntini trasparenti */
const D = (n: number) => '.'.repeat(n)

/** sovrappone `patch` a `base` alla colonna `at` (solo caratteri opachi) */
function lay(base: string, at: number, patch: string): string {
  return base.slice(0, at) + patch + base.slice(at + patch.length)
}

/** muratura in pietra chiara: corsi orizzontali C, giunti sfalsati, sassi n */
function brick(w: number, row: number): string {
  if (row % 4 === 3) return 'C'.repeat(w)
  const off = (Math.floor(row / 4) % 2) * 4
  let s = ''
  for (let i = 0; i < w; i++) {
    if ((i + off) % 8 === 7) s += 'C'
    else if ((i * 7 + row * 13) % 47 === 0) s += 'n'
    else s += 'c'
  }
  return s
}

/** muratura in pietra scura (casa più antica) */
function brickDark(w: number, row: number): string {
  if (row % 4 === 3) return 'n'.repeat(w)
  const off = (Math.floor(row / 4) % 2) * 4
  let s = ''
  for (let i = 0; i < w; i++) {
    if ((i + off) % 8 === 7) s += 'n'
    else if ((i * 5 + row * 11) % 41 === 0) s += 'N'
    else s += 'C'
  }
  return s
}

/** intonaco crema con qualche macchia calda */
function plaster(w: number, row: number): string {
  let s = ''
  for (let i = 0; i < w; i++) s += (i * 11 + row * 7) % 43 === 0 ? 's' : 'W'
  return s
}

/**
 * Tetto a falda verso l'osservatore, 18 righe (0-17), trapezio che si
 * allarga scendendo. Colmo K, tegole `hi` con tacche `lo`, gronda in ombra.
 */
function houseRoof(width: number, hi: string, lo: string): string[] {
  const offs = [6, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 0, 0]
  const rows: string[] = [D(offs[0]) + 'K'.repeat(width - offs[0] * 2) + D(offs[0])]
  for (let i = 1; i < 17; i++) {
    const o = offs[i]
    const inner = width - o * 2 - 2
    let s = ''
    for (let j = 0; j < inner; j++) {
      if (i >= 14) s += lo
      else if (i % 3 === 0) s += lo
      else s += (j + i * 2) % 6 === 5 ? lo : hi
    }
    rows.push(D(o) + 'K' + s + 'K' + D(o))
  }
  rows.push('K'.repeat(width))
  return rows
}

// ─────────────────────────────────────────────────────────────────────────
// CASA DI PIETRA 1 — 48×48, tetto rosso, tende rosa alle finestre accese
// ─────────────────────────────────────────────────────────────────────────

function facciata1(): string[] {
  const rows: string[] = []
  for (let i = 18; i < 48; i++) {
    let r: string
    if (i === 18) r = 'K' + 'N'.repeat(46) + 'K'
    else if (i === 19) r = 'K' + 'C'.repeat(46) + 'K'
    else if (i === 45) r = 'K' + 'n'.repeat(46) + 'K'
    else if (i === 46) r = 'K' + 'N'.repeat(46) + 'K'
    else if (i === 47) r = 'K'.repeat(48)
    else r = 'K' + brick(46, i) + 'K'
    // finestre accese con tendine
    if (i === 22) {
      r = lay(r, 6, 'KKKKKK')
      r = lay(r, 36, 'KKKKKK')
    }
    if (i === 23 || i === 31) {
      r = lay(r, 5, 'KyyyyyyK')
      r = lay(r, 35, 'KyyyyyyK')
    }
    if (i >= 24 && i <= 30) {
      r = lay(r, 5, 'KqyyyyqK')
      r = lay(r, 35, 'KqyyyyqK')
    }
    if (i === 32) {
      r = lay(r, 5, 'KKKKKKKK')
      r = lay(r, 35, 'KKKKKKKK')
    }
    if (i === 33) {
      r = lay(r, 5, 'uuuuuuuu')
      r = lay(r, 35, 'uuuuuuuu')
    }
    // porta di legno con sopraluce acceso
    if (i === 22) r = lay(r, 20, 'KKKKKKKK')
    if (i >= 23 && i <= 25) r = lay(r, 19, 'KyyyyyyyyK')
    if (i === 26) r = lay(r, 19, 'KKKKKKKKKK')
    if (i >= 27 && i <= 45) r = lay(r, 19, 'KuuUuuUuuK')
    if (i === 35 || i === 36) r = lay(r, 26, 'Y')
    if (i === 46) r = lay(r, 19, 'KKKKKKKKKK')
    // lanternina accanto alla porta
    if (i === 24) r = lay(r, 31, 'K')
    if (i === 25) r = lay(r, 31, 'y')
    if (i === 26) r = lay(r, 31, 'Y')
    rows.push(r)
  }
  return rows
}

export const casaPietra1 = sprite([...houseRoof(48, 'r', 'R'), ...facciata1()])

// ─────────────────────────────────────────────────────────────────────────
// CASA DI PIETRA 2 — 64×48, intonaco crema, tetto arancio, fioriere rosa
// ─────────────────────────────────────────────────────────────────────────

function facciata2(): string[] {
  const rows: string[] = []
  for (let i = 18; i < 48; i++) {
    let r: string
    if (i === 18) r = 'K' + 'N'.repeat(62) + 'K'
    else if (i === 19) r = 'K' + 'C'.repeat(62) + 'K'
    else if (i === 45) r = 'K' + 'n'.repeat(62) + 'K'
    else if (i === 46) r = 'K' + 'N'.repeat(62) + 'K'
    else if (i === 47) r = 'K'.repeat(64)
    else r = 'K' + 'C' + plaster(60, i) + 'C' + 'K'
    // due finestre larghe con tendine e fioriere
    if (i === 22) {
      r = lay(r, 8, 'KKKKKKKK')
      r = lay(r, 48, 'KKKKKKKK')
    }
    if (i === 23 || i === 31) {
      r = lay(r, 7, 'KyyyyyyyyK')
      r = lay(r, 47, 'KyyyyyyyyK')
    }
    if (i >= 24 && i <= 30) {
      r = lay(r, 7, 'KqyyyyyyqK')
      r = lay(r, 47, 'KqyyyyyyqK')
    }
    if (i === 32) {
      r = lay(r, 7, 'KKKKKKKKKK')
      r = lay(r, 47, 'KKKKKKKKKK')
    }
    if (i === 33) {
      r = lay(r, 7, 'pPpPPpPPpP')
      r = lay(r, 47, 'PpPPpPPpPp')
    }
    if (i === 34) {
      r = lay(r, 7, 'uuuuuuuuuu')
      r = lay(r, 47, 'uuuuuuuuuu')
    }
    // porta centrale
    if (i === 22) r = lay(r, 28, 'KKKKKKKK')
    if (i >= 23 && i <= 25) r = lay(r, 27, 'KyyyyyyyyK')
    if (i === 26) r = lay(r, 27, 'KKKKKKKKKK')
    if (i >= 27 && i <= 45) r = lay(r, 27, 'KuUuuUuuUK')
    if (i === 35 || i === 36) r = lay(r, 34, 'Y')
    if (i === 46) r = lay(r, 27, 'KKKKKKKKKK')
    // due lanternine
    if (i === 24) {
      r = lay(r, 24, 'K')
      r = lay(r, 39, 'K')
    }
    if (i === 25) {
      r = lay(r, 24, 'y')
      r = lay(r, 39, 'y')
    }
    if (i === 26) {
      r = lay(r, 24, 'Y')
      r = lay(r, 39, 'Y')
    }
    rows.push(r)
  }
  return rows
}

export const casaPietra2 = sprite([...houseRoof(64, 'o', 'O'), ...facciata2()])

// ─────────────────────────────────────────────────────────────────────────
// CASA DI PIETRA 3 — 48×48, pietra antica, tetto in ardesia viola,
// finestrone con persiane verdi e abbaino tondo
// ─────────────────────────────────────────────────────────────────────────

function facciata3(): string[] {
  const rows: string[] = []
  for (let i = 18; i < 48; i++) {
    let r: string
    if (i === 18) r = 'K' + 'N'.repeat(46) + 'K'
    else if (i === 19) r = 'K' + 'n'.repeat(46) + 'K'
    else if (i === 45) r = 'K' + 'n'.repeat(46) + 'K'
    else if (i === 46) r = 'K' + 'N'.repeat(46) + 'K'
    else if (i === 47) r = 'K'.repeat(48)
    else r = 'K' + brickDark(46, i) + 'K'
    // occhio tondo acceso sotto la gronda
    if (i === 19) r = lay(r, 23, 'KK')
    if (i === 20) r = lay(r, 22, 'KyyK')
    if (i === 21) r = lay(r, 23, 'KK')
    // porta a sinistra
    if (i === 22) r = lay(r, 9, 'KKKKKKKK')
    if (i >= 23 && i <= 25) r = lay(r, 8, 'KyyyyyyyyK')
    if (i === 26) r = lay(r, 8, 'KKKKKKKKKK')
    if (i >= 27 && i <= 45) r = lay(r, 8, 'KuuUuuUuuK')
    if (i === 35 || i === 36) r = lay(r, 15, 'Y')
    if (i === 46) r = lay(r, 8, 'KKKKKKKKKK')
    // finestrone acceso con persiane verdi
    if (i === 23) r = lay(r, 28, 'KKKKKKKKKKKK')
    if (i === 24 || i === 31) r = lay(r, 27, 'KyyyyyyyyyyyyK')
    if (i >= 25 && i <= 30) r = lay(r, 27, 'KyyyyyKKyyyyyK')
    if (i === 32) r = lay(r, 27, 'KKKKKKKKKKKKKK')
    if (i === 33) r = lay(r, 27, 'uuuuuuuuuuuuuu')
    if (i >= 24 && i <= 32) {
      r = lay(r, 25, 'GV')
      r = lay(r, 41, 'VG')
    }
    rows.push(r)
  }
  return rows
}

export const casaPietra3 = sprite([...houseRoof(48, 'm', 'M'), ...facciata3()])

// ─────────────────────────────────────────────────────────────────────────
// LA CHIESETTA — 80×96. Navata (60 px) + campanile (20 px) con croce d'oro,
// campana, bifora accesa; rosone dorato, portale spalancato di luce calda,
// festone di lucine tra navata e torre. Sopra, i fuochi della festa.
// ─────────────────────────────────────────────────────────────────────────

const t52 = 'rrrrrR'.repeat(8) + 'rrrr'
const t54 = 'rrR' + 'rrrrrR'.repeat(8) + 'rrr'
const t56a = 'rrrrrR'.repeat(9) + 'rr'
const t56b = 'rrR' + 'rrrrrR'.repeat(8) + 'rrrrr'
const t58a = 'rrrrrR'.repeat(9) + 'rrrr'
const t58b = 'rrR' + 'rrrrrR'.repeat(9) + 'r'

/** interno della cella campanaria tra i piedritti */
const cella = (inner: string) => 'K' + 'CCCC' + 'K' + inner + 'K' + 'CCCC' + 'K'

function campanile(): string[] {
  const t: string[] = [
    // croce d'oro
    D(8) + 'KKKK' + D(8),
    D(8) + 'KYYK' + D(8),
    D(5) + 'KKKKYYKKKK' + D(5),
    D(5) + 'KYYYYYYYYK' + D(5),
    D(5) + 'KKKKYYKKKK' + D(5),
    D(8) + 'KYYK' + D(8),
    D(8) + 'KKKK' + D(8),
    // cuspide
    D(7) + 'KKKKKK' + D(7),
    D(6) + 'K' + 'rrrrrr' + 'K' + D(6),
    D(5) + 'K' + 'rrrrrrrr' + 'K' + D(5),
    D(4) + 'K' + 'rrrrrrrrrr' + 'K' + D(4),
    D(3) + 'K' + 'RrrrrrrrrrrR' + 'K' + D(3),
    D(2) + 'K' + 'RrrrrrrrrrrrrR' + 'K' + D(2),
    D(1) + 'K' + 'RRrrrrrrrrrrrrRR' + 'K' + D(1),
    'K' + 'RRRRRRRRRRRRRRRRRR' + 'K',
    'K'.repeat(20),
    // cella campanaria con la campana d'oro
    'K' + 'c'.repeat(18) + 'K',
    'K' + 'C'.repeat(18) + 'K',
    'K' + 'CCCC' + 'KKKKKKKKKK' + 'CCCC' + 'K',
    cella('zzzzzzzz'),
    cella('zzzKKzzz'),
    cella('zKyyyyKz'),
    cella('zKYYYYKz'),
    cella('zKYYYYKz'),
    cella('KyYYYYyK'),
    cella('KKKKKKKK'),
    cella('zzzKKzzz'),
    cella('zzzzzzzz'),
    cella('zzzzzzzz'),
    'K' + 'CCCC' + 'KKKKKKKKKK' + 'CCCC' + 'K',
    'K' + 'c'.repeat(18) + 'K',
    'K' + 'n'.repeat(18) + 'K',
  ]
  for (let i = 32; i < 96; i++) {
    let r: string
    if (i === 44) r = 'K' + 'N'.repeat(18) + 'K'
    else if (i === 45) r = 'K' + 'k'.repeat(18) + 'K'
    else if (i === 46) r = 'K' + 'yCCCYCCC'.repeat(2) + 'yC' + 'K'
    else if (i === 47) r = 'K' + 'C'.repeat(18) + 'K'
    else if (i === 80) r = 'K' + 'C'.repeat(18) + 'K'
    else if (i === 81) r = 'K' + 'n'.repeat(18) + 'K'
    else if (i === 92) r = 'K' + 'n'.repeat(18) + 'K'
    else if (i === 93 || i === 94) r = 'K' + 'N'.repeat(18) + 'K'
    else if (i === 95) r = 'K'.repeat(20)
    else r = 'K' + 'n' + brick(16, i) + 'n' + 'K'
    // monofora accesa della torre
    if (i === 56) r = lay(r, 6, 'KKKKKK')
    if (i >= 57 && i <= 69 && i !== 63) r = lay(r, 5, 'KyyyyyyK')
    if (i === 63) r = lay(r, 5, 'KKKKKKKK')
    if (i === 70) r = lay(r, 5, 'KKKKKKKK')
    if (i === 71) r = lay(r, 5, 'uuuuuuuu')
    t.push(r)
  }
  return t
}

/** luce del portale spalancato: oro in alto, braci calde sulla soglia */
function portale(i: number): string {
  if (i <= 72) return 'y'.repeat(14)
  if (i <= 80) return 'y' + 'Y'.repeat(12) + 'y'
  if (i <= 88) return 'Y'.repeat(14)
  return 'YY' + 'o'.repeat(10) + 'YY'
}

function navata(): string[] {
  const n: string[] = []
  for (let i = 0; i < 20; i++) n.push(D(60))
  // tetto a doppio spiovente visto dal basso
  n.push(D(4) + 'K'.repeat(52) + D(4))
  n.push(D(3) + 'K' + 'r'.repeat(52) + 'K' + D(3))
  n.push(D(3) + 'K' + t52 + 'K' + D(3))
  n.push(D(3) + 'K' + 'R'.repeat(52) + 'K' + D(3))
  n.push(D(2) + 'K' + 'r'.repeat(54) + 'K' + D(2))
  n.push(D(2) + 'K' + t54 + 'K' + D(2))
  n.push(D(2) + 'K' + 'R'.repeat(54) + 'K' + D(2))
  n.push(D(2) + 'K' + 'r'.repeat(54) + 'K' + D(2))
  n.push(D(1) + 'K' + t56a + 'K' + D(1))
  n.push(D(1) + 'K' + 'R'.repeat(56) + 'K' + D(1))
  n.push(D(1) + 'K' + 'r'.repeat(56) + 'K' + D(1))
  n.push(D(1) + 'K' + t56b + 'K' + D(1))
  n.push(D(1) + 'K' + 'R'.repeat(56) + 'K' + D(1))
  n.push(D(1) + 'K' + 'r'.repeat(56) + 'K' + D(1))
  n.push('K' + t58a + 'K')
  n.push('K' + 'R'.repeat(58) + 'K')
  n.push('K' + 'r'.repeat(58) + 'K')
  n.push('K' + t58b + 'K')
  n.push('K' + 'R'.repeat(58) + 'K')
  n.push('K' + 'R' + 'r'.repeat(56) + 'R' + 'K')
  n.push('K' + 'R'.repeat(58) + 'K')
  n.push('K' + 'R'.repeat(58) + 'K')
  n.push('K' + 'R'.repeat(58) + 'K')
  n.push('K'.repeat(60))
  // facciata
  for (let i = 44; i < 96; i++) {
    let r: string
    if (i === 44) r = 'K' + 'N'.repeat(58) + 'K'
    else if (i === 45) r = 'K' + 'k'.repeat(58) + 'K'
    else if (i === 46) r = 'K' + 'yCCCYCCC'.repeat(7) + 'yC' + 'K'
    else if (i === 47) r = 'K' + 'C'.repeat(58) + 'K'
    else if (i === 92) r = 'K' + 'n'.repeat(58) + 'K'
    else if (i === 93 || i === 94) r = 'K' + 'N'.repeat(58) + 'K'
    else if (i === 95) r = 'K'.repeat(60)
    else r = 'K' + brick(58, i) + 'K'
    // rosone dorato
    if (i === 50 || i === 57) r = lay(r, 28, 'KKKK')
    if (i === 51 || i === 56) r = lay(r, 26, 'KKyyyyKK')
    if (i === 52 || i === 55) r = lay(r, 25, 'KyyYYYYyyK')
    if (i === 53 || i === 54) r = lay(r, 25, 'KyYYyyYYyK')
    // bifore laterali accese
    if (i === 62) {
      r = lay(r, 9, 'KKKKKK')
      r = lay(r, 45, 'KKKKKK')
    }
    if (i >= 63 && i <= 75 && i !== 69) {
      r = lay(r, 8, 'KyyyyyyK')
      r = lay(r, 44, 'KyyyyyyK')
    }
    if (i === 69 || i === 76) {
      r = lay(r, 8, 'KKKKKKKK')
      r = lay(r, 44, 'KKKKKKKK')
    }
    if (i === 77) {
      r = lay(r, 8, 'uuuuuuuu')
      r = lay(r, 44, 'uuuuuuuu')
    }
    // portale spalancato: dentro, solo luce
    if (i === 62) r = lay(r, 26, 'KKKKKKKK')
    if (i === 63) r = lay(r, 24, 'KKyyyyyyyyKK')
    if (i === 64) r = lay(r, 23, 'KyyyyyyyyyyyyK')
    if (i >= 65 && i <= 94) r = lay(r, 22, 'K' + portale(i) + 'K')
    n.push(r)
  }
  return n
}

const naveRows = navata()
const towerRows = campanile()

export const chiesetta = sprite(naveRows.map((r, i) => r + towerRows[i]))

// ─────────────────────────────────────────────────────────────────────────
// ANNARITA — la signora del bar, un po' brilla. 16×24, 2 frame frontali:
// caschetto biondo, guanciotte rosse, vestito rosa scuro con grembiule,
// bottiglia verde alzata; tra un frame e l'altro ondeggia di 1px.
// ─────────────────────────────────────────────────────────────────────────

export const annarita: PixelSprite[] = [
  sprite([
    '................',
    '............KK..',
    '....KKKK...KyGK.',
    '...KYYYYKK.KGVK.',
    '..KYyYYYYYKKGVK.',
    '..KYYYYYYYKKGVK.',
    '..KYffffYK..KK..',
    '..KYfzfzYK.KffK.',
    '..KYPffPYK.KffK.',
    '...KKffKK..KfK..',
    '..KQQQQQQKKfK...',
    '.KQQKWWKQQKK....',
    '.KQKWWWWKQK.....',
    '.KfKWWWWKQK.....',
    '..KKWWWWKQK.....',
    '..KQWWWWQKK.....',
    '.KQQQQQQQQK.....',
    '.KQQQQQQQQK.....',
    '.KQQQQQQQQK.....',
    '.KKKKKKKKKK.....',
    '...KffKffK......',
    '...KffKffK......',
    '..KQQK.KQQK.....',
    '..KKKK.KKKK.....',
  ]),
  sprite([
    '................',
    '.............KK.',
    '.....KKKK...KyGK',
    '....KYYYYKK.KGVK',
    '...KYyYYYYYKKGVK',
    '...KYYYYYYYKKGVK',
    '...KYffffYK..KK.',
    '...KYfzfzYK.KffK',
    '...KYPffPYK.KffK',
    '....KKffKK..KfK.',
    '..KQQQQQQK.KfK..',
    '.KQQKWWKQQKK....',
    '.KQKWWWWKQK.....',
    '.KfKWWWWKQK.....',
    '..KKWWWWKQK.....',
    '..KQWWWWQKK.....',
    '.KQQQQQQQQK.....',
    '.KQQQQQQQQK.....',
    '.KQQQQQQQQK.....',
    '.KKKKKKKKKK.....',
    '...KffKffK......',
    '...KffKffK......',
    '..KQQK.KQQK.....',
    '..KKKK.KKKK.....',
  ]),
]

// ─────────────────────────────────────────────────────────────────────────
// VINCENZO — capelli corti, maglia azzurra con riga bianca, pantaloncini e
// calzettoni bianchi, braccia conserte, naso all'insù verso i fuochi.
// 16×24, 2 frame frontali (nel secondo alza appena il mento).
// ─────────────────────────────────────────────────────────────────────────

export const vincenzo: PixelSprite[] = [
  sprite([
    '................',
    '................',
    '....KKKK........',
    '...KHHHHKK......',
    '..KHHHHHHHK.....',
    '..KHHHHHHK......',
    '..KHffffHK......',
    '..KfzffzfK......',
    '..KffffffK......',
    '...KffffK.......',
    '..KKBBBBKK......',
    '.KBBBwwBBBK.....',
    '.KBBBwwBBBK.....',
    '.KKKffffKKK.....',
    '.KBKffffKBK.....',
    '..KBBwwBBK......',
    '..KwwwwwwK......',
    '...KwwKwwK......',
    '...KffKffK......',
    '...KffKffK......',
    '...KwwKwwK......',
    '...KwwKwwK......',
    '..KzzK.KzzK.....',
    '..KKKK.KKKK.....',
  ]),
  sprite([
    '................',
    '....KKKK........',
    '...KHHHHKK......',
    '..KHHHHHHHK.....',
    '..KHHHHHHK......',
    '..KHffffHK......',
    '..KfzffzfK......',
    '..KffffffK......',
    '...KffffK.......',
    '...KffffK.......',
    '..KKBBBBKK......',
    '.KBBBwwBBBK.....',
    '.KBBBwwBBBK.....',
    '.KKKffffKKK.....',
    '.KBKffffKBK.....',
    '..KBBwwBBK......',
    '..KwwwwwwK......',
    '...KwwKwwK......',
    '...KffKffK......',
    '...KffKffK......',
    '...KwwKwwK......',
    '...KwwKwwK......',
    '..KzzK.KzzK.....',
    '..KKKK.KKKK.....',
  ]),
]
