/**
 * PERSONAGGI 16×24 — stile Pokémon HGSS/BW: testa grande, silhouette
 * leggibili a scala 3×. Ogni direzione: [fermo, passo sx, passo dx].
 * Il traghetto è 24×32 (32×24 in orizzontale): i frames sono il beccheggio.
 */
import { sprite } from './format'
import type { PixelSprite } from './format'
import type { CharacterKey, CharacterSet } from './catalog'

type Rows = string[]

const S = (rows: Rows): PixelSprite => sprite(rows)

/** Specchia orizzontalmente (per ricavare right da left). */
const flip = (rows: Rows): Rows => rows.map((r) => [...r].reverse().join(''))

/** Ribalta verticalmente (per la barca su/giù). */
const flipV = (rows: Rows): Rows => [...rows].reverse()

/** Ruota 90° in senso orario (barca orizzontale). */
function rotCW(rows: Rows): Rows {
  const h = rows.length
  const w = rows[0].length
  const out: string[] = []
  for (let r = 0; r < w; r++) {
    let line = ''
    for (let c = 0; c < h; c++) line += rows[h - 1 - c][r]
    out.push(line)
  }
  return out
}

/** Trasla orizzontalmente di dx (riempiendo con trasparente). */
const shiftX = (rows: Rows, dx: number): Rows =>
  rows.map((r) =>
    dx >= 0 ? ('.'.repeat(dx) + r).slice(0, r.length) : (r + '.'.repeat(-dx)).slice(-dx),
  )

/** Trasla verticalmente di dy. */
function shiftY(rows: Rows, dy: number): Rows {
  const w = rows[0].length
  const blank = '.'.repeat(w)
  if (dy >= 0) return [...Array(dy).fill(blank), ...rows].slice(0, rows.length)
  return [...rows.slice(-dy), ...Array(-dy).fill(blank)]
}

/** Ricolora secondo una mappa carattere→carattere. */
const paint = (rows: Rows, map: Record<string, string>): Rows =>
  rows.map((r) => [...r].map((ch) => map[ch] ?? ch).join(''))

// ------------------------------------------------------------ gambe
// (5 righe finali comuni: l = colore gamba, s = colore scarpa)

const legsFrontIdle = (l: string, s: string): Rows => [
  `....${l}${l}....${l}${l}....`,
  `....${l}${l}....${l}${l}....`,
  `....${l}${l}....${l}${l}....`,
  `....${s}${s}....${s}${s}....`,
  '....KK....KK....',
]

// passo: piede sx a terra, piede dx sollevato
const legsFrontStepL = (l: string, s: string): Rows => [
  `....${l}${l}....${l}${l}....`,
  `....${l}${l}....${l}${l}....`,
  `....${l}${l}....${s}${s}....`,
  `....${s}${s}....KK....`,
  '....KK..........',
]

const legsFrontStepR = (l: string, s: string): Rows => flip(legsFrontStepL(l, s))

// profilo (rivolto a sinistra)
const legsSideIdle = (l: string, s: string): Rows => [
  `.....${l}${l}.${l}${l}......`,
  `.....${l}${l}.${l}${l}......`,
  `.....${l}${l}.${l}${l}......`,
  `.....${s}${s}.${s}${s}......`,
  '.....KK.KK......',
]

const legsSideStepA = (l: string, s: string): Rows => [
  `.....${l}${l}.${l}${l}......`,
  `....${l}${l}...${l}${l}.....`,
  `....${l}${l}...${l}${l}.....`,
  `....${s}${s}...${s}${s}.....`,
  '....KK...KK.....',
]

const legsSideStepB = (l: string, s: string): Rows => [
  `.....${l}${l}.${l}${l}......`,
  `.....${l}${l}.${l}${l}......`,
  `....${l}${l}..${l}${l}......`,
  `....${s}${s}..${s}${s}......`,
  '....KK..KK......',
]

