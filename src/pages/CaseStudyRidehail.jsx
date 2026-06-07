import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useBreakpoint } from '../hooks/useBreakpoint'
import GridFooter from '../components/GridFooter'

// ─── Design tokens ────────────────────────────────────────────────────────────

const TEXT_DARK = '#111'
const TEXT_MID = '#555'
const TEXT_LABEL = '#666'
const ACCENT = '#3b5fe4'

// ─── Image groups (single source of truth for lightbox) ───────────────────────

const IMG = {
  hero: [
    { src: '/assets/ridehail/hero.png', alt: 'Ridehail app — ride in progress' },
  ],
  expectation: [
    { src: '/assets/ridehail/expectation-s1-1.png', alt: 'Investor sign in' },
    { src: '/assets/ridehail/expectation-s1-2.png', alt: 'Investor account selection' },
    { src: '/assets/ridehail/expectation-s1-3.png', alt: 'Investor home screen' },
    { src: '/assets/ridehail/expectation-s2-1.png', alt: 'Engineer sign in' },
    { src: '/assets/ridehail/expectation-s2-2.png', alt: 'Engineer home screen' },
    { src: '/assets/ridehail/expectation-s2-3.png', alt: 'Engineer view 3' },
  ],
  whereto: [
    { src: '/assets/ridehail/setdropoff-s1-1.png', alt: 'Where to — screen 1' },
    { src: '/assets/ridehail/setdropoff-s1-2.png', alt: 'Where to — screen 2' },
    { src: '/assets/ridehail/setdropoff-s1-3.png', alt: 'Where to — screen 3' },
    { src: '/assets/ridehail/setdropoff-s2-1.png', alt: 'Where to — screen 4' },
    { src: '/assets/ridehail/setdropoff-s2-2.png', alt: 'Where to — screen 5' },
    { src: '/assets/ridehail/setdropoff-s3-1.png', alt: 'Where to — screen 6' },
    { src: '/assets/ridehail/setdropoff-s3-2.png', alt: 'Where to — screen 7' },
    { src: '/assets/ridehail/setdropoff-s3-3.png', alt: 'Where to — screen 8' },
    { src: '/assets/ridehail/setdropoff-s4-1.png', alt: 'Where to — screen 9' },
    { src: '/assets/ridehail/setdropoff-s4-2.png', alt: 'Where to — screen 10' },
  ],
  pickup: [
    { src: '/assets/ridehail/pickup-s1-1.png', alt: 'Pickup — screen 1' },
    { src: '/assets/ridehail/pickup-s1-2.png', alt: 'Pickup — screen 2' },
    { src: '/assets/ridehail/pickup-s1-3.png', alt: 'Pickup — screen 3' },
    { src: '/assets/ridehail/pickup-s2-1.png', alt: 'Pickup — screen 4' },
    { src: '/assets/ridehail/pickup-s2-2.png', alt: 'Pickup — screen 5' },
    { src: '/assets/ridehail/pickup-s2-3.png', alt: 'Pickup — screen 6' },
  ],
  control: [
    { src: '/assets/ridehail/control-s1-1.png', alt: 'Control — screen 1' },
    { src: '/assets/ridehail/control-s1-2.png', alt: 'Control — screen 2' },
    { src: '/assets/ridehail/control-s2-1.png', alt: 'Control — screen 3' },
    { src: '/assets/ridehail/control-s2-2.png', alt: 'Control — screen 4' },
  ],
  outcome: [
    { src: '/assets/ridehail/outcome-1.png', alt: 'Outcome 1' },
    { src: '/assets/ridehail/outcome-2.png', alt: 'Outcome 2' },
    { src: '/assets/ridehail/outcome-3.png', alt: 'Outcome 3' },
  ],
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function CaseStudyNav({ isMobile }) {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        background: 'rgba(255,255,255,0.35)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        padding: isMobile ? '16px 20px' : '18px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={{ fontSize: '15px', fontWeight: 600, color: TEXT_DARK, lineHeight: 1.3 }}>
          Gabriel Pompilius
        </div>
        <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>Product Designer</div>
      </Link>

      <a
        href="mailto:gabepompilius@gmail.com"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#555',
          textDecoration: 'none',
        }}
      >
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
    <div style={{
      fontSize: '11px',
      fontWeight: 700,
      color: '#5d728e',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginBottom: '10px',
      marginTop: '32px',
      ...style,
    }}>
      {children}
    </div>
  )
}

