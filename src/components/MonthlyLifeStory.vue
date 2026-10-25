<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { eventsForDay, monthSnapshot, monthlyPersonas } from '../data/monthlyStory'
import type { MonthEvent } from '../data/monthlyStory'

interface Reading {
  chapter: number
  choices: Record<string, string>
  finished: boolean
}
interface SavedMonth {
  persona: string
  readings: Record<string, Reading>
}

const storageKey = 'fada-month-story-v1'
const saveError = ref('')
const freshReading = (): Reading => ({ chapter: 0, choices: {}, finished: false })
const emptyMonth = (): SavedMonth => ({
  persona: 'maya', readings: { maya: freshReading(), jordan: freshReading() },
})

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isSavedMonth(value: unknown): value is SavedMonth {
  if (!isRecord(value) || !monthlyPersonas.some((item) => item.id === value.persona) || !isRecord(value.readings)) return false
  for (const person of monthlyPersonas) {
    const saved = value.readings[person.id]
    if (!isRecord(saved) || typeof saved.chapter !== 'number' || !Number.isInteger(saved.chapter) ||
      saved.chapter < 0 || saved.chapter >= person.chapters.length || typeof saved.finished !== 'boolean' || !isRecord(saved.choices)) return false
    if (saved.finished && saved.chapter !== person.chapters.length - 1) return false
    for (const [id, option] of Object.entries(saved.choices)) {
      if (!person.chapters.find((chapter) => chapter.id === id)?.choice?.options.some((item) => item.id === option)) return false
    }
    for (const chapter of person.chapters.slice(0, saved.chapter)) {
      if (chapter.choice && saved.choices[chapter.id] === undefined) return false
    }
  }
  return true
}

function load(): SavedMonth {
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return emptyMonth()
    const parsed: unknown = JSON.parse(raw)
    if (!isSavedMonth(parsed)) throw new Error('Saved monthly story has an invalid shape')
    return parsed
  } catch (error) {
    console.error('Unable to restore monthly story', error)
    saveError.value = 'Your saved month could not be restored. A fresh story is shown; choices still work here.'
    return emptyMonth()
  }
}

const saved = ref(load())
const persona = computed(() => monthlyPersonas.find((item) => item.id === saved.value.persona) ?? monthlyPersonas[0])
const reading = computed(() => saved.value.readings[persona.value.id])
const chapter = computed(() => persona.value.chapters[reading.value.chapter])
const snapshot = computed(() => monthSnapshot(persona.value, reading.value.chapter, reading.value.choices))
const previous = computed(() => monthSnapshot(persona.value, reading.value.chapter - 1, reading.value.choices))
const selectedDay = ref<number | null>(null)
const days = Array.from({ length: 31 }, (_, index) => index + 1)
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const activeOption = computed(() => chapter.value.choice?.options.find((item) =>
  item.id === reading.value.choices[chapter.value.id],
))
const branches = computed(() => (chapter.value.branches ?? []).filter((item) =>
  reading.value.choices[item.from] === item.option,
))
const canContinue = computed(() => !chapter.value.choice || Boolean(activeOption.value))
const atEnd = computed(() => reading.value.chapter === persona.value.chapters.length - 1)
const selectedEvents = computed(() => selectedDay.value === null ? [] : dayEvents(selectedDay.value))
const calendarStatus = computed(() => snapshot.value.published ? 'Awarded month, updated as the story unfolds' : 'Personal plans first. The work award has not arrived yet.')
const timelineContext = computed(() => chapter.value.day === undefined
  ? 'September flashback: building October. This calendar is next month’s plan, not September’s working schedule.'
  : 'Living October: its line was awarded in September. October’s monthly bidding and award cycle builds November, not October.')
const changedDays = computed(() => days.filter((day) =>
  JSON.stringify(eventsForDay(previous.value.events, day)) !== JSON.stringify(dayEvents(day)),
))

watch([() => saved.value.persona, () => reading.value.chapter], () => {
  selectedDay.value = chapter.value.day ?? null
}, { immediate: true })
watch(saved, persist, { deep: true })

function persist() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(saved.value))
    saveError.value = ''
  } catch (error) {
    console.error('Unable to save monthly story', error)
    saveError.value = 'Your month works here, but could not be saved on this device. Allow browser storage and retry.'
  }
}

function dayEvents(day: number) {
  return eventsForDay(snapshot.value.events, day)
}

function dayLabel(day: number) {
  const labels = dayEvents(day).map((item) => item.label)
  const empty = !snapshot.value.published ? 'Work not awarded' : persona.value.role === 'Lineholder' ? 'No sequence' : 'Off'
  return `October ${day}: ${labels.join(', ') || empty}`
}

