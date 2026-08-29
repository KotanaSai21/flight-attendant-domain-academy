import type { AcademyModule } from '../types'

/* ==================================================================
 * MODULE 4 — SCHEDULING
 * ================================================================== */
const scheduling: AcademyModule = {
  id: 'scheduling',
  number: 4,
  title: 'Scheduling',
  icon: 'mdi-calendar-month',
  color: '#003057',
  tagline: 'How next month’s flying becomes fair, legal, coverage-complete monthly lines.',
  estimatedMinutes: 25,
  terms: ['line-of-time', 'jsc', 'credited-hours', 'carry-over', 'duty-rig'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-calendar-month',
      title: 'SCHEDULING',
      text: 'Every month, an airline must answer one question: how do we turn the flying we promised to sell into a schedule that a human crew can actually work — legally, predictably, and fairly? That is the whole job of Scheduling.',
    },
    {
      kind: 'prose',
      title: 'What a “schedule” really is',
      icon: 'mdi-calendar-blank-outline',
      body: `Most people think an airline schedule is just a list of flights. For a flight attendant it is more personal: the schedule is **their month**. Who they fly with, where they lay over, how much they get paid, which days they are home — it all comes from this one monthly product we call a **Line of Time**.

A Line of Time is a fixed envelope of work: **70 to 90 credited hours** per month (with some contractual flexibility, and “High/Low” options that stretch it to 110 or 40). It is made entirely of **sequences** or trips. A lineholder gets a concrete list of those trips; a reserve gets a set of availability windows instead. Both are “schedules,” but they could not feel more different to the person living one.

The word choice matters here. The contract does not say "roster" — it says **line**. That little word is deeply baked into every system you will build.`,
    },
    {
      kind: 'prose',
      title: 'Why the numbers are locked in',
      icon: 'mdi-lock-clock',
      body: `The 70-to-90 band is not arbitrary. It is a compromise the union negotiated so that:
- **A flight attendant can plan a life** — they know roughly how many days they will be home and roughly what they will earn.
- **The company can guarantee coverage** — it knows exactly how much flying, on average, each lineholder will cover.

Without these bands, the free market of schedules would either starve people (too little work) or break legality limits (too much). The bands are enforced at two places: when a line is first **built**, and constantly as people **trade** trips later. Get the enforcement wrong and you will see pay stubs, grievances, and support tickets explode.`,
    },
    {
      kind: 'callout',
      tone: 'warning',
      icon: 'mdi-account-group-outline',
      title: 'Pilots and FAs do NOT share this schedule',
      text: 'Both groups fly the same sequences, but they live under separate contracts, separate bidding systems, and separate rules. Never blur the two when you read a requirement.',
    },
    {
      kind: 'header',
      icon: 'mdi-calendar-month-outline',
      color: '#003057',
      title: 'The monthly cadence',
      text: 'Scheduling runs on a strict clock each month — everything happens on a deadline measured in Home Base Time.',
    },
    {
      kind: 'diagram',
      caption: 'The monthly rhythm of Scheduling: build, publish, bid, settle.',
      code: `flowchart LR
    A["Prior 1st/3rd/6th\\nAPFA review"] --> B["≤ 8th\\nBid package published"]
    B --> C["Mid-month\\nPBS bidding"]
    C --> D["Post-award\\nTTS opens"]
    D --> E["Month starts\\nlines go live"]`,
    },
    {
      kind: 'prose',
      title: 'What the bid package must contain',
      icon: 'mdi-package-variant-closed',
      body: `Before anyone can bid, the company must publish a **bid package**. The contract (§10.C) is very specific about what it must include — treat this list as a checklist when you build the publishing system:

- The **RAP lists** and **event calendars** for reserves.
- The **line ranges** (min / mid / max) per base.
- **Headcounts** and **minimum reserve counts** per base.
- The **layover hotels** crews will use.
- **Projected standby shifts** — start time, length, and location.

And it must be in PBS by **the 8th of the prior month at 1200 DFW / Home Base Time**. Miss that deadline and the whole month slides. The Joint Scheduling Committee (JSC) co-develops many of these parameters, so they are **governed configuration**, never things an engineer should hardcode.`,
    },
    {
      kind: 'prose',
      title: 'When the schedule breaks',
      icon: 'mdi-alert-circle-outline',
      body: `Two special concepts live in Scheduling that look like bugs but are actually features:

- **Carry-over (change-over) trips** — a replacement sequence that *reports in one month and releases in the next*. It must be placed on the schedule by the **10th of the originating month**, and its credit must be split across the month boundary correctly. Botch this and you corrupt two months of payroll at once.
- **Misawards** — when the system awards something it should not have (including certain award cancellations during the bidding window). These route to a formal remedy process. A misaward is a *type of event to catch and log*, not a silent nothing.`,
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-code-braces',
      title: 'For developers',
      text: 'Model Scheduling as governed, versioned configuration. Treat line ranges, proration tables, and days-off patterns as rules-as-data approved through the JSC — never literals scattered in code. Versioned snapshots of every published package make protests and debugging tractable.',
    },
    {
      kind: 'prose',
      title: 'A typical month, in practice',
      icon: 'mdi-check-decagram',
      body: `- A 31-day month may **donate a day** to a short (28/30-day) month to keep lines stable — a real, contract-defined behavior.
- An **84-hour line with 13 days off** is a typical mid-seniority award.
- When lines are built by seniority, the most junior flight attendants get whatever flying is left — which is why so many of them sit on Reserve.`,
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
      explanation: '§10.C.1 sets the 8th-day deadline at 1200 DFW / Home Base Time.',
    },
    {
      question: 'Carry-over trips must post no later than:',
      options: ['5th of originating month', '10th of originating month', 'End of bid month', 'Release day'],
      answerIndex: 1,
      explanation: 'Change-overs place on schedules by the 10th of the origin month.',
    },
    {
      question: 'JSC-approved scheduling parameters are best treated in software as…',
      options: ['Hardcoded constants', 'Governed, versioned configuration', 'Per-developer preferences', 'Runtime randomness'],
      answerIndex: 1,
      explanation: 'Treat JSC parameters as governed config stored as data — never scattered literals.',
    },
  ],
}

