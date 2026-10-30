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
          'For Flight Attendants hired after August 1, 2014, occupational seniority begins on the first day of initial training. Same-day classes use birth date, with a precedence exception for Company employees transferring departments; Company hire date orders those transferees. Applicable remaining ties use the last four SSN digits. Classification/longevity for pay and vacation accrual begins at graduation.',
      },
      {
        title: 'Reserve designation & rotation begins',
        detail:
          'If the base needs Reserves, Flight Attendants hired on or after ratification and implementation serve straight Reserve for their first two years. Their reserve rotation then follows the applicable CBA rules.',
      },
      {
        title: 'PBS builds your Reserve line',
        detail:
          'You bid in PBS like everyone else — but for a Reserve line: a set of RAPs plus Golden Days (inviolable without consent) and Flex Days (assignable under Reserve rules). Bid preferences still matter for RAP times and day patterns.',
      },
      {
        title: 'ROTA fills known gaps ahead of time',
        detail:
          'At future processing, after the applicable UBL step, legal and available Reserves are processed for known open sequences and Standby shifts. Grouping, preferences, seniority, and assignment rules all apply. Eligible Reserves may bid for a sequence or Standby, or conditionally Remain on Call. A choice to work into a Golden Day must be made known to Future Scheduling before 1500 HBT.',
      },
      {
        title: 'ROTD handles later openings',
        detail:
          'ROTD handles sequences that open during or after future processing and report today or the following day. The applicable UBL process runs first, including a rerun immediately before a ROTD award or assignment. Reserve availability, legality, aggressive preferences, and the contractual priority order determine who may receive the work. Standard call-out is two hours, or three hours at co-terminals; shorter-notice assignments follow applicable LMCO rules.',
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
          'On the 1st, Crew Schedule Planning provides sequences for initial APFA review; the APFA response is due on the 3rd, and final review sequences are provided on the 6th, all at 1200 DFW. Identified illegal sequences must be rebuilt.',
      },
      {
        title: 'Package publishes by the 8th (1200 DFW)',
        detail:
          'The final bid package is available in PBS and includes RAP lists, line ranges, projected lines by base, minimum Reserves, hotels, and projected standby shifts.',
      },
      {
        title: 'You submit ranked choices',
        detail:
          'Preferences encode patterns (sign-ons, days off, avoid ODAN), trip choices, High/Low options, and any waivers allowed by the bid rules.',
      },
      {
        title: 'Award engine processes top-down',
        detail:
          'PBS constructs legal lines in seniority order while applying global parameters and each Flight Attendant’s bid preferences. Review the actual bid, package, settings, and award rather than assuming a result from preferences alone.',
      },
      {
        title: 'Award or misaward path',
        detail:
          'The award publishes on the contractual schedule. If a sequence is canceled during the PBS bidding window and was nevertheless awarded, §10.C.7 directs the case to the misaward process in §10.T.',
      },
      {
        title: 'Post-award reshaping opens',
        detail:
          'TTS processes eligible transactions by seniority. An unsuccessful request reaches UBL only when the Flight Attendant elects it and the request meets the applicable date-range rules. ETB is first-come, first-served, subject to acceptance, eligibility, and contractual checks.',
      },
    ],
    outcome:
      'An award can be reviewed when the bid, bid package, applicable settings, and resulting award are preserved.',
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
          'Record the original award and the cancellation or reschedule event. A canceled flight may lead to a revised sequence, replacement flying, or release under the applicable rule; do not assume every cancellation turns the whole sequence into Open Time or removes the duty obligation.',
      },
      {
        title: 'Pay-protection evaluation',
        detail:
          'Apply the clause for the event and timing. For example, §10.J.10 protects the pay value of certain rescheduled sequences, including canceled segments; separate cancellation and loss-of-sequence provisions have their own eligibility and re-coverage rules. Do not treat every canceled hour as automatically credited or protected.',
      },
      {
        title: 'Re-coverage offers may arrive',
        detail:
          'Crew Scheduling may revise or replace flying under the applicable rescheduling rules. Check the actual assignment, notification, and any acceptance or release options; a replacement does not erase the original event or its protection rules.',
      },
      {
        title: 'Ledgers reconcile',
        detail:
          'Reconcile actual pay and credit separately against the guarantee and any protection that applies. Preserve the source event and the clause-based calculation; cancellation does not itself establish a credit or pay result.',
      },
      {
        title: 'Discrepancy resolution',
        detail:
          'If a paycheck is short, §3.P sets how a resolved shortage is paid and addresses system- or crew-base-wide irregularities. It does not set the deadline for reporting a claim; use the current payroll process for that.',
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
          'A RAP defines when you must be available and contactable. A Modified RAP changes the start while retaining the published end; a Reserve may request an Extended RAP end, subject to Crew Scheduling approval.',
      },
      {
        title: 'ROTD follows the UBL process',
        detail:
          'ROTD is event-triggered, not a fixed morning run. For an open sequence reporting today or tomorrow, Crew Scheduling runs the applicable UBL process first and reruns UBL immediately before ROTD. If the sequence remains open, ROTD applies the contractual order: eligible aggressive bids and Reserve groups are considered under their preferences, availability, RAP, and legality rules.',
      },
      {
        title: 'Call-out lands',
        detail:
          'During a RAP, follow the assignment and acknowledgement instructions. The standard report window is two hours after notification, or three hours at co-terminals. Shorter-notice work follows LMCO processing and its priority rules; an aggressive Reserve bid precedes Standby in the applicable LMCO order.',
      },
      {
        title: 'Legality + rest checks run silently',
        detail:
          'Before assignment, validate availability, qualification, required rest, monthly limits, Golden-Day consent where applicable, and Flex-Day assignability.',
      },
      {
        title: 'Fly, then reconcile',
        detail:
          'Sequence credit and any premiums follow the assignment and actual operation; reserve guarantees and rotation accounting follow their applicable rules.',
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
    source: contract('§2.G, §2.GGG, §2.RR, §10.E–H'),
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
        detail: 'ETB is first-come, first-served between TTS runs. A request changes the schedule only after the other Flight Attendant accepts and the transaction passes applicable checks.',
      },
      {
        title: 'UBL as safety net',
        detail: 'For an eligible unsuccessful TTS request, elect UBL consideration. UBL processing is limited by the request’s eligibility and sequence date; it is not a general standing bid for any open trip.',
      },
      {
        title: 'Mind ceilings',
        detail: 'Monthly maxima and High/Low bounds still bind; Pay-No-Credit rows add pay without credit only where the contract permits.',
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
        detail: 'On request before the transfer effective date, the Company provides five consecutive calendar days free from duty for relocation, subject to contractual blackout dates. These days are unpaid and uncredited.',
      },
      {
        title: 'Reserve positioning resets',
        detail:
          'If BOS seniority places you in the Reserve group, you serve Reserve in the first full scheduling month at the new base, regardless of prior-base Reserve service.',
      },
      {
        title: 'Lines re-anchor to HBT=BOS',
        detail: 'On the effective date, BOS becomes the home-base context. Use BOS’s published HBT deadlines and RAP configuration; preserve the old base and time context on earlier records.',
      },
      {
        title: 'Records propagate',
        detail: 'Preserve occupational and classification/longevity seniority while applying the new base’s reserve rotation rules.',
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
