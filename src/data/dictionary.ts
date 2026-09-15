import type { DictionaryTerm } from './types'

const cba = (reference: string) => ({
  kind: 'contract' as const,
  label: 'AA/APFA Contract',
  reference,
})

const academyTerm = (
  id: string,
  term: string,
  category: string,
  definition: string,
  related: string[] = [],
  example?: string,
): DictionaryTerm => ({
  id,
  term,
  category,
  definition,
  businessPurpose: `Creates a shared operational meaning for “${term}” across training, requirements, and airline systems.`,
  whyItMatters: `Using this term consistently prevents different workgroups or applications from interpreting the same event or object differently.`,
  whereUsed: [`${category} training`, 'Operational requirements', 'Application data'],
  example: example ?? definition,
  related,
  developerRelevance: 'Use the governed definition and preserve the source, effective date, and operational context when the meaning can vary.',
  source: { kind: 'system', label: 'Flight Attendant Domain Academy fundamentals' },
})

const foundationTerms: DictionaryTerm[] = [
  academyTerm('terminal', 'Terminal', 'Airport', 'The passenger building containing check-in, security, gates, and customer services.', ['gate'],
    'A crew reports to a gate inside a terminal — never to the airfield itself. At a large hub the walk between terminals can eat into the report window.'),
  academyTerm('gate', 'Gate', 'Airport', 'The assigned airport location where a specific flight boards and deplanes.', ['terminal', 'jet-bridge'],
    'Flight 1234 boards at C31. An hour later the same gate serves a different flight, which is why a gate change can cascade through a bank of departures.'),
  academyTerm('jet-bridge', 'Jet Bridge', 'Airport', 'The enclosed movable walkway connecting a terminal gate with an aircraft door.', ['gate'],
    'Once the jet bridge pulls back from the aircraft door, boarding is over — a late passenger cannot be added without moving it back.'),
  academyTerm('ramp', 'Ramp / Apron', 'Airport', 'The controlled area where aircraft park and receive baggage, fuel, catering, cleaning, and other ground service.', [],
    'While passengers board through the jet bridge, the ramp crew is loading bags, fuelling, and connecting catering on the apron below.'),
  academyTerm('taxiway', 'Taxiway', 'Airport', 'A marked route used by aircraft moving between a runway and the ramp or gate area.', ['runway', 'ramp'],
    'After pushback the aircraft follows taxiway routing to the departure runway; the cabin crew are seated for the whole taxi.'),
  academyTerm('runway', 'Runway', 'Airport', 'The prepared surface used by aircraft for takeoff and landing.', ['taxiway'],
    'A last-minute runway change can add twenty minutes of taxi time — and that time still counts inside the crew duty period.'),
  academyTerm('station', 'Station', 'Network', 'Any airport location at which the airline operates.', ['hub', 'crew-base'],
    'The airline serves many stations it does not base crew at; a sequence can overnight at a station without anyone being assigned there.'),
  academyTerm('hub', 'Hub', 'Network', 'A major connecting station where banks of flights exchange passengers and aircraft.', ['station', 'crew-base'],
    'At a hub, arrivals and departures are scheduled in banks — so one late inbound aircraft can ripple across dozens of connections at once.'),
  academyTerm('focus-city', 'Focus City', 'Network', 'A station with meaningful airline service that is smaller or less connection-oriented than a primary hub.', ['station', 'hub'],
    'A focus city carries substantial point-to-point flying without the large connecting banks that define a hub.'),
  academyTerm('atc', 'Air Traffic Control', 'Fundamentals', 'The service that clears, separates, and sequences aircraft movement in controlled airspace and at airports.', [],
    'An ATC ground stop holds the flight at the gate. The crew stays on duty the whole time, so the duty clock runs even though nothing has moved.'),
  academyTerm('eta-etd', 'ETA / ETD', 'Fundamentals', 'Estimated Time of Arrival and Estimated Time of Departure: changing forecasts distinct from scheduled and actual times.', [],
    'A 09:00 scheduled departure can carry an ETD of 09:35 after a late inbound. The schedule did not change — only the forecast did.'),
  academyTerm('utc', 'Coordinated Universal Time', 'Fundamentals', 'The common global time reference used to coordinate aviation activity across time zones.', ['hbt'],
    'Dispatch and flight-plan records use UTC so a crew crossing three time zones reads one unambiguous clock. Crew scheduling deadlines, by contrast, use Home Base Time.'),
  academyTerm('faa', 'Federal Aviation Administration', 'Fundamentals', 'The primary United States civil aviation regulator.', [],
    'FAA rules set the minimum cabin crew complement and recurrent-training requirements. The contract can add protections on top, but never subtract from them.'),
  academyTerm('mel', 'Minimum Equipment List', 'Fundamentals', 'The approved list and conditions under which specified inoperative aircraft equipment may be deferred for flight.', [],
    'An inoperative cabin item can be deferred under the MEL with a placard and a repair deadline, letting the flight depart legally instead of cancelling.'),
  academyTerm('pnr', 'Passenger Name Record', 'Customer', 'The booking record that connects a traveler with itinerary, contact, ticket, and service information.', [],
    'One PNR can hold a family of four, their seats, their bags, and a wheelchair request across three connecting flights.'),
  academyTerm('sop', 'Standard Operating Procedure', 'Operations', 'The approved and repeatable method for performing an operational task.', [],
    'Arming and disarming doors follows an SOP with a cross-check, so the step is performed identically on every aircraft by every crew.'),
  academyTerm('irops', 'Irregular Operations', 'Operations', 'Delays, cancellations, diversions, aircraft changes, and other disruptions to the published operating plan.', ['operations-chain', 'open-time'],
    'A line of thunderstorms over a hub cancels hundreds of flights. Trips break apart, open time spikes, and Reserve coverage becomes the limiting factor.'),
  academyTerm('occ', 'Operations Control Center', 'Operations', 'The airline function that monitors and coordinates the day of operation and network recovery.', ['operations-chain'],
    'When an aircraft goes out of service, the OCC decides whether to swap aircraft, delay, or cancel — and Crew Scheduling reacts to that decision.'),
  academyTerm('um-passenger', 'Unaccompanied Minor', 'Passenger Categories', 'A child traveling without an accompanying adult under a controlled airline handoff process.', [],
    'A nine-year-old travelling alone is handed from the gate agent to the crew, and released at the destination only to the named adult on the paperwork.'),
  academyTerm('prm-passenger', 'Passenger with Reduced Mobility', 'Passenger Categories', 'A traveler who may require mobility assistance or additional boarding and deplaning coordination.', [],
    'A passenger using a wheelchair pre-boards so the transfer is complete before the general boarding rush begins.'),
  academyTerm('infant-passenger', 'Infant', 'Passenger Categories', 'A very young traveler whose age, seating, restraint, and documentation require specific handling.', [],
    'A lap infant is not a seat, but still appears on the crew paperwork as a person on board — which changes the count the crew verifies before departure.'),
  academyTerm('meda-passenger', 'Medical Assistance Passenger', 'Passenger Categories', 'A traveler whose journey involves medical assistance, clearance, equipment, or other documented support.', [],
    'A passenger travelling with a portable oxygen concentrator needs prior clearance on file, and the crew receives a briefing about it before boarding.'),
  academyTerm('non-revenue-traveler', 'Non-Revenue Traveler', 'Passenger Categories', 'An eligible traveler using employee or pass travel rather than a revenue ticket.', ['standby-passenger'],
    'An off-duty employee flying on a pass is cleared only after every revenue passenger is seated — which is why commuting on a pass is never guaranteed.'),
  academyTerm('standby-passenger', 'Standby Passenger', 'Passenger Categories', 'A traveler awaiting seat clearance rather than holding a final confirmed seat assignment.', ['standby', 'non-revenue-traveler'],
    'Do not confuse this with crew Standby: a standby passenger is waiting for a seat, while a Standby Flight Attendant is on a paid availability shift at the airport.'),
  academyTerm('flight-segment', 'Flight Segment / Leg', 'Operations', 'One movement from an origin airport to a destination airport inside a duty period.', ['sequence', 'duty-period'],
    'DFW→MIA is one segment. DFW→MIA→DFW flown the same day is two segments inside a single duty period.'),
  academyTerm('ground-turn', 'Ground Turn Time', 'Operations', 'The gate interval between an arriving segment’s block-in and the next departing segment’s block-out.', ['block-time'],
    'The aircraft blocks in at 1310 and blocks out again at 1355 — a 45-minute ground turn, with the crew staying aboard and on duty throughout.'),
  academyTerm('release', 'Release', 'Operations', 'The time at which required work ends and a crew member is released from a duty period.', ['report-time', 'duty-period'],
    'Report 0700, final flight arrives 1900, release 1915. The duty period ends at release — not at the moment the aircraft parked.'),
  academyTerm('qualification', 'Qualification', 'Flight Attendant Identity', 'A current authorization or eligibility required for particular work, such as aircraft, position, language, destination documents, or training.', ['position', 'cq-training'],
    'A Flight Attendant whose CQ record has lapsed cannot be assigned any flying at all, regardless of seniority. Qualification is a hard gate, not a preference.'),
  academyTerm('availability', 'Availability', 'Flight Attendant Identity', 'The time-specific state created by vacation, leave, training, sickness, rest, days off, and other conditions that determines whether work may be assigned.', ['qualification', 'rap'],
    'Vacation, a training class, and the rest period after a red-eye all make the same person unavailable — for three entirely different reasons, with different rules.'),
  academyTerm('assignment', 'Assignment', 'Scheduling', 'Work, standby, training, or another activity placed on a Flight Attendant’s schedule with an effective time and source.', ['sequence', 'standby', 'rotd'],
    'A ROTD call-out places a sequence on a Reserve’s schedule. That is an assignment — distinct from an award, which is flying the Flight Attendant bid for and won.'),
]

