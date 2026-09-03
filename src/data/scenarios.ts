import type { Scenario } from './types'

const contract = (reference: string) => ({
  kind: 'contract' as const,
  label: 'AA/APFA Contract',
  reference,
})

export const scenarios: Scenario[] = [
  {
    id: 'first-schedule',
    icon: 'mdi-airplane-takeoff',
    title: 'A New Flight Attendant’s First Schedule',
    prompt: '“I just graduated training. How do I receive my first schedule?”',
    audience: 'New hires · Onboarding teams',
    source: contract('§12.A, §20.A–B'),
    steps: [
      {
        title: 'Seniority is seeded at class start',
        detail:
          'Your first day of initial training becomes your occupational seniority date (post-2014). Same-day classmates sort by birth date, then SSN last four. Graduation starts your longevity clock for pay/vacation accrual.',
      },
      {
        title: 'Reserve designation & rotation begins',
        detail:
          'If the base needs Reserves, new hires post-ratification serve straight Reserve for two years. Your name joins the base’s reserve rotation ledger.',
      },
      {
        title: 'PBS builds your Reserve line',
        detail:
          'You bid in PBS like everyone else — but for a Reserve line: a set of RAPs plus Golden Days (inviolable without consent) and Flex Days (assignable). Bid preferences still matter for RAP times and day patterns.',
      },
      {
        title: 'ROTA fills known gaps ahead of time',
        detail:
          'Before the month starts, future processing awards known open sequences/standbys to Reserves in seniority order. Golden-Day elections lock before Future processing (submit by 1500 HBT).',
      },
      {
        title: 'ROTD handles the day itself',
        detail:
          'On duty days you’re reachable inside RAP windows. ROTD awards aggressive bids and standbys; call-outs come from Crew Scheduling. LMCO premiums apply when contact-to-report drops below standard.',
      },
      {
        title: 'Pay follows credit',
        detail:
          'Flown sequences credit hours; rigs and premiums layer on; your month reconciles against reserve guarantees into the pay ledgers.',
      },
    ],
    outcome:
      'Within one cycle you understand: seniority → PBS → ROTA/D → operations → payroll. That chain IS the domain.',
    relatedTerms: ['seniority-occupational', 'reserve-line', 'rap', 'rota', 'rotd'],
    decision: {
      prompt: 'The new hire has a Reserve line, but no specific trip for tomorrow. What should they expect next?',
      options: [
        { label: 'Wait for ETB only', detail: 'ETB is not the primary Reserve assignment path.' },
        { label: 'ROTA/ROTD processing', detail: 'Known future and day-of needs flow through Reserve processing.' },
        { label: 'Submit a new PBS bid', detail: 'PBS already created the monthly Reserve line.' },
      ],
      answerIndex: 1,
      explanation: 'PBS establishes the Reserve month; ROTA and ROTD later award or assign specific coverage needs.',
    },
  },
  {
    id: 'bid-journey',
    icon: 'mdi-gavel',
    title: 'I Submitted a Bid — What Happens Next?',
    prompt: '“I ranked my PBS choices. Walk me through processing.”',
    audience: 'Lineholders · Support engineers',
    source: contract('§10.B–D, §10.T'),
    steps: [
      {
        title: 'Pre-bid reviews (prior month)',
        detail:
          '1st/3rd/6th at 1200 DFW: APFA sequence review rounds with Crew Schedule Planning; illegal sequences get rebuilt.',
      },
      {
        title: 'Package publishes ≤8th (1200 DFW)',
        detail:
          'Bid package lands in PBS with RAP lists, line ranges, projected lines min/mid/max per base, minimum Reserves, hotels, and projected standby shifts.',
      },
      {
        title: 'You submit ranked choices',
        detail:
          'Preferences encode patterns (sign-ons, days off, avoid ODAN), trip choices, High/Low options, waive rights where allowed.',
      },
      {
        title: 'Award engine processes top-down',
        detail:
          'In seniority order, PBS covers global constraints first, then honors each person’s highest achievable preference. Inputs are snapshot-frozen for reproducibility.',
      },
      {
        title: 'Award or misaward path',
        detail:
          'Got your realistic choices? Award posts. A sequence cancels mid-bidding after awarding you? Misaward rules (§10.T / §10.C.7) define remedies instead of silent loss.',
      },
      {
        title: 'Post-award reshaping opens',
        detail:
          'TTS trades refine within your Credit Window; denied-but-eager requests pass to UBL for daily-run retries; ETB handles instant FCFS deals until the month ends.',
      },
    ],
    outcome:
      'Bids are deterministic given frozen inputs — support can replay any award decision against its snapshot.',
    relatedTerms: ['pbs', 'misaward', 'ubl', 'tts', 'credit-window'],
    decision: {
      prompt: 'The award is posted, but the Flight Attendant wants a different trip. Which action belongs next?',
      options: [
        { label: 'Edit the closed PBS bid', detail: 'The monthly award has already been produced.' },
        { label: 'Use TTS or ETB', detail: 'Post-award tools reshape an awarded Lineholder schedule.' },
        { label: 'Ask ROTD for the trip', detail: 'ROTD serves the Reserve coverage path.' },
      ],
      answerIndex: 1,
      explanation: 'After PBS, eligible Lineholders use scheduled TTS processing or real-time ETB transactions.',
    },
  },
  {
    id: 'cancelled-trip',
    icon: 'mdi-cloud-cancel',
    title: 'My Trip Was Cancelled — Is My Pay Protected?',
    prompt: '“Weather killed two sequences this month. What happens to my money?”',
    audience: 'All FAs · Payroll engineering',
    source: contract('§10.J–L, §3.P'),
    steps: [
      {
        title: 'Cancellation event fires',
        detail:
          'The sequence returns to open time and simultaneously disappears from your working schedule while remaining on your *credit* radar pending protection evaluation.',
      },
      {
        title: 'Pay-protection evaluation',
        detail:
          'Contract rules (§10.J/K/L family, incl. protections when losing multiple full sequences) determine whether cancelled hours stay credited/paid versus re-coverage obligations.',
      },
      {
        title: 'Re-coverage offers may arrive',
        detail:
          'Replacement flying (carry-over/change-over posted by the 10th if crossing months, reschedules, involuntary assignment rules) can restore hours; refusal rules have their own consequences.',
      },
      {
        title: 'Ledgers reconcile nightly',
        detail:
          'Credit ledger keeps guarantee math honest; pay ledger adds protection amounts as distinct entries referencing source events.',
      },
      {
        title: 'Discrepancy window',
        detail:
          'Spot something wrong? §3.P governs reporting timelines; system-nature irregularities (crew-base-wide) have explicit carve-outs.',
      },
    ],
    outcome:
      'Pay protection is rule-driven, not goodwill: every dollar traces to a clause + event pair.',
    relatedTerms: ['credited-hours', 'pay-no-credit', 'open-time', 'carry-over', 'misaward'],
    decision: {
      prompt: 'The trip disappears from the working calendar. What must the system preserve?',
      options: [
        { label: 'Only the final calendar', detail: 'That erases the cause and prevents reconciliation.' },
        { label: 'Original trip and cancellation event', detail: 'Both are needed for coverage, protection, and audit.' },
        { label: 'Only the payroll result', detail: 'Payroll is a downstream consequence, not the source event.' },
      ],
      answerIndex: 1,
      explanation: 'The original schedule and later cancellation must remain linked so open-time and pay-protection decisions are explainable.',
    },
  },
  {
    id: 'reserve-day',
    icon: 'mdi-phone-alert',
    title: 'How Does a Reserve Assignment Actually Work?',
    prompt: '“It’s 04:30, I’m on a 0400 RAP, and scheduling is calling. Now what?”',
    audience: 'Reserves · Ops tooling teams',
    source: contract('§12.B–O'),
    steps: [
      {
        title: 'Your availability window is active',
        detail:
          'RAP defines when you must answer. Modified RAP shifts start (same end); only YOU can request an Extended RAP end via Crew Scheduling approval.',
      },
      {
        title: 'ROTD runs the morning match',
        detail:
          'Aggressive bids award first-come-by-seniority among bidders; known open time redistributes by noon HBT per Implementation LOA provisions.',
      },
      {
        title: 'Call-out lands',
        detail:
          'Contact inside RAP → report per sequence. Short notice? LMCO premium territory. Aggressive Reserve awards precede standby for LMCO coverage.',
      },
      {
        title: 'Legality + rest checks run silently',
        detail:
          'Engines validate rest since last release, maxima, Golden-Day waivers (if your election applies), and Flex-Day assignability before offering anything.',
      },
      {
        title: 'Fly, then reconcile',
        detail:
          'Sequence credits post with any premiums; rotation ledger records the served Reserve day; tomorrow repeats.',
      },
    ],
    outcome: 'Reserve tooling = interval math + precedence rules + consent records, all under HBT time discipline.',
    relatedTerms: ['rotd', 'lmco', 'standby', 'golden-day', 'modified-rap'],
    decision: {
      prompt: 'Before offering the open trip, what must ROTD verify?',
      options: [
        { label: 'Seniority only', detail: 'Ranking never replaces eligibility and legality.' },
        { label: 'Availability, qualification, and legality', detail: 'The person must be eligible before ordering rules apply.' },
        { label: 'Payroll balance only', detail: 'Payroll follows the assignment rather than authorizing it alone.' },
      ],
      answerIndex: 1,
      explanation: 'Assignment processing first establishes who can legally cover the work, then applies the relevant ordering rules.',
    },
  },
  {
    id: 'pickup-premium',
    icon: 'mdi-star-four-points',
    title: 'Chasing Extra Flying (and Premiums)',
    prompt: '“I want maximum money this month. Which levers exist?”',
    audience: 'Power users · Marketplace devs',
    source: contract('§2.G/GG/RR, §10.E'),
    steps: [
      {
        title: 'Know your Credit Window',
        detail: 'TTS Maximum − awarded value = remaining pickup capacity; every move mutates it live.',
      },
      {
        title: 'Watch red flags',
        detail:
          'Red-flagged open time pays 150% but credits 100% — money grows faster than window consumption.',
      },
      {
        title: 'Use ETB for speed',
        detail: 'FCFS board commits instantly between TTS runs; stale listings reject safely.',
      },
      {
        title: 'UBL as safety net',
        detail: 'Elect pass-to-UBL so daily runs keep hunting matches for your standing appetite.',
      },
      {
        title: 'Mind ceilings',
        detail: 'Monthly maxima and High/Low bounds still bind; Pay-No-Credit rows boost cash without consuming credit.',
      },
    ],
    outcome: 'Premium-aware pickup strategy = windows + flags + channels, all auditable.',
    relatedTerms: ['credit-window', 'red-flagging', 'etb', 'ubl', 'pay-no-credit'],
    decision: {
      prompt: 'A Red Flag pickup pays 150% but credits 100%. Which records should change?',
      options: [
        { label: 'Credit only', detail: 'This would lose the premium pay.' },
        { label: 'Pay and credit separately', detail: 'Base credit and premium pay have different ledger effects.' },
        { label: 'Neither until month-end', detail: 'The transaction should create traceable events when committed.' },
      ],
      answerIndex: 1,
      explanation: 'The pickup changes credited hours and creates a separate premium-pay consequence without inflating credit to 150%.',
    },
  },
  {
    id: 'base-transfer',
    icon: 'mdi-home-switch-outline',
    title: 'Transferring to a New Base',
    prompt: '“I won a BOS vacancy. What changes?”',
    audience: 'FAs · HR/crew systems',
    source: contract('§22, §12.A.3.d, §2.TT'),
    steps: [
      {
        title: 'Vacancy awards by seniority',
        detail: 'Posted vacancies fill top-down the occupational list.',
      },
      {
        title: 'Relocation Days block duty',
        detail: 'Up to five consecutive days free from ALL duty once granted — engines must honor the block.',
      },
      {
        title: 'Reserve positioning resets',
        detail:
          'If BOS seniority places you in the reserve group, you serve reserve your FIRST FULL SCHEDULING MONTH there regardless of prior-base history.',
      },
      {
        title: 'Lines re-anchor to HBT=BOS',
        detail: 'Deadlines, RAP windows, rest math all re-express in the new base clock.',
      },
      {
        title: 'Records propagate',
        detail: 'Seniority unchanged; longevity unchanged; rotation ledger branches under new-base rules.',
      },
    ],
    outcome: 'Transfers look administrative but ripple through every engine — effective-date events drive it all.',
    relatedTerms: ['vacancy-transfer', 'relocation-days', 'reserve-line', 'hbt'],
    decision: {
      prompt: 'When should downstream systems start using BOS as the Flight Attendant’s base?',
      options: [
        { label: 'When requested', detail: 'A request is not an awarded or effective transfer.' },
        { label: 'On the effective date', detail: 'The current base remains authoritative until the change takes effect.' },
        { label: 'Immediately after posting', detail: 'A posted vacancy has not yet been awarded.' },
      ],
      answerIndex: 1,
      explanation: 'Effective dating preserves the old context for earlier records and activates the new base at the correct boundary.',
    },
  },
]