/** Compone i tre frames di una direzione frontale/dorsale. */
const walkFront = (body: Rows, l: string, s: string): PixelSprite[] => [
  S([...body, ...legsFrontIdle(l, s)]),
  S([...body, ...legsFrontStepL(l, s)]),
  S([...body, ...legsFrontStepR(l, s)]),
]

/** Compone i tre frames del profilo sinistro (e specchiato per destra). */
const walkSide = (body: Rows, l: string, s: string): Rows[] => [
  [...body, ...legsSideIdle(l, s)],
  [...body, ...legsSideStepA(l, s)],
  [...body, ...legsSideStepB(l, s)],
]

const sideSet = (body: Rows, l: string, s: string): { left: PixelSprite[]; right: PixelSprite[] } => {
  const frames = walkSide(body, l, s)
  return { left: frames.map(S), right: frames.map((f) => S(flip(f))) }
}

// ================================================================ ROSA
// La protagonista: capelli lunghi castano scuro, vestitino rosa.

const rosaDown: Rows = [
  '................',
  '.....HHHHHH.....',
  '....HhhhhhhH....',
  '...HhhhhhhhhH...',
  '..HhhhhhhhhhhH..',
  '..HhhhhhhhhhhH..',
  '..HHhffffffhHH..',
  '..HhffffffffhH..',
  '..HhfKffffKfhH..',
  '..HhfKffffKfhH..',
  '..HhfpffffpfhH..',
  '..HhffffffffhH..',
  '..HhhhffffhhhH..',
  '..HhhPPPPPPhhH..',
  '..HhPPPPPPPPhH..',
  '..HhPpPPPPpPhH..',
  '..HfPPPPPPPPfH..',
  '..QPPPPPPPPPPQ..',
  '..QPpPPPPPPpPQ..',
]

const rosaUp: Rows = [
  '................',
  '.....HHHHHH.....',
  '....HhhhhhhH....',
  '...HhhhhhhhhH...',
  '..HhhhhhhhhhhH..',
  '..HhhhhhhhhhhH..',
  '..HhhhhhhhhhhH..',
  '..HhhhhhhhhhhH..',
  '..HhhhhhhhhhhH..',
  '..HHhhhhhhhhHH..',
  '..HHhhhhhhhhHH..',
  '..HhhhhhhhhhhH..',
  '..HhhhhhhhhhhH..',
  '..HhhhhhhhhhhH..',
  '..HHhhhhhhhhHH..',
  '..HfHhhhhhhHfH..',
  '..QPPHhhhhHPPQ..',
  '..QPPPHhhHPPPQ..',
  '..QPpPPHHPPpPQ..',
]

const rosaLeft: Rows = [
  '................',
  '.....HHHHHH.....',
  '....HhhhhhhH....',
  '...HhhhhhhhhH...',
  '..HhhhhhhhhhhH..',
  '..HhhhhhhhhhhH..',
  '..HffffhhhhhhH..',
  '..HffffhhhhhhH..',
  '..HfKffhhhhhhH..',
  '..HfKffhhhhhhH..',
  '..HpfffhhhhhhH..',
  '..Hffff.hhhhH...',
  '...fff.HhhhhH...',
  '...PPPPHhhhhH...',
  '..fPPPPHhhhhH...',
  '..fPPPPPHhhH....',
  '...PPPPPPHH.....',
  '...QPPPPPPQ.....',
  '...QPpPPPpQ.....',
]

const rosaSides = sideSet(rosaLeft, 'f', 'Q')

const rosa: CharacterSet = {
  down: walkFront(rosaDown, 'f', 'Q'),
  up: walkFront(rosaUp, 'f', 'Q'),
  left: rosaSides.left,
  right: rosaSides.right,
}

// =========================================================== FRANCESCO
// Capelli scuri corti, maglia blu, jeans.

