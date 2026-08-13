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
  {
    title: 'Un anno di noi',
    date: '8 agosto 2026',
    body:
      'Rosa,\n\nun anno fa non sapevo ancora che le giornate potessero avere il tuo nome. Adesso lo so, e non voglio più disimpararlo.\n\nGrazie di ogni risata, di ogni viaggio, di ogni "ancora cinque minuti".\n\nTi amo.',
  },
  {
    title: 'Promemoria',
    date: 'sempre valido',
    body:
      'Piccolo promemoria ufficiale:\n\n1. Sei bellissima anche quando non ci credi.\n2. La tua risata è il mio suono preferito.\n3. Qualsiasi cosa succeda oggi, io sto dalla tua parte.\n\nFirmato: uno che ti guarda come se fosse sempre la prima volta.',
  },
]
