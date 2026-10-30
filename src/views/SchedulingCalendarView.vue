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
const explorerEl = ref<HTMLDetailsElement | null>(null)
const storyEl = ref<HTMLElement | null>(null)
const scenarioSystems = computed(() => (chapter.value?.systems ?? []).map((system) => {
  const guide = systemGuide[system.name]
  return { ...system, label: guide ? `${system.name} (${guide.name})` : system.name, simple: guide?.simple }
}))
const timedSystems = new Set(systemTimings.map((system) => system.system))
const systemAbbreviations = [...new Set(systemTimings.map((system) => system.system).filter((name) => /^[A-Z]+$/.test(name)))]

/** Use the linked scenario when specified, otherwise the first chapter featuring the system. */
const practiceTargets = computed(() => {
  const targets: Record<string, { persona: MonthPersona['id']; chapter: number }> = {}
  for (const system of systemTimings) {
    const preferred = system.scenario.persona.toLowerCase().startsWith('jordan') ? 'jordan' : 'maya'
    for (const id of [preferred, preferred === 'maya' ? 'jordan' : 'maya'] as const) {
      const person = monthlyPersonas.find((item) => item.id === id)!
      const chapter = person.chapters.findIndex((item) => system.practiceChapter
        ? item.id === system.practiceChapter
        : item.systems?.some((entry) => entry.name === system.system))
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
const scenarioOptions = computed(() => persona.value.chapters.map((item, index) => ({ title: `${index + 1}. ${item.title}`, value: index })))
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
  nextTick(() => storyEl.value?.querySelector('.scenario-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

function showTiming(system: string) {
  if (!timedSystems.has(system)) return
  selectedSystem.value = system
  if (explorerEl.value) explorerEl.value.open = true
  nextTick(() => (explorerEl.value?.querySelector('.detail') ?? explorerEl.value)?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
}

function choose(id: string | null) {
  if (id === null || !chapter.value?.choice?.options.some((option) => option.id === id)) return
  if (reading.value.choices[chapter.value.id] === id) return
  for (const later of persona.value.chapters.slice(reading.value.chapter + 1)) {
    delete reading.value.choices[later.id]
  }
  reading.value.choices[chapter.value.id] = id
}

function chooseSequence(id: string | null) {
  if (id === null || !rotaSequences.some((sequence) => sequence.id === id) || rotaPreference.value === id) return
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
    <v-alert type="info" variant="tonal" class="mb-3" density="compact">
      <strong>Practice only:</strong> Fictional trips and outcomes, not a live schedule. Requests do not change duty until confirmed.
      Verify current Company/APFA dates and eligibility.
    </v-alert>
    <details class="calendar-guide mb-5">
      <summary>Terms and time zones</summary>
      <p class="mt-2"><strong>Lineholder:</strong> awarded trips. <strong>Reserve:</strong> days of availability, with specific assignments later.
        A <strong>sequence</strong> is a work trip containing one or more flights.</p>
      <p class="mt-2">DFW = Dallas/Fort Worth time. HBT = Home Base Time. CT = Central Time.</p>
      <p class="mt-2">September bidding builds October. Company requests remain pending until an award; ETB trades require acceptance,
        eligibility and legality checks, and system approval. Verify the updated schedule.</p>
    </details>
    <!-- <section class="abbreviation-guide mb-6" aria-labelledby="abbreviation-heading">
      <h2 id="abbreviation-heading" class="text-subtitle-1 font-weight-bold mb-2">System abbreviations</h2>
      <ul class="abbreviation-list">
        <li v-for="name in systemAbbreviations" :key="name"><strong>{{ name }}</strong> ({{ systemGuide[name].name }})</li>
      </ul>
    </section> -->

    <section ref="storyEl" class="scroll-target" aria-labelledby="story-heading">
      <h2 id="story-heading" class="text-h6 font-weight-bold mb-3">Example month</h2>
    <v-btn-toggle v-model="personaId" mandatory divided color="primary" variant="outlined" class="persona-switch mb-4" aria-label="Flight attendant role">
      <v-btn value="maya">Maya · Lineholder</v-btn>
      <v-btn value="jordan">Jordan · Reserve</v-btn>
    </v-btn-toggle>
    <p class="text-body-2 text-medium-emphasis mb-4">{{ persona.home }}</p>

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
    <v-select class="scenario-picker" label="Scenario" :items="scenarioOptions"
      :model-value="reading.chapter < 0 ? null : reading.chapter" variant="outlined" density="compact" hide-details
      @update:model-value="selectScenario" />
    <v-card class="scenario-card pa-4 pa-md-5" variant="outlined" aria-live="polite">
      <template v-if="chapter">
        <div class="text-caption text-medium-emphasis mb-2">{{ chapter.date }} · Scenario {{ reading.chapter + 1 }} of {{ persona.chapters.length }}</div>
        <h2 class="text-h6 mb-3">{{ chapter.title }}</h2>
        <p v-if="scenarioSystems.length" class="scenario-systems mb-3">{{ scenarioSystems.map((system) => system.label).join(' · ') }}</p>
        <p v-if="chapter.id === 'next-day-result' && chosenSequence" class="scenario-text">
          After the UBL step, ROTA awards Jordan {{ chosenSequence.label }} on October 7–8 in this illustrative outcome. A preferred sequence is not guaranteed; eligibility, availability and Reserve assignment rules determine the actual result. He acknowledges the published assignment through the automated system before 22:30 HBT.
          October 9–10 are still Reserve days.
        </p>
        <p v-else class="scenario-text">{{ chapter.text }}</p>
        <p v-if="chapter.message" class="text-body-2 mt-3"><strong>{{ chapter.message.from }}:</strong> “{{ chapter.message.text }}”</p>
        <details v-if="chapter.timing || scenarioSystems.length" :key="`${personaId}-${chapter.id}`" class="scenario-reference mt-3">
          <summary>Timing and rules</summary>
          <p v-if="chapter.timing" class="mt-2">{{ chapter.timing }}</p>
          <template v-for="system in scenarioSystems" :key="system.name">
            <p v-if="system.simple" class="mt-2"><strong>{{ system.name }}:</strong> {{ system.simple }}</p>
          </template>
          <div class="reference-links d-flex flex-wrap ga-1 mt-2">
            <template v-for="system in scenarioSystems" :key="system.name">
              <v-btn v-if="timedSystems.has(system.name)" variant="text" color="primary" size="small" prepend-icon="mdi-clock-outline"
                @click="showTiming(system.name)">{{ system.name }} timing</v-btn>
              <v-btn v-else variant="text" size="small" prepend-icon="mdi-school-outline" :to="`/learn/${system.lessonId}`">{{ system.name }} lesson</v-btn>
            </template>
          </div>
        </details>
        <div v-if="chapter.id === 'next-day-bid'" class="mt-4">
          <h3 id="sequence-choice-heading" class="text-subtitle-2 font-weight-bold mb-2">Sequence preference</h3>
          <v-radio-group :model-value="rotaPreference" aria-labelledby="sequence-choice-heading" hide-details class="scenario-options"
            @update:model-value="chooseSequence">
            <v-radio v-for="sequence in rotaSequences" :key="sequence.id" :value="sequence.id" color="primary">
              <template #label><span class="sequence-copy"><strong>{{ sequence.label }}</strong><small>{{ sequence.dates }} · {{ sequence.route }}</small></span></template>
            </v-radio>
          </v-radio-group>
          <p v-if="chosenSequence" class="text-caption text-medium-emphasis mt-2">Preference saved. October 7–8 remain Reserve until the published result; this is not a booking.</p>
        </div>
        <div v-if="chapter.choice" class="mt-4">
          <h3 id="scenario-choice-heading" class="text-subtitle-2 font-weight-bold mb-2">{{ chapter.id === 'next-day-bid' ? 'Childcare plan' : chapter.choice.prompt }}</h3>
          <v-radio-group :model-value="activeOption?.id" aria-labelledby="scenario-choice-heading" hide-details class="scenario-options"
            @update:model-value="choose">
            <v-radio v-for="option in chapter.choice.options" :key="option.id" :value="option.id" :label="option.label" color="primary" />
          </v-radio-group>
        </div>
        <div v-if="activeOption || branches.length" class="scenario-result mt-4">
          <h3 class="text-subtitle-2 font-weight-bold mb-1">Result</h3>
          <p v-if="activeOption">{{ activeOption.reply }}</p>
          <p v-for="branch in branches" :key="`${branch.from}-${branch.option}`">{{ branch.text }}</p>
        </div>
        <p v-if="changedDays.length" class="text-body-2 mt-3 text-primary">October calendar updated: {{ changedDays.join(', ') }}.</p>
        <p v-else class="text-caption mt-3 text-medium-emphasis">Schedule unchanged.</p>
      </template>
      <template v-else>
        <h2 class="text-h6 mb-2">{{ persona.name }}’s October</h2>
        <p>Only personal plans are on the calendar. No work has been awarded yet.</p>
      </template>
      <div class="scenario-navigation d-flex flex-wrap align-center ga-2 mt-4">
        <v-btn variant="text" prepend-icon="mdi-chevron-left" :disabled="reading.chapter < 0" @click="reading.chapter--">Previous</v-btn>
        <v-btn color="primary" append-icon="mdi-chevron-right" :aria-label="reading.chapter < 0 ? 'Start scenario' : 'Continue scenario'"
          :disabled="!canContinue || reading.chapter === persona.chapters.length - 1" @click="next">
          {{ reading.chapter < 0 ? 'Start' : 'Continue' }}
        </v-btn>
        <v-tooltip :text="`Restart ${persona.name}`" location="top">
          <template #activator="{ props: tooltipProps }">
            <v-btn v-bind="tooltipProps" class="ml-auto" variant="text" icon="mdi-restart" size="small" :aria-label="`Restart ${persona.name}`" @click="restart" />
          </template>
        </v-tooltip>
      </div>
    </v-card>
    <aside class="scenario-index" aria-labelledby="scenario-index-heading">
      <h2 id="scenario-index-heading" class="text-subtitle-2 font-weight-bold mb-2">Scenarios · {{ persona.chapters.length }}</h2>
      <nav class="scenario-list" :aria-label="`${persona.name} scenarios`">
        <button v-for="(scenario, index) in persona.chapters" :key="scenario.id" type="button" class="scenario-link"
          :class="{ selected: reading.chapter === index }" :aria-pressed="reading.chapter === index"
          @click="selectScenario(index)">
          <span class="scenario-number">{{ index + 1 }}</span>
          <span class="scenario-link-copy">
            <strong>{{ scenario.title }}</strong>
            <small>{{ scenario.date }}</small>
          </span>
        </button>
      </nav>
    </aside>
    </div>
    </section>

    <details ref="explorerEl" class="system-timings scroll-target mt-6">
      <summary>System timings</summary>
      <SystemTimelineExplorer v-model:selected="selectedSystem" class="mt-4" :practiceable="Object.keys(practiceTargets)" @practice="practice" />
    </details>
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
.persona-switch { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); width: min(100%, 390px); height: auto; }
.persona-switch .v-btn { min-width: 0; min-height: 44px; height: auto; padding: 8px 12px; white-space: normal; text-transform: none; letter-spacing: 0; }
.persona-switch :deep(.v-btn__content) { white-space: normal; }
.paired-calendars { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.paired-calendars section { min-width: 0; }
.scenario-workspace { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 16px; align-items: start; }
.scenario-picker { display: none; }
.scenario-card { min-width: 0; border-radius: 8px; }
.scenario-index { min-width: 0; border-left: 1px solid #d3e0eb; padding-left: 16px; }
.scenario-list { display: grid; gap: 4px; max-height: min(72vh, 720px); overflow-y: auto; padding-right: 4px; }
.scenario-link { display: grid; grid-template-columns: 24px minmax(0, 1fr); gap: 8px; width: 100%; padding: 8px; border: 1px solid transparent; border-bottom-color: #d3e0eb; border-radius: 4px; background: transparent; color: #1b2a35; text-align: left; cursor: pointer; }
.scenario-link:hover, .scenario-link.selected { border-color: #0061ab; background: #eaf3fb; }
.scenario-link:focus-visible { outline: 3px solid #0061ab; outline-offset: 2px; }
.scenario-number { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; background: #e6f0f9; color: #003057; font-size: .75rem; font-weight: 700; }
.scenario-link-copy { display: grid; min-width: 0; gap: 3px; }
.scenario-link-copy strong { font-size: .8125rem; line-height: 1.3; }
.scenario-link-copy small { color: #60717d; font-size: .6875rem; line-height: 1.3; }
.timeline-detail { background: #eaf3fb; border-radius: 8px; }
.calendar-legend { display: flex; flex-wrap: wrap; gap: 8px; }
.calendar-legend span { border-left: 4px solid; padding-left: 5px; font-size: .75rem; }
.scenario-text { line-height: 1.65; }
.scenario-systems { color: #526673; font-size: .8125rem; line-height: 1.5; }
.calendar-guide, .scenario-reference { font-size: .875rem; line-height: 1.55; }
.scenario-reference > summary { color: #0061ab; font-weight: 600; }
.scenario-options :deep(.v-selection-control) { align-items: flex-start; min-height: 44px; }
.scenario-options :deep(.v-label) { white-space: normal; opacity: 1; padding: 9px 0; font-size: .875rem; }
.sequence-copy { display: flex; flex-direction: column; gap: 2px; }
.sequence-copy small { color: #60717d; }
.scenario-result { border-left: 3px solid #237953; padding-left: 12px; font-size: .875rem; line-height: 1.6; }
.scenario-result p + p { margin-top: 8px; }
.scenario-navigation .v-btn, .reference-links .v-btn { text-transform: none; letter-spacing: 0; }
.reference-links .v-btn { max-width: 100%; white-space: normal; height: auto; min-height: 36px; }
.system-timings { border-top: 1px solid #d3e0eb; padding-top: 16px; }
.system-timings > summary { font-size: 1rem; font-weight: 600; }
.abbreviation-list { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px 16px; margin: 0; padding: 0; list-style: none; font-size: .8125rem; }
.abbreviation-list strong { color: #003057; }
.scroll-target { scroll-margin-top: 80px; }
@media (max-width: 1050px) {
  .scenario-workspace { grid-template-columns: 1fr; }
  .scenario-picker { display: block; }
  .scenario-index { display: none; }
}
@media (max-width: 760px) { .abbreviation-list { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
summary { cursor: pointer; }
@media (max-width: 1050px) { .paired-calendars { grid-template-columns: 1fr; } }
</style>
