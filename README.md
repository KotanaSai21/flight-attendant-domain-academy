# Flight Attendant Domain Academy

An interactive **Domain Knowledge Management, Training & Learning Platform** for team members
(developers, BAs, QA, POs, new hires) who need to become productive in the American Airlines
Flight Attendant domain — without prior airline experience — within 3–5 days.

## Knowledge Sources

- `knowledge-sources/2024-CBA_121724.txt` — 2024 AA/APFA Collective Bargaining Agreement (primary source of truth)
- `knowledge-sources/Implementation-Timeline-080624.txt` — Implementation Timeline LOA (CIC, TTS/UBL complexity items)
- `knowledge-sources/JCBA-LOA_081522.txt`, redline, constitution, bonus agreement (supporting)
- APFA public resources (apfa.org, apfa.org/bidding) — content tagged `Source: APFA Website`

Content provenance is enforced in-app via source chips: **AA/APFA Contract**, **LOA**, or
**APFA Website**.

## Modules

| # | Module | # | Module |
|---|--------|---|--------|
| 1 | Airline Fundamentals | 9 | ETB |
| 2 | Flight Attendant Operations | 10 | Crew Management |
| 3 | Scheduling | 11 | Payroll & Credit |
| 4 | Pairings & Sequences | 12 | Training |
| 5 | PBS | 13 | International Flying |
| 6 | Bidding | 14 | Seniority |
| 7 | Reserve | 15 | Business Scenarios Capstone |
| 8 | TTS |  |  |

Each module: What is this? · Why It Exists · How It Works · Systems Involved · Information Behind It ·
Real Examples · Interactive Quiz — pure domain, no developer jargon.

## Features

- **Learning Center** — 15 modules with per-section progress tracking (localStorage)
- **Interactive Domain Dictionary** — 35 contract-grounded terms with business purpose,
  developer relevance, examples, related-term graph navigation
- **Bidding Academy** — bid-cycle timeline with contract references; reserve processing flow;
  implementation-complexity watchlist from the LOA
- **Scenario Simulator** — 6 end-to-end journeys (first schedule, bid journey, cancelled trip,
  reserve day, premium pickup, base transfer)
- **Interactive Domain Map** — Vue Flow knowledge graph; click a node to jump to its dictionary entry
- **Global fuzzy search** — Fuse.js across terms/modules/scenarios with related-topic suggestions
- **Mermaid diagrams** rendered inline in module content (lazy-loaded)

## Stack

Vue 3 + TypeScript + Vite · Vuetify 3 · Pinia · Vue Router · Fuse.js · ECharts-ready ·
@vue-flow/core · markdown-it + Mermaid

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
npm run preview  # serve dist/
```

## Roadmap

- RAG / AI assistant over `knowledge-sources/` corpus
- Additional domains (Crew Scheduling, Flight Ops, Maintenance, Payroll, Crew Tracking,
  Leave Management, Time & Attendance, Airport Operations) — platform is domain-agnostic by design:
  add data files under `src/data/` and routes under `src/views/`.