export const dictionary: DictionaryTerm[] = [
  ...foundationTerms,
  {
    id: 'pbs',
    term: 'Preferential Bidding System',
    shortName: 'PBS',
    category: 'Scheduling',
    definition:
      'The electronic system used to create Lineholder and Reserve lines of flying each month. Flight Attendants submit bids across up to 7 sequential preference layers (Layer 1 top priority, Layers 2–6 sequential refinement, Layer 7 catch-all fallback), and PBS awards schedules in seniority order while honoring legalities and staffing constraints.',
    businessPurpose:
      'Gives Flight Attendants maximum control over their monthly schedules through layered preference bidding while letting the Company cover all published flying with the right number of crew at each base.',
    whyItMatters:
      'PBS output is THE monthly schedule. Every downstream process — trip trading, reserve assignment, payroll — starts from the PBS award.',
    whereUsed: ['Monthly bidding', 'Line construction', 'Reserve line construction', 'Vacation integration'],
    example:
      'A Flight Attendant places must-have days off in Layer 1, preferred 3-day sequences in Layers 2–4, turns in Layers 5–6, and a broad domestic catch-all in Layer 7. PBS solves down the layers in seniority order to construct a complete legal line.',
    related: ['tts', 'etb', 'seniority-occupational', 'line-of-time', 'reserve-line'],
    developerRelevance:
      'Core scheduling solver consumed by multiple applications. Key entities: Bid Package, 7 Preference Layers (Layer 1 critical, Layers 2–6 progressive relaxation, Layer 7 catch-all), Award, Line of Time, Misaward.',
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
    source: cba('2024 CBA §2.DD–EE, §10.D'),
  },
  {
    id: 'lrd',
    term: 'Lineholder/Reserve Designator',
    shortName: 'LRD',
    category: 'Scheduling',
    definition:
      'The election that sets which of the two line types a Flight Attendant will be awarded for the month — Lineholder (a Line of Time) or Reserve (availability days). It is made in its own window before PBS opens, and the result carries into the PBS bid.',
    businessPurpose:
      'Every Flight Attendant is awarded as either a Lineholder or a Reserve; the LRD result routes the whole month into the correct scheduling machinery before bidding starts.',
    whyItMatters:
      'The LRD is the first fork in a month: it decides whether a Flight Attendant flies concrete trips (TTS/UBL/ETB reshaping) or holds availability windows (ROTA/ROTD, RAPs), and whether guarantee math or RAP rules apply.',
    whereUsed: ['Pre-PBS status election', 'Monthly line construction', 'Reserve staffing plans'],
    example:
      'A senior Flight Attendant elects Lineholder and is later awarded an 84-hour Line of Time; a junior Flight Attendant in the same month is designated Reserve and is awarded RSV days plus RAPs. Both elections close before the PBS bid window opens.',
    related: ['pbs', 'lineholder', 'reserve-line', 'line-of-time', 'senior-bump'],
    developerRelevance:
      'A status value (LINE | RESERVE) resolved upstream of PBS and read as an input by the award engine — not a preference layer inside the bid itself.',
    source: cba('2024 CBA §12.A.1, §12.A.3.c (election made prior to the opening of PBS)'),
  },
  {
    id: 'tbs',
    term: 'Training Bidding System',
    shortName: 'TBS',
    category: 'Training',
    definition:
      'The electronic bidding system used to schedule training, including Continuing Qualification (CQ). Flight Attendants submit ranked date preferences and bids are processed in seniority order, with priority given to completing training during the assigned base month.',
    businessPurpose:
      'Allocates limited training seats fairly by seniority while letting Flight Attendants tell the Company when they would prefer to train.',
    whyItMatters:
      'TBS awards are a hard gate on scheduling: an awarded class date sets unschedulable days that PBS must build around, and an expired qualification removes flying eligibility entirely.',
    whereUsed: ['Training bidding and awards', 'Training window planning', 'Qualification validity'],
    example:
      'In the training bid window a Flight Attendant ranks several CQ class dates; TBS awards the highest-ranked seat that seniority order allows, weighed against whether they are training early, in their base month, or in grace.',
    related: ['cq-training', 'seniority-occupational', 'pbs'],
    developerRelevance:
      'A seniority-ordered award engine over dated seats, producing validity intervals that downstream scheduling reads as hard constraints.',
    source: cba('2024 CBA §29.D'),
  },
  {
    id: 'tts',
    term: 'Trip Trade System',
    shortName: 'TTS',
    category: 'Scheduling',
    definition:
      'A seniority-based, automated daily bidding system that lets Flight Attendants adjust their monthly schedule after the PBS award — dropping, picking up, and trading sequences against open time through a nightly processing run.',
    businessPurpose:
      'Lets Flight Attendants reshape their awarded schedule (drop trips, pick up better ones) while the Company keeps every trip covered and legal.',
    whyItMatters:
      'TTS is where the awarded schedule becomes the flown schedule — and it resolves competition by seniority, not by who submitted first. That is the exact opposite of the ETB, and mixing the two up is the most common misunderstanding in post-award trading.',
    whereUsed: ['Post-award schedule changes', 'Daily open time processing', 'Reserve transactions on days off'],
    example:
      'A Lineholder drops a 3-day trip into open time via TTS; another Flight Attendant picks up a 4-day within their Credit Window. Submitting first does not help — when the nightly run processes the ballots, the more senior bidder wins.',
    related: ['pbs', 'ubl', 'etb', 'credit-window', 'open-time'],
    developerRelevance:
      'Batch award engine ordered by seniority, plus interactive submission. Watch for run-window constraints called out in the Implementation LOA.',
    source: cba('2024 CBA §2.DDD, §10.E–K'),
  },
  {
    id: 'ubl',
    term: "Unsuccessful Bidder's List",
    shortName: 'UBL',
    category: 'Scheduling',
    definition:
      'A list of Lineholders who elect to be passed to Daily Scheduling because their TTS bid was not awarded, so they remain in line for matching open time. It runs immediately after TTS and only processes requests for sequences originating today or tomorrow. A Reserve trading on days off may also use the UBL, and is treated as a Lineholder for these purposes.',
    businessPurpose:
      'Gives an unsuccessful bidder a second chance at near-term flying without re-submitting a manual request every day.',
    whyItMatters:
      'There are two kinds of UBL run and the difference is how the award reaches you. A next-day sequence awarded before 1900 HBT is an Auto Award — it appears in your schedule with no phone call. Any same-day sequence, or a next-day sequence after 1900 HBT, is a Manual Award requiring a call from Crew Scheduling unless you opted out, are on legal rest, or are out flying.',
    whereUsed: ['Daily TTS processing', 'Open time distribution', 'Near-term coverage'],
    example:
      'After the Monday night TTS run, the UBL processes only Tuesday and Wednesday operations. A Wednesday sequence that opens at 1100 HBT Tuesday is an Auto Award; the same sequence opening at 2000 HBT Tuesday is a Manual Award and the phone rings.',
    related: ['tts', 'etb', 'open-time', 'rota', 'rotd'],
    developerRelevance:
      'Election flag on the schedule record consumed by daily processing. Matching is keyed to the sequence origination date, and the award path (auto vs manual, with or without notification) depends on origination day plus the 1900 HBT boundary.',
    source: {
      kind: 'apfa',
      label: 'APFA Website',
      reference: 'Bidding → Daily Bidding → UBL (with 2024 CBA §2.GGG, §10.F)',
      url: 'https://www.apfa.org/bidding/daily-bidding/ubl/',
    },
  },
  {
    id: 'etb',
    term: 'Electronic Trade Board',
    shortName: 'ETB',
    category: 'Scheduling',
    definition:
      'A real-time electronic method for picking up, dropping, and trading sequences between Flight Attendants on a first-come/first-served basis — the live, always-on sibling of the batch-run TTS.',
    businessPurpose:
      'Provides instant, self-service trades outside the scheduled TTS processing windows, so flying keeps moving all day.',
    whyItMatters:
      'ETB and TTS resolve competition in opposite ways. TTS waits for its nightly run and awards by seniority; ETB commits on the click and is explicitly first-come/first-served, so timing beats seniority.',
    whereUsed: ['Real-time trades', 'Last-minute pickups', 'Drop/pickup between TTS runs'],
    example:
      'Two LGA Flight Attendants swap single duty periods directly on ETB. Legality and Credit Window are validated instantly and both schedules update immediately — seniority never enters into it.',
    related: ['tts', 'pbs', 'credit-window', 'red-flagging'],
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
      'After a cancellation, the returned sequence posts to open time and becomes visible to the UBL, the next Reserve run, and ETB at the same time.',
    related: ['tts', 'etb', 'ubl', 'rota', 'rotd', 'red-flagging'],
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
      'Line value drives the monthly guarantee, Credit Window math, and vacation proration calculations.',
    whereUsed: ['PBS award', 'Payroll guarantee', 'Credit window calculation'],
    example: 'An 85-hour line means roughly 85 credited hours are owed even if trips cancel (pay protection applies).',
    related: ['pbs', 'credit-window', 'credited-hours'],
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
    related: ['duty-period', 'credited-hours', 'rig', 'tafb'],
    developerRelevance:
      'Pure function: rig(creditMinutes, dutyMinutes) = max(credit, duty/2). One of the RIG family — the Duty RIG. Classic payroll edge-case generator.',
    source: cba('2024 CBA §2.P, §11.D.5'),
  },
  {
    id: 'rig',
    term: 'RIG — Ratio in Guarantee',
    shortName: 'RIG',
    category: 'Payroll & Credit',
    definition:
      'The family of pay guarantees that ensure a Flight Attendant earns a contractual minimum even when actual flying (block time) is low. RIGs top flight-time pay up to a floor based on duty time, time away from base, or minimum day values.',
    businessPurpose:
      'Protects income against inefficient trips, long sits, delays, and short flying days so pay is not purely flight-hour driven.',
    whyItMatters:
      'RIGs are the silent math behind most “why is my credit higher than my block time?” questions — and the most common payroll audit/edge-case area.',
    whereUsed: ['Per-duty-period pay', 'Trip/sequence pay', 'Payroll ledger G/E/F/D time'],
    example:
      'A 12-hour duty day that only flew 5:00 gets paid at least 6:00 (Duty RIG, 1-for-2). A 35-hour trip away from base that flew 8:00 gets paid at least 10:00 (Trip RIG, 1-for-3.5).',
    related: ['duty-rig', 'tafb', 'credited-hours', 'pay-no-credit'],
    developerRelevance:
      'Each RIG is a pure function (max(credit, floor)) computed per duty period or per trip. Differing inputs: Duty RIG uses on-duty minutes; Trip RIG uses TAFB; Minimum Day uses duty-period floor (3 or 5h). HI-3 paycode letters: G=minimum day, E=duty rig, F=trip rig, D=deadhead.',
    source: cba('2024 CBA §11.D.1, §11.D.4–.6 (APFA Pay Guarantees guide)'),
  },
  {
    id: 'tafb',
    term: 'Time Away From Base',
    shortName: 'TAFB',
    category: 'Payroll & Credit',
    definition:
      'Total elapsed time a Flight Attendant is away from their crew base on a trip — from the report time of the first duty period to the release time of the last duty period (the sequence span).',
    businessPurpose:
      'TAFB is the basis for the Trip Rig (1 hour pay per 3.5 hours away) and the per-diem/expenses clock; it captures the full cost of a trip to a crew member’s life.',
    whyItMatters:
      'Two trips can have identical block time but very different TAFB — driving both Trip Rig pay and per-diem differences. It is distinct from on-duty time.',
    whereUsed: ['Trip Rig pay', 'Per diem', 'Sequence comparison', 'Payroll'],
    example:
      'A DFW 3-day sequence reports Monday 0700 and releases Thursday 1600 → TAFB ≈ 57 hours. If it only flew 12:00, Trip Rig pays ≥ 57 ÷ 3.5 = 16:17.',
    related: ['rig', 'duty-rig', 'duty-period', 'layover', 'credited-hours'],
    developerRelevance:
      'Derived measure = release(last day) − report(first day). Distinct from duty minutes; used as input to Trip Rig and per-diem accrual.',
    source: { kind: 'apfa', label: 'APFA Website', reference: 'Resources → Pay → Pay Guarantees (RIGs)' },
  },
  {
    id: 'rap',
    term: 'Reserve Availability Period',
    shortName: 'RAP',
    category: 'Reserve',
    definition:
      'A published window during which a Reserve must be available for assignment. The availability window for each RAP is twelve (12) hours. RAPs come in up to four named shifts — A, B, C, and D; start times for A, B, and C are set by the Company and published per base and bid period, while RAP D is scheduled 1400–0200 HBT. Reserve lines are built from lists of RAPs plus Golden Days and Flex Days.',
    businessPurpose:
      'Converts uncertain demand into predictable coverage blocks the Company can staff base-by-base, named so a Reserve line reads like a typed day-of coverage schedule.',
    whyItMatters:
      'RAP start/end drive call-out rules, rest, and pay. Because A/B/C start times are configuration published each month rather than fixed constants, never hard-code them. A Reserve is automatically released at the end of their RAP if no assignment is given; RAP D may also be ended early once all departures are airborne with no known diversions, with no reduction in the Reserve guarantee.',
    whereUsed: ['Reserve line construction', 'Crew Scheduling call-out', 'PBS cover sheet', 'ROTA/D award'],
    example:
      'A Reserve holds a 12-hour RAP running 0600–1800 HBT. After Crew Scheduling’s call (or after acknowledging via Crew Portal), the 2-hour report clock starts — 3 hours in a co-terminal base. If no assignment comes by 1800, they are released automatically.',
    related: ['reserve-line', 'modified-rap', 'extended-rap', 'golden-day', 'flex-day', 'rota', 'rotd', 'hbt'],
    developerRelevance:
      'Fixed 12-hour interval entity recurring four ways (shift A/B/C/D) with mutation events (Modified/Extended). A/B/C start times are per-base, per-bid-period configuration. Call-out legality = interval math + rest rules (2h/3h report, 15-min return-call window).',
    source: cba('2024 CBA §2.R, §12.G–K; APFA Reserve Resources'),
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
    source: cba('2024 CBA §2.V, §12.B.2'),
  },
  {
    id: 'gdfd',
    term: 'Golden Day / Flex Day Designation Tool (GDFD)',
    shortName: 'GDFD',
    category: 'Reserve',
    definition:
      'The electronic application used by Reserves immediately following PBS monthly awards to view and customize the designation of their awarded days off as either Golden Days (GD) or Flex Days (FD).',
    businessPurpose:
      'Allows Reserves to customize which of their awarded days off are protected (Golden) vs. assignable (Flex), conforming to contract rules such as Flex Days preceding Golden Days in grouped blocks.',
    whyItMatters:
      'PBS awards days off as a raw total (e.g. 12 days off). The GDFD system gives the Reserve control over where their 8 inviolable Golden Days and 4 assignable Flex Days sit before trading opens.',
    whereUsed: ['Post-PBS award processing', 'Crew Portal', 'CrewHub monthly schedule'],
    example:
      'A Reserve is awarded a 4-day block of days off (12th–15th). In GDFD, they designate the 12th–13th as Flex Days and the 14th–15th as Golden Days to protect their weekend.',
    related: ['golden-day', 'flex-day', 'pbs', 'rtdo', 'reserve-line'],
    developerRelevance:
      'Window-driven configuration tool opening ~Day 18/19 after PBS and closing ~Day 21 at 1200 CT. Enforces 8 GD / 4 FD counts and placement constraints (Flex must precede Golden in grouped blocks).',
    source: cba('2024 CBA §10.D.16.b, §12.B, Implementation LOA'),
  },
  {
    id: 'rtdo',
    term: 'Reserve Trade Days Off (RTDO)',
    shortName: 'RTDO',
    category: 'Reserve',
    definition:
      'The automated ballot system that allows Reserve Flight Attendants to request trading their scheduled days off directly with the Company.',
    businessPurpose:
      'Enables Reserves to adjust day-off placement with Company open days-off inventory after PBS awards and GDFD designations are locked.',
    whyItMatters:
      'Provides a contractual mechanism to swap days off with the Company (processed in seniority order) separate from peer-to-peer day-off trading via ETB.',
    whereUsed: ['Reserve day-off adjustments', 'Crew Portal', 'Monthly schedule maintenance'],
    example:
      'A Reserve submits an RTDO ballot starting on the 24th to trade an off day on the 10th for an off day on the 14th; the system awards the trade in seniority order by 1200 HBT the next day.',
    related: ['gdfd', 'golden-day', 'flex-day', 'etb', 'reserve-line'],
    developerRelevance:
      'Automated ballot system opening on the 24th of the prior month at 1200 HBT; requests submitted at least 2 days prior to traded date and processed daily in seniority order per CBA §12.C.2.',
    source: cba('2024 CBA §12.C.2'),
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
      'Most junior Flight Attendants start their careers here, and the rotation rules determine which months are on and off for years afterward.',
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
      'The system that awards and assigns sequences, standbys, and RAPs for future operations — i.e., future-dated reserve processing. Reserves submit ranked Future Reserve Bidding preferences (including aggressive and waiver-based bids); ROTA runs once daily at 1500 HBT and awards in seniority order among bidders, with processing complete by 1930 HBT.',
    businessPurpose:
      'Fills known future gaps with Reserves ahead of the operational day, in seniority order among bidders.',
    whyItMatters:
      'ROTA outcomes appear on schedules days/weeks ahead; elections (e.g., working into Golden Days) lock in here.',
    whereUsed: ['Future reserve processing', 'Known open time redistribution', 'Future Reserve Bidding'],
    example: 'A known Thanksgiving gap posts to ROTA; Reserves bid it, awarded in seniority order before the month begins.',
    related: ['rotd', 'open-time', 'reserve-line', 'aggressive-reserve', 'roc'],
    developerRelevance: 'Batch award engine keyed by future dates; election deadlines enforced (1500 HBT rule).',
    source: cba('2024 CBA §12.I, §2.UU'),
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
    id: 'roc',
    term: 'Remain on Call',
    shortName: 'ROC',
    category: 'Reserve',
    definition:
      'A status a Reserve may elect during Future Reserve Processing (ROTA) to stay available for a possible same-day sequence or standby assignment, rather than being released once ROTA processing ends for that day.',
    businessPurpose:
      'Gives the operation a pool of Reserves who have proactively agreed to stay available beyond the standard ROTA cutoff, reducing day-of coverage gaps without an involuntary assignment.',
    whyItMatters:
      'Reserves who do not understand ROC may not realize they can still be assigned after ROTA completes, or may not know how to elect out of it once flying is no longer needed.',
    whereUsed: ['Future Reserve Processing (ROTA)', 'Day-of Reserve coverage'],
    example:
      'After the 1500 HBT ROTA run, a Reserve with no award elects ROC rather than being fully released, remaining eligible for a same-day ROTD assignment.',
    related: ['rota', 'rotd', 'standby', 'aggressive-reserve'],
    developerRelevance:
      'Distinct availability state from a released Reserve or an awarded RAP; award engines must track ROC election separately from RAP/standby assignment.',
    source: cba('2024 CBA §12.J'),
  },
  {
    id: 'aggressive-reserve',
    term: 'Aggressive Reserve Status',
    shortName: 'Aggressive Reserve',
    category: 'Reserve',
    definition:
      'A bidding election that lets a Reserve volunteer for earlier or less-than-standard-notice assignments than the default RAP or call-out rules would otherwise allow, by attaching waivers (for example, a reduced LMCO call-out window, or working during a Golden/Flex Day) to a ROTA or ROTD bid.',
    businessPurpose:
      'Creates a voluntary pool of Reserves willing to accept faster assignment, which the operation can use before turning to standby coverage or an involuntary assignment.',
    whyItMatters:
      'Choosing Aggressive Reserve trades faster/earlier assignment likelihood for less predictability; Reserves should understand exactly which waivers they are attaching before bidding aggressively.',
    whereUsed: ['ROTA future bids', 'ROTD day-of bids', 'LMCO coverage'],
    example:
      'A Reserve attaches an LMCO waiver of :45 minutes to an aggressive ROTD bid, making them eligible for a departure 45 minutes out instead of the standard call-out window.',
    related: ['rotd', 'rota', 'lmco', 'roc'],
    developerRelevance:
      'Aggressive bids carry waiver flags that change award precedence (aggressive Reserve is awarded before standby for LMCO coverage per the Implementation LOA).',
    source: cba('2024 CBA §12.K.4'),
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
      'Seniority based on length of service as a Flight Attendant (first day of initial training for post-Aug-2014 hires). Where hire dates tie, date of birth applies; where hire date and birth date both tie, the ascending last four digits of the Social Security Number break it. Governs bidding rights, furlough/recall, vacation preferences, and vacancy filling. The System Seniority List is revised as of January 1 and July 1 each year.',
    businessPurpose:
      'The universal ranking key for nearly every award process in the contract.',
    whyItMatters:
      'PBS awards, reserve rotations, transfers, vacations — seniority order is the comparator everywhere.',
    whereUsed: ['PBS', 'Vacation bidding', 'Vacancies/transfers', 'ROTA awards'],
    example:
      'Two Flight Attendants share a company hire date and a birth date; the ascending last four digits of the Social Security Number settle the order.',
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
    example: 'A vacation day credits toward the month at its contractual daily value, counting against the 70–90 line band exactly as flown hours would.',
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
    related: ['sequence', 'duty-period'],
    developerRelevance: 'Segment-pair derived entity linking hotels/per diem records.',
    source: cba('2024 CBA §2.BB'),
  },
  {
    id: 'position',
    term: 'Position',
    category: 'Operations',
    definition:
      'The numbered area of responsibility an FA holds for a sequence (Position 1, 2, 3…). Position 1 is the Lead FA when awarded. An FA keeps the same position number for the entire sequence — even across mixed aircraft types.',
    businessPurpose:
      'Positioning is safety architecture: each position owns specific doors, equipment, and emergency duties so staffing and evacuation are deterministic.',
    whyItMatters:
      'Extra positions required on a larger aircraft are staffed from other sequences; qualifications (door, galley, language, lead) attach to positions.',
    whereUsed: ['Staffing tables', 'Sequence construction', 'Assignment engines', 'Training qualifications'],
    example:
      'An A321 sequence requires N positions; an FA holding Position 2 works Position 2 on every leg of the trip regardless of cabin configuration.',
    related: ['sequence', 'deadhead', 'complement'],
    developerRelevance:
      'Ordinal slot with qualification constraints; the “same position across mixed fleet” rule is a cross-segment validation invariant.',
    source: cba('2024 CBA §2.CC'),
  },
  {
    id: 'complement',
    term: 'Complement',
    category: 'Operations',
    definition:
      'The legally required number of Flight Attendants for an aircraft on a given service, split into numbered positions. Staffing below complement is illegal to depart.',
    businessPurpose: 'Deterministic, regulation-backed staffing per aircraft type and configuration.',
    whyItMatters: 'Dispatching below complement is an operational–safety event that can cancel or re-cater a departure.',
    whereUsed: ['Staffing tables', 'Assignment validators', 'Sequence construction'],
    example: 'A widebody service calls for a larger complement than a narrowbody; each position maps to real doors and galleys.',
    related: ['position', 'sequence'],
    developerRelevance: 'AircraftType→Complement lookup feeding staffing and legality checks.',
    source: cba('2024 CBA §10'),
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
    whyItMatters: 'IPD presence relaxes the four-duty-period cap but imposes its own duty-pattern constraints.',
    whereUsed: ['Sequence construction', 'International premiums'],
    example: 'A 5-day DFW–LGW pairing is legal because it contains qualifying IPD duty periods.',
    related: ['sequence', 'duty-period'],
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
    example: 'A Flight Attendant based at DFW reports and is released at DFW. If their base has a satellite, sequences built for that satellite originate and terminate there instead — a different reporting location under the same staffing structure.',
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
    related: ['tbs', 'credited-hours'],
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
  {
    id: 'report-time',
    term: 'Report Time',
    category: 'Operations',
    definition:
      'When the Flight Attendant must be at the gate, before the first departure of a duty period. Commuting happens on personal time, so report time still governs legality.',
    businessPurpose:
      'Anchors the start of every duty period — crew report status is what gate agents confirm before departure.',
    whyItMatters:
      'Late report = missed trip. Call-out rules, LMCO minimums and legality all key off report time.',
    whereUsed: ['Duty period start', 'Call-out rules', 'Legality checks'],
    example: 'A 0700 departure with a 2-hour call-out means report time 0500 — being there 0515 is a missed trip.',
    related: ['duty-period', 'lmco', 'sequence'],
    developerRelevance: 'Duty period start anchor; drives legality and call-out math.',
    source: { kind: 'system', label: 'Internal FA Lifecycle deck' },
  },
  {
    id: 'block-time',
    term: 'Block Time',
    category: 'Payroll & Credit',
    definition:
      'Gate-out to gate-in for a flight segment — the basis for most pay calculations.',
    businessPurpose: 'The common currency of flying credit across scheduling and payroll.',
    whyItMatters: 'Trip credit, line values and guarantees are built from block time.',
    whereUsed: ['Pay calculations', 'Line values', 'Credited hours'],
    example: 'A DFW→ORD segment block of 2:05 credits 2 hours 5 minutes toward the month.',
    related: ['credited-hours', 'duty-period', 'duty-rig'],
    developerRelevance: 'Per-segment measure aggregated into credit; distinct from duty time.',
    source: { kind: 'system', label: 'Internal FA Lifecycle deck' },
  },
  {
    id: 'turn',
    term: 'Turn',
    category: 'Operations',
    definition:
      'A sequence with a single duty period that returns to base the same day — the simplest trip shape.',
    businessPurpose: 'Efficient same-day coverage without layover hotel costs.',
    whyItMatters: 'Turns are the most common pickup/drop candidates in TTS/ETB.',
    whereUsed: ['Sequence construction', 'TTS/ETB trades'],
    example: 'DFW → AUS → DFW reporting 0700 and releasing 1500: one turn, home by dinner.',
    related: ['sequence', 'duty-period'],
    developerRelevance: 'Single-duty-period sequence; trivial closed-loop validation.',
    source: { kind: 'system', label: 'Internal FA Lifecycle deck' },
  },
  {
    id: 'commuter',
    term: 'Commuter',
    category: 'Operations',
    definition:
      'A Flight Attendant who lives away from the assigned crew base and positions to base before a sequence starts. The commute is separate from the operating sequence; current contractual policy determines whether a disrupted commute qualifies for protection.',
    businessPurpose:
      'A large share of FAs commute; schedules and protections must reflect that reality.',
    whyItMatters: 'Failed commutes trigger specific protection rules — a frequent edge case.',
    whereUsed: ['Report legality', 'Commuter protections', 'Co-terminal flexibility'],
    example: 'A DFW-based Flight Attendant plans transportation to arrive before report; a disruption follows the current notification and commuter-policy workflow.',
    related: ['report-time', 'co-terminal', 'crew-base'],
    developerRelevance: 'Protection workflows keyed to failed positioning travel.',
    source: { kind: 'system', label: 'Internal FA Lifecycle deck' },
  },
  {
    id: 'co-terminal',
    term: 'Co-Terminal',
    category: 'Operations',
    definition:
      'Two or more airports in the same metro area treated as a single base for reporting and pay. A sequence can open at one and close at the other; a deadhead between them is often handled as ground transport rather than a flight segment.',
    businessPurpose: 'Lets a multi-airport metro area operate as one base for reporting and pay — for example New York (JFK·LGA), Washington (DCA·IAD), Chicago (ORD·MDW), Dallas (DFW·DAL), and Los Angeles with its satellites.',
    whyItMatters: 'Open-at-one-close-at-the-other changes loop validation and segment counting.',
    whereUsed: ['Sequence construction', 'Base reporting', 'Pay'],
    example: 'A sequence opening JFK and closing LGA is still a closed New York loop.',
    related: ['crew-base', 'commuter', 'sequence'],
    developerRelevance: 'Base-grouping table consulted by loop validators; ground-transport deadheads excluded from segment counts.',
    source: cba('2024 CBA §17'),
  },
  {
    id: 'operations-chain', term: 'Airline Operating Chain', category: 'Fundamentals',
    definition: 'The connected handoffs among planning, airport, gate, ground, dispatch, flight deck, cabin crew, Crew Scheduling, and recovery partners that operate a flight.',
    businessPurpose: 'Turns a published schedule into a safe, completed customer journey.',
    whyItMatters: 'A change owned by one workgroup can affect every downstream user.',
    whereUsed: ['Flight status', 'Crew operations', 'Disruption recovery'],
    example: 'A late inbound aircraft changes gate readiness, crew timing, hotel needs, and customer connections.',
    related: ['d0', 'a14', 'sequence'],
    developerRelevance: 'Model ownership, source, timestamp, and reason for each operational event.',
    source: { kind: 'system', label: 'Internal airline fundamentals knowledge base' },
  },
  {
    id: 'flight-phases', term: 'Flight Phases', category: 'Fundamentals',
    definition: 'The connected operating stages from gate preparation and boarding through departure, cruise, arrival, deplaning, and turn or release.',
    businessPurpose: 'Creates a shared operational timeline across workgroups.',
    whyItMatters: 'Responsibilities, notifications, and usable timestamps change by phase.',
    whereUsed: ['Operational timeline', 'Cabin workflow', 'Flight status'],
    example: 'Gate arrival ends the flight segment’s block interval but does not automatically end the crew duty period.',
    related: ['block-time', 'duty-period', 'report-time'],
    developerRelevance: 'Do not infer one phase solely from another system’s status label.',
    source: { kind: 'system', label: 'Internal airline fundamentals knowledge base' },
  },
  {
    id: 'd0', term: 'D0', category: 'Operational Performance',
    definition: 'A departure-performance measure met when the flight departs by its scheduled departure minute; a one-minute delay misses D0.',
    businessPurpose: 'Tracks departure punctuality against the published plan.',
    whyItMatters: 'It depends on a precise departure event and scheduled baseline.',
    whereUsed: ['Operations dashboards', 'Station performance'],
    example: 'A 09:00 scheduled departure recorded at 09:01 is not D0.',
    related: ['a14', 'completion-factor'],
    developerRelevance: 'Preserve scheduled and actual departure timestamps and metric version.',
    source: { kind: 'system', label: 'Internal operational-performance knowledge base' },
  },
  {
    id: 'a14', term: 'A14', category: 'Operational Performance',
    definition: 'An arrival-performance measure met when a flight arrives no more than 14 minutes after scheduled arrival.',
    businessPurpose: 'Tracks arrival punctuality and customer connection performance.',
    whyItMatters: 'Arrival and departure punctuality are related but separate measures.',
    whereUsed: ['Operations dashboards', 'Arrival performance'],
    example: 'A flight scheduled at 14:00 that arrives at 14:14 meets A14; 14:15 does not.',
    related: ['d0', 'block-time'],
    developerRelevance: 'Use the authoritative arrival event and handle schedule revisions explicitly.',
    source: { kind: 'system', label: 'Internal operational-performance knowledge base' },
  },
  {
    id: 'completion-factor', term: 'CF (Completion Factor)', category: 'Operational Performance',
    definition: 'The share of scheduled flights that are completed rather than cancelled.',
    businessPurpose: 'Measures whether the airline operated the published schedule.',
    whyItMatters: 'A flight can be late and still completed, so CF is not an on-time metric.',
    whereUsed: ['Network performance', 'Disruption reporting'],
    example: 'Completed flights divided by eligible scheduled flights for the reporting period.',
    related: ['controllable-completion-factor', 'd0', 'a14'],
    developerRelevance: 'The denominator, exclusions, and cancellation status must be versioned.',
    source: { kind: 'system', label: 'Internal operational-performance knowledge base' },
  },
  {
    id: 'controllable-completion-factor', term: 'CCF (Completion Controllable Factor)', category: 'Operational Performance',
    definition: 'A completion measure asking, of flights affected by circumstances within the airline’s control, how many were completed. Events outside airline control are separated according to the governed metric definition.',
    businessPurpose: 'Shows how reliably the airline completed the flying it could operationally control.',
    whyItMatters: 'The result depends on authoritative cancellation cause codes and the current controllability definition.',
    whereUsed: ['Operational performance', 'Controllable-cause analysis'],
    example: 'A controllable maintenance or staffing cancellation affects the measure differently from qualifying weather or air-traffic constraints.',
    related: ['completion-factor', 'd0'],
    developerRelevance: 'Never derive CCF from a free-text reason; use governed codes and effective definitions.',
    source: { kind: 'system', label: 'Internal operational-performance knowledge base — verify current definition' },
  },
  {
    id: 'mbr', term: 'MBR (Mishandled Baggage Ratio)', category: 'Operational Performance',
    definition: 'A baggage-performance measure comparing mishandled bags with the applicable baggage-volume denominator.',
    businessPurpose: 'Monitors baggage delivery quality and handling outcomes.',
    whyItMatters: 'It describes baggage performance, not crew punctuality or flight completion.',
    whereUsed: ['Baggage operations', 'Station performance'],
    example: 'Delayed, damaged, or misrouted bag records contribute under the governed reporting definition.',
    related: ['operations-chain', 'completion-factor'],
    developerRelevance: 'Use the governed denominator, reporting period, and baggage-event source.',
    source: { kind: 'system', label: 'Internal operational-performance knowledge base' },
  },
]

export const termById = (id: string): DictionaryTerm | undefined =>
  dictionary.find((t) => t.id === id)
