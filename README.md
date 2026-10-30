# Flight Attendant Domain Academy

An interactive **Domain Knowledge Management, Training & Learning Platform** for team members
(developers, BAs, QA, POs, new hires) who need to become productive in the American Airlines
Flight Attendant domain — without prior airline experience — within 3–5 days.

## Knowledge Sources

- `knowledge-sources/2024-CBA_121724.txt` — 2024 AA/APFA Collective Bargaining Agreement (primary source of truth)
- `knowledge-sources/Implementation-Timeline-080624.txt` — Implementation Timeline LOA (CIC, TTS/UBL complexity items)
- `knowledge-sources/JCBA-LOA_081522.txt`, redline, constitution, bonus agreement (supporting)
- APFA public resources (apfa.org, apfa.org/bidding) — content tagged `Source: APFA Website`

Content provenance is represented in-app with source references where available: **AA/APFA
Contract**, **LOA**, or **APFA Website**.

> **Important:** This academy reflects the author's current understanding of the subject and is
> provided for learning purposes. It is not a legal reference; always consult the applicable
> contract and official guidance.

## Modules

| # | Module | # | Module |
|---|--------|---|--------|
| 1 | Airline Fundamentals | 6 | Reshape the Month · TTS & ETB |
| 2 | Crew | 7 | The Next Two Days · UBL & Open Time |
| 3 | Flight Attendants | 8 | Cover the Month · ROTA, ROTD & Aggressive |
| 4 | Your Bidding Month | 9 | Payroll & Credit |
| 5 | Build the Month · TBS, LRD, PBS | 10 | Operational Changes & Scenarios |

Each module: What is this? · Why It Exists · How It Works · Systems Involved · Information Behind It ·
Real Examples · Interactive Quiz — pure domain, no developer jargon.

## Features

- **Learning Center** — 10 modules with per-section progress tracking (localStorage)
- **Interactive Domain Dictionary** — 93 terms across contract and operational fundamentals, with business purpose,
  developer relevance, examples, related-term graph navigation
- **Bidding Academy** — bid-cycle timeline with contract references; reserve processing flow;
  implementation-complexity watchlist from the LOA
- **Scenario Simulator** — 6 end-to-end journeys (first schedule, bid journey, cancelled trip,
  reserve day, premium pickup, base transfer)
- **A Day in the Life** — `/life` follows one continuous fictional October, with Maya (a lineholder)
  or Jordan (a reserve). A clickable monthly calendar combines flying, reserve blocks, training,
  school pickup, appointments, and family events. Start with September planning, see the award
  arrive in a clearly labeled September flashback, then enter October 1 with the awarded
  trips or reserve line already present. October's monthly bids and awards are for November;
  they are kept distinct from current-month October trades and assignments. Move through October
  one personal moment at a time. Systems appear as small
  contextual lesson links, not separate scenarios.
  Award moments also name the awarding system in the narrative. A compact clock note gives relevant
  bid cutoffs, award checks or acknowledgement times with DFW/HBT labels. Each scene has a specific
  date: September 10 PBS submission, September 15 cutoff, September 18 preliminary award view, and September 20 official award publication.
  The story follows one bid-to-award journey, not a separate final bidding round; referenced rules still require current verification.
  Leo is introduced as Maya's school-age son. An October 22 missed-report scene shows prompt
  crew-desk contact, confirmed revised instructions and family consequences without assuming
  automatic release, pay protection or a fixed attendance penalty.
  Decisions branch the narrative and update the calendar: a TTS request remains pending until
  the illustrated award, a reserve day-off exchange changes the duty dates, and choosing extra
  flying changes both home plans and the month-end conversation.
  The premium-pickup story distinguishes Lineholder credit from Reserve day-off
  pay-no-credit; UBL participation and late bids are explicit, and confirmed day-off trades
  update Golden/Flex designations as well as duty dates. Backtracking reconstructs the
  calendar; changing an earlier choice discards later choices. Each persona's position and choices
  resume separately from localStorage (`fada-month-story-v1`); restarting resets only that persona.
  Month-end summaries follow the selected trade choices. ETB guidance requires system approval,
  and ROTA acknowledgement covers sequence, standby and RAP assignments with the on-sequence exception.
  Aggressive Reserve guidance covers eligible ROTA/ROTD processing; the October 10 example
  uses current-day ROTD preferences rather than implying availability on the following Golden Day.
  LRD preferences are distinguished from confirmed status, which must be checked before PBS bidding.
  This is a simplified story, not an award predictor, legality engine, complete RAP roster or pay
  calculator. A choice selects an explicitly fictional outcome rather than guaranteeing a real award.
  The 21 shorter system/life stories remain available at `/life/stories` and their existing deep links,
  with their previous saved completion intact. Sources and detailed checks stay collapsed.
