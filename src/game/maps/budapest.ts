/**
 * BUDAPEST — «La fuga romantica», in due scene.
 *
 *  - danubioScene: la traversata notturna in barchetta. Il player È la
 *    barca (playerSprite 'boat'); si entra dal bordo ovest e si rema fino
 *    al molo di legno sul bordo est, che porta alla città.
 *  - budapestScene: la città d'oro di notte — il Parlamento illuminato,
 *    il Ponte delle Catene coi leoni, il Bastione dei Pescatori.
 */
import type { Scene } from './types'
import {
  parlamento,
  bastione,
  ponteCatene,
  nottePalazzo,
  notteCase,
  notteChiesa,
  notteCupola,
  ponteTorreNotte,
  ponteCampataNotte,
} from '../art/buildings/budapest'

/* ────────────────────────────────────────────────────────────────────────
 * IL DANUBIO DI NOTTE — 30×14, traversata pura: niente NPC, niente exit
 * verso l'overworld. Rive solide con le silhouette della città addormentata,
 * il Ponte delle Catene illuminato in alto, boe che dondolano.
 * ──────────────────────────────────────────────────────────────────────── */
export const danubioScene: Scene = {
  id: 'danubio',
  name: 'Il Danubio di notte',
  width: 30,
  height: 14,
  ambience: 'night',
  playerSprite: 'boat',
  legend: {
    Q: { base: 'cobble', solid: true }, // riva
    S: { base: 'sidewalk', solid: true }, // banchina
    E: { base: 'deepWater', solid: true }, // acqua sotto il ponte / non navigabile
    D: { base: 'deepWater' }, // acqua navigabile
    w: { base: 'wood' }, // molo d'arrivo
  },
  ground: [
    'QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ',
    'QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ',
    'QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ',
    'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS',
    'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
    'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
    'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    'DDDDDDDDDDDDDDDDDDDDDDDDDDDwww',
    'DDDDDDDDDDDDDDDDDDDDDDDDDDDwww',
    'DDDDDDDDDDDDDDDDDDDDDDDDDDDwww',
    'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS',
    'QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ',
    'QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ',
  ],
  buildings: [
    // riva nord: la città addormentata
    { sprite: nottePalazzo, x: 0, y: 0, solid: { x: 0, y: 2, w: 4, h: 1 } },
    { sprite: notteChiesa, x: 5, y: 0, solid: { x: 0, y: 3, w: 3, h: 1 } },
    { sprite: notteCase, x: 9, y: 0, solid: { x: 0, y: 2, w: 5, h: 1 } },
    { sprite: notteCupola, x: 15, y: 0, solid: { x: 0, y: 3, w: 4, h: 1 } },
    { sprite: nottePalazzo, x: 20, y: 0, solid: { x: 0, y: 2, w: 4, h: 1 } },
    { sprite: notteCase, x: 25, y: 0, solid: { x: 0, y: 2, w: 5, h: 1 } },
    // il Ponte delle Catene, «collana di perle» sopra l'acqua
    { sprite: ponteCampataNotte, x: 0, y: 3, solid: { x: 0, y: 2, w: 6, h: 1 } },
    { sprite: ponteTorreNotte, x: 6, y: 2, solid: { x: 0, y: 3, w: 3, h: 1 } },
    { sprite: ponteCampataNotte, x: 9, y: 3, solid: { x: 0, y: 2, w: 6, h: 1 } },
    { sprite: ponteCampataNotte, x: 15, y: 3, solid: { x: 0, y: 2, w: 6, h: 1 } },
    { sprite: ponteTorreNotte, x: 21, y: 2, solid: { x: 0, y: 3, w: 3, h: 1 } },
    { sprite: ponteCampataNotte, x: 24, y: 3, solid: { x: 0, y: 2, w: 6, h: 1 } },
    // riva sud: le case basse in prima fila
    { sprite: notteCase, x: 0, y: 11, solid: { x: 0, y: 2, w: 5, h: 1 } },
    { sprite: nottePalazzo, x: 6, y: 11, solid: { x: 0, y: 2, w: 4, h: 1 } },
    { sprite: notteCase, x: 11, y: 11, solid: { x: 0, y: 2, w: 5, h: 1 } },
    { sprite: nottePalazzo, x: 17, y: 11, solid: { x: 0, y: 2, w: 4, h: 1 } },
    { sprite: notteCase, x: 22, y: 11, solid: { x: 0, y: 2, w: 5, h: 1 } },
  ],
  props: [
    { prop: 'lamp', x: 4, y: 3 },
    { prop: 'lamp', x: 14, y: 3 },
    { prop: 'lamp', x: 19, y: 3 },
    { prop: 'lamp', x: 24, y: 3 },
    { prop: 'lamp', x: 5, y: 12 },
    { prop: 'lamp', x: 10, y: 12 },
    { prop: 'lamp', x: 16, y: 12 },
    { prop: 'lamp', x: 21, y: 12 },
    { prop: 'lamp', x: 27, y: 12 },
    { prop: 'buoy', x: 5, y: 6 },
    { prop: 'buoy', x: 9, y: 9 },
    { prop: 'buoy', x: 13, y: 10 },
    { prop: 'buoy', x: 18, y: 6 },
    { prop: 'buoy', x: 23, y: 9 },
    { prop: 'cat', x: 28, y: 11 },
  ],
  signs: [
    {
      x: 14,
      y: 8,
      kind: 'none',
      label: 'Il Danubio di notte',
      lines: [
        'La città scorre lenta ai lati, le luci tremano sull’acqua nera.',
        'Rema piano: certe notti vanno solo assaporate.',
      ],
      memoryId: 'bud-danubio',
    },
  ],
  npcs: [],
  exits: [
    // il molo di legno sul bordo est → si sbarca a Budapest
    { x: 29, y: 7, w: 1, h: 3, to: 'budapest', spawn: { x: 13, y: 20, dir: 'up' } },
  ],
  spawn: { x: 1, y: 8, dir: 'right' },
}

