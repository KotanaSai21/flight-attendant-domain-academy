<script setup lang="ts">
import { modules } from '../data/modules'
import { useProgressStore } from '../stores/progress'

const progress = useProgressStore()
</script>

<template>
  <v-container fluid class="pa-8">
    <h1 class="text-h4 font-weight-bold mb-2">Learning Center</h1>
    <p class="text-body-1 text-medium-emphasis mb-6">
      Work through the modules in order. The curriculum focuses on clear explanations, timelines, terminology, and connected operational scenarios; progress is saved locally.
    </p>

    <v-row>
      <v-col v-for="m in modules" :key="m.id" cols="12" md="6" lg="4">
        <v-card :to="`/learn/${m.id}`" hover height="100%" class="d-flex flex-column">
          <div class="pa-5 pb-0 d-flex align-center">
            <v-avatar :color="m.color" size="44" class="mr-3">
              <v-icon :icon="m.icon" color="white" />
            </v-avatar>
            <div>
              <div class="text-caption text-medium-emphasis">Module {{ m.number }} · ~{{ m.estimatedMinutes }} min</div>
              <div class="text-h6 font-weight-bold">{{ m.title }}</div>
            </div>
          </div>
          <v-card-text class="flex-grow-1">
            {{ m.tagline }}
          </v-card-text>
          <v-card-actions class="px-5 pb-4">
            <v-progress-linear
              :model-value="progress.moduleProgress(m.id, (m.sections?.length ?? 0) + 1)"
              color="primary"
              height="6"
              rounded
              class="flex-grow-1 mr-3"
            />
            <span class="text-caption">{{ progress.moduleProgress(m.id, (m.sections?.length ?? 0) + 1) }}%</span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
