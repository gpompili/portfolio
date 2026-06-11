import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useBreakpoint } from '../hooks/useBreakpoint'
import GridFooter from '../components/GridFooter'

// ─── Design tokens ────────────────────────────────────────────────────────────

const TEXT_DARK = '#111'
const TEXT_MID = '#555'
const ACCENT = '#3b5fe4'

// ─── Images ───────────────────────────────────────────────────────────────────

const IMG = {
  hero: '/assets/fleet/intro_s1-1.png',
  monitoring1: [
    '/assets/fleet/monitoring-s1-1.png',
    '/assets/fleet/monitoring-s1-2.png',
  ],
  monitoring2: [
    '/assets/fleet/monitoring-s2-1.png',
    '/assets/fleet/monitoring-s2-2.png',
  ],
  monitoring3: [
    '/assets/fleet/monitoring-s3-1.png',
    '/assets/fleet/monitoring-s3-2.png',
    '/assets/fleet/monitoring-s3-3.png',
    '/assets/fleet/monitoring-s3-4.png',
  ],
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function CaseStudyNav({ isMobile }) {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: 'rgba(255,255,255,0.35)',
      backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
      padding: isMobile ? '16px 20px' : '18px 40px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <Link to="/" onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none' }}>
        <div style={{ fontSize: '15px', fontWeight: 600, color: TEXT_DARK, lineHeight: 1.3 }}>Gabriel Pompilius</div>
        <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>Product Designer</div>
      </Link>
      <a href="mailto:gabepompilius@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500, color: '#555', textDecoration: 'none' }}>
        Contact
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </a>
    </nav>
  )
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function Label({ children, style }) {
  return (
    <div style={{ fontSize: '11px', fontWeight: 700, color: '#5d728e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px', marginTop: '32px', ...style }}>
      {children}
    </div>
  )
}

function BodyText({ children }) {
  return <p style={{ fontSize: '15px', color: TEXT_MID, lineHeight: 1.75, marginBottom: '14px' }}>{children}</p>
}

function NumberedItem({ n, bold, children }) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
      <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1.5px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 500, color: '#bbb', flexShrink: 0, marginTop: '1px' }}>
        {n}
      </div>
      <div style={{ fontSize: '15px', lineHeight: 1.65, color: bold ? TEXT_DARK : TEXT_MID, fontWeight: bold ? 600 : 400 }}>
        {children}
      </div>
    </div>
  )
}

