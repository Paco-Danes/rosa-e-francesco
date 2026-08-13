/**
 * TORVAIANICA — «Sale e tramonti»: il mare di casa al tramonto.
 *
 * A nord i giardini e il sentiero che riporta al mondo; in mezzo il chiosco
 * "La dolce vita" e il lungomare di assi di legno con panchine e lampioni;
 * a sud la spiaggia con gli ombrelloni, la cabina a righe, il bagnasciuga
 * e il pontile che entra nel mare fino al posto dei tramonti.
 *
 * NOTA layout: qui il mare è a SUD, quindi l'uscita verso l'overworld è sul
 * bordo NORD (deroga al template) e lo spawn le sta appena sotto, dir 'down'.
 */
import type { Scene } from './types'
import { chioscoGelato, cabinaMare } from '../art/buildings/torvaianica'

export const torvaianicaScene: Scene = {
  id: 'torvaianica',
  name: 'Torvaianica — Sale e tramonti',
  width: 26,
  height: 20,
  ambience: 'sunset',
  legend: {
    g: { base: 'grass' },
    G: { base: 'grass2' },
    f: { base: 'flowers' },
    t: { base: 'tallGrass' },
    p: { base: 'path' },
    w: { base: 'wood' },
    s: { base: 'sand' },
    q: { base: 'sandWet' },
    b: { base: 'water', solid: true },
    B: { base: 'deepWater', solid: true },
  },
  // 26×20 — sentiero a nord (x11-14), lungomare y9-10, spiaggia, mare a sud;
  // il pontile di legno (x18-19) scende dal lungomare fin dentro l'acqua.
  ground: [
    'ggGgfgggGggppppggfgGggGggg', // 0  ← uscita verso l'overworld
    'gfgggGgggfgppppgGgggfgggGg', // 1
    'ggggtggggggppppgggtgggfggg', // 2  ← spawn (12,2)
    'gGgfgggGgggppppggggGggttgg', // 3
    'ggggggggfggppppgfgggggtggg', // 4  ← chiosco (x3-7)
    'gggggggggGgppppggGgfgggggg', // 5
    'gGgggggggfgppppgggggGggggg', // 6
    'gggggggggggppppgfgggggggGg', // 7
    'gggppppppppppppgggfgggGggg', // 8  ← piazzetta del chiosco
    'wwwwwwwwwwwwwwwwwwwwwwwwww', // 9  ← lungomare
    'wwwwwwwwwwwwwwwwwwwwwwwwww', // 10
    'sssssssssssssssssswwssssss', // 11 ← spiaggia + pontile
    'sssssssssssssssssswwssssss', // 12
    'sssssssssssssssssswwssssss', // 13
    'qqqqqqqqqqqqqqqqqqwwqqqqqq', // 14 ← bagnasciuga
    'bbbbbbbbbbbbbbbbbbwwbbbbbb', // 15
    'bbbbbbbbbbbbbbbbbbwwbbbbbb', // 16
    'BBBBBBBBBBBBBBBBBBwwBBBBBB', // 17 ← punta del pontile
    'BBBBBBBBBBBBBBBBBBBBBBBBBB', // 18
    'BBBBBBBBBBBBBBBBBBBBBBBBBB', // 19
  ],
  buildings: [
    // Chiosco "La dolce vita": facciata sulla piazzetta, solo la facciata è solida.
    { sprite: chioscoGelato, x: 3, y: 4, solid: { x: 0, y: 2, w: 5, h: 2 } },
    // Cabina balneare a righe sulla sabbia, in fondo al lungomare.
    { sprite: cabinaMare, x: 23, y: 10, solid: { x: 0, y: 1, w: 3, h: 2 } },
  ],
  props: [
    // giardini a nord
    { prop: 'palm', x: 0, y: 3 },
    { prop: 'palm', x: 23, y: 3 },
    { prop: 'palm', x: 20, y: 7 },
    { prop: 'tree', x: 16, y: 3 },
    { prop: 'bush', x: 0, y: 7 },
    { prop: 'roseBush', x: 10, y: 6 },
    { prop: 'flowerPatch', x: 2, y: 2 },
    { prop: 'flowerPatch', x: 18, y: 6 },
    { prop: 'flowerPatch', x: 21, y: 4 },
    // la piazzetta del chiosco
    { prop: 'pot', x: 2, y: 7 },
    { prop: 'pot', x: 8, y: 7 },
    { prop: 'table', x: 0, y: 8 },
    { prop: 'cat', x: 7, y: 8 },
    // lungomare
    { prop: 'bench', x: 3, y: 9 },
    { prop: 'bench', x: 20, y: 9 },
    { prop: 'lamp', x: 0, y: 10 },
    { prop: 'lamp', x: 10, y: 10 },
    { prop: 'lamp', x: 16, y: 10 },
    // spiaggia
    { prop: 'umbrella', x: 2, y: 13 },
    { prop: 'umbrella', x: 13, y: 13 },
    { prop: 'sunbed', x: 5, y: 12 },
    { prop: 'sunbed', x: 15, y: 13 },
    { prop: 'towel', x: 6, y: 13 },
    { prop: 'towel', x: 11, y: 12 },
    { prop: 'rocks', x: 21, y: 13 },
    { prop: 'gull', x: 7, y: 11 },
    { prop: 'gull', x: 16, y: 12 },
    { prop: 'gull', x: 24, y: 14 },
    // mare
    { prop: 'buoy', x: 4, y: 16 },
    { prop: 'buoy', x: 22, y: 16 },
    { prop: 'buoy', x: 15, y: 18 },
  ],
  signs: [
    {
      x: 9,
      y: 7,
      label: 'La dolce vita',
      lines: [
        'Il chiosco con il nome giusto.',
        'Tu sempre indecisa sul gusto, io sempre deciso su di te.',
        "Due coni, un'unica dolce vita.",
      ],
      memoryId: 'tor-gelato',
    },
    {
      x: 18,
      y: 17,
      label: 'Il tramonto',
      lines: [
        'Da qui il sole si scioglie nel mare, piano piano.',
        '«Ancora cinque minuti» — lo diciamo da un anno intero.',
        'Restiamo. Sempre altri cinque minuti.',
      ],
      memoryId: 'tor-tramonto',
    },
    {
      x: 8,
      y: 14,
      kind: 'none',
      label: 'Il nostro mare',
      lines: [
        'Il mare di casa: niente cartoline, solo noi.',
        'Le onde contano i secondi meglio di qualsiasi orologio.',
        'E ci hanno visti felici.',
      ],
      memoryId: 'tor-mare',
    },
  ],
  npcs: [
    {
      character: 'npcKid',
      x: 5,
      y: 8,
      dir: 'down',
      lines: [
        'Il pistacchio è il migliore. Non accetto opinioni.',
        '...va bene, forse anche stracciatella.',
      ],
    },
    {
      character: 'npcWoman',
      x: 16,
      y: 9,
      wander: true,
      lines: ['Che colori, stasera.', 'Qui i tramonti non si guardano: si aspettano.'],
    },
    {
      character: 'npcMan',
      x: 18,
      y: 13,
      dir: 'down',
      lines: ['Ogni sera lo stesso spettacolo.', 'E ogni sera io applaudo.'],
    },
  ],
  exits: [{ x: 11, y: 0, w: 4, h: 1, to: 'overworld' }],
  spawn: { x: 12, y: 2, dir: 'down' },
}
