import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { ScrollToTop } from "./components/ui";
import Home from "./pages/Home";
import Shop, { CollectionPage } from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Science from "./pages/Science";
import NotFound from "./pages/NotFound";
import {
  BotanicalsPage,
  FounderPage,
  PractitionersPage,
  ProtocolPage,
} from "./pages/Learn";
import {
  CheckoutCancel,
  CheckoutSuccess,
  FAQPage,
  PolicyPage,
  WaitlistStatusPage,
} from "./pages/Misc";
import { CoaPage, LotPage } from "./pages/Coa";
import { ComingSoonPage, HeritagePage, SafetyPage } from "./pages/Launch";
import OwnerPage from "./pages/Owner";
import { CatalogProvider } from "./lib/catalog";
import { ContentProvider } from "./lib/content";
import { CartProvider } from "./lib/cart";

export default function App() {
  return (
    <BrowserRouter>
      <ContentProvider>
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
                  <Route
                    path="/collections/:slug"
                    element={<CollectionPage />}
                  />
                  <Route
                    path="/products"
                    element={<Navigate to="/shop" replace />}
                  />
                  <Route path="/products/:slug" element={<LegacyProduct />} />
                  <Route path="/science" element={<Science />} />
                  <Route path="/dr-mushtaq" element={<FounderPage />} />
                  <Route path="/about" element={<FounderPage />} />
                  <Route
                    path="/story"
                    element={<Navigate to="/dr-mushtaq" replace />}
                  />
                  <Route path="/coming-soon" element={<ComingSoonPage />} />
                  <Route path="/coa" element={<CoaPage />} />
                  <Route path="/coa/:lot" element={<LotPage />} />
                  <Route path="/safety" element={<SafetyPage />} />
                  <Route path="/heritage" element={<HeritagePage />} />
                  <Route path="/botanicals" element={<BotanicalsPage />} />
                  <Route path="/protocol" element={<ProtocolPage />} />
                  <Route
                    path="/practitioners"
                    element={<PractitionersPage />}
                  />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/policies/:slug" element={<PolicyPage />} />
                  <Route
                    path="/checkout/success"
                    element={<CheckoutSuccess />}
                  />
                  <Route path="/checkout/cancel" element={<CheckoutCancel />} />
                  <Route
                    path="/waitlist/:state"
                    element={<WaitlistStatusPage />}
                  />
                  <Route path="/owner" element={<OwnerPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <CartDrawer />
          </CartProvider>
        </CatalogProvider>
      </ContentProvider>
    </BrowserRouter>
  );
}

// Old URLs from earlier builds.
const LEGACY = {
  "original-blackseed-oil": "blackseed-oil",
  "the-travel-ritual": "the-travel-ritual",
  "travel-ritual": "the-travel-ritual",
};

function LegacyProduct() {
  const { slug } = useParams();
  return <Navigate to={`/shop/${LEGACY[slug] || slug}`} replace />;
}
