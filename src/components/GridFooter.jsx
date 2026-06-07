import { useEffect, useRef } from 'react'

// bg: the background color of the section above — footer blends into it seamlessly
// mode: 'dark' | 'light' — controls grid line color
export default function GridFooter({ bg = '#0d0d0d', mode = 'dark' }) {
  const canvasRef = useRef(null)

  const gridColor = mode === 'dark' ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)'
  const [or, og, ob] = mode === 'dark' ? [13, 13, 13] : [237, 237, 237]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const W = () => canvas.width / dpr
    const H = () => canvas.height / dpr

    const drawGrid = () => {
      const size = 24
      const w = W(), h = H()
      ctx.strokeStyle = gridColor
      ctx.lineWidth = 0.5
      for (let x = 0; x <= w; x += size) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
      for (let y = 0; y <= h; y += size) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }
    }

    let t = 0
    const animate = () => {
      t += 0.00022
      const w = W(), h = H()
      const sx = w * (0.5 + 0.38 * Math.sin(t * 1.1))
      const sy = h * (0.5 + 0.32 * Math.sin(t * 0.73 + 2.1))

      ctx.clearRect(0, 0, w, h)

      // Fill with exact bg color — no CSS background, canvas owns it entirely
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      ctx.globalAlpha = 0.10
      drawGrid()
      ctx.globalAlpha = 1

      const r = Math.max(w, h) * 0.35
      const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, r)
      grad.addColorStop(0,    `rgba(${or},${og},${ob},0.15)`)
      grad.addColorStop(0.18, `rgba(${or},${og},${ob},0.15)`)
      grad.addColorStop(0.55, `rgba(${or},${og},${ob},0.91)`)
      grad.addColorStop(1,    `rgba(${or},${og},${ob},0.99)`)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      raf = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [bg, mode])

  return (
    <div style={{ background: bg, lineHeight: 0 }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '320px' }}
      />
    </div>
  )
}
