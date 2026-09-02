<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { dictionary } from '../data/dictionary'
import SourceTag from '../components/SourceTag.vue'
import type { DictionaryTerm } from '../data/types'

interface PracticeExample {
  question: string
  story: string
  options: string[]
  answerId: string
  explanation: string
}

const practiceExamples: PracticeExample[] = [
  {
    question: 'Which system should Maya use?',
    story: 'Maya already has her monthly award. She sees a coworker post a desirable trip and wants the schedules to update immediately—not after a processing run.',
    options: ['pbs', 'tts', 'etb'],
    answerId: 'etb',
    explanation: 'ETB is the real-time path. PBS creates the monthly award, while TTS waits for scheduled processing.',
  },
  {
    question: 'What is active right now?',
    story: 'Jordan is a Reserve. It is 04:30 HBT, the published availability window began at 04:00, and Crew Scheduling may contact Jordan for an assignment.',
    options: ['rap', 'rota', 'line-of-time'],
    answerId: 'rap',
    explanation: 'A RAP is the time window when a Reserve is available and contactable. ROTA is an assignment process, not the availability window itself.',
  },
  {
    question: 'Which object contains the others?',
    story: 'A three-day trip has two working days. Each working day contains multiple flights between cities.',
    options: ['flight-segment', 'duty-period', 'sequence'],
    answerId: 'sequence',
    explanation: 'The sequence is the full trip. It contains duty periods, and each duty period contains flight segments or legs.',
  },
  {
    question: 'Which concept explains the extra money?',
    story: 'A red-flag trip pays a premium, but only the base trip hours count toward the Flight Attendant’s monthly credited total.',
    options: ['credited-hours', 'pay-no-credit', 'credit-window'],
    answerId: 'pay-no-credit',
    explanation: 'Pay No Credit separates additional pay from hours that count toward monthly credit totals.',
  },
  {
    question: 'Which clock should the rule use?',
    story: 'A BOS-based Reserve is temporarily in another time zone. The contract deadline is expressed using the time reference attached to the crew base.',
    options: ['utc', 'hbt', 'block-time'],
    answerId: 'hbt',
    explanation: 'Home Base Time keeps deadlines and Reserve windows anchored to the Flight Attendant’s crew base.',
  },
  {
    question: 'Where does this flying belong?',
    story: 'A sequence is no longer assigned after a cancellation and must be available to scheduling and trading processes for coverage.',
    options: ['open-time', 'line-of-time', 'standby'],
    answerId: 'open-time',
    explanation: 'Open Time is the pool of known, unassigned flying consumed by coverage and trading processes.',
  },
]

const route = useRoute()
const router = useRouter()
const search = ref('')
const selectedId = ref<string | null>(null)
const activeCategory = ref<string | null>(null)
const openDetails = ref<string[]>([])
const exampleIndex = ref(0)
const chosenAnswer = ref<string | null>(null)
const answerSubmitted = ref(false)
const practiceScore = ref(0)

const categories = computed(() => [...new Set(dictionary.map((t) => t.category))].sort())
const currentExample = computed(() => practiceExamples[exampleIndex.value])
const selectedIsCorrect = computed(() => chosenAnswer.value === currentExample.value.answerId)
const answeredCount = computed(() => exampleIndex.value + (answerSubmitted.value ? 1 : 0))

const filtered = computed<DictionaryTerm[]>(() => {
  let list = dictionary
  if (activeCategory.value) list = list.filter((t) => t.category === activeCategory.value)
  const q = search.value.trim().toLowerCase()
  if (!q) return list
  return list.filter((t) =>
    [t.term, t.shortName, t.definition, t.businessPurpose, t.example, ...t.whereUsed]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(q)),
  )
})

function termFor(id: string) {
  return dictionary.find((term) => term.id === id)
}

async function jumpToTerm(id: string | null) {
  selectedId.value = id
  if (!id) return
  openDetails.value = [...new Set([...openDetails.value, id])]
  await router.replace({ name: 'dictionary', query: { term: id } })
  await nextTick()
  document.getElementById(`term-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function toggleDetails(id: string) {
  openDetails.value = openDetails.value.includes(id)
    ? openDetails.value.filter((openId) => openId !== id)
    : [...openDetails.value, id]
}

function submitAnswer() {
  if (!chosenAnswer.value || answerSubmitted.value) return
  answerSubmitted.value = true
  if (selectedIsCorrect.value) practiceScore.value += 1
}

function nextExample() {
  exampleIndex.value = (exampleIndex.value + 1) % practiceExamples.length
  chosenAnswer.value = null
  answerSubmitted.value = false
  if (exampleIndex.value === 0) practiceScore.value = 0
}

function resetFilters() {
  search.value = ''
  activeCategory.value = null
}

watch(
  () => route.query.term,
  (term) => {
    if (typeof term === 'string' && term !== selectedId.value) {
      selectedId.value = term
      openDetails.value = [...new Set([...openDetails.value, term])]
      nextTick(() => document.getElementById(`term-${term}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
    }
  },
  { immediate: true },
)
</script>