function SectionTitle({ title, subtitle, isMobile }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h2 style={{ fontSize: isMobile ? '36px' : '52px', fontWeight: 900, color: TEXT_DARK, lineHeight: 1.1, marginBottom: '6px' }}>{title}</h2>
      <p style={{ fontSize: isMobile ? '18px' : '21px', fontWeight: 600, color: TEXT_MID }}>{subtitle}</p>
    </div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ images, startIndex, onClose, isMobile }) {
  const [current, setCurrent] = useState(startIndex)
  const total = images.length
  const overlayRef = useRef(null)

  // Block touchmove on the overlay with a non-passive listener so iOS can't
  // scroll the page underneath. React synthetic events are passive by default
  // and e.preventDefault() is silently ignored — this is the correct fix.
  useEffect(() => {
    const el = overlayRef.current
    if (!el) return
    const block = (e) => e.preventDefault()
    el.addEventListener('touchmove', block, { passive: false })
    return () => el.removeEventListener('touchmove', block)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setCurrent(c => Math.max(0, c - 1))
      if (e.key === 'ArrowRight') setCurrent(c => Math.min(total - 1, c + 1))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [total, onClose])

  const [touchStart, setTouchStart] = useState(null)

  const arrowBtn = (dir, disabled) => (
    <button
      onClick={() => setCurrent(c => dir === 'left' ? Math.max(0, c - 1) : Math.min(total - 1, c + 1))}
      style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', flexShrink: 0,
        background: disabled ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.18)',
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: disabled ? 0.35 : 1 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  )

  return createPortal(
    <div
      ref={overlayRef}
      onClick={onClose}
      onTouchStart={e => setTouchStart(e.touches[0].clientX)}
      onTouchEnd={e => {
        if (touchStart === null) return
        const diff = touchStart - e.changedTouches[0].clientX
        if (diff > 50) setCurrent(c => Math.min(total - 1, c + 1))
        if (diff < -50) setCurrent(c => Math.max(0, c - 1))
        setTouchStart(null)
      }}
      onWheel={e => e.preventDefault()}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000, overflow: 'hidden',
        background: 'rgba(237,237,237,0.96)',
        backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
      <button onClick={onClose} style={{ position: 'fixed', top: '20px', right: '24px', background: 'rgba(0,0,0,0.1)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '16px', zIndex: 1001 }}>✕</button>

      {isMobile ? (
        /* ── Mobile: image fills width, arrows+dots sit below ── */
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', padding: '0 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <img src={images[current]} alt={`Screen ${current + 1}`}
            style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', display: 'block', borderRadius: '12px', boxShadow: '0 16px 48px rgba(0,0,0,0.18)' }} />
          {total > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {arrowBtn('left', current === 0)}
              <div style={{ display: 'flex', gap: '7px' }}>
                {images.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} style={{ width: '7px', height: '7px', borderRadius: '50%', background: i === current ? '#333' : '#bbb', border: 'none', padding: 0, cursor: 'pointer', transition: 'background 0.2s' }} />
                ))}
              </div>
              {arrowBtn('right', current === total - 1)}
            </div>
          )}
        </div>
      ) : (
        /* ── Desktop: arrows flank image, dots below ── */
        <>
          <div onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '90vw' }}>
            {total > 1 && arrowBtn('left', current === 0)}
            <img src={images[current]} alt={`Screen ${current + 1}`} style={{ maxHeight: '80vh', maxWidth: '78vw', display: 'block', borderRadius: '12px', boxShadow: '0 32px 80px rgba(0,0,0,0.2)' }} />
            {total > 1 && arrowBtn('right', current === total - 1)}
          </div>
          {total > 1 && (
            <div onClick={e => e.stopPropagation()} style={{ display: 'flex', gap: '7px', marginTop: '20px' }}>
              {images.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{ width: '7px', height: '7px', borderRadius: '50%', background: i === current ? '#333' : '#bbb', border: 'none', padding: 0, cursor: 'pointer', transition: 'background 0.2s' }} />
              ))}
            </div>
          )}
        </>
      )}
    </div>,
    document.body
  )
}

// ─── Landscape image carousel (for dashboard/tablet screens) ─────────────────

