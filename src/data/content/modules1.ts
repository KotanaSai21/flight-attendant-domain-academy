import type { AcademyModule } from '../types'

/* Modules 4–10 follow the monthly bidding journey shown in the FA Lifecycle deck.
 * Dates are intentionally presented as an illustrative cadence; the live bid calendar remains authoritative. */

const bidMonthRoadmap: AcademyModule = {
  id: 'scheduling', number: 4, title: 'Bid Month Roadmap', icon: 'mdi-calendar-month', color: '#003057',
  tagline: 'See how training, monthly status, schedule awards, trading, and reserve assignment fit on one calendar.', estimatedMinutes: 12,
  terms: ['tbs', 'lrd', 'pbs', 'tts', 'etb', 'rota', 'rotd'], quiz: [],
  blocks: [
    { kind: 'hero', icon: 'mdi-calendar-month', title: 'THE BID MONTH ROADMAP', text: 'A Flight Attendant’s next month is built in stages. Training is placed first, Lineholder or Reserve status is selected, PBS creates the monthly award, and later tools reshape or fill the schedule.' },
    { kind: 'callout', tone: 'warning', icon: 'mdi-calendar-alert', title: 'Use the timeline as a learning map', text: 'The dates below reflect the illustrative schedule shown in the lifecycle deck. Always confirm the current published bid calendar, time zone, and effective rules before acting on a deadline.' },
    { kind: 'flow', title: 'The month in one line', text: 'Play the schedule', items: [
      { label: 'TBS', icon: 'mdi-school-outline', color: '#C01933', detail: 'Bid for required training dates so planned absences are known before the flying schedule is built.' },
      { label: 'LRD', icon: 'mdi-account-switch-outline', color: '#8C2344', detail: 'Choose the preferred monthly path: Lineholder or Reserve.' },
      { label: 'Learn the two paths', icon: 'mdi-source-branch', color: '#5A2D82', detail: 'Understand what a Lineholder line and a Reserve line contain before creating PBS preferences.' },
      { label: 'PBS', icon: 'mdi-ballot-outline', color: '#0061AB', detail: 'Submit schedule preferences. PBS creates either a Lineholder line or a Reserve line.' },
      { label: 'Award', icon: 'mdi-calendar-check-outline', color: '#5A2D82', detail: 'The monthly result posts and becomes the starting schedule.' },
      { label: 'TTS / UBL / ETB', icon: 'mdi-swap-horizontal', color: '#003057', detail: 'Lineholders can reshape awarded flying through batch or real-time trading.' },
      { label: 'ROTA / ROTD', icon: 'mdi-phone-incoming-outline', color: '#B75C09', detail: 'Reserve tools award or assign known future and daily open flying.' },
    ] },
    { kind: 'prose', title: 'Use the roadmap here; explore the full flow separately', icon: 'mdi-map-marker-path', body: `This module carries the simplified flow needed to understand the learning sequence. The separate **[Bidding Academy](/bidding)** remains the interactive deep dive for monthly bidding, daily bidding, Reserve processing, calendars, and the full timeline.` },
    { kind: 'table', title: 'Illustrative bid-month schedule from the lifecycle deck', columns: ['Day', 'Event shown', 'High-level meaning'], rows: [
      ['1', 'TBS bidding opens', 'Training preferences can be submitted.'],
      ['3', 'LRD bidding opens', 'The Lineholder-or-Reserve preference window begins.'],
      ['6', 'TBS bidding closes', 'Training preferences lock for processing.'],
      ['7', 'TBS awards become visible; LRD closes', 'Planned training is known and monthly-status preferences lock.'],
      ['9', 'Prior-month schedule feed cutoff shown', 'A system handoff prepares the next scheduling cycle.'],
      ['10', 'PBS bidding opens', 'Monthly schedule preferences can be submitted.'],
      ['15', 'PBS bidding closes', 'Preferences lock for the award run.'],
      ['18', 'PBS award posted', 'The schedule result becomes visible.'],
      ['19', 'Award available in the operating schedule', 'The awarded month moves into the operational system.'],
      ['20', 'TTS and Reserve day-off workflows open', 'Post-award schedule changes and applicable Reserve elections begin.'],
      ['21', 'First TTS processing shown', 'Eligible Lineholder requests begin batch processing.'],
      ['22', 'ETB opens', 'Real-time trip posting and claiming begins.'],
      ['27', 'Golden/Flex designation cutoff shown', 'Applicable Reserve day-off designations close for the cycle.'],
    ] },
    { kind: 'callout', tone: 'info', icon: 'mdi-clock-outline', title: 'Three timing ideas to remember', text: 'Open means preferences may be edited. Close means they lock. Posted or awarded means a result exists—but a separate system handoff may determine when it appears in the operating schedule.' },
    { kind: 'table', title: 'Which tool answers which question?', columns: ['Tool', 'Question it answers', 'Primary user'], rows: [
      ['TBS', 'When will I complete required training?', 'All eligible Flight Attendants'],
      ['LRD', 'Am I seeking a Lineholder or Reserve month?', 'All PBS bidders'],
      ['PBS', 'What monthly schedule can I hold?', 'Lineholders and Reserves'],
      ['TTS / UBL', 'Can my awarded Lineholder schedule be improved in a batch run?', 'Lineholders'],
      ['ETB', 'Can I post or claim an available trip now?', 'Eligible trading participants'],
      ['ROTA', 'How is known future open time handled for Reserves?', 'Reserves and Crew Scheduling'],
      ['ROTD', 'How is open time handled in daily operations?', 'Reserves and Crew Scheduling'],
    ], termIds: ['tbs', 'lrd', 'pbs', 'tts', 'etb', 'rota', 'rotd'] },
  ],
}

