const styles = `
.teaser {
  height: 100%;
  display: grid;
  place-items: center;
  text-align: center;
}
.teaser__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}
.teaser__heart {
  animation: beat 2.4s ease-in-out infinite;
  filter: drop-shadow(0 0 18px rgba(255, 122, 158, 0.45));
}
.teaser__date {
  font-size: clamp(1.1rem, 3.5vw, 1.6rem);
  letter-spacing: 0.45em;
  text-indent: 0.45em;
  color: #ffd9a0;
}
.teaser__hint {
  font-style: italic;
  opacity: 0.55;
  font-size: clamp(0.85rem, 2.5vw, 1rem);
}
@keyframes beat {
  0%, 100% { transform: scale(1); }
  12% { transform: scale(1.12); }
  24% { transform: scale(1); }
  36% { transform: scale(1.08); }
  48% { transform: scale(1); }
}
`

export default function App() {
  return (
    <main className="teaser">
      <style>{styles}</style>
      <div className="teaser__inner">
        <svg
          className="teaser__heart"
          width="72"
          height="72"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path
            d="M16 27.5C9 22 3.5 17.2 3.5 11.6 3.5 7.6 6.6 4.8 10 4.8c2.4 0 4.7 1.3 6 3.4 1.3-2.1 3.6-3.4 6-3.4 3.4 0 6.5 2.8 6.5 6.8 0 5.6-5.5 10.4-12.5 15.9Z"
            fill="none"
            stroke="#ff7a9e"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
        <p className="teaser__date">15 · 09 · 2026</p>
        <p className="teaser__hint">qualcosa sta fiorendo qui&hellip;</p>
      </div>
    </main>
  )
}
