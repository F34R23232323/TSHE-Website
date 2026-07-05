import React, { useState } from 'react'
import { Shield, AlertTriangle, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react'

interface Rule {
  id: string
  title: string
  summary: string
  fullText: string
  severity: 'red' | 'gold' | 'blue'
  zeroTolerance: boolean
}

const rules: Rule[] = [
  {
    id: 'A1',
    title: 'Discord ToS & Age Requirements',
    summary: 'All members must comply with Discord Terms of Service. You must be 13 or older. Age misrepresentation results in immediate permanent ban and Trust & Safety report.',
    severity: 'red',
    zeroTolerance: true,
    fullText: `All members must comply with Discord's Terms of Service and Community Guidelines at all times. Any ToS violation committed within TSHE is a direct server rule violation resulting in immediate moderation action up to permanent removal.\n\nYou must be 13 or older to use Discord. Misrepresenting, implying, or suggesting any age below 13 in any form — stated age, username, bio, conversation topics, media consumption, or behaviour — results in an Immediate Permanent Ban, no appeal, and a report to Discord Trust & Safety.\n\nAge misrepresentation that causes or risks exposing minors to age-restricted content or NSFW material results in Permanent Ban and report to relevant authorities.\n\nSoliciting age information from other members is prohibited unless you are TSHE staff acting in official moderation capacity. Discord's Terms of Service are incorporated into these rules by reference.`
  },
  {
    id: 'A2',
    title: 'Alternate Accounts & Account Security',
    summary: 'Alt accounts used to evade bans or mutes are permanently banned on detection. Account sharing is prohibited. Staff will never request your password or token.',
    severity: 'red',
    zeroTolerance: true,
    fullText: `Alternate accounts used to access TSHE after a ban, mute, or any active moderation action are permanently banned on detection with all associated accounts included. Alt accounts found passively monitoring the server after a ban are treated as active ban evasion and reported to Discord Trust & Safety.\n\nAccount sharing is prohibited. Any rule violations on a shared account are attributed entirely to the registered account owner.\n\nStaff will never request your password, token, or 2FA codes under any circumstances. Anyone claiming to be staff requesting credentials must be reported immediately.\n\nCompromised accounts causing disruption remain subject to moderation action regardless of the owner's awareness.`
  },
  {
    id: 'A3',
    title: 'Nicknames, Usernames & Profiles',
    summary: 'Names must be mentionable, readable, and free of offensive or NSFW language. Impersonating staff, bots, or members is prohibited.',
    severity: 'gold',
    zeroTolerance: false,
    fullText: `Nicknames and usernames must be mentionable, readable, and free of offensive, discriminatory, or NSFW language. Symbols, Unicode manipulation, invisible characters, or excessive punctuation used to avoid being mentioned or sorted in the member list are prohibited.\n\nProfile pictures must meet the same SFW standards as all other content. Explicit, gory, or discriminatory avatars result in forced removal and formal warning.\n\nImpersonating any staff member, server bot (Noxx, Cattito, Xyron), or other community member via username, nickname, avatar, or communication style is prohibited and results in temporary or permanent ban depending on intent.\n\nStaff may require a nickname change at any time. Failure to comply escalates to a mute.`
  },
  {
    id: 'A4',
    title: 'Privacy & Doxxing',
    summary: 'Sharing personal information without consent is absolutely forbidden. Dox teasing carries an identical penalty. Leaking internal communications results in immediate permanent removal.',
    severity: 'red',
    zeroTolerance: true,
    fullText: `Sharing any personally identifying information — real names, addresses, phone numbers, workplaces, school names, photos, IP addresses, or social media accounts — without the subject's explicit and documented consent is absolutely forbidden.\n\nDox teasing — threatening, implying, or hinting that you possess someone's private information — carries an identical penalty to actual doxxing.\n\nLeaking private server channels, staff discussions, moderation logs, internal bot configurations, or any internal TSHE communications results in immediate permanent removal.\n\nSharing screenshots of private or DM conversations without consent of all participants is a privacy violation. No framing, context, justification, or relationship reduces the penalty.`
  },
  {
    id: 'A5',
    title: 'No Loopholes — Comprehensive Policy',
    summary: 'Attempting to bypass any rule through technical wording or creative interpretation escalates to the maximum available punishment.',
    severity: 'red',
    zeroTolerance: false,
    fullText: `Attempting to bypass any rule through technical wording, claimed intent, "grey area" framing, cultural context, or creative interpretation is treated as a deliberate willful violation.\n\nIf a behavior is disruptive or harmful, staff may act on it even if it is not listed verbatim in these rules. Loophole attempts always escalate the applicable penalty to the maximum available punishment.\n\nRepeated loophole attempts are classified as deliberate defiance and result in a permanent ban. Arguing that a specific behavior was not explicitly listed as forbidden is itself a loophole attempt.`
  },
  {
    id: 'B1',
    title: 'Anti-Harassment — Zero Tolerance',
    summary: 'Bullying, targeted insults, threats, or hostile behaviour directed at any member is prohibited. Death threats and encouragement of self-harm result in immediate permanent ban.',
    severity: 'red',
    zeroTolerance: true,
    fullText: `Bullying, targeted insults, personal attacks, or hostile behaviour directed at any member are prohibited without exception.\n\nDeath threats, encouragement of self-harm, or violent intimidation result in an immediate permanent ban — no warning, no appeal.\n\nSubtle harassment — sustained trolling, rumour-spreading, social exclusion campaigns, deliberate silent treatment, or repeated low-level provocation — is penalised identically to direct harassment.\n\n"I was just joking" is not a defence. Harassment via reactions, stickers, GIFs, quote-replies, or indirect commentary is fully actionable. Staff determinations of harassment are final.`
  },
  {
    id: 'B2',
    title: 'Boundaries & Consent',
    summary: 'When any member expresses discomfort, all parties must stop immediately and permanently. Continuing after being asked to stop is targeted harassment.',
    severity: 'red',
    zeroTolerance: false,
    fullText: `When any member expresses discomfort with an interaction — in any form, any channel, any context — all parties must stop immediately and permanently. Any indication of discomfort is sufficient; formal wording is not required.\n\nContinuing after someone has asked you to stop is targeted harassment. One boundary violation warning is the maximum — any further action results in minimum Tier 3 mute with no additional warning.\n\nRepeatedly initiating contact — messages, pings, reactions, mentions — with members who have indicated they do not wish to engage results in a mute on first confirmed report.`
  },
  {
    id: 'B3',
    title: 'Hate Speech & Discrimination — No Appeal',
    summary: 'Slurs in any form — censored, disguised, or abbreviated — are an instant permanent ban with zero appeal rights. Racism, homophobia, transphobia, ableism — all zero tolerance.',
    severity: 'red',
    zeroTolerance: true,
    fullText: `Slurs in any form — censored versions, dashes, phonetic substitutes, number-letter swaps, abbreviations, or any disguised variant — are an instant permanent ban with zero appeal rights.\n\nRacism, homophobia, transphobia, ableism, antisemitism, islamophobia, or any targeted discrimination results in permanent removal with no appeal regardless of claimed tone.\n\nTSHE operates a strict zero-tolerance policy for all homophobic, transphobic, and anti-LGBT+ conduct. Any language or behaviour that demeans, attacks, or threatens individuals based on sexual orientation, gender identity, or gender expression results in immediate permanent ban.\n\nThis applies to all ableist language targeting disability, neurodivergent conditions (autism, ADHD, dyslexia), or chromosomal conditions (Down syndrome). Ableist slurs result in the same immediate permanent ban.`
  },
  {
    id: 'B4',
    title: 'Extremist Content',
    summary: 'Promoting, glorifying, or sharing extremist ideologies results in immediate permanent ban and Discord Trust & Safety report.',
    severity: 'red',
    zeroTolerance: true,
    fullText: `Promoting, glorifying, sharing, or referencing extremist ideologies — political, religious, or otherwise — results in immediate permanent ban.\n\nSharing symbols, imagery, propaganda, or materials associated with hate groups is forbidden regardless of claimed educational, historical, or ironic intent.\n\nAny attempt to recruit members toward harmful ideologies, groups, or movements results in permanent ban and Discord Trust & Safety report.`
  },
  {
    id: 'B5',
    title: 'Drama, Toxicity & Negative Conduct',
    summary: 'Political debate, extremist rhetoric, and divisive religious commentary remain out of all public channels. Do not manufacture conflict or spread rumors.',
    severity: 'gold',
    zeroTolerance: false,
    fullText: `Political debate, extremist rhetoric, and divisive religious commentary must remain entirely out of all public channels.\n\nDo not manufacture conflict, bait arguments, or deliberately introduce divisive topics to derail conversations. Spreading rumors, false statements, or gossip about members or staff — inside or outside TSHE — is prohibited and actionable with verifiable evidence.\n\nPersistent negativity, chronic complaining disrupting server morale, or passive-aggressive conduct toward the community will result in mute or formal warning.\n\nVenting complaints about moderation decisions in public channels rather than through the official appeal system is treated as disruptive conduct and escalated accordingly.`
  },
  {
    id: 'C1',
    title: 'SFW Standards — Absolute',
    summary: 'TSHE is strictly SFW at all times, in all channels, without exception. NSFW content, gore, shock content, and malware result in immediate action.',
    severity: 'red',
    zeroTolerance: true,
    fullText: `TSHE is a strictly SFW server at all times, in all channels, without exception. Prohibited content includes: explicit or suggestive imagery, NSFW links, sexual commentary, graphic gore, shock content, disturbing media, and real-world violence footage.\n\nNSFW content sent via DMs to TSHE members after meeting them in this server is actionable at the server level. AI-generated content is held to the exact same standards as any other media.\n\nContent containing rapid flashing, strobing, or patterns affecting photosensitive individuals must not be shared. Malware, executables, phishing links, or virus files result in immediate permanent ban.`
  },
  {
    id: 'C2',
    title: 'Channel Discipline & Spam',
    summary: 'Stay on topic. Spam is 4+ identical messages in 30s. Zalgo text and invisible characters are prohibited. Pinging @everyone or staff without reason results in immediate mute.',
    severity: 'gold',
    zeroTolerance: false,
    fullText: `Stay on topic for each channel at all times. Persistent off-topic behavior after a single redirection results in a formal warning. English is required in all general channels.\n\nSpam is defined as: 4 or more similar or identical messages within 30 seconds, excessive rapid emoji/sticker/GIF use, message flooding, blank-line filler posts, or copy-paste repetition.\n\nZalgo text, invisible characters, zero-width characters, text walls, or Unicode manipulation used to disrupt readability or evade moderation is prohibited.\n\nPinging @everyone, @here, staff members, or the server owner without verified explicit need results in immediate mute. Using reply pings or bot commands to circumvent direct ping restrictions is treated as intentional evasion.`
  },
  {
    id: 'C3',
    title: 'Advertising & Self-Promotion',
    summary: 'Advertising Discord servers, bots, or services without explicit prior written staff approval results in immediate permanent ban.',
    severity: 'red',
    zeroTolerance: true,
    fullText: `Advertising Discord servers, bots, external services, referral codes, social media handles, storefronts, or any product without explicit prior written staff approval is prohibited.\n\nAdvertising disguised as natural conversation — casually "mentioning" a server, link, or service — is still treated as unauthorized advertising.\n\nSelf-promotion of personal content is only permitted in designated channels and only after staff approval. Violations result in immediate permanent ban with no prior warning regardless of account age or standing.\n\nThis rule applies to DMs sent to TSHE members as well as public channels.`
  },
  {
    id: 'C4',
    title: 'Voice Channel Conduct',
    summary: 'Maintain reasonable volume. Ear-rape, soundboard abuse, or sustained disruptive noise is prohibited. Recording without consent of every participant is strictly prohibited.',
    severity: 'gold',
    zeroTolerance: false,
    fullText: `Maintain a reasonable volume at all times. Ear-rape, intentional audio distortion, soundboard abuse, or sustained disruptive noise is prohibited.\n\nDo not play unsolicited music, audio clips, or soundbytes without consent of all others in the channel. Mic spam or prolonged silence-holding to block others results in mute.\n\nRecording voice channels without the explicit, affirmative consent of every participant present at the time of recording is strictly prohibited. Impersonating staff in voice channels is treated same as in text channels.`
  },
  {
    id: 'C5',
    title: 'AI-Generated Content',
    summary: 'AI-generated content follows all existing content rules. Impersonating members, staff, or bots via AI is prohibited. Generation for bypassing filters is zero tolerance.',
    severity: 'gold',
    zeroTolerance: true,
    fullText: `AI-generated content (images, text, audio, video) is permitted only where it follows all existing content rules. Using AI tools to generate and flood channels with low-effort, repetitive, or off-topic content is classified as spam.\n\nAI-generated content that mimics, impersonates, or attempts to replicate the communication style of any real member, staff member, or bot is prohibited.\n\nGenerating AI content for the purpose of bypassing filters, creating prohibited material, or circumventing any rule is a zero-tolerance offense.`
  },
  {
    id: 'D1',
    title: 'Direct Message Rules',
    summary: 'Unsolicited DM advertising is actionable at server level. DMing staff to appeal punishments bypasses the official system and results in escalation.',
    severity: 'gold',
    zeroTolerance: false,
    fullText: `Unsolicited DM advertising, server invites, referral links, or service promotion sent to TSHE members is prohibited and actionable at the server level.\n\nSoliciting members to DM you — including directing them to your DMs via server channels — is not permitted. Harassment or threats conducted via DMs is actionable at server level.\n\nDMing staff to appeal punishments, argue moderation decisions, or bypass the official appeal system may result in block, escalated penalty, or extended punishment duration. All appeals must go through the official link. DM appeals are not reviewed.`
  },
  {
    id: 'D2',
    title: 'Off-Server Conduct',
    summary: 'Misconduct targeting TSHE members on external platforms is actionable with verifiable evidence. Coordinating raids results in permanent ban and Trust & Safety report.',
    severity: 'red',
    zeroTolerance: true,
    fullText: `Misconduct targeting TSHE members on external platforms — social media, other Discord servers, games, or elsewhere — is actionable if reported with verifiable evidence.\n\nCoordinating raids, harassment campaigns, or attacks against TSHE from external platforms results in permanent ban and Discord Trust & Safety report.\n\nAttempting to organize any action harming TSHE members, staff, or the server's standing — regardless of platform — is a zero-tolerance offense. Members are solely responsible for their off-server conduct.`
  },
  {
    id: 'E1',
    title: 'Staff Authority & Compliance',
    summary: 'Staff hold final and absolute authority over all moderation decisions. Failure to follow reasonable staff instruction escalates the penalty immediately.',
    severity: 'gold',
    zeroTolerance: false,
    fullText: `Staff and the server owner hold final and absolute authority over all moderation decisions within TSHE. Staff are authorized to mute, warn, kick, ban, or take any other action — including against other staff — when community safety requires it.\n\nCalm, private questions about decisions are permitted. Public disputes, backtalk, non-compliance, or attempts to gather server opinion about a moderation action will immediately escalate the existing penalty.\n\nFailure to follow a reasonable staff instruction — stopping a behavior, changing nickname, moving channels — is a Tier 2 Mute on first occurrence and escalates with each repetition.\n\nStaff may issue preemptive mutes or bans to protect the community before a situation escalates.`
  },
  {
    id: 'E2',
    title: 'Mini-Modding',
    summary: 'Only designated TSHE staff may enforce rules, issue warnings, or intervene. Publicly calling out violations without authorization results in Tier 2 Mute.',
    severity: 'gold',
    zeroTolerance: false,
    fullText: `Only designated TSHE staff may enforce rules, issue warnings, or intervene in rule violations. Publicly calling out, warning, threatening, or attempting to punish members without staff authorization is classified as mini-modding.\n\nMini-modding results in a Tier 2 Mute on first offense and escalates to temporary ban if repeated. If you witness a rule violation, use the official report system — do not confront the violator directly.`
  },
  {
    id: 'F1',
    title: 'Bot Rules (Noxx, Cattito & Xyron)',
    summary: 'Abusing, spamming, or exploiting bot commands is prohibited. Impersonating any TSHE bot is treated as staff impersonation.',
    severity: 'gold',
    zeroTolerance: true,
    fullText: `TSHE bots — Noxx, Cattito, and Xyron — are official server tools. Abusing, spamming, or exploiting bot commands to disrupt channels or other members is prohibited.\n\nAttempting to manipulate, break, or reverse-engineer bot behavior through edge-case inputs, rapid commands, or parameter manipulation is prohibited.\n\nImpersonating any TSHE bot in usernames, nicknames, avatars, or communication style is treated as staff impersonation. Bot status channels and update channels are read-only and informational.`
  },
  {
    id: 'G1',
    title: 'Appeals',
    summary: 'If you believe a moderation action was in error, submit via the official appeal portal. Hostile or accusatory appeals are denied immediately without review.',
    severity: 'blue',
    zeroTolerance: false,
    fullText: `If you believe a moderation action was applied in error, submit an appeal at https://zepp.noxxbot.com/appeals/1466990155020898413.\n\nAppeals must be submitted calmly and respectfully. Hostile, demanding, or accusatory appeals are denied immediately without review. Submitting false information or manipulative framing results in permanent appeal blacklist.\n\nArguing your case publicly in server channels rather than through the appeal system results in immediate denial and potential escalation.\n\nStaff decisions on appeals are final. Re-submitting a closed appeal without new verifiable evidence will be ignored. Appeals for zero-tolerance offenses are not accepted under any circumstances.`
  },
  {
    id: 'G2',
    title: 'Consequence Summary',
    summary: 'From verbal warnings to permanent bans — all enforcement follows a documented, transparent escalation system.',
    severity: 'blue',
    zeroTolerance: false,
    fullText: `Enforcement escalation:\n\n1. Deletion / Minor Timeout (1-5m) — Low-level disruption requiring immediate correction.\n2. Formal Warning — First content or conduct violation. Warnings are permanent and never expire.\n3. Temporary Mute (30m-24h) — Toxicity, defiance, repeated offenses.\n4. Temporary Ban (1-30d) — Severe misconduct, sustained harassment, hate-adjacent behavior.\n5. Permanent Ban — Zero-tolerance violations. Most are non-appealable.\n\nInfractions across multiple categories within a short period may be combined and escalated at staff discretion.`
  },
]

const severityColors: Record<string, { color: string; bg: string; label: string }> = {
  red: { color: 'var(--red)', bg: 'rgba(224,49,49,.06)', label: 'Zero Tolerance / Severe' },
  gold: { color: 'var(--gold)', bg: 'rgba(230,180,34,.06)', label: 'Moderate / Escalating' },
  blue: { color: 'var(--blue)', bg: 'rgba(77,171,247,.06)', label: 'Procedural' },
}

export default function Rules() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [severityFilter, setSeverityFilter] = useState<'all' | 'red' | 'gold' | 'blue'>('all')
  const [sortOrder, setSortOrder] = useState<'default' | 'severity' | 'az'>('default')

  const handleFilter = (id: 'all' | 'red' | 'gold' | 'blue') => {
    setExpanded(null)
    setSeverityFilter(id)
  }
  const handleSort = (id: 'default' | 'severity' | 'az') => {
    setExpanded(null)
    setSortOrder(id)
  }

  const filtered = rules
    .filter(r => severityFilter === 'all' || r.severity === severityFilter)
    .sort((a, b) => {
      if (sortOrder === 'severity') {
        const order = { red: 0, gold: 1, blue: 2 }
        return (order[a.severity] ?? 9) - (order[b.severity] ?? 9)
      }
      if (sortOrder === 'az') return a.title.localeCompare(b.title)
      return 0
    })

  return (
    <div className="page-section" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <div className="section-header">
        <div className="section-label">Community Codex</div>
        <h1 className="section-title">Rules &amp; Policies</h1>
        <p className="section-desc" style={{ maxWidth: 560 }}>
          All members must read and follow these rules. Ignorance is never a valid defense. Staff determinations are final. The appeal system is the sole mechanism for dispute.
        </p>
        <a href="https://zepp.noxxbot.com/appeals/1466990155020898413" target="_blank" rel="noreferrer" className="btn btn-gold btn-sm" style={{ marginTop: 12 }}>
          <ExternalLink size={12} /> Submit an Appeal
        </a>
      </div>

      {/* Filter + Sort controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20, alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em', marginRight: 4 }}>Filter:</span>
        {([
          { id: 'all' as const, label: 'All Rules', color: 'var(--dim)' },
          { id: 'red' as const, label: 'Severe / ZT', color: 'var(--red)' },
          { id: 'gold' as const, label: 'Moderate', color: 'var(--gold)' },
          { id: 'blue' as const, label: 'Procedural', color: 'var(--blue)' },
        ]).map(f => (
          <button key={f.id} type="button"
            onClick={() => handleFilter(f.id)}
            className="btn btn-ghost btn-sm"
            style={{
              borderColor: severityFilter === f.id ? f.color + '50' : 'transparent',
              color: severityFilter === f.id ? f.color : 'var(--muted)',
              fontWeight: severityFilter === f.id ? 600 : 500,
            }}>
            {f.label} {f.id !== 'all' && <span style={{ fontSize: 10, opacity: .6 }}>({rules.filter(r => r.severity === f.id).length})</span>}
          </button>
        ))}
        <span style={{ color: 'var(--border)', margin: '0 4px' }}>|</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>Sort:</span>
        {([
          { id: 'default' as const, label: 'Default' },
          { id: 'severity' as const, label: 'Severity' },
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
        {filtered.map(rule => {
          const sv = severityColors[rule.severity]
          const open = expanded === rule.id
          return (
            <div key={rule.id} data-reveal
              style={{
                border: `1px solid ${open ? sv.color + '40' : 'var(--border)'}`,
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                transition: 'border-color .15s',
              }}
            >
              <button
                onClick={() => setExpanded(open ? null : rule.id)}
                className="accordion-trigger"
                style={{
                  border: 'none',
                  background: open ? sv.bg : 'var(--bg1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{
                      fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700,
                      color: sv.color, minWidth: 24,
                    }}>
                      {rule.id}
                    </span>
                    <Shield size={14} color={sv.color} style={{ flexShrink: 0, marginTop: 1 }} />
                  </div>
                  <div style={{ textAlign: 'left', flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{rule.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: open ? 'unset' : 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {rule.summary}
                    </div>
                  </div>
                  {rule.zeroTolerance && (
                    <span className="badge badge-red" style={{ flexShrink: 0 }}>
                      <AlertTriangle size={9} /> ZT
                    </span>
                  )}
                  <span className="badge" style={{
                    flexShrink: 0,
                    background: `${sv.color}10`, color: sv.color, border: `1px solid ${sv.color}25`,
                  }}>
                    {sv.label.split(' / ')[0]}
                  </span>
                </div>
                <ChevronDown size={16} color="var(--muted)" style={{
                  transform: open ? 'rotate(180deg)' : 'none',
                  transition: 'transform .15s', flexShrink: 0,
                }} />
              </button>
              {open && (
                <div className="accordion-content">
                  {rule.fullText.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{
        marginTop: 48,
        padding: 20,
        background: 'var(--bg1)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>
          These rules are enforced by automated moderation, staff review, and community reporting. View the full enforcement guide:
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/punish" className="btn btn-secondary btn-sm">Punishments Guide</a>
          <a href="/automod" className="btn btn-secondary btn-sm">AutoMod Reference</a>
          <a href="https://zepp.noxxbot.com/appeals/1466990155020898413" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
            <ExternalLink size={12} /> Submit Appeal
          </a>
        </div>
      </div>
    </div>
  )
}
