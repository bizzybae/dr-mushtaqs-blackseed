import BottleArt from './BottleArt.jsx'

const proof = [
  { index: '01', label: 'One ingredient' },
  { index: '02', label: 'Cold pressed' },
  { index: '03', label: 'Batch documented' }
]

export default function Hero() {
  return (
    <section id="top" className="grid lg:grid-cols-2">
      <div className="section flex flex-col justify-center">
        <p className="eyebrow">Blackseed, simplified</p>
        <h1 className="h1 mt-6">
          The molecule,
          <br />
          <span className="italic">not the myth.</span>
        </h1>
        <p className="mt-8 max-w-md text-lg text-ink/70">
          A single ingredient oil for people who care about sourcing, process, and honest labeling.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#shop" className="btn btn-solid">
            Shop the original
          </a>
          <a href="#standards" className="btn">
            Our standard
          </a>
        </div>
        <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
          {proof.map((item) => (
            <div key={item.index}>
              <dt className="font-mono text-[10px] text-brass">{item.index}</dt>
              <dd className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em]">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="relative grid min-h-[420px] place-items-center overflow-hidden bg-sand lg:min-h-full">
        <div className="absolute aspect-square w-2/3 rounded-full bg-brass/30" />
        <BottleArt className="relative z-10 h-[320px] w-auto drop-shadow-2xl sm:h-[420px] lg:h-[560px]" />
        <p className="absolute bottom-6 right-6 text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-ink/60">
          The original
          <br />
          Blackseed oil
        </p>
      </div>
    </section>
  )
}
