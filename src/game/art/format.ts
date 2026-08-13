/**
 * CONTRATTO ART — formato pixel-art condiviso da TUTTI gli sprite del gioco.
 *
 * Uno sprite è una griglia di caratteri: ogni carattere è un colore della
 * PALETTE, '.' oppure ' ' sono trasparenti. Le righe possono avere lunghezze
 * diverse (vengono riempite a destra con trasparente).
 *
 * Stile di riferimento: Pokémon epoca HGSS / Bianco&Nero — contorni scuri
 * morbidi (K), 3 toni di ombreggiatura con luce dall'alto, silhouette
 * leggibili, colori caldi e saturi. Le facciate degli edifici sono frontali,
 * i tetti inclinati verso l'osservatore (~30°), prospettiva top-down 2.5D.
 *
 * Dimensioni: 1 tile = 16×16 px. Personaggi 16×24. Edifici multipli di 16
 * (da 48×48 fino a ~112×96).
 */

export interface PixelSprite {
  w: number
  h: number
  /** h righe di w caratteri (già normalizzate da sprite()) */
  px: string[]
}

/** Palette master — usare SOLO questi caratteri negli sprite. */
export const PALETTE: Record<string, string> = {
  // neutri / contorni
  K: '#14101f', // contorno scuro (outline standard)
  k: '#372f4d', // ombra viola
  z: '#0d0a18', // notte profonda / vetri bui
  w: '#ffffff', // bianco
  W: '#f3ead9', // crema
  A: '#cfc9dd', // lavanda chiara
  a: '#948daa', // grigio lavanda
  x: '#6b6584', // grigio scuro
  X: '#47425f', // ardesia
  // verdi
  v: '#b9e48a', // verde chiarissimo (luce erba)
  g: '#82c96a', // erba
  G: '#57a84e', // erba scura
  V: '#33804a', // bosco
  T: '#1f5c38', // bosco profondo
  // sabbia / terra / legno
  s: '#efdfae', // sabbia chiara
  S: '#dcbc82', // sabbia / sentiero
  t: '#c19a5e', // terra
  u: '#96703f', // legno medio / terra scura
  U: '#6a4a28', // legno scuro
  // pietra
  c: '#d9d4c9', // pietra chiara calda
  C: '#b3ab9c', // pietra
  n: '#857d6f', // pietra scura
  N: '#57503f', // pietra profonda
  // acqua
  i: '#bfe8f2', // schiuma / riflesso
  b: '#6fc5e8', // acqua chiara
  B: '#3f96d4', // acqua
  d: '#2a6cb0', // acqua profonda
  D: '#1b3f78', // acqua di notte
  // tetti / caldi
  r: '#e2606b', // tetto rosso
  R: '#a53848', // tetto rosso scuro
  o: '#f0913f', // arancio
  O: '#b5601f', // arancio scuro
  y: '#ffd98f', // oro chiaro / finestra accesa
  Y: '#f2b13c', // oro
  m: '#7d5ba6', // viola
  M: '#543a78', // viola scuro
  // rosa
  q: '#ffd9e2', // rosa pallidissimo
  p: '#ffb3c8', // rosa chiaro
  P: '#e86a92', // rosa
  Q: '#b23a68', // rosa scuro
  // pelle / capelli
  f: '#f6cfa4', // pelle
  F: '#d9a06b', // pelle ambrata
  h: '#8a5a34', // capelli castani
  H: '#4d3018', // capelli scuri
  // tramonto
  '3': '#ffb08a', // pesca
  '4': '#ff7a5c', // corallo
}

/** Costruisce un PixelSprite normalizzando le righe. */
export function sprite(rows: string[]): PixelSprite {
  const w = Math.max(...rows.map((r) => r.length))
  const px = rows.map((r) => r.padEnd(w, '.'))
  return { w, h: rows.length, px }
}

const cache = new WeakMap<PixelSprite, HTMLCanvasElement>()

/** Rasterizza (e cachea) uno sprite su canvas — solo lato browser. */
export function decodeSprite(sp: PixelSprite): HTMLCanvasElement {
  const hit = cache.get(sp)
  if (hit) return hit
  const cv = document.createElement('canvas')
  cv.width = sp.w
  cv.height = sp.h
  const ctx = cv.getContext('2d')!
  for (let y = 0; y < sp.h; y++) {
    const row = sp.px[y]
    for (let x = 0; x < sp.w; x++) {
      const ch = row[x]
      if (ch === '.' || ch === ' ' || ch === undefined) continue
      const col = PALETTE[ch]
      if (!col) continue
      ctx.fillStyle = col
      ctx.fillRect(x, y, 1, 1)
    }
  }
  cache.set(sp, cv)
  return cv
}
