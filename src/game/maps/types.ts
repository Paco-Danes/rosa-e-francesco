/**
 * CONTRATTO SCENE — lo schema dati di ogni mappa (overworld e città).
 *
 * Una scena è PURA DATA: il motore (src/game/engine) legge questi oggetti e
 * fa tutto il resto (render, collisioni, dialoghi, effetti, transizioni).
 *
 * Convenzioni:
 *  - coordinate in TILE (1 tile = 16 px), origine in alto a sinistra;
 *  - `ground` è una lista di `height` stringhe da `width` caratteri;
 *    ogni carattere è una voce di `legend` (i caratteri della legend sono
 *    liberi, scelti dalla scena — NON sono i caratteri della palette);
 *  - il player occupa 1 tile (i piedi); lo sprite 16×24 sborda in alto;
 *  - ordine di disegno: ground → (props, buildings, npcs, player) ordinati
 *    per la Y della base (illusione 2.5D: passare "dietro" agli edifici).
 */
import type { PixelSprite } from '../art/format'
import type { CharacterKey, PropKey, TileKey } from '../art/catalog'
import type { MemoryId } from '../../content/memories'

export type SceneId =
  | 'overworld'
  | 'lausanne'
  | 'sauvabelin'
  | 'smdm'
  | 'cocuruzzo'
  | 'danubio'
  | 'budapest'
  | 'milano'
  | 'torvaianica'

export type Dir = 'up' | 'down' | 'left' | 'right'

export interface TileDef {
  base: TileKey
  /** true = non calpestabile (acqua, siepi, rocce...) */
  solid?: boolean
}

export interface PlacedProp {
  prop: PropKey
  /** tile del bordo in basso a sinistra dello sprite */
  x: number
  y: number
}

export interface PlacedBuilding {
  /** sprite autoriale da src/game/art/buildings/<città>.ts */
  sprite: PixelSprite
  /** tile in alto a sinistra dove viene disegnato lo sprite */
  x: number
  y: number
  /**
   * Rettangolo solido in TILE, RELATIVO a (x, y).
   * Di solito copre la parte bassa (la facciata), non il tetto:
   * così il player può passare "dietro" l'edificio.
   */
  solid: { x: number; y: number; w: number; h: number }
}

export interface SignDef {
  x: number
  y: number
  /** 'wood' (default): il motore disegna il cartello, tile solido.
   *  'none': nessun cartello disegnato, tile NON solido — usare per
   *  interazioni su porte/edifici/mare (il punto interattivo è invisibile). */
  kind?: 'wood' | 'none'
  /** titoletto mostrato sopra il dialogo, es. "Cattedrale di Losanna" */
  label?: string
  /** righe di dialogo (italiano, tono caldo); apparse in sequenza */
  lines: string[]
  /** se presente, alla fine del dialogo si apre la memory card */
  memoryId?: MemoryId
}

export interface NpcDef {
  character: CharacterKey
  /** se presente, il motore usa questi frames (idle ~600 ms) al posto di character */
  custom?: PixelSprite[]
  x: number
  y: number
  dir?: Dir
  /** true = passeggia di 1 tile casuale ogni tanto (mai su tile solidi/exit) */
  wander?: boolean
  label?: string
  lines: string[]
}

export interface ExitDef {
  /** rettangolo di tile che attiva l'uscita camminandoci sopra */
  x: number
  y: number
  w: number
  h: number
  to: SceneId
  /**
   * Dove appare il player nella scena di destinazione.
   * Se omesso: si usa `spawn` della scena di destinazione.
   * Eccezione: per to='overworld' il motore riporta il player
   * all'ultima posizione che aveva nell'overworld (spawn ignorato).
   */
  spawn?: { x: number; y: number; dir: Dir }
}

export interface EffectDef {
  /** fireworks: fuochi d'artificio nell'area; petals: petali che cadono */
  type: 'fireworks' | 'petals'
  x: number
  y: number
  w: number
  h: number
}

export interface Scene {
  id: SceneId
  /** nome mostrato nel banner d'ingresso, es. "Budapest — La fuga romantica" */
  name: string
  width: number
  height: number
  legend: Record<string, TileDef>
  ground: string[]
  buildings: PlacedBuilding[]
  props: PlacedProp[]
  signs: SignDef[]
  npcs: NpcDef[]
  exits: ExitDef[]
  spawn: { x: number; y: number; dir: Dir }
  /** default 'day'. 'sunset' e 'night' applicano tinte + glow dei lampioni */
  ambience?: 'day' | 'sunset' | 'night'
  /** override dello sprite del player (es. 'boat' sul Danubio) */
  playerSprite?: CharacterKey
  effects?: EffectDef[]
}
