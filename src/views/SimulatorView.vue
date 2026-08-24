<script setup lang="ts">
import { ref } from 'vue'
import { scenarios } from '../data/scenarios'
import SourceTag from '../components/SourceTag.vue'

const selectedId = ref<string>(scenarios[0].id)
</script>

<template>
  <v-container fluid class="pa-8" style="max-width: 1200px">
    <h1 class="text-h4 font-weight-bold mb-2">Scenario Simulator</h1>
    <p class="text-body-1 text-medium-emphasis mb-8">
      Walk step-by-step through real business situations. Each journey cites its contractual basis.
    </p>

    <v-row>
      <v-col cols="12" md="4">
        <v-list color="primary" density="comfortable" nav>
          <v-list-item
            v-for="s in scenarios"
            :key="s.id"
            :value="s.id"
            :title="s.title"
            :subtitle="s.audience"
            :active="s.id === selectedId"
            @click="selectedId = s.id"
          >
            <template #prepend>
              <v-icon :icon="s.icon" />
            </template>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" md="8">
        <template v-for="s in scenarios" :key="s.id">
          <div v-if="s.id === selectedId">
            <v-card variant="tonal" color="primary" class="mb-5">
              <v-card-text class="pa-5 d-flex align-center ga-3">
                <v-icon :icon="s.icon" size="32" />
                <div class="flex-grow-1">
                  <div class="text-h6 font-weight-bold">{{ s.title }}</div>
                  <div class="text-body-2">{{ s.prompt }}</div>
                </div>
                <SourceTag :source="s.source" />
              </v-card-text>
            </v-card>

            <v-timeline side="end" align="start" density="compact" truncate-line="both" class="ml-n2">
              <v-timeline-item
                v-for="(step, i) in s.steps"
                :key="i"
                dot-color="primary"
                size="small"
              >
                <v-card elevation="1">
                  <v-card-text class="py-3">
                    <div class="text-subtitle-1 font-weight-bold mb-1">{{ i + 1 }}. {{ step.title }}</div>
                    <div class="text-body-2 text-medium-emphasis">{{ step.detail }}</div>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>

            <v-alert type="success" variant="tonal" icon="mdi-flag-checkered" class="mt-5">
              <strong>Outcome:</strong> {{ s.outcome }}
            </v-alert>

            <div class="d-flex flex-wrap ga-2 mt-4 align-center">
              <span class="text-caption font-weight-bold text-primary">RELATED TERMS:</span>
              <router-link
                v-for="r in s.relatedTerms"
                :key="r"
                :to="{ name: 'dictionary', query: { term: r } }"
                style="text-decoration: none"
              >
                <v-chip size="small" variant="outlined" color="secondary" label>{{ r }}</v-chip>
              </router-link>
            </div>
          </div>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
