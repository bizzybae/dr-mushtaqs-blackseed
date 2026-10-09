import { Link } from 'react-router-dom'
import { Seo } from '../components/ui'

export default function NotFound() {
  return (
    <>
      <Seo title="Not found" />
      <section className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8 lg:py-36">
        <p className="eyebrow">404</p>
        <h1 className="h1 mt-6">Nothing here.</h1>
        <p className="mt-6 text-ink/70">That page has gone the way of the myth.</p>
        <Link to="/shop" className="btn btn-solid mt-10">
          Shop by purpose
        </Link>
      </section>
    </>
  )
}
