import React from 'react'
import { Shield, AlertTriangle, Eye, EyeOff, Lock, Trash2, Globe, ExternalLink, Bot, Database, Clock, MessageCircle } from 'lucide-react'

interface Section {
  id: string
  title: string
  content: React.ReactNode
}

const sections: Section[] = [
  {
    id: 'consent',
    title: 'Data Consent & Acceptance',
    content: (
      <>
        <p>By joining The SnowHaven Empire server, using this website, or interacting with any TSHE platform, you consent to the data collection and handling practices described in this Policy.</p>
        <p>This Policy covers data collected through the Discord server, this website, and associated TSHE services. It does not govern data collected by Discord Inc. — refer to <a href="https://discord.com/privacy" target="_blank" rel="noreferrer" style={{ color: 'var(--red)', fontWeight: 600 }}>Discord's Privacy Policy</a> for their practices.</p>
        <p>Last updated: July 2026. Significant changes will be announced in the server's announcements channel.</p>
      </>
    ),
  },
  {
    id: 'collected',
    title: 'Data We Collect',
    content: (
      <>
        <div className="table-wrap" style={{ marginBottom: 12 }}>
          <table className="ruletable">
            <thead><tr><th>Category</th><th>Data Point</th><th>Storage</th></tr></thead>
            <tbody>
              {[
                ['Discord User ID', 'Identifier for moderation records, warnings, and ban logs.', 'Encrypted'],
                ['Moderation Actions', 'Warnings, mutes, bans, and reasons. Retained for consistency and appeals review.', 'Logged'],
                ['Message Metadata', 'Channel and timestamp data for moderation audit trails. Content not stored unless triggered by Aegis (see below).', 'Anonymised'],
                ['Website Visit Logs', 'IP address, browser type, referring URL. Used for security and DDoS mitigation. Deleted within 24 hours.', 'Temporary'],
                ['Appeal Submissions', 'Content of any appeal submitted via the official portal. Retained for duration of the case.', 'Retained'],
              ].map(([cat, data, storage]) => (
                <tr key={cat}><td style={{ fontWeight: 600 }}>{cat}</td><td>{data}</td>
                  <td><span className="badge" style={{
                    background: storage === 'Encrypted' ? 'var(--red-bg)' : storage === 'Temporary' ? 'var(--green-bg)' : 'var(--gold-bg)',
                    color: storage === 'Encrypted' ? 'var(--red)' : storage === 'Temporary' ? 'var(--green)' : 'var(--gold)',
                    borderColor: storage === 'Encrypted' ? 'var(--red-brd)' : storage === 'Temporary' ? 'rgba(55,178,77,.2)' : 'var(--gold-brd)',
                  }}>{storage}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card" style={{
          padding: 14, borderColor: 'rgba(55,178,77,.15)', background: 'rgba(55,178,77,.04)',
          display: 'flex', alignItems: 'flex-start', gap: 10,
        }}>
          <EyeOff size={14} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text)' }}>Data minimisation:</strong> We collect only the minimum data necessary to operate the server safely and fairly. We do not sell your data, build advertising profiles, or share it for purposes unrelated to running TSHE.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'aegis',
    title: 'Aegis — Message Storage & Retention',
    content: (
      <>
        <div style={{
          background: 'rgba(224,49,49,.08)', border: '1px solid rgba(224,49,49,.25)',
          borderRadius: 'var(--radius)', padding: '16px 18px', marginBottom: 14,
          borderLeft: '3px solid var(--red)',
          display: 'flex', alignItems: 'flex-start', gap: 12,
        }}>
          <Bot size={18} color="var(--red)" style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--red)', marginBottom: 6 }}>Aegis — Automated Moderation Bot</h3>
            <p style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.7 }}>
              Aegis is TSHE's automated moderation system. By joining TSHE, you explicitly acknowledge and consent to the following data retention practices:
            </p>
          </div>
        </div>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, listStyle: 'none', paddingLeft: 0 }}>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Database size={14} color="var(--red)" style={{ flexShrink: 0, marginTop: 3 }} />
            <span style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text)' }}>!store command retention:</strong> When a staff member (level 40+) uses the <code style={{ fontFamily: 'var(--mono)', background: 'var(--bg2)', padding: '2px 6px', borderRadius: 3, fontSize: 12 }}>!store</code> command on your message, the message content, author ID, channel, and timestamp are permanently stored in Aegis's encrypted database. This data is retained indefinitely for moderation records and appeal evidence.
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Clock size={14} color="var(--red)" style={{ flexShrink: 0, marginTop: 3 }} />
            <span style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text)' }}>AutoMod-triggered retention:</strong> When any of our 30+ AutoMod rules are triggered by your message (NSFW, slurs, spam, phishing, doxxing, malware, threats, etc.), the flagged message content and full metadata are stored permanently in the case log. This includes messages that are automatically cleaned — the content is preserved in the log for review.
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Lock size={14} color="var(--red)" style={{ flexShrink: 0, marginTop: 3 }} />
            <span style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text)' }}>Storage duration:</strong> Stored messages may be retained permanently or for a set duration as determined by the staff member at the time of storage. Access is strictly restricted to staff members level 40 and above. Data is never sold, never shared with third parties, and never used for advertising. Retention serves the sole purpose of moderation consistency and appeal processing.
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Trash2 size={14} color="var(--red)" style={{ flexShrink: 0, marginTop: 3 }} />
            <span style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text)' }}>Your rights:</strong> You may request information about what messages of yours have been stored by contacting a Head Administrator in the Discord server. Message deletions from Discord do not automatically delete stored records in Aegis. Stored data may be released to Discord Trust & Safety, NCMEC, or law enforcement where required by law.
            </span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'usage',
    title: 'How We Use Your Data',
    content: (
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none' }}>
        <li><strong>Moderation enforcement:</strong> Warning records, ban logs, and case history are used to ensure consistent and fair enforcement of server rules.</li>
        <li><strong>Appeals review:</strong> Moderation history is consulted when processing member appeals to ensure decisions are well-informed.</li>
        <li><strong>Security:</strong> Website visit logs are used for DDoS mitigation and identifying malicious access patterns.</li>
        <li><strong>Audit trail:</strong> Moderation action metadata is retained so staff can review decisions and ensure accountability.</li>
        <li><strong>Legal compliance:</strong> Data may be shared with Discord Trust & Safety, NCMEC, or law enforcement where required by law (e.g., CSAM reports).</li>
      </ul>
    ),
  },
  {
    id: 'thirdparty',
    title: 'Third-Party Services',
    content: (
      <>
        <p>TSHE uses the following third-party services in its operation:</p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 6, listStyle: 'none' }}>
          <li><strong>Discord Inc.</strong> — Platform provider. All users are subject to <a href="https://discord.com/privacy" target="_blank" rel="noreferrer" style={{ color: 'var(--red)', fontWeight: 600 }}>Discord's Privacy Policy</a>.</li>
          <li><strong>Zepp Bot Framework</strong> — Powers the appeal portal, moderation logging, and Aegis AutoMod system.</li>
          <li><strong>Noxx Bot</strong> — In-house moderation and utility bot developed by Xyron Development.</li>
          <li><strong>Nginx & Linux Server</strong> — Website hosting infrastructure (IP logging for security).</li>
        </ul>
        <p>Data shared with these services is limited to what is necessary for their function. No data is sold to or shared with advertising networks, data brokers, or analytics companies.</p>
      </>
    ),
  },
  {
    id: 'rights',
    title: 'Your Rights',
    content: (
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none' }}>
        <li><strong>Access:</strong> Request what moderation data is associated with your Discord account.</li>
        <li><strong>Correction:</strong> Request correction of inaccurate moderation records with evidence.</li>
        <li><strong>Deletion:</strong> Request deletion of stored message data — handled on a case-by-case basis by Head Administrator review. Active moderation records required for enforcement consistency cannot be deleted.</li>
        <li><strong>Appeal:</strong> Challenge moderation actions via the official appeal portal.</li>
        <li><strong>Withdrawal:</strong> Leave the server at any time. Note: moderation records are retained after departure for audit and to prevent ban evasion.</li>
      </ul>
    ),
  },
  {
    id: 'security',
    title: 'Data Security',
    content: (
      <>
        <p>Stored data is encrypted at rest and in transit. Access to moderation records is restricted to authenticated staff members. All access is logged for audit purposes.</p>
        <p>In the event of a data breach affecting member information, affected members will be notified through Discord's announcements channel within 72 hours of discovery.</p>
        <p>Staff undergo training on data handling and privacy practices. Unauthorized access, sharing, or misuse of member data by staff is a dismissible offense.</p>
      </>
    ),
  },
  {
    id: 'minors',
    title: 'Minors & Children',
    content: (
      <p>TSHE requires all members to be 13 or older as required by Discord's Terms of Service. We do not knowingly collect data from users under 13. If we discover a user is under 13, their account is immediately banned and reported to Discord Trust & Safety.</p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: (
      <p>We reserve the right to update this Policy. Members will be notified of significant changes via the announcements channel. Continued use after changes constitutes acceptance. Last updated: July 2026.</p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    content: (
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none' }}>
        <li><strong>Discord:</strong> <a href="https://discord.gg/z2efJQbF3B" target="_blank" rel="noreferrer" style={{ color: 'var(--red)', fontWeight: 600 }}>discord.gg/z2efJQbF3B</a></li>
        <li><strong>Appeals:</strong> <a href="https://zepp.noxxbot.com/appeals/1466990155020898413" target="_blank" rel="noreferrer" style={{ color: 'var(--red)', fontWeight: 600 }}>zepp.noxxbot.com/appeals</a></li>
        <li><strong>Operator:</strong> Xyron Development</li>
        <li><strong>Jurisdiction:</strong> United States</li>
      </ul>
    ),
  },
]