- **Scheduling Calendar** — `/calendar` opens with the month story (September key dates beside a
  live October roster), followed by every scheduling system and when it opens, closes and
  publishes results, in three groups:
  1. *Monthly build cycle* — shown by default as a four-stage week-by-week flow
     (Training & status → Bid the month → Awards & designations → Trade days off). Each system
     card has calendar-style OPENS / CLOSES / RESULT date tiles, an audience tag, and a handoff
     note showing what feeds the next stage. A “Timeline” toggle shows the same windows as a
     September 1–30 Gantt chart.
  2. *Daily cycle* — a 24-hour Home Base Time strip for TTS, ETB, UBL, ROTA and ROTD
     (e.g. TTS 23:00 cutoff → 04:00 awards; ROTA 15:00 processing → 19:30 results → 22:30 acknowledge).
  3. *Linked options* — Aggressive Reserve and Red Flag, which ride on ROTA/ROTD or TTS/UBL.
  Selecting any system opens a detail card under its group with full Opens / Closes / Result
  timing, what it does, a three-step Maya-or-Jordan scenario, a one-line takeaway, what it does
  *not* do, a lesson link and “Play this step in the month story”. Timeline data (bars, markers,
  glance text and scenarios) lives in `systemTimings` in `src/data/schedulingCalendar.ts`.
  The month story's September calendar shows key dates
  next to the live illustrative October roster. Follow Maya (Lineholder) or Jordan (Reserve)
  through actions and choices: pending requests do not remove duty, while confirmed training,
  PBS awards, trades and reserve assignments update October. A Lineholder's October shows only
  sequences and training—dates without a sequence are left blank, not labelled “Off”; only
  Reserve lines show designated (Golden/Flex) days off. Reuses the monthly story replay
  so backtracking and changed choices reconstruct the correct calendar without future outcomes.
  Selecting a September milestone only explains it; scenario controls advance the roster.
  Each person's progress stays separately in page memory, without changing saved life-story progress.
  Each story step links back to the timeline (“When does TTS open and close?”).
  Reserve day-off trades, UBL continuation and Red Flag conditions sit under TTS; voluntary
  reserve elections sit under ROTA/ROTD. Scenario prompts show Open → Choose → Check.
  APFA search excerpts reviewed October 22, 2026 indicate TTS day-off trade processing
  supersedes the older noon workflow; the scenario and linked reserve guidance reflect that.
  Direct APFA pages returned access errors, so current full page text and signed-in menu paths
  remain unverified. References and explicit verification limits are included on the page.
  The ROTA story step lets users prefer one of two fictional October 7–8 sequences:
  the reserve calendar stays unchanged while pending, then shows the illustrative award after
  processing. Practice is page-local and does not change saved Day in the Life progress.
  Timelines and calendars stack on smaller screens. Dates and outcomes are illustrative, not a live schedule.
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

## Issues and Contributions

For questions, corrections, issues, or contributions, visit the source repository on GitHub:

<https://github.com/KotanaSai21/flight-attendant-domain-academy>

Before submitting a change, run the full validation suite:

```bash
npm run validate
```

## Roadmap

- RAG / AI assistant over `knowledge-sources/` corpus
- Additional domains (Crew Scheduling, Flight Ops, Maintenance, Payroll, Crew Tracking,
  Leave Management, Time & Attendance, Airport Operations) — platform is domain-agnostic by design:
  add data files under `src/data/` and routes under `src/views/`.
