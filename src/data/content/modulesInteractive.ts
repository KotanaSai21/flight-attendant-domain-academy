import type { AcademyModule } from '../types'

/* ==================================================================
 * MODULE 1 — AIRLINE FUNDAMENTALS (interactive · basics first)
 * ================================================================== */
const fundamentals: AcademyModule = {
  id: 'airline-fundamentals',
  number: 1,
  title: 'Airline Fundamentals',
  icon: 'mdi-airplane',
  color: '#0061AB',
  tagline: 'Learn the words first — airports, aircraft, people, flight phases and the crew clock.',
  estimatedMinutes: 20,
  terms: ['duty-period', 'sequence', 'crew-base'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-airplane',
      title: 'AIRLINE FUNDAMENTALS',
      text: 'Everything starts with vocabulary. Before schedules, bidding or reserves, learn the words everyone uses: the airport, the aircraft, the people, the phases of a flight, and how the crew clock works. Safety first — always.',
    },
    {
      kind: 'callout',
      tone: 'error',
      icon: 'mdi-shield-check',
      title: 'Safety first, always',
      text: 'The primary role of a Flight Attendant is PASSENGER SAFETY — delivered through four lenses: safety, security, service, compliance. Every action aboard should contribute to one of them, with safety first.',
    },

    // ---------- SECTION 1 ----------
    {
      kind: 'header',
      icon: 'mdi-airport',
      color: '#0061AB',
      title: '1 · The airport & the aircraft',
      text: 'The physical world the operation runs in — and the parts of the aircraft FAs are responsible for.',
    },
    {
      kind: 'illustration',
      variant: 'airport',
      caption:
        'A departure is a physical handoff chain: passengers flow terminal → gate → jet bridge, while ground staff service the aircraft on the ramp (apron).',
    },
    {
      kind: 'terms',
      title: 'Airport words',
      items: [
        { term: 'Terminal', icon: 'mdi-storefront-outline', definition: 'Main building where passengers check in, shop and wait.' },
        { term: 'Gate', icon: 'mdi-door-open', definition: 'The specific location where passengers board a particular flight.' },
        { term: 'Jet bridge', icon: 'mdi-bridge', definition: 'The walkway connecting the terminal directly to the aircraft door.' },
        { term: 'Runway', icon: 'mdi-arrow-expand-right', definition: 'The strip of pavement used for takeoff and landing.' },
        { term: 'Taxiway', icon: 'mdi-road-variant', definition: 'The path aircraft use to move between runway and gate.' },
        { term: 'Apron / ramp', icon: 'mdi-warehouse', definition: 'The area where aircraft park, and get loaded, unloaded and refueled.' },
      ],
    },
    {
      kind: 'illustration',
      variant: 'aircraft',
      caption:
        'Common parts of an aircraft. Flight attendants own the cabin, the doors and the galleys — the flight deck owns everything forward of the door.',
    },
    {
      kind: 'callout',
      tone: 'primary',
      icon: 'mdi-lightbulb-on-outline',
      title: 'Why precision matters',
      text: 'Requirements name parts exactly: the overwing exit and the main exit (L1) have different arming, evacuation and staffing duties. Saying “exit” generically is how requirement errors are born.',
    },

    // ---------- SECTION 2 ----------
    {
      kind: 'header',
      icon: 'mdi-account-group-outline',
      color: '#C01933',
      title: "2 · Who's who on a flight",
      text: 'Four roles share one departure. Two sit up front, two worlds share the cabin.',
    },
    {
      kind: 'terms',
      title: 'The four roles',
      items: [
        { term: 'Captain', icon: 'mdi-account-tie-hat', definition: 'Overall authority on the flight — responsible for the aircraft, its crew and every operational decision.' },
        { term: 'First Officer', icon: 'mdi-account-tie', definition: 'Second in command — assists the captain and shares flying and operational duties.' },
        { term: 'Lead Flight Attendant', icon: 'mdi-star-four-points', definition: 'The senior cabin crew member in position 1: manages the cabin crew and the cabin. (AA terminology — other airlines say “Purser”.)' },
        { term: 'Flight Attendants', icon: 'mdi-account-group', definition: 'Cabin crew responsible for emergency response, passenger safety and customer service in their assigned positions.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-check-decagram',
      title: 'Vocabulary check',
      text: 'Verified against the AA/APFA 2024 CBA: the contract defines “Lead Flight Attendant” as the FA awarded position 1 (§2.CC) — “Purser” is other-airline wording. Likewise, AA calls the monthly work schedule a “line” or “schedule”, not a “roster”.',
    },

    // ---------- SECTION 3 ----------
    {
      kind: 'header',
      icon: 'mdi-timer-outline',
      color: '#0B6A0B',
      title: '3 · Flight phases & the crew clock',
      text: 'The ten phases every flight passes through — and the time words that define a working day.',
    },
    {
      kind: 'steps',
      title: 'The 10 phases of a flight',
      items: [
        { icon: 'mdi-account-multiple-check', title: '1 · Boarding', detail: 'Passengers board via the jet bridge; FAs manage the cabin, seat conflicts and headcounts while gate agents own the door.' },
        { icon: 'mdi-truck-trailer', title: '2 · Pushback', detail: 'Doors closed, armed and cross-checked. Ground staff push the aircraft off the gate.' },
        { icon: 'mdi-road-variant', title: '3 · Taxi', detail: 'Aircraft moves along taxiways to the runway; cabin secured, galleys stowed.' },
        { icon: 'mdi-airplane-takeoff', title: '4 · Takeoff', detail: 'Engines to takeoff thrust — the phase where brace-position readiness matters most.' },
        { icon: 'mdi-trending-up', title: '5 · Climb', detail: 'Climb to cruise altitude; service preparation can begin once the seat-belt sign allows.' },
        { icon: 'mdi-weather-sunny', title: '6 · Cruise', detail: 'The service phase — meals, drinks, safety rounds, and watching for turbulence.' },
        { icon: 'mdi-trending-down', title: '7 · Descent', detail: 'Cabin secured for landing: galleys stowed, seat belts checked, cabin verified.' },
        { icon: 'mdi-airplane-landing', title: '8 · Landing', detail: 'Touchdown. FAs stay braced and alert until the aircraft decelerates on the runway.' },
        { icon: 'mdi-taxi', title: '9 · Taxi to gate', detail: 'Taxi to the arrival gate; FAs confirm doors are disarmed only at the gate with the bridge in place.' },
        { icon: 'mdi-account-multiple-minus', title: '10 · Deplaning', detail: 'Passengers off, cabin checked for left items, and the crew prepares for the next leg or release.' },
      ],
    },
    {
      kind: 'terms',
      title: 'The crew clock — five time words',
      items: [
        { id: 'report-time', term: 'Report time', icon: 'mdi-alarm', definition: 'When crew must check in before departure — the legal start of the working day.' },
        { id: 'duty-period', term: 'Duty time', icon: 'mdi-timer-outline', definition: 'From report until release from duty — capped by regulation and contract.' },
        { term: 'Flight time', icon: 'mdi-airplane', definition: 'Actual time from aircraft departure to arrival (airborne time).' },
        { term: 'FDP', icon: 'mdi-clock-time-eight', definition: 'Flight Duty Period — the total duty period involving flight operations.' },
        { id: 'block-time', term: 'Block time', icon: 'mdi-timelapse', definition: 'Gate-out to gate-in — the basis for most pay calculations.' },
      ],
    },
    {
      kind: 'prose',
      title: 'Worked example',
      icon: 'mdi-numeric',
      body: `Report **08:30** → departure **10:00** → arrival **13:00** → release **14:00**

- **Duty time** = 08:30 → 14:00 = **5 h 30 min**
- **Flight time** = 10:00 → 13:00 = **3 h**

Same trip, three different clocks — requirements that say “5.5 hours” and “3 hours” mean very different things.`,
    },
    {
      kind: 'terms',
      title: 'Acronyms you will hear daily',
      items: [
        { term: 'ATC', icon: 'mdi-radar', definition: 'Air Traffic Control — clears and sequences every movement.' },
        { term: 'ETA / ETD', icon: 'mdi-clock-fast', definition: 'Estimated Time of Arrival / of Departure.' },
        { term: 'UTC', icon: 'mdi-earth', definition: 'Universal Time Coordinate — the aviation clock everything references (local time = UTC + offset).' },
        { term: 'FAA', icon: 'mdi-shield-airplane', definition: 'Federal Aviation Administration — the US regulator.' },
        { term: 'MEL', icon: 'mdi-wrench-outline', definition: 'Minimum Equipment List — what may legally be broken and still fly.' },
        { term: 'PNR', icon: 'mdi-account-box-outline', definition: 'Passenger Name Record — the booking that ties a passenger to flights.' },
        { term: 'FDP', icon: 'mdi-clock-time-eight', definition: 'Flight Duty Period — the duty window containing flight operations.' },
        { term: 'SOP', icon: 'mdi-book-open-variant', definition: 'Standard Operating Procedure — the agreed way to do a task.' },
        { term: 'CRM', icon: 'mdi-account-voice', definition: 'Crew Resource Management — effective communication and teamwork in the cockpit AND cabin.' },
        { term: 'IROPS', icon: 'mdi-weather-lightning', definition: 'Irregular operations — delays, diversions, cancellations and the reaccommodation dance.' },
        { term: 'OCC', icon: 'mdi-monitor-dashboard', definition: 'Operations Control Center — the airline’s nerve center watching every flight.' },
        { term: 'Standby', icon: 'mdi-phone-hangup', definition: 'Airport or home reserve placement to replace unavailable crew at short notice.' },
      ],
    },
    {
      kind: 'terms',
      title: 'Passenger categories',
      items: [
        { term: 'UMNR', icon: 'mdi-account-child-outline', definition: 'Unaccompanied Minor — a child flying alone with handover procedures at both ends.' },
        { term: 'PRM', icon: 'mdi-wheelchair-accessibility', definition: 'Passenger with Reduced Mobility — needs boarding/deplaning assistance.' },
        { term: 'INF', icon: 'mdi-baby-carriage', definition: 'Infant — lap child or bassinet considerations on board.' },
        { term: 'MEDA', icon: 'mdi-medical-bag', definition: 'Medical Assistance passenger — traveling with medical clearance or equipment.' },
      ],
    },
    {
      kind: 'prose',
      title: 'Cabin crew commands you will hear',
      icon: 'mdi-megaphone-outline',
      body: `- **“Cabin crew, prepare doors for departure.”**
- **“Cross-check.”** → **“Armed and cross-checked.”**
- **“Disarm doors and cross-check.”**
- **“Cabin secure.”**

These verify that every door is armed (slide connected) before takeoff and disarmed at the gate so the slide will not deploy into the bridge. Exact AA scripts are internal — the *concept* is universal.`,
    },
    {
      kind: 'callout',
      tone: 'success',
      icon: 'mdi-flag-variant-outline',
      title: 'Golden rule',
      text: 'Every action should contribute to passenger safety, security or comfort — with safety always coming first. You now have the words. Next: meet the flight attendants themselves →',
    },
  ],
  quiz: [
    {
      question: 'The primary role of a Flight Attendant is…',
      options: ['Customer service', 'Passenger safety', 'On-time performance', 'Baggage handling'],
      answerIndex: 1,
      explanation: 'Safety first — delivered through safety, security, service and compliance.',
    },
    {
      question: 'Report 08:30, depart 10:00, arrive 13:00, release 14:00. Duty time is:',
      options: ['3 hours', '4 hours 30 min', '5 hours 30 min', '6 hours'],
      answerIndex: 2,
      explanation: 'Duty runs report→release: 08:30–14:00 = 5 h 30 min. Flight time (10:00–13:00) is only 3 h.',
    },
    {
      question: 'AA’s term for the senior cabin crew member in position 1:',
      options: ['Purser', 'Cabin Manager', 'Lead Flight Attendant', 'Chief Steward'],
      answerIndex: 2,
      explanation: 'The 2024 CBA defines “Lead Flight Attendant” (§2.CC); “Purser” is other-airline wording.',
    },
    {
      question: 'Block time measures…',
      options: [
        'Airborne time only',
        'Gate-out to gate-in',
        'Report to release',
        'Turn time on the ground',
      ],
      answerIndex: 1,
      explanation: 'Block = gate-out to gate-in; it is the basis for most pay calculations.',
    },
    {
      question: '“Armed and cross-checked” refers to…',
      options: [
        'Weapons protocol',
        'Door slide connection verified by two crew independently',
        'Meal counts matched to headcount',
        'Cockpit door lock procedure',
      ],
      answerIndex: 1,
      explanation: 'Doors are armed before takeoff (slide will deploy) and cross-checked by another crew member; disarmed at the gate.',
    },
  ],
}

/* ==================================================================
 * MODULE 2 — FA LIFECYCLE & WORKGROUPS (interactive)
 * ================================================================== */
const lifecycle: AcademyModule = {
  id: 'fa-lifecycle',
  number: 2,
  title: 'FA Lifecycle & Workgroups',
  icon: 'mdi-account-switch-outline',
  color: '#5A2D82',
  tagline: 'Who supports a flight, how flight attendants are organized, and how sequences are built.',
  estimatedMinutes: 25,
  terms: ['sequence', 'crew-base', 'co-terminal', 'commuter', 'lineholder', 'seniority-occupational'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-account-switch-outline',
      title: 'FA LIFECYCLE & WORKGROUPS',
      text: 'A flight is a team effort. Before we can schedule a flight attendant, we need to know who else touches the departure, how an FA is identified in our data, and why seniority decides so much.',
    },
    {
      kind: 'flow',
      title: 'Every departure is a four-way handoff',
      text: 'Play the handoff',
      items: [
        { label: 'Gate agents', icon: 'mdi-door-sliding-open', color: '#C01933', detail: 'Board the flight, manage the door, reseat and clear standbys, process upgrades — and confirm the crew has reported before departure. They need accurate crew report status and headcounts.' },
        { label: 'Ground staff', icon: 'mdi-luggage', color: '#B75C09', detail: 'Bags, fueling, catering, cleaning, pushback. They work to the turn clock, not the passenger clock — reliable turn timing tied to the schedule is their lifeline.' },
        { label: 'Flight deck', icon: 'mdi-airplane-marker', color: '#243B53', detail: 'Captain and first officer. Qualified by aircraft fleet and seat, bidding by seniority within base and fleet, governed by flight-time and duty limits.' },
        { label: 'Cabin crew', icon: 'mdi-account-group', color: '#0061AB', detail: 'Flight attendants — safety first, service always. Qualified by aircraft door and language, bidding by seniority within base and position, governed by duty, rest and staffing minimums. Our primary user group.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      icon: 'mdi-alert-outline',
      title: '“Crew” is two different worlds',
      text: 'Pilots and flight attendants fly the same sequence structure but under separate contracts, separate bidding systems and separate qualification rules. Never mix the two when reading requirements.',
    },
    {
      kind: 'terms',
      title: 'How the system knows who you are',
      items: [
        { id: 'crew-base', term: 'Base', icon: 'mdi-home-city', definition: 'Where sequences start and end — one of eleven crew bases.' },
        { id: 'seniority-occupational', term: 'Seniority', icon: 'mdi-medal-outline', definition: 'Date-of-hire ranking that drives bidding order for lines, vacations and trades.' },
        { id: 'lineholder', term: 'Status', icon: 'mdi-toggle-switch', definition: 'Lineholder or Reserve for the bid month — the biggest fork in the domain.' },
        { term: 'Qualifications', icon: 'mdi-certificate', definition: 'Aircraft, aircraft door, language of destination, international documents.' },
        { term: 'Position', icon: 'mdi-seat-passenger', definition: 'Purser / lead versus cabin position — awarded by bid, fixed for the sequence.' },
        { term: 'Availability', icon: 'mdi-calendar-remove', definition: 'Vacation, leave, training and sick status that gate what may be assigned.' },
      ],
    },
    {
      kind: 'compare',
      title: 'One month, two very different schedules',
      items: [
        {
          title: 'Lineholder — holds a published line',
          icon: 'mdi-calendar-check',
          color: '#0061AB',
          points: [
            'Awarded a full month of sequences by seniority bid',
            'Knows the schedule in advance and plans life around it',
            'Trades, drops and picks up trips within contract rules',
            'System focus: bidding, trading, schedule integrity',
          ],
        },
        {
          title: 'Reserve — on call for the operation',
          icon: 'mdi-phone-incoming',
          color: '#C01933',
          points: [
            'Assigned availability windows (RAPs), not fixed trips',
            'Called out to cover sick calls, delays and misconnects',
            'Protected Golden Days and flexible Flex Days off',
            'System focus: availability, notification, legality',
          ],
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-trophy-outline',
      title: 'Seniority decides the split',
      text: 'Junior flight attendants typically sit on Reserve until their seniority lets them hold a line. That single fact shapes careers, bidding strategy and base staffing math.',
    },
    {
      kind: 'illustration',
      variant: 'network',
      caption:
        'Eleven crew bases anchor every sequence. Dashed rings mark co-terminal metros (JFK·LGA, DCA·IAD, ORD·MDW, DFW·DAL) — one base for reporting and pay. The animated loop is the 3-day DFW trip below.',
    },
    {
      kind: 'steps',
      title: "A commuter's morning",
      items: [
        { icon: 'mdi-bed', title: 'Lives in Tampa, based at DFW', detail: 'She is a commuter — the schedule has to work for people who do not live in base. Commuting happens on personal time.' },
        { icon: 'mdi-ticket-account', title: '0430 — Nonrev on the 0545', detail: 'Standby on a company flight, jumpseat if needed. Report time at DFW still governs legality — the commute never buys extra duty time.' },
        { icon: 'mdi-alert-circle-check', title: 'Connection fails? Protections kick in', detail: 'Contracts typically add commuter protections when a failed connection threatens a sequence — a classic edge case our tooling must handle.' },
        { icon: 'mdi-login-variant', title: '0700 — Report, legal and on time', detail: 'Crew room check-in, sequence pulled up, position confirmed. The closed loop starts here — and must end here too.' },
      ],
    },
    {
      kind: 'diagram',
      caption: 'Sequence → duty periods → segments. Rest separates the duty days.',
      code: `flowchart TD
  S["SEQUENCE — one trip, base to base"] --> D1["Duty period 1"]
  S --> D2["Duty period 2"]
  S --> D3["Duty period 3"]
  D1 -- "rest (layover)" --> D2
  D2 -- "rest (layover)" --> D3
  D1 --> F1["Segment"]
  D1 --> F2["Segment"]
  D3 --> F3["Segment"]`,
    },
    {
      kind: 'prose',
      title: 'Two keys, two jobs',
      icon: 'mdi-key-chain',
      body: `**Sequence identifiers** (sequence number, sequence date, position) answer *“what trip am I working?”*
**Flight identifiers** (carrier code, flight number, flight date, departure city, duplicate departure code) answer *“which exact leg is operating?”*

Two sequences can even **share the same middle legs** — Sequence A (base MIA): MIA→DFW→PHX→LAX→MIA; Sequence B (base DFW): DFW→PHX→LAX→SFO→DFW. Both fly DFW→PHX→LAX with different crews, then peel off to their own homes. The overlap never changes where a sequence ends.`,
    },

    // ---------- The FA's month ----------
    {
      kind: 'header',
      icon: 'mdi-calendar-month-outline',
      color: '#0078D2',
      title: 'The FA’s month at a glance',
      text: 'However an FA is identified, every month follows the same arc: the company publishes flying, the FA bids, a schedule is awarded, life reshapes it, the operation runs it, and payroll settles it.',
    },
    {
      kind: 'flow',
      title: 'From published schedule to paycheck',
      text: 'Play the month',
      items: [
        {
          label: 'Schedule',
          icon: 'mdi-calendar-edit',
          color: '#003057',
          detail:
            'Network Planning publishes which cities get flights, how often, and with which aircraft — months in advance. This schedule is a promise the operation must keep.',
        },
        {
          label: 'Pairings',
          icon: 'mdi-route',
          color: '#0061AB',
          detail:
            'Workforce Planning bundles flights into sequences (pairings): 1–4 duty days of work that one crew flies end-to-end, starting and ending at the same crew base.',
        },
        {
          label: 'PBS bid',
          icon: 'mdi-ballot',
          color: '#0078D2',
          detail:
            'Flight Attendants rank their preferences in PBS. The engine assembles pairings into legal monthly lines — most senior preferences first.',
        },
        {
          label: 'Award',
          icon: 'mdi-certificate-outline',
          color: '#5A2D82',
          detail:
            'Everyone lands in one of two schedules: a Lineholder holds a Line of Time (70–90 hrs of trips); a Reserve holds availability windows (RAPs) instead.',
        },
        {
          label: 'TTS · ETB',
          icon: 'mdi-swap-horizontal',
          color: '#C01933',
          detail:
            'Life happens. Lineholders reshape the month — drops, pickups and trades in scheduled TTS runs, or instantly on the first-come/first-served ETB board.',
        },
        {
          label: 'Day of ops',
          icon: 'mdi-phone-incoming',
          color: '#0B6A0B',
          detail:
            'Cancellations and sick calls create open time. Reserves cover it via ROTA (tomorrow) and ROTD (today); Crew Scheduling owns the clock at the gate.',
        },
        {
          label: 'Payroll',
          icon: 'mdi-cash-check',
          color: '#B75C09',
          detail:
            'Every flown, protected or guaranteed hour becomes credited hours and dollars — rigs, premiums and guarantees turn operations into a paycheck.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-map-marker-right',
      title: 'Where to go deeper',
      text: 'The monthly world gets its own deep dives: Scheduling (Module 4), PBS (Module 6), Bidding (Module 7) and TTS (Module 9). Reserves add the daily world — Reserve (Module 8).',
    },
  ],
  quiz: [
    {
      question: 'Which group works to the “turn clock” rather than the passenger clock?',
      options: ['Gate agents', 'Ground staff', 'Cabin crew', 'Dispatch'],
      answerIndex: 1,
      explanation: 'Ground staff time aircraft turns — bags, fuel, catering, pushback.',
    },
    {
      question: 'What mostly decides whether an FA is a Lineholder or Reserve?',
      options: ['Base size', 'Language qualifications', 'Seniority', 'Random monthly rotation'],
      answerIndex: 2,
      explanation: 'Junior FAs typically sit on Reserve until seniority lets them hold a line.',
    },
    {
      question: 'JFK and LGA are treated as…',
      options: [
        'Fully separate bases',
        'One New York base for bidding (a co-terminal metro)',
        'Satellite bases of PHL',
        'Training-only bases',
      ],
      answerIndex: 1,
      explanation: 'Co-terminals share reporting and pay treatment; sequences can open at one and close at the other.',
    },
    {
      question: 'A commuter’s failed connection to base means…',
      options: [
        'Automatic termination of the trip',
        'Nothing special — report time is waived',
        'Contractual commuter protections may apply; report legality still governs',
        'The sequence is rebuilt by PBS',
      ],
      answerIndex: 2,
      explanation: 'Commuting is personal time; protections exist but report time remains the legality anchor.',
    },
  ],
}

/* ==================================================================
 * MODULE 3 — FLIGHT ATTENDANT OPERATIONS (interactive)
 * ================================================================== */
const operations: AcademyModule = {
  id: 'fa-operations',
  number: 3,
  title: 'Flight Attendant Operations',
  icon: 'mdi-account-group',
  color: '#0078D2',
  tagline: 'Positions, staffing, and what actually happens from report to release.',
  estimatedMinutes: 20,
  terms: ['sequence', 'deadhead', 'position', 'layover'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-account-group',
      title: 'FLIGHT ATTENDANT OPERATIONS',
      text: 'Every aircraft type requires a legally mandated number of flight attendants, split into numbered positions. Positioning is safety architecture — each position owns specific doors, equipment and emergency duties.',
    },
    {
      kind: 'illustration',
      variant: 'cabin',
      caption:
        'Top view: position 1 (the lead) works the L1 door, other positions anchor their own zones and exits. Galleys bookend the cabin; doors L1/R1, L2/R2, L4/R4 pair across the aisle.',
    },
    {
      kind: 'terms',
      title: 'Positioning vocabulary',
      items: [
        { term: 'Position', icon: 'mdi-numeric-1-box-outline', definition: 'Numbered area of responsibility (1, 2, 3…). Position 1 is the Lead / purser when awarded.' },
        { term: 'Complement', icon: 'mdi-counter', definition: 'The required number of FAs for the aircraft — staffing below it is illegal to depart.' },
        { term: 'Lead FA', icon: 'mdi-star-outline', definition: 'Whoever holds position 1 on the sequence — not simply the most senior person aboard.' },
        { id: 'deadhead', term: 'Deadhead', icon: 'mdi-seat-recline-extra', definition: 'Riding as a passenger to reposition — on duty, paid, but not working. Positive-space when covering an assignment.' },
      ],
    },
    {
      kind: 'steps',
      title: 'Report → release: the working sequence',
      items: [
        { icon: 'mdi-badge-account', title: 'Report & briefing', detail: 'Crew check in together. The lead runs the briefing: positions, service plan, safety duties, timing. One FA keeps one position number for the entire sequence — even across equipment changes.' },
        { icon: 'mdi-airplane-check', title: 'Preflight the cabin', detail: 'Emergency equipment checks (doors, slides, extinguishers, oxygen), catering counts, cabin readiness. Each position verifies its own zone.' },
        { icon: 'mdi-account-multiple-plus', title: 'Boarding', detail: 'Gate agents manage the door and headcount; FAs manage the cabin: seat disputes, standby seating, carry-on help. The lead confirms with the gate that crew are reported and the cabin is secure.' },
        { icon: 'mdi-door-closed', title: 'Door close & demo', detail: 'Arming slides, cross-check, safety demo. From door close the cabin crew own everything inside the fuselage — the captain owns everything outside it.' },
        { icon: 'mdi-airplane', title: 'In flight', detail: 'Service and safety rounds, galley work, turbulence procedures. Staffing minimums must hold for the entire flight — a crew member incapacitated mid-flight changes the legal picture instantly.' },
        { icon: 'mdi-airplane-landing', title: 'Landing & release', detail: 'Disarm doors, cross-check, deplane. Duty time ends 15 minutes after arrival (Domestic) or 30 (International) — or at actual release, whichever is later.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-swap-horizontal-circle-outline',
      title: 'The other side of the coin',
      text: 'Module 1 followed the aircraft through its 10 flight phases. This is the same day from the FA’s side — it starts before boarding and ends after deplaning, because the duty day is longer than any single flight.',
    },
    {
      kind: 'steps',
      title: 'Typical flight attendant workflow — report to release',
      items: [
        { icon: 'mdi-badge-account-outline', title: '1 · Report for duty', detail: 'Crew room check-in at base: verify the trip, confirm legality, meet the crew. Report time is the legal start of everything.' },
        { icon: 'mdi-clipboard-text-outline', title: '2 · Briefing', detail: 'The lead runs it: position assignments, service plan, safety and security duties, timing for each leg.' },
        { icon: 'mdi-airplane-check', title: '3 · Aircraft checks', detail: 'Each position preflights its zone: emergency equipment (doors, slides, extinguishers, oxygen), catering counts, cabin readiness.' },
        { icon: 'mdi-account-multiple-check', title: '4 · Passenger boarding', detail: 'Gate agents manage the door and headcount; FAs work the cabin — seat disputes, standby seating, carry-on help, UMNR handovers.' },
        { icon: 'mdi-presentation-play', title: '5 · Safety demonstration', detail: 'Doors armed and cross-checked, demo performed, cabin secure report given. From door close, the cabin crew own the interior.' },
        { icon: 'mdi-room-service-outline', title: '6 · In-flight service', detail: 'Service and safety rounds, galley work, turbulence procedures — always watching the cabin while serving it.' },
        { icon: 'mdi-seat-passenger', title: '7 · Cabin prep for landing', detail: 'Galleys stowed, seat belts checked, cabin and lavatories verified, service items secured early on descent.' },
        { icon: 'mdi-airplane-landing', title: '8 · Landing', detail: 'FAs sit braced and alert through touchdown, watching the cabin until the aircraft decelerates clear of the runway.' },
        { icon: 'mdi-account-multiple-minus', title: '9 · Passenger deboarding', detail: 'Doors disarmed and cross-checked at the gate (so slides cannot deploy into the bridge), passengers off, cabin swept for left items.' },
        { icon: 'mdi-note-check-outline', title: '10 · Post-flight duties', detail: 'Paperwork and reports, connected-departure prep for the next leg — or closing duties if the sequence ends at base.' },
        { icon: 'mdi-exit-run', title: '11 · Release', detail: 'Duty ends 15 minutes after arrival (Domestic) or 30 (International) — or at actual release, whichever is later. The clock stops; credit is already posted.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'success',
      icon: 'mdi-lock-check',
      title: 'One position, whole trip',
      text: 'A sequence may mix aircraft types (say A321 and 787 legs), but an FA keeps the same position number throughout. Extra positions required on the bigger aircraft get staffed from other sequences.',
    },
    {
      kind: 'prose',
      title: 'When crews move without working',
      icon: 'mdi-seat-recline-normal',
      body: `**Deadheading** is Company-requested travel to protect a sequence, return to base, or position for business. It counts inside duty periods (report and release buffers wrap the segment), it pays and credits — and when it is positioning you to cover an assignment, you get a seat even on an oversold flight.

**Layovers** structure multi-day trips: the overnight between duty days drives rest legality, hotels and per diem. A well-built sequence balances duty periods with workable layovers — which is exactly what the pairing builders optimize for.`,
    },
  ],
  quiz: [
    {
      question: 'Who is the Lead Flight Attendant?',
      options: [
        'The most senior FA on the aircraft',
        'Whoever holds position 1 on the sequence',
        'Appointed by the captain per leg',
        'Rotates by duty period',
      ],
      answerIndex: 1,
      explanation: 'Lead = position 1 on that sequence.',
    },
    {
      question: 'A sequence mixes A321 and 787 legs. The FA…',
      options: [
        'Changes position per aircraft',
        'Keeps the same position number throughout',
        'Chooses daily',
        'Must deadhead between types',
      ],
      answerIndex: 1,
      explanation: 'Same position across mixed fleet; extra positions on larger aircraft come from other sequences.',
    },
    {
      question: 'Post-flight buffer added to Domestic arrivals for duty computation:',
      options: ['10 minutes', '15 minutes', '30 minutes', '45 minutes'],
      answerIndex: 1,
      explanation: 'Domestic 15, International 30 — or actual release, whichever is later.',
    },
  ],
}

export const interactiveModules: AcademyModule[] = [fundamentals, lifecycle, operations]
