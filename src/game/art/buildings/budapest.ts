/**
 * BUDAPEST — gli edifici della fuga romantica.
 *
 * Scena città: il Parlamento dorato, il Ponte delle Catene, il Bastione
 * dei Pescatori. Scena Danubio: le silhouette notturne delle due rive e
 * il ponte illuminato («collana di perle») sotto cui scivola la barchetta.
 *
 * Tutti gli sprite usano SOLO i caratteri della PALETTE di ../format.ts;
 * le righe sono costruite con piccoli helper posizionali per garantire
 * allineamenti perfetti, poi normalizzate da sprite().
 */
import { sprite } from '../format'
import type { PixelSprite } from '../format'

type Seg = [number, string]

/** Riga larga w: i segmenti [x, testo] si sovrappongono in ordine ('.' non copre). */
function row(w: number, ...segs: Seg[]): string {
  const a: string[] = new Array<string>(w).fill('.')
  for (const [x, t] of segs) {
    for (let i = 0; i < t.length; i++) {
      const ch = t.charAt(i)
      const p = x + i
      if (ch !== '.' && p >= 0 && p < w) a[p] = ch
    }
  }
  return a.join('')
}

/** Metà sinistra (w/2 colonne) specchiata → riga completa simmetrica. */
function mir(w: number, ...segs: Seg[]): string {
  const h = row(w / 2, ...segs)
  return h + h.split('').reverse().join('')
}

/* ────────────────────────────────────────────────────────────────────────
 * IL PARLAMENTO — 112×96. Cupola rossa al centro, guglie, ali gotiche,
 * due ordini di finestre dorate accese, portale caldo con luce sui gradini.
 * ──────────────────────────────────────────────────────────────────────── */
