import React, { useState, useEffect } from 'react'
import { FileText, ChevronDown, Shield, AlertTriangle, Scale, ExternalLink, Snowflake, Calendar, ClipboardList, Globe } from 'lucide-react'

interface Section {
  id: string
  num: string
  title: string
  subtitle: string
  color: 'ice' | 'gold' | 'red' | 'green' | 'purple'
  content: React.ReactNode
}

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

function TocItem({ num, title, active, onClick }: { num: string; title: string; active: boolean; onClick: () => void }) {
  return (
    <li>
      <button onClick={onClick} style={{
        width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '.55rem',
        padding: '.38rem .6rem', borderRadius: '.4rem',
        color: active ? 'var(--text)' : 'var(--muted)',
        background: active ? 'rgba(126,200,227,.08)' : 'transparent',
        transition: 'all .15s',
      }}>
        <span style={{
          fontSize: '.58rem', fontFamily: 'Cinzel, serif', fontWeight: 700,
          minWidth: 20, height: 20, borderRadius: 4, display: 'grid', placeItems: 'center',
          background: active ? 'rgba(126,200,227,.2)' : 'rgba(255,255,255,.05)',
          color: active ? 'var(--ice)' : 'var(--muted)', flexShrink: 0,
        }}>{num}</span>
        <span style={{ fontSize: '.71rem', fontFamily: 'Cinzel, serif', letterSpacing: '.03em', fontWeight: active ? 700 : 500, lineHeight: 1.3 }}>{title}</span>
      </button>
    </li>
  )
}

