# Flight Attendant Domain Academy

## Implementation User Stories and Delivery Plan

**Status:** Approved for implementation planning  
**Primary audience:** Software engineers, product managers, business analysts, QA engineers, and new Flight Attendant Experience team members  
**Application stack:** Vue 3, TypeScript, Vite, Vuetify, Pinia, and Vue Router  
**Primary knowledge base:** `knowledge-sources/`

---

## 1. Product outcome

The platform should help a learner move from:

> "I do not understand the Flight Attendant domain."

to:

> "I understand how Flight Attendant identity, trips, duty, monthly schedules, Lineholder and Reserve life, bidding, operational changes, and pay connect. I also know where to find deeper information."

The core learning path should be approximately two hours. Contractual procedures, edge cases, and detailed system behavior should remain available as optional deep dives.

---

## 2. Knowledge-base principles

The existing files under `knowledge-sources/` are the starting knowledge base:

- `2024-CBA_121724.txt` — primary AA/APFA CBA source.
- `2024-CBA-Redline-091224.txt` — comparison and change reference.
- `Implementation-Timeline-080624.txt` — implementation timing and dependencies.
- `JCBA-LOA_081522.txt` — supporting contractual material.
- `FA-Lifecycle-Overview.txt` — internal introductory lifecycle material.
- Other agreements and supporting documents.

APFA public resources may supplement these files, especially for current educational explanations and implementation status.

### Required source model

Every exact operational, regulatory, or contractual fact presented by the application must support the following metadata:

```ts
type AuthorityKind =
  | 'general-airline'
  | 'faa'
  | 'aa-process'
  | 'aa-apfa-cba'
  | 'implementation'
  | 'illustrative'

type RuleStatus =
  | 'concept'
  | 'implemented'
  | 'scheduled'
  | 'verify-current'

interface RuleFact {
  id: string
  label: string
  value: string | number
  unit?: string
  authority: AuthorityKind
  sourceLabel: string
  sourceReference?: string
  sourceUrl?: string
  asOf: string
  status: RuleStatus
  notes?: string
}
```

### Knowledge-base acceptance rules

1. Exact times, thresholds, guarantees, and ratios must come from structured rule data rather than being embedded in Vue templates.
2. Every contractual fact must reference the applicable CBA section or other source.
3. Every fact that may change by base, bid month, implementation date, or company configuration must be marked accordingly.
4. Fictional examples must be marked `illustrative` and must not be presented as actual AA schedules.
5. FAA requirements, AA processes, AA/APFA contractual rules, and general airline concepts must remain visibly distinct.
6. When two sources conflict, the application must not silently choose one. The content must be flagged for domain-owner verification.
7. The application is an educational product, not an official legality, bidding, or payroll calculator.

---

## 3. Core learning journey

1. The Airline as a Living Operation.
2. Meet Maya: Identity, Career, and Qualifications.
3. Trips, Duty, and the Crew Clock.
4. Maya's Three-Day Sequence.
5. From the Flying Plan to a Monthly Schedule.
6. Seniority, PBS, and the Monthly Award.
7. Life as a Lineholder: Changing the Award.
8. Life on Reserve: RAP, ROTA, and ROTD.
9. When the Plan Changes.
10. From Schedule to Pay: Rigs, Credit, and Compensation.

The learner follows Maya, a fictional DFW-based Flight Attendant, through the journey. Her base and examples are illustrative and should be easy to change through data rather than component code.

---

# Epic 1 — Knowledge provenance and content architecture ✅ COMPLETED

**Completed:** 2026-08-29  
**Implementation:** Added shared authority/status types, structured bidding/Reserve/pay rule registries,
module-to-rule lookup, reusable authority and status badges, a source-backed fact panel, and an explicit
verification warning for uncertain knowledge. The initial registry is populated from `knowledge-sources/`
and is rendered in the current Lifecycle, Scheduling/PBS/Bidding, Reserve, and Payroll modules.  
**Verification:** `npm run build` completed successfully.

## US-001 — Store source metadata with domain facts ✅ COMPLETED

**As a** content owner  
**I want** every exact domain fact to carry authority, reference, effective date, and status  
**So that** learners and engineers can understand where the information came from and whether it is current.