function buildParlamento(): PixelSprite {
  const W = 112
  const rows: string[] = []
  const M = (...s: Seg[]) => {
    rows.push(mir(W, ...s))
  }

  // lanterna e guglia della cupola (y0-7)
  M([55, 'Y'])
  M([55, 'Y'])
  M([54, 'KY'])
  M([54, 'KY'])
  M([53, 'KYy'])
  M([53, 'KYy'])
  M([54, 'Kr'])
  M([54, 'Kr'])
  // cupola (y8-23) + guglie delle torri mediane (dal y10)
  M([51, 'KRrrr'])
  M([50, 'KRrrrr'])
  M([21, 'Y'], [49, 'KRRrrrr'])
  M([21, 'Y'], [48, 'KRRrrrrr'])
  M([20, 'KK'], [47, 'KRRRrrrrr'])
  M([19, 'KrRK'], [46, 'KRRRrrrrrr'])
  M([19, 'KrRK'], [45, 'KRRRRrrrrrr'])
  M([18, 'KrrRRK'], [45, 'KRRRRrrrrrr'])
  M([18, 'KrrRRK'], [44, 'KRRRRRrrrrrr'])
  M([17, 'KrrRRRRK'], [44, 'KRRRRRrrrrrr'])
  M([17, 'KrrRRRRK'], [43, 'KRRRRRrrrrrrr'])
  M([16, 'KrrrRRRRRK'], [43, 'KRRRRRrrryyrr'])
  M([16, 'KrrrRRRRRK'], [42, 'KRRRRRRrrryyrr'])
  M([16, 'KrryRRRRRK'], [42, 'KRRRRRRRrrrrrr'])
  M([16, 'KrrrRRRRRK'], [42, 'KRRRRRRRRrrrrr'])
  M([15, 'KKRRRRRRRRKK'], [42, 'K' + 'R'.repeat(13)])
  // tamburo della cupola + corpo torri mediane + torretta d'angolo (y24-35)
  const towerWin = 'KWyWWyWWyWWK' // 12 px, x15-26
  const towerPlain = 'KWWWWWWWWWWK'
  M([15, 'KwWWWWWWWWWK'], [4, 'KK'], [41, 'KwWWWWWWWWWWWWW'])
  M([15, towerPlain], [3, 'KrrK'], [41, 'K' + 'W'.repeat(14)])
  M([15, towerWin], [3, 'KrRK'], [41, 'KAWWyWWyWWyWWWW'])
  M([15, towerWin], [2, 'KrrRRK'], [41, 'KAWWyWWyWWyWWWW'])
  M([15, towerWin], [2, 'KrrRRK'], [41, 'KAWWyWWyWWyWWWW'])
  M([15, towerWin], [1, 'KrrrRRRK'], [41, 'KAWWyWWyWWyWWWW'])
  M([15, towerWin], [1, 'KrrRRRRK'], [41, 'KA' + 'A'.repeat(13)])
  M([15, towerWin], [1, 'KrRRRRRK'], [41, 'K' + 'W'.repeat(14)])
  M([15, 'KWAWWAWWAWWK'], [1, 'KKKKKKKK'], [41, 'KwWWWWWWWWWWWWW'])
  M([15, 'KAWWWWWWWWAK'], [1, 'KWWWWWWK'], [41, 'KWWyyWWyyWWyyWW'])
  M([15, towerPlain], [1, 'KWyWWyWK'], [41, 'KWWyyWWyyWWyyWW'])
  M([15, towerWin], [1, 'KWWWWWWK'], [41, 'KWWyyWWyyWWyyWW'])
  // tetti delle ali + corpo centrale (y36-43)
  const wingRoofL = (fill: string) => 'K' + fill.repeat(13) + 'K' // x0-14
  const wingRoofR = (fill: string) => 'K' + fill.repeat(12) + 'K' // x27-40
  M([15, towerWin], [0, wingRoofL('R')], [27, wingRoofR('R')], [41, 'KWWAAWWAAWWAAWW'])
  M([15, towerWin], [0, wingRoofL('R')], [27, wingRoofR('R')], [41, 'K' + 'W'.repeat(14)])
  M([15, towerWin], [0, wingRoofL('r')], [27, wingRoofR('r')], [41, 'K' + 'W'.repeat(14)])
  M([15, towerWin], [0, wingRoofL('r')], [27, wingRoofR('r')], [4, 'yy'], [9, 'yy'], [31, 'yy'], [36, 'yy'], [41, 'KWyyWWWWWWWWyyW'])
  M([15, towerWin], [0, wingRoofL('r')], [27, wingRoofR('r')], [4, 'yy'], [9, 'yy'], [31, 'yy'], [36, 'yy'], [41, 'KWyyWWWWWWWWyyW'])
  M([15, towerWin], [0, wingRoofL('r')], [27, wingRoofR('r')], [41, 'K' + 'W'.repeat(14)])
  M([15, 'KWAWWAWWAWWK'], [0, wingRoofL('R')], [27, wingRoofR('R')], [41, 'KA' + 'A'.repeat(13)])
  M([15, towerPlain], [0, wingRoofL('k')], [27, wingRoofR('k')], [41, 'K' + 'W'.repeat(14)])
  // facciata (y44-95) — due ordini di finestre gotiche accese
  const bg = (fill: string, ...extra: Seg[]): Seg[] => [[0, fill.repeat(56)], [0, 'K'], [14, 'A'], [27, 'A'], [40, 'A'], ...extra]
  const win1 = [3, 8, 18, 22, 30, 35, 44, 49, 54]
  const win2 = [3, 8, 18, 22, 30, 35, 44, 48]
  const at = (xs: number[], t: string): Seg[] => xs.map((x): Seg => [x, t])
  M([0, 'w'.repeat(56)])
  M(...bg('W'))
  M(...bg('W'))
  M([0, 'A'.repeat(56)])
  M(...bg('W'))
  M(...bg('W'))
  M(...bg('W', ...at(win1, 'KK')))
  for (let i = 0; i < 5; i++) M(...bg('W', ...at(win1, 'yy')))
  M(...bg('W', ...at(win1, 'AA')))
  M(...bg('W'))
  M(...bg('W', ...at(win1, 'KK')))
  for (let i = 0; i < 5; i++) M(...bg('W', ...at(win1, 'yy')))
  M(...bg('W', ...at(win1, 'AA')))
  M([0, 'A'.repeat(56)])
  M(...bg('W'))
  M([0, 'w'.repeat(56)])
  M(...bg('W'))
  M(...bg('W', ...at(win2, 'KK'), [50, 'KKKKKK']))
  for (let i = 0; i < 5; i++) M(...bg('W', ...at(win2, 'yy'), [50, 'Kyyyyy']))
  M(...bg('W', ...at(win2, 'AA'), [50, 'Kyyyyy']))
  M(...bg('W', [50, 'Kyyyyy']))
  M(...bg('W', ...at(win2, 'KK'), [50, 'Kyyyyy']))
  for (let i = 0; i < 4; i++) M(...bg('W', ...at(win2, 'yy'), [50, 'Kyyyyy']))
  M(...bg('W', ...at(win2, 'AA'), [50, 'Kyyyyy']))
  M([0, 'A'.repeat(56)], [50, 'KUuuUy'])
  M(...bg('W', [50, 'KUuuUy']))
  M(...bg('W', [50, 'KUuuUy']))
  M([0, 'c'.repeat(56)], [0, 'K'], [50, 'KUuuUy'])
  M([0, 'c'.repeat(56)], [0, 'K'], [50, 'KUuuUy'])
  M([0, 'C'.repeat(56)], [0, 'K'], [50, 'KUuuUy'])
  M([0, 'C'.repeat(56)], [0, 'K'], [50, 'KUuuUy'])
  M([0, 'C'.repeat(56)], [0, 'K'], [50, 'Kyyyyy'])
  M([0, 'n'.repeat(56)], [0, 'K'], [49, 'sssssss'])
  M([0, 'n'.repeat(56)], [0, 'K'], [48, 'ssssssss'])
  M([0, 'N'.repeat(56)], [0, 'K'], [47, 'sssssssss'])
  M([0, 'N'.repeat(56)], [0, 'K'], [46, 'ssssssssss'])
  M([0, 'K'.repeat(56)], [45, 'sssssssssss'])
  return sprite(rows)
}