const tbsAndLrd: AcademyModule = {
  id: 'pairings', number: 5, title: 'TBS & LRD', icon: 'mdi-source-branch', color: '#C01933',
  tagline: 'Place training first, then choose the preferred Lineholder or Reserve path for the month.', estimatedMinutes: 10,
  terms: ['tbs', 'cq-training', 'lrd', 'lineholder', 'reserve-line'], quiz: [],
  blocks: [
    { kind: 'hero', icon: 'mdi-source-branch', title: 'TBS & LRD', text: 'Before PBS can build a month, the system needs to know when training occurs and which type of schedule the Flight Attendant is seeking.' },
    { kind: 'compare', title: 'Two early decisions with different jobs', items: [
      { title: 'TBS — Training Bidding System', icon: 'mdi-school-outline', color: '#C01933', points: ['Used for required training preferences', 'Awards training dates within available classes and rules', 'The awarded date becomes a planned schedule constraint', 'Training is not a trip bid'] },
      { title: 'LRD — Lineholder/Reserve Designator', icon: 'mdi-account-switch-outline', color: '#5A2D82', points: ['Used to express the desired monthly schedule type', 'Lineholder means a line containing sequences', 'Reserve means availability, days off, and reserve scheduling', 'LRD guides the PBS award path; it is not the final schedule'] },
    ] },
    { kind: 'flow', title: 'Why the order matters', text: 'Play the setup', items: [
      { label: 'Training preference', icon: 'mdi-school', color: '#C01933', detail: 'The Flight Attendant ranks acceptable training dates in TBS.' },
      { label: 'Training award', icon: 'mdi-calendar-star', color: '#B75C09', detail: 'The selected class becomes a planned absence or fixed event for schedule construction.' },
      { label: 'LRD choice', icon: 'mdi-account-switch', color: '#5A2D82', detail: 'The Flight Attendant expresses a Lineholder or Reserve preference.' },
      { label: 'PBS inputs ready', icon: 'mdi-ballot-outline', color: '#0061AB', detail: 'PBS can now build around training and follow the correct monthly path.' },
    ] },
    { kind: 'header', icon: 'mdi-certificate-outline', color: '#0078D2', title: 'Training belongs with TBS', text: 'TBS is the bidding tool, while training and qualification are the business outcome it supports.' },
    { kind: 'terms', title: 'Training concepts to understand', items: [
      { id: 'cq-training', term: 'Initial and recurrent training', icon: 'mdi-school', definition: 'Initial training prepares a new Flight Attendant; recurrent CQ training keeps an active Flight Attendant qualified.' },
      { id: 'tbs', term: 'Training award', icon: 'mdi-calendar-star', definition: 'TBS places an eligible class date onto the schedule before PBS builds around it.' },
      { id: 'qualification', term: 'Qualification validity', icon: 'mdi-certificate-outline', definition: 'An assignment requires the applicable training and qualification to remain current for the work being performed.' },
      { id: 'availability', term: 'Planned schedule constraint', icon: 'mdi-calendar-lock', definition: 'Awarded training occupies time that PBS and later assignment tools must respect.' },
    ] },
    { kind: 'table', title: 'TBS and LRD terminology', columns: ['Term', 'Plain meaning', 'Result'], rows: [
      ['TBS', 'Training Bidding System', 'An awarded training event.'],
      ['CQ', 'Continuing Qualification training', 'Maintains required Flight Attendant qualification.'],
      ['LRD', 'Lineholder/Reserve Designator', 'A preferred monthly status used in PBS processing.'],
      ['Lineholder', 'Flight Attendant seeking a line of sequences', 'PBS attempts to award a Line of Time.'],
      ['Reserve', 'Flight Attendant seeking or assigned a Reserve line', 'PBS builds reserve days, days off, and related availability.'],
    ], termIds: ['tbs', 'cq-training', 'lrd', 'lineholder', 'reserve-line'] },
  ],
}