### Acceptance criteria

- `AuthorityKind`, `RuleStatus`, and `RuleFact` are added to the shared TypeScript types.
- Exact rule data is stored under `src/data/rules/`.
- The UI can display source authority, source reference, `asOf`, and status.
- A missing source does not crash the application; it displays `Verification required`.
- Contract-derived facts are not labeled as universal airline rules.

## US-002 — Model knowledge-base citations separately from lesson prose ✅ COMPLETED

**As a** developer  
**I want** lessons to reference structured knowledge facts  
**So that** content can be updated without searching through component markup.

### Acceptance criteria

- Components receive content and facts through props or data modules.
- No RAP time, bidding deadline, guarantee, or rig ratio is hardcoded in a Vue template.
- Rule IDs can be reused in lessons, glossary entries, quizzes, and scenarios.
- A source-reference link or local source label is available from the lesson.

## US-003 — Flag conflicting or uncertain knowledge ✅ COMPLETED

**As a** domain reviewer  
**I want** uncertain or conflicting facts to be visible  
**So that** the platform does not present an unverified interpretation as truth.

### Acceptance criteria

- Rule facts can be marked `verify-current`.
- A verification banner explains why a fact needs review.
- The learner sees the concept explanation even when the exact value is awaiting verification.
- Domain-review notes are not exposed as contractual conclusions.

---

# Epic 2 — Guided learning journey — REVERTED / PENDING REDESIGN

**Reverted:** 2026-08-29 at user request. The earlier module catalog and fundamentals-first experience were restored.
These stories remain available for a future redesign and are not marked complete.

## US-010 — Replace the flat catalog with a connected journey

**As a** new learner  
**I want** one obvious starting point and a connected sequence of modules  
**So that** I can build a mental model without deciding among unrelated articles.

### Acceptance criteria

- The Learning Center displays ten connected core modules in order.
- Each module displays level, estimated time, progress, objective, and next step.
- The primary call to action starts or resumes the journey.
- Dictionary, Domain Map, Bidding Academy, simulator, and deep dives are presented as reference tools.
- The permanent navigation does not list every deep-dive page.

## US-011 — Preserve learner progress during the restructure

**As a** returning learner  
**I want** my saved progress to remain usable  
**So that** restructuring the course does not erase my work.

### Acceptance criteria

- Progress storage is migrated from `fada-progress-v1` to `fada-progress-v2`.
- Invalid or old local-storage data does not break the application.
- Core journey completion and quiz mastery are measured separately.
- The UI does not call a partial quiz average overall domain readiness.

## US-012 — Use Maya as a continuous story

**As a** learner  
**I want** to follow one fictional Flight Attendant through the domain  
**So that** abstract systems and terminology have a human context.

### Acceptance criteria

- Maya's profile is stored in `src/data/stories/maya.ts` or equivalent.
- Her base, seniority, status, qualifications, sequences, and schedule events are data-driven.
- The same story state is reused across modules.
- Every example is labeled illustrative.
- The story avoids implying that one example covers all contractual exceptions.

---

# Epic 3 — Airline, Flight Attendant, and work-object foundations — REVERTED / PENDING REDESIGN

**Reverted:** 2026-08-29 at user request. Relevant fundamentals were folded into the existing first three modules
instead of retaining the replacement four-module journey.

## US-020 — Explain the airline operating chain

**As a** new team member  
**I want** to see how a flight moves through operational workgroups  
**So that** I understand where Flight Attendant software fits.

### Acceptance criteria

- The module shows flight planning, airport, gate, ground, flight deck, and cabin-crew handoffs.
- Safety is presented as the primary Flight Attendant responsibility.
- An interactive activity asks the learner to match operational events to workgroups.
- A “Why this matters for software” section explains shared data and time sensitivity.

## US-021 — Explain Flight Attendant identity and eligibility

**As a** developer  
**I want** to understand the attributes that determine assignment eligibility  
**So that** I do not treat a Flight Attendant as only an employee ID.

### Acceptance criteria

- The module distinguishes base, occupational seniority, status, position, qualification, availability, and training currency.
- FAA qualification, AA process, and contractual concepts are labeled separately.
- The learner can classify an issue as identity, qualification, schedule, or seniority data.

