<script setup lang="ts">
import type { AuthorityKind } from '../../data/types'

defineProps<{ authority: AuthorityKind }>()

const presentation: Record<AuthorityKind, { label: string; color: string; icon: string }> = {
  'general-airline': { label: 'General airline concept', color: 'secondary', icon: 'mdi-airplane' },
  faa: { label: 'FAA requirement', color: 'error', icon: 'mdi-shield-airplane' },
  'aa-process': { label: 'AA process', color: 'primary', icon: 'mdi-office-building-cog' },
  'aa-apfa-cba': { label: 'AA/APFA contract', color: 'primary', icon: 'mdi-scale-balance' },
  implementation: { label: 'Implementation status', color: 'info', icon: 'mdi-progress-wrench' },
  illustrative: { label: 'Illustrative example', color: 'warning', icon: 'mdi-lightbulb-on-outline' },
}
</script>

<template>
  <v-chip
    :color="presentation[authority].color"
    size="x-small"
    variant="tonal"
    label
    :aria-label="`Authority: ${presentation[authority].label}`"
  >
    <v-icon start :icon="presentation[authority].icon" />
    {{ presentation[authority].label }}
  </v-chip>
</template>
