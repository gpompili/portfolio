import { useState, useEffect } from 'react'

function getBreakpoint() {
  if (typeof window === 'undefined') {
    return { isMobile: false, isTablet: false, isDesktop: true, width: 1200 }
  }
  const w = window.innerWidth
  return {
    isMobile: w < 768,
    isTablet: w >= 768 && w < 1100,
    isDesktop: w >= 1100,
    width: w,
  }
}

export function useBreakpoint() {
  const [bp, setBp] = useState(getBreakpoint)

  useEffect(() => {
    const handleResize = () => setBp(getBreakpoint())
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return bp
}