export const parlamento = buildParlamento()

/* ────────────────────────────────────────────────────────────────────────
 * IL BASTIONE DEI PESCATORI — 112×80. Cinque torri bianche coniche da
 * fiaba, loggia ad archi accesi, portale caldo con scalinata.
 * ──────────────────────────────────────────────────────────────────────── */
function buildBastione(): PixelSprite {
  const W = 112
  const rows: string[] = []
  const M = (...s: Seg[]) => {
    rows.push(mir(W, ...s))
  }

  // punte dei coni (centro, medie, angolo)
  M([55, 'Y'])
  M([55, 'Y'])
  M([54, 'Kw'])
  M([54, 'Kw'])
  M([53, 'Kww'])
  M([53, 'Kww'])
  M([27, 'Y'], [52, 'KAww'])
  M([27, 'Y'], [52, 'KAww'])
  M([27, 'Kw'], [51, 'KAWww'])
  M([27, 'Kw'], [51, 'KAWww'])
  M([6, 'Y'], [26, 'KwAK'], [50, 'KAWWww'])
  M([6, 'Y'], [26, 'KwAK'], [50, 'KAWWww'])
  M([6, 'Kw'], [25, 'KwWWAK'], [49, 'KAWWWww'])
  M([6, 'Kw'], [25, 'KwWWAK'], [49, 'KAWWWww'])
  M([5, 'KwWK'], [24, 'KwWWWAAK'], [48, 'KAWWWWww'])
  M([5, 'KwWK'], [24, 'KwWWWAAK'], [48, 'KAWWWWww'])
  M([4, 'KwWWAK'], [23, 'KwWWWWWAAK'], [47, 'KAWWWWWww'])
  M([4, 'KwWWAK'], [23, 'KwWWWWWAAK'], [47, 'KAWWWWWww'])
  M([3, 'KwWWWAAK'], [22, 'KwWWWWWWAAAK'], [46, 'KAWWWWWWww'])
  M([3, 'KwWWWAAK'], [22, 'KwWWWWWWAAAK'], [46, 'KAWWWWWWww'])
  M([2, 'KwWWWWWAAK'], [22, 'KwWWWWWWAAAK'], [45, 'KAWWWWWWWww'])
  M([2, 'KwWWWWWAAK'], [22, 'KwWWWWWWAAAK'], [45, 'KAWWWWWWWww'])
  M([1, 'KwWWWWWWAAAK'], [21, 'K' + 'A'.repeat(12) + 'K'], [44, 'K' + 'A'.repeat(11)])
  M([1, 'KwWWWWWWAAAK'], [21, 'K' + 'a'.repeat(12) + 'K'], [44, 'K' + 'a'.repeat(11)])
  // corpi delle torri (y24-39)
  const corpo = 'KWWWWWWWWWWK'
  const corpoWin = 'KWWyyWWyyWWK'
  const corpoSill = 'KWWAAWWAAWWK'
  M([0, 'K' + 'A'.repeat(12) + 'K'], [22, 'KwWWWWWWWWWK'], [45, 'Kw' + 'W'.repeat(9)])
  M([0, 'K' + 'a'.repeat(12) + 'K'], [22, corpo], [45, 'K' + 'W'.repeat(10)])
  M([1, 'KwWWWWWWWWWK'], [22, corpoWin], [45, 'KWWyyWWyyWW'])
  M([1, corpo], [22, corpoWin], [45, 'KWWyyWWyyWW'])
  M([1, corpoWin], [22, corpoWin], [45, 'KWWyyWWyyWW'])
  M([1, corpoWin], [22, corpoWin], [45, 'KWWyyWWyyWW'])
  M([1, corpoWin], [22, corpoWin], [45, 'KWWyyWWyyWW'])
  M([1, corpoWin], [22, corpoSill], [45, 'KWWAAWWAAWW'])
  M([1, corpoWin], [22, corpo], [45, 'K' + 'W'.repeat(10)])
  M([1, corpoSill], [22, corpo], [45, 'K' + 'W'.repeat(10)])
  M([1, corpo], [22, corpo], [45, 'K' + 'W'.repeat(10)], [6, 'y'], [27, 'y'], [50, 'y'])
  M([1, corpo], [22, corpo], [45, 'K' + 'W'.repeat(10)], [6, 'y'], [27, 'y'], [50, 'y'])
  M([1, corpo], [22, corpo], [45, 'K' + 'W'.repeat(10)])
  M([1, corpo], [22, corpo], [45, 'K' + 'W'.repeat(10)])
  M([1, corpo], [22, corpo], [45, 'K' + 'W'.repeat(10)])
  M([1, corpo], [22, corpo], [45, 'K' + 'W'.repeat(10)])
  // loggia continua (y42-57): archi caldi tra le torri
  const pil: Seg[] = [[0, 'K'], [13, 'A'], [21, 'A'], [34, 'A'], [44, 'A']]
  const arcX = [15, 19, 36, 40]
  const atx = (xs: number[], t: string): Seg[] => xs.map((x): Seg => [x, t])
  M([0, 'w'.repeat(56)])
  M([0, 'W'.repeat(56)], ...pil)
  M([0, 'W'.repeat(56)], ...pil)
  M([0, 'W'.repeat(56)], ...pil, ...atx(arcX, 'KK'))
  for (let i = 0; i < 9; i++) M([0, 'W'.repeat(56)], ...pil, ...atx(arcX, 'yy'))
  M([0, 'W'.repeat(56)], ...pil, ...atx(arcX, 'AA'))
  M([0, 'W'.repeat(56)], ...pil)
  M([0, 'A'.repeat(56)])
  // muraglia bassa + portale + finestrine accese (y58-79)
  M([0, 'W'.repeat(56)], [0, 'K'])
  M([0, 'W'.repeat(56)], [0, 'K'])
  M([0, 'W'.repeat(56)], [0, 'K'])
  M([0, 'W'.repeat(56)], [0, 'K'], [50, 'KKKKKK'])
  M([0, 'W'.repeat(56)], [0, 'K'], [50, 'Kyyyyy'])
  M([0, 'W'.repeat(56)], [0, 'K'], [4, 'yy'], [8, 'yy'], [25, 'yy'], [29, 'yy'], [50, 'Kyyyyy'])
  M([0, 'W'.repeat(56)], [0, 'K'], [4, 'yy'], [8, 'yy'], [25, 'yy'], [29, 'yy'], [50, 'Kyyyyy'])
  M([0, 'W'.repeat(56)], [0, 'K'], [4, 'yy'], [8, 'yy'], [25, 'yy'], [29, 'yy'], [50, 'Kyyyyy'])
  M([0, 'W'.repeat(56)], [0, 'K'], [4, 'AA'], [8, 'AA'], [25, 'AA'], [29, 'AA'], [50, 'Kyyyyy'])
  M([0, 'A'.repeat(56)], [50, 'Kyyyyy'])
  M([0, 'c'.repeat(56)], [0, 'K'], [50, 'Kyyyyy'])
  M([0, 'c'.repeat(56)], [0, 'K'], [50, 'Kyyyyy'])
  M([0, 'c'.repeat(56)], [0, 'K'], [50, 'Kyyyyy'])
  M([0, 'c'.repeat(56)], [0, 'K'], [50, 'Kyyyyy'])
  M([0, 'c'.repeat(56)], [0, 'K'], [50, 'Kyyyyy'])
  M([0, 'C'.repeat(56)], [0, 'K'], [50, 'Kyyyyy'])
  M([0, 'C'.repeat(56)], [0, 'K'], [50, 'Kyyyyy'])
  M([0, 'C'.repeat(56)], [0, 'K'], [50, 'Kyyyyy'])
  M([0, 'C'.repeat(56)], [0, 'K'], [50, 'Kyyyyy'])
  M([0, 'C'.repeat(56)], [0, 'K'], [50, 'Kyyyyy'])
  M([0, 'n'.repeat(56)], [0, 'K'], [49, 'sssssss'])
  M([0, 'n'.repeat(56)], [0, 'K'], [48, 'ssssssss'])
  M([0, 'N'.repeat(56)], [0, 'K'], [47, 'sssssssss'])
  M([0, 'K'.repeat(56)], [46, 'ssssssssss'])
  return sprite(rows)
}

