import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import ProductPhoto, { ProductThumb } from '../components/ProductPhoto'
import ProductCard from '../components/ProductCard'
import { Accordion, GuaranteeStrip, LabelBadges, PhysicianSeal, Seo } from '../components/ui'
import { BOTANICALS, PROTOCOL } from '../data/catalog'
import { FOUNDER } from '../data/site'
import { findVariant, money, savingsPct, useCatalog, useProduct } from '../lib/catalog'
import { startCheckout, useCart } from '../lib/cart'
import NotFound from './NotFound'

export default function ProductPage() {
  const { slug } = useParams()
  const [params, setParams] = useSearchParams()
  const { product, loading } = useProduct(slug)
  const { products, collections } = useCatalog()
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

  const collection = collections.find((c) => c.slug === product.collection)
  const isSet = product.productType === 'bundle'
  const gallery = [...new Set([variant.image, ...(product.gallery || []), ...(product.mosaic?.length && !product.image ? ['__mosaic__', ...product.mosaic] : [])].filter(Boolean))]
  const related = products.filter((p) => p.slug !== product.slug && p.collection === product.collection).slice(0, 4)
  const fallbackRelated = related.length ? related : products.filter((p) => p.slug !== product.slug && p.featured).slice(0, 4)
  const protocolStep = PROTOCOL.find((s) => s.product === product.slug)
  const save = savingsPct(variant)
  const unit = variant.sizeMl ? `${money(Math.round(variant.priceCents / variant.sizeMl), { always: true })} per mL` : null
  const bundleLines = (product.bundle || []).map((b) => ({ ...b, hit: findVariant(products, b.sku) })).filter((b) => b.hit)
  const botanicals = (product.botanicals || []).map((k) => BOTANICALS[k]).filter(Boolean)

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
      <Seo title={product.name} description={product.short} image={`/products/${product.image || product.mosaic?.[0] || 'collection-flatlay'}.jpg`} />

      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1440px] px-5 pt-6 sm:px-8 lg:px-12">
        <ol className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <li>
            <Link to="/shop" className="hover:text-ink">
              Shop
            </Link>
          </li>
          {collection && (
            <>
              <li aria-hidden="true">/</li>
              <li>
                <Link to={`/collections/${collection.slug}`} className="hover:text-ink">
                  {collection.name}
                </Link>
              </li>
            </>
          )}
          <li aria-hidden="true">/</li>
          <li className="text-ink">{product.name}</li>
        </ol>
      </nav>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-20 pt-6 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pb-28">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-32">
            {gallery.length && gallery[shot] !== '__mosaic__' ? (
              <ProductPhoto key={gallery[shot]} slug={gallery[shot]} priority className="bg-sand" sizes="(min-width: 1024px) 58vw, 100vw" />
            ) : (
              <ProductThumb product={product} ratio={1.6} priority sizes="(min-width: 1024px) 58vw, 100vw" />
            )}
            {gallery.length > 1 && (
              <ul className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
                {gallery.map((g, i) => (
                  <li key={g}>
                    <button onClick={() => setShot(i)} aria-label={`Show photo ${i + 1}`} aria-current={shot === i} className={`block w-full border transition-colors ${shot === i ? 'border-ink' : 'border-transparent hover:border-ink/30'}`} data-testid={`button-thumb-${i}`}>
                      {g === '__mosaic__' ? <ProductThumb product={product} ratio={1.2} sizes="120px" /> : <ProductPhoto slug={g} fit="cover" ratio={1.2} sizes="120px" />}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Buy box */}
        <div className="lg:col-span-5 lg:pl-6">
          <div className="flex items-center gap-3">
            <p className="eyebrow">{collection ? `${collection.name} · ${product.step}` : product.step}</p>
            {(product.bestseller || product.isNew) && <span className="bg-ink px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-cream">{product.bestseller ? 'Bestseller' : 'New'}</span>}
          </div>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{product.subtitle}</p>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">{product.tagline}</p>

          <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="font-display text-3xl" data-testid="text-pdp-price">
              {money(variant.priceCents)}
            </p>
            {variant.compareAtCents && variant.compareAtCents > variant.priceCents && <p className="font-mono text-sm text-muted line-through">{money(variant.compareAtCents)}</p>}
            {save > 0 && <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-brass">Save {save}%</p>}
            {unit && <p className="w-full font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:w-auto">{unit}</p>}
          </div>

          {product.variants.length > 1 && (
            <fieldset className="mt-8">
              <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Size · larger sizes cost less per mL</legend>
              <div className={`mt-3 grid gap-3 ${product.variants.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {product.variants.map((v) => {
                  const s = savingsPct(v)
                  const on = v.sku === variant.sku
                  return (
                    <button key={v.sku} onClick={() => setParams(v.default ? {} : { variant: v.sku }, { replace: true })} aria-pressed={on} className={`border px-3 py-4 text-left transition-colors ${on ? 'border-ink bg-ink text-cream' : 'border-ink/20 hover:border-ink'}`} data-testid={`button-variant-${v.sku}`}>
                      <span className="block font-display text-base">{v.label}</span>
                      <span className={`mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] ${on ? 'text-cream/70' : 'text-muted'}`}>{money(v.priceCents)}</span>
                      {s > 0 && <span className={`mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] ${on ? 'text-brass' : 'text-brass'}`}>Save {s}%</span>}
                    </button>
                  )
                })}
              </div>
              {(variant.description || variant.format) && (
                <p className="mt-3 text-sm leading-relaxed text-ink/65">
                  {variant.format}
                  {variant.format && variant.description ? '. ' : ''}
                  {variant.description}
                </p>
              )}
            </fieldset>
          )}

          {isSet && bundleLines.length > 0 && (
            <div className="mt-8 border border-ink/10">
              <p className="border-b border-ink/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">In the set</p>
              <ul className="divide-y divide-ink/10">
                {bundleLines.map(({ sku, qty: q, hit }) => (
                  <li key={sku} className="flex items-center gap-4 px-4 py-3">
                    <div className="w-14 shrink-0">
                      <ProductThumb product={hit.product} ratio={1} sizes="56px" />
                    </div>
                    <div className="flex-1">
                      <Link to={`/shop/${hit.product.slug}`} className="font-display text-base leading-tight hover:text-brass">
                        {hit.product.name}
                      </Link>
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                        {q > 1 ? `${q} × ` : ''}
                        {hit.variant.label}
                      </p>
                    </div>
                    <p className="font-mono text-[11px] text-muted">{money(hit.variant.priceCents * q)}</p>
                  </li>
                ))}
              </ul>
              {variant.compareAtCents && (
                <p className="flex justify-between border-t border-ink/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em]">
                  <span className="text-muted">Separately {money(variant.compareAtCents)}</span>
                  <span className="text-brass">You save {money(variant.compareAtCents - variant.priceCents)}</span>
                </p>
              )}
            </div>
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
          <div className="mt-5 flex items-center gap-4 border border-ink/10 px-4 py-3">
            <PhysicianSeal className="h-12 w-12 shrink-0" />
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-muted">
              Physician formulated · The 60-Day Standard · Complimentary US shipping over $150
            </p>
          </div>

          <div className="mt-10 border-t border-ink/10 pt-8">
            <LabelBadges compact />
          </div>

          <p className="mt-10 text-[15px] leading-relaxed text-ink/80">{product.long}</p>

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

      {/* Botanicals in this product */}
      {botanicals.length > 0 && (
        <section className="border-y border-ink/10 bg-sand">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Botanicals</p>
                <h2 className="h2 mt-3">What it is made of.</h2>
              </div>
              <Link to="/botanicals" className="font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass">
                Full materia medica →
              </Link>
            </div>
            <ul className={`mt-10 grid gap-4 sm:grid-cols-2 ${botanicals.length >= 3 ? 'lg:grid-cols-3' : ''}`}>
              {botanicals.map((b) => (
                <li key={b.latin} className="border border-ink/10 p-6">
                  <p className="font-display text-xl">{b.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {b.latin} · {b.part} · {b.origin}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{b.note}</p>
                  <dl className="mt-4 grid grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-[0.1em]">
                    <div>
                      <dt className="text-brass">Ayurveda</dt>
                      <dd className="mt-1 text-ink/70">{b.ayurveda}</dd>
                    </div>
                    <div>
                      <dt className="text-brass">Unani</dt>
                      <dd className="mt-1 text-ink/70">{b.unani}</dd>
                    </div>
                    <div>
                      <dt className="text-brass">TCM</dt>
                      <dd className="mt-1 text-ink/70">{b.tcm}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

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
                In the protocol: step {protocolStep.step}, {protocolStep.time.toLowerCase()} ·{' '}
                <Link to="/protocol" className="underline hover:text-brass">
                  see the day
                </Link>
              </p>
            )}
            <div className="mt-10 border-t border-cream/15 pt-8">
              <p className="eyebrow">A note from the formulator</p>
              <p className="mt-4 text-[15px] leading-relaxed text-cream/80">{FOUNDER.lede} Every lot of this product carries its certificate, and every bottle carries the 60-Day Standard.</p>
              <p className="mt-4 font-display text-xl italic text-brass">{FOUNDER.name}</p>
              <p className="mt-3 font-mono text-[10px] leading-relaxed text-cream/40">{FOUNDER.disclosure}</p>
            </div>
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
                        <td className="px-4 py-3 text-cream/70">{b.pressed_date || '·'}</td>
                        <td className="px-4 py-3 text-brass">{b.thymoquinone_pct ? `${Number(b.thymoquinone_pct).toFixed(2)}%` : '·'}</td>
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
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream/60">Blackseed oil</dt>
                    <dd className="mt-2 font-display text-2xl text-brass">4.64% TQ</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream/60">Method</dt>
                    <dd className="mt-2 font-display text-2xl text-cream">HPLC</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream/60">Panel</dt>
                    <dd className="mt-2 font-display text-2xl text-cream">Metals · Micro</dd>
                  </div>
                </dl>
                <p className="mt-6 text-sm leading-relaxed text-cream/60">Lot numbers, press dates, and the certificate of analysis for each release appear here the day the lot ships. Find your lot number on the base of the bottle.</p>
              </div>
            )}
            <p className="mt-6 font-mono text-[10px] leading-relaxed text-cream/50">{product.safety}</p>
          </div>
        </div>
      </section>

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

      <section className="border-t border-ink/10 bg-sand">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
          <GuaranteeStrip />
          <div className="mt-16 flex items-end justify-between">
            <div>
              <p className="eyebrow">{collection ? `More ${collection.name}` : 'Also'}</p>
              <h2 className="h2 mt-4">Complete the routine.</h2>
            </div>
            {collection && (
              <Link to={`/collections/${collection.slug}`} className="hidden font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass sm:block">
                All {collection.name} →
              </Link>
            )}
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {fallbackRelated.map((p) => (
              <ProductCard key={p.slug} product={p} index={products.indexOf(p)} ratio={1} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
