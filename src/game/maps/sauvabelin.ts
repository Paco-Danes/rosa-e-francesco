// STUB — sostituito dalla scena vista-laterale della Torre di Sauvabelin.
import type { Scene } from './types'

export const sauvabelinScene: Scene = {
  id: 'sauvabelin',
  name: 'Torre di Sauvabelin',
  width: 12,
  height: 10,
  legend: { g: { base: 'wood' } },
  ground: Array.from({ length: 10 }, () => 'g'.repeat(12)),
  buildings: [],
  props: [],
  signs: [],
  npcs: [],
  exits: [{ x: 0, y: 9, w: 12, h: 1, to: 'lausanne' }],
  spawn: { x: 6, y: 5, dir: 'right' },
}
