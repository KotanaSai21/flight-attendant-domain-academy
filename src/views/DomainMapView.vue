<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import DomainMap from '../components/DomainMap.vue'
import SourceTag from '../components/SourceTag.vue'
import { modules } from '../data/modules'
import { dictionary } from '../data/dictionary'
import type { AcademyModule, DictionaryTerm } from '../data/types'

const pathways = [
  {
    id: 'all',
    title: 'Explore everything',
    icon: 'mdi-hub-outline',
    description: 'See the whole domain and select any blue concept node.',
    nodes: [] as string[],
    steps: [] as Array<{ label: string; termId?: string }>,
  },
  {
    id: 'monthly',
    title: 'Build and change a line',
    icon: 'mdi-calendar-sync',
    description: 'Follow a Lineholder schedule from monthly award through trading and payroll.',
    nodes: ['fa', 'scheduling', 'pbs', 'lineholder', 'tts', 'etb', 'payroll', 'credit'],
    steps: [
      { label: 'PBS award', termId: 'pbs' },
      { label: 'Lineholder line', termId: 'lineholder' },
      { label: 'TTS / ETB change', termId: 'tts' },
      { label: 'Credited result', termId: 'credited-hours' },
    ],
  },
  {
    id: 'reserve',
    title: 'Cover a disruption',
    icon: 'mdi-weather-lightning',
    description: 'Trace availability, day-of Reserve processing, standby, and the resulting credit.',
    nodes: ['fa', 'reserve', 'rap', 'rotd', 'standby', 'payroll', 'credit'],
    steps: [
      { label: 'RAP availability', termId: 'rap' },
      { label: 'ROTD processing', termId: 'rotd' },
      { label: 'Standby / assignment', termId: 'standby' },
      { label: 'Pay and credit', termId: 'credited-hours' },
    ],
  },
  {
    id: 'change',
    title: 'Apply an operational change',
    icon: 'mdi-source-branch',
    description: 'See how an effective-dated workforce change reaches scheduling, Reserve, and payroll.',
    nodes: ['fa', 'crewmgmt', 'transfer', 'scheduling', 'reserve', 'payroll'],
    steps: [
      { label: 'Transfer awarded', termId: 'vacancy-transfer' },
      { label: 'Base becomes effective', termId: 'crew-base' },
      { label: 'Eligibility recalculated', termId: 'availability' },
      { label: 'Downstream records settle', termId: 'credited-hours' },
    ],
  },
]

const selected = ref<DictionaryTerm | null>(null)
const selectedPathId = ref('all')
const panel = ref<HTMLElement | null>(null)
const selectedPath = computed(() => pathways.find((path) => path.id === selectedPathId.value) ?? pathways[0])

const relatedModules = computed<AcademyModule[]>(() => {
  if (!selected.value) return []
  return modules.filter((module) => module.terms.includes(selected.value?.id ?? '')).slice(0, 3)
})

const relatedTerms = computed(() => {
  if (!selected.value) return []
  return selected.value.related.map((id) => dictionary.find((term) => term.id === id)).filter((term): term is DictionaryTerm => Boolean(term)).slice(0, 5)
})

async function onSelect(term: DictionaryTerm | null) {
  if (!term) return
  selected.value = term
  await nextTick()
  panel.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}

function choosePath(pathId: string) {
  selectedPathId.value = pathId
  selected.value = null
}
</script>

