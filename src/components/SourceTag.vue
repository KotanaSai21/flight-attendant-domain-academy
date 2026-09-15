<script setup lang="ts">
import type { KnowledgeSource } from '../data/types'

defineProps<{ source: KnowledgeSource }>()

const color = (kind: KnowledgeSource['kind']) =>
  ({
    contract: 'primary',
    apfa: 'success',
    loa: 'info',
    system: 'warning',
  })[kind]
</script>

<template>
  <v-chip
    :color="color(source.kind)"
    size="x-small"
    variant="tonal"
    label
    :href="source.url"
    :target="source.url ? '_blank' : undefined"
    :rel="source.url ? 'noopener noreferrer' : undefined"
  >
    <v-icon start icon="mdi-source-branch" />
    Source: {{ source.label }}
    <span v-if="source.reference" class="ml-1 opacity-70">· {{ source.reference }}</span>
    <v-icon v-if="source.url" end icon="mdi-open-in-new" size="11" />
  </v-chip>
</template>
