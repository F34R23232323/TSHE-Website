import React, { useState } from 'react'
import { HelpCircle, ChevronDown } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface FAQItem {
  q: string
  a: string
  category: string
}

const faqItems: FAQItem[] = [
  {
    q: 'How do I appeal a ban or warning?',
    a: 'Submit your appeal at https://zepp.noxxbot.com/appeals/1466990155020898413. Appeals must be submitted calmly and respectfully with all relevant evidence. Do not DM staff about appeals — your appeal will be voided and your penalty may be extended. Appeals for zero-tolerance offenses (hate speech, doxxing, CSAM, threats, advertising) are never accepted.',
    category: 'Appeals & Warnings',
  },
  {
    q: 'How long do warnings last?',
    a: 'Warnings are permanent and never expire. They remain on your record for life. Your full moderation history is visible to all staff on every case. Major offenses (hate speech, doxxing, etc.) bypass the warning system entirely and result in immediate permanent action. Returning from a ban does not clear your record.',
    category: 'Appeals & Warnings',
  },
  {
    q: 'Can I argue a warning in a public channel?',
    a: 'No. Publicly arguing, disputing, or complaining about a warning is treated as a new violation and results in an additional warning. Harassment of the warning-issuing staff member results in immediate mute and escalated warning count. Use the official appeal system at https://zepp.noxxbot.com/appeals/1466990155020898413 instead.',
    category: 'Appeals & Warnings',
  },
  {
    q: 'Why was my message deleted automatically?',
    a: 'Messages are auto-deleted if they trigger spam limits (4+ identical messages in 30s), contain prohibited content (hate speech, slurs, scam links, NSFW), exceed emoji/mention thresholds, or include unauthorized Discord invites. AI moderation also flags messages for toxicity, threats, harassment, doxxing, and other harmful content.',
    category: 'AutoMod',
  },
  {
    q: 'What is AI moderation and how does it work?',
    a: 'TSHE uses AI moderation to scan messages for harmful content including toxicity, hate speech, threats, harassment, doxxing, sexual content, self-harm content, scams, and illegal activity. AI flags are reviewed by staff before action is taken. AI moderation does not automatically punish — it alerts staff for review.',
    category: 'AutoMod',
  },
  {
    q: 'Can I use another language in the server?',
    a: 'English is required in all general channels. Other languages are only permitted in designated language channels.',
    category: 'Rules & Conduct',
  },
  {
    q: 'What counts as harassment?',
    a: 'Harassment is any sustained or repetitive behaviour targeting a specific individual or group — including messages, pings, reactions, stickers, GIFs, and indirect commentary meant to annoy, distress, or provoke. Subtle harassment (trolling, rumour-spreading, social exclusion) is treated identically to direct harassment. "I was joking" is never a valid defence.',
    category: 'Rules & Conduct',
  },
  {
    q: 'Can I report someone for behavior outside the server?',
    a: 'Yes, if there is verifiable evidence (screenshots, logs). Staff may take action on off-server conduct that negatively impacts the server community — including on social media, other Discord servers, or games.',
    category: 'Rules & Conduct',
  },
  {
    q: 'How do I contact staff?',
    a: 'Use the designated ticket or moderation report channel. Do not DM staff directly about moderation issues — this will result in a block, escalated penalty, and permanent disqualification from appeal eligibility. All appeals go through the official system only.',
    category: 'Staff & Roles',
  },
  {
    q: 'What is the Emergency Staff Ping and when can I use it?',
    a: 'The Emergency Staff Ping notifies all staff simultaneously. It is reserved for real emergencies only (active raids, serious threats, immediate harm to members). Misuse results in a permanent ban — appealable only for documented staff error.',
    category: 'Staff & Roles',
  },
  {
    q: 'Can I share my Discord server or social media?',
    a: 'Only with explicit prior written staff approval. Unauthorized advertising — including Discord servers, external services, referral codes, social media handles, and storefronts — results in an immediate permanent ban with no warning and no appeal. This includes advertising disguised as casual conversation.',
    category: 'Advertising & Links',
  },
  {
    q: 'My account was hacked and I got banned — what do I do?',
    a: 'Open a ticket immediately with evidence of the compromise. Compromised accounts that cause disruption remain subject to moderation action at staff discretion. Change your password, enable 2FA, revoke all authorized apps, and log out of all sessions. See the Security Hub in the server for detailed steps.',
    category: 'Account & Security',
  },
  {
    q: 'How do I get roles on the server?',
    a: 'Visit the #get-roles channel. You can select age roles, relationship status, DM status, gaming platforms, ping roles (announcements, events, giveaways, etc.), and notification roles from interactive dropdowns. Level roles are earned automatically by being active in chat.',
    category: 'Staff & Roles',
  },
]

