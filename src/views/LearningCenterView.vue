<script setup lang="ts">
import { computed } from 'vue'
import { modules } from '../data/modules'
import { useProgressStore } from '../stores/progress'

const progress = useProgressStore()
const modulePercent = (moduleId: string, sectionCount: number) => progress.moduleProgress(moduleId, sectionCount)
const completedCount = computed(() => modules.filter((m) => modulePercent(m.id, (m.sections?.length ?? 0) + 1) === 100).length)
const nextModule = computed(() => modules.find((m) => modulePercent(m.id, (m.sections?.length ?? 0) + 1) < 100) ?? modules[0])
const overallPercent = computed(() => modules.length ? Math.round((completedCount.value / modules.length) * 100) : 0)

function phaseFor(position: number) {
  if (position <= 3) return 'Foundation'
  if (position <= 8) return 'Build the monthly schedule'
  if (position <= 12) return 'Change and operate the schedule'
  return 'Disruption, pay, and recovery'
}
function isPhaseStart(index: number) {
  return index === 0 || phaseFor(index) !== phaseFor(index + 1)
}
</script>

<template>
  <v-container fluid class="learning-journey pa-4 pa-sm-8">
    <div class="journey-heading mb-6">
      <div>
        <div class="text-overline text-primary font-weight-bold">Guided learning path</div>
        <h1 class="text-h4 font-weight-bold mb-2">Learn the operation in order</h1>
        <p class="text-body-1 text-medium-emphasis mb-0">Each lesson builds on the one before it—from airline basics to monthly bidding, daily schedule changes, Reserve, and pay.</p>
      </div>
      <v-card class="progress-summary" color="primary" variant="tonal">
        <v-card-text>
          <div class="d-flex justify-space-between align-center mb-2">
            <span class="text-subtitle-2 font-weight-bold">Your progress</span>
            <span class="text-h6 font-weight-bold">{{ overallPercent }}%</span>
          </div>
          <v-progress-linear :model-value="overallPercent" color="primary" height="8" rounded />
          <div class="text-caption mt-2">{{ completedCount }} of {{ modules.length }} modules completed</div>
        </v-card-text>
      </v-card>
    </div>

    <v-card class="continue-card mb-8" elevation="0">
      <v-card-text class="d-flex flex-column flex-sm-row align-sm-center ga-4 pa-5">
        <v-avatar :color="nextModule.color" size="52"><v-icon :icon="nextModule.icon" color="white" /></v-avatar>
        <div class="flex-grow-1">
          <div class="text-overline font-weight-bold text-primary">{{ completedCount ? 'Continue where you left off' : 'Start here' }}</div>
          <div class="text-h6 font-weight-bold">{{ modules.findIndex((m) => m.id === nextModule.id) + 1 }}. {{ nextModule.title }}</div>
          <div class="text-body-2 text-medium-emphasis">{{ nextModule.tagline }}</div>
        </div>
        <v-btn :to="`/learn/${nextModule.id}`" color="primary" size="large" append-icon="mdi-arrow-right">{{ completedCount ? 'Continue' : 'Begin course' }}</v-btn>
      </v-card-text>
    </v-card>

    <div class="journey-list" aria-label="Course modules in recommended order">
      <template v-for="(module, index) in modules" :key="module.id">
        <div v-if="isPhaseStart(index)" class="phase-label"><span>{{ phaseFor(index + 1) }}</span></div>
        <article class="journey-item">
          <div class="journey-marker" :class="{ complete: modulePercent(module.id, (module.sections?.length ?? 0) + 1) === 100 }" :style="{ '--module-color': module.color }">
            <v-icon :icon="modulePercent(module.id, (module.sections?.length ?? 0) + 1) === 100 ? 'mdi-check' : module.icon" size="20" />
          </div>
          <v-card :to="`/learn/${module.id}`" hover variant="outlined" class="journey-module flex-grow-1">
            <v-card-text class="d-flex flex-column flex-sm-row align-sm-center ga-3 pa-4 pa-sm-5">
              <div class="module-number">{{ String(index + 1).padStart(2, '0') }}</div>
              <div class="flex-grow-1">
                <div class="d-flex align-center flex-wrap ga-2 mb-1">
                  <h2 class="text-h6 font-weight-bold">{{ module.title }}</h2>
                  <v-chip v-if="modulePercent(module.id, (module.sections?.length ?? 0) + 1) === 100" color="success" size="x-small" variant="tonal">Complete</v-chip>
                </div>
                <p class="text-body-2 text-medium-emphasis mb-2">{{ module.tagline }}</p>
                <div class="d-flex align-center ga-3">
                  <span class="text-caption">~{{ module.estimatedMinutes }} min</span>
                  <v-progress-linear :model-value="modulePercent(module.id, (module.sections?.length ?? 0) + 1)" :color="module.color" height="5" rounded style="max-width: 160px" />
                </div>
              </div>
              <v-icon icon="mdi-chevron-right" color="primary" />
            </v-card-text>
          </v-card>
        </article>
      </template>
    </div>

    <v-alert color="secondary" variant="tonal" icon="mdi-compass-outline" class="mt-8">Need a topic quickly? The Dictionary and Bidding Academy remain available as reference tools, but this path is the recommended learning order.</v-alert>
  </v-container>
</template>

<style scoped>
.learning-journey { max-width: 980px; }
.journey-heading { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 28px; align-items: end; }
.progress-summary { border: 1px solid rgba(0, 97, 171, 0.18); }
.continue-card { border: 1px solid #c9dff0; background: linear-gradient(120deg, #f1f7fc 0%, #fff 72%); }
.journey-list { position: relative; }
.journey-list::before { content: ''; position: absolute; left: 23px; top: 46px; bottom: 18px; width: 2px; background: #d9e4ee; }
.phase-label { position: relative; z-index: 1; margin: 22px 0 12px 58px; }
.phase-label span { display: inline-block; padding: 5px 10px; border-radius: 999px; background: #eaf3fb; color: #003057; font-size: .72rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; }
.journey-item { position: relative; display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
.journey-marker { position: relative; z-index: 2; display: grid; place-items: center; flex: 0 0 48px; width: 48px; height: 48px; border: 3px solid white; border-radius: 50%; background: var(--module-color); color: white; box-shadow: 0 0 0 2px #d9e4ee; }
.journey-marker.complete { background: #177245; box-shadow: 0 0 0 2px #9fd3b8; }
.journey-module { border-color: #dbe5ee; transition: transform .18s ease, border-color .18s ease; }
.journey-module:hover { transform: translateX(3px); border-color: #7fb1d6; }
.module-number { color: #8aa0b2; font-size: 1.35rem; font-weight: 800; min-width: 38px; }
@media (max-width: 700px) {
  .journey-heading { grid-template-columns: 1fr; }
  .progress-summary { width: 100%; }
  .journey-list::before { left: 19px; }
  .journey-marker { flex-basis: 40px; width: 40px; height: 40px; }
  .phase-label { margin-left: 50px; }
  .module-number { display: none; }
}
@media (prefers-reduced-motion: reduce) { .journey-module { transition: none; } }
</style>
