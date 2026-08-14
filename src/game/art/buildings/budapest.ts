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
 * IL PONTE DELLE CATENE (scena città) — in tre pezzi, perché stavolta il
 * ponte attraversa VERA acqua: le due torri di pietra sono edifici solidi
 * sulle sponde del canale, l'impalcato in mezzo è fatto di tile calpestabili,
 * il festone di catene e le arcate sono sprite non solidi sopra l'acqua.
 * ──────────────────────────────────────────────────────────────────────── */

/** torrione di pietra ad arco — 32×64, uno per sponda */
function buildPonteTorreCitta(): PixelSprite {
  const g = grid(32, 64)
  // fanali d'oro sul coronamento
  pset(g, 6, 0, 'y')
  pset(g, 25, 0, 'y')
  pset(g, 6, 1, 'k')
  pset(g, 25, 1, 'k')
  // cornicione a gradoni
  paint(g, 3, 2, 'K'.repeat(26))
  paint(g, 3, 3, 'K' + 'c'.repeat(23) + 'nK')
  paint(g, 2, 4, 'K'.repeat(28))
  paint(g, 2, 5, 'K' + 'c'.repeat(25) + 'nK')
  paint(g, 2, 6, 'Kc' + 'C'.repeat(24) + 'nK')
  // corpo in pietra, luce da sinistra-alto
  for (let y = 7; y <= 53; y++) paint(g, 2, y, 'Kc' + 'C'.repeat(24) + 'nK')
  // basamento scuro verso terra
  for (let y = 54; y <= 58; y++) paint(g, 2, y, 'K' + 'n'.repeat(26) + 'K')
  for (let y = 59; y <= 62; y++) paint(g, 2, y, 'K' + 'N'.repeat(26) + 'K')
  paint(g, 2, 63, 'K'.repeat(28))
  // attacchi dorati delle catene sui fianchi (all'altezza del festone)
  pset(g, 2, 19, 'y')
  pset(g, 2, 20, 'y')
  pset(g, 29, 19, 'y')
  pset(g, 29, 20, 'y')
  // arco passante: curva, ombra profonda e lanterna accesa
  paint(g, 13, 18, 'KKKKKK')
  paint(g, 11, 19, 'KK' + 'z'.repeat(6) + 'KK')
  for (let y = 20; y <= 62; y++) paint(g, 11, y, 'K' + 'z'.repeat(8) + 'K')
  pset(g, 15, 22, 'k')
  pset(g, 15, 23, 'k')
  paint(g, 14, 24, 'yyy')
  return toSprite(g)
}

export const ponteTorreCitta = buildPonteTorreCitta()

/** festone di catene sospeso tra le torri — 64×48, sopra l'acqua a nord */
function buildPonteCatenaCitta(): PixelSprite {
  const g = grid(64, 48)
  // catena: alta agli attacchi, morbida al centro, perle di luce ogni 4 px
  for (let x = 0; x < 32; x++) {
    const t = (31 - x) / 31
    const y = Math.round(4 + 18 * (1 - t * t))
    pset(g, x, y, x % 4 === 0 ? 'y' : 'K')
    pset(g, x, y + 1, 'k')
  }
  // pendini verso l'impalcato
  for (const sx of [6, 14, 22, 30]) {
    const t = (31 - sx) / 31
    const top = Math.round(4 + 18 * (1 - t * t)) + 2
    for (let y = top; y < 44; y++) pset(g, sx, y, 'k')
  }
  // perle di luce riflesse sull'acqua del canale
  for (const rx of [4, 12, 20, 28]) {
    pset(g, rx, 44, 'y')
    pset(g, rx + 2, 46, 'y')
  }
  mirrorGrid(g)
  return toSprite(g)
}

export const ponteCatenaCitta = buildPonteCatenaCitta()

