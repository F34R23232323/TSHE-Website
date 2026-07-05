import React, { useState, useEffect, useRef } from 'react'

interface TypewriterTextProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pause?: number
  className?: string
  style?: React.CSSProperties
}

export default function TypewriterText({ texts, speed = 80, deleteSpeed = 40, pause = 2000, style }: TypewriterTextProps) {
  const [display, setDisplay] = useState('')
  const [textIdx, setTextIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const current = texts[textIdx]
    if (!current) return

    const tick = () => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplay(current.slice(0, charIdx + 1))
          setCharIdx(c => c + 1)
        } else {
          setTimeout(() => setDeleting(true), pause)
        }
      } else {
        if (charIdx > 0) {
          setDisplay(current.slice(0, charIdx - 1))
          setCharIdx(c => c - 1)
        } else {
          setDeleting(false)
          setTextIdx(i => (i + 1) % texts.length)
          setCharIdx(0)
        }
      }
    }

    const delay = deleting ? deleteSpeed : speed
    intervalRef.current = setInterval(tick, delay)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [textIdx, charIdx, deleting, texts, speed, deleteSpeed, pause])

  return (
    <span style={{ ...style, position: 'relative', display: 'inline-block' }}>
      {display}
      <span style={{
        display: 'inline-block',
        width: 2,
        height: '1em',
        background: 'var(--red2)',
        marginLeft: 1,
        verticalAlign: 'middle',
        animation: 'blink .8s steps(1) infinite',
      }} />
      <style>{`@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
    </span>
  )
}