const franDown: Rows = [
  '................',
  '.....HHHHHH.....',
  '....HhhhhhhH....',
  '...HhhhhhhhhH...',
  '...HhhhhhhhhH...',
  '..HHhHhhhhHhHH..',
  '..HHffffffffHH..',
  '..HffffffffffH..',
  '..HffKffffKffH..',
  '..HffKffffKffH..',
  '..HffffffffffH..',
  '...HffffffffH...',
  '...BBBBBBBBBB...',
  '..BBBBBBBBBBBB..',
  '..fBBBBBBBBBBf..',
  '..fBdBBBBBBdBf..',
  '..fBBBBBBBBBBf..',
  '...XXXXXXXXXX...',
  '...XXXX..XXXX...',
]

const franUp: Rows = [
  '................',
  '.....HHHHHH.....',
  '....HhhhhhhH....',
  '...HhhhhhhhhH...',
  '...HhhhhhhhhH...',
  '..HHhhhhhhhhHH..',
  '..HHhhhhhhhhHH..',
  '..HhhhhhhhhhhH..',
  '..HhhhhhhhhhhH..',
  '..HHhhhhhhhhHH..',
  '..HHHhhhhhhHHH..',
  '...HHHHHHHHHH...',
  '...BBBBBBBBBB...',
  '..BBBBBBBBBBBB..',
  '..fBBBBBBBBBBf..',
  '..fBdBBBBBBdBf..',
  '..fBBBBBBBBBBf..',
  '...XXXXXXXXXX...',
  '...XXXX..XXXX...',
]

const franLeft: Rows = [
  '................',
  '.....HHHHHH.....',
  '....HhhhhhhH....',
  '...HhhhhhhhhH...',
  '...HhhhhhhhhH...',
  '..HHhhhhhhhhHH..',
  '..HffffhhhhhhH..',
  '..HffffhhhhhhH..',
  '..HfKffhhhhhH...',
  '..HfKffhhhhhH...',
  '..HffffhhhhHH...',
  '...HfffHHHH.....',
  '...BBBBBBBB.....',
  '..BBBBBBBBBB....',
  '..fBBBBBBBBB....',
  '..fBBdBBBBdB....',
  '..fBBBBBBBBB....',
  '...XXXXXXXX.....',
  '...XXXX.XXX.....',
]

const franSides = sideSet(franLeft, 'X', 'u')

const francesco: CharacterSet = {
  down: walkFront(franDown, 'X', 'u'),
  up: walkFront(franUp, 'X', 'u'),
  left: franSides.left,
  right: franSides.right,
}

// ================================================================ BOAT
// Piccolo traghetto bianco visto dall'alto: cabina coi finestrini, fumaiolo
// oro, Rosa a prua e Francesco dietro di lei. down = prua in basso;
// i frames sono il beccheggio dolce (±1px, con la scia i sull'acqua).

const boatDown: Rows = [
  '.........i....i.........',
  '.......ii......ii.......',
  '......KKKKKKKKKKKK......',
  '.....KWWwwwwwwwwWWK.....',
  '....KWwwwwwwwwwwwwWK....',
  '....KWwYYYYYYYYYYwWK.i..',
  '.i..KWwwwwwwwwwwwwWK....',
  '....KWwwKKKKKKKKwwWK....',
  '....KWwwKzzyzzzKwwWK....',
  '....KWwwKwwwwwwKwwWK..i.',
  '....KWwwKwWYYWwKwwWK....',
  '..i.KWwwKwWYYWwKwwWK....',
  '....KWwwKwwwwwwKwwWK....',
  '....KWwwKzzzzyzKwwWK....',
  '....KWwwKKKKKKKKwwWK....',
  '....KWwwwwwwwwwwwwWK.i..',
  '....KWwwwBBBBBBwwwWK....',
  '....KWwwBBHHHHBBwwWK....',
  '....KWwwBBHhhHBBwwWK....',
  '....KWwwwBBHHBBwwwWK....',
  '....KWwwwwwwwwwwwwWK....',
  '....KWwwwPPPPPPwwwWK..i.',
  '....KWwwPPHHHHPPwwWK....',
  '....KWwwPPHhpHPPwwWK....',
  '.i..KWwwwPPHHPPwwwWK....',
  '....KXwwwwwwwwwwwwXK....',
  '.....KWwwwwwwwwwwWK.i...',
  '......KXwwwwwwwwXK......',
  '.......KXwwwwwwXK..i....',
  '..i.....KXwwwwXK........',
  '.........KXwwXK.........',
  '.........iKXXKi.........',
]

