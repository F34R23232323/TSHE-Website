import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Shield, ChevronDown, ExternalLink } from 'lucide-react'

interface NavGroup {
  label: string
  items: { label: string; to?: string; href?: string; staff?: boolean }[]
}

const navGroups: NavGroup[] = [
  {
    label: 'Community',
    items: [
      { to: '/rules',      label: 'Rules'        },
      { to: '/automod',    label: 'AutoMod'      },
      { to: '/punish',     label: 'Punishments'  },
      { to: '/roles',      label: 'Roles'        },
      { to: '/faq',        label: 'FAQ'          },
      { to: '/docs',       label: 'Documentation' },
    ],
  },
  {
    label: 'Staff',
    items: [
      { to: '/authority',  label: 'Staff Authority' },
      { to: '/staff',      label: 'Staff Guide'     },
      { to: '/power-abuse',label: 'Power Abuse'     },
      { to: '/staff-portal',label: 'Staff Portal', staff: true },
    ],
  },
  {
    label: 'Support',
    items: [
      { to: '/tickets',     label: 'Support Tickets' },
      { to: '/partnership', label: 'Partnership'     },
      { href: 'https://zepp.noxxbot.com/appeals/1466990155020898413', label: 'Appeals' },
    ],
  },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [pfpErrored, setPfpErrored] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setMobileExpanded(null); setOpenGroup(null) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close dropdown on click outside
  useEffect(() => {
    if (!openGroup) return
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenGroup(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [openGroup])

  const isActiveGroup = (group: NavGroup) =>
    group.items.some(i => i.to && pathname === i.to)

  const isActiveLink = (to?: string) => to ? pathname === to : false

  const handleGroupEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenGroup(label)
  }

  const handleGroupLeave = () => {
    closeTimer.current = setTimeout(() => setOpenGroup(null), 150)
  }

  return (
    <>
      <nav className={`site-nav${scrolled ? ' scrolled' : ''}`} ref={dropdownRef}>
        <div className="nav-inner">
          <Link to="/" className="nav-brand">
            <div style={{
              width: 30, height: 30, borderRadius: '50%', overflow: 'hidden',
              border: '1.5px solid var(--gold)',
              background: 'linear-gradient(135deg, rgba(224,49,49,.15), rgba(230,180,34,.1))',
              display: 'grid', placeItems: 'center', flexShrink: 0,
            }}>
              {pfpErrored ? (
                <Shield size={13} color="var(--gold)" />
              ) : (
                <img src="/pfp.png" alt="TSHE"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={() => setPfpErrored(true)} />
              )}
            </div>
            <span style={{ color: 'var(--text)' }}>TSHE</span>
          </Link>

          <div className="nav-links">
            <Link
              to="/"
              className={`nav-link${isActiveLink('/') ? ' active' : ''}`}
            >
              Home
            </Link>

            {navGroups.map(group => {
              const active = isActiveGroup(group) || openGroup === group.label
              return (
                <div
                  key={group.label}
                  className="nav-dropdown-wrapper"
                  onMouseEnter={() => handleGroupEnter(group.label)}
                  onMouseLeave={handleGroupLeave}
                >
                  <button
                    className={`nav-link nav-dropdown-trigger${active ? ' active' : ''}`}
                    onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                    aria-expanded={openGroup === group.label}
                  >
                    {group.label}
                    <ChevronDown
                      size={10}
                      style={{
                        transition: 'transform .2s',
                        transform: openGroup === group.label ? 'rotate(180deg)' : 'none',
                      }}
                    />
                  </button>
                  {openGroup === group.label && (
                    <div
                      className="nav-dropdown"
                      onMouseEnter={() => handleGroupEnter(group.label)}
                      onMouseLeave={handleGroupLeave}
                    >
                      {group.items.map(item => (
                        item.href ? (
                          <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="nav-dropdown-item"
                          >
                            {item.label}
                            <ExternalLink size={10} style={{ opacity: .5 }} />
                          </a>
                        ) : (
                          <Link
                            key={item.label}
                            to={item.to!}
                            className={`nav-dropdown-item${isActiveLink(item.to) ? ' active' : ''}${item.staff ? ' staff' : ''}`}
                          >
                            {item.label}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer" className="nav-cta">
            Join Discord
          </a>

          <button className="nav-burger" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div className={`mob-overlay${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`mob-menu${mobileOpen ? ' open' : ''}`}>
        <Link
          to="/"
          className={isActiveLink('/') ? 'active' : ''}
          style={{ fontWeight: 600 }}
        >
          Home
        </Link>

        {navGroups.map(group => {
          const expanded = mobileExpanded === group.label
          return (
            <div key={group.label}>
              <button
                onClick={() => setMobileExpanded(expanded ? null : group.label)}
                className="mob-group-toggle"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '12px', borderRadius: 'var(--radius)',
                  fontSize: 14, fontWeight: 600, color: 'var(--text)',
                  background: 'none', border: 'none', textAlign: 'left',
                  fontFamily: 'var(--font)',
                }}
              >
                {group.label}
                <ChevronDown
                  size={12}
                  style={{
                    transition: 'transform .2s',
                    transform: expanded ? 'rotate(180deg)' : 'none',
                    color: 'var(--muted)',
                  }}
                />
              </button>
              {expanded && (
                <div style={{ paddingLeft: 8, marginBottom: 4 }}>
                  {group.items.map(item => (
                    item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mob-menu-item"
                        style={{ justifyContent: 'space-between' }}
                      >
                        {item.label}
                        <ExternalLink size={10} style={{ opacity: .5 }} />
                      </a>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.to!}
                        className={`mob-menu-item${isActiveLink(item.to) ? ' active' : ''}${item.staff ? ' staff' : ''}`}
                      >
                        {item.label}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>
          )
        })}

        <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer"
          style={{ color: 'var(--red)', fontWeight: 700, marginTop: 4 }}>
          Join Discord
        </a>
      </div>
    </>
  )
}
