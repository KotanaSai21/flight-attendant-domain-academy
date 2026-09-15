import type { ContentBlock } from '../types'

export const tbsLrdSteps: ContentBlock = {
  kind: 'steps',
  title: 'Before PBS: place training, then choose Lineholder or Reserve',
  text: 'Two systems run ahead of the monthly PBS window and shape what PBS can award.',
  items: [
    { day: 'Day 1 · 1200 DFW', title: 'TBS opens', detail: 'Rank acceptable Continuing Qualification (CQ) training preferences in the Training Bidding System (TBS).' },
    { day: 'Day 3', title: 'LRD opens', detail: 'Select a Lineholder or Reserve preference for the month in the Lineholder/Reserve Designator (LRD). Tentative status only exists where base VLOAs are offered, and defaults to Lineholder unless Reserve is selected.' },
    { day: 'Day 6 · 1200 DFW', title: 'TBS closes', detail: 'Training preferences lock for seniority-order processing.' },
    { day: 'Day 7 · by 1200 DFW', title: 'TBS award + LRD result', detail: 'CQ training is awarded in seniority order; the LRD result becomes visible on the PBS dashboard and directs the Lineholder or Reserve monthly award path. A designated Lineholder electing Reserve outside the normal rotation is a Senior Bump preference.' },
  ],
}

export const dailySchedule: ContentBlock = {
  kind: 'steps', title: 'Follow a Wednesday departure', text: 'All times are Home Base Time (HBT). TTS can process flying from two days ahead through the end of the bid month; this example follows its last nightly opportunity for Wednesday.',
  items: [
    { day: 'Monday · D−2', time: '2300', title: 'TTS processing begins', detail: 'Submit the ballot before the nightly cutoff. Wednesday departures are within this run, along with eligible later dates in the bid month.' },
    { day: 'Tuesday · D−1', time: 'By 0400', title: 'TTS completes → UBL follows', detail: 'UBL now considers Open Time originating Tuesday or Wednesday: today and tomorrow. Later departure dates remain outside this UBL window.' },
    { day: 'Tuesday · D−1', time: 'Until 1900', title: 'Auto Award UBL for Wednesday', detail: 'A UBL run for next-day sequences before 1900 HBT is an Auto Award: the award appears in your schedule with no phone call from Crew Scheduling. This describes award handling when a run occurs, not a promise of continuous processing.' },
    { day: 'Tuesday · D−1', time: '1500 → by 1930', title: 'ROTA runs alongside the UBL award window', detail: 'Reserve future processing begins at 1500. The UBL drop deadline is also 1500 — separate from the 1900 threshold. In practice Scheduling usually performs the last UBL run before ROTA by 1445. ROTA processes eligible unfilled flying after UBL consideration.' },
    { day: 'Tuesday · D−1', time: 'After 1900', title: 'Manual Award UBL for Wednesday', detail: 'Next-day sequences that open after 1900 HBT become Manual Awards. Crew Scheduling calls unless you unchecked the contact option, are on legal rest, or are out flying on a sequence.' },
    { day: 'Wednesday · D0', time: 'Day of departure', title: 'Same-day UBL and urgent coverage', detail: 'Any sequence originating today is a Manual Award at any hour. Remaining flying follows the applicable Reserve coverage order; close-to-departure vacancies have special Standby/short-call rules. ROTD can also handle tomorrow after ROTA finishes.' },
  ],
}

export const reserveDays: ContentBlock = {
  kind: 'steps',
  title: 'The 4-step Reserve days-off lifecycle: PBS → GDFD → RTDO/ETB → Operation',
  items: [
    {
      day: 'Step 1 · PBS Bid (~Days 10–15)',
      title: 'Bid raw days off in PBS',
      detail:
        'Rank preferred off dates in PBS. PBS awards the total monthly days off (12 minimum in a 30-day month) and 18 reserve duty days while enforcing legal patterns (2–8 off days, 3–6 duty days). PBS awards the off days, not their Golden/Flex designation.',
    },
    {
      day: 'Step 2 · GDFD Tool (~Days 18–21)',
      title: 'Designate Golden Days vs Flex Days (GDFD)',
      detail:
        'Open the GDFD application in Crew Portal to view and customize which awarded days off are Golden (8 days, protected) vs Flex (4 days, assignable). If Golden and Flex days are grouped together, Flex Days must precede Golden Days (§10.D.16.b.iii).',
    },
    {
      day: 'Step 3 · Trade Days Off (~Day 24 onwards)',
      title: 'Trade days off via RTDO (Company) or ETB (Peer)',
      detail:
        'To swap days off with the Company, submit an RTDO (Reserve Trade Days Off) ballot by 1200 HBT 2 days prior to the traded date (processed daily in seniority order). To swap days off with another Reserve at base, use peer-to-peer ETB trading.',
    },
    {
      day: 'Step 4 · Live Operation',
      title: 'Daily execution via ROTA & ROTD',
      detail:
        'Golden Days are inviolable without your explicit consent. Flex Days may be assigned into by Scheduling if coverage requires it. Daily availability shifts (RAP A–D) are awarded daily by ROTA or covered live by ROTD on your Reserve duty days.',
    },
  ],
}

