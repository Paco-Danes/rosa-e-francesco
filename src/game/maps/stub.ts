// STUB helper — usato solo dalle scene segnaposto, sparirà a lavori finiti.
import type { Scene, SceneId } from './types'

export function stubScene(id: SceneId, name: string): Scene {
  const width = 12
  const height = 10
  return {
    id,
    name,
    width,
    height,
    legend: { g: { base: 'grass' } },
    ground: Array.from({ length: height }, () => 'g'.repeat(width)),
    buildings: [],
    props: [],
    signs: [],
    npcs: [],
    exits: [{ x: 0, y: height - 1, w: width, h: 1, to: 'overworld' }],
    spawn: { x: 6, y: 5, dir: 'down' },
  }
}
