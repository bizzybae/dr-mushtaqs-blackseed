import { useState } from 'react'
import { Link } from 'react-router-dom'

const links = [
  { label: 'Shop', href: '/products' },
  { label: 'Standards', href: '/#standards' },
  { label: 'Heritage', href: '/#heritage' },
  { label: 'Questions', href: '/#faq' }
]

export default function Header({ cart, onCartClick }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur">
      <p className="bg-ink px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-cream">
        Cold pressed Nigella sativa. Plain labeling, no health claims.
      </p>
      <div className="flex h-20 items-center justify-between px-6 sm:px-10 lg:px-20">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-brass font-display text-xs text-brass">
            DM
          </span>
          <span className="font-display text-sm font-semibold tracking-[0.08em]">
            DR. MUSHTAQ’S
            <span className="block font-mono text-[9px] tracking-[0.2em] text-muted">BLACKSEED</span>
          </span>
        </Link>
        <nav className="hidden gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.1em] hover:text-brass"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <button onClick={onCartClick} className="font-mono text-[11px] uppercase tracking-[0.1em]">
            Bag ({cart})
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className="font-mono text-[11px] uppercase tracking-[0.1em] md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-5 border-t border-ink/10 px-6 py-6 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.1em]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
