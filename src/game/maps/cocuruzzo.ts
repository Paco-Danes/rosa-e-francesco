/**
 * COCURUZZO — «Le radici». Il borgo di collina, DI NOTTE, in festa.
 *
 * In alto la chiesetta col campanile e i fuochi d'artificio nel cielo;
 * sotto, il sagrato illuminato, i vicoli di pietra tra le casette,
 * la piazzetta con la fontana, la tavolata della festa e la piscina.
 *
 * Mappa 30×22. Ingresso e uscita sul bordo inferiore.
 */
import type { Scene } from './types'
import { casaPietra1, casaPietra2, casaPietra3, chiesetta } from '../art/buildings/cocuruzzo'

export const cocuruzzoScene: Scene = {
  id: 'cocuruzzo',
  name: 'Cocuruzzo — Le radici',
  width: 30,
  height: 22,
  ambience: 'night',
  legend: {
    g: { base: 'grass' },
    G: { base: 'grass2' },
    f: { base: 'flowers' },
    T: { base: 'tallGrass' },
    c: { base: 'cobble' },
    p: { base: 'plaza' },
    s: { base: 'sidewalk' },
    w: { base: 'water', solid: true },
    r: { base: 'rock', solid: true },
  },
  //         012345678901234567890123456789
  ground: [
    'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', //  0 cresta
    'rrTgGgfgGgTgggggggTgGgfgGggTrr', //  1 pendici con vigne
    'rTgGgfgGgTgfggggggfgGgTgfgGgTr', //  2
    'rgTgGgfgGgTggggggGgTgfgGgfgGgr', //  3
    'rgggGgfgGgTgggggggTgGgfgGgTggr', //  4 casetta sul poggio
    'rgggggggggggpppppgGgfgGgTggggr', //  5
    'rrrggggrrrrrppppprrrrrrrrrrrgr', //  6 terrazzamento
    'rggcccccccppppppppppgGgfgGgTgr', //  7 vicolo alto + sagrato
    'rggcccccccppppppppppccccccccgr', //  8
    'rgggggccgggggccccgggccccccccgr', //  9
    'rgggggccgggggccccgggccccccccgr', // 10 tetti dei vicoli
    'rgggggccgggggccccgggccccccccgr', // 11 tavolata della festa
    'rgggggccgggggccccgfgccccccccgr', // 12
    'rgcccccccccpppppppppccccccccgr', // 13 vicolo basso + piazzetta
    'rgcccccccccpppppppppgGgfgGgTgr', // 14
    'rgsssssssscpppppppppTgGgfgGggr', // 15 piscina + piazzetta
    'rgsswwwwsscpppppppppgfgGgTgGgr', // 16
    'rgsswwwwsscpppppppppGgTgfgGggr', // 17
    'rgsswwwwssgggccccggggGgfgTgGgr', // 18
    'rgssssssssgggccccgggTgGgfgGggr', // 19
    'rggTgGgfgGgTgccccgGgTgfgGgTggr', // 20 la strada che scende a valle
    'rrrrrrrrrrrrrccccrrrrrrrrrrrrr', // 21 uscita verso l'overworld
  ],
  buildings: [
    // la chiesetta in cima, col campanile e i fuochi sopra
    { sprite: chiesetta, x: 12, y: 1, solid: { x: 0, y: 3, w: 5, h: 3 } },
    // la casetta sul poggio, sopra il vicolo alto
    { sprite: casaPietra1, x: 4, y: 4, solid: { x: 0, y: 1, w: 3, h: 2 } },
    // le due casette del vicolo basso, separate dal vicoletto
    { sprite: casaPietra2, x: 2, y: 10, solid: { x: 0, y: 1, w: 4, h: 2 } },
    { sprite: casaPietra3, x: 8, y: 10, solid: { x: 0, y: 1, w: 3, h: 2 } },
  ],
  props: [
    // sagrato: lampioni, vasi in fiore ai lati del portale
    { prop: 'lamp', x: 10, y: 7 },
    { prop: 'lamp', x: 19, y: 7 },
    { prop: 'pot', x: 12, y: 7 },
    { prop: 'pot', x: 16, y: 7 },
    // la strada che scende dalla chiesa
    { prop: 'lamp', x: 12, y: 9 },
    { prop: 'lamp', x: 17, y: 10 },
    // tavolata della festa: tavoli in fila, botti e lucine
    { prop: 'lamp', x: 20, y: 9 },
    { prop: 'lamp', x: 26, y: 9 },
    { prop: 'barrel', x: 21, y: 9 },
    { prop: 'barrel', x: 25, y: 9 },
    { prop: 'table', x: 21, y: 11 },
    { prop: 'table', x: 23, y: 11 },
    { prop: 'table', x: 25, y: 11 },
    { prop: 'barrel', x: 27, y: 11 },
    { prop: 'barrel', x: 27, y: 12 },
    // vicoli: lampioni, botte e vasi tra le casette
    { prop: 'barrel', x: 2, y: 13 },
    { prop: 'lamp', x: 2, y: 14 },
    { prop: 'lamp', x: 7, y: 14 },
    { prop: 'pot', x: 7, y: 7 },
    // piazzetta: fontana, panchine, lampioni, il gatto del paese
    { prop: 'fountain', x: 14, y: 16 },
    { prop: 'bench', x: 11, y: 15 },
    { prop: 'bench', x: 17, y: 14 },
    { prop: 'lamp', x: 12, y: 13 },
    { prop: 'lamp', x: 18, y: 13 },
    { prop: 'lamp', x: 18, y: 17 },
    { prop: 'pot', x: 19, y: 17 },
    { prop: 'cat', x: 16, y: 17 },
    // piscina: lettini, teli, un lampione sul bordo
    { prop: 'sunbed', x: 2, y: 16 },
    { prop: 'sunbed', x: 2, y: 18 },
    { prop: 'towel', x: 8, y: 17 },
    { prop: 'towel', x: 3, y: 19 },
    { prop: 'lamp', x: 10, y: 18 },
    // il viale d'ingresso al borgo
    { prop: 'lamp', x: 12, y: 19 },
    { prop: 'lamp', x: 17, y: 19 },
    // pendici: filari di vite e ulivi
    { prop: 'vine', x: 2, y: 2 },
    { prop: 'vine', x: 7, y: 2 },
    { prop: 'vine', x: 18, y: 2 },
    { prop: 'vine', x: 23, y: 2 },
    { prop: 'vine', x: 20, y: 4 },
    { prop: 'vine', x: 8, y: 5 },
    { prop: 'vine', x: 22, y: 15 },
    { prop: 'vine', x: 21, y: 18 },
    { prop: 'olive', x: 10, y: 2 },
    { prop: 'olive', x: 2, y: 5 },
    { prop: 'olive', x: 26, y: 3 },
    { prop: 'olive', x: 17, y: 5 },
    { prop: 'olive', x: 25, y: 5 },
    { prop: 'olive', x: 26, y: 16 },
    { prop: 'olive', x: 25, y: 19 },
    // verde qua e là
    { prop: 'tree', x: 1, y: 20 },
    { prop: 'tree', x: 27, y: 20 },
    { prop: 'bush', x: 1, y: 10 },
    { prop: 'bush', x: 28, y: 10 },
    { prop: 'bush', x: 1, y: 16 },
    { prop: 'bush', x: 28, y: 19 },
    { prop: 'roseBush', x: 17, y: 9 },
    { prop: 'roseBush', x: 19, y: 12 },
    { prop: 'flowerPatch', x: 11, y: 18 },
    { prop: 'flowerPatch', x: 18, y: 19 },
    { prop: 'flowerPatch', x: 3, y: 20 },
    { prop: 'flowerPatch', x: 19, y: 9 },
  ],
  signs: [
    {
      x: 14,
      y: 7,
      kind: 'none',
      label: 'I fuochi sulla chiesetta',
      lines: [
        'Il cielo sopra la chiesetta scoppia di colori.',
        'Naso all’insù, la tua mano nella mia: ogni scoppio, un battito.',
      ],
      memoryId: 'coc-fuochi',
    },
    {
      x: 12,
      y: 16,
      label: 'La piazzetta',
      lines: [
        'La piazzetta dove si conoscono tutti… e ormai conoscono anche noi.',
        'Due sedie, un po’ d’ombra e le storie del paese.',
      ],
      memoryId: 'coc-piazza',
    },
    {
      x: 26,
      y: 12,
      label: 'A tavola!',
      lines: [
        'Antipasti che sono pranzi interi, brindisi, bis obbligatori.',
        'Qui l’amore si misura in porzioni.',
      ],
      memoryId: 'coc-tavola',
    },
    {
      x: 9,
      y: 15,
      label: 'La piscina',
      lines: [
        'Profumo d’estate: cloro, crema solare e risate.',
        'Gara a chi resta di più sott’acqua: vinci sempre tu.',
      ],
      memoryId: 'coc-piscina',
    },
    {
      x: 4,
      y: 13,
      label: 'I vicoli e le colline',
      lines: [
        'Pietra su pietra, il borgo si arrampica piano sulla collina.',
        'Camminare piano, parlare piano, volersi bene forte.',
      ],
      memoryId: 'coc-vicoli',
    },
    {
      x: 5,
      y: 7,
      kind: 'none',
      label: 'Una casetta di pietra',
      lines: [
        'Dalla porta socchiusa escono profumo di sugo e risate.',
        'A Cocuruzzo le porte sono sempre un po’ aperte.',
      ],
    },
  ],
  npcs: [
    {
      character: 'npcNonna',
      x: 23,
      y: 12,
      dir: 'down',
      label: 'Nonna della festa',
      lines: [
        'Assaggia, assaggia! Sei troppo magro!',
        'Che bella coppia che siete… sedetevi, ho fatto le fettuccine!',
      ],
    },
    {
      character: 'npcMan',
      x: 17,
      y: 15,
      wander: true,
      label: 'Compare col bicchiere',
      lines: ['Alla salute dei fidanzati!', 'Stasera si balla in piazza fino all’alba!'],
    },
    {
      character: 'npcKid',
      x: 16,
      y: 8,
      dir: 'up',
      label: 'Bimbo col naso all’insù',
      lines: [
        'Guarda! Quello rosso è il più grande di tutti!',
        'Da grande i fuochi li accendo io!',
      ],
    },
  ],
  exits: [{ x: 13, y: 21, w: 4, h: 1, to: 'overworld' }],
  spawn: { x: 14, y: 20, dir: 'up' },
  effects: [{ type: 'fireworks', x: 9, y: 0, w: 12, h: 4 }],
}
