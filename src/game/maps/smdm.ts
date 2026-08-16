/**
 * ROMA, SANTA MARIA E DINTORNI — «Casa», la zona mista del cuore.
 *
 * Nessun realismo geografico: un piccolo mondo affettuoso che tiene insieme
 * il Colosseo sulla sua piazza, la rotonda con la chiesa di Santa Maria,
 * le Officine Ibba, la palestra "Il Gabbiano" col gabbiano sul tetto,
 * la casetta col tetto rosso, i due laghetti gemelli di Albano e Nemi
 * e — in alto a nord-est — l'angolo innevato di Ovindoli con la cabinovia.
 *
 * Legenda ground:  g erba · e erba con ciuffi · t erba alta · f fiorellini
 *                  p sentiero · S sentiero coi sassi · s marciapiede
 *                  a asfalto · P piazza/sagrato · c ciottolato · h siepe
 *                  r roccia · n neve · w acqua · d acqua profonda
 *                  W riva bagnata (calpestabile)
 */
import type { Scene } from './types'
import {
  smdmCabinovia,
  smdmCasaRosa,
  smdmChiesa,
  smdmColosseo,
  smdmGabbiano,
  smdmIbba,
  smdmNoemi,
  smdmRamona,
  smdmStazioneOvindoli,
} from '../art/buildings/smdm'