export const bastione = buildBastione()

/* ────────────────────────────────────────────────────────────────────────
 * Painter su griglia — per catene, guglie e silhouette irregolari.
 * ──────────────────────────────────────────────────────────────────────── */
type Grid = string[][]

function grid(w: number, h: number): Grid {
  return Array.from({ length: h }, () => new Array<string>(w).fill('.'))
}

function pset(g: Grid, x: number, y: number, ch: string): void {
  const r = g[y]
  if (r && x >= 0 && x < r.length) r[x] = ch
}

function paint(g: Grid, x: number, y: number, t: string): void {
  for (let i = 0; i < t.length; i++) {
    const ch = t.charAt(i)
    if (ch !== '.') pset(g, x + i, y, ch)
  }
}

/** specchia orizzontalmente la metà sinistra sulla destra */
function mirrorGrid(g: Grid): void {
  for (const r of g) {
    const w = r.length
    for (let x = 0; x < w / 2; x++) r[w - 1 - x] = r[x] ?? '.'
  }
}

function toSprite(g: Grid): PixelSprite {
  return sprite(g.map((r) => r.join('')))
}

/* ────────────────────────────────────────────────────────────────────────
 * IL PONTE DELLE CATENE (monumento cittadino) — 96×64.
 * Due torrioni di pietra ad arco, catene che scendono con le lampadine
 * accese, balaustra col parapetto. I leoni sono props `statue` ai piedi.
 * ──────────────────────────────────────────────────────────────────────── */
