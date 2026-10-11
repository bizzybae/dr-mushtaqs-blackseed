import { useEffect, useState } from 'react'
import { money } from '../lib/catalog'

// Mobile-only bar that appears once the main CTA has scrolled away. It hides
// while a form field has focus so it never covers an input or a warning.
export default function StickyBuyBar({ anchorRef, name, price, cta, onClick, disabled = false }) {
  const [show, setShow] = useState(false)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const el = anchorRef?.current
      if (!el) return
      // Show once the CTA block has scrolled fully above the viewport.
      setShow(el.getBoundingClientRect().bottom < 0)
    }
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [anchorRef])

  useEffect(() => {
    const on = (e) => setTyping(['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName))
    const off = () => setTyping(false)
    document.addEventListener('focusin', on)
    document.addEventListener('focusout', off)
    return () => {
      document.removeEventListener('focusin', on)
      document.removeEventListener('focusout', off)
    }
  }, [])

  if (!show || typing) return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-cream/95 px-4 py-3 backdrop-blur lg:hidden" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }} data-testid="bar-sticky-buy">
      <div className="mx-auto flex max-w-xl items-center gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base leading-tight">{name}</p>
          {price != null && <p className="font-mono text-[12px]">{money(price)}</p>}
        </div>
        <button type="button" onClick={onClick} disabled={disabled} className="btn btn-solid min-h-[48px] shrink-0 disabled:opacity-60">
          {cta}
        </button>
      </div>
    </div>
  )
}
