import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import { ScrollToTop } from './components/ui'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/ProductPage'
import Science from './pages/Science'
import Story from './pages/Story'
import NotFound from './pages/NotFound'
import { CheckoutCancel, CheckoutSuccess, FAQPage, PolicyPage } from './pages/Misc'
import { CatalogProvider } from './lib/catalog'
import { CartProvider } from './lib/cart'

export default function App() {
  return (
    <BrowserRouter>
      <CatalogProvider>
        <CartProvider>
          <ScrollToTop />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main" className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:slug" element={<ProductPage />} />
                <Route path="/products" element={<Navigate to="/shop" replace />} />
                <Route path="/products/:slug" element={<LegacyProduct />} />
                <Route path="/science" element={<Science />} />
                <Route path="/story" element={<Story />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/policies/:slug" element={<PolicyPage />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
                <Route path="/checkout/cancel" element={<CheckoutCancel />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <CartDrawer />
        </CartProvider>
      </CatalogProvider>
    </BrowserRouter>
  )
}

// Old URLs from the ten-product build.
const LEGACY = {
  'original-blackseed-oil': 'blackseed-oil',
  'the-travel-ritual': 'blackseed-oil?variant=DM-BSO-TR5',
  'blackseed-balm': 'blackseed-balm',
  'blackseed-oil-softgels': 'blackseed-oil-softgels',
  'scalp-beard-serum': 'scalp-beard-serum',
  'culinary-finishing-oil': 'culinary-finishing-oil',
}

function LegacyProduct() {
  const slug = window.location.pathname.split('/').pop()
  return <Navigate to={`/shop/${LEGACY[slug] || ''}`} replace />
}