function choose(id: string) {
  if (reading.value.choices[chapter.value.id] === id) return
  const allowedIds = new Set(persona.value.chapters.slice(0, reading.value.chapter + 1).map((item) => item.id))
  reading.value.choices = Object.fromEntries(Object.entries(reading.value.choices).filter(([key]) => allowedIds.has(key)))
  reading.value.choices[chapter.value.id] = id
  reading.value.finished = false
}

function next() {
  if (!canContinue.value) return
  if (atEnd.value) reading.value.finished = true
  else reading.value.chapter++
}

function back() {
  if (reading.value.chapter === 0) return
  reading.value.finished = false
  reading.value.chapter--
}

function restart() {
  saved.value.readings[persona.value.id] = freshReading()
  selectedDay.value = null
}

function eventClass(item: MonthEvent) {
  return `event-${item.kind}`
}
</script>

<template>
  <v-container class="monthly-life pa-4 pa-sm-8">
    <header class="mb-5">
      <div class="text-overline text-primary">A Day in the Life</div>
      <h1 class="text-h4 font-weight-bold mb-2">One month. Work, home, and everything between.</h1>
      <p class="text-body-1 text-medium-emphasis">Follow one person from next month’s plans to the last day. Make choices and watch their calendar change.</p>
    </header>

    <div class="persona-picker mb-5" role="group" aria-label="Whose month would you like to follow?">
      <button v-for="person in monthlyPersonas" :key="person.id" type="button" class="persona-button"
        :class="{ selected: saved.persona === person.id }" :aria-pressed="saved.persona === person.id"
        @click="saved.persona = person.id">
        <span class="persona-initial" aria-hidden="true">{{ person.name[0] }}</span>
        <span><strong>{{ person.name }} <small>{{ person.role }}</small></strong><span>{{ person.intro }}</span></span>
      </button>
    </div>

    <p class="timeline-context text-body-2 mb-5" aria-live="polite">{{ timelineContext }}</p>

    <div class="month-layout">
      <section class="month-calendar" aria-labelledby="month-heading">
        <div class="calendar-top">
          <div>
            <h2 id="month-heading" class="text-h5 font-weight-bold">{{ persona.name }}’s October</h2>
            <span class="text-caption text-medium-emphasis">2026 &middot; Work and personal plans together</span>
          </div>
          <v-icon icon="mdi-calendar-heart" color="primary" size="28" />
        </div>
        <p class="calendar-status text-caption" aria-live="polite">{{ calendarStatus }}</p>
        <div class="month-grid weekdays" aria-hidden="true">
          <span v-for="day in weekdays" :key="day">{{ day }}</span>
        </div>
        <div class="month-grid" role="group" aria-label="October 2026 calendar">
          <span v-for="blank in 4" :key="`blank-${blank}`" class="empty-day" aria-hidden="true" />
          <button v-for="day in days" :key="`${persona.id}-${day}`" type="button" class="month-day"
            :class="{ selected: selectedDay === day, today: chapter.day === day, changed: changedDays.includes(day) }"
            :aria-label="dayLabel(day)" :aria-pressed="selectedDay === day" :aria-current="chapter.day === day ? 'date' : undefined"
            @click="selectedDay = day">
            <span class="day-number">{{ day }}</span>
            <span v-for="item in dayEvents(day)" :key="item.id" class="calendar-event" :class="eventClass(item)">{{ item.label }}</span>
            <span v-if="!dayEvents(day).length && snapshot.published" class="day-off">Off</span>
          </button>
        </div>
        <div class="calendar-legend">
          <span class="event-flying">Flying</span><span class="event-reserve">Reserve</span>
          <span class="event-training">Training</span><span class="event-personal">Life</span><span class="event-request">Pending</span>
        </div>
        <div v-if="selectedDay !== null" class="day-details mt-3" aria-live="polite">
          <h3 class="text-subtitle-2 font-weight-bold mb-1">October {{ selectedDay }}</h3>
          <p v-if="!selectedEvents.length" class="text-body-2">{{ snapshot.published ? 'No duty or personal event shown for this date.' : 'The work award has not arrived. This blank date is not a confirmed day off.' }}</p>
          <p v-for="item in selectedEvents" :key="item.id" class="text-body-2 mb-2"><strong>{{ item.label }}:</strong> {{ item.detail }}</p>
        </div>
        <p class="text-caption text-medium-emphasis mt-3">Tap a date to look closer. Highlighted cells changed at this story moment.</p>
      </section>

      <section class="month-narrative" aria-label="Monthly story">
        <div class="text-caption text-medium-emphasis mb-2">{{ reading.chapter + 1 }} / {{ persona.chapters.length }} moments &middot; {{ persona.role }}</div>
        <v-progress-linear :model-value="(reading.chapter + 1) / persona.chapters.length * 100" color="primary" height="4" rounded class="mb-5" />
        <article class="chapter-card">
          <div :key="`${persona.id}-${chapter.id}`" aria-live="polite" aria-atomic="true">
            <div class="text-caption text-primary font-weight-bold mb-2">{{ chapter.date }}</div>
            <h2 class="text-h5 font-weight-bold mb-4">{{ chapter.title }}</h2>
            <p class="chapter-text">{{ chapter.text }}</p>
            <p v-if="chapter.timing" class="chapter-timing mt-3"><v-icon icon="mdi-clock-outline" size="15" class="mr-1" />{{ chapter.timing }}</p>
            <blockquote v-if="chapter.message" class="home-message my-4">
              <span class="text-caption font-weight-bold">{{ chapter.message.from }}</span>
              <p>“{{ chapter.message.text }}”</p>
            </blockquote>
            <p v-for="branch in branches" :key="branch.option" class="branch-text mt-4">{{ branch.text }}</p>
          </div>
          <fieldset v-if="chapter.choice" class="month-choice mt-5">
            <legend class="text-subtitle-2 font-weight-bold mb-3">{{ chapter.choice.prompt }}</legend>
            <button v-for="option in chapter.choice.options" :key="option.id" type="button" class="month-option"
              :class="{ selected: activeOption?.id === option.id }" :aria-pressed="activeOption?.id === option.id"
              @click="choose(option.id)">{{ option.label }}</button>
            <p v-if="activeOption" class="choice-response mt-3" role="status">{{ activeOption.reply }}</p>
          </fieldset>
          <div v-if="chapter.systems?.length" class="system-footnote mt-4">
            <span class="text-caption text-medium-emphasis">Behind this moment:</span>
            <router-link v-for="system in chapter.systems" :key="system.name" :to="`/learn/${system.lessonId}`">
              {{ system.name }} <v-icon icon="mdi-arrow-top-right" size="13" />
            </router-link>
          </div>
        </article>
        <div class="chapter-controls mt-4">
          <v-btn variant="text" :disabled="reading.chapter === 0" @click="back">Back</v-btn>
          <v-btn color="primary" :disabled="!canContinue" @click="next">{{ atEnd ? 'Finish the month' : 'Next moment' }}</v-btn>
        </div>
        <v-alert v-if="reading.finished" type="success" variant="tonal" class="mt-4" aria-live="polite">
          You’ve followed {{ persona.name }} through October. Try the other person’s month, or go back and see how a different choice changes the story.
        </v-alert>
        <p class="text-caption text-medium-emphasis mt-4">{{ persona.home }}</p>
      </section>
    </div>

    <v-alert v-if="saveError" type="warning" variant="tonal" class="mt-5" role="alert">
      {{ saveError }} <v-btn variant="text" @click="persist">Retry saving</v-btn>
    </v-alert>
    <div class="month-footer mt-6">
      <v-btn variant="text" size="small" @click="restart">Restart {{ persona.name }}’s month</v-btn>
      <router-link :to="{ name: 'life-scenarios', params: { id: 'stories' } }">Browse the shorter stories</router-link>
    </div>
    <details class="month-notes mt-4">
      <summary>About this story</summary>
      <p class="text-body-2 mt-3">This is a fictional, simplified month—not a live AA schedule, legal roster, pay calculator or award predictor.
        Choices select illustrative story branches; they do not predict whether a real request would succeed.
        Personal times, routes and outcomes are invented. The highlighted day is the story’s date, not today.
        Blank days before an award are not confirmed days off. Later trips and changes appear only when the story reaches them.</p>
      <p class="text-body-2 mt-2">System links open the existing academy lessons for processing windows and references.
        Use current official procedures for eligibility, duty, rest, training, contact and pay. Reserve blocks are simplified and do not depict every RAP.
        Story cutoffs and award times reference the 2024 CBA Section 10.C.8 (monthly bidding), Section 10.E-F (TTS/UBL),
        and Section 12 (reserve day-off trades and assignments). DFW time means the Dallas/Fort Worth clock; HBT means Home Base Time.
        Scene dates show when these fictional people act, not a separate final bidding round. Confirm current calendars and any agreed implementation changes.
        The academy references the 2024 CBA; public APFA links in the shorter stories require current verification.
        Your reading position and choices are saved on this device, separately for each person.</p>
    </details>
  </v-container>
