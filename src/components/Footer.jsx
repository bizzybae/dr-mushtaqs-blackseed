import { Link } from 'react-router-dom'
import { Wordmark } from './Logo'
import { FDA_DISCLAIMER, FOOTER_LINKS } from '../data/site'
import Newsletter from './Newsletter'

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark dark />
            <p className="mt-6 max-w-sm font-display text-2xl italic leading-snug text-cream/90">The Molecule, Not the Myth.</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
              Physician-formulated blackseed, saffron, and grapevine botanicals. Single-origin, cold-pressed, lot-tested, and covered by the 60-Day Standard.
            </p>
            <div className="mt-8 max-w-sm">
              <Newsletter compact source="footer" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:pl-12">
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">{group}</p>
                <ul className="mt-5 space-y-3">
                  {links.map((l) => (
                    <li key={l.label}>
                      {l.external ? (
                        <a href={l.to} className="text-sm text-cream/80 transition-colors hover:text-cream">
                          {l.label}
                        </a>
                      ) : (
                        <Link to={l.to} className="text-sm text-cream/80 transition-colors hover:text-cream">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 border-t border-cream/10 pt-8">
          <p className="max-w-4xl font-mono text-[10px] leading-relaxed text-cream/50">{FDA_DISCLAIMER}</p>
          <div className="mt-6 flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-cream/50 sm:flex-row sm:justify-between">
            <p>Copyright 2026 Dr. Mushtaq’s. All rights reserved.</p>
            <p>Secure checkout by Stripe</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
