import type { AcademyModule } from '../types'

export const modulesPart1: AcademyModule[] = [
  {
    id: 'airline-fundamentals',
    number: 1,
    title: 'Airline Fundamentals',
    icon: 'mdi-airplane',
    color: '#0061AB',
    tagline: 'How an airline turns a published schedule into flown flights with crews attached.',
    estimatedMinutes: 20,
    terms: ['sequence', 'duty-period', 'crew-base', 'layover'],
    sections: [
      {
        key: 'overview',
        title: 'Beginner Overview',
        body:
          'An airline publishes a flight schedule months ahead. To fly it, the company must attach legal crews to every flight, then keep crews legal and rested through disruptions. Flight Attendants (FAs) are safety professionals first — FAA regulations drive training, duty limits, and staffing counts per aircraft.',
      },
      {
        key: 'why',
        title: 'Why It Exists',
        body:
          'Safety regulation + labor contracts + economics collide in crew operations. Every system you will touch exists to answer one question: **how do we cover tomorrow’s flying with qualified, legal, rested people at the lowest cost?**',
      },
      {
        key: 'process',
        title: 'Business Process',
        body: `The lifecycle of flying:

\`\`\`mermaid
flowchart LR
  A[Network Planning\\nbuilds schedule] --> B[Sequence Generation\\ntrips/pairings]
  B --> C[PBS Monthly Bidding]
  C --> D[Awarded Lines of Time]
  D --> E[TTS / ETB Adjustments]
  E --> F[Day-of Operations\\nROTD / Crew Scheduling]
  F --> G[Payroll & Credit]
\`\`\`

Sequences are built from duty periods; lines are bundles of sequences; reserves absorb variance; payroll converts everything into credited hours.`,
      },
      {
        key: 'system',
        title: 'System Impact',
        body:
          'Core system landscape: **PBS** (line award), **TTS/UBL** (post-award trades), **ETB** (real-time board), **ROTA/ROTD** (reserve future/daily), **Crew Scheduling** (day-of control), and payroll/credit engines consuming operational events.',
      },
      {
        key: 'data',
        title: 'Data Impact',
        body:
          'Master data: bases, equipment, positions, qualification matrices. Transactional data: bid packages, preferences, awards, trades, assignments, duty events. Almost everything keys on *sequence ID* and *employee ID* with time resolved in Home Base Time.',
      },
      {
        key: 'developer',
        title: 'Developer Perspective',
        body:
          'Think of the domain as three engines: **match** (bidding/trades assign work), **validate** (legality/rest/windows), and **ledger** (credit/pay accumulation). Most defects live at their boundaries — timezone math, boundary minutes (+30/+45), and pay-vs-credit confusion.',
      },
      {
        key: 'examples',
        title: 'Real Examples',
        body:
          '- A 3-day trip = one sequence, three duty periods, two layovers.\n- Report 0700 HBT means local time at the FA’s base, not the departure airport.\n- A cancelled flight returns its sequence to open time, where ROTD/TTS/ETB compete to re-cover it.',
      },
    ],
    quiz: [
      {
        question: 'What is a “sequence”?',
        options: [
          'A single flight segment',
          'A packaged set of duty periods/flights flown by one crew',
          'A month of flying for one FA',
          'A reserve availability window',
        ],
        answerIndex: 1,
        explanation: 'Sequences (pairings) bundle duty periods into one crew assignment — the atomic unit of scheduling.',
      },
      {
        question: 'Which clock anchors contractual time rules like RAPs and deadlines?',
        options: ['UTC', 'Departure airport local time', 'Home Base Time (HBT)', 'Eastern Time'],
        answerIndex: 2,
        explanation: 'HBT is defined as the actual time of day at the FA’s assigned crew base.',
      },
      {
        question: 'Order these lifecycle stages correctly:',
        options: [
          'PBS → Sequence generation → TTS → Payroll',
          'Sequence generation → PBS → TTS/ETB → Day-of ops → Payroll',
          'TTS → PBS → Sequence generation → Payroll',
          'Day-of ops → PBS → Payroll → TTS',
        ],
        answerIndex: 1,
        explanation: 'Flying is generated into sequences, awarded via PBS, adjusted via TTS/ETB, operated day-of, then paid.',
      },
    ],
    developerView: {
      business: 'Cover published flights with legal crews while honoring seniority-based preferences.',
      systems: ['Network Planning', 'PBS', 'TTS/UBL', 'ETB', 'ROTA/D', 'Payroll'],
      inputs: ['Flight schedule', 'Staffing plan', 'Qualifications', 'Contract parameters'],
      outputs: ['Awarded lines', 'Assignments', 'Credit/pay records'],
      technical:
        'Event-driven pipeline; sequence is the shared aggregate across match/validate/ledger services.',
    },
  },
  {
    id: 'fa-operations',
    number: 2,
    title: 'Flight Attendant Operations',
    icon: 'mdi-account-group',
    color: '#0078D2',
    tagline: 'Positions, staffing, uniforms, hotels — the working world of an FA.',
    estimatedMinutes: 18,
    terms: ['position', 'crew-base', 'deadhead', 'layover'],
    sections: [
      {
        key: 'overview',
        title: 'Beginner Overview',
        body:
          'Every aircraft type requires a specific FA complement split into numbered **positions** (1, 2, 3…). Position 1 is the Lead FA. Crews work fixed positions within a sequence even if aircraft types mix mid-trip.',
      },
      {
        key: 'why',
        title: 'Why It Exists',
        body:
          'FA staffing is legally mandated per seat/aircraft. Positioning defines service AND emergency responsibilities — it is safety architecture, not just hospitality.',
      },
      {
        key: 'process',
        title: 'Business Process',
        body: `From posting to pairing:

\`\`\`mermaid
flowchart TD
  A[Equipment/Scheduled service] --> B[Required complement\\nby position]
  B --> C[Sequence construction\\nwith fixed positions]
  C --> D[Crew award/assignment]
  D --> E[Report → Brief → Fly → Debrief]
\`\`\``,
      },
      {
        key: 'system',
        title: 'System Impact',
        body:
          'Staffing tables feed sequence builders and assignment validators. Deadhead (positioning) travel uses positive-space protections when covering assignments.',
      },
      {
        key: 'data',
        title: 'Data Impact',
        body:
          'Entities: AircraftType→Complement map, Position, Qualification (language/galley/lead), CrewAccommodation (hotel) linked to layovers.',
      },
      {
        key: 'developer',
        title: 'Developer Perspective',
        body:
          'Model positions as ordinal slots with qualification constraints. The “same position across mixed fleet” rule is a validation constraint spanning segments.',
      },
      {
        key: 'examples',
        title: 'Real Examples',
        body:
          '- A321 + 787 mix inside one sequence: same FA keeps position N on both aircraft.\n- PHL–FRA requires a German-qualified Speaker in a designated position.',
      },
    ],
    quiz: [
      {
        question: 'Within one sequence containing mixed aircraft types, an FA:',
        options: [
          'May be repositioned per leg',
          'Works the same position number throughout',
          'Chooses daily',
          'Always works position 1',
        ],
        answerIndex: 1,
        explanation: 'Contract language: an FA will not be required to work a different position number within a sequence.',
      },
      {
        question: 'Who is the Lead Flight Attendant?',
        options: [
          'Most senior FA on the plane',
          'The FA awarded/assigned position 1',
          'Purser appointed by captain',
          'Rotates by leg',
        ],
        answerIndex: 1,
        explanation: 'Lead FA = the person holding Number 1 on that sequence.',
      },
    ],
    developerView: {
      business: 'Right people, right positions, legally staffed on every flight.',
      systems: ['Staffing tables', 'Sequence builder', 'Assignment engine'],
      inputs: ['Aircraft complements', 'Qualifications', 'Schedule'],
      outputs: ['Positioned crews per segment'],
      technical: 'Constraint satisfaction over ordinal slots; qualification matrix lookups.',
    },
  },
  {
    id: 'scheduling',
    number: 3,
    title: 'Scheduling',
    icon: 'mdi-calendar-month',
    color: '#003057',
    tagline: 'Lines, guarantees, days-off patterns, and the Joint Scheduling Committee.',
    estimatedMinutes: 25,
    terms: ['line-of-time', 'jsc', 'credited-hours', 'carry-over'],
    sections: [
      {
        key: 'overview',
        title: 'Beginner Overview',
        body:
          'Monthly scheduling turns next month’s flying into **Lines of Time**: 70–90 credit hours (flexible ±5/month within an annual 25-hour pool; High/Low options reach 110/40). Lineholders hold lines; Reserves hold RAP-based lines.',
      },
      {
        key: 'why',
        title: 'Why It Exists',
        body:
          'Predictable monthly products let employees plan life and let the company guarantee coverage. Contractual bands prevent both starvation and runaway credit.',
      },
      {
        key: 'process',
        title: 'Business Process',
        body: `Monthly cadence (per §10):

| When | What |
|---|---|
| Prior month 1st/3rd/6th (1200 DFW) | APFA sequence review rounds |
| By prior month 8th (1200 DFW) | Bid package published in PBS |
| Mid-month | PBS opens/closes; awards run in seniority order |
| Post-award | Carry-over placement ≤10th; TTS opens |

Bid packages must include RAP lists, event calendars, line ranges, projected lines min/mid/max per base, headcounts, minimum Reserves, layover hotels, and projected standby shifts (start/length/location).`,
      },
      {
        key: 'system',
        title: 'System Impact',
        body:
          'JSC co-develops parameters (line ranges, block-hour allocation). Misawards (including certain cancellations during bidding) route to formal remediation under §10.T.',
      },
      {
        key: 'data',
        title: 'Data Impact',
        body:
          'Line {value, daysOffPattern, sequences[]}; BidPackage snapshot versioned; Award audit trail; CarryOver links two months’ ledgers.',
      },
      {
        key: 'developer',
        title: 'Developer Perspective',
        body:
          'Treat parameter values as governed config (JSC-approved), never hardcode. Days-off patterns and proration tables belong in rules-as-data.',
      },
      {
        key: 'examples',
        title: 'Real Examples',
        body:
          '- 31-day months may donate a day to short months to stabilize lines.\n- An 84-hour line with 13 days off is typical mid-seniority output.',
      },
    ],
    quiz: [
      {
        question: 'Standard Line of Time bounds are:',
        options: ['60–80 hrs', '70–90 hrs', '75–95 hrs', '80–100 hrs'],
        answerIndex: 1,
        explanation: 'Min 70 / max 90 credit hours, flexed only via the annual pool or High/Low bids.',
      },
      {
        question: 'When must the bid package be available in PBS?',
        options: [
          'By the 15th of the bid month',
          'By the 8th of the prior month at 1200 DFW',
          '48h before close',
          'Anytime',
        ],
        answerIndex: 1,
        explanation: '§10.C.1 sets the 8th-day deadline at 1200 DFW.',
      },
      {
        question: 'Carry-over trips must post no later than:',
        options: ['5th of originating month', '10th of originating month', 'End of bid month', 'Release day'],
        answerIndex: 1,
        explanation: 'Change-overs place on schedules by the 10th of the origin month.',
      },
    ],
    developerView: {
      business: 'Publish fair, legal, coverage-complete monthly products.',
      systems: ['Sequence planner', 'PBS', 'APFA review tools'],
      inputs: ['Sequences', 'Staffing', 'Vacations', 'Parameters'],
      outputs: ['Bid packages', 'Awards', 'Published schedules'],
      technical: 'Versioned snapshots; parameter registry; misaward reconciliation jobs.',
    },
  },
  {
    id: 'pairings',
    number: 4,
    title: 'Pairings & Sequences',
    icon: 'mdi-route',
    color: '#C01933',
    tagline: 'How individual flights become multi-day trips.',
    estimatedMinutes: 22,
    terms: ['sequence', 'duty-period', 'odan', 'ipd', 'multiple-sequences'],
    sections: [
      {
        key: 'overview',
        title: 'Beginner Overview',
        body:
          'Pairings (sequences) combine 1–4 duty periods across 1–4 calendar days (up to six with IPD flying). Construction balances legality, rest, pay efficiency, and operability.',
      },
      {
        key: 'why',
        title: 'Why It Exists',
        body:
          'Packaging flights into crew-sized units makes bidding, trading, and payroll tractable. Good pairings minimize idle crew-hours and hotel costs.',
      },
      {
        key: 'process',
        title: 'Business Process',
        body: `\`\`\`mermaid
flowchart TD
  A[Flights for month] --> B[Duty period assembly\\nreport/buffer/release rules]
  B --> C{Rest between duties?}
  C -- yes --> D[Layover selection\\nhotel + per diem]
  C -- no --> E[Re-cut duty period]
  D --> F[Sequence legality checks\\nHours of Service §11]
  F --> G[Tag attributes:\\nODAN, IPD, red-flag risk]
\`\`\``,
      },
      {
        key: 'system',
        title: 'System Impact',
        body:
          'Tags computed at build time (ODAN via 0100–0500 HBT overlap; IPD flags) drive PBS preference matching and premiums downstream.',
      },
      {
        key: 'data',
        title: 'Data Impact',
        body:
          'Sequence → DutyPeriod[] → Segment[]; derived: dutyMinutes, creditMinutes, tags[], staffing[].',
      },
      {
        key: 'developer',
        title: 'Developer Perspective',
        body:
          'Pure derivation layer: compute once at publish, cache, and invalidate on any schedule change. Boundary conditions (buffers 15/30 min, +45 separation) deserve exhaustive tests.',
      },
      {
        key: 'examples',
        title: 'Real Examples',
        body:
          '- One-day turn: single duty period, no layover.\n- Four-day West Coast pattern with three layovers.\n- Six-day IPD sequence hitting the extended cap.',
      },
    ],
    quiz: [
      {
        question: 'Max standard sequence length without IPD:',
        options: ['2 days', '3 days', '4 days', '6 days'],
        answerIndex: 2,
        explanation: '4 duty/calendar days standard; IPD-containing sequences may extend to six.',
      },
      {
        question: 'An ODAN is tagged when on-duty time includes all hours between:',
        options: ['2200–0600 HBT', '0100–0500 HBT', '0000–0400 HBT', '0300–0600 HBT'],
        answerIndex: 1,
        explanation: '§2.II fixes the window at 0100–0500 Home Base Time.',
      },
      {
        question: 'Post-flight buffer added to Domestic arrival for duty computation:',
        options: ['10 min', '15 min', '30 min', '45 min'],
        answerIndex: 1,
        explanation: 'Domestic 15 minutes; International 30 minutes.',
      },
    ],
    developerView: {
      business: 'Efficient, legal, operable trips.',
      systems: ['Sequence optimizer', 'Legality engine'],
      inputs: ['Flights', 'Rest rules', 'Hotels', 'Staffing'],
      outputs: ['Tagged sequences'],
      technical: 'Derived attribute pipeline + constraint solver; heavy unit-test surface.',
    },
  },
  {
    id: 'pbs',
    number: 5,
    title: 'PBS — Preferential Bidding System',
    icon: 'mdi-ballot',
    color: '#0061AB',
    tagline: 'Seniority-ranked preference awarding for lines.',
    estimatedMinutes: 28,
    terms: ['pbs', 'seniority-occupational', 'ppo', 'misaward', 'line-of-time'],
    sections: [
      {
        key: 'overview',
        title: 'Beginner Overview',
        body:
          'PBS ingests the bid package plus every FA’s ranked preferences, then awards Lineholder and Reserve lines **in seniority order**, honoring legalities and global parameters (line ranges, Reserve minimums).',
      },
      {
        key: 'why',
        title: 'Why It Exists',
        body:
          'Maximizes realized preference value subject to coverage. Seniority supplies the tie-breaking ethic the union negotiated.',
      },
      {
        key: 'process',
        title: 'Business Process',
        body: `\`\`\`mermaid
sequenceDiagram
  participant CP as Crew Planning
  participant PBS as PBS Engine
  participant FA as Flight Attendant
  CP->>PBS: Publish bid package (≤8th, 1200 DFW)
  FA->>PBS: Submit ranked choices
  PBS->>PBS: Process in seniority order
  Note over PBS: Cover constraints first,<br/>then preferences
  PBS->>FA: Award line (or misaward path)
  FA->>PBS: Protest window / corrections
\`\`\``,
      },
      {
        key: 'system',
        title: 'System Impact',
        body:
          'Inputs: seniority list snapshots, qualifications, vacations, training awards, Reserve designations (incl. Senior Bump elections pre-open). Outputs: lines, Reserve lines, PPO simulations, misaward queue.',
      },
      {
        key: 'data',
        title: 'Data Impact',
        body:
          'Preference {type, weight, params}; Award {employeeId, lineId, snapshotId}; determinism requires frozen inputs — document them.',
      },
      {
        key: 'developer',
        title: 'Developer Perspective',
        body:
          'Reproducibility is king: identical snapshot + bids ⇒ identical award. Build replay tooling; treat protests as diff reports against the snapshot.',
      },
      {
        key: 'examples',
        title: 'Real Examples',
        body:
          '- Junior FA gets residual coverage despite perfect preferences — expected behavior.\n- Cancelled-sequence-during-bidding becomes a misaward case, not silent loss.',
      },
    ],
    quiz: [
      {
        question: 'PBS awards preferences primarily in what order?',
        options: ['Random', 'Submission time', 'Seniority', 'Base alphabetical'],
        answerIndex: 2,
        explanation: 'Preferential bidding = seniority-ordered optimization.',
      },
      {
        question: 'PPO bidding produces:',
        options: ['Extra flying', 'A notional award for pay purposes', 'Reserve credit', 'Overtime'],
        answerIndex: 1,
        explanation: 'Pay Purposes Only simulates holdings for pay when off the entire period.',
      },
    ],
    developerView: {
      business: 'Turn ranked wishes into one fair, legal monthly product set.',
      systems: ['PBS Engine'],
      inputs: ['Bid package', 'Preferences', 'Seniority snapshot', 'Qualifications/Vacations'],
      outputs: ['Awards', 'Reserve lines', 'Misaward queue'],
      technical: 'Deterministic batch optimizer; snapshot isolation; replayable runs.',
    },
  },
  {
    id: 'bidding',
    number: 6,
    title: 'Bidding',
    icon: 'mdi-gavel',
    color: '#0078D2',
    tagline: 'From package publication to award — the operational month kickoff.',
    estimatedMinutes: 20,
    terms: ['pbs', 'tts', 'ubl', 'standby'],
    sections: [
      {
        key: 'overview',
        title: 'Beginner Overview',
        body:
          'Bidding is a scheduled dance: package ≤8th, APFA reviews earlier (1st/3rd/6th), FAs submit PBS choices, awards process, then TTS/UBL reshape results before the month starts.',
      },
      {
        key: 'why',
        title: 'Why It Exists',
        body: 'Fixed deadlines create certainty for employees and stable inputs for downstream staffing math.',
      },
      {
        key: 'process',
        title: 'Interactive Timeline',
        body: 'See the **Bidding Academy** timeline view for the full step-by-step flow with contract references.',
      },
      {
        key: 'system',
        title: 'System Impact',
        body:
          'Complex TTS features (multi-add conditional drops, day-improvement exceptions, Reserve day-off transactions, out-of-base UBL, LMCO-related UBL, same-origin trip improvement) were flagged for staged implementation per the Implementation LOA.',
      },
      {
        key: 'data',
        title: 'Data Impact',
        body: 'Bid windows as state machines: draft → submitted → locked → processed → awarded → protested.',
      },
      {
        key: 'developer',
        title: 'Developer Perspective',
        body:
          'Deadline enforcement belongs in one service, not scattered validations; emit timeline events for auditability.',
      },
      {
        key: 'examples',
        title: 'Real Examples',
        body: '- Missing the PBS close locks your old preferences — support tickets spike here.\n- UBL election persists across daily runs until satisfied or withdrawn.',
      },
    ],
    quiz: [
      {
        question: 'APFA initial sequence response is due which day of the prior month?',
        options: ['1st', '3rd', '6th', '8th'],
        answerIndex: 1,
        explanation: 'Review cadence: 1st delivery, 3rd APFA response, 6th final review.',
      },
      {
        question: 'UBL stands for:',
        options: ['Universal Bid Line', "Unsuccessful Bidder's List", 'Unassigned Block Listing', 'Uniform Bid Ledger'],
        answerIndex: 1,
        explanation: "Unsuccessful Bidder's List feeds leftover preferences into Daily processing.",
      },
    ],
    developerView: {
      business: 'Predictable, auditable award cycle.',
      systems: ['PBS', 'TTS/UBL', 'Notification hub'],
      inputs: ['Packages', 'Bids', 'Elections'],
      outputs: ['Awards', 'UBL queues', 'Alerts'],
      technical: 'Window scheduler + state machines + event log.',
    },
  },
  {
    id: 'reserve',
    number: 7,
    title: 'Reserve',
    icon: 'mdi-phone-incoming',
    color: '#C01933',
    tagline: 'RAPs, call-outs, Golden/Flex days, standby — the flexibility workforce.',
    estimatedMinutes: 30,
    terms: ['rap', 'golden-day', 'flex-day', 'rota', 'rotd', 'lmco', 'standby', 'reserve-line', 'senior-bump'],
    sections: [
      {
        key: 'overview',
        title: 'Beginner Overview',
        body:
          'Reserves hold lines of **availability**, not trips: RSV duty days bounded by RAPs, protected Golden Days, elastic Flex Days. They receive sequences via future processing (**ROTA**) or day-of processing (**ROTD**), including standbys and aggressive bids.',
      },
      {
        key: 'why',
        title: 'Why It Exists',
        body: 'Operations are stochastic — storms, sickness, delays. Reserves convert uncertainty into coverage without pre-building empty trips.',
      },
      {
        key: 'process',
        title: 'Business Process',
        body: `\`\`\`mermaid
flowchart TD
  A[Reserve line:\\nRAPs + GD/FD] --> B{Gap appears?}
  B -- known ahead --> C[ROTA future award\\nseniority order]
  B -- today --> D[ROTD daily processing]
  D --> E[Aggressive bids]
  D --> F[Standby assignment]
  D --> G[LMCO premium paths]
  C --> H[Fly sequence]
  E --> H
  F --> H
  G --> H
\`\`\`

Rotation (post-ratification hires): straight Reserve × 2 years → 1-on/1-off × 3 years → 1-on/3-off as needed. Pre-ratification: straight year one, then 1/1 ×3, then 1/3. Extra months needed? Selected in reverse seniority order.`,
      },
      {
        key: 'system',
        title: 'System Impact',
        body:
          'Golden-Day elections lock before Future processing (pre-1500 HBT); ROTD supports reconsideration until contact. Known open time redistributes by noon HBT (Implementation LOA). VLOA months grant no rotation credit.',
      },
      {
        key: 'data',
        title: 'Data Impact',
        body: 'RapWindow {start,end,modifications[]}; Election {goldenWaiver, deadline, revocableUntil}; RotationLedger per employee.',
      },
      {
        key: 'developer',
        title: 'Developer Perspective',
        body:
          'Consent + deadline modeling is the hard part. Every Golden-Day waiver needs an immutable election record; extensions need approver chains.',
      },
      {
        key: 'examples',
        title: 'Real Examples',
        body:
          '- Called at 0530 for 0630 report → LMCO premium territory.\n- Volunteering into a Golden Sunday via ROTD waives that instance permanently.',
      },
    ],
    quiz: [
      {
        question: 'ROTD differs from ROTA because ROTD:',
        options: [
          'Awards future months',
          'Handles day-of operations and aggressive bids',
          'Only assigns standby',
          'Is voluntary-only',
        ],
        answerIndex: 1,
        explanation: 'ROTD = daily processing incl. aggressive bids; ROTA = future operations.',
      },
      {
        question: 'Golden Days may be moved without consent?',
        options: ['Yes, anytime', 'Only by JSC vote', 'No — mutual consent required', 'During IO only'],
        answerIndex: 2,
        explanation: 'Mutual consent of Reserve and Company is required.',
      },
      {
        question: 'Post-ratification new hires serve straight Reserve for:',
        options: ['6 months', '12 months', '24 months', '36 months'],
        answerIndex: 2,
        explanation: 'Two full years straight, then rotating phases begin.',
      },
      {
        question: 'Additional Reserve months beyond rotation select by:',
        options: ['Lottery', 'Reverse seniority order', 'Volunteers only', 'Base size'],
        answerIndex: 1,
        explanation: 'Reverse order of seniority picks involuntary extra Reserve months.',
      },
    ],
    developerView: {
      business: 'Absorb operational chaos with contractual fairness.',
      systems: ['ROTA', 'ROTD', 'Crew Scheduling consoles'],
      inputs: ['Open time', 'Availability', 'Elections', 'Priorities'],
      outputs: ['Assignments', 'Premiums', 'Rotation updates'],
      technical: 'Interval algebra + precedence rules + consent ledger; noon-HBT redistribution SLA.',
    },
  },
  {
    id: 'tts',
    number: 8,
    title: 'TTS — Trip Trade System',
    icon: 'mdi-swap-horizontal',
    color: '#003057',
    tagline: 'Drops, pickups, and trades after award — including UBL and daily runs.',
    estimatedMinutes: 26,
    terms: ['tts', 'ubl', 'etb', 'credit-window', 'open-time'],
    sections: [
      {
        key: 'overview',
        title: 'Beginner Overview',
        body:
          'TTS processes requests to drop/pick up/trade sequences post-award, validating each transaction against legality and the **Credit Window** (TTS Maximum − awarded value). Denied-but-willing FAs pass to **UBL** for daily-run retries.',
      },
      {
        key: 'why',
        title: 'Why It Exists',
        body: 'Life happens between publication and operation. TTS reallocates work continuously while preserving coverage math.',
      },
      {
        key: 'process',
        title: 'Business Process',
        body: `\`\`\`mermaid
stateDiagram-v2
  [*] --> Submitted
  Submitted --> Validated: legality + window check
  Validated --> Awarded
  Validated --> Denied
  Denied --> UBL: elected pass-to-UBL
  UBL --> Awarded: later daily run matches
  Awarded --> [*]
\`\`\``,
      },
      {
        key: 'system',
        title: 'System Impact',
        body:
          'Runs interleave with ETB real-time moves. Implementation LOA calls out complex additions: conditional multi-add drops, negative-day improvements exceeding daily limits, Reserve day-off electronic transactions, out-of-base UBL, less-than-minimum-call-out UBL, same-day-origin trip improvement.',
      },
      {
        key: 'data',
        title: 'Data Impact',
        body: 'Transaction {requester, targets[], mode}; WindowBalance recomputed per move; RunManifest for daily batches.',
      },
      {
        key: 'developer',
        title: 'Developer Perspective',
        body:
          'Concurrency: ETB races vs batch runs. Idempotent retries and optimistic locking prevent double-awards — the classic production incident here.',
      },
      {
        key: 'examples',
        title: 'Real Examples',
        body:
          '- Drop a Tuesday/Wednesday 2-day, pick up a weekend 3-day within remaining window.\n- Red-flagged open time pickup pays 150% but credits 100%.',
      },
    ],
    quiz: [
      {
        question: 'The Credit Window equals:',
        options: [
          'Monthly max − guarantee',
          'TTS Maximum − PBS awarded value',
          'Credited − paid hours',
          'Pickups − drops count',
        ],
        answerIndex: 1,
        explanation: '§2.G defines it exactly so; trades mutate the window both directions.',
      },
      {
        question: 'Denied TTS requests can still succeed later via:',
        options: ['Manual email', 'UBL daily processing', 'Grievance only', 'Never'],
        answerIndex: 1,
        explanation: 'Passing to UBL enters subsequent daily-run consideration.',
      },
      {
        question: 'Red-flagged open time pays/credits:',
        options: ['150%/150%', '150%/100%', '100%/100%', '200%/100%'],
        answerIndex: 1,
        explanation: 'Premium pay at 150%, credit capped at 100%.',
      },
    ],
    developerView: {
      business: 'Self-service schedule surgery under strict guardrails.',
      systems: ['TTS core', 'Daily runner', 'ETB gateway'],
      inputs: ['Requests', 'Schedules', 'Open time', 'Windows'],
      outputs: ['Updated schedules', 'Audit trail'],
      technical: 'Saga-style transaction handling; invariant: sum(credits) conservation per employee.',
    },
  },
]
