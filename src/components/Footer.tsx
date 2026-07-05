import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, Shield, BookOpen, Bot, HelpCircle, FileText, AlertTriangle, Scale, Users, Crown, Star } from 'lucide-react'

export default function Footer() {
  const [pfpErrored, setPfpErrored] = useState(false)

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', overflow: 'hidden',
              border: '1.5px solid var(--gold)',
              background: 'linear-gradient(135deg, rgba(224,49,49,.15), rgba(230,180,34,.1))',
              display: 'grid', placeItems: 'center',
            }}>
              {pfpErrored ? (
                <Shield size={12} color="var(--gold)" />
              ) : (
                <img src="/pfp.png" alt="TSHE"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={() => setPfpErrored(true)} />
              )}
            </div>
            <span style={{ fontWeight: 700, fontSize: 14 }}>TSHE</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 20 }}>
            The SnowHaven Empire — community built on respect, safety, and fun. Operated by Xyron Development. Est. 2024.
          </p>
          <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer"
            className="btn btn-primary btn-sm" style={{ fontSize: 12 }}>
            <ExternalLink size={11} /> Join Discord
          </a>
        </div>

        {/* Navigate */}
        <div className="footer-col">
          <h4>Navigate</h4>
          <Link to="/">Home</Link>
          <Link to="/rules">Rules</Link>
          <Link to="/automod">AutoMod</Link>
          <Link to="/punish">Punishments</Link>
          <Link to="/roles">Roles</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/docs">Documentation</Link>
          <Link to="/authority">Staff Authority</Link>
          <Link to="/staff">Staff Guide</Link>
          <Link to="/power-abuse">Power Abuse</Link>
          <Link to="/tickets">Support Tickets</Link>
          <Link to="/partnership">Partnership</Link>
          <Link to="/updates">Updates</Link>
        </div>

        {/* Legal */}
        <div className="footer-col">
          <h4>Legal</h4>
          <Link to="/tos">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/partnership">Partnership</Link>
          <div style={{
            marginTop: 16, padding: '10px 12px',
            background: 'rgba(224,49,49,.06)', borderLeft: '2px solid var(--red)',
            borderRadius: '0 var(--radius) var(--radius) 0',
          }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>
              Zero Tolerance
            </p>
            <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
              Hate speech, doxxing, CSAM, and raiding result in permanent ban with no appeal.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="footer-col">
          <h4>Community</h4>
          <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer">Join Discord</a>
          <a href="https://zepp.noxxbot.com/appeals/1466990155020898413" target="_blank" rel="noreferrer">Submit Appeal</a>
          <a href="/staff-portal">Staff Portal</a>
          <div style={{ marginTop: 16 }}>
            <h4 style={{ marginBottom: 8 }}>Server Info</h4>
            <p>5 punishment tiers</p>
            <p>8-step warn ladder</p>
            <p>24 AutoMod rules</p>
            <p>13+ age requirement</p>
            <p>English primary</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 The SnowHaven Empire &middot; Xyron Development</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <Link to="/tos">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/rules">Rules</Link>
        </div>
      </div>
    </footer>
  )
}
