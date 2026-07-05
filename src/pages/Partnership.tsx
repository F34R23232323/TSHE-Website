import React, { useState } from 'react'
import { ExternalLink, Shield, Star, MessageCircle, Crown, Users, Code, Megaphone, Check, ChevronRight, Bot, Zap, Copy, ClipboardCheck } from 'lucide-react'

const perks = [
  {
    icon: Megaphone,
    title: 'Cross-promotion',
    desc: 'Your server gets a dedicated channel and role in our network. We announce your events and milestones to our community of 1,500+ members.'
  },
  {
    icon: Users,
    title: 'Community integration',
    desc: 'Shared events, game nights, and collaborative activities between our communities. Staff coordination for joint moderation.'
  },
  {
    icon: Code,
    title: 'Bot & tool access',
    desc: 'Access to our custom Discord bot ecosystem — Noxx (150+ commands), TSHE Tickets, and more.'
  },
  {
    icon: Shield,
    title: 'Staff support',
    desc: 'Cross-server moderation cooperation. Shared ban lists for zero-tolerance offenders. Staff training and resource sharing.'
  },
  {
    icon: Star,
    title: 'VIP status',
    desc: 'Your community gets VIP recognition across our network. Featured on our website, Discord panels, and announcement channels.'
  },
  {
    icon: MessageCircle,
    title: 'Partner channels',
    desc: 'Dedicated partner channels in our server for your members. Direct line to our staff team for support and escalation.'
  },
]

const requirements = [
  '500+ members in your Discord server',
  'Active, engaged community — not a dead or bot-filled server',
  'SFW content only — must align with our zero-tolerance policies',
  'Established staff/moderation team',
  'No history of raids, toxicity, or ToS violations',
  'Willingness to cross-promote and collaborate',
  'English-speaking or primarily English community',
]

const serverAdText = `🔰 **Welcome to The SnowHaven Empire!** 🔰

TSHE is a community built on **respect, safety, and fun** — founded in 2024 with a commitment to transparency and genuine connection. Whether you're looking to chat, game, or just hang out in a well-moderated space, you've found the right place.

✨ **What We Offer:**
• 🛡️ **Transparent moderation** — every punishment is documented and appealable
• 🤖 **30+ AutoMod rules** scanning messages 24/7 with AI-powered filtering
• 👥 **Active, friendly community** — real people, no bot farms
• 🎮 **Gaming channels** for PC, console, and mobile with regular events
• 🎫 **Custom ticket system** — the TSHE Tickets bot, purpose-built for us
• 📋 **Clear rules & enforcement** — full Codex, punishment guide, and escalation ladder
• 🏆 **13 level roles** from Newbie to Godlike — earn perks as you chat
• 💬 **Dedicated partner channels** if you're part of another server

## 🔰 Getting Started

✅ **Read the rules** in <#1467119424455704760> before chatting.
❓ **Need help?** Open a ticket in the support channel — staff respond within 24 hours.
🎨 **Grab your roles** in the self-roles channel to customise your profile.

📌 **Please note:** TSHE is strictly SFW at all times. Hate speech, doxxing, and NSFW content result in immediate permanent ban — no exceptions, no appeals.

🔰 **Welcome to The SnowHaven Empire — we're glad you're here!**
https://discord.gg/DeSrm3WNmk`

export default function Partnership() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(serverAdText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="page-section" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <div className="section-header">
        <div className="section-label">Partnership</div>
        <h1 className="section-title">Partner With The Empire</h1>
        <p className="section-desc" style={{ maxWidth: 560 }}>
          Build a lasting alliance with The SnowHaven Empire. We're looking for established, active communities that share our values of safety, respect, and fun.
        </p>
      </div>

      {/* ── Why partner ── */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>What you get</h2>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>Partnership is a two-way street. Here's what we bring to the table.</p>

        <div className="card-grid">
          {perks.map(p => {
            const Icon = p.icon
            return (
              <div key={p.title} data-reveal className="card" style={{ padding: 20 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 'var(--radius)',
                  background: 'rgba(230,180,34,.08)', border: '1px solid rgba(230,180,34,.2)',
                  display: 'grid', placeItems: 'center', marginBottom: 12,
                }}>
                  <Icon size={17} color="var(--gold)" />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Requirements ── */}
      <div className="card" data-reveal style={{
        padding: 24,
        marginBottom: 48,
        borderLeft: '3px solid var(--gold)',
        background: 'linear-gradient(135deg, rgba(230,180,34,.03) 0%, transparent 100%)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Crown size={20} color="var(--gold)" />
          <h2 style={{ fontSize: 18, fontWeight: 800 }}>Requirements</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {requirements.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--dim)' }}>
              <Check size={16} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
              {r}
            </div>
          ))}
        </div>
      </div>

      {/* ── Server Ad (copy-paste for partners) ── */}
      <div data-reveal style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Server Ad</h2>
            <p style={{ fontSize: 13, color: 'var(--muted)' }}>
              Copy and post this in your server's partner channel.
            </p>
          </div>
          <button
            onClick={handleCopy}
            className={copied ? 'btn btn-gold' : 'btn btn-secondary'}
            style={{ fontSize: 13 }}
          >
            {copied ? (
              <><ClipboardCheck size={14} /> Copied!</>
            ) : (
              <><Copy size={14} /> Copy Ad</>
            )}
          </button>
        </div>

        <div style={{
          background: '#13151a',
          border: '1px solid rgba(224,49,49,.15)',
          borderRadius: '.85rem',
          padding: '1.75rem',
          fontFamily: 'var(--font)',
          fontSize: '.84rem',
          color: '#d4d0dc',
          lineHeight: 1.8,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          {serverAdText}
        </div>
      </div>

      {/* ── How to apply ── */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>How to Apply</h2>
        <p style={{ fontSize: 14, color: 'var(--dim)', maxWidth: 500, margin: '0 auto 24px', lineHeight: 1.7 }}>
          Join our server, open a partnership ticket, and our staff will review your application within 48 hours.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer" className="btn btn-primary">
            <ExternalLink size={14} /> Join TSHE &amp; Apply
          </a>
          <a href="/rules" className="btn btn-secondary">Read Our Rules</a>
        </div>
      </div>

      {/* ── Contact ── */}
      <div style={{ marginTop: 48, textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: 'var(--muted)' }}>
          Have questions? Join our server and open a ticket. Staff will respond within 24 hours.
        </p>
        <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 13, fontWeight: 600, color: 'var(--gold)' }}>
          <ExternalLink size={13} /> discord.gg/tshe
        </a>
      </div>
    </div>
  )
}
