import { monthSnapshot, type MonthPersona } from './monthlyStory'

export const systemGuide: Record<string, { name: string; simple: string }> = {
  TBS: { name: 'Training Bidding System', simple: 'Pick your training dates.' },
  LRD: { name: 'Lineholder / Reserve Designator', simple: 'Submit an eligible Lineholder/Reserve preference, then check your confirmed status before PBS bidding.' },
  PBS: { name: 'Preferential Bidding System', simple: 'Bid for next month’s trips and days off.' },
  GDFD: { name: 'Golden / Flex Day designation', simple: 'Reserves label days off as Golden or Flex.' },
  TTS: { name: 'Trip Trade System', simple: 'Change your month with the Company—Lineholders and Reserves.' },
  ETB: { name: 'Electronic Trade Board', simple: 'Trade directly with another flight attendant.' },
  UBL: { name: 'Unsuccessful Bidders List', simple: 'An unsuccessful TTS request carries to UBL only if its sequence originates on the first day of that processing range and the bidder elected UBL; late bids follow a separate path.' },
  ROTA: { name: 'Reserve future processing', simple: 'Reserves bid preferences; ROTA assigns future open work remaining after UBL.' },
  ROTD: { name: 'Reserve day-of processing', simple: 'After UBL, ROTD assigns remaining same-day and next-day trips or standby to Reserves.' },
  RTDO: { name: 'Reserve Trade Days Off', simple: 'Ask the Company to exchange a reserve duty day and a day off—not swap a flight.' },
  'TTS (October)': { name: 'Trip Trade System opens for October', simple: 'Lineholders change trips. Eligible Reserves can also change day-off trips and request days-off trades in TTS.' },
  'Aggressive Reserve': { name: 'Voluntary reserve option', simple: 'Volunteer for priority consideration in ROTA / ROTD, subject to eligibility and saved preferences.' },
  'Red Flag': { name: 'Extra-pay trip label', simple: 'Trips that pay more. Pick up through TTS or UBL.' },
}

export const applicationFor: Record<string, string> = {
  TBS: 'TBS', LRD: 'LRD', PBS: 'PBS', GDFD: 'GDFD',
  TTS: 'TTS', ETB: 'ETB', UBL: 'TTS', ROTA: 'ROTA', ROTD: 'ROTD',
  RTDO: 'TTS', 'TTS (October)': 'TTS', 'Aggressive Reserve': 'ROTA / ROTD', 'Red Flag': 'TTS',
}

export const calendarReferences = [
  { label: 'APFA: reserve days-off trades in TTS (September 2025 implementation)', url: 'https://www.apfa.org/2025/09/19/9-19-25-contract-implementation-update-40-1-october-2025-reserve-updates-part-i/' },
  { label: 'APFA: bidding timeline and reserve days-off TTS runs', url: 'https://www.apfa.org/2025/12/01/12-01-25-january-2026-bidding-timelines/' },
  { label: 'APFA: reserve flying through TTS and UBL (March 2026)', url: 'https://www.apfa.org/2026/03/19/3-19-26-contract-implementation-update-54-reserves-in-tts-and-ubl/' },
]

export const rotaSequences = [
  { id: 'boston', label: 'Sequence 4101 · Boston', dates: 'October 7–8 · two-day trip', route: 'Base → Boston → Base' },
  { id: 'miami', label: 'Sequence 4202 · Miami', dates: 'October 7–8 · two-day trip', route: 'Base → Miami → Base' },
]

export function calendarSnapshot(persona: MonthPersona, chapterIndex: number, choices: Record<string, string>, sequenceId: string | null) {
  const snapshot = monthSnapshot(persona, chapterIndex, choices)
  const sequence = rotaSequences.find((item) => item.id === sequenceId)
  if (persona.id !== 'jordan' || !sequence) return snapshot
  return {
    ...snapshot,
    events: snapshot.events.map((item) => item.id === 'reserve-trip' ? {
      ...item, label: sequence.label,
      detail: `${sequence.dates}. ${sequence.route}. Fictional ROTA award after processing; not a guaranteed result of choosing a preference. Follow actual report and acknowledgement instructions.`,
    } : item),
  }
}