## US-022 — Teach the work-object hierarchy

**As a** learner  
**I want** to assemble segments, duty periods, sequences, and a monthly line  
**So that** I understand the objects used by FA systems.

### Acceptance criteria

- The learner can construct `segment → duty period → sequence → line of flying`.
- Report, block, release, rest, layover, deadhead, TAFB, and HBT are placed on the correct object or boundary.
- “Trip,” “trip sequence,” and “sequence” use AA/APFA terminology; “pairing” is identified as a broader industry alias where appropriate.
- A scenario-based knowledge check verifies the hierarchy.

## US-023 — Follow a sequence from report to release

**As a** learner  
**I want** to follow Maya through a multi-day sequence  
**So that** I understand how schedule objects become a lived work experience.

### Acceptance criteria

- The experience includes report, sign-in, briefing, preflight work, boarding, operation, arrival, release, layover, next duty period, return to base, and final release.
- Scheduled and actual times can be shown together.
- The learner identifies where duty ends and rest begins.
- Hotel, deadhead, notification, and pay consequences are introduced without detailed rules.

---

# Epic 4 — Monthly scheduling, Lineholder, Reserve, and PBS

## US-030 — Explain how flying becomes a monthly schedule

**As a** learner  
**I want** to see how flights become sequences and monthly lines  
**So that** I understand what exists before a Flight Attendant submits a bid.

### Acceptance criteria

- The flow shows flights, staffing demand, sequence construction, legality, planned absences, bid package, and PBS inputs.
- Exact publication dates are progressively disclosed and source-tagged.
- Training and vacation are shown as inputs that may exist before PBS constructs the line.
- The explanation distinguishes the flight schedule from an individual FA schedule.

## US-031 — Compare Lineholder and Reserve clearly

**As a** new learner  
**I want** a side-by-side picture of Lineholder and Reserve life  
**So that** I understand the most important branch in the domain.

### Acceptance criteria

- The comparison covers monthly award, predictability, schedule objects, bidding systems, days off, operational purpose, and software concerns.
- The visual begins with one PBS monthly award and branches into Lineholder and Reserve paths.
- Reserve is not described simply as “whatever junior FAs receive.”
- Reserve rotation, seniority, staffing need, and voluntary choices are introduced at a high level.
- The comparison remains accessible on mobile and to keyboard users.

## US-032 — Explain monthly PBS bidding

**As a** learner  
**I want** to understand preferences, seniority, coverage, legality, and award processing  
**So that** I can explain why PBS may not produce a person's ideal schedule.

### Acceptance criteria

- PBS is described as constructing Lineholder and Reserve lines.
- A simplified simulation processes several fictional Flight Attendants in seniority order.
- Coverage and legality can prevent a preference from being awarded.
- The result explains why an item was awarded or not awarded.
- Misaward is introduced as a correction workflow, not silently treated as a failed preference.

---

# Epic 5 — Monthly versus daily bidding and transactions

## US-040 — Compare bidding cadences

**As a** learner  
**I want** to compare monthly planning, Lineholder daily changes, and Reserve daily coverage  
**So that** I do not treat every bidding system as the same process.

### Acceptance criteria

- The UI has three selectable views: monthly planning, Lineholder changes, and Reserve coverage.
- The monthly view explains PBS and its prerequisite inputs.
- The Lineholder view explains TTS, UBL, ETB, open time, and credit window.
- The Reserve view explains ROTA, ROTD, RAP, standby, award, and assignment.
- The comparison distinguishes ranked processing, real-time transactions, awards, and involuntary assignments.

## US-041 — Choose the appropriate Lineholder tool

**As a** Lineholder  
**I want** to understand when TTS, UBL, or ETB applies  
**So that** the systems have a clear mental model.

### Acceptance criteria

- The learner receives at least three simplified schedule-change scenarios.
- TTS is shown as a scheduled seniority-based process.
- UBL is shown as a follow-on opportunity after an unsuccessful TTS request.
- ETB is shown as a real-time transaction method between Flight Attendants.
- Every committed change runs conflict, legality, qualification, and applicable credit checks.

