import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Product from './components/Product.jsx'
import Standards from './components/Standards.jsx'
import Collection from './components/Collection.jsx'
import Heritage from './components/Heritage.jsx'
import Founder from './components/Founder.jsx'
import FAQ from './components/FAQ.jsx'
import Newsletter from './components/Newsletter.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'

export default function App() {
  const [cart, setCart] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)

  function addToCart(quantity) {
    setCart((current) => current + quantity)
    setCartOpen(true)
  }

  return (
    <div className="min-h-screen">
      <Header cart={cart} onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Product onAdd={addToCart} />
        <Standards />
        <Collection />
        <Heritage />
        <Founder />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        count={cart}
        onClose={() => setCartOpen(false)}
        onClear={() => setCart(0)}
      />
    </div>
  )
}
