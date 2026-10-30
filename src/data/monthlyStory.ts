export interface MonthEvent {
  id: string
  start: number
  end: number
  kind: 'flying' | 'reserve' | 'training' | 'personal' | 'request' | 'off'
  label: string
  detail: string
}

interface CalendarChange {
  remove?: string[]
  add?: MonthEvent[]
}

export interface MonthChapter {
  id: string
  date: string
  day?: number
  title: string
  text: string
  timing?: string
  message?: { from: string; text: string }
  systems?: Array<{ name: string; lessonId: string }>
  change?: CalendarChange
  publishesSchedule?: boolean
  requiresEvent?: { id: string; otherwise: string }
  requiresChoices?: string[]
  choice?: {
    prompt: string
    options: Array<{ id: string; label: string; reply: string; change?: CalendarChange }>
  }
  branches?: Array<{ from: string; option: string; text: string; change?: CalendarChange }>
}

export interface MonthPersona {
  id: 'maya' | 'jordan'
  name: string
  role: 'Lineholder' | 'Reserve'
  intro: string
  home: string
  initialEvents: MonthEvent[]
  chapters: MonthChapter[]
}

const event = (id: string, start: number, end: number, kind: MonthEvent['kind'], label: string, detail: string): MonthEvent =>
  ({ id, start, end, kind, label, detail })
const school = event('school', 9, 9, 'personal', 'School play', 'School play and pickup at 15:15. Maya needs a backup if she is flying.')
const birthday = event('birthday', 22, 22, 'personal', 'Birthday', 'A family birthday dinner. Work can still change the plan.')
const cq = event('cq', 14, 14, 'training', 'CQ', 'Awarded recurrent training. Follow the actual class and reporting instructions.')
const trainingRequest = event('training-request', 14, 14, 'request', 'CQ preference', 'Requested class date, not yet an award.')
const build = (name: string) => ({ name, lessonId: 'build-the-month' })
const reshape = (name: string) => ({ name, lessonId: 'reshape-the-month' })
const cover = (name: string) => ({ name, lessonId: 'reserve-coverage' })

const mayaRoster: MonthEvent[] = [
  event('atl', 3, 5, 'flying', 'ATL trip', 'A three-day sequence. All route labels and dates in this story are fictional.'),
  event('bos', 9, 11, 'flying', 'BOS trip', 'This awarded sequence conflicts with the school play on October 9.'),
  event('mia', 20, 22, 'flying', 'MIA trip', 'Planned return on the birthday; release and getting home are not guaranteed.'),
  event('lax', 27, 29, 'flying', 'LAX trip', 'Another awarded multi-day sequence.'),
]
const reserveRoster: MonthEvent[] = [
  ...[[1, 4], [7, 10], [13, 15], [19, 22], [26, 29]].map(([start, end]) =>
    event(`reserve-${start}`, start, end, 'reserve', 'Reserve', 'Reserve duty day. A missing trip does not mean a day off.')),
]