## US-042 — Demonstrate a safe schedule transaction

**As a** software engineer  
**I want** to see the lifecycle of a pickup, drop, or trade  
**So that** I understand why schedule transactions require concurrency and audit protection.

### Acceptance criteria

- The flow shows request, validation, lock/availability check, commit, and downstream propagation.
- A race-condition example prevents two users from receiving the same open position.
- Failure states explain the business reason rather than showing a generic error.
- The final schedule and source transaction are traceable.

---

# Epic 6 — Reserve, RAP A–D, ROTA, and ROTD

## US-050 — Explain a Reserve month

**As a** learner  
**I want** to see Reserve duty days, Golden Days, Flex Days, RAPs, standby, and assignments on one calendar  
**So that** I understand what a Reserve knows at the start of the month.

### Acceptance criteria

- The calendar differentiates Reserve duty days, Golden Days, Flex Days, sequences, standby, RAPs, and released time.
- Days off and availability are not treated as interchangeable.
- Contractual exceptions are hidden behind optional detail rather than placed in the first explanation.
- A “Why software cares” section covers availability and conflict calculations.

## US-051 — Visualize RAP A, B, C, and D

**As a** learner  
**I want** an interactive RAP clock  
**So that** I understand when a Reserve is available, contactable, assigned, reporting, or released.

### Acceptance criteria

- The model supports no more than RAP A, B, C, and D.
- A scheduled RAP is represented as a 12-hour HBT window.
- RAP A, B, and C start times are configuration by base and bid period.
- RAP A may be annotated as potentially starting as early as 0000 HBT when supported by the current CBA.
- RAP D can show its contract-defined window and applicable last-day or operational-release behavior.
- The clock shows RAP start, contactability, assignment, call-out, report, RAP end, and release.
- Modified RAP and legal-rest conflicts can be demonstrated.
- The UI never suggests that one illustrative A/B/C time is universal.

## US-052 — Explain ROTA future processing

**As a** Reserve learner  
**I want** to understand how tomorrow's sequences, standby shifts, and RAPs are processed  
**So that** I understand future Reserve bidding.

### Acceptance criteria

- ROTA is described as future processing, primarily for tomorrow.
- The experience includes bids, standing preferences, sequence groupings, availability, legality, seniority, assignment, award, ROC, standby, and RAP results at an introductory level.
- Exact processing and acknowledgement times are source-driven.
- The learner distinguishes a preferred award from an assignment needed to cover the operation.

## US-053 — Explain ROTD daily processing

**As a** Reserve learner  
**I want** to understand how newly opened flying is processed after ROTA  
**So that** day-of Reserve assignments make sense.

### Acceptance criteria

- ROTD is described as daily processing for needs that arise after ROTA.
- The flow shows UBL before applicable ROTD processing.
- The learner can compare aggressive bidding with ordinary assignment processing.
- The experience introduces RAP, grouping, clicks, seniority, qualification, and legality without requiring memorization of the full assignment order.
- Detailed assignment order is linked as a deep dive.

## US-054 — Distinguish Reserve award and assignment

**As a** learner  
**I want** to compare a requested award with an operational assignment  
**So that** I understand why the same trip can be received through different logic.

### Acceptance criteria

- The same fictional sequence is processed once as an award and once as an assignment.
- The award path emphasizes preference and seniority.
- The assignment path introduces grouping, clicks, seniority, legalities, and coverage need.
- The result displays the reason and source rule.

## US-055 — Simulate Reserve contact and acknowledgement

**As a** learner  
**I want** to experience a Reserve notification workflow  
**So that** I understand why assignment state is more than a calendar entry.

### Acceptance criteria

- The scenario includes assignment created, notification attempted, acknowledgement, report, and release states.
- The UI distinguishes electronic acknowledgement from positive contact.
- Special timing behavior is source-driven and progressively disclosed.
- The audit trail preserves event timestamps and outcomes.

---

# Epic 7 — Disruption, legality, and recovery

## US-060 — Compare scheduled and actual operation

**As a** learner  
**I want** to compare Maya's original sequence with what actually happened  
**So that** I understand why schedule, operation, and pay cannot use one timestamp set.

