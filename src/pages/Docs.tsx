import React, { useState } from 'react'
import { FileText, BookMarked, ClipboardList, Users, Snowflake, Globe, User, Scale, Bot, MessageCircle, ChevronRight, Shield, Zap, AlertTriangle, Activity, LogIn, Megaphone, Lock, Wrench } from 'lucide-react'
import { getDefinitions, getReport } from '../data/store'
import { useScrollReveal } from '../hooks/useScrollReveal'

const tabs = [
  { id: 'definitions',   label: 'Key Definitions',    icon: BookMarked },
  { id: 'report',        label: 'Report Guide',       icon: ClipboardList },
  { id: 'modnotes',      label: 'Mod Notes',           icon: Users },
  { id: 'staff-levels',  label: 'Staff Levels',        icon: Shield },
  { id: 'aegis-commands',label: 'Aegis Commands',      icon: Bot },
  { id: 'automod-config',label: 'AutoMod Engine',      icon: AlertTriangle },
  { id: 'logs',          label: 'Logging System',       icon: Activity },
  { id: 'join-guard',    label: 'Join Guard',           icon: Lock },
  { id: 'welcome',       label: 'Welcome & Leave',     icon: Megaphone },
  { id: 'info',          label: 'Basic Info',           icon: FileText },
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
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <div data-reveal style={{
          display: 'inline-flex', alignItems: 'center', gap: '.5rem',
          background: 'rgba(200,30,50,.08)', border: '1px solid rgba(200,30,50,.2)',
          borderRadius: 99, padding: '.3rem .9rem',
          fontFamily: 'var(--font)', fontSize: '.62rem', letterSpacing: '.12em',
          color: 'var(--red2)', textTransform: 'uppercase', marginBottom: '1rem',
        }}>
          <FileText size={10} /> Documentation
        </div>
        <h1 data-reveal data-delay="1" style={{
          fontFamily: 'var(--font)', fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700, letterSpacing: '-.02em', marginBottom: '.75rem',
          background: 'linear-gradient(135deg, var(--gold2), var(--red2))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Server Documentation
        </h1>
        <p data-reveal data-delay="2" style={{ fontSize: '.88rem', color: 'var(--dim)', maxWidth: 560, margin: '0 auto' }}>
          Complete reference covering rules, staff systems, Aegis bot configuration, AutoMod rules, logging, and server infrastructure.
        </p>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '.3rem', flexWrap: 'wrap', marginBottom: '2rem', background: 'var(--bg2)', padding: '.3rem', borderRadius: '.7rem', border: '1px solid var(--border)' }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.35rem',
            fontFamily: 'var(--font)', fontSize: '.62rem', letterSpacing: '.06em', fontWeight: 700,
            cursor: 'pointer', padding: '.4rem .65rem', borderRadius: '.5rem',
            background: tab === id ? 'var(--bg4)' : 'transparent',
            border: `1px solid ${tab === id ? 'rgba(200,30,50,.2)' : 'transparent'}`,
            color: tab === id ? 'var(--red2)' : 'var(--muted)',
            transition: 'all .15s', flex: '1 1 auto', minWidth: 80,
          }}>
            <Icon size={11} /> {label}
          </button>
        ))}
      </div>

      {/* Definitions */}
      {tab === 'definitions' && (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {definitions.map(d => {
              const tcolor = tierColors[d.tier] || 'var(--red2)'
              return (
                <div key={d.term} style={{
                  background: 'var(--bg1)', border: '1px solid var(--border)',
                  borderRadius: '.75rem', padding: '1.1rem 1.25rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '.75rem', marginBottom: '.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font)', fontSize: '.85rem', fontWeight: 700, color: 'var(--text)' }}>{d.term}</h3>
                    <span style={{
                      fontSize: '.6rem', fontFamily: 'var(--font)', letterSpacing: '.06em',
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
          <div style={{ background: 'rgba(200,30,50,.06)', border: '1px solid rgba(200,30,50,.2)', borderRadius: 'var(--radius)', padding: '1.1rem 1.25rem', marginBottom: '1.5rem' }}>
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
                  background: 'linear-gradient(135deg, rgba(200,30,50,.3), rgba(201,168,76,.2))',
                  border: '1px solid rgba(200,30,50,.3)',
                  display: 'grid', placeItems: 'center',
                  fontFamily: 'var(--font)', fontSize: '.75rem', fontWeight: 800, color: 'var(--red2)',
                }}>{step.step}</div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font)', fontSize: '.85rem', fontWeight: 700, marginBottom: '.4rem' }}>{step.title}</h3>
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
              <strong style={{ color: 'var(--gold)' }}>Staff only.</strong> This section is for moderator guidance and escalation procedures.
            </p>
          </div>
          {[
            { section: 'M1 — Enforcement Principles', items: ['Every moderation action is logged and reviewable by senior staff at any time', 'Intent does not reduce penalties — jokes, irony, and accidents are treated identically to deliberate violations', 'History always compounds severity — prior infractions are reviewed on every new case without exception', 'Loophole attempts maximise the applicable penalty and add an additional warning', 'Staff may act on any harmful or disruptive behaviour not explicitly listed'] },
            { section: 'M2 — Warning System', items: ['Warnings are permanent and never expire — no resets, no clean slates', 'Full moderation history is visible to all staff on every case', 'Staff may issue multiple warnings in a single incident when multiple rules are violated', 'Severity may cause staff to skip tiers — always documented', 'Alternate account warnings are merged onto the primary account\'s record'] },
            { section: 'M3 — Punishment Ladder', items: ['Tier 1: Minor infractions, deletion, 1–5m timeout', 'Tier 2: Formal Warning — permanent record', 'Tier 3: Temporary Mute (30m–24h)', 'Tier 4: Temporary Ban (1–30d)', 'Tier 5: Permanent Ban — zero-tolerance'] },
            { section: 'M4 — Evidence Standards', items: ['All actions must be documented with clear reasoning', 'Screenshots, message links, or user IDs required for external reports', 'AI moderation flags are for review only — human confirmation required', 'Appeal evidence must be verifiable'] },
            { section: 'M5 — Appeals & Review', items: ['Appeals reviewed by staff not involved in original action', 'Public complaints and DM pressure are disregarded and result in escalation', 'Appeals for hate speech, CSAM, doxxing, threats, malware, and advertising are never accepted', 'Hostile or accusatory appeals denied immediately'] },
            { section: 'M6 — AutoMod & AI Handling', items: ['Monitor automod actions for false positives', 'AI moderation flags require human confirmation before action', 'Adjust filters carefully to avoid over-penalizing users', 'Report recurring malfunctions to senior staff immediately'] },
            { section: 'M7 — Staff Conduct', items: ['Staff who misuse moderation tools are subject to internal disciplinary review', 'No staff member is above the rules', 'When in doubt, escalate — do not guess on serious cases', 'Preemptive actions are permitted to protect the community'] },
          ].map(s => (
            <div key={s.section} style={{ background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '.75rem', padding: '1.1rem 1.25rem', marginBottom: '.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font)', fontSize: '.82rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '.6rem' }}>{s.section}</h3>
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

      {/* Staff Levels & Permissions (from zepp.yml) */}
      {tab === 'staff-levels' && (
        <div>
          <div style={{ background: 'rgba(77,171,247,.06)', border: '1px solid rgba(77,171,247,.2)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '.65rem', alignItems: 'flex-start' }}>
            <Shield size={15} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--blue)' }}>Aegis permission system.</strong> Permissions are granted by cumulative level thresholds. Higher levels inherit all permissions from lower levels.
            </p>
          </div>

          {/* Level chart */}
          <div style={{ background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '.75rem', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
              <h2 style={{ fontFamily: 'var(--font)', fontSize: '.85rem', fontWeight: 700 }}>Staff Level Chart</h2>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="ruletable">
                <thead>
                  <tr>
                    <th>Level</th>
                    <th>Role</th>
                    <th>Key Permissions Unlocked</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ color: '#f87171', fontWeight: 700 }}>100</td><td style={{ fontWeight: 600 }}>Co-Founder / Owner</td><td>Full bypass of all AutoMod (except CSAM). All permissions. Reload guild, use source, ping everyone/here. Manage appeals.</td></tr>
                  <tr><td style={{ color: '#f57c00', fontWeight: 700 }}>95</td><td style={{ fontWeight: 600 }}>Head Administrator</td><td>All admin permissions. Full bot access. Highest authority below Owners.</td></tr>
                  <tr><td style={{ color: '#f57c00', fontWeight: 700 }}>90</td><td style={{ fontWeight: 600 }}>Senior Administrator</td><td>All admin permissions. Near-unrestricted server access.</td></tr>
                  <tr><td style={{ color: '#f87171', fontWeight: 700 }}>85</td><td style={{ fontWeight: 600 }}>Administrator</td><td>All moderation tools. Manage channels and roles.</td></tr>
                  <tr><td style={{ color: '#f57c00', fontWeight: 700 }}>80</td><td style={{ fontWeight: 600 }}>Junior Administrator</td><td>Mass actions (massban, massmute, massunban). Hide/delete cases. Act as other moderator. Lock all channels. View & handle appeals.</td></tr>
                  <tr><td style={{ color: '#5865f2', fontWeight: 700 }}>75</td><td style={{ fontWeight: 600 }}>Operations Manager</td><td>Bot configuration, website admin, infrastructure management. Full utility commands.</td></tr>
                  <tr><td style={{ color: '#5865f2', fontWeight: 700 }}>70</td><td style={{ fontWeight: 600 }}>Community Manager</td><td>Event management, channel structure. Basic moderation tools.</td></tr>
                  <tr><td style={{ color: '#5865f2', fontWeight: 700 }}>65</td><td style={{ fontWeight: 600 }}>Staff Coordinator</td><td>Staff performance, recruitment, and training. Basic moderation.</td></tr>
                  <tr><td style={{ color: '#60a5fa', fontWeight: 700 }}>60</td><td style={{ fontWeight: 600 }}>Head Moderator</td><td>Full moderation. Ban and unban. Lock channels. Review appeal submissions.</td></tr>
                  <tr><td style={{ color: '#34d399', fontWeight: 700 }}>50</td><td style={{ fontWeight: 600 }}>Moderator</td><td>Full moderation. Ban (permanents need Head Mod+). Lock/unlock channels. View & handle user reports.</td></tr>
                  <tr><td style={{ color: '#34d399', fontWeight: 700 }}>40</td><td style={{ fontWeight: 600 }}>Junior Moderator</td><td>Warn, mute, kick, note, view cases. Access to utility commands. First moderation tier.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Permission breakdown */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font)', fontSize: '.85rem', fontWeight: 700, marginBottom: '.75rem' }}>Permission Breakdown by Level</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
              {[
                { level: '40+', color: '#34d399', perms: 'Notes, warns, mutes, kicks, bans. Server info utility (search, clean, userinfo, roleinfo, channelinfo, emojiinfo, snowflake, nickname, avatar, jumbo, context, about). Voice move/kick. Mute list viewing. Appeal viewing & handling.' },
                { level: '50+', color: '#34d399', perms: 'Channel lock & lock status. Sticky messages. Can handle and view user reports.' },
                { level: '80+', color: '#f57c00', perms: 'Mass ban, mass unban, mass mute, mass punish. Hide/delete cases. Act as other moderator. Clear warnings. Lock all channels. Reload guild, ping, source. Appeal form management.' },
                { level: '100', color: '#f87171', perms: 'Complete bypass of all AutoMod rules except CSAM detection. Full configuration access. All commands unrestricted.' },
              ].map(l => (
                <div key={l.level} className="card" style={{ padding: '.9rem 1.1rem', borderLeft: `3px solid ${l.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.35rem' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '.82rem', fontWeight: 800, color: l.color }}>{l.level}</span>
                    <Shield size={14} color={l.color} />
                  </div>
                  <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.7 }}>{l.perms}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Archive & appeals */}
          <div className="card" style={{ padding: '1rem 1.25rem', borderLeft: '3px solid var(--gold)' }}>
            <h3 style={{ fontFamily: 'var(--font)', fontSize: '.82rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '.5rem' }}>Archive & Appeals Access</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem' }}>
                <ChevronRight size={13} color="var(--gold)" style={{ flexShrink: 0, marginTop: 3 }} />
                <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.65 }}><strong style={{ color: 'var(--text)' }}>Level 50+</strong> — Archive access (case log retrieval from Aegis database).</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem' }}>
                <ChevronRight size={13} color="var(--gold)" style={{ flexShrink: 0, marginTop: 3 }} />
                <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.65 }}><strong style={{ color: 'var(--text)' }}>Level 40+</strong> — Can view and handle appeal submissions.</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem' }}>
                <ChevronRight size={13} color="var(--gold)" style={{ flexShrink: 0, marginTop: 3 }} />
                <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.65 }}><strong style={{ color: 'var(--text)' }}>Level 80+</strong> — Can manage appeal forms (create, edit, delete).</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem' }}>
                <ChevronRight size={13} color="var(--gold)" style={{ flexShrink: 0, marginTop: 3 }} />
                <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.65 }}><strong style={{ color: 'var(--text)' }}>Appeal cooldown:</strong> 1 hour between submissions for all members.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Aegis Commands (from zepp.yml tags) */}
      {tab === 'aegis-commands' && (
        <div>
          <div style={{ background: 'rgba(88,101,242,.06)', border: '1px solid rgba(88,101,242,.2)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '.65rem', alignItems: 'flex-start' }}>
            <Bot size={15} color="#5865f2" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.7 }}>
              <strong style={{ color: '#5865f2' }}>Aegis (Zepp) is TSHE's custom moderation bot.</strong> Commands are accessed through multiple prefixes and the <code style={{ fontFamily: 'var(--mono)', background: 'var(--bg3)', padding: '1px 5px', borderRadius: 3, fontSize: '.75rem' }}>!!</code> tag system. Below is a complete reference.
            </p>
          </div>

          {/* Tags */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font)', fontSize: '.85rem', fontWeight: 700, marginBottom: '.75rem' }}>Tags (prefix: <code style={{ fontFamily: 'var(--mono)', background: 'var(--bg3)', padding: '2px 6px', borderRadius: 3 }}>!!</code>)</h3>
            <p style={{ fontSize: '.78rem', color: 'var(--muted)', marginBottom: '.75rem' }}>Available to all members. Some have cooldowns. Auto-deletes command message after use.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '.5rem' }}>
              {[
                { tag: '!!rules', desc: 'Displays the server rules with a link to the rules channel. Cooldown: 2 minutes.' },
                { tag: '!!appeal', desc: 'Explains the appeal process and links to the official appeal portal. Cooldown: 3 minutes.' },
                { tag: '!!staff', desc: 'Lists the staff team and instructions for contacting staff. Cooldown: 5 minutes.' },
                { tag: '!!roles', desc: 'Shows available self-assignable roles and how to get them. Cooldown: 2 minutes.' },
                { tag: '!!ticket', desc: 'Explains how to open a support ticket and what tickets are/aren\'t for. Cooldown: 3 minutes.' },
                { tag: '!!complaint_guidelines', desc: 'Full complaint system guidelines — valid reasons, what to include, confidentiality, rules. Cooldown: 5 minutes.' },
              ].map(t => (
                <div key={t.tag} className="card" style={{ padding: '.85rem 1rem' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '.78rem', fontWeight: 700, color: '#5865f2', marginBottom: '.3rem' }}>{t.tag}</p>
                  <p style={{ fontSize: '.74rem', color: 'var(--dim)', lineHeight: 1.55 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Moderation commands */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font)', fontSize: '.85rem', fontWeight: 700, marginBottom: '.75rem' }}>Moderation Commands (prefix: <code style={{ fontFamily: 'var(--mono)', background: 'var(--bg3)', padding: '2px 6px', borderRadius: 3 }}>!</code>)</h3>
            <p style={{ fontSize: '.78rem', color: 'var(--muted)', marginBottom: '.75rem' }}>Level-gated. All moderation actions are logged and create permanent cases.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '.5rem' }}>
              {[
                { level: '40+', commands: '!note, !warn, !mute, !kick, !ban, !unban, !cases, !addcase' },
                { level: '50+', commands: '!lock, !lockstatus, !stick, !unstick' },
                { level: '80+', commands: '!lockall, !massban, !massmute, !massunban, !masspunish, !hidecase, !deletecase, !act_as, !clearwarn' },
              ].map(c => (
                <div key={c.level} className="card" style={{ padding: '.85rem 1rem', borderLeft: `3px solid ${c.level === '80+' ? '#f57c00' : c.level === '50+' ? '#60a5fa' : '#34d399'}` }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', fontWeight: 700, color: c.level === '80+' ? '#f57c00' : c.level === '50+' ? '#60a5fa' : '#34d399', marginBottom: '.3rem' }}>Level {c.level}</p>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--dim)', lineHeight: 1.65 }}>{c.commands}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Utility commands */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font)', fontSize: '.85rem', fontWeight: 700, marginBottom: '.75rem' }}>Utility Commands</h3>
            <div className="card" style={{ padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', fontSize: '.76rem', color: 'var(--dim)', fontFamily: 'var(--mono)' }}>
                  <span><strong style={{ color: 'var(--text)' }}>Everyone:</strong> !help, !avatar</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', fontSize: '.76rem', color: 'var(--dim)', fontFamily: 'var(--mono)' }}>
                  <span><strong style={{ color: '#34d399' }}>Level 40+:</strong> !roles, !search, !clean, !info, !server, !inviteinfo, !channelinfo, !messageinfo, !userinfo, !roleinfo, !emojiinfo, !snowflake, !nickname, !context, !jumbo, !avatar, !about, !lookup, !quote, !purge_until, !vcmove, !vckick</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', fontSize: '.76rem', color: 'var(--dim)', fontFamily: 'var(--mono)' }}>
                  <span><strong style={{ color: '#f57c00' }}>Level 80+:</strong> !reload_guild, !ping, !source</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency ping & lock system */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font)', fontSize: '.85rem', fontWeight: 700, marginBottom: '.75rem' }}>Emergency & Lock Systems</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '.6rem' }}>
              <div className="card" style={{ padding: '.9rem 1.1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.4rem' }}>
                  <Megaphone size={15} color="var(--red)" />
                  <h4 style={{ fontSize: '.82rem', fontWeight: 700 }}>Emergency Ping</h4>
                </div>
                <p style={{ fontSize: '.76rem', color: 'var(--dim)', lineHeight: 1.6 }}>
                  Pings all staff simultaneously. Requires specific mod role to use. 10-minute cooldown. Misuse = permanent ban.
                </p>
              </div>
              <div className="card" style={{ padding: '.9rem 1.1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.4rem' }}>
                  <Lock size={15} color="var(--gold)" />
                  <h4 style={{ fontSize: '.82rem', fontWeight: 700 }}>Channel Lock</h4>
                </div>
                <p style={{ fontSize: '.76rem', color: 'var(--dim)', lineHeight: 1.6 }}>
                  Lock individual channels (Level 50+) or all configured channels at once (Level 80+). 10 lockall channels pre-configured. Lock/unlock messages embed in the channel.
                </p>
              </div>
              <div className="card" style={{ padding: '.9rem 1.1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.4rem' }}>
                  <Activity size={15} color="var(--blue)" />
                  <h4 style={{ fontSize: '.82rem', fontWeight: 700 }}>Auto Slowmode</h4>
                </div>
                <p style={{ fontSize: '.76rem', color: 'var(--dim)', lineHeight: 1.6 }}>
                  Triggers when 10+ messages are sent in 5 seconds. Sets 15-second slowmode. 60-second cooldown. Logs to staff channel.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AutoMod Engine (from zepp.yml automod config) */}
      {tab === 'automod-config' && (
        <div>
          <div style={{ background: 'rgba(224,49,49,.06)', border: '1px solid rgba(224,49,49,.2)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '.65rem', alignItems: 'flex-start' }}>
            <AlertTriangle size={15} color="var(--red)" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--red2)' }}>Aegis AutoMod</strong> is the engine behind the 30+ rules shown on the AutoMod page. This is how the bot is configured to detect and handle violations. Rules use keyword matching, regex patterns, and escalation logic.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font)', fontSize: '.85rem', fontWeight: 700, marginBottom: '.75rem' }}>Rule Categories & Detection</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
              {[
                { name: 'Content Filter', rules: 'NSFW Words, NSFW Links, Slurs, CSAM / Exploitation, Threats of Violence, Suicide Encouragement, Drug Solicitation, Gore & Shock Content, Swearing Filter, Severe Language', methods: 'Keyword matching (80+ terms in NSFW list), regex patterns for URLs, slur variations, and bypass attempts. Case-insensitive with normalisation and loose matching for disguised terms.' },
                { name: 'Security', rules: 'Scam Links, IP Address Detection, Personal/Financial Data, Doxxing Detection, Malware & Token Grabbers, Raid Coordination, Phishing & Credential Theft', methods: 'Regex patterns for IP addresses (v4 and v6), credit card numbers, SSNs, bank routing numbers. Domain blocklists for scam and phishing sites. Keyword matching for malware and raid terms.' },
                { name: 'Anti-Spam', rules: 'Mass Ping, Message Spam, Emoji Spam, Link Restriction (<Level 20), Copypasta Detection, Zalgo/Unicode Abuse, Duplicate Message, Large Text/Markdown Headers', methods: 'Frequency-based detection (5+ messages in 3s), mention count thresholds, emoji count limits, Unicode combining character detection, duplicate content matching.' },
                { name: 'Behavior', rules: 'Nitro Begging, Staff Application Spam', methods: 'Keyword and regex matching for common spam patterns and begging phrases.' },
                { name: 'Meta', rules: 'Dehoist, English Only, Block Non-Staff Polls', methods: 'Nickname scanning for dehoist characters, language detection (non-English threshold: 0.2), poll creation detection.' },
              ].map(c => (
                <div key={c.name} className="card" style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.5rem' }}>
                    <Shield size={15} color="var(--red)" />
                    <h4 style={{ fontSize: '.82rem', fontWeight: 700 }}>{c.name}</h4>
                  </div>
                  <p style={{ fontSize: '.74rem', color: 'var(--muted)', marginBottom: '.35rem', fontStyle: 'italic' }}>{c.rules}</p>
                  <p style={{ fontSize: '.76rem', color: 'var(--dim)', lineHeight: 1.65 }}>{c.methods}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Global bypass */}
          <div className="card" style={{ padding: '1rem 1.25rem', borderLeft: '3px solid var(--gold)', marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font)', fontSize: '.82rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '.5rem' }}>Global AutoMod Bypass</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem' }}>
                <ChevronRight size={13} color="var(--gold)" style={{ flexShrink: 0, marginTop: 3 }} />
                <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.65 }}><strong style={{ color: 'var(--text)' }}>Ignored Categories:</strong> 8 category IDs are excluded from all AutoMod scanning (admin/staff-only categories).</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem' }}>
                <ChevronRight size={13} color="var(--gold)" style={{ flexShrink: 0, marginTop: 3 }} />
                <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.65 }}><strong style={{ color: 'var(--text)' }}>Ignored Role:</strong> One role (Level 100) bypasses all rules globally — except for CSAM detection, which no role can bypass.</p>
              </div>
            </div>
          </div>

          {/* Case system */}
          <div className="card" style={{ padding: '1rem 1.25rem', borderLeft: '3px solid var(--blue)' }}>
            <h3 style={{ fontFamily: 'var(--font)', fontSize: '.82rem', fontWeight: 700, color: 'var(--blue)', marginBottom: '.5rem' }}>Case System</h3>
            <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.7, marginBottom: '.5rem' }}>
              All moderation actions create permanent cases in Aegis with unique case numbers. Cases are logged to a dedicated channel and include moderator info, reason, proof links, and timestamps.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[
                { type: 'Warn', color: 'var(--gold)', icon: '⚠️' },
                { type: 'Ban', color: 'var(--red)', icon: '🔨' },
                { type: 'Unban', color: 'var(--green)', icon: '✅' },
                { type: 'Note', color: 'var(--dim)', icon: '📝' },
                { type: 'Kick', color: '#f59e0b', icon: '👢' },
                { type: 'Mute', color: 'var(--red)', icon: '🔇' },
                { type: 'Unmute', color: 'var(--green)', icon: '✅' },
                { type: 'Softban', color: 'var(--red)', icon: '👢' },
              ].map(c => (
                <span key={c.type} className="badge" style={{ background: c.color + '15', color: c.color, border: `1px solid ${c.color}30` }}>
                  {c.icon} {c.type}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Logging System */}
      {tab === 'logs' && (
        <div>
          <div style={{ background: 'rgba(55,178,77,.06)', border: '1px solid rgba(55,178,77,.2)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '.65rem', alignItems: 'flex-start' }}>
            <Activity size={15} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--green)' }}>Aegis logs</strong> all server events to 12+ dedicated logging channels. Each channel receives a specific category of events. All logs include embed timestamps. User mentions are disabled in log embeds.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {[
              { channel: 'Message Edit Logs', events: 'Message edits — tracks before/after content, author, and channel.' },
              { channel: 'Message Delete Logs', events: 'Single message deletions — tracks deleted content, author, channel, and deleter (if known).' },
              { channel: 'Bulk Delete Logs', events: 'Bulk message deletions — triggers on message delete bulk events.' },
              { channel: 'Voice Channel Logs', events: 'Voice channel join, leave, and move events for all members.' },
              { channel: 'Role Change Logs', events: 'Member role add, remove, and all role changes — tracks which roles changed and who made the change.' },
              { channel: 'Name Change Logs', events: 'Nickname changes and username changes — tracks old and new values.' },
              { channel: 'Avatar Change Logs', events: 'Member avatar changes.' },
              { channel: 'Member Join Logs', events: 'New member joins, mute-rejoins, and joins with prior moderation records.' },
              { channel: 'Member Leave Logs', events: 'Member leaves — includes roles held at departure.' },
              { channel: 'Mod Note Logs', events: 'Staff notes added to members.' },
              { channel: 'Warning Logs', events: 'Member warnings issued.' },
              { channel: 'Mute Logs', events: 'Mutes, timed mutes, unmutes, timed unmutes, mute expirations, and mass mutes.' },
              { channel: 'Kick Logs', events: 'Member kicks.' },
              { channel: 'Ban Logs', events: 'Bans, timed bans, unbans, softbans.' },
            ].map(l => (
              <div key={l.channel} className="card" style={{ padding: '.85rem 1.1rem', display: 'flex', alignItems: 'flex-start', gap: '.75rem' }}>
                <Activity size={14} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h4 style={{ fontSize: '.8rem', fontWeight: 700, marginBottom: '.2rem' }}>{l.channel}</h4>
                  <p style={{ fontSize: '.74rem', color: 'var(--dim)', lineHeight: 1.55 }}>{l.events}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Join Guard */}
      {tab === 'join-guard' && (
        <div>
          <div style={{ background: 'rgba(239,68,68,.06)', border: '1px solid rgba(239,68,68,.2)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '.65rem', alignItems: 'flex-start' }}>
            <Lock size={15} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.7 }}>
              <strong style={{ color: '#ef4444' }}>Join Guard</strong> automatically detects and bans suspicious accounts. All conditions must match (AND logic). Currently disabled — toggle in zepp.yml when needed.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font)', fontSize: '.85rem', fontWeight: 700, marginBottom: '.75rem' }}>Detection Conditions</h3>
            <div className="card-grid">
              {[
                { icon: Activity, title: 'Account Age', desc: 'Accounts younger than 7 days are flagged as suspicious.' },
                { icon: User, title: 'Default Avatar', desc: 'Accounts without a custom profile picture (using Discord default).' },
                { icon: Wrench, title: 'Generated Names', desc: 'Username matches auto-generated patterns: User_043, User284, Hello.273, Test.29043, or numeric-only names.' },
                { icon: AlertTriangle, title: 'Keyword in Name', desc: 'Username contains: raid, raider, nuke, spam, spammer, bot, selfbot, nitro, free nitro, discord staff, discord support, admin, moderator.' },
                { icon: Bot, title: 'Unverified Bot', desc: 'Unverified bot accounts attempting to join the server.' },
              ].map(c => {
                const Icon = c.icon
                return (
                  <div key={c.title} className="card" style={{ padding: '.85rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.35rem' }}>
                      <Icon size={14} color="#ef4444" />
                      <h4 style={{ fontSize: '.8rem', fontWeight: 700 }}>{c.title}</h4>
                    </div>
                    <p style={{ fontSize: '.74rem', color: 'var(--dim)', lineHeight: 1.55 }}>{c.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card" style={{ padding: '1rem 1.25rem', borderLeft: '3px solid #ef4444' }}>
            <h3 style={{ fontFamily: 'var(--font)', fontSize: '.82rem', fontWeight: 700, color: '#ef4444', marginBottom: '.5rem' }}>Action on Detection</h3>
            <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.7 }}>
              When all conditions match, Join Guard sends a DM explaining the automatic removal, then bans the account.
              The DM message explains the detection reason and directs the user to appeal if the detection was incorrect.
            </p>
          </div>
        </div>
      )}

      {/* Welcome & Leave */}
      {tab === 'welcome' && (
        <div>
          <div style={{ background: 'rgba(168,122,250,.06)', border: '1px solid rgba(168,122,250,.2)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '.65rem', alignItems: 'flex-start' }}>
            <Megaphone size={15} color="#a78bfa" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.7 }}>
              <strong style={{ color: '#a78bfa' }}>Aegis welcome/leave messages</strong> use Discord's embed system with V2 components. Welcome DMs sent to new members, welcome posts sent to a designated channel. Leave notifications posted to a separate channel.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
            <div className="card" style={{ padding: '1.1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.6rem' }}>
                <LogIn size={16} color="#88c0f0" />
                <h3 style={{ fontFamily: 'var(--font)', fontSize: '.85rem', fontWeight: 700 }}>Welcome Message</h3>
              </div>
              <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.7, marginBottom: '.5rem' }}>
                Sent via DM <strong style={{ color: 'var(--text)' }}>and</strong> posted to a welcome channel. Uses a styled V2 container with:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem' }}>
                {[
                  'Member avatar displayed as media gallery item',
                  'Personalised greeting: "Welcome to the Empire, {name}!"',
                  'Custom variables: {custom.invite}, {custom.server_name}, {member_count}',
                  'Quick links to rules channel, general chat, and self-roles',
                  'Invite link for sharing with friends',
                  'Member count tracker (#N)',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '.4rem' }}>
                    <ChevronRight size={12} color="var(--muted)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <p style={{ fontSize: '.76rem', color: 'var(--dim)', lineHeight: 1.55 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: '1.1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.6rem' }}>
                <User size={16} color="#eb459e" />
                <h3 style={{ fontFamily: 'var(--font)', fontSize: '.85rem', fontWeight: 700 }}>Leave Notification</h3>
              </div>
              <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.7, marginBottom: '.5rem' }}>
                Posted to a dedicated leave-log channel with:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem' }}>
                {[
                  'Member avatar displayed',
                  '"Farewell, {name}" heading',
                  'Departure timestamp',
                  'Accent colour: #eb459e',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '.4rem' }}>
                    <ChevronRight size={12} color="var(--muted)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <p style={{ fontSize: '.76rem', color: 'var(--dim)', lineHeight: 1.55 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: '1rem 1.25rem' }}>
              <h4 style={{ fontSize: '.8rem', fontWeight: 700, marginBottom: '.4rem' }}>Additional Features</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.4rem' }}>
                  <ChevronRight size={12} color="var(--muted)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <p style={{ fontSize: '.76rem', color: 'var(--dim)', lineHeight: 1.55 }}><strong style={{ color: 'var(--text)' }}>Sticky messages</strong> — Persistent suggestion prompt in the suggestions channel reminding members to use the /suggest command.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.4rem' }}>
                  <ChevronRight size={12} color="var(--muted)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <p style={{ fontSize: '.76rem', color: 'var(--dim)', lineHeight: 1.55 }}><strong style={{ color: 'var(--text)' }}>Interactive self-roles</strong> — V2 component-based role selection in a dedicated channel. Dropdowns for age, relationship status, DM status, gaming platforms, and ping roles.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.4rem' }}>
                  <ChevronRight size={12} color="var(--muted)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <p style={{ fontSize: '.76rem', color: 'var(--dim)', lineHeight: 1.55 }}><strong style={{ color: 'var(--text)' }}>Message cooldown:</strong> 60 seconds between welcome triggers to prevent spam from rapid re-joins.</p>
                </div>
              </div>
            </div>
          </div>
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
              { title: 'Aegis Bot', value: 'Zepp — 30+ AutoMod rules, case system, logging', icon: Bot },
              { title: 'Join Server', value: 'discord.gg/DeSrm3WNmk', icon: MessageCircle, link: 'https://discord.gg/DeSrm3WNmk' },
            ].map(card => {
              const CardIcon = card.icon
              return (
              <div key={card.title} style={{ background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '.75rem', padding: '1.1rem 1.25rem' }}>
                <p style={{ marginBottom: '.4rem', color: 'var(--red2)' }}><CardIcon size={18} /></p>
                <p style={{ fontFamily: 'var(--font)', fontSize: '.72rem', color: 'var(--muted)', letterSpacing: '.07em', marginBottom: '.3rem' }}>{card.title}</p>
                {card.link
                  ? <a href={card.link} target="_blank" rel="noreferrer" style={{ fontSize: '.8rem', color: 'var(--red2)', textDecoration: 'underline' }}>{card.value}</a>
                  : <p style={{ fontSize: '.8rem', color: 'var(--text)' }}>{card.value}</p>
                }
              </div>
              )
            })}
          </div>
          <div style={{ background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '.75rem', padding: '1.25rem' }}>
            <h3 style={{ fontFamily: 'var(--font)', fontSize: '.85rem', fontWeight: 700, marginBottom: '.85rem' }}>Quick Guidelines</h3>
            {[
              'English is required in general channels. Use designated channels for other languages.',
              'All content must be SFW (Safe for Work) — no explicit material anywhere, no exceptions.',
              'Use the ticket system or report channel to notify staff — do not DM directly about moderation.',
              'Warnings are permanent and never expire. Major offences bypass the warning system entirely.',
              'Always provide evidence when reporting a member. Without verifiable evidence, staff cannot act.',
              'Staff decisions are final. Appeals go through zepp.noxxbot.com/appeals/1466990155020898413 only.',
            ].map((g, i) => (
              <div key={i} style={{ display: 'flex', gap: '.55rem', alignItems: 'flex-start', marginBottom: '.45rem' }}>
                <ChevronRight size={13} color="var(--red2)" style={{ flexShrink: 0, marginTop: 3 }} />
                <p style={{ fontSize: '.79rem', color: 'var(--dim)', lineHeight: 1.7 }}>{g}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