function buildPonteCatene(): PixelSprite {
  const g = grid(96, 64)
  const H = 48 // metà sinistra

  // torrione: x20-37, y2-49
  paint(g, 22, 2, 'y')
  paint(g, 35, 2, 'y')
  paint(g, 22, 3, 'k')
  paint(g, 35, 3, 'k')
  paint(g, 20, 4, 'K' + 'c'.repeat(16) + 'K')
  paint(g, 20, 5, 'Kc' + 'C'.repeat(14) + 'K')
  paint(g, 21, 6, 'K' + 'C'.repeat(14) + 'K')
  for (let y = 7; y <= 19; y++) paint(g, 21, y, 'KcC' + 'C'.repeat(10) + 'nK')
  paint(g, 21, 20, 'KcCCKKKKKKKKCCnK'.slice(0, 16))
  paint(g, 21, 21, 'KcCKKzzzzKKCCnK')
  for (let y = 22; y <= 49; y++) paint(g, 21, y, 'KcCKzzzzzzKCCnK')
  // lanterna appesa nell'arco
  pset(g, 28, 23, 'k')
  pset(g, 28, 24, 'k')
  paint(g, 27, 25, 'yyy')
  // catena esterna: da (19,6) a (0,36), con lampadine
  for (let y = 6; y <= 36; y++) {
    const x = Math.round(19 - (19 * (y - 6)) / 30)
    pset(g, x, y, y % 3 === 0 ? 'y' : 'K')
    pset(g, x + 1, y, 'k')
  }
  // catena interna: da (38,6) al centro (47,17)
  for (let y = 6; y <= 17; y++) {
    const x = Math.min(47, 38 + Math.round((9 * (y - 6)) / 11))
    pset(g, x, y, y % 3 === 0 ? 'y' : 'K')
    if (x + 1 < H) pset(g, x + 1, y, 'k')
  }
  // pendini verticali fino al parapetto
  for (const sx of [5, 12, 42, 45]) {
    let top = 8
    for (let y = 6; y <= 40; y++) {
      const r = g[y]
      if (r && r[sx] !== '.') top = y + 1
    }
    for (let y = top; y < 50; y++) if (g[y] && g[y]![sx] === '.') pset(g, sx, y, 'k')
  }
  // lampioni della balaustra
  for (const lx of [8, 15]) {
    pset(g, lx, 46, 'y')
    pset(g, lx, 47, 'k')
    pset(g, lx, 48, 'k')
    pset(g, lx, 49, 'k')
  }
  // parapetto e basamento (y50-63)
  paint(g, 0, 50, 'c'.repeat(H))
  paint(g, 0, 51, 'C'.repeat(H))
  for (let y = 52; y <= 53; y++) {
    paint(g, 0, y, 'C'.repeat(H))
    for (let x = 1; x < H; x += 6) pset(g, x, y, 'K')
  }
  paint(g, 0, 54, 'n'.repeat(H))
  paint(g, 0, 55, 'C'.repeat(H))
  for (let y = 56; y <= 59; y++) paint(g, 0, y, 'n'.repeat(H))
  for (let y = 60; y <= 62; y++) paint(g, 0, y, 'N'.repeat(H))
  paint(g, 0, 63, 'K'.repeat(H))

  mirrorGrid(g)
  return toSprite(g)
}

