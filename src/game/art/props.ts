// STUB — sostituito dai props completi (vedi catalog.ts per il contratto).
import { sprite } from './format'
import type { PropKey, PropSpec } from './catalog'

const bush: PropSpec = {
  sprite: sprite([
    '....GGGGGGGG....',
    '..GGgggggggGGG..',
    '.GgggvggvgggggG.',
    'GgggggggggggggGG',
    'GggvgggggvggggGG',
    '.GGgggggggggGGG.',
    '..GGGGGGGGGGGG..',
    '....KK....KK....',
  ]),
  solid: true,
  footprint: { w: 1, h: 1 },
}

const stub: Partial<Record<PropKey, PropSpec>> = { bush }

export const PROPS = new Proxy(stub, {
  get: (t, k: string) => (t as Record<string, PropSpec>)[k] ?? bush,
}) as Record<PropKey, PropSpec>
