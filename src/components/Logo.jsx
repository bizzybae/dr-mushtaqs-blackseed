// The single Dr. Mushtaq’s mark: a hexagon with six bonded nodes (the
// thymoquinone ring) around a single drop of oil. This component is the only
// place the mark is drawn. Header, footer, favicon, and OG image all use it.

export function Mark({ className = 'h-8 w-8', title = 'Dr. Mushtaq’s' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {/* hexagon */}
      <path d="M50 8 L86.4 29 L86.4 71 L50 92 L13.6 71 L13.6 29 Z" />
      {/* nodes at vertices */}
      <circle cx="50" cy="8" r="5.2" fill="currentColor" stroke="none" />
      <circle cx="86.4" cy="29" r="5.2" fill="currentColor" stroke="none" />
      <circle cx="86.4" cy="71" r="5.2" fill="currentColor" stroke="none" />
      <circle cx="50" cy="92" r="5.2" fill="currentColor" stroke="none" />
      <circle cx="13.6" cy="71" r="5.2" fill="currentColor" stroke="none" />
      <circle cx="13.6" cy="29" r="5.2" fill="currentColor" stroke="none" />
      {/* drop */}
      <path
        d="M50 30 C50 30 36 46.5 36 56.5 C36 64.6 42.3 70.5 50 70.5 C57.7 70.5 64 64.6 64 56.5 C64 46.5 50 30 50 30 Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

export function Wordmark({ className = '', dark = false }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Mark className={`h-9 w-9 shrink-0 ${dark ? 'text-brass' : 'text-ink'}`} />
      <span className="leading-none">
        <span className={`block font-display text-[17px] font-semibold tracking-[0.01em] ${dark ? 'text-cream' : 'text-ink'}`}>
          Dr. Mushtaq’s
        </span>
        <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.3em] text-brass">Blackseed</span>
      </span>
    </span>
  )
}

export default Mark
