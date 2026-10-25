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
        timing: 'PBS opens September 10 at 12:00 DFW. Cutoff: September 15 at 12:00 DFW. Results: September 18.',
        systems: [build('PBS')],
      },
      {
        id: 'month-award', date: 'September 18 · checking the October PBS award',
        title: 'The school play has company',
        text: 'On September 18, Maya opens PBS and sees her October trips. One trip, October 9–11, falls on Leo’s play. TTS is now open, so she can try to trade it. Her neighbor is the backup plan.',
        timing: 'PBS results: September 18, after 12:00 DFW. Lineholders can now use TTS for October.',
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
        timing: 'ETB works right away, except 23:00–04:00 HBT while TTS runs.',
        systems: [reshape('ETB')],
        choice: { prompt: 'Does she take the offered exchange?', options: [
          { id: 'accept', label: 'Complete ETB and verify the result', reply: 'They both complete it in ETB. Maya’s schedule updates right away.', change: { remove: ['lax'], add: [event('peer-trip', 27, 29, 'flying', 'Peer trip', 'ETB exchange confirmed in the story; dates are unchanged but the held sequence is different.')] } },
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
        id: 'repair-bill', date: 'October 21 · after duty', day: 21,
        title: 'An unwelcome repair estimate',
        text: 'A car repair bill arrives. Maya sees a Red Flag (extra-pay) trip on October 24, a free day she planned to spend with Leo.',
        timing: 'TTS cutoff: 23:00 HBT tonight. Results: 04:00 HBT. If not awarded, the request can move to UBL.',
        systems: [reshape('TTS'), { name: 'Red Flag', lessonId: 'payroll' }],
        choice: { prompt: 'What matters more this time?', options: [
          { id: 'pickup', label: 'Request the premium pickup and arrange care', reply: 'She requests it in TTS and turns on UBL as a backup. The trip is not hers yet.', change: { add: [event('premium-request', 24, 24, 'request', 'Pickup pending', 'Requested Red Flag pickup. No award or income is assumed.')] } },
          { id: 'home', label: 'Keep the day at home and use savings', reply: 'No request. October 24 stays a family day.' },
        ] },
      },
      {
        id: 'birthday-delay', date: 'October 22 · a missed report during the trip', day: 22,
        title: 'She misses her working flight—what now?',
        text: 'On her birthday, Maya’s ride from the hotel breaks down and she misses her flight. She calls Crew Scheduling/Tracking right away. This is not a TTS drop or an automatic day off—the crew desk decides what happens next.',
        timing: 'Call as soon as you might be late. Any attendance review depends on what happened.',
        message: { from: 'Home', text: 'We saved you cake. Let us know when you actually get home.' },
        change: { add: [event('delay', 22, 22, 'flying', 'Recovery duty', 'Missed report on the original working flight. The crew desk confirms revised instructions and a later return in this fictional outcome; not an automatic day off.')] },
        systems: [{ name: 'Crew Scheduling / Tracking', lessonId: 'crew-management' }],
        branches: [
          { from: 'repair-bill', option: 'pickup', text: 'The crew desk confirms revised duty instructions and a later flight home. Her October 24 pickup was not awarded in TTS, so it is waiting in UBL.' },
          { from: 'repair-bill', option: 'home', text: 'The crew desk confirms revised duty instructions and a later flight home. Dinner starts without her.' },
        ],
      },
      {
        id: 'near-term-result', date: 'October 23 · afternoon errands', day: 23,
        title: 'A check while safely parked',
        text: 'Home again, Maya checks tomorrow’s plan.',
        timing: 'UBL covers trips leaving today or tomorrow.',
        systems: [{ name: 'UBL', lessonId: 'near-term-open-time' }],
        change: { remove: ['premium-request'] },
        branches: [
          { from: 'repair-bill', option: 'pickup', text: 'UBL gives Maya the October 24 Red Flag trip. She arranges care for Leo.', change: { add: [event('premium-trip', 24, 24, 'flying', 'Red Flag trip', 'Eligible pickup awarded through UBL in this story; verify designation, duty and pay treatment.')] } },
          { from: 'repair-bill', option: 'home', text: 'No request, no extra trip. She plans a slow breakfast with Leo.' },
        ],
      },
      {
        id: 'month-close', date: 'October 31 · a quieter evening', day: 31,
        title: 'What the calendar cannot show by itself',
        text: 'Maya looks back: training, trips, a trade and family help. She checks her pay matches what she flew.',
        systems: [{ name: 'Pay and credit', lessonId: 'payroll' }],
        branches: [
          { from: 'repair-bill', option: 'pickup', text: 'The Red Flag trip pays 150% and counts 100% toward her credit.' },
          { from: 'repair-bill', option: 'home', text: 'No extra pay this month—she chose the family day.' },
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
        text: 'Jordan can’t answer yet—October isn’t built. He picks a training date in TBS and sets LRD. He will be a Reserve: on-call days, not fixed trips.',
        timing: 'TBS cutoff: September 6, 12:00 DFW. LRD cutoff: September 7.',
        message: { from: 'His partner', text: 'Let’s pencil in daycare help first and confirm after the award.' },
        systems: [build('TBS'), build('LRD')], change: { add: [trainingRequest] },
      },
      {
        id: 'bid-month', date: 'September 10 · submitting the October PBS bid',
        title: 'Days off matter before trips appear',
        text: 'On September 10, Jordan sees TBS gave him October 14 for training. PBS opens and he bids for the days off he wants.',
        timing: 'PBS opens September 10 at 12:00 DFW. Cutoff: September 15 at 12:00 DFW. Results: September 18.',
        systems: [build('PBS')], change: { remove: ['training-request'], add: [cq] },
      },
      {
        id: 'month-award', date: 'September 18 · checking the October PBS award',
        title: 'A month of availability, not an empty calendar',
        text: 'On September 18, Jordan opens PBS and sees his October Reserve days and days off. Trips come later, through ROTA and ROTD.',
        timing: 'PBS results: September 18, after 12:00 DFW.',
        systems: [build('PBS')], publishesSchedule: true, change: { add: reserveRoster },
      },
      {
        id: 'day-designations', date: 'September 21 · designating October days off',
        title: 'A family visit needs the right kind of day off',
        text: 'Family visits October 17–18. In GDFD, Jordan marks those days off as Golden (more protected). Some other days off become Flex. The dates don’t move.',
        timing: 'GDFD opens after PBS results.',
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
        text: 'Tomorrow is a Reserve day. Before 15:00, Jordan tells ROTA which trip he’d like tomorrow.',
        timing: 'ROTA cutoff: 15:00 HBT. Results: 19:30 HBT.',
        systems: [cover('ROTA')],
        choice: { prompt: 'How do they arrange tomorrow’s childcare?', options: [
          { id: 'backup', label: 'Keep backup care through the reserve obligation', reply: 'Backup care stays booked, whatever ROTA assigns.' },
          { id: 'check', label: 'Review the award together before confirming care', reply: 'They wait for the 19:30 result before deciding.' },
        ] },
      },
      {
        id: 'next-day-result', date: 'October 6 · after the ROTA result, by 19:30 HBT', day: 6,
        title: 'Tomorrow is now more specific',
        text: 'ROTA gives Jordan a two-day trip on October 7–8. He confirms it. October 9–10 are still Reserve days.',
        timing: 'Confirm the trip by 22:30 HBT.',
        systems: [cover('ROTA')],
        change: { add: [event('reserve-trip', 7, 8, 'flying', 'Assigned trip', 'Illustrative two-day ROTA award. Review actual report, release and acknowledgement requirements.')] },
      },
      {
        id: 'day-of-change', date: 'October 9 · a change during breakfast', day: 9,
        title: 'The phone is part of today’s plan',
        text: 'At breakfast, ROTD assigns Jordan airport standby for today. His partner handles pickup.',
        timing: 'ROTD has no fixed time—it assigns whenever same-day help is needed.',
        systems: [cover('ROTD')],
        change: { add: [event('standby', 9, 9, 'reserve', 'Standby', 'Airport standby in this story. Follow current report and assignment instructions, not a generic call-out estimate.')] },
      },
      {
        id: 'volunteer', date: 'October 10 · before considering another bid', day: 10,
        title: 'Available does not mean “select everything”',
        text: 'Jordan could turn on Aggressive Reserve in his ROTA bid to say he’s willing to take more assignments. It is a setting, not its own system.',
        systems: [cover('Aggressive Reserve')],
        choice: { prompt: 'What does he choose today?', options: [
          { id: 'standard', label: 'Keep the standard reserve conditions', reply: 'He leaves it off. Nothing changes.' },
          { id: 'volunteer', label: 'Review and save only an election he can accept', reply: 'He turns it on. It doesn’t guarantee a better trip.' },
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
        text: 'Jordan checks the TTS result.',
        timing: 'TTS results: 04:00 HBT.',
        systems: [cover('TTS (October)')], change: { remove: ['rtdo-request'] },
        branches: [
          { from: 'appointment-request', option: 'request', text: 'Awarded. October 19 is now a day off and October 25 is a Reserve day. He keeps the appointment.', change: { add: [event('swapped-off', 19, 19, 'off', 'Flex · traded', 'TTS day-off exchange confirmed in this fictional outcome.'), event('swapped-duty', 25, 25, 'reserve', 'Reserve · traded', 'Reserve duty replaces the old October 25 Flex Day.')], remove: ['flex-25'] } },
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
          { id: 'pickup', label: 'Request the trip', reply: 'He requests it. Because it leaves tomorrow, it goes through UBL—and he gets it.', change: { remove: ['golden-30'], add: [event('reserve-premium', 30, 30, 'flying', 'Day-off pickup', 'Voluntary eligible Red Flag pickup confirmed in the story; not a reserve-availability assignment.')] } },
          { id: 'home', label: 'Keep the Golden Day with family', reply: 'No request. October 30 stays a day off.' },
        ] },
      },
      {
        id: 'month-close', date: 'October 31 · looking back', day: 31,
        title: 'A reserve month was never an empty month',
        text: 'Jordan looks back: Reserve days became a trip and standby, he traded a day off, and training stayed put. He checks his pay.',
        systems: [{ name: 'Pay and credit', lessonId: 'payroll' }],
        branches: [
          { from: 'extra-income', option: 'pickup', text: 'The Red Flag trip on his day off pays 150% and counts 100% toward credit.' },
          { from: 'extra-income', option: 'home', text: 'No extra pay—the family kept its day together.' },
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

export function monthSnapshot(persona: MonthPersona, chapterIndex: number, choices: Record<string, string>) {
  let events = [...persona.initialEvents]
  let published = false
  for (const chapter of persona.chapters.slice(0, chapterIndex + 1)) {
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
