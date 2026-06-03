export interface RuleField {
  name: string;
  value: string;
}

export interface RuleSection {
  id: string;
  title: string;
  icon: string;
  color: 'ice' | 'gold' | 'red' | 'green' | 'purple';
  fields: RuleField[];
}

// ── RULES ──────────────────────────────────────────────────────────────────────

export const ruleSections: RuleSection[] = [
  {
    id: 'foundation',
    title: 'Community Foundation',
    icon: 'BookOpen',
    color: 'ice',
    fields: [
      {
        name: 'A1 — Discord ToS & Age Requirement',
        value: 'All members must comply with Discord\'s Terms of Service at all times without exception. You must be **13 or older** (or meet your region\'s legal minimum age) to participate in TSHE. Misrepresenting your age in any way — including in usernames, bios, conversation, or media — results in an **immediate permanent ban**. Any content that violates Discord\'s ToS is simultaneously a TSHE violation, regardless of whether it is listed here explicitly. Discord ToS violations are always zero-tolerance. No warnings are issued.',
      },
      {
        name: 'A2 — Alternate Accounts & Account Security',
        value: 'Alternate accounts used to access TSHE after a ban, mute, or any active moderation action are **permanently banned on detection**, with all associated accounts included. Alt accounts found to be passively monitoring the server after a ban are treated as active ban evasion and reported to Discord Trust & Safety. Account sharing is prohibited. Any rule violations committed on a shared account are attributed entirely to the registered account owner — no exceptions. Staff will **never** request your password, token, or 2FA codes under any circumstances. Anyone claiming to be staff and requesting credentials is to be reported immediately. Compromised accounts that cause disruption to the server remain subject to moderation action at staff discretion, regardless of the owner\'s awareness.',
      },
      {
        name: 'A3 — Nicknames, Usernames & Profiles',
        value: 'Nicknames and usernames must be mentionable, readable, and free of offensive, discriminatory, or NSFW language. Symbols, Unicode manipulation, invisible characters, or excessive punctuation used to avoid being mentioned or sorted in the member list are prohibited. Profile pictures must meet the same SFW standards as all other content. Explicit, gory, or discriminatory avatars result in a forced removal and formal warning. Impersonating any staff member, server bot (Noxx, Cattito, Xyron), or other community member via username, nickname, avatar, or communication style is prohibited and results in a **temporary or permanent ban** depending on intent. Staff may require a nickname change at any time. Failure to comply within a reasonable window escalates to a mute.',
      },
      {
        name: 'A4 — Privacy & Doxxing',
        value: 'Sharing any personally identifying information — including real names, addresses, phone numbers, workplaces, school names, photos, IP addresses, or social media accounts — without the subject\'s **explicit and documented consent** is **absolutely forbidden**. Dox teasing — threatening, implying, or hinting that you possess someone\'s private information — carries an **identical penalty** to actual doxxing. Leaking private server channels, staff discussions, moderation logs, internal bot configurations, or any internal TSHE communications results in **immediate permanent removal**. Sharing screenshots of private or DM conversations without the consent of all participants is a privacy violation. No framing, context, justification, or relationship to the subject reduces the penalty for any doxxing offense.',
      },
      {
        name: 'A5 — No Loopholes — Absolute Policy',
        value: 'Attempting to bypass any rule through technical wording, claimed intent, "grey area" framing, cultural context, or creative interpretation is treated as a **deliberate willful violation**. If a behavior is disruptive or harmful, staff may act on it even if it is not listed verbatim in these rules. Loophole attempts always escalate the applicable penalty to the **maximum available punishment** for the offense tier. Repeated loophole attempts are classified as deliberate defiance and result in a **permanent ban**. Arguing that a specific behavior was not explicitly listed as forbidden is itself a loophole attempt.',
      },
    ],
  },
  {
    id: 'harassment',
    title: 'Anti-Harassment & Boundaries',
    icon: 'ShieldX',
    color: 'red',
    fields: [
      {
        name: 'B1 — Anti-Harassment — Zero Tolerance',
        value: 'Bullying, targeted insults, personal attacks, or hostile behaviour directed at any member are prohibited without exception. Death threats, encouragement of self-harm, or violent intimidation result in an immediate permanent ban — no warning, no appeal. Subtle harassment — sustained trolling, rumour-spreading, social exclusion campaigns, deliberate silent treatment, or repeated low-level provocation — is penalised identically to direct harassment. "I was just joking" is not a defence. Harassment via reactions, stickers, GIFs, quote-replies, or indirect commentary is fully actionable. If staff determines behaviour constitutes harassment, that determination is final — it is not subject to debate, vote, or "context" arguments.',
      },
      {
        name: 'B2 — Boundaries & Consent',
        value: 'When any member expresses discomfort with an interaction — in any form, any channel, any context — all parties must stop immediately and permanently. Any indication of discomfort is sufficient; formal wording is not required. Continuing after someone has asked you to stop is targeted harassment. One boundary violation warning is the maximum issued — any further action after that warning results in a minimum Tier 3 mute with no additional warning. Repeatedly initiating contact — messages, pings, reactions, mentions — with members who have indicated they do not wish to engage results in a mute on first confirmed report.',
      },
    ],
  },
  {
    id: 'hatespeech',
    title: 'Zero Tolerance: Hate Speech & Slurs',
    icon: 'ShieldX',
    color: 'red',
    fields: [
      {
        name: 'B3 — Hate Speech & Discrimination — No Appeal',
        value: 'Slurs in any form — censored versions, dashes, phonetic substitutes, number-letter swaps, abbreviations, or any disguised variant — are an instant permanent ban with zero appeal rights. The intent to evade detection escalates the penalty further. Racism, homophobia, transphobia, ableism, antisemitism, islamophobia, or any targeted discrimination results in permanent removal with no appeal, regardless of claimed tone. "I was joking", "it\'s ironic", "it\'s a meme", or "it\'s my culture" are explicitly invalid defences. Content is assessed by its impact, not the sender\'s claimed intent. TSHE operates a strict zero-tolerance policy for all homophobic, transphobic, and anti-LGBT+ conduct. Any language, content, or behaviour that demeans, attacks, threatens, dehumanises, or calls for harm against individuals based on sexual orientation, gender identity, or gender expression results in immediate permanent ban with no prior warning. This also applies to all ableist language targeting individuals based on disability, neurodivergent conditions (autism, ADHD, dyslexia), or chromosomal conditions (Down syndrome). Ableist slurs or hate in any form result in the same immediate permanent ban.',
      },
      {
        name: 'B4 — Extremist Content',
        value: 'Promoting, glorifying, sharing, or referencing extremist ideologies — political, religious, or otherwise — results in an immediate permanent ban. Sharing symbols, imagery, propaganda, or materials associated with hate groups is forbidden regardless of claimed educational, historical, or ironic intent. Any attempt to recruit members toward harmful ideologies, groups, or movements results in a permanent ban and Discord Trust & Safety report.',
      },
    ],
  },
  {
    id: 'conduct',
    title: 'Drama, Toxicity & Conduct',
    icon: 'MessageSquare',
    color: 'gold',
    fields: [
      {
        name: 'B5 — Drama, Toxicity & Negative Conduct',
        value: 'Political debate, extremist rhetoric, and divisive religious commentary must remain entirely out of all public channels. Do not manufacture conflict, bait arguments, or deliberately introduce divisive topics to derail conversations. Spreading rumors, false statements, or gossip about members, staff, or the server — whether inside or outside TSHE — is prohibited and actionable with verifiable evidence. Persistent negativity, chronic complaining that disrupts server morale, or passive-aggressive conduct toward the community will result in a mute or formal warning. Venting complaints about moderation decisions in public channels rather than through the official appeal system is treated as disruptive conduct and escalated accordingly.',
      },
    ],
  },
  {
    id: 'communication',
    title: 'Communication & Channel Standards',
    icon: 'MessageSquare',
    color: 'ice',
    fields: [
      {
        name: 'C1 — SFW Standards — Absolute',
        value: 'TSHE is a **strictly SFW server at all times, in all channels, without exception**. Prohibited content includes: explicit or suggestive imagery, NSFW links, sexual commentary, graphic gore, shock content, disturbing media, and real-world violence footage. NSFW content sent via DMs to TSHE members after meeting them in this server is actionable at the server level. AI-generated content is held to the exact same standards as any other media. AI origin does not reduce the severity of a violation. Content containing rapid flashing, strobing, or patterns that may affect photosensitive individuals must not be shared in any channel. Malware, executables, phishing links, virus files, or harmful digital content result in an **immediate permanent ban**.',
      },
      {
        name: 'C2 — Channel Discipline & Spam',
        value: 'Stay on topic for each channel at all times. Persistent off-topic behavior after a single redirection results in a formal warning. English is required in all general channels. Dedicated language channels are exempt. Spam is defined as: 4 or more similar or identical messages within 30 seconds, excessive rapid emoji/sticker/GIF use, message flooding, blank-line filler posts, or copy-paste repetition. Zalgo text, invisible characters, zero-width characters, text walls, or Unicode manipulation used to disrupt readability or evade moderation systems is prohibited. Spoilers must always use Discord\'s native spoiler tag formatting. Untagged spoilers are deleted without warning. Pinging `@everyone`, `@here`, staff members, or the server owner without verified explicit need results in an **immediate mute**. Using reply pings, indirect mentions, or bot commands to circumvent direct ping restrictions is treated as intentional evasion and escalated.',
      },
      {
        name: 'C3 — Advertising & Self-Promotion',
        value: 'Advertising Discord servers, bots, external services, referral codes, social media handles, storefronts, or any product without **explicit prior written staff approval** is prohibited. Advertising disguised as natural conversation — casually "mentioning" a server, link, or service — is still treated as unauthorized advertising. Self-promotion of personal content (streams, YouTube, TikTok, etc.) is only permitted in the designated self-promotion channels and only after staff approval. Violations result in an **immediate permanent ban with no prior warning**, regardless of account age or standing. This rule applies to DMs sent to TSHE members as well as public channels.',
      },
      {
        name: 'C4 — Voice Channel Conduct',
        value: 'Maintain a reasonable volume at all times. Ear-rape, intentional audio distortion, soundboard abuse, or sustained disruptive noise is prohibited. Do not play unsolicited music, audio clips, text-to-speech, or soundbytes without the consent of all others currently in the channel. Mic spam, prolonged silence-holding to block others from joining (channel squatting), or disruptive background noise after being asked to stop results in a mute. Recording voice channels without the **explicit, affirmative consent of every participant** present at the time of recording is strictly prohibited. Impersonating staff or claiming false moderation authority in voice channels is treated the same as impersonation in text channels.',
      },
      {
        name: 'C5 — AI-Generated Content',
        value: 'AI-generated content (images, text, audio, video) is permitted only where it follows all existing content rules. Using AI tools to generate and flood channels with low-effort, repetitive, or off-topic content is classified as spam. AI-generated content that mimics, impersonates, or attempts to replicate the communication style of any real member, staff member, or bot (Noxx, Cattito, Xyron) is prohibited. Generating AI content for the purpose of bypassing filters, creating prohibited material, or circumventing any rule is a zero-tolerance offense.',
      },
    ],
  },
  {
    id: 'dmconduct',
    title: 'DM & Off-Server Conduct',
    icon: 'Mail',
    color: 'gold',
    fields: [
      {
        name: 'D1 — Direct Message Rules',
        value: 'Unsolicited DM advertising, server invites, referral links, or service promotion sent to TSHE members is prohibited and actionable at the server level. Soliciting members to DM you — including directing them to your DMs, bio, or profile via server channels for any reason — is not permitted. Harassment, threats, or targeted abuse conducted via DMs is actionable at the server level regardless of where it occurs. DMing staff to appeal punishments, argue moderation decisions, or bypass the official appeal system may result in a **block, escalated penalty, or extended punishment duration**. All appeals must be submitted through the official link. DM appeals are not reviewed under any circumstances.',
      },
      {
        name: 'D2 — Off-Server Conduct',
        value: 'Misconduct targeting TSHE members on external platforms — social media, other Discord servers, games, or elsewhere — is actionable if reported with verifiable evidence. Coordinating raids, harassment campaigns, or attacks against TSHE from external platforms results in a **permanent ban and Discord Trust & Safety report**. Attempting to organize any action that would harm TSHE members, staff, or the server\'s standing — regardless of platform — is treated as a zero-tolerance offense. Members are solely responsible for their off-server conduct. Staff are not liable for interactions outside this server.',
      },
    ],
  },
  {
    id: 'staff',
    title: 'Staff & Owner Authority',
    icon: 'Shield',
    color: 'gold',
    fields: [
      {
        name: 'E1 — Staff Authority & Compliance',
        value: 'Staff and the server owner hold **final and absolute authority** over all moderation decisions within TSHE. Staff are authorized to mute, warn, kick, ban, or take any other moderation action against any user — including other staff — when community safety requires it. Staff may act on behavior in DMs or outside the server if it is reported with verifiable evidence. Calm, private questions about decisions are permitted. Public disputes, backtalk, non-compliance, or attempts to gather server opinion about a moderation action will **immediately escalate the existing penalty**. Failure to follow a reasonable staff instruction — including stopping a behavior, changing a nickname, or moving channels — is a **Tier 2 Mute** on first occurrence and escalates with each repetition. Staff may issue preemptive mutes or bans to protect the community before a situation escalates. Attempting to debate, stall, negotiate, or wait out an active moderation interaction is treated as defiance.',
      },
      {
        name: 'E2 — Mini-Modding',
        value: 'Only designated TSHE staff may enforce rules, issue warnings, or intervene in rule violations. Publicly calling out, warning, threatening, or attempting to punish members without staff authorization is classified as mini-modding. Mini-modding results in a **Tier 2 Mute** on first offense and escalates to a temporary ban if repeated. If you witness a rule violation, use the official report system. Do not confront the violator directly, publicly, or via DM.',
      },
      {
        name: 'F1 — Bot Rules (Noxx, Cattito & Xyron)',
        value: 'TSHE bots — Noxx, Cattito, and Xyron — are official server tools. Abusing, spamming, or exploiting bot commands to disrupt channels or other members is prohibited. Attempting to manipulate, break, or reverse-engineer bot behavior through edge-case inputs, rapid commands, or parameter manipulation is prohibited. Impersonating any TSHE bot in usernames, nicknames, avatars, or communication style is treated as staff impersonation. Bot status channels and update channels are read-only and informational. Attempting to interfere with bot operations or status is a zero-tolerance offense. Reporting genuine bot bugs must be done through the designated bug report channel — not by exploiting the behavior.',
      },
    ],
  },
  {
    id: 'gaming',
    title: 'Gaming & Activities',
    icon: 'Bot',
    color: 'purple',
    fields: [
      {
        name: 'H1 — Gaming Channel Conduct',
        value: 'Game-related trash talk is permitted only when clearly lighthearted and both parties are visibly comfortable. Once discomfort is expressed, it stops — permanently. Accusing members of cheating in public channels without verified evidence is a conduct violation. Use the report system. Cheating or using unauthorised tools in community game sessions results in removal from the event and a formal warning. Game content must stay in the appropriate channels. Posting outside them after one redirection results in a warning.',
      },
      {
        name: 'H2 — Game Invites, LFG & Streaming',
        value: 'LFG posts belong in designated channels only. Do not mass-ping or DM members with unsolicited game invites — one post in the correct channel is the maximum. Invite-spam to external servers or third-party platforms is treated as advertising under C3 and results in an immediate permanent ban. Screen sharing must meet TSHE SFW standards throughout the entire session. Streamers are fully responsible for all content displayed — accidental exposure is still a violation. Streaming copyrighted content in violation of DMCA obligations is prohibited in TSHE voice channels.',
      },
    ],
  },
  {
    id: 'events',
    title: 'Community Events & Creative Channels',
    icon: 'Shield',
    color: 'green',
    fields: [
      {
        name: 'I1 — Community Events & Creative Channels',
        value: 'All server rules apply to events without exception. Event-specific rules announced by staff are binding for all participants. Exploiting event mechanics, scoring, or vote counts via alt accounts, bots, or coordinated manipulation results in immediate disqualification and a formal warning. Prizes may be withheld at staff discretion for any conduct violation during or shortly after the event. Sharing others\' creative work without credit or as your own is plagiarism and results in content removal plus a formal warning. Commercial promotion of personal creative work without staff approval is treated as advertising under rule C3.',
      },
    ],
  },
  {
    id: 'appeals',
    title: 'Appeals & Enforcement',
    icon: 'Bot',
    color: 'purple',
    fields: [
      {
        name: 'G1 — Appeals System',
        value: 'If you believe a moderation action was applied in error, submit an appeal here: https://zepp.noxxbot.com/appeals/1466990155020898413. Appeals must be submitted calmly and respectfully. Hostile, demanding, or accusatory appeals are denied immediately without review. Submitting false information, exaggerated claims, or manipulative framing in an appeal results in a permanent appeal blacklist. Arguing your case publicly in server channels rather than through the appeal system results in immediate denial and potential escalation. Staff decisions on appeals are final. Re-submitting a closed appeal without new verifiable evidence will be ignored. Appeals for zero-tolerance offenses (hate speech, doxxing, CSAM, threats, advertising) are not accepted under any circumstances.',
      },
      {
        name: 'G2 — Consequence Summary',
        value: '1. Deletion / Minor Timeout (1-5m) — Low-level disruption. 2. Formal Warning — First content or conduct violation. Warnings are permanent and never expire. 3. Temporary Mute (30m-24h) — Toxicity, defiance, repeated offenses. 4. Temporary Ban (1-30d) — Severe misconduct, sustained harassment, hate-adjacent behavior. 5. Permanent Ban — Zero-tolerance violations. Most are non-appealable. Infractions across multiple categories within a short period may be combined and escalated at staff discretion.',
      },
    ],
  },
];

