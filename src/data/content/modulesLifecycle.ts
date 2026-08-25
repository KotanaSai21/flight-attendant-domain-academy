import type { AcademyModule } from '../types'

const deck = { kind: 'system' as const, label: 'Internal FA Lifecycle deck' }

export const lifecycleModule: AcademyModule = {
  id: 'fa-lifecycle',
  number: 2,
  title: 'FA Lifecycle & Workgroups',
  icon: 'mdi-account-switch-outline',
  color: '#5A2D82',
  tagline:
    'Who supports a flight, how flight attendants are organized, and how sequences are built.',
  estimatedMinutes: 25,
  terms: ['sequence', 'duty-period', 'crew-base', 'lineholder', 'seniority-occupational', 'layover'],
  sections: [
    {
      key: 'overview',
      title: 'What is this?',
      body:
        'A flight is a team effort. Every departure is handed off across four workgroups — **gate agents** (boarding, seating, standby, upgrades), **ground staff** (bags, fueling, catering, pushback), the **flight deck** (captain and first officer) and the **cabin crew** (flight attendants — safety and service). Each group has its own systems, its own clock, and its own definition of “on time” — and the handoffs between them are where most operational data problems surface.',
    },
    {
      key: 'why',
      title: 'Why it exists',
      body: `Crew data drives real-time decisions at the gate, so four principles matter:

- **Shared vocabulary** — *sequence*, *duty period*, *segment* and *base* mean specific things; using them precisely prevents costly requirement errors.
- **Time is operational** — latency and stale records have immediate downstream cost.
- **Rules are non-negotiable** — contract and regulatory rules constrain what the system may legally assign.
- **Many consumers, one truth** — gate, ground, crew tracking and the FA all read the same schedule.

“Crew” itself covers two distinct workgroups — pilots (qualified by fleet/seat, governed by flight-time limits) and cabin crew (qualified by aircraft door and language, governed by duty, rest and staffing minimums). They bid under separate contracts but fly the same sequence structure.`,
    },
    {
      key: 'process',
      title: 'How an FA is identified',
      body: `Six attributes together decide what the system may legally and contractually assign:

| Attribute | Meaning |
|---|---|
| **Base** | The crew base the FA is assigned to — sequences start and end here |
| **Seniority** | Date-of-hire ranking; drives bidding order for lines, vacation and trades |
| **Status** | Lineholder or Reserve for the given bid month |
| **Qualifications** | Aircraft, door, language of destination, international documents |
| **Position** | Purser / lead versus cabin position, awarded by bid |
| **Availability** | Vacation, leave, training and sick status affecting assignment |

Each bid month every FA lands in exactly one of two groups. **Seniority decides the split** — junior FAs typically sit on Reserve until seniority lets them hold a line.`,
    },
    {
      key: 'system',
      title: 'The scheduling hierarchy',
      body: `The core object is the **sequence** — a group of duty periods flown as one trip, starting and ending at the same crew base (typically 1–4 days). A **duty period** is one working day (report → fly → release), bounded by duty-time limits and followed by rest. A **flight segment** is a single leg.

\`\`\`mermaid
flowchart TD
  S["SEQUENCE — one trip, base to base"] --> D1["Duty period 1"]
  S --> D2["Duty period 2"]
  S --> D3["Duty period 3"]
  D1 -- "rest (layover)" --> D2
  D2 -- "rest (layover)" --> D3
  D1 --> F1["Segment"]
  D1 --> F2["Segment"]
  D3 --> F3["Segment"]
\`\`\`

Two different identifier families ride on this hierarchy: **sequence attributes** (sequence number, sequence date, position) identify the *assigned trip context*, while **flight attributes** (carrier code, flight number, flight date, departure city, duplicate departure code) identify the *exact leg being operated*. Use both keys together.

**Bases close the loop.** Every sequence opens and closes at one of the eleven crew bases — East: JFK & LGA, PHL, DCA · Southeast: CLT, MIA · Central: ORD, DFW · West: PHX, LAX, SFO. JFK and LGA act as a single New York base for bidding, and several metros are treated as one base for reporting and pay (New York JFK·LGA, Washington DCA·IAD, Chicago ORD·MDW, Dallas DFW·DAL, Los Angeles LAX + satellites) — these are **co-terminals**.`,
    },
    {
      key: 'data',
      title: 'Sequence anatomy — worked examples',
      body: `**A three-day DFW sequence** (closed loop — it returns home):

\`\`\`mermaid
flowchart LR
  subgraph DP1["Duty period 1"]
    a1["DFW → ORD"] --> a2["ORD → LGA"]
  end
  subgraph DP2["Duty period 2"]
    b1["LGA → MIA"] --> b2["MIA → CLT"]
  end
  subgraph DP3["Duty period 3"]
    c1["CLT → PHX"] --> c2["PHX → DFW"]
  end
  DP1 -- "overnight LGA" --> DP2
  DP2 -- "overnight CLT" --> DP3
\`\`\`

If an FA finishes away from base, the system owes them a deadhead or repositioning segment back — the **closed loop rule**.

**Two sequences can share the same middle segments** and still close at different bases: Sequence A (base MIA) runs MIA→DFW→PHX→LAX→MIA while Sequence B (base DFW) runs DFW→PHX→LAX→SFO→DFW. Both overlap on DFW→PHX and PHX→LAX — same flights, two crews — before diverging to their own homes. The overlap never changes where a sequence ends.

**Vocabulary you will meet in the data:** report time (at the gate before first departure), block time (gate-out to gate-in — the basis for most pay), duty time (report to release, capped), rest (protected, cannot be shortened by assignment), layover (overnight away from base), deadhead (riding as a passenger to reposition — on duty but not working), turn (single duty period returning to base same day), legality (assignment satisfies every duty/rest/qualification rule).`,
    },
    {
      key: 'examples',
      title: 'Real examples',
      body:
        '- A commuter lives in Tampa but is based at DFW: she flies to base on her own time (often standby), so **report time still governs legality** — contracts add commuter protections when a connection fails.\n- A “turn” is the simplest sequence: up in the morning, home by night, one duty period.\n- Two FAs on the same DFW→PHX leg may be flying completely different sequences that merely overlap mid-trip.',
    },
  ],
  quiz: [
    {
      question: 'Which is the correct scheduling hierarchy?',
      options: [
        'Sequence → flight segment → duty period',
        'Duty period → sequence → segment',
        'Sequence → duty period → flight segment',
        'Segment → duty period → sequence',
      ],
      answerIndex: 2,
      explanation: 'A sequence contains duty periods; a duty period contains flight segments; rest separates duty periods.',
    },
    {
      question: 'How many crew bases exist, and how are JFK/LGA treated?',
      options: [
        '10 bases; JFK and LGA fully separate',
        '11 bases; JFK and LGA treated as one New York base for bidding',
        '12 bases; JFK and LGA merged for pay only',
        '9 bases; LGA is a satellite of JFK',
      ],
      answerIndex: 1,
      explanation: 'Eleven bases, with JFK & LGA operating as a single New York base for bidding.',
    },
    {
      question: 'The “closed loop rule” means:',
      options: [
        'Trips must avoid repeating airports',
        'A sequence must begin and end at the same crew base',
        'Duty periods must return to the layover hotel',
        'Commuters must close their own loop',
      ],
      answerIndex: 1,
      explanation: 'Finish away from base and the system owes a deadhead/repositioning segment home.',
    },
    {
      question: 'Which attributes identify the exact operating leg (not the trip assignment)?',
      options: [
        'Sequence number + position',
        'Sequence date + base',
        'Carrier code + flight number + flight date + departure city',
        'Seniority + status',
      ],
      answerIndex: 2,
      explanation: 'Flight-level identifiers locate the leg; sequence-level identifiers locate the assigned trip context.',
    },
    {
      question: 'What mostly decides whether an FA is a Lineholder or Reserve?',
      options: ['Base size', 'Language qualifications', 'Seniority', 'Random monthly rotation'],
      answerIndex: 2,
      explanation: 'Junior FAs typically sit on Reserve until seniority lets them hold a line.',
    },
  ],
}
