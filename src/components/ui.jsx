import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LABEL_BADGES } from '../data/catalog'

// Small shared pieces: page metadata, accordion, label badges, section header.

export function Seo({ title, description, image = '/og.jpg' }) {
  useEffect(() => {
    const full = title ? `${title} | Dr. Mushtaq’s Blackseed` : 'Dr. Mushtaq’s Blackseed Oil | The Molecule, Not the Myth.'
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
                <p className="pb-6 pr-10 text-[15px] leading-relaxed text-ink/75">{a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const ICONS = {
  cold_pressed: (
    <path d="M12 3c-3 4.2-5.5 7.3-5.5 10.2A5.5 5.5 0 0 0 12 18.7a5.5 5.5 0 0 0 5.5-5.5C17.5 10.3 15 7.2 12 3Z" />
  ),
  ethiopian_origin: (
    <path d="M8.5 4.5c2-1.5 5-1.3 6.5.3 1.8 1.9 3.6 2.4 4.2 4.6.5 1.8-.6 3.3-1.4 4.9-.9 1.8-.6 3.9-2.6 4.8-1.9.9-3.6-.6-5.4-.9-2-.3-4.3.6-5.4-1.2-1-1.6.3-3.4.4-5.2.1-1.7-1.1-3.5-.1-4.9.9-1.3 2.6-1.3 3.8-2.4Z" />
  ),
  third_party_tested: (
    <>
      <path d="M12 3 5 6v5.5c0 4.3 3 8.1 7 9.5 4-1.4 7-5.2 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4.5" />
    </>
  ),
  tq: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M8.5 9.5h7" />
    </>
  ),
}

export function LabelBadges({ dark = false, compact = false, withSpec = true }) {
  const items = [...LABEL_BADGES, ...(withSpec ? [{ key: 'tq', label: '4.64% Thymoquinone', detail: 'Measured by HPLC on every lot and printed on the label.' }] : [])]
  return (
    <ul className={compact ? 'flex flex-wrap gap-x-8 gap-y-4' : 'grid grid-cols-2 gap-8 lg:grid-cols-4'}>
      {items.map((b) => (
        <li key={b.key} className={`flex gap-3 ${compact ? 'items-center' : ''}`}>
          <svg viewBox="0 0 24 24" className={`h-6 w-6 shrink-0 ${dark ? 'text-brass' : 'text-brass'}`} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
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

export function SectionHead({ eyebrow, title, lede, dark = false, className = '' }) {
  return (
    <div className={className}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`h2 mt-4 ${dark ? 'text-cream' : ''}`}>{title}</h2>
      {lede && <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${dark ? 'text-cream/70' : 'text-ink/70'}`}>{lede}</p>}
    </div>
  )
}
