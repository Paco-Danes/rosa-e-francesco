// La cartuccia segreta: pixel-art SVG inline in palette notte, etichetta
// oro→rosa con i nomi. Fluttua piano, si scuote all'hover, e al click
// accende il CRT (gestito dal genitore).
export default function Cartridge({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="cart" onClick={onClick} aria-label="Inserisci la cartuccia: avvia il gioco segreto">
      <svg className="cart__svg" viewBox="0 0 34 40" shapeRendering="crispEdges" aria-hidden="true">
        <defs>
          <linearGradient id="cart-label" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0" stopColor="#f7c766" />
            <stop offset="0.55" stopColor="#eb9067" />
            <stop offset="1" stopColor="#e86a92" />
          </linearGradient>
        </defs>

        {/* cresta superiore */}
        <rect x="6" y="0" width="22" height="4" fill="#0a0722" />
        <rect x="7" y="1" width="20" height="2" fill="#31205c" />
        <rect x="7" y="1" width="20" height="1" fill="#41307a" />

        {/* corpo */}
        <rect x="2" y="3" width="30" height="32" fill="#0a0722" />
        <rect x="3" y="4" width="28" height="30" fill="#221448" />
        <rect x="3" y="4" width="28" height="1" fill="#3a2670" />
        <rect x="3" y="5" width="1" height="27" fill="#2d1c5c" />
        <rect x="30" y="5" width="1" height="28" fill="#150c34" />
        <rect x="4" y="33" width="27" height="1" fill="#150c34" />

        {/* righe di presa */}
        <rect x="6" y="6" width="22" height="1" fill="#150c34" />
        <rect x="6" y="7" width="22" height="1" fill="#31205c" />

        {/* incavo etichetta */}
        <rect x="6" y="9" width="22" height="18" fill="#0a0722" />
        <rect x="7" y="10" width="20" height="16" fill="url(#cart-label)" />
        <rect x="7" y="10" width="20" height="1" fill="#ffd98f" />
        <rect x="7" y="25" width="20" height="1" fill="#b34a72" />

        {/* nomi in pixel */}
        <text x="17" y="14.7" textAnchor="middle" className="cart__px">
          {'ROSA &'}
        </text>
        <text x="17" y="18.4" textAnchor="middle" className="cart__px">
          FRANCESCO
        </text>

        {/* cuoricino pixel */}
        <g fill="#8f1f44">
          <rect x="15" y="20" width="1" height="1" />
          <rect x="16" y="20" width="1" height="1" fill="#c22e58" />
          <rect x="18" y="20" width="1" height="1" fill="#c22e58" />
          <rect x="19" y="20" width="1" height="1" />
          <rect x="15" y="21" width="5" height="1" fill="#c22e58" />
          <rect x="16" y="22" width="3" height="1" />
          <rect x="17" y="23" width="1" height="1" />
        </g>

        {/* sottotitolo in corsivo */}
        <text x="17" y="25.1" textAnchor="middle" className="cart__serif">
          un anno insieme
        </text>

        {/* viti */}
        <rect x="4" y="30" width="1" height="1" fill="#0a0722" />
        <rect x="29" y="30" width="1" height="1" fill="#0a0722" />

        {/* connettore con pin dorati */}
        <rect x="4" y="35" width="26" height="5" fill="#0a0722" />
        <rect x="5" y="36" width="24" height="3" fill="#150c34" />
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={6 + i * 3} y="37" width="2" height="2" fill={i % 2 === 0 ? '#f2b13c' : '#c98a2e'} />
        ))}
      </svg>
    </button>
  )
}