function ScreenCarousel({ images, isMobile, onImageClick }) {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const containerRef = useRef(null)
  const total = images.length

  const goTo = (next) => {
    const clamped = Math.max(0, Math.min(total - 1, next))
    if (clamped === current) return
    setVisible(false)
    setTimeout(() => { setCurrent(clamped); setVisible(true) }, 180)
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let startX = null, startY = null, axis = null

    const onTouchStart = (e) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; axis = null }
    const onTouchMove = (e) => {
      if (startX === null) return
      const dx = Math.abs(e.touches[0].clientX - startX), dy = Math.abs(e.touches[0].clientY - startY)
      if (axis === null && (dx > 8 || dy > 8)) axis = dx > dy ? 'h' : 'v'
      if (axis === 'h') e.preventDefault()
    }
    const onTouchEnd = (e) => {
      if (axis !== 'h') { startX = null; return }
      const diff = startX - e.changedTouches[0].clientX
      if (diff > 50) goTo(current + 1)
      if (diff < -50) goTo(current - 1)
      startX = null; axis = null
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [total, current])

  const carouselArrowBtn = (dir) => {
    const atEdge = dir === 'left' ? current === 0 : current === total - 1
    return (
      <button key={dir} onClick={() => goTo(dir === 'left' ? current - 1 : current + 1)}
        style={{
          width: '34px', height: '34px', borderRadius: '50%', border: 'none', flexShrink: 0,
          background: 'rgba(0,0,0,0.10)',
          cursor: atEdge ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: atEdge ? 0.25 : 0.8, transition: 'opacity 0.2s',
        }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
        </svg>
      </button>
    )
  }

  const dots = total > 1 && (
    <div style={{ display: 'flex', gap: '7px' }}>
      {images.map((_, i) => (
        <button key={i} onClick={() => goTo(i)} style={{ width: '7px', height: '7px', borderRadius: '50%', background: i === current ? '#777' : '#ccc', border: 'none', padding: 0, cursor: 'pointer', transition: 'background 0.2s' }} />
      ))}
    </div>
  )

  const imgEl = (
    <img
      src={images[current]}
      alt={`Screen ${current + 1}`}
      onClick={() => onImageClick && onImageClick(current)}
      style={{
        width: '100%', display: 'block', borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.18s ease',
        cursor: onImageClick ? 'zoom-in' : 'default',
      }}
    />
  )

  if (isMobile) {
    return (
      <div style={{ width: '100%', userSelect: 'none' }}>
        <div ref={containerRef}>{imgEl}</div>
        {total > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginTop: '16px' }}>
            {carouselArrowBtn('left')}
            {dots}
            {carouselArrowBtn('right')}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ width: '100%', userSelect: 'none' }}>
      {/* Padding creates space beside the image for arrows to sit in */}
      <div style={{ position: 'relative', padding: total > 1 ? '0 42px' : '0' }}>
        {total > 1 && ['left', 'right'].map(dir => {
          const atEdge = dir === 'left' ? current === 0 : current === total - 1
          return (
            <button key={dir} onClick={() => goTo(dir === 'left' ? current - 1 : current + 1)}
              style={{
                position: 'absolute',
                [dir]: '4px',
                top: '50%', transform: 'translateY(-50%)',
                zIndex: 10, width: '34px', height: '34px', borderRadius: '50%', border: 'none',
                background: 'rgba(0,0,0,0.10)',
                cursor: atEdge ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: atEdge ? 0.25 : 0.8, transition: 'opacity 0.2s',
              }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
              </svg>
            </button>
          )
        })}
        <div ref={containerRef}>{imgEl}</div>
      </div>
      {total > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '7px', marginTop: '16px' }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: '7px', height: '7px', borderRadius: '50%', background: i === current ? '#777' : '#ccc', border: 'none', padding: 0, cursor: 'pointer', transition: 'background 0.2s' }} />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Two-column section ───────────────────────────────────────────────────────

function CaseSection({ left, right, bg, isMobile, isTablet, flip }) {
  const pad = isMobile ? '60px 20px' : isTablet ? '64px 36px' : '80px 60px'
  const row = flip && !isMobile
  return (
    <div style={{ background: bg, display: 'flex', flexDirection: isMobile ? 'column' : (flip ? 'row-reverse' : 'row'), gap: isMobile ? '48px' : '60px', padding: pad, alignItems: isMobile ? 'flex-start' : 'center' }}>
      <div style={{ width: isMobile ? '100%' : isTablet ? '48%' : '44%', flexShrink: 0 }}>{left}</div>
      <div style={{ flex: 1, width: isMobile ? '100%' : undefined }}>{right}</div>
    </div>
  )
}

// ─── Case Study Page ──────────────────────────────────────────────────────────

