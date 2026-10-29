<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import MonthCalendar from '../components/MonthCalendar.vue'
import SystemTimelineExplorer from '../components/SystemTimelineExplorer.vue'
import { calendarReferences, calendarSnapshot, rotaSequences, septemberMilestones, systemGuide, systemTimings } from '../data/schedulingCalendar'
import { chapterForEvents, eventsForDay, monthlyPersonas, scenarioEntryIndex, type MonthEvent, type MonthPersona } from '../data/monthlyStory'

interface Reading {
  chapter: number
  choices: Record<string, string>
}
const personaId = ref<MonthPersona['id']>('maya')
const rotaPreference = ref<string | null>(null)
const chosenSequence = computed(() => rotaSequences.find((item) => item.id === rotaPreference.value))
const selectedSystem = ref('TBS')
const explorerEl = ref<HTMLElement | null>(null)
const storyEl = ref<HTMLElement | null>(null)
const scenarioSystems = computed(() => (chapter.value?.systems ?? []).map((system) => system.name))
const timedSystems = new Set(systemTimings.map((system) => system.system))
const systemAbbreviations = [...new Set(systemTimings.map((system) => system.system).filter((name) => /^[A-Z]+$/.test(name)))]
const hasSystemGuide = (name: string) => name in systemGuide

/** First story chapter that features each system, preferring the persona used in that system's scenario. */
const practiceTargets = computed(() => {
  const targets: Record<string, { persona: MonthPersona['id']; chapter: number }> = {}
  for (const system of systemTimings) {
    const preferred = system.scenario.persona.toLowerCase().startsWith('jordan') ? 'jordan' : 'maya'
    for (const id of [preferred, preferred === 'maya' ? 'jordan' : 'maya'] as const) {
      const person = monthlyPersonas.find((item) => item.id === id)!
      const chapter = person.chapters.findIndex((item) => item.systems?.some((s) => s.name === system.system))
      if (chapter >= 0) { targets[system.system] = { persona: id, chapter }; break }
    }
  }
  return targets
})

const readings = ref<Record<MonthPersona['id'], Reading>>({
  maya: { chapter: -1, choices: {} },
  jordan: { chapter: -1, choices: {} },
})
const persona = computed(() => monthlyPersonas.find((person) => person.id === personaId.value)!)
const reading = computed(() => readings.value[personaId.value])
const snapshot = computed(() => calendarSnapshot(persona.value, reading.value.chapter, reading.value.choices, rotaPreference.value))
const previous = computed(() => calendarSnapshot(persona.value, reading.value.chapter - 1, reading.value.choices, rotaPreference.value))
const chapter = computed(() => {
  const current = persona.value.chapters[reading.value.chapter]
  return current ? chapterForEvents(current, previous.value.events) : undefined
})
const activeOption = computed(() => {
  const current = chapter.value
  if (!current?.choice) return undefined
  return current.choice.options.find((option) => option.id === reading.value.choices[current.id])
})
const branches = computed(() => (chapter.value?.branches ?? []).filter((branch) =>
  reading.value.choices[branch.from] === branch.option))
