import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/ui'
import { STATUS } from '../data/catalog'
import { supabase } from '../lib/supabase'
import { useCatalog } from '../lib/catalog'

// Owner console: lots, waitlist, practitioner inquiries, product status.
// Signed in with a Supabase magic link; every query is gated by RLS policies
// that check the signed-in email against public.owners. Nothing here is
// reachable with the publishable key alone.

const field = 'mt-1 w-full border border-ink/25 bg-cream px-3 py-2 text-base outline-none focus:border-brass'
const label = 'block font-mono text-[11px] uppercase tracking-[0.14em] text-muted'
const thead = 'px-3 py-2 text-left font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-muted'
const td = 'px-3 py-2 align-top text-base'

export default function OwnerPage() {
  const [session, setSession] = useState(undefined) // undefined = loading
  const [tab, setTab] = useState('lots')

  useEffect(() => {
    if (!supabase) return setSession(null)
    supabase.auth.getSession().then(({ data }) => setSession(data.session || null))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s || null))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!supabase) return <Shell title="Owner console"><p className="text-base text-ink/70">Supabase is not configured in this environment.</p></Shell>
  if (session === undefined) return <div className="min-h-[60vh]" />
  if (!session) return <SignIn />

  return (
    <Shell title="Owner console" aside={<SignedInAs email={session.user.email} />}>
      <nav className="mt-8 flex flex-wrap gap-2 border-b border-ink/10 pb-4" aria-label="Sections">
        {[
          ['lots', 'Lots and certificates'],
          ['products', 'Product status'],
          ['waitlist', 'Waitlist'],
          ['inquiries', 'Practitioner inquiries'],
        ].map(([k, t]) => (
          <button key={k} onClick={() => setTab(k)} aria-pressed={tab === k} className={`min-h-[44px] px-4 font-mono text-[11px] uppercase tracking-[0.14em] ${tab === k ? 'bg-ink text-cream' : 'hover:text-brass'}`} data-testid={`tab-${k}`}>
            {t}
          </button>
        ))}
      </nav>
      <div className="mt-8">
        {tab === 'lots' && <Lots />}
        {tab === 'products' && <ProductStatus />}
        {tab === 'waitlist' && <Waitlist />}
        {tab === 'inquiries' && <Inquiries />}
      </div>
    </Shell>
  )
}

function Shell({ title, aside, children }) {
  return (
    <>
      <Seo title={title} />
      <section className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Dr. Mushtaq’s</p>
            <h1 className="mt-3 font-display text-4xl">{title}</h1>
          </div>
          {aside}
        </div>
        {children}
      </section>
    </>
  )
}

function SignedInAs({ email }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
      {email} ·{' '}
      <button onClick={() => supabase.auth.signOut()} className="underline hover:text-ink" data-testid="button-signout">
        Sign out
      </button>
    </p>
  )
}