// ── PUNISHMENT GUIDE ──────────────────────────────────────────────────────────

export interface PunishmentTier {
  level: number;
  label: string;
  duration: string;
  description: string;
  color: string;
}

export const punishmentTiers: PunishmentTier[] = [
  { level: 1, label: 'Minor Infraction', duration: 'Deletion / 1–5m timeout', description: 'Low-level disruptions requiring immediate correction. Covers spam/flooding (4+ identical messages in 30s), excessive emoji/sticker/GIF use, wrong channel posts, blank messages, missing spoiler tags, minor off-topic derailment, accidental staff ping with immediate acknowledgment. Repetition after staff correction escalates to Tier 2 automatically — no second Tier 1. No formal warning on genuine first occurrence — internally noted.', color: '#4ade80' },
  { level: 2, label: 'Formal Warning', duration: 'Warning issued — permanent record', description: 'First-time violations exceeding minor disruption. Permanently logged, never expire, never reduce in weight. Offences: Persistent off-topic after correction, targeted rudeness, non-English in English channels after correction, uncorrected profile violations, unauthorised staff pings, low-level DM advertising, first instance of mini-modding, bot/voice misuse after correction, continuing a behaviour after staff instruction to stop. Two warnings trigger Tier 3 review. All formal warnings are permanent.', color: '#a3e635' },
  { level: 3, label: 'Temporary Mute', duration: '30 min – 24 hours', description: 'Persistent misconduct, deliberate defiance, or behaviour actively disrupting the community. Offences: Persistent toxicity/aggression after warning, deliberate targeted trolling/provocation, sexual innuendo/boundary violations directed at a member, voice disruption (mic spam, ear-rape) after correction, direct staff defiance, auto-mod bypass attempts, mini-modding after formal warning, DMing staff to dispute active moderation, refusing nickname changes. Duration: first 30m–12h, second 12–24h, third → Tier 4.', color: '#facc15' },
  { level: 4, label: 'Temporary Ban', duration: '1 – 30 days', description: 'Severe misconduct, repeated failure to improve, or actions causing meaningful harm. Offences: 3+ mutes with no improvement, malicious impersonation of staff/bots/members, doxxing threats/teasing, sharing extremist/hate-adjacent content after warnings, coordinating/participating in raids/mass harassment, sustained cross-channel targeted harassment, repeatedly undermining staff authority, providing false information to staff during moderation review, leaking server content. Duration: first 1–14d, second 14–30d, third → Tier 5. Reoffending within 30 days of return is automatic escalation.', color: '#fb923c' },
  { level: 5, label: 'Permanent Ban', duration: 'Permanent — appealable only for documented staff error', description: 'Instant permanent ban (no prior warning) for: hate speech/slurs (all forms), CSAM (any form), doxxing (including dox teasing), real-world threats of violence or harm, malware/phishing, unauthorised advertising, ban evasion, NSFW/gore/shock content, leaking internal/private information, AI-generated prohibited content, raid coordination, impersonating Noxx/Cattito/Xyron, emergency ping abuse. Also triggered by: 9+ lifetime warnings, third temp ban, reoffending within 30 days of temp ban return.', color: '#f87171' },
];

