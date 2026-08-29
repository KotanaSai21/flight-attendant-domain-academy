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
  tagline: 'Build a practical mental model of the operation, the aircraft, the people, flight phases, and the crew clock.',
  estimatedMinutes: 20,
  terms: ['operations-chain', 'flight-phases', 'duty-period', 'block-time', 'd0', 'a14', 'completion-factor', 'controllable-completion-factor', 'mbr'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-airplane',
      title: 'AIRLINE FUNDAMENTALS',
      text: 'Start with the operating environment around every Flight Attendant application: how an aircraft moves through an airport, who owns each handoff, how a flight progresses, and which clocks describe the crew’s work. The goal is a useful developer mental model—not contract mastery.',
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
        { term: 'Lead Flight Attendant / Purser', icon: 'mdi-star-four-points', definition: 'The Flight Attendant assigned the lead cabin role. Depending on aircraft, operation, and product context, teams may say Lead Flight Attendant or Purser—use the term carried by the authoritative source.' },
        { term: 'Flight Attendants', icon: 'mdi-account-group', definition: 'Cabin crew responsible for emergency response, passenger safety and customer service in their assigned positions.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-check-decagram',
      title: 'Vocabulary check',
      text: 'In AA-facing products you may encounter both “Lead Flight Attendant” and “Purser.” Do not automatically rewrite one into the other: preserve the terminology used by the current contract, source system, aircraft staffing record, or product workflow. AA commonly uses “line” or “schedule” for monthly work.',
    },

    // ---------- SECTION 3 ----------
    {
      kind: 'header',
      icon: 'mdi-timer-outline',
      color: '#0B6A0B',
      title: '3 · Flight phases & the crew clock',
      text: 'Follow the operational arc from preparation to arrival, then place the wider crew-duty clock around it.',
    },
    {
      kind: 'steps',
      title: 'Explore the flight as connected operating phases',
      items: [
        { icon: 'mdi-clipboard-check-outline', title: '1 · Preparation at the gate', detail: 'Crew reports, briefs, boards the aircraft, completes safety checks, and coordinates readiness with gate and ground teams.' },
        { icon: 'mdi-account-multiple-check', title: '2 · Boarding', detail: 'Gate agents control customer processing; Flight Attendants manage the cabin, safety conditions, carry-ons, seating issues, and required passenger handoffs.' },
        { icon: 'mdi-truck-trailer', title: '3 · Door closure, pushback & taxi-out', detail: 'Doors are prepared and cross-checked, the cabin is secured, and ground teams hand the aircraft to the operating crew.' },
        { icon: 'mdi-airplane-takeoff', title: '4 · Takeoff & climb', detail: 'A safety-critical phase: Flight Attendants remain at assigned stations until conditions allow movement and service preparation.' },
        { icon: 'mdi-weather-sunny', title: '5 · Cruise', detail: 'Cabin monitoring, safety duties, customer care, service, turbulence response, and coordination with the flight deck continue together.' },
        { icon: 'mdi-airplane-landing', title: '6 · Descent & landing', detail: 'The cabin and galleys are secured, compliance checks are completed, and the crew remains ready through touchdown.' },
        { icon: 'mdi-taxi', title: '7 · Taxi-in & gate arrival', detail: 'The aircraft reaches the arrival gate. Door status, jet-bridge readiness, connections, and operational updates must stay synchronized.' },
        { icon: 'mdi-account-multiple-minus', title: '8 · Deplaning & turn or release', detail: 'Customers deplane, the cabin is checked, and the crew either prepares another segment, begins a layover, deadheads, or is released.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'primary',
      icon: 'mdi-timeline-clock-outline',
      title: 'The crew clock is wider than the flight',
      text: 'Report and briefing happen before boarding. Release happens after the last required post-arrival work. A sequence can contain several flight segments inside one duty period, and several duty periods separated by contractual rest.',
    },
    {
      kind: 'terms',
      title: 'The crew clock — five time words',
      items: [
        { id: 'report-time', term: 'Report time', icon: 'mdi-alarm', definition: 'When crew must check in before departure — the legal start of the working day.' },
        { id: 'duty-period', term: 'Duty time', icon: 'mdi-timer-outline', definition: 'From report until release from duty — capped by regulation and contract.' },
        { term: 'Flight time', icon: 'mdi-airplane', definition: 'Time associated with operating the flight; confirm the exact regulatory or system definition before using it in calculations.' },
        { term: 'FDP', icon: 'mdi-clock-time-eight', definition: 'Flight Duty Period — the total duty period involving flight operations.' },
        { id: 'block-time', term: 'Block time', icon: 'mdi-timelapse', definition: 'Gate-out to gate-in — the basis for most pay calculations.' },
      ],
    },
    {
      kind: 'header',
      icon: 'mdi-chart-timeline-variant',
      color: '#B75C09',
      title: '4 · Operating performance measures',
      text: 'These measures describe different outcomes. They should never be collapsed into one “on-time” flag.',
    },
    {
      kind: 'terms',
      title: 'Measures developers will encounter',
      items: [
        { id: 'd0', term: 'D0', icon: 'mdi-clock-check-outline', definition: 'Departure performance at the scheduled minute: even a one-minute departure delay misses D0.' },
        { id: 'a14', term: 'A14', icon: 'mdi-airplane-clock', definition: 'Arrival performance: the flight arrives no more than 14 minutes after its scheduled arrival time.' },
        { id: 'completion-factor', term: 'CF', icon: 'mdi-check-circle-outline', definition: 'Completion Factor—the share of scheduled flights that are completed rather than cancelled.' },
        { id: 'controllable-completion-factor', term: 'CCF', icon: 'mdi-tune-check', definition: 'Completion Controllable Factor—a completion view focused on cancellations attributed to controllable causes. Confirm AA’s current metric definition before implementing.' },
        { id: 'mbr', term: 'MBR', icon: 'mdi-bag-suitcase-outline', definition: 'Mishandled Baggage Ratio—a baggage-performance measure, separate from crew and flight punctuality.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'info',
      icon: 'mdi-code-json',
      title: 'Why developers care',
      text: 'D0, A14, CF, CCF, and MBR use different events, denominators, ownership, and exception logic. Store the source timestamps and reason codes; derive the measure from an authoritative definition instead of copying a dashboard label.',
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
      kind: 'prose',
      title: 'Official sources & plain-language guides',
      icon: 'mdi-link-variant',
      body: `This academy distills the contract into learnable building blocks, but the authoritative source is always the **2024 CBA** and **APFA**.

- **APFA (the Flight Attendant union):** [apfa.org](https://www.apfa.org) — contract education, reserve resources, bidding guides.
- **APFA Bidding Academy:** [apfa.org/bidding](https://www.apfa.org/bidding) — how FAs actually construct and submit bids.
- **APFA Pay Guarantees (RIGs):** [apfa.org/resources/pay/pay-guarantees](https://www.apfa.org/resources/pay/pay-guarantees)

The examples here are intentionally high level. Always defer to the current agreement, APFA guidance, AA procedures, and governed system configuration for exact rules and effective dates.`,
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
      question: 'Which terminology may identify the lead cabin role in AA-facing workflows?',
      options: ['Lead Flight Attendant / Purser', 'Cabin Manager only', 'Chief Steward', 'Always the most senior person aboard'],
      answerIndex: 0,
      explanation: 'AA-facing products may use Lead Flight Attendant or Purser depending on the authoritative workflow and aircraft context.',
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
    {
      question: 'A flight departs one minute late but arrives 10 minutes after schedule. Which statement is correct?',
      options: ['It meets both D0 and A14', 'It misses both D0 and A14', 'It misses D0 but meets A14', 'Completion Factor decides both measures'],
      answerIndex: 2,
      explanation: 'D0 allows no departure delay; an arrival 10 minutes after schedule remains within A14.',
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
  terms: ['sequence', 'crew-base', 'co-terminal', 'commuter', 'lineholder', 'rap', 'seniority-occupational'],
  blocks: [
    {
      kind: 'hero',
      icon: 'mdi-account-switch-outline',
      title: 'FA LIFECYCLE & WORKGROUPS',
      text: 'A flight is a team effort. Before we can schedule a flight attendant, we need to know who else touches the departure, how an FA is identified in our data, and why seniority decides so much.',
    },
    {
      kind: 'flow',
      title: 'Every departure is a connected handoff',
      text: 'Play the handoff',
      items: [
        { label: 'Gate agents', icon: 'mdi-door-sliding-open', color: '#C01933', detail: 'Board the flight, manage the door, reseat and clear standbys, process upgrades — and confirm the crew has reported before departure. They need accurate crew report status and headcounts.' },
        { label: 'Ground staff', icon: 'mdi-luggage', color: '#B75C09', detail: 'Bags, fueling, catering, cleaning, pushback. They work to the turn clock, not the passenger clock — reliable turn timing tied to the schedule is their lifeline.' },
        { label: 'Flight deck', icon: 'mdi-airplane-marker', color: '#243B53', detail: 'Captain and first officer. Qualified by aircraft fleet and seat, bidding by seniority within base and fleet, governed by flight-time and duty limits.' },
        { label: 'Cabin crew', icon: 'mdi-account-group', color: '#0061AB', detail: 'Flight attendants — safety first, service always. Qualified by aircraft door and language, bidding by seniority within base and position, governed by duty, rest and staffing minimums. Our primary user group.' },
        { label: 'Dispatch & operations control', icon: 'mdi-monitor-dashboard', color: '#5A2D82', detail: 'Monitors the network and operating plan, coordinates disruptions, and shares flight status and recovery decisions across workgroups.' },
        { label: 'Crew Scheduling', icon: 'mdi-calendar-clock', color: '#0B6A0B', detail: 'Protects crew coverage during day-of-operations changes, contacts reserves, and records assignment or reassignment events.' },
        { label: 'Hotels & transportation', icon: 'mdi-hotel', color: '#7A4E00', detail: 'Supports layovers and disruption recovery. Hotel confirmation, transport timing, location, and notifications are operational data.' },
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
        { id: 'crew-base', term: 'Base', icon: 'mdi-home-city', definition: 'The assigned operating location around which schedules, reporting, and sequence construction are organized.' },
        { id: 'seniority-occupational', term: 'Seniority', icon: 'mdi-medal-outline', definition: 'Date-of-hire ranking that drives bidding order for lines, vacations and trades.' },
        { id: 'lineholder', term: 'Status', icon: 'mdi-toggle-switch', definition: 'Lineholder or Reserve for the bid month — the biggest fork in the domain.' },
        { term: 'Qualifications', icon: 'mdi-certificate', definition: 'Aircraft, aircraft door, language of destination, international documents.' },
        { id: 'position', term: 'Position', icon: 'mdi-seat-passenger', definition: 'Lead Flight Attendant / Purser or another numbered cabin position, with aircraft-specific responsibilities.' },
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
            'Awarded a monthly pattern of sequences and days off through the applicable bid process',
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
            'Assigned reserve days and availability windows (RAPs), with flying added through reserve processes',
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
      kind: 'header',
      icon: 'mdi-calendar-check',
      color: '#0061AB',
      title: 'Lineholder fundamentals',
      text: 'A Lineholder starts the month with awarded sequences and days off, then may reshape that schedule through permitted transactions.',
    },
    {
      kind: 'prose',
      title: 'How a Lineholder month works',
      icon: 'mdi-calendar-edit',
      body: `At a high level, a Lineholder:

1. submits monthly preferences through the applicable bidding process;
2. receives an award containing sequences and days off;
3. may use tools such as TTS/UBL or ETB to trade, drop, or pick up flying under current rules;
4. reports and operates the awarded or changed sequence; and
5. may experience reassignment or recovery when the operating plan changes.

For software, preserve the **original award**, later **transactions**, and the **current operating schedule**. They answer different questions.`,
    },
    {
      kind: 'header',
      icon: 'mdi-phone-incoming',
      color: '#C01933',
      title: 'Reserve fundamentals: RAP A, B, C, and D',
      text: 'A Reserve protects the operation by being available for assignment during a defined Reserve Availability Period (RAP).',
    },
    {
      kind: 'prose',
      title: 'How a RAP works at a high level',
      icon: 'mdi-clock-alert-outline',
      body: `RAP letters organize coverage across the day:

- **RAP A** generally represents the earliest or morning coverage.
- **RAP B** generally moves coverage later into the day.
- **RAP C** generally supports afternoon or evening coverage.
- **RAP D** generally supports late-evening or overnight coverage.

A Reserve is available and contactable during the awarded or assigned RAP. Crew Scheduling can assign eligible flying or standby using the current reserve process, considering qualifications, availability, report timing, rest, and other contractual limits. The assignment may report during the RAP or within an allowed relationship to the RAP end, but the exact rule must come from the current CBA and base configuration.

**Do not hardcode RAP clock times.** APFA guidance notes that bases may have different RAP counts and start/end times. Model the RAP letter, base, effective date, start/end, award source, notification, acknowledgement, and resulting assignment as separate facts.`,
    },
    {
      kind: 'callout',
      tone: 'warning',
      icon: 'mdi-source-branch',
      title: 'Reserve rules need a current source',
      text: 'RAP preference and assignment mechanics involve contract rules, waivers, legality, and base-specific configuration. This module teaches the shape of the process; use the current AA/APFA agreement and APFA Reserve resources for implementation decisions.',
    },
    {
      kind: 'illustration',
      variant: 'network',
      caption:
        'Eleven crew bases anchor every sequence. Dashed rings mark co-terminal metros (JFK·LGA, DCA·IAD, ORD·MDW, DFW·DAL) — one base for reporting and pay. The animated loop is the 3-day DFW trip below.',
    },
    {
      kind: 'steps',
      title: "A commuter's report-day journey",
      items: [
        { icon: 'mdi-home-map-marker', title: 'Lives away from the assigned base', detail: 'A commuter must position to base before the sequence begins. Home location, crew base, report airport, and current physical location are separate data.' },
        { icon: 'mdi-airplane-clock', title: 'Plans arrival with recovery options', detail: 'The commute is not the first working segment of the sequence. The Flight Attendant plans transportation to be present for report, with personal contingency choices.' },
        { icon: 'mdi-alert-circle-check', title: 'A disruption follows a defined policy path', detail: 'A cancelled or delayed commute does not simply erase report requirements. Current contractual commuter provisions, notification steps, evidence, and eligibility determine what protection may apply.' },
        { icon: 'mdi-login-variant', title: 'Reports at base and begins duty', detail: 'At report, the operating schedule, position, qualifications, acknowledgement state, and legality must agree. This event begins the crew-duty timeline represented in the application.' },
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
            'The award establishes the month’s status and schedule shape: a Lineholder receives sequences and days off; a Reserve receives reserve days, protected days off, and availability periods.',
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
            'Cancellations, delays, sick calls, misconnects, and aircraft changes create day-of-operations work. Crew Scheduling may reassign, contact reserves, arrange standby or deadhead positioning, and protect coverage. Hotel and ground-transport assignments may change; every notification and acknowledgement matters. Legality, rest, pay protection, and customer recovery consume the resulting event history, so systems must preserve who changed what, when, why, and from which source.',
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
      text: 'The monthly world gets its own deep dives: Scheduling (Module 4), PBS (Module 6), Bidding (Module 7) and TTS (Module 9). Reserves add the daily world — Reserve (Module 8). APFA’s public guides add the FA’s-eye view: apfa.org/bidding, apfa.org/reserve-resources.',
    },
    {
      kind: 'header',
      icon: 'mdi-cog-outline',
      color: '#003057',
      title: 'For developers building an FA application',
      text: 'High-level orientation before the deep-dives: the mental model that keeps requirements coherent.',
    },
    {
      kind: 'terms',
      title: 'Four ideas that anchor every FA system',
      items: [
        { id: 'sequence', term: 'The sequence is the atom', icon: 'mdi-puzzle', definition: 'Trips, trades, awards, and pay all hang off Sequence → DutyPeriods → Segments. Ask “what sequence?” before “what feature?”.' },
        { id: 'hbt', term: 'One clock: Home Base Time', icon: 'mdi-clock-outline', definition: 'Nearly every rule (deadlines, RAPs, rest, legality) resolves in HBT. Never store or compare naive local times across bases.' },
        { id: 'credited-hours', term: 'Two related ledgers: pay vs credit', icon: 'mdi-book-multiple', definition: 'Pay and credit answer different questions. Some contractual items affect both; others are pay-no-credit. Preserve the category instead of assuming every premium behaves alike.' },
        { term: 'Pay ≠ flight hours', icon: 'mdi-cash-clock', definition: 'RIGs and TAFB guarantee floors so a trip pays a minimum regardless of block time. Always compute against the guarantee, not raw flying.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'primary',
      icon: 'mdi-alert-decagram',
      title: 'Where defects actually live',
      text: 'In FA systems, defects cluster at boundaries: scheduled versus actual time, local versus Home Base Time, duty versus rest, pay versus credit, month-boundary carry-over, and concurrent claims on the same open-time item. Preserve provenance and audit every rule at these seams.',
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
    {
      question: 'How should an application store RAP A–D clock times?',
      options: ['As one permanent universal table', 'As base- and effective-date configuration', 'Only as morning/afternoon labels', 'Inside the Flight Attendant profile name'],
      answerIndex: 1,
      explanation: 'RAP availability periods can differ by base and bid period, so times need governed configuration rather than hardcoded constants.',
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
  terms: ['sequence', 'duty-period', 'deadhead', 'position', 'layover', 'tafb', 'rig', 'duty-rig'],
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
        { id: 'position', term: 'Position', icon: 'mdi-numeric-1-box-outline', definition: 'An assigned area of responsibility. The lead cabin role may be labeled Lead Flight Attendant or Purser in AA-facing workflows.' },
        { id: 'complement', term: 'Complement', icon: 'mdi-counter', definition: 'The required number of FAs for the aircraft — staffing below it is illegal to depart.' },
        { term: 'Lead Flight Attendant / Purser', icon: 'mdi-star-outline', definition: 'The assigned lead cabin role—not automatically the most senior person aboard. Preserve the source system’s role and position values.' },
        { id: 'deadhead', term: 'Deadhead', icon: 'mdi-seat-recline-extra', definition: 'Riding as a passenger to reposition — on duty, paid, but not working. Positive-space when covering an assignment.' },
      ],
    },
    {
      kind: 'steps',
      title: 'Typical flight attendant workflow — report to release',
      items: [
        { icon: 'mdi-badge-account-outline', title: '1 · Report for duty', detail: 'Crew room check-in at base: verify the trip, confirm legality, meet the crew. Report time is the legal start of everything.' },
        { icon: 'mdi-clipboard-text-outline', title: '2 · Briefing', detail: 'The Lead Flight Attendant or Purser coordinates position assignments, service plan, safety and security duties, and timing for each leg.' },
        { icon: 'mdi-airplane-check', title: '3 · Aircraft checks', detail: 'Each position preflights its zone: emergency equipment (doors, slides, extinguishers, oxygen), catering counts, cabin readiness.' },
        { icon: 'mdi-account-multiple-check', title: '4 · Passenger boarding', detail: 'Gate agents manage the door and headcount; FAs work the cabin — seat disputes, standby seating, carry-on help, UMNR handovers.' },
        { icon: 'mdi-presentation-play', title: '5 · Safety demonstration', detail: 'Doors armed and cross-checked, demo performed, cabin secure report given. From door close, the cabin crew own the interior.' },
        { icon: 'mdi-room-service-outline', title: '6 · In-flight service', detail: 'Service and safety rounds, galley work, turbulence procedures — always watching the cabin while serving it.' },
        { icon: 'mdi-seat-passenger', title: '7 · Cabin prep for landing', detail: 'Galleys stowed, seat belts checked, cabin and lavatories verified, service items secured early on descent.' },
        { icon: 'mdi-airplane-landing', title: '8 · Landing', detail: 'FAs sit braced and alert through touchdown, watching the cabin until the aircraft decelerates clear of the runway.' },
        { icon: 'mdi-account-multiple-minus', title: '9 · Passenger deboarding', detail: 'Doors disarmed and cross-checked at the gate (so slides cannot deploy into the bridge), passengers off, cabin swept for left items.' },
        { icon: 'mdi-note-check-outline', title: '10 · Post-flight duties', detail: 'Paperwork and reports, connected-departure prep for the next leg — or closing duties if the sequence ends at base.' },
        { icon: 'mdi-exit-run', title: '11 · Release', detail: 'After required post-arrival work, release closes the duty period. Scheduled arrival, actual arrival, and release are separate timestamps and should remain separate in software.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'success',
      icon: 'mdi-lock-check',
      title: 'Never infer role from seniority',
      text: 'Position and lead-role assignments must come from the operating assignment. Seniority influences many awards, but it is not a substitute for the actual position, aircraft complement, qualification, or assignment record.',
    },
    {
      kind: 'prose',
      title: 'When crews move without working',
      icon: 'mdi-seat-recline-normal',
      body: `**Deadheading** is Company-requested travel to protect a sequence, return to base, or position for business. It counts inside duty periods (report and release buffers wrap the segment), it pays and credits — and when it is positioning you to cover an assignment, you get a seat even on an oversold flight.

**Layovers** structure multi-day trips: the overnight between duty days drives rest legality, hotels and per diem. A well-built sequence balances duty periods with workable layovers — which is exactly what the pairing builders optimize for.`,
    },
    {
      kind: 'header',
      icon: 'mdi-cash-clock',
      color: '#B75C09',
      title: 'Time worked is not the same as pay credit',
      text: 'Developers need the relationship between the clocks—not a payroll calculator in an introductory module.',
    },
    {
      kind: 'terms',
      title: 'High-level pay and time concepts',
      items: [
        { id: 'tafb', term: 'TAFB', icon: 'mdi-timer-sand', definition: 'Time Away From Base—the overall span from the sequence’s beginning at base through final release back at base.' },
        { id: 'rig', term: 'RIG', icon: 'mdi-shield-crown-outline', definition: 'Ratio in Guarantee—a contractual pay floor that protects compensation when elapsed duty or time away from base is large relative to flight time.' },
        { id: 'duty-rig', term: 'Duty Rig', icon: 'mdi-timer-outline', definition: 'A minimum pay-and-credit relationship based on actual on-duty time. Current calculations belong to the pay deep dive.' },
        { id: 'block-time', term: 'Block time', icon: 'mdi-airplane-clock', definition: 'Gate departure to gate arrival for a segment; one input to pay, but not the whole paycheck.' },
      ],
    },
    {
      kind: 'prose',
      title: 'APFA reference for pay guarantees',
      icon: 'mdi-link-variant',
      body: `APFA explains minimum-day guarantees, Duty Rig, Trip Rig, and related examples in [Pay Guarantees (RIGs)](https://www.apfa.org/resources/pay/pay-guarantees/?ss360SearchTerm=RIG). The current agreement and implementation guidance remain authoritative.`,
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
      question: 'Which record should determine the cabin role a Flight Attendant is working?',
      options: ['The person’s seniority alone', 'The current operating assignment and position', 'The aircraft tail number alone', 'The home address'],
      answerIndex: 1,
      explanation: 'Use the current operating assignment and position; do not infer the role from seniority.',
    },
    {
      question: 'TAFB means:',
      options: ['Time After Flight Boarding', 'Time Away From Base', 'Total Aircraft Flight Block', 'Trip Award Final Bid'],
      answerIndex: 1,
      explanation: 'TAFB is Time Away From Base and is distinct from block time or a single duty period.',
    },
  ],
}

export const interactiveModules: AcademyModule[] = [fundamentals, lifecycle, operations]
