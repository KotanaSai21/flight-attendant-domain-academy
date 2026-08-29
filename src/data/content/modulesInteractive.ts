import type { AcademyModule } from '../types'

const fundamentals: AcademyModule = {
  id: 'airline-fundamentals', number: 1, title: 'Airline Fundamentals', icon: 'mdi-airplane', color: '#0061AB',
  tagline: 'Learn the places, handoffs, phases, passenger types, and measures behind every flight.', estimatedMinutes: 22, terms: [],
  blocks: [
    { kind: 'hero', icon: 'mdi-airplane', title: 'AIRLINE FUNDAMENTALS', text: 'Build the shared vocabulary needed to follow a flight from the published schedule to arrival. This page stays with the airline operation; crew-specific clocks and Flight Attendant work follow on the next two pages.' },
    { kind: 'callout', tone: 'error', icon: 'mdi-shield-check', title: 'The operating priority', text: 'Safety and regulatory compliance come first. Security, operational reliability, and customer service support that foundation.' },
    { kind: 'header', icon: 'mdi-airport', color: '#0061AB', title: 'Airport and aircraft words', text: 'Start with the physical places and aircraft areas named in everyday requirements.' },
    { kind: 'illustration', variant: 'airport', caption: 'Passengers move terminal → gate → jet bridge → aircraft, while ground teams service the aircraft on the ramp.' },
    { kind: 'terms', title: 'The airport in six words', items: [
      { id: 'terminal', term: 'Terminal', icon: 'mdi-storefront-outline', definition: 'The passenger building containing check-in, security, gates, and services.' },
      { id: 'gate', term: 'Gate', icon: 'mdi-door-open', definition: 'The assigned boarding location for a flight.' },
      { id: 'jet-bridge', term: 'Jet bridge', icon: 'mdi-bridge', definition: 'The enclosed walkway between the gate and an aircraft door.' },
      { id: 'ramp', term: 'Ramp / apron', icon: 'mdi-airport', definition: 'The controlled area where aircraft park and receive bags, fuel, catering, and ground service.' },
      { id: 'taxiway', term: 'Taxiway', icon: 'mdi-road-variant', definition: 'The marked route aircraft use between the ramp and runway.' },
      { id: 'runway', term: 'Runway', icon: 'mdi-arrow-expand-right', definition: 'The prepared surface used for takeoff and landing.' },
    ] },
    { kind: 'illustration', variant: 'aircraft', caption: 'Common cabin references include the flight deck, cabin, galley, lavatory, jumpseat, and exits identified by side and number.' },
    { kind: 'callout', tone: 'info', icon: 'mdi-door', title: 'Aircraft locations vary by aircraft type', text: 'Door count, exit type, galley placement, jumpseats, and position responsibilities change with aircraft type and configuration. Labels such as L1 and R1 are precise within that aircraft: L1 is the first door on the left and R1 is opposite it. Always use the applicable aircraft layout rather than assuming one universal cabin map.' },
    { kind: 'header', icon: 'mdi-hubspot', color: '#5A2D82', title: 'How the network is organized', text: 'Flights connect stations, but crew and customer journeys are organized around several different location concepts.' },
    { kind: 'terms', title: 'Network locations', items: [
      { id: 'station', term: 'Station', icon: 'mdi-map-marker-outline', definition: 'Any airport where the airline operates.' },
      { id: 'hub', term: 'Hub', icon: 'mdi-hubspot', definition: 'A major connecting station where large banks of arriving and departing flights exchange passengers and aircraft.' },
      { id: 'focus-city', term: 'Focus city', icon: 'mdi-city-variant-outline', definition: 'A station with meaningful service that is smaller or less connection-oriented than a primary hub.' },
      { id: 'crew-base', term: 'Satellite', icon: 'mdi-airport', definition: 'A secondary operating location supported by, or administratively tied to, a larger base or station. Meaning can vary by workgroup.' },
      { id: 'crew-base', term: 'Crew base', icon: 'mdi-home-city-outline', definition: 'The location to which a crew member is assigned and where sequences normally begin and end.' },
      { id: 'co-terminal', term: 'Co-terminal', icon: 'mdi-map-marker-multiple-outline', definition: 'Two or more airports treated together for defined scheduling or contractual purposes.' },
    ] },
    { kind: 'header', icon: 'mdi-transit-connection-variant', color: '#C01933', title: 'Every departure is a handoff', text: 'A departure succeeds only when commercial, airport, aircraft, and crew work converge at the same moment.' },
    { kind: 'flow', title: 'From plan to pushback', text: 'Play the departure', items: [
      { label: 'Publish', icon: 'mdi-calendar-check', color: '#003057', detail: 'The airline publishes a flight number, cities, scheduled times, aircraft type, and inventory.' },
      { label: 'Prepare', icon: 'mdi-airplane-wrench', color: '#5A2D82', detail: 'Maintenance, fuel, catering, cleaning, bags, load planning, and crew readiness converge on the aircraft.' },
      { label: 'Board', icon: 'mdi-account-multiple-plus', color: '#0061AB', detail: 'The gate controls boarding while the cabin crew manages cabin readiness, passenger needs, and safety conditions.' },
      { label: 'Close', icon: 'mdi-door-closed-lock', color: '#C01933', detail: 'Final counts, paperwork, doors, cabin status, and flight-deck coordination must agree.' },
      { label: 'Push', icon: 'mdi-airplane-takeoff', color: '#0B6A0B', detail: 'Ground teams release the aircraft for pushback and the operating crew continues to taxi and takeoff.' },
    ] },
    { kind: 'header', icon: 'mdi-chart-timeline-variant', color: '#0B6A0B', title: 'Flight phases', text: 'Systems may group phases differently, but the operating arc remains consistent.' },
    { kind: 'steps', title: 'A flight from gate to gate', items: [
      { icon: 'mdi-clipboard-check-outline', title: '1 · Pre-departure', detail: 'Aircraft servicing, crew preparation, checks, briefing, and boarding.' },
      { icon: 'mdi-truck-trailer', title: '2 · Pushback and taxi-out', detail: 'The aircraft leaves the gate and moves toward the departure runway.' },
      { icon: 'mdi-airplane-takeoff', title: '3 · Takeoff and climb', detail: 'The aircraft becomes airborne and climbs toward cruise altitude.' },
      { icon: 'mdi-weather-sunny', title: '4 · Cruise', detail: 'The en-route portion between climb and descent.' },
      { icon: 'mdi-airplane-landing', title: '5 · Descent and landing', detail: 'The aircraft descends, approaches, and lands.' },
      { icon: 'mdi-taxi', title: '6 · Taxi-in and arrival', detail: 'The aircraft reaches its gate, parks, and begins deplaning or its next turn.' },
    ] },
    { kind: 'header', icon: 'mdi-account-details-outline', color: '#B75C09', title: 'Passengers are not all processed the same way', text: 'Some customers require additional information, assistance, seating controls, or formal handoffs.' },
    { kind: 'terms', title: 'Common passenger categories', items: [
      { id: 'um-passenger', term: 'UMNR', icon: 'mdi-account-child-outline', definition: 'Unaccompanied minor; a child traveling under a controlled handoff process.' },
      { id: 'prm-passenger', term: 'PRM', icon: 'mdi-wheelchair-accessibility', definition: 'Passenger with reduced mobility who may require assistance or boarding coordination.' },
      { id: 'infant-passenger', term: 'INF', icon: 'mdi-baby-carriage', definition: 'Infant, with age, seating, restraint, and documentation considerations.' },
      { id: 'meda-passenger', term: 'MEDA', icon: 'mdi-medical-bag', definition: 'Passenger whose travel includes medical assistance, clearance, or equipment.' },
      { id: 'non-revenue-traveler', term: 'Non-revenue traveler', icon: 'mdi-ticket-account', definition: 'Eligible traveler using employee or pass travel rather than a revenue ticket.' },
      { id: 'standby-passenger', term: 'Standby passenger', icon: 'mdi-ticket-confirmation-outline', definition: 'A traveler awaiting seat clearance rather than holding a final confirmed seat assignment.' },
    ] },
    { kind: 'header', icon: 'mdi-chart-box-outline', color: '#0061AB', title: 'Performance measures answer different questions', text: 'A flight can miss one measure and meet another. Keep the underlying events, thresholds, and reason codes separate.' },
    { kind: 'table', title: 'Core airline measures', columns: ['Measure', 'What it asks', 'Example'], rows: [
      ['D0', 'Did the flight depart by its scheduled departure minute?', 'One minute late misses D0.'],
      ['A14', 'Did the flight arrive within 14 minutes after schedule?', 'Ten minutes late can still meet A14.'],
      ['Completion Factor (CF)', 'What share of scheduled flights operated instead of cancelling?', 'Completed flights ÷ scheduled flights.'],
      ['Controllable Completion Factor (CCF)', 'Of the flights affected by circumstances within the airline’s control, how many were completed?', 'Separates controllable completion from events outside airline control; authoritative cause coding still governs.'],
      ['Mishandled Baggage Ratio (MBR)', 'How often was checked baggage mishandled relative to the selected denominator?', 'A baggage measure, not a crew punctuality measure.'],
    ], termIds: ['d0', 'a14', 'completion-factor', 'controllable-completion-factor', 'mbr'] },
    { kind: 'table', title: 'Fundamentals terminology', columns: ['Term', 'Meaning', 'Why it matters'], rows: [
      ['ATC', 'Air Traffic Control', 'Controls and sequences aircraft movement.'],
      ['ETA / ETD', 'Estimated time of arrival / departure', 'A changing forecast, distinct from scheduled and actual time.'],
      ['UTC', 'Coordinated Universal Time', 'A common reference for operations across time zones.'],
      ['FAA', 'Federal Aviation Administration', 'The primary US civil aviation regulator.'],
      ['MEL', 'Minimum Equipment List', 'Defines conditions under which specified inoperative equipment may be deferred.'],
      ['PNR', 'Passenger Name Record', 'The booking record connecting a traveler to itinerary and service data.'],
      ['SOP', 'Standard Operating Procedure', 'The approved way to perform a recurring task.'],
      ['IROPS', 'Irregular operations', 'Delays, cancellations, diversions, and other disruptions.'],
      ['OCC', 'Operations Control Center', 'Coordinates and monitors the airline’s day of operation.'],
    ], termIds: ['atc', 'eta-etd', 'utc', 'faa', 'mel', 'pnr', 'sop', 'irops', 'occ'] },
  ], quiz: [],
}

