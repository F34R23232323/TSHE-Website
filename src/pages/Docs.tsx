import React, { useState } from 'react'
import { FileText, BookMarked, ClipboardList, Users, ChevronRight, Snowflake, Globe, User, Scale, Bot, MessageCircle } from 'lucide-react'
import { getDefinitions, getReport } from '../data/store'
import { useScrollReveal } from '../hooks/useScrollReveal'

const tabs = [
  { id: 'definitions', label: 'Key Definitions', icon: BookMarked },
  { id: 'report',      label: 'Report Guide',    icon: ClipboardList },
  { id: 'modnotes',    label: 'Mod Notes',        icon: Users },
  { id: 'info',        label: 'Basic Info',       icon: FileText },
]

const tierColors: Record<string, string> = {
  'Tier 2 — Mute':        'var(--gold)',
  'Tier 4 — Ban':         'var(--red)',
  'Tier 5 — Permanent Ban': '#f87171',
  'Tier 3–5':             '#fb923c',
  'Tier 1–2':             '#4ade80',
  'Tier 2-3':             '#facc15',
  'Tier 2-4':             '#fb923c',
  'Tier 2-5':             '#ef4444',
  'Tier 3-4':             '#fb923c',
  'Tier 4-5':             '#f87171',
  'Tier 4-5 Ban':         'var(--red)',
  'Tier 5 Permanent Ban': '#dc2626',
  'Tier 3–5 depending on context': '#fb923c',
  'Tier 2 — Mute / Tier 3 escalation if persistent': '#facc15',
}