const sections: Section[] = [
  {
    id: 's1', num: '01', color: 'ice',
    title: 'Binding Agreement',
    subtitle: 'Mandatory — read before joining',
    content: (
      <>
        <div style={{ background: 'rgba(248,113,113,.07)', border: '1px solid rgba(248,113,113,.2)', borderRadius: '.65rem', padding: '1rem 1.1rem', marginBottom: '1rem', display: 'flex', gap: '.7rem' }}>
          <AlertTriangle size={16} color="var(--red)" style={{ flexShrink: 0, marginTop: 2 }} />
          <P><B>By joining The SnowHaven Empire Discord server, accessing this website, or interacting with any TSHE-affiliated platform, you enter into a binding agreement with these Terms.</B> Your presence constitutes acceptance. If you do not agree, leave the server immediately.</P>
        </div>
        <P>These Terms of Service apply to all members, visitors, and entities interacting with TSHE in any capacity. Violations may result in immediate moderation action including warnings, mutes, kicks, bans, or global blacklisting.</P>
        <P>We reserve the right to enforce these terms at our sole discretion. Staff decisions are final.</P>
      </>
    ),
  },
  {
    id: 's2', num: '02', color: 'ice',
    title: 'Scope & Definitions',
    subtitle: 'Key terms used throughout',
    content: (
      <>
        <div style={{ overflowX: 'auto', borderRadius: '.65rem', border: '1px solid var(--border)', marginBottom: '.75rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.79rem' }}>
            <thead><tr style={{ background: 'var(--bg2)' }}>
              {['Term', 'Definition'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '.55rem .9rem', fontFamily: 'Cinzel, serif', fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {[
                ['"The Server"',   'The SnowHaven Empire Discord guild and all affiliated channels, threads, and voice channels.'],
                ['"The Website"',  'This website hosted at tshe.noxxbot.com and all associated subdomains.'],
                ['"TSHE" / "We"',  'The server ownership, administration, and moderation team collectively.'],
                ['"Member" / "You"', 'Any individual who has joined the server, visits the website, or interacts with TSHE-affiliated platforms.'],
                ['"Staff"',        'Any individual holding a moderation, administration, or leadership role within TSHE.'],
                ['"Blacklist"',    'A global prohibition preventing a user or account from accessing any TSHE platform.'],
              ].map(([term, def]) => (
                <tr key={term} style={{ borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                  <td style={{ padding: '.6rem .9rem', color: 'var(--ice)', fontFamily: 'monospace', fontSize: '.75rem', whiteSpace: 'nowrap' }}>{term}</td>
                  <td style={{ padding: '.6rem .9rem', color: 'var(--dim)', lineHeight: 1.6 }}>{def}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 's3', num: '03', color: 'ice',
    title: 'Membership Requirements',
    subtitle: 'Who may join and conditions of membership',
    content: (
      <>
        <Ul items={[
          <><B>Age requirement:</B> You must be 13 years of age or older, or meet the minimum legal age in your region, as required by Discord's Terms of Service.</>,
          <><B>Discord compliance:</B> You must comply with Discord's Terms of Service and Community Guidelines at all times while in the server.</>,
          <><B>One primary account:</B> Each person may maintain one primary account. Alternate accounts used to evade punishments are permanently banned — all linked accounts will be actioned.</>,
          <><B>Account security:</B> You are responsible for all activity from your account. Staff will never ask for your password. Enable 2FA to protect your account.</>,
          <><B>Honest representation:</B> Misrepresenting your age, identity, or intent (including fake ages) may result in a warning or ban.</>,
        ]} />
      </>
    ),
  },
  {
    id: 's4', num: '04', color: 'gold',
    title: 'Community Standards',
    subtitle: 'Conduct required of all members',
    content: (
      <>
        <P>All members are expected to uphold the SnowHaven Codex, which can be read in full on the <a href="/rules" style={{ color: 'var(--ice)' }}>Rules page</a>. By joining the server you agree to these standards. Key obligations include:</P>
        <Ul items={[
          <><B>Respect:</B> Treat all members with courtesy. No bullying, harassment, personal attacks, or hostile behaviour.</>,
          <><B>Safe-for-work:</B> The server is strictly SFW. No explicit, NSFW, or graphic content anywhere.</>,
          <><B>No hate speech:</B> Slurs, discrimination, or hate content of any kind results in immediate permanent removal.</>,
          <><B>No doxxing:</B> Sharing private information about any individual without consent is a zero-tolerance violation.</>,
          <><B>No advertising:</B> Unauthorised promotion of servers, products, or services — including via DM — is prohibited.</>,
          <><B>Active moderation:</B> Server administrators must maintain an active moderation team. Negligent servers may be blacklisted.</>,
        ]} />
      </>
    ),
  },
  {
    id: 's5', num: '05', color: 'red',
    title: 'Forbidden Conduct',
    subtitle: 'Zero-tolerance violations',
    content: (
      <>
        <div style={{ overflowX: 'auto', borderRadius: '.65rem', border: '1px solid rgba(248,113,113,.2)', marginBottom: '.75rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.79rem' }}>
            <thead><tr style={{ background: 'rgba(248,113,113,.07)' }}>
              {['Violation', 'Penalty'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '.55rem .9rem', fontFamily: 'Cinzel, serif', fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--red)', borderBottom: '1px solid rgba(248,113,113,.15)' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {[
                ['Sharing CSAM or exploitation material',      'Permanent ban + reported to Discord T&S and law enforcement'],
                ['Doxxing — sharing private personal info',    'Permanent ban'],
                ['Hate speech or slurs in any form',           'Permanent ban'],
                ['Real-world violence threats',                'Permanent ban'],
                ['Server raiding or coordinating attacks',     'Permanent ban + global blacklist'],
                ['Ban evasion via alternate accounts',         'Permanent ban on all accounts'],
                ['Malware, phishing, or scam links',           'Permanent ban'],
                ['Misuse of the Emergency Staff Ping',         'Permanent ban (no appeal)'],
                ['Staff resignation without notice or handover', 'Permanent ban'],
                ['Harassment of staff or members',             'Permanent ban'],
              ].map(([v, p]) => (
                <tr key={v} style={{ borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                  <td style={{ padding: '.6rem .9rem', color: 'var(--text)', lineHeight: 1.55 }}>{v}</td>
                  <td style={{ padding: '.6rem .9rem', color: 'var(--red)', fontFamily: 'Cinzel, serif', fontSize: '.72rem', whiteSpace: 'nowrap' }}>{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <P>This list is non-exhaustive. Staff may take action on any behaviour deemed harmful or disruptive to the community, even if not explicitly listed above.</P>
      </>
    ),
  },
  {
    id: 's6', num: '06', color: 'red',
    title: 'Termination & Blacklisting',
    subtitle: 'Our right to remove access',
    content: (
      <>
        <div style={{ background: 'rgba(248,113,113,.06)', border: '1px solid rgba(248,113,113,.2)', borderRadius: '.65rem', padding: '1rem 1.1rem', marginBottom: '1rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.75rem', fontWeight: 700, color: 'var(--red)', marginBottom: '.4rem' }}>Unilateral Termination Clause</p>
          <P>We reserve the absolute right to remove, mute, ban, or blacklist any member at any time, for any reason or no reason, with or without evidence, and without prior warning.</P>
        </div>
        <Ul items={[
          'Once blacklisted, members may not appeal for a minimum of 12 months from the date of action.',
          'Abusive, threatening, or repeated appeals extend the blacklist period indefinitely.',
          'Blacklists may extend to any alternate accounts the member subsequently creates.',
          'Staff are not obligated to provide detailed reasoning for moderation actions.',
        ]} />
      </>
    ),
  },
  {
    id: 's7', num: '07', color: 'gold',
    title: 'Appeals Process',
    subtitle: 'How to contest a moderation action',
    content: (
      <>
        <P>If you believe a moderation action was issued in error, you may submit a formal appeal through the official system:</P>
        <div style={{ background: 'rgba(201,168,76,.07)', border: '1px solid rgba(201,168,76,.2)', borderRadius: '.65rem', padding: '1rem 1.25rem', marginBottom: '.85rem', display: 'flex', gap: '.75rem', alignItems: 'center' }}>
          <ExternalLink size={15} color="var(--gold)" style={{ flexShrink: 0 }} />
          <div>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.75rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '.2rem' }}>Official Appeal Portal</p>
            <a href="https://zepp.noxxbot.com/appeals/1466990155020898413" target="_blank" rel="noreferrer" style={{ fontSize: '.8rem', color: 'var(--ice)', textDecoration: 'underline' }}>
              zepp.noxxbot.com/appeals/1466990155020898413
            </a>
          </div>
        </div>
        <Ul items={[
          'Appeals must be submitted calmly and respectfully with all relevant supporting evidence.',
          'You may submit one appeal per incident. Duplicate submissions are ignored.',
          'Do not argue or discuss your appeal publicly in any server channel — this constitutes a further violation.',
          'Staff will review all evidence and communicate their decision. The decision is final.',
          'Warnings may be appealed once per warning via the designated channel or form after the initial action.',
        ]} />
      </>
    ),
  },
  {
    id: 's8', num: '08', color: 'ice',
    title: 'Content Responsibility',
    subtitle: 'Your liability for what you post',
    content: (
      <>
        <P>You are solely responsible for all content, messages, files, and links you post within the server or on the website. By posting content you confirm that:</P>
        <Ul items={[
          'Your content does not violate any applicable law, Discord Terms of Service, or these Terms.',
          'You own or have the necessary rights to share any media, images, or intellectual property you post.',
          'You will not post content that could harm devices, spread malware, or violate third-party rights.',
          'You consent to staff removing any content deemed inappropriate, disruptive, or in violation of these Terms.',
        ]} />
        <P>Content may be stored, logged, or retained for security, moderation, and operational purposes. Staff retain the right to review message history where required for moderation decisions.</P>
      </>
    ),
  },
  {
    id: 's9', num: '09', color: 'purple',
    title: 'Liability Disclaimer',
    subtitle: 'Limitations of our responsibility',
    content: (
      <>
        <P>To the maximum extent permitted by applicable law, The SnowHaven Empire, its ownership, and staff team shall not be liable for any indirect, incidental, or consequential damages arising from your use of or inability to access the server or website.</P>
        <P>The server and website are provided <B>"as-is"</B> without warranty of any kind. We do not warrant that the service will be uninterrupted, error-free, or available at all times. The server may be taken offline for maintenance, security, or any other reason without notice.</P>
        <P>We are not responsible for the conduct of other members, content posted by others, or any interactions that occur outside our platforms.</P>
      </>
    ),
  },
  {
    id: 's10', num: '10', color: 'gold',
    title: 'Modifications',
    subtitle: 'How these terms may change',
    content: (
      <>
        <P>We reserve the right to modify, amend, or replace these Terms of Service at any time. Changes take effect immediately upon being posted to this page. The "Last revised" date at the top will be updated to reflect changes.</P>
        <div style={{ background: 'rgba(201,168,76,.07)', border: '1px solid rgba(201,168,76,.2)', borderRadius: '.65rem', padding: '.9rem 1.1rem', marginBottom: '.75rem' }}>
          <P><B>Your continued participation in the server or use of this website after changes are posted constitutes your acceptance of the revised Terms.</B> If you do not agree with changes, you must leave the server immediately.</P>
        </div>
        <P>Significant changes will be announced in the server's official announcements channel where possible.</P>
      </>
    ),
  },
]

export default function ToS() {
  const [activeSection, setActive] = useState('s1')
  const [openSections, setOpen]    = useState<Set<string>>(new Set(['s1']))

  const toggle = (id: string) => {
    setOpen(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
    setActive(id)
  }

  useEffect(() => {
    const onScroll = () => {
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) setActive(s.id)
        }
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
            background: 'rgba(126,200,227,.08)', border: '1px solid rgba(126,200,227,.2)',
            borderRadius: 99, padding: '.3rem .9rem',
            fontFamily: 'Cinzel, serif', fontSize: '.62rem', letterSpacing: '.12em',
            color: 'var(--ice)', textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            <FileText size={10} /> Legal Document
          </div>
          <h1 style={{
            fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700, letterSpacing: '-.01em', marginBottom: '.6rem',
            background: 'linear-gradient(135deg, var(--ice3), var(--ice), var(--gold))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Terms of Service</h1>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '.75rem' }}>
            {[
              { icon: Calendar,      label: 'Last revised', value: 'March 2026' },
              { icon: ClipboardList, label: 'Sections',     value: '10' },
              { icon: Globe,         label: 'Applies to',   value: 'Server & Website' },
            ].map(m => {
              const MetaIcon = m.icon
              return (
              <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: '.45rem', fontSize: '.75rem', color: 'var(--muted)', fontFamily: 'Cinzel, serif', letterSpacing: '.04em' }}>
                <MetaIcon size={13} color="var(--ice)" /> {m.label}: <span style={{ color: 'var(--dim)', fontWeight: 600 }}>{m.value}</span>
              </div>
              )
            })}
          </div>
        </div>

        {/* Layout */}
        <div className="tos-grid" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'start' }}>

          {/* TOC sidebar */}
          <aside style={{ position: 'sticky', top: 'calc(var(--nav-h) + 1rem)' }} className="tos-toc">
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '.6rem', paddingLeft: '.6rem' }}>On this page</p>
            <ul style={{ listStyle: 'none' }}>
              {sections.map(s => (
                <TocItem key={s.id} num={s.num} title={s.title} active={activeSection === s.id} onClick={() => { document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActive(s.id) }} />
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

            {/* Footer notice */}
            <div style={{ background: 'rgba(126,200,227,.05)', border: '1px solid rgba(126,200,227,.15)', borderRadius: 'var(--radius)', padding: '1.1rem 1.3rem', display: 'flex', gap: '.75rem', alignItems: 'flex-start', marginTop: '.5rem' }}>
              <Scale size={15} color="var(--ice)" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.75rem', fontWeight: 700, marginBottom: '.3rem' }}>Governing Authority</p>
                <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.7 }}>
                  These Terms are governed by the laws applicable to the server ownership's jurisdiction. For support or legal enquiries, contact us via the official{' '}
                  <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer" style={{ color: 'var(--ice)' }}>Discord support server</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .tos-grid {
            grid-template-columns: 1fr !important;
          }
          .tos-toc { display: none !important; }
        }
      `}</style>
    </div>
  )
}