const pbs: AcademyModule = {
  id: 'pbs', number: 8, title: 'PBS — Monthly Award', icon: 'mdi-ballot', color: '#0061AB',
  tagline: 'PBS turns preferences and eligibility into a legal, coverage-complete monthly schedule.', estimatedMinutes: 12,
  terms: ['pbs', 'lrd', 'line-of-time', 'reserve-line', 'seniority-occupational'], quiz: [],
  blocks: [
    { kind: 'hero', icon: 'mdi-ballot', title: 'PREFERENTIAL BIDDING SYSTEM', text: 'PBS is the monthly schedule-award system. It considers the published flying, staffing needs, seniority, qualifications, planned absences, legalities, and each Flight Attendant’s ranked preferences.' },
    { kind: 'callout', tone: 'primary', icon: 'mdi-scale-balance', title: 'Preference does not mean guarantee', text: 'PBS tries to honor preferences in seniority order while still covering the operation and producing legal schedules. A preference can be valid but unavailable by the time a person is processed.' },
    { kind: 'flow', title: 'The PBS award at a glance', text: 'Play the award', items: [
      { label: 'Published options', icon: 'mdi-package-variant', color: '#003057', detail: 'The bid package contains available flying, reserve needs, and the month’s configuration.' },
      { label: 'Flight Attendant preferences', icon: 'mdi-format-list-checks', color: '#0061AB', detail: 'The person ranks desired schedule attributes and submits the bid.' },
      { label: 'Eligibility and seniority', icon: 'mdi-account-check-outline', color: '#5A2D82', detail: 'PBS evaluates status, qualifications, absences, legality, and seniority order.' },
      { label: 'Coverage', icon: 'mdi-airplane-check', color: '#B75C09', detail: 'The award must still cover required flying and reserve demand.' },
      { label: 'Monthly award', icon: 'mdi-calendar-check', color: '#0B6A0B', detail: 'The result is either a Lineholder line or a Reserve line.' },
    ] },
    { kind: 'compare', title: 'The two PBS outcomes', items: [
      { title: 'Lineholder award', icon: 'mdi-calendar-check-outline', color: '#0061AB', points: ['Contains specific sequences and days off', 'Report and release times are mostly visible in advance', 'Can later be reshaped through eligible trading tools'] },
      { title: 'Reserve award', icon: 'mdi-phone-incoming-outline', color: '#C01933', points: ['Contains Reserve days and days off', 'Includes the Reserve availability framework', 'Specific flying may arrive later through ROTA or ROTD'] },
    ] },
    { kind: 'table', title: 'PBS vocabulary', columns: ['Term', 'Meaning', 'Keep in mind'], rows: [
      ['Bid package', 'The published options and rules for the month', 'It is the input catalog, not an award.'],
      ['Preference', 'What the Flight Attendant would like PBS to prioritize', 'Preferences are ranked, not promised.'],
      ['Seniority', 'The ordering used for many awards', 'It affects access but does not replace eligibility.'],
      ['Line of Time', 'The awarded Lineholder schedule', 'It contains specific sequences.'],
      ['Reserve line', 'The awarded Reserve schedule', 'It contains availability and day-off structure rather than a fixed month of trips.'],
    ], termIds: ['pbs', 'pbs', 'seniority-occupational', 'line-of-time', 'reserve-line'] },
  ],
}