function SignIn() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [state, setState] = useState('idle')
  const [msg, setMsg] = useState('')

  async function sendLink(e) {
    e.preventDefault()
    setState('busy')
    const { error } = await supabase.auth.signInWithOtp({ email: email.trim().toLowerCase(), options: { emailRedirectTo: `${window.location.origin}/owner`, shouldCreateUser: true } })
    if (error) {
      setMsg(error.message)
      setState('error')
    } else {
      setMsg('Check your email for a sign-in link. If your email template includes a code, you can enter it below instead.')
      setState('sent')
    }
  }
  async function verify(e) {
    e.preventDefault()
    setState('busy')
    const { error } = await supabase.auth.verifyOtp({ email: email.trim().toLowerCase(), token: code.trim(), type: 'email' })
    if (error) {
      setMsg(error.message)
      setState('error')
    }
  }

  return (
    <Shell title="Owner sign in">
      <form onSubmit={sendLink} className="mt-10 max-w-md" data-testid="form-owner-signin">
        <label className={label} htmlFor="owner-email">
          Owner email
        </label>
        <input id="owner-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} autoComplete="email" data-testid="input-owner-email" />
        <button type="submit" disabled={state === 'busy'} className="btn btn-solid mt-4 disabled:opacity-60" data-testid="button-owner-link">
          {state === 'busy' ? 'Sending' : 'Email me a sign-in link'}
        </button>
        {msg && (
          <p className={`mt-4 text-base ${state === 'error' ? 'text-red-700' : 'text-ink/70'}`} role="status">
            {msg}
          </p>
        )}
      </form>
      {state === 'sent' && (
        <form onSubmit={verify} className="mt-8 max-w-md">
          <label className={label} htmlFor="owner-code">
            Or enter the 6-digit code
          </label>
          <input id="owner-code" inputMode="numeric" value={code} onChange={(e) => setCode(e.target.value)} className={field} />
          <button type="submit" className="btn mt-4">
            Verify code
          </button>
        </form>
      )}
      <p className="mt-10 max-w-md font-mono text-[11px] leading-relaxed text-muted">Only emails listed in the owners table can read or change anything here. Everyone else sees empty tables.</p>
    </Shell>
  )
}

// ───────────────────────── Lots ─────────────────────────
const EMPTY_LOT = { lot_number: '', product_id: '', press_date: '', best_by: '', origin_country: '', origin_region: '', thymoquinone_pct: '', tq_method: '', peroxide_value: '', heavy_metals_result: '', micro_result: '', lab_name: '', coa_pdf_url: '', fatty_acid_profile: '', published: false, is_current: false }

