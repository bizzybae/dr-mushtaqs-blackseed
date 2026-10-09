import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import ProductPhoto from '../components/ProductPhoto'
import ProductCard from '../components/ProductCard'
import { Accordion, LabelBadges, Seo } from '../components/ui'
import { PROTOCOL } from '../data/catalog'
import { money, useCatalog, useProduct } from '../lib/catalog'
import { startCheckout, useCart } from '../lib/cart'
import NotFound from './NotFound'

export default function ProductPage() {
  const { slug } = useParams()
  const [params, setParams] = useSearchParams()
  const { product, loading } = useProduct(slug)
  const { products } = useCatalog()
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState(null)

  const variant = useMemo(() => {
    if (!product) return null
    const wanted = params.get('variant')
    return product.variants.find((v) => v.sku === wanted) || product.variants.find((v) => v.default) || product.variants[0]
  }, [product, params])

  const [shot, setShot] = useState(0)
  useEffect(() => {
    setShot(0)
    setQty(1)
    setNote(null)
  }, [slug, variant?.sku])

  if (!product) return loading ? <div className="min-h-[60vh]" /> : <NotFound />

  const gallery = [variant.image, ...product.gallery.filter((g) => g !== variant.image)]
  const related = products.filter((p) => p.slug !== product.slug)
  const protocolStep = PROTOCOL.find((s) => s.product === product.slug)

  async function buyNow() {
    setBusy(true)
    try {
      await startCheckout([{ sku: variant.sku, qty }])
    } catch (err) {
      setNote(err.code === 'checkout_not_configured' ? 'Checkout is being connected. Add to bag for now and we will notify the list when it opens.' : err.message)
      setBusy(false)
    }
  }

  return (
    <>
      <Seo title={product.name} description={product.short} image={`/products/${product.image}.jpg`} />

      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1440px] px-5 pt-6 sm:px-8 lg:px-12">
        <ol className="flex gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <li>
            <Link to="/shop" className="hover:text-ink">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">{product.name}</li>
        </ol>
      </nav>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-20 pt-6 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pb-28">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-32">
            <ProductPhoto key={gallery[shot]} slug={gallery[shot]} priority className="bg-sand" sizes="(min-width: 1024px) 58vw, 100vw" />
            {gallery.length > 1 && (
              <ul className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
                {gallery.map((g, i) => (
                  <li key={g}>
                    <button
                      onClick={() => setShot(i)}
                      aria-label={`Show photo ${i + 1}`}
                      aria-current={shot === i}
                      className={`block w-full border transition-colors ${shot === i ? 'border-ink' : 'border-transparent hover:border-ink/30'}`}
                      data-testid={`button-thumb-${i}`}
                    >
                      <ProductPhoto slug={g} fit="cover" ratio={1.2} sizes="120px" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Buy box */}
        <div className="lg:col-span-5 lg:pl-6">
          <p className="eyebrow">{product.subtitle}</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">{product.tagline}</p>

          <div className="mt-8 flex items-baseline gap-3">
            <p className="font-display text-3xl" data-testid="text-pdp-price">
              {money(variant.priceCents)}
            </p>
            {variant.compareAtCents && <p className="font-mono text-sm text-muted line-through">{money(variant.compareAtCents)}</p>}
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {variant.label}
              {variant.format ? ` · ${variant.format}` : ''}
            </p>
          </div>

          {product.variants.length > 1 && (
            <fieldset className="mt-8">
              <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Format</legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.sku}
                    onClick={() => setParams(v.default ? {} : { variant: v.sku }, { replace: true })}
                    aria-pressed={v.sku === variant.sku}
                    className={`border px-4 py-4 text-left transition-colors ${v.sku === variant.sku ? 'border-ink bg-ink text-cream' : 'border-ink/20 hover:border-ink'}`}
                    data-testid={`button-variant-${v.sku}`}
                  >
                    <span className="block font-display text-base">{v.label}</span>
                    <span className={`mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] ${v.sku === variant.sku ? 'text-cream/70' : 'text-muted'}`}>
                      {v.format} · {money(v.priceCents)}
                    </span>
                  </button>
                ))}
              </div>
              {variant.description && <p className="mt-3 text-sm leading-relaxed text-ink/65">{variant.description}</p>}
            </fieldset>
          )}

          <div className="mt-8 flex gap-3">
            <div className="inline-flex items-center border border-ink/20">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-14 w-12 font-mono hover:bg-ink hover:text-cream" aria-label="Decrease quantity" data-testid="button-pdp-dec">
                −
              </button>
              <span className="w-10 text-center font-mono text-sm" data-testid="text-pdp-qty">
                {qty}
              </span>
              <button onClick={() => setQty((q) => Math.min(12, q + 1))} className="h-14 w-12 font-mono hover:bg-ink hover:text-cream" aria-label="Increase quantity" data-testid="button-pdp-inc">
                +
              </button>
            </div>
            <button onClick={() => add(variant.sku, qty)} className="btn btn-solid h-14 flex-1" data-testid="button-pdp-add">
              Add to bag · {money(variant.priceCents * qty)}
            </button>
          </div>
          <button onClick={buyNow} disabled={busy} className="btn mt-3 h-14 w-full disabled:opacity-60" data-testid="button-pdp-buy">
            {busy ? 'Opening secure checkout' : 'Buy now with Stripe'}
          </button>
          {note && (
            <p className="mt-3 text-sm leading-relaxed text-ink/75" role="status" data-testid="text-pdp-note">
              {note}
            </p>
          )}
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Complimentary US shipping over $75 · 30-day returns on unopened items</p>

          <div className="mt-10 border-t border-ink/10 pt-8">
            <LabelBadges compact />
          </div>

          <div className="mt-10">
            <p className="text-[15px] leading-relaxed text-ink/80">{product.long}</p>
          </div>

          <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            {product.specs.map(([k, v]) => (
              <div key={k} className="grid grid-cols-3 gap-4 py-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{k}</dt>
                <dd className="col-span-2 text-sm text-ink/80">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Ingredients</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">{product.ingredients}</p>
          </div>
        </div>
      </section>

      {/* How to use + batch analysis */}
      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
          <div className="lg:col-span-5">
            <p className="eyebrow">How to use</p>
            <ol className="mt-8 space-y-6">
              {product.howToUse.map((step, i) => (
                <li key={i} className="flex gap-5">
                  <span className="font-mono text-[10px] text-brass">0{i + 1}</span>
                  <p className="text-[15px] leading-relaxed text-cream/85">{step}</p>
                </li>
              ))}
            </ol>
            {protocolStep && (
              <p className="mt-8 border-t border-cream/15 pt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-cream/60">
                In the protocol: step {protocolStep.step}, {protocolStep.time.toLowerCase()}
              </p>
            )}
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">Batch analysis</p>
            <h2 className="mt-4 font-display text-3xl text-cream">What the lab measured.</h2>
            {product.batches && product.batches.length > 0 ? (
              <div className="mt-8 overflow-hidden border border-cream/15">
                <table className="w-full text-left font-mono text-[11px]">
                  <thead className="bg-cream/5 uppercase tracking-[0.12em] text-cream/60">
                    <tr>
                      <th className="px-4 py-3 font-normal">Lot</th>
                      <th className="px-4 py-3 font-normal">Pressed</th>
                      <th className="px-4 py-3 font-normal">TQ %</th>
                      <th className="px-4 py-3 font-normal">COA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream/10">
                    {product.batches.map((b) => (
                      <tr key={b.lot_number}>
                        <td className="px-4 py-3">{b.lot_number}</td>
                        <td className="px-4 py-3 text-cream/70">{b.pressed_date || '—'}</td>
                        <td className="px-4 py-3 text-brass">{b.thymoquinone_pct ? `${Number(b.thymoquinone_pct).toFixed(2)}%` : '—'}</td>
                        <td className="px-4 py-3">
                          {b.coa_storage_path ? (
                            <a href={b.coa_storage_path} className="underline hover:text-brass" target="_blank" rel="noreferrer">
                              PDF
                            </a>
                          ) : (
                            <span className="text-cream/50">Pending</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-8 border border-cream/15 p-6">
                <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream/60">Specification</dt>
                    <dd className="mt-2 font-display text-2xl text-brass">4.64% TQ</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream/60">Method</dt>
                    <dd className="mt-2 font-display text-2xl text-cream">HPLC</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream/60">Lab</dt>
                    <dd className="mt-2 font-display text-2xl text-cream">Independent</dd>
                  </div>
                </dl>
                <p className="mt-6 text-sm leading-relaxed text-cream/60">
                  Lot numbers, press dates, and the certificate of analysis for each release appear here the day the lot ships. Find your lot number on the base of the bottle.
                </p>
              </div>
            )}
            <p className="mt-6 font-mono text-[10px] leading-relaxed text-cream/50">{product.safety}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {product.faq?.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Questions</p>
              <h2 className="h2 mt-4">About this one.</h2>
            </div>
            <div className="lg:col-span-8">
              <Accordion items={product.faq} defaultOpen={0} id={product.slug} />
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      <section className="border-t border-ink/10 bg-sand">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Complete the shelf</p>
              <h2 className="h2 mt-4">The other four.</h2>
            </div>
            <Link to="/shop" className="hidden font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass sm:block">
              View all →
            </Link>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={products.indexOf(p)} ratio={1} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
