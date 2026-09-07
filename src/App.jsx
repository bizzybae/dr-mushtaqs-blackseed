import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Product from './components/Product.jsx'
import Standards from './components/Standards.jsx'
import ProductCatalog from './components/ProductCatalog.jsx'
import Heritage from './components/Heritage.jsx'
import Founder from './components/Founder.jsx'
import FAQ from './components/FAQ.jsx'
import Newsletter from './components/Newsletter.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import ProductPage from './components/ProductPage.jsx'

function Home({ onAdd }) {
  return (
    <main>
      <Hero />
      <Product onAdd={onAdd} />
      <ProductCatalog limit={6} />
      <Standards />
      <Heritage />
      <Founder />
      <FAQ />
      <Newsletter />
    </main>
  )
}

function Catalog() {
  return (
    <main>
      <section className="section border-b border-ink/10 bg-sand">
        <p className="eyebrow">Dr. Mushtaq’s Blackseed</p>
        <h1 className="h1 mt-6 max-w-4xl">The complete collection.</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/70">
          Explore ten formats built around the same restrained apothecary system. Each page separates confirmed details
          from decisions still awaiting formulation, testing, and label review.
        </p>
      </section>
      <ProductCatalog />
    </main>
  )
}

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  function addToCart(product, quantity) {
    setCart((current) => {
      const found = current.find((item) => item.slug === product.slug)
      if (found) {
        return current.map((item) =>
          item.slug === product.slug ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...current, { slug: product.slug, name: product.name, price: product.price, quantity }]
    })
    setCartOpen(true)
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header cart={cartCount} onCartClick={() => setCartOpen(true)} />
        <Routes>
          <Route path="/" element={<Home onAdd={addToCart} />} />
          <Route path="/products" element={<Catalog />} />
          <Route path="/products/:slug" element={<ProductPage onAdd={addToCart} />} />
        </Routes>
        <Footer />
        <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onClear={() => setCart([])} />
      </div>
    </BrowserRouter>
  )
}
