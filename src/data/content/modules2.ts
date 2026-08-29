import type { AcademyModule } from '../types'

/* ==================================================================
 * MODULE 10 — ETB
 * ================================================================== */
const etb: AcademyModule = {
  id: 'etb',
  number: 10,
  title: 'ETB — Electronic Trade Board',
  icon: 'mdi-view-dashboard-variant',
  color: '#0078D2',
  tagline: 'The real-time, first-come/first-served trading floor.',
  estimatedMinutes: 15,
  terms: ['etb', 'tts', 'open-time', 'credit-window', 'red-flagging'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-view-dashboard-variant',
      title: 'ELECTRONIC TRADE BOARD',
      text: 'TTS runs on a schedule — batch jobs that process requests in windows. But opportunities do not wait for a batch. ETB is the always-on marketplace where a flight attendant can drop, pick up, or trade a trip in seconds, first come first served.',
    },
    {
      kind: 'prose',
      title: 'The instant marketplace',
      icon: 'mdi-store-outline',
      body: `Think of ETB as the trading floor that never closes. Someone posts a trip, someone else claims it, legality is checked instantly, and both schedules update immediately. No waiting for a scheduled run, no seniority gate — the person who acts first, wins.

That “first come, first served” rule is the entire personality of ETB. It is what makes it feel so different from PBS, which is all about seniority, and from TTS, which is all about batch windows.`,
    },
    {
      kind: 'compare',
      title: 'TTS vs ETB — same verbs, opposite cadence',
      items: [
        {
          title: 'TTS (Trip Trade System)',
          icon: 'mdi-swap-horizontal-bold',
          color: '#003057',
          points: [
            'Scheduled and **batch-processed** — ballots open on dates, runs happen routinely.',
            'Suits **planning ahead**: drop/pick up/trade ballots built days before flying.',
            'A denied request can **pass to UBL** and retry on a later daily run.',
            'Credit Window math applied per entire ballot.',
          ],
        },
        {
          title: 'ETB (Electronic Trade Board)',
          icon: 'mdi-view-dashboard-variant',
          color: '#0078D2',
          points: [
            '**Real-time and first-come/first-served** — a claim commits the instant it lands.',
            'Suits **last-minute action**: grab the opportunity the moment it posts.',
            'No UBL retry — win now or it is gone.',
            'Credit Window checked per trade, paid/credited instantly (red flags 150%/100%).',
          ],
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-store-clock-outline',
      title: 'ETB pauses during the batch runs',
      text: 'ETB is “real-time” — except during TTS processing and PBS processing windows, when batch engines hold the same open-time items and ETB transactions pause to avoid clobbering them. Same pool, shared locks, clearly separated run phases.',
    },
    {
      kind: 'diagram',
      caption: 'One post, one claim, instant commit — or a clean rejection with a reason code.',
      code: `flowchart LR
    A["Post / offer"] --> B["Legality + window check"]
    B -- ok --> C["Commit instantly"]
    B -- conflict --> D["Reject: reason code"]
    C --> E["Both schedules update"]`,
    },
    {
      kind: 'callout',
      tone: 'error',
      icon: 'mdi-ray-start-vertex',
      title: 'The race condition that pays your mortgage',
      text: 'Two flight attendants can hit “pick up” on the same trip at the same instant. ETB must serialize those claims so exactly one wins. This is optimistic concurrency in its purest form: first write wins, everyone else sees a stale-listing error.',
    },
    {
      kind: 'prose',
      title: 'The red-flag special case',
      icon: 'mdi-flag-variant',
      body: `Some open-time trips are **red-flagged** because they are hard to cover. Picking one up pays a **150% premium — but credits only 100%** of the hours. This pay-vs-credit gap is a recurring source of confusion and a great test case: money rises, credit does not, and the Credit Window sees only the credited side.`,
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-code-braces',
      title: 'For developers',
      text: 'Design for latency and staleness. Use idempotency keys so a double-tap cannot double-sell one trip, server-side claim arbitration with serialized commits, and an optimistic UI that reconciles cleanly when a claim loses.',
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
    {
      question: 'A red-flagged trip picked up on ETB pays/credits:',
      options: ['150%/150%', '150%/100%', '100%/100%', '200%/100%'],
      answerIndex: 1,
      explanation: 'Premium pay at 150%, credit capped at 100%.',
    },
  ],
}

/* ==================================================================
 * MODULE 11 — CREW MANAGEMENT
 * ================================================================== */
const crewManagement: AcademyModule = {
  id: 'crew-management',
  number: 11,
  title: 'Crew Management',
  icon: 'mdi-sitemap',
  color: '#0061AB',
  tagline: 'Transfers, leaves, co-terminals, TDY, and day-of control.',
  estimatedMinutes: 20,
  terms: ['vacancy-transfer', 'relocation-days', 'crew-base', 'hbt'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-sitemap',
      title: 'CREW MANAGEMENT',
      text: 'Scheduling decides who flies what. Crew Management governs the people side: who moves between bases, who is on leave, who is temporarily assigned elsewhere, and who controls the operation in the moment. It is the layer that keeps an ever-moving workforce orderly and contractual.',
    },
    {
      kind: 'prose',
      title: 'The big pieces',
      icon: 'mdi-puzzle-outline',
      body: `Four levers make up most of Crew Management:

- **Base transfers** — a flight attendant moves to a new crew base, seniority-based, through a vacancy process.
- **Leaves** — medical, VLOA (voluntary), military, and more. Each changes what can be scheduled.
- **Temporary Duty (TDY)** — being sent to work out of a different base for a while.
- **Co-terminal rules** — how paired airports (JFK·LGA, DCA·IAD, ORD·MDW, DFW·DAL) behave as a single base for reporting and pay.`,
    },
    {
      kind: 'prose',
      title: 'The transfer lifecycle',
      icon: 'mdi-home-switch-outline',
      body: `A transfer follows a clear arc: a **vacancy posts** → eligible flight attendants **bid** → it is **awarded in seniority order** → it takes effect. Two side-effects matter enormously:

1. **Relocation Days** — up to **five consecutive days free of all duty** so the person can physically move. They must be blocked from every assignment engine once granted.
2. **Reserve reset** — a transferring flight attendant lands in the reserve group at the new base and serves reserve for the **first full scheduling month there**, regardless of what they did at their old base.

Both are “effect” events that ripple through scheduling, payroll, and reserve rotation.`,
    },
    {
      kind: 'callout',
      tone: 'warning',
      icon: 'mdi-alpha-s-box-outline',
      title: 'Satellite bases follow their own process',
      text: 'Opening or closing a satellite base follows a contractual notice process (§10.U). These are not just configuration toggles — there is a governance procedure with notifications you must honor in the system.',
    },
    {
      kind: 'prose',
      title: 'Leaves are a cross-cutting concern',
      icon: 'mdi-calendar-remove-outline',
      body: `A leave is not a simple “user is busy.” It changes everything around it:

- **PBS**: a full-month leave often triggers **PPO** bidding (phantom awards to protect pay).
- **Rotation**: a **VLOA month earns no reserve-rotation credit**.
- **Seniority**: some leaves pause or protect accrual.

Because so many engines depend on it, model leaves as a **shared absence service that emits effect events** — not a per-engine hack.`,
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-code-braces',
      title: 'For developers',
      text: 'Crew Management is the governance layer. Model vacancies and leaves as workflows with states (posted → bid → awarded → effective) that emit side-effect events (blocked intervals, rotation resets, PPO flags) to a bus every other service consumes.',
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
    {
      question: 'A VLOA month earns the reserve rotation:',
      options: ['Full credit', 'Half credit', 'No credit', 'Double credit'],
      answerIndex: 2,
      explanation: 'VLOA months grant no reserve-rotation credit — track it or rotation math drifts.',
    },
  ],
}

/* ==================================================================
 * MODULE 12 — PAYROLL & CREDIT
 * ================================================================== */
const payroll: AcademyModule = {
  id: 'payroll',
  number: 12,
  title: 'Payroll & Credit',
  icon: 'mdi-cash-multiple',
  color: '#C01933',
  tagline: 'Credited hours, rigs, premiums, guarantees, and the pay-vs-credit ledgers.',
  estimatedMinutes: 24,
  terms: ['credited-hours', 'duty-rig', 'rig', 'tafb', 'pay-no-credit', 'red-flagging', 'carry-over'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-cash-multiple',
      title: 'PAYROLL & CREDIT',
      text: 'A flight attendant’s paycheck is not just “hours flown × rate.” It is a careful accounting that starts with credit, adds guarantees (RIGs), layers on premiums, and tracks two ledgers that must never be mixed: what they are paid and what they are credited.',
    },
    {
      kind: 'prose',
      title: 'Credit first, pay second',
      icon: 'mdi-order-bool-ascending-variant',
      body: `The single most important idea in this module: **pay and credit are two different ledgers.** *Credit* is the running total of everything that counts toward the monthly maximum — flown segments, deadheads, vacation, sick, training, duty rig, and more. *Pay* is what actually lands on the check, which layers premiums on top.

They are separate by design. A red-flagged trip can *pay* 150% while only *crediting* 100% — money goes up, credit does not. Mix the ledgers and you will break monthly maxima, reserve utilization math, and guarantees all at once.`,
    },
    {
      kind: 'callout',
      tone: 'warning',
      icon: 'mdi-cash-refund',
      title: 'The golden rule for engineers',
      text: 'Compute credit once and reference it everywhere. Keep the pay and credit columns as distinct fields on every ledger line, add reversals instead of editing history, and build a daily ops-vs-pay reconciliation diff.',
    },
    {
      kind: 'header',
      icon: 'mdi-chart-gantt',
      color: '#C01933',
      title: 'RIGs: the pay guarantees',
      text: 'Even when flying is light, the paycheck is protected by a family of built-in floors called RIGs (Ratio in Guarantee).',
    },
    {
      kind: 'prose',
      title: 'The RIG family, at a glance',
      icon: 'mdi-shield-crown-outline',
      body: `Here is the full set of pay guarantees, each a small formula that tops up pay when actual block time falls short. On the crew’s HI-3 paycode line these show up as letters:

| RIG | Rate | What counts | HI-3 letter |
|---|---|---|---|
| **Minimum Day** | ≥ 5h per duty period (≥ 3h multi-day) | Duty-period floor | **G** Time |
| **Duty Rig** | 1h per 2h on duty | On-duty minutes | **E** Time |
| **Trip Rig** | 1h per 3.5h | Time Away From Base (TAFB) | **F** Time |
| **Sit Rig** | 1m per 2m of sit past 2h30m | Actual sit time | supplemental |

A worked example makes it concrete: a 12-hour duty day that only flew 5:00 is paid at least 6:00 (Duty Rig). A 35-hour trip away from base that flew only 8:00 pays at least 10:00 (Trip Rig = 35 ÷ 3.5).`,
    },
    {
      kind: 'terms',
      title: 'Payroll vocabulary',
      items: [
        { id: 'duty-rig', term: 'Duty Rig', icon: 'mdi-timer-outline', definition: '1-hour credit per 2 hours on-duty, minute-prorated — the most common rig.' },
        { id: 'rig', term: 'RIG', icon: 'mdi-shield-crown-outline', definition: 'Ratio in Guarantee — the family of pay floors protecting against low-flying days.' },
        { id: 'tafb', term: 'TAFB', icon: 'mdi-timer-sand', definition: 'Time Away From Base — first-day report to last-day release; drives Trip Rig and per diem.' },
        { id: 'pay-no-credit', term: 'Pay No Credit', icon: 'mdi-credit-card-off', definition: 'Paid but not credited — counts above guarantee but not toward maxima.' },
        { id: 'credited-hours', term: 'Credited hours', icon: 'mdi-counter', definition: 'The unified total counting toward monthly maximum: flights + absences + rigs + more.' },
        { id: 'red-flagging', term: 'Red flag', icon: 'mdi-flag-variant', definition: 'Hard-to-cover open time paying 150% but crediting 100%.' },
      ],
    },
    {
      kind: 'prose',
      title: 'The guarantee and the carry-over edge',
      icon: 'mdi-seal-variant',
      body: `Two more concepts seal the design:

- **The monthly guarantee.** If credit for the month falls below your awarded line value, the guarantee tops your *pay* up to that floor. This is why line values matter even before you fly a single trip.
- **Carry-over at the month boundary.** A trip that reports in one month and releases in the next must split its credit across the boundary correctly. Botch it and you corrupt two months of payroll at once.

And remember the month boundary from the FA’s side: time before midnight credits to the originating month; time after midnight (along with RIGs) carries to the next.`,
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-code-tags',
      title: 'For developers',
      text: 'Model every RIG as a pure function — max(credit, floor) — computed per duty period or per trip. Duty Rig uses on-duty minutes; Trip Rig uses TAFB; Minimum Day uses a duty-period floor. Rounding policy must be explicit (minute proration) and shared org-wide.',
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
    {
      question: 'A 35-hour trip away from base that flies only 8 hours pays at least (Trip Rig):',
      options: ['8 hours', '10 hours', '12 hours', '17.5 hours'],
      answerIndex: 1,
      explanation: 'Trip Rig = TAFB ÷ 3.5 → 35 ÷ 3.5 = 10 hours guaranteed regardless of the 8 block hours.',
    },
    {
      question: 'Time Away From Base (TAFB) is measured from…',
      options: [
        'Gate-out to gate-in',
        'First-day report to last-day release',
        'Door close to door open',
        'Block-out to block-in',
      ],
      answerIndex: 1,
      explanation: 'TAFB spans the whole sequence — report on day one through release on the final day.',
    },
  ],
}

/* ==================================================================
 * MODULE 13 — TRAINING
 * ================================================================== */
const trainingModule: AcademyModule = {
  id: 'training-module',
  number: 13,
  title: 'Training',
  icon: 'mdi-school',
  color: '#0078D2',
  tagline: 'The new-hire pipeline, CQ recurrence, and qualification gating.',
  estimatedMinutes: 16,
  terms: ['cq-training', 'tbs', 'seniority-occupational', 'longevity-seniority'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-school',
      title: 'TRAINING',
      text: 'Before someone can work a flight, they must be trained and legally qualified. Training is where a person becomes a flight attendant — and where the system learns the two different clocks that will govern them for their whole career.',
    },
    {
      kind: 'prose',
      title: 'Two clocks, one person',
      icon: 'mdi-clock-time-four-outline',
      body: `Training is where the domain’s subtle two-seniority model begins:

- **Occupational seniority** — for hires after August 2014, this starts on the **first day of initial training**. It governs bidding rights, reserves, furlough/recall, and vacations. This is the ranking that "matters" for most operational decisions.
- **Classification / longevity** — starts at **graduation as a flight attendant**. It drives the pay scale and vacation accrual.

Two people in the same class have equal occupational rank but nearly always different graduation/longevity dates. Mixing the two clocks is the classic training-data bug — it corrupts both seniority lists and pay scales.`,
    },
    {
      kind: 'prose',
      title: 'The annual recurring: CQ',
      icon: 'mdi-certificate-outline',
      body: `Airlines do not train you once and forget you. Every year a flight attendant must complete **Continuous Qualification (CQ)** training — FAA-required recurrent training that keeps them legal. CQ is not just a calendar event; it has real system consequences:

- CQ dates **constrain schedulable days** — PBS builds lines around the training window.
- **Expired CQ = unschedulable, full stop.** An FA whose qualification lapses cannot be assigned, no exceptions.

Qualification gating is a hard-fail in assignment engines, not a soft warning.`,
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-ballot-outline',
      title: 'Training has its own bid process',
      text: 'Training events are bid and awarded too, and the Joint Scheduling Committee jointly reviews the training bid/award process. Treat training like any other consumer of schedule days — with its own validity interval.',
    },
    {
      kind: 'prose',
      title: 'How CQ seats get awarded: TBS',
      icon: 'mdi-school-outline',
      body: `Because CQ seats are limited, they are allocated fairly the same way everything else is — by **seniority**, through the **Training Bidding System (TBS)**. A Flight Attendant submits ranked preferences for class dates, and TBS awards in seniority order, weighed against their training **status**:

- **Early** — training taken ahead of the assigned window.
- **Base** — training within the normally assigned window.
- **Grace** — training after the window (near the deadline, often the most constrained).

The award's report/class date becomes a hard, unschedulable interval CQ dates carve out of the month — so a TBS award and a PBS line must stay mutually consistent.`
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-code-braces',
      title: 'For developers',
      text: 'Model qualifications as intervals with earned-at and expires-at dates, and store them in a shared registry. Assignment engines read that registry as a hard gate. Keep the two seniority start dates as separate fields everywhere — they feed different systems.',
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
    {
      question: 'An FA with expired CQ is:',
      options: ['Schedulable with limits', 'Unschedulable until re-trained', 'Reverted to training payroll', 'Fine until noticed'],
      answerIndex: 1,
      explanation: 'Expired CQ removes flying eligibility entirely — a hard gate.',
    },
    {
      question: 'CQ training seats are awarded via TBS in order of:',
      options: ['Random draw', 'Seniority (status + preferences)', 'Base size', 'Alphabetical'],
      answerIndex: 1,
      explanation: 'Training Bidding System awards in seniority order by early/base/grace status and preference priority.',
    },
  ],
}

/* ==================================================================
 * MODULE 14 — INTERNATIONAL
 * ================================================================== */
const international: AcademyModule = {
  id: 'international',
  number: 14,
  title: 'International Flying',
  icon: 'mdi-earth',
  color: '#003057',
  tagline: 'IPD, Speakers, crew rest, and overwater rules.',
  estimatedMinutes: 18,
  terms: ['ipd', 'layover', 'deadhead'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-earth',
      title: 'INTERNATIONAL FLYING',
      text: 'Crossing borders changes everything: longer duties, extended trips, language-qualified crew, richer hotels and per diem, and dedicated crew rest. International flying is international because the rules get more demanding — not just longer.',
    },
    {
      kind: 'prose',
      title: 'What makes it different',
      icon: 'mdi-earth-arrow-right',
      body: `International operations layer a whole new set of requirements onto the shared sequence model:

- **Longer sequences** — up to **6 duty periods / 6 days** when the trip contains International Premium Destination (**IPD**) flying.
- **Speakers** — a language-qualified position is *required* on certain routes (e.g., a German Speaker on PHL–FRA).
- **Bigger buffers** — international arrivals add **30 minutes** of post-flight duty buffer (vs 15 Domestic).
- **Richer accommodations** — hotels and per diem scale with the destination and length of stay.
- **Dedicated crew-rest rules** — overwater and long-haul flying has its own rest legalities.`,
    },
    {
      kind: 'callout',
      tone: 'warning',
      icon: 'mdi-chart-bubble',
      title: 'Speakers are route-driven, not language-driven',
      text: 'A PHL–FRA flight needs a German Speaker because of the destination. But a charter or a group can require a specific language regardless of route — e.g., a CLT–LGW carrying mostly Spanish-speakers may need a Spanish Speaker even though LGW is not a Spanish route. Route attributes alone are not enough.',
    },
    {
      kind: 'prose',
      title: 'IPD is the special tag',
      icon: 'mdi-star-circle-outline',
      body: `**IPD** (International Premium Destination) marks premium international flying. It is more than a label — it changes the legality envelope:

- Sequences containing IPD duty periods may extend to **six duty periods / six days** (the normal cap is four).
- That extension comes with its own duty-pattern constraints.

From a software view, IPD is a flag that cascades into sequence-length validators and premium-pay rules. Keep it in geo master data, not a hardcoded route list, so new premium destinations update without a code change.`,
    },
    {
      kind: 'prose',
      title: 'Airport attributes do a lot of work',
      icon: 'mdi-airplane-takeoff',
      body: `Much of international logic hangs off attributes attached to airports and routes:

- Is this a **premium destination** (IPD)? *Affects sequence length.*
- Is this **overwater**? *Affects rest and equipment.*
- What **language** does the destination require? *Drives Speaker staffing.*
- **International/documentary** requirements? *Drives crew qualification checks.*

Model these as route/airport master data and join them into validation and staffing, and the rules stay consistent across every consumer.`,
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
    {
      question: 'The international post-flight duty buffer is:',
      options: ['15 min', '30 min', '45 min', '60 min'],
      answerIndex: 1,
      explanation: '30 minutes for International arrivals, vs 15 for Domestic.',
    },
  ],
}

/* ==================================================================
 * MODULE 15 — SENIORITY
 * ================================================================== */
const seniority: AcademyModule = {
  id: 'seniority',
  number: 15,
  title: 'Seniority',
  icon: 'mdi-format-list-numbered',
  color: '#C01933',
  tagline: 'The ranking key behind nearly every award.',
  estimatedMinutes: 16,
  terms: ['seniority-occupational', 'longevity-seniority', 'senior-bump'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-format-list-numbered',
      title: 'SENIORITY',
      text: 'If you want to understand why a flight attendant gets a great line and the next person gets scraps, look at seniority. It is the ranking key behind nearly every award — vacations, bids, transfers, recalls. It is the union-negotiated way to keep scarce goods fair.',
    },
    {
      kind: 'prose',
      title: 'Two seniorities, two jobs',
      icon: 'mdi-compare-horizontal',
      body: `The domain carries two seniority numbers, and it is critical to keep them apart:

- **Occupational seniority** — length of service as a flight attendant (for post-2014 hires, from the first day of initial training). It governs **bidding rights, furlough and recall, vacation preferences, and filling vacancies.** This is the ranking that decides operational outcomes.
- **Classification / longevity** — begins at **graduation** and drives the **pay scale and vacation accrual**.

They move on different clocks. Two people in the same training class have equal occupational rank but almost always different longevity — and different pay.`,
    },
    {
      kind: 'diagram',
      caption: 'The tie-breaking ladder when two FAs share a training date.',
      code: `flowchart TD
    A["Same training date?"] --> B{"Birth date"}
    B -->|"Oldest first"| C["Occupational rank"]
    B -->|"Tied"| D{"Company-department\n transferee?"}
    D -->|"Yes — lead class\nby company hire date"| C
    D -->|"No"| E{"SSN last four"}
    E -->|"Ascending"| C`,
    },
    {
      kind: 'prose',
      title: 'How ties are broken',
      icon: 'mdi-gender-male-female',
      body: `When two flight attendants share the exact same training date, the contract peels the tie in order:

1. **Oldest birth date ranks first.**
2. If still tied, a **company-department transferee** leads their class by their original company hire date.
3. If still tied, **SSN last four digits** — ascending.

It is a deterministic ladder. Build it once as a shared comparator and use it everywhere, or two different systems will sort the same people differently and the protests will be loud.`,
    },
    {
      kind: 'callout',
      tone: 'warning',
      icon: 'mdi-calendar-sync',
      title: 'The list is a frozen snapshot, not a live sort',
      text: 'The System Seniority List reposts **January 1 and July 1**, with 30-day protest windows. PBS and every award engine must sort against a **pinned snapshot version** — not a live list. A live list shipping updates mid-bid is a correctness bug waiting for protest season.',
    },
    {
      kind: 'prose',
      title: 'Where seniority bites hardest',
      icon: 'mdi-format-list-bulleted',
      body: `- **Bidding:** PBS awards in occupational order.
- **Vacations:** round one goes strictly top-down the list.
- **Reserves:** Junior FAs sit on Reserve until seniority lets them hold a line — and a **Senior Bump** lets a senior FA choose a Reserve month, displacing a junior from the reserve list.
- **Transfers:** vacancies fill in seniority order.

Seniority is not a background detail — it is the comparator behind nearly every user-visible outcome.`,
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
}

/* ==================================================================
 * MODULE 16 — SCENARIOS
 * ================================================================== */
const scenarios: AcademyModule = {
  id: 'scenarios',
  number: 16,
  title: 'Business Scenarios Capstone',
  icon: 'mdi-lightbulb-on-outline',
  color: '#0061AB',
  tagline: 'End-to-end journeys that tie every module together.',
  estimatedMinutes: 24,
  terms: ['pbs', 'tts', 'rotd', 'misaward', 'credit-window'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-lightbulb-on-outline',
      title: 'BUSINESS SCENARIOS',
      text: 'Every module so far taught one concept in isolation. This capstone threads them together: you follow one flight attendant, one bid, one storm — and watch a single employee ID ripple through scheduling, reserve ops, and payroll.',
    },
    {
      kind: 'diagram',
      caption: 'One hire, one career arc — notice the system boundaries at each handoff.',
      code: `flowchart TD
    H["Hired: class date"] --> S1["Seniority assigned"]
    S1 --> T["Training / CQ"]
    T --> R["Straight Reserve x2 yrs"]
    R --> L["PBS Reserve line: RAPs + GD/FD"]
    L --> O["Gaps appear"]
    O --> Q["ROTA future awards"]
    O --> W["ROTD day-of + LMCO"]
    W --> P["Credit / Pay ledgers"]`,
    },
    {
      kind: 'prose',
      title: 'Scenario: a bid’s journey to award',
      icon: 'mdi-ballot-outline',
      body: `Follow one trip from idea to paycheck:

1. **Network Planning** publishes the month’s schedule.
2. **Workforce Planning** bundles it into sequences.
3. **PBS** turns sequences + preferences into awarded lines, in seniority order.
4. A **misaward** happens when a sequence cancels during bidding — the award routes to a remedy path, not silence.
5. **TTS/ETB** reshape the result — a drop here, a red-flag pickup there, each checked against the **Credit Window**.
6. **Payroll** sums it all into credit, applies RIGs and premiums, and issues a check.

The through-line: one employee ID, one logical journey across many systems, each with its own SLA and audit trail.`,
    },
    {
      kind: 'prose',
      title: 'Scenario: storm-week reserve coverage',
      icon: 'mdi-weather-lightning',
      body: `This is the scenario that stresses every system at once:

1. A storm rolls in and **cancellations flood open time**.
2. **Open time** becomes the marketplace for re-covering.
3. **ROTD** runs all day — aggressive bids, standbys, and **LMCO** premium windows.
4. Crews removed mid-sequence get **pay protection** where the contract requires.
5. **Payroll** reconciles it all: rigs, premiums, and protection land as the final paycheck.

Notice how each handoff is a **system boundary** with its own ordering rules (which reserve gets called first), its own SLAs, and its own audit needs. Traceability is everything: given a paycheck line, you should be able to walk back to the originating operational event.`,
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-database-sync-outline',
      title: 'The traceability requirement',
      text: 'The real test of whether you understand this domain is the **lineage chain**: payroll line → premium/rig event → ROTD assignment → open-time listing → cancelled sequence. If you can reconstruct that chain, you can debug anything. Use correlation IDs across services to make it possible.',
    },
    {
      kind: 'callout',
      tone: 'success',
      icon: 'mdi-school-outline',
      title: 'You made it',
      text: 'From the words at the airport to the payroll ledger — that is the whole flight-attendant domain. Keep the mental model (match → validate → ledger), keep the clocks straight (HBT), keep pay and credit separate, and you can build confidently. For deeper interactive practice, visit the Scenario Simulator.',
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
    {
      question: 'The real test of domain mastery is being able to…',
      options: [
        'Recite all acronyms',
        'Walk a payroll line back to its originating operational event',
        'Name all eleven bases',
        'Memorize the CBA',
      ],
      answerIndex: 1,
      explanation: 'The lineage chain — payroll → event → assignment → open time → cancellation — is what makes debugging possible.',
    },
  ],
}

export const modulesPart2: AcademyModule[] = [
  etb,
  crewManagement,
  payroll,
  trainingModule,
  international,
  seniority,
  scenarios,
]