export const monthlyPersonas: MonthPersona[] = [
  {
    id: 'maya', name: 'Maya', role: 'Lineholder',
    intro: 'A school play, a car repair, a birthday—and a month of flying in between.',
    home: 'Maya lives near base with Leo, her school-age son. Her neighbor can help with school pickup, but needs advance notice.',
    initialEvents: [school, birthday],
    chapters: [
      {
        id: 'kitchen-table', date: 'September 2 · planning October',
        title: 'Two calendars on the kitchen table',
        text: 'Leo circles October 9 on the calendar: his school play. Maya doesn’t know her October trips yet. First she opens TBS and picks October 14 for training.',
        timing: 'TBS cutoff: September 6, 12:00 DFW. Results: September 7.',
        message: { from: 'Leo', text: 'Will you be there for my play this time?' },
        systems: [build('TBS')], change: { add: [trainingRequest] },
      },
      {
        id: 'training-status', date: 'September 8 · checking training and status results',
        title: 'One date becomes real',
        text: 'TBS gives Maya the October 14 class. LRD shows she will be a Lineholder in October, so she will bid for fixed trips. Training is now on the calendar; her trips are not yet.',
        timing: 'TBS results and LRD cutoff: September 7.',
        systems: [build('TBS'), build('LRD')],
        change: { remove: ['training-request'], add: [cq] },
      },
      {
        id: 'bid-month', date: 'September 10 · submitting the October PBS bid',
        title: 'A birthday wish is not a day off',
        text: 'On September 10, PBS opens. Maya bids to keep October 9 and her birthday free, then checks the bid is saved. Seniority decides what she actually gets.',
        timing: 'PBS opens September 10 at 12:00 DFW. Cutoff: September 15 at 12:00 DFW. Preliminary awards: September 18 at 12:00 DFW; final awards: September 20 at 12:00 DFW.',
        systems: [build('PBS')],
      },
      {
        id: 'month-award', date: 'September 20 · checking the final October PBS award',
        title: 'The school play has company',
        text: 'On September 20, Maya verifies her final PBS award. The preliminary view was available September 18. Her October 9–11 trip still conflicts with Leo’s play. October TTS ballots now open, so she can save a trade request; processing starts later. Her neighbor is the backup plan.',
        timing: 'Final PBS awards and October TTS ballots: September 20 at 12:00 DFW. First TTS trip run: September 21 at 23:00 HBT; results by September 22 at 04:00 HBT. October ETB transactions open September 22 at 04:00 HBT.',
        publishesSchedule: true, change: { add: mayaRoster }, systems: [build('PBS')],
      },
      {
        id: 'first-trip', date: 'October 1 · living the already-awarded month', day: 1,
        title: 'October starts with trips already on the calendar',
        text: 'October starts with Maya’s trips already set from September. Her first trip is October 3–5. She arranges care for Leo.',
      },
      {
        id: 'trade-choice', date: 'October 5 · evening, Home Base Time', day: 5,
        title: 'Dance class, then a decision',
        text: 'Back from her trip, Maya finds an October 16–18 trip in TTS. She can ask to swap her October 9–11 trip for it.',
        timing: 'TTS cutoff: 23:00 HBT tonight. Results: 04:00 HBT tomorrow.',
        systems: [reshape('TTS')],
        choice: { prompt: 'How does Maya handle the school-play conflict?', options: [
          { id: 'trade', label: 'Request the trade; keep backup pickup for now', reply: 'She sends the trade request. Her October 9–11 trip stays on the calendar until the result.', change: { add: [event('trade-request', 9, 11, 'request', 'Trade pending', 'A linked TTS request is saved. This has not removed the BOS trip.')] } },
          { id: 'keep', label: 'Keep the trip and confirm the neighbor’s help', reply: 'No trade. Her neighbor will pick up Leo and film the play.' },
        ] },
      },
      {
        id: 'trade-result', date: 'October 6 · breakfast, after the overnight run', day: 6,
        title: 'Coffee before the school run',
        requiresChoices: ['trade-choice'],
        text: 'TTS ran overnight. Over coffee, Maya checks the result.',
        systems: [reshape('TTS')], change: { remove: ['trade-request'] },
        branches: [
          { from: 'trade-choice', option: 'trade', text: 'The trade is awarded. October 9–11 is gone and October 16–18 is added. She can go to the play.', change: { remove: ['bos'], add: [event('replacement', 16, 18, 'flying', 'New trip', 'Confirmed replacement in this story for the removed October 9–11 sequence.')] } },
          { from: 'trade-choice', option: 'keep', text: 'No trade, so October 9–11 stays. The neighbor plan is on.' },
        ],
      },
      {
        id: 'play-day', date: 'October 9 · the school play', day: 9,
        title: 'The same Friday, two possible evenings',
        requiresChoices: ['trade-choice'],
        text: 'Play day.',
        branches: [
          { from: 'trade-choice', option: 'trade', text: 'Maya is at school at 15:15 and takes a photo of Leo in his costume.' },
          { from: 'trade-choice', option: 'keep', text: 'Maya is on her trip. After work she watches the video her neighbor sent.' },
        ],
      },
      {
        id: 'peer-offer', date: 'October 12 · a message from a colleague', day: 12,
        title: '“Would you swap the late-month trip?”',
        text: 'A colleague asks Maya to swap trips: her October 27–29 trip for the colleague’s trip on the same dates. Trades between two flight attendants happen in ETB.',
        timing: 'ETB processes accepted, eligible transactions after system checks and approval. Transactions pause 23:00–04:00 HBT while TTS runs.',
        systems: [reshape('ETB')],
        choice: { prompt: 'Does she take the offered exchange?', options: [
          { id: 'accept', label: 'Complete ETB and verify the result', reply: 'They accept the exchange in ETB. In this example, it passes eligibility and legality checks and the system approves it. Maya verifies the updated schedule; agreement alone would not release her original trip.', change: { remove: ['lax'], add: [event('peer-trip', 27, 29, 'flying', 'Peer trip', 'ETB exchange confirmed in the story; dates are unchanged but the held sequence is different.')] } },
          { id: 'decline', label: 'Keep her existing trip', reply: 'Nothing changes. A chat message is not a trade.' },
        ] },
      },
      {
        id: 'cq-day', date: 'October 14 · training day', day: 14,
        title: 'A different kind of workday',
        text: 'Maya goes to the training class she got in September.',
        systems: [build('TBS')],
      },
      {
        id: 'drop-day-before', date: 'October 19 · before 15:00 HBT, the day before her MIA sequence', day: 19,
        title: 'Can Maya drop tomorrow’s sequence?',
        text: 'Maya wants to drop her October 20–22 MIA sequence. Its last TTS queue closed October 18 at 23:00 HBT. Before 15:00 HBT on October 19, she can still request an eligible UBL drop, subject to daily and monthly limits. An eligible same-base ETB drop is another route if a colleague accepts and the system approves it.',
        timing: 'UBL drop deadline: October 19 at 15:00 HBT for the October 20 origination. ETB transactions must complete by sequence sign-in and are paused 23:00–04:00 HBT. Until a drop is awarded or approved, Maya still holds the trip.',
        systems: [{ name: 'UBL', lessonId: 'near-term-open-time' }, reshape('ETB')],
        choice: { prompt: 'What does Maya do the day before?', options: [
          { id: 'ubl-day-before', label: 'Request an eligible UBL drop and check the result', reply: 'A request alone does not release her. In this fictional outcome, the request meets the coverage limits and is awarded in the applicable seniority order before the deadline. Maya verifies the confirmed drop.', change: { remove: ['mia'] } },
          { id: 'etb-day-before', label: 'Offer the sequence to a colleague in ETB', reply: 'In this fictional outcome, an eligible same-base colleague accepts and ETB approves the transaction. Maya verifies the updated schedule before considering herself released.', change: { remove: ['mia'] } },
          { id: 'keep-mia', label: 'Keep the sequence and prepare to report', reply: 'No confirmed change. Maya remains responsible for the MIA sequence.' },
        ] },
      },
      {
        id: 'same-day-drop', date: 'October 20 · 2–4 hours before departure', day: 20,
        title: 'A last-minute plan to drop the sequence',
        requiresEvent: { id: 'mia', otherwise: 'Maya no longer holds the MIA sequence after a confirmed drop. There is no remaining MIA assignment to drop today.' },
        text: 'Maya still holds the MIA sequence and wants to drop it a few hours before departure. Its TTS cutoff was October 18 at 23:00 HBT; the UBL drop deadline was October 19 at 15:00 HBT. The LMCO UBL process is for eligible pickups, not drops. An eligible ETB peer drop must be accepted and approved by sequence sign-in.',
        timing: 'If no change is confirmed, she remains assigned. If illness or an operational disruption means she cannot perform the duty, she contacts Crew Scheduling immediately and follows its instructions.',
        systems: [reshape('ETB'), reshape('TTS'), { name: 'UBL', lessonId: 'near-term-open-time' }],
        choice: { prompt: 'Is the sequence actually released?', options: [
          { id: 'etb-same-day', label: 'ETB confirms an eligible peer drop before report', reply: 'In this illustrative outcome, the colleague accepts and the system confirms the drop. Maya checks the schedule and keeps the confirmation.', change: { remove: ['mia'] } },
          { id: 'no-same-day-drop', label: 'No drop is confirmed before report', reply: 'MIA remains on Maya’s schedule, so she reports as assigned. If an emergency makes her unable to work, she contacts Crew Scheduling immediately; an unconfirmed request is not a release.' },
        ] },
      },
      {
        id: 'repair-bill', date: 'October 21 · evening', day: 21,
        title: 'An unwelcome repair estimate',
        text: 'A car repair bill arrives. Maya sees a Red Flag (extra-pay) trip on October 24, a free day she planned to spend with Leo.',
        timing: 'The last TTS queue for the October 24 sequence closes October 22 at 23:00 HBT, with results by October 23 at 04:00. Earlier nightly runs may also consider it. An unsuccessful request can transfer to UBL only if October 24 is the first day of that TTS processing range, the request is eligible, and Maya elected UBL participation.',
        systems: [reshape('TTS'), { name: 'Red Flag', lessonId: 'payroll' }],
        choice: { prompt: 'What matters more this time?', options: [
          { id: 'pickup', label: 'Request the premium pickup and arrange care', reply: 'She requests it in TTS and turns on UBL as a backup. The trip is not hers yet.', change: { add: [event('premium-request', 24, 24, 'request', 'Pickup pending', 'Requested Red Flag pickup. No award or income is assumed.')] } },
          { id: 'home', label: 'Keep the day at home and use savings', reply: 'No request. October 24 stays a family day.' },
        ] },
      },
      {
        id: 'birthday-delay', date: 'October 22 · a missed report during the trip', day: 22,
        title: 'She misses her working flight—what now?',
        requiresEvent: { id: 'mia', otherwise: 'Maya already dropped the MIA sequence with confirmation. She is not on that trip, so this missed-report event does not occur and no recovery duty is added. Any separate October 24 pickup request keeps its own processing timeline.' },
        text: 'On her birthday, Maya’s ride from the hotel breaks down and she misses her working flight. She calls Crew Scheduling/Tracking right away. This is not a TTS drop or an automatic day off. In this example, the crew desk confirms revised duty instructions and a later flight home.',
        timing: 'Call as soon as you might be late. Any attendance review depends on what happened.',
        message: { from: 'Home', text: 'We saved you cake. Let us know when you actually get home.' },
        change: { add: [event('delay', 22, 22, 'flying', 'Recovery duty', 'Missed report on the original working flight. The crew desk confirms revised instructions and a later return in this fictional outcome; not an automatic day off.')] },
        systems: [{ name: 'Crew Scheduling / Tracking', lessonId: 'crew-management' }],
        branches: [
          { from: 'repair-bill', option: 'pickup', text: 'Her separate October 24 pickup was not awarded in the earlier TTS run. She keeps the request and UBL election active for tonight’s TTS run; it is not on UBL yet.' },
          { from: 'repair-bill', option: 'home', text: 'Dinner starts without her. There is no optional October 24 pickup request.' },
        ],
      },
      {
        id: 'deadhead', date: 'October 22 · a cancellation changes the plan', day: 22,
        title: 'What is a deadhead?',
        requiresEvent: { id: 'mia', otherwise: 'Maya already dropped the MIA sequence. This cancellation and Company-directed positioning do not apply to her current schedule; no deadhead assignment is added.' },
        text: 'Later that day, a cancellation disrupts Maya’s return. Crew Scheduling directs her to travel as a passenger on another flight back to base. This Company-directed travel is a deadhead: she is travelling for work, but is not operating that flight as crew.',
        timing: 'The calendar now shows the confirmed deadhead home. Follow Crew Scheduling’s revised report and release instructions. A deadhead is not a TTS drop or an automatic release from other duty.',
        systems: [{ name: 'Crew Scheduling / Tracking', lessonId: 'crew-management' }],
        change: { add: [event('deadhead-home', 22, 22, 'flying', 'Deadhead home', 'Confirmed Company-directed passenger travel back to base in this fictional recovery. Follow the revised duty and release instructions.')] },
      },
      {
        id: 'near-term-result', date: 'October 23 · afternoon errands', day: 23,
        title: 'A check while safely parked',
        requiresChoices: ['repair-bill'],
        text: 'Home again, Maya reviews her confirmed schedule and plans for October 24.',
        timing: 'The initial UBL pass follows TTS awards by 04:00 HBT. After that, eligible newly available trips are processed immediately; LMCO UBL is the separate pickup path close to departure.',
        systems: [{ name: 'UBL', lessonId: 'near-term-open-time' }],
        change: { remove: ['premium-request'] },
        branches: [
          { from: 'repair-bill', option: 'pickup', text: 'The October 22 nightly TTS run did not award her October 24 pickup. On October 23, the request transfers to UBL because October 24 is the first day of that TTS processing range and Maya elected participation in UBL. UBL awards the Red Flag trip that afternoon. She checks the confirmed assignment and arranges care for Leo.', change: { add: [event('premium-trip', 24, 24, 'flying', 'Red Flag trip', 'Eligible pickup awarded through UBL in this story; verify designation, duty and pay treatment.')] } },
          { from: 'repair-bill', option: 'home', text: 'No request, no extra trip. She plans a slow breakfast with Leo.' },
        ],
      },
      {
        id: 'month-close', date: 'October 31 · a quieter evening', day: 31,
        title: 'What the calendar cannot show by itself',
        requiresChoices: ['trade-choice', 'peer-offer', 'repair-bill'],
        text: 'Maya looks back at training, trips and family help. She checks her pay matches what she flew.',
        systems: [{ name: 'Pay and credit', lessonId: 'payroll' }],
        branches: [
          { from: 'trade-choice', option: 'trade', text: 'Her confirmed TTS trade freed October 9 for the school play.' },
          { from: 'trade-choice', option: 'keep', text: 'She kept the October 9–11 trip and relied on her neighbor for the school play.' },
          { from: 'peer-offer', option: 'accept', text: 'Her approved ETB exchange changed the late-month sequence, not its dates.' },
          { from: 'peer-offer', option: 'decline', text: 'She declined the ETB exchange and kept her original late-month trip.' },
          { from: 'repair-bill', option: 'pickup', text: 'The Red Flag trip pays 150% and counts 100% toward her credit.' },
          { from: 'repair-bill', option: 'home', text: 'She chose the family day, so there is no additional pay from this optional pickup.' },
        ],
      },
    ],
  },
  {
    id: 'jordan', name: 'Jordan', role: 'Reserve',
    intro: 'Shared childcare, an appointment, and a month that cannot be planned from trips alone.',
    home: 'Jordan and his partner share daycare pickup. On reserve days, they need a plan even when no specific trip is showing.',
    initialEvents: [
      event('appointment', 19, 19, 'personal', 'Appointment', 'An appointment Jordan hopes to attend; it does not excuse reserve duty.'),
      birthday,
    ],
    chapters: [
      {
        id: 'kitchen-table', date: 'September 5 · planning October',
        title: '“Which days can you do pickup?”',
        text: 'Jordan can’t answer yet—October isn’t built. He submits training preferences in TBS and an eligible status preference in LRD. That preference does not guarantee his status; he must check the confirmed result before PBS bidding.',
        timing: 'TBS cutoff: September 6, 12:00 DFW. LRD cutoff: September 7.',
        message: { from: 'His partner', text: 'Let’s pencil in daycare help first and confirm after the award.' },
        systems: [build('TBS'), build('LRD')], change: { add: [trainingRequest] },
      },
      {
        id: 'bid-month', date: 'September 10 · submitting the October PBS bid',
        title: 'Days off matter before trips appear',
        text: 'On September 10, Jordan sees TBS gave him October 14 for training and checks his confirmed Reserve status on the PBS dashboard. PBS opens and he bids for the days off he wants.',
        timing: 'PBS opens September 10 at 12:00 DFW. Cutoff: September 15 at 12:00 DFW. Preliminary awards: September 18 at 12:00 DFW; final awards: September 20 at 12:00 DFW.',
        systems: [build('PBS')], change: { remove: ['training-request'], add: [cq] },
      },
      {
        id: 'month-award', date: 'September 20 · checking the final October PBS award',
        title: 'A month of availability, not an empty calendar',
        text: 'On September 20, Jordan verifies his final PBS award of October Reserve days and days off. The September 18 preliminary view was not final. Specific Reserve trips come later, through ROTA and ROTD.',
        timing: 'Final PBS awards: September 20 at 12:00 DFW. Golden/Flex designation and Reserve days-off trade ballots open then; the first days-off trade run is September 24 at 23:00 HBT.',
        systems: [build('PBS')], publishesSchedule: true, change: { add: reserveRoster },
      },
      {
        id: 'day-designations', date: 'September 21 · designating October days off',
        title: 'A family visit needs the right kind of day off',
        text: 'Family visits October 17–18. In GDFD, Jordan marks those days off as Golden (more protected). Some other days off become Flex. The dates don’t move.',
        timing: 'GDFD opens September 20 at 12:00 DFW after final PBS awards and closes September 27 at 12:00 DFW.',
        systems: [cover('GDFD')],
        change: { add: [
          ...[5, 6, 11, 12, 17, 18, 30, 31].map((day) => event(`golden-${day}`, day, day, 'off', 'Golden', 'Golden Day designation in this story; voluntary work requires the applicable consent and rules.')),
          ...[16, 23, 24, 25].map((day) => event(`flex-${day}`, day, day, 'off', 'Flex', 'Flex Day designation in this story, subject to applicable assignment rules.')),
        ] },
      },
      {
        id: 'reserve-morning', date: 'October 1 · breakfast at home', day: 1,
        title: 'Breakfast is not proof of a free day',
        text: 'October 1 is a Reserve day. No trip is showing, but Jordan must stay available. A backup caregiver handles pickup.',
        systems: [cover('ROTD')],
      },
      {
        id: 'next-day-bid', date: 'October 6 · before 15:00 HBT', day: 6,
        title: 'An afternoon question at the kitchen sink',
        text: 'Tomorrow is a Reserve day. Jordan submits his daily ROTA bid by 15:00 HBT, listing a specific sequence or other preferences. He can also bid for a standby shift or RAP. These are inputs to future processing, not a booked trip.',
        timing: 'Daily bid cutoff: 15:00 HBT for sequences reporting from 02:00 tomorrow through 01:59 the following day. ROTA future processing begins at 15:00; assignments publish by 19:30 HBT.',
        systems: [cover('ROTA')],
        choice: { prompt: 'How do they arrange tomorrow’s childcare?', options: [
          { id: 'backup', label: 'Keep backup care through the reserve obligation', reply: 'Backup care stays booked, whatever ROTA assigns.' },
          { id: 'check', label: 'Review the award together before confirming care', reply: 'They wait for the 19:30 result before deciding.' },
        ] },
      },
      {
        id: 'next-day-result', date: 'October 6 · after the ROTA result, by 19:30 HBT', day: 6,
        title: 'A preference becomes an assignment only after processing',
        requiresChoices: ['next-day-bid'],
        text: 'At 15:00, future Reserve processing begins. Open sequence positions still unawarded after UBL are offered or assigned to legal and available Reserves under the applicable grouping and bid rules. In this example, ROTA awards Jordan the sequence he preferred for October 7–8; that outcome is illustrative, not guaranteed. October 9–10 remain Reserve days.',
        timing: 'Sequence, standby and RAP assignments publish by 19:30 HBT. Acknowledge through the automated system before 22:30 HBT. If on a sequence and unavailable before that deadline, review and acknowledge no later than one hour after release.',
        systems: [cover('ROTA')],
        change: { add: [event('reserve-trip', 7, 8, 'flying', 'Assigned trip', 'Illustrative two-day ROTA award. Review actual report, release and acknowledgement requirements.')] },
      },
      {
        id: 'day-of-change', date: 'October 9 · 09:00 HBT, illustrative same-day opening', day: 9,
        title: 'UBL first, then ROTD for a same-day trip',
        text: 'A sequence opening for today is not assigned straight to a Reserve. Crew Scheduling first runs the applicable UBL process for eligible bidders, including a rerun immediately before ROTD. If the trip is still open, ROTD assigns it through the applicable Reserve priority order. Jordan receives the illustrative trip and his partner handles pickup.',
        timing: 'ROTD is event-triggered. Normally assignment follows within 60 minutes after the first UBL run ends; trips opening less than 3 hours before departure (4 at co-terminal bases) follow UBL immediately. Trips opening 00:01–05:00 HBT and departing after 11:00 HBT may be held until 07:00 HBT; that exception does not apply to this 09:00 opening.',
        systems: [{ name: 'UBL', lessonId: 'near-term-open-time' }, cover('ROTD')],
        change: { add: [event('same-day-trip', 9, 9, 'flying', 'ROTD trip', 'Illustrative same-day sequence assigned through ROTD after required UBL processing. Follow the actual contact, acknowledgement and report instructions. ROTD can also assign standby shifts.')] },
      },
      {
        id: 'volunteer', date: 'October 10 · during his Reserve Availability Period (RAP)', day: 10,
        title: 'Available does not mean “select everything”',
        text: 'October 10 is a Reserve day. During his RAP, Jordan considers eligible aggressive preferences for today’s ROTD processing. Aggressive Reserve applies in ROTA / ROTD, not a separate system. Tomorrow is a Golden Day; today’s election does not automatically make it available.',
        systems: [cover('Aggressive Reserve')],
        choice: { prompt: 'What does he choose today?', options: [
          { id: 'standard', label: 'Keep the standard reserve conditions', reply: 'He leaves it off. Nothing changes.' },
          { id: 'volunteer', label: 'Review and save only an election he can accept', reply: 'He saves eligible ROTD aggressive preferences for today and reviews his availability and applicable rules. This requests priority consideration, not a guaranteed or better trip. He keeps following his existing Reserve obligations.' },
        ] },
      },
      {
        id: 'appointment-request', date: 'October 12 · looking ahead', day: 12,
        title: 'The appointment is getting closer',
        text: 'Jordan has an appointment on October 19, a Reserve day. In TTS he can ask to swap it for his October 25 day off.',
        timing: 'Day-off trades must be in by 23:00 HBT, two days before the date.',
        systems: [cover('TTS (October)')],
        choice: { prompt: 'What does Jordan do about the appointment?', options: [
          { id: 'request', label: 'Request the day-off trade in TTS', reply: 'He sends it tonight. October 19 stays a Reserve day until the result.', change: { add: [event('rtdo-request', 19, 19, 'request', 'Off-day request', 'TTS day-off trade pending. October 19 remains a reserve day until a change is confirmed.')] } },
          { id: 'reschedule', label: 'Keep the roster and move the appointment', reply: 'No trade. He moves the appointment to a day off.' },
        ] },
      },
      {
        id: 'appointment-result', date: 'October 13 · after processing', day: 13,
        title: 'A date changes only after the result',
        requiresChoices: ['appointment-request'],
        text: 'Jordan checks the TTS result.',
        timing: 'TTS results: 04:00 HBT.',
        systems: [cover('TTS (October)')], change: { remove: ['rtdo-request'] },
        branches: [
          { from: 'appointment-request', option: 'request', text: 'Awarded. October 19 is now a day off and October 25 is a Reserve day. The new October 17–19 block is designated Flex, Golden, Golden so Flex comes before Golden and the monthly totals stay unchanged. He keeps the appointment.', change: { add: [
            event('flex-17', 17, 17, 'off', 'Flex · redesignated', 'After the trade, October 17 changes from Golden to Flex so Flex precedes Golden in the October 17–19 block.'),
            event('swapped-off', 19, 19, 'off', 'Golden · traded', 'TTS day-off exchange confirmed in this fictional outcome. October 19 is Golden; October 17 becomes Flex to preserve the designation totals and order.'),
            event('swapped-duty', 25, 25, 'reserve', 'Reserve · traded', 'Reserve duty replaces the old October 25 Flex Day.'),
          ], remove: ['flex-25', 'golden-17'] } },
          { from: 'appointment-request', option: 'reschedule', text: 'No trade, so nothing changes. The appointment moves.', change: { remove: ['appointment'] } },
        ],
      },
      {
        id: 'training', date: 'October 14 · CQ day', day: 14,
        title: 'Training has been on the calendar all along',
        text: 'Jordan goes to the training class he got in September.',
        systems: [build('TBS')],
      },
      {
        id: 'peer-day', date: 'October 23 · comparing calendars', day: 23,
        title: 'A colleague offers a different route',
        text: 'A colleague asks Jordan to trade days off in ETB. It doesn’t fit his plans, so he says no. Nothing changes.',
        systems: [reshape('ETB')],
      },
      {
        id: 'extra-income', date: 'October 29 · after duty', day: 29,
        title: 'One more trip—or a day together?',
        text: 'A bill arrives. There is a Red Flag (extra-pay) trip on October 30, one of Jordan’s days off.',
        systems: [{ name: 'UBL', lessonId: 'near-term-open-time' }, { name: 'Red Flag', lessonId: 'payroll' }],
        choice: { prompt: 'How does he use tomorrow?', options: [
          { id: 'pickup', label: 'Submit an eligible UBL late bid and check the result', reply: 'He submits an eligible late bid for tomorrow’s trip through the UBL process and reviews the day-off pickup and rest restrictions. Submitting does not guarantee an award. In this fictional outcome, he checks a confirmed award before planning to fly.', change: { remove: ['golden-30'], add: [event('reserve-premium', 30, 30, 'flying', 'Day-off pickup', 'Voluntary eligible Red Flag pickup confirmed after a UBL late bid in this story; pay-no-credit above the reserve guarantee, not a reserve-availability assignment.')] } },
          { id: 'home', label: 'Keep the Golden Day with family', reply: 'No request. October 30 stays a day off.' },
        ] },
      },
      {
        id: 'month-close', date: 'October 31 · looking back', day: 31,
        title: 'A reserve month was never an empty month',
        requiresChoices: ['appointment-request', 'extra-income'],
        text: 'Jordan looks back: Reserve days became a future trip and a same-day trip, and training stayed put. He checks his pay.',
        systems: [{ name: 'Pay and credit', lessonId: 'payroll' }],
        branches: [
          { from: 'appointment-request', option: 'request', text: 'His approved day-off trade let him keep the October 19 appointment and made October 25 a Reserve day.' },
          { from: 'appointment-request', option: 'reschedule', text: 'He kept his original Reserve line and moved the appointment instead of trading days off.' },
          { from: 'extra-income', option: 'pickup', text: 'His eligible day-off Red Flag pickup pays 150% as pay-no-credit above his reserve guarantee. It does not add credit toward meeting the guarantee or calling out of time; projection and TTS-window accounting are separate.' },
          { from: 'extra-income', option: 'home', text: 'There is no additional pay from this optional pickup; the family kept its day together.' },
        ],
      },
    ],
  },
]

