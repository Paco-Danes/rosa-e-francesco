import { useState, type FormEvent, type ReactNode } from 'react'

const KEY = 'rf:gate:v1'

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export default function SoftGate({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(() => localStorage.getItem(KEY) === 'ok')
  const [value, setValue] = useState('')
  const [wrong, setWrong] = useState(0)

  if (open) return <>{children}</>

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (normalize(value).includes('mameli')) {
      localStorage.setItem(KEY, 'ok')
      setOpen(true)
    } else {
      setWrong((n) => n + 1)
      setValue('')
    }
  }

  return (
    <div className="gate">
      <div className="gate__stars" aria-hidden="true" />
      <form className="gate__card" onSubmit={submit} key={wrong}>
        <div className="gate__heart">♥</div>
        <h1 className="gate__title">Un piccolo segreto, prima di entrare</h1>
        <p className="gate__question">
          Il nome della via della guerra e dell&rsquo;amore,
          <br />
          il luogo del nostro primo bacio&hellip;
        </p>
        <input
          className={'gate__input' + (wrong > 0 ? ' gate__input--wrong' : '')}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="via…"
          autoFocus
          autoCapitalize="none"
          autoComplete="off"
        />
        <button className="gate__btn" type="submit">
          entra ✦
        </button>
        {wrong > 0 && <p className="gate__nope">mmh… riprova, amore ♡</p>}
      </form>
    </div>
  )
}