const selectedMilestone = ref<number | null>(null)
const milestone = computed(() => septemberMilestones.find((item) => item.day === selectedMilestone.value))
const septemberDay = computed(() => {
  const match = chapter.value?.date.match(/^September (\d+)/)
  return match ? Number(match[1]) : null
})
const colors: Record<MonthEvent['kind'], string> = {
  flying: '#0061AB', reserve: '#8853A6', training: '#237953',
  personal: '#A44D76', request: '#A66308', off: '#60717D',
}
const isLineholder = computed(() => persona.value.role === 'Lineholder')
// A Lineholder's awarded line lists only sequences (and training); it has no designated off-day entries.
const legendKinds = computed(() => (Object.keys(colors) as MonthEvent['kind'][]).filter((kind) => !(isLineholder.value && kind === 'off')))
const octoberDays = computed(() => Array.from({ length: 31 }, (_, i) => {
  const day = i + 1
  const events = eventsForDay(snapshot.value.events, day)
  return {
    day,
    label: events.length ? events.map((item) => item.label).join(' / ') : snapshot.value.published && !isLineholder.value ? 'Off' : undefined,
    detail: events.length ? events.map((item) => item.detail).join(' ') : isLineholder.value
      ? 'No sequence on this date. A Lineholder’s awarded line shows only sequences and training—there are no off-day entries.'
      : 'No duty on this date in the simplified fictional schedule. Confirm the actual line.',
    color: colors[events[0]?.kind ?? 'off'],
  }
}))
const changedDays = computed(() => Array.from({ length: 31 }, (_, i) => i + 1).filter((day) =>
  JSON.stringify(eventsForDay(snapshot.value.events, day)) !== JSON.stringify(eventsForDay(previous.value.events, day))))
const canContinue = computed(() => (!chapter.value?.choice || Boolean(activeOption.value)) &&
  (chapter.value?.id !== 'next-day-bid' || Boolean(chosenSequence.value)))

function selectScenario(index: number) {
  const target = scenarioEntryIndex(persona.value, index, reading.value.choices)
  if (target < 0) return
  reading.value.chapter = personaId.value === 'jordan' && persona.value.chapters[target].id === 'next-day-result' && !chosenSequence.value
    ? persona.value.chapters.findIndex((item) => item.id === 'next-day-bid')
    : target
}