const crew: AcademyModule = {
  id: 'fa-lifecycle', number: 2, title: 'Crew', icon: 'mdi-account-group-outline', color: '#5A2D82',
  tagline: 'Understand who operates and supports a flight, how the crew clock works, and how crew trips are structured.', estimatedMinutes: 23, terms: [],
  blocks: [
    { kind: 'hero', icon: 'mdi-account-group-outline', title: 'CREW', text: '“Crew” can mean the people physically operating the flight or the teams supporting them. Learn each role, the shared timeline around a flight, and the trip structure every crew application relies on.' },
    { kind: 'callout', tone: 'warning', icon: 'mdi-alert-outline', title: 'One flight, separate workgroups', text: 'Pilots and Flight Attendants share flights and trip structure, but they have separate qualifications, contracts, bidding rules, legality rules, and position assignments.' },
    { kind: 'header', icon: 'mdi-account-search-outline', color: '#5A2D82', title: 'Who’s on the aircraft', text: 'The operating crew consists of the flight deck and cabin crew. These are the people assigned to operate the flight.' },
    { kind: 'table', title: 'Operating crew', columns: ['Role', 'Primary responsibility', 'Typical coordination'], rows: [
      ['Captain', 'Pilot in command with overall authority for the aircraft and operation.', 'First Officer, dispatch, maintenance, cabin lead, ATC.'],
      ['First Officer', 'Shares flight-deck duties and supports safe operation of the aircraft.', 'Captain, dispatch, ATC.'],
      ['Lead Flight Attendant / Purser', 'Coordinates the cabin team in the assigned lead role.', 'Captain, other Flight Attendants, gate, catering.'],
      ['Flight Attendants', 'Manage cabin safety, security, compliance, emergency readiness, and customer care.', 'Cabin lead, customers, gate, flight deck.'],
    ] },
    { kind: 'header', icon: 'mdi-airport', color: '#B75C09', title: 'Who supports the flight from the ground', text: 'These teams are essential to the departure and recovery chain, but they are not onboard operating crew.' },
    { kind: 'table', title: 'Ground and operational support', columns: ['Role', 'Primary responsibility', 'Typical coordination'], rows: [
      ['Gate agent', 'Controls boarding, customer processing, seat clearance, and the gate side of departure.', 'Cabin crew, operations, customers.'],
      ['Ramp and ground teams', 'Handle bags, fueling coordination, servicing, and pushback.', 'Gate, load planning, flight deck, operations.'],
      ['Dispatcher / Operations Control', 'Monitors the flight plan and network, supporting operational decisions and recovery.', 'Flight deck, stations, maintenance, Crew Scheduling.'],
      ['Crew Scheduling', 'Protects legal crew coverage and manages assignments during disruptions.', 'Crew members, operations, hotels, transportation.'],
    ] },
    { kind: 'header', icon: 'mdi-timeline-clock-outline', color: '#0B6A0B', title: 'The crew clock is wider than the flight', text: 'A single flight has several clocks. Crew duty begins before block-out and ends after block-in.' },
    { kind: 'flow', title: 'One duty period', text: 'Play the clock', items: [
      { label: 'Report', icon: 'mdi-login-variant', color: '#003057', detail: 'The crew checks in and begins duty at the required report time.' },
      { label: 'Brief and prepare', icon: 'mdi-clipboard-text-outline', color: '#5A2D82', detail: 'Crew briefing, aircraft preparation, required checks, and boarding occur before departure.' },
      { label: 'Block out', icon: 'mdi-airplane-clock', color: '#0061AB', detail: 'The aircraft moves from the gate; block time starts.' },
      { label: 'Block in', icon: 'mdi-airplane-marker', color: '#0B6A0B', detail: 'The aircraft parks at the arrival gate; block time ends.' },
      { label: 'Release', icon: 'mdi-exit-run', color: '#C01933', detail: 'Required post-arrival work is complete and the crew is released from duty.' },
    ] },
    { kind: 'table', title: 'Crew-clock examples', columns: ['Clock', 'Example', 'Duration'], rows: [
      ['Duty time', 'Report 08:30 → release 14:00', '5 h 30 min'], ['Block time', 'Gate-out 10:00 → gate-in 13:00', '3 h'],
      ['Ground turn time', 'Gate-in 13:00 → next gate-out 14:05', '1 h 05 min'], ['Layover / rest interval', 'Release 18:30 → next report 07:00', '12 h 30 min elapsed'],
      ['Time Away From Base', 'First report at base → final release back at base', 'Spans the entire sequence'],
    ], termIds: ['duty-period', 'block-time', 'ground-turn', 'layover', 'tafb'] },
    { kind: 'callout', tone: 'info', icon: 'mdi-clock-alert-outline', title: 'Scheduled, estimated, and actual are separate', text: 'Never overwrite the schedule with the latest estimate or the actual event. Those timestamps answer different operational, legality, customer, and pay questions.' },
    { kind: 'header', icon: 'mdi-megaphone-outline', color: '#C01933', title: 'Cabin crew commands', text: 'Standard commands create a shared closed-loop response. Exact wording varies by airline and procedure.' },
    { kind: 'table', title: 'Common command-and-response concepts', columns: ['Command or report', 'Operational meaning', 'Expected outcome'], rows: [
      ['Prepare doors for departure', 'Set assigned doors for departure mode.', 'Each Flight Attendant completes the required door procedure.'],
      ['Cross-check', 'Independently verify another assigned door’s status.', 'A mismatch is challenged and corrected.'],
      ['Armed and cross-checked', 'Departure door configuration has been completed and verified.', 'The cabin lead receives a closed-loop status.'],
      ['Disarm doors and cross-check', 'Return doors to arrival mode and independently verify.', 'Slides will not deploy during normal door opening.'],
      ['Cabin secure', 'Required cabin checks are complete for departure or landing.', 'The flight deck receives the cabin status.'],
      ['Flight Attendants, take your jumpseats', 'Move immediately to assigned stations and secure.', 'Crew are seated and ready for the announced phase or condition.'],
    ] },
    { kind: 'header', icon: 'mdi-family-tree', color: '#0061AB', title: 'Sequence, duty period, and segment', text: 'This nesting is the backbone of crew scheduling, legality, tracking, and pay.' },
    { kind: 'diagram', caption: 'A sequence contains duty periods; a duty period contains operating or deadhead segments. Rest or a layover separates duty periods.', code: `flowchart TD
  S["SEQUENCE / TRIP — base to base"] --> D1["Duty period 1 — report to release"]
  S --> D2["Duty period 2 — report to release"]
  D1 --> G1["Segment 1"]
  D1 --> G2["Segment 2"]
  D1 -- "layover / rest" --> D2
  D2 --> G3["Segment 3"]` },
    { kind: 'callout', tone: 'primary', icon: 'mdi-key-chain', title: 'Trip identity and flight identity are different', text: 'Sequence number, date, base, and position identify the crew trip. Carrier, flight number, flight date, origin, and departure instance identify a particular flight segment.' },
    { kind: 'table', title: 'Crew terminology', columns: ['Term', 'Plain-language meaning', 'System boundary'], rows: [
      ['Sequence / pairing / trip', 'A packaged journey normally beginning and ending at a crew base.', 'The unit commonly awarded, assigned, traded, and tracked.'],
      ['Duty period', 'One working day from report through release.', 'Contains one or more segments and its own legality checks.'],
      ['Segment / leg', 'One movement from an origin to a destination.', 'Can be operating or deadheading for a crew member.'],
      ['Report', 'The required time and place to begin duty.', 'Starts the duty clock.'], ['Release', 'The end of required duties for that duty period.', 'Ends the duty clock.'],
      ['Block time', 'Aircraft gate-out to gate-in.', 'A flight clock, not the whole crew-duty clock.'], ['Turn / one-day turn', 'A sequence with one duty period that returns to base the same day.', 'A trip shape, distinct from the ground turn interval between segments.'],
      ['Layover', 'Time and location away from base between duty periods.', 'Connects rest, hotel, transportation, and per diem.'], ['Home Base Time (HBT)', 'The time-zone reference attached to the crew base.', 'Rules must identify which time basis applies.'],
    ], termIds: ['sequence', 'duty-period', 'flight-segment', 'report-time', 'release', 'block-time', 'turn', 'layover', 'hbt'] },
  ], quiz: [],
}

