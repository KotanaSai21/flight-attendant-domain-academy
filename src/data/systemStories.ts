import type { LifeScenario, StoryScene } from './types'

interface SystemStory {
  id: string
  system: string
  title: string
  icon: string
  person: string
  roles: LifeScenario['roles']
  intro: string
  lessonId: string
  termId: string
  takeaway: string
  scenes: StoryScene[]
}

export const systemStories: SystemStory[] = [
  {
    id: 'tbs-training-date', system: 'TBS', title: 'A training date that fits home life',
    icon: 'mdi-school-outline', person: 'Maria', roles: ['Lineholder', 'Reserve'],
    intro: 'Maria is due for recurrent training next month. One class date clashes with her daughter\'s school play.',
    lessonId: 'build-the-month', termId: 'tbs',
    takeaway: 'TBS places training before PBS builds the rest of the month. A preferred class is not an awarded class.',
    scenes: [
      { time: 'Before monthly bidding', title: 'Maria picks her class preferences', text: 'She opens TBS, ranks class dates that work, includes alternatives, and saves her bid. Then she leaves for the school play.' },
      { time: 'When training bidding closes', title: 'TBS processes the bids', text: 'The class is not reserved when Maria clicks save. TBS awards training using the applicable training status, seniority and preferences.', system: 'TBS', lessonId: 'build-the-month' },
      { time: 'When awards are published', title: 'The class becomes part of her month', text: 'Back home, Maria checks her actual awarded date. She plans travel around that date and later reviews how it fits into her PBS month.', choice: { prompt: 'Which date should go on the family calendar?', options: [{ label: 'Her first-choice date', reply: 'That was a preference. Maria needs the awarded date before relying on it.' }, { label: 'The awarded class date', reply: 'Exactly. TBS has now turned her preferences into an actual training assignment.' }] } },
    ],
  },
  {
    id: 'lrd-next-month-status', system: 'LRD', title: 'Will next month be a line or reserve?',
    icon: 'mdi-directions-fork', person: 'Chris', roles: ['Lineholder', 'Reserve'],
    intro: 'Chris and his partner are planning next month\'s childcare. First, he needs to know which kind of month he will bid.',
    lessonId: 'build-the-month', termId: 'lrd',
    takeaway: 'LRD concerns lineholder/reserve status. PBS builds the schedule for that status; LRD does not award individual trips.',
    scenes: [
      { time: 'Before PBS', title: 'Chris reviews his status and options', text: 'He checks his projected status and the LRD options available to him. A preference is subject to the applicable rotation, seniority and base needs.' },
      { time: 'When LRD results are available', title: 'The status result points to PBS', text: 'After dinner, Chris checks the LRD result and PBS dashboard. He does not assume last month\'s status carries over.', system: 'LRD', lessonId: 'build-the-month' },
      { time: 'Before entering PBS preferences', title: 'Now he knows what to bid', text: 'A lineholder month means bidding a line of trips. A reserve month means reserve-specific preferences. Chris plans backup childcare until the schedule is actually awarded.', choice: { prompt: 'Has LRD given Chris his trips?', options: [{ label: 'Yes, the month is complete', reply: 'Not yet. Knowing the status is different from receiving the schedule.' }, { label: 'No, PBS comes next', reply: 'Right. LRD and PBS answer different questions: status, then schedule.' }] } },
    ],
  },
  {
    id: 'pbs-family-calendar', system: 'PBS', title: 'Turn a family calendar into a monthly bid',
    icon: 'mdi-calendar-month-outline', person: 'Ana', roles: ['Lineholder', 'Reserve'],
    intro: 'Ana wants a weekend for a family birthday. She is ready to turn that priority into next month\'s PBS preferences.',
    lessonId: 'build-the-month', termId: 'pbs',
    takeaway: 'PBS builds a monthly line from preferences, seniority, coverage and legalities. The award—not the saved bid—is the schedule.',
    scenes: [
      { time: 'During the PBS bid window', title: 'Ana ranks what matters', text: 'She reviews her training and status, then saves preferences with workable alternatives. A lineholder bids trips and days off; a reserve uses the reserve bidding path.' },
      { time: 'After bidding closes', title: 'PBS builds the month', text: 'Ana goes on with her week while PBS processes bids. Coverage, seniority and constraints determine which preferences can be honored.', system: 'PBS', lessonId: 'build-the-month' },
      { time: 'When the award is published', title: 'Compare the award with the birthday plan', text: 'She opens the awarded line, checks the birthday weekend and all duty dates, and tells her family what she can actually plan.', choice: { prompt: 'What if the birthday weekend was not awarded off?', options: [{ label: 'Keep duty and explore an eligible change', reply: 'Yes. A preference is not a guarantee; post-award tools may offer another option.' }, { label: 'Treat the preference as approved leave', reply: 'No. Ana still has her awarded duties unless an authorized change is confirmed.' }] } },
    ],
  },
  {
    id: 'gdfd-protect-days', system: 'GDFD', title: 'Which reserve days off are Golden?',
    icon: 'mdi-calendar-star', person: 'Leah', roles: ['Reserve'],
    intro: 'PBS has awarded Leah her reserve days off. She wants to understand which days are Golden and which are Flex before planning a family visit.',
    lessonId: 'reserve-coverage', termId: 'gdfd',
    takeaway: 'PBS awards reserve days off. GDFD handles their Golden/Flex designation; it does not create extra days off.',
    scenes: [
      { time: 'After the PBS award', title: 'Start with the days already awarded', text: 'Leah checks her reserve line. She does not assume every off day has the same protection.' },
      { time: 'During the designation window', title: 'Use GDFD for the designation', text: 'She reviews and customizes Golden/Flex designations where allowed, then checks the saved result. She follows current grouping and designation rules.', system: 'GDFD', lessonId: 'reserve-coverage' },
      { time: 'Before arranging the visit', title: 'Read the actual designations', text: 'Leah plans from her confirmed line. Golden Days are protected without her consent; Flex Days can be subject to assignment under the applicable rules.', choice: { prompt: 'Did GDFD move her off days to new dates?', options: [{ label: 'Yes, it traded the dates', reply: 'No. Designating Golden/Flex days is different from trading days off.' }, { label: 'No, it designated the awarded days', reply: 'Right. For a date change, Leah needs the appropriate trade process instead.' }] } },
    ],
  },
  {
    id: 'rtdo-move-day-off', system: 'RTDO', title: 'Move a reserve day off for an appointment',
    icon: 'mdi-calendar-sync-outline', person: 'Leah', roles: ['Reserve'],
    intro: 'Leah has an appointment on a reserve duty day. She wants to exchange an off day with the Company rather than assume the appointment excuses duty.',
    lessonId: 'reserve-coverage', termId: 'rtdo',
    takeaway: 'RTDO requests a Company day-off trade. ETB is the separate peer-to-peer route. Neither changes a day merely because a request was submitted.',
    scenes: [
      { time: 'Before the applicable cutoff', title: 'Choose a workable exchange', text: 'Leah reviews her reserve pattern, identifies an eligible off-day exchange, and submits an RTDO ballot before the published deadline.' },
      { time: 'During daily processing', title: 'RTDO considers the exchange', text: 'She takes her parent shopping while the Company day-off trade is processed in seniority order under the applicable rules.', system: 'RTDO', lessonId: 'reserve-coverage' },
      { time: 'After processing', title: 'Check the dates, then confirm the appointment', text: 'Leah checks the result and updated reserve line. If the exchange was not awarded, her original reserve obligations remain.', choice: { prompt: 'Can she rely on the appointment day being off before the result?', options: [{ label: 'Not until the trade is confirmed', reply: 'Correct. A saved ballot has not changed her reserve line.' }, { label: 'Yes, because she submitted early', reply: 'Submitting in time allows consideration; it does not guarantee an award.' }] } },
    ],
  },
  {
    id: 'tts-evening-trade', system: 'TTS', title: 'Submit a trade, then head to dance class',
    icon: 'mdi-swap-horizontal-circle-outline', person: 'Elena', roles: ['Lineholder'],
    intro: 'Elena wants Friday free for a school event. On Monday evening she requests a trade for a Sunday trip, then takes her daughter to dance class.',
    lessonId: 'reshape-the-month', termId: 'tts',
    takeaway: 'TTS is queued, seniority-based processing—not an instant trade. Confirm the result and both sides of the schedule change.',
    scenes: [
      { time: 'Monday evening · before 23:00 HBT', title: 'Save a linked trade', text: 'Elena asks to drop Friday only if she picks up Sunday. She checks the saved request, then leaves for dance class. Friday is still her assignment.' },
      { time: 'Monday 23:00 HBT', title: 'TTS closes its queue and processes', text: 'At home, Elena checks again. The nightly processing window has started; an unchanged schedule at 23:05 is not a final rejection.', system: 'TTS', lessonId: 'reshape-the-month', choice: { prompt: 'Should Elena assume the trade failed at 23:05?', options: [{ label: 'Wait for the published result', reply: 'Right. Awards are due by 04:00 HBT the next morning, not immediately at 23:00.' }, { label: 'Yes, nothing changed yet', reply: 'Not necessarily. The run is still within its processing window.' }] } },
      { time: 'Tuesday morning · after the award window', title: 'Breakfast and a result', text: 'Elena checks the result and current schedule. If awarded, Friday is removed and Sunday is added. If not, Friday remains her responsibility and she keeps backup plans.' },
    ],
  },
  {
    id: 'etb-peer-trade', system: 'ETB', title: 'Another flight attendant wants your trip',
    icon: 'mdi-account-switch-outline', person: 'Priya', roles: ['Lineholder', 'Reserve'],
    intro: 'Priya wants to attend a family celebration. A colleague is interested in the trip she has posted on the Electronic Trade Board.',
    lessonId: 'reshape-the-month', termId: 'etb',
    takeaway: 'ETB handles eligible peer transactions in real time when available. A listing or conversation is not a completed transaction.',
    scenes: [
      { time: 'At lunch', title: 'Post the trip', text: 'Priya posts an eligible trip on ETB. Her colleague reads the full sequence and checks that it fits. A reserve using ETB must follow reserve-specific eligibility rules.' },
      { time: 'When her colleague accepts', title: 'ETB validates the transaction', text: 'Unlike TTS, ETB does not wait for a nightly seniority run when available. The transaction must still pass checks. ETB processing is unavailable during specified TTS/PBS processing periods.', system: 'ETB', lessonId: 'reshape-the-month' },
      { time: 'Before confirming family plans', title: 'Look for the completed change', text: 'Priya checks the transaction result and current schedule. If the transaction failed or was not completed, the original assignment still applies.', choice: { prompt: 'A colleague texted “I will take it.” Is the trade complete?', options: [{ label: 'Yes, the text is enough', reply: 'No. They still need the official transaction and consistent schedule result.' }, { label: 'Only after ETB confirms it', reply: 'Exactly. The conversation creates an intention, not a schedule change.' }] } },
    ],
  },
  {
    id: 'ubl-near-term-request', system: 'UBL', title: 'Keep a near-term request active during errands',
    icon: 'mdi-calendar-clock-outline', person: 'Sofia', roles: ['Lineholder', 'Reserve'],
    intro: 'Sofia wants Wednesday flying, but has errands on Tuesday. Her Monday-night TTS request includes an election for eligible UBL consideration.',
    lessonId: 'near-term-open-time', termId: 'ubl',
    takeaway: 'UBL covers eligible today/tomorrow departures. An active request can become an assignment while you are doing something else.',
    scenes: [
      { time: 'Monday evening', title: 'Request Wednesday flying', text: 'Sofia saves her TTS request and UBL election. She chooses only flying she could accept. A reserve needs day-off eligibility and must account for adjacent reserve duty.' },
      { time: 'Tuesday · after TTS', title: 'The request reaches UBL', text: 'TTS did not award it. Sofia checks that the eligible request is active on UBL. It is now Tuesday: the near-term window is Tuesday and Wednesday, not Wednesday and Thursday.', system: 'UBL', lessonId: 'near-term-open-time' },
      { time: 'Tuesday afternoon · while running errands', title: 'A request can become an award', text: 'In this example, a run awards Wednesday\'s trip before 19:00 HBT. Sofia checks the result and schedule safely; this next-day Auto Award does not need a confirmation call.', choice: { prompt: 'Should she wait for a call before treating this award as hers?', options: [{ label: 'No, check and prepare for the assignment', reply: 'Right for this next-day Auto Award. Later and same-day awards have different handling; follow current procedures.' }, { label: 'Yes, all UBL awards require a call', reply: 'Not this example. She must not ignore a next-day Auto Award because no one called.' }] } },
      { time: 'If her plans change', title: 'Do not leave an unwanted request active', text: 'Sofia follows the permitted removal process before an award and checks that removal succeeded. Removing a preference does not undo a trip already awarded.' },
    ],
  },
  {
    id: 'red-flag-premium-search', system: 'Red Flag', title: 'Find premium flying for a repair bill',
    icon: 'mdi-flag-variant-outline', person: 'Nina', roles: ['Lineholder', 'Reserve'],
    intro: 'Nina needs extra income for a car repair. She looks for designated Red Flag flying, not just any open trip.',
    lessonId: 'payroll', termId: 'red-flagging',
    takeaway: 'Eligible Red Flag flying pays 150% and credits 100%. Reserve-availability assignments do not earn the Red Flag premium.',
    scenes: [
      { time: 'Before grocery shopping', title: 'Find the premium and save a pickup', text: 'Nina searches designated Red Flag open time in TTS and saves a pickup-only request with a Red Flag Only condition. She checks any desired UBL election separately.' },
      { time: 'During TTS or eligible UBL processing', title: 'The request—not the shopping trip—stays active', text: 'Nina goes shopping and returns to review the result. TTS uses its nightly window; UBL covers eligible today/tomorrow departures. A premium condition and transaction eligibility still have to be met.', system: 'Red Flag', lessonId: 'reshape-the-month' },
      { time: 'After an eligible pickup and flying', title: 'Look at pay and credit separately', text: 'For a simplified six-hour eligible Red Flag pickup, pay is nine base-rate-equivalent hours, while credit is six hours. Actual payroll still needs reconciliation.', choice: { prompt: 'Does 150% pay also mean nine credited hours?', options: [{ label: 'No, credit remains six hours', reply: 'Exactly. The premium changes eligible pay, not the sequence credit in this example.' }, { label: 'Yes, pay and credit are identical', reply: 'No. Red Flag pays 150% but credits 100%; they are separate outputs.' }] } },
    ],
  },
  {
    id: 'rota-tomorrow-plan', system: 'ROTA', title: 'Find out what tomorrow may bring',
    icon: 'mdi-calendar-arrow-right', person: 'Jordan', roles: ['Reserve'],
    intro: 'Jordan is on reserve tomorrow. Before arranging childcare, he wants to understand how next-day trips and standby are awarded or assigned.',
    lessonId: 'reserve-coverage', termId: 'rota',
    takeaway: 'ROTA handles future reserve coverage. No trip award does not automatically make a reserve day a day off.',
    scenes: [
      { time: 'Before the next-day processing window', title: 'Save realistic preferences', text: 'Jordan reviews his reserve status and submits eligible next-day preferences in ROTA. He arranges childcare that can cover his obligations, not just his preferred trip.' },
      { time: 'During the published ROTA run', title: 'ROTA handles tomorrow\'s coverage', text: 'While Jordan collects his child today, ROTA processes next-day flying, standby and availability under reserve rules. The linked lesson explains the processing window.', system: 'ROTA', lessonId: 'reserve-coverage' },
      { time: 'After results post', title: 'Review the actual next-day plan', text: 'Jordan checks his award or assignment, RAP and reporting instructions. He shares confirmed details with his partner and follows acknowledgement procedures.', choice: { prompt: 'No specific trip is visible. Is tomorrow free?', options: [{ label: 'Yes, no trip means no duty', reply: 'No. Reserve availability and standby obligations can exist without a specific trip.' }, { label: 'Check reserve availability and instructions', reply: 'Right. ROTA results are part of the reserve day, not a promise of free time.' }] } },
    ],
  },
  {
    id: 'rotd-day-changes', system: 'ROTD', title: 'A reserve morning changes while at home',
    icon: 'mdi-phone-in-talk-outline', person: 'Marcus', roles: ['Reserve'],
    intro: 'Marcus is at home on a reserve availability period. A same-day coverage need appears while he is making breakfast.',
    lessonId: 'reserve-coverage', termId: 'rotd',
    takeaway: 'ROTD handles day-of reserve coverage. Follow the actual assignment and contact instructions, not a hoped-for quiet day.',
    scenes: [
      { time: 'At the required availability check', title: 'Start with the current reserve information', text: 'Marcus checks Crew Portal as required, including any assignment and his RAP. He stays reachable and keeps travel-to-report arrangements ready.' },
      { time: 'When a day-of coverage need appears', title: 'ROTD handles the new need', text: 'A trip or standby need is processed against eligible reserve availability. Marcus follows current notification and acknowledgement procedures; he does not assume every case starts with a call.', system: 'ROTD', lessonId: 'reserve-coverage' },
      { time: 'After assignment information arrives', title: 'The breakfast plan gives way to the duty plan', text: 'He reads report time, location and sequence details, then prepares to report. Unclear or conflicting instructions go to Crew Scheduling.', choice: { prompt: 'Can he use an old screenshot to decide when to report?', options: [{ label: 'Use the latest official assignment', reply: 'Yes. Day-of information can change, so the current assignment matters.' }, { label: 'Keep the original plan regardless', reply: 'No. He needs to resolve the latest duty instructions, not rely on a stale plan.' }] } },
    ],
  },
  {
    id: 'aggressive-volunteer', system: 'Aggressive Reserve', title: 'Volunteer only for flying you can accept',
    icon: 'mdi-rocket-launch-outline', person: 'Eve', roles: ['Reserve'],
    intro: 'Eve is considering volunteering for flying outside her default reserve preferences. She wants to understand what an aggressive bid changes.',
    lessonId: 'reserve-coverage', termId: 'aggressive-reserve',
    takeaway: 'Aggressive bidding is an opt-in part of ROTA/ROTD, not a separate guaranteed trip or a way to ignore legal minimums.',
    scenes: [
      { time: 'Before saving a reserve bid', title: 'Decide what she can genuinely accept', text: 'Eve reviews the specific waiver or election she is considering and what it changes. She does not select every option just to increase her chances.' },
      { time: 'With the applicable ROTA or ROTD processing', title: 'The election travels with the bid', text: 'Her voluntary election can make her eligible under the applicable rules. It is not a separate system run, and it does not guarantee an award.', system: 'Aggressive Reserve', lessonId: 'reserve-coverage' },
      { time: 'When an outcome is available', title: 'Follow the real assignment', text: 'Eve reviews the result and any required contact or reporting instructions. She keeps her existing reserve obligations unless officially changed.', choice: { prompt: 'Does an aggressive bid waive every safety limit?', options: [{ label: 'No, only applicable permitted provisions', reply: 'Correct. Mandatory legal minimums still apply; understand each election before using it.' }, { label: 'Yes, any trip becomes legal', reply: 'No. An election cannot make every assignment legal or remove mandatory limits.' }] } },
    ],
  },
]