<template>
  <v-container fluid class="dictionary-page pa-4 pa-sm-8">
    <div class="dictionary-heading mb-6">
      <div>
        <div class="text-overline text-primary font-weight-bold">Search · practice · connect</div>
        <h1 class="text-h4 font-weight-bold mb-1">Interactive Domain Dictionary</h1>
        <p class="text-body-2 text-medium-emphasis mb-0">{{ dictionary.length }} source-backed terms with operational examples and related concepts.</p>
      </div>
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search a term or situation…"
        density="comfortable"
        variant="solo-filled"
        hide-details
        clearable
        aria-label="Search dictionary terms and examples"
        @keyup.enter="filtered.length ? jumpToTerm(filtered[0].id) : null"
      />
    </div>

    <v-card class="practice-lab mb-7" elevation="0">
      <v-card-text class="pa-5 pa-md-6">
        <div class="d-flex justify-space-between align-start ga-4 mb-4">
          <div>
            <div class="text-overline font-weight-bold text-primary">Practice lab</div>
            <h2 class="text-h5 font-weight-bold">{{ currentExample.question }}</h2>
          </div>
          <v-chip color="primary" variant="tonal">{{ exampleIndex + 1 }} / {{ practiceExamples.length }}</v-chip>
        </div>

        <div class="scenario-prompt mb-5">
          <v-icon icon="mdi-account-voice" color="secondary" size="28" />
          <p class="mb-0">{{ currentExample.story }}</p>
        </div>

        <div class="answer-grid" role="radiogroup" :aria-label="currentExample.question">
          <button
            v-for="optionId in currentExample.options"
            :key="optionId"
            type="button"
            class="answer-option"
            :class="{
              selected: chosenAnswer === optionId,
              correct: answerSubmitted && optionId === currentExample.answerId,
              incorrect: answerSubmitted && chosenAnswer === optionId && optionId !== currentExample.answerId,
            }"
            role="radio"
            :aria-checked="chosenAnswer === optionId"
            :disabled="answerSubmitted"
            @click="chosenAnswer = optionId"
          >
            <v-icon :icon="termFor(optionId)?.shortName ? 'mdi-tag-text-outline' : 'mdi-book-open-page-variant-outline'" />
            <span><strong>{{ termFor(optionId)?.shortName ?? termFor(optionId)?.term }}</strong><small v-if="termFor(optionId)?.shortName">{{ termFor(optionId)?.term }}</small></span>
          </button>
        </div>

        <v-expand-transition>
          <v-alert v-if="answerSubmitted" :color="selectedIsCorrect ? 'success' : 'warning'" variant="tonal" :icon="selectedIsCorrect ? 'mdi-check-circle-outline' : 'mdi-lightbulb-on-outline'" class="mt-4" aria-live="polite">
            <strong>{{ selectedIsCorrect ? 'That’s right.' : `The best answer is ${termFor(currentExample.answerId)?.shortName ?? termFor(currentExample.answerId)?.term}.` }}</strong>
            {{ currentExample.explanation }}
            <div class="mt-2"><v-btn size="small" variant="text" append-icon="mdi-arrow-down" @click="jumpToTerm(currentExample.answerId)">Explore this term</v-btn></div>
          </v-alert>
        </v-expand-transition>

        <div class="d-flex justify-space-between align-center mt-5">
          <div class="text-caption text-medium-emphasis">Score: {{ practiceScore }} / {{ answeredCount }}</div>
          <v-btn v-if="!answerSubmitted" color="primary" :disabled="!chosenAnswer" @click="submitAnswer">Check answer</v-btn>
          <v-btn v-else color="primary" append-icon="mdi-arrow-right" @click="nextExample">{{ exampleIndex === practiceExamples.length - 1 ? 'Restart practice' : 'Next example' }}</v-btn>
        </div>
      </v-card-text>
    </v-card>

    <div class="d-flex flex-wrap ga-2 mb-5" aria-label="Filter dictionary by category">
      <v-chip :color="!activeCategory ? 'primary' : 'default'" :variant="!activeCategory ? 'flat' : 'outlined'" size="small" @click="activeCategory = null">All</v-chip>
      <v-chip v-for="category in categories" :key="category" size="small" :color="activeCategory === category ? 'primary' : 'default'" :variant="activeCategory === category ? 'flat' : 'outlined'" @click="activeCategory = activeCategory === category ? null : category">{{ category }}</v-chip>
    </div>

    <div class="d-flex justify-space-between align-center mb-3">
      <h2 class="text-h6 font-weight-bold">{{ filtered.length }} {{ filtered.length === 1 ? 'term' : 'terms' }}</h2>
      <v-btn v-if="search || activeCategory" variant="text" size="small" prepend-icon="mdi-filter-remove-outline" @click="resetFilters">Clear filters</v-btn>
    </div>

    <v-alert v-if="!filtered.length" type="info" variant="tonal" icon="mdi-magnify-close" class="mb-6">
      No terms match this search. Try an acronym, operational situation, or another category.
    </v-alert>

    <v-row>
      <v-col v-for="term in filtered" :id="`term-${term.id}`" :key="term.id" cols="12" lg="6">
        <v-card height="100%" variant="outlined" class="term-card" :class="{ highlighted: selectedId === term.id }">
          <v-card-text class="pa-5">
            <div class="d-flex align-start justify-space-between ga-3 mb-3">
              <div>
                <div class="text-caption text-medium-emphasis mb-1">{{ term.category }}</div>
                <h3 class="text-h6 font-weight-bold">
                  {{ term.term }}
                  <v-chip v-if="term.shortName" size="x-small" color="secondary" class="ml-1">{{ term.shortName }}</v-chip>
                </h3>
              </div>
              <SourceTag :source="term.source" />
            </div>

            <p class="mb-4">{{ term.definition }}</p>
            <div class="example-box mb-3">
              <div class="text-caption font-weight-bold text-primary mb-1"><v-icon icon="mdi-lightbulb-on-outline" size="16" class="mr-1" />IN PRACTICE</div>
              <p class="text-body-2 mb-0">{{ term.example }}</p>
            </div>

            <v-expand-transition>
              <div v-if="openDetails.includes(term.id)" class="term-details">
                <v-divider class="mb-4" />
                <div class="text-caption font-weight-bold text-primary">BUSINESS PURPOSE</div>
                <p class="text-body-2 mb-3">{{ term.businessPurpose }}</p>
                <div class="text-caption font-weight-bold text-primary">WHY IT MATTERS</div>
                <p class="text-body-2 mb-3">{{ term.whyItMatters }}</p>
                <div class="text-caption font-weight-bold text-primary">SYSTEM / DATA VIEW</div>
                <p class="text-body-2 mb-3">{{ term.developerRelevance }}</p>
                <div class="d-flex flex-wrap align-center ga-1 mb-3">
                  <span class="text-caption font-weight-bold text-primary mr-1">USED IN:</span>
                  <v-chip v-for="usage in term.whereUsed" :key="usage" size="x-small" variant="tonal">{{ usage }}</v-chip>
                </div>
                <div v-if="term.related.length" class="d-flex flex-wrap align-center ga-1">
                  <span class="text-caption font-weight-bold text-primary mr-1">RELATED:</span>
                  <v-chip v-for="relatedId in term.related" :key="relatedId" size="x-small" color="primary" variant="outlined" link @click="jumpToTerm(relatedId)">{{ termFor(relatedId)?.term ?? relatedId }}</v-chip>
                </div>
              </div>
            </v-expand-transition>

            <v-btn block variant="text" size="small" :append-icon="openDetails.includes(term.id) ? 'mdi-chevron-up' : 'mdi-chevron-down'" :aria-expanded="openDetails.includes(term.id)" @click="toggleDetails(term.id)">{{ openDetails.includes(term.id) ? 'Show less' : 'Purpose, systems & related terms' }}</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.dictionary-page { max-width: 1300px; }
