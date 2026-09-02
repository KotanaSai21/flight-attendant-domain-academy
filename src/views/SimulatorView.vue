<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { scenarios } from '../data/scenarios'
import { dictionary } from '../data/dictionary'
import SourceTag from '../components/SourceTag.vue'

const selectedId = ref<string>(scenarios[0].id)
const activeStep = ref(0)
const selectedDecision = ref<number | null>(null)
const decisionSubmitted = ref(false)
const completedIds = ref<string[]>([])

const activeScenario = computed(() => scenarios.find((scenario) => scenario.id === selectedId.value) ?? scenarios[0])
const progress = computed(() => {
  const total = activeScenario.value.steps.length + 1
  return Math.round(((activeStep.value + (decisionSubmitted.value ? 1 : 0)) / total) * 100)
})
const decisionIsCorrect = computed(() => selectedDecision.value === activeScenario.value.decision?.answerIndex)

watch(selectedId, () => {
  activeStep.value = 0
  selectedDecision.value = null
  decisionSubmitted.value = false
})

function termLabel(id: string) {
  const term = dictionary.find((item) => item.id === id)
  return term?.shortName ?? term?.term ?? id
}

function submitDecision() {
  if (selectedDecision.value === null || decisionSubmitted.value) return
  decisionSubmitted.value = true
  if (decisionIsCorrect.value && !completedIds.value.includes(activeScenario.value.id)) {
    completedIds.value = [...completedIds.value, activeScenario.value.id]
  }
}

function nextScenario() {
  const current = scenarios.findIndex((scenario) => scenario.id === selectedId.value)
  selectedId.value = scenarios[(current + 1) % scenarios.length].id
}
</script>

<template>
  <v-container fluid class="simulator-page pa-4 pa-sm-8">
    <div class="d-flex flex-column flex-md-row justify-space-between align-md-end ga-4 mb-7">
      <div>
        <div class="text-overline text-primary font-weight-bold">Decide · observe · trace</div>
        <h1 class="text-h4 font-weight-bold mb-2">Scenario Simulator</h1>
        <p class="text-body-1 text-medium-emphasis mb-0">Take control of an operational journey, inspect each system handoff, and make the key decision.</p>
      </div>
      <v-card color="success" variant="tonal" min-width="220">
        <v-card-text class="py-3">
          <div class="text-caption">Scenarios mastered</div>
          <div class="text-h5 font-weight-bold">{{ completedIds.length }} / {{ scenarios.length }}</div>
        </v-card-text>
      </v-card>
    </div>

    <v-row>
      <v-col cols="12" md="4" lg="3">
        <v-card variant="outlined" class="scenario-menu">
          <v-list color="primary" density="comfortable" nav aria-label="Choose a scenario">
            <v-list-subheader>OPERATIONAL JOURNEYS</v-list-subheader>
            <v-list-item v-for="scenario in scenarios" :key="scenario.id" :value="scenario.id" :title="scenario.title" :subtitle="scenario.audience" :active="scenario.id === selectedId" rounded="lg" @click="selectedId = scenario.id">
              <template #prepend><v-avatar :color="completedIds.includes(scenario.id) ? 'success' : 'primary'" variant="tonal" size="36"><v-icon :icon="completedIds.includes(scenario.id) ? 'mdi-check' : scenario.icon" size="19" /></v-avatar></template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="8" lg="9">
        <v-card class="scenario-stage" elevation="0">
          <v-progress-linear :model-value="progress" color="primary" height="7" />
          <v-card-text class="pa-5 pa-md-6">
            <div class="d-flex flex-column flex-sm-row align-sm-start ga-4 mb-6">
              <v-avatar color="primary" size="56"><v-icon :icon="activeScenario.icon" color="white" size="28" /></v-avatar>
              <div class="flex-grow-1">
                <div class="text-caption text-medium-emphasis">{{ activeScenario.audience }}</div>
                <h2 class="text-h5 font-weight-bold">{{ activeScenario.title }}</h2>
                <p class="text-body-1 mb-0">{{ activeScenario.prompt }}</p>
              </div>
              <SourceTag :source="activeScenario.source" />
            </div>

            <div class="handoff-strip mb-5" role="navigation" aria-label="Scenario steps">
              <button v-for="(step, index) in activeScenario.steps" :key="step.title" type="button" class="handoff-step" :class="{ active: index === activeStep, visited: index < activeStep }" :aria-current="index === activeStep ? 'step' : undefined" @click="activeStep = index">
                <span>{{ index < activeStep ? '✓' : index + 1 }}</span>
                <small>{{ step.title }}</small>
              </button>
            </div>

            <transition name="scenario-fade" mode="out-in">
              <v-card :key="`${activeScenario.id}-${activeStep}`" color="primary" variant="tonal" class="active-handoff mb-5">
                <v-card-text class="pa-5">
                  <div class="text-overline">Handoff {{ activeStep + 1 }} of {{ activeScenario.steps.length }}</div>
                  <div class="text-h6 font-weight-bold mb-2">{{ activeScenario.steps[activeStep].title }}</div>
                  <div class="text-body-1">{{ activeScenario.steps[activeStep].detail }}</div>
                </v-card-text>
              </v-card>
            </transition>

            <div class="d-flex justify-space-between ga-3 mb-7">
              <v-btn variant="text" prepend-icon="mdi-arrow-left" :disabled="activeStep === 0" @click="activeStep--">Previous handoff</v-btn>
              <v-btn color="primary" append-icon="mdi-arrow-right" :disabled="activeStep === activeScenario.steps.length - 1" @click="activeStep++">Next handoff</v-btn>
            </div>

            <v-divider class="mb-6" />
            <section v-if="activeScenario.decision" aria-labelledby="decision-heading">
              <div class="text-overline text-secondary font-weight-bold">Decision checkpoint</div>
              <h3 id="decision-heading" class="text-h6 font-weight-bold mb-4">{{ activeScenario.decision.prompt }}</h3>
              <div class="decision-grid" role="radiogroup" aria-labelledby="decision-heading">
                <button v-for="(option, index) in activeScenario.decision.options" :key="option.label" type="button" class="decision-option" :class="{ selected: selectedDecision === index, correct: decisionSubmitted && index === activeScenario.decision.answerIndex, incorrect: decisionSubmitted && selectedDecision === index && index !== activeScenario.decision.answerIndex }" role="radio" :aria-checked="selectedDecision === index" :disabled="decisionSubmitted" @click="selectedDecision = index">
                  <span class="decision-letter">{{ String.fromCharCode(65 + index) }}</span>
                  <span><strong>{{ option.label }}</strong><small>{{ option.detail }}</small></span>
                </button>
              </div>

              <v-expand-transition>
                <v-alert v-if="decisionSubmitted" :color="decisionIsCorrect ? 'success' : 'warning'" variant="tonal" :icon="decisionIsCorrect ? 'mdi-check-decagram' : 'mdi-lightbulb-on-outline'" class="mt-4" aria-live="polite">
                  <strong>{{ decisionIsCorrect ? 'Correct decision.' : 'Review the highlighted answer.' }}</strong> {{ activeScenario.decision.explanation }}
                </v-alert>
              </v-expand-transition>

              <div class="d-flex justify-end mt-4">
                <v-btn v-if="!decisionSubmitted" color="secondary" :disabled="selectedDecision === null" @click="submitDecision">Commit decision</v-btn>
                <v-btn v-else color="primary" append-icon="mdi-arrow-right" @click="nextScenario">Next scenario</v-btn>
              </div>
            </section>
          </v-card-text>
        </v-card>

        <v-alert type="success" variant="tonal" icon="mdi-flag-checkered" class="mt-5"><strong>Target outcome:</strong> {{ activeScenario.outcome }}</v-alert>
        <div class="d-flex flex-wrap ga-2 mt-4 align-center">
          <span class="text-caption font-weight-bold text-primary">TRACE THE CONCEPTS:</span>
          <router-link v-for="termId in activeScenario.relatedTerms" :key="termId" :to="{ name: 'dictionary', query: { term: termId } }" style="text-decoration: none"><v-chip size="small" variant="outlined" color="secondary" label>{{ termLabel(termId) }}</v-chip></router-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.simulator-page { max-width: 1300px; }
