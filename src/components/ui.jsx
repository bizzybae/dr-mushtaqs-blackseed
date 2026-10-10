import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LABEL_BADGES } from '../data/catalog'

// Small shared pieces: page metadata, accordion, label badges, section header.

export function Seo({ title, description, image = '/og.jpg' }) {
  useEffect(() => {
    const full = title ? `${title} | Dr. Mushtaq’s Blackseed` : 'Dr. Mushtaq’s Blackseed | Cold-Pressed Black Seed Oil, Lot Tested'
    document.title = full
    const set = (sel, attr, value) => {
      let el = document.head.querySelector(sel)
      if (!el) {
        el = document.createElement('meta')
        const [k, v] = sel.replace('meta[', '').replace(']', '').split('=')
        el.setAttribute(k, v.replace(/"/g, ''))
        document.head.appendChild(el)
      }
      el.setAttribute(attr, value)
    }
    if (description) {
      set('meta[name="description"]', 'content', description)
      set('meta[property="og:description"]', 'content', description)
    }
    set('meta[property="og:title"]', 'content', full)
    set('meta[property="og:image"]', 'content', new URL(image, window.location.origin).toString())
  }, [title, description, image])
  return null
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export function Accordion({ items, defaultOpen = -1, id = 'acc' }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map(([q, a], i) => {
        const isOpen = open === i
        return (
          <div key={q}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`${id}-${i}`}
              className="flex w-full items-start justify-between gap-6 py-5 text-left"
              data-testid={`button-accordion-${id}-${i}`}
            >
              <span className="font-display text-lg leading-snug">{q}</span>
              <span className={`mt-1 shrink-0 font-mono text-sm text-brass transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true">
                +
              </span>
            </button>
            <div
              id={`${id}-${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pr-10 text-base leading-relaxed text-ink/75">{a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const ICONS = {
  physician_formulated: (
    <>
      <path d="M12 3 5 6v5.5c0 4.3 3 8.1 7 9.5 4-1.4 7-5.2 7-9.5V6l-7-3Z" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  cold_pressed: <path d="M12 3c-3 4.2-5.5 7.3-5.5 10.2A5.5 5.5 0 0 0 12 18.7a5.5 5.5 0 0 0 5.5-5.5C17.5 10.3 15 7.2 12 3Z" />,
  single_origin: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  third_party_tested: (
    <>
      <path d="M9 3v6.5L4.5 17a3 3 0 0 0 2.6 4.5h9.8a3 3 0 0 0 2.6-4.5L15 9.5V3" />
      <path d="M8 3h8M7 15h10" />
    </>
  ),
  tq: (
    <>
      <path d="M12 3 19.8 7.5v9L12 21l-7.8-4.5v-9Z" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
    </>
  ),
}

export function LabelBadges({ dark = false, compact = false }) {
  const items = LABEL_BADGES
  return (
    <ul className={compact ? 'flex flex-wrap gap-x-8 gap-y-4' : 'grid grid-cols-2 gap-8 lg:grid-cols-4'}>
      {items.map((b) => (
        <li key={b.key} className={`flex gap-3 ${compact ? 'items-center' : ''}`}>
          <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-brass" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
            {ICONS[b.key]}
          </svg>
          <div>
            <p className={`font-mono text-[10px] uppercase tracking-[0.16em] ${compact ? 'whitespace-nowrap' : ''} ${dark ? 'text-cream' : 'text-ink'}`}>{b.label}</p>
            {!compact && <p className={`mt-1.5 text-[13px] leading-relaxed ${dark ? 'text-cream/60' : 'text-ink/60'}`}>{b.detail}</p>}
          </div>
        </li>
      ))}
    </ul>
  )
}

// The round “Physician Formulated” seal, in the spirit of a signed label.
export function PhysicianSeal({ className = 'h-28 w-28', dark = false }) {
  const id = dark ? 'seal-dark' : 'seal-light'
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Physician formulated by Dr. Quddarat U. Mushtaq, MD, MS">
      <defs>
        <path id={id} d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
      </defs>
      <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-brass" />
      <circle cx="100" cy="100" r="54" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-brass" />
      <text className="fill-current text-brass" fontFamily="'DM Mono', monospace" fontSize="11.5" letterSpacing="2.6">
        <textPath href={`#${id}`} startOffset="0%">
          PHYSICIAN FORMULATED · DR. Q. U. MUSHTAQ, MD, MS · FOUNDER & OWNER ·
        </textPath>
      </text>
      <g transform="translate(100 100) scale(0.38) translate(-50 -50)" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round" className="text-brass">
        <path d="M50 8 L86.4 29 L86.4 71 L50 92 L13.6 71 L13.6 29 Z" />
        <g fill="currentColor" stroke="none">
          <circle cx="50" cy="8" r="5.2" />
          <circle cx="86.4" cy="29" r="5.2" />
          <circle cx="86.4" cy="71" r="5.2" />
          <circle cx="50" cy="92" r="5.2" />
          <circle cx="13.6" cy="71" r="5.2" />
          <circle cx="13.6" cy="29" r="5.2" />
          <path d="M50 30 C50 30 36 46.5 36 56.5 C36 64.6 42.3 70.5 50 70.5 C57.7 70.5 64 64.6 64 56.5 C64 46.5 50 30 50 30 Z" />
        </g>
      </g>
    </svg>
  )
}

export function GuaranteeStrip({ dark = false }) {
  return (
    <div className={`flex flex-col gap-4 border-y px-6 py-6 sm:flex-row sm:items-center sm:justify-between ${dark ? 'border-cream/15' : 'border-ink/10'}`}>
      <div className="flex items-center gap-4">
        <PhysicianSeal className="h-16 w-16 shrink-0" dark={dark} />
        <div>
          <p className={`font-display text-xl ${dark ? 'text-cream' : ''}`}>The 60-Day Standard</p>
          <p className={`mt-1 text-sm ${dark ? 'text-cream/65' : 'text-ink/65'}`}>Love it, or your money back. 60 days, opened or not.</p>
        </div>
      </div>
      <Link to="/policies/guarantee" className={`font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass ${dark ? 'text-cream' : 'text-ink'}`}>
        Read the guarantee →
      </Link>
    </div>
  )
}

export function SectionHead({ eyebrow, title, lede, dark = false, className = '' }) {
  return (
    <div className={className}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`h2 mt-4 ${dark ? 'text-cream' : ''}`}>{title}</h2>
      {lede && <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${dark ? 'text-cream/70' : 'text-ink/70'}`}>{lede}</p>}
    </div>
  )
}
