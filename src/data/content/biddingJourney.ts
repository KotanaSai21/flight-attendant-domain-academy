/**
 * The nine stops of the Flight Attendant bidding month, in the order a Flight
 * Attendant actually meets them. Shared by the animated roadmap and the
 * bidding modules so the chronology is defined exactly once.
 */
export interface BiddingStage {
  id: string
  short: string
  name: string
  phase: 'Build the month' | 'Reshape the month' | 'Cover the month'
  /** Short label shown under the roadmap stop. */
  when: string
  /** Full answer to "when does this system open?" */
  opens: string
  /** Full answer to "who is allowed to use it?" */
  who: string
  /** Full answer to "why does it exist?" */
  purpose: string
  /** Concrete, everyday illustration. */
  example: string
  /** What actually changes on the schedule when this stage runs. */
  changes: string[]
  icon: string
  color: string
  /** Dictionary term id for deep-linking. */
  termId?: string
}

export const biddingJourney: BiddingStage[] = [
  {
    id: 'tbs',
    short: 'TBS',
    name: 'Training Bidding System',
    phase: 'Build the month',
    when: 'Day 1 · prior month',
    opens:
      'Opens on the 1st of the prior month at 1200 DFW, closes on the 6th at 1200 DFW, and awards by the 7th. It deliberately runs before everything else.',
    who: 'Every Flight Attendant who is due for Continuing Qualification (CQ) training in the coming month.',
    purpose:
      'Training days block flying days, so training is placed first. You rank the class dates you can live with, and seats are awarded in seniority order.',
    example:
      'Maria is due for CQ in March. On February 1 she ranks the 12th, the 19th, and the 26th. On February 7 she is awarded the 19th — so PBS will later build her March line around that date.',
    changes: [
      'Reserves a class date that becomes an unschedulable block in your month',
      'Feeds PBS so your awarded line never collides with your training',
    ],
    icon: 'mdi-school-outline',
    color: '#5A2D82',
    termId: 'tbs',
  },
  {
    id: 'lrd',
    short: 'LRD',
    name: 'Lineholder / Reserve Designator',
    phase: 'Build the month',
    when: 'Day 3 · prior month',
    opens:
      'Opens on the 3rd of the prior month and closes on the 7th. The result appears on the PBS dashboard the same day it closes.',
    who: 'Every Flight Attendant. If you do nothing, you default to Lineholder unless Reserve applies to you by rotation.',
    purpose:
      'One question decides which kind of month you are about to bid: do you want a fixed line of trips (Lineholder), or do you want to be on call (Reserve)?',
    example:
      'Chris is senior enough to hold a line but wants the flexibility of Reserve pay and days off, so he elects Reserve in the LRD. That is a Senior Bump preference, and it sends him down the Reserve bidding path.',
    changes: [
      'Sets your status for the whole month: Lineholder or Reserve',
      'Decides which set of PBS preferences you will be asked for',
    ],
    icon: 'mdi-directions-fork',
    color: '#0061AB',
    termId: 'lrd',
  },
  {
    id: 'pbs',
    short: 'PBS',
    name: 'Preferential Bidding System',
    phase: 'Build the month',
    when: 'Days 10–18 · prior month',
    opens:
      'The bid package is published by the 8th. Bidding typically opens around the 10th and closes around the 15th; awards post around the 18th and reach the operation the following day.',
    who: 'Every Flight Attendant — Lineholders and Reserves each bid, but PBS builds two different kinds of month.',
    purpose:
      'This is where your month is actually built. You describe what you want across 7 sequential preference layers (Layer 1 critical, Layers 2–6 progressive refinement, Layer 7 catch-all fallback), and PBS constructs a legal schedule for you in seniority order.',
    example:
      'Ana puts must-have weekends off in Layer 1, Latin America pairings in Layers 2–3, turns in Layers 4–5, and a broad domestic catch-all in Layer 7. PBS builds an 82-hour line honoring her top layers while keeping her legal.',
    changes: [
      'Produces your line of trips and days off, or your Reserve days and availability',
      'Becomes the baseline every later system trades against',
    ],
    icon: 'mdi-trophy-outline',
    color: '#003057',
    termId: 'pbs',
  },
  {
    id: 'tts',
    short: 'TTS',
    name: 'Trip Trade System',
    phase: 'Reshape the month',
    when: 'Nightly · 2300–0400 HBT',
    opens:
      'Opens once PBS awards are published (around the 20th of the prior month) and then runs every night from 2300 to 0400 Home Base Time through the end of the bid month.',
    who: 'Lineholders. Reserves can also use it for flying on their days off, and to request Golden Day / Flex Day trades.',
    purpose:
      'Your awarded line is a starting point, not a sentence. TTS lets you drop trips you do not want, pick up flying you do want, or swap one for the other — resolved by seniority, not by speed.',
    example:
      'Devon wants his nephew’s graduation on the 14th off. At 2200 he submits a TTS ballot to drop his 13th–15th sequence and pick up a 17th–19th turn instead. Overnight, seniority decides — and by 0400 the trade is in his schedule.',
    changes: [
      'Drops, adds, or swaps sequences on your published line',
      'Denied requests can roll to the UBL if you elected it',
    ],
    icon: 'mdi-swap-horizontal-circle-outline',
    color: '#0078D2',
    termId: 'tts',
  },
  {
    id: 'etb',
    short: 'ETB',
    name: 'Electronic Trade Board',
    phase: 'Reshape the month',
    when: 'Real time · all month',
    opens:
      'Live and continuous from the moment awards publish until the end of the month. Transactions simply queue while the nightly TTS run is processing.',
    who: 'Lineholders, and Reserves on eligible days off — anyone with a legal schedule to offer or room to accept.',
    purpose:
      'TTS is seniority and patience. ETB is the opposite: an open board where Flight Attendants hand trips directly to each other, first come, first served, validated the instant you click.',
    example:
      'Priya posts her 22nd–24th trip to the board at lunchtime. Jordan, who wanted exactly those dates, grabs it eight minutes later. Legality and credit window are checked on the click, and both schedules update immediately.',
    changes: [
      'Moves a sequence directly between two Flight Attendants',
      'Updates both schedules in real time once legality passes',
    ],
    icon: 'mdi-account-switch-outline',
    color: '#00857D',
    termId: 'etb',
  },
  {
    id: 'ubl',
    short: 'UBL',
    name: 'Unsuccessful Bidder’s List',
    phase: 'Reshape the month',
    when: 'After TTS · next 2 days',
    opens:
      'Runs immediately after each nightly TTS run, and only for Open Time sequences originating today or tomorrow. Next-day awards made before 1900 HBT are Auto Awards with no phone call; after 1900 HBT, and for any same-day sequence, they are Manual Awards handled by Crew Scheduling.',
    who: 'Flight Attendants whose TTS request lost and who elected to carry it to the UBL.',
    purpose:
      'Losing a TTS bid does not end the conversation. The UBL keeps you in line for near-term flying that is still uncovered, so a trip nobody won can still find a willing volunteer.',
    example:
      'Sam bids a Wednesday trip in Monday night’s TTS run and loses it on seniority. Because he elected the UBL, he stays in the queue — and when the winner drops it Tuesday afternoon, Sam gets an Auto Award at 1630 with no phone call.',
    changes: [
      'Awards near-term Open Time without a new bid from you',
      'Hands anything still uncovered to Reserve processing',
    ],
    icon: 'mdi-format-list-numbered',
    color: '#B75C09',
    termId: 'ubl',
  },
  {
    id: 'rota-future',
    short: 'ROTA',
    name: 'ROTA — future Reserve award',
    phase: 'Cover the month',
    when: 'Daily · 1500 HBT',
    opens:
      'Runs once a day, starting at 1500 HBT and finishing by 1930 HBT. Awards must be acknowledged by 2230 HBT; a RAP award needs no acknowledgement.',
    who: 'Reserves. You leave standing bids in place, and a bid entered for a specific day overrides the standing one.',
    purpose:
      'Tomorrow’s uncovered flying is handed to Reserves, in seniority order, before the day begins — so people know their next day instead of waiting by the phone.',
    example:
      'Lena is Reserve with a RAP tomorrow. Her standing bid asks for two-day trips to the West Coast. At 1500 today, ROTA awards her a LAX overnight departing tomorrow morning. She acknowledges it at 1800 and the day is settled.',
    changes: [
      'Awards tomorrow’s sequences, Standby shifts, and RAPs to Reserves',
      'Locks in the next day before the operation gets close',
    ],
    icon: 'mdi-calendar-clock-outline',
    color: '#C01933',
    termId: 'rota',
  },
  {
    id: 'rotd',
    short: 'ROTD',
    name: 'ROTD — day-of Reserve assignment',
    phase: 'Cover the month',
    when: 'Continuous · day of',
    opens:
      'Runs throughout the day, whenever new flying opens up after ROTA has finished — a sick call, a cancellation, a misconnect.',
    who: 'Reserves sitting on a Reserve Availability Period (RAP) today.',
    purpose:
      'Today is unpredictable. ROTD is the engine that matches whatever just broke to whoever is available, qualified, legal, and reachable right now.',
    example:
      'At 0940 a Flight Attendant calls in sick for an 1150 departure. ROTD looks at who is on RAP, works down seniority, and calls Marcus. He has 15 minutes to call back and about two hours to report.',
    changes: [
      'Assigns same-day sequences and Standby to Reserves on call',
      'Distinguishes what you bid for (award) from what you were given (assignment)',
    ],
    icon: 'mdi-phone-in-talk-outline',
    color: '#D14905',
    termId: 'rotd',
  },
  {
    id: 'rota-aggressive',
    short: 'Aggressive',
    name: 'ROTA Aggressive — volunteering for more',
    phase: 'Cover the month',
    when: 'Opt-in · with any ROTA/ROTD bid',
    opens:
      'Not a separate window. You attach waivers to a ROTA or ROTD bid to volunteer for flying the default rules would keep you away from.',
    who: 'Reserves who choose it. It is always voluntary — you are never involuntarily bid aggressively.',
    purpose:
      'The last line of coverage. By waiving things like 35-in-7 or reducing home-base rest toward the legal minimum, you make yourself eligible for trips nobody else can legally take.',
    example:
      'A trip leaves in 50 minutes and no Standby can reach the airport in time. Eve has an LMCO waiver set to :45, so she is eligible and is called first — Aggressive Reserve bids are awarded ahead of Standby for these Less Than Minimum Call-Out situations.',
    changes: [
      'Makes you eligible earlier, or for flying the default rules would block',
      'Ranks you ahead of Standby when the operation runs out of options',
    ],
    icon: 'mdi-rocket-launch-outline',
    color: '#177245',
    termId: 'aggressive-reserve',
  },
]

export const journeyPhases = [
  {
    name: 'Build the month',
    color: '#0061AB',
    icon: 'mdi-hammer-wrench',
    summary: 'Before the month starts, you place training, choose your status, and bid your schedule.',
  },
  {
    name: 'Reshape the month',
    color: '#0078D2',
    icon: 'mdi-swap-horizontal',
    summary: 'Once the award is published, you trade, drop, and pick up to make the month fit your life.',
  },
  {
    name: 'Cover the month',
    color: '#C01933',
    icon: 'mdi-shield-airplane-outline',
    summary: 'Whatever is still uncovered goes to Reserves — first for tomorrow, then for today.',
  },
] as const
