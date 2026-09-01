<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { moduleById, modules } from '../data/modules'
import { useKnowledgeStore } from '../stores/knowledge'
import { useProgressStore } from '../stores/progress'
import MarkdownView from '../components/MarkdownView.vue'
import QuizCard from '../components/QuizCard.vue'
import SourceTag from '../components/SourceTag.vue'
import BlockRenderer from '../components/blocks/BlockRenderer.vue'
import RuleFactsPanel from '../components/sources/RuleFactsPanel.vue'
import { ruleFactsForModule } from '../data/rules'
import type { DictionaryTerm, ModuleSection } from '../data/types'

const route = useRoute()
const knowledge = useKnowledgeStore()
const progress = useProgressStore()

const friendlyTitles: Record<string, string> = {
  overview: 'What is this?',
  why: 'Why it exists',
  process: 'How it works',
  system: 'Systems involved',
  data: 'Information behind it',
  examples: 'Real examples',
}

const mod = computed(() => moduleById(String(route.params.id)))
const sections = computed<ModuleSection[]>(() =>
  (mod.value?.sections ?? []).filter((s) => s.key !== 'developer'),
)
const blocks = computed(() => mod.value?.blocks ?? [])
const isInteractive = computed(() => blocks.value.length > 0)
const isRefactoredPage = computed(() => (mod.value?.number ?? 99) <= 12)
const sourceBackedFacts = computed(() =>
  mod.value ? ruleFactsForModule(mod.value.id) : [],
)
const nextModule = computed(() => {
  if (!mod.value) return undefined
  return modules.find((m) => m.number === mod.value!.number + 1)
})

function onQuizComplete(percent: number) {
  if (mod.value) progress.setQuizScore(mod.value.id, percent)
}

function relatedFor(id: string): DictionaryTerm[] {
  return knowledge.relatedTerms(id)
}
</script>

<template>
  <v-container v-if="mod" fluid class="pa-8" style="max-width: 1100px">
    <div class="d-flex align-center flex-wrap mb-4 ga-3">
      <v-avatar :color="mod.color" size="56">
        <v-icon :icon="mod.icon" color="white" size="30" />
      </v-avatar>
      <div class="flex-grow-1">
        <div class="text-caption text-medium-emphasis">Module {{ mod.number }} of {{ modules.length }} · ~{{ mod.estimatedMinutes }} min</div>
        <h1 class="text-h4 font-weight-bold">{{ mod.title }}</h1>
      </div>
      <v-chip v-if="!isRefactoredPage" variant="tonal" color="primary">{{ Math.round((progress.quizScores[mod.id] ?? 0)) }}% quiz best</v-chip>
    </div>

    <v-alert type="info" variant="tonal" density="compact" class="mb-6">
      {{ mod.tagline }}
    </v-alert>

    <!-- Interactive blocks (free-form modules) -->
    <template v-if="isInteractive">
      <BlockRenderer :blocks="blocks" />
      <div class="d-flex justify-end mb-8">
        <v-btn
          size="large"
          :color="progress.isSectionDone(mod.id, 'module') ? 'success' : 'primary'"
          :variant="progress.isSectionDone(mod.id, 'module') ? 'tonal' : 'flat'"
          :prepend-icon="progress.isSectionDone(mod.id, 'module') ? 'mdi-check-circle' : 'mdi-circle-outline'"
          @click="progress.toggleSection(mod.id, 'module')"
        >
          {{ progress.isSectionDone(mod.id, 'module') ? 'Module completed' : 'Mark module complete' }}
        </v-btn>
      </div>
    </template>

    <!-- Sections (classic modules) -->
    <template v-for="(section, idx) in sections" :key="section.key">
      <v-card class="mb-5" elevation="1">
        <v-toolbar density="comfortable" color="transparent">
          <v-toolbar-title class="text-subtitle-1 font-weight-bold">
            <span class="text-medium-emphasis mr-2">{{ idx + 1 }}.</span>{{ friendlyTitles[section.key] ?? section.title }}
          </v-toolbar-title>
          <template #append>
            <v-btn
              size="small"
              :variant="progress.isSectionDone(mod.id, section.key) ? 'tonal' : 'outlined'"
              :color="progress.isSectionDone(mod.id, section.key) ? 'success' : 'primary'"
              :prepend-icon="progress.isSectionDone(mod.id, section.key) ? 'mdi-check' : 'mdi-check-outline'"
              @click="progress.toggleSection(mod.id, section.key)"
            >
              {{ progress.isSectionDone(mod.id, section.key) ? 'Done' : 'Mark done' }}
            </v-btn>
          </template>
        </v-toolbar>
        <v-divider />
        <v-card-text class="pa-6 pt-4">
          <MarkdownView :markdown="section.body" />
        </v-card-text>
      </v-card>
    </template>

    <RuleFactsPanel v-if="!isRefactoredPage && sourceBackedFacts.length" :facts="sourceBackedFacts" />

    <!-- Related dictionary terms -->
    <v-card v-if="!isRefactoredPage && mod.terms.length" class="mb-5" variant="outlined">
      <v-card-text class="pa-6">
        <div class="text-subtitle-1 font-weight-bold mb-2">Key terms in this module</div>
        <div class="d-flex flex-wrap ga-2">
          <router-link
            v-for="t in mod.terms"
            :key="t"
            :to="{ name: 'dictionary', query: { term: t } }"
            style="text-decoration: none"
          >
            <v-chip variant="tonal" color="secondary" label>{{ knowledge.termById(t)?.term ?? t }}</v-chip>
          </router-link>
        </div>
      </v-card-text>
    </v-card>

    <!-- Quiz -->
    <QuizCard v-if="!isRefactoredPage && mod.quiz.length" :module-id="mod.id" :questions="mod.quiz" @completed="onQuizComplete" />

    <!-- Sources footer for the module -->
    <div v-if="!isRefactoredPage" class="mt-6 d-flex flex-wrap align-center ga-2">
      <span class="text-caption text-medium-emphasis">Primary sources:</span>
      <SourceTag
        v-for="t in mod.terms.map((id) => knowledge.termById(id)?.source).filter(Boolean).slice(0, 4)"
        :key="(t as any).reference ?? (t as any).label"
        :source="(t as DictionaryTerm['source'])!"
      />
    </div>

    <div class="mt-8 d-flex justify-space-between align-center">
      <v-btn to="/learn" variant="text" prepend-icon="mdi-arrow-left">All modules</v-btn>
      <v-btn v-if="nextModule" :to="`/learn/${nextModule.id}`" color="primary" append-icon="mdi-arrow-right">
        Next: {{ nextModule.title }}
      </v-btn>
    </div>
  </v-container>

  <v-container v-else class="pa-8">
    <v-empty-state icon="mdi-file-question" title="Module not found" />
  </v-container>
</template>
