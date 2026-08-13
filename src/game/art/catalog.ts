/**
 * CONTRATTO CATALOGO — le chiavi fisse dell'arte condivisa.
 *
 * Implementazioni (in questa cartella):
 *  - tiles.ts       → export const TILES: Record<TileKey, TileSpec>
 *  - props.ts       → export const PROPS: Record<PropKey, PropSpec>
 *  - characters.ts  → export const CHARACTERS: Record<CharacterKey, CharacterSet>
 *
 * Le scene delle città referenziano SOLO queste chiavi (più i propri edifici
 * custom in art/buildings/<città>.ts).
 */
import type { PixelSprite } from './format'

/** Tile di terreno 16×16. Più frames = animazione (~350 ms a frame). */
export interface TileSpec {
  frames: PixelSprite[]
}

/** Oggetto di scena. footprint = tile solidi alla BASE dello sprite. */
export interface PropSpec {
  sprite: PixelSprite
  solid: boolean
  /** larghezza/altezza in tile della zona solida, ancorata in basso a sinistra dello sprite */
  footprint: { w: number; h: number }
}

/**
 * Set direzionale di un personaggio. Ogni direzione ha 1+ frames 16×24:
 * [0] = fermo, [1] = passo sinistro, [2] = passo destro (se presenti).
 * Il motore anima la camminata come 1,0,2,0. Per 'boat' i frames sono
 * l'ondeggiamento (la barchetta con i due innamorati seduti).
 */
export interface CharacterSet {
  down: PixelSprite[]
  up: PixelSprite[]
  left: PixelSprite[]
  right: PixelSprite[]
}

export type TileKey =
  | 'grass' // erba base
  | 'grass2' // variante erba (ciuffi)
  | 'tallGrass' // erba alta
  | 'flowers' // erba con fiorellini
  | 'path' // sentiero sterra/sabbia
  | 'pathStones' // sentiero con sassi
  | 'cobble' // ciottolato / sampietrini
  | 'plaza' // lastricato di piazza chiaro
  | 'sand' // sabbia di spiaggia
  | 'sandWet' // sabbia bagnata (bordo mare)
  | 'water' // acqua (animata, 2-3 frames)
  | 'deepWater' // acqua profonda (animata)
  | 'asphalt' // asfalto strada
  | 'sidewalk' // marciapiede
  | 'wood' // pedana/molo di legno
  | 'hedge' // siepe (di solito solid)
  | 'rock' // roccia / montagna (solid)
  | 'snow' // neve (creste alpine)

export type PropKey =
  | 'tree' // albero frondoso ~32×40
  | 'pine' // abete ~24×40
  | 'cypress' // cipresso ~16×40
  | 'palm' // palma ~24×40
  | 'olive' // ulivo ~24×32
  | 'bush' // cespuglio 16×16
  | 'roseBush' // cespuglio di rose 16×16
  | 'flowerPatch' // macchia di fiori 16×8 (non solida)
  | 'bench' // panchina 32×16
  | 'lamp' // lampione 16×32 (glow di notte, gestito dal motore)
  | 'fountain' // fontana 32×32 (animabile no, statica va bene)
  | 'statue' // statua 16×32
  | 'umbrella' // ombrellone 24×32
  | 'sunbed' // lettino 16×24
  | 'towel' // telo mare 16×24 (non solido)
  | 'table' // tavolino con sedie 32×24
  | 'sign' // cartello di legno 16×16 (usato dal motore per i signs)
  | 'pot' // vaso di fiori 16×16
  | 'barrel' // botte 16×16
  | 'vine' // filare di vite 32×24
  | 'buoy' // boa in acqua 16×16 (non solida, sta sull'acqua)
  | 'rocks' // scogli 32×16
  | 'gull' // gabbiano 16×16 (non solido)
  | 'cat' // gattino 16×16 (non solido)

export type CharacterKey =
  | 'rosa' // la protagonista: ragazza, capelli castano scuro lunghi, vestito/top rosa
  | 'francesco' // ragazzo, capelli scuri corti, maglia blu
  | 'boat' // barchetta di legno con i due seduti dentro (usata come player sul Danubio)
  | 'npcWoman'
  | 'npcMan'
  | 'npcNonna'
  | 'npcKid'