.dictionary-heading { display: grid; grid-template-columns: minmax(0, 1fr) minmax(280px, 390px); gap: 28px; align-items: end; }
.practice-lab { border: 1px solid #bfd8ea; background: linear-gradient(135deg, #edf6fc 0%, #fff 68%); }
.scenario-prompt { display: flex; align-items: flex-start; gap: 14px; padding: 16px; border-left: 4px solid #5a2d82; border-radius: 8px; background: rgba(255, 255, 255, .78); font-size: 1.02rem; line-height: 1.55; }
.answer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.answer-option { display: flex; align-items: center; gap: 11px; min-height: 70px; padding: 12px 14px; color: #243b53; text-align: left; background: white; border: 2px solid #d5e1e9; border-radius: 10px; cursor: pointer; transition: border-color .16s ease, background .16s ease, transform .16s ease; }
.answer-option:hover:not(:disabled) { border-color: #6aa4cf; transform: translateY(-1px); }
.answer-option.selected { border-color: #0061ab; background: #eef7fd; }
.answer-option.correct { border-color: #177245; background: #ecf8f1; }
.answer-option.incorrect { border-color: #c24132; background: #fff1ef; }
.answer-option:focus-visible { outline: 3px solid #70a8d2; outline-offset: 3px; }
.answer-option span { display: flex; flex-direction: column; }
.answer-option small { margin-top: 2px; color: #617586; }
.example-box { padding: 13px 14px; border-radius: 8px; background: #f2f8fc; }
.term-card { border-color: #d7e2ea; transition: border-color .18s ease, box-shadow .18s ease; }
.term-card.highlighted { border-color: #0061ab; box-shadow: 0 0 0 3px rgba(0, 97, 171, .12); }
.term-details { padding-top: 2px; }
@media (max-width: 800px) {
  .dictionary-heading { grid-template-columns: 1fr; gap: 18px; }
  .answer-grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) { .answer-option, .term-card { transition: none; } }
</style>
