import React, { useState, useEffect } from 'react'
import { Shield, ChevronDown, Eye, EyeOff, Lock, Trash2, Globe, ExternalLink, Snowflake, AlertTriangle, ClipboardList, FileText, MessageCircle, Scale, Calendar, Ban } from 'lucide-react'

const colorMap = {
  ice:    { bg: 'rgba(126,200,227,.06)', border: 'rgba(126,200,227,.18)', text: 'var(--ice)',  num: 'rgba(126,200,227,.25)' },
  gold:   { bg: 'rgba(201,168,76,.06)',  border: 'rgba(201,168,76,.18)',  text: 'var(--gold)', num: 'rgba(201,168,76,.25)' },
  red:    { bg: 'rgba(248,113,113,.06)', border: 'rgba(248,113,113,.18)', text: 'var(--red)',  num: 'rgba(248,113,113,.25)' },
  green:  { bg: 'rgba(74,222,128,.06)',  border: 'rgba(74,222,128,.18)',  text: '#4ade80',     num: 'rgba(74,222,128,.25)' },
  purple: { bg: 'rgba(167,139,250,.06)', border: 'rgba(167,139,250,.18)', text: '#a78bfa',     num: 'rgba(167,139,250,.25)' },
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '.82rem', color: 'var(--dim)', lineHeight: 1.82, marginBottom: '.65rem' }}>{children}</p>
}
function B({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: 'var(--text)', fontWeight: 700 }}>{children}</strong>
}
function Ul({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ margin: '.5rem 0 .75rem 0', display: 'flex', flexDirection: 'column', gap: '.35rem', listStyle: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: '.55rem', alignItems: 'flex-start', fontSize: '.81rem', color: 'var(--dim)', lineHeight: 1.7 }}>
          <span style={{ color: 'var(--ice)', flexShrink: 0, marginTop: '.25rem' }}><Snowflake size={10} /></span>
          {item}
        </li>
      ))}
    </ul>
  )
}

interface Section {
  id: string
  num: string
  title: string
  subtitle: string
  color: keyof typeof colorMap
  content: React.ReactNode
}

