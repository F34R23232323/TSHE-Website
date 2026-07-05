import React from 'react'
import { AlertTriangle, Shield, MessageCircle, ExternalLink, ChevronRight, Ban, FileText, Check, X, Info, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const whatIsAbuse = [
  { icon: Ban, title: 'Unfair punishment', desc: 'Being warned, muted, kicked, or banned without a valid rule violation. Staff must cite the specific rule broken — if they cannot name one, the action is invalid.' },
  { icon: AlertTriangle, title: 'Threats or intimidation', desc: 'Staff threatening you with moderation action unless you do something unrelated to the rules — e.g. "do this or I\'ll ban you." This is coercion, not moderation.' },
  { icon: Shield, title: 'Bias or targeting', desc: 'A staff member enforcing rules differently against you compared to others. Punishing you for something they let others do without consequence.' },
  { icon: Info, title: 'Privacy violations', desc: 'Staff reading or leaking private ticket content, DM conversations, or stored message data to unauthorised parties without a valid moderation reason.' },
  { icon: MessageCircle, title: 'Harassment by staff', desc: 'A staff member using their position to harass, bully, belittle, or intimidate you — in public channels, DMs, or voice calls.' },
  { icon: FileText, title: 'Command abuse', desc: 'Staff misusing bot commands for personal entertainment — mass-moving members, spamming announcements, deleting legitimate content, or disrupting the server.' },
]

const whatToDo = [
  { step: 1, title: 'Collect evidence immediately', desc: 'Take screenshots of everything — the punishment message, the DM, the context before and after. Get message links. Do not delete anything. Evidence is everything.' },
  { step: 2, title: 'Open a support ticket', desc: 'Go to the ticket channel and open a private ticket. Select "Report a rule violation" or "Staff conduct concern." Provide all evidence you collected.', path: '/tickets' },
  { step: 3, title: 'Be specific and factual', desc: 'State: what happened, who was involved, when it happened, what rule you believe was violated by the staff member. Stick to facts — emotional language weakens your case.' },
  { step: 4, title: 'Wait for review', desc: 'Staff conduct reports are reviewed by senior staff — never by the staff member you are reporting. Reviews take time because they involve examining logs, history, and context.' },
]

const whatNotToDo = [
  { text: 'DM the staff member directly to argue. This escalates the situation and may result in additional penalties against you.' },
  { text: 'Post about it publicly in server channels. Public disputes are themselves rule violations and will be actioned.' },
  { text: 'Rally other members to your cause. Organising a campaign against a staff member is grounds for your report to be disregarded.' },
  { text: 'Lie, exaggerate, or fabricate evidence. False reports are treated as a violation and may result in a permanent ban.' },
  { text: 'Threaten staff with legal action, doxxing, or external platform reports. Any threat immediately disqualifies your report.' },
  { text: 'DM the server owner directly. All reports go through the ticket system. Bypassing the process undermines it.' },
]

const consequences = [
  { tier: 'Verified Abuse — Minor', desc: 'First confirmed instance of unfair targeting, biased enforcement, or isolated abuse of minor commands. Result: formal internal warning, mandatory retraining, and removal of any unjust punishment against you.', color: 'var(--gold)' },
  { tier: 'Verified Abuse — Moderate', desc: 'Repeated minor abuse, sustained harassment of a single member, or misuse of elevated permissions. Result: demotion by one or more ranks, temporary removal of all moderation permissions, and supervision period.', color: '#f97316' },
  { tier: 'Verified Abuse — Severe', desc: 'Leaking private data, doxxing, sustained targeted abuse, mass-punishing innocent members, or abusing emergency tools. Result: immediate demotion to member or permanent removal, and permanent bar from holding any staff position.', color: 'var(--red)' },
  { tier: 'ToS-Level Abuse', desc: 'Discord ToS violations — threats, CSAM-related conduct, account compromise, or illegal activity. Result: immediate permanent ban, all associated accounts banned, and full report to Discord Trust & Safety. Criminal conduct reported to authorities.', color: '#ef4444' },
]

export default function PowerAbuse() {
  useScrollReveal()

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div data-reveal style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: 'rgba(249,115,22,.08)', border: '1px solid rgba(249,115,22,.2)',
            borderRadius: 99, padding: '.3rem .9rem',
            fontFamily: 'var(--font)', fontSize: '.62rem', letterSpacing: '.12em',
            color: '#f97316', textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            <AlertTriangle size={10} /> Staff Accountability
          </div>
          <h1 data-reveal data-delay="1" style={{
            fontFamily: 'var(--font)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700, letterSpacing: '-.02em', marginBottom: '.75rem',
          }}>
            Power Abuse
          </h1>
          <p data-reveal data-delay="2" style={{
            fontSize: '.9rem', color: 'var(--dim)', maxWidth: 540, margin: '0 auto', lineHeight: 1.75,
          }}>
            Staff are held to the same standards as every member — and higher.
            If a staff member abuses their position, there is a process. This page explains exactly what to do.
          </p>
        </div>

        {/* ── What counts ── */}
        <div data-reveal style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font)', fontSize: '1rem', fontWeight: 700, marginBottom: '.35rem' }}>
            What counts as power abuse?
          </h2>
          <p style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
            Not every action you disagree with is abuse. These are the recognised categories.
          </p>
          <div className="card-grid">
            {whatIsAbuse.map(item => {
              const Icon = item.icon
              return (
                <div key={item.title} className="card" style={{ padding: 20 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 'var(--radius)',
                    background: 'rgba(249,115,22,.1)', border: '1px solid rgba(249,115,22,.2)',
                    display: 'grid', placeItems: 'center', marginBottom: 12,
                  }}>
                    <Icon size={17} color="#f97316" />
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── What to do ── */}
        <div data-reveal style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font)', fontSize: '1rem', fontWeight: 700, marginBottom: '.35rem' }}>
            What to do if it happens to you
          </h2>
          <p style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
            Follow these steps exactly. Skipping steps or going off-process weakens your case.
          </p>
          <div className="card-grid">
            {whatToDo.map(item => {
              return (
                <div key={item.step} className="card" style={{
                  padding: 20, display: 'flex', gap: 14, alignItems: 'flex-start',
                  borderLeft: `3px solid #f97316`,
                }}>
                  <div style={{
                    minWidth: 34, height: 34, borderRadius: '.5rem',
                    background: 'rgba(249,115,22,.12)', border: '1px solid rgba(249,115,22,.25)',
                    display: 'grid', placeItems: 'center',
                    fontFamily: 'var(--font)', fontSize: '.8rem', fontWeight: 800,
                    color: '#f97316',
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                      {item.title}
                      {item.path && (
                        <ArrowRight size={12} style={{ display: 'inline', marginLeft: 6, color: '#f97316', verticalAlign: 'middle' }} />
                      )}
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── What NOT to do ── */}
        <div data-reveal className="card" style={{
          padding: '1.5rem',
          marginBottom: '2.5rem',
          borderLeft: '3px solid var(--red)',
          background: 'linear-gradient(135deg, rgba(224,49,49,.04) 0%, transparent 100%)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <X size={20} color="var(--red)" />
            <h2 style={{ fontFamily: 'var(--font)', fontSize: '1rem', fontWeight: 700, color: 'var(--red2)' }}>
              What NOT to do
            </h2>
          </div>
          <p style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: '1rem' }}>
            These actions will harm your case, get your report disregarded, or result in action against you.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {whatNotToDo.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--dim)', lineHeight: 1.65 }}>
                <X size={14} color="var(--red)" style={{ flexShrink: 0, marginTop: 3 }} />
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* ── Consequences ── */}
        <div data-reveal style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font)', fontSize: '1rem', fontWeight: 700, marginBottom: '.35rem' }}>
            What happens to the staff member
          </h2>
          <p style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
            Staff are not above the rules. If abuse is verified, consequences are applied — no exceptions, no rank immunity.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {consequences.map(c => (
              <div key={c.tier} className="card" style={{
                padding: '1rem 1.25rem', borderLeft: `3px solid ${c.color}`,
                background: `linear-gradient(135deg, ${c.color}08 0%, transparent 100%)`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%', background: c.color,
                    boxShadow: `0 0 8px ${c.color}60`,
                  }} />
                  <h3 style={{ fontSize: '.85rem', fontWeight: 700, color: c.color }}>{c.tier}</h3>
                </div>
                <p style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.7, paddingLeft: 18 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── No retaliation ── */}
        <div data-reveal className="card" style={{
          padding: '1.25rem 1.5rem',
          borderLeft: '3px solid var(--green)',
          background: 'linear-gradient(135deg, rgba(55,178,77,.03) 0%, transparent 100%)',
          marginBottom: '2.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <Check size={18} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>
                Anti-retaliation protection
              </h3>
              <p style={{ fontSize: '.82rem', color: 'var(--dim)', lineHeight: 1.7 }}>
                Retaliation against a member for submitting a staff conduct report is itself treated as a
                <strong style={{ color: 'var(--text)' }}> separate, additional violation</strong> with escalated consequences.
                If you feel you are being targeted after reporting, submit a follow-up ticket immediately.
                Anti-retaliation reporting is available for 30 days after your original report is closed.
              </p>
            </div>
          </div>
        </div>

        {/* ── Good faith error vs abuse ── */}
        <div data-reveal className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <Info size={18} color="#4dabf7" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>
                Good faith error ≠ power abuse
              </h3>
              <p style={{ fontSize: '.82rem', color: 'var(--dim)', lineHeight: 1.7 }}>
                Staff are human. A moderator who accidentally issues the wrong punishment duration, applies a rule
                inconsistently due to missing context, or makes an honest mistake is not committing power abuse.
                These situations should be addressed through the normal ticket process — ask for clarification or
                correction. The power abuse process is for deliberate misconduct, not good faith mistakes.
                Staff who make mistakes are expected to own them, correct them, and learn from them.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div data-reveal style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(249,115,22,.05) 0%, transparent 100%)',
          border: '1px solid rgba(249,115,22,.2)',
          borderRadius: '1rem',
          padding: '2rem 1.5rem',
        }}>
          <Shield size={28} color="#f97316" style={{ marginBottom: '.75rem' }} />
          <h2 style={{ fontFamily: 'var(--font)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '.5rem' }}>
            Report Staff Conduct
          </h2>
          <p style={{ fontSize: '.85rem', color: 'var(--dim)', maxWidth: 460, margin: '0 auto 1.25rem', lineHeight: 1.7 }}>
            Go to the ticket channel and select the appropriate category. All reports are reviewed by senior staff who are not involved in the incident.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="https://discord.com/channels/1466990155020898413/1467119424455704760"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ fontSize: 14, padding: '10px 24px' }}
            >
              <ExternalLink size={15} /> Open a Ticket
              <ChevronRight size={14} />
            </a>
            <a
              href="https://zepp.noxxbot.com/appeals/1466990155020898413"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              style={{ fontSize: 14 }}
            >
              <ExternalLink size={14} /> Submit Appeal
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
