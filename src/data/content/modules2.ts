import type { AcademyModule } from '../types'

export const modulesPart2: AcademyModule[] = [
  {
    id: 'etb',
    number: 9,
    title: 'ETB — Electronic Trade Board',
    icon: 'mdi-view-dashboard-variant',
    color: '#0078D2',
    tagline: 'Real-time, first-come/first-served trading floor.',
    estimatedMinutes: 15,
    terms: ['etb', 'open-time', 'credit-window', 'red-flagging'],
    sections: [
      {
        key: 'overview',
        title: 'Beginner Overview',
        body:
          'ETB is the instant marketplace: post a drop, grab open time, or swap with a colleague — validated and committed in seconds, first come/first served.',
      },
      {
        key: 'why',
        title: 'Why It Exists',
        body: 'Between scheduled TTS runs, opportunities appear; ETB removes the wait and the seniority gate for these spot trades.',
      },
      {
        key: 'process',
        title: 'Business Process',
        body: `\`\`\`mermaid
flowchart LR
  A[Post/offer] --> B[Legality + window check]
  B -- ok --> C[Commit instantly]
  B -- conflict --> D[Reject: reason code]
  C --> E[Both schedules update]
\`\`\``,
      },
      {
        key: 'system',
        title: 'System Impact',
        body:
          'Must serialize concurrent claims on the same sequence — first-write-wins semantics with immediate schedule republication.',
      },
      {
        key: 'data',
        title: 'Data Impact',
        body: 'Listing {sequenceId, kind, expiry}; Claim ledger ordered by timestamp; ReasonCode taxonomy.',
      },
      {
        key: 'developer',
        title: 'Developer Perspective',
        body:
          'Optimistic UI + server arbitration. Idempotency keys prevent double-taps double-selling one trip.',
      },
      {
        key: 'examples',
        title: 'Real Examples',
        body: 'Two FAs hit “pick up” on the same red-flagged turn simultaneously; exactly one commits, the other sees a stale-listing error.',
      },
    ],
    quiz: [
      {
        question: 'ETB allocation principle:',
        options: ['Seniority', 'First come/first served', 'Lottery', 'Base size'],
        answerIndex: 1,
        explanation: 'Unlike PBS, ETB is explicitly FCFS.',
      },
      {
        question: 'On success, ETB updates schedules:',
        options: ['Next day', 'Next TTS run', 'Immediately', 'After payroll'],
        answerIndex: 2,
        explanation: 'Real-time commitment is its defining trait.',
      },
    ],
    developerView: {
      business: 'Instant, fair-enough spot market for trips.',
      systems: ['ETB service'],
      inputs: ['Listings', 'Claims'],
      outputs: ['Committed trades'],
      technical: 'Serialized claims; latency budgets; stale-state UX.',
    },
  },
  {
    id: 'crew-management',
    number: 10,
    title: 'Crew Management',
    icon: 'mdi-sitemap',
    color: '#0061AB',
    tagline: 'Transfers, leaves, co-terminals, TDY, and day-of control.',
    estimatedMinutes: 22,
    terms: ['vacancy-transfer', 'relocation-days', 'crew-base', 'hbt'],
    sections: [
      {
        key: 'overview',
        title: 'Beginner Overview',
        body:
          'Crew management spans base transfers (seniority-based vacancies), leaves (medical/VLOA/military), temporary duty (TDY), co-terminal rules, and the Crew Scheduling console that owns day-of decisions.',
      },
      {
        key: 'why',
        title: 'Why It Exists',
        body: 'People move, get sick, serve; bases over/under-hire. Governance keeps those flows orderly and contractual.',
      },
      {
        key: 'process',
        title: 'Business Process',
        body: `- Vacancy posted → bids → award in seniority order → **Relocation Days** (≤5 consecutive) block all duty.
- Leaves interact with everything: Reserve rotation credit, PPO bidding, seniority accrual.
- Co-terminals constrain where sequences may start/end when airports pair.`,
      },
      {
        key: 'system',
        title: 'System Impact',
        body:
          'Transfer effective dates reset reserve positioning at the new base (first full scheduling month there). Satellite base openings follow §10.U processes.',
      },
      {
        key: 'data',
        title: 'Data Impact',
        body: 'Vacancy lifecycle records; Leave {type, interval, effects[]}; Base hierarchy incl. satellites.',
      },
      {
        key: 'developer',
        title: 'Developer Perspective',
        body:
          'Cross-cutting absence model consumed by every engine — design it as a shared service emitting effect events, not per-engine hacks.',
      },
      {
        key: 'examples',
        title: 'Real Examples',
        body: 'Transferee to BOS: five duty-free days while moving; reserve rotation restarts under BOS rules.',
      },
    ],
    quiz: [
      {
        question: 'Relocation Days maximum after a transfer:',
        options: ['3', '5', '7', '10'],
        answerIndex: 1,
        explanation: 'Up to five consecutive calendar days free of all duty.',
      },
      {
        question: 'A transferring FA landing in the reserve group at the new base:',
        options: [
          'Continues old rotation',
          'Serves reserve the first full scheduling month at new base',
          'Exempt forever',
          'Chooses',
        ],
        answerIndex: 1,
        explanation: '§12.A.3.d resets irrespective of prior-base service.',
      },
    ],
    developerView: {
      business: 'Orderly people-flow across bases and statuses.',
      systems: ['Vacancy workflow', 'Leave admin', 'Crew Scheduling console'],
      inputs: ['Requests', 'Seniority', 'Staffing gaps'],
      outputs: ['Effective-date events', 'Blocked intervals'],
      technical: 'Workflow engine + effect propagation bus.',
    },
  },
  {
    id: 'payroll',
    number: 11,
    title: 'Payroll & Credit',
    icon: 'mdi-cash-multiple',
    color: '#C01933',
    tagline: 'Credited hours, rigs, premiums, guarantees, pay-vs-credit ledgers.',
    estimatedMinutes: 25,
    terms: ['credited-hours', 'duty-rig', 'pay-no-credit', 'red-flagging', 'carry-over'],
    sections: [
      {
        key: 'overview',
        title: 'Beginner Overview',
        body:
          'Pay starts from **crediting**, not clock-punching: sequences, vacation, training, deadheads, rigs, and premiums aggregate into monthly credit; pay layers premiums atop credit. Two ledgers never mix: *pay* vs *credit*.',
      },
      {
        key: 'why',
        title: 'Why It Exists',
        body: 'Contract economics price time, inconvenience, and scarcity (rigs, LMCO, red flags) while ceilings (maxima/windows) protect legality.',
      },
      {
        key: 'process',
        title: 'Business Process',
        body: `\`\`\`mermaid
flowchart TD
  A[Duty events] --> B[Credit calculation\\nsegments + rigs + absences]
  A --> C[Premium calculation\\nLMCO, red-flag, holiday...]
  B --> D{Credit ≥ line value?}
  C --> E[Pay ledger]
  D -- no --> F[Guarantee tops up pay]
  D -- yes --> G[Actuals]
  F --> E
\`\`\`

Duty Rig: 1 hour credit per 2 hours on-duty, minute-prorated. Pay discrepancies follow §3.P timelines; semi-monthly pay periods bracket the 15th/30th except as specified.`,
      },
      {
        key: 'system',
        title: 'System Impact',
        body:
          'Every operational event (cancellation, extension, trade) emits payroll-relevant facts; misawards and pay protection rules (§10.J/K/L) inject corrections.',
      },
      {
        key: 'data',
        title: 'Data Impact',
        body: 'LedgerLine {payAmount, creditAmount, sourceEventId}; immutability + reversal entries recommended.',
      },
      {
        key: 'developer',
        title: 'Developer Perspective',
        body:
          'Golden rule: compute credit once, reference everywhere. Rounding policy must be explicit (minute proration). Build reconciliation diffs ops-vs-pay daily.',
      },
      {
        key: 'examples',
        title: 'Real Examples',
        body:
          '- 14:00 duty / 5:40 credit → rig lifts to 7:00.\n- Red flag: +$ premium rows, flat credit rows.',
      },
    ],
    quiz: [
      {
        question: 'Duty Rig rate:',
        options: ['1:1', '1 hr credit : 2 hrs duty', '2:1', 'Flat 4:00'],
        answerIndex: 1,
        explanation: 'Minute-prorated 1-for-2 guarantee per duty period.',
      },
      {
        question: 'Which adds pay but zero credit?',
        options: ['Deadhead', 'Vacation', 'Red-flag premium portion', 'Training'],
        answerIndex: 2,
        explanation: 'Red flags pay 150% but credit 100% — the delta is Pay No Credit territory alongside defined items.',
      },
      {
        question: 'Credited hours include:',
        options: [
          'Only flown segments',
          'Flights + vacation/sick/training/rig/deadhead etc.',
          'Layover hotel values',
          'Per diem',
        ],
        answerIndex: 1,
        explanation: '§2.H enumerates many sources into one credited balance.',
      },
    ],
    developerView: {
      business: 'Every hour honored correctly, every ceiling enforced.',
      systems: ['Credit engine', 'Pay engine', 'Reconciliation jobs'],
      inputs: ['Operational events', 'Contract parameters'],
      outputs: ['Ledgers', 'Discrepancy reports'],
      technical: 'Append-only ledgers; deterministic recomputation from event store.',
    },
  },
  {
    id: 'training-module',
    number: 12,
    title: 'Training',
    icon: 'mdi-school',
    color: '#0078D2',
    tagline: 'New-hire pipeline, CQ recurrence, qualification gating.',
    estimatedMinutes: 18,
    terms: ['cq-training', 'seniority-occupational', 'longevity-seniority'],
    sections: [
      {
        key: 'overview',
        title: 'Beginner Overview',
        body:
          'Initial training builds Flight Attendants; annual **Continuous Qualification (CQ)** keeps them legal. Training events consume schedule days and carry credited hours.',
      },
      {
        key: 'why',
        title: 'Why It Exists',
        body: 'FAA mandates competency currency; airlines layer aircraft/language/lead qualifications atop.',
      },
      {
        key: 'process',
        title: 'Business Process',
        body: `- Hire class start date ⇒ **occupational seniority** begins (post-2014 hires); graduation ⇒ longevity/pay accrual.
- JSC jointly reviews training bid/award processes.
- CQ windows integrate into PBS so lines build around them.`,
      },
      {
        key: 'system',
        title: 'System Impact',
        body:
          'Qualification validity intervals gate assignment engines; expired CQ = unschedulable, full stop.',
      },
      {
        key: 'data',
        title: 'Data Impact',
        body: 'Qualification {type, earnedAt, expiresAt}; TrainingEvent {employeeId, interval, credit}.',
      },
      {
        key: 'developer',
        title: 'Developer Perspective',
        body:
          'Two dates matter (training start vs graduation) and feed different clocks — mixing them corrupts both seniority lists and pay scales.',
      },
      {
        key: 'examples',
        title: 'Real Examples',
        body: 'Same-class FAs ranked by birth date for PBS; identical birthdays fall back to SSN last four.',
      },
    ],
    quiz: [
      {
        question: 'Occupational seniority for post-Aug-2014 hires starts:',
        options: ['Application date', 'First day of initial training', 'Graduation', 'First flight'],
        answerIndex: 1,
        explanation: '§20.A.2 fixes it at initial-training day one.',
      },
      {
        question: 'Longevity (pay/vacation accrual) begins at:',
        options: ['Training start', 'Graduation as an FA', 'First PBS award', 'Probation end'],
        answerIndex: 1,
        explanation: 'Classification/longevity accrues from graduation.',
      },
    ],
    developerView: {
      business: 'Legal crews today and every day forward.',
      systems: ['Training scheduler', 'Qualification registry'],
      inputs: ['FAA curricula', 'Class calendars'],
      outputs: ['Validities', 'PBS-integrated blocks'],
      technical: 'Validity interval service; hard-fail gates in assignment paths.',
    },
  },
  {
    id: 'international',
    number: 13,
    title: 'International Flying',
    icon: 'mdi-earth',
    color: '#003057',
    tagline: 'IPD, Speakers, crew rest, overwater rules.',
    estimatedMinutes: 20,
    terms: ['ipd', 'layover', 'deadhead'],
    sections: [
      {
        key: 'overview',
        title: 'Beginner Overview',
        body:
          'International operations add longer duties, extended sequences (up to 6 days with IPD), language-qualified **Speaker** positions, richer hotels/per diem, and dedicated crew-rest provisions.',
      },
      {
        key: 'why',
        title: 'Why It Exists',
        body: 'Time zones, pax service complexity, and safety equipment demand extra structure.',
      },
      {
        key: 'process',
        title: 'Business Process',
        body: `- Speaker designation via proficiency test; e.g., German speaker on PHL–FRA.
- Charter/group exceptions can require specific languages regardless of route.
- IPD-containing patterns follow special construction limits (§10.B.3.b).`,
      },
      {
        key: 'system',
        title: 'System Impact',
        body:
          'Language qualification matrix joins staffing calculations; international buffers extend duty math (+30 min release).',
      },
      {
        key: 'data',
        title: 'Data Impact',
        body: 'Airport attributes (overwater/IPD/premium destination), LanguageQualification, rest facility metadata.',
      },
      {
        key: 'developer',
        title: 'Developer Perspective',
        body:
          'Route-level attributes cascade into many validators — keep them in geo master data, not hardcoded lists.',
      },
      {
        key: 'examples',
        title: 'Real Examples',
        body: 'CLT–LGW carrying mostly Spanish-speaking passengers may require Spanish Speakers though LGW is not a Spanish route.',
      },
    ],
    quiz: [
      {
        question: 'Sequences containing IPD duty periods may run up to:',
        options: ['4 days', '5 days', '6 days', '7 days'],
        answerIndex: 2,
        explanation: 'Six duty/calendar days max with IPD-specific construction constraints.',
      },
      {
        question: 'Speaker example on PHL–FRA requires qualification in:',
        options: ['French', 'German', 'Spanish', 'Any'],
        answerIndex: 1,
        explanation: 'Destination/origin language governs: German for Frankfurt.',
      },
    ],
    developerView: {
      business: 'Global flying with localized compliance.',
      systems: ['Sequence builder', 'Staffing engine'],
      inputs: ['Route attributes', 'Language quals'],
      outputs: ['Extended legal patterns', 'Speaker-staffed crews'],
      technical: 'Attribute-driven validation; timezone-heavy math.',
    },
  },
  {
    id: 'seniority',
    number: 14,
    title: 'Seniority',
    icon: 'mdi-format-list-numbered',
    color: '#C01933',
    tagline: 'The ranking key behind nearly every award.',
    estimatedMinutes: 16,
    terms: ['seniority-occupational', 'longevity-seniority', 'senior-bump'],
    sections: [
      {
        key: 'overview',
        title: 'Beginner Overview',
        body:
          'Two seniorities coexist: **occupational** (service length; governs bidding/vacancies/furlough/recall) and **classification/longevity** (graduation-based; drives pay scale and vacation accrual). The System List reposts Jan 1 / Jul 1 with 30-day protest windows.',
      },
      {
        key: 'why',
        title: 'Why It Exists',
        body: 'Union-negotiated fairness: scarce goods (good lines, vacations, bases) allocate by rank.',
      },
      {
        key: 'process',
        title: 'Business Process',
        body: `Tie-breaking ladder (same training date):
1. Oldest birth date first
2. Company-department transferees lead their class by company hire date
3. SSN last-four ascending

Non-flying Inflight roles preserve accrual while qualified; unrelated duties cap retention at 1 year.`,
      },
      {
        key: 'system',
        title: 'System Impact',
        body: 'Snapshot discipline: PBS runs pin a list version; protests produce corrected future snapshots, not retroactive chaos.',
      },
      {
        key: 'data',
        title: 'Data Impact',
        body: 'SeniorityListVersion {effectiveFrom/to, entries[]} — immutable, twice-yearly.',
      },
      {
        key: 'developer',
        title: 'Developer Perspective',
        body:
          'Always sort against a pinned snapshot ID. Live-list sorting is a correctness bug waiting for protest season.',
      },
      {
        key: 'examples',
        title: 'Real Examples',
        body: 'Vacation bidding round one goes strictly top-down the occupational list.',
      },
    ],
    quiz: [
      {
        question: 'Same training class tie-break #1:',
        options: ['SSN digits', 'Birth date (oldest first)', 'Alphabetical', 'Interview score'],
        answerIndex: 1,
        explanation: 'Birth date precedes SSN fallback.',
      },
      {
        question: 'System Seniority List reposts:',
        options: ['Monthly', 'Quarterly', 'Jan 1 & Jul 1', 'Annually'],
        answerIndex: 2,
        explanation: 'Twice yearly, posted within 30 days thereafter; 30-day protest window.',
      },
      {
        question: 'Unrelated-company-duty transfer retains occupational seniority for:',
        options: ['6 months', '1 year', '3 years', 'Forever'],
        answerIndex: 1,
        explanation: 'One year, then deletion from the system list.',
      },
    ],
    developerView: {
      business: 'Defensible order for every scarce resource.',
      systems: ['List publisher', 'All award engines'],
      inputs: ['Service records', 'Protests'],
      outputs: ['Pinned snapshots'],
      technical: 'Immutable versioning; comparator library shared org-wide.',
    },
  },
  {
    id: 'scenarios',
    number: 15,
    title: 'Business Scenarios Capstone',
    icon: 'mdi-lightbulb-on-outline',
    color: '#0061AB',
    tagline: 'End-to-end journeys tying every module together.',
    estimatedMinutes: 25,
    terms: ['pbs', 'tts', 'rotd', 'misaward', 'credit-window'],
    sections: [
      {
        key: 'overview',
        title: 'Beginner Overview',
        body:
          'Capstone walkthroughs: new hire’s first month, a bid’s journey to award, cancellation pay protection, reserve storm coverage, and a cross-base transfer. Deep-dive interactive versions live in the **Scenario Simulator**.',
      },
      {
        key: 'why',
        title: 'Why It Exists',
        body: 'Isolated concepts click only when threaded through real operational narrative.',
      },
      {
        key: 'process',
        title: 'Threaded Example',
        body: `\`\`\`mermaid
flowchart TD
  H[Hired: class date] --> S1[Seniority assigned]
  S1 --> T[Training/CQ]
  T --> R[Straight Reserve x2 yrs]
  R --> L[PBS Reserve line:\\nRAPs+GD/FD]
  L --> O[Gaps appear]
  O --> Q[ROTA future awards]
  O --> W[ROTD day-of + LMCO]
  W --> P[Credit/Pay ledgers]
\`\`\``,
      },
      {
        key: 'system',
        title: 'System Impact',
        body:
          'Notice how each handoff (hire→training→reserve→ops→pay) is a system boundary with its own SLAs and audit needs.',
      },
      {
        key: 'data',
        title: 'Data Impact',
        body: 'One employee ID threads through all stages; lineage tracking makes debugging life possible.',
      },
      {
        key: 'developer',
        title: 'Developer Perspective',
        body:
          'Traceability requirement: given a paycheck line, walk back to the originating operational event chain.',
      },
      {
        key: 'examples',
        title: 'Real Examples',
        body: 'Storm week: cancellations flood open time → ROTD aggressive awards → LMCO premiums → protected pay where trips die mid-sequence.',
      },
    ],
    quiz: [
      {
        question: 'First stop for a cancelled sequence is typically:',
        options: ['Payroll', 'Open time pool', 'Trash', 'Manual email'],
        answerIndex: 1,
        explanation: 'Open time then competes across ROTD/TTS/ETB channels.',
      },
      {
        question: 'Which ordering best describes storm-week flow?',
        options: [
          'Payroll → ROTD → Open time',
          'Cancellation → open time → ROTD/TTS/ETB → premiums/protection',
          'ETB → PBS → Payroll',
          'ROTA only',
        ],
        answerIndex: 1,
        explanation: 'Operations re-cover through the pools; money consequences trail events.',
      },
    ],
    developerView: {
      business: 'Full-lifecycle literacy.',
      systems: ['All of them'],
      inputs: ['Everything'],
      outputs: ['Confident engineers'],
      technical: 'Correlation IDs across services enable the traceability this module teaches.',
    },
  },
]