/* ==================================================================
 * MODULE 5 — PAIRINGS & SEQUENCES
 * ================================================================== */
const pairings: AcademyModule = {
  id: 'pairings',
  number: 5,
  title: 'Pairings & Sequences',
  icon: 'mdi-route',
  color: '#C01933',
  tagline: 'How individual flights become the multi-day trips crews actually work.',
  estimatedMinutes: 22,
  terms: ['sequence', 'duty-period', 'odan', 'ipd', 'multiple-sequences', 'layover'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-route',
      title: 'PAIRINGS & SEQUENCES',
      text: 'A single flight is too small to be a job. So we bundle flights into “pairings” or “sequences” — the atomic unit of crew scheduling. Almost everything you will build references a sequence by its number.',
    },
    {
      kind: 'prose',
      title: 'The atom of the whole domain',
      icon: 'mdi-atom',
      body: `A **sequence** (also called a trip or pairing) is a packaged set of duty periods and flights flown end-to-end by one crew. The nesting is simple and worth memorizing because it explains the hierarchy of almost every screen:

\`\`\`
SEQUENCE  (one trip, base to base)
  └── DUTY PERIOD   (report → release, one working "day")
        └── SEGMENT (one actual flight leg)
\`\`\`

A sequence is usually **1–4 duty periods across 1–4 calendar days** — up to **6** when it contains International Premium Destination (IPD) flying. The crew reports at the base, works the duty periods, sleeps (layovers) between them, and finally returns to base.`,
    },
    {
      kind: 'callout',
      tone: 'warning',
      icon: 'mdi-scale-balance',
      title: 'Why the shape matters so much',
      text: 'Sequences are the unit that gets **bid, traded, assigned, and paid**. When someone says “drop my Tuesday trip,” they mean a whole sequence. When payroll computes a month, it sums sequences. Get the sequence model right and half the domain falls into place.',
    },
    {
      kind: 'header',
      icon: 'mdi-cog-outline',
      color: '#C01933',
      title: 'How a sequence is built',
      text: 'Pairings are assembled to balance legality, rest, pay efficiency, and operability.',
    },
    {
      kind: 'diagram',
      caption: 'The pairing-build pipeline: assemble duty periods, add layovers, then check legality and tag attributes.',
      code: `flowchart TD
    A["Flights for the month"] --> B["Duty period assembly\\nreport / buffer / release"]
    B --> C{"Rest between duties?"}
    C -- yes --> D["Layover selection\\nhotel + per diem"]
    C -- no --> E["Re-cut duty period"]
    D --> F["Legality checks\\nHours of Service §11"]
    F --> G["Tag attributes\\nODAN · IPD · red-flag"]`,
    },
    {
      kind: 'prose',
      title: 'From flight to trip, step by step',
      icon: 'mdi-list-status',
      body: `1. **Start with the flights.** Network planning decides which cities and how often. Workforce planning bundles those flights into sequences.
2. **Assemble duty periods.** Each duty period starts at **report time** and ends at **release** (15 minutes after arrival for Domestic, 30 for International — or actual release, whichever is later).
3. **Choose layovers.** A multi-day sequence needs an overnight between duty periods. Where the crew sleeps drives **rest legality, hotels, and per diem**.
4. **Check legality.** Every sequence must obey Hours of Service rules (§11): maximum duty, minimum rest, the 6-in-7 day rule, and the 24-hours-off guarantee.
5. **Tag the attributes.** The sequence gets flags — **ODAN** (a duty period covering the 0100–0500 HBT window), **IPD** (premium international). These tags drive bidding preferences and pay downstream.`,
    },
    {
      kind: 'terms',
      title: 'Sequence vocabulary you will reuse everywhere',
      items: [
        { id: 'sequence', term: 'Sequence', icon: 'mdi-route', definition: 'The packaged trip — the atomic unit of scheduling, trading, and pay.' },
        { id: 'duty-period', term: 'Duty period', icon: 'mdi-timer-outline', definition: 'Report → release: one “working day” inside a sequence, with its own legality limits.' },
        { id: 'layover', term: 'Layover / RON', icon: 'mdi-hotel', definition: 'The overnight between duty periods; drives rest, hotels, and per diem.' },
        { id: 'odan', term: 'ODAN', icon: 'mdi-weather-night', definition: 'On-Duty All-Nighter — a duty period covering the 0100–0500 HBT window. A common “avoid” preference.' },
        { id: 'ipd', term: 'IPD', icon: 'mdi-earth', definition: 'International Premium Destination — lets sequences stretch to 6 days.' },
        { id: 'multiple-sequences', term: 'Multiple sequences', icon: 'mdi-layers-triple-outline', definition: 'Two sequences in one day separated by rest + 45 min; a Double Up is +30 min. Close, but different.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'error',
      icon: 'mdi-ruler',
      title: 'The boundary minutes that bite',
      text: 'Legality is decided at the minute level: **+45 minutes** separates “multiple sequences,” **+30 minutes** makes a “double up,” and post-flight buffers are 15 (Domestic) vs 30 (International). These tiny thresholds are where real bugs hide — put them in constants and test them exhaustively.',
    },
    {
      kind: 'prose',
      title: 'Real trip shapes',
      icon: 'mdi-check-decagram',
      body: `- **One-day turn** — a single duty period with no layover. Report, fly a couple legs, come home the same day.
- **Four-day West Coast pattern** — three layovers, long stretches away from base.
- **Six-day IPD sequence** — hits the extended cap only when premium international flying is involved.
- **A321 + 787 mix** — one sequence can mix aircraft types; the crew keeps their position number through all of them.`,
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-code-tags',
      title: 'For developers',
      text: 'Treat sequence attributes (duty minutes, credit minutes, tags, staffing) as a **derived layer**: compute once at publish, cache it, and invalidate on any schedule change. ODAN detection is a pure interval-overlap check against [0100, 0500] HBT. This is the module with the heaviest unit-test surface — invest there.',
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
    {
      question: 'What separates “multiple sequences” vs a “double up” in the same day?',
      options: ['No difference', '+45 min vs +30 min', '+30 min vs +15 min', 'Seniority'],
      answerIndex: 1,
      explanation: 'Multiple sequences need rest + 45 min; a double up needs only +30 min between release and next report.',
    },
  ],
}

/* ==================================================================
 * MODULE 6 — PBS
 * ================================================================== */
const pbs: AcademyModule = {
  id: 'pbs',
  number: 6,
  title: 'PBS — Preferential Bidding System',
  icon: 'mdi-ballot',
  color: '#0061AB',
  tagline: 'Seniority-ranked preference awarding for lines.',
  estimatedMinutes: 26,
  terms: ['pbs', 'seniority-occupational', 'ppo', 'misaward', 'line-of-time', 'reserve-line'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-ballot',
      title: 'PREFERENTIAL BIDDING SYSTEM',
      text: 'Once all the trips for a month exist, how do we give them out fairly? That is PBS. It takes the bid package, adds every flight attendant’s ranked preferences, and awards lines in seniority order while keeping every flight legally covered.',
    },
    {
      kind: 'prose',
      title: 'The “preferential” part',
      icon: 'mdi-thumb-up-outline',
      body: `The key word is **preferential**, not "greedy." PBS does not try to give everyone their first choice. It tries to give each person the best schedule possible while still covering all the flying and respecting contract limits — and it does this **in seniority order**.

Practically that means: the most senior flight attendant gets their dream line first; the next most senior gets the best *remaining* line; and so on down to the newest hire, who takes what is left (often Reserve). This ordering is the single most important rule in the system.`,
    },
    {
      kind: 'callout',
      tone: 'warning',
      icon: 'mdi-alert-outline',
      title: 'Coverage comes before preference',
      text: 'PBS must satisfy hard constraints first (every flight staffed, all legalities met). Preferences only shape *which* legal line each person gets, within that. A junior FA whose preferences are all impossible is not a bug — it is the normal, expected outcome.',
    },
    {
      kind: 'header',
      icon: 'mdi-ballot-outline',
      color: '#0061AB',
      title: 'The bid cycle',
      text: 'From a published package to an awarded line in a few well-defined steps.',
    },
    {
      kind: 'diagram',
      caption: 'The PBS sequence — each step produces a versioned, auditable result.',
      code: `sequenceDiagram
    participant CP as Crew Planning
    participant PBS as PBS Engine
    participant FA as Flight Attendant
    CP->>PBS: Publish bid package (≤8th, 1200 DFW)
    FA->>PBS: Submit ranked choices
    PBS->>PBS: Process in seniority order
    Note over PBS: Cover constraints first,<br/>then honors preferences
    PBS->>FA: Award line (or misaward path)
    FA->>PBS: Protest / corrections`,
    },
    {
      kind: 'prose',
      title: 'What PBS needs to know about each FA',
      icon: 'mdi-account-details-outline',
      body: `To run a fair bid, PBS needs a snapshot of each person:

- **Seniority** — their rank on the frozen seniority list.
- **Qualifications** — aircraft, doors, languages, international documents.
- **Vacations and training** — blocks of time that cannot be scheduled.
- **Reserve designation** — including Senior Bump elections made before PBS opens (a senior flight attendant choosing a Reserve month, which can bump a junior person off the reserve list).

Every one of these inputs must be **frozen** before the run. If an input changes mid-run, the award is not reproducible — and reproducibility is the whole game.`,
    },
    {
      kind: 'prose',
      title: 'Three lines everyone should understand',
      icon: 'mdi-format-list-numbered',
      body: `- **Lineholder line** — a concrete list of trips (a Line of Time, 70–90 hours).
- **Reserve line** — availability windows (RAPs) plus Golden and Flex days instead of trips.
- **PPO (Pay Purposes Only)** — when an FA is off the entire month (say, on leave), they still bid to establish *what they could have held* — purely so payroll can protect their pay. This is a **phantom award**: it drives money, not operations.`,
    },
    {
      kind: 'callout',
      tone: 'error',
      icon: 'mdi-debug-step-over',
      title: 'Reproducibility is non-negotiable',
      text: 'The same snapshot + the same bids must always produce the same award. Build replay tooling from day one, and treat every protest as a structured diff against the frozen snapshot — not a manual fudge.',
    },
    {
      kind: 'prose',
      title: 'When things go wrong: the misaward',
      icon: 'mdi-alert-decagram',
      body: `A **misaward** is an incorrect award — and yes, that includes certain cancelled-sequence awards inside the bidding window. The contract has a defined remedy path. From a system view, a misaward is a **classified event with an audit trail**, not an error to quietly correct. Log it, route it, and let the remedy process run.`,
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
    {
      question: 'Which must be frozen before a PBS run to keep it reproducible?',
      options: ['Preferences', 'Seniority snapshot, quals, vacations', 'FA phone numbers', 'Hotel names'],
      answerIndex: 1,
      explanation: 'Frozen inputs (seniority, quals, vacations, reserve designations) make the run deterministic.',
    },
  ],
}

/* ==================================================================
 * MODULE 7 — BIDDING
 * ================================================================== */
const bidding: AcademyModule = {
  id: 'bidding',
  number: 7,
  title: 'Bidding',
  icon: 'mdi-gavel',
  color: '#0078D2',
  tagline: 'The operational month kickoff — from package publication to award.',
  estimatedMinutes: 18,
  terms: ['pbs', 'lrd', 'tts', 'ubl', 'standby', 'misaward'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-gavel',
      title: 'BIDDING',
      text: 'Bidding is the scheduled dance that turns a published flight plan into the award that every flight attendant actually lives on. It has fixed deadlines, a defined review cycle, and a clear state machine — and it is the moment an FA’s month is decided.',
    },
    {
      kind: 'prose',
      title: 'The dance, step by step',
      icon: 'mdi-music-note-eighth',
      body: `1. **The company reviews the flying with the union.** The sequence review runs on the **1st, 3rd, and 6th** of the prior month at 1200 DFW — APFA gets a look before anything is final.
2. **The bid package is published** by the **8th** in PBS.
3. **Flight attendants submit** their ranked preferences before PBS closes — and first choose their **LRD** (Lineholder/Reserve Designator), which decides whether the month is built as trips or as availability days.
4. **PBS processes** the awards in seniority order.
5. **TTS / UBL reshape** the results (drops, pickups, trades) before the month begins.

Every deadline matters. Missing the PBS close locks in your old preferences — which is exactly why support tickets spike around close time.`,
    },
    {
      kind: 'prose',
      title: 'One portal, many engines',
      icon: 'mdi-view-dashboard',
      body: `Here is a point that unifies a lot of confusing acronyms: for the Flight Attendant, **almost everything runs through a single Crew Portal**. UBL, TTS, ETB, ROTA, ROTD, red flag — these are not separate logins or disconnected websites; they are *modules behind one door*. PBS and Training (TBS) sit beside them under the same bidding roof.

That single front door matters three ways:
- **For the FA:** one place to check assignments, acknowledge ROTD, build a TTS ballot, or claim an ETB drop.
- **For you as a designer:** the “portal” is a thin shell; the real product is the engine behind each tab. Do not build five portals, build one shell and five services.
- **For correctness:** these engines share data (open time, credit, legality) even though they are distinct — so they must share a locking and validation core, not each re-invent it.`,
    },
    {
      kind: 'diagram',
      caption: 'One Crew Portal — many engines behind it. Notice what each one exists to do and when it runs.',
      code: `flowchart TB
    P["Crew Portal (one door)"] --> M["Monthly bidding"]
    P --> D["Daily bidding"]
    P --> O["Day-of / Reserve"]
    P --> T["Training"]
    M --> PBS["PBS + LRD"]
    D --> TTS["TTS / UBL (batched)"]
    D --> ETB["ETB (real-time)"]
    O --> ROTA["ROTA (future)"]
    O --> ROTD["ROTD (today)"]
    T --> TBS["TBS (CQ seats)"]`,
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-earth',
      title: 'Hear it from the source',
      text: 'Walk the real portal from the union’s side: the daily-bidding hub at apfa.org/bidding/daily-bidding groups Reserve, TTS, UBL, ETB, and Red Flag under one banner — exactly the “one door, many engines” idea above.',
    },
    {
      kind: 'diagram',
      caption: 'A bid window is a state machine — draft, submitted, locked, processed, awarded, protested.',
      code: `stateDiagram-v2
    [*] --> Draft
    Draft --> Submitted
    Submitted --> Locked: PBS close
    Locked --> Processed: run
    Processed --> Awarded
    Processed --> Missward_Queue: invalid award
    Awarded --> Protested: objection
    Protested --> [*]`,
    },
    {
      kind: 'prose',
      title: 'The hard parts the contract flags',
      icon: 'mdi-alert-circle-outline',
      body: `The implementation LOA calls out a list of **complex features** that arrive in staged phases, not all at once. They matter because each one is a distinct validation path:

- **Multi-add conditional drops** — drop one trip only if you can add another.
- **Day-improvement exceptions** — trades that make a day better even beyond daily limits.
- **Reserve day-off transactions** — reserves reshaping days off in TTS.
- **Out-of-base UBL** and **LMCO-related UBL** — unsuccessful-bidder logic in special cases.
- **Same-origin trip improvement** — trading for a better trip from the same city.`,
    },
    {
      kind: 'prose',
      title: 'If you build one thing well, build the deadline engine',
      icon: 'mdi-clock-check-outline',
      body: `Every window in Bidding is a **deadline**: when it opens, when it closes, when locks happen, when results post. Put all of that in **one** deadline service, not scattered checks. Emit a timeline event for every transition so the whole month is auditable end to end.`,
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
    {
      question: 'A bid window that has locked can be described as:',
      options: ['Editable', 'Frozen before processing', 'Already paid', 'Protested'],
      answerIndex: 1,
      explanation: 'Once locked (PBS close), preferences cannot change; the run then happens against the frozen inputs.',
    },
    {
      question: 'LRD on a PBS bid decides:',
      options: [
        'Your pay scale',
        'Whether you are built as a Lineholder or Reserve',
        'Your base',
        'Your next vacation date',
      ],
      answerIndex: 1,
      explanation: 'Lineholder/Reserve Designator routes the whole month into trips vs availability-day machinery.',
    },
  ],
}

/* ==================================================================
 * MODULE 8 — RESERVE
 * ================================================================== */
const reserve: AcademyModule = {
  id: 'reserve',
  number: 8,
  title: 'Reserve',
  icon: 'mdi-phone-incoming',
  color: '#C01933',
  tagline: 'The flexibility workforce — RAPs, call-outs, Golden/Flex days, and standby.',
  estimatedMinutes: 30,
  terms: ['rap', 'modified-rap', 'extended-rap', 'golden-day', 'flex-day', 'rota', 'rotd', 'lmco', 'standby', 'reserve-line', 'senior-bump', 'tafb'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-phone-incoming',
      title: 'RESERVE',
      text: 'Airlines are not a machine that runs perfectly every day. Storms, sick calls, mechanical issues, and misconnects are daily facts. Reserves are the flexible workforce that turns that uncertainty into coverage — people who hold availability instead of a fixed list of trips.',
    },
    {
      kind: 'prose',
      title: 'A different kind of schedule',
      icon: 'mdi-account-clock-outline',
      body: `A lineholder answers “what trips am I flying this month?” A reserve answers “when am I available, and how will work reach me?”

That availability is made of **RAPs** (Reserve Availability Periods) — defined windows during which a reserve must be reachable and ready — plus two kinds of days off:

- **Flex Days** — off, but the company *can* schedule you into them (elastic).
- **Golden Days** — off, and usually *cannot* be moved without your mutual consent. These are your guaranteed personal time.

Reserves fly whatever is left over after lineholders are scheduled: the cancelled trip, the sick call, the misconnect. They receive it through future processing (**ROTA**) or day-of processing (**ROTD**).`,
    },
    {
      kind: 'prose',
      title: 'RAPs come in four named shifts: A, B, C, D',
      icon: 'mdi-alpha-a-box-outline',
      body: `Instead of one generic availability window, reserves hold one of **four named shifts** that map roughly to morning, mid-day, evening, and night:

| Shift | Character | Typical behavior |
|---|---|---|
| **A** | Early morning | Can start as early as **0000 HBT** |
| **B** | Mid-day | e.g. 0600–1600 |
| **C** | Evening | mid-to-late day coverage |
| **D** | Night | Scheduled **1400–0200 HBT regardless of base**; may end early once all departures are airborne with no known diversions (release with no cut to the guarantee) |

Start times are **Company-determined and published each month** in the PBS cover sheet — and once published, management cannot move them until the next month. That predictability is contractual.`,
    },
    {
      kind: 'callout',
      tone: 'warning',
      icon: 'mdi-phone-alert',
      title: 'The call-out rules every reserve lives by',
      text: 'Inside your RAP you must be ready. When Crew Scheduling contacts you (or you acknowledge in Crew Portal), you have **2 hours to report** — **3 hours in co-terminal bases**. If they call and leave a voicemail, you have **15 minutes** to call back or acknowledge. A RAP beginning before **0500 HBT** must be **phoned** to you (you are not required to check the portal first) unless you acknowledge online. Understanding this "who has to answer, and when" is the single biggest correctness trap in reserve call-out tooling.',
    },
    {
      kind: 'header',
      icon: 'mdi-clock-end',
      color: '#C01933',
      title: 'How a RAP actually works',
      text: 'The minute-by-minute mechanics that make or break a reserve’s day.',
    },
    {
      kind: 'steps',
      title: 'A RAP, step by step',
      items: [
        { icon: 'mdi-newspaper-variant-outline', title: 'Published, not movable', detail: 'Each month’s RAP A/B/C/D start times post in the PBS cover sheet. Once published, they stay until next month — building confidence around a fixed day.' },
        { icon: 'mdi-layers-outline', title: 'Coverage fills in shift order', detail: 'Crew Scheduling fills open time per RAP — processing A, then B, then C, then D — to hit each base’s allocation count. This sequential fill is the “RAP Snake.”' },
        { icon: 'mdi-phone-incoming', title: 'Call-out', detail: 'Inside your RAP you must be reachable. Once contacted (or you acknowledge online), the report clock starts: 2 hours, or 3 in co-terminal bases.' },
        { icon: 'mdi-sleep', title: 'Rest & separation', detail: 'Generally ~11 hours rest separates consecutive RAPs. ROTD waivers can shrink it (e.g. a RAP B at 0600 after a RAP D ended at 0300 needs a waiver). Rest after release must clear before the next RAP.' },
        { icon: 'mdi-logout-variant', title: 'Release', detail: 'Unassigned when your RAP ends? You are released. A RAP before a day off ends no later than 2359. RAP D can end early once all departures are airborne with no diversions.' },
      ],
    },
    {
      kind: 'prose',
      title: 'The two engines: ROTA and ROTD',
      icon: 'mdi-engine-outline',
      body: `- **ROTA** (future) handles *known* gaps days or weeks ahead — a reserve bidding to cover a known Thanksgiving spike. Awards happen in seniority order among bidders, and elections (like volunteering to work into a Golden Day) lock in here.
- **ROTD** (daily) handles *today* — the sick call that just happened. It awards aggressive bids, assigns sequences and standbys, and mixes in **LMCO** (Less Than Minimum Call-Out), where the report window is shorter than normal and a pay premium applies.

A special situation: a ROTD assignment for a RAP beginning before **0500** must be phoned, not just posted — because the reserve is not contractually obligated to be watching the portal that early.`,
    },
    {
      kind: 'terms',
      title: 'Reserve concepts to keep straight',
      items: [
        { id: 'modified-rap', term: 'Modified RAP', icon: 'mdi-arrow-collapse-left', definition: 'Same end time, shifted start — e.g. after a late release, RAP start moves to when you are legal.' },
        { id: 'extended-rap', term: 'Extended RAP', icon: 'mdi-arrow-expand-left', definition: 'The reserve requests to stretch the end (voluntary, never automatic).' },
        { id: 'lmco', term: 'LMCO', icon: 'mdi-timer-alert-outline', definition: 'Less Than Minimum Call-Out — a premium-paying short report window.' },
        { id: 'standby', term: 'Standby', icon: 'mdi-account-clock', definition: 'Airport-based availability; can extend to 6 or 8 hours with approval.' },
        { id: 'senior-bump', term: 'Senior Bump', icon: 'mdi-arrow-up-bold-box-outline', definition: 'A senior FA choosing Reserve, bumping a junior off the reserve list.' },
        { id: 'reserve-line', term: 'Reserve line', icon: 'mdi-calendar-blank-multiple', definition: 'A PBS award of RSV days + RAPs + Golden/Flex days, not trips.' },
      ],
    },
    {
      kind: 'prose',
      title: 'The reserve career arc',
      icon: 'mdi-format-list-numbered',
      body: `Reserve is not a permanent life sentence — it follows a defined rotation for new hires:

- Post-ratification hires serve **straight Reserve for 2 years**, then **1-on/1-off for 3 years**, then **1-on/3-off** as needed.
- Pre-ratification: straight for one year, then 1/1 ×3, then 1/3.
- If extra Reserve months are needed beyond the rotation, they are selected in **reverse seniority order** — the most junior get picked first.

A month on **VLOA** (voluntary leave) earns **no rotation credit** — track that, or your rotation math will drift.`,
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-code-braces',
      title: 'For developers',
      text: 'Model the RAP as an interval with a shift attribute (A/B/C/D) plus mutation events (Modified/Extended). The consent + deadline logic is the hard 20%: encode the call-out window (2h/3h), the 15-min return-call rule, the 11h separation (waivable), and the before-0500-must-be-phoned rule as explicit constants. Every Golden-Day waiver needs an immutable election record.',
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
      question: 'After Crew Scheduling contacts you, the standard report window is:',
      options: ['30 minutes', '1 hour', '2 hours (3 in co-terminal bases)', 'Immediately'],
      answerIndex: 2,
      explanation: '2 hours to report, 3 in co-terminal bases; 15 minutes to return a voicemail or acknowledge.',
    },
    {
      question: 'RAP D (the night shift) is scheduled and may behave as:',
      options: [
        '1400–0200 HBT everywhere; ends early once departures are airborne and no diversions',
        '0700–1500 HBT in all bases',
        'A voluntary overtime window',
        'Fixed at 0000–0800',
      ],
      answerIndex: 0,
      explanation: 'RAP D is 1400–0200 HBT regardless of base and may end early with no cut to the guarantee.',
    },
  ],
}

/* ==================================================================
 * MODULE 9 — TTS
 * ================================================================== */
const tts: AcademyModule = {
  id: 'tts',
  number: 9,
  title: 'TTS — Trip Trade System',
  icon: 'mdi-swap-horizontal',
  color: '#003057',
  tagline: 'Drops, pickups, and trades after the award — including UBL and daily runs.',
  estimatedMinutes: 24,
  terms: ['tts', 'ubl', 'etb', 'credit-window', 'open-time', 'red-flagging'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-swap-horizontal',
      title: 'TRIP TRADE SYSTEM',
      text: 'The award decides your month — but life happens after the award. TTS lets flight attendants drop trips they cannot work and pick up ones they would rather fly, while the company keeps every trip covered and legal. It is schedule surgery with guardrails.',
    },
    {
      kind: 'prose',
      title: 'Why TTS exists',
      icon: 'mdi-calendar-refresh-outline',
      body: `The PBS award is the best possible *prediction* of the month — but between the award and the actual flying, life intervenes. A family event, a better opportunity, a trip that no longer works. TTS is the controlled way to **reallocate work** afterward.
 
Three verbs cover most of it:
- **Drop** — release a trip back into the pool (open time).
- **Pick up** — take a trip from the pool.
- **Trade** — swap trips (yours for someone else’s, sometimes multi-way).`,
    },
    {
      kind: 'compare',
      title: 'TTS vs ETB at a glance — same verbs, different cadence',
      items: [
        {
          title: 'TTS — Trips Trade System',
          icon: 'mdi-swap-horizontal-bold',
          color: '#003057',
          points: [
            'Runs on a **schedule**: ballots open on dates and process in **batch runs** (often daily).',
            'Handles **drop / pick up / trade / multi-drop ballots** built before a run.',
            'Denied requests can be **passed to UBL** for retries on later daily runs.',
            'Best for planning ahead — reshaping your month days before the flying.',
            'Drives the **Credit Window** math per request.',
          ],
        },
        {
          title: 'ETB — Electronic Trade Board',
          icon: 'mdi-view-dashboard-variant',
          color: '#0078D2',
          points: [
            '**Real-time**: first come, first served, commit happens the instant a claim is accepted.',
            'Single **drop / pick up / trade**, resolved immediately, no waiting for a batch.',
            'No UBL pass-through — the claim either wins now or it does not.',
            'Best for acting the moment an opportunity appears (last-minute).',
            'Also validated against the **Credit Window**, but paid/credited instantly, red flags 150%/100%.',
          ],
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-compare-horizontal',
      title: 'The one-line distinction',
      text: 'Same three verbs (drop, pick up, trade), same open-time pool, same Credit Window guardrail. TTS is the **scheduled, batched, planning** channel; ETB is the **instant, self-service live** channel. ETB transistors pause while TTS (and PBS) batch runs — that is the only time it is not real-time.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      icon: 'mdi-speedometer',
      title: 'The Credit Window guardrail',
      text: 'You cannot just stack unlimited flying. Every trade is checked against the **Credit Window** = the TTS Maximum minus your awarded line value. It is the guardrail of schedule self-service — drop too much or pick up too much and the system says no. Model it as an invariant recomputed on every move.',
    },
    {
      kind: 'header',
      icon: 'mdi-swap-horizontal-bold',
      color: '#003057',
      title: 'How a trade flows',
      text: 'From request to award, with legality checks at every gate.',
    },
    {
      kind: 'diagram',
      caption: 'The TTS state machine — including the unsuccessful-bidder path into UBL.',
      code: `stateDiagram-v2
    [*] --> Submitted
    Submitted --> Validated: legality + window check
    Validated --> Awarded
    Validated --> Denied
    Denied --> UBL: elected pass-to-UBL
    UBL --> Awarded: later daily run matches
    Awarded --> [*]`,
    },
    {
      kind: 'prose',
      title: 'The UBL second chance',
      icon: 'mdi-football-play',
      body: `Some requests get denied at first because the exact match does not exist yet. That is where the **UBL** — the Unsuccessful Bidder’s List — comes in. A flight attendant can elect to “pass to UBL”: if a matching open-time opportunity appears in a later daily run, the system can still make the award.

UBL is not a storage bin for everything; it is a deliberate opt-in preference. And its participation rate directly changes how much open time flows to lineholders versus reserves each day.`,
    },
    {
      kind: 'prose',
      title: 'The complex cases the contract flags',
      icon: 'mdi-alert-decagram',
      body: `The implementation LOA lists the genuinely hard features, delivered in stages. Each is its own validation path, not a single code path:

- **Multi-add conditional drops** — drop A only if you win B.
- **Day-improvement exceptions** — trades that make a day better even beyond daily limits.
- **Reserve day-off electronic transactions**.
- **Out-of-base UBL** and **less-than-minimum-call-out UBL**.
- **Same-origin trip improvement**.

Plan for these as distinct rules, and you will not paint yourself into a corner.`,
    },
    {
      kind: 'callout',
      tone: 'error',
      icon: 'mdi-sync-alert',
      title: 'Concurrency is the classic incident',
      text: 'TTS batch runs and the real-time ETB board race over the same open-time items. Two “first” claims on one trip, or a batch writing over a live trade. Use idempotent retries and optimistic locking, and publish a run manifest for every batch so you can prove what happened.',
    },
  ],
  quiz: [
    {
      question: 'The Credit Window equals:',
      options: ['Monthly max − guarantee', 'TTS Maximum − PBS awarded value', 'Credited − paid hours', 'Pickups − drops count'],
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
}

export const modulesPart1: AcademyModule[] = [scheduling, pairings, pbs, bidding, reserve, tts]
