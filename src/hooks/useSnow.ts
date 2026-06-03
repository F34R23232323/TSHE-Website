import { useEffect } from 'react'

interface Flake {
  x: number
  y: number
  r: number
  speed: number
  opacity: number
  drift: number
  driftPhase: number
}

export function useSnow() {
  useEffect(() => {
    const canvas = document.getElementById('snow-canvas') as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const flakes: Flake[] = Array.from({ length: 80 }, () => ({
      x:          Math.random() * window.innerWidth,
      y:          Math.random() * window.innerHeight,
      r:          Math.random() * 2.5 + 0.5,
      speed:      Math.random() * 0.6 + 0.2,
      opacity:    Math.random() * 0.5 + 0.1,
      drift:      Math.random() * 0.4 - 0.2,
      driftPhase: Math.random() * Math.PI * 2,
    }))

    let frame = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++
      flakes.forEach(f => {
        f.y += f.speed
        f.x += Math.sin(f.driftPhase + frame * 0.01) * f.drift
        if (f.y > canvas.height + 5) {
          f.y = -5
          f.x = Math.random() * canvas.width
        }
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,235,248,${f.opacity})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])
}