const boatFrames = (base: Rows, horizontal: boolean): PixelSprite[] =>
  horizontal
    ? [S(base), S(shiftY(base, -1)), S(shiftY(base, 1))]
    : [S(base), S(shiftX(base, -1)), S(shiftX(base, 1))]

const boatUp = flipV(boatDown)
const boatLeft = rotCW(boatDown)
const boatRight = flip(boatLeft)

const boat: CharacterSet = {
  down: boatFrames(boatDown, false),
  up: boatFrames(boatUp, false),
  left: boatFrames(boatLeft, true),
  right: boatFrames(boatRight, true),
}

// ============================================================ NPC DONNA
// Caschetto castano, vestito arancio col colletto chiaro.

const womanDown: Rows = [
  '................',
  '.....HHHHHH.....',
  '....HhhhhhhH....',
  '...HhhhhhhhhH...',
  '...HhhhhhhhhH...',
  '..HHhhhhhhhhHH..',
  '..HhHffffffHhH..',
  '..HhffffffffhH..',
  '..HhfKffffKfhH..',
  '..HhfKffffKfhH..',
  '..HhfpffffpfhH..',
  '..Hh.ffffff.hH..',
  '...H..ffff..H...',
  '....WooooooW....',
  '...oooooooooo...',
  '..foooooooooof..',
  '..fooOooooOoof..',
  '..OooooooooooO..',
  '..OoyoooooyooO..',
]

const womanUp: Rows = [
  '................',
  '.....HHHHHH.....',
  '....HhhhhhhH....',
  '...HhhhhhhhhH...',
  '...HhhhhhhhhH...',
  '..HHhhhhhhhhHH..',
  '..HhhhhhhhhhhH..',
  '..HhhhhhhhhhhH..',
  '..HHhhhhhhhhHH..',
  '..HHhhhhhhhhHH..',
  '..HhhhhhhhhhhH..',
  '..HHHhhhhhhHHH..',
  '...HHHHHHHHHH...',
  '....oooooooo....',
  '...oooooooooo...',
  '..foooooooooof..',
  '..fooOooooOoof..',
  '..OooooooooooO..',
  '..OooooooooooO..',
]

const womanLeft: Rows = [
  '................',
  '.....HHHHHH.....',
  '....HhhhhhhH....',
  '...HhhhhhhhhH...',
  '...HhhhhhhhhH...',
  '..HHhhhhhhhhHH..',
  '..HffffhhhhhhH..',
  '..HffffhhhhhhH..',
  '..HfKffhhhhhhH..',
  '..HfKffhhhhhhH..',
  '..HpfffhhhhhHH..',
  '..Hffff.hhhH....',
  '...fff..HHH.....',
  '...WooooooW.....',
  '..fooooooooo....',
  '..foooOoooOo....',
  '...ooooooooo....',
  '...OoooooooO....',
  '...OoyoooooO....',
]

const womanSides = sideSet(womanLeft, 'f', 'u')

const npcWoman: CharacterSet = {
  down: walkFront(womanDown, 'f', 'u'),
  up: walkFront(womanUp, 'f', 'u'),
  left: womanSides.left,
  right: womanSides.right,
}

// ============================================================== NPC UOMO
// Francesco ricolorato: coppola grigia, camicia arancio, pantaloni terra.

const manPaint: Record<string, string> = { B: 'o', d: 'O', X: 't', b: 'o' }

const capDown: Rows = [
  '................',
  '.....XXXXXX.....',
  '....XxxxxxxX....',
  '...XxxxxxxxxX...',
  '...XXXXXXXXXX...',
  '..HHffffffffHH..',
]