const categories = ['Appeals & Warnings', 'AutoMod', 'Rules & Conduct', 'Staff & Roles', 'Advertising & Links', 'Account & Security']

export default function FAQ() {
  useScrollReveal()
  const [active, setActive]   = useState<string | null>(null)
  const [catFilter, setCat]   = useState<string>('All')

  const cats = ['All', ...categories]
  const visible = catFilter === 'All' ? faqItems : faqItems.filter(f => f.category === catFilter)

  return (
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 820, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <div data-reveal style={{
          display: 'inline-flex', alignItems: 'center', gap: '.5rem',
          background: 'rgba(200,30,50,.08)', border: '1px solid rgba(200,30,50,.2)',
          borderRadius: 99, padding: '.3rem .9rem',
          fontFamily: 'var(--font)', fontSize: '.62rem', letterSpacing: '.12em',
          color: 'var(--red2)', textTransform: 'uppercase', marginBottom: '1rem',
        }}>
          <HelpCircle size={10} /> FAQ
        </div>
        <h1 data-reveal data-delay="1" style={{
          fontFamily: 'var(--font)', fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700, letterSpacing: '-.02em', marginBottom: '.75rem',
          background: 'linear-gradient(135deg, var(--gold2), var(--red2))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Frequently Asked Questions
        </h1>
        <p data-reveal data-delay="2" style={{ fontSize: '.88rem', color: 'var(--dim)', maxWidth: 540, margin: '0 auto' }}>
          Answers to the most common questions from SnowHaven members.
        </p>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            fontFamily: 'var(--font)', fontSize: '.62rem', letterSpacing: '.07em',
            fontWeight: 600, cursor: 'pointer',
            padding: '.28rem .75rem', borderRadius: '.35rem',
            background: catFilter === c ? 'rgba(200,30,50,.12)' : 'var(--bg2)',
            border: `1px solid ${catFilter === c ? 'rgba(200,30,50,.3)' : 'var(--border)'}`,
            color: catFilter === c ? 'var(--red2)' : 'var(--muted)',
            transition: 'all .15s',
          }}>{c}</button>
        ))}
      </div>

      {/* FAQ items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
        {visible.map((item, i) => {
          const key = item.category + i
          const open = active === key
          return (
            <div key={key} style={{
              background: 'var(--bg1)', border: `1px solid ${open ? 'rgba(200,30,50,.2)' : 'var(--border)'}`,
              borderRadius: '.75rem', overflow: 'hidden',
              transition: 'border-color .15s',
            }}>
              <button onClick={() => setActive(open ? null : key)} style={{
                width: '100%', textAlign: 'left',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '.75rem',
                padding: '1rem 1.15rem',
                background: open ? 'var(--bg3)' : 'none',
                border: 'none', color: 'var(--text)',
                fontFamily: 'var(--font)', fontSize: '.83rem', fontWeight: 600,
                cursor: 'pointer', transition: 'background .15s',
                lineHeight: 1.5,
              }}>
                <span>{item.q}</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '.3rem', flexShrink: 0 }}>
                  <span style={{
                    fontSize: '.58rem', fontFamily: 'var(--font)', letterSpacing: '.06em',
                    padding: '2px 7px', borderRadius: 4,
                    background: 'rgba(200,30,50,.08)', border: '1px solid rgba(200,30,50,.15)',
                    color: 'var(--red2)', whiteSpace: 'nowrap',
                  }}>{item.category}</span>
                  <ChevronDown size={14} color="var(--muted)" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
                </div>
              </button>
              {open && (
                <div style={{ padding: '1rem 1.15rem 1.15rem', background: 'var(--bg1)', borderTop: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.75 }}>
                    {item.a.includes('http')
                      ? item.a.split(/(https?:\/\/\S+)/).map((part: string, j: number) =>
                          part.startsWith('http') ? <a key={j} href={part} target="_blank" rel="noreferrer" style={{ color: 'var(--red2)', textDecoration: 'underline' }}>{part}</a> : part
                        )
                      : item.a
                    }
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
