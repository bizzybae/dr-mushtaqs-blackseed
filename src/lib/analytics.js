// Tiny event bus. Events carry no personal information: SKUs, slugs, lot
// numbers, and counts only. Anything listening on window.dataLayer (or a
// future analytics script) receives the same payload.
export function track(event, props = {}) {
  const payload = { event, ...props, ts: Date.now() }
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(payload)
    window.dispatchEvent(new CustomEvent('dm:track', { detail: payload }))
    if (import.meta.env.DEV) console.debug('[track]', event, props)
  } catch {
    /* analytics must never break the page */
  }
}
