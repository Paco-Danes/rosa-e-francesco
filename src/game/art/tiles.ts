// STUB — sostituito dal tileset completo (vedi catalog.ts per il contratto).
import { sprite } from './format'
import type { TileKey, TileSpec } from './catalog'

const grass = sprite([
  'gggggggggggggggg',
  'ggggggvggggggggg',
  'gggggggggggggggg',
  'gggGgggggggggggg',
  'gggggggggggvgggg',
  'gggggggggggggggg',
  'gggggggGgggggggg',
  'gggggggggggggggg',
  'gvgggggggggggggg',
  'gggggggggggggggg',
  'ggggggggggGggggg',
  'gggggggggggggggg',
  'gggggggggggggggg',
  'ggGggggggvgggggg',
  'gggggggggggggggg',
  'gggggggggggggggg',
])

const stub: Partial<Record<TileKey, TileSpec>> = {
  grass: { frames: [grass] },
}

export const TILES = new Proxy(stub, {
  get: (t, k: string) => (t as Record<string, TileSpec>)[k] ?? { frames: [grass] },
}) as Record<TileKey, TileSpec>
