import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductPhoto, { ProductThumb } from '../components/ProductPhoto'
import ProductCard from '../components/ProductCard'
import { Accordion, GuaranteeStrip, LabelBadges, PhysicianSeal, SectionHead, Seo } from '../components/ui'
import { Mark } from '../components/Logo'
import { BOTANICALS, PROTOCOL } from '../data/catalog'
import { FOUNDER, HADITH, PRACTITIONERS } from '../data/site'
import { useCatalog } from '../lib/catalog'
import { supabase } from '../lib/supabase'

// ───────────────────────── Dr. Mushtaq ─────────────────────────
export function FounderPage() {
  const { products } = useCatalog()
  const picks = ['blackseed-oil', 'blackseed-oil-softgels', 'culinary-finishing-oil', 'oud-noir-attar'].map((s) => products.find((p) => p.slug === s)).filter(Boolean)

  return (
    <>
      <Seo title="Dr. Mushtaq" description="Dr. Quddarat U. Mushtaq, MD, MS: the physician who formulates, signs, and stands behind every Dr. Mushtaq’s product." image="/products/physician-desk.jpg" />
      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
          <div className="flex flex-col justify-center lg:col-span-5">
            <PhysicianSeal className="h-24 w-24" />
            <p className="eyebrow mt-8">The physician behind the label</p>
            <h1 className="h1 mt-4">
              Dr. Quddarat U. Mushtaq,
              <br />
              <span className="italic text-brass">MD, MS.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">{FOUNDER.short}</p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{FOUNDER.role}</p>
          </div>
          <div className="lg:col-span-7">
            <ProductPhoto slug="physician-desk" fit="cover" ratio={1.5} priority sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Credentials</p>
            <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {FOUNDER.credentials.map(([k, v]) => (
                <div key={k} className="grid grid-cols-12 gap-4 py-4">
                  <dt className="col-span-3 font-display text-xl">{k}</dt>
                  <dd className="col-span-9 text-sm leading-relaxed text-ink/75">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-mono text-[10px] leading-relaxed text-muted">Credentials as stated in public professional records. Dr. Mushtaq does not practise medicine through this company and no product here is a prescription.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="eyebrow">In his words</p>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-ink/80">
              {FOUNDER.body.map((p, i) => (
                <p key={i} className={i === 0 ? 'font-display text-2xl leading-snug text-ink sm:text-3xl' : ''}>
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-8 font-display text-3xl italic text-brass">Q. U. Mushtaq</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{FOUNDER.name}</p>
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <SectionHead eyebrow="The Mushtaq standard" title="Five rules every bottle keeps." dark />
          <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {FOUNDER.principles.map(([t, b], i) => (
              <li key={t} className="border border-cream/15 p-6">
                <span className="font-mono text-[10px] text-brass">0{i + 1}</span>
                <p className="mt-4 font-display text-xl text-cream">{t}</p>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">{b}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14">
            <LabelBadges dark />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="Ask Dr. Mushtaq" title="Straight answers." lede="Questions he is asked most, answered as the formulator and owner, not as anyone’s physician." />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={FOUNDER.qa} defaultOpen={0} id="founder" />
            <p className="mt-6 font-mono text-[10px] leading-relaxed text-muted">{FOUNDER.disclosure}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-sand">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
          <SectionHead eyebrow="On his shelf" title="What the founder uses." />
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {picks.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} ratio={1} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:py-24">
        <p className="eyebrow">Heritage</p>
        <blockquote className="mt-8 font-display text-3xl italic leading-snug sm:text-4xl">{HADITH.narration}</blockquote>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{HADITH.attribution}</p>
        <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-ink/60">{HADITH.note}</p>
      </section>
    </>
  )
}

// ───────────────────────── Botanicals ─────────────────────────
export function BotanicalsPage() {
  const { products } = useCatalog()
  const entries = Object.entries(BOTANICALS)
  return (
    <>
      <Seo title="Botanicals" description="The materia medica behind Dr. Mushtaq’s: each botanical with its Latin name, part used, single origin, and classical names in Ayurveda, Unani, and Chinese medicine." />
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Materia medica</p>
            <h1 className="h1 mt-6">
              Eleven botanicals,
              <br />
              <span className="italic text-brass">three traditions.</span>
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-10">
            <p className="text-lg leading-relaxed text-ink/75">
              Every material we use has been handled for centuries by Ayurvedic vaidyas, Unani hakims, and Chinese herbalists under its own name. We list those names beside the Latin binomial, the part used, and the single origin we buy from, so a practitioner can place our materials inside their own framework. Names are offered for reference, not as indications.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="hidden grid-cols-12 gap-4 border-b border-ink/10 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted lg:grid">
            <p className="col-span-3">Botanical</p>
            <p className="col-span-2">Part · Origin</p>
            <p className="col-span-2">Ayurveda</p>
            <p className="col-span-2">Unani / Tibb</p>
            <p className="col-span-3">Chinese medicine</p>
          </div>
          <ul className="divide-y divide-ink/10">
            {entries.map(([key, b]) => {
              const used = products.filter((p) => (p.botanicals || []).includes(key) && p.productType !== 'bundle')
              return (
                <li key={key} className="grid gap-4 py-8 lg:grid-cols-12" id={key}>
                  <div className="lg:col-span-3">
                    <p className="font-display text-2xl">{b.name}</p>
                    <p className="mt-1 font-mono text-[11px] italic text-muted">{b.latin}</p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/70">{b.note}</p>
                  </div>
                  <div className="font-mono text-[11px] leading-relaxed text-ink/75 lg:col-span-2">
                    <p>{b.part}</p>
                    <p className="text-muted">{b.origin}</p>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-brass lg:hidden">Ayurveda</p>
                    <p className="font-display text-lg">{b.ayurveda}</p>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-brass lg:hidden">Unani</p>
                    <p className="font-display text-lg">{b.unani}</p>
                  </div>
                  <div className="lg:col-span-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-brass lg:hidden">Chinese medicine</p>
                    <p className="font-display text-lg">{b.tcm}</p>
                    {used.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {used.slice(0, 4).map((p) => (
                          <li key={p.slug}>
                            <Link to={`/shop/${p.slug}`} className="border border-ink/15 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] hover:border-ink hover:text-brass">
                              {p.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-sand">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">For practitioners</p>
            <h2 className="h2 mt-4">Materials you can dispense.</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">Certificates of analysis per lot, dispensing sizes, and practitioner pricing on every botanical above.</p>
            <Link to="/practitioners" className="btn btn-solid mt-8" data-testid="link-botanicals-practitioners">
              Practitioner accounts
            </Link>
          </div>
          <div className="lg:col-span-7">
            <ProductPhoto slug="practitioner-case" fit="cover" ratio={1.7} sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
        </div>
      </section>
    </>
  )
}

// ───────────────────────── Protocol ─────────────────────────
export function ProtocolPage() {
  const { products } = useCatalog()
  const shelf = products.find((p) => p.slug === 'the-complete-shelf')
  return (
    <>
      <Seo title="The Protocol" description="A day with the Dr. Mushtaq’s shelf: six moments, from the morning dropper to the evening serum." />
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <SectionHead eyebrow="Your protocol" title="A day with the shelf." lede="How the purposes fit together across a day. Pick one moment, or furnish the whole shelf at once." />
      </section>
      <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12">
        <ol className="divide-y divide-ink/10 border-y border-ink/10">
          {PROTOCOL.map((step) => {
            const p = products.find((x) => x.slug === step.product)
            if (!p) return null
            return (
              <li key={step.step} className="grid items-center gap-6 py-8 lg:grid-cols-12">
                <div className="flex items-baseline gap-4 lg:col-span-2">
                  <span className="font-mono text-[11px] text-brass">{step.step}</span>
                  <span className="font-display text-2xl">{step.time}</span>
                </div>
                <Link to={`/shop/${p.slug}`} className="group flex items-center gap-5 lg:col-span-6">
                  <div className="w-28 shrink-0">
                    <ProductThumb product={p} ratio={1.2} sizes="112px" imgClassName="transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div>
                    <p className="font-display text-xl leading-tight group-hover:text-brass">{p.name}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{p.subtitle}</p>
                  </div>
                </Link>
                <p className="text-[15px] leading-relaxed text-ink/70 lg:col-span-4">{step.note}</p>
              </li>
            )
          })}
        </ol>
        {shelf && (
          <div className="mt-14 grid gap-8 bg-ink p-8 text-cream lg:grid-cols-12 lg:p-12">
            <div className="lg:col-span-7">
              <ProductThumb product={shelf} ratio={1.8} sizes="(min-width: 1024px) 58vw, 100vw" />
            </div>
            <div className="flex flex-col justify-center lg:col-span-5">
              <p className="eyebrow">The whole day, boxed</p>
              <p className="mt-3 font-display text-3xl text-cream">{shelf.name}</p>
              <p className="mt-3 text-cream/70">{shelf.short}</p>
              <Link to={`/shop/${shelf.slug}`} className="btn mt-8 border-cream/40 text-cream hover:bg-cream hover:text-ink" data-testid="link-protocol-shelf">
                See the set · save 20%
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

// ───────────────────────── Practitioners ─────────────────────────
export function PractitionersPage() {
  const { products } = useCatalog()
  const sizes = products.filter((p) => ['blackseed-oil', 'blackseed-oil-softgels', 'amla-blackseed-hair-oil', 'saffron-sesame-body-oil', 'practitioner-case'].includes(p.slug))
  const [form, setForm] = useState({ name: '', email: '', practice: '', credential: '', note: '' })
  const [state, setState] = useState('idle')

  async function submit(e) {
    e.preventDefault()
    setState('busy')
    try {
      if (supabase) {
        const { error } = await supabase.from('practitioner_inquiries').insert({ ...form, email: form.email.trim().toLowerCase() })
        if (error) throw error
      }
      setState('done')
    } catch (err) {
      console.warn('[practitioners]', err?.message)
      setState('error')
    }
  }

  const field = (k, label, type = 'text', required = true) => (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{label}</span>
      <input type={type} required={required} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="mt-2 w-full border-b border-ink/30 bg-transparent py-2 text-sm outline-none focus:border-ink" data-testid={`input-practitioner-${k}`} />
    </label>
  )

  return (
    <>
      <Seo title="Practitioners" description="Practitioner accounts for Ayurvedic, Unani, Chinese-medicine, naturopathic, and allopathic clinicians: COAs per lot, dispensing sizes, case pricing." image="/products/practitioner-case.jpg" />
      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="eyebrow">For practitioners</p>
            <h1 className="h1 mt-6">
              Dispense
              <br />
              <span className="italic text-brass">with a certificate.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">{PRACTITIONERS.lede}</p>
          </div>
          <div className="lg:col-span-7">
            <ProductPhoto slug="practitioner-case" fit="cover" ratio={1.6} priority sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {PRACTITIONERS.points.map(([t, b], i) => (
            <li key={t} className="border border-ink/10 p-6">
              <span className="font-mono text-[10px] text-brass">0{i + 1}</span>
              <p className="mt-4 font-display text-xl">{t}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{b}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-ink/10 bg-sand">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
          <SectionHead eyebrow="Dispensing sizes" title="Built for the clinic shelf." />
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {sizes.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} ratio={1} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-28">
        <div className="lg:col-span-5">
          <Mark className="h-12 w-12 text-brass" />
          <h2 className="h2 mt-6">Apply for an account.</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">We verify credentials by hand and reply within two business days with your pricing and a sample certificate of analysis.</p>
          <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-muted">Eligible: {PRACTITIONERS.eligible}</p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          {state === 'done' ? (
            <div className="border border-ink/10 p-8" data-testid="text-practitioner-done">
              <p className="font-display text-2xl">Received.</p>
              <p className="mt-3 text-ink/70">We will write back within two business days from hello@drmushtaqs.com.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {field('name', 'Your name')}
                {field('email', 'Email', 'email')}
                {field('practice', 'Practice or dispensary')}
                {field('credential', 'Credential or license (e.g. L.Ac., BAMS, ND, MD)')}
              </div>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">What do you dispense most? (optional)</span>
                <textarea rows={3} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="mt-2 w-full border-b border-ink/30 bg-transparent py-2 text-sm outline-none focus:border-ink" data-testid="input-practitioner-note" />
              </label>
              {state === 'error' && <p className="text-sm text-red-700">Something went wrong. Please try again or email hello@drmushtaqs.com.</p>}
              <button type="submit" disabled={state === 'busy'} className="btn btn-solid disabled:opacity-60" data-testid="button-practitioner-submit">
                {state === 'busy' ? 'Sending' : 'Request practitioner pricing'}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12">
        <GuaranteeStrip />
      </section>
    </>
  )
}
