<script setup lang="ts">
import type { ContentBlock } from '../../data/types'
import MarkdownView from '../MarkdownView.vue'
import MermaidDiagram from '../MermaidDiagram.vue'
import FlowChain from './FlowChain.vue'
import InteractiveSteps from './InteractiveSteps.vue'
import SceneIllustration from './SceneIllustration.vue'

defineProps<{ blocks: ContentBlock[] }>()

const toneColor = (tone?: string): 'info' | 'success' | 'warning' | 'error' =>
  ({ success: 'success', warning: 'warning', error: 'error' }[tone ?? 'info'] ??
    'info') as 'info' | 'success' | 'warning' | 'error'
</script>

<template>
  <div>
    <template v-for="(b, i) in blocks" :key="i">
      <!-- HERO -->
      <div v-if="b.kind === 'hero'" v-reveal class="mb-6">
        <div
          class="rounded-xl pa-8 text-white"
          :style="`background: linear-gradient(120deg, #003057 0%, #0061ab 70%, ${b.color ?? '#0078d2'} 100%)`"
        >
          <div class="d-flex align-center ga-3 mb-2">
            <v-icon :icon="b.icon ?? 'mdi-airplane'" size="30" />
            <span class="text-overline">{{ b.title }}</span>
          </div>
          <div class="text-h5 font-weight-medium" style="max-width: 780px; line-height: 1.45">
            {{ b.text }}
          </div>
        </div>
      </div>

      <!-- SECTION HEADER -->
      <div v-else-if="b.kind === 'header'" v-reveal class="mt-8 mb-4">
        <div class="d-flex align-center ga-2">
          <v-icon :icon="b.icon ?? 'mdi-numeric' " :color="b.color ?? '#0061AB'" size="26" />
          <h2 class="text-h5 font-weight-bold" style="color: #003057">{{ b.title }}</h2>
        </div>
        <div class="mt-2" :style="`height: 4px; width: 64px; border-radius: 2px; background: ${b.color ?? '#0061AB'}`" />
        <p v-if="b.text" class="text-body-2 text-medium-emphasis mt-2 mb-0" style="max-width: 720px">
          {{ b.text }}
        </p>
      </div>

      <!-- PROSE -->
      <div v-else-if="b.kind === 'prose'" v-reveal class="mb-6">
        <div v-if="b.title" class="text-h6 font-weight-bold mb-2 d-flex align-center">
          <v-icon v-if="b.icon" :icon="b.icon" color="primary" class="mr-2" />
          {{ b.title }}
        </div>
        <MarkdownView :markdown="b.body ?? ''" />
      </div>

      <!-- CALLOUT -->
      <div v-else-if="b.kind === 'callout'" v-reveal class="mb-6">
        <v-alert
          :type="toneColor(b.tone)"
          :color="b.tone === 'primary' ? 'primary' : undefined"
          variant="tonal"
          density="comfortable"
          :icon="b.icon"
        >
          <div class="font-weight-bold">{{ b.title }}</div>
          <div class="text-body-2">{{ b.text }}</div>
        </v-alert>
      </div>

      <!-- DIAGRAM -->
      <div v-else-if="b.kind === 'diagram'" v-reveal class="mb-6">
        <MermaidDiagram :code="b.code ?? ''" :caption="b.caption" />
      </div>

      <!-- TERMS -->
      <div v-else-if="b.kind === 'terms'" v-reveal class="mb-6">
        <div v-if="b.title" class="text-h6 font-weight-bold mb-3 d-flex align-center">
          <v-icon icon="mdi-book-alphabet" color="secondary" class="mr-2" />
          {{ b.title }}
        </div>
        <div v-if="b.items?.some((item) => item.id)" class="text-caption text-medium-emphasis mb-3">
          <v-icon icon="mdi-cursor-default-click-outline" size="15" class="mr-1" />
          Select a linked key-term card to open its full definition in the Domain Dictionary.
        </div>
        <v-row dense>
          <v-col v-for="(t, j) in b.items" :key="j" cols="12" sm="6" md="4">
            <component
              :is="t.id ? 'router-link' : 'div'"
              :to="t.id ? { name: 'dictionary', query: { term: t.id } } : undefined"
              style="text-decoration: none; display: block; height: 100%"
            >
              <v-card
                height="100%"
                variant="tonal"
                color="primary"
                class="term-card"
                :append-icon="t.id ? 'mdi-arrow-top-right' : undefined"
              >
                <v-card-text class="pa-4">
                  <div class="d-flex align-center ga-2 mb-1">
                    <v-icon v-if="t.icon" :icon="t.icon" size="20" />
                    <span class="font-weight-bold text-subtitle-2">{{ t.term }}</span>
                  </div>
                  <div class="text-body-2">{{ t.definition }}</div>
                </v-card-text>
              </v-card>
            </component>
          </v-col>
        </v-row>
      </div>

      <!-- TABLE -->
      <div v-else-if="b.kind === 'table'" v-reveal class="mb-8">
        <div v-if="b.title" class="text-h6 font-weight-bold mb-3 d-flex align-center">
          <v-icon icon="mdi-table-large" color="secondary" class="mr-2" />
          {{ b.title }}
        </div>
        <div v-if="b.termIds?.some(Boolean)" class="text-caption text-medium-emphasis mb-3">
          <v-icon icon="mdi-cursor-default-click-outline" size="15" class="mr-1" />
          Select a linked term to open its full definition in the Domain Dictionary.
        </div>
        <v-card variant="outlined" class="overflow-hidden">
          <div class="table-scroll">
            <v-table density="comfortable" hover>
              <thead>
                <tr>
                  <th v-for="(column, j) in b.columns" :key="j" class="font-weight-bold text-primary">{{ column }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, j) in b.rows" :key="j">
                  <td v-for="(cell, k) in row" :key="k" :class="{ 'font-weight-medium': k === 0 }">
                    <router-link
                      v-if="k === 0 && b.termIds?.[j]"
                      :to="{ name: 'dictionary', query: { term: b.termIds[j] } }"
                      class="term-link"
                    >
                      {{ cell }}
                      <v-icon icon="mdi-arrow-top-right" size="14" class="ml-1" />
                    </router-link>
                    <template v-else>{{ cell }}</template>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </v-card>
      </div>

      <!-- FLOW -->
      <div v-else-if="b.kind === 'flow'" v-reveal class="mb-8">
        <div v-if="b.title" class="text-h6 font-weight-bold mb-3 d-flex align-center">
          <v-icon icon="mdi-transit-connection-variant" color="primary" class="mr-2" />
          {{ b.title }}
        </div>
        <FlowChain :nodes="b.items ?? []" :auto-label="b.text" />
      </div>

      <!-- STEPS -->
      <div v-else-if="b.kind === 'steps'" v-reveal class="mb-8">
        <div v-if="b.title" class="text-h6 font-weight-bold mb-3 d-flex align-center">
          <v-icon icon="mdi-shoe-print" color="primary" class="mr-2" />
          {{ b.title }}
        </div>
        <InteractiveSteps :items="b.items ?? []" />
      </div>

      <!-- COMPARE -->
      <div v-else-if="b.kind === 'compare'" v-reveal class="mb-8">
        <div v-if="b.title" class="text-h6 font-weight-bold mb-3">{{ b.title }}</div>
        <v-row>
          <v-col v-for="(side, j) in b.items" :key="j" cols="12" md="6">
            <v-card height="100%" variant="elevated" :style="`border-top: 5px solid ${side.color ?? '#0061AB'}`">
              <v-card-text class="pa-5">
                <div class="d-flex align-center ga-2 mb-3">
                  <v-icon :icon="side.icon ?? 'mdi-compare-horizontal'" :color="side.color ?? '#0061AB'" />
                  <span class="text-subtitle-1 font-weight-bold">{{ side.title }}</span>
                </div>
                <ul class="pl-5 ma-0">
                  <li v-for="(p, k) in side.points" :key="k" class="text-body-2 mb-2">{{ p }}</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- ILLUSTRATION -->
      <div v-else-if="b.kind === 'illustration'" v-reveal class="mb-8">
        <SceneIllustration :variant="b.variant ?? 'airport'" />
        <div v-if="b.caption" class="text-caption text-center text-medium-emphasis mt-2">
          {{ b.caption }}
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.term-card {
  transition: transform 0.2s ease;
  height: 100%;
}
.term-card:hover {
  transform: translateY(-2px);
}
.table-scroll {
  overflow-x: auto;
}
.table-scroll table {
  min-width: 680px;
}
.table-scroll th {
  background: rgba(var(--v-theme-primary), 0.06);
  white-space: nowrap;
}
.table-scroll td {
  line-height: 1.45;
  min-width: 150px;
}
.term-link {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
}
.term-link:hover {
  text-decoration: underline;
}
</style>