export default function Docs() {
  useScrollReveal()
  const definitions = getDefinitions()
  const reportGuide = getReport()
  const [tab, setTab] = useState('definitions')

  return (
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <div data-reveal style={{
          display: 'inline-flex', alignItems: 'center', gap: '.5rem',
          background: 'rgba(126,200,227,.08)', border: '1px solid rgba(126,200,227,.2)',
          borderRadius: 99, padding: '.3rem .9rem',
          fontFamily: 'var(--display)', fontSize: '.62rem', letterSpacing: '.12em',
          color: 'var(--ice)', textTransform: 'uppercase', marginBottom: '1rem',
        }}>
          <FileText size={10} /> Documentation
        </div>
        <h1 data-reveal data-delay="1" style={{
          fontFamily: 'var(--display2)', fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700, letterSpacing: '-.02em', marginBottom: '.75rem',
          background: 'linear-gradient(135deg, var(--ice3), var(--ice))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Server Documentation
        </h1>
        <p data-reveal data-delay="2" style={{ fontSize: '.88rem', color: 'var(--dim)', maxWidth: 540, margin: '0 auto' }}>
          Definitions, report procedures, moderator notes, and basic server information.
        </p>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '2rem', background: 'var(--bg2)', padding: '.35rem', borderRadius: '.7rem', border: '1px solid var(--border)' }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, minWidth: 120,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem',
            fontFamily: 'var(--display)', fontSize: '.68rem', letterSpacing: '.07em', fontWeight: 700,
            cursor: 'pointer', padding: '.5rem .75rem', borderRadius: '.5rem',
            background: tab === id ? 'var(--bg4)' : 'transparent',
            border: `1px solid ${tab === id ? 'rgba(126,200,227,.2)' : 'transparent'}`,
            color: tab === id ? 'var(--ice2)' : 'var(--muted)',
            transition: 'all .15s',
          }}>
            <Icon size={12} /> {label}
          </button>
        ))}
      </div>

      {/* Definitions */}
      {tab === 'definitions' && (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {definitions.map(d => {
              const tcolor = tierColors[d.tier] || 'var(--ice)'
              return (
                <div key={d.term} style={{
                  background: 'var(--bg1)', border: '1px solid var(--border)',
                  borderRadius: '.75rem', padding: '1.1rem 1.25rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '.75rem', marginBottom: '.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--display)', fontSize: '.85rem', fontWeight: 700, color: 'var(--text)' }}>{d.term}</h3>
                    <span style={{
                      fontSize: '.6rem', fontFamily: 'var(--display)', letterSpacing: '.06em',
                      padding: '2px 8px', borderRadius: 4, whiteSpace: 'nowrap',
                      background: tcolor + '15', border: `1px solid ${tcolor}35`, color: tcolor,
                    }}>{d.tier}</span>
                  </div>
                  <p style={{ fontSize: '.79rem', color: 'var(--dim)', lineHeight: 1.7 }}>{d.meaning}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Report Guide */}
      {tab === 'report' && (
        <div>
          <div style={{ background: 'rgba(126,200,227,.06)', border: '1px solid rgba(126,200,227,.2)', borderRadius: 'var(--radius)', padding: '1.1rem 1.25rem', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '.82rem', color: 'var(--dim)', lineHeight: 1.7 }}>
              Always provide evidence when reporting. Follow the escalation procedures and use proper channels — do not confront rule-breakers publicly.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {reportGuide.map(step => (
              <div key={step.step} style={{
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                background: 'var(--bg1)', border: '1px solid var(--border)',
                borderRadius: '.75rem', padding: '1.25rem',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                  background: 'linear-gradient(135deg, rgba(126,200,227,.3), rgba(201,168,76,.2))',
                  border: '1px solid rgba(126,200,227,.3)',
                  display: 'grid', placeItems: 'center',
                  fontFamily: 'var(--display)', fontSize: '.75rem', fontWeight: 800, color: 'var(--ice2)',
                }}>{step.step}</div>
                <div>
                  <h3 style={{ fontFamily: 'var(--display)', fontSize: '.85rem', fontWeight: 700, marginBottom: '.4rem' }}>{step.title}</h3>
                  <p style={{ fontSize: '.79rem', color: 'var(--dim)', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mod Notes */}
      {tab === 'modnotes' && (
        <div>
          <div style={{ background: 'rgba(201,168,76,.06)', border: '1px solid rgba(201,168,76,.2)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '.65rem', alignItems: 'flex-start' }}>
            <Users size={15} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--gold)' }}>Staff only.</strong> This section is for moderator guidance and escalation procedures. Members should not act on these notes.
            </p>
          </div>
          {[
            { section: 'M1 — Enforcement Principles', items: ['Every moderation action is logged and reviewable by senior staff at any time', 'Intent does not reduce penalties — jokes, irony, and accidents are treated identically to deliberate violations', 'History always compounds severity — prior infractions are reviewed on every new case without exception', 'Loophole attempts maximise the applicable penalty and add an additional warning', 'Staff may act on any harmful or disruptive behaviour not explicitly listed in the rules'] },
            { section: 'M2 — Warning System', items: ['Warnings are permanent and never expire — no resets, no clean slates', 'Your full moderation history is visible to all staff on every case', 'Staff may issue multiple warnings in a single incident when multiple rules are violated', 'Severity may cause staff to skip tiers and apply a higher warning count directly — always documented', 'Alternate account warnings are merged onto the primary account\'s record'] },
            { section: 'M3 — Punishment Ladder', items: ['Tier 1: Minor infractions, deletion, 1–5m timeout', 'Tier 2: Formal Warning — permanent record, DM sent', 'Tier 3: Temporary Mute (30m–24h) — removal from participation', 'Tier 4: Temporary Ban (1–30d) — severe misconduct', 'Tier 5: Permanent Ban — zero-tolerance or sustained disregard after all tiers exhausted'] },
            { section: 'M4 — Evidence Standards', items: ['All actions must be documented with clear reasoning in the case note', 'Screenshots, message links, or user IDs are required for external platform reports', 'AI moderation flags are for review only — they do not result in punishment without staff confirmation', 'Appeal evidence must be verifiable — screenshots can be falsified; context and corroboration matter'] },
            { section: 'M5 — Appeals & Review', items: ['Appeals reviewed by staff not involved in the original action', 'Public complaints, DM pressure, and proxy campaigns are disregarded and result in escalation', 'Appeals for hate speech, CSAM, doxxing, real-world threats, malware, and advertising are never accepted', 'Hostile or accusatory appeals denied immediately without review'] },
            { section: 'M6 — AutoMod & AI Handling', items: ['Monitor automod actions for false positives', 'AI moderation flags require human confirmation before action', 'Adjust filters carefully to avoid over-penalizing users', 'Report recurring malfunctions to senior staff immediately'] },
            { section: 'M7 — Staff Conduct', items: ['Staff who misuse moderation tools are subject to internal disciplinary review by the server owner', 'No staff member is above the rules — any staff can be actioned if community safety requires it', 'When in doubt, escalate — do not guess on serious cases', 'Preemptive actions are permitted to protect the community and are reviewable via appeal only'] },
          ].map(s => (
            <div key={s.section} style={{ background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '.75rem', padding: '1.1rem 1.25rem', marginBottom: '.75rem' }}>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '.82rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '.6rem' }}>{s.section}</h3>
              {s.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '.5rem', alignItems: 'flex-start', marginBottom: i < s.items.length - 1 ? '.35rem' : 0 }}>
                  <ChevronRight size={13} color="var(--muted)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.65 }}>{item}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Basic Info */}
      {tab === 'info' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { title: 'Server Name', value: 'The SnowHaven Empire (TSHE)', icon: Snowflake },
              { title: 'Community', value: 'Safe, SFW, English-first', icon: Globe },
              { title: 'Age Requirement', value: '13+ (Discord TOS minimum)', icon: User },
              { title: 'Appeal System', value: 'zepp.noxxbot.com/appeals/1466990155020898413', icon: Scale, link: 'https://zepp.noxxbot.com/appeals/1466990155020898413' },
              { title: 'AutoMod Bot', value: 'Active — see AutoMod page for limits', icon: Bot },
              { title: 'Join Server', value: 'discord.gg/DeSrm3WNmk', icon: MessageCircle, link: 'https://discord.gg/DeSrm3WNmk' },
            ].map(card => {
              const CardIcon = card.icon
              return (
              <div key={card.title} style={{ background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '.75rem', padding: '1.1rem 1.25rem' }}>
                <p style={{ marginBottom: '.4rem', color: 'var(--ice)' }}><CardIcon size={18} /></p>
                <p style={{ fontFamily: 'var(--display)', fontSize: '.72rem', color: 'var(--muted)', letterSpacing: '.07em', marginBottom: '.3rem' }}>{card.title}</p>
                {card.link
                  ? <a href={card.link} target="_blank" rel="noreferrer" style={{ fontSize: '.8rem', color: 'var(--ice)', textDecoration: 'underline' }}>{card.value}</a>
                  : <p style={{ fontSize: '.8rem', color: 'var(--text)' }}>{card.value}</p>
                }
              </div>
              )
            })}
          </div>
          <div style={{ background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '.75rem', padding: '1.25rem' }}>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: '.85rem', fontWeight: 700, marginBottom: '.85rem' }}>Quick Guidelines</h3>
            {[
              'English is required in general channels. Use designated channels for other languages.',
              'All content must be SFW (Safe for Work) — no explicit material anywhere, no exceptions.',
              'Use the ticket system or report channel to notify staff — do not DM directly about moderation.',
              'Warnings are permanent and never expire. Major offences bypass the warning system entirely.',
              'Always provide evidence when reporting a member. Without verifiable evidence, staff cannot act.',
              'Staff decisions are final. Appeals go through zepp.noxxbot.com/appeals/1466990155020898413 only.',
            ].map((g, i) => (
              <div key={i} style={{ display: 'flex', gap: '.55rem', alignItems: 'flex-start', marginBottom: '.45rem' }}>
                <ChevronRight size={13} color="var(--ice)" style={{ flexShrink: 0, marginTop: 3 }} />
                <p style={{ fontSize: '.79rem', color: 'var(--dim)', lineHeight: 1.7 }}>{g}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