const sections: Section[] = [
  {
    id: 'p1', num: '01', color: 'ice',
    title: 'Data Consent & Acceptance',
    subtitle: 'By using TSHE you consent to these practices',
    content: (
      <>
        <div style={{ background: 'rgba(126,200,227,.07)', border: '1px solid rgba(126,200,227,.2)', borderRadius: '.65rem', padding: '1rem 1.1rem', marginBottom: '1rem', display: 'flex', gap: '.7rem' }}>
          <Eye size={16} color="var(--ice)" style={{ flexShrink: 0, marginTop: 2 }} />
          <P><B>By joining The SnowHaven Empire server, using this website, or interacting with any TSHE platform, you consent to the data collection and handling practices described in this Policy.</B></P>
        </div>
        <P>This Policy covers data collected through the Discord server, this website, and any associated TSHE services. It does not govern data collected by Discord Inc. — refer to <a href="https://discord.com/privacy" target="_blank" rel="noreferrer" style={{ color: 'var(--ice)' }}>Discord's Privacy Policy</a> for that.</P>
        <P>Last updated: March 2026. If significant changes are made, notice will be posted in the server's announcements channel.</P>
      </>
    ),
  },
  {
    id: 'p2', num: '02', color: 'ice',
    title: 'Data We Collect',
    subtitle: 'A complete inventory of what is collected',
    content: (
      <>
        <div style={{ overflowX: 'auto', borderRadius: '.65rem', border: '1px solid var(--border)', marginBottom: '.75rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.79rem' }}>
            <thead><tr style={{ background: 'var(--bg2)' }}>
              {['Category', 'Data Point', 'Storage'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '.55rem .9rem', fontFamily: 'Cinzel, serif', fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {[
                ['Discord User ID',       'Identifier for moderation records, warnings, and ban logs. Treated as PII.',                                       'Encrypted'],
                ['Moderation Actions',    'Warnings issued, mutes, bans, and reasons. Retained for consistency and appeals review.',                          'Logged'],
                ['Message Metadata',      'Which channel a message was sent in and timestamp — used for moderation audit trails. Message content is not stored long-term.', 'Anonymised'],
                ['Website Visit Logs',    'Standard server logs: IP address, browser type, referring URL. Used for security and DDoS mitigation. Deleted within 24 hours.',  'Temporary'],
                ['Appeal Submissions',    'Content of any appeal submitted via the appeal portal. Retained for the duration of the moderation case.',          'Retained'],
              ].map(([cat, data, storage]) => (
                <tr key={cat} style={{ borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                  <td style={{ padding: '.6rem .9rem', color: 'var(--text)', fontWeight: 600, whiteSpace: 'nowrap' }}>{cat}</td>
                  <td style={{ padding: '.6rem .9rem', color: 'var(--dim)', lineHeight: 1.6 }}>{data}</td>
                  <td style={{ padding: '.6rem .9rem', whiteSpace: 'nowrap' }}>
                    <span style={{
                      fontSize: '.62rem', fontFamily: 'Cinzel, serif', letterSpacing: '.05em',
                      padding: '2px 8px', borderRadius: 4,
                      background: storage === 'Encrypted' ? 'rgba(126,200,227,.1)' : storage === 'Temporary' ? 'rgba(74,222,128,.1)' : 'rgba(201,168,76,.1)',
                      border: `1px solid ${storage === 'Encrypted' ? 'rgba(126,200,227,.2)' : storage === 'Temporary' ? 'rgba(74,222,128,.2)' : 'rgba(201,168,76,.2)'}`,
                      color: storage === 'Encrypted' ? 'var(--ice)' : storage === 'Temporary' ? '#4ade80' : 'var(--gold)',
                    }}>{storage}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ background: 'rgba(74,222,128,.06)', border: '1px solid rgba(74,222,128,.18)', borderRadius: '.65rem', padding: '.85rem 1rem', display: 'flex', gap: '.65rem' }}>
          <EyeOff size={14} color="#4ade80" style={{ flexShrink: 0, marginTop: 3 }} />
          <P><B>Data minimisation:</B> We collect only the minimum data necessary to operate the server safely and fairly. We do not sell your data, build advertising profiles, or share it for purposes unrelated to running TSHE.</P>
        </div>
      </>
    ),
  },
  {
    id: 'p3', num: '03', color: 'ice',
    title: 'How We Use Your Data',
    subtitle: 'Operational purposes only',
    content: (
      <>
        <Ul items={[
          <><B>Moderation enforcement:</B> Warning records, ban logs, and case history are used to ensure consistent and fair enforcement of server rules.</>,
          <><B>Appeals review:</B> Moderation history is consulted when processing member appeals to ensure decisions are well-informed.</>,
          <><B>Security:</B> Website visit logs are used for DDoS mitigation and identifying malicious access patterns.</>,
          <><B>Audit trail:</B> Moderation action metadata is retained so staff can review decisions and ensure accountability.</>,
          <><B>Legal compliance:</B> Data may be shared with Discord Trust & Safety, NCMEC, or law enforcement where required by law (e.g., CSAM reports).</>,
        ]} />
        <P>Your data is never used for advertising, sold to third parties, or shared beyond what is required to operate the server and respond to legal obligations.</P>
      </>
    ),
  },
  {
    id: 'p4', num: '04', color: 'gold',
    title: 'Third-Party Services',
    subtitle: 'External platforms we use',
    content: (
      <>
        <div style={{ overflowX: 'auto', borderRadius: '.65rem', border: '1px solid var(--border)', marginBottom: '.75rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.79rem' }}>
            <thead><tr style={{ background: 'var(--bg2)' }}>
              {['Service', 'Purpose', 'Data Shared'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '.55rem .9rem', fontFamily: 'Cinzel, serif', fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {[
                ['Discord Inc.',      'Server hosting and communication platform', 'All server activity — see Discord\'s Privacy Policy'],
                ['Zepp Appeals',     'Member appeal submissions',                  'Appeal content and your Discord User ID'],
                ['Noxx Bot',          'Server moderation automation',               'Guild ID, channel IDs, moderation configurations'],
                ['Cloudflare',        'Website CDN, DDoS protection, and DNS',      'IP addresses (anonymised per Cloudflare policy)'],
                ['Google Fonts',      'Typography on this website',                 'IP address on font load (standard browser request)'],
              ].map(([svc, purpose, data]) => (
                <tr key={svc} style={{ borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                  <td style={{ padding: '.6rem .9rem', color: 'var(--gold)', fontFamily: 'Cinzel, serif', fontSize: '.75rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{svc}</td>
                  <td style={{ padding: '.6rem .9rem', color: 'var(--dim)', lineHeight: 1.6 }}>{purpose}</td>
                  <td style={{ padding: '.6rem .9rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '.75rem' }}>{data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'p5', num: '05', color: 'green',
    title: 'Data Retention & Erasure',
    subtitle: 'How long we keep data and your right to deletion',
    content: (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '.75rem', marginBottom: '1rem' }}>
          {[
            { icon: AlertTriangle, title: 'Active warnings', period: '30 days', desc: 'Expire automatically unless the offense is severe.' },
            { icon: ClipboardList, title: 'Moderation cases', period: 'Indefinite', desc: 'Retained for consistency and appeal review.' },
            { icon: Globe,         title: 'Website logs', period: '24 hours', desc: 'Standard IP logs deleted within 24 hours.' },
            { icon: FileText,      title: 'Appeal records', period: 'Duration of case', desc: 'Retained until the case is fully resolved.' },
          ].map(card => {
            const CardIcon = card.icon
            return (
            <div key={card.title} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '.65rem', padding: '1rem' }}>
              <p style={{ marginBottom: '.4rem', color: 'var(--ice)' }}><CardIcon size={16} /></p>
              <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.72rem', color: 'var(--muted)', letterSpacing: '.05em', marginBottom: '.25rem' }}>{card.title}</p>
              <p style={{ fontSize: '.82rem', color: '#4ade80', fontWeight: 700, marginBottom: '.3rem' }}>{card.period}</p>
              <p style={{ fontSize: '.75rem', color: 'var(--muted)', lineHeight: 1.55 }}>{card.desc}</p>
            </div>
            )
          })}
        </div>
        <div style={{ background: 'rgba(74,222,128,.06)', border: '1px solid rgba(74,222,128,.2)', borderRadius: '.65rem', padding: '.9rem 1.1rem', display: 'flex', gap: '.65rem', alignItems: 'flex-start' }}>
          <Trash2 size={15} color="#4ade80" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.75rem', fontWeight: 700, color: '#4ade80', marginBottom: '.3rem' }}>Requesting Erasure</p>
            <P>To request deletion of your moderation records or any other data we hold, contact us via the{' '}
              <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer" style={{ color: 'var(--ice)' }}>support server</a> or the appeal portal. Note that active bans or warnings cannot be erased until the penalty has been served, as they are required for moderation consistency.
            </P>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'p6', num: '06', color: 'purple',
    title: 'Cookies & Website Tracking',
    subtitle: 'What this website stores in your browser',
    content: (
      <>
        <div style={{ overflowX: 'auto', borderRadius: '.65rem', border: '1px solid var(--border)', marginBottom: '.85rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.79rem' }}>
            <thead><tr style={{ background: 'var(--bg2)' }}>
              {['Type', 'Purpose', 'Sent to server?'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '.55rem .9rem', fontFamily: 'Cinzel, serif', fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {[
                ['None (static site)', 'This website sets no cookies and uses no tracking scripts or analytics.', 'No'],
                ['Google Fonts request', 'A standard HTTP request to fonts.googleapis.com when the page loads.', 'Google only'],
                ['Browser localStorage', 'Used to remember UI preferences (theme, etc.) if applicable. No PII.', 'No'],
              ].map(([type, purpose, sent]) => (
                <tr key={type} style={{ borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                  <td style={{ padding: '.6rem .9rem', color: 'var(--text)', fontWeight: 600, lineHeight: 1.5 }}>{type}</td>
                  <td style={{ padding: '.6rem .9rem', color: 'var(--dim)', lineHeight: 1.6 }}>{purpose}</td>
                  <td style={{ padding: '.6rem .9rem' }}>
                    <span style={{ fontSize: '.7rem', color: sent === 'No' ? '#4ade80' : 'var(--gold)', fontWeight: 700 }}>{sent}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <P>This website does not use Google Analytics, Facebook Pixel, or any other behavioural tracking service. No data about your browsing behaviour is collected or sold.</P>
      </>
    ),
  },
  {
    id: 'p7', num: '07', color: 'ice',
    title: 'Your Rights',
    subtitle: 'GDPR, CCPA, and general privacy rights',
    content: (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '.75rem', marginBottom: '1rem' }}>
          {[
            { right: 'Right of Access',        desc: 'Request a copy of the data we hold about you.',                                         flag: '🇪🇺 🇬🇧 🇺🇸' },
            { right: 'Right to Rectification', desc: 'Request correction of inaccurate data we hold.',                                        flag: '🇪🇺 🇬🇧'      },
            { right: 'Right to Erasure',        desc: 'Request deletion of your data. Active penalties cannot be erased early.',              flag: '🇪🇺 🇬🇧 🇺🇸' },
            { right: 'Right to Portability',    desc: 'Request an export of your data in a machine-readable format.',                         flag: '🇪🇺 🇬🇧'      },
            { right: 'Right to Object',         desc: 'Object to processing of your data where you believe it is unlawful.',                  flag: '🇪🇺 🇬🇧'      },
            { right: 'CCPA Rights',             desc: 'California residents may request disclosure and deletion. We do not sell your data.',   flag: '🇺🇸'          },
          ].map(r => (
            <div key={r.right} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '.65rem', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '.4rem' }}>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.75rem', fontWeight: 700, color: 'var(--ice)' }}>{r.right}</p>
                <span style={{ fontSize: '.75rem' }}>{r.flag}</span>
              </div>
              <p style={{ fontSize: '.75rem', color: 'var(--muted)', lineHeight: 1.6 }}>{r.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(126,200,227,.06)', border: '1px solid rgba(126,200,227,.18)', borderRadius: '.65rem', padding: '.9rem 1.1rem', display: 'flex', gap: '.65rem' }}>
          <Lock size={14} color="var(--ice)" style={{ flexShrink: 0, marginTop: 3 }} />
          <P>To exercise any of these rights, contact us via the <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer" style={{ color: 'var(--ice)' }}>official support server</a>. Requests are fulfilled within 30 days for GDPR and 45 days for CCPA.</P>
        </div>
      </>
    ),
  },
  {
    id: 'p8', num: '08', color: 'red',
    title: 'Children\'s Privacy (COPPA)',
    subtitle: 'Users under 13',
    content: (
      <>
        <P>The SnowHaven Empire requires all members to be at least 13 years of age, in compliance with Discord's Terms of Service and the Children's Online Privacy Protection Act (COPPA).</P>
        <Ul items={[
          'We do not knowingly collect data from children under 13.',
          'If we discover that a member under 13 has joined the server, their account will be removed and any associated data deleted immediately.',
          'Parents or guardians who believe their child has joined may contact us via the support server to request immediate removal and data erasure.',
          'Members who misrepresent their age to join the server accept full responsibility for that violation.',
        ]} />
      </>
    ),
  },
  {
    id: 'p9', num: '09', color: 'gold',
    title: 'Discord\'s Role',
    subtitle: 'What falls outside our scope',
    content: (
      <>
        <div style={{ background: 'rgba(201,168,76,.06)', border: '1px solid rgba(201,168,76,.2)', borderRadius: '.65rem', padding: '.9rem 1.1rem', marginBottom: '.85rem', display: 'flex', gap: '.65rem' }}>
          <Globe size={15} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
          <P><B>This policy only governs data collected directly by TSHE.</B> Your use of Discord itself is subject to Discord's own Privacy Policy and Terms of Service, over which we have no control.</P>
        </div>
        <Ul items={[
          'Discord collects and processes significant user data independently — including message content, voice data, and device information.',
          'We cannot control or limit what Discord Inc. collects as the underlying platform.',
          'For concerns about Discord\'s data practices, visit discord.com/privacy or contact Discord directly.',
          'Any bots or integrations in the server (including Noxx) have their own privacy policies governing data they collect.',
        ]} />
      </>
    ),
  },
  {
    id: 'p10', num: '10', color: 'ice',
    title: 'Contact & Support',
    subtitle: 'Reach us with privacy questions',
    content: (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.65rem' }}>
          {[
            { icon: MessageCircle, label: 'Support Server', desc: 'Primary channel for privacy requests, data queries, and erasure requests.', link: 'https://discord.gg/DeSrm3WNmk', linkLabel: 'discord.gg/DeSrm3WNmk' },
            { icon: Scale,         label: 'Appeals Portal', desc: 'For moderation appeals and associated data requests.', link: 'https://zepp.noxxbot.com/appeals/1466990155020898413', linkLabel: 'zepp.noxxbot.com/appeals/1466990155020898413' },
          ].map(c => {
            const ContactIcon = c.icon
            return (
            <div key={c.label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '.65rem', padding: '1rem 1.15rem', display: 'flex', gap: '.85rem', alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, color: 'var(--ice)', marginTop: 2 }}><ContactIcon size={18} /></span>
              <div>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.78rem', fontWeight: 700, marginBottom: '.3rem' }}>{c.label}</p>
                <p style={{ fontSize: '.78rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '.35rem' }}>{c.desc}</p>
                <a href={c.link} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem', fontSize: '.76rem', color: 'var(--ice)', textDecoration: 'underline' }}>
                  <ExternalLink size={11} /> {c.linkLabel}
                </a>
              </div>
            </div>
            )
          })}
        </div>
      </>
    ),
  },
]

export default function Privacy() {
  const [activeSection, setActive] = useState('p1')
  const [openSections, setOpen]    = useState<Set<string>>(new Set(['p1']))

  const toggle = (id: string) => {
    setOpen(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
    setActive(id)
  }

  useEffect(() => {
    const onScroll = () => {
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= 120) setActive(s.id)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: 'rgba(74,222,128,.08)', border: '1px solid rgba(74,222,128,.2)',
            borderRadius: 99, padding: '.3rem .9rem',
            fontFamily: 'Cinzel, serif', fontSize: '.62rem', letterSpacing: '.12em',
            color: '#4ade80', textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            <Shield size={10} /> Privacy Document
          </div>
          <h1 style={{
            fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700, letterSpacing: '-.01em', marginBottom: '.6rem',
            background: 'linear-gradient(135deg, var(--ice3), #4ade80)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Privacy Policy</h1>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '.75rem' }}>
            {[
              { icon: Calendar,      label: 'Last updated', value: 'March 2026' },
              { icon: ClipboardList, label: 'Sections',     value: '10' },
              { icon: Ban,           label: 'Data sold',    value: 'Never' },
            ].map(m => {
              const MetaIcon = m.icon
              return (
              <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: '.45rem', fontSize: '.75rem', color: 'var(--muted)', fontFamily: 'Cinzel, serif', letterSpacing: '.04em' }}>
                <MetaIcon size={13} color="var(--ice)" /> {m.label}: <span style={{ color: m.label === 'Data sold' ? '#4ade80' : 'var(--dim)', fontWeight: 600 }}>{m.value}</span>
              </div>
              )
            })}
          </div>
        </div>

        {/* Layout */}
        <div className="privacy-grid" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'start' }}>

          {/* TOC */}
          <aside style={{ position: 'sticky', top: 'calc(var(--nav-h) + 1rem)' }} className="privacy-toc">
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '.6rem', paddingLeft: '.6rem' }}>On this page</p>
            <ul style={{ listStyle: 'none' }}>
              {sections.map(s => (
                <li key={s.id}>
                  <button onClick={() => { document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActive(s.id) }} style={{
                    width: '100%', textAlign: 'left', background: activeSection === s.id ? 'rgba(74,222,128,.08)' : 'none',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '.55rem',
                    padding: '.38rem .6rem', borderRadius: '.4rem',
                    color: activeSection === s.id ? 'var(--text)' : 'var(--muted)',
                    transition: 'all .15s',
                  }}>
                    <span style={{
                      fontSize: '.58rem', fontFamily: 'Cinzel, serif', fontWeight: 700,
                      minWidth: 20, height: 20, borderRadius: 4, display: 'grid', placeItems: 'center',
                      background: activeSection === s.id ? 'rgba(74,222,128,.2)' : 'rgba(255,255,255,.05)',
                      color: activeSection === s.id ? '#4ade80' : 'var(--muted)', flexShrink: 0,
                    }}>{s.num}</span>
                    <span style={{ fontSize: '.71rem', fontFamily: 'Cinzel, serif', letterSpacing: '.03em', fontWeight: activeSection === s.id ? 700 : 500, lineHeight: 1.3 }}>{s.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Sections */}
          <div>
            {sections.map(s => {
              const c = colorMap[s.color]
              const open = openSections.has(s.id)
              return (
                <div key={s.id} id={s.id} style={{
                  background: 'var(--bg1)', border: `1px solid ${open ? c.border : 'var(--border)'}`,
                  borderRadius: '1rem', marginBottom: '1rem', overflow: 'hidden',
                  scrollMarginTop: 'calc(var(--nav-h) + 1rem)',
                  backgroundImage: open ? `linear-gradient(135deg, ${c.bg} 0%, transparent 50%)` : 'none',
                  transition: 'border-color .2s',
                }}>
                  <button onClick={() => toggle(s.id)} style={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem',
                    color: 'var(--text)', textAlign: 'left',
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '.5rem', flexShrink: 0,
                      background: c.num, border: `1px solid ${c.border}`,
                      display: 'grid', placeItems: 'center',
                      fontFamily: 'Cinzel, serif', fontSize: '.65rem', fontWeight: 800, color: c.text,
                    }}>{s.num}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.88rem', fontWeight: 700, letterSpacing: '.03em', marginBottom: '.15rem' }}>{s.title}</p>
                      <p style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{s.subtitle}</p>
                    </div>
                    <ChevronDown size={15} color="var(--muted)" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
                  </button>
                  {open && (
                    <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
                      <div style={{ paddingTop: '1.15rem' }}>{s.content}</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .privacy-grid {
            grid-template-columns: 1fr !important;
          }
          .privacy-toc { display: none !important; }
        }
      `}</style>
    </div>
  )
}
