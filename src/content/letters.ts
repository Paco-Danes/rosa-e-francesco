/**
 * PENSIERI DOLCI — le lettere nella sezione "Pensieri dolci".
 *
 * ✏️ PER FRANCESCO: per aggiungere una lettera basta aggiungere un oggetto
 * a questa lista e fare commit+push. La più recente appare per prima.
 */

export interface Letter {
  title: string
  date: string
  body: string
}

export const LETTERS: Letter[] = [
  {
    title: 'Per quando ti manco',
    date: '13 agosto 2026',
    body:
      'Amore mio,\n\nse stai leggendo questa lettera vuol dire che la distanza sta facendo la prepotente. Non ascoltarla. Ogni chilometro tra noi è solo strada che ho già deciso di fare.\n\nChiudi gli occhi: sono lì.\n\nTuo, Francesco',
  },
]
