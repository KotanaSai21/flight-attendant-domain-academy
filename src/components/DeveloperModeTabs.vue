<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  view: {
    business: string
    systems: string[]
    inputs: string[]
    outputs: string[]
    technical: string
  }
}>()

const tabs = [
  { icon: 'mdi-briefcase-outline', label: 'Business' },
  { icon: 'mdi-server-outline', label: 'Systems & I/O' },
  { icon: 'mdi-code-braces', label: 'Technical' },
]
const tab = ref(0)
</script>

<template>
  <v-card variant="outlined">
    <v-tabs v-model="tab" density="comfortable" color="primary">
      <v-tab v-for="t in tabs" :key="t.label" :value="tabs.indexOf(t)">
        <v-icon start :icon="t.icon" />
        {{ t.label }}
      </v-tab>
    </v-tabs>
    <v-divider />
    <v-window v-model="tab" class="pa-4">
      <v-window-item :value="0">
        <div class="text-subtitle-2 text-medium-emphasis mb-1">What the business sees</div>
        <p>{{ view.business }}</p>
      </v-window-item>
      <v-window-item :value="1">
        <v-row dense>
          <v-col cols="12" md="4">
            <div class="text-subtitle-2 text-medium-emphasis mb-1">Systems involved</div>
            <v-chip v-for="s in view.systems" :key="s" size="small" class="ma-1" color="primary" variant="tonal">{{ s }}</v-chip>
          </v-col>
          <v-col cols="6" md="4">
            <div class="text-subtitle-2 text-medium-emphasis mb-1">Inputs</div>
            <ul class="pl-5">
              <li v-for="i in view.inputs" :key="i" class="mb-1">{{ i }}</li>
            </ul>
          </v-col>
          <v-col cols="6" md="4">
            <div class="text-subtitle-2 text-medium-emphasis mb-1">Outputs</div>
            <ul class="pl-5">
              <li v-for="o in view.outputs" :key="o" class="mb-1">{{ o }}</li>
            </ul>
          </v-col>
        </v-row>
      </v-window-item>
      <v-window-item :value="2">
        <div class="text-subtitle-2 text-medium-emphasis mb-1">Possible entities / APIs / events</div>
        <p>{{ view.technical }}</p>
      </v-window-item>
    </v-window>
  </v-card>
</template>