export const septemberMilestones = [
  { day: 1, label: 'TBS opens', detail: 'Training bidding opens at 12:00 DFW. Pick your preferred training dates.' },
  { day: 3, label: 'LRD opens', detail: 'Submit your eligible Lineholder/Reserve preference, then check your confirmed status before PBS bidding. A preference does not guarantee the status you want.' },
  { day: 6, label: 'TBS closes', detail: 'Last chance to change training picks: 12:00 DFW.' },
  { day: 7, label: 'TBS award / LRD closes', detail: 'Training dates are awarded. LRD closes.' },
  { day: 8, label: 'Bid package', detail: 'October trip list is out. Check your training date and status first.' },
  { day: 10, label: 'PBS opens', detail: 'Bidding for October opens at 12:00 DFW.' },
  { day: 15, label: 'PBS closes', detail: 'Bids close at 12:00 DFW. Check your bid is saved.' },
  { day: 18, label: 'PBS awards · TTS opens', detail: 'October schedules are out (example date). Lineholders can now trade trips in TTS.' },
  { day: 20, label: 'TTS Reserve day-off trades', detail: 'Reserves can request day-off trades in TTS from 12:00 CT.' },
  { day: 21, label: 'GDFD', detail: 'Reserves mark days off as Golden or Flex (example date).' },
  { day: 24, label: 'TTS first Reserve day-off run', detail: 'First nightly Reserve day-off trade run starts September 24 at 23:00 HBT. Results are due by September 25 at 04:00 HBT.' },
]

export type WindowTone = 'prep' | 'open' | 'processing' | 'result' | 'paused'

/** Month cycle: `from`/`to` are inclusive September days. Day cycle: `from`/`to` are HBT hours (0–24, `to` exclusive). */
export interface WindowBar { from: number; to: number; label: string; tone: WindowTone; dashed?: boolean; continues?: boolean }
export interface WindowMarker { at: number; label: string }

export interface SystemScenario {
  persona: string
  steps: Array<{ when: string; text: string }>
  takeaway: string
}

export interface KeyDate { role: 'opens' | 'closes' | 'result'; label: string; day?: number; time: string; approx?: boolean }

export interface SystemTiming {
  system: string
  phase: 'Build October in September' | 'Manage the awarded month'
  cycle: 'month' | 'day' | 'linked'
  /** For linked conditions: the application(s) whose processing they follow. */
  via?: string
  /** Short audience tag shown on cards. */
  audience: string
  /** Month-cycle systems: September dates shown as calendar tiles. */
  keyDates?: KeyDate[]
  glance: { opens: string; closes: string; result: string }
  bars: WindowBar[]
  markers: WindowMarker[]
  who: string
  starts: string
  ends: string
  does: string
  result: string
  doesNot: string
  scenario: SystemScenario
  lessonId: string
}

export const toneLabels: Record<WindowTone, string> = {
  prep: 'Review / prepare',
  open: 'Open for requests',
  processing: 'Processing',
  result: 'Check results',
  paused: 'Paused / not processing',
}

