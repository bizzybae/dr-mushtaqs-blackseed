import { Link } from 'react-router-dom'
import ProductPhoto from '../components/ProductPhoto'
import { Mark } from '../components/Logo'
import { Seo } from '../components/ui'
import { FOUNDER, HADITH } from '../data/site'

export default function Story() {
  return (
    <>
      <Seo title="Our Story" description="Why a family-medicine physician started a blackseed company built on one measured number instead of promises." />
      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
          <div className="lg:col-span-6">
            <p className="eyebrow">Our story</p>
            <h1 className="h1 mt-6">
              A seed from the cupboard,
              <br />
              <span className="italic text-brass">a number from the lab.</span>
            </h1>
          </div>
          <div className="lg:col-span-6">
            <ProductPhoto slug="collection-gift-set" fit="cover" ratio={1.5} sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Mark className="h-14 w-14 text-brass" />
            <p className="eyebrow mt-8">The founder</p>
            <h2 className="mt-4 font-display text-3xl">{FOUNDER.name}</h2>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Family medicine · Myrtle Beach, South Carolina</p>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-ink/80 lg:col-span-7 lg:col-start-6">
            {FOUNDER.body.map((p, i) => (
              <p key={i} className={i === 0 ? 'font-display text-2xl leading-snug text-ink sm:text-3xl' : ''}>
                {p}
              </p>
            ))}
            <p className="pt-4 font-mono text-[10px] leading-relaxed text-muted">{FOUNDER.disclaimer}</p>
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
          <div className="lg:col-span-5">
            <p className="eyebrow">The mark</p>
            <h2 className="mt-4 font-display text-3xl text-cream sm:text-4xl">A ring and a drop.</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-cream/75">
              The six bonded points are the benzoquinone ring at the heart of thymoquinone. The drop is the oil itself. Together they say what the label says: a measured molecule, carried in a pressed seed oil, and nothing added. It is the only mark we use, on every bottle, box, and page.
            </p>
          </div>
          <div className="flex items-center justify-center lg:col-span-6 lg:col-start-7">
            <Mark className="h-48 w-48 text-brass sm:h-64 sm:w-64" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:py-24">
        <p className="eyebrow">Heritage</p>
        <blockquote className="mt-8 font-display text-3xl italic leading-snug sm:text-4xl">{HADITH.narration}</blockquote>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{HADITH.attribution}</p>
        <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-ink/60">{HADITH.note}</p>
        <Link to="/shop" className="btn btn-solid mt-12" data-testid="link-story-shop">
          Shop the five
        </Link>
      </section>
    </>
  )
}
