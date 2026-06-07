import { useEffect, useRef } from 'react'

// bg: must exactly match the CSS background of the section directly above
// mode: 'dark' | 'light' — controls grid line color and overlay color
export default function GridFooter({ bg = '#0d0d0d', mode = 'dark' }) {
  const canvasRef = useRef(null)

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

    // Parse bg hex → rgb for overlay gradient
    const r = parseInt(bg.slice(1, 3), 16)
    const g = parseInt(bg.slice(3, 5), 16)
    const b = parseInt(bg.slice(5, 7), 16)

    const gridColor = mode === 'dark' ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)'

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

      // Clear to fully transparent — the parent div's CSS background shows through
      ctx.clearRect(0, 0, w, h)

      // Draw grid at low opacity
      ctx.globalAlpha = 0.10
      drawGrid()
      ctx.globalAlpha = 1

      // Overlay: same color as bg, mostly opaque everywhere except the spotlight
      const radius = Math.max(w, h) * 0.35
      const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius)
      grad.addColorStop(0,    `rgba(${r},${g},${b},0.15)`)
      grad.addColorStop(0.18, `rgba(${r},${g},${b},0.15)`)
      grad.addColorStop(0.55, `rgba(${r},${g},${b},0.91)`)
      grad.addColorStop(1,    `rgba(${r},${g},${b},0.99)`)
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