export const ponteCatene = buildPonteCatene()

/* ────────────────────────────────────────────────────────────────────────
 * DANUBIO DI NOTTE — silhouette delle rive e ponte «collana di perle».
 * Corpi X/z, contorni K, finestre accese y: la città che dorme sul fiume.
 * ──────────────────────────────────────────────────────────────────────── */

/** palazzo ottocentesco con mansarda — 64×48 */
function buildNottePalazzo(lit: number[]): PixelSprite {
  const g = grid(64, 48)
  paint(g, 8, 0, 'KK')
  paint(g, 52, 0, 'KK')
  paint(g, 8, 1, 'KK')
  paint(g, 52, 1, 'KK')
  paint(g, 4, 2, 'K'.repeat(56))
  paint(g, 3, 3, 'K' + 'z'.repeat(56) + 'K')
  for (let y = 4; y <= 7; y++) paint(g, 2, y, 'K' + 'z'.repeat(58) + 'K')
  paint(g, 12, 5, 'yy')
  paint(g, 31, 5, 'yy')
  paint(g, 49, 5, 'yy')
  paint(g, 12, 6, 'yy')
  paint(g, 31, 6, 'yy')
  paint(g, 49, 6, 'yy')
  paint(g, 1, 8, 'K'.repeat(62))
  for (let y = 9; y <= 46; y++) paint(g, 1, y, 'K' + 'X'.repeat(60) + 'K')
  const bands = [12, 20, 28, 37]
  for (let b = 0; b < bands.length; b++) {
    const by = bands[b] ?? 12
    for (let k = 0; k < 12; k++) {
      const wx = 4 + 5 * k
      const on = lit.includes(b * 12 + k)
      for (let dy = 0; dy < 4; dy++) paint(g, wx, by + dy, on ? 'yy' : 'zz')
    }
  }
  paint(g, 1, 47, 'K'.repeat(62))
  return toSprite(g)
}

export const nottePalazzo = buildNottePalazzo([1, 5, 8, 14, 18, 22, 27, 31, 36, 40, 45])

