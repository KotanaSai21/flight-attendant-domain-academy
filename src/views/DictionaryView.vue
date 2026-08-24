<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { dictionary } from '../data/dictionary'
import SourceTag from '../components/SourceTag.vue'
import type { DictionaryTerm } from '../data/types'

const route = useRoute()
const router = useRouter()
const search = ref('')
const selectedId = ref<string | null>(null)

const categories = computed(() => [...new Set(dictionary.map((t) => t.category))].sort())
const activeCategory = ref<string | null>(null)

const filtered = computed<DictionaryTerm[]>(() => {
  let list = dictionary
  if (activeCategory.value) list = list.filter((t) => t.category === activeCategory.value)
  const q = search.value.trim().toLowerCase()
  if (!q) return list
  return list.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      (t.shortName ?? '').toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q),
  )
})

function jumpToTerm(id: string | null) {
  selectedId.value = id
  if (id) {
    setTimeout(() => {
      document.getElementById(`term-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 50)
  }
}

// deep-link support: /dictionary?term=rap
if (typeof route.query.term === 'string') jumpToTerm(route.query.term)
</script>

<template>
  <v-container fluid class="pa-8" style="max-width: 1300px">
    <div class="d-flex align-center flex-wrap ga-4 mb-6">
      <div class="flex-grow-1">
        <h1 class="text-h4 font-weight-bold mb-1">Interactive Domain Dictionary</h1>
        <p class="text-body-2 text-medium-emphasis mb-0">
          {{ dictionary.length }} terms · every entry shows business purpose, developer relevance and sources.
        </p>
      </div>
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        placeholder="Filter terms…"
        density="compact"
        variant="solo-filled"
        hide-details
        clearable
        style="max-width: 320px"
        @keyup.enter="filtered.length ? jumpToTerm(filtered[0].id) : null"
      />
    </div>

    <div class="d-flex flex-wrap ga-2 mb-6">
      <v-chip
        :color="!activeCategory ? 'primary' : 'default'"
        :variant="!activeCategory ? 'flat' : 'outlined'"
        size="small"
        @click="activeCategory = null"
      >
        All
      </v-chip>
      <v-chip
        v-for="c in categories"
        :key="c"
        size="small"
        :color="activeCategory === c ? 'primary' : 'default'"
        :variant="activeCategory === c ? 'flat' : 'outlined'"
        @click="activeCategory = activeCategory === c ? null : c"
      >
        {{ c }}
      </v-chip>
    </div>

    <v-row>
      <v-col v-for="t in filtered" :id="`term-${t.id}`" :key="t.id" cols="12" lg="6">
        <v-card height="100%" variant="elevated">
          <v-toolbar density="compact" color="grey-lighten-4">
            <v-toolbar-title class="font-weight-bold text-subtitle-1">
              {{ t.term }}
              <v-chip v-if="t.shortName" size="x-small" color="secondary" class="ml-2">{{ t.shortName }}</v-chip>
            </v-toolbar-title>
            <template #append>
              <SourceTag :source="t.source" />
            </template>
          </v-toolbar>
          <v-card-text class="pa-5">
            <p class="mb-3">{{ t.definition }}</p>

            <div class="text-caption font-weight-bold text-primary">BUSINESS PURPOSE</div>
            <p class="text-body-2 mb-2">{{ t.businessPurpose }}</p>

            <div class="text-caption font-weight-bold text-primary">WHY IT MATTERS</div>
            <p class="text-body-2 mb-2">{{ t.whyItMatters }}</p>

            <div class="d-flex flex-wrap align-center ga-1 mb-2">
              <span class="text-caption font-weight-bold text-primary mr-1">USED IN:</span>
              <v-chip v-for="u in t.whereUsed" :key="u" size="x-small" variant="tonal">{{ u }}</v-chip>
            </div>

            <v-alert density="compact" variant="tonal" color="info" icon="mdi-lightbulb-on-outline" class="mb-3">
              <span class="text-body-2"><strong>Example:</strong> {{ t.example }}</span>
            </v-alert>

            <div class="d-flex flex-wrap align-center ga-1">
              <span class="text-caption font-weight-bold text-primary mr-1">RELATED:</span>
              <v-chip
                v-for="r in t.related"
                :key="r"
                size="x-small"
                color="primary"
                variant="outlined"
                link
                @click="router.push({ name: 'dictionary', query: { term: r } }); jumpToTerm(r)"
              >
                {{ dictionary.find((d) => d.id === r)?.term ?? r }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
