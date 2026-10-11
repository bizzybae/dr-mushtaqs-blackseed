import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Accordion, Seo } from '../components/ui'
import WaitlistForm from '../components/WaitlistForm'
import { useSite } from '../lib/content'
import { track } from '../lib/analytics'
import { useCatalog } from '../lib/catalog'

// Every published lot, newest first. If nothing is published yet the list
// simply does not render; the method and the reading guide still do.
function allLots(products) {
  return products
    .flatMap((p) => (p.batches || []).map((b) => ({ ...b, product: p })))
    .sort((a, b) => ((a.press_date || '') < (b.press_date || '') ? 1 : -1))
}

export function CoaPage() {
  const { COA } = useSite()
  const { products, loading } = useCatalog()
  const lots = allLots(products)
  const original = products.find((p) => p.slug === 'blackseed-oil')

  return (
    <>
      <Seo title="Lab reports" description="Every lot of Dr. Mushtaq’s oil gets an independent lab panel: thymoquinone, fatty-acid profile, peroxide value, heavy metals, and microbial screen. Certificates are published here." />
      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
          <div className="lg:col-span-7">
            <p className="eyebrow">Certificates of analysis</p>
            <h1 className="h1 mt-6">{COA.title}</h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">{COA.body}</p>
          </div>
          <div className="lg:col-span-5">
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {(COA.panel || []).map((t, i) => (
                <li key={t} className="flex gap-5 py-4">
                  <span className="font-mono text-[11px] text-brass">0{i + 1}</span>
                  <p className="text-base text-ink/80">{t}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {lots.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12" data-testid="list-lots">
          <p className="eyebrow">Published lots</p>
          <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            {lots.map((b, i) => (
              <li key={b.lot_number} className="grid gap-3 py-5 sm:grid-cols-12 sm:items-center">
                <div className="sm:col-span-4">
                  <p className="font-display text-xl">Lot {b.lot_number}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {b.product.name} · {b.is_current || i === 0 ? 'current lot' : 'previous lot'}
                  </p>
                </div>
                <p className="font-mono text-[12px] text-ink/70 sm:col-span-2">{b.press_date}</p>
                <p className="font-mono text-[12px] text-ink/70 sm:col-span-3">{b.thymoquinone_pct != null ? `Thymoquinone ${Number(b.thymoquinone_pct).toFixed(2)}%` : ''}</p>
                <div className="flex gap-4 font-mono text-[11px] uppercase tracking-[0.14em] sm:col-span-3 sm:justify-end">
                  <Link to={`/coa/${encodeURIComponent(b.lot_number)}`} className="underline hover:text-brass" onClick={() => track('coa_opened', { lot: b.lot_number, from: 'list' })}>
                    View
                  </Link>
                  {b.coa_pdf_url && (
                    <a href={b.coa_pdf_url} target="_blank" rel="noreferrer" className="underline hover:text-brass">
                      PDF
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!loading && lots.length === 0 && (
        <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
          <div className="grid gap-8 border border-ink/10 p-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="font-display text-2xl">The first lot’s certificate will be published here before it ships.</p>
              <p className="mt-3 text-base leading-relaxed text-ink/70">Join the list and we will send it to you the same day, attached to the note that the Original is open.</p>
            </div>
            <div className="lg:col-span-5">
              <WaitlistForm sku={original?.variants?.[0]?.sku || null} source="coa" label="Send me the first certificate" compact />
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-ink/10 bg-sand">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">How to read this</p>
            <h2 className="h2 mt-4">Chemistry only.</h2>
            <p className="mt-6 text-base leading-relaxed text-ink/70">What each line on a certificate means and why it moves from lot to lot. Nothing here is a statement about what the oil does for you.</p>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={COA.howToRead} defaultOpen={0} id="coa" />
          </div>
        </div>
      </section>
    </>
  )
}

// Deep link printed as a QR code on each bottle.
export function LotPage() {
  const { lot } = useParams()
  const { products, loading } = useCatalog()
  const lots = allLots(products)
  const hit = lots.find((b) => b.lot_number === lot)
  const isCurrent = hit && (hit.is_current || lots.filter((b) => b.product.slug === hit.product.slug)[0]?.lot_number === hit.lot_number)

  useEffect(() => {
    if (hit) track('coa_opened', { lot: hit.lot_number, from: 'deep-link' })
  }, [hit?.lot_number])

  if (loading && !hit) return <div className="min-h-[60vh]" />

  if (!hit) {
    return (
      <>
        <Seo title={`Lot ${lot}`} />
        <section className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8 lg:py-32">
          <p className="eyebrow">Lot {lot}</p>
          <h1 className="h1 mt-6">No published report for this lot.</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">We never substitute another lot’s certificate. If this code is printed on your bottle, write to hello@drmushtaqs.com with a photo of the label and we will send the report directly.</p>
          <Link to="/coa" className="btn btn-solid mt-10">
            All lab reports
          </Link>
        </section>
      </>
    )
  }

  const rows = [
    ['Product', hit.product.name],
    ['Lot', hit.lot_number],
    ['Status', isCurrent ? 'Current lot' : 'Previous lot'],
    ['Pressed', hit.press_date],
    ['Best by', hit.best_by],
    ['Origin', [hit.origin_region, hit.origin_country].filter(Boolean).join(', ')],
    ['Thymoquinone', hit.thymoquinone_pct != null ? `${Number(hit.thymoquinone_pct).toFixed(2)}%${hit.tq_method ? ` by ${hit.tq_method}` : ''}` : null],
    ['Peroxide value', hit.peroxide_value != null ? `${Number(hit.peroxide_value).toFixed(2)} meq O₂/kg` : null],
    ['Heavy metals', hit.heavy_metals_result],
    ['Microbial screen', hit.micro_result],
    ['Laboratory', hit.lab_name],
  ].filter(([, v]) => v)
  const fa = hit.fatty_acid_profile && typeof hit.fatty_acid_profile === 'object' ? Object.entries(hit.fatty_acid_profile) : []

  return (
    <>
      <Seo title={`Lot ${hit.lot_number}`} description={`Certificate of analysis for ${hit.product.name}, lot ${hit.lot_number}.`} />
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
        <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <Link to="/coa" className="hover:text-ink">
            Lab reports
          </Link>{' '}
          / <span className="text-ink">Lot {hit.lot_number}</span>
        </nav>
        <p className="eyebrow mt-8">{isCurrent ? 'Current lot' : 'Previous lot'}</p>
        <h1 className="h1 mt-4">Lot {hit.lot_number}</h1>
        <p className="mt-4 text-lg text-ink/70">
          {hit.product.name} ·{' '}
          <Link to={`/shop/${hit.product.slug}`} className="underline hover:text-brass">
            product page
          </Link>
        </p>
        <dl className="mt-12 divide-y divide-ink/10 border-y border-ink/10" data-testid="table-lot">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-3 gap-4 py-4">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{k}</dt>
              <dd className="col-span-2 text-base text-ink/85">{v}</dd>
            </div>
          ))}
        </dl>
        {fa.length > 0 && (
          <div className="mt-10">
            <p className="eyebrow">Fatty-acid profile</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 font-mono text-[12px] sm:grid-cols-3">
              {fa.map(([k, v]) => (
                <div key={k} className="border border-ink/10 p-3">
                  <dt className="uppercase tracking-[0.1em] text-muted">{k}</dt>
                  <dd className="mt-1 text-ink">{String(v)}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {hit.coa_pdf_url && (
          <a href={hit.coa_pdf_url} target="_blank" rel="noreferrer" className="btn btn-solid mt-10" data-testid="link-coa-pdf">
            Download the certificate (PDF)
          </a>
        )}
        <p className="mt-10 font-mono text-[11px] leading-relaxed text-muted">Figures and wording are shown as issued by the laboratory. They describe the oil’s chemistry, not any effect on the body.</p>
        <Link to="/coa#how-to-read" className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass">
          How to read this →
        </Link>
      </section>
    </>
  )
}