// ── WARNING ESCALATION ────────────────────────────────────────────────────────

export interface WarnStep {
  warns: number;
  consequence: string;
  appealable: boolean;
}

export const warnSteps: WarnStep[] = [
  { warns: 1, consequence: 'Formal recorded reminder', appealable: false },
  { warns: 2, consequence: '1-hour Server Mute', appealable: false },
  { warns: 3, consequence: '12-hour Server Mute', appealable: false },
  { warns: 4, consequence: '24-hour Server Mute', appealable: false },
  { warns: 5, consequence: '3-day Server Mute', appealable: false },
  { warns: 6, consequence: '7-day Server Mute', appealable: false },
  { warns: 7, consequence: '14-day Temporary Ban', appealable: true },
  { warns: 8, consequence: '30-day Temporary Ban', appealable: true },
  { warns: 9, consequence: 'Permanent Ban (appealable once, for documented staff error only)', appealable: true },
  { warns: 10, consequence: 'Permanent Ban, appeal rights revoked', appealable: false },
];

// ── AUTOMOD LIMITS ────────────────────────────────────────────────────────────



// ── DEFINITIONS ───────────────────────────────────────────────────────────────

export interface Definition {
  term: string;
  meaning: string;
  tier: string;
}

export const definitions: Definition[] = [
  {
    term: 'Toxicity',
    meaning: 'Consistently rude, hostile, or negative commentary directed at the community or members. Includes discouraging or demeaning remarks, excessive complaining, or trolling. Handled at Tier 2-3 depending on persistence and history.',
    tier: 'Tier 2-3',
  },
  {
    term: 'Harassment (Targeted)',
    meaning: 'Sustained or repetitive behaviour targeting a specific user or group. Includes messages, pings, or actions meant to annoy, distress, or provoke. Escalates quickly if persistent. Subtle harassment (trolling, rumour-spreading, exclusion) is treated identically.',
    tier: 'Tier 3-4',
  },
  {
    term: 'Hate Speech',
    meaning: 'Content promoting violence, discrimination, or hatred against protected groups. Includes slurs, offensive memes, or indirect references. All forms (censored, phonetic, disguised) result in immediate permanent ban with zero appeal rights.',
    tier: 'Tier 5 Permanent Ban',
  },
  {
    term: 'Doxxing',
    meaning: 'Sharing personal identifying information without consent (real names, addresses, phone numbers, private media). Dox teasing (threatening or implying possession of private info) carries the identical penalty. Applies to both staff and members.',
    tier: 'Tier 5 Permanent Ban',
  },
  {
    term: 'Spam & Flooding',
    meaning: '4+ identical/near-identical messages in 30 seconds, excessive emojis/stickers/reactions, message flooding, blank-line filler posts, or copy-paste repetition. Applies in public channels and DMs. First occurrence: Tier 1. Repetition: Tier 2.',
    tier: 'Tier 1-2',
  },
  {
    term: 'Rule Evasion / Loophole Abuse',
    meaning: 'Attempts to bypass filters, punishments, or rules (alternate accounts, hidden text, bots, codes, creative interpretation). Automatically escalates to maximum penalty for the original offence plus an additional warning.',
    tier: 'Tier 3-5',
  },
  {
    term: 'Mini-Modding',
    meaning: 'Acting as staff without authorisation: warning members, enforcing rules, or punishing users. Includes telling others they will receive punishments. First offence: Tier 2 warning. Repeated: Tier 3 mute, escalating to temp ban.',
    tier: 'Tier 2-4',
  },
  {
    term: 'NSFW / Unsafe Content',
    meaning: 'Posting sexually explicit, gore, self-harm, or shocking content. Includes images, links, AI-generated content, and text. TSHE is strictly SFW in every channel at all times with no exceptions. Results in immediate Tier 4-5 ban.',
    tier: 'Tier 4-5 Ban',
  },
  {
    term: 'Ban Evasion',
    meaning: 'Rejoining on any alternate account during an active ban or mute. Having someone relay messages on your behalf is also evasion. All associated accounts permanently banned. Reported to Discord Trust & Safety. Zero appeal rights.',
    tier: 'Tier 5 Permanent Ban',
  },
  {
    term: 'AI-Generated Content',
    meaning: 'AI content is held to identical standards as any other media. Using AI to flood channels is spam. AI content that impersonates members/staff/bots is prohibited. Generating AI content to bypass filters or create prohibited material is a zero-tolerance offence.',
    tier: 'Tier 2-5',
  },
];



// ── REPORT GUIDE ──────────────────────────────────────────────────────────────

export const reportGuide = [
  {
    step: 1,
    title: 'Gather Your Evidence',
    desc: 'Collect message links, screenshots, or records of the violation. Include message content, timestamps, usernames, and any surrounding context. Screenshots from other servers require member consent.',
  },
  {
    step: 2,
    title: 'Submit Your Report',
    desc: 'Use the `/report` command with **@TSHE Moderation** to submit a report. You can also right-click a message or user → Apps → Report message/user. Do not publicly call out the member — handle it through proper channels.',
  },
  {
    step: 3,
    title: 'Provide Clear Details',
    desc: 'State what happened, when it happened, who was involved, and what rule was violated. Include a clear reason for the report, message links or screenshots, and any relevant context that helps staff understand the situation.',
  },
  {
    step: 4,
    title: 'Wait for Staff Review',
    desc: 'Staff will review your report privately and take appropriate action if needed. False reports or abuse of the system may result in punishment. Do not ping staff repeatedly — this may result in a warning.',
  },
];