export const systemTimings: SystemTiming[] = [
  {
    system: 'TBS', phase: 'Build October in September', cycle: 'month', audience: 'If due for training',
    keyDates: [{ role: 'opens', label: 'Opens', day: 1, time: '12:00 DFW' }, { role: 'closes', label: 'Closes', day: 6, time: '12:00 DFW' }, { role: 'result', label: 'Awards', day: 7, time: '12:00 DFW' }], who: 'Anyone due for training',
    glance: { opens: 'Sep 1 · 12:00 DFW', closes: 'Sep 6 · 12:00 DFW', result: 'Sep 7 · 12:00 DFW' },
    bars: [{ from: 1, to: 6, label: 'Training bids open', tone: 'open' }, { from: 7, to: 7, label: 'Awards', tone: 'result' }],
    markers: [{ at: 7, label: 'Training awards 12:00 DFW' }],
    starts: 'September 1, 12:00 DFW',
    ends: 'September 6, 12:00 DFW',
    does: 'You pick the training dates you prefer for next month.',
    result: 'September 7. Your training date is fixed before PBS builds the rest of the month.',
    doesNot: 'Picking a date does not guarantee it.',
    scenario: {
      persona: 'Maya · Lineholder',
      steps: [
        { when: 'Sep 2', text: 'Leo’s school play is October 9. Maya picks training dates that avoid it.' },
        { when: 'Sep 7', text: 'TBS gives her October 14. That date is now set.' },
      ],
      takeaway: 'Training goes on the calendar first.',
    },
    lessonId: 'build-the-month',
  },
  {
    system: 'LRD', phase: 'Build October in September', cycle: 'month', audience: 'Everyone',
    keyDates: [{ role: 'opens', label: 'Opens', day: 3, time: 'per calendar' }, { role: 'closes', label: 'Closes', day: 7, time: 'per calendar' }, { role: 'result', label: 'Status', day: 8, time: 'PBS dashboard', approx: true }], who: 'Everyone',
    glance: { opens: 'Sep 3', closes: 'Sep 7', result: 'Status on PBS dashboard' },
    bars: [{ from: 3, to: 7, label: 'Status selection open', tone: 'open' }, { from: 8, to: 8, label: 'Check status', tone: 'result' }],
    markers: [{ at: 7, label: 'LRD closes' }],
    starts: 'September 3',
    ends: 'September 7',
    does: 'Records eligible preferences for next month’s Lineholder or Reserve status. The outcome depends on seniority, Reserve rotation, staffing needs and applicable rules—not preference alone.',
    result: 'Shown on the PBS dashboard before bidding opens.',
    doesNot: 'A preference does not guarantee Lineholder or Reserve status. LRD does not award trips or days off; check confirmed status before PBS bidding.',
    scenario: {
      persona: 'Jordan · Reserve',
      steps: [
        { when: 'Sep 5', text: 'Jordan sets his LRD preference.' },
        { when: 'Sep 8', text: 'The PBS dashboard shows he will be a Reserve in October, so he bids for on-call days.' },
      ],
      takeaway: 'Use your confirmed Lineholder/Reserve status—not your preference alone—to plan your PBS bid.',
    },
    lessonId: 'build-the-month',
  },
  {
    system: 'PBS', phase: 'Build October in September', cycle: 'month', audience: 'Everyone',
    keyDates: [{ role: 'opens', label: 'Opens', day: 10, time: '12:00 DFW' }, { role: 'closes', label: 'Closes', day: 15, time: '12:00 DFW' }, { role: 'result', label: 'Awards', day: 18, time: 'example date', approx: true }], who: 'Lineholders and Reserves',
    glance: { opens: 'Sep 10 · 12:00 DFW', closes: 'Sep 15 · 12:00 DFW', result: 'Sep 18 (example)' },
    bars: [
      { from: 8, to: 9, label: 'Bid package', tone: 'prep' },
      { from: 10, to: 15, label: 'Bidding open', tone: 'open' },
      { from: 16, to: 17, label: 'Processing', tone: 'processing' },
      { from: 18, to: 18, label: 'Awards', tone: 'result' },
    ],
    markers: [{ at: 8, label: 'Bid package 12:00 DFW' }, { at: 15, label: 'Bids close 12:00 DFW' }, { at: 18, label: 'Awards (example)' }],
    starts: 'September 10, 12:00 DFW (trip list out September 8)',
    ends: 'September 15, 12:00 DFW',
    does: 'You bid for the trips and days off you want. PBS builds your month by seniority.',
    result: 'Around September 18. Lineholders get trips and days off. Reserves get on-call days and days off.',
    doesNot: 'A bid is a wish, not a promise.',
    scenario: {
      persona: 'Maya · Lineholder',
      steps: [
        { when: 'Sep 10–15', text: 'Maya bids to keep October 9 free for Leo’s play.' },
        { when: 'Sep 18', text: 'Her month arrives. She got an October 9–11 trip anyway. She can try to change it in TTS.' },
      ],
      takeaway: 'PBS builds your month from your bid and seniority.',
    },
    lessonId: 'build-the-month',
  },
  {
    system: 'GDFD', phase: 'Build October in September', cycle: 'month', audience: 'Reserve only',
    keyDates: [{ role: 'opens', label: 'Opens', time: 'after PBS awards', approx: true }, { role: 'closes', label: 'Closes', time: 'published window', approx: true }, { role: 'result', label: 'Saved', time: 'Golden / Flex days', approx: true }], who: 'Reserves',
    glance: { opens: 'After PBS awards', closes: 'Published window', result: 'Days saved as Golden or Flex' },
    bars: [{ from: 19, to: 23, label: 'Designation window', tone: 'open', dashed: true }],
    markers: [{ at: 21, label: 'Jordan marks his days (scenario)' }],
    starts: 'After PBS awards come out',
    ends: 'End of the published window',
    does: 'Reserves mark days off as Golden (more protected) or Flex (less protected).',
    result: 'Your days off keep the same dates, with the label you chose.',
    doesNot: 'It does not move a day off to a new date. Use TTS for that.',
    scenario: {
      persona: 'Jordan · Reserve',
      steps: [
        { when: 'Sep 21', text: 'Family visits October 17–18. Jordan marks those days off as Golden.' },
        { when: 'After saving', text: 'The dates don’t change. They are just better protected.' },
      ],
      takeaway: 'GDFD labels days off you already have.',
    },
    lessonId: 'reserve-coverage',
  },
  {
    system: 'TTS (October)', phase: 'Build October in September', cycle: 'month', audience: 'Lineholder + Reserve',
    keyDates: [{ role: 'opens', label: 'Opens', day: 18, time: 'after PBS awards', approx: true }, { role: 'closes', label: 'Cutoff', time: '23:00 HBT nightly' }, { role: 'result', label: 'First day-off results', day: 25, time: 'by 04:00 HBT' }], who: 'Lineholders and Reserves',
    glance: { opens: 'After PBS awards · Reserve day-off trades Sep 20', closes: '23:00 HBT nightly', result: '04:00 HBT next morning' },
    bars: [
      { from: 18, to: 30, label: 'Lineholders: trip trades open', tone: 'open', continues: true },
      { from: 20, to: 23, label: 'Reserve day-off requests', tone: 'open' },
      { from: 24, to: 30, label: 'Nightly TTS runs', tone: 'processing', continues: true },
    ],
    markers: [{ at: 18, label: 'Trading opens (example)' }, { at: 20, label: 'Reserve day-off requests open 12:00 CT' }, { at: 24, label: 'First Reserve day-off trade run 23:00 HBT' }],
    starts: 'Lineholders: after PBS awards. Reserves: day-off trades open September 20, 12:00 CT.',
    ends: '23:00 HBT each night. Reserve day-off trades: 2 days before the date.',
    does: 'TTS opens for next month. Lineholders can drop, pick up or trade trips. Eligible Reserves can also drop, pick up or trade trips on days off, subject to Reserve restrictions, as well as request days-off trades with the Company.',
    result: 'Results by 04:00 HBT the next morning. The first Reserve day-off trade run starts September 24 at 23:00 HBT, with results by September 25 at 04:00 HBT.',
    doesNot: 'It is not a separate system—just TTS. Until you are awarded, your schedule stays the same.',
    scenario: {
      persona: 'Jordan · Reserve',
      steps: [
        { when: 'Oct 12', text: 'Jordan has an appointment on October 19, a Reserve day. In TTS he asks to swap it for his October 25 day off.' },
        { when: 'Next morning · 04:00 HBT', text: 'The trade is awarded. October 19 is now his day off.' },
      ],
      takeaway: 'Lineholders and Reserves both use TTS to change their month.',
    },
    lessonId: 'reserve-coverage',
  },
  {
    system: 'TTS', phase: 'Manage the awarded month', cycle: 'day', audience: 'Lineholder + Reserve', who: 'Lineholders and Reserves',
    glance: { opens: 'After PBS award · 04:00–23:00 HBT', closes: '23:00 HBT daily', result: 'By 04:00 HBT next morning' },
    bars: [
      { from: 0, to: 4, label: 'Overnight run', tone: 'processing' },
      { from: 4, to: 23, label: 'Save / edit requests', tone: 'open' },
      { from: 23, to: 24, label: 'Run', tone: 'processing' },
    ],
    markers: [{ at: 4, label: 'Results 04:00' }, { at: 23, label: 'Cutoff 23:00' }],
    starts: 'After PBS publishes the monthly award. On each day, save eligible requests outside the 23:00–04:00 HBT processing window.',
    ends: 'The daily queue closes at 23:00 HBT; TTS processes overnight.',
    does: 'Lineholders can request to drop, pick up or trade trips for the awarded month. Eligible Reserves can also change trips on days off, subject to rest and Reserve restrictions, and request days-off trades with the Company. A request is queued for nightly processing, not handled immediately.',
    result: 'Daily awards post no later than 04:00 HBT for the applicable processing date range.',
    doesNot: '“Open all day” means requests can be entered during the day; it does not mean TTS processes continuously or that a request is approved.',
    scenario: {
      persona: 'Maya · Lineholder',
      steps: [
        { when: 'Oct 5 · evening', text: 'Maya asks to drop her October 9–11 trip and pick up October 16–18 instead.' },
        { when: 'Oct 6 · 04:00 HBT', text: 'The trade is awarded. She can go to Leo’s play.' },
      ],
      takeaway: 'Ask in the evening, check results in the morning.',
    },
    lessonId: 'reshape-the-month',
  },
  {
    system: 'ETB', phase: 'Manage the awarded month', cycle: 'day', audience: 'Peer-to-peer', who: 'Two flight attendants trading',
    glance: { opens: 'All day', closes: 'Paused 23:00–04:00 HBT', result: 'After acceptance, checks and system approval' },
    bars: [
      { from: 0, to: 4, label: 'Paused for TTS', tone: 'paused' },
      { from: 4, to: 23, label: 'Trades go through', tone: 'open' },
      { from: 23, to: 24, label: 'Paused', tone: 'paused' },
    ],
    markers: [{ at: 23, label: 'Pauses 23:00' }, { at: 4, label: 'Resumes 04:00' }],
    starts: 'All day',
    ends: 'Paused 23:00–04:00 HBT while TTS runs',
    does: 'Trade a trip or day off directly with another flight attendant.',
    result: 'After acceptance and system approval, subject to eligibility and legality checks. Verify the updated schedule; transactions pause during the overnight TTS window.',
    doesNot: 'Agreement alone is not approval. You remain responsible for the original assignment until the system approves the drop or trade.',
    scenario: {
      persona: 'Maya · Lineholder',
      steps: [
        { when: 'Oct 12', text: 'A colleague asks to swap trips with Maya.' },
        { when: 'Same afternoon', text: 'They accept the exchange in ETB. It passes the applicable checks, the system approves it, and Maya verifies her updated schedule.' },
      ],
      takeaway: 'ETB trades are with another flight attendant. Rely on system approval, not just agreement.',
    },
    lessonId: 'reshape-the-month',
  },
  {
    system: 'UBL', phase: 'Manage the awarded month', cycle: 'day', audience: 'Eligible elected requests + late bids', who: 'Eligible Lineholders and Reserves on days off, including eligible late bidders, through an elected unsuccessful TTS request or a UBL late bid',
    glance: { opens: 'After TTS awards · by 04:00 HBT', closes: 'As trips open; LMCO near departure', result: 'Initial pass, then immediate processing' },
    bars: [
      { from: 0, to: 4, label: 'Waiting on TTS', tone: 'paused' },
      { from: 4, to: 24, label: 'Initial pass + as trips open', tone: 'open' },
    ],
    markers: [{ at: 4, label: 'TTS awards post; initial UBL processing follows' }],
    starts: 'The initial UBL pass follows the nightly TTS awards, posted by 04:00 HBT. An unsuccessful TTS request transfers only if eligible, if its sequence originates on the first day of that TTS bid processing date range, and with UBL participation elected by the bidder. After that, eligible newly available sequences are processed immediately as they open.',
    ends: 'Normal UBL processing stops two hours before departure (three hours at co-terminal bases); the separate LMCO UBL list applies inside that window for pickups.',
    does: 'UBL processes eligible elected unsuccessful TTS requests and late bids for pickups. TTS-to-UBL transfer is limited to a request for a sequence originating on the first day of its TTS bid processing date range; UBL late bids are a separate path. The first pass follows TTS; after 04:00 HBT, sequences that open are processed immediately from the applicable list. Within two hours of departure (three hours at co-terminal bases), eligible day-off pickups use the Less Than Minimum Call-Out (LMCO) UBL list.',
    result: 'Awards are made as eligible sequences are processed. Check the confirmed assignment and the UBL run summary; a request is not an award.',
    doesNot: 'An unsuccessful TTS request is not automatically placed on UBL: its sequence must originate on the first day of the processing range, the request must be eligible, and UBL must be elected. This limit is for TTS-to-UBL transfer; late bids follow separate rules. UBL is a pickup process, not a way to drop a sequence.',
    scenario: {
      persona: 'Maya · Lineholder',
      steps: [
        { when: 'After TTS posts · by 04:00 HBT', text: 'An eligible unsuccessful TTS request is passed to UBL only if Maya elected UBL participation and the requested sequence originates on the first day of that TTS bid processing date range.' },
        { when: 'As open time appears', text: 'Crew Scheduling processes the applicable UBL list immediately; within the LMCO window, a separate late-callout pickup list applies.' },
      ],
      takeaway: 'UBL follows TTS, then processes eligible pickups as trips open; it does not automatically take every unawarded request.',
    },
    lessonId: 'near-term-open-time',
  },
  {
    system: 'ROTA', phase: 'Manage the awarded month', cycle: 'day', audience: 'Reserve only', who: 'Reserves',
    glance: { opens: 'Day before, until 15:00 HBT', closes: '15:00 HBT', result: 'By 19:30 HBT · acknowledge before 22:30*' },
    bars: [
      { from: 0, to: 15, label: 'Save tomorrow’s preferences', tone: 'open' },
      { from: 15, to: 19.5, label: 'Processing', tone: 'processing' },
      { from: 19.5, to: 22.5, label: 'Check & acknowledge', tone: 'result' },
    ],
    markers: [{ at: 15, label: 'Cutoff 15:00' }, { at: 19.5, label: 'Results 19:30' }, { at: 22.5, label: 'Acknowledge before 22:30; on-sequence exception in details' }],
    starts: 'The day before your Reserve day',
    ends: '15:00 HBT',
    does: 'Reserves submit a daily bid by 15:00 HBT for specific sequences, sequence preferences, standby shifts or RAPs; a standing bid may be used when no daily bid is submitted. ROTA then awards or assigns future open work to legal and available Reserves under the applicable grouping and assignment rules. Open sequence positions still unawarded from UBL at 15:00 enter Reserve processing.',
    result: 'Future sequence, standby and RAP assignments are published by 19:30 HBT. Acknowledge through the automated system before 22:30 HBT. *If on a sequence and unavailable before that deadline, review and acknowledge no later than one hour after release.',
    doesNot: 'A bid records preferences; it does not reserve a trip or guarantee an award. Nothing assigned does not mean tomorrow is off.',
    scenario: {
      persona: 'Jordan · Reserve',
      steps: [
        { when: 'Oct 6 · by 15:00', text: 'Jordan submits his daily bid with sequence preferences. Future processing starts at 15:00 after the applicable UBL step; this is a preference, not a booking.' },
        { when: 'By 19:30', text: 'ROTA publishes assignments for the next-day sequence, standby shifts and RAPs. In this example Jordan receives a trip; actual awards depend on eligibility, availability and Reserve assignment rules.' },
      ],
      takeaway: 'Reserves bid preferences; ROTA assigns eligible future work from open time that remains after UBL.',
    },
    lessonId: 'reserve-coverage',
  },
  {
    system: 'ROTD', phase: 'Manage the awarded month', cycle: 'day', audience: 'Reserve only', who: 'Reserves',
    glance: { opens: 'After ROTA · as trips open', closes: 'No fixed daily clock', result: 'After UBL processing' },
    bars: [{ from: 0, to: 24, label: 'Processes new open work after UBL', tone: 'processing' }],
    markers: [],
    starts: 'When a sequence opens during or after the future ROTA process and reports today or the following day. Necessary UBL processing runs first; UBL is rerun immediately before a ROTD award/assignment.',
    ends: 'No fixed daily clock. Usually within 60 minutes after the first UBL run ends; if departure is less than 3 hours away (4 hours at co-terminal bases), ROTD follows UBL immediately.',
    does: 'After the applicable in-base and out-of-base UBL processing, ROTD awards aggressive Reserve bids and assigns remaining sequences or standby shifts through the contractual Reserve priority order.',
    result: 'A ROTD award/assignment is added to the Reserve schedule. Follow the actual contact, acknowledgement and report instructions.',
    doesNot: 'ROTD is not simply a fixed-time second ROTA run. An open sequence goes through the applicable UBL steps first, then the ROTD Reserve order; a quiet morning is not a day off.',
    scenario: {
      persona: 'Jordan · Reserve',
      steps: [
        { when: 'Oct 9 · 09:00 HBT · illustrative', text: 'A same-day sequence opens. Crew Scheduling first runs the applicable UBL process for eligible bidders, including a rerun immediately before ROTD.' },
        { when: 'After UBL · timing depends on the run', text: 'If still uncovered, ROTD awards/assigns through the Reserve priority order. Usually this is within 60 minutes after the first UBL run ends; less than 3 hours to departure (4 at co-terminal bases) means immediately after UBL.' },
      ],
      takeaway: 'ROTD covers newly opened same-day or next-day work after the applicable UBL processing.',
    },
    lessonId: 'reserve-coverage',
  },
  {
    system: 'Aggressive Reserve', phase: 'Manage the awarded month', cycle: 'linked', via: 'ROTA / ROTD', audience: 'Reserve only',
    who: 'Reserves who volunteer',
    glance: { opens: 'With eligible ROTA / ROTD preferences', closes: 'Applicable ROTA / ROTD rules', result: 'In your ROTA / ROTD result' },
    bars: [], markers: [],
    starts: 'Elect electronically for eligible ROTA / ROTD processing, daily or for the month',
    ends: 'Follow the applicable ROTA / ROTD election and processing rules; there is no separate aggressive run',
    does: 'Voluntarily requests priority consideration on eligible Reserve days, or from Reserve days into elected Flex/Golden Days. It applies in ROTA / ROTD and remains subject to saved preferences and legality.',
    result: 'Any assignment shows in your normal ROTA / ROTD result.',
    doesNot: 'Not a separate system, and not a guarantee of a better trip.',
    scenario: {
      persona: 'Jordan · Reserve',
      steps: [
        { when: 'Oct 10 · during his RAP', text: 'October 10 is a Reserve day. Jordan reviews eligible ROTD aggressive preferences for today; he does not treat tomorrow’s Golden Day as automatically available.' },
        { when: 'If awarded through ROTD', text: 'He checks the assignment and follows current contact and reporting procedures. His saved preferences, available days and applicable rules determine eligibility; an award is not guaranteed.' },
      ],
      takeaway: 'Aggressive Reserve applies in ROTA / ROTD, not a separate system or guaranteed award.',
    },
    lessonId: 'reserve-coverage',
  },
  {
    system: 'Red Flag', phase: 'Manage the awarded month', cycle: 'linked', via: 'TTS / UBL', audience: 'Eligible pickups',
    who: 'Anyone picking up eligible trips',
    glance: { opens: 'When a trip is marked Red Flag', closes: 'Same as TTS / UBL', result: 'In your TTS / UBL result' },
    bars: [], markers: [],
    starts: 'When a trip is marked Red Flag',
    ends: 'Same as TTS / UBL',
    does: 'A label on trips that pay extra. You still pick them up through TTS or UBL.',
    result: 'Eligible Lineholder pickups pay 150% and credit 100%. Eligible Reserve day-off pickups pay 150% as pay-no-credit above the reserve guarantee; projection and TTS-window accounting are separate.',
    doesNot: 'Not a separate system. Reserve on-call assignments do not get the extra pay.',
    scenario: {
      persona: 'Maya · Lineholder',
      steps: [
        { when: 'Oct 21', text: 'Maya sees an October 24 Red Flag trip and requests it in TTS.' },
        { when: 'Next morning', text: 'If she gets it, she earns 150% pay for that trip.' },
      ],
      takeaway: 'Red Flag means extra pay. TTS or UBL still decides who gets it.',
    },
    lessonId: 'payroll',
  },
]
