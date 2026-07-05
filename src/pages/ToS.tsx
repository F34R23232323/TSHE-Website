import React, { useState } from 'react'
import { Shield, AlertTriangle, FileText, ExternalLink, Bot, Database, Clock, Lock } from 'lucide-react'

interface Section {
  id: string
  title: string
  content: React.ReactNode
}

const sections: Section[] = [
  {
    id: 'agreement',
    title: 'Binding Agreement',
    content: (
      <>
        <p>By joining The SnowHaven Empire Discord server, accessing this website, or interacting with any TSHE-affiliated platform, you enter into a binding agreement with these Terms. Your presence constitutes acceptance. If you do not agree, leave the server immediately and do not use this website.</p>
        <p>These Terms apply to all members, visitors, and entities interacting with TSHE in any capacity. We reserve the right to enforce these terms at our sole discretion. Staff decisions are final.</p>
      </>
    ),
  },
  {
    id: 'definitions',
    title: 'Scope & Definitions',
    content: (
      <>
        <div className="table-wrap" style={{ marginBottom: 12 }}>
          <table className="ruletable">
            <thead><tr><th>Term</th><th>Definition</th></tr></thead>
            <tbody>
              {[
                ['"The Server"', 'The SnowHaven Empire Discord guild and all affiliated channels, threads, and voice channels.'],
                ['"The Website"', 'This website (tshe.noxxbot.com) and all subdomains.'],
                ['"TSHE" / "We"', 'The server ownership, administration, and moderation team collectively.'],
                ['"Member" / "You"', 'Any individual who has joined the server, visits the website, or interacts with TSHE platforms.'],
                ['"Staff"', 'Any individual holding a moderation, administration, or leadership role within TSHE.'],
                ['"Blacklist"', 'A global prohibition preventing a user or account from accessing any TSHE platform.'],
              ].map(([t, d]) => (
                <tr key={t}><td style={{ fontFamily: 'var(--mono)' }}>{t}</td><td>{d}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'membership',
    title: 'Membership Requirements',
    content: (
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none' }}>
        <li><strong>Age requirement:</strong> You must be 13 years of age or older, or meet the minimum legal age in your region, as required by Discord's Terms of Service.</li>
        <li><strong>Discord compliance:</strong> You must comply with Discord's Terms of Service and Community Guidelines at all times while in the server.</li>
        <li><strong>Single identity:</strong> One person, one account. Alt accounts used to evade moderation actions are permanently banned on detection with all associated accounts included.</li>
        <li><strong>Membership is a privilege:</strong> Membership may be revoked at any time for rule violations, at staff discretion, without prior notice.</li>
      </ul>
    ),
  },
  {
    id: 'rules',
    title: 'Server Rules & Codex',
    content: (
      <>
        <p>All members are expected to uphold the SnowHaven Codex, which can be read in full on the <a href="/rules" style={{ color: 'var(--red)', fontWeight: 600 }}>Rules page</a>. By joining the server you agree to these standards.</p>
        <p>Rules are enforced through the warning escalation ladder (warnings → mutes → bans) with zero-tolerance offenses resulting in immediate permanent removal.</p>
        <p>Staff determinations on rule enforcement are final and binding. Public disputes over moderation decisions escalate existing penalties.</p>
      </>
    ),
  },
  {
    id: 'moderation',
    title: 'Moderation & Enforcement',
    content: (
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none' }}>
        <li><strong>Warning system:</strong> Warnings are permanent records. 2 warnings may trigger a mute. Escalating violations result in temporary mutes, temporary bans, and ultimately permanent removal.</li>
        <li><strong>Appeal system:</strong> Members may appeal moderation actions through the official portal at <a href="https://zepp.noxxbot.com/appeals/1466990155020898413" target="_blank" rel="noreferrer" style={{ color: 'var(--red)', fontWeight: 600 }}>zepp.noxxbot.com/appeals</a>. DM appeals are not reviewed under any circumstances.</li>
        <li><strong>Zero tolerance:</strong> Hate speech, slurs, doxxing, CSAM, threats of violence, malware, and advertising result in immediate permanent ban with no appeal rights.</li>
        <li><strong>Staff immunity:</strong> Staff acting in good faith within their role are not liable for moderation decisions. Frivolous legal threats or harassment of staff results in immediate removal.</li>
      </ul>
    ),
  },
  {
    id: 'data',
    title: 'Data Collection & Message Storage — Aegis',
    content: (
      <>
        <div style={{
          background: 'rgba(224,49,49,.08)', border: '1px solid rgba(224,49,49,.25)',
          borderRadius: 'var(--radius)', padding: '16px 18px', marginBottom: 14,
          display: 'flex', alignItems: 'flex-start', gap: 12,
          borderLeft: '3px solid var(--red)',
        }}>
          <Bot size={18} color="var(--red)" style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--red)', marginBottom: 6 }}>Aegis — Message & Content Retention</h3>
            <p style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.7 }}>
              TSHE operates <strong style={{ color: 'var(--text)' }}>Aegis</strong>, our automated moderation bot. By joining TSHE, you acknowledge and agree that:
            </p>
          </div>
        </div>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, listStyle: 'none', paddingLeft: 0 }}>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Database size={14} color="var(--red)" style={{ flexShrink: 0, marginTop: 3 }} />
            <span style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text)' }}>!store command:</strong> When a staff member uses the <code style={{ fontFamily: 'var(--mono)', background: 'var(--bg2)', padding: '2px 6px', borderRadius: 3, fontSize: 12 }}>!store</code> command, the targeted message is permanently stored in Aegis's database. This includes message content, author ID, channel, and timestamp. Stored messages are retained indefinitely for moderation and audit purposes.
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Clock size={14} color="var(--red)" style={{ flexShrink: 0, marginTop: 3 }} />
            <span style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text)' }}>AutoMod triggers:</strong> When any of our 30+ AutoMod rules are triggered by your message, the flagged message content and metadata are stored permanently in Aegis's case log for moderator review, auditing, and appeal reference. This applies to all rule categories including content filters, security scans, and spam detection.
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Lock size={14} color="var(--red)" style={{ flexShrink: 0, marginTop: 3 }} />
            <span style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text)' }}>Storage duration:</strong> Messages may be stored permanently or for a set duration determined by staff at the time of storage. Access is restricted to level 40+ staff members. Data is not sold, shared externally, or used for advertising. Retention is solely for moderation consistency, appeals processing, and security auditing.
            </span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'intellectual',
    title: 'Intellectual Property',
    content: (
      <>
        <p>The TSHE name, branding, logos, bot configurations, website design, and original content are the intellectual property of The SnowHaven Empire and Xyron Development. Unauthorized use, reproduction, or redistribution without explicit written permission is prohibited.</p>
        <p>User-generated content posted in the server remains the intellectual property of the original author, but by posting you grant TSHE a non-exclusive, perpetual license to display that content within the server.</p>
      </>
    ),
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers & Limitations',
    content: (
      <>
        <p>The SnowHaven Empire is provided "as is" without warranty of any kind. We do not guarantee uninterrupted access to the server, website, or bots.</p>
        <p>TSHE is not responsible for content posted by members. Views expressed by members do not represent TSHE.</p>
        <p>We are not liable for damages arising from your use of the server or website, including data loss, account actions by Discord, or interactions with other members.</p>
      </>
    ),
  },
  {
    id: 'termination',
    title: 'Termination',
    content: (
      <>
        <p>TSHE may terminate or suspend your access at any time for rule violations, at staff discretion, without prior notice or explanation.</p>
        <p>Upon termination (ban), you forfeit the right to rejoin under any account. Ban evasion is a violation of Discord's Terms of Service and is reported accordingly.</p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    content: (
      <p>We reserve the right to update these Terms at any time. Members will be notified of significant changes via the server's announcements channel. Continued use after changes constitutes acceptance. Last updated: July 2026.</p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact & Appeals',
    content: (
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none' }}>
        <li><strong>Discord:</strong> <a href="https://discord.gg/z2efJQbF3B" target="_blank" rel="noreferrer" style={{ color: 'var(--red)', fontWeight: 600 }}>discord.gg/z2efJQbF3B</a></li>
        <li><strong>Appeals:</strong> <a href="https://zepp.noxxbot.com/appeals/1466990155020898413" target="_blank" rel="noreferrer" style={{ color: 'var(--red)', fontWeight: 600 }}>zepp.noxxbot.com/appeals</a></li>
        <li><strong>Website:</strong> tshe.noxxbot.com</li>
        <li><strong>Operator:</strong> Xyron Development</li>
      </ul>
    ),
  },
]

export default function ToS() {
  return (
    <div className="page-section" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <div className="section-header">
        <div className="section-label">Legal</div>
        <h1 className="section-title">Terms of Service</h1>
        <p className="section-desc" style={{ maxWidth: 560 }}>
          The binding agreement between you and The SnowHaven Empire. Last updated: July 2026.
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
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--red2)', marginBottom: 6 }}>By joining TSHE or viewing this website, you agree to these Terms.</h3>
          <p style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.7 }}>
            Your presence in the server or on this website constitutes acceptance. If you do not agree, leave immediately. Violations result in moderation action including permanent ban with no appeal.
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
