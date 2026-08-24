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
    text: '15 structured modules: overview, business process, system/data impact, developer view, quizzes.',
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
  {
    icon: 'mdi-code-braces',
    title: 'Developer Mode',
    text: 'Every core topic exposes Business / Systems / Data / Technical views.',
    to: '/learn/pbs',
    color: '#0B6A0B',
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
      class="hero rounded-xl pa-10 mb-8"
      elevation="3"
      style="background: linear-gradient(135deg, #003057 0%, #0061ab 60%, #0078d2 100%)"
    >
      <div class="text-white">
        <div class="text-overline mb-2">Flight Attendant Domain Academy</div>
        <h1 class="text-h3 font-weight-bold mb-3">Zero airline experience → domain-ready in days.</h1>
        <p class="text-body-1 mb-4" style="max-width: 720px; opacity: 0.92">
          An interactive platform for developers, analysts, QA and product owners to master the
          American Airlines Flight Attendant domain — PBS, TTS/UBL, ETB, Reserve (RAP/ROTA/ROTD),
          Seniority, Payroll and more — grounded in the 2024 CBA and Implementation LOAs.
        </p>
        <div class="d-flex flex-wrap ga-3">
          <v-btn size="large" color="white" variant="flat" to="/learn" prepend-icon="mdi-play-circle">
            Start learning
          </v-btn>
          <v-btn size="large" color="white" variant="outlined" to="/dictionary" prepend-icon="mdi-magnify">
            Browse the dictionary
          </v-btn>
        </div>
      </div>
    </v-sheet>

    <h2 class="text-h5 font-weight-bold mb-4">Explore the platform</h2>
    <v-row>
      <v-col v-for="f in features" :key="f.title" cols="12" sm="6" md="4">
        <v-card :to="f.to" hover height="100%">
          <v-card-text class="pa-6">
            <v-icon :icon="f.icon" :color="f.color" size="36" class="mb-3" />
            <div class="text-h6 font-weight-bold mb-1">{{ f.title }}</div>
            <p class="text-body-2 text-medium-emphasis mb-0">{{ f.text }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12" md="7">
        <v-card variant="tonal" color="primary">
          <v-card-text class="pa-6">
            <div class="text-h6 font-weight-bold mb-2">Success criteria</div>
            <ul class="pl-5 ma-0">
              <li>Understand Flight Attendant operations end-to-end</li>
              <li>Explain PBS, TTS, ETB, Reserve and Seniority confidently</li>
              <li>Navigate core workflows and their system touch-points</li>
              <li>Connect business concepts to system behavior</li>
              <li><strong>Become domain-ready within 3–5 days</strong></li>
            </ul>
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