### Acceptance criteria

- Scheduled and actual departure, arrival, report, and release data are visibly distinct.
- A delay or cancellation causes downstream state changes.
- Original schedule data remains available for audit and pay-protection analysis.

## US-061 — Explain operational recovery

**As a** learner  
**I want** to follow a disruption through rescheduling, legality, communication, and recovery  
**So that** I understand how multiple FA systems collaborate.

### Acceptance criteria

- The story contains delay, cancellation, reschedule or reassignment, legality check, contact, accommodation/deadhead decision, and pay handoff.
- Lineholder and Reserve impacts are compared.
- Declared IROPS is not treated as a synonym for every delay or cancellation.
- Detailed rescheduling and pay-protection rules are linked as deep dives.

---

# Epic 8 — Pay, credit, guarantees, and rigs

## US-070 — Separate pay and credit ledgers

**As a** learner  
**I want** to see pay hours and credited hours separately  
**So that** I understand how pay-no-credit and guarantees work.

### Acceptance criteria

- The visual contains separate pay and credit columns.
- Pay, credit, pay-no-credit, premium, guarantee, and per diem are distinguished.
- A transaction can affect one ledger without affecting the other.
- The learner can trace each line item to its source event.

## US-071 — Calculate and compare rig candidates

**As a** learner  
**I want** to see all qualifying sequence-value candidates  
**So that** I understand why a rig can produce more value than flight time.

### Acceptance criteria

- The calculator shows scheduled/actual flight value, minimum-day value, Duty Rig, and Trip Rig separately.
- The applicable base sequence value is the greatest qualifying candidate.
- The winning value and reason are visible.
- Inputs and calculations use minutes internally.
- The result is labeled educational and illustrative.

## US-072 — Explain Trip Rig

**As a** learner  
**I want** to relate Time Away From Base to Trip Rig  
**So that** I understand how an inefficient multi-day sequence can receive additional value.

### Acceptance criteria

- The current ratio is read from a source-backed rule fact.
- A fixed example demonstrates 35 hours TAFB producing a 10-hour Trip Rig candidate when the applicable ratio is 1-for-3.5.
- The example compares Trip Rig with flight value rather than automatically declaring it payable.
- The CBA section is available from the explanation.

## US-073 — Explain Duty Rig

**As a** learner  
**I want** to relate on-duty time to Duty Rig  
**So that** I understand protection for a long duty period with little flying.

### Acceptance criteria

- The current ratio is read from a source-backed rule fact.
- A fixed example demonstrates 10 hours of duty producing a 5-hour Duty Rig candidate when the applicable ratio is 1-for-2.
- Scheduled and actual inputs can be shown where the rule requires comparison.
- Duty Rig is not confused with monthly guarantee.

## US-074 — Explain minimum-day value

**As a** learner  
**I want** to see minimum duty-period protection  
**So that** I understand why short flying can still generate a larger sequence value.

### Acceptance criteria

- One-day and multi-duty-period examples are supported.
- The rule is sourced and its conditions are not oversimplified.
- The minimum-day candidate participates in the greatest-of comparison.
- The UI identifies any additional contract conditions that require a deep dive.

## US-075 — Explain Sit Rig as supplemental pay

**As a** learner  
**I want** to see how qualifying long sit time differs from base rig candidates  
**So that** I do not incorrectly include Sit Rig in the greatest-of comparison.

### Acceptance criteria

- Sit time below the qualifying threshold produces zero Sit Rig.
- Qualifying excess sit time produces the source-backed supplemental calculation.
- Sit Rig is shown as pay/no-credit when applicable.
- Sit Rig appears in addition to, not as a replacement for, the selected base sequence value.
- Exceptions such as ODAN treatment are referenced but reserved for deep-dive content.

## US-076 — Explain Standby pay treatment

**As a** learner  
**I want** to understand that Standby has separate pay treatment  
**So that** I do not apply ordinary Duty Rig to every Standby situation.

### Acceptance criteria

- No-flight Standby examples support configured 4-, 6-, and applicable extended shifts.
- A Standby-to-sequence example shows the applicable Standby duty period and sequence report boundary.
- The 1-for-1.25 treatment is sourced and applied only to applicable time.
- The lesson links to a detailed Reserve pay deep dive.