function NumberedItem({ n, bold, children }) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
      <div
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          border: '1.5px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: 500,
          color: '#bbb',
          flexShrink: 0,
          marginTop: '1px',
        }}
      >
        {n}
      </div>
      <div style={{ fontSize: '15px', lineHeight: 1.65, color: bold ? TEXT_DARK : TEXT_MID, fontWeight: bold ? 600 : 400 }}>
        {children}
      </div>
    </div>
  )
}

function BodyText({ children }) {
  return (
    <p style={{ fontSize: '15px', color: TEXT_MID, lineHeight: 1.75, marginBottom: '14px' }}>
      {children}
    </p>
  )
}

function SectionTitle({ title, subtitle, isMobile, isTablet }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h2
        style={{
          fontSize: isMobile ? '36px' : isTablet ? '44px' : '52px',
          fontWeight: 900,
          color: TEXT_DARK,
          lineHeight: 1.1,
          marginBottom: '6px',
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: isMobile ? '18px' : '21px', fontWeight: 600, color: TEXT_MID }}>
        {subtitle}
      </p>
    </div>
  )
}

// ─── HoverImage — image with drop shadow + lift on hover ─────────────────────

function HoverImage({ src, alt, style, onClick, noShadow }) {
  const [hovered, setHovered] = useState(false)
  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...style,
        ...(noShadow ? {} : {
          borderRadius: '27px',
          boxShadow: hovered
            ? '0 12px 40px rgba(0,0,0,0.22)'
            : '0 4px 18px rgba(0,0,0,0.14)',
          transition: 'box-shadow 0.2s ease',
        }),
        cursor: 'pointer',
      }}
    />
  )
}

// ─── Phone — single image with optional lightbox click ───────────────────────

