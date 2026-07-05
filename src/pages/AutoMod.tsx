import React, { useState } from 'react'
import { Siren, Shield, Zap, Trash2, MessageSquare, AlertTriangle, Ban, Eye, Globe, ChevronDown, ChevronRight } from 'lucide-react'

interface AutoModRule {
  name: string
  category: string
  triggers: string[]
  actions: string[]
  escalate: boolean
  escalation: string
  zeroTolerance: boolean
}

const categories: { id: string; label: string }[] = [
  { id: 'all', label: 'All Rules' },
  { id: 'content', label: 'Content Filter' },
  { id: 'security', label: 'Security' },
  { id: 'spam', label: 'Anti-Spam' },
  { id: 'behavior', label: 'Behavior' },
  { id: 'meta', label: 'Meta' },
]

const automodRules: AutoModRule[] = [
  {
    name: 'NSFW Words', category: 'content',
    triggers: ['Keyword match — 80+ explicit terms including porn, hentai, loli, and sexual slang'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with warning embed'],
    escalate: true,
    escalation: 'Warn → 1h mute → 6h mute → 24h mute → Kick → Ban',
    zeroTolerance: false,
  },
  {
    name: 'NSFW Links', category: 'content',
    triggers: ['Regex match — NSFW site URLs and known adult domains'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with warning embed'],
    escalate: true,
    escalation: 'Warn → 1h mute → 6h mute → 24h mute → Kick → Ban',
    zeroTolerance: false,
  },
  {
    name: 'Slurs', category: 'content',
    triggers: ['Keyword match — racial, homophobic, transphobic, and ableist slurs including censored/disguised variants'],
    actions: ['Clean message', 'Log to staff channel', 'Report to moderation queue'],
    escalate: true,
    escalation: 'Immediate ban (zero-tolerance)',
    zeroTolerance: true,
  },
  {
    name: 'CSAM / Exploitation', category: 'content',
    triggers: ['Keyword match — CSAM-adjacent terms and coded language'],
    actions: ['Clean message', 'Log to staff channel', 'Report to moderation queue'],
    escalate: true,
    escalation: 'Immediate permanent ban + Trust & Safety report',
    zeroTolerance: true,
  },
  {
    name: 'Threats of Violence', category: 'content',
    triggers: ['Regex match — death threats, violence threats, weapon references'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with warning embed'],
    escalate: true,
    escalation: 'Warn → 6h mute → 24h mute → Kick → Ban',
    zeroTolerance: false,
  },
  {
    name: 'Suicide Encouragement', category: 'content',
    triggers: ['Keyword match — encouraging self-harm, suicide commands, harmful instructions'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with mental health resources embed'],
    escalate: true,
    escalation: 'Warn → 6h mute → Kick → Ban',
    zeroTolerance: false,
  },
  {
    name: 'Scam Links', category: 'security',
    triggers: ['Regex match — known scam domains, phishing URLs, fake gift links'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with scam warning embed'],
    escalate: true,
    escalation: 'Warn → 1h mute → 12h mute → Kick → Ban',
    zeroTolerance: false,
  },
  {
    name: 'IP Address Detection', category: 'security',
    triggers: ['Regex match — IPv4 and IPv6 address patterns'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with privacy warning'],
    escalate: true,
    escalation: 'Warn → mute',
    zeroTolerance: false,
  },
  {
    name: 'Personal / Financial Data', category: 'security',
    triggers: ['Regex match — credit card numbers, bank routing numbers, SSN patterns'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with warning embed'],
    escalate: true,
    escalation: 'Warn → 6h mute → Kick → Ban',
    zeroTolerance: false,
  },
  {
    name: 'Doxxing Detection', category: 'security',
    triggers: ['Keyword + regex match — private information sharing patterns, address patterns, phone numbers'],
    actions: ['Clean message', 'Log to staff channel', 'Report to moderation queue'],
    escalate: true,
    escalation: 'Immediate permanent ban (zero-tolerance)',
    zeroTolerance: true,
  },
  {
    name: 'Drug Solicitation', category: 'content',
    triggers: ['Keyword match — drug names, slang, solicitation terms'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with warning embed'],
    escalate: true,
    escalation: 'Warn → 6h mute → 24h mute → Ban',
    zeroTolerance: false,
  },
  {
    name: 'Malware & Token Grabbers', category: 'security',
    triggers: ['Keyword match — malware terms, token grabber references, executable names'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with warning embed'],
    escalate: true,
    escalation: 'Immediate ban (zero-tolerance)',
    zeroTolerance: true,
  },
  {
    name: 'Gore & Shock Content', category: 'content',
    triggers: ['Keyword match — shock site names, gore terms, disturbing content references'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with warning embed'],
    escalate: true,
    escalation: 'Warn → 6h mute → 24h mute → Ban',
    zeroTolerance: false,
  },
  {
    name: 'Raid Coordination', category: 'security',
    triggers: ['Keyword match — raid planning terms, coordination language, attack instructions'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with warning embed'],
    escalate: true,
    escalation: 'Immediate permanent ban + Trust & Safety report',
    zeroTolerance: true,
  },
  {
    name: 'Phishing & Credential Theft', category: 'security',
    triggers: ['Regex match — fake login pages, credential harvesting domains, Discord token patterns'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with warning embed'],
    escalate: true,
    escalation: 'Immediate ban (zero-tolerance)',
    zeroTolerance: true,
  },
  {
    name: 'Mass Ping', category: 'spam',
    triggers: ['Regex match — mass ping patterns (>5 mentions in single message)'],
    actions: ['Clean message', 'Log to staff channel', 'Report to moderation queue'],
    escalate: true,
    escalation: '1st: 1h mute → 2nd: 12h mute → 3rd: Kick → 4th: Ban',
    zeroTolerance: false,
  },
  {
    name: 'Message Spam', category: 'spam',
    triggers: ['Frequency-based — 5+ messages in 3s'],
    actions: ['Log to staff channel'],
    escalate: true,
    escalation: 'Warn → 30m mute → 2h mute → 24h mute',
    zeroTolerance: false,
  },
  {
    name: 'Emoji Spam', category: 'spam',
    triggers: ['Frequency-based — excessive emoji count threshold'],
    actions: ['Clean message (partial)'],
    escalate: true,
    escalation: 'Warn → 30m mute → 2h mute → Kick → Ban',
    zeroTolerance: false,
  },
  {
    name: 'Link Restriction (<Level 20)', category: 'spam',
    triggers: ['Regex match — any URL from users below level 20'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with level requirement embed'],
    escalate: true,
    escalation: 'Warn → 1h mute',
    zeroTolerance: false,
  },
  {
    name: 'Copypasta Detection', category: 'spam',
    triggers: ['Frequency-based — identical long messages detected'],
    actions: ['Clean message', 'Log to staff channel'],
    escalate: true,
    escalation: 'Warn → mute',
    zeroTolerance: false,
  },
  {
    name: 'Swearing Filter', category: 'content',
    triggers: ['Keyword match — profanity list'],
    actions: ['Log to staff channel', 'Reply with reminder'],
    escalate: true,
    escalation: 'Warn → mute (clean: false — messages preserved for context)',
    zeroTolerance: false,
  },
  {
    name: 'Severe Language', category: 'content',
    triggers: ['Keyword match — severe profanity, degrading terms'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with warning'],
    escalate: true,
    escalation: 'Warn → mute',
    zeroTolerance: false,
  },
  {
    name: 'Nitro Begging', category: 'behavior',
    triggers: ['Keyword match — nitro begging phrases, "free nitro" spam patterns'],
    actions: ['Log to staff channel'],
    escalate: true,
    escalation: 'Warn → 1h mute → Kick',
    zeroTolerance: false,
  },
  {
    name: 'Staff Application Spam', category: 'behavior',
    triggers: ['Regex match — staff application mentions, "apply for staff" patterns'],
    actions: ['Log to staff channel', 'Reply with application info embed'],
    escalate: false,
    escalation: '—',
    zeroTolerance: false,
  },
  {
    name: 'Dehoist', category: 'meta',
    triggers: ['Nickname scan + regex — special characters at start of nickname to jump to top of member list'],
    actions: ['Log to staff channel', 'Reply to user', 'Change nickname to "Moderated Nickname"'],
    escalate: false,
    escalation: '—',
    zeroTolerance: false,
  },
  {
    name: 'Zalgo / Unicode Abuse', category: 'spam',
    triggers: ['Regex match — Unicode combining character patterns, zalgo text detection'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with warning'],
    escalate: true,
    escalation: 'Warn → 1h mute',
    zeroTolerance: false,
  },
  {
    name: 'Duplicate Message', category: 'spam',
    triggers: ['Frequency-based — identical message content repeated'],
    actions: ['Log to staff channel'],
    escalate: true,
    escalation: 'Delete duplicates → Warn → Mute',
    zeroTolerance: false,
  },
  {
    name: 'English Only', category: 'meta',
    triggers: ['Language detection — non-English content threshold 0.2'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with English-only reminder'],
    escalate: true,
    escalation: 'Warn → mute',
    zeroTolerance: false,
  },
  {
    name: 'Block Non-Staff Polls', category: 'meta',
    triggers: ['Poll creation detection from non-staff users'],
    actions: ['Block the poll'],
    escalate: false,
    escalation: '—',
    zeroTolerance: false,
  },
  {
    name: 'Large Text / Markdown Headers', category: 'spam',
    triggers: ['Regex match — markdown headers (# ## ###) and excessive text size'],
    actions: ['Clean message', 'Log to staff channel', 'Reply with warning'],
    escalate: true,
    escalation: 'Warn → 1h mute → 6h mute → Ban',
    zeroTolerance: false,
  },
]

const byCategory = (cat: string) => cat === 'all' ? automodRules : automodRules.filter(r => r.category === cat)

const catIcons: Record<string, React.ReactNode> = {
  content: <Shield size={12} />,
  security: <Shield size={12} />,
  spam: <Zap size={12} />,
  behavior: <MessageSquare size={12} />,
  meta: <Globe size={12} />,
}

const catColors: Record<string, string> = {
  content: 'var(--red)',
  security: 'var(--red)',
  spam: 'var(--gold)',
  behavior: 'var(--blue)',
  meta: 'var(--muted)',
}

export default function AutoMod() {
  const [cat, setCat] = useState('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'default' | 'severity' | 'az'>('default')

  const handleCat = (id: string) => {
    setExpanded(null)
    setCat(id)
  }
  const handleSort = (id: 'default' | 'severity' | 'az') => {
    setExpanded(null)
    setSortOrder(id)
  }

  const filtered = byCategory(cat)
    .sort((a, b) => {
      if (sortOrder === 'severity') {
        const score = (r: AutoModRule) => (r.zeroTolerance ? 0 : r.escalate ? 1 : 2)
        const sa = score(a), sb = score(b)
        if (sa !== sb) return sa - sb
        return a.name.localeCompare(b.name)
      }
      if (sortOrder === 'az') return a.name.localeCompare(b.name)
      return 0
    })
  // Ensure expanded item exists in filtered list, reset if not
  const visibleExpanded = expanded && filtered.some(r => r.name === expanded) ? expanded : null

  return (
    <div className="page-section" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <div className="section-header">
        <div className="section-label">Automated Moderation</div>
        <h1 className="section-title">AutoMod Reference</h1>
        <p className="section-desc" style={{ maxWidth: 560 }}>
          {automodRules.length} active rules scanning messages in real-time. Configured from the live Zepp bot system. All staff roles (level 100) bypass all rules except CSAM detection.
        </p>
      </div>

      <div className="stat-row" style={{ marginBottom: 32 }}>
        <div className="stat-item">
          <div className="stat-value" style={{ color: 'var(--red)' }}>{automodRules.filter(r => r.zeroTolerance).length}</div>
          <div className="stat-label">Zero-Tolerance Rules</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" style={{ color: 'var(--gold)' }}>{automodRules.filter(r => r.escalate).length}</div>
          <div className="stat-label">Escalating Rules</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" style={{ color: 'var(--blue)' }}>{automodRules.filter(r => r.category === 'security').length}</div>
          <div className="stat-label">Security Rules</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" style={{ color: 'var(--dim)' }}>{automodRules.filter(r => !r.escalate && !r.zeroTolerance).length}</div>
          <div className="stat-label">Passive Rules</div>
        </div>
      </div>

      <div className="tab-bar" style={{ marginBottom: 24 }}>
        {categories.map(c => (
          <button key={c.id} type="button"
            onClick={() => handleCat(c.id)}
            className={`tab-item${cat === c.id ? ' active' : ''}`}>
            {c.id !== 'all' && catIcons[c.id]}
            {c.label}
          </button>
        ))}
      </div>

      {/* Sort controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>Sort:</span>
        {([
          { id: 'default' as const, label: 'Default' },
          { id: 'severity' as const, label: 'Severity (ZT → Passive)' },
          { id: 'az' as const, label: 'A–Z' },
        ]).map(s => (
          <button key={s.id} type="button"
            onClick={() => handleSort(s.id)}
            className="btn btn-ghost btn-sm"
            style={{ color: sortOrder === s.id ? 'var(--text)' : 'var(--muted)', fontWeight: sortOrder === s.id ? 600 : 500 }}>
            {s.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {filtered.map(r => {
          const isOpen = visibleExpanded === r.name
          return (
            <div key={r.name} style={{
              border: `1px solid ${isOpen ? 'var(--border2)' : 'var(--border)'}`,
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              background: isOpen ? 'var(--bg1)' : 'transparent',
            }}>
              <button
                onClick={() => setExpanded(isOpen ? null : r.name)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px', background: 'none', border: 'none',
                  color: 'var(--text)', cursor: 'pointer', textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  background: r.zeroTolerance ? 'var(--red)' : r.escalate ? 'var(--gold)' : 'var(--dim)' }} />
                <span style={{ fontWeight: 600, fontSize: 13, flex: 1, minWidth: 0 }}>{r.name}</span>
                {r.zeroTolerance && <span className="badge badge-red">ZT</span>}
                <span style={{ fontSize: 11, color: 'var(--muted)', flexShrink: 0 }}>{r.category}</span>
                <ChevronDown size={14} color="var(--muted)" style={{
                  flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }} />
              </button>
              {isOpen && (
                <div style={{ padding: '0 14px 14px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 14 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                      <div style={{ flex: '1 1 260px', minWidth: 0 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 6 }}>Triggers</div>
                        {r.triggers.map((t, i) => (
                          <div key={i} style={{ fontSize: 12, color: 'var(--dim)', marginBottom: 3, lineHeight: 1.55, paddingLeft: 14, textIndent: -14, paddingRight: 0 }}>
                            <ChevronRight size={10} style={{ display: 'inline', marginRight: 4, color: 'var(--muted)', verticalAlign: 'middle' }} />
                            <span style={{ wordBreak: 'break-word' }}>{t}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ flex: '1 1 260px', minWidth: 0 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 6 }}>Actions</div>
                        {r.actions.map((a, i) => (
                          <div key={i} style={{ fontSize: 12, color: 'var(--dim)', marginBottom: 3, lineHeight: 1.55, paddingLeft: 14, textIndent: -14 }}>
                            <ChevronRight size={10} style={{ display: 'inline', marginRight: 4, color: 'var(--muted)', verticalAlign: 'middle' }} />
                            <span style={{ wordBreak: 'break-word' }}>{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10, display: 'flex', flexWrap: 'wrap', gap: '4px 14px', fontSize: 12, color: 'var(--dim)' }}>
                      <span><strong style={{ color: 'var(--text)', fontWeight: 600 }}>Escalation:</strong> {r.escalation}</span>
                      <span><strong style={{ color: 'var(--text)', fontWeight: 600 }}>ZT:</strong> {r.zeroTolerance ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{
        marginTop: 48,
        padding: 20,
        background: 'rgba(224,49,49,.04)',
        border: '1px solid rgba(224,49,49,.15)',
        borderRadius: 'var(--radius)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <AlertTriangle size={18} color="var(--red)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Staff Bypass Notice</h3>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              Level 100 roles bypass all AutoMod rules to perform moderation duties. CSAM detection cannot be bypassed by any role. This configuration is managed through the Zepp bot system and cannot be changed through the website.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