export default function Privacy() {
  return (
    <div className="page-section" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <div className="section-header">
        <div className="section-label">Legal</div>
        <h1 className="section-title">Privacy Policy</h1>
        <p className="section-desc" style={{ maxWidth: 560 }}>
          How we collect, store, and protect your data on The SnowHaven Empire. Last updated: July 2026.
        </p>
      </div>

      {/* Red consent card */}
      <div data-reveal style={{
        background: 'rgba(224,49,49,.08)', border: '1px solid rgba(224,49,49,.3)',
        borderRadius: 'var(--radius)', padding: '18px 20px', marginBottom: 32,
        borderLeft: '3px solid var(--red)',
        display: 'flex', alignItems: 'flex-start', gap: 12,
      }}>
        <AlertTriangle size={20} color="var(--red)" style={{ flexShrink: 0, marginTop: 1 }} />
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--red2)', marginBottom: 6 }}>By joining TSHE or viewing this website, you agree to this Privacy Policy.</h3>
          <p style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.7 }}>
            Your presence constitutes consent. This includes the message storage practices detailed in the Aegis section below. If you do not agree, do not join the server or use this website.
          </p>
        </div>
      </div>

      {/* Table of contents */}
      <div className="card" style={{ padding: 18, marginBottom: 32 }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 12 }}>Contents</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {sections.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>
              {i + 1}. {s.title}
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} data-reveal>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 12, letterSpacing: '-.01em' }}>
              <span style={{ color: 'var(--muted)', marginRight: 8 }}>{i + 1}.</span>
              {s.title}
            </h2>
            <div style={{ fontSize: 14, color: 'var(--dim)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {s.content}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