/** fianco sud dell'impalcato — 64×16: due arcate, dentro si vede l'acqua */
function buildPonteArcataCitta(): PixelSprite {
  const g = grid(64, 16)
  const carve = (x0: number, x1: number, y: number) => {
    for (let x = x0; x <= x1; x++) pset(g, x, y, '.')
  }
  // parapetto e fascia di pietra
  paint(g, 0, 0, 'K'.repeat(64))
  paint(g, 0, 1, 'c'.repeat(64))
  paint(g, 0, 2, 'C'.repeat(64))
  for (let y = 3; y <= 11; y++) paint(g, 0, y, 'C'.repeat(64))
  for (let y = 12; y <= 14; y++) paint(g, 0, y, 'n'.repeat(64))
  paint(g, 0, 15, 'N'.repeat(64))
  // arcata larga 24: curva in alto, apertura trasparente sull'acqua
  const arco = (a: number) => {
    const b = a + 23
    paint(g, a + 7, 4, 'K'.repeat(10))
    paint(g, a + 3, 5, 'KKKK')
    paint(g, b - 6, 5, 'KKKK')
    carve(a + 7, b - 7, 5)
    paint(g, a + 1, 6, 'KK')
    paint(g, b - 2, 6, 'KK')
    carve(a + 3, b - 3, 6)
    for (let y = 7; y <= 15; y++) {
      pset(g, a, y, 'K')
      pset(g, b, y, 'K')
      carve(a + 1, b - 1, y)
    }
    // luccichii dorati sull'acqua sotto l'arcata
    pset(g, a + 6, 12, 'y')
    pset(g, b - 8, 14, 'y')
    pset(g, a + 11, 15, 'y')
  }
  arco(5)
  arco(35)
  // le luci della catena di valle, in fila sul parapetto
  for (let x = 4; x < 64; x += 9) pset(g, x, 0, 'y')
  return toSprite(g)
}

export const ponteArcataCitta = buildPonteArcataCitta()

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

/* ────────────────────────────────────────────────────────────────────────
 * LA RUOTA PANORAMICA — 96×112, stile «Budapest Eye» di notte. Cerchio
 * sottile con perle di luce come le catene del ponte, dodici raggi, cabine
 * ovali illuminate distribuite sul cerchio, mozzo d'oro acceso e due gambe
 * ad A con basamenti di pietra. Va posta a nord della pista di ghiaccio:
 * solida SOLO alla base delle gambe, così Rosa può passarle dietro.
 * ──────────────────────────────────────────────────────────────────────── */
function buildRuota(): PixelSprite {
  const g = grid(96, 112)
  const cx = 47.5
  const cy = 45
  const R = 40

  // le due gambe ad A, dal mozzo giù fino ai basamenti
  for (let y = 52; y <= 103; y++) {
    const t = (y - 52) / 51
    const xl = Math.round(46 - 19 * t)
    const xr = Math.round(49 + 19 * t)
    paint(g, xl, y, 'Kk')
    paint(g, xr - 1, y, 'kK')
  }
  // traversa orizzontale che chiude la «A»
  paint(g, 34, 88, 'k'.repeat(28))
  // basamenti di pietra dei piedi
  for (let y = 104; y <= 110; y++) {
    paint(g, 24, y, 'K' + 'N'.repeat(6) + 'K')
    paint(g, 64, y, 'K' + 'N'.repeat(6) + 'K')
  }
  paint(g, 24, 111, 'K'.repeat(8))
  paint(g, 64, 111, 'K'.repeat(8))

  // dodici raggi sottili
  for (let s = 0; s < 12; s++) {
    const th = (Math.PI * s) / 6
    for (let r = 6; r <= R - 3; r++) {
      pset(g, Math.round(cx + r * Math.cos(th)), Math.round(cy + r * Math.sin(th)), 'x')
    }
  }
  // cerchio: bordo esterno scuro + filo interno più chiaro
  for (let a = 0; a < 1440; a++) {
    const th = (Math.PI * a) / 720
    pset(g, Math.round(cx + R * Math.cos(th)), Math.round(cy + R * Math.sin(th)), 'X')
    pset(g, Math.round(cx + (R - 2) * Math.cos(th)), Math.round(cy + (R - 2) * Math.sin(th)), 'x')
  }
  // perle di luce lungo il cerchio, come la collana del Ponte delle Catene
  for (let a = 0; a < 48; a++) {
    const th = (Math.PI * a) / 24
    pset(g, Math.round(cx + R * Math.cos(th)), Math.round(cy + R * Math.sin(th)), a % 2 === 0 ? 'Y' : 'y')
  }
  // cabine ovali accese, appese appena fuori dal cerchio
  const cabina = ['.KKK.', 'KyYyK', 'KyyyK', '.KKK.']
  for (let s = 0; s < 12; s++) {
    const th = (Math.PI * s) / 6
    const x = Math.round(cx + (R + 3) * Math.cos(th)) - 2
    const y = Math.round(cy + (R + 3) * Math.sin(th)) - 1
    cabina.forEach((rw, i) => paint(g, x, y + i, rw))
  }
  // mozzo luminoso al centro
  const mozzo = ['..KK..', '.KyyK.', 'KyYYyK', 'KyYYyK', '.KyyK.', '..KK..']
  mozzo.forEach((rw, i) => paint(g, 45, 42 + i, rw))

  return toSprite(g)
}

export const ruota = buildRuota()

