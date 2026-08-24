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
  <v-chip :color="color(source.kind)" size="x-small" variant="tonal" label>
    <v-icon start icon="mdi-source-branch" />
    Source: {{ source.label }}
    <span v-if="source.reference" class="ml-1 opacity-70">· {{ source.reference }}</span>
  </v-chip>
</template>
