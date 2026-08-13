/**
 * Banner della località: nome della scena in font pixel, scivola dall'alto
 * e sparisce da solo (il GameRoot lo smonta dopo ~2.2 s).
 */
export default function LocationBanner({ name }: { name: string }) {
  return (
    <div className="rf-banner">
      <span className="rf-banner__star">✦</span>
      <span className="rf-banner__name">{name}</span>
      <span className="rf-banner__star">✦</span>
    </div>
  )
}
