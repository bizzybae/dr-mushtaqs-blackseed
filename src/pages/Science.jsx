import { Link } from 'react-router-dom'
import ProductPhoto from '../components/ProductPhoto'
import { LabelBadges, Seo } from '../components/ui'

const MARKERS = [
  ['Blackseed oil', 'Thymoquinone', 'Chromatography, method named per lot', 'Published per lot'],
  ['Saffron', 'Crocin · Safranal', 'UV-Vis, ISO 3632', 'Reported per lot'],
  ['Grapevine', 'Total stilbenes', 'HPLC', 'Reported per lot'],
  ['Oud · Sandalwood · Rose', 'Identity profile', 'GC-MS', 'Reported per lot'],
  ['Every lot', 'Heavy metals · Microbial', 'ICP-MS · Plate count', 'Laboratory wording published as issued'],
]

const STEPS = [
  ['Source', 'One origin per botanical and one harvest per lot, bought from a documented supplier. The origin is named on that lot’s certificate once we hold the paperwork, not before.'],
  ['Press', 'Mechanical screw press held below 40 °C. No solvents, no heat, no refining. The oil settles for two weeks and is decanted, not filtered.'],
  ['Test', 'A sample from every lot goes to an independent laboratory for the marker constituent of each botanical, plus peroxide and acid value for freshness, heavy metals, and a microbial panel.'],
  ['Release', 'A lot is released only after its certificate is published. The figures are the laboratory’s, not ours, and they are shown per lot rather than printed once on a label.'],
]

export default function Science() {
  return (
    <>
      <Seo title="The Molecule" description="Why Dr. Mushtaq’s measures one marker constituent per botanical, prints the number, and makes no other claim. Thymoquinone, crocin, stilbenes, and how every lot is tested." />
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">The molecule</p>
            <h1 className="h1 mt-6">
              Thymoquinone,
              <br />
              <span className="italic text-brass">measured.</span>
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-10">
            <p className="text-lg leading-relaxed text-ink/75">
              Every botanical we use contains hundreds of compounds. Each has one that is the most studied, the most characteristic, and the most sensitive to how the plant was grown, handled, and stored: thymoquinone in blackseed, crocin and safranal in saffron, the stilbenes in grapevine. We measure that one, print the number, and stop there.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
          <div className="lg:col-span-5">
            <p className="eyebrow">The structure</p>
            <svg viewBox="0 0 320 240" className="mt-8 w-full max-w-sm" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" aria-label="Thymoquinone: 2-isopropyl-5-methyl-1,4-benzoquinone">
              <g className="text-cream">
                <path d="M160 60 L212 90 L212 150 L160 180 L108 150 L108 90 Z" />
                <path d="M116 94 L116 146 M204 94 L204 146" />
                <path d="M160 60 V28 M160 180 V212" />
                <path d="M152 28 h16 M152 212 h16" strokeWidth="2.6" />
                <path d="M212 90 L252 68" />
                <path d="M252 68 L284 86 M252 68 L256 32" />
                <path d="M108 150 L68 172" />
              </g>
              <g className="font-mono text-[13px]" fill="currentColor" stroke="none">
                <text x="160" y="22" textAnchor="middle" className="fill-brass">O</text>
                <text x="160" y="232" textAnchor="middle" className="fill-brass">O</text>
                <text x="296" y="92" className="fill-cream/70">CH₃</text>
                <text x="246" y="26" className="fill-cream/70">CH₃</text>
                <text x="30" y="180" className="fill-cream/70">CH₃</text>
              </g>
            </svg>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/60">2-isopropyl-5-methyl-1,4-benzoquinone · C₁₀H₁₂O₂</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">Why a number per lot</h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-cream/75">
              <p>
                Thymoquinone concentration in commercial blackseed oils ranges from almost nothing in refined or adulterated oils to several percent in fresh, cold-pressed oil from good seed. The number collapses with heat, with light, with time, and with dilution. It is, in other words, an honest witness.
              </p>
              <p>
                So we do not print one number for all time. Each lot goes to an independent laboratory, the result is published on that lot’s certificate page with the method named, and the lot code on your bottle takes you to it. The figure you see is the laboratory’s for the oil in your hand, not a brand average and not a supplier’s quote.
              </p>
              <p>
                We do not attach outcomes to the number. It tells you about the oil, not about you. That is the whole point.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
        <p className="eyebrow">What we measure</p>
        <h2 className="h2 mt-4">One marker per botanical.</h2>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead className="border-b border-ink/10 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              <tr>
                <th className="py-3 pr-6 font-normal">Material</th>
                <th className="py-3 pr-6 font-normal">Marker</th>
                <th className="py-3 pr-6 font-normal">Method</th>
                <th className="py-3 font-normal">Reported</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {MARKERS.map(([m, k, method, spec]) => (
                <tr key={m}>
                  <td className="py-4 pr-6 font-display text-lg">{m}</td>
                  <td className="py-4 pr-6 text-sm text-ink/80">{k}</td>
                  <td className="py-4 pr-6 font-mono text-[11px] text-muted">{method}</td>
                  <td className="py-4 font-mono text-[11px] text-brass">{spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Source to shelf</p>
            <h2 className="h2 mt-4">Four steps, one lot number.</h2>
            <ProductPhoto slug="collection-flatlay" fit="cover" ratio={1.2} position="left center" className="mt-10" sizes="(min-width: 1024px) 33vw, 100vw" />
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {STEPS.map(([title, body], i) => (
              <li key={title} className="grid grid-cols-12 gap-4 border-t border-ink/10 py-8 last:border-b">
                <span className="col-span-2 font-mono text-[10px] text-brass sm:col-span-1">0{i + 1}</span>
                <h3 className="col-span-10 font-display text-2xl sm:col-span-3">{title}</h3>
                <p className="col-span-12 text-base leading-relaxed text-ink/75 sm:col-span-8 sm:col-start-5">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-sand">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <p className="eyebrow">On every label</p>
          <div className="mt-8">
            <LabelBadges />
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link to="/shop/blackseed-oil" className="btn btn-solid" data-testid="link-science-shop">
              Shop the oil
            </Link>
            <Link to="/faq" className="btn">
              Questions
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
