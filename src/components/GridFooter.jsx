import { useEffect, useRef } from 'react'

// bg: the footer's own distinct background color
// mode: 'dark' | 'light'
export default function GridFooter({ bg = '#111111', mode = 'dark', children }) {
  const gridRevealRef = useRef(null)

  const r = parseInt(bg.slice(1, 3), 16)
  const g = parseInt(bg.slice(3, 5), 16)
  const b = parseInt(bg.slice(5, 7), 16)

  const lineColor = mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.09)'
  // Frosted overlay: high opacity so grid is mostly hidden outside spotlights
  const frostedBg = `rgba(${r},${g},${b},0.92)`

  const gridStyle = {
    backgroundImage: [
      `linear-gradient(${lineColor} 1px, transparent 1px)`,
      `linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
    ].join(', '),
    backgroundSize: '24px 24px',
  }

  useEffect(() => {
    const el = gridRevealRef.current
    if (!el) return
    let raf, t = 0

    const animate = () => {
      t += 0.00022
      const w = el.offsetWidth
      const h = el.offsetHeight

      // Primary spotlight — organic ellipse (taller than wide), biased to lower half
      // so the top of the footer is always obscured and the reveal starts mid-lower
      const sx1 = 0.5 + 0.36 * Math.sin(t * 1.1)
      const sy1 = 0.68 + 0.20 * Math.sin(t * 0.73 + 2.1)
      const r1x = Math.round(w * 0.16)   // narrow horizontally
      const r1y = Math.round(h * 0.52)   // tall vertically → organic, non-circular

      // Secondary spotlight — smaller, faster, different phase
      const sx2 = 0.5 + 0.28 * Math.sin(t * 0.88 + 1.5)
      const sy2 = 0.62 + 0.20 * Math.sin(t * 1.2 + 0.7)
      const r2 = Math.round(Math.min(w, h) * 0.09)

      el.style.setProperty('--sx1', `${(sx1 * 100).toFixed(1)}%`)
      el.style.setProperty('--sy1', `${(sy1 * 100).toFixed(1)}%`)
      el.style.setProperty('--r1x', `${r1x}px`)
      el.style.setProperty('--r1y', `${r1y}px`)
      el.style.setProperty('--sx2', `${(sx2 * 100).toFixed(1)}%`)
      el.style.setProperty('--sy2', `${(sy2 * 100).toFixed(1)}%`)
      el.style.setProperty('--r2', `${r2}px`)

      raf = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(raf)
  }, [])

  // Two spotlight masks — combined with add/source-over so both holes punch through
  const maskImage = [
    `radial-gradient(ellipse var(--r1x, 220px) var(--r1y, 160px) at var(--sx1, 50%) var(--sy1, 68%), rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, transparent 85%)`,
    `radial-gradient(circle var(--r2, 30px) at var(--sx2, 40%) var(--sy2, 65%), rgba(0,0,0,1) 0%, transparent 100%)`,
  ].join(', ')

  return (
    <div style={{ position: 'relative', height: '320px', backgroundColor: bg, overflow: 'hidden' }}>

      {/* Full grid — always beneath */}
      <div style={{ position: 'absolute', inset: 0, ...gridStyle }} />

      {/* Frosted overlay — hides grid outside spotlights, adds blur quality */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: frostedBg,
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
      }} />

      {/* Grid reveal — masked to spotlight shapes, sits on top of frosted overlay */}
      <div
        ref={gridRevealRef}
        style={{
          position: 'absolute',
          inset: 0,
          ...gridStyle,
          maskImage,
          WebkitMaskImage: maskImage,
          maskComposite: 'add',
          WebkitMaskComposite: 'source-over',
        }}
      />

      {/* Content overlaid on animation */}
      {children && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}>
          {children}
        </div>
      )}
    </div>
  )
}