/* ────────────────────────────────────────────────────────────────────────
 * BUDAPEST — 28×22, la città d'oro di notte. In alto a sinistra la terrazza
 * del Bastione (scale al centro della siepe), a destra il Parlamento con la
 * piazza; in basso il Ponte delle Catene coi leoni, poi la banchina sul
 * Danubio con il molo di legno che riporta al mondo.
 * ──────────────────────────────────────────────────────────────────────── */
export const budapestScene: Scene = {
  id: 'budapest',
  name: 'Budapest — La fuga romantica',
  width: 28,
  height: 22,
  ambience: 'night',
  legend: {
    p: { base: 'plaza' },
    c: { base: 'cobble' },
    s: { base: 'sidewalk' },
    a: { base: 'path' }, // scalinata del Bastione
    w: { base: 'wood' }, // molo
    g: { base: 'grass' },
    G: { base: 'grass2' },
    f: { base: 'flowers' },
    T: { base: 'tallGrass' },
    h: { base: 'hedge', solid: true }, // parapetto della terrazza
    E: { base: 'deepWater', solid: true }, // il Danubio
  },
  ground: [
    'ppppppppppppppgGggfggGfggGgT',
    'ppppppppppppppGgfgGgfgggTggG',
    'ppppppppppppppggGpppppppgfgG',
    'ppppppppppppppgGgpppppppGgfg',
    'ppppppppppppppfggpppppppgGgg',
    'ppppppppppppppgGfpppppppfggT',
    'ppppppppppppppgggpppppppgGgg',
    'hhhhhhaahhhhhhgfGpppppppggfG',
    'cccccccccccccccppppppppppppg',
    'cccccccccccccccppppppppppppG',
    'ccccccccppppppccccccccccfgGf',
    'ccccccccppppppccccccccccgfgg',
    'ccccccccppppppccccccccccTTgG',
    'ccccccccccccccccccccccffffTG',
    'ccccccccccccccccccccccffffGT',
    'ccccccccccccccccccccccccccgg',
    'cccccccccccccccccccccccccccc',
    'cccccccccccccccccccccccccccc',
    'ssssssssssssssssssssssssssss',
    'ssssssssssssswwsssssssssssss',
    'EEEEEEEEEEEEEwwEEEEEEEEEEEEE',
    'EEEEEEEEEEEEEwwEEEEEEEEEEEEE',
  ],
  buildings: [
    { sprite: bastione, x: 2, y: 0, solid: { x: 0, y: 2, w: 7, h: 3 } },
    { sprite: parlamento, x: 17, y: 2, solid: { x: 0, y: 3, w: 7, h: 3 } },
    { sprite: ponteCatene, x: 0, y: 11, solid: { x: 0, y: 1, w: 6, h: 3 } },
  ],
  props: [
    // la terrazza del Bastione
    { prop: 'lamp', x: 1, y: 6 },
    { prop: 'lamp', x: 12, y: 6 },
    { prop: 'pot', x: 0, y: 6 },
    { prop: 'pot', x: 13, y: 6 },
    { prop: 'roseBush', x: 10, y: 5 },
    // il verde attorno al Parlamento
    { prop: 'tree', x: 14, y: 2 },
    { prop: 'tree', x: 25, y: 1 },
    { prop: 'tree', x: 24, y: 5 },
    { prop: 'cypress', x: 16, y: 4 },
    { prop: 'cypress', x: 27, y: 3 },
    { prop: 'pot', x: 18, y: 8 },
    { prop: 'pot', x: 22, y: 8 },
    { prop: 'lamp', x: 15, y: 9 },
    { prop: 'lamp', x: 26, y: 9 },
    // strade, piazzetta della fontana, aiuole
    { prop: 'lamp', x: 7, y: 10 },
    { prop: 'lamp', x: 23, y: 10 },
    { prop: 'fountain', x: 10, y: 11 },
    { prop: 'lamp', x: 7, y: 13 },
    { prop: 'lamp', x: 18, y: 13 },
    { prop: 'roseBush', x: 22, y: 13 },
    { prop: 'flowerPatch', x: 24, y: 13 },
    { prop: 'flowerPatch', x: 23, y: 14 },
    { prop: 'pot', x: 25, y: 14 },
    // i leoni del Ponte delle Catene
    { prop: 'statue', x: 0, y: 15 },
    { prop: 'statue', x: 5, y: 15 },
    // il chiosco dei langos
    { prop: 'table', x: 23, y: 16 },
    { prop: 'barrel', x: 25, y: 16 },
    { prop: 'cat', x: 11, y: 17 },
    // il viale verso il molo
    { prop: 'bench', x: 16, y: 16 },
    { prop: 'lamp', x: 12, y: 17 },
    { prop: 'lamp', x: 15, y: 17 },
    { prop: 'pot', x: 0, y: 17 },
    { prop: 'pot', x: 27, y: 17 },
    // la banchina sul Danubio
    { prop: 'bench', x: 4, y: 18 },
    { prop: 'bench', x: 21, y: 18 },
    { prop: 'lamp', x: 0, y: 19 },
    { prop: 'lamp', x: 9, y: 19 },
    { prop: 'lamp', x: 18, y: 19 },
    { prop: 'lamp', x: 27, y: 19 },
  ],
  signs: [
    {
      x: 18,
      y: 9,
      label: 'Il Parlamento',
      lines: [
        'Mille finestre dorate accese sul Danubio.',
        'Maestoso, sì. Ma quella sera la meraviglia vera era un’altra…',
      ],
      memoryId: 'bud-parlamento',
    },
    {
      x: 2,
      y: 15,
      label: 'Il Ponte delle Catene',
      lines: [
        'I leoni di pietra fanno la guardia da due secoli.',
        'Da Buda a Pest mano nella mano: i ponti sanno unire.',
      ],
      memoryId: 'bud-ponte',
    },
    {
      x: 3,
      y: 5,
      label: 'Il Bastione dei Pescatori',
      lines: [
        'Torri bianche come in una fiaba, e la città d’oro distesa sotto.',
        'Se esiste un posto fatto per le promesse, è questo.',
      ],
      memoryId: 'bud-bastione',
    },
  ],
  npcs: [
    {
      character: 'npcMan',
      x: 17,
      y: 11,
      dir: 'down',
      label: 'Il violinista',
      lines: ['Una canzone lenta, solo per voi due.', 'Il Danubio tiene il tempo… io ci metto il cuore.'],
    },
    {
      character: 'npcMan',
      x: 24,
      y: 15,
      dir: 'down',
      label: 'Il venditore di langos',
      lines: ['Langos caldi, appena fritti!', 'Perfetti da dividere in due… come fate voi, no?'],
    },
    {
      character: 'npcWoman',
      x: 20,
      y: 18,
      dir: 'down',
      wander: true,
      label: 'Una signora sul lungofiume',
      lines: ['Ogni sera vengo a salutare il fiume.', 'Stanotte le luci sembrano accese apposta per voi.'],
    },
  ],
  exits: [
    // dal molo di legno si torna al mondo
    { x: 13, y: 21, w: 2, h: 1, to: 'overworld' },
  ],
  spawn: { x: 13, y: 20, dir: 'up' },
}
