import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import { ScrollToTop } from './components/ui'
import Home from './pages/Home'
import Shop, { CollectionPage } from './pages/Shop'
import ProductPage from './pages/ProductPage'
import Science from './pages/Science'
import NotFound from './pages/NotFound'
import { BotanicalsPage, FounderPage, PractitionersPage, ProtocolPage } from './pages/Learn'
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
                <Route path="/collections/:slug" element={<CollectionPage />} />
                <Route path="/products" element={<Navigate to="/shop" replace />} />
                <Route path="/products/:slug" element={<LegacyProduct />} />
                <Route path="/science" element={<Science />} />
                <Route path="/dr-mushtaq" element={<FounderPage />} />
                <Route path="/story" element={<Navigate to="/dr-mushtaq" replace />} />
                <Route path="/botanicals" element={<BotanicalsPage />} />
                <Route path="/protocol" element={<ProtocolPage />} />
                <Route path="/practitioners" element={<PractitionersPage />} />
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

// Old URLs from earlier builds.
const LEGACY = {
  'original-blackseed-oil': 'blackseed-oil',
  'the-travel-ritual': 'the-travel-ritual',
  'travel-ritual': 'the-travel-ritual',
}

function LegacyProduct() {
  const { slug } = useParams()
  return <Navigate to={`/shop/${LEGACY[slug] || slug}`} replace />
}
