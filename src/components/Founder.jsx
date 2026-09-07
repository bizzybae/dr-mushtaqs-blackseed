export default function Founder() {
  return (
    <section className="section bg-ink text-cream">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
        <div className="grid h-32 w-32 shrink-0 place-content-center rounded-full border border-brass text-center font-display text-3xl text-brass">
          DM
          <span className="font-mono text-[10px] tracking-[0.2em]">MD</span>
        </div>
        <div>
          <p className="eyebrow">About the founder</p>
          <h2 className="h2 mt-4">Dr. Quddarat Mushtaq, MD</h2>
          <p className="mt-6 max-w-3xl text-cream/75">
            Physician with family medicine training, based in South Carolina. This company was started around one
            conviction: a label should tell you exactly what is inside and nothing it cannot support.
          </p>
          <p className="mt-4 max-w-3xl font-mono text-[10px] leading-relaxed text-cream/60">
            This biography is factual background about the founder. It is not a product endorsement, not a
            recommendation for any individual, and not a substitute for care from your own licensed clinician. Reading
            this site does not create a physician-patient relationship.
          </p>
        </div>
      </div>
    </section>
  )
}
