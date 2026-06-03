import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Snowflake, Menu, X, Lock, ChevronRight } from 'lucide-react'

const links = [
  { to: '/',            label: 'Home'         },
  { to: '/rules',       label: 'Rules'        },
  { to: '/roles',       label: 'Roles'        },
  { to: '/punish',      label: 'Punishments'  },
  { to: '/automod',     label: 'AutoMod'      },
  { to: '/faq',         label: 'FAQ'          },
  { to: '/docs',        label: 'Docs'         },
  { to: '/services',    label: 'Services'     },
  { to: '/staff',       label: 'Staff Guide'  },
  { to: '/partnership', label: 'Partner'      },
  { to: '/updates',     label: 'Updates'      },
  { to: '/staff-portal', label: 'Staff Portal', staffOnly: true },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [visible, setVisible]   = useState(true)
  const lastScrollY = useRef(0)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 20)
      if (currentY > 100) {
        setVisible(currentY < lastScrollY.current || currentY < 60)
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 200,
      height: 'var(--nav-h)',
      background: scrolled ? 'rgba(6,12,26,.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all .35s cubic-bezier(.22,1,.36,1), transform .3s cubic-bezier(.22,1,.36,1)',
      transform: visible ? 'translateY(0)' : 'translateY(-100%)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 1rem',
        height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: '.5rem',
            background: 'linear-gradient(135deg, rgba(126,200,227,.3), rgba(201,168,76,.3))',
            border: '1px solid rgba(126,200,227,.3)',
            display: 'grid', placeItems: 'center',
            animation: 'glowPulse 4s ease-in-out infinite',
          }}>
            <Snowflake size={17} color="var(--ice2)" className="icon-bounce" />
          </div>
          <span style={{
            fontFamily: 'var(--display)', fontWeight: 700, fontSize: '.92rem',
            letterSpacing: '.05em',
            background: open ? 'linear-gradient(135deg, var(--ice3), var(--gold))' : 'linear-gradient(135deg, var(--text), var(--dim))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            TSHE
          </span>
        </Link>

        {/* Desktop links */}
        <div className="desktop-nav" style={{
          display: 'flex', alignItems: 'center',
          gap: '.1rem', flex: 1,
          justifyContent: 'center',
          overflowX: 'auto', scrollbarWidth: 'none',
          padding: '0 .5rem',
        }}>
          {links.map(l => {
            const isActive = pathname === l.to
            if (l.staffOnly) return (
              <Link key={l.to} to={l.to} style={{
                flexShrink: 0,
                display: 'inline-flex', alignItems: 'center', gap: '.3rem',
                fontFamily: 'var(--display)', fontSize: '.64rem', letterSpacing: '.06em',
                fontWeight: 600,
                color: isActive ? '#f472b6' : 'rgba(248,113,113,.55)',
                padding: '.32rem .6rem', borderRadius: '.4rem',
                border: `1px solid ${isActive ? 'rgba(248,113,113,.3)' : 'rgba(248,113,113,.12)'}`,
                background: isActive ? 'rgba(248,113,113,.1)' : 'transparent',
                transition: 'all .2s', textDecoration: 'none', whiteSpace: 'nowrap',
              }}>
                <Lock size={9} /> {l.label}
              </Link>
            )
            return (
              <Link key={l.to} to={l.to} style={{
                flexShrink: 0,
                fontFamily: 'var(--display)', fontSize: '.64rem', letterSpacing: '.06em',
                fontWeight: 600, color: isActive ? 'var(--ice2)' : 'var(--dim)',
                padding: '.32rem .6rem', borderRadius: '.4rem',
                border: `1px solid ${isActive ? 'rgba(126,200,227,.25)' : 'transparent'}`,
                background: isActive ? 'rgba(126,200,227,.08)' : 'transparent',
                transition: 'all .2s', textDecoration: 'none', whiteSpace: 'nowrap',
              }}>
                {l.label}
              </Link>
            )
          })}
        </div>

        {/* Desktop CTA */}
        <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer" className="desktop-nav" style={{
          flexShrink: 0,
          fontFamily: 'var(--display)', fontSize: '.64rem', letterSpacing: '.07em',
          fontWeight: 700, color: '#fff',
          padding: '.36rem .85rem', borderRadius: '.4rem',
          background: 'linear-gradient(135deg, rgba(126,200,227,.25), rgba(201,168,76,.2))',
          border: '1px solid rgba(126,200,227,.3)',
          textDecoration: 'none', whiteSpace: 'nowrap',
          transition: 'all .2s',
        }}>
          Join
        </a>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="mob-burger"
          aria-label="Toggle menu"
          style={{
            display: 'none', background: scrolled ? 'rgba(126,200,227,.08)' : 'transparent',
            border: '1px solid var(--border)',
            borderRadius: '.45rem', padding: '.4rem', color: 'var(--dim)', lineHeight: 0,
            transition: 'all .2s',
          }}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`mob-overlay${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          top: 'var(--nav-h)',
          background: 'rgba(0,0,0,.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 198,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity .3s ease',
        }}
      />

      {/* Mobile menu */}
      <div ref={menuRef} style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: 'rgba(6,12,26,.98)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--border)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '.25rem',
        maxHeight: 'calc(100vh - var(--nav-h))',
        overflowY: 'auto',
        zIndex: 199,
        transform: open ? 'translateY(0)' : 'translateY(-12px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'transform .3s cubic-bezier(.22,1,.36,1), opacity .25s ease',
      }}>
        {links.map((l, i) => {
          const isActive = pathname === l.to
          if (l.staffOnly) return (
            <Link key={l.to} to={l.to} style={{
              display: 'flex', alignItems: 'center', gap: '.45rem',
              fontFamily: 'var(--display)', fontSize: '.78rem', letterSpacing: '.07em',
              fontWeight: 600, color: isActive ? '#f472b6' : 'rgba(248,113,113,.6)',
              padding: '.65rem .75rem', borderRadius: '.45rem',
              background: isActive ? 'rgba(248,113,113,.08)' : 'transparent',
              textDecoration: 'none',
              border: `1px solid ${isActive ? 'rgba(248,113,113,.2)' : 'rgba(248,113,113,.08)'}`,
              opacity: open ? 1 : 0,
              transform: open ? 'translateX(0)' : 'translateX(-8px)',
              transition: `all .3s cubic-bezier(.22,1,.36,1) ${i * .04}s`,
            }}>
              <Lock size={12} /> {l.label}
            </Link>
          )
          return (
            <Link key={l.to} to={l.to} style={{
              display: 'flex', alignItems: 'center', gap: '.45rem',
              fontFamily: 'var(--display)', fontSize: '.78rem', letterSpacing: '.07em',
              fontWeight: 600, color: isActive ? 'var(--ice2)' : 'var(--dim)',
              padding: '.65rem .75rem', borderRadius: '.45rem',
              background: isActive ? 'rgba(126,200,227,.08)' : 'transparent',
              textDecoration: 'none',
              opacity: open ? 1 : 0,
              transform: open ? 'translateX(0)' : 'translateX(-8px)',
              transition: `all .3s cubic-bezier(.22,1,.36,1) ${i * .04}s`,
            }}>
              {isActive && <ChevronRight size={10} color="var(--ice)" />}
              {l.label}
            </Link>
          )
        })}
        <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer" style={{
          marginTop: '.35rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--display)', fontSize: '.78rem', letterSpacing: '.07em',
          fontWeight: 700, color: 'var(--ice2)',
          padding: '.7rem .75rem', borderRadius: '.45rem',
          background: 'rgba(126,200,227,.1)', border: '1px solid rgba(126,200,227,.2)',
          textDecoration: 'none',
          opacity: open ? 1 : 0,
          transform: open ? 'translateX(0)' : 'translateX(-8px)',
          transition: `all .3s cubic-bezier(.22,1,.36,1) ${links.length * .04}s`,
        }}>
          Join Server
          <ChevronRight size={14} style={{ marginLeft: '.25rem' }} />
        </a>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mob-burger   { display: grid !important; place-items: center; min-width: 40px; min-height: 40px; }
        }
        .desktop-nav::-webkit-scrollbar { display: none; }
      `}</style>
    </nav>
  )
}
