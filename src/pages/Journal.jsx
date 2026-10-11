import { Link, useParams } from 'react-router-dom'
import ProductPhoto from '../components/ProductPhoto'
import ProductCard from '../components/ProductCard'
import { PhysicianSeal, SectionHead, Seo } from '../components/ui'
import { useSite } from '../lib/content'
import { useCatalog } from '../lib/catalog'
import NotFound from './NotFound'

// The Journal: short, sourced notes on each botanical, with the products it
// goes into. Posts come from the content layer (Sanity, falling back to
// src/data/journal.js). Imagery is the plant, never a person.

function fmtDate(s) {
  if (!s) return ''
  const d = new Date(`${s}T00:00:00`)
  return Number.isNaN(d.getTime()) ? s : d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

// A post image: an uploaded photograph from Sanity, or a repo render by slug.
export function JournalImage({ post, ratio = 1.3333, sizes, priority = false, className = '' }) {
  if (post.imageUrl) {
    return (
      <div className={`overflow-hidden bg-sand ${className}`} style={{ aspectRatio: ratio }}>
        <img src={post.imageUrl} alt={post.imageAlt || post.title} className="h-full w-full object-cover" loading={priority ? 'eager' : 'lazy'} decoding="async" />
      </div>
    )
  }
  return <ProductPhoto slug={post.image} alt={post.imageAlt} fit="cover" ratio={ratio} sizes={sizes} priority={priority} className={`bg-sand ${className}`} />
}

export function JournalCard({ post, large = false }) {
  const { BOTANICALS } = useSite()
  const b = post.botanical ? BOTANICALS[post.botanical] : null
  return (
    <article data-testid={`card-journal-${post.slug}`}>
      <Link to={`/journal/${post.slug}`} className="group block">
        <JournalImage post={post} ratio={large ? 1.5 : 1.3333} sizes={large ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 30vw, 100vw'} className="transition-opacity group-hover:opacity-95" />
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {b ? (
            <>
              {b.name} · <span className="italic normal-case tracking-normal">{b.latin}</span>
            </>
          ) : (
            'Notes'
          )}
          {post.readingTime ? ` · ${post.readingTime}` : ''}
        </p>
        <h3 className={`mt-2 font-display leading-snug group-hover:text-brass ${large ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{post.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-ink/70">{post.deck}</p>
      </Link>
    </article>
  )
}

export function JournalIndex() {
  const { JOURNAL, HOME } = useSite()
  const [lead, ...rest] = JOURNAL
  return (
    <>
      <Seo title="Journal" description="Short, sourced notes on each botanical in the shelf: what it is, where it grows, which part we use, and which products it goes into." image="/products/seed-capsule.jpg" />
      <section className="bg-sand">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <p className="eyebrow">{HOME.journalTeaser.eyebrow}</p>
          <h1 className="h1 mt-4">{HOME.journalTeaser.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">{HOME.journalTeaser.body} Every entry names its sources. None of them is health advice.</p>
        </div>
      </section>

      {lead && (
        <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Link to={`/journal/${lead.slug}`} className="block" aria-label={lead.title}>
                <JournalImage post={lead} ratio={1.5} sizes="(min-width: 1024px) 58vw, 100vw" priority />
              </Link>
            </div>
            <div className="lg:col-span-5">
              <p className="eyebrow">Start here</p>
              <h2 className="h2 mt-4">
                <Link to={`/journal/${lead.slug}`} className="hover:text-brass" data-testid="link-journal-lead">
                  {lead.title}
                </Link>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink/70">{lead.deck}</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                {fmtDate(lead.published)}
                {lead.readingTime ? ` · ${lead.readingTime}` : ''}
              </p>
              <Link to={`/journal/${lead.slug}`} className="btn btn-solid mt-8">
                Read the entry
              </Link>
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="border-t border-ink/10">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
            <SectionHead eyebrow="All entries" title="The shelf, one plant at a time." />
            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" data-testid="grid-journal">
              {rest.map((p) => (
                <JournalCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export function JournalPost() {
  const { slug } = useParams()
  const { JOURNAL, BOTANICALS, FOUNDER } = useSite()
  const { products } = useCatalog()
  const post = JOURNAL.find((p) => p.slug === slug)
  if (!post) return <NotFound />
  const b = post.botanical ? BOTANICALS[post.botanical] : null
  const where = (post.products || []).map((s) => products.find((p) => p.slug === s)).filter(Boolean)
  const idx = JOURNAL.findIndex((p) => p.slug === slug)
  const next = JOURNAL[(idx + 1) % JOURNAL.length]
  const image = post.imageUrl || (post.image ? `/products/${post.image}.jpg` : undefined)

  return (
    <>
      <Seo title={post.title} description={post.deck} image={image} />
      <article>
        <header className="bg-sand">
          <div className="mx-auto grid max-w-[1440px] lg:grid-cols-12">
            <div className="order-2 flex flex-col justify-center px-5 py-12 sm:px-8 lg:order-1 lg:col-span-5 lg:px-12 lg:py-20">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                <Link to="/journal" className="hover:text-brass">
                  Journal
                </Link>
                {b && (
                  <>
                    {' · '}
                    {b.name}
                  </>
                )}
              </p>
              <h1 className="h1 mt-5">{post.title}</h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">{post.deck}</p>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                {fmtDate(post.published)}
                {post.readingTime ? ` · ${post.readingTime}` : ''}
              </p>
            </div>
            <div className="relative order-1 lg:order-2 lg:col-span-7 lg:min-h-[520px]">
              <JournalImage post={post} ratio={1.4} sizes="(min-width: 1024px) 58vw, 100vw" priority className="lg:absolute lg:inset-0 lg:h-full" />
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
          {/* Botanical sidebar */}
          <aside className="lg:col-span-3">
            {b ? (
              <dl className="divide-y divide-ink/10 border-y border-ink/10" data-testid="list-post-botanical">
                {[
                  ['Botanical', b.name],
                  ['Latin', b.latin],
                  ['Part used', b.part],
                  ['Ayurveda', b.ayurveda],
                  ['Unani', b.unani],
                  ['Chinese', b.tcm],
                ]
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="py-3">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{k}</dt>
                      <dd className={`mt-1 text-sm leading-snug text-ink/85 ${k === 'Latin' ? 'italic' : ''}`}>{v}</dd>
                    </div>
                  ))}
              </dl>
            ) : (
              <p className="font-mono text-[11px] leading-relaxed text-muted">A note on method rather than a plant.</p>
            )}
            <Link to="/botanicals" className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass">
              All botanicals →
            </Link>
          </aside>

          {/* Body */}
          <div className="lg:col-span-7 lg:col-start-5">
            <div className="space-y-6 text-lg leading-relaxed text-ink/80" data-testid="text-post-body">
              {(post.body || []).map((p, i) => (
                <p key={i} className={i === 0 ? 'font-display text-2xl leading-snug text-ink sm:text-[1.7rem]' : ''}>
                  {p}
                </p>
              ))}
            </div>

            {post.founderNote && (
              <aside className="mt-12 border-l-2 border-brass pl-6" data-testid="text-post-founder-note">
                <div className="flex items-center gap-3">
                  <PhysicianSeal className="h-10 w-10" />
                  <p className="eyebrow">A note from Dr. Mushtaq</p>
                </div>
                <p className="mt-4 font-display text-xl leading-snug text-ink sm:text-2xl">{post.founderNote}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{FOUNDER.name} · Formulator and owner. Opinion, not medical advice.</p>
              </aside>
            )}

            {Array.isArray(post.sources) && post.sources.length > 0 && (
              <div className="mt-12 border-t border-ink/10 pt-6">
                <p className="eyebrow">Sources</p>
                <ol className="mt-4 space-y-2" data-testid="list-post-sources">
                  {post.sources.map(([label, url], i) => (
                    <li key={url || i} className="text-sm leading-relaxed text-ink/70">
                      <span className="font-mono text-[11px] text-brass">{i + 1}. </span>
                      {url ? (
                        <a href={url} target={url.startsWith('/') ? undefined : '_blank'} rel={url.startsWith('/') ? undefined : 'noopener noreferrer'} className="underline decoration-ink/30 underline-offset-2 hover:text-brass">
                          {label}
                        </a>
                      ) : (
                        label
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Where it goes */}
        {where.length > 0 && (
          <section className="border-t border-ink/10 bg-sand/60">
            <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
              <SectionHead eyebrow="Where it goes" title={b ? `${b.name} in the shelf.` : 'On the shelf.'} lede={b ? `Every one of these starts with the same lot-tested blackseed oil; ${b.name.toLowerCase()} is added by purpose.` : undefined} />
              <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4" data-testid="grid-post-products">
                {where.slice(0, 4).map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} ratio={1.1} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Next */}
        {next && next.slug !== post.slug && (
          <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHead eyebrow="Next entry" title={next.title} />
              <Link to={`/journal/${next.slug}`} className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink hover:text-brass" data-testid="link-post-next">
                Read next →
              </Link>
            </div>
          </section>
        )}
      </article>
    </>
  )
}