export const smdmScene: Scene = {
  id: 'smdm',
  name: 'Roma, Santa Maria e dintorni',
  width: 38,
  height: 28,
  ambience: 'day',
  legend: {
    g: { base: 'grass' },
    e: { base: 'grass2' },
    t: { base: 'tallGrass' },
    f: { base: 'flowers' },
    p: { base: 'path' },
    S: { base: 'pathStones' },
    s: { base: 'sidewalk' },
    a: { base: 'asphalt' },
    P: { base: 'plaza' },
    c: { base: 'cobble' },
    h: { base: 'hedge', solid: true },
    r: { base: 'rock', solid: true },
    n: { base: 'snow' },
    w: { base: 'water', solid: true },
    d: { base: 'deepWater', solid: true },
    W: { base: 'sandWet' },
  },
  //         01234567890123456789012345678901234567
  ground: [
    'hhhhhhhhhhhhhhhhhhhhhhhhhhrrrrrrrrrrrr', //  0  siepe di confine - creste di Ovindoli
    'ggegfggggggegppgfgeggetgggrnnnnnnnnnnn', //  1  neve dietro la cabinovia
    'gPPPPPPPPPPPPppgegfggtggegrnnnnnnnnnnn', //  2  piazza del Colosseo
    'ePPPPPPPPPPPPppggegfgeggtgrnnnnnnnnnrn', //  3  base del pilone destro
    'gPPPPPPPPPPPPppfgeggegtggernnnnnnnnnnn', //  4  stazioncina della cabinovia
    'gPPPPPPPPPPPPppgegtggfgetgrnnnnnnnnnnn', //  5
    'ePPPPPPPPPPPPppggfgegetgtgrnnnnnnnnnnn', //  6  fronte della stazioncina
    'gPPPPPPPPPPPPppgeggetggfggrrrrnnrrrrrr', //  7  varco nella roccia verso la neve
    'gPPPPPPPPPPPPpppppppppppppppppppgegtgg', //  8  passeggiata verso Ovindoli
    'gfgeggfgeggegpppppppppppppppppppgfgetg', //  9
    'ggeggegfgggegppgefggtggegfgeggtgegfgeg', // 10  parco fra i quartieri
    'ggggggggggsssssssssgegfggWWWWgggggfgeg', // 11  riva nord del lago Albano
    'gggggggPPPsaaaaaaassssssWwwwwWggggWWWg', // 12  panchina belvedere fra i laghi
    'gPPPPPPPPPsaafffaasaaaaaWwddwWgggWwwwW', // 13  rotonda - strada per i laghi
    'gPPPPPPPPPsaafffaasaaaaaWwddwWgggWwdwW', // 14  aiuola fiorita al centro
    'gPPPPPPPPPsaafffaassssssWwwwwWgggWwwwW', // 15
    'gPPPPPPPPPsaaaaaaasgfgeggWWWWgggggWWWg', // 16  sagrato della chiesa
    'gPPPPPPPPPsssssssssgegfgeggtggegfggegg', // 17
    'ggefggegtggesaasgegfggeggegtggefggetgg', // 18  strada verso sud
    'ggggggghhhhhsaasggggggggggggegfgetggeg', // 19  giardinetto del Gabbiano
    'ggggggghgfghsaasggggggggggggetggegfgge', // 20  la casa - le Officine
    'ggggggghggghsaasggggggggggggfgegtggegf', // 21
    'ggggggghgeghsaasgggggggggggggetggfgegg', // 22
    'gSSSSSShggghsaasgggggcccccccgegfggetgg', // 23  fronte palestra - dehors Ibba
    'gSSSSSShhphhsaasgSSggcccccccgetggegfge', // 24  varco del giardinetto - vialetto di casa
    'gpppppppppppsaasppppppppppppgfgegtgegg', // 25  stradina del quartiere sud
    'ggegfggetggesaasppppppppppppgfgegtgegg', // 26
    'ttttttttttttaaaatttttttttttttttttttttt', // 27  uscita verso il mondo
  ],
  buildings: [
    // Il Colosseo, showpiece romano sulla sua piazza
    { sprite: smdmColosseo, x: 3, y: 1, solid: { x: 0, y: 2, w: 6, h: 3 } },
    // La chiesa di travertino affacciata sul sagrato
    { sprite: smdmChiesa, x: 1, y: 10, solid: { x: 0, y: 3, w: 6, h: 3 } },
    // La cabinovia di Ovindoli: piloni, fune e cabinetta
    { sprite: smdmCabinovia, x: 31, y: 0, solid: { x: 0, y: 3, w: 1, h: 1 } },
    // La stazioncina di legno alla base della neve
    { sprite: smdmStazioneOvindoli, x: 27, y: 3, solid: { x: 0, y: 1, w: 4, h: 2 } },
    // Palestra "Il Gabbiano", col gabbiano scultoreo sul tetto
    { sprite: smdmGabbiano, x: 1, y: 18, solid: { x: 0, y: 2, w: 6, h: 3 } },
    // La nostra casa, tetto rosso e comignolo
    { sprite: smdmCasaRosa, x: 16, y: 19, solid: { x: 0, y: 2, w: 4, h: 3 } },
    // Caffè "Officine Ibba", mattoni e cornetti
    { sprite: smdmIbba, x: 22, y: 19, solid: { x: 0, y: 2, w: 5, h: 2 } },
  ],
  props: [
    // piazza del Colosseo: lampioni e pini romani
    { prop: 'lamp', x: 1, y: 3 },
    { prop: 'lamp', x: 12, y: 3 },
    { prop: 'lamp', x: 1, y: 8 },
    { prop: 'lamp', x: 12, y: 8 },
    { prop: 'pine', x: 10, y: 2 },
    { prop: 'pine', x: 2, y: 8 },
    { prop: 'cypress', x: 0, y: 6 },
    // parco fra i quartieri
    { prop: 'tree', x: 16, y: 3 },
    { prop: 'tree', x: 21, y: 4 },
    { prop: 'pine', x: 24, y: 2 },
    { prop: 'bush', x: 15, y: 5 },
    { prop: 'bush', x: 22, y: 6 },
    { prop: 'lamp', x: 19, y: 7 },
    { prop: 'lamp', x: 25, y: 7 },
    { prop: 'tree', x: 23, y: 10 },
    // angolo Ovindoli: abeti fra la neve e rocce
    { prop: 'pine', x: 28, y: 1 },
    { prop: 'pine', x: 35, y: 5 },
    { prop: 'pine', x: 33, y: 6 },
    { prop: 'rocks', x: 36, y: 6 },
    // chiesa e sagrato
    { prop: 'cypress', x: 7, y: 11 },
    { prop: 'cypress', x: 0, y: 13 },
    { prop: 'pot', x: 2, y: 16 },
    { prop: 'pot', x: 6, y: 16 },
    { prop: 'bench', x: 8, y: 16 },
    // la rotonda: statuina e rose nell'aiuola
    { prop: 'statue', x: 14, y: 14 },
    { prop: 'roseBush', x: 13, y: 13 },
    { prop: 'roseBush', x: 15, y: 15 },
    { prop: 'lamp', x: 10, y: 11 },
    { prop: 'lamp', x: 18, y: 17 },
    // i due laghetti: belvedere, boe e gabbiani
    { prop: 'bench', x: 30, y: 12 },
    { prop: 'tree', x: 21, y: 11 },
    { prop: 'tree', x: 33, y: 11 },
    { prop: 'buoy', x: 25, y: 13 },
    { prop: 'buoy', x: 36, y: 14 },
    { prop: 'gull', x: 24, y: 12 },
    { prop: 'gull', x: 28, y: 16 },
    { prop: 'tree', x: 24, y: 17 },
    { prop: 'tree', x: 35, y: 17 },
    { prop: 'flowerPatch', x: 28, y: 17 },
    { prop: 'flowerPatch', x: 33, y: 17 },
    // palestra "Il Gabbiano" e giardinetto recintato
    { prop: 'pot', x: 1, y: 23 },
    { prop: 'tree', x: 8, y: 21 },
    { prop: 'flowerPatch', x: 10, y: 20 },
    { prop: 'roseBush', x: 10, y: 23 },
    // la nostra casa: rose e gatto sul vialetto
    { prop: 'roseBush', x: 16, y: 24 },
    { prop: 'roseBush', x: 19, y: 24 },
    { prop: 'cat', x: 18, y: 25 },
    { prop: 'lamp', x: 12, y: 19 },
    { prop: 'lamp', x: 15, y: 24 },
    // dehors delle Officine Ibba
    { prop: 'table', x: 22, y: 24 },
    { prop: 'table', x: 25, y: 24 },
    { prop: 'pot', x: 27, y: 23 },
    { prop: 'barrel', x: 27, y: 24 },
    // angolo dei Castelli a sud-est: ulivi, vite e botte
    { prop: 'olive', x: 30, y: 20 },
    { prop: 'pine', x: 34, y: 20 },
    { prop: 'tree', x: 31, y: 23 },
    { prop: 'vine', x: 29, y: 25 },
    { prop: 'barrel', x: 31, y: 25 },
    { prop: 'flowerPatch', x: 33, y: 24 },
    { prop: 'bush', x: 36, y: 22 },
    { prop: 'tree', x: 34, y: 26 },
    // prato a sud-ovest
    { prop: 'tree', x: 2, y: 26 },
    { prop: 'bench', x: 8, y: 26 },
  ],
  signs: [
    {
      x: 5,
      y: 7,
      label: 'Il Colosseo',
      lines: [
        'Roma caput mundi: il Colosseo, i gladiatori, i turisti.',
        'E noi due con le mani in pasta, a impastare ridendo la pizza più bella della città eterna.',
      ],
      memoryId: 'smdm-colosseo',
    },
    {
      x: 13,
      y: 15,
      label: 'La piazza con la rotonda',
      lines: [
        'La rotonda, i lampioni, il giro lento della piazza.',
        '«Due passi e torniamo», dicevi. Non sono mai stati solo due.',
      ],
      memoryId: 'smdm-piazza',
    },
    {
      x: 20,
      y: 24,
      label: 'La nostra casa',
      lines: [
        'Il tetto rosso, il comignolo che fuma, le rose sul vialetto.',
        'Il posto più bello del mondo non è su nessuna mappa.',
        'È qui, dove ci sei tu.',
      ],
      memoryId: 'smdm-casa-rosa',
    },
    {
      x: 6,
      y: 23,
      label: 'Palestra "Il Gabbiano"',
      lines: [
        'Qui dentro vola un\'acrobata.',
        'Capriole, equilibri impossibili — e io, a bocca aperta, col cuore in gola.',
      ],
      memoryId: 'smdm-gabbiano',
    },
    {
      x: 21,
      y: 23,
      label: 'Officine Ibba',
      lines: [
        'Il nostro tavolino è quello vicino alla vetrina.',
        'Cornetti caldi, chiacchiere lente e domeniche che non volevano finire.',
      ],
    },
    {
      x: 32,
      y: 5,
      label: 'La neve di Ovindoli',
      lines: [
        'La neve che scricchiola, la cabinovia che sale piano piano.',
        'I guanti non bastano mai: le tue mani nelle mie, invece, sì.',
      ],
      memoryId: 'smdm-ovindoli',
    },
    {
      x: 31,
      y: 14,
      label: 'I laghi di Albano e Nemi',
      lines: [
        'Due laghi vicini vicini, ognuno col suo carattere.',
        'Come noi: bellissimi insieme. E a Nemi, le fragoline.',
      ],
      memoryId: 'smdm-laghi',
    },
    {
      x: 4,
      y: 16,
      kind: 'none',
      label: 'La chiesa sulla piazza',
      lines: [
        'Il campanile scandisce le ore, ma qui il tempo va più piano.',
        'Una candela accesa, per noi.',
      ],
    },
  ],
  npcs: [
    {
      character: 'npcNonna',
      x: 8,
      y: 15,
      dir: 'down',
      wander: true,
      label: 'Nonna in piazza',
      lines: [
        'Che bella coppia che siete…',
        'Vi guardo e mi torna in mente il mio Peppino, tanti anni fa.',
      ],
    },
    {
      character: 'npcKid',
      x: 10,
      y: 6,
      dir: 'right',
      wander: true,
      label: 'Bimbo di corsa',
      lines: ['Un giro del Colosseo senza fermarmi! Contami i secondi!', 'Pronti… via!'],
    },
    {
      character: 'npcWoman',
      custom: smdmRamona,
      x: 2,
      y: 23,
      dir: 'down',
      label: 'Ramona',
      lines: [
        'Benvenuti al Gabbiano! Scarpe pulite, mi raccomando.',
        'NOEMI! Chi ha messo i tappetini al contrario?!',
        'Quella ragazza… un disastro al giorno. Però le voglio bene.',
      ],
    },
    {
      character: 'npcWoman',
      custom: smdmNoemi,
      x: 4,
      y: 24,
      dir: 'down',
      label: 'Noemi',
      lines: [
        'Ci siamo divertiti un sacco, la Crociera è bellipfsssima,',
        'ah comunque non ci pfsono per 20 giorni che vado alle terme',
        'ma ricordatevi che sono laureata pfzzzs pfzzss',
      ],
    },
  ],
  exits: [{ x: 12, y: 27, w: 4, h: 1, to: 'overworld' }],
  spawn: { x: 13, y: 26, dir: 'up' },
  effects: [{ type: 'petals', x: 15, y: 18, w: 6, h: 8 }],
}