const lineholderScheduling: AcademyModule = {
  id: 'bidding', number: 6, title: 'Lineholder Scheduling', icon: 'mdi-calendar-check', color: '#0061AB',
  tagline: 'A Lineholder bids for schedule characteristics, receives sequences, and may later trade them.', estimatedMinutes: 11,
  terms: ['lineholder', 'line-of-time', 'sequence', 'tts', 'ubl', 'etb'], quiz: [],
  blocks: [
    { kind: 'hero', icon: 'mdi-calendar-check', title: 'THE LINEHOLDER PATH', text: 'A Lineholder starts with an awarded line containing specific sequences. The schedule is known in advance, but eligible transactions can reshape it after PBS.' },
    { kind: 'steps', title: 'From bid to flown schedule', items: [
      { icon: 'mdi-format-list-checks', title: '1 · Express preferences in PBS', detail: 'Examples include preferred days off, report times, trip length, destinations, or other published bid properties.' },
      { icon: 'mdi-calendar-check-outline', title: '2 · Receive a Line of Time', detail: 'PBS awards specific sequences and days off based on the available flying, eligibility, seniority, and coverage.' },
      { icon: 'mdi-swap-horizontal', title: '3 · Reshape the award', detail: 'TTS and UBL support scheduled batch processing; ETB supports real-time posting and claiming.' },
      { icon: 'mdi-airplane', title: '4 · Operate the current schedule', detail: 'The current schedule can differ from the original award after trades and operational changes.' },
    ] },
    { kind: 'callout', tone: 'info', icon: 'mdi-map-marker-path', title: 'Lineholders bid preferences—not a guaranteed shopping cart', text: 'A person may prefer particular sequences or sequence characteristics, but PBS must build a complete legal line from what remains available at that seniority point.' },
    { kind: 'callout', tone: 'primary', icon: 'mdi-format-list-numbered', title: 'Where seniority enters the Lineholder path', text: 'Occupational seniority establishes award order. More-senior Flight Attendants are considered earlier, while each person must still be eligible and the operation must remain covered.' },
    { kind: 'table', title: 'Lineholder tools after PBS', columns: ['Tool', 'Cadence', 'High-level use'], rows: [
      ['TTS', 'Scheduled batch runs', 'Request drops, pickups, or trades against available opportunities.'],
      ['UBL', 'Later daily consideration', 'Keeps eligible unsuccessful TTS preferences available for another chance.'],
      ['ETB', 'Real time', 'Post or claim trips when an eligible opportunity is available.'],
    ], termIds: ['tts', 'ubl', 'etb'] },
    { kind: 'callout', tone: 'primary', icon: 'mdi-history', title: 'Keep three schedule views', text: 'The original PBS award, the transaction history, and the current operating schedule answer different questions. Do not overwrite one with another.' },
  ],
}