/** schiera di case a timpano — 80×48 */
function buildNotteCase(): PixelSprite {
  const g = grid(80, 48)
  const case_: Array<{ x: number; top: number; lit: number[] }> = [
    { x: 0, top: 12, lit: [0, 3] },
    { x: 16, top: 4, lit: [1, 4] },
    { x: 32, top: 16, lit: [2] },
    { x: 48, top: 8, lit: [0, 5] },
    { x: 64, top: 20, lit: [1] },
  ]
  for (const h of case_) {
    // tetto a timpano
    for (let i = 0; i < 8; i++) {
      const half = i + 1
      paint(g, h.x + 8 - half, h.top + i, 'K' + 'z'.repeat(2 * half - 2) + 'K')
    }
    // muri
    for (let y = h.top + 8; y <= 46; y++) paint(g, h.x, y, 'K' + 'X'.repeat(14) + 'K')
    // finestre 2×3 su due file
    for (let k = 0; k < 3; k++) {
      const wx = h.x + 3 + 4 * k
      for (let dy = 0; dy < 3; dy++) {
        paint(g, wx, h.top + 12 + dy, h.lit.includes(k) ? 'yy' : 'zz')
        paint(g, wx, h.top + 20 + dy, h.lit.includes(k + 3) ? 'yy' : 'zz')
      }
    }
    // portoncino
    for (let dy = 43; dy <= 46; dy++) paint(g, h.x + 6, dy, 'zzz')
    // comignolo
    paint(g, h.x + 11, h.top - 3, 'KK')
    paint(g, h.x + 11, h.top - 2, 'KK')
    paint(g, h.x + 11, h.top - 1, 'KK')
  }
  paint(g, 0, 47, 'K'.repeat(80))
  return toSprite(g)
}

export const notteCase = buildNotteCase()

/** chiesa con guglia — 48×64 */
function buildNotteChiesa(): PixelSprite {
  const g = grid(48, 64)
  // croce dorata
  pset(g, 23, 0, 'Y')
  paint(g, 22, 1, 'YYY')
  pset(g, 23, 2, 'Y')
  // guglia
  for (let i = 0; i < 14; i++) {
    const half = 1 + Math.floor(i / 2)
    const x = 23 - half + 1
    paint(g, x, 4 + i, 'K' + 'z'.repeat(Math.max(0, 2 * half - 2)) + 'K')
  }
  // cella campanaria
  paint(g, 18, 18, 'K'.repeat(12))
  for (let y = 19; y <= 27; y++) paint(g, 18, y, 'K' + 'X'.repeat(10) + 'K')
  for (let y = 21; y <= 25; y++) {
    paint(g, 21, y, 'yy')
    paint(g, 25, y, 'yy')
  }
  // corpo con rosone e monofore
  paint(g, 9, 28, 'K'.repeat(30))
  for (let y = 29; y <= 62; y++) paint(g, 9, y, 'K' + 'X'.repeat(28) + 'K')
  paint(g, 21, 33, 'Kyyyy')
  paint(g, 20, 34, 'Kyyyyyy')
  paint(g, 20, 35, 'Kyyyyyy')
  paint(g, 21, 36, 'Kyyyy')
  for (let y = 42; y <= 50; y++) {
    paint(g, 14, y, 'yy')
    paint(g, 31, y, 'yy')
  }
  // navate laterali
  paint(g, 0, 40, 'K'.repeat(10))
  paint(g, 38, 40, 'K'.repeat(10))
  for (let y = 41; y <= 62; y++) {
    paint(g, 0, y, 'K' + 'X'.repeat(8))
    paint(g, 38, y, 'X'.repeat(9) + 'K')
  }
  // portale
  paint(g, 21, 56, 'KzzzzK')
  for (let y = 57; y <= 62; y++) paint(g, 21, y, 'Kzzzzk'.slice(0, 6))
  paint(g, 0, 63, 'K'.repeat(48))
  return toSprite(g)
}

export const notteChiesa = buildNotteChiesa()

