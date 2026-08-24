<script setup lang="ts">
import { ref } from 'vue'
import DomainMap from '../components/DomainMap.vue'
import SourceTag from '../components/SourceTag.vue'
import type { DictionaryTerm } from '../data/types'

const selected = ref<DictionaryTerm | null>(null)
</script>

<template>
  <v-container fluid class="pa-8" style="max-width: 1300px">
    <h1 class="text-h4 font-weight-bold mb-2">Interactive Domain Map</h1>
    <p class="text-body-1 text-medium-emphasis mb-6">
      Click any node to jump to its dictionary entry (red nodes are domains, blue are systems/concepts).
    </p>

    <v-row>
      <v-col cols="12">
        <DomainMap @select="selected = $event" />
      </v-col>
    </v-row>

    <v-card v-if="selected" class="mt-6" elevation="3">
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
        <p class="text-body-2 text-medium-emphasis mb-0"><strong>Systems:</strong> {{ selected.developerRelevance }}</p>
      </v-card-text>
    </v-card>

    <v-card v-else class="mt-6 pa-6 text-center" variant="tonal">
      <span class="text-body-2">Select a node above to inspect definitions, workflows and related systems.</span>
    </v-card>
  </v-container>
</template>