const reserveScheduling: AcademyModule = {
  id: 'reserve', number: 7, title: 'Reserve Scheduling', icon: 'mdi-phone-incoming', color: '#C01933',
  tagline: 'A Reserve holds availability and days off; ROTA and ROTD connect that availability to open flying.', estimatedMinutes: 14,
  terms: ['reserve-line', 'rap', 'golden-day', 'flex-day', 'rota', 'rotd', 'standby'], quiz: [],
  blocks: [
    { kind: 'hero', icon: 'mdi-phone-incoming', title: 'THE RESERVE PATH', text: 'A Reserve does not begin with a full month of fixed sequences. The award defines when the person is available and when they are off; later processes connect eligible Reserves with open flying.' },
    { kind: 'compare', title: 'The Reserve month has two kinds of time', items: [
      { title: 'Availability', icon: 'mdi-clock-alert-outline', color: '#C01933', points: ['Reserve days are the working framework', 'A RAP defines a contactable availability window', 'Flying or standby may be awarded or assigned later'] },
      { title: 'Days off', icon: 'mdi-calendar-remove-outline', color: '#0B6A0B', points: ['Golden Days carry stronger protection', 'Flex Days have different assignment flexibility', 'The day category must be preserved—not reduced to a generic “off” flag'] },
    ] },
    { kind: 'callout', tone: 'primary', icon: 'mdi-format-list-numbered', title: 'Where seniority enters the Reserve path', text: 'Seniority influences who can hold a Lineholder schedule, who remains on Reserve, and the ordering of applicable Reserve bids and awards. It does not replace qualification, availability, legality, or the actual assignment record.' },
    { kind: 'header', icon: 'mdi-alpha-a-box-outline', color: '#C01933', title: 'RAP A, B, C, and D', text: 'RAP letters divide Reserve coverage across the operating day. Exact start and end times can vary by base and published monthly configuration.' },
    { kind: 'table', title: 'RAPs at a high level', columns: ['RAP', 'General coverage', 'What the Reserve should understand'], rows: [
      ['RAP A', 'Earliest part of the operating day', 'Be available for the published A window.'],
      ['RAP B', 'Later morning or daytime coverage', 'Its exact clock times come from the current bid package.'],
      ['RAP C', 'Afternoon or evening coverage', 'The letter is stable; the configured times are not universal.'],
      ['RAP D', 'Latest or overnight-oriented coverage', 'Do not hardcode a time without the current base configuration.'],
    ], termIds: ['rap', 'rap', 'rap', 'rap'] },
    { kind: 'header', icon: 'mdi-engine-outline', color: '#5A2D82', title: 'How flying reaches a Reserve', text: 'ROTA and ROTD serve different planning horizons.' },
    { kind: 'compare', title: 'ROTA versus ROTD', items: [
      { title: 'ROTA — future processing', icon: 'mdi-calendar-clock', color: '#5A2D82', points: ['Handles known future open time', 'Can award or assign future sequences, standby, or RAP-related work', 'Lets the operation solve known gaps before the day arrives'] },
      { title: 'ROTD — daily processing', icon: 'mdi-clock-fast', color: '#C01933', points: ['Handles the daily or day-of operating need', 'Processes eligible bids and assignments for current open time', 'Supports coverage when disruptions or last-minute gaps appear'] },
    ] },
    { kind: 'flow', title: 'A simple Reserve example', text: 'Play the assignment', items: [
      { label: 'Reserve line awarded', icon: 'mdi-calendar-blank-multiple', color: '#003057', detail: 'PBS establishes Reserve days, protected day-off categories, and the availability framework.' },
      { label: 'RAP applies', icon: 'mdi-clock-outline', color: '#C01933', detail: 'The Reserve is contactable during the published availability period.' },
      { label: 'Open flying exists', icon: 'mdi-airplane-alert', color: '#B75C09', detail: 'A future or daily coverage gap needs an eligible Flight Attendant.' },
      { label: 'ROTA or ROTD processes', icon: 'mdi-cog-transfer-outline', color: '#5A2D82', detail: 'The appropriate engine awards or assigns the work.' },
      { label: 'Schedule updates', icon: 'mdi-calendar-check', color: '#0B6A0B', detail: 'The Reserve receives and acknowledges the resulting assignment through the applicable workflow.' },
    ] },
    { kind: 'table', title: 'Reserve terminology', columns: ['Term', 'Plain meaning', 'Why it matters'], rows: [
      ['Reserve line', 'The monthly availability and day-off schedule', 'It is not a fixed month of sequences.'],
      ['RAP', 'Reserve Availability Period', 'Defines when the Reserve must be available and contactable.'],
      ['Golden Day', 'A more strongly protected Reserve day off', 'Working into it follows the applicable consent or election rules.'],
      ['Flex Day', 'A Reserve day off with different assignment flexibility', 'It cannot be treated like a Golden Day.'],
      ['ROTA', 'Future Reserve open-time processing', 'Handles known needs before the operating day.'],
      ['ROTD', 'Daily Reserve open-time processing', 'Handles the daily operating need.'],
    ], termIds: ['reserve-line', 'rap', 'golden-day', 'flex-day', 'rota', 'rotd'] },
  ],
}