## US-077 — Distinguish monthly guarantee from rigs

**As a** learner  
**I want** to compare monthly guarantees with sequence and duty guarantees  
**So that** I understand that they protect different scopes.

### Acceptance criteria

- Lineholder and Reserve monthly guarantees are stored as source-backed, effective-dated values.
- Monthly guarantee is shown at month scope.
- Trip, Duty, and minimum-day guarantees are shown at sequence or duty scope.
- The lesson explains that dropping time or working pay-no-credit can affect totals differently.

---

# Epic 9 — Images and visual learning

## US-080 — Replace representational SVG scenes with AI-generated imagery

**As a** learner  
**I want** engaging, consistent story imagery  
**So that** the course feels like an operational journey rather than contract documentation.

### Acceptance criteria

- Existing representational SVG scenes are replaced with project-local raster images.
- The initial set includes airport operations, Maya at report, cabin operations, and airline/crew network context.
- Images use a consistent editorial visual style.
- No image contains airline logos, contractual text, schedules, rig numbers, or exact aircraft safety diagrams.
- Images include useful alt text and responsive sizing.
- Exact operational information remains in accessible HTML or interactive components.

---

# Epic 10 — Knowledge checks, accessibility, and quality

## US-090 — Use scenario-based knowledge checks

**As a** learner  
**I want** short checks based on realistic decisions  
**So that** I learn the mental model rather than memorize contract numbers.

### Acceptance criteria

- Each module contains two to four lightweight checks.
- Most questions test relationships, object boundaries, or next actions.
- Exact values are tested only when genuinely foundational.
- Feedback appears after answering and explains the reasoning.
- Retakes preserve the best score without hiding previous completion.

## US-091 — Meet interaction accessibility requirements

**As a** learner using keyboard or assistive technology  
**I want** every learning interaction to be accessible  
**So that** I can complete the same journey as other learners.

### Acceptance criteria

- Every interactive control is keyboard reachable.
- Focus states are visible.
- Diagrams have a meaningful text alternative.
- Color is not the only way Lineholder/Reserve, scheduled/actual, or pay/credit states are distinguished.
- Reduced-motion preferences are respected.
- Mobile layouts do not require horizontal scrolling for core content.

## US-092 — Preserve traceability from UI to knowledge source

**As a** QA engineer or domain reviewer  
**I want** to trace an exact claim to its source  
**So that** I can verify content before release.

### Acceptance criteria

- Exact claims expose a source label and reference.
- The same rule ID produces the same value across lessons, quizzes, glossary, and scenarios.
- A content-review report can enumerate rule facts missing references or `asOf` dates.
- Facts marked `verify-current` are included in a review checklist.

---

## 4. Deep-dive backlog

The following topics should remain optional after the core journey:

1. Duty, rest, buffers, waivers, and legality calculations.
2. PBS strategy, layers, coverage needed, and award interpretation.
3. TTS, UBL, ETB, credit windows, limits, and advanced transactions.
4. Reserve groupings, clicks, assignment order, ROC, LMCO, and calling out of time.
5. Rescheduling, IROPS, illegal-through-no-fault, and pay protection.
6. Pay guarantees, rigs, premiums, boarding pay, per diem, and discrepancies.
7. International, IPD/NIPD, speakers, documents, and crew rest.
8. CQ, training bidding, qualifications, and requalification.
9. Seniority, Reserve rotation, transfers, vacancies, and TDY.
10. Vacation, sick leave, leaves, attendance, and approved time off.
11. Hotels, transportation, commuting, deadheading, and co-terminals.
12. Safety reporting, fatigue, injury-on-duty, and operational support.

---

## 5. Recommended delivery sequence

### Phase 1 — Foundation

- US-001 through US-003.
- US-010 and US-011.
- Establish `src/data/rules/`, `src/data/stories/`, and the v2 progress model.

### Phase 2 — First meaningful learning slice

- US-012 and US-020 through US-023.
- Build Modules 1–4.
- Add the connected journey and Maya story.
- Replace the first representational SVG assets after the learning direction is visible.

