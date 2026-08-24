import type { DictionaryTerm } from './types'

const cba = (reference: string) => ({
  kind: 'contract' as const,
  label: 'AA/APFA Contract',
  reference,
})

export const dictionary: DictionaryTerm[] = [
  {
    id: 'pbs',
    term: 'Preferential Bidding System',
    shortName: 'PBS',
    category: 'Scheduling',
    definition:
      'The electronic system used to create Lineholder and Reserve lines of flying each month. Flight Attendants submit ranked bid preferences, and PBS awards schedules in seniority order while honoring legalities and staffing constraints.',
    businessPurpose:
      'Gives Flight Attendants maximum control over their monthly schedules while letting the Company cover all published flying with the right number of crew at each base.',
    whyItMatters:
      'PBS output is THE monthly schedule. Every downstream process — trip trading, reserve assignment, payroll — starts from the PBS award.',
    whereUsed: ['Monthly bidding', 'Line construction', 'Reserve line construction', 'Vacation integration'],
    example:
      'A DFW-based Flight Attendant bids early sign-ons, no ODANs, and weekends off. PBS tries to honor those preferences in seniority order after covering all sequences in the bid package.',
    related: ['tts', 'etb', 'seniority-occupational', 'line-of-time', 'reserve-line'],
    developerRelevance:
      'Core scheduling engine consumed by multiple applications. Key entities: Bid Package, Preference, Award, Line of Time, Misaward.',
    source: cba('2024 CBA §2.PP, §10.D'),
  },
  {
    id: 'lineholder',
    term: 'Lineholder',
    category: 'Scheduling',
    definition:
      'A Flight Attendant holding a PBS-awarded Line of Time — a month of concrete sequences (70–90 credit hours standard). Every Flight Attendant bids in PBS as either a Lineholder or a Reserve; the two are the only line types.',
    businessPurpose:
      'Lineholders are the committed workforce covering the published month; Reserves provide the flexible buffer around them.',
    whyItMatters:
      'Which type you hold determines your whole month: trips vs availability windows, TTS/UBL/ETB vs ROTA/ROTD, guarantee math vs RAP rules.',
    whereUsed: ['PBS awards', 'TTS/UBL/ETB', 'Payroll guarantees', 'Credit Window'],
    example:
      'An FA awarded an 84-hour line with 13 days off is a Lineholder: she flies exactly those trips and reshapes them only via TTS/ETB.',
    related: ['pbs', 'reserve-line', 'line-of-time', 'credit-window', 'tts'],
    developerRelevance:
      'Top-level discriminator on schedule records (lineType: LINE | RESERVE); drives which engines and rules apply.',
    source: cba('2024 CBA §2.EE, §12.A.1'),
  },
  {
    id: 'tts',
    term: 'Trip Trade System',
    shortName: 'TTS',
    category: 'Scheduling',
    definition:
      'The automated system that processes Flight Attendant requests to drop, pick up, or trade sequences after the PBS award, including daily processing runs against open time.',
    businessPurpose:
      'Lets Flight Attendants reshape their awarded schedule (drop trips, pick up better ones) while the Company keeps every trip covered and legal.',
    whyItMatters:
      'TTS is where the awarded schedule becomes the flown schedule. Cancellations, pickups, and trades all flow through it before day-of operations.',
    whereUsed: ['Post-award schedule changes', 'Daily open time processing', 'Reserve transactions on days off'],
    example:
      'A Lineholder drops a 3-day trip into open time via TTS; another Flight Attendant picks up a 4-day within their Credit Window; TTS validates legality for both.',
    related: ['pbs', 'ubl', 'etb', 'credit-window', 'open-time'],
    developerRelevance:
      'Transaction engine with batch (daily) and interactive components. Watch for run-time constraints called out in the Implementation LOA.',
    source: cba('2024 CBA §10.E–K'),
  },
  {
    id: 'ubl',
    term: "Unsuccessful Bidder's List",
    shortName: 'UBL',
    category: 'Scheduling',
    definition:
      'A list of Lineholders who elect to be passed to Daily processing so they can be considered for open time pickup when their TTS preferences were not fully awarded.',
    businessPurpose:
      'Gives Lineholders a second chance at improving their month without re-submitting manual requests every day.',
    whyItMatters:
      'UBL participation directly affects how much open time gets redistributed to Lineholders versus Reserves during daily processing.',
    whereUsed: ['Daily TTS processing', 'Open time distribution'],
    example:
      'A Flight Attendant whose drop request was denied checks “pass to UBL”; if matching open time appears later, Daily processing can still award it.',
    related: ['tts', 'open-time', 'rotd'],
    developerRelevance:
      'Flag on the Flight Attendant/schedule record consumed by the daily TTS run; drives eligibility rules in open-time matching.',
    source: cba('2024 CBA §2.GGG, §10'),
  },
  {
    id: 'etb',
    term: 'Electronic Trade Board',
    shortName: 'ETB',
    category: 'Scheduling',
    definition:
      'A real-time electronic method for picking up, dropping, and trading sequences between Flight Attendants on a first-come/first-served basis.',
    businessPurpose:
      'Provides instant, self-service trades outside the scheduled TTS processing windows.',
    whyItMatters:
      'ETB is the fastest way flying moves between crew members; first-come/first-served means timing matters, not seniority.',
    whereUsed: ['Real-time trades', 'Last-minute pickups', 'Drop/pickup between TTS runs'],
    example:
      'Two LGA Flight Attendants swap single duty periods directly on ETB; legality is validated instantly and both schedules update immediately.',
    related: ['tts', 'pbs', 'credit-window'],
    developerRelevance:
      'Interactive, low-latency service: optimistic concurrency (first come wins), real-time legality validation, immediate schedule publication.',
    source: cba('2024 CBA §2.Q, §10'),
  },
  {
    id: 'open-time',
    term: 'Open Time',
    category: 'Scheduling',
    definition:
      'All known trip sequences not assigned to a Flight Attendant: extra sections, cancellations, time dropped through TTS, and sequences vacated by leaves, sick leave, jury duty, and similar events.',
    businessPurpose:
      'The marketplace of unassigned flying that Reserves, UBL participants, and ETB users fill as operations require.',
    whyItMatters:
      'Open time is how staffing gaps surface. Its volume signals over/under-staffing and drives overtime economics.',
    whereUsed: ['ROTA/D reserve awards', 'TTS daily processing', 'ETB pickups'],
    example:
      'After a cancellation, the returned sequence posts to open time and appears in the next ROTD run and on ETB simultaneously.',
    related: ['tts', 'rota', 'rotd', 'red-flagging'],
    developerRelevance:
      'Central queue entity: OpenTime { sequenceId, reportDate, flags[] }. Consumers: ROTA, ROTD, TTS daily, ETB.',
    source: cba('2024 CBA §2.JJ'),
  },
  {
    id: 'line-of-time',
    term: 'Line of Time',
    category: 'Scheduling',
    definition:
      'A monthly unit of Flight Attendant flying containing a minimum of 70 and a maximum of 90 credit hours per bid period. The Company may flex the max by an annual pool of 25 hours (never more than 5 in one month); High/Low bid options extend bounds to 110/40 hours.',
    businessPurpose:
      'Defines the shape and value of a Lineholder’s month so coverage, pay guarantees, and days off stay predictable.',
    whyItMatters:
      'Line value drives monthly guarantee, Credit Window math, and vacation/prooration calculations.',
    whereUsed: ['PBS award', 'Payroll guarantee', 'Credit window calculation'],
    example: 'An 85-hour line means roughly 85 credited hours are owed even if trips cancel (pay protection applies).',
    related: ['pbs', 'credit-window', 'pay-protection'],
    developerRelevance:
      'Constraints: min/max credit, flex pools, High/Low options — model as validation rules in line-building logic.',
    source: cba('2024 CBA §2.EE'),
  },
  {
    id: 'credit-window',
    term: 'Credit Window',
    category: 'Payroll & Credit',
    definition:
      'The difference (hours/minutes) between the monthly PBS awarded line value and the TTS Maximum. TTS drops, pickups, and trades increase or decrease this window.',
    businessPurpose:
      'Caps how much extra flying a Lineholder may accumulate through trades while protecting minimum coverage.',
    whyItMatters:
      'Every ETB/TTS transaction is checked against the remaining Credit Window — it is the guardrail of schedule self-service.',
    whereUsed: ['TTS validation', 'ETB validation', 'Payroll reconciliation'],
    example:
      'Awarded 80 hours with a TTS Maximum of 90: the window allows up to 10 more credit hours of pickups.',
    related: ['tts', 'etb', 'line-of-time'],
    developerRelevance:
      'Computed field recomputed on every trade; enforce as an invariant service across TTS and ETB.',
    source: cba('2024 CBA §2.G'),
  },
  {
    id: 'sequence',
    term: 'Sequence / Trip Pairing',
    category: 'Operations',
    definition:
      'A packaged set of duty periods and flights flown by one crew, built from 1–4 duty periods (up to 6 when containing International Premium Destination flying) across 1–6 calendar days.',
    businessPurpose:
      'Sequences are the atoms of crew scheduling: everything bid, traded, assigned, and paid is expressed as a sequence.',
    whyItMatters:
      'Understanding sequence structure (report, duty periods, layovers, release) unlocks every other domain concept.',
    whereUsed: ['PBS lines', 'Open time', 'Reserve assignments', 'Payroll'],
    example:
      'A 3-day sequence: Day 1 DFW-MIA-DFW, Day 2 DFW-LAX-SAN, Day 3 SAN-DFW; one crew flies it end-to-end in fixed positions.',
    related: ['duty-period', 'layover', 'position', 'ipd'],
    developerRelevance:
      'Root aggregate: Sequence → DutyPeriods → Segments, with position/staffing metadata per aircraft type.',
    source: cba('2024 CBA §10.B'),
  },
  {
    id: 'duty-period',
    term: 'Duty Period / On-Duty Time',
    category: 'Operations',
    definition:
      'All flight segments plus ground time between them, starting at report and continuing until 15 minutes (Domestic) or 30 minutes (International) after arrival, or actual release, whichever is later — deadheads included.',
    businessPurpose:
      'The unit used to build legal sequences and compute Duty Rig pay.',
    whyItMatters:
      'Legality limits (Hours of Service) attach to duty periods; pay rigs compare credit against on-duty time.',
    whereUsed: ['Hours of Service', 'Duty Rig pay', 'Sequence construction'],
    example:
      'Report 0700, four segments, release 1930 → ~12.75 hours on-duty; Duty Rig pays 1 hour credit per 2 hours on-duty when credit falls short.',
    related: ['sequence', 'duty-rig', 'odan'],
    developerRelevance:
      'Derived measure computed from segment times + post-flight buffers; feeds both legality engines and pay calculators.',
    source: cba('2024 CBA §2.O, §11'),
  },
  {
    id: 'duty-rig',
    term: 'Duty Rig',
    category: 'Payroll & Credit',
    definition:
      'A guarantee for each on-duty period paying and crediting 1 hour for every 2 hours of actual on-duty time, prorated minute-by-minute.',
    businessPurpose:
      'Ensures long, low-credit duty days still pay fairly, discouraging inefficient trip construction.',
    whyItMatters:
      'When raw segment credit < half the duty period, the rig silently raises pay — important for payroll testing.',
    whereUsed: ['Per-duty-period pay calculation'],
    example: 'A 14-hour duty period with only 5:40 credit triggers rig pay up to 7:00 credit.',
    related: ['duty-period', 'credited-hours'],
    developerRelevance:
      'Pure function: rig(creditMinutes, dutyMinutes) = max(credit, duty/2). Classic payroll edge-case generator.',
    source: cba('2024 CBA §2.P'),
  },
  {
    id: 'rap',
    term: 'Reserve Availability Period',
    shortName: 'RAP',
    category: 'Reserve',
    definition:
      'A published window during which a Reserve must be available for assignment. Reserve lines are built from lists of RAPs plus Golden Days and Flex Days.',
    businessPurpose:
      'Converts uncertain demand into predictable coverage blocks the Company can staff base-by-base.',
    whyItMatters:
      'RAP start/end drive call-out rules, rest, and pay; Modified/Extended RAPs change windows operationally.',
    whereUsed: ['Reserve line construction', 'Crew Scheduling call-out', 'Reserve pay'],
    example:
      'A Reserve holds a 0400–1600 RAP; Crew Scheduling may contact them any time inside it for a sequence, standby, or LMCO.',
    related: ['reserve-line', 'modified-rap', 'extended-rap', 'golden-day', 'flex-day'],
    developerRelevance:
      'Time-interval entity with mutation events (Modified/Extended). Call-out legality = interval math + rest rules.',
    source: cba('2024 CBA §2.R, §12.G'),
  },
  {
    id: 'modified-rap',
    term: 'Modified RAP',
    category: 'Reserve',
    definition:
      'A RAP with a modified start time but the same end time as originally published.',
    businessPurpose:
      'Lets Crew Scheduling shift coverage earlier/later within the same overall envelope when departures move.',
    whyItMatters:
      'Reserves must watch for modifications — a shifted start changes when they must answer call-out.',
    whereUsed: ['Day-of operations adjustments'],
    example: 'Published 1200–0000 RAP modified to start at 1000; end stays 0000.',
    related: ['rap'],
    developerRelevance: 'Audit-trail event on the RAP record; UI must surface original vs current window.',
    source: cba('2024 CBA §2.FF'),
  },
  {
    id: 'extended-rap',
    term: 'Extended RAP',
    category: 'Reserve',
    definition:
      'When, at the Reserve’s own option, they request to extend the end of their RAP. Extensions are approved through Crew Scheduling.',
    businessPurpose:
      'Voluntary mechanism for Reserves to capture later assignments (and associated pay) beyond their normal window.',
    whyItMatters:
      'Only the Reserve may initiate it — systems must never auto-extend availability.',
    whereUsed: ['Crew Scheduling approvals', 'Reserve self-service tools'],
    example: 'A 0500–1700 Reserve volunteers to extend to 2000 hoping to pick up an evening turn.',
    related: ['rap'],
    developerRelevance: 'Consent-driven state transition; log requester, approver, timestamps.',
    source: cba('2024 CBA §2.R'),
  },
  {
    id: 'golden-day',
    term: 'Golden Days',
    category: 'Reserve',
    definition:
      'Scheduled days off in Reserve lines that may not be moved without mutual consent of the Reserve and the Company. Reserves may volunteer (via ROTA/ROTD election) to work into them.',
    businessPurpose:
      'Guaranteed predictability for Reserves, including Golden Days on holidays/weekends in each base.',
    whyItMatters:
      'Working into a Golden Day waives it permanently for that instance — consent handling is contractual.',
    whereUsed: ['PBS reserve lines', 'ROTA/ROTD elections'],
    example:
      'A Reserve elects in ROTD to work a sequence returning on their Golden Sunday; the day is then deemed waived.',
    related: ['rap', 'flex-day', 'rota', 'rotd'],
    developerRelevance: 'Protected-flag on days off; waiver requires explicit election records (pre-1500 HBT for ROTA).',
    source: cba('2024 CBA §2.W, §12.B.2'),
  },
  {
    id: 'flex-day',
    term: 'Flex Days',
    category: 'Reserve',
    definition:
      'Scheduled days off in a Reserve line on which a Reserve can be assigned a trip in accordance with Reserve Duty rules.',
    businessPurpose:
      'Company-side elasticity inside the Reserve month: these days can convert to duty without consent.',
    whyItMatters:
      'The Flex/Golden split defines exactly which days-off are inviolable versus assignable.',
    whereUsed: ['Reserve line construction', 'Assignment planning'],
    example: 'Two Flex Days sit mid-week; Crew Scheduling may pre-assign or call out trips touching them.',
    related: ['rap', 'golden-day'],
    developerRelevance: 'Day attribute driving assignment legality checks in reserve tooling.',
    source: cba('2024 CBA §2.S'),
  },
  {
    id: 'reserve-line',
    term: 'Reserve Line',
    category: 'Reserve',
    definition:
      'A PBS-awarded line consisting of RSV duty days plus Golden/Flex Days rather than sequences. New hires post-ratification serve straight Reserve for two years, then rotate 1-on/1-off for three years, then 1-on/3-off if needed.',
    businessPurpose:
      'Standing buffer capacity absorbing irregular operations, training overlaps, and vacation coverage.',
    whyItMatters:
      'Most junior pilots— sorry, Flight Attendants live here first; rotation rules determine months on/off for years.',
    whereUsed: ['PBS awards', 'Base staffing plans', 'Rotation tracking'],
    example:
      'A 2025 new hire at CLT: straight Reserve years 1–2, alternating months years 3–5, one-in-four thereafter if required.',
    related: ['rap', 'rota', 'rotd', 'senior-bump', 'seniority-occupational'],
    developerRelevance:
      'Rotation calculator needs hire date, ratification-era flag, leave/vacation months, transfer effects.',
    source: cba('2024 CBA §12.A'),
  },
  {
    id: 'rota',
    term: 'Reserve Open Time Assignment/Award',
    shortName: 'ROTA',
    category: 'Reserve',
    definition:
      'The system that awards and assigns sequences, standbys, and RAPs for future operations — i.e., future-dated reserve processing.',
    businessPurpose:
      'Fills known future gaps with Reserves ahead of the operational day, in seniority order among bidders.',
    whyItMatters:
      'ROTA outcomes appear on schedules days/weeks ahead; elections (e.g., working into Golden Days) lock in here.',
    whereUsed: ['Future reserve processing', 'Known open time redistribution'],
    example: 'A known Thanksgiving gap posts to ROTA; Reserves bid it, awarded in seniority order before the month begins.',
    related: ['rotd', 'open-time', 'reserve-line'],
    developerRelevance: 'Batch award engine keyed by future dates; election deadlines enforced (1500 HBT rule).',
    source: cba('2024 CBA §2.UU'),
  },
  {
    id: 'rotd',
    term: 'Reserve Open Time Assignment/Award Daily',
    shortName: 'ROTD',
    category: 'Reserve',
    definition:
      'The system that awards aggressive Reserve bids and assigns sequences and standbys during day-of operations.',
    businessPurpose:
      'Same-day demand matching between open time and available Reserves.',
    whyItMatters:
      'This is the heartbeat of day-of reserve utilization; LMCO and standby awards interleave here.',
    whereUsed: ['Day-of operations', 'Aggressive bid awards', 'Standby assignment'],
    example: 'At 0430 HBT, ROTD awards an aggressive bid for a 0630 turn to the most senior eligible bidder.',
    related: ['rota', 'lmco', 'standby', 'open-time'],
    developerRelevance: 'Near-real-time loop; ordering rules matter (aggressive RSV prior to standby for LMCO per Implementation LOA).',
    source: cba('2024 CBA §2.VV, §12.K'),
  },
  {
    id: 'lmco',
    term: 'Less Than Minimum Call-Out',
    shortName: 'LMCO',
    category: 'Reserve',
    definition:
      'Assignments where the time between contact and report is less than the standard call-out period; premium rules apply, and aggressive Reserve awards precede standby for LMCO coverage.',
    businessPurpose:
      'Compensates Reserves for shortened reaction windows when operations need crews fast.',
    whyItMatters: 'LMCO pay premiums and priority order are contract-defined — frequent audit finding territory.',
    whereUsed: ['Reserve call-out', 'ROTD awards'],
    example: 'Called at 0530 for a 0630 report (60 minutes vs 2-hour norm): LMCO premium applies to the assignment.',
    related: ['rotd', 'standby', 'rap'],
    developerRelevance: 'Premium calculator + precedence rule in award engines.',
    source: { kind: 'contract', label: 'AA/APFA Contract', reference: 'Implementation LOA App. A (12.K.3.c)' },
  },
  {
    id: 'standby',
    term: 'Standby',
    category: 'Reserve',
    definition:
      'Airport-based availability shifts Reserves may hold or bid; shifts have defined start times, lengths, and locations published in the bid packet, and can be extended (e.g., to 6 or 8 hours per Implementation LOA provisions).',
    businessPurpose:
      'Positions crew physically at the airport to cover immediate operational disruptions.',
    whyItMatters: 'Standby sits between pure RAP availability and flying; different pay and movement rules apply.',
    whereUsed: ['Bid packages (projected shifts)', 'ROTD assignment'],
    example: 'Projected standby shifts with start time, length, and location now appear in the bid packet per the 2024 CBA.',
    related: ['rotd', 'rap', 'lmco'],
    developerRelevance: 'Shift entity distinct from sequences; extension consent flows mirror Extended RAP.',
    source: cba('2024 CBA §10.C.2.j, §12.F'),
  },
  {
    id: 'senior-bump',
    term: 'Senior Bump',
    category: 'Seniority',
    definition:
      'Mechanism letting a non-designated Flight Attendant bid “Reserve” out of rotation to take a Reserve month, potentially displacing junior Flight Attendants from the planned reserve list.',
    businessPurpose:
      'Lets senior Flight Attendants choose Reserve months (often for flexibility) while keeping rotation fairness.',
    whyItMatters:
      'Displacement cascades: bumped juniors re-enter rotation next month; vacation/VLOA months don’t count as fulfillment when bumping.',
    whereUsed: ['PBS bidding (pre-open election)', 'Reserve roster planning'],
    example:
      'A senior Lineholder bumps onto March Reserve; the most junior planned Reserve slides off and resumes rotation in April.',
    related: ['reserve-line', 'seniority-occupational'],
    developerRelevance: 'Order-dependent list manipulation executed before PBS opens; model displacement explicitly.',
    source: cba('2024 CBA §12.A.3.c'),
  },
  {
    id: 'seniority-occupational',
    term: 'Occupational Seniority',
    category: 'Seniority',
    definition:
      'Seniority based on length of service as a Flight Attendant (first day of initial training for post-Aug-2014 hires; ties broken by birth date, then SSN last four). Governs bidding rights, furlough/recall, vacation preferences, and vacancy filling. The System Seniority List reposts January 1 and July 1.',
    businessPurpose:
      'The universal ranking key for nearly every award process in the contract.',
    whyItMatters:
      'PBS awards, reserve rotations, transfers, vacations — seniority order is the comparator everywhere.',
    whereUsed: ['PBS', 'Vacation bidding', 'Vacancies/transfers', 'ROTA awards'],
    example:
      'Two FAs in the same training class: older birth date ranks higher; identical birthdays fall back to SSN digits.',
    related: ['senior-bump', 'pbs', 'vacancy-transfer'],
    developerRelevance:
      'Canonical sort key exposed alongside employee records; snapshot twice yearly with protest windows (30 days).',
    source: cba('2024 CBA §20.A–C'),
  },
  {
    id:'longevity-seniority',
    term: 'Classification / Longevity Seniority',
    category: 'Seniority',
    definition:
      'Separate seniority beginning at graduation as a Flight Attendant, used for compensation scale and vacation accrual.',
    businessPurpose:
      'Drives paycheck progression and vacation bank growth independent of occupational rank.',
    whyItMatters:
      'Two FAs may share a class (equal occupational rank) but differ in longevity affecting pay.',
    whereUsed: ['Pay rates', 'Vacation accrual'],
    example: 'Graduated June 1 → longevity clock starts then, regardless of when training began.',
    related: ['seniority-occupational'],
    developerRelevance: 'Second date field feeding comp tables and accrual jobs.',
    source: cba('2024 CBA §20.B'),
  },
  {
    id: 'red-flagging',
    term: 'Red Flagging Open Time',
    category: 'Scheduling',
    definition:
      'Sequences flagged by Crew Schedule that pay a 150% premium rate but credit at 100% when picked up from open time. Bases offer red-flag flying via a Crew Portal banner; once flagged, the flag (and premium) cannot be removed until after 0400 HBT one day prior to departure. Premium rules differ for pickups vs trades (overlap rules) and for Reserves (ROTA/ROTD).',
    businessPurpose:
      'Incentivizes pickup of hard-to-cover flying while keeping credit-based limits intact.',
    whyItMatters:
      'Pay ≠ credit here: money rises, credit does not — affects Credit Window, reserves’ credit caps, payroll tests.',
    whereUsed: ['Open time display', 'ETB/TTS pickup pricing'],
    example: 'A red-flagged 8:00 trip pays 12:00 but credits 8:00 toward monthly maxima.',
    related: ['open-time', 'etb', 'pay-no-credit'],
    developerRelevance: 'Dual-rate fields (payRate vs creditRate) on the open-time item.',
    source: cba('2024 CBA §2.RR'),
  },
  {
    id: 'pay-no-credit',
    term: 'Pay No Credit',
    category: 'Payroll & Credit',
    definition:
      'Time that is paid but not credited: counts above the monthly guarantee yet excluded from monthly maximums and reserve call-out-of-time computations.',
    businessPurpose:
      'Delivers extra money without letting hours accumulate toward legal/credit ceilings.',
    whyItMatters:
      'Mixing pay vs credit breaks guarantees and maxima — keep the ledgers separate.',
    whereUsed: ['Payroll', 'Reserve utilization math'],
    example: 'Red-flagged premium dollars ride as Pay No Credit atop credited trip hours.',
    related: ['red-flagging', 'credited-hours'],
    developerRelevance: 'Two-column ledger pattern throughout payroll services.',
    source: cba('2024 CBA §2.LL'),
  },
  {
    id: 'credited-hours',
    term: 'Credited Hours',
    category: 'Payroll & Credit',
    definition:
      'Hours applied toward the monthly maximum, including scheduled sequences, deadheads, vacation/sick credit, duty rig, training, company/union business, and more.',
    businessPurpose:
      'Single currency reconciling flying, absences, and guarantees into one monthly total.',
    whyItMatters: 'Everything — maxima, windows, guarantees — sums credited hours, not just flight time.',
    whereUsed: ['Monthly maximum enforcement', 'Payroll', 'PBS line values'],
    example: 'Vacation days credit X hours daily, counting toward the 70–90 line band like flying would.',
    related: ['line-of-time', 'duty-rig', 'pay-no-credit'],
    developerRelevance: 'Unified accrual pipeline aggregating many source types into one balance.',
    source: cba('2024 CBA §2.H'),
  },
  {
    id: 'odan',
    term: 'On-Duty All-Nighter',
    shortName: 'ODAN',
    category: 'Operations',
    definition:
      'A sequence consisting of a single duty period that includes all on-duty hours between 0100 and 0500 Home Base Time.',
    businessPurpose:
      'Names the hardest-turn pattern so bid preferences and premiums can target it precisely.',
    whyItMatters: 'Common preference: “avoid ODANs.” Systems must detect the 0100–0500 overlap automatically.',
    whereUsed: ['PBS preferences', 'Sequence tagging'],
    example: 'A 2300 report releasing 0730 spans the 0100–0500 window → tagged ODAN.',
    related: ['duty-period', 'hbt'],
    developerRelevance: 'Interval-overlap predicate on duty period vs [0100,0500] HBT.',
    source: cba('2024 CBA §2.II'),
  },
  {
    id: 'hbt',
    term: 'Home Base Time / Home Base Rest',
    shortName: 'HBT',
    category: 'Operations',
    definition:
      'HBT is the local time at the assigned crew base; Home Base Rest is the rest interval at base between two sequences/assignments.',
    businessPurpose: 'Anchors every time-based rule to one consistent clock and protects turnaround rest.',
    whyItMatters: 'Legalities, RAP windows, deadlines (e.g., 1500 HBT elections) all resolve in HBT.',
    whereUsed: ['Rest calculations', 'Multiple-sequence separation', 'Processing deadlines'],
    example: 'Minimum separation between multiple sequences = legal crew base rest + 45 minutes, measured in HBT.',
    related: ['crew-base', 'multiple-sequences'],
    developerRelevance: 'Timezone normalization layer; never store naive UTC without base context.',
    source: cba('2024 CBA §2.W–X, §2.HH'),
  },
  {
    id: 'multiple-sequences',
    term: 'Multiple Sequences / Double Up',
    category: 'Operations',
    definition:
      'Multiple Sequences: terminating and beginning sequences in the same calendar day separated by legal crew base rest + 45 minutes. Double Up: two sequences in one duty day with ≥30 minutes between release and next report.',
    businessPurpose:
      'Defines legal same-day combinations enabling efficient single-day stacking of work.',
    whyItMatters: 'Subtle thresholds (+45 min vs +30 min) decide legality — classic boundary-condition bugs.',
    whereUsed: ['TTS/ETB validation', 'Schedule construction'],
    example: 'Release 1330, next report 1400 → 30 minutes: valid Double Up, not Multiple Sequences.',
    related: ['hbt', 'sequence'],
    developerRelevance: 'Two adjacent-but-distinct validators; document constants prominently.',
    source: cba('2024 CBA §2.HH, §2.N'),
  },
  {
    id: 'layover',
    term: 'Layover / RON',
    category: 'Operations',
    definition: 'The period of time between duty periods within a trip sequence (Remain Over Night).',
    businessPurpose: 'Structures multi-day trips; hotels, per diem, and rest hang off layovers.',
    whyItMatters: 'Layover duration gates rest legality and crew accommodations entitlements.',
    whereUsed: ['Sequence construction', 'Hotel booking', 'Per diem'],
    example: 'Day 1 ends MIA 2200; Day 2 reports MIA 0930 → an 11.5-hour MIA layover.',
    related: ['sequence', 'crew-accommodations'],
    developerRelevance: 'Segment-pair derived entity linking hotels/per diem records.',
    source: cba('2024 CBA §2.BB'),
  },
  {
    id: 'ipd',
    term: 'International Premium Destination',
    shortName: 'IPD',
    category: 'International',
    definition:
      'Designated premium international destinations; sequences containing IPD duty periods may extend to six duty periods/six calendar days under specific construction limits.',
    businessPurpose:
      'Tags high-value international flying eligible for extended trip shapes and premiums.',
    whyItMatters: 'IPD presence relaxes the 4-day cap but imposes its own duty-pattern constraints.',
    whereUsed: ['Sequence construction', 'International premiums'],
    example: 'A 5-day DFW–LGW pairing is legal because it contains qualifying IPD duty periods.',
    related: ['international-flying', 'sequence'],
    developerRelevance: 'Flag cascading into sequence-length validators and premium pay rules.',
    source: cba('2024 CBA §10.B.3.b'),
  },
  {
    id: 'deadhead',
    term: 'Deadheading',
    category: 'Operations',
    definition:
      'Travel at Company request between two points to protect a sequence, return to base, or position for business; positive-space protections apply when deadheading to cover an assignment.',
    businessPurpose: 'Moves crews where needed; counts within duty definitions.',
    whyItMatters: 'Deadheads credit/pay and count toward duty — often forgotten in payroll integrations.',
    whereUsed: ['Duty calculations', 'Payroll', 'Travel authorizations'],
    example: 'Deadhead DFW→MIA to cover tomorrow’s trip: report/release buffers wrap the segment.',
    related: ['duty-period', 'credited-hours'],
    developerRelevance: 'Segment type discriminator affecting duty math and seat-protection logic.',
    source: cba('2024 CBA §2.J, §16'),
  },
  {
    id: 'crew-base',
    term: 'Crew Base / Satellite Base',
    category: 'Operations',
    definition:
      'The designated location where a Flight Attendant normally begins and ends duty (Home Base). Satellite bases attach outside the metro area; their sequences originate/terminate there.',
    businessPurpose: 'Organizes staffing, lines, and commutability around geographic hubs.',
    whyItMatters: 'Transfers, reserve rotations, and block-hour allocation all operate per-base.',
    whereUsed: ['PBS', 'Transfers', 'Staffing models'],
    example: 'Opening/closing a satellite base follows contractual notice processes (§10.U).',
    related: ['hbt', 'vacancy-transfer'],
    developerRelevance: 'Base dimension on nearly every entity; satellite linkage modeled parent-child.',
    source: cba('2024 CBA §2.I, §2.XX'),
  },
  {
    id: 'carry-over',
    term: 'Carry Over / Change Over',
    category: 'Scheduling',
    definition:
      'A replacement sequence modifying an originally awarded/assigned sequence that reports in one month and releases in the next, placed on the schedule no later than the 10th of the originating month.',
    businessPurpose: 'Handles cross-month trips cleanly for payroll and legality bookkeeping.',
    whyItMatters: 'Month-boundary attribution errors here corrupt two months of totals.',
    whereUsed: ['Schedule maintenance', 'Payroll cutoffs'],
    example: 'Jan 31–Feb 2 trip replacing an award posts by Jan 10 and splits credit correctly.',
    related: ['sequence', 'credited-hours'],
    developerRelevance: 'Cross-period allocation logic in credit aggregation.',
    source: cba('2024 CBA §2.E'),
  },
  {
    id: 'ppo',
    term: 'Pay Purposes Only',
    shortName: 'PPO',
    category: 'Scheduling',
    definition:
      'When a Flight Attendant is off the entire bid period, they may still bid in PBS to establish what they could have held — for pay purposes only.',
    businessPurpose: 'Protects pay value during full-month absences by simulating the award.',
    whyItMatters: 'Generates phantom awards that feed payroll but not operations.',
    whereUsed: ['PBS runs', 'Leave payroll'],
    example: 'On VLOA all March? PPO bid yields a notional line value used in pay calculations.',
    related: ['pbs', 'credited-hours'],
    developerRelevance: 'Simulation mode flag through the PBS pipeline; outputs flagged non-operational.',
    source: cba('2024 CBA §2.MM'),
  },
  {
    id: 'misaward',
    term: 'Misaward / Crew Scheduling Error',
    category: 'Scheduling',
    definition:
      'Incorrect awards (including certain cancelled-sequence awards inside the bidding window) treated as misawards with defined remedies under Crew Scheduling Error/Misaward provisions.',
    businessPurpose: 'Formal correction path keeping system errors from harming Flight Attendants.',
    whyItMatters: 'Remediation rights (e.g., treatment consistent with contract) hinge on correct classification.',
    whereUsed: ['PBS post-processing', 'Daily ops corrections'],
    example: 'A sequence cancels during the PBS bidding period and was already awarded → misaward handling applies.',
    related: ['pbs', 'tts'],
    developerRelevance: 'Error taxonomy + remediation workflow; audit logs are evidence.',
    source: cba('2024 CBA §10.T, §10.C.7'),
  },
  {
    id: 'vacancy-transfer',
    term: 'Filling of Vacancies / Transfers',
    category: 'Crew Management',
    definition:
      'Process for awarding vacancies and transfers; successful transferees receive up to five consecutive Relocation Days free of all duty.',
    businessPurpose: 'Balances staffing across bases via seniority-based moves.',
    whyItMatters: 'Transfers reset reserve positioning at the new base and trigger relocation support.',
    whereUsed: ['Base staffing', 'Reserve rotation resets'],
    example: 'Awarded BOS vacancy → five Relocation Days protect the moving window.',
    related: ['seniority-occupational', 'crew-base', 'relocation-days'],
    developerRelevance: 'Workflow states (posted→bid→award→effective) with side effects on rotation.',
    source: cba('2024 CBA §22, §2.TT'),
  },
  {
    id: 'relocation-days',
    term: 'Relocation Days',
    category: 'Crew Management',
    definition:
      'Up to five consecutive calendar days free from all duty for relocating after an awarded vacancy transfer.',
    businessPurpose: 'Duty-free landing zone for base moves.',
    whyItMatters: 'Must be blocked from assignment engines once granted.',
    whereUsed: ['Transfer onboarding', 'Schedule blocking'],
    example: 'Mar 1–5 flagged relocation: ROTA/ROTD/TTS cannot touch those days.',
    related: ['vacancy-transfer'],
    developerRelevance: 'Absence type participating in conflict checks everywhere.',
    source: cba('2024 CBA §2.TT'),
  },
  {
    id: 'cq-training',
    term: 'Continuous Qualification Training',
    shortName: 'CQ',
    category: 'Training',
    definition: 'Annual FAA-required recurrent training for Flight Attendants; training time carries credit.',
    businessPurpose: 'Keeps every FA legally qualified year over year.',
    whyItMatters: 'CQ dates constrain schedulable days; missed CQ removes flying eligibility entirely.',
    whereUsed: ['Training bidding/awards (JSC scope)', 'PBS inputs', 'Qualification records'],
    example: 'CQ week in March shrinks available days; PBS builds around it.',
    related: ['training-module', 'credited-hours'],
    developerRelevance: 'Qualification validity intervals gating assignment engines.',
    source: cba('2024 CBA §2.QQ, §29'),
  },
  {
    id: 'jsc',
    term: 'Joint Scheduling Committee',
    shortName: 'JSC',
    category: 'Governance',
    definition:
      'Up to six APFA-designated members meeting quarterly with Crew Planning/Scheduling, Inflight, and Labor Relations to co-develop policies for sequence construction, bid awards, TTS, ETB, vacations, block hours, and reserve utilization.',
    businessPurpose: 'Contractual collaboration channel shaping scheduling-system parameters.',
    whyItMatters: 'Parameter changes you code may trace back to JSC decisions — and APFA has data-access rights.',
    whereUsed: ['Scheduling governance', 'System change management'],
    example: 'Adjusting line-building ranges or TTS run cadence goes through JSC review.',
    related: ['pbs', 'tts'],
    developerRelevance: 'Configuration governance: parameterized values, change logs, stakeholder signoff.',
    source: cba('2024 CBA §10.A'),
  },
]

export const termById = (id: string): DictionaryTerm | undefined =>
  dictionary.find((t) => t.id === id)