<template>
  <v-container fluid class="map-page pa-4 pa-sm-8">
    <div class="text-overline text-primary font-weight-bold">Follow a pathway or explore freely</div>
    <h1 class="text-h4 font-weight-bold mb-2">Interactive Domain Map</h1>
    <p class="text-body-1 text-medium-emphasis mb-6">The domain is a chain of decisions and records. Choose a pathway to highlight one journey, then select a concept for its definition and learning links.</p>

    <div class="pathway-grid mb-5" role="navigation" aria-label="Choose a domain pathway">
      <button v-for="path in pathways" :key="path.id" type="button" class="pathway-button" :class="{ active: selectedPathId === path.id }" :aria-pressed="selectedPathId === path.id" @click="choosePath(path.id)">
        <v-icon :icon="path.icon" size="24" />
        <span><strong>{{ path.title }}</strong><small>{{ path.description }}</small></span>
      </button>
    </div>

    <v-card v-if="selectedPath.steps.length" color="primary" variant="tonal" class="mb-4">
      <v-card-text class="d-flex flex-column flex-md-row align-md-center ga-3">
        <div class="font-weight-bold mr-md-2">{{ selectedPath.title }}</div>
        <div class="path-steps">
          <template v-for="(step, index) in selectedPath.steps" :key="step.label">
            <router-link :to="{ name: 'dictionary', query: { term: step.termId } }" class="path-step">{{ index + 1 }}. {{ step.label }}</router-link>
            <v-icon v-if="index < selectedPath.steps.length - 1" icon="mdi-chevron-right" size="18" />
          </template>
        </div>
      </v-card-text>
    </v-card>

    <DomainMap :highlighted-ids="selectedPath.nodes" @select="onSelect" />

    <v-card v-if="selected" ref="panel" class="concept-panel mt-6" elevation="0">
      <v-card-text class="pa-5 pa-md-6">
        <div class="d-flex flex-column flex-sm-row justify-space-between align-sm-start ga-3 mb-4">
          <div>
            <div class="text-caption text-medium-emphasis">{{ selected.category }}</div>
            <h2 class="text-h5 font-weight-bold">{{ selected.term }}</h2>
          </div>
          <div class="d-flex align-center flex-wrap ga-2">
            <SourceTag :source="selected.source" />
            <v-btn :to="{ name: 'dictionary', query: { term: selected.id } }" size="small" variant="outlined" append-icon="mdi-open-in-new">Full entry</v-btn>
          </div>
        </div>
        <p class="text-body-1 mb-4">{{ selected.definition }}</p>
        <v-row>
          <v-col cols="12" md="6">
            <div class="insight-box">
              <div class="text-caption font-weight-bold text-primary mb-1">OPERATIONAL EXAMPLE</div>
              <div class="text-body-2">{{ selected.example }}</div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="insight-box">
              <div class="text-caption font-weight-bold text-primary mb-1">WHY SYSTEMS CARE</div>
              <div class="text-body-2">{{ selected.developerRelevance }}</div>
            </div>
          </v-col>
        </v-row>

        <div v-if="relatedTerms.length" class="d-flex flex-wrap align-center ga-2 mt-4">
          <span class="text-caption font-weight-bold text-primary">CONNECTED CONCEPTS:</span>
          <v-chip v-for="term in relatedTerms" :key="term.id" size="small" variant="outlined" color="primary" @click="onSelect(term)">{{ term.shortName ?? term.term }}</v-chip>
        </div>

        <div v-if="relatedModules.length" class="mt-5">
          <div class="text-caption text-medium-emphasis mb-2">Continue in the learning path</div>
          <v-row dense>
            <v-col v-for="module in relatedModules" :key="module.id" cols="12" sm="6" md="4">
              <v-card :to="{ name: 'module', params: { id: module.id } }" variant="tonal" color="primary" height="100%">
                <v-card-text class="pa-3"><div class="d-flex align-center ga-2 mb-1"><v-icon :icon="module.icon" size="18" /><span class="font-weight-bold text-subtitle-2">Module {{ modules.findIndex((item) => item.id === module.id) + 1 }}</span></div><div class="text-subtitle-2">{{ module.title }}</div></v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>

    <v-card v-else class="mt-6 pa-6 text-center" variant="tonal"><v-icon icon="mdi-cursor-default-click-outline" color="primary" class="mr-2" /><span class="text-body-2">Select a blue concept node to inspect its operational example, connected concepts, and learning modules.</span></v-card>
  </v-container>
</template>

<style scoped>
.map-page { max-width: 1300px; }
.pathway-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.pathway-button { display: flex; align-items: flex-start; gap: 12px; min-height: 104px; padding: 16px; color: #324b60; text-align: left; background: white; border: 2px solid #d6e2ea; border-radius: 12px; cursor: pointer; }
.pathway-button span { display: flex; flex-direction: column; gap: 5px; }
.pathway-button small { color: #65798a; line-height: 1.35; }
.pathway-button.active { color: #0061ab; border-color: #0061ab; background: #eef7fd; box-shadow: 0 0 0 3px rgba(0, 97, 171, .1); }
.pathway-button:focus-visible { outline: 3px solid #70a8d2; outline-offset: 3px; }
.path-steps { display: flex; align-items: center; flex-wrap: wrap; gap: 5px; }
.path-step { color: #003057; font-size: .82rem; font-weight: 700; text-decoration: none; }
.path-step:hover { text-decoration: underline; }
.concept-panel { border: 1px solid #bfd8ea; background: linear-gradient(135deg, #f4f9fd 0%, #fff 60%); }
.insight-box { height: 100%; padding: 14px; border-radius: 8px; background: white; border: 1px solid #dbe6ee; }
@media (max-width: 960px) { .pathway-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .pathway-grid { grid-template-columns: 1fr; } }
</style>