function practice(system: string) {
  const target = practiceTargets.value[system]
  if (!target) return
  personaId.value = target.persona
  selectScenario(target.chapter)
  nextTick(() => storyEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

function showTiming(system: string) {
  if (!timedSystems.has(system)) return
  selectedSystem.value = system
  nextTick(() => (explorerEl.value?.querySelector('.detail') ?? explorerEl.value)?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
}

function choose(id: string) {
  if (!chapter.value?.choice?.options.some((option) => option.id === id)) return
  if (reading.value.choices[chapter.value.id] === id) return
  for (const later of persona.value.chapters.slice(reading.value.chapter + 1)) {
    delete reading.value.choices[later.id]
  }
  reading.value.choices[chapter.value.id] = id
}

function chooseSequence(id: string) {
  if (!rotaSequences.some((sequence) => sequence.id === id) || rotaPreference.value === id) return
  rotaPreference.value = id
  for (const later of persona.value.chapters.slice(reading.value.chapter + 1)) {
    delete reading.value.choices[later.id]
  }
}

function next() {
  if (canContinue.value && reading.value.chapter < persona.value.chapters.length - 1) selectScenario(reading.value.chapter + 1)
}

function restart() {
  readings.value[personaId.value] = { chapter: -1, choices: {} }
  if (personaId.value === 'jordan') rotaPreference.value = null
}
</script>

<template>
  <v-container fluid class="calendar-page pa-4 pa-md-6">
    <h1 class="text-h4 font-weight-bold mb-2">Scheduling Calendar</h1>
    <p class="text-body-1 text-medium-emphasis mb-3">Learn which scheduling system to use, who it is for, and when to check for a result.</p>
    <v-alert type="info" variant="tonal" class="mb-4" density="comfortable">
      <strong>Practice guide:</strong> September–October 2026 illustrates published scheduling rules with fictional trips and outcomes—not a live calendar or a promise of an award.
      Check current Company/APFA guidance for real dates, eligibility, and procedures.
    </v-alert>
    <div class="quick-facts mb-6">
      <div><strong>Plan a future month</strong><span>The September example shows how October is built.</span></div>
      <div><strong>Manage your awarded month</strong><span>Daily systems can change a schedule you already have.</span></div>
      <div><strong>Times</strong><span>DFW = Dallas/Fort Worth · HBT = Home Base Time · CT = Central.</span></div>
      <div><strong>Before you rely on a change</strong><span>Wait for the company-system result, or confirmation of an ETB trade.</span></div>
    </div>
    <!-- <section class="abbreviation-guide mb-6" aria-labelledby="abbreviation-heading">
      <h2 id="abbreviation-heading" class="text-subtitle-1 font-weight-bold mb-2">System abbreviations</h2>
      <ul class="abbreviation-list">
        <li v-for="name in systemAbbreviations" :key="name"><strong>{{ name }}</strong> ({{ systemGuide[name].name }})</li>
      </ul>
    </section> -->

    <section ref="storyEl" class="scroll-target" aria-labelledby="story-heading">
      <h2 id="story-heading" class="text-h5 font-weight-bold mb-1">Walk through an example month</h2>
      <p class="text-body-2 text-medium-emphasis mb-4">Follow a fictional Lineholder or Reserve from September planning through October. Each step shows which system is involved and how a confirmed outcome could change the example schedule.</p>
    <div class="beginner-guide mb-4 pa-4">
      <p class="text-body-2"><strong>Lineholder:</strong> starts with awarded trips. <strong>Reserve:</strong> starts with days of availability; specific trips can be assigned later.
        A <strong>sequence</strong> is one work trip, which may contain several flights over one or more days.</p>
    </div>
    <v-btn-toggle v-model="personaId" mandatory divided color="primary" variant="outlined" class="mb-4" aria-label="Flight attendant role">
      <v-btn value="maya">Maya · Lineholder</v-btn>
      <v-btn value="jordan">Jordan · Reserve</v-btn>
    </v-btn-toggle>
    <p class="text-body-2 mb-4">{{ persona.home }} Follow the scenario below. Company requests stay pending until the system returns a result; a peer-to-peer ETB trade takes effect only after acceptance, applicable eligibility and legality checks, and system approval. Verify the updated schedule.</p>

    <div class="paired-calendars">
      <section aria-labelledby="september-heading">
        <h3 id="september-heading" class="text-h6">September 2026 · key dates</h3>
        <p class="text-caption text-medium-emphasis mb-3">Example opening dates, cutoffs, and result checks for building October</p>
        <MonthCalendar :days="septemberMilestones" :days-in-month="30" :start-weekday="2"
          :selected-day="selectedMilestone ?? septemberDay" :show-detail="false"
          @select="selectedMilestone = $event" />
        <div v-if="milestone" class="timeline-detail mt-3 pa-3" aria-live="polite">
          <strong>September {{ milestone.day }} · {{ milestone.label }}</strong>
          <p class="text-body-2 mt-1">{{ milestone.detail }}</p>
          <v-btn variant="text" size="small" @click="selectedMilestone = null">Close timeline detail</v-btn>
        </div>
      </section>
      <section aria-labelledby="october-heading">
        <h3 id="october-heading" class="text-h6">October 2026 · {{ persona.name }}’s schedule</h3>
        <p class="text-caption text-medium-emphasis mb-3" aria-live="polite">
          {{ snapshot.published ? (isLineholder ? 'Example awarded line · trips and training are shown; a blank date does not confirm a day off'
            : 'Example reserve line · reserve days and confirmed changes are shown') : 'Personal plans first · nothing awarded yet' }}
        </p>
        <MonthCalendar :key="personaId" :days="octoberDays" :days-in-month="31" :start-weekday="4" />
        <div class="calendar-legend mt-3">
          <span v-for="kind in legendKinds" :key="kind" :style="{ borderColor: colors[kind] }">{{ kind === 'flying' ? 'sequence' : kind }}</span>
        </div>
      </section>
    </div>

    <div class="scenario-workspace mt-5">
    <v-card class="scenario-card pa-4 pa-md-5" variant="outlined" aria-live="polite">
      <template v-if="chapter">
        <div class="text-caption text-medium-emphasis mb-2">{{ chapter.date }} · Scenario {{ reading.chapter + 1 }} of {{ persona.chapters.length }}</div>
        <h2 class="text-h6 mb-3">{{ chapter.title }}</h2>
        <div v-if="scenarioSystems.length" class="application-flow mb-3">
          <span><strong>Systems involved:</strong> {{ scenarioSystems.join(', ') }}</span>
        </div>
        <p v-for="system in chapter.systems?.filter((item) => hasSystemGuide(item.name))" :key="system.name" class="plain-definition mb-3">
          {{ systemGuide[system.name].simple }}
        </p>
        <p v-if="chapter.id === 'next-day-result' && chosenSequence" class="scenario-text">
          After the UBL step, ROTA awards Jordan {{ chosenSequence.label }} on October 7–8 in this illustrative outcome. A preferred sequence is not guaranteed; eligibility, availability and Reserve assignment rules determine the actual result. He acknowledges the published assignment through the automated system before 22:30 HBT.
          October 9–10 are still Reserve days.
        </p>
        <p v-else class="scenario-text">{{ chapter.text }}</p>
        <p v-if="chapter.message" class="text-body-2 mt-3"><strong>{{ chapter.message.from }}:</strong> “{{ chapter.message.text }}”</p>
        <p v-if="chapter.timing" class="text-body-2 text-medium-emphasis mt-3">{{ chapter.timing }}</p>
        <div v-if="chapter.id === 'next-day-bid'" class="mt-4">
          <h3 class="text-subtitle-1 font-weight-bold">1. Which sequence preference does Jordan submit?</h3>
          <p class="text-body-2 mb-3">Practice only. This records a preference, not a booking. A daily ROTA bid may also include sequence preferences, a specific standby shift or RAP.</p>
          <div class="choices">
            <button v-for="sequence in rotaSequences" :key="sequence.id" type="button" class="sequence-option"
              :aria-pressed="rotaPreference === sequence.id" @click="chooseSequence(sequence.id)">
              <strong>{{ sequence.label }}</strong><span>{{ sequence.dates }}</span><span>{{ sequence.route }}</span>
            </button>
          </div>
          <p v-if="chosenSequence" class="text-body-2 mt-3">Saved: {{ chosenSequence.label }}. October 7–8 still show Reserve until ROTA results at 19:30.</p>
        </div>
        <div v-if="chapter.choice" class="mt-4">
          <h3 class="text-subtitle-1 mb-2">{{ chapter.id === 'next-day-bid' ? '2. Keep a childcare backup while the request is pending' : chapter.choice.prompt }}</h3>
          <div class="choices">
            <v-btn v-for="option in chapter.choice.options" :key="option.id" color="primary"
              :variant="activeOption?.id === option.id ? 'flat' : 'outlined'"
              :aria-pressed="activeOption?.id === option.id" @click="choose(option.id)">{{ option.label }}</v-btn>
          </div>
          <p v-if="activeOption" class="text-body-2 mt-3">{{ activeOption.reply }}</p>
        </div>
        <p v-for="branch in branches" :key="`${branch.from}-${branch.option}`" class="scenario-text mt-3">{{ branch.text }}</p>
        <p v-if="changedDays.length" class="text-body-2 mt-3 text-primary">October calendar updated: {{ changedDays.join(', ') }}.</p>
        <p v-else class="text-body-2 mt-3 text-medium-emphasis">No October schedule change at this step.</p>
        <div class="d-flex flex-wrap ga-2 mt-3">
          <template v-for="system in chapter.systems" :key="system.name">
            <v-btn v-if="timedSystems.has(system.name)" variant="tonal" color="primary" size="small" prepend-icon="mdi-timeline-clock-outline"
              @click="showTiming(system.name)">When does {{ system.name }} open and close?</v-btn>
            <v-btn v-else variant="text" size="small" :to="`/learn/${system.lessonId}`">{{ system.name }} · learn more</v-btn>
          </template>
        </div>
      </template>
      <template v-else>
        <h2 class="text-h6 mb-3">Start with personal plans—not an awarded line</h2>
        <p>Nothing is awarded yet—only personal plans are on the calendar. Start {{ persona.name }}’s story to see each system fill in October, step by step.</p>
      </template>
      <div class="d-flex flex-wrap ga-2 mt-4">
        <v-btn variant="text" :disabled="reading.chapter < 0" @click="reading.chapter--">Previous</v-btn>
        <v-btn color="primary" :disabled="!canContinue || reading.chapter === persona.chapters.length - 1" @click="next">
          {{ reading.chapter < 0 ? 'Begin scenario' : 'Continue scenario' }}
        </v-btn>
        <v-btn variant="text" @click="restart">Restart {{ persona.name }}</v-btn>
      </div>
    </v-card>
    <aside class="scenario-index" aria-labelledby="scenario-index-heading">
      <h2 id="scenario-index-heading" class="text-subtitle-1 font-weight-bold mb-1">Choose a scenario</h2>
      <p class="text-caption text-medium-emphasis mb-3">{{ persona.name }} · {{ persona.chapters.length }} examples</p>
      <nav class="scenario-list" :aria-label="`${persona.name} scenarios`">
        <button v-for="(scenario, index) in persona.chapters" :key="scenario.id" type="button" class="scenario-link"
          :class="{ selected: reading.chapter === index }" :aria-pressed="reading.chapter === index"
          @click="selectScenario(index)">
          <span class="scenario-number">{{ index + 1 }}</span>
          <span class="scenario-link-copy">
            <strong>{{ scenario.title }}</strong>
            <small>{{ scenario.date }}</small>
            <span v-if="scenario.choice" class="scenario-kind">Interactive</span>
            <span v-else-if="scenario.requiresChoices?.length || scenario.branches?.length" class="scenario-kind">Outcome</span>
          </span>
        </button>
      </nav>
    </aside>
    </div>
    </section>

    <section ref="explorerEl" class="scroll-target mt-10" aria-labelledby="systems-heading">
      <h2 id="systems-heading" class="text-h5 font-weight-bold mb-1">Every system: opens, cutoff, results</h2>
      <p class="text-body-2 text-medium-emphasis mb-4">Click a system to see its times and a short example.</p>
      <SystemTimelineExplorer v-model:selected="selectedSystem" :practiceable="Object.keys(practiceTargets)" @practice="practice" />
    </section>
    <p class="text-caption text-medium-emphasis mt-6">Teaching reference only. Confirm current APFA/Company dates, eligibility,
      and implementation before acting.</p>
    <details class="mt-5 text-body-2 text-medium-emphasis">
      <summary>Sources, verification limits and practice outcomes</summary>
      <p class="mt-2">Timing and eligibility reviewed on October 28, 2026 against the 2024 CBA, Sections 10.C, 10.E–G and 12.I–K,
        and the public APFA guidance linked below, including its published monthly bidding timeline. Signed-in Crew Portal menus and current operational notices were not verified.
        Day-off trading is shown as a TTS action; premium conditions and voluntary elections are not separate applications.
        No live application links or exact menu paths are claimed. This page is a practice interface, not an AA application.</p>
      <ul class="ml-4 mt-2"><li v-for="source in calendarReferences" :key="source.url">
        <a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.label }}</a>
      </li></ul>
      <p class="mt-2">This September–October 2026 teaching calendar uses fictional trips and outcomes, not a live schedule, legality engine or award predictor.
        Choices select illustrative outcomes. Reserve blocks are simplified. Use current APFA/Company calendars and procedures.
        DFW means Dallas/Fort Worth time; HBT means Home Base Time. October’s monthly PBS bidding builds November.
        Selecting a September date explains the timeline; it does not submit a bid or advance the scenario.
        Progress stays in this page session, separately for each person. The Day in the Life story’s saved progress is unchanged.</p>
    </details>
  </v-container>
</template>

<style scoped>
.calendar-page { max-width: 1500px; }
.paired-calendars { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.paired-calendars section { min-width: 0; }
.scenario-workspace { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 16px; align-items: start; }
.scenario-index { min-width: 0; border-top: 3px solid #0061ab; padding-top: 12px; }
.scenario-list { display: grid; gap: 4px; max-height: min(72vh, 720px); overflow-y: auto; padding-right: 4px; }
.scenario-link { display: grid; grid-template-columns: 24px minmax(0, 1fr); gap: 8px; width: 100%; padding: 8px; border: 1px solid transparent; border-bottom-color: #d3e0eb; border-radius: 4px; background: transparent; color: #1b2a35; text-align: left; cursor: pointer; }
.scenario-link:hover, .scenario-link.selected { border-color: #0061ab; background: #eaf3fb; }
.scenario-link:focus-visible { outline: 3px solid #0061ab; outline-offset: 2px; }
.scenario-number { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; background: #e6f0f9; color: #003057; font-size: .75rem; font-weight: 700; }
.scenario-link-copy { display: grid; min-width: 0; gap: 3px; }
.scenario-link-copy strong { font-size: .8125rem; line-height: 1.3; }
.scenario-link-copy small { color: #60717d; font-size: .6875rem; line-height: 1.3; }
.scenario-kind { color: #0061ab; font-size: .625rem; font-weight: 700; text-transform: uppercase; }
.timeline-detail { background: #eaf3fb; border-radius: 8px; }
.calendar-legend, .choices { display: flex; flex-wrap: wrap; gap: 8px; }
.calendar-legend span { border-left: 4px solid; padding-left: 5px; font-size: .75rem; }
.choices .v-btn { white-space: normal; height: auto; min-height: 44px; padding: 10px 16px; }
.scenario-text { line-height: 1.8; }
.application-flow { display: flex; flex-wrap: wrap; gap: 12px; padding: 12px; background: #eaf3fb; border-radius: 8px; font-size: .875rem; }
.beginner-guide { background: #eaf3fb; border-radius: 12px; }
.quick-facts { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.quick-facts div { display: flex; flex-direction: column; gap: 2px; padding: 12px 14px; border-radius: 10px; background: #f5f9fc; border: 1px solid #e1eaf1; font-size: .8125rem; }
.quick-facts strong { color: #003057; font-size: .875rem; }
.abbreviation-list { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px 16px; margin: 0; padding: 0; list-style: none; font-size: .8125rem; }
.abbreviation-list strong { color: #003057; }
.scroll-target { scroll-margin-top: 80px; }
@media (max-width: 1050px) { .quick-facts { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 1050px) { .scenario-workspace { grid-template-columns: 1fr; } .scenario-list { grid-template-columns: repeat(2, minmax(0, 1fr)); max-height: 360px; } }
@media (max-width: 560px) { .quick-facts { grid-template-columns: 1fr; } }
@media (max-width: 560px) { .scenario-list { grid-template-columns: 1fr; max-height: 420px; } }
@media (max-width: 760px) { .abbreviation-list { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.plain-definition { border-left: 3px solid #0061ab; padding: 8px 12px; background: #f5f9fc; font-size: .875rem; }
.sequence-option { display: flex; flex-direction: column; gap: 6px; text-align: left; padding: 16px; border: 2px solid #cbd8e3; border-radius: 10px; flex: 1 1 220px; }
.sequence-option[aria-pressed="true"] { border-color: #0061ab; background: #eaf3fb; }
.sequence-option:focus-visible { outline: 3px solid #0061ab; outline-offset: 3px; }
summary { cursor: pointer; }
@media (max-width: 1050px) { .paired-calendars { grid-template-columns: 1fr; } }
</style>
