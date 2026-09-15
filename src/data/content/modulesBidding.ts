import type { AcademyModule } from '../types'
import {
  aggressiveReserveSteps,
  biddingSources,
  dailySchedule,
  payConsequenceTerms,
  redFlagSteps,
  reserveDays,
  standbyDetailRows,
  tbsLrdSteps,
} from './biddingGuidance'

/* ==================================================================
 * MODULE 4 — YOUR BIDDING MONTH (the big picture)
 * ================================================================== */
const bidMonthOverview: AcademyModule = {
  id: 'bid-month-overview',
  number: 4,
  title: 'Your Bidding Month',
  icon: 'mdi-map-marker-path',
  color: '#003057',
  tagline: 'The whole monthly scheduling journey on one animated roadmap — no prior knowledge needed.',
  estimatedMinutes: 14,
  terms: ['pbs', 'lineholder', 'reserve-line', 'sequence', 'open-time', 'hbt'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-map-marker-path',
      title: 'YOUR BIDDING MONTH',
      text: 'Flight Attendants do not get handed a schedule. They build one, then keep reshaping it, and whatever is left over gets covered by Reserves. This module is the map of that journey — everything that follows is a close-up of one stop on it.',
    },
    {
      kind: 'prose',
      title: 'Start here: nobody assigns you a month',
      icon: 'mdi-help-circle-outline',
      body: `If you have never seen airline scheduling before, here is the one idea everything else hangs from:

**A Flight Attendant’s month is bid for, not handed out.** You say what you want, a system decides who gets it — usually by **seniority**, sometimes by who clicked first — and the result is your calendar.

Because of that, a Flight Attendant is always living in **two months at once**:

- The **bid month** — next month, the one being built right now through bidding.
- The **live month** — this month, the one actually being flown, traded, and covered today.

Both are happening on the same day, in different systems. Once that clicks, the nine systems in this path stop looking like an alphabet soup and start looking like a sequence.`,
    },
    {
      kind: 'header',
      icon: 'mdi-calendar-month-outline',
      color: '#0061AB',
      title: 'What a month actually looks like',
      text: 'Before any of the systems make sense, it helps to see the thing they are all arguing over: the calendar itself. These are the same month lived two different ways.',
    },
    {
      kind: 'calendar',
      title: 'A Lineholder’s month',
      text: 'Marked days are working days. Everything blank is a day off. Notice there is no weekly pattern — a line is a set of trips, not a Monday-to-Friday rhythm.',
      startWeekday: 3,
      legend: [
        { label: 'Multi-day sequence', color: '#0061AB' },
        { label: 'Turn (home same day)', color: '#00857D' },
        { label: 'CQ training', color: '#5A2D82' },
        { label: 'Blank = day off', color: '#e3eaf1' },
      ],
      days: [
        { day: 2, label: 'Trip 1', color: '#0061AB', icon: 'mdi-airplane', detail: 'Day 1 of a three-day sequence. Report at base, two legs, overnight down route.' },
        { day: 3, label: 'Trip 1', color: '#0061AB', detail: 'Day 2 of the same sequence — still away from base, still on the same trip.' },
        { day: 4, label: 'Trip 1', color: '#0061AB', detail: 'Day 3: the sequence releases back at base. Only now does the trip end.' },
        { day: 8, label: 'Trip 2', color: '#0061AB', detail: 'A second three-day sequence begins.' },
        { day: 9, label: 'Trip 2', color: '#0061AB' },
        { day: 10, label: 'Trip 2', color: '#0061AB' },
        { day: 13, label: 'Turn', color: '#00857D', icon: 'mdi-swap-horizontal', detail: 'A single duty period out and back — home the same night, no layover.' },
        { day: 16, label: 'Trip 3', color: '#0061AB', detail: 'A four-day sequence, the longest of the month.' },
        { day: 17, label: 'Trip 3', color: '#0061AB' },
        { day: 18, label: 'Trip 3', color: '#0061AB' },
        { day: 19, label: 'Trip 3', color: '#0061AB' },
        { day: 22, label: 'CQ', color: '#5A2D82', icon: 'mdi-school-outline', detail: 'Continuing Qualification training, placed by TBS back in the bid month. PBS had to build this line around it.' },
        { day: 26, label: 'Trip 4', color: '#0061AB' },
        { day: 27, label: 'Trip 4', color: '#0061AB' },
        { day: 28, label: 'Trip 4', color: '#0061AB' },
      ],
      caption: 'Roughly 80 credit hours across four sequences, one turn, and a training day.',
    },
    {
      kind: 'table',
      title: 'Lineholder schedule structure & contractual rules',
      columns: ['Contract Standard', 'Rule Requirement', 'CBA Authority', 'Operational Meaning'],
      rows: [
        [
          'Minimum Days Off',
          '11 days free of duty per 30-day month (prorated if available < full month)',
          'CBA §11.H.1',
          'Guaranteed scheduled days completely free of airline duty at crew base.',
        ],
        [
          'Monthly Flying Range',
          '70–90 credit hours (min/mid/max projections per base)',
          'CBA §10.D.1',
          'PBS constructs and awards full sequence lines within base credit thresholds.',
        ],
        [
          'Home Base Rest',
          '11 hours minimum legal rest between sequences (12 hours if block exceeds threshold)',
          'CBA §11.F & §11.G',
          'Protects legal rest before commencing the next sequence after releasing at base.',
        ],
        [
          'FAR 121 Rest / 24-in-7',
          '24 consecutive hours relief in any 7-day period (or 30 hours under 117 standards)',
          'FAR §121.467 / CBA §11.H',
          'Mandatory regulatory break preventing continuous multi-day duty without rest.',
        ],
        [
          'Trading & Schedule Control',
          'ETB (real-time peer swaps/drops) & TTS (daily seniority trading)',
          'CBA §10.E & §10.F',
          'Enables lineholders to reshape schedules, drop trips to zero, or pick up open time.',
        ],
      ],
      termIds: ['lineholder', 'credit-window', 'layover', 'line-of-time', 'etb'],
    },
    {
      kind: 'calendar',
      title: 'A Reserve’s month',
      text: 'No trips at all — just availability. A Reserve knows which days they are on call, but not what they will fly until ROTA or ROTD tells them.',
      startWeekday: 3,
      legend: [
        { label: 'Reserve day (RAP)', color: '#C01933' },
        { label: 'Golden Day', color: '#B7860B' },
        { label: 'Flex Day', color: '#B75C09' },
      ],
      days: [
        { day: 1, label: 'RAP', color: '#C01933', icon: 'mdi-phone-in-talk-outline', detail: 'A Reserve Availability Period: a 12-hour window when you must be reachable and able to report. You may fly, or you may not.' },
        { day: 2, label: 'RAP', color: '#C01933' },
        { day: 3, label: 'RAP', color: '#C01933' },
        { day: 4, label: 'RAP', color: '#C01933' },
        { day: 5, label: 'Golden', color: '#B7860B', icon: 'mdi-shield-star-outline', detail: 'A Golden Day cannot be moved without your consent. You can volunteer to work into it, but nobody can take it from you.' },
        { day: 6, label: 'Golden', color: '#B7860B' },
        { day: 7, label: 'RAP', color: '#C01933' },
        { day: 8, label: 'RAP', color: '#C01933' },
        { day: 9, label: 'Flex', color: '#B75C09', icon: 'mdi-swap-vertical', detail: 'A Flex Day is a day off the Company may assign flying into under the Reserve Duty rules — no consent required. That is the whole difference from a Golden Day.' },
        { day: 10, label: 'RAP', color: '#C01933' },
        { day: 11, label: 'RAP', color: '#C01933' },
        { day: 12, label: 'Golden', color: '#B7860B' },
        { day: 13, label: 'Golden', color: '#B7860B' },
        { day: 14, label: 'RAP', color: '#C01933' },
        { day: 15, label: 'RAP', color: '#C01933' },
        { day: 16, label: 'Flex', color: '#B75C09' },
        { day: 17, label: 'RAP', color: '#C01933' },
        { day: 18, label: 'RAP', color: '#C01933' },
        { day: 19, label: 'Golden', color: '#B7860B' },
        { day: 20, label: 'Golden', color: '#B7860B' },
        { day: 21, label: 'RAP', color: '#C01933' },
        { day: 22, label: 'RAP', color: '#C01933' },
        { day: 23, label: 'Flex', color: '#B75C09' },
        { day: 24, label: 'RAP', color: '#C01933' },
        { day: 25, label: 'RAP', color: '#C01933' },
        { day: 26, label: 'Golden', color: '#B7860B' },
        { day: 27, label: 'Golden', color: '#B7860B' },
        { day: 28, label: 'RAP', color: '#C01933' },
        { day: 29, label: 'RAP', color: '#C01933' },
        { day: 30, label: 'Flex', color: '#B75C09' },
      ],
      caption: '18 Reserve days, 8 Golden Days, and 4 Flex Days — the standard shape of a full Reserve month.',
    },
    {
      kind: 'table',
      title: 'Reserve month breakdown & contractual rules',
      columns: ['Day Type / Rule', 'Days / Requirement', 'CBA Authority', 'Contractual Meaning'],
      rows: [
        [
          'RAP (Reserve Availability Period)',
          '18 days per 30-day month',
          'CBA §12.A & §12.G',
          '12-hour on-call availability windows (A–D) for ROTA/ROTD trip or standby assignment.',
        ],
        [
          'Golden Days (GD)',
          '8 days per month',
          'CBA §10.D.16.b & §12.B.2',
          'Inviolable days off. Cannot be moved or assigned into without Flight Attendant consent.',
        ],
        [
          'Flex Days (FD)',
          '4 days per month',
          'CBA §10.D.16.b & §12.B.3',
          'Flexible days off. Company may assign flying into Flex Days under reserve rules without consent.',
        ],
        [
          'Total Monthly Allocation',
          '30 days (18 RAP + 8 GD + 4 FD)',
          'CBA §10.D.16.b',
          'Every single day in the bid month is pre-allocated as duty availability or days off.',
        ],
        [
          'Minimum Days Off',
          '12 scheduled days off (8 GD + 4 FD)',
          'CBA §10.D.16.b',
          'Reserve lines guarantee at least 12 scheduled days free of duty per full bid month.',
        ],
        [
          'Reserve Duty Blocks',
          '3 to 6 consecutive days',
          'CBA §10.D.16.b.iv',
          'RAP periods cannot be scheduled in blocks of fewer than 3 or more than 6 consecutive days.',
        ],
        [
          'Days Off Blocks',
          '2 to 8 consecutive days off',
          'CBA §10.D.16.b.i',
          'Each scheduled block of days off must contain at least 2 and at most 8 consecutive days.',
        ],
        [
          'Placement Order',
          'Flex Days precede Golden Days',
          'CBA §10.D.16.b.iii',
          'When Flex Days are grouped with Golden Days, the Flex Days must come first.',
        ],
      ],
      termIds: ['rap', 'golden-day', 'flex-day', 'reserve-line', 'reserve-line', 'rap', 'golden-day', 'flex-day'],
    },
    {
      kind: 'compare',
      title: 'Two months, running side by side',
      items: [
        {
          title: 'The bid month (next month)',
          icon: 'mdi-calendar-edit-outline',
          color: '#0061AB',
          points: [
            'Days 1–7: you place training (TBS) and choose your status (LRD)',
            'Days 10–18: you bid your schedule in PBS and receive an award',
            'From ~Day 20: trading opens for the month you just bid',
            'Nothing here has been flown yet — it is all planning',
          ],
        },
        {
          title: 'The live month (right now)',
          icon: 'mdi-airplane-clock',
          color: '#C01933',
          points: [
            'Every night: TTS processes trades and drops by seniority',
            'All day: ETB lets Flight Attendants swap trips directly',
            'Each afternoon at 1500: ROTA sets tomorrow for Reserves',
            'Continuously: ROTD covers whatever breaks today',
          ],
        },
      ],
    },
    {
      kind: 'header',
      icon: 'mdi-map-marker-path',
      color: '#003057',
      title: 'The roadmap',
      text: 'Press play and let the month run, or click any stop to jump straight to it. Each stop answers the same four questions: when it opens, who can use it, why it exists, and what it changes.',
    },
    {
      kind: 'roadmap',
      caption: 'The nine stops of a Flight Attendant month, in the order you meet them.',
    },
    {
      kind: 'prose',
      title: 'Three phases, nine systems',
      icon: 'mdi-numeric-3-box-outline',
      body: `Group the nine stops and the month gets much simpler:

1. **Build the month** — *TBS → LRD → PBS.* Before the month starts, you place training, declare whether you want a line or Reserve, and bid your schedule.
2. **Reshape the month** — *TTS → ETB → UBL.* After the award publishes, you spend the month adjusting it: trade overnight by seniority, swap in real time on the board, or stay in line for near-term flying you did not win.
3. **Cover the month** — *ROTA Future → ROTD → ROTA Aggressive.* Whatever is still uncovered becomes the Reserves’ job: tomorrow’s gaps at 1500, today’s gaps as they happen, and the hardest ones through voluntary waivers.

Everything the operation does, all month, is one of those three things.`,
    },
    {
      kind: 'diagram',
      caption: 'How a single trip moves through the month.',
      code: `flowchart LR
  A["Trip is built<br/>into the bid package"] --> B["PBS awards it<br/>to a Lineholder"]
  B --> C{"Do they<br/>still want it?"}
  C -- "Yes" --> Z["They fly it"]
  C -- "No, trade it" --> D["TTS overnight<br/>or ETB in real time"]
  D -- "Someone takes it" --> Z
  D -- "Nobody takes it" --> E["It becomes<br/>Open Time"]
  E --> F["UBL<br/>next 2 days"]
  F -- "Still open" --> G["ROTA<br/>tomorrow, 1500"]
  G -- "Still open" --> H["ROTD<br/>today, as it happens"]
  H -- "Still open" --> I["Aggressive Reserve<br/>waivers and LMCO"]
  F --> Z
  G --> Z
  H --> Z
  I --> Z`,
    },
    {
      kind: 'callout',
      tone: 'primary',
      icon: 'mdi-lightbulb-on-outline',
      title: 'The one-sentence version',
      text: 'A trip starts in the bid package, is awarded by PBS, gets traded in TTS or ETB, and if nobody wants it, falls through UBL to ROTA, then ROTD, and finally to a Reserve who volunteered for it.',
    },
    {
      kind: 'terms',
      title: 'Six words you need before the next module',
      items: [
        { id: 'sequence', term: 'Sequence', icon: 'mdi-airplane-takeoff', definition: 'One trip: the whole package of flights, layovers, and duty days from report at base to release back at base.' },
        { id: 'lineholder', term: 'Lineholder', icon: 'mdi-calendar-check', definition: 'A Flight Attendant with a fixed monthly line of awarded trips and days off. You know your month in advance.' },
        { id: 'reserve-line', term: 'Reserve', icon: 'mdi-phone-incoming', definition: 'A Flight Attendant who is on call for the airline instead of holding fixed trips. Paid to be available.' },
        { id: 'open-time', term: 'Open Time', icon: 'mdi-clipboard-text-clock-outline', definition: 'Flying that currently has nobody assigned to it — dropped, uncovered, or newly created. Everything after PBS is about closing it.' },
        { id: 'seniority-occupational', term: 'Seniority', icon: 'mdi-format-list-numbered', definition: 'Your rank on the Flight Attendant list. It settles nearly every competition for a trip, a day off, or a training date.' },
        { id: 'hbt', term: 'HBT', icon: 'mdi-clock-outline', definition: 'Home Base Time. Every deadline in this path is in the clock of your own crew base, not yours and not UTC.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'success',
      icon: 'mdi-signs-post',
      title: 'Where to go next',
      text: 'The next four modules walk the roadmap one phase at a time: build the month, reshape it, chase the next two days, and cover what is left. You can always come back here for the map.',
    },
    biddingSources,
  ],
  quiz: [
    {
      question: 'What are the “two months” a Flight Attendant lives in at the same time?',
      options: [
        'Summer and winter schedules',
        'The bid month being planned and the live month being flown',
        'The training month and the vacation month',
        'The domestic month and the international month',
      ],
      answerIndex: 1,
      explanation: 'While you fly this month, you are simultaneously bidding and trading next month. Every system belongs to one of those two timelines.',
    },
    {
      question: 'Put the three phases of the month in order.',
      options: [
        'Cover → Build → Reshape',
        'Build → Reshape → Cover',
        'Reshape → Cover → Build',
        'Build → Cover → Reshape',
      ],
      answerIndex: 1,
      explanation: 'You build the month (TBS, LRD, PBS), reshape it (TTS, ETB, UBL), then whatever is left is covered by Reserves (ROTA, ROTD, Aggressive).',
    },
    {
      question: 'A trip nobody picks up in TTS or ETB becomes…',
      options: ['Cancelled', 'Open Time', 'A deadhead', 'A training event'],
      answerIndex: 1,
      explanation: 'Uncovered flying is Open Time, and the rest of the month’s systems exist to close it.',
    },
    {
      question: 'Deadlines such as “1500” or “2300” in this domain are expressed in…',
      options: ['UTC', 'Your local time', 'Home Base Time (HBT)', 'DFW time only'],
      answerIndex: 2,
      explanation: 'Home Base Time is the clock of your crew base. A commuter sitting in another time zone still works to HBT deadlines.',
    },
  ],
}

/* ==================================================================
 * MODULE 5 — BUILD THE MONTH (TBS, LRD, PBS)
 * ================================================================== */
const buildTheMonth: AcademyModule = {
  id: 'build-the-month',
  number: 5,
  title: 'Build the Month · TBS, LRD, PBS',
  icon: 'mdi-hammer-wrench',
  color: '#0061AB',
  tagline: 'Place your training, choose Lineholder or Reserve, then bid the schedule you want.',
  estimatedMinutes: 16,
  terms: ['tbs', 'lrd', 'pbs', 'lineholder', 'reserve-line', 'senior-bump', 'line-of-time', 'ppo', 'misaward'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-hammer-wrench',
      title: 'PHASE 1 · BUILD THE MONTH',
      text: 'Three systems run in the first three weeks of the prior month, in a fixed order, and each one narrows the next. Training goes first because it blocks days. Status goes second because it decides which kind of month you bid. PBS goes last, and builds the calendar.',
    },
    {
      kind: 'roadmap',
      title: 'You are here',
      text: 'The build phase covers the first three stops of the month.',
      stageIds: ['tbs', 'lrd', 'pbs'],
    },
    {
      kind: 'prose',
      title: 'Why the order matters',
      icon: 'mdi-sort-numeric-ascending',
      body: `Each system hands a constraint to the one after it:

- **TBS** decides which days you are in a classroom. Those days are now unavailable for flying.
- **LRD** decides whether you are a **Lineholder** (fixed trips) or a **Reserve** (on call). PBS asks these two groups completely different questions.
- **PBS** takes your training block, your status, your vacation and leave, and your ranked preferences — and builds a legal month.

Run them out of order and it falls apart: you cannot bid trips around a class you have not been awarded yet.`,
    },
    tbsLrdSteps,
    {
      kind: 'header',
      icon: 'mdi-directions-fork',
      color: '#0061AB',
      title: 'The one decision that shapes everything: Lineholder or Reserve',
      text: 'The LRD is a small form with large consequences. It decides what your month feels like.',
    },
    {
      kind: 'compare',
      title: 'What you are actually choosing',
      items: [
        {
          title: 'Lineholder — predictable',
          icon: 'mdi-calendar-check',
          color: '#0061AB',
          points: [
            'You receive a line: specific trips on specific days, with days off around them',
            'You know your month before it starts and can plan your life around it',
            'You reshape it yourself all month using TTS and ETB',
            'Typically requires enough seniority to hold a line at your base',
          ],
        },
        {
          title: 'Reserve — available',
          icon: 'mdi-phone-incoming',
          color: '#C01933',
          points: [
            'You receive Reserve days and availability windows, not trips',
            'The airline assigns you flying as it needs you, through ROTA and ROTD',
            'Comes with Golden Days and Flex Days as protected time off',
            'Common for junior Flight Attendants, and sometimes chosen deliberately',
          ],
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-arrow-down-bold-circle-outline',
      title: 'Choosing Reserve when you could hold a line',
      text: 'A Flight Attendant senior enough to be a Lineholder can still elect Reserve. That is a Senior Bump preference — a deliberate trade of predictability for a different rhythm of days off and pay.',
    },
    {
      kind: 'header',
      icon: 'mdi-trophy-outline',
      color: '#003057',
      title: 'PBS: how your month actually gets built',
      text: 'The Preferential Bidding System is not a shopping cart. You do not pick trips — you describe the month you want across 7 sequential layers and let the system construct it.',
    },
    {
      kind: 'prose',
      title: 'The 7 bidding layers, at a high level',
      icon: 'mdi-layers-outline',
      body: `PBS builds your month using **7 sequential preference layers**, evaluated in priority order from most-critical to broadest fallback:

- **Layer 1 (Highest Priority):** Absolute must-haves — specific critical days off (holidays, events) or top-coveted pairings.
- **Layers 2 through 6 (Sequential Refinement):** Secondary preferences (trip lengths, layovers, report windows). PBS only unlocks the next layer if earlier layers cannot reach a complete legal line.
- **Layer 7 (The "Catch-All" Layer):** Broadest acceptable parameters to ensure PBS builds a legal schedule without assigning random system leftovers.

> ℹ️ **Need a deeper walkthrough?** Keep your bid high-level here, or explore the full official guides:
> - [APFA PBS Basic Understanding Guide](https://www.apfa.org/bidding/monthly-bidding/pbs-basic-understanding/)
> - [APFA PBS Layer Bidding Video Tutorial](https://www.youtube.com/watch?v=WXLZCRLtcME)

### Two key rules to remember:
- **Never leave an internal layer blank:** An empty layer is treated as *all pairings are acceptable*.
- **Seniority sets processing order, not legality:** Every schedule must satisfy FAR rest/duty limits and base coverage.`,
    },
    {
      kind: 'table',
      title: 'The 7 PBS bid layers breakdown',
      columns: ['Layer', 'Bidding Strategy', 'Typical Preferences Included', 'System Processing Role'],
      rows: [
        [
          'Layer 1',
          'Highest Priority (Dream Line)',
          'Specific must-have days off, exact high-value pairings, premier international layovers',
          'First attempt: PBS tries to build your entire schedule using strictly these top preferences.',
        ],
        [
          'Layers 2–3',
          'Secondary Preferences',
          'Preferred trip lengths (e.g. 2-day or 3-day), favored destinations, general time-of-day brackets',
          'Sequential relaxation: expands candidate sequences if Layer 1 cannot reach monthly credit minimum.',
        ],
        [
          'Layers 4–6',
          'Expanded Acceptable Flying',
          'Broader pairing types, alternate report time windows, flexible day-off patterns, turns',
          'Progressive expansion: provides wider legal paths to prevent solver dead-ends while honoring core preferences.',
        ],
        [
          'Layer 7',
          'The "Catch-All" Layer',
          'Broadest parameters: any legal base sequence, wide credit range (70–90 hrs), any days off',
          'Final safety net: guarantees PBS constructs a compliant schedule within your acceptable boundaries instead of assigning random leftovers.',
        ],
      ],
      termIds: ['pbs', 'credit-window', 'lineholder', 'line-of-time'],
    },
    {
      kind: 'table',
      title: 'The build phase at a glance',
      columns: ['System', 'When', 'Who', 'What you walk away with'],
      rows: [
        ['TBS', 'Opens Day 1 · closes Day 6 · awards Day 7', 'Anyone due for CQ training next month', 'A class date that blocks those days'],
        ['LRD', 'Opens Day 3 · closes Day 7', 'Every Flight Attendant', 'Lineholder or Reserve status for the month'],
        ['PBS', 'Package by Day 8 · bid ~Day 10–15 · award ~Day 18', 'Every Flight Attendant, in seniority order', 'Your line of trips, or your Reserve days'],
      ],
      termIds: ['tbs', 'lrd', 'pbs'],
    },
    {
      kind: 'calendar',
      title: 'The build phase on a calendar',
      text: 'This is the month BEFORE the one you will fly. Select any marked day to see what happens on it.',
      startWeekday: 1,
      legend: [
        { label: 'Training (TBS)', color: '#5A2D82' },
        { label: 'Status (LRD)', color: '#0061AB' },
        { label: 'Bidding (PBS)', color: '#003057' },
        { label: 'Trading opens', color: '#0078D2' },
      ],
      days: [
        { day: 1, label: 'TBS opens', color: '#5A2D82', icon: 'mdi-school-outline', detail: 'Training bidding opens at 1200 DFW. Rank the CQ class dates you can live with.' },
        { day: 3, label: 'LRD opens', color: '#0061AB', icon: 'mdi-directions-fork', detail: 'The Lineholder/Reserve election opens. This decides which kind of month PBS will build for you.' },
        { day: 6, label: 'TBS closes', color: '#5A2D82', detail: 'Training preferences lock at 1200 DFW for seniority-order processing.' },
        { day: 7, label: 'Awards + LRD', color: '#5A2D82', icon: 'mdi-trophy-outline', detail: 'CQ training is awarded in seniority order, and the LRD result appears on the PBS dashboard. Both are now inputs to PBS.' },
        { day: 8, label: 'Package', color: '#003057', icon: 'mdi-file-calendar-outline', detail: 'The bid package publishes: every sequence, Reserve availability period, projected line, and the bid timeline for the base.' },
        { day: 10, label: 'PBS opens', color: '#003057', icon: 'mdi-playlist-edit', detail: 'Bidding opens. You submit ranked preference layers describing the month you want.' },
        { day: 15, label: 'PBS closes', color: '#003057', detail: 'Bids lock. Nothing you submit after this influences the award.' },
        { day: 18, label: 'Award', color: '#003057', icon: 'mdi-trophy', detail: 'Lines and Reserve schedules post. This award is the baseline every later trade and assignment is measured against.' },
        { day: 20, label: 'TTS / UBL', color: '#0078D2', icon: 'mdi-swap-horizontal-circle-outline', detail: 'Trading opens for the month you just bid. From here you are reshaping an award rather than building one.' },
      ],
      caption: 'Exact days shift by bid period — the order never does.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      icon: 'mdi-calendar-question-outline',
      title: 'Treat these dates as the shape, not the rule',
      text: 'The sequence — training, then status, then bidding — is fixed. The exact days are published per bid period on the APFA bid calendar and can shift month to month. Learn the order; look up the dates.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      icon: 'mdi-alert-decagram-outline',
      title: 'When the award looks wrong',
      text: 'If an award does not reflect legality, seniority, or your preference order correctly, that is a Misaward — and it has its own contractual remedy process. It is not something you fix by trading your way out of it.',
    },
    {
      kind: 'flow',
      title: 'From bid package to published line',
      text: 'Play the build',
      items: [
        { label: 'Package published', icon: 'mdi-file-calendar-outline', color: '#003057', detail: 'By the 8th, the month’s sequences, Reserve availability periods, projected lines, and the bid timeline are visible to everyone at the base.' },
        { label: 'Preferences submitted', icon: 'mdi-format-list-bulleted', color: '#5A2D82', detail: 'Each Flight Attendant submits ranked preference layers describing the month they want — days off, trip types, credit volume, pairings to avoid.' },
        { label: 'Processed by seniority', icon: 'mdi-sort-descending', color: '#0061AB', detail: 'PBS works down the seniority list one Flight Attendant at a time, building each person the best legal month their remaining options allow.' },
        { label: 'Legality enforced', icon: 'mdi-shield-check-outline', color: '#0078D2', detail: 'Rest, duty and block limits, minimum days off, conflicts, and qualifications are checked before anything is committed. Illegal is never awarded, at any seniority.' },
        { label: 'Award published', icon: 'mdi-trophy-outline', color: '#177245', detail: 'Around the 18th, lines and Reserve schedules post. This award is the baseline every later trade, drop, and assignment is measured against.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'success',
      icon: 'mdi-flag-checkered',
      title: 'Phase 1 is done — but your month is not final',
      text: 'The PBS award is a starting point, not a verdict. The next module is about everything you can do to change it once it publishes.',
    },
  ],
  quiz: [
    {
      question: 'Why does TBS run before PBS?',
      options: [
        'Because training is more senior',
        'Because a training award blocks days that PBS must build around',
        'Because PBS cannot award Reserves',
        'They actually run at the same time',
      ],
      answerIndex: 1,
      explanation: 'A CQ class is an unschedulable block. PBS needs to know about it before it can construct a legal line.',
    },
    {
      question: 'What does the LRD decide?',
      options: [
        'Which trips you are awarded',
        'Whether you bid as a Lineholder or a Reserve for the month',
        'Your seniority number',
        'Your base',
      ],
      answerIndex: 1,
      explanation: 'The Lineholder/Reserve Designator sets your status, which determines which kind of month PBS builds for you.',
    },
    {
      question: 'In PBS, what happens if you leave a preference layer empty?',
      options: [
        'It is skipped harmlessly',
        'It is treated as “anything is acceptable” and can award you flying you did not want',
        'Your bid is rejected',
        'It defaults to the previous month',
      ],
      answerIndex: 1,
      explanation: 'An empty layer is not neutral — it opens that layer to all pairings.',
    },
    {
      question: 'A very senior Flight Attendant bids a line that would break minimum rest. PBS will…',
      options: [
        'Award it because seniority wins',
        'Award it and flag it for review',
        'Not award it — legality is checked before seniority is honoured',
        'Move them to Reserve',
      ],
      answerIndex: 2,
      explanation: 'Seniority sets the order of processing; it never overrides the legality rules that decide what can be built.',
    },
  ],
}

/* ==================================================================
 * MODULE 6 — RESHAPE THE MONTH (TTS, ETB)
 * ================================================================== */
const reshapeTheMonth: AcademyModule = {
  id: 'reshape-the-month',
  number: 6,
  title: 'Reshape the Month · TTS & ETB',
  icon: 'mdi-swap-horizontal-circle-outline',
  color: '#0078D2',
  tagline: 'Two very different ways to change an awarded line: overnight by seniority, or live on a board.',
  estimatedMinutes: 15,
  terms: ['tts', 'etb', 'open-time', 'credit-window', 'red-flagging', 'golden-day', 'flex-day'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-swap-horizontal-circle-outline',
      title: 'PHASE 2 · RESHAPE THE MONTH',
      text: 'Your award publishes and life immediately gets in the way — a wedding, a school play, a trip you would rather not fly. Two systems let you change the month you were given, and they work in completely opposite ways.',
    },
    {
      kind: 'roadmap',
      title: 'You are here',
      text: 'Trading opens once the award publishes and runs until the month ends.',
      stageIds: ['tts', 'etb'],
    },
    {
      kind: 'prose',
      title: 'The same request, two different answers',
      icon: 'mdi-scale-balance',
      body: `Both systems move trips between Flight Attendants. What differs is **how the winner is chosen**:

- **TTS decides by seniority.** You submit a request, it sits until the nightly run, and the most senior person who asked gets it. Being fast does not help you. Being patient does.
- **ETB decides by speed.** A trip is posted, it is visible to everyone, and the first legal click takes it. Being senior does not help you. Being quick does.

Most Flight Attendants use both: TTS for the trades that really matter, ETB for the opportunistic ones.`,
    },
    {
      kind: 'compare',
      title: 'TTS vs ETB',
      items: [
        {
          title: 'TTS — Trip Trade System',
          icon: 'mdi-sort-descending',
          color: '#0078D2',
          points: [
            'Runs nightly, 2300–0400 Home Base Time',
            'Winner decided by seniority, not by timing',
            'You submit a ballot with ranked choices, then wait',
            'Handles drops, pickups, straight trades, and Golden/Flex Day trades',
            'A denied request can roll to the UBL if you elected it',
          ],
        },
        {
          title: 'ETB — Electronic Trade Board',
          icon: 'mdi-lightning-bolt-outline',
          color: '#00857D',
          points: [
            'Live all day, all month — no processing window to wait for',
            'First come, first served, validated the instant you click',
            'Flight Attendant to Flight Attendant, in real time',
            'Legality and credit window are checked before it commits',
            'Transactions simply queue while the nightly TTS run is going',
          ],
        },
      ],
    },
    {
      kind: 'steps',
      title: 'How a TTS night actually works',
      text: 'All times are Home Base Time.',
      items: [
        { day: 'During the day', title: 'Build your ballot', detail: 'Search Open Time and your own line, then say what you want: drop this trip, pick up that one, or trade one for another. You can rank several choices so the system tries them in order.' },
        { day: 'By 2300', time: '2300', title: 'Submissions close and processing begins', detail: 'The nightly run opens. Anything submitted after this point waits for tomorrow night. TTS can reach flying from two days out through the end of the bid month.' },
        { day: 'Overnight', time: '2300–0400', title: 'Seniority decides', detail: 'The system works down the seniority list. Your first choice is tried, then your second, and so on, checking legality and your credit window at each step.' },
        { day: 'By 0400', time: '0400', title: 'Results post', detail: 'Awards appear in your schedule and denials appear in Run History with a reason. If you elected the UBL and your request was for near-term flying, you stay in line for it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      icon: 'mdi-window-shutter-cog-outline',
      title: 'The credit window can deny a perfectly reasonable trade',
      text: 'Your month has to stay inside a range of credited hours. A pickup that would push you above the top of that window, or a drop that would take you below the bottom, can be refused even though everyone involved agreed to it.',
    },
    {
      kind: 'header',
      icon: 'mdi-flag-variant',
      color: '#C01933',
      title: 'Red Flag flying: the trips nobody wants',
      text: 'Some Open Time is hard to cover, so the airline sweetens it. You can bid specifically for it.',
    },
    redFlagSteps,
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-cash-multiple',
      title: 'Pay 150%, credit 100%',
      text: 'Red Flag flying pays a premium but credits normally — so it adds money without eating into your monthly credit maximum. A Reserve who is simply assigned a sequence on their reserve availability does not earn the premium.',
    },
    {
      kind: 'diagram',
      caption: 'Where a trip goes when you let it go.',
      code: `flowchart TD
  A["You want to drop<br/>a trip on the 14th"] --> B{"How do you<br/>want to try?"}
  B -- "Seniority, overnight" --> C["TTS ballot<br/>before 2300 HBT"]
  B -- "Speed, right now" --> D["Post it on the ETB"]
  C --> E{"Awarded<br/>by 0400?"}
  E -- "Yes" --> F["It leaves your line"]
  E -- "No" --> G["Denied · shown in Run History"]
  G -- "UBL elected and<br/>it starts within 2 days" --> H["Carried to the UBL"]
  D --> I{"Does another FA<br/>claim it?"}
  I -- "Yes" --> F
  I -- "No" --> J["Still yours · try again"]
  F --> K["If nobody took it, it<br/>becomes Open Time"]`,
    },
    {
      kind: 'callout',
      tone: 'primary',
      icon: 'mdi-arrow-right-circle-outline',
      title: 'What happens when the trade fails?',
      text: 'A denied TTS request for flying in the next two days does not just disappear. That is exactly what the next module is about.',
    },
  ],
  quiz: [
    {
      question: 'Two Flight Attendants want the same trip. One is senior, one submitted first. Who wins in TTS?',
      options: ['The one who submitted first', 'The senior one', 'Neither — it is cancelled', 'Both, split'],
      answerIndex: 1,
      explanation: 'TTS resolves by seniority during the nightly run. Submission time does not matter as long as you made the cutoff.',
    },
    {
      question: 'The same two Flight Attendants want the same trip on the ETB. Who wins?',
      options: ['The senior one', 'The one who clicked first', 'The system picks randomly', 'Nobody — ETB does not award trips'],
      answerIndex: 1,
      explanation: 'ETB is first come, first served, validated at the click. Seniority plays no part.',
    },
    {
      question: 'When does the TTS nightly run process ballots?',
      options: ['0400–0900 HBT', '1500–1930 HBT', '2300–0400 HBT', 'Continuously'],
      answerIndex: 2,
      explanation: 'Submissions close at 2300 Home Base Time and results post by 0400.',
    },
    {
      question: 'Red Flag flying pays and credits…',
      options: ['150% pay, 150% credit', '150% pay, 100% credit', '100% pay, 150% credit', '100% pay, 100% credit'],
      answerIndex: 1,
      explanation: 'The premium lands on pay only. Credit stays at 100%, which keeps your monthly maximum intact.',
    },
  ],
}

/* ==================================================================
 * MODULE 7 — THE NEXT TWO DAYS (UBL and Open Time)
 * ================================================================== */
const nearTermOpenTime: AcademyModule = {
  id: 'near-term-open-time',
  number: 7,
  title: 'The Next Two Days · UBL & Open Time',
  icon: 'mdi-format-list-numbered',
  color: '#B75C09',
  tagline: 'What happens to a trip that starts within 48 hours and still has nobody on it.',
  estimatedMinutes: 12,
  terms: ['ubl', 'open-time', 'tts', 'hbt', 'odan'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-format-list-numbered',
      title: 'PHASE 2b · THE NEXT TWO DAYS',
      text: 'A trip leaving next Tuesday has time to find a taker. A trip leaving tomorrow morning does not. The closer a departure gets, the more urgent the system becomes — and the Unsuccessful Bidder’s List is where that urgency starts.',
    },
    {
      kind: 'roadmap',
      title: 'You are here',
      text: 'The UBL picks up where the nightly TTS run leaves off.',
      stageIds: ['ubl'],
    },
    {
      kind: 'prose',
      title: 'A losing bid is not a wasted bid',
      icon: 'mdi-account-clock-outline',
      body: `Here is the situation the UBL was built for.

You bid for a trip in TTS. Someone more senior wanted it too, so you lost. Under a simple system, that is the end — you would have to notice the trip again, and bid again, tomorrow night.

Instead, if you elected the **Unsuccessful Bidder’s List**, you stay in the queue for it. If that trip comes free again — the winner drops it, the trip goes uncovered, or new Open Time appears — you can be awarded it without lifting a finger.

The trade-off is the **window**: the UBL only looks at sequences starting **today or tomorrow**. Anything further out is TTS and ETB territory.`,
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-calendar-range-outline',
      title: 'Why two days?',
      text: 'The UBL runs immediately after TTS and only processes requests for sequences originating today or tomorrow. So after the Monday night TTS run (2300–0400 HBT), the UBL is working Tuesday and Wednesday operations — nothing further out. Two days is where planning becomes operating: beyond it there is time for another nightly seniority run, inside it Crew Scheduling needs answers now.',
    },
    dailySchedule,
    {
      kind: 'header',
      icon: 'mdi-robot-outline',
      color: '#B75C09',
      title: 'Two kinds of UBL run',
      text: 'Which one you get depends entirely on the time of day and which day the sequence originates.',
    },
    {
      kind: 'compare',
      title: 'Auto Award vs Manual Award',
      items: [
        {
          title: 'Auto Award',
          icon: 'mdi-robot-outline',
          color: '#177245',
          points: [
            'UBL runs for next-day sequences, before 1900 HBT',
            'No phone call from Crew Scheduling — the award just appears',
            'Example: TTS/UBL opens 0400 HBT Sunday. Anything that opens between 0400 and 1500 HBT Sunday, or any sequence originating Monday, is an Auto Award',
            'Despite 1500 HBT being the cutoff, Scheduling usually performs the last UBL run before ROTA by 1445',
          ],
        },
        {
          title: 'Manual Award',
          icon: 'mdi-phone-outline',
          color: '#C01933',
          points: [
            'Any same-day sequence, or any next-day sequence after 1900 HBT',
            'Every Manual Award requires a phone call from Crew Scheduling',
            'Example: TTS/UBL opens 0400 HBT Thursday. Manual covers everything opening Thursday (same day) plus anything originating Friday that opens after 1900 HBT Thursday',
            'No call if you unchecked the contact option, are on legal rest, or are out flying on a sequence',
          ],
        },
      ],
    },
    {
      kind: 'table',
      title: 'How a UBL award reaches you',
      columns: ['When the sequence opens', 'Which flying', 'Run type'],
      rows: [
        ['Before 1900 HBT', 'Originates tomorrow', 'Auto Award — no phone call. The award simply appears in your schedule.'],
        ['After 1900 HBT', 'Originates tomorrow', 'Manual Award — Crew Scheduling calls, unless you opted out, are on legal rest, or are out flying.'],
        ['Any time', 'Originates today', 'Manual Award — same-day flying always goes through Crew Scheduling.'],
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      icon: 'mdi-clock-alert-outline',
      title: 'Three times, three different jobs — do not mix them up',
      text: '1500 HBT is the UBL drop deadline: a drop request can be made up until 1500 HBT the day before the sequence originates. 1500 HBT is also when ROTA, the Reserve future run, begins. Neither is the 1900 HBT threshold, which decides only whether a next-day UBL award is automatic or manual.',
    },
    {
      kind: 'dayclock',
      title: 'One day, three award regimes',
      text: 'The whole day on a single track. The shaded bands are the regime in force; the pins are the moments that switch it.',
      caption: 'All times Home Base Time — the clock of your crew base, not wherever you happen to be.',
      bands: [
        { from: '2300', to: '0400', label: 'TTS processing', color: '#0078D2' },
        { from: '0400', to: '1900', label: 'UBL Auto Awards (next-day)', color: '#177245' },
        { from: '1900', to: '2300', label: 'Manual awards', color: '#5A2D82' },
      ],
      markers: [
        { time: '0400', label: 'TTS results post', color: '#0078D2', icon: 'mdi-check', detail: 'The overnight seniority run finishes. Awards land in schedules, denials appear in Run History, and anything still uncovered becomes the UBL’s problem.' },
        { time: '1500', label: 'Drops lock · ROTA starts', color: '#C01933', icon: 'mdi-lock', detail: 'Two separate things happen on the same hour. UBL drop requests close for sequences originating tomorrow, and Reserve future processing begins its daily run.' },
        { time: '1900', label: 'Auto → Manual', color: '#5A2D82', icon: 'mdi-phone', detail: 'The switch. Before this, a next-day UBL award is automatic and silent. After it, the award is manual and Crew Scheduling calls — unless you opted out, are on legal rest, or are out flying.' },
        { time: '2300', label: 'TTS submissions close', color: '#0078D2', icon: 'mdi-send', detail: 'Tonight’s ballot deadline. Anything submitted after this waits for tomorrow night’s run.' },
      ],
    },
    {
      kind: 'flow',
      title: 'The 48-hour handoff',
      text: 'Play the handoff',
      items: [
        { label: 'TTS run ends', icon: 'mdi-weather-night', color: '#0078D2', detail: 'By 0400 the nightly seniority run has awarded what it can. Everything still uncovered is now Open Time with a departure getting closer by the hour.' },
        { label: 'UBL takes over', icon: 'mdi-format-list-numbered', color: '#B75C09', detail: 'Anyone who lost a bid and elected the UBL is still in line for flying that starts today or tomorrow. No re-bidding required.' },
        { label: '1500 · drops lock', icon: 'mdi-lock-clock', color: '#C01933', detail: 'The UBL drop deadline passes — drops can be requested up until 1500 HBT the day before a sequence originates. At the same hour, Reserve future processing begins, so the two run alongside each other for the rest of the afternoon.' },
        { label: '1900 · manual mode', icon: 'mdi-phone-outline', color: '#5A2D82', detail: 'Next-day awards stop being automatic. From here every UBL award is a Manual Award, which means a call from Crew Scheduling unless you opted out, are on legal rest, or are out flying.' },
        { label: 'Handed to Reserve', icon: 'mdi-shield-airplane-outline', color: '#177245', detail: 'Whatever volunteers could not absorb becomes the Reserves’ problem — and that is the third and final phase of the month.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'primary',
      icon: 'mdi-account-question-outline',
      title: 'The question that decides everything from here',
      text: 'Can a volunteer be found? If yes, TTS, ETB, or the UBL will find one. If no, the trip belongs to a Reserve — which is the next module.',
    },
  ],
  quiz: [
    {
      question: 'Which flying does the UBL consider?',
      options: [
        'Anything in the bid month',
        'Only sequences starting today or tomorrow',
        'Only next month’s flying',
        'Only international sequences',
      ],
      answerIndex: 1,
      explanation: 'The UBL is a near-term mechanism, limited to Open Time starting today or tomorrow.',
    },
    {
      question: 'You lose a TTS bid for a trip leaving tomorrow and you elected the UBL. What happens?',
      options: [
        'Nothing — you must bid again tomorrow night',
        'You stay in the queue and can be awarded it automatically if it frees up',
        'You are automatically assigned it',
        'It converts to an ETB posting',
      ],
      answerIndex: 1,
      explanation: 'The UBL keeps unsuccessful bidders in line for near-term Open Time without a fresh bid.',
    },
    {
      question: 'What changes at 1900 HBT?',
      options: [
        'The UBL closes for the day',
        'Next-day UBL awards switch from Auto Awards to Manual Awards',
        'ROTA begins',
        'The TTS run starts',
      ],
      answerIndex: 1,
      explanation: 'Before 1900 a next-day award is automatic with no phone call. After it, the award is manual and Crew Scheduling calls — unless you opted out, are on legal rest, or are out flying.',
    },
    {
      question: 'A sequence originating TODAY opens up at 1000 HBT. How is a UBL award made?',
      options: [
        'Auto Award, because it is before 1900',
        'Manual Award — same-day flying always goes through Crew Scheduling',
        'It is not eligible for the UBL at all',
        'It goes straight to ROTA',
      ],
      answerIndex: 1,
      explanation: 'The 1900 threshold only governs next-day sequences. Same-day flying is always a Manual Award regardless of the hour.',
    },
  ],
}

/* ==================================================================
 * MODULE 8 — COVER THE MONTH (ROTA, ROTD, Aggressive Reserve)
 * ================================================================== */
const reserveCoverage: AcademyModule = {
  id: 'reserve-coverage',
  number: 8,
  title: 'Cover the Month · ROTA, ROTD & Aggressive',
  icon: 'mdi-shield-airplane-outline',
  color: '#C01933',
  tagline: 'How Reserves absorb everything volunteers could not — tomorrow first, then today.',
  estimatedMinutes: 18,
  terms: ['rota', 'rotd', 'rap', 'standby', 'golden-day', 'flex-day', 'gdfd', 'rtdo', 'roc', 'lmco', 'aggressive-reserve', 'reserve-line'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-shield-airplane-outline',
      title: 'PHASE 3 · COVER THE MONTH',
      text: 'Every flight must leave with a legal, qualified crew. When volunteers run out, Reserves are how the airline keeps that promise — and they are the reason a sick call at 0940 does not cancel an 1150 departure.',
    },
    {
      kind: 'roadmap',
      title: 'You are here',
      text: 'The last three stops: tomorrow’s coverage, today’s coverage, and the volunteers who go further.',
      stageIds: ['rota-future', 'rotd', 'rota-aggressive'],
    },
    {
      kind: 'prose',
      title: 'A Reserve is paid to be available',
      icon: 'mdi-phone-incoming',
      body: `A Lineholder is paid to fly specific trips. A **Reserve** is paid to be reachable, legal, and ready — and the trips come to them.

A Reserve’s month is not empty, though. It has real structure:

- **Reserve days** — days you are available to be used.
- **RAP (Reserve Availability Period)** — the window on a Reserve day when you must be reachable and able to report. Every scheduled RAP is a 12-hour window, and if no assignment comes by the end of it you are released automatically.
- **Standby** — an availability shift spent at the airport rather than at home, with a projected start, length, and location.
- **Golden Days and Flex Days** — protected days off. A full Reserve month normally carries 8 Golden Days and 4 Flex Days, which can be prorated.

Everything in this module is about matching uncovered flying to a Reserve who is available, qualified, legal, and reachable.`,
    },
    {
      kind: 'table',
      title: 'Reserve days-off systems & trading methods',
      columns: ['System / Tool', 'When Active', 'Primary Function', 'CBA Rule / Guardrail'],
      rows: [
        [
          'PBS Bidding',
          'Prior Month (Days ~10–15)',
          'Awards total raw days off (12 minimum for full month) and 18 reserve duty days.',
          'Enforces 2–8 consecutive off-days and 3–6 consecutive duty-day blocks (§10.D.16).',
        ],
        [
          'GDFD Application',
          'Post-PBS (~Days 18–21, closes 1200 CT)',
          'Allows Reserves to customize awarded days off into 8 Golden Days (inviolable) and 4 Flex Days (assignable).',
          'Flex Days must precede Golden Days in grouped day-off blocks (§10.D.16.b.iii).',
        ],
        [
          'RTDO (Ballot with Company)',
          'From 24th prior month, daily ballots',
          'Automated ballot to trade scheduled days off directly with the Company inventory in seniority order.',
          'Submit by 1200 HBT at least 2 days prior to traded date; awarded by 1200 next day (§12.C.2).',
        ],
        [
          'ETB (Peer-to-Peer Days Off)',
          'All month concurrent with ETB',
          'Trade days off directly with other Reserves at your base.',
          'Both resulting lines must remain legal (3–6 duty blocks, max 8 Golden Days) (§12.C.1).',
        ],
      ],
      termIds: ['pbs', 'gdfd', 'rtdo', 'etb'],
    },
    reserveDays,
    {
      kind: 'header',
      icon: 'mdi-calendar-clock-outline',
      color: '#C01933',
      title: 'ROTA vs ROTD: tomorrow vs today',
      text: 'Two engines, one difference — how far away the flying is.',
    },
    {
      kind: 'compare',
      title: 'The two Reserve engines',
      items: [
        {
          title: 'ROTA — the future run',
          icon: 'mdi-calendar-clock-outline',
          color: '#C01933',
          points: [
            'Runs once a day, beginning at 1500 HBT and finishing by 1930 HBT',
            'Awards tomorrow’s sequences, Standby shifts, and RAPs by seniority',
            'You leave standing bids in place; a bid for a specific day overrides them',
            'Sequence and Standby awards must be acknowledged by 2230 HBT — a RAP award does not',
            'Its whole purpose is to settle tomorrow before tomorrow arrives',
          ],
        },
        {
          title: 'ROTD — the day-of engine',
          icon: 'mdi-phone-in-talk-outline',
          color: '#D14905',
          points: [
            'Runs continuously, whenever something opens up after ROTA is finished',
            'Handles sick calls, cancellations, misconnects, and last-minute gaps',
            'Works from who is on a RAP right now, in seniority order',
            'Positive contact starts a 15-minute callback window, then roughly two hours to report',
            'Its whole purpose is to keep today’s operation intact',
          ],
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-help-rhombus-outline',
      title: 'Award or assignment? The distinction matters',
      text: 'An award is flying you bid for and won. An assignment is flying you were given because coverage required it. Both end up on your schedule, but they are different events with different rules behind them — and pay and protection can follow different paths.',
    },
    {
      kind: 'dayclock',
      title: 'A Reserve day on the clock',
      text: 'Two things define a Reserve’s day: the availability window they are sitting in, and the fixed points where the system decides their tomorrow.',
      caption: 'Every scheduled RAP is 12 hours. A, B, and C start times are published per base and bid period; RAP D is fixed at 1400–0200 and wraps past midnight.',
      bands: [
        { from: '0600', to: '1800', label: 'Example daytime RAP · 12 hours', color: '#0078D2' },
        { from: '1400', to: '0200', label: 'RAP D · 1400–0200', color: '#5A2D82' },
      ],
      markers: [
        { time: '1500', label: 'ROTA runs', color: '#C01933', icon: 'mdi-calendar-clock', detail: 'Future Reserve processing begins. Tomorrow’s sequences, Standby shifts, and RAPs are awarded in seniority order among bidders.' },
        { time: '1930', label: 'ROTA complete', color: '#B75C09', icon: 'mdi-flag-checkered', detail: 'Processing finishes. A Reserve with no award can elect Remain on Call (ROC) instead of being released for the day.' },
        { time: '2230', label: 'Acknowledge by', color: '#177245', icon: 'mdi-check-decagram', detail: 'Sequence and Standby awards must be acknowledged by this time. A RAP award does not require acknowledgement.' },
      ],
    },
    standbyDetailRows,
    {
      kind: 'header',
      icon: 'mdi-rocket-launch-outline',
      color: '#177245',
      title: 'Aggressive Reserve: volunteering to go further',
      text: 'The last line of coverage — and it is always voluntary.',
    },
    {
      kind: 'prose',
      title: 'What “aggressive” actually means',
      icon: 'mdi-shield-plus-outline',
      body: `Reserve rules exist to protect you: minimum rest at home base, limits on how much you can fly in a rolling seven days, protected days off, and a standard call-out window before you have to report.

**Bidding aggressively means voluntarily setting some of those protections aside** — attaching waivers to a ROTA or ROTD bid so you become eligible for flying the default rules would keep you away from.

Why would anyone do that? Because it puts you in front of flying nobody else can legally take. When a departure is 50 minutes out and no Standby can physically reach the gate in time, the Flight Attendant with an LMCO waiver is the one who can go — and Aggressive Reserve bids are awarded ahead of Standby for exactly those situations.

Two guardrails worth remembering: you are never bid aggressively involuntarily, and an unanswered LMCO call simply returns you to RAP availability with no penalty.`,
    },
    aggressiveReserveSteps,
    {
      kind: 'diagram',
      caption: 'The coverage ladder — each rung is tried before the next.',
      code: `flowchart TD
  A["A sequence is uncovered"] --> B["Volunteers first<br/>TTS · ETB · UBL"]
  B -- "Still open" --> C{"When does<br/>it depart?"}
  C -- "Tomorrow or later" --> D["ROTA · 1500 HBT<br/>award by seniority"]
  C -- "Today" --> E["ROTD · continuous<br/>who is on RAP now"]
  D -- "Still open" --> E
  E --> F{"Can anyone<br/>legally reach it?"}
  F -- "Yes" --> G["Assigned · acknowledge<br/>and report"]
  F -- "No, too close in" --> H["Aggressive Reserve<br/>and LMCO volunteers"]
  H --> G
  G --> I["Flight departs<br/>with a legal crew"]`,
    },
    {
      kind: 'header',
      icon: 'mdi-cash-multiple',
      color: '#003057',
      title: 'Where the whole month lands: your paycheck',
      text: 'Every choice across these nine systems eventually shows up as pay and credit.',
    },
    payConsequenceTerms,
    {
      kind: 'callout',
      tone: 'success',
      icon: 'mdi-flag-checkered',
      title: 'You have walked the whole month',
      text: 'Training placed, status chosen, schedule bid, trips traded, near-term gaps chased, and everything left over covered by Reserves. The next module follows the money: how all of it turns into credit, rigs, guarantees, and premiums.',
    },
  ],
  quiz: [
    {
      question: 'What is the core difference between ROTA and ROTD?',
      options: [
        'ROTA is for Lineholders, ROTD is for Reserves',
        'ROTA handles future flying in a daily 1500 run; ROTD handles today’s flying continuously',
        'ROTA is automatic, ROTD is by seniority',
        'ROTA is domestic, ROTD is international',
      ],
      answerIndex: 1,
      explanation: 'The horizon is the difference: ROTA settles tomorrow in one daily run, ROTD reacts to today as it happens.',
    },
    {
      question: 'What is a RAP?',
      options: [
        'A type of trip',
        'A Reserve Availability Period — the window when a Reserve must be reachable and able to report',
        'A pay premium',
        'A training class',
      ],
      answerIndex: 1,
      explanation: 'The RAP is the availability window on a Reserve day, typically 12 hours.',
    },
    {
      question: 'Which award does NOT require acknowledgement by 2230 HBT?',
      options: ['A sequence', 'A Standby shift', 'A RAP', 'All three require it'],
      answerIndex: 2,
      explanation: 'Sequence and Standby awards must be acknowledged; a RAP award does not.',
    },
    {
      question: 'A departure is 45 minutes away and no Standby can reach it. Who is eligible?',
      options: [
        'Nobody — the flight cancels',
        'The most junior Reserve, involuntarily',
        'A Reserve who voluntarily set an LMCO waiver, ahead of Standby',
        'Any Lineholder on a day off',
      ],
      answerIndex: 2,
      explanation: 'LMCO shortens the standard call-out to the minutes you specified, and Aggressive Reserve bids are awarded before Standby for that coverage.',
    },
    {
      question: 'Can a Flight Attendant be bid aggressively without choosing to be?',
      options: ['Yes, when coverage requires it', 'Yes, if they are junior', 'No — it is always voluntary', 'Only on Golden Days'],
      answerIndex: 2,
      explanation: 'Aggressive bidding is an opt-in. You attach the waivers yourself, and an unanswered LMCO call carries no penalty.',
    },
  ],
}

export const biddingModules: AcademyModule[] = [
  bidMonthOverview,
  buildTheMonth,
  reshapeTheMonth,
  nearTermOpenTime,
  reserveCoverage,
]
