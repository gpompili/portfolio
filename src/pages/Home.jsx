import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useBreakpoint } from '../hooks/useBreakpoint'
import GridFooter from '../components/GridFooter'

// ─── Data ────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 'ridehail',
    title: 'Purpose-Built Ridehail',
    platform: 'Designing autonomous ridehail for testing and demonstration',
    description: '',
    outcomes: [
      'Helped raise $100M+ in Series E funding',
      'Powered 7,000+ demo rides',
      'Made daily test rides more efficient for field engineers',
    ],
    color: '#D9D9D9',
    cover: '/assets/ridehail/RideMayCover.svg',
    href: '/work/ridehail',
  },
  {
    id: 'incar',
    title: 'The Interior Problem',
    platform: 'Examining the meaning of trust inside an autonomous vehicle',
    description: '',
    color: '#D9D9D9',
    cover: '/assets/incar/InCarUICover.svg',
    deviceVideo: {
      bezel: '/assets/incar/incarhero.png',
      bezelWidth: 1672,
      bezelHeight: 941,
      screen: { x: 625, y: 507, w: 422, h: 237 },
      cornerRadius: 0,
      poster: '/assets/incar/rider-immersive-clip/rider-immersive-clip-poster.jpg',
      mp4: '/assets/incar/rider-immersive.mp4',
    },
    href: '/work/incar',
  },
  {
    id: 'standbyoperator',
    title: 'Designed Restraint',
    platform: 'Using visual and auditory cues to maintain situational awareness',
    description: '',
    color: '#D1CFCF',
    cover: '/assets/standbyoperator/AVOCover.svg',
    href: '/work/standbyoperator',
  },
  {
    id: 'fleet',
    title: 'Event-Driven Fleet Awareness',
    platform: 'Turning telemetry into operator actions',
    outcomes: [
      'Converted data tables into real-time fleet signals, distributed across site staff for review',
      'Designed a flexible UI that balanced competing needs across different user types',
    ],
    color: '#242431',
    cover: '/assets/fleet/FleetCover.svg',
    href: '/work/fleet',
  },
  {
    id: 'remoteassist',
    title: 'From Mars to the Street',
    platform: 'Collaborating with a NASA engineer to simplify motion planning into a single operator gesture',
    description: '',
    color: '#151518',
    cover: '/assets/remoteassist/RemoteAssistCover.svg',
    href: '/work/remoteassist',
  },
]

const interests = [
  {
    icon: '/assets/main/hci.svg',
    bg: '#16a34a',
    title: 'Human-Computer Interaction',
    description:
      'I studied HCI in grad school. It provided a strong foundation in design research and theory.',
  },
  {
    icon: '/assets/main/linguistics.svg',
    bg: '#d97706',
    title: 'Linguistics',
    description:
      'I studied linguistics in college. It taught me about pattern analysis and field research.',
  },
  {
    icon: '/assets/main/art.svg',
    bg: '#9333ea',
    title: 'Visual art',
    description:
      "I've had an active art practice my entire life. It helped me cultivate an awareness of style and detail.",
  },
]

