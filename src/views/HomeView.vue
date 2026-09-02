<script setup lang="ts">
import { modules } from '../data/modules'
import { dictionary } from '../data/dictionary'
import { scenarios } from '../data/scenarios'
import { useProgressStore } from '../stores/progress'

const progress = useProgressStore()

const features = [
  {
    icon: 'mdi-school-outline',
    title: 'Learning Center',
    text: `${modules.length} structured modules with plain-domain explanations, flow diagrams, timelines and real examples.`,
    to: '/learn',
    color: '#0061AB',
  },
  {
    icon: 'mdi-book-open-variant',
    title: 'Domain Dictionary',
    text: `${dictionary.length} contract-grounded terms with developer relevance and cross-links.`,
    to: '/dictionary',
    color: '#0078D2',
  },
  {
    icon: 'mdi-timeline-clock-outline',
    title: 'Bidding Academy',
    text: 'Interactive bid-cycle timeline with contract references at every step.',
    to: '/bidding',
    color: '#003057',
  },
  {
    icon: 'mdi-play-circle-outline',
    title: 'Scenario Simulator',
    text: `${scenarios.length} end-to-end journeys: first schedule, cancelled trip, reserve call-out…`,
    to: '/simulator',
    color: '#C01933',
  },
  {
    icon: 'mdi-hub-outline',
    title: 'Interactive Domain Map',
    text: 'Clickable knowledge graph connecting scheduling, reserve, payroll, seniority and more.',
    to: '/map',
    color: '#5A2D82',
  },
]

const audience = [
  'Software Developers',
  'Business Analysts',
  'QA Engineers',
  'Product Owners',
  'New Team Members',
]
</script>

<template>
  <v-container fluid class="pa-8">
    <v-sheet
      class="hero rounded-xl pa-10 mb-10"
      elevation="4"
      style="background: linear-gradient(135deg, #003057 0%, #0061ab 55%, #0078d2 100%)"
    >
      <div class="text-white">
        <v-chip color="white" variant="outlined" size="small" class="mb-4" prepend-icon="mdi-airplane">
          FLIGHT ATTENDANT DOMAIN ACADEMY
        </v-chip>
        <h1 class="text-h3 font-weight-bold mb-3" style="letter-spacing: -0.5px">
          A guided introduction to the Flight Attendant domain.
        </h1>
        <p class="text-body-1 mb-6" style="max-width: 720px; opacity: 0.92">
          An interactive platform for developers, analysts, QA and product owners to explore the
          American Airlines Flight Attendant domain — PBS, TTS/UBL, ETB, Reserve (RAP/ROTA/ROTD),
          Seniority, Payroll and more — grounded in the 2024 CBA and Implementation LOAs.
        </p>
        <div class="d-flex flex-wrap ga-3">
          <v-btn size="large" color="white" variant="flat" to="/learn" prepend-icon="mdi-play-circle">
            Start learning
          </v-btn>
          <v-btn
            size="large"
            color="white"
            variant="outlined"
            to="/dictionary"
            prepend-icon="mdi-magnify"
          >
            Browse the dictionary
          </v-btn>
        </div>
      </div>
    </v-sheet>

    <h2 class="text-h5 font-weight-bold mb-5">Explore the platform</h2>
    <v-row>
      <v-col v-for="(f, i) in features" :key="f.title" cols="12" sm="6" md="4">
        <div v-reveal="i * 70">
          <v-card :to="f.to" hover height="100%" class="feature-card d-flex flex-column overflow-hidden">
            <div :style="{ background: f.color }" class="accent-bar" />
            <v-card-text class="pa-6 pt-5 flex-grow-1">
              <v-icon :icon="f.icon" :color="f.color" size="34" class="mb-3" />
              <div class="text-h6 font-weight-bold mb-1">{{ f.title }}</div>
              <p class="text-body-2 text-medium-emphasis mb-0">{{ f.text }}</p>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12" md="7">
        <v-card variant="tonal" color="primary">
          <v-card-text class="pa-6">
            <div class="text-h6 font-weight-bold mb-3 d-flex align-center">
              <v-icon icon="mdi-flag-checkered" color="primary" class="mr-2" />
              Success criteria
            </div>
            <v-list density="compact" class="py-0 bg-transparent">
              <v-list-item
                v-for="item in [
                  'Understand Flight Attendant operations end-to-end',
                  'Explain PBS, TTS, ETB, Reserve and Seniority confidently',
                  'Navigate core workflows and their system touch-points',
                  'Connect business concepts to system behavior',
                ]"
                :key="item"
                class="px-0 min-height-0"
              >
                <template #prepend>
                  <v-icon icon="mdi-check-circle" size="18" color="success" class="mr-2" />
                </template>
                <span class="text-body-2">{{ item }}</span>
              </v-list-item>
            </v-list>
            <v-alert
              density="comfortable"
              type="info"
              variant="tonal"
              icon="mdi-timer-sand"
              class="mt-4 mb-0"
            >
              Follow the guided path at your own pace and build confidence with the core concepts and workflows.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card>
          <v-card-text class="pa-6">
            <div class="text-subtitle-1 font-weight-bold mb-2">Built for</div>
            <v-chip v-for="a in audience" :key="a" size="small" class="ma-1" variant="tonal" color="secondary">
              {{ a }}
            </v-chip>
            <v-divider class="my-4" />
            <div class="text-caption text-medium-emphasis">
              Quiz completion so far: {{ Object.keys(progress.quizScores).length }} module(s) scored ·
              Overall readiness ≈ {{ progress.overallProgress }}%
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.accent-bar {
  height: 4px;
  width: 100%;
}
.min-height-0 {
  min-height: 0 !important;
}
.feature-card :deep(.v-card-text) {
  padding-top: 20px;
}
</style>
