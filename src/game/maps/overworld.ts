/**
 * OVERWORLD — la piccola Europa poetica di Rosa & Francesco.
 *
 * Una mappa da fiaba, non un atlante: il mare a ovest e a sud, il lago di
 * Losanna in alto, la fascia delle Alpi con un unico passo, la pianura di
 * Milano, la strada del sud verso casa, la spiaggia di Torvaianica, le
 * colline e i filari di Cocuruzzo e — oltre il Danubio — il Parlamento di
 * Budapest, che si può solo guardare: per arrivarci si sale sul traghetto
 * dal molo di legno.
 *
 * Tutti i nodi sono collegati da sentieri larghi almeno 2 tile; le exit
 * stanno DAVANTI alle icone, mai sotto la parte solida.
 */
import type { Scene } from './types'
import {
  owBorgo,
  owCattedrale,
  owChiesa,
  owChiosco,
  owDuomo,
  owParlamento,
} from '../art/buildings/overworld'

export const overworldScene: Scene = {
  id: 'overworld',
  name: 'Il nostro piccolo mondo',
  width: 52,
  height: 40,
  ambience: 'day',
  legend: {
    g: { base: 'grass' },
    G: { base: 'grass2' },
    f: { base: 'flowers' },
    t: { base: 'tallGrass' },
    p: { base: 'pathStones' },
    z: { base: 'plaza' },
    c: { base: 'cobble' },
    s: { base: 'sand' },
    '%': { base: 'sandWet' },
    d: { base: 'wood' },
    w: { base: 'water', solid: true },
    O: { base: 'deepWater', solid: true },
    r: { base: 'rock', solid: true },
    S: { base: 'snow', solid: true },
  },
  ground: [
    'OOww%rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr%wOOOOOw%rrr',
    'OOww%ggfggGggGggGrr%%%%gggggrrfggGggGgrr%wOOOOOw%ggg',
    'OOww%GggggGgggg%%wwwwww%%gggGggggGggggfg%wOOOOOw%ggG',
    'OOww%gggggGggg%wwwwwwwwww%ftttttgGgggggg%wOOOOOw%fgg',
    'OOww%gGgGgGgfg%wwOOOOOOww%gtttttgGgfgggg%wOOOOOw%ggg',
    'OOww%gggzzzgGg%wwOOOOOOww%gtttttgtttttgg%wOOOOOw%ggg',
    'OOww%gggzzzggg%wwwwwwwwww%Gggggggtttttgg%wOOOOOw%Ggg',
    'Oww%gfgggppppppp%wwwwww%%gggfggggGggggGg%wOOOOOw%ggf',
    'Oww%rrgGgpppppppg%%%rr%ggggrggGggrrgfggr%wOOOOOw%gGg',
    'OSrrrSSrrrSSrpppSrrrSSrrrSSrrrSSrrrSSrrrSwOOOOOw%ggg',
    'OrrSrrrrrrSrrppprSrrrrrrSrrrrrrSrrrrrrSrrwOOOOOw%ggg',
    'OrrrrrrrrrrrrppprrrrrrrrrrrrrrrrrrrrrrrrrwOOOOOw%ggG',
    'OrrrrrrrrrrrrppprrrrrrrrrrrrrrrrrrrrrrrrrwOOOOOw%gGg',
    'OOww%gggggGggpppgGfrgggggGrgggggrGgggrgg%wOOOOOw%ggg',
    'OOww%ttggGGggpppgggggGfggggppppppppggggg%wOOOOOw%ggg',
    'OOww%ttgGGGfgppppppppppppppppppppppppppp%dddOOOw%ggg',
    'OOww%GGGGGGGGppppppppppppppGGGGGGGGppppp%dddOOOw%GGG',
    'OOww%ggggfGGGpppggggggggggggggggfGGGgggg%wOOOOOw%ggg',
    'OOww%ggggzzzzzzzgggggfGggggggggggGGggggg%wOOOOOw%ggg',
    'OOww%ggggzzzzzzzggGggggggfGggggggGgggggg%wOOOOOw%Ggg',
    'OOww%gggggGggppgGgggggGggggfgggggGgggggG%wOOOOOw%ttt',
    'OOOww%ggggGggppGgtttggggGgggggrrgGggggGg%wOOOOOw%ttt',
    'OOOww%fgggGggppggtttgggggggggfrrgGgggGgrrwOOOOOw%ggg',
    'OOOww%gGggGggppgggggGggfggggggGggGgggggrrwOOOOOw%ggg',
    'OOOww%gfggGggppgGgggggggggggggfggGggGggG%wOOOOOw%ggg',
    'OOOww%ggggGggppfggggzzzzzgggGggggGggggfg%wOOOOOw%ggG',
    'OOOww%ggggGggppppppppppppppppppppcccccgg%wOOOOOw%fgg',
    'OOww%ssssssssspppppppppppppppppppcccccgg%wOOOOOw%ggg',
    'OOww%sssssssssGggggggggggggggggfgGgGgGgg%wOOOOOw%ggg',
    'OOww%sssssssssgggfgGggggggGggrrggGgggggrrwOOOOOw%Ggg',
    'OOww%sssssssssgGggggGgggggggfrrggGggggGrrwOOOOOw%ggf',
    'OOww%sssssssssgggggggggggggGggGggGggfggg%wOOOOOw%gGg',
    'OOww%sssssssssggggggfggGgggggggggGggGggg%wOOOOOw%ggg',
    'OOww%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%wOOOOOw%%%%',
    'OOwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    'OOwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
    'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
    'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
    'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
  ],
  buildings: [
    // Losanna — la cattedrale sul lago
    { sprite: owCattedrale, x: 8, y: 2, solid: { x: 0, y: 1, w: 3, h: 2 } },
    // Milano — il Duomo sotto le Alpi
    { sprite: owDuomo, x: 10, y: 15, solid: { x: 0, y: 1, w: 3, h: 2 } },
    // Santa Maria delle Mole — la chiesa con la rotondina
    { sprite: owChiesa, x: 21, y: 22, solid: { x: 0, y: 1, w: 3, h: 2 } },
    // Cocuruzzo — il borgo con la torretta
    { sprite: owBorgo, x: 34, y: 23, solid: { x: 0, y: 1, w: 3, h: 2 } },
    // Torvaianica — il chiosco sulla sabbia
    { sprite: owChiosco, x: 9, y: 28, solid: { x: 0, y: 1, w: 2, h: 1 } },
    // Budapest — visibile ma irraggiungibile a piedi, oltre il Danubio
    { sprite: owParlamento, x: 48, y: 12, solid: { x: 0, y: 1, w: 3, h: 2 } },
  ],
  props: [
    // Svizzera — pini attorno al lago e alla cattedrale
    { prop: 'pine', x: 5, y: 2 },
    { prop: 'pine', x: 6, y: 5 },
    { prop: 'pine', x: 12, y: 2 },
    { prop: 'pine', x: 13, y: 6 },
    { prop: 'tree', x: 11, y: 3 },
    { prop: 'bush', x: 7, y: 2 },
    { prop: 'roseBush', x: 11, y: 5 },
    { prop: 'flowerPatch', x: 12, y: 6 },
    { prop: 'flowerPatch', x: 6, y: 6 },
    { prop: 'gull', x: 19, y: 3 },
    { prop: 'pine', x: 26, y: 2 },
    { prop: 'pine', x: 27, y: 6 },
    { prop: 'tree', x: 32, y: 3 },
    { prop: 'pine', x: 35, y: 6 },
    { prop: 'tree', x: 37, y: 2 },
    { prop: 'bush', x: 25, y: 7 },
    { prop: 'flowerPatch', x: 29, y: 7 },
    { prop: 'pine', x: 40, y: 3 },
    { prop: 'pine', x: 40, y: 7 },
    // ai piedi delle Alpi
    { prop: 'pine', x: 5, y: 13 },
    { prop: 'pine', x: 20, y: 13 },
    { prop: 'pine', x: 24, y: 13 },
    { prop: 'pine', x: 36, y: 13 },
    // pianura di Milano
    { prop: 'tree', x: 5, y: 16 },
    { prop: 'tree', x: 6, y: 21 },
    { prop: 'pine', x: 7, y: 14 },
    { prop: 'bush', x: 8, y: 16 },
    { prop: 'flowerPatch', x: 11, y: 14 },
    { prop: 'flowerPatch', x: 6, y: 19 },
    { prop: 'bush', x: 16, y: 17 },
    { prop: 'tree', x: 17, y: 19 },
    { prop: 'flowerPatch', x: 16, y: 20 },
    // campagna verso casa
    { prop: 'tree', x: 18, y: 22 },
    { prop: 'cat', x: 19, y: 25 },
    { prop: 'roseBush', x: 25, y: 24 },
    { prop: 'tree', x: 27, y: 22 },
    { prop: 'bush', x: 19, y: 24 },
    { prop: 'flowerPatch', x: 21, y: 21 },
    { prop: 'flowerPatch', x: 15, y: 25 },
    { prop: 'flowerPatch', x: 28, y: 25 },
    { prop: 'tree', x: 29, y: 24 },
    // colline e filari di Cocuruzzo
    { prop: 'vine', x: 33, y: 30 },
    { prop: 'vine', x: 36, y: 30 },
    { prop: 'vine', x: 34, y: 32 },
    { prop: 'olive', x: 31, y: 28 },
    { prop: 'olive', x: 39, y: 28 },
    { prop: 'cypress', x: 32, y: 24 },
    { prop: 'cypress', x: 38, y: 23 },
    { prop: 'tree', x: 39, y: 20 },
    // spiaggia di Torvaianica
    { prop: 'palm', x: 5, y: 29 },
    { prop: 'palm', x: 12, y: 32 },
    { prop: 'umbrella', x: 6, y: 31 },
    { prop: 'towel', x: 7, y: 32 },
    { prop: 'gull', x: 5, y: 33 },
    { prop: 'gull', x: 14, y: 33 },
    { prop: 'buoy', x: 2, y: 32 },
    { prop: 'rocks', x: 2, y: 34 },
    { prop: 'rocks', x: 46, y: 35 },
    // costa ovest e Danubio
    { prop: 'gull', x: 3, y: 7 },
    { prop: 'gull', x: 2, y: 18 },
    { prop: 'gull', x: 45, y: 12 },
    // la riva di Budapest
    { prop: 'pine', x: 49, y: 3 },
    { prop: 'pine', x: 51, y: 6 },
    { prop: 'tree', x: 49, y: 17 },
    { prop: 'pine', x: 51, y: 19 },
    { prop: 'tree', x: 49, y: 28 },
    { prop: 'flowerPatch', x: 49, y: 15 },
    { prop: 'flowerPatch', x: 51, y: 15 },
  ],
  signs: [
    {
      x: 7,
      y: 5,
      kind: 'wood',
      label: 'Losanna — Dove il lago ci ha visti',
      lines: [
        'Qui comincia tutto: il lago, la salita, i primi passi insieme.',
        'Entra: la nostra Losanna ti aspetta.',
      ],
    },
    {
      x: 9,
      y: 18,
      kind: 'wood',
      label: 'Milano — Luci di città',
      lines: [
        'Guglie di marmo e canzoni cantate a squarciagola.',
        'Entra: la città è grande, e noi due piccoli e felici.',
      ],
    },
    {
      x: 24,
      y: 25,
      kind: 'wood',
      label: 'Roma, Santa Maria e dintorni — Casa',
      lines: [
        'La rotonda, il Colosseo, i laghi, la neve: tutto il nostro mondo di casa.',
        'Entra: casa è dove sei tu.',
      ],
    },
    {
      x: 37,
      y: 26,
      kind: 'wood',
      label: 'Cocuruzzo — Le radici',
      lines: [
        'Vicoli in salita, tavolate infinite e fuochi sulla chiesetta.',
        'Entra: qui il tempo va piano e il bene va forte.',
      ],
    },
    {
      x: 12,
      y: 29,
      kind: 'wood',
      label: 'Torvaianica — Sale e tramonti',
      lines: [
        'Il mare di casa: piedi nella sabbia e «ancora cinque minuti».',
        'Entra: il tramonto è quasi pronto.',
      ],
    },
    {
      x: 40,
      y: 14,
      kind: 'wood',
      label: 'Il molo sul Danubio',
      lines: [
        'Dall’altra riva brillano le guglie del Parlamento.',
        'Il traghetto per Budapest — sali a bordo ♥',
      ],
    },
    {
      x: 16,
      y: 13,
      kind: 'wood',
      label: 'Il passo tra le Alpi',
      lines: [
        'Di qua la Svizzera, di là l’Italia.',
        'Le montagne dividono le mappe, mai i cuori.',
      ],
    },
  ],
  npcs: [],
  exits: [
    // davanti al portale della cattedrale
    { x: 9, y: 5, w: 1, h: 1, to: 'lausanne' },
    // davanti al Duomo
    { x: 11, y: 18, w: 1, h: 1, to: 'milano' },
    // sul sagrato della chiesa
    { x: 22, y: 25, w: 1, h: 1, to: 'smdm' },
    // sulla piazzetta del borgo
    { x: 35, y: 26, w: 1, h: 1, to: 'cocuruzzo' },
    // davanti al chiosco, sulla sabbia
    { x: 9, y: 30, w: 2, h: 1, to: 'torvaianica' },
    // in punta al molo: si salpa per Budapest
    { x: 43, y: 15, w: 1, h: 2, to: 'danubio' },
  ],
  spawn: { x: 9, y: 6, dir: 'down' },
}
