import { useEffect, useRef } from 'react'

export default function GridFooter({ bg = '#0d0d0d', mode = 'dark' }) {
  const divRef = useRef(null)

  const r = parseInt(bg.slice(1, 3), 16)
  const g = parseInt(bg.slice(3, 5), 16)
  const b = parseInt(bg.slice(5, 7), 16)

  const lineColor = mode === 'dark'
    ? 'rgba(255,255,255,0.10)'
    : 'rgba(0,0,0,0.08)'

  const o15 = `rgba(${r},${g},${b},0.15)`
  const o91 = `rgba(${r},${g},${b},0.91)`
  const o99 = `rgba(${r},${g},${b},0.99)`

  useEffect(() => {
    const el = divRef.current
    if (!el) return
    let raf
    let t = 0

    const animate = () => {
      t += 0.00022
      const sx = (0.5 + 0.38 * Math.sin(t * 1.1)) * 100
      const sy = (0.5 + 0.32 * Math.sin(t * 0.73 + 2.1)) * 100
      const radius = Math.round(Math.max(el.offsetWidth, el.offsetHeight) * 0.35)
      el.style.setProperty('--sx', `${sx.toFixed(2)}%`)
      el.style.setProperty('--sy', `${sy.toFixed(2)}%`)
      el.style.setProperty('--r', `${radius}px`)
      raf = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={divRef}
      style={{
        height: '320px',
        backgroundColor: bg,
        backgroundImage: [
          `radial-gradient(circle var(--r, 300px) at var(--sx, 50%) var(--sy, 50%), ${o15} 0%, ${o15} 18%, ${o91} 55%, ${o99} 100%)`,
          `linear-gradient(${lineColor} 1px, transparent 1px)`,
          `linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
        ].join(', '),
        backgroundSize: '100% 100%, 24px 24px, 24px 24px',
      }}
    />
  )
}
