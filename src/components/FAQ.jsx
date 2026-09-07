import { faqs } from '../data/site.js'

export default function FAQ() {
  return (
    <section id="faq" className="section">
      <p className="eyebrow">Before you buy</p>
      <h2 className="h2 mt-4">Safety and disclosures.</h2>
      <div className="mt-12 max-w-4xl">
        {faqs.map((item) => (
          <details key={item.question} className="group border-t border-ink/10 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl">
              {item.question}
              <span className="font-mono text-brass group-open:hidden">+</span>
              <span className="hidden font-mono text-brass group-open:inline">-</span>
            </summary>
            <p className="mt-4 max-w-3xl text-ink/70">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
