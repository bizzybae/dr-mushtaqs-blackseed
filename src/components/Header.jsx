import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Wordmark } from './Logo'
import ProductPhoto, { ProductThumb } from './ProductPhoto'
import { HOME, NAV } from '../data/site'
import { useCart } from '../lib/cart'
import { isConcept, money, priceFrom, priceTo, useCatalog, useSiteMode } from '../lib/catalog'

export default function Header() {
  const { count, setOpen } = useCart()
  const { products, collections, settings } = useCatalog()
  const mode = useSiteMode()
  const [menu, setMenu] = useState(false)
  const [panel, setPanel] = useState(null) // collection slug | 'learn' | null
  const location = useLocation()

  useEffect(() => {
    setMenu(false)
    setPanel(null)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menu])

  const linkClass = ({ isActive }) =>
    `font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-brass ${isActive ? 'text-brass' : 'text-ink'}`

  const activeCollection = panel && panel !== 'learn' ? collections.find((c) => c.slug === panel) : null
  const panelProducts = activeCollection ? products.filter((p) => p.collection === activeCollection.slug) : []
  const learn = NAV.find((n) => n.children)

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-cream">
          Skip to content
        </a>
        <p className="bg-ink px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-cream/90">
          {mode === 'prelaunch' ? HOME.announcement.prelaunch : settings.announcement || HOME.announcement.live}
          <span className="hidden sm:inline">
            <span className="mx-3 text-brass">·</span>
            Physician formulated · The 60-Day Standard
          </span>
        </p>

        <div className="relative border-b border-ink/10" onMouseLeave={() => setPanel(null)}>
          <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
            <Link to="/" aria-label="Dr. Mushtaq’s home" data-testid="link-home">
              <Wordmark />
            </Link>

            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
              {NAV.map((item) => {
                const key = item.collection || 'learn'
                return (
                  <div key={item.to} onMouseEnter={() => setPanel(key)}>
                    <NavLink to={item.to} className={linkClass} aria-haspopup="true" aria-expanded={panel === key} onFocus={() => setPanel(key)} data-testid={`nav-${key}`}>
                      {item.label}
                    </NavLink>
                  </div>
                )
              })}
            </nav>

            <div className="flex items-center gap-6">
              <Link to="/shop" className="hidden font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass md:block lg:hidden">
                Shop
              </Link>
              <button onClick={() => setOpen(true)} className="relative font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass" data-testid="button-open-bag" aria-label={`Open bag, ${count} items`}>
                Bag
                <span className="ml-2 inline-grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 font-mono text-[10px] text-cream">{count}</span>
              </button>
              <button onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-controls="mobile-menu" className="font-mono text-[11px] uppercase tracking-[0.14em] lg:hidden" data-testid="button-menu">
                {menu ? 'Close' : 'Menu'}
              </button>
            </div>
          </div>

          {/* Mega panel */}
          <div
            className={`absolute inset-x-0 top-full hidden border-b border-ink/10 bg-cream shadow-[0_24px_48px_-24px_rgba(23,22,20,0.25)] transition-all duration-200 lg:block ${
              panel ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
            }`}
            onMouseEnter={() => panel && setPanel(panel)}
          >
            {activeCollection && (
              <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8 px-5 py-8 sm:px-8 lg:px-12">
                <div className="col-span-3 border-r border-ink/10 pr-8">
                  <p className="eyebrow">{activeCollection.short}</p>
                  <p className="mt-3 font-display text-3xl leading-tight">{activeCollection.name}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{activeCollection.description}</p>
                  <Link to={`/collections/${activeCollection.slug}`} className="mt-5 inline-block font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass" tabIndex={panel ? 0 : -1}>
                    Shop all {activeCollection.name} →
                  </Link>
                  {activeCollection.steps?.length > 0 && (
                    <ol className="mt-6 space-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      {activeCollection.steps.map((s, i) => (
                        <li key={s}>
                          <span className="text-brass">0{i + 1}</span> {s}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
                <div className={`col-span-9 grid gap-5 ${panelProducts.length > 4 ? 'grid-cols-5' : 'grid-cols-4'}`}>
                  {panelProducts.slice(0, 10).map((p) => (
                    <Link key={p.slug} to={isConcept(p) ? `/coming-soon#${p.slug}` : `/shop/${p.slug}`} className="group" data-testid={`link-menu-${p.slug}`} tabIndex={panel ? 0 : -1}>
                      <ProductThumb product={p} ratio={1.15} sizes="220px" />
                      <p className="mt-3 font-display text-base leading-tight group-hover:text-brass">{p.name}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{p.step}</p>
                      <p className="mt-1 font-mono text-[11px] text-ink">
                        {isConcept(p) ? 'Coming soon' : p.variants.length > 1 ? `${money(priceFrom(p))} to ${money(priceTo(p))}` : money(priceFrom(p))}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {panel === 'learn' && learn && (
              <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8 px-5 py-8 sm:px-8 lg:px-12">
                <div className="col-span-4">
                  <ProductPhoto slug="physician-desk" fit="cover" ratio={1.6} sizes="420px" />
                </div>
                <ul className="col-span-8 grid grid-cols-3 gap-x-8 gap-y-6">
                  {learn.children.map((c) => (
                    <li key={c.to}>
                      <Link to={c.to} className="group block" tabIndex={panel ? 0 : -1} data-testid={`link-learn-${c.to.slice(1)}`}>
                        <p className="font-display text-xl leading-tight group-hover:text-brass">{c.label}</p>
                        <p className="mt-1 text-sm text-ink/60">{c.note}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu, a sibling of the header so the blurred header does not clip it */}
      {menu && (
        <nav id="mobile-menu" className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-cream lg:hidden" aria-label="Mobile">
          <div className="flex h-[72px] items-center justify-between border-b border-ink/10 px-5">
            <Link to="/" aria-label="Dr. Mushtaq’s home">
              <Wordmark />
            </Link>
            <button onClick={() => setMenu(false)} className="font-mono text-[11px] uppercase tracking-[0.14em]" data-testid="button-menu-close">
              Close
            </button>
          </div>
          <div className="px-5 pb-16 pt-6">
            <p className="eyebrow">Shop by purpose</p>
            <ul className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
              {collections.map((c) => (
                <li key={c.slug}>
                  <Link to={`/collections/${c.slug}`} className="flex items-baseline justify-between py-4" data-testid={`link-mobile-${c.slug}`}>
                    <span className="font-display text-2xl">{c.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{c.short}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-10">Learn</p>
            <ul className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
              {learn.children.map((c) => (
                <li key={c.to}>
                  <Link to={c.to} className="block py-4 font-display text-xl" data-testid={`link-mobile-${c.to.slice(1)}`}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </>
  )
}