/** basilica con cupola — 64×64 (simmetrica) */
function buildNotteCupola(): PixelSprite {
  const g = grid(64, 64)
  // lanterna accesa
  paint(g, 30, 0, 'Y')
  paint(g, 30, 1, 'Y')
  paint(g, 29, 2, 'Ky')
  paint(g, 29, 3, 'Ky')
  paint(g, 28, 4, 'Kyy')
  // cupola (metà sinistra, poi specchiata)
  const domeW = [4, 6, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16]
  for (let i = 0; i < domeW.length; i++) {
    const half = domeW[i] ?? 16
    paint(g, 32 - half, 6 + i, 'K' + 'z'.repeat(half - 1))
  }
  paint(g, 15, 22, 'K'.repeat(17))
  // tamburo
  paint(g, 14, 23, 'K'.repeat(18))
  for (let y = 24; y <= 29; y++) paint(g, 14, y, 'K' + 'X'.repeat(16) + 'K')
  for (const wx of [17, 21, 25]) {
    paint(g, wx, 25, 'y')
    paint(g, wx, 26, 'y')
    paint(g, wx, 27, 'y')
  }
  // torri gemelle
  paint(g, 1, 18, 'K'.repeat(10))
  for (let y = 19; y <= 62; y++) paint(g, 1, y, 'K' + 'X'.repeat(8) + 'K')
  paint(g, 4, 21, 'yy')
  paint(g, 4, 22, 'yy')
  paint(g, 4, 23, 'yy')
  // corpo
  paint(g, 2, 30, 'K'.repeat(30))
  for (let y = 31; y <= 62; y++) paint(g, 2, y, 'K' + 'X'.repeat(28) + 'K')
  for (const wx of [7, 13, 19, 25]) {
    for (let y = 38; y <= 46; y++) paint(g, wx, y, wx === 13 || wx === 25 ? 'yy' : 'zz')
  }
  // portale
  paint(g, 27, 54, 'KzzzzK')
  for (let y = 55; y <= 62; y++) paint(g, 27, y, 'Kzzzz')
  mirrorGrid(g)
  paint(g, 1, 63, 'K'.repeat(62))
  return toSprite(g)
}

export const notteCupola = buildNotteCupola()

/** torrione del ponte in silhouette — 48×64 (nella scena del Danubio) */
function buildPonteTorreNotte(): PixelSprite {
  const g = grid(48, 64)
  // lampadine sul coronamento
  for (let x = 12; x <= 33; x += 3) pset(g, x, 8, 'y')
  paint(g, 12, 9, 'K'.repeat(24))
  for (let y = 10; y <= 55; y++) paint(g, 12, y, 'K' + 'X'.repeat(22) + 'K')
  // arco passante: dietro si vede l'acqua di notte (dal pelo dell'acqua)
  paint(g, 17, 30, 'K'.repeat(14))
  paint(g, 17, 31, 'KK' + 'D'.repeat(10) + 'KK')
  for (let y = 32; y <= 55; y++) paint(g, 17, y, 'K' + 'D'.repeat(12) + 'K')
  // fanale al centro dell'arco
  pset(g, 23, 33, 'k')
  paint(g, 22, 34, 'yyy')
  // basamento scuro
  for (let y = 56; y <= 62; y++) paint(g, 12, y, 'K' + 'z'.repeat(22) + 'K')
  paint(g, 12, 63, 'K'.repeat(24))
  return toSprite(g)
}

export const ponteTorreNotte = buildPonteTorreNotte()

/** campata delle catene illuminate — 96×48 (simmetrica) */
function buildPonteCampataNotte(): PixelSprite {
  const g = grid(96, 48)
  // catena a festone: alta ai bordi, morbida al centro, perle di luce
  for (let x = 0; x < 48; x++) {
    const t = (47 - x) / 47
    const y = Math.round(16 - 16 * t * t)
    pset(g, x, y, x % 4 === 0 ? 'y' : 'K')
    pset(g, x, y + 1, 'k')
  }
  // pendini
  for (const sx of [8, 16, 24, 32, 40]) {
    const t = (47 - sx) / 47
    const top = Math.round(16 - 16 * t * t) + 2
    for (let y = top; y < 40; y++) pset(g, sx, y, 'k')
  }
  // lampioni sull'impalcato
  for (const lx of [12, 28, 44]) {
    pset(g, lx, 37, 'y')
    pset(g, lx, 38, 'k')
    pset(g, lx, 39, 'k')
  }
  // impalcato
  paint(g, 0, 40, 'K'.repeat(48))
  paint(g, 0, 41, 'X'.repeat(48))
  paint(g, 0, 42, 'K'.repeat(48))
  // riflessi sull'acqua
  for (const rx of [4, 12, 20, 28, 36, 44]) {
    pset(g, rx, 44, 'y')
    pset(g, rx + 1, 46, 'y')
  }
  mirrorGrid(g)
  return toSprite(g)
}

export const ponteCampataNotte = buildPonteCampataNotte()

