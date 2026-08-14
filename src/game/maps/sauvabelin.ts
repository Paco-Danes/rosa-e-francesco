/**
 * SAUVABELIN — «In cima alla Torre».
 * Una scena VISTA-LATERALE ottenuta solo con i dati: il motore resta
 * top-down, ma qui Rosa può muoversi soltanto a destra e a sinistra sul
 * camminamento di legno (righe 8-9), tutto il resto è solido.
 *
 * Il panorama (480×128) è un building non solido a (0,0): il suo bordo
 * inferiore (128px) sta sopra alla riga del player → sempre disegnato dietro.
 * Il parapetto anteriore (480×32) sta a y=10: bordo inferiore sotto al
 * player → disegnato davanti, ma non copre mai chi cammina sulle righe 8-9.
 * All'estremità destra, il chiosco della scala a chiocciola riporta giù.
 */
import type { Scene } from './types'
import {
  panoramaSprite,
  parapetSprite,
  stairKioskSprite,
} from '../art/buildings/sauvabelin'

export const sauvabelinScene: Scene = {
  id: 'sauvabelin',
  name: 'In cima alla Torre di Sauvabelin',
  width: 30,
  height: 12,
  ambience: 'day', // l'atmosfera dorata è dipinta nel panorama

  legend: {
    // '#' resta sempre nascosto dietro il panorama e sotto il parapetto
    '#': { base: 'rock', solid: true },
    '=': { base: 'wood' },
  },

  ground: [
    /*  0 */ '##############################',
    /*  1 */ '##############################',
    /*  2 */ '##############################',
    /*  3 */ '##############################',
    /*  4 */ '##############################',
    /*  5 */ '##############################',
    /*  6 */ '##############################',
    /*  7 */ '##############################',
    /*  8 */ '==============================',
    /*  9 */ '==============================',
    /* 10 */ '##############################',
    /* 11 */ '##############################',
  ],

  buildings: [
    // il panorama: non solido, bordo inferiore a 128px → sempre dietro
    {
      sprite: panoramaSprite,
      x: 0,
      y: 0,
      solid: { x: 0, y: 0, w: 0, h: 0 },
    },
    // il parapetto anteriore: bordo inferiore a 192px → sempre davanti
    // (la solidità la danno già le righe '#' della ground map)
    {
      sprite: parapetSprite,
      x: 0,
      y: 10,
      solid: { x: 0, y: 0, w: 0, h: 0 },
    },
    // l'imbocco della chiocciola: Rosa ci entra e sparisce giù per i gradini
    {
      sprite: stairKioskSprite,
      x: 28,
      y: 8,
      solid: { x: 0, y: 0, w: 0, h: 0 },
    },
  ],

  props: [],

  signs: [
    // il ricordo, al centro della balaustra: Rosa lo legge guardando lontano
    {
      x: 15,
      y: 7,
      kind: 'none',
      label: 'La vista dalla Torre',
      lines: [
        "Le Alpi da una parte, il lago dall'altra, Losanna sotto i piedi.",
        'Da quassù tutto sembra lontano — tranne noi due.',
        'Guardare lontano, insieme: forse è tutto qui il segreto.',
      ],
      memoryId: 'lau-sauvabelin',
    },
  ],

  // quassù nessun NPC: solo loro due e il mondo
  npcs: [],

  exits: [
    // la scala a chiocciola: si torna nel bosco, davanti alla porta
    {
      x: 28,
      y: 8,
      w: 2,
      h: 2,
      to: 'lausanne',
      spawn: { x: 26, y: 6, dir: 'down' },
    },
  ],

  // si arriva dal lato opposto alle scale, guardando il panorama
  spawn: { x: 1, y: 8, dir: 'right' },
}
