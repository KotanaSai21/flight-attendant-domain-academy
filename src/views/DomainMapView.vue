<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import DomainMap from '../components/DomainMap.vue'
import SourceTag from '../components/SourceTag.vue'
import { modules } from '../data/modules'
import type { AcademyModule, DictionaryTerm } from '../data/types'

const selected = ref<DictionaryTerm | null>(null)
const panel = ref<HTMLElement | null>(null)

const relatedModules = computed<AcademyModule[]>(() => {
  if (!selected.value) return []
  return modules.filter((m) => m.terms.includes(selected.value?.id ?? '')).slice(0, 3)
})

async function onSelect(term: DictionaryTerm | null) {
  selected.value = term
  if (term) {
    await nextTick()
    panel.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
}
</script>

<template>
  <v-container fluid class="pa-8" style="max-width: 1300px">
    <h1 class="text-h4 font-weight-bold mb-2">Interactive Domain Map</h1>
    <p class="text-body-1 text-medium-emphasis mb-6">
      Click any node to jump to its dictionary entry (red nodes are domains, blue are systems/concepts).
    </p>

    <v-row>
      <v-col cols="12">
        <DomainMap @select="onSelect" />
      </v-col>
    </v-row>

    <v-card v-if="selected" ref="panel" class="mt-6" elevation="3">
      <v-toolbar density="compact" color="grey-lighten-4">
        <v-toolbar-title class="font-weight-bold">{{ selected.term }}</v-toolbar-title>
        <template #append>
          <SourceTag :source="selected.source" />
          <router-link :to="{ name: 'dictionary', query: { term: selected.id } }" class="ml-2 mr-2">
            <v-btn size="small" variant="text" append-icon="mdi-open-in-new">Full entry</v-btn>
          </router-link>
        </template>
      </v-toolbar>
      <v-card-text>
        <p class="mb-2">{{ selected.definition }}</p>
        <p class="text-body-2 text-medium-emphasis mb-3"><strong>In practice:</strong> {{ selected.developerRelevance }}</p>

        <div v-if="relatedModules.length" class="mt-2">
          <div class="text-caption text-medium-emphasis mb-2">Learn more in the learning center</div>
          <v-row dense>
            <v-col v-for="m in relatedModules" :key="m.id" cols="12" sm="6" md="4">
              <router-link :to="{ name: 'module', params: { id: m.id } }" style="text-decoration: none">
                <v-card variant="tonal" color="primary" height="100%">
                  <v-card-text class="pa-3">
                    <div class="d-flex align-center ga-2 mb-1">
                      <v-icon :icon="m.icon" size="18" color="primary" />
                      <span class="font-weight-bold text-subtitle-2">Module {{ m.number }}</span>
                    </div>
                    <div class="text-subtitle-2">{{ m.title }}</div>
                  </v-card-text>
                </v-card>
              </router-link>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>

    <v-card v-else class="mt-6 pa-6 text-center" variant="tonal">
      <span class="text-body-2">Select a node above to inspect definitions, workflows and related systems.</span>
    </v-card>
  </v-container>
</template>
