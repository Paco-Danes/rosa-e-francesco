/**
 * BUDAPEST — «La fuga romantica», in due scene.
 *
 *  - danubioScene: la traversata notturna in barchetta. Il player È la
 *    barca (playerSprite 'boat'); dall'overworld si entra dal bordo ovest
 *    e si rema fino al molo di legno sul bordo est, che porta alla città.
 *    Il viaggio è simmetrico: dal molo di Budapest si risale in barca e,
 *    remando verso ovest, il bordo ovest riporta al molo dell'overworld.
 *  - budapestScene: la città d'oro di notte — il Parlamento illuminato,
 *    il Bastione dei Pescatori e il Ponte delle Catene sospeso su un vero
 *    canale d'acqua che sfocia nel Danubio: l'impalcato tra le due torri
 *    si attraversa a piedi, con l'acqua che luccica sotto le arcate.
 *    A est, il parco del ghiaccio: la pista di pattinaggio bordata di
 *    legno e la ruota panoramica accesa che veglia sui pattinatori.
 */
import type { Scene } from './types'
import {
  parlamento,
  bastione,
  ponteTorreCitta,
  ponteCatenaCitta,
  ponteArcataCitta,
  nottePalazzo,
  notteCase,
  notteChiesa,
  notteCupola,
  ponteTorreNotte,
  ponteCampataNotte,
  ruota,
} from '../art/buildings/budapest'

/* ────────────────────────────────────────────────────────────────────────
 * IL DANUBIO DI NOTTE — 30×14, la traversata: niente NPC, solo il fiume.
 * Rive solide con le silhouette della città addormentata, il Ponte delle
 * Catene illuminato in alto, boe che dondolano. Si naviga in entrambi i
 * sensi: verso est si sbarca a Budapest, verso ovest si torna al mondo.
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
    // il bordo ovest → si torna al molo dell'overworld (posizione ricordata dal motore)
    { x: 0, y: 6, w: 1, h: 5, to: 'overworld' },
  ],
  spawn: { x: 1, y: 8, dir: 'right' },
}

/* ────────────────────────────────────────────────────────────────────────
 * BUDAPEST — 34×22, la città d'oro di notte. In alto a sinistra la terrazza
 * del Bastione (scale al centro della siepe), al centro il Parlamento con la
 * piazza; in basso a sinistra il canale che sfocia nel Danubio, attraversato
 * dal Ponte delle Catene: due torri di pietra sulle sponde e l'impalcato
 * calpestabile in mezzo, con l'acqua che passa sotto le arcate. A sud la
 * banchina e il molo di legno da cui si riparte in barca. Sul lato est,
 * oltre i giardini del Parlamento, il parco del ghiaccio: la pista bordata
 * da un cordolo di legno (varco a sud, passerella verso la strada) e,
 * subito dietro, la grande ruota panoramica illuminata.
 * ──────────────────────────────────────────────────────────────────────── */