const manDown: Rows = [...capDown, ...paint(franDown.slice(6), manPaint)]

const capUp: Rows = [
  '................',
  '.....XXXXXX.....',
  '....XxxxxxxX....',
  '...XxxxxxxxxX...',
  '...XxxxxxxxxX...',
  '..XXxxxxxxxxXX..',
  '..XXXXXXXXXXXX..',
  '..HhhhhhhhhhhH..',
  '..HhhhhhhhhhhH..',
  '..HHhhhhhhhhHH..',
  '..HHHhhhhhhHHH..',
  '...HHHHHHHHHH...',
]

const manUp: Rows = [...capUp, ...paint(franUp.slice(12), manPaint)]

const capLeft: Rows = [
  '................',
  '.....XXXXXX.....',
  '....XxxxxxxX....',
  '..XXxxxxxxxxX...',
  '..XXXXXXXXXXX...',
  '..HHhhhhhhhhHH..',
]

const manLeft: Rows = [...capLeft, ...paint(franLeft.slice(6), manPaint)]

const manSides = sideSet(manLeft, 't', 'U')

const npcMan: CharacterSet = {
  down: walkFront(manDown, 't', 'U'),
  up: walkFront(manUp, 't', 'U'),
  left: manSides.left,
  right: manSides.right,
}

// ============================================================= NPC NONNA
// Chignon grigio, scialle viola, gonna lunga: passi piccoli piccoli.

const nonnaDown: Rows = [
  '......aAAa......',
  '.....aAAAAa.....',
  '....aAAAAAAa....',
  '...aAAAAAAAAa...',
  '...aAAAAAAAAa...',
  '..aaAffffffAaa..',
  '..aAffffffffAa..',
  '..aAfKffffKfAa..',
  '..aAfKffffKfAa..',
  '..aAffffffffAa..',
  '..aA.ffffff.Aa..',
  '...mmmmmmmmmm...',
  '..mmmmmmmmmmmm..',
  '..mMmMmmmmMmMm..',
  '..fmmmmmmmmmmf..',
  '..MmMmMmMmMmMm..',
  '...XXXXXXXXXX...',
  '...XXXXXXXXXX...',
  '...XxXXXXXXxX...',
  '...XXXXXXXXXX...',
  '...XXXXXXXXXX...',
  '....XXXXXXXX....',
]

const nonnaUp: Rows = [
  '......aAAa......',
  '.....aAAAAa.....',
  '....aAAAAAAa....',
  '...aAAAAAAAAa...',
  '...aAAAAAAAAa...',
  '..aaAAAAAAAAaa..',
  '..aAAAAAAAAAAa..',
  '..aAAAAAAAAAAa..',
  '..aAAAAAAAAAAa..',
  '..aaAAAAAAAAaa..',
  '..aaaAAAAAAaaa..',
  '...mmmmmmmmmm...',
  '..mmmmmmmmmmmm..',
  '..mmmmmmmmmmmm..',
  '..fmmMmmmmMmmf..',
  '..MmMmMmMmMmMm..',
  '...XXXXXXXXXX...',
  '...XXXXXXXXXX...',
  '...XXXXXXXXXX...',
  '...XxXXXXXxXXX..',
  '...XXXXXXXXXX...',
  '....XXXXXXXX....',
]

const nonnaLeft: Rows = [
  '.....aAAa.......',
  '....aAAAAa......',
  '....aAAAAAa.....',
  '...aAAAAAAAa....',
  '...aAAAAAAAa....',
  '..aaAAAAAAAaa...',
  '..affffAAAAAa...',
  '..affffAAAAAa...',
  '..afKffAAAAAa...',
  '..affffAAAAAa...',
  '..a.ffffAAAa....',
  '...mmmmmmmm.....',
  '..mmmmmmmmmm....',
  '..mMmMmmmMmm....',
  '..fmmmmmmmmm....',
  '..MmMmMmMmMm....',
  '...XXXXXXXX.....',
  '...XXXXXXXX.....',
  '...XxXXXXxX.....',
  '...XXXXXXXX.....',
  '...XXXXXXXX.....',
  '....XXXXXX......',
]