const flightAttendants: AcademyModule = {
  id: 'fa-operations', number: 3, title: 'Flight Attendants', icon: 'mdi-account-tie-outline', color: '#0078D2',
  tagline: 'Follow the Flight Attendant from monthly schedule and position assignment through report, flying, and release.', estimatedMinutes: 26, terms: [],
  blocks: [
    { kind: 'hero', icon: 'mdi-account-tie-outline', title: 'FLIGHT ATTENDANTS', text: 'A Flight Attendant is a qualified safety professional working a specific cabin position on a legal sequence. Their month combines awarded work, days off, schedule changes, training, and sometimes on-call availability.' },
    { kind: 'callout', tone: 'error', icon: 'mdi-shield-account-outline', title: 'Safety professional first', text: 'Service is visible, but safety, security, compliance, emergency readiness, and passenger management define the role.' },
    { kind: 'header', icon: 'mdi-card-account-details-outline', color: '#5A2D82', title: 'How a Flight Attendant is identified', text: 'The lifecycle deck defines six attributes that together determine what the system may legally and contractually assign. They must be effective-dated because several can change month to month or day to day.' },
    { kind: 'table', title: 'The six-part assignment identity', columns: ['Attribute', 'What it represents', 'Assignment impact'], rows: [
      ['Base', 'The crew base to which the Flight Attendant is assigned.', 'Defines the home-base context where sequences normally begin and end.'],
      ['Seniority', 'Occupational ranking, commonly tied to date of hire.', 'Influences bidding and award order; it does not identify the operating position.'],
      ['Status', 'Lineholder or Reserve for the applicable bid month.', 'Determines whether the starting schedule contains sequences or reserve availability.'],
      ['Qualifications', 'Current aircraft, position, language, destination-document, and training eligibility.', 'Gates which work may legally be assigned.'],
      ['Position', 'The actual cabin role assigned for the sequence or segment.', 'Determines doors, zone, equipment, and emergency responsibilities.'],
      ['Availability', 'Vacation, leave, training, sick, rest, and other conditions affecting assignment.', 'Determines whether the person can be assigned at a particular time.'],
    ], termIds: ['crew-base', 'seniority-occupational', 'lrd', 'qualification', 'position', 'availability'] },
    { kind: 'callout', tone: 'primary', icon: 'mdi-shield-search-outline', title: 'Identity is not one profile field', text: 'Employee identity answers who the person is. Assignment identity answers whether this person, at this base, in this month, with these qualifications, this position, and this availability can work this trip. Preserve the effective date and source of every attribute.' },
    { kind: 'header', icon: 'mdi-seat-passenger', color: '#0078D2', title: 'Positioning and staffing vocabulary', text: 'Aircraft type, cabin position, qualifications, and staffing complement determine what a Flight Attendant is assigned to do.' },
    { kind: 'illustration', variant: 'cabin', caption: 'Positions anchor Flight Attendants to defined doors, cabin zones, equipment, jumpseats, and emergency responsibilities.' },
    { kind: 'table', title: 'Positioning terms', columns: ['Term', 'Meaning', 'Important distinction'], rows: [
      ['Position', 'The assigned cabin role for a sequence or segment.', 'Use the operating assignment; never infer it from seniority.'],
      ['Lead Flight Attendant / Purser', 'The assigned lead cabin role.', 'Naming can vary by aircraft, operation, and source system.'],
      ['Complement', 'The required Flight Attendant staffing level for the aircraft and operation.', 'Scheduled, minimum, and actual staffing may need separate fields.'],
      ['Qualification', 'A current authorization needed for specific work.', 'May include aircraft, position, language, documents, or training.'],
      ['Base', 'The Flight Attendant’s assigned operating location.', 'Different from home address or current physical location.'],
      ['Commuter', 'A Flight Attendant who lives away from base and travels there before report.', 'The personal commute is distinct from company-assigned deadheading.'],
    ], termIds: ['position', 'position', 'complement', 'qualification', 'crew-base', 'commuter'] },
    { kind: 'header', icon: 'mdi-calendar-month-outline', color: '#5A2D82', title: 'What a typical month can contain', text: 'No single calendar is “typical,” but these are the recurring building blocks users see.' },
    { kind: 'terms', title: 'Monthly schedule building blocks', items: [
      { id: 'sequence', term: 'Sequences', icon: 'mdi-route', definition: 'One- or multi-day trips made of duty periods and segments.' }, { id: 'availability', term: 'Days off', icon: 'mdi-calendar-remove-outline', definition: 'Calendar days without scheduled work, subject to the person’s status and current rules.' },
      { id: 'cq-training', term: 'Training', icon: 'mdi-school-outline', definition: 'Required qualification or recurrent events that occupy schedule time.' }, { id: 'availability', term: 'Vacation / leave', icon: 'mdi-beach', definition: 'Approved absence that affects availability and monthly schedule construction.' },
      { id: 'tts', term: 'Schedule transactions', icon: 'mdi-swap-horizontal', definition: 'Permitted trades, drops, pickups, or other changes after award.' }, { id: 'irops', term: 'Operational changes', icon: 'mdi-alert-sync-outline', definition: 'Reassignments, cancellations, delays, and recovery actions during execution.' },
    ] },
    { kind: 'prose', title: 'Illustrative Lineholder week', icon: 'mdi-calendar-week', body: `- **Mon–Tue:** two-day sequence with one layover
- **Wed–Thu:** days off
- **Fri:** one-day turn
- **Sat:** training event
- **Sun:** day off

The next week may look entirely different. A monthly line is not a repeating Monday-to-Friday schedule.` },
    { kind: 'header', icon: 'mdi-clipboard-list-outline', color: '#0B6A0B', title: 'The working-day workflow: report to release', text: 'The workflow repeats inside each duty period, with aircraft and customer details changing segment by segment.' },
    { kind: 'steps', title: 'A Flight Attendant’s duty day', items: [
      { icon: 'mdi-badge-account-outline', title: '1 · Report and check in', detail: 'Confirm the sequence, aircraft, position, crew, qualifications, notifications, and current operating details.' },
      { icon: 'mdi-clipboard-text-outline', title: '2 · Crew briefing', detail: 'Review roles, safety and security information, customer considerations, service plan, and operational conditions.' },
      { icon: 'mdi-airplane-check', title: '3 · Preflight the assigned position', detail: 'Check assigned doors, emergency equipment, jumpseat area, cabin zone, and required supplies.' },
      { icon: 'mdi-account-multiple-plus', title: '4 · Board and prepare the cabin', detail: 'Manage customer needs, carry-ons, seating, special passenger handoffs, and cabin readiness.' },
      { icon: 'mdi-door-closed-lock', title: '5 · Close, arm, and secure', detail: 'Complete door procedures, cross-checks, safety demonstration, and cabin-secure duties.' },
      { icon: 'mdi-airplane', title: '6 · Operate the segment', detail: 'Monitor safety and security, respond to turbulence or events, coordinate with the flight deck, and deliver service.' },
      { icon: 'mdi-airplane-landing', title: '7 · Prepare and land', detail: 'Secure cabin and galleys, complete compliance checks, occupy the assigned jumpseat, and remain alert.' },
      { icon: 'mdi-account-multiple-minus', title: '8 · Arrive and deplane', detail: 'Disarm and cross-check, coordinate door opening, assist customers, and check the cabin.' },
      { icon: 'mdi-transit-connection-variant', title: '9 · Continue or close', detail: 'Prepare the next segment, begin a layover, deadhead, or complete final post-flight duties.' },
      { icon: 'mdi-exit-run', title: '10 · Release', detail: 'The duty period ends only when required work is complete and the Flight Attendant is released.' },
    ] },
    { kind: 'header', icon: 'mdi-seat-recline-extra', color: '#C01933', title: 'Moving a Flight Attendant without having them operate', text: 'The same person may be a working crew member on one segment and a passenger-positioned crew member on another.' },
    { kind: 'table', title: 'Deadheading and positioning terminology', columns: ['Term', 'Meaning', 'Do not confuse it with'], rows: [
      ['Deadhead', 'Company-directed travel as a passenger to position or return a crew member.', 'Operating the flight in an assigned cabin position.'],
      ['Positioning', 'The broader act of moving a crew member where the operation needs them.', 'Cabin position assignment.'],
      ['Operating segment', 'A segment on which the Flight Attendant performs assigned crew duties.', 'A deadhead segment on the same itinerary.'],
      ['Positive-space travel', 'Company-protected confirmed travel used for an operational purpose under applicable rules.', 'Space-available personal travel.'],
      ['Commuting', 'Personal travel from home to the assigned base before report.', 'Company-assigned deadheading.'],
      ['Ferry flight', 'An aircraft movement primarily for positioning or another non-revenue purpose.', 'A crew member deadheading on a normal passenger flight.'],
    ], termIds: ['deadhead', 'deadhead', 'flight-segment', 'deadhead', 'commuter', 'flight-segment'] },
    { kind: 'header', icon: 'mdi-cash-clock', color: '#B75C09', title: 'Pay at a high level', text: 'The introductory model is simple: elapsed work, flight time, credit, and pay are related but not equal.' },
    { kind: 'terms', title: 'Four concepts to keep separate', items: [
      { id: 'block-time', term: 'Block time', icon: 'mdi-airplane-clock', definition: 'Gate-out to gate-in for a flight segment; an important input, not the whole pay result.' },
      { id: 'credited-hours', term: 'Credit', icon: 'mdi-counter', definition: 'The value applied to a trip, assignment, or month under applicable rules.' },
      { id: 'tafb', term: 'TAFB', icon: 'mdi-timer-sand', definition: 'Time Away From Base from the beginning of a sequence until final release back at base.' },
      { id: 'rig', term: 'Guarantee / RIG', icon: 'mdi-shield-crown-outline', definition: 'A contractual floor that can protect pay or credit when raw block time alone is too low.' },
    ] },
    { kind: 'callout', tone: 'info', icon: 'mdi-book-arrow-right-outline', title: 'Keep the first pass conceptual', text: 'Exact minimums, ratios, premiums, exceptions, pay protection, and implementation dates belong in the later pay module. Here, the key is to avoid equating hours away, hours on duty, block hours, credit, and dollars.' },
    { kind: 'header', icon: 'mdi-account-switch-outline', color: '#0061AB', title: 'Lineholder and Reserve — the major monthly split', text: 'Both are Flight Attendants with the same safety role. What changes is how the month is scheduled and how new flying reaches them.' },
    { kind: 'compare', title: 'How the two statuses feel in practice', items: [
      { title: 'Lineholder', icon: 'mdi-calendar-check', color: '#0061AB', points: ['Begins the month with awarded sequences and days off', 'Can usually see most planned report and release times in advance', 'May reshape the schedule through permitted trades, drops, and pickups', 'Still experiences delays, cancellations, and operational reassignment', 'Applications emphasize award history, transactions, and the current operating schedule'] },
      { title: 'Reserve', icon: 'mdi-phone-incoming', color: '#C01933', points: ['Begins with reserve days, days off, and defined availability windows', 'Receives flying or standby assignments as coverage needs become known', 'Must remain contactable and able to meet the applicable report requirement', 'Assignment depends on availability, qualification, legality, and current reserve rules', 'Applications emphasize availability, contact attempts, acknowledgement, assignment, and legality'] },
    ] },
    { kind: 'table', title: 'Lineholder and Reserve terminology', columns: ['Term', 'Meaning', 'Why it matters'], rows: [
      ['Line / Line of Time', 'A monthly schedule containing awarded work and days off.', 'The starting schedule must remain distinguishable from later changes.'], ['Lineholder', 'A Flight Attendant holding a line for the bid month.', 'Generally begins with known sequences.'],
      ['Reserve', 'A Flight Attendant assigned availability to cover operational need.', 'Flying may be assigned after the monthly award.'], ['RAP', 'Reserve Availability Period.', 'Defines an availability/contact window; exact times can vary by governed configuration.'],
      ['Standby', 'A defined placement where a Reserve waits for possible assignment.', 'Not the same as a passenger awaiting seat clearance.'], ['Assignment', 'The work or standby placed on a Flight Attendant’s schedule.', 'Source, notification, acknowledgement, and effective time matter.'],
      ['Seniority', 'Occupational ranking commonly based on date of hire.', 'Influences bidding and awards but does not replace actual assignment data.'], ['Golden / Flex day', 'Reserve day-off categories with different protections under current rules.', 'Preserve the category rather than storing only “off.”'],
    ], termIds: ['line-of-time', 'lineholder', 'reserve-line', 'rap', 'standby', 'assignment', 'seniority-occupational', 'golden-day'] },
    { kind: 'callout', tone: 'primary', icon: 'mdi-database-clock-outline', title: 'The system needs history, not just the latest schedule', text: 'Preserve the original award, every later transaction or assignment, notifications and acknowledgements, and the current operating view. Each answers a different business question.' },
  ], quiz: [],
}

export const interactiveModules: AcademyModule[] = [fundamentals, crew, flightAttendants]