export const budapestScene: Scene = {
  id: 'budapest',
  name: 'Budapest — La fuga romantica',
  width: 34,
  height: 22,
  ambience: 'night',
  legend: {
    p: { base: 'plaza' },
    c: { base: 'cobble' },
    s: { base: 'sidewalk' },
    a: { base: 'path' }, // scalinata del Bastione
    w: { base: 'wood' }, // molo, passerella e varco della pista
    g: { base: 'grass' },
    G: { base: 'grass2' },
    f: { base: 'flowers' },
    T: { base: 'tallGrass' },
    h: { base: 'hedge', solid: true }, // parapetto della terrazza
    E: { base: 'deepWater', solid: true }, // il Danubio e il canale
    I: { base: 'ice' }, // la pista di pattinaggio: ci si scivola sopra
    b: { base: 'wood', solid: true }, // cordolo basso di legno della pista
  },
  ground: [
    'ppppppppppppppgGggfggGfggGggGgfggG',
    'ppppppppppppppGgfgGgfgggTggfgGggfg',
    'ppppppppppppppggGpppppppgfggfgGggf',
    'ppppppppppppppgGgpppppppGggGgfggGg',
    'ppppppppppppppfggpppppppgGgfggGgfg',
    'ppppppppppppppgGfpppppppfgggGgfggG',
    'ppppppppppppppgggpppppppgGgfgGggfg',
    'hhhhhhaahhhhhhgfGpppppppgggfgggfgg',
    'cccccccccccccccppppppppppppbbbbbbb',
    'cccccccccccccccppppppppppppbIIIIIb',
    'ccccccccppppppccccccccccfggbIIIIIb',
    'ccccccccppppppccccccccccgfgbIIIIIb',
    'ccEEEEccppppppccccccccccTTgbIIIIIb',
    'ccEEEEccccccccccccccccffffgbbbwbbb',
    'ccEEEEccccccccccccccccffffggfgwgfg',
    'ccppppccccccccccccccccccccggggwggg',
    'ccEEEEcccccccccccccccccccccccccccc',
    'ccEEEEcccccccccccccccccccccccccccc',
    'ssEEEEssssssssssssssssssssssssssss',
    'ssEEEEssssssswwsssssssssssssssssss',
    'EEEEEEEEEEEEEwwEEEEEEEEEEEEEEEEEEE',
    'EEEEEEEEEEEEEwwEEEEEEEEEEEEEEEEEEE',
  ],
  buildings: [
    { sprite: bastione, x: 2, y: 0, solid: { x: 0, y: 2, w: 7, h: 3 } },
    { sprite: parlamento, x: 17, y: 2, solid: { x: 0, y: 3, w: 7, h: 3 } },
    // la ruota panoramica, subito a nord della pista: solida solo alla base
    // delle gambe, così si passeggia dietro al grande cerchio illuminato
    { sprite: ruota, x: 27, y: 0, solid: { x: 0, y: 5, w: 6, h: 2 } },
    // il Ponte delle Catene: una torre per sponda, l'impalcato è di tile
    { sprite: ponteTorreCitta, x: 0, y: 11, solid: { x: 0, y: 2, w: 2, h: 2 } },
    { sprite: ponteTorreCitta, x: 6, y: 11, solid: { x: 0, y: 2, w: 2, h: 2 } },
    // festone di catene sospeso sull'acqua a monte (non solido, dietro al player)
    { sprite: ponteCatenaCitta, x: 2, y: 12, solid: { x: 0, y: 0, w: 0, h: 0 } },
    // fianco a valle dell'impalcato: sotto le arcate luccica il canale
    { sprite: ponteArcataCitta, x: 2, y: 16, solid: { x: 0, y: 0, w: 0, h: 0 } },
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
    { prop: 'cypress', x: 26, y: 2 },
    { prop: 'pot', x: 18, y: 8 },
    { prop: 'pot', x: 22, y: 8 },
    { prop: 'lamp', x: 15, y: 9 },
    { prop: 'lamp', x: 26, y: 9 },
    // strade, piazzetta della fontana, aiuole
    { prop: 'lamp', x: 7, y: 10 },
    { prop: 'lamp', x: 23, y: 10 },
    { prop: 'fountain', x: 10, y: 11 },
    { prop: 'lamp', x: 8, y: 13 },
    { prop: 'lamp', x: 18, y: 13 },
    { prop: 'roseBush', x: 22, y: 13 },
    { prop: 'flowerPatch', x: 24, y: 13 },
    { prop: 'flowerPatch', x: 23, y: 14 },
    { prop: 'pot', x: 25, y: 14 },
    // il canale e il Ponte delle Catene
    { prop: 'lamp', x: 3, y: 11 }, // sul bordo del bacino a monte
    { prop: 'lamp', x: 6, y: 17 }, // sulla sponda est del canale
    { prop: 'buoy', x: 3, y: 17 },
    { prop: 'buoy', x: 4, y: 19 },
    // i leoni di guardia ai piedi del ponte
    { prop: 'statue', x: 0, y: 16 },
    { prop: 'statue', x: 7, y: 16 },
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
    // il parco del ghiaccio: lampioni al varco, panchina per i pattini,
    // banchetto della cioccolata calda accanto alla passerella
    { prop: 'lamp', x: 27, y: 14 },
    { prop: 'lamp', x: 33, y: 14 },
    { prop: 'bench', x: 28, y: 14 },
    { prop: 'table', x: 31, y: 15 },
    { prop: 'barrel', x: 33, y: 15 },
    { prop: 'lamp', x: 33, y: 16 },
    // la banchina sul Danubio
    { prop: 'bench', x: 7, y: 18 },
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
      x: 8,
      y: 16,
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
    {
      x: 28,
      y: 13,
      label: 'La pista di ghiaccio',
      lines: [
        'Lame che disegnano cerchi, fiato che diventa nuvolette.',
        'Tienimi la mano: se cadiamo, cadiamo insieme.',
      ],
      memoryId: 'bud-ghiaccio',
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
    {
      character: 'npcKid',
      x: 29,
      y: 11,
      dir: 'right',
      wander: true,
      label: 'Un pattinatore piccolo',
      lines: ['Guarda! So andare all’indietro… quasi!', 'Se cadi, ridi: è la regola della pista.'],
    },
    {
      character: 'npcWoman',
      x: 31,
      y: 10,
      dir: 'down',
      wander: true,
      label: 'Una pattinatrice',
      lines: ['Che eleganza, voi due mano nella mano!', 'La ruota gira, noi giriamo… stanotte gira tutto d’amore.'],
    },
    {
      character: 'npcNonna',
      x: 32,
      y: 14,
      dir: 'left',
      label: 'La signora della cioccolata',
      lines: ['Cioccolata calda! Scalda le mani e pure i cuori.', 'Due tazze? Lo sapevo prima ancora che arrivaste.'],
    },
  ],
  exits: [
    // dal molo di legno si risale in barca: si torna sul Danubio, prua a ovest
    { x: 13, y: 21, w: 2, h: 1, to: 'danubio', spawn: { x: 28, y: 8, dir: 'left' } },
  ],
  spawn: { x: 13, y: 20, dir: 'up' },
}