// la nonna trascina i piedini: solo le scarpe si muovono
const nonnaShoes: Rows[] = [
  ['....xx....xx....', '....KK....KK....'],
  ['....xx...xx.....', '....KK...KK.....'],
  ['.....xx...xx....', '.....KK...KK....'],
]

const nonnaShoesSide: Rows[] = [
  ['.....xx.xx......', '.....KK.KK......'],
  ['....xx..xx......', '....KK..KK......'],
  ['.....xx..xx.....', '.....KK..KK.....'],
]

const nonnaSet = (body: Rows, shoes: Rows[]): PixelSprite[] =>
  shoes.map((sh) => S([...body, ...sh]))

const npcNonna: CharacterSet = {
  down: nonnaSet(nonnaDown, nonnaShoes),
  up: nonnaSet(nonnaUp, nonnaShoes),
  left: nonnaSet(nonnaLeft, nonnaShoesSide),
  right: nonnaShoesSide.map((sh) => S(flip([...nonnaLeft, ...sh]))),
}

// =============================================================== NPC KID
// Piccolino: maglietta gialla a righe, scarpette rosse.

const kidDown: Rows = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '.....HHHHHH.....',
  '....HhhhhhhH....',
  '...HhhhhhhhhH...',
  '...HHffffffHH...',
  '...HffffffffH...',
  '...HfKffffKfH...',
  '...HfKffffKfH...',
  '...HfpffffpfH...',
  '....ffffffff....',
  '....yyyyyyyy....',
  '...fyyyooyyyf...',
  '....yyyyyyyy....',
  '....ff....ff....',
  '....ff....ff....',
]

const kidUp: Rows = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '.....HHHHHH.....',
  '....HhhhhhhH....',
  '...HhhhhhhhhH...',
  '...HhhhhhhhhH...',
  '...HHhhhhhhHH...',
  '...HHhhhhhhHH...',
  '...HhhhhhhhhH...',
  '....HHHHHHHH....',
  '....yyyyyyyy....',
  '....yyyyyyyy....',
  '...fyyyooyyyf...',
  '....yyyyyyyy....',
  '....ff....ff....',
  '....ff....ff....',
]

const kidLeft: Rows = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '.....HHHHHH.....',
  '....HhhhhhhH....',
  '...HhhhhhhhhH...',
  '...HfffhhhhH....',
  '...HfffhhhhH....',
  '...HKffhhhhH....',
  '...HfffhhhhH....',
  '...HpffhhhHH....',
  '....fffHHH......',
  '....yyyyyyy.....',
  '...fyyooyyy.....',
  '....yyyyyyy.....',
  '.....ff.ff......',
  '.....ff.ff......',
]

// il bimbo saltella: nel passo il corpo si stacca da terra di 1px
const kidFrames = (body: Rows, shoes: Rows, skip: Rows): Rows[] => [
  [...body, ...shoes],
  shiftY([...body, ...shoes], -1),
  [...body, ...skip],
]

const kidFront = (body: Rows): PixelSprite[] =>
  kidFrames(body, ['....rr....rr....', '....KK....KK....'], [
    '...rr....rr.....',
    '...KK....KK.....',
  ]).map(S)

const kidSide = kidFrames(kidLeft, ['.....rr.rr......', '.....KK.KK......'], [
  '....rr..rr......',
  '....KK..KK......',
])

const npcKid: CharacterSet = {
  down: kidFront(kidDown),
  up: kidFront(kidUp),
  left: kidSide.map(S),
  right: kidSide.map((f) => S(flip(f))),
}

// ---------------------------------------------------------------------

export const CHARACTERS: Record<CharacterKey, CharacterSet> = {
  rosa,
  francesco,
  boat,
  npcWoman,
  npcMan,
  npcNonna,
  npcKid,
}