</template>

<style scoped>
.monthly-life { max-width: 1220px; }
.timeline-context { padding: 12px 16px; border-left: 3px solid #0061ab; background: #edf5fc; color: #003057; border-radius: 0 8px 8px 0; }
.persona-picker { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.persona-button { display: flex; gap: 12px; align-items: center; padding: 16px; border: 1px solid #d3e0eb; border-radius: 12px; background: white; text-align: left; color: #003057; font: inherit; }
.persona-button.selected { border-color: #0061ab; background: #edf5fc; box-shadow: 0 0 0 1px #0061ab; }
.persona-initial { display: grid; place-items: center; flex: 0 0 40px; height: 40px; border-radius: 50%; background: #0061ab; color: white; font-weight: bold; }
.persona-button strong { display: block; }
.persona-button small { font-weight: normal; margin-left: 6px; }
.persona-button span span { display: block; font-size: .8rem; color: #526b7e; margin-top: 3px; }
.month-layout { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 28px; align-items: start; }
.month-calendar { background: white; padding: 20px; border: 1px solid #d3e0eb; border-radius: 14px; min-width: 0; }
.calendar-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.calendar-status { margin: 12px 0; min-height: 32px; color: #526b7e; }
.month-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 4px; }
.weekdays { text-align: center; font-size: .65rem; color: #526b7e; margin-bottom: 6px; }
.month-day { display: flex; flex-direction: column; gap: 3px; min-height: 84px; padding: 5px 3px; border: 1px solid #e0e7ef; border-radius: 6px; background: white; text-align: left; font: inherit; min-width: 0; }
.month-day.changed { background: #f1f8ff; border-color: #7cb0d7; }
.month-day.today .day-number { background: #0061ab; color: white; border-radius: 50%; }
.month-day.selected { outline: 2px solid #0061ab; outline-offset: -1px; }
.day-number { display: inline-grid; place-items: center; width: 21px; height: 21px; font-size: .7rem; color: #526b7e; }
.calendar-event { font-size: .57rem; line-height: 1.25; padding: 3px; border-radius: 3px; overflow-wrap: anywhere; }
.event-flying { background: #e1effc; color: #004b85; }
.event-reserve { background: #fff0df; color: #864100; }
.event-training { background: #eee7f8; color: #5a2d82; }
.event-personal { background: #e2f3ea; color: #135c3b; }
.event-request { background: #fff9dc; color: #6b5600; border: 1px dashed #b39535; }
.event-off { background: #f0f3f6; color: #526b7e; }
.day-off { color: #657a8b; font-size: .6rem; padding: 2px; }
.calendar-legend { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; font-size: .65rem; }
.calendar-legend span { padding: 3px 6px; border-radius: 3px; }
.day-details { padding: 12px; background: #f4f8fc; border-radius: 8px; }
.chapter-card { border: 1px solid #d3e0eb; border-radius: 14px; padding: 24px; background: white; }
.chapter-text, .branch-text { font-size: .95rem; line-height: 1.85; }
.chapter-timing { font-size: .78rem; line-height: 1.7; color: #526b7e; }
.home-message { padding: 12px 16px; border-left: 3px solid #48a680; background: #edf7f2; color: #245340; border-radius: 0 8px 8px 0; font-size: .9rem; }
.month-choice { border: 0; min-width: 0; }
.month-option { width: 100%; text-align: left; border: 1px solid #c8d9e8; background: white; border-radius: 8px; padding: 12px; margin-bottom: 8px; font: inherit; font-size: .85rem; color: #003057; }
.month-option.selected { background: #eaf4fc; border-color: #0061ab; }
.choice-response { padding: 12px; border-radius: 8px; font-size: .85rem; line-height: 1.7; background: #edf5fc; }
.system-footnote { display: flex; flex-wrap: wrap; gap: 6px 12px; align-items: center; }
.system-footnote a { font-size: .75rem; color: #0061ab; }
.chapter-controls, .month-footer { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; }
.month-footer a, summary { font-size: .8rem; color: #0061ab; }
summary { cursor: pointer; }
button:focus-visible, summary:focus-visible { outline: 3px solid #b75c09; outline-offset: 3px; }
@media (max-width: 1000px) { .month-layout { grid-template-columns: 1fr; } .month-narrative { grid-row: 1; } }
@media (max-width: 600px) { .persona-picker { grid-template-columns: 1fr; } .month-calendar { padding: 12px; } .month-day { min-height: 78px; } .calendar-event { font-size: .52rem; padding: 2px; } .chapter-card { padding: 18px; } }
</style>