const ttsAndUbl: AcademyModule = {
  id: 'tts', number: 9, title: 'TTS & UBL', icon: 'mdi-swap-horizontal-bold', color: '#003057',
  tagline: 'TTS batch-processes Lineholder schedule requests; UBL can preserve eligible unsuccessful preferences for later consideration.', estimatedMinutes: 10,
  terms: ['tts', 'ubl', 'open-time', 'lineholder'], quiz: [],
  blocks: [
    { kind: 'hero', icon: 'mdi-swap-horizontal-bold', title: 'TTS & UBL', text: 'After PBS, a Lineholder may want to drop a sequence, pick up different flying, or trade. TTS collects those requests and processes them in scheduled runs.' },
    { kind: 'flow', title: 'A TTS request', text: 'Play the request', items: [
      { label: 'Build request', icon: 'mdi-playlist-edit', color: '#003057', detail: 'The Flight Attendant states the desired pickup, drop, trade, or improvement.' },
      { label: 'Submit before cutoff', icon: 'mdi-send-clock-outline', color: '#0061AB', detail: 'The request joins the next applicable processing run.' },
      { label: 'Validate', icon: 'mdi-check-decagram-outline', color: '#5A2D82', detail: 'The system checks availability, legality, eligibility, and schedule limits.' },
      { label: 'Award or deny', icon: 'mdi-source-branch', color: '#B75C09', detail: 'A successful request changes the schedule; an unsuccessful request keeps a reason.' },
      { label: 'Optional UBL path', icon: 'mdi-replay', color: '#0B6A0B', detail: 'Eligible unsuccessful preferences may remain available for later daily consideration.' },
    ] },
    { kind: 'callout', tone: 'warning', icon: 'mdi-spellcheck', title: 'UBL means Unsuccessful Bidder’s List', text: 'UBL is sometimes misheard as “unassigned ballot.” In this scheduling domain it means Unsuccessful Bidder’s List: a later-chance path for eligible Lineholder preferences that TTS did not award.' },
    { kind: 'compare', title: 'TTS and UBL are connected, not identical', items: [
      { title: 'TTS', icon: 'mdi-swap-horizontal', color: '#003057', points: ['The Flight Attendant submits a request', 'Requests are handled in scheduled batch processing', 'A result may be awarded or unsuccessful'] },
      { title: 'UBL', icon: 'mdi-replay', color: '#0B6A0B', points: ['Applies after an eligible TTS preference is unsuccessful', 'Keeps the person available for later consideration', 'Can match when suitable open time becomes available'] },
    ] },
    { kind: 'table', title: 'TTS/UBL terminology', columns: ['Term', 'Meaning', 'Simple example'], rows: [
      ['TTS', 'Trip Trade System', 'Request a different sequence through a scheduled run.'],
      ['UBL', 'Unsuccessful Bidder’s List', 'Keep an eligible unsuccessful preference available for a later match.'],
      ['Open time', 'Flying not currently covered by a regular assignment', 'A newly available sequence may create a match.'],
      ['Ballot / request', 'The submitted set of desired schedule changes', 'Drop A if eligible replacement B can be awarded.'],
    ], termIds: ['tts', 'ubl', 'open-time', 'tts'] },
  ],
}

export const modulesPart1: AcademyModule[] = [bidMonthRoadmap, tbsAndLrd, lineholderScheduling, reserveScheduling, pbs, ttsAndUbl]