function Lots() {
  const [rows, setRows] = useState([])
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(EMPTY_LOT)
  const [editing, setEditing] = useState(null)
  const [state, setState] = useState('idle')
  const [msg, setMsg] = useState('')
  const [file, setFile] = useState(null)

  const load = useCallback(async () => {
    const [{ data: b, error }, { data: p }] = await Promise.all([
      supabase.from('batches').select('*').order('press_date', { ascending: false, nullsFirst: false }),
      supabase.from('products').select('id,name,slug,status').order('sort_order'),
    ])
    if (error) setMsg(error.message)
    setRows(b || [])
    setProducts(p || [])
  }, [])
  useEffect(() => {
    load()
  }, [load])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  function edit(row) {
    setEditing(row.id)
    setForm({ ...EMPTY_LOT, ...row, fatty_acid_profile: row.fatty_acid_profile ? JSON.stringify(row.fatty_acid_profile) : '', thymoquinone_pct: row.thymoquinone_pct ?? '', peroxide_value: row.peroxide_value ?? '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function save(e) {
    e.preventDefault()
    setState('busy')
    setMsg('')
    try {
      let coa_pdf_url = form.coa_pdf_url || null
      if (file) {
        const path = `${form.lot_number.replace(/[^A-Za-z0-9_-]/g, '_')}/${Date.now()}-${file.name.replace(/[^A-Za-z0-9._-]/g, '_')}`
        const { error: upErr } = await supabase.storage.from('coa').upload(path, file, { contentType: 'application/pdf', upsert: false })
        if (upErr) throw upErr
        coa_pdf_url = supabase.storage.from('coa').getPublicUrl(path).data.publicUrl
      }
      let fa = null
      if (form.fatty_acid_profile?.trim()) {
        try {
          fa = JSON.parse(form.fatty_acid_profile)
        } catch {
          throw new Error('Fatty-acid profile must be JSON, for example {"linoleic":"56.2%","oleic":"23.8%"}')
        }
      }
      const num = (v) => (v === '' || v === null || v === undefined ? null : Number(v))
      const payload = {
        lot_number: form.lot_number.trim(),
        product_id: form.product_id || null,
        press_date: form.press_date || null,
        pressed_date: form.press_date || null,
        best_by: form.best_by || null,
        origin_country: form.origin_country || null,
        origin_region: form.origin_region || null,
        thymoquinone_pct: num(form.thymoquinone_pct),
        tq_method: form.tq_method || null,
        peroxide_value: num(form.peroxide_value),
        heavy_metals_result: form.heavy_metals_result || null,
        micro_result: form.micro_result || null,
        lab_name: form.lab_name || null,
        coa_pdf_url,
        fatty_acid_profile: fa,
        published: !!form.published,
        is_current: !!form.is_current,
      }
      if (payload.published && !payload.coa_pdf_url) throw new Error('A published lot needs its certificate PDF.')
      if (payload.published && payload.thymoquinone_pct === null) throw new Error('A published lot needs the thymoquinone result.')
      if (payload.is_current && payload.product_id) {
        await supabase.from('batches').update({ is_current: false }).eq('product_id', payload.product_id).neq('lot_number', payload.lot_number)
      }
      const q = editing ? supabase.from('batches').update(payload).eq('id', editing) : supabase.from('batches').insert(payload)
      const { error } = await q
      if (error) throw error
      setMsg(editing ? 'Lot updated.' : 'Lot saved.')
      setForm(EMPTY_LOT)
      setEditing(null)
      setFile(null)
      await load()
      setState('idle')
    } catch (err) {
      setMsg(err.message || String(err))
      setState('error')
    }
  }

  async function togglePublished(row) {
    if (!row.published && (!row.coa_pdf_url || row.thymoquinone_pct == null)) {
      setMsg(`Lot ${row.lot_number} needs a certificate PDF and a thymoquinone result before it can be published.`)
      return
    }
    const { error } = await supabase.from('batches').update({ published: !row.published }).eq('id', row.id)
    if (error) setMsg(error.message)
    await load()
  }

  const productName = (id) => products.find((p) => p.id === id)?.name || ''

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <form onSubmit={save} className="space-y-4 lg:col-span-5" data-testid="form-lot">
        <h2 className="font-display text-2xl">{editing ? `Edit lot ${form.lot_number}` : 'Publish a lot'}</h2>
        <p className="text-base text-ink/70">Enter only what the laboratory reported. Empty fields are hidden on the lot page. Nothing shows to customers until Published is on.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={label}>Lot number</span>
            <input required value={form.lot_number} onChange={set('lot_number')} className={field} disabled={!!editing} data-testid="input-lot-number" />
          </label>
          <label className="block">
            <span className={label}>Product</span>
            <select required value={form.product_id} onChange={set('product_id')} className={field} data-testid="select-lot-product">
              <option value="">Choose</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={label}>Press date</span>
            <input type="date" value={form.press_date || ''} onChange={set('press_date')} className={field} />
          </label>
          <label className="block">
            <span className={label}>Best by</span>
            <input type="date" value={form.best_by || ''} onChange={set('best_by')} className={field} />
          </label>
          <label className="block">
            <span className={label}>Origin country</span>
            <input value={form.origin_country || ''} onChange={set('origin_country')} className={field} placeholder="Only with supplier paperwork" />
          </label>
          <label className="block">
            <span className={label}>Origin region</span>
            <input value={form.origin_region || ''} onChange={set('origin_region')} className={field} />
          </label>
          <label className="block">
            <span className={label}>Thymoquinone %</span>
            <input type="number" step="0.01" min="0" max="20" value={form.thymoquinone_pct} onChange={set('thymoquinone_pct')} className={field} data-testid="input-lot-tq" />
          </label>
          <label className="block">
            <span className={label}>Method</span>
            <input value={form.tq_method || ''} onChange={set('tq_method')} className={field} placeholder="GC-FID, HPLC" />
          </label>
          <label className="block">
            <span className={label}>Peroxide value (meq O2/kg)</span>
            <input type="number" step="0.01" min="0" value={form.peroxide_value} onChange={set('peroxide_value')} className={field} />
          </label>
          <label className="block">
            <span className={label}>Laboratory</span>
            <input value={form.lab_name || ''} onChange={set('lab_name')} className={field} />
          </label>
        </div>
        <label className="block">
          <span className={label}>Heavy metals (lab wording)</span>
          <input value={form.heavy_metals_result || ''} onChange={set('heavy_metals_result')} className={field} />
        </label>
        <label className="block">
          <span className={label}>Microbial screen (lab wording)</span>
          <input value={form.micro_result || ''} onChange={set('micro_result')} className={field} />
        </label>
        <label className="block">
          <span className={label}>Fatty-acid profile (JSON)</span>
          <input value={form.fatty_acid_profile || ''} onChange={set('fatty_acid_profile')} className={`${field} font-mono text-sm`} placeholder='{"linoleic":"56.2%","oleic":"23.8%"}' />
        </label>
        <label className="block">
          <span className={label}>Certificate PDF</span>
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mt-1 block w-full text-base" data-testid="input-lot-pdf" />
          {form.coa_pdf_url && !file && (
            <a href={form.coa_pdf_url} target="_blank" rel="noreferrer" className="mt-1 inline-block font-mono text-[11px] underline">
              Current PDF
            </a>
          )}
        </label>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-base">
            <input type="checkbox" checked={!!form.is_current} onChange={set('is_current')} className="h-5 w-5" /> Current lot for this product
          </label>
          <label className="flex items-center gap-2 text-base">
            <input type="checkbox" checked={!!form.published} onChange={set('published')} className="h-5 w-5" data-testid="check-lot-published" /> Published (visible to customers)
          </label>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={state === 'busy'} className="btn btn-solid disabled:opacity-60" data-testid="button-lot-save">
            {state === 'busy' ? 'Saving' : editing ? 'Save changes' : 'Save lot'}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setForm(EMPTY_LOT); setFile(null) }} className="btn">
              Cancel
            </button>
          )}
        </div>
        {msg && (
          <p className={`text-base ${state === 'error' ? 'text-red-700' : 'text-ink/70'}`} role="status" data-testid="text-lot-msg">
            {msg}
          </p>
        )}
      </form>

      <div className="lg:col-span-7">
        <h2 className="font-display text-2xl">All lots</h2>
        <div className="mt-4 overflow-x-auto border border-ink/10">
          <table className="w-full min-w-[640px]">
            <thead className="border-b border-ink/10 bg-sand/60">
              <tr>
                <th className={thead}>Lot</th>
                <th className={thead}>Product</th>
                <th className={thead}>Pressed</th>
                <th className={thead}>TQ</th>
                <th className={thead}>PDF</th>
                <th className={thead}>State</th>
                <th className={thead}></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10" data-testid="table-owner-lots">
              {rows.length === 0 && (
                <tr>
                  <td className={`${td} text-ink/60`} colSpan={7}>
                    No lots yet. The first one you save appears here.
                  </td>
                </tr>
              )}
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className={`${td} font-mono text-sm`}>
                    {r.lot_number}
                    {r.is_current && <span className="ml-2 font-mono text-[10px] uppercase text-brass">current</span>}
                  </td>
                  <td className={td}>{productName(r.product_id)}</td>
                  <td className={`${td} font-mono text-sm`}>{r.press_date || ''}</td>
                  <td className={`${td} font-mono text-sm`}>{r.thymoquinone_pct != null ? `${Number(r.thymoquinone_pct).toFixed(2)}%` : ''}</td>
                  <td className={td}>
                    {r.coa_pdf_url ? (
                      <a href={r.coa_pdf_url} target="_blank" rel="noreferrer" className="underline">
                        PDF
                      </a>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className={td}>
                    <button onClick={() => togglePublished(r)} className={`font-mono text-[11px] uppercase tracking-[0.12em] ${r.published ? 'text-brass' : 'text-muted'} underline`} data-testid={`button-publish-${r.lot_number}`}>
                      {r.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className={td}>
                    <button onClick={() => edit(r)} className="font-mono text-[11px] uppercase tracking-[0.12em] underline">
                      Edit
                    </button>
                    {r.published && (
                      <Link to={`/coa/${encodeURIComponent(r.lot_number)}`} className="ml-3 font-mono text-[11px] uppercase tracking-[0.12em] underline">
                        View
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ───────────────────────── Product status ─────────────────────────
function ProductStatus() {
  const { products: live } = useCatalog()
  const [rows, setRows] = useState([])
  const [msg, setMsg] = useState('')
  const load = useCallback(async () => {
    const { data, error } = await supabase.from('products').select('id,name,slug,status,collection_slug').order('sort_order')
    if (error) setMsg(error.message)
    setRows(data || [])
  }, [])
  useEffect(() => {
    load()
  }, [load])

  async function change(id, status) {
    const { error } = await supabase.from('products').update({ status }).eq('id', id)
    setMsg(error ? error.message : 'Status updated. The site picks it up on the next load.')
    await load()
  }

  return (
    <div>
      <h2 className="font-display text-2xl">Product status</h2>
      <p className="mt-2 max-w-2xl text-base text-ink/70">
        Concept products appear only on Coming soon. Prelaunch products have a page and a waitlist. Available products can be bought (Stripe keys required). Checkout refuses anything not Available, regardless of what the page shows.
      </p>
      {msg && <p className="mt-3 text-base text-ink/70" role="status">{msg}</p>}
      <div className="mt-4 overflow-x-auto border border-ink/10">
        <table className="w-full min-w-[560px]">
          <thead className="border-b border-ink/10 bg-sand/60">
            <tr>
              <th className={thead}>Product</th>
              <th className={thead}>Collection</th>
              <th className={thead}>Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10" data-testid="table-owner-products">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className={td}>{r.name}</td>
                <td className={`${td} font-mono text-sm text-muted`}>{r.collection_slug}</td>
                <td className={td}>
                  <select value={r.status} onChange={(e) => change(r.id, e.target.value)} className="border border-ink/25 bg-cream px-2 py-1 text-base" data-testid={`select-status-${r.slug}`}>
                    {Object.entries(STATUS).map(([k, v]) => (
                      <option key={k} value={k}>
                        {k} · {v.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 font-mono text-[11px] text-muted">{live.length} products loaded on the public site right now.</p>
    </div>
  )
}

// ───────────────────────── Waitlist ─────────────────────────
function csv(rows, cols) {
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  return [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n')
}
function download(name, text) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv' }))
  a.download = name
  a.click()
  URL.revokeObjectURL(a.href)
}

function Waitlist() {
  const [rows, setRows] = useState([])
  const [msg, setMsg] = useState('')
  useEffect(() => {
    supabase
      .from('waitlist')
      .select('email,sku,source,interests,confirmed,confirmed_at,unsubscribed_at,created_at')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setMsg(error.message)
        setRows(data || [])
      })
  }, [])
  const stats = useMemo(
    () => ({
      total: rows.length,
      confirmed: rows.filter((r) => r.confirmed && !r.unsubscribed_at).length,
      byInterest: rows.reduce((m, r) => ((r.interests || []).forEach((t) => (m[t] = (m[t] || 0) + 1)), m), {}),
    }),
    [rows]
  )
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl">Waitlist</h2>
          <p className="mt-2 text-base text-ink/70" data-testid="text-waitlist-stats">
            {stats.total} on the list · {stats.confirmed} confirmed · {Object.entries(stats.byInterest).map(([k, n]) => `${k}: ${n}`).join(' · ') || 'no interests ticked yet'}
          </p>
        </div>
        <button onClick={() => download(`waitlist-${new Date().toISOString().slice(0, 10)}.csv`, csv(rows.map((r) => ({ ...r, interests: (r.interests || []).join(' ') })), ['email', 'interests', 'sku', 'source', 'confirmed', 'confirmed_at', 'unsubscribed_at', 'created_at']))} className="btn" data-testid="button-waitlist-csv">
          Export CSV
        </button>
      </div>
      {msg && <p className="mt-3 text-base text-red-700">{msg}</p>}
      <div className="mt-4 overflow-x-auto border border-ink/10">
        <table className="w-full min-w-[640px]">
          <thead className="border-b border-ink/10 bg-sand/60">
            <tr>
              <th className={thead}>Email</th>
              <th className={thead}>Interests</th>
              <th className={thead}>First SKU</th>
              <th className={thead}>Source</th>
              <th className={thead}>Confirmed</th>
              <th className={thead}>Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10" data-testid="table-owner-waitlist">
            {rows.length === 0 && (
              <tr>
                <td className={`${td} text-ink/60`} colSpan={6}>
                  No signups yet.
                </td>
              </tr>
            )}
            {rows.map((r) => (
              <tr key={r.email}>
                <td className={td}>{r.email}</td>
                <td className={`${td} font-mono text-sm`}>{(r.interests || []).join(', ')}</td>
                <td className={`${td} font-mono text-sm`}>{r.sku || ''}</td>
                <td className={`${td} font-mono text-sm text-muted`}>{r.source}</td>
                <td className={`${td} font-mono text-sm`}>{r.unsubscribed_at ? 'unsubscribed' : r.confirmed ? 'yes' : 'pending confirmation'}</td>
                <td className={`${td} font-mono text-sm`}>{r.created_at?.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ───────────────────────── Practitioner inquiries ─────────────────────────
function Inquiries() {
  const [rows, setRows] = useState([])
  const [msg, setMsg] = useState('')
  const load = useCallback(async () => {
    const { data, error } = await supabase.from('practitioner_inquiries').select('*').order('created_at', { ascending: false })
    if (error) setMsg(error.message)
    setRows(data || [])
  }, [])
  useEffect(() => {
    load()
  }, [load])
  async function setStatus(id, status) {
    const { error } = await supabase.from('practitioner_inquiries').update({ status }).eq('id', id)
    if (error) setMsg(error.message)
    await load()
  }
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl">Practitioner inquiries</h2>
        <button onClick={() => download(`practitioners-${new Date().toISOString().slice(0, 10)}.csv`, csv(rows, ['name', 'email', 'practice', 'credential', 'note', 'status', 'created_at']))} className="btn">
          Export CSV
        </button>
      </div>
      {msg && <p className="mt-3 text-base text-red-700">{msg}</p>}
      <div className="mt-4 overflow-x-auto border border-ink/10">
        <table className="w-full min-w-[720px]">
          <thead className="border-b border-ink/10 bg-sand/60">
            <tr>
              <th className={thead}>Name</th>
              <th className={thead}>Email</th>
              <th className={thead}>Practice</th>
              <th className={thead}>Credential</th>
              <th className={thead}>Note</th>
              <th className={thead}>Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10" data-testid="table-owner-inquiries">
            {rows.length === 0 && (
              <tr>
                <td className={`${td} text-ink/60`} colSpan={6}>
                  No inquiries yet.
                </td>
              </tr>
            )}
            {rows.map((r) => (
              <tr key={r.id}>
                <td className={td}>{r.name}</td>
                <td className={td}>
                  <a href={`mailto:${r.email}`} className="underline">
                    {r.email}
                  </a>
                </td>
                <td className={td}>{r.practice}</td>
                <td className={td}>{r.credential}</td>
                <td className={`${td} max-w-xs text-sm text-ink/70`}>{r.note}</td>
                <td className={td}>
                  <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value)} className="border border-ink/25 bg-cream px-2 py-1 text-base">
                    {['new', 'verified', 'declined'].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
