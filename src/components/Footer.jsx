export default function Footer() {
  return (
    <footer className="border-t border-ink/10 px-6 py-12 sm:px-10 lg:px-20">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-display text-sm tracking-[0.08em]">DR. MUSHTAQ’S</p>
          <p className="font-mono text-[9px] tracking-[0.2em] text-muted">BLACKSEED</p>
        </div>
        <nav className="flex flex-wrap gap-6 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          <a href="/products">Shop</a>
          <a href="/#faq">Disclosures</a>
          <a href="/#heritage">Heritage</a>
        </nav>
      </div>
      <p className="mt-10 max-w-4xl font-mono text-[10px] leading-relaxed text-muted">
        These statements have not been evaluated by the Food and Drug Administration. This product is not intended to
        diagnose, treat, cure, or prevent any disease. Information on this site is general in nature, is not medical
        advice, and does not create a physician-patient relationship. Consult a qualified clinician about your own
        health.
      </p>
      <p className="mt-6 font-mono text-[10px] text-muted">Copyright 2026 Dr. Mushtaq’s. All rights reserved.</p>
    </footer>
  )
}