### Phase 3 — Monthly scheduling branch

- US-030 through US-032.
- Add the Lineholder/Reserve branch and simplified PBS award.

### Phase 4 — Lineholder and bidding cadence

- US-040 through US-042.
- Add monthly versus daily comparison and Lineholder change simulations.

### Phase 5 — Reserve

- US-050 through US-055.
- Add RAP A–D, ROTA, ROTD, award/assignment, and notification interactions.

### Phase 6 — Disruption and pay

- US-060, US-061, and US-070 through US-077.
- Add scheduled/actual recovery and the rig candidate calculator.

### Phase 7 — Quality and migration

- US-080 and US-090 through US-092.
- Migrate useful existing content to core lessons or deep dives.
- Preserve old routes with redirects where practical.
- Remove duplicated content only after migration is verified.

---

## 6. Suggested project structure

```text
src/
  components/
    journey/
      JourneyMap.vue
      JourneyModuleCard.vue
      MayaStoryCard.vue
      WhatHappensNext.vue
      WhySoftwareMatters.vue
    domain/
      LineholderReserveFork.vue
      BiddingCadence.vue
      MonthlySchedulePipeline.vue
      SequenceTimeline.vue
      RapClock.vue
      RotaRotdTimeline.vue
      AwardVsAssignment.vue
      PayCreditLedgers.vue
      RigCalculator.vue
      RigCandidateCard.vue
    sources/
      AuthorityBadge.vue
      RuleStatusBadge.vue
      SourceReference.vue
  data/
    coreJourney.ts
    rules/
      bidding.ts
      reserve.ts
      pay.ts
    stories/
      maya.ts
    content/
      core/
      deep-dives/
  views/
    LearningJourneyView.vue
    CoreModuleView.vue
```

The exact file boundaries may change during implementation, but rule data must remain separate from UI components.

---

## 7. Testing expectations

### Unit tests

- Rule lookup and missing-source handling.
- Progress v1-to-v2 migration.
- RAP window calculation across midnight.
- Modified RAP calculation.
- Trip Rig ratio calculation.
- Duty Rig ratio calculation.
- Minimum-day calculation.
- Sit Rig threshold and supplemental calculation.
- Greatest-of rig selection.
- Pay versus credit separation.

### UI tests

- Journey start, resume, and next-module navigation.
- Lineholder/Reserve branch comparison.
- Monthly/daily bidding cadence selector.
- TTS/UBL/ETB scenario decisions.
- RAP A–D selector and clock.
- ROTA versus ROTD scenario.
- Award versus assignment explanation.
- Rig calculator candidate display.
- Source-reference and verification-state display.

### Manual review

- Mobile and desktop layouts.
- Keyboard navigation.
- Text alternatives for visualizations.
- Source references against the knowledge base.
- All `verify-current` facts reviewed by a domain owner.
- AI imagery contains no invented operational data.

---

## 8. Definition of done

A story is done only when:

1. The implementation satisfies all acceptance criteria.
2. Exact facts are traceable to the knowledge base or an approved external source.
3. Contractual rules are identified as AA/APFA-specific.
4. Configurable values are not hardcoded in presentation components.
5. The experience works with keyboard and mobile layouts.
6. Unit or component tests cover rule calculations and important branches.
7. `npm run build` completes successfully.
8. Existing unrelated project behavior and user changes are preserved.

---

## 9. First GPT implementation instruction

Use the following prompt to begin implementation:

> Implement Phase 1 of `docs/IMPLEMENTATION_USER_STORIES.md` in the existing Flight Attendant Domain Academy. Preserve the Vue 3, TypeScript, Vite, Vuetify, Pinia, and Vue Router architecture. Add the knowledge-source authority and rule-status model, establish structured rule-data folders, define the ten-module core journey, and migrate progress safely from v1 to v2. Replace the flat Learning Center catalog with a connected journey map containing a prominent preview of the Lineholder-versus-Reserve branch and the three bidding cadences. Do not remove existing detailed modules yet. Do not hardcode RAP times, bidding deadlines, guarantees, or rig ratios in Vue templates. Run the production build and report every content fact that still requires domain verification.
