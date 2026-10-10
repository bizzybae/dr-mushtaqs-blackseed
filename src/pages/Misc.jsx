import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Accordion, Seo } from '../components/ui'
import WaitlistForm from '../components/WaitlistForm'
import { MICRO } from '../data/catalog'
import { POLICIES, SITE_FAQ } from '../data/site'
import { money } from '../lib/catalog'
import { useCart } from '../lib/cart'
import NotFound from './NotFound'

export function FAQPage() {
  return (
    <>
      <Seo title="Questions" description="Answers about Dr. Mushtaq’s products, sizes and pricing, the 60-Day Standard, ordering, shipping, and safety." />
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <p className="eyebrow">Questions</p>
        <h1 className="h1 mt-6">Asked often.</h1>
        <div className="mt-16 space-y-16">
          {SITE_FAQ.map((group) => (
            <div key={group.group} className="grid gap-8 lg:grid-cols-12">
              <h2 className="font-display text-2xl lg:col-span-3">{group.group}</h2>
              <div className="lg:col-span-8 lg:col-start-5">
                <Accordion items={group.items} defaultOpen={0} id={group.group.toLowerCase().replace(/\s+/g, '-')} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 max-w-md border-t border-ink/10 pt-10">
          <p className="font-display text-2xl">Still wondering?</p>
          <p className="mt-2 text-sm text-ink/70">
            Write to{' '}
            <a href="mailto:hello@drmushtaqs.com" className="underline hover:text-brass">
              hello@drmushtaqs.com
            </a>
            . A person replies within one business day.
          </p>
        </div>
      </section>
    </>
  )
}

export function PolicyPage() {
  const { slug } = useParams()
  const policy = POLICIES[slug]
  if (!policy) return <NotFound />
  return (
    <>
      <Seo title={policy.title} description={`${policy.title} for Dr. Mushtaq’s Blackseed.`} />
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
        <p className="eyebrow">Policies · Updated {policy.updated}</p>
        <h1 className="h1 mt-6">{policy.title}</h1>
        <div className="mt-14 divide-y divide-ink/10 border-t border-ink/10">
          {policy.sections.map(([title, body]) => (
            <div key={title} className="grid gap-4 py-8 sm:grid-cols-12">
              <h2 className="font-display text-xl sm:col-span-4">{title}</h2>
              <p className="text-base leading-relaxed text-ink/75 sm:col-span-8">{body}</p>
            </div>
          ))}
        </div>
        <nav className="mt-10 flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-[0.14em]">
          {Object.entries(POLICIES)
            .filter(([k]) => k !== slug)
            .map(([k, p]) => (
              <Link key={k} to={`/policies/${k}`} className="hover:text-brass">
                {p.title} →
              </Link>
            ))}
        </nav>
      </section>
    </>
  )
}

export function CheckoutSuccess() {
  const [params] = useSearchParams()
  const sessionId = params.get('session_id')
  const { clear } = useCart()
  const [order, setOrder] = useState(null)
  const [state, setState] = useState('loading')

  useEffect(() => {
    clear()
  }, [clear])

  useEffect(() => {
    if (!sessionId) {
      setState('nosession')
      return
    }
    fetch(`/api/checkout?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('lookup failed'))))
      .then((d) => {
        setOrder(d)
        setState('ok')
      })
      .catch(() => setState('error'))
  }, [sessionId])

  return (
    <>
      <Seo title="Order received" />
      <section className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8 lg:py-32">
        <p className="eyebrow">Thank you</p>
        <h1 className="h1 mt-6">Your order is in.</h1>
        {state === 'ok' && order && (
          <div className="mx-auto mt-10 max-w-md border border-ink/10 p-6 text-left" data-testid="card-order-summary">
            <dl className="space-y-3 font-mono text-[11px] uppercase tracking-[0.12em]">
              <div className="flex justify-between">
                <dt className="text-muted">Confirmation</dt>
                <dd>{order.reference}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Email</dt>
                <dd className="normal-case tracking-normal">{order.email}</dd>
              </div>
              <div className="flex justify-between border-t border-ink/10 pt-3">
                <dt>Total</dt>
                <dd>{money(order.amount_total, { always: true })}</dd>
              </div>
            </dl>
            {order.items?.length > 0 && (
              <ul className="mt-5 space-y-2 border-t border-ink/10 pt-5 text-sm">
                {order.items.map((it) => (
                  <li key={it.description} className="flex justify-between gap-4">
                    <span>
                      {it.quantity} × {it.description}
                    </span>
                    <span className="font-mono text-[12px]">{money(it.amount_total, { always: true })}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-ink/70">
          A receipt from Stripe is on its way to your inbox, and a tracking link follows when the order ships, usually within one business day. Every bottle is covered by the 60-Day Standard.
        </p>
        <Link to="/shop" className="btn btn-solid mt-10" data-testid="link-success-shop">
          Back to the shop
        </Link>
      </section>
    </>
  )
}

export function CheckoutCancel() {
  const { setOpen } = useCart()
  return (
    <>
      <Seo title="Checkout cancelled" />
      <section className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8 lg:py-32">
        <p className="eyebrow">No charge was made</p>
        <h1 className="h1 mt-6">Your bag is waiting.</h1>
        <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-ink/70">Nothing was charged. Your items are still in the bag whenever you are ready.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button onClick={() => setOpen(true)} className="btn btn-solid" data-testid="button-cancel-open-bag">
            Open bag
          </button>
          <Link to="/shop" className="btn">
            Keep shopping
          </Link>
        </div>
        <div className="mx-auto mt-16 max-w-md text-left">
          <WaitlistForm source="checkout-cancel" label="Hear about new lots" />
        </div>
      </section>
    </>
  )
}


// /waitlist/:state : landing pages for the confirmation and unsubscribe links.
const WAITLIST_STATES = {
  confirmed: ['Confirmed', MICRO.waitlistDone, 'We will write once, the day the first lot ships, with its certificate attached.'],
  unsubscribed: ['Unsubscribed', 'You have been removed from the list.', 'No further email from us. If that was a mistake, you can join again from any product page.'],
  invalid: ['Link not recognised', 'This link is not valid or has already been used.', 'If you were trying to confirm, join again from the site and use the newest email.'],
  error: ['Something went wrong', 'We could not update your subscription.', 'Please try the link again in a moment or write to hello@drmushtaqs.com.'],
}

export function WaitlistStatusPage() {
  const { state } = useParams()
  const entry = WAITLIST_STATES[state]
  if (!entry) return <NotFound />
  const [eyebrow, title, body] = entry
  return (
    <>
      <Seo title={eyebrow} />
      <section className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8 lg:py-32">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="h1 mt-6">{title}</h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-ink/70">{body}</p>
        <Link to="/" className="btn btn-solid mt-10">
          Back to the site
        </Link>
      </section>
    </>
  )
}