export const biddingSources: ContentBlock = {
  kind: 'callout',
  title: 'APFA references · reviewed September 11, 2026',
  text: 'Use the current APFA bid calendar and guidance, plus the AA/APFA 2024 CBA, to confirm live dates and rules before bidding.',
  tone: 'info',
  icon: 'mdi-book-open-page-variant-outline',
}

export const redFlagSteps: ContentBlock = {
  kind: 'steps', title: 'Red Flag bidding uses TTS / UBL',
  items: [
    { day: 'Find', title: 'Search in TTS', detail: 'Check Crew Portal for the base offer and filter for Only Red Flag Sequences. Red Flag flying can be offered beyond today and tomorrow.' },
    { day: 'Bid', title: 'Set the Red Flag condition', detail: 'Apply Red Flag Only to the ballot, a request, or a choice, depending on which awards you want to restrict.' },
    { day: 'Process', title: 'TTS, then eligible UBL consideration', detail: 'TTS uses its nightly window; UBL handles today/tomorrow Open Time. Check Run History: a conditional request is denied if the sequence is not flagged at the run or the trade fails premium eligibility.' },
    { day: 'Review', title: 'Check pay and reserve status', detail: 'Eligible Red Flag flying pays 150% of the applicable rate and credits 100%. Reserves can use TTS/UBL on days off; a sequence assigned on reserve availability does not earn the Red Flag premium.' },
  ],
}

export const aggressiveReserveSteps: ContentBlock = {
  kind: 'steps',
  title: 'Aggressive Reserve bidding, Remain on Call (ROC), and LMCO',
  text: 'Three related elections let a Reserve volunteer for faster or less-predictable assignment.',
  items: [
    { day: 'Attach waivers', title: 'Bid aggressively in ROTA or ROTD', detail: 'Add waivers — for example 35-in-7, home-base rest to FAR minimum, working into a Golden/Flex Day, or an LMCO minutes waiver — to a future or day-of bid to volunteer for earlier assignment than the default RAP or call-out rules allow.' },
    { day: 'After ROTA runs', title: 'Elect Remain on Call (ROC)', detail: 'A Reserve who receives no ROTA award can elect ROC to stay available for a possible same-day sequence or standby assignment, instead of being fully released for the day.' },
    { day: 'When no standby can cover', title: 'LMCO (Less Than Minimum Call-Out) steps in', detail: 'LMCO shortens the standard call-out window (2 hours, 3 hours co-terminal) to the minutes you specify — e.g., ":45" makes you eligible for a departure 45 minutes out. Aggressive Reserve bids are awarded before standby for LMCO coverage.' },
    { day: 'If you do not answer', title: 'No-penalty return to RAP', detail: 'LMCO has no 15-minute wait: an unanswered call simply returns you to RAP availability — no pay protection, no penalty, and you are never involuntarily assigned LMCO.' },
  ],
}

export const standbyDetailRows: ContentBlock = {
  kind: 'table',
  title: 'Standby shift basics',
  columns: ['Attribute', 'What to know'],
  rows: [
    ['Where you wait', 'At the airport, not at home — that is the whole difference between Standby and sitting a RAP.'],
    ['What is published', 'The bid packet shows a projected start time, length, and location for each shift.'],
    ['How long it runs', 'Shift length can be extended (e.g., to 6 or 8 hours) under the Implementation LOA.'],
    ['How you get one', 'ROTA can award Standby ahead of time; ROTD assigns it day-of alongside sequences and RAPs.'],
  ],
}

export const payConsequenceTerms: ContentBlock = {
  kind: 'terms',
  title: 'How bidding decisions show up in pay',
  items: [
    { id: 'duty-rig', term: 'Duty Rig', icon: 'mdi-calculator-variant-outline', definition: '1-for-2 minimum credit for duty time beyond flying time — guards against long duty days with little flying.' },
    { id: 'rig', term: 'Trip / Sequence Rig', icon: 'mdi-calculator-variant-outline', definition: '1-for-3.5 minimum credit based on Time Away From Base (TAFB) — guards against long layovers with little flying.' },
    { id: 'credit-window', term: 'Credit Window', icon: 'mdi-window-shutter-cog-outline', definition: 'The monthly range of credited hours a schedule must stay within. A TTS/ETB trade that would push you outside it can be denied.' },
    { id: 'red-flagging', term: 'Red-Flag Premium', icon: 'mdi-flag-outline', definition: '150% pay, 100% credit for hard-to-cover open time — bid it through TTS or the UBL.' },
    { id: 'tafb', term: 'Time Away From Base (TAFB)', icon: 'mdi-clock-time-eight-outline', definition: 'Total elapsed time from report at base to release back at base — the basis for the Trip Rig.' },
    { id: 'misaward', term: 'Misaward', icon: 'mdi-alert-decagram-outline', definition: 'A PBS award that does not correctly reflect legality, seniority, or preference processing — it has its own contractual remedy process.' },
  ],
}

