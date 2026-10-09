import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Wordmark } from "./Logo";
import ProductPhoto from "./ProductPhoto";
import { NAV } from "../data/site";
import { useCart } from "../lib/cart";
import { money, priceFrom, useCatalog } from "../lib/catalog";

export default function Header() {
  const { count, setOpen } = useCart();
  const { products, settings } = useCatalog();
  const [menu, setMenu] = useState(false);
  const [shop, setShop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenu(false);
    setShop(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const linkClass = ({ isActive }) =>
    `font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-brass ${isActive ? "text-brass" : "text-ink"}`;

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <p className="bg-ink px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-cream/90">
          {settings.announcement || "Complimentary shipping on orders over $75"}
          <span className="hidden sm:inline">
            <span className="mx-3 text-brass">·</span>
            Standardized to 4.64% thymoquinone
          </span>
        </p>

        <div
          className="relative border-b border-ink/10"
          onMouseLeave={() => setShop(false)}
        >
          <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
            <Link
              to="/"
              aria-label="Dr. Mushtaq’s home"
              data-testid="link-home"
            >
              <Wordmark />
            </Link>

            <nav
              className="hidden items-center gap-9 md:flex"
              aria-label="Primary"
            >
              {NAV.map((item) =>
                item.to === "/shop" ? (
                  <div
                    key={item.to}
                    className="relative"
                    onMouseEnter={() => setShop(true)}
                  >
                    <NavLink
                      to={item.to}
                      className={linkClass}
                      aria-haspopup="true"
                      aria-expanded={shop}
                      onFocus={() => setShop(true)}
                    >
                      {item.label}
                    </NavLink>
                  </div>
                ) : (
                  <NavLink key={item.to} to={item.to} className={linkClass}>
                    {item.label}
                  </NavLink>
                ),
              )}
            </nav>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setOpen(true)}
                className="relative font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass"
                data-testid="button-open-bag"
                aria-label={`Open bag, ${count} items`}
              >
                Bag
                <span className="ml-2 inline-grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 font-mono text-[10px] text-cream">
                  {count}
                </span>
              </button>
              <button
                onClick={() => setMenu((m) => !m)}
                aria-expanded={menu}
                aria-controls="mobile-menu"
                className="font-mono text-[11px] uppercase tracking-[0.14em] md:hidden"
                data-testid="button-menu"
              >
                {menu ? "Close" : "Menu"}
              </button>
            </div>
          </div>

          {/* Shop mega-menu */}
          <div
            className={`absolute inset-x-0 top-full hidden border-b border-ink/10 bg-cream shadow-[0_24px_48px_-24px_rgba(23,22,20,0.25)] transition-all duration-200 md:block ${
              shop
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-1 opacity-0"
            }`}
            onMouseEnter={() => setShop(true)}
          >
            <div className="mx-auto grid max-w-[1440px] grid-cols-5 gap-5 px-5 py-8 sm:px-8 lg:px-12">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  to={`/shop/${p.slug}`}
                  className="group"
                  data-testid={`link-menu-${p.slug}`}
                  tabIndex={shop ? 0 : -1}
                >
                  <ProductPhoto
                    slug={p.image}
                    fit="cover"
                    ratio={1.15}
                    className="bg-sand"
                    sizes="260px"
                  />
                  <p className="mt-3 font-display text-[15px] leading-tight group-hover:text-brass">
                    {p.name}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {p.subtitle}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-ink">
                    {p.variants.length > 1
                      ? `from ${money(priceFrom(p))}`
                      : money(priceFrom(p))}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu: a sibling of the header so the blurred header does not clip it */}
      {menu && (
        <nav
          id="mobile-menu"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-cream md:hidden"
          aria-label="Mobile"
        >
          <div className="flex h-[72px] items-center justify-between border-b border-ink/10 px-5">
            <Link to="/" aria-label="Dr. Mushtaq’s home">
              <Wordmark />
            </Link>
            <button
              onClick={() => setMenu(false)}
              className="font-mono text-[11px] uppercase tracking-[0.14em]"
              data-testid="button-menu-close"
            >
              Close
            </button>
          </div>
          <div className="px-5 pb-16 pt-6">
            <ul className="divide-y divide-ink/10 border-b border-ink/10">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="block py-5 font-display text-3xl"
                    data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-10">The five</p>
            <ul className="mt-4 grid grid-cols-2 gap-4">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link to={`/shop/${p.slug}`} className="block">
                    <ProductPhoto
                      slug={p.image}
                      fit="cover"
                      ratio={1.15}
                      className="bg-sand"
                      sizes="50vw"
                    />
                    <p className="mt-2 font-display text-base leading-tight">
                      {p.name}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                      {money(priceFrom(p))}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}