// ─── useInView ───────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav({ scrolled, activeSection, onNavClick, isMobile, isTablet }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isCompact = isMobile || isTablet

  const handleNavClick = (id) => {
    setMenuOpen(false)
    onNavClick(id)
  }

  if (isCompact) {
    return (
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: 'rgba(13,13,13,0.82)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          transition: 'background-color 0.25s ease',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
          }}
        >
          <button
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
          >
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>
              Gabriel Pompilius
            </div>
            <div style={{ fontSize: '11px', color: '#666', marginTop: '1px' }}>Product Designer</div>
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'flex-end',
            }}
            aria-label="Toggle menu"
          >
            <span style={{
              display: 'block',
              width: menuOpen ? '20px' : '22px',
              height: '2px',
              background: '#fff',
              borderRadius: '2px',
              transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
              transition: 'transform 0.2s ease, width 0.2s ease',
            }} />
            <span style={{
              display: 'block',
              width: '16px',
              height: '2px',
              background: '#fff',
              borderRadius: '2px',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 0.15s ease',
            }} />
            <span style={{
              display: 'block',
              width: menuOpen ? '20px' : '22px',
              height: '2px',
              background: '#fff',
              borderRadius: '2px',
              transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
              transition: 'transform 0.2s ease, width 0.2s ease',
            }} />
          </button>
        </div>

        {/* Dropdown menu */}
        <div
          style={{
            overflow: 'hidden',
            maxHeight: menuOpen ? '200px' : '0px',
            transition: 'max-height 0.28s ease',
          }}
        >
          <div style={{ padding: '4px 20px 16px' }}>
            {['Work', 'About', 'Contact'].map((label) => {
              const id = label.toLowerCase()
              const isActive = activeSection === id
              return (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    color: isActive ? '#fff' : '#777',
                    fontSize: '16px',
                    fontWeight: isActive ? 600 : 400,
                    padding: '10px 0',
                    cursor: 'pointer',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    transition: 'color 0.15s ease',
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    )
  }

  // Desktop nav
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '18px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: scrolled ? 'space-between' : 'flex-end',
        backgroundColor: scrolled ? 'rgba(13,13,13,0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'background-color 0.25s ease, backdrop-filter 0.25s ease',
      }}
    >
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
        >
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>
            Gabriel Pompilius
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>Product Designer</div>
        </button>
      )}

      <div style={{ display: 'flex', gap: '4px' }}>
        {['Work', 'About', 'Contact'].map((label) => {
          const id = label.toLowerCase()
          const isActive = activeSection === id
          return (
            <button
              key={id}
              onClick={() => onNavClick(id)}
              style={{
                background: isActive ? '#272727' : 'transparent',
                border: 'none',
                color: isActive ? '#fff' : '#777',
                fontSize: '14px',
                fontWeight: 500,
                padding: '7px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.15s ease, color 0.15s ease',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function VideoWithFade({ video }) {
  const refA = useRef(null)
  const refB = useRef(null)
  const rafRef = useRef(null)
  const stateRef = useRef({ active: 'a', fading: false })
  const FADE = 2.0

  useEffect(() => {
    const a = refA.current
    const b = refB.current
    if (!a || !b) return

    const ease = (p) => (1 - Math.cos(Math.PI * p)) / 2

    const getPair = () => stateRef.current.active === 'a'
      ? { cur: a, nxt: b }
      : { cur: b, nxt: a }

    const tick = () => {
      const { fading } = stateRef.current
      const { cur, nxt } = getPair()

      if (cur.duration) {
        const remaining = cur.duration - cur.currentTime

        if (!fading && remaining < FADE) {
          stateRef.current.fading = true
          nxt.currentTime = 0
          nxt.play().catch(() => {})
        }

        if (fading) {
          const progress = Math.max(0, Math.min(1, 1 - remaining / FADE))
          const eased = ease(progress)
          cur.style.opacity = 1 - eased
          nxt.style.opacity = eased

          if (remaining < 0.05) {
            cur.style.opacity = 0
            nxt.style.opacity = 1
            cur.pause()
            cur.currentTime = 0
            stateRef.current = {
              active: stateRef.current.active === 'a' ? 'b' : 'a',
              fading: false,
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    a.play().catch(() => {})
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const videoStyle = {
    position: 'absolute', top: 0, left: 0,
    width: '100%', height: '100%',
    objectFit: 'cover',
  }

  return (
    <>
      <video ref={refA} muted playsInline preload="auto" style={{ ...videoStyle, opacity: 1 }}>
        <source src={video.webm} type="video/webm" />
        <source src={video.mp4} type="video/mp4" />
      </video>
      <video ref={refB} muted playsInline preload="auto" style={{ ...videoStyle, opacity: 0 }}>
        <source src={video.webm} type="video/webm" />
        <source src={video.mp4} type="video/mp4" />
      </video>
    </>
  )
}

// Renders a video "inside" a device bezel image, positioning/scaling the
// <video> so it lines up with the bezel's screen area at any card size.
// The math mirrors CSS object-fit: cover so the video tracks the bezel
// image's crop exactly as the container is resized.
//
// Two bezel asset types are supported, picked via videoOnTop:
//  - transparent cutout (videoOnTop false/undefined): the bezel PNG has a
//    real alpha hole where its screen is, painted ON TOP of the video so
//    the cutout naturally clips it.
//  - flat rendered screen (videoOnTop true): the bezel image has an
//    opaque flat-black screen with no transparency, so the video paints
//    ON TOP of the bezel, sized exactly to the screen rect to cover it.
//
// cornerRadius (fraction of the rendered screen width, default 0.025)
// rounds the video's own corners to match the screen glass — belt-and-
// suspenders for the cutout case (the mask already rounds it) and
// necessary for the flat-screen/videoOnTop case (nothing else would).
function DeviceHeroVideo({ deviceVideo }) {
  const { bezel, bezelWidth, bezelHeight, screen, poster, mp4, videoOnTop, cornerRadius = 0.025 } = deviceVideo
  const containerRef = useRef(null)
  const [rect, setRect] = useState(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const cw = el.clientWidth
      const ch = el.clientHeight
      if (!cw || !ch) return
      const scale = Math.max(cw / bezelWidth, ch / bezelHeight)
      const renderedW = bezelWidth * scale
      const renderedH = bezelHeight * scale
      const offsetX = (cw - renderedW) / 2
      const offsetY = (ch - renderedH) / 2
      setRect({
        left: offsetX + screen.x * scale,
        top: offsetY + screen.y * scale,
        width: screen.w * scale,
        height: screen.h * scale,
      })
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [bezelWidth, bezelHeight, screen])

  const video = rect && (
    <video
      muted
      autoPlay
      loop
      playsInline
      preload="auto"
      poster={poster}
      src={mp4}
      style={{
        position: 'absolute',
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        borderRadius: `${rect.width * cornerRadius}px`,
        objectFit: 'cover',
      }}
    />
  )

  const bezelImg = (
    <img
      src={bezel}
      alt=""
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none',
      }}
    />
  )

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {videoOnTop ? (
        <>
          {bezelImg}
          {video}
        </>
      ) : (
        <>
          {video}
          {bezelImg}
        </>
      )}
    </div>
  )
}

function ProjectCard({ project, isMobile, isTablet, index = 0 }) {
  const [hovered, setHovered] = useState(false)
  const [cardRef, inView] = useInView(0.08)

  return (
    <div
      ref={cardRef}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
    <Link
      to={project.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        borderRadius: '16px',
        overflow: 'hidden',
        height: isMobile ? 'auto' : isTablet ? '420px' : '500px',
        textDecoration: 'none',
        cursor: 'pointer',
        background: project.color,
        marginBottom: '24px',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.09)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {/* Text panel */}
      <div
        style={{
          width: isMobile ? '100%' : isTablet ? '260px' : '285px',
          flexShrink: 0,
          background: '#f3f3f3',
          padding: isMobile ? '28px 24px' : isTablet ? '32px 24px' : '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: isMobile ? '170px' : undefined,
        }}
      >
        <div>
          <h3
            style={{
              fontSize: isMobile ? '22px' : '26px',
              fontWeight: 800,
              color: '#111',
              lineHeight: 1.2,
              marginBottom: '8px',
            }}
          >
            {project.title}
          </h3>
          <p style={{ fontSize: '15px', fontWeight: 400, color: '#888', marginBottom: '10px' }}>
            {project.platform}
          </p>
          {project.description ? (
            <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.65 }}>
              {project.description}
            </p>
          ) : null}

          {project.outcomes && (
            <div style={{ marginTop: '22px' }}>
              {project.outcomes.map((o, i) => (
                <p key={i} style={{ fontSize: '15px', fontWeight: 600, color: '#111', lineHeight: 1.35, margin: 0, marginBottom: i < project.outcomes.length - 1 ? '10px' : 0 }}>
                  {o}
                </p>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: '20px' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '12px',
              fontWeight: 500,
              color: '#777',
              border: '1px solid #d0d0d0',
              borderRadius: '9999px',
              padding: '5px 14px',
            }}
          >
            Case Study
          </span>
        </div>
      </div>

      {/* Color / image area */}
      <div
        style={{
          backgroundColor: project.color,
          backgroundImage: (project.video || project.deviceVideo) ? 'none' : (project.cover ? `url(${project.cover})` : 'none'),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          flex: isMobile ? undefined : 1,
          height: isMobile ? '200px' : '100%',
          width: isMobile ? '100%' : undefined,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {project.video && (
          <VideoWithFade video={project.video} />
        )}
        {project.deviceVideo && (
          <DeviceHeroVideo deviceVideo={project.deviceVideo} />
        )}
      </div>
    </Link>
    </div>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection({ isMobile, isTablet }) {
  return (
    <section
      id="about"
      style={{
        padding: isMobile ? '80px 20px' : isTablet ? '80px 32px' : '100px 40px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '40px' : isTablet ? '48px' : '80px',
        alignItems: 'flex-start',
      }}
    >
      {/* Photo */}
      <div
        style={{
          width: isMobile ? '100%' : isTablet ? '320px' : '420px',
          height: isMobile ? '320px' : isTablet ? '400px' : '520px',
          flexShrink: 0,
          borderRadius: '16px',
          overflow: 'hidden',
          background: '#1c1c1c',
        }}
      >
        <img
          src="/assets/main/IMG_7385.jpeg"
          alt="Gabriel Pompilius"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => { e.target.style.display = 'none' }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingTop: isMobile ? '0' : '8px' }}>
        <h2
          style={{
            fontSize: isMobile ? '40px' : isTablet ? '44px' : '52px',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '20px',
            lineHeight: 1.1,
          }}
        >
          About
        </h2>
        <p
          style={{
            fontSize: '15px',
            color: '#999',
            lineHeight: 1.75,
            marginBottom: '36px',
            maxWidth: '560px',
          }}
        >
          I'm a product designer experienced in creating interactive systems from the ground
          up. My background in HCI, linguistics, and visual art shapes how I approach
          designing interactions between people and technology.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {interests.map((item, i) => (
            <div key={i}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '16px', color: '#888', lineHeight: 1.65 }}>
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactLinkRow({ label, href, icon }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target={href.startsWith('http') || href.endsWith('.pdf') ? '_blank' : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderRadius: '10px',
        border: `1px solid ${hovered ? '#444' : '#242424'}`,
        color: hovered ? '#ccc' : '#777',
        textDecoration: 'none',
        fontSize: '15px',
        fontWeight: 500,
        transition: 'border-color 0.15s ease, color 0.15s ease',
        marginBottom: '8px',
      }}
    >
      {label}
      {icon}
    </a>
  )
}

function ContactSection({ isMobile, isTablet }) {
  return (
    <section
      id="contact"
      style={{
        padding: isMobile ? '80px 20px 100px' : isTablet ? '80px 32px 100px' : '100px 40px 120px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '56px' : isTablet ? '48px' : '80px',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ flex: 1, width: '100%' }}>
        <h2
          style={{
            fontSize: isMobile ? '40px' : isTablet ? '44px' : '52px',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '28px',
            lineHeight: 1.1,
          }}
        >
          Let's talk
        </h2>
        <p style={{ fontSize: '15px', color: '#999', lineHeight: 1.8, marginBottom: '16px' }}>
          I'm interested in full-time opportunities, freelance projects, and creative collaborations.
        </p>
        <p style={{ fontSize: '15px', color: '#999', lineHeight: 1.8, marginBottom: '16px' }}>
          As a designer, I'm focused on building useful systems that enhance your ability to accomplish what you need.
        </p>
        <p style={{ fontSize: '15px', color: '#999', lineHeight: 1.8 }}>
          I like to work with engineers and product teams collaboratively. My approach is to observe and understand team dynamics, identify constraints to work within, and facilitate thoughtful decision-making.
        </p>
      </div>

      <div style={{ flex: 1, width: '100%' }}>
        <h3
          style={{
            fontSize: isMobile ? '40px' : isTablet ? '44px' : '52px',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '20px',
            lineHeight: 1.1,
          }}
        >
          Reach out
        </h3>
        <ContactLinkRow
          label="Email"
          href="mailto:gabepompilius@gmail.com"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          }
        />
        <ContactLinkRow
          label="LinkedIn"
          href="https://www.linkedin.com/in/gpompilius/"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          }
        />
        <ContactLinkRow
          label="Résumé"
          href="/assets/Gabriel_Pompilius_Résumé_2026.pdf"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          }
        />
      </div>
    </section>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const { isMobile, isTablet } = useBreakpoint()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('work')
  const [heroVisible, setHeroVisible] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const scrollToSection = (id) => {
    if (id === 'work') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const heroH = heroRef.current?.offsetHeight ?? 400
      setScrolled(window.scrollY > heroH * 0.35)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the section that is most visible (largest intersectionRatio)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) setActiveSection(visible[0].target.id)
      },
      { threshold: [0.1, 0.25, 0.5], rootMargin: '-60px 0px -30% 0px' }
    )
    ;['work', 'about', 'contact'].forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    // Reset to 'work' when scrolled back near the top
    const handleScroll = () => {
      if (window.scrollY < 100) setActiveSection('work')
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div style={{ background: '#0d0d0d', minHeight: '100vh', color: '#fff' }}>
      <Nav scrolled={scrolled} activeSection={activeSection} onNavClick={scrollToSection} isMobile={isMobile} isTablet={isTablet} />

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        style={{
          padding: isMobile ? '90px 20px 72px' : isTablet ? '100px 32px 80px' : '150px 32px 100px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'flex-start',
          gap: isMobile ? '24px' : isTablet ? '40px' : '60px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {!(isMobile || isTablet) && (
          <div style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <h1
              style={{
                fontSize: '44px',
                fontWeight: 800,
                color: '#fff',
                lineHeight: 1.15,
                marginBottom: '6px',
              }}
            >
              {['Gabriel', 'Pompilius'].map((word, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? 'translateY(0)' : 'translateY(12px)',
                    transition: `opacity 0.55s ease ${i * 0.12}s, transform 0.55s ease ${i * 0.12}s`,
                    marginRight: i < 1 ? '0.28em' : 0,
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>
            <p style={{
              fontSize: '26px',
              color: '#666',
              fontWeight: 500,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.5s ease 0.36s, transform 0.5s ease 0.36s',
            }}>Product Designer</p>
          </div>
        )}

        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start' }}>
          <h2
            style={{
              fontSize: isMobile ? '22px' : isTablet ? '36px' : '44px',
              fontWeight: isMobile ? 600 : 800,
              color: '#fff',
              lineHeight: 1.15,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(14px)',
              transition: (isMobile || isTablet)
                ? 'opacity 0.65s ease 0.15s, transform 0.65s ease 0.15s'
                : 'opacity 0.65s ease 0.48s, transform 0.65s ease 0.48s',
            }}
          >
            Sole Product Designer at May Mobility, shaping autonomous vehicle rider, fleet, and safety experiences that supported over $100M in funding in 2025
          </h2>
        </div>
      </section>

      {/* ── Work ── */}
      <section
        id="work"
        style={{
          padding: isMobile ? '0 12px 60px' : isTablet ? '0 24px 60px' : '0 32px 80px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} isMobile={isMobile} isTablet={isTablet} index={i} />
        ))}
      </section>

      {/* ── About ── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <AboutSection isMobile={isMobile} isTablet={isTablet} />
      </div>

      {/* ── Contact ── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <ContactSection isMobile={isMobile} isTablet={isTablet} />
      </div>

      {/* ── Grid Footer ── */}
      <GridFooter bg="#0d0d0d" mode="dark" />
    </div>
  )
}