.scenario-menu { position: sticky; top: 82px; }
.scenario-stage { border: 1px solid #cbdde9; overflow: hidden; }
.handoff-strip { display: flex; overflow-x: auto; padding: 3px 2px 10px; }
.handoff-step { position: relative; display: flex; flex: 1 0 110px; flex-direction: column; align-items: flex-start; gap: 7px; padding: 0 8px; color: #607587; text-align: left; background: transparent; border: 0; cursor: pointer; }
.handoff-step::after { content: ''; position: absolute; left: 36px; right: -8px; top: 15px; height: 2px; background: #d7e2ea; }
.handoff-step:last-child::after { display: none; }
.handoff-step > span { position: relative; z-index: 1; display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; background: white; border: 2px solid #b8c9d5; font-size: .75rem; font-weight: 800; }
.handoff-step small { max-width: 120px; line-height: 1.25; }
.handoff-step.active > span { color: white; background: #0061ab; border-color: #0061ab; box-shadow: 0 0 0 4px #dbeefa; }
.handoff-step.visited > span { color: white; background: #177245; border-color: #177245; }
.handoff-step.visited::after { background: #80bd9c; }
.handoff-step:focus-visible, .decision-option:focus-visible { outline: 3px solid #70a8d2; outline-offset: 3px; }
.decision-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.decision-option { display: flex; align-items: flex-start; gap: 11px; min-height: 104px; padding: 14px; color: #243b53; text-align: left; background: white; border: 2px solid #d5e1e9; border-radius: 10px; cursor: pointer; }
.decision-option.selected { border-color: #5a2d82; background: #f7f1fb; }
.decision-option.correct { border-color: #177245; background: #ecf8f1; }
.decision-option.incorrect { border-color: #c24132; background: #fff1ef; }
.decision-letter { display: grid; place-items: center; flex: 0 0 28px; width: 28px; height: 28px; color: white; background: #5a2d82; border-radius: 50%; font-weight: 800; }
.decision-option > span:last-child { display: flex; flex-direction: column; gap: 4px; }
.decision-option small { color: #617586; line-height: 1.35; }
.scenario-fade-enter-active, .scenario-fade-leave-active { transition: opacity .2s ease, transform .2s ease; }
.scenario-fade-enter-from { opacity: 0; transform: translateX(16px); }
.scenario-fade-leave-to { opacity: 0; transform: translateX(-16px); }
@media (max-width: 960px) { .scenario-menu { position: static; } }
@media (max-width: 700px) { .decision-grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .scenario-fade-enter-active, .scenario-fade-leave-active { transition: none; } }
</style>