function Phone({ src, alt, width = 230, onClick, noShadow }) {
  if (!src) {
    return (
      <div
        style={{
          width: `${width}px`,
          aspectRatio: '9 / 19.5',
          borderRadius: '12px',
          background: '#ddd',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#bbb',
          fontSize: '11px',
          textAlign: 'center',
          padding: '12px',
        }}
      >
        {alt}
      </div>
    )
  }

  return (
    <HoverImage
      src={src}
      alt={alt}
      onClick={onClick}
      noShadow={noShadow}
      style={{ width: `${width}px`, flexShrink: 0, display: 'block' }}
    />
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex)
  const total = images.length

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setCurrent((c) => Math.max(0, c - 1))
      if (e.key === 'ArrowRight') setCurrent((c) => Math.min(total - 1, c + 1))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [total, onClose])

  // Touch swipe inside lightbox
  const [touchStart, setTouchStart] = useState(null)
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (diff > 50) setCurrent((c) => Math.min(total - 1, c + 1))
    if (diff < -50) setCurrent((c) => Math.max(0, c - 1))
    setTouchStart(null)
  }

  const ArrowBtn = ({ dir }) => {
    const atEdge = dir === 'left' ? current === 0 : current === total - 1
    return (
      <button
        onClick={() => goTo(dir === 'left' ? current - 1 : current + 1)}
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: 'none',
          background: atEdge ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.18)',
          cursor: atEdge ? 'default' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          opacity: atEdge ? 0.35 : 1,
          transition: 'opacity 0.2s ease, background 0.2s ease',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {dir === 'left'
            ? <path d="M15 18l-6-6 6-6" />
            : <path d="M9 18l6-6-6-6" />}
        </svg>
      </button>
    )
  }

  return (
    <div
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(237,237,237,0.55)',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          background: 'rgba(0,0,0,0.1)',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#333',
          fontSize: '16px',
          zIndex: 1001,
        }}
      >
        ✕
      </button>

      {/* Image + side arrows */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
      >
        {total > 1 && <ArrowBtn dir="left" />}

        <img
          src={images[current].src}
          alt={images[current].alt}
          style={{
            maxHeight: '78vh',
            maxWidth: '72vw',
            display: 'block',
            borderRadius: '27px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.2)',
          }}
        />

        {total > 1 && <ArrowBtn dir="right" />}
      </div>

      {/* Dot indicators */}
      {total > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ display: 'flex', gap: '7px' }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: i === current ? '#333' : '#bbb',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Phone carousel ──────────────────────────────────────────────────────────

function PhoneCarousel({ slides, isMobile, onImageClick, columns }) {
  const effectiveSlides = isMobile
    ? slides.flatMap((slide) => slide.map((phone) => [phone]))
    : slides

  const total = effectiveSlides.length
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const containerRef = useRef(null)

  // Clamp on slide count change
  useEffect(() => {
    setCurrent((c) => Math.min(c, total - 1))
  }, [total])

  const goTo = (next) => {
    const clamped = Math.max(0, Math.min(total - 1, next))
    if (clamped === current) return
    setVisible(false)
    setTimeout(() => { setCurrent(clamped); setVisible(true) }, 180)
  }

  // Horizontal wheel / two-finger trackpad
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let lastFired = 0
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      const now = Date.now()
      if (now - lastFired < 450) return
      if (e.deltaX > 20) { goTo(current + 1); lastFired = now }
      if (e.deltaX < -20) { goTo(current - 1); lastFired = now }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [total, current])

  // Touch swipe — lock axis to prevent page scroll during horizontal swipes
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let startX = null, startY = null, axis = null

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      axis = null
    }
    const onTouchMove = (e) => {
      if (startX === null) return
      const dx = Math.abs(e.touches[0].clientX - startX)
      const dy = Math.abs(e.touches[0].clientY - startY)
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

  const maxPerSlide = columns ?? Math.max(...effectiveSlides.map((s) => s.length))
  const allImages = effectiveSlides.flat()

  const ArrowBtn = ({ dir }) => {
    const atEdge = dir === 'left' ? current === 0 : current === total - 1
    return (
      <button
        onClick={() => setCurrent((c) => dir === 'left' ? Math.max(0, c - 1) : Math.min(total - 1, c + 1))}
        style={{
          position: 'absolute',
          [dir === 'left' ? 'left' : 'right']: isMobile ? '8px' : '-18px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          border: 'none',
          background: isMobile ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0.12)',
          cursor: atEdge ? 'default' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: atEdge ? 0.25 : 0.85,
          transition: 'opacity 0.2s ease',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isMobile ? '#fff' : '#222'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
        </svg>
      </button>
    )
  }

  const slide = effectiveSlides[current]
  const count = isMobile ? slide.length : maxPerSlide
  const imgWidth = count === 1 ? '60%' : count === 2 ? '44%' : '30%'

  return (
    <div style={{ width: '100%', userSelect: 'none' }}>
      {/* No overflow/clip-path — avoids WebKit dark corner artifact on border-radius'd images */}
      <div
        ref={containerRef}
        style={{ position: 'relative', cursor: total > 1 ? 'ew-resize' : 'default' }}
      >
        {total > 1 && <ArrowBtn dir="left" />}
        {total > 1 && <ArrowBtn dir="right" />}

        {/* Crossfade between slides — no clipping needed */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '12px',
            padding: isMobile ? '0 52px' : '0',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.18s ease',
          }}
        >
          {slide.map((phone, j) => {
            const globalIndex = effectiveSlides.slice(0, current).flat().length + j
            return phone.src ? (
              <HoverImage
                key={phone.src}
                src={phone.src}
                alt={phone.alt}
                style={{ width: imgWidth, height: 'auto', display: 'block' }}
                onClick={() => onImageClick && onImageClick(allImages, globalIndex)}
              />
            ) : (
              <div
                key={j}
                style={{
                  width: imgWidth,
                  aspectRatio: '9 / 19.5',
                  borderRadius: '8px',
                  background: '#ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#bbb',
                  fontSize: '10px',
                  textAlign: 'center',
                  padding: '8px',
                }}
              >
                {phone.alt}
              </div>
            )
          })}
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '7px', marginTop: '20px' }}>
        {effectiveSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: i === current ? '#777' : '#ccc',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Two-column section ───────────────────────────────────────────────────────

function CaseSection({ left, right, bg, isMobile, isTablet }) {
  const pad = isMobile ? '60px 20px' : isTablet ? '64px 36px' : '80px 60px'

  return (
    <div
      style={{
        background: bg,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '48px' : '60px',
        padding: pad,
        alignItems: isMobile ? 'flex-start' : 'center',
      }}
    >
      <div style={{ width: isMobile ? '100%' : isTablet ? '48%' : '44%', flexShrink: 0 }}>
        {left}
      </div>
      <div
        style={{
          flex: 1,
          width: isMobile ? '100%' : undefined,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isMobile ? '12px' : '16px',
          flexWrap: isMobile ? 'wrap' : 'nowrap',
        }}
      >
        {right}
      </div>
    </div>
  )
}

// ─── Phone size helpers ───────────────────────────────────────────────────────

function phoneSize(count, isMobile, isTablet) {
  if (count === 1) return isMobile ? 210 : isTablet ? 220 : 230
  if (count === 2) return isMobile ? 148 : isTablet ? 185 : 210
  return isMobile ? 115 : isTablet ? 150 : 195
}

// ─── Case Study Page ──────────────────────────────────────────────────────────

export default function CaseStudyRidehail() {
  const { isMobile, isTablet } = useBreakpoint()
  const bp = { isMobile, isTablet }
  const ps1 = phoneSize(1, isMobile, isTablet)
  const ps2 = phoneSize(2, isMobile, isTablet)
  const ps3 = phoneSize(3, isMobile, isTablet)

  const [lightbox, setLightbox] = useState(null)
  const openLightbox = (images, index) => setLightbox({ images, index })
  const closeLightbox = () => setLightbox(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: '#ededed', minHeight: '100vh' }}>
      <CaseStudyNav isMobile={isMobile} />

      {/* ── 1. Overview ── */}
      <CaseSection
        {...bp}
        bg="#ededed"
        left={
          <>
            <h1
              style={{
                fontSize: isMobile ? '40px' : isTablet ? '48px' : '56px',
                fontWeight: 900,
                color: TEXT_DARK,
                lineHeight: 1.05,
                marginBottom: '10px',
              }}
            >
              Purpose-Built Ridehail
            </h1>
            <p style={{ fontSize: isMobile ? '18px' : '21px', fontWeight: 600, color: '#333', marginBottom: '28px' }}>
              Designing autonomous ridehail for testing and demonstration
            </p>

            <Label>Objectives</Label>
            <NumberedItem n={1}>Eliminate the need for engineers to carry bulky laptops during test rides</NumberedItem>
            <NumberedItem n={2}>Enable investors to request rides during site visits</NumberedItem>

            <Label>Outcome</Label>
            <NumberedItem n={1} bold>Provided engineers with a handheld dispatch and logging tool for daily test rides</NumberedItem>
            <NumberedItem n={2} bold>Powered over 7,000 demo rides</NumberedItem>
            <NumberedItem n={3} bold>Helped raise $100M+ in Series E funding by unlocking the ability for anyone to request rides without staff intervention during demos</NumberedItem>

            <Label>My Contribution</Label>
            <BodyText>As the sole designer, and without a dedicated PM, I advocated for and owned the end-to-end experience, balancing engineering validation needs with investor-facing product goals.</BodyText>
          </>
        }
        right={
          <img
            src={IMG.hero[0].src}
            alt="Ridehail app — ride in progress"
            style={{ width: `${ps1}px`, flexShrink: 0, display: 'block' }}
          />
        }
      />

      {/* ── 2. Expectation Setting ── */}
      <CaseSection
        {...bp}
        bg="#ffffff"
        left={
          <>
            <SectionTitle title="Expectation setting" subtitle="Two audiences" {...bp} />

            <Label>Background</Label>
            <BodyText>Before jumping in, I needed to know how each audience defined success.</BodyText>

            <Label>Users</Label>
            <NumberedItem n={1}>
              <span><strong>Investors and strategic partners</strong> needed to know how the service works.</span>
            </NumberedItem>
            <NumberedItem n={2}>
              <span><strong>Autonomy, safety, and mapping engineers</strong> needed to validate that the tech worked as intended.</span>
            </NumberedItem>

            <Label>Needs</Label>
            <NumberedItem n={1}>
              <span><strong>Investors</strong> needed a way to request rides and evaluate the service in real-world conditions.</span>
            </NumberedItem>
            <NumberedItem n={2}>
              <span><strong>Engineers</strong> needed fast, reliable feedback that core systems functioned correctly.</span>
            </NumberedItem>

          </>
        }
        right={
          <PhoneCarousel
            isMobile={isMobile}
            slides={[
              [
                { src: IMG.expectation[0].src, alt: IMG.expectation[0].alt },
                { src: IMG.expectation[1].src, alt: IMG.expectation[1].alt },
                { src: IMG.expectation[2].src, alt: IMG.expectation[2].alt },
              ],
              [
                { src: IMG.expectation[3].src, alt: IMG.expectation[3].alt },
                { src: IMG.expectation[4].src, alt: IMG.expectation[4].alt },
                { src: IMG.expectation[5].src, alt: IMG.expectation[5].alt },
              ],
            ]}
            onImageClick={openLightbox}
          />
        }
      />

      {/* ── 3. Where to? ── */}
      <CaseSection
        {...bp}
        bg="#ededed"
        left={
          <>
            <SectionTitle title="Where to?" subtitle="Navigating limitations" {...bp} />

            <Label>Constraint</Label>
            <BodyText>
              Because May Mobility operated within tightly bounded service areas, the ride request
              experience needed to adapt to how different audiences actually used the product.
            </BodyText>

            <Label>Use cases</Label>
            <NumberedItem n={1}>
              <span><strong>Investors</strong> evaluated product viability during guided site visits, using the app to trial the service.</span>
            </NumberedItem>
            <NumberedItem n={2}>
              <span><strong>Engineers</strong> validated operational coverage and confirmed accuracy within the supported ODD during testing.</span>
            </NumberedItem>

            <Label>Design response</Label>
            <NumberedItem n={1}>
              <span><strong>For investors</strong>, the experience emphasized a realistic, confidence-building ride flow that surfaced constraints only when relevant.</span>
            </NumberedItem>
            <NumberedItem n={2}>
              <span><strong>For engineers</strong>, the UI provided precise and persistent boundary visibility to support accurate, efficient validation in the field.</span>
            </NumberedItem>
          </>
        }
        right={
          <PhoneCarousel
            isMobile={isMobile}
            slides={[
              [
                { src: IMG.whereto[0].src, alt: IMG.whereto[0].alt },
                { src: IMG.whereto[1].src, alt: IMG.whereto[1].alt },
                { src: IMG.whereto[2].src, alt: IMG.whereto[2].alt },
              ],
              [
                { src: IMG.whereto[3].src, alt: IMG.whereto[3].alt },
                { src: IMG.whereto[4].src, alt: IMG.whereto[4].alt },
              ],
              [
                { src: IMG.whereto[5].src, alt: IMG.whereto[5].alt },
                { src: IMG.whereto[6].src, alt: IMG.whereto[6].alt },
                { src: IMG.whereto[7].src, alt: IMG.whereto[7].alt },
              ],
              [
                { src: IMG.whereto[8].src, alt: IMG.whereto[8].alt },
                { src: IMG.whereto[9].src, alt: IMG.whereto[9].alt },
              ],
            ]}
            onImageClick={openLightbox}
          />
        }
      />

      {/* ── 4. Instantly introduced ── */}
      <CaseSection
        {...bp}
        bg="#ffffff"
        left={
          <>
            <SectionTitle title="Instantly introduced" subtitle="Reducing pickup confusion" {...bp} />

            <Label>Opportunity</Label>
            <BodyText>
              Pickup is often where transportation experiences break down. Confirming identity
              by telling your name to a stranger or scanning license plates creates friction.
              Publicly displaying rider information can feel uncomfortable.
            </BodyText>

            <Label>Approach</Label>
            <BodyText>
              We gave each vehicle a distinct, human-readable name printed directly on the
              doors. Riders could simply recognize the vehicle they were already expecting.
            </BodyText>

            <Label>Outcome</Label>
            <BodyText>
              Verification steps disappeared, pickup uncertainty dropped, and rider privacy was preserved.
            </BodyText>

            <p style={{ fontSize: '17px', fontWeight: 700, color: ACCENT, lineHeight: 1.4, marginTop: '8px' }}>
              Recognition replaced verification.
            </p>
          </>
        }
        right={
          <PhoneCarousel
            isMobile={isMobile}
            slides={[
              [
                { src: IMG.pickup[0].src, alt: IMG.pickup[0].alt },
                { src: IMG.pickup[1].src, alt: IMG.pickup[1].alt },
                { src: IMG.pickup[2].src, alt: IMG.pickup[2].alt },
              ],
              [
                { src: IMG.pickup[3].src, alt: IMG.pickup[3].alt },
                { src: IMG.pickup[4].src, alt: IMG.pickup[4].alt },
                { src: IMG.pickup[5].src, alt: IMG.pickup[5].alt },
              ],
            ]}
            onImageClick={openLightbox}
          />
        }
      />

      {/* ── 5. Control ── */}
      <CaseSection
        {...bp}
        bg="#ededed"
        left={
          <>
            <SectionTitle title="Control" subtitle="More than trust" {...bp} />

            <Label>Insight</Label>
            <BodyText>
              In autonomous vehicle design, the conversation often centers on trust. But trust
              forms only through repeated, reliable experiences.
            </BodyText>
            <BodyText>
              What enables repeated use is predictability. Riders need to feel they have agency
              over outcomes, even in a car that drives itself.
            </BodyText>

            <p style={{ fontSize: '16px', fontWeight: 700, color: ACCENT, lineHeight: 1.55, margin: '18px 0' }}>
              The need to feel in control held true for both investors evaluating the product
              and engineers validating the system.
            </p>

            <Label>Design response</Label>
            <BodyText>
              The interface selectively returned control to riders at key decision points,
              creating a more reciprocal interaction between rider and service.
            </BodyText>

            <Label>Outcome</Label>
            <BodyText>
              Rather than feeling managed by the system, riders experienced the service as
              something they could meaningfully engage with and direct.
            </BodyText>
          </>
        }
        right={
          <PhoneCarousel
            isMobile={isMobile}
            columns={3}
            slides={[
              [
                { src: IMG.control[0].src, alt: IMG.control[0].alt },
                { src: IMG.control[1].src, alt: IMG.control[1].alt },
              ],
              [
                { src: IMG.control[2].src, alt: IMG.control[2].alt },
                { src: IMG.control[3].src, alt: IMG.control[3].alt },
              ],
            ]}
            onImageClick={openLightbox}
          />
        }
      />

      {/* ── 6. Outcome ── */}
      <div
        style={{
          background: '#ffffff',
          padding: isMobile ? '60px 20px' : isTablet ? '64px 36px' : '80px 60px',
        }}
      >
        {/* Title spans full width */}
        <SectionTitle title="Outcome" subtitle="What it took to get there" {...bp} />

        {/* On mobile: flat column so margin collapsing is consistent throughout.
            On desktop: two-column flex row. */}
        {isMobile ? (
          <div>
            <Label style={{ marginTop: 0 }}>Engineers</Label>
            <BodyText>
              For engineers using the app, progress was gradual. Replacing their dependency on
              laptops seemed like an obvious first move, but the app didn't immediately become a
              seamless fix. There were too many taps to set a drop-off location, not enough
              flexibility for different test configurations, and a lot more legacy tooling they had
              access to from their laptops. Getting the app to a place where it was genuinely
              valuable for them meant paying close attention to how it was actually being used, and
              not being used, and refining from there.
            </BodyText>
            <Label>Demo guests</Label>
            <BodyText>
              The investor-facing side was harder. I never had direct access to the people using it.
              Feedback came filtered through executive leadership as impressions from demos, things
              that felt off, moments that landed. I had to ask a lot of questions, read between the
              lines, and make confident calls about an audience I never got to talk to directly.
            </BodyText>
            <Label>Reflection</Label>
            <BodyText>
              Nobody asked for two versions of this app. The engineer building it was on board with
              the idea, but wasn't sure of the best way to maintain the separation. I had enough
              signal from the field to know a single experience wouldn't hold up for both audiences,
              so I pushed for it anyway. With no PM and minimal direction from above, most of the
              judgment calls were mine to make. I made them, and the product held up.
            </BodyText>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '80px' }}>
            {/* Left — per-audience outcomes */}
            <div style={{ flex: 1 }}>
              <Label style={{ marginTop: 0 }}>Engineers</Label>
              <BodyText>
                For engineers using the app, progress was gradual. Replacing their dependency on
                laptops seemed like an obvious first move, but the app didn't immediately become a
                seamless fix. There were too many taps to set a drop-off location, not enough
                flexibility for different test configurations, and a lot more legacy tooling they had
                access to from their laptops. Getting the app to a place where it was genuinely
                valuable for them meant paying close attention to how it was actually being used, and
                not being used, and refining from there.
              </BodyText>
              <Label>Demo guests</Label>
              <BodyText>
                The investor-facing side was harder. I never had direct access to the people using it.
                Feedback came filtered through executive leadership as impressions from demos, things
                that felt off, moments that landed. I had to ask a lot of questions, read between the
                lines, and make confident calls about an audience I never got to talk to directly.
              </BodyText>
            </div>
            {/* Right — personal reflection */}
            <div style={{ flex: 1 }}>
              <Label style={{ marginTop: 0 }}>Reflection</Label>
              <BodyText>
                Nobody asked for two versions of this app. The engineer building it was on board with
                the idea, but wasn't sure of the best way to maintain the separation. I had enough
                signal from the field to know a single experience wouldn't hold up for both audiences,
                so I pushed for it anyway. With no PM and minimal direction from above, most of the
                judgment calls were mine to make. I made them, and the product held up.
              </BodyText>
            </div>
          </div>
        )}
      </div>

      {/* ── Next case study footer ── */}
      <GridFooter bg="#ffffff" mode="light">
        <div style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#aaa',
          marginBottom: '16px',
        }}>
          Next case study
        </div>
        <Link
          to="/work/incar"
          onClick={() => window.scrollTo(0, 0)}
          style={{ textDecoration: 'none' }}
        >
          <div style={{
            fontSize: isMobile ? '40px' : '72px',
            fontWeight: 800,
            color: TEXT_DARK,
            lineHeight: 1.05,
            textAlign: 'center',
            marginBottom: '32px',
            transition: 'opacity 0.2s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            The Interior Problem
          </div>
        </Link>
        <Link
          to="/work/incar"
          onClick={() => window.scrollTo(0, 0)}
          style={{ textDecoration: 'none' }}
        >
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            border: '1.5px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#888',
            transition: 'border-color 0.2s ease, color 0.2s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#999'; e.currentTarget.style.color = '#444' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#ccc'; e.currentTarget.style.color = '#888' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </GridFooter>

      {/* ── Lightbox ── */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.index}
          onClose={closeLightbox}
        />
      )}
    </div>
  )
}