export default function CaseStudyFleet() {
  const { isMobile, isTablet } = useBreakpoint()
  const bp = { isMobile, isTablet }

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const [lightbox, setLightbox] = useState(null)
  const openLightbox = (images, index) => setLightbox({ images, index })
  const closeLightbox = () => setLightbox(null)

  return (
    <div style={{ background: '#ededed', minHeight: '100vh' }}>
      <CaseStudyNav isMobile={isMobile} />

      {/* ── 1. Overview ── */}
      <CaseSection
        {...bp} bg="#ededed"
        left={
          <>
            <h1 style={{ fontSize: isMobile ? '40px' : '56px', fontWeight: 900, color: TEXT_DARK, lineHeight: 1.05, marginBottom: '10px' }}>
              Event-Driven Fleet Awareness
            </h1>
            <p style={{ fontSize: isMobile ? '18px' : '21px', fontWeight: 600, color: TEXT_MID, marginBottom: '28px' }}>
              Turning telemetry into operator actions
            </p>
            <Label style={{ marginTop: 0 }}>Objectives</Label>
            <NumberedItem n={1}>Give remote operators the awareness needed to monitor a fleet of autonomous vehicles simultaneously</NumberedItem>
            <NumberedItem n={2}>Surface time-sensitive events requiring human intervention without overwhelming operators with noise</NumberedItem>
            <NumberedItem n={3}>Push for prioritizing fully-autonomous operational capabilities in the face of competing needs</NumberedItem>
            <Label>Outcome</Label>
            <NumberedItem n={1} bold>An event notification system that distributed real-time fleet signals across site staff</NumberedItem>
            <NumberedItem n={2} bold>A flexible UI that balances many needs, informed by user types and the tasks most important to them</NumberedItem>
            <Label>My contribution</Label>
            <BodyText>With no dedicated PM on the product, I embedded with operations, built a working relationship with the engineering manager, and drove product-level thinking on what the system needed to do to unlock fully-autonomous operational capabilities.</BodyText>
          </>
        }
        right={
          <img src={IMG.hero} alt="Fleet monitoring overview" style={{ width: '100%', display: 'block', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }} />
        }
      />

      {/* ── 2. Under the hood ── */}
      <CaseSection
        {...bp} bg="#ffffff"
        left={
          <>
            <SectionTitle title="Under the hood" subtitle="What driverless requires at scale" isMobile={isMobile} />
            <Label style={{ marginTop: 0 }}>Context</Label>
            <BodyText>Every AV company operating at real-world scale relies on remote human oversight. It's rarely talked about, because it complicates the "fully autonomous" story.</BodyText>
            <Label>The tension</Label>
            <BodyText>Vehicles marketed as driverless still require operators watching from offsite who are ready to intervene if something goes wrong. It can be an uncomfortable reality for autonomy purists. As a result, this piece of the story is controversial, infrequently talked about, and sometimes under-invested in.</BodyText>
            <Label>The gap</Label>
            <BodyText>At May Mobility, the fleet monitoring product existed. But it had never received the design attention needed to support operators at true driverless scale. There was no PM. Feature development was reactive. That's the reality I was presented with and the challenge I got excited about confronting.</BodyText>
          </>
        }
        right={<ScreenCarousel images={IMG.monitoring1} isMobile={isMobile} onImageClick={i => openLightbox(IMG.monitoring1, i)} />}
      />

      {/* ── 3. Steering without a wheel ── */}
      <CaseSection
        {...bp} bg="#ededed"
        left={
          <>
            <SectionTitle title="Steering without a wheel" subtitle="Influence without authority" isMobile={isMobile} />
            <Label style={{ marginTop: 0 }}>The situation</Label>
            <BodyText>Feature requests came to the engineering manager directly — filtered through operational feedback, rarely tied to a long-term product vision. I wasn't given acceptance criteria. I wasn't asked to execute on a spec.</BodyText>
            <Label>My approach</Label>
            <NumberedItem n={1}><span><strong>Embedded with operations</strong> — learned how operators actually used the tool and where friction accumulated.</span></NumberedItem>
            <NumberedItem n={2}><span><strong>Built trust with the EM</strong> — framed design input as velocity-enabling, not vision-imposing.</span></NumberedItem>
            <NumberedItem n={3}><span><strong>Steered prioritization</strong> — redirected feedback loops toward capabilities that would matter at fully-driverless scale, not just current demo workflows.</span></NumberedItem>
          </>
        }
        right={<ScreenCarousel images={IMG.monitoring2} isMobile={isMobile} onImageClick={i => openLightbox(IMG.monitoring2, i)} />}
      />

      {/* ── 4. Dynamic task assignment ── */}
      <CaseSection
        {...bp} bg="#ffffff"
        left={
          <>
            <SectionTitle title="Dynamic task assignment" subtitle="A method for real-time allocation" isMobile={isMobile} />
            <Label style={{ marginTop: 0 }}>The design challenge</Label>
            <BodyText>The problem has a name. Dynamic task assignment is the method of allocating work to available resources in real time, rather than assigning it statically in advance.</BodyText>
            <BodyText>For fleet monitoring, that meant: when something happens on a vehicle, the right operator needs to know about it — immediately, and without ambiguity about who should act.</BodyText>
            <Label>Design response</Label>
            <BodyText>I designed an event notification system that could detect fleet-level signals, classify them by urgency and type, and route them to operators based on availability and context — not just broadcast to everyone at once.</BodyText>
            <p style={{ fontSize: '16px', fontWeight: 700, color: ACCENT, lineHeight: 1.55, margin: '18px 0' }}>
              The goal wasn't more information. It was the right information at the right moment.
            </p>
          </>
        }
        right={<ScreenCarousel images={IMG.monitoring3} isMobile={isMobile} onImageClick={i => openLightbox(IMG.monitoring3, i)} />}
      />

      {/* ── 5. Outcome ── */}
      <div style={{ background: '#ededed', padding: isMobile ? '60px 20px' : isTablet ? '64px 36px' : '80px 60px' }}>
        <SectionTitle title="Outcome" subtitle="What it took to get there" isMobile={isMobile} />
        {isMobile ? (
          <div>
            <Label style={{ marginTop: 0 }}>Operations</Label>
            <BodyText>The operations team had workarounds for almost everything. Getting them to trust a new notification model meant proving it reduced interruptions rather than adding to them. That took iteration, observation, and a willingness to pull features back when they weren't landing.</BodyText>
            <Label>Engineering</Label>
            <BodyText>The engineering manager's priority was shipping. The only way to get design thinking into the roadmap was to make it feel like a natural extension of the team's velocity — not a separate design process imposed from outside.</BodyText>
            <Label>Reflection</Label>
            <BodyText>Nobody handed me this problem. I identified it, framed it, found the people who cared, and built the system alongside them. What came out was a notification model that could scale beyond demos — one that gave operators the awareness they needed without requiring them to watch everything at once.</BodyText>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '80px' }}>
            <div style={{ flex: 1 }}>
              <Label style={{ marginTop: 0 }}>Operations</Label>
              <BodyText>The operations team had workarounds for almost everything. Getting them to trust a new notification model meant proving it reduced interruptions rather than adding to them. That took iteration, observation, and a willingness to pull features back when they weren't landing.</BodyText>
              <Label>Engineering</Label>
              <BodyText>The engineering manager's priority was shipping. The only way to get design thinking into the roadmap was to make it feel like a natural extension of the team's velocity — not a separate design process imposed from outside.</BodyText>
            </div>
            <div style={{ flex: 1 }}>
              <Label style={{ marginTop: 0 }}>Reflection</Label>
              <BodyText>Nobody handed me this problem. I identified it, framed it, found the people who cared, and built the system alongside them. What came out was a notification model that could scale beyond demos — one that gave operators the awareness they needed without requiring them to watch everything at once.</BodyText>
            </div>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && <Lightbox images={lightbox.images} startIndex={lightbox.index} onClose={closeLightbox} isMobile={isMobile} />}

      {/* ── Grid Footer ── */}
      <GridFooter bg="#ededed" mode="light">
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#aaa', marginBottom: '16px' }}>
          Next case study
        </div>
        <Link to="/work/remoteassist" onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none' }}>
          <div
            style={{ fontSize: isMobile ? '40px' : '72px', fontWeight: 800, color: TEXT_DARK, lineHeight: 1.05, textAlign: 'center', marginBottom: '32px', transition: 'opacity 0.2s ease' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            From Mars to the Street
          </div>
        </Link>
        <Link to="/work/remoteassist" onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none' }}>
          <div
            style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(0,0,0,0.07)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', border: '1px solid rgba(0,0,0,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', transition: 'background 0.2s ease, color 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.13)'; e.currentTarget.style.color = '#111' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.07)'; e.currentTarget.style.color = '#555' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </GridFooter>
    </div>
  )
}