function applyChange(events: MonthEvent[], change?: CalendarChange): MonthEvent[] {
  if (!change) return events
  const removed = new Set([...(change.remove ?? []), ...(change.add ?? []).map((item) => item.id)])
  return [...events.filter((item) => !removed.has(item.id)), ...(change.add ?? [])]
}

export function scenarioEntryIndex(persona: MonthPersona, chapterIndex: number, choices: Record<string, string>): number {
  const chapter = persona.chapters[chapterIndex]
  if (!chapter) return -1
  const missing = new Set((chapter.requiresChoices ?? []).filter((id) =>
    !persona.chapters.find((item) => item.id === id)?.choice?.options.some((option) => option.id === choices[id])))
  const prerequisiteIndex = persona.chapters.findIndex((item, index) => index < chapterIndex && missing.has(item.id))
  return prerequisiteIndex < 0 ? chapterIndex : prerequisiteIndex
}

export function chapterForEvents(chapter: MonthChapter, events: MonthEvent[]): MonthChapter {
  const required = chapter.requiresEvent
  if (!required || events.some((item) => item.id === required.id)) return chapter
  return {
    ...chapter,
    title: 'Sequence already released',
    text: required.otherwise,
    timing: undefined,
    message: undefined,
    systems: [],
    change: undefined,
    choice: undefined,
    branches: [],
  }
}

export function monthSnapshot(persona: MonthPersona, chapterIndex: number, choices: Record<string, string>) {
  let events = [...persona.initialEvents]
  let published = false
  for (const storedChapter of persona.chapters.slice(0, chapterIndex + 1)) {
    const chapter = chapterForEvents(storedChapter, events)
    published ||= Boolean(chapter.publishesSchedule)
    events = applyChange(events, chapter.change)
    for (const branch of chapter.branches ?? []) {
      if (choices[branch.from] === branch.option) events = applyChange(events, branch.change)
    }
    const option = chapter.choice?.options.find((item) => item.id === choices[chapter.id])
    events = applyChange(events, option?.change)
  }
  return { events, published }
}

export function eventsForDay(events: MonthEvent[], day: number): MonthEvent[] {
  const matching = events.filter((item) => item.start <= day && item.end >= day)
  // Later confirmed duty replaces earlier duty for the date; personal plans and requests remain visible.
  const duty = matching.filter((item) => item.kind !== 'personal' && item.kind !== 'request')
  const training = duty.find((item) => item.kind === 'training')
  return [
    ...(training ? [training] : duty.slice(-1)),
    ...matching.filter((item) => item.kind === 'personal' || item.kind === 'request'),
  ]
}
