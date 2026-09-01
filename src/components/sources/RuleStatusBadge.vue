<script setup lang="ts">
import type { RuleStatus } from '../../data/types'

defineProps<{ status: RuleStatus }>()

const presentation: Record<RuleStatus, { label: string; color: string; icon: string }> = {
  concept: { label: 'Concept', color: 'secondary', icon: 'mdi-book-open-page-variant-outline' },
  implemented: { label: 'Implemented', color: 'success', icon: 'mdi-check-decagram' },
  scheduled: { label: 'Scheduled', color: 'info', icon: 'mdi-calendar-clock' },
  'verify-current': { label: 'Verify current', color: 'warning', icon: 'mdi-alert-circle-outline' },
}
</script>

<template>
  <v-chip
    :color="presentation[status].color"
    size="x-small"
    variant="tonal"
    label
    :aria-label="`Rule status: ${presentation[status].label}`"
  >
    <v-icon start :icon="presentation[status].icon" />
    {{ presentation[status].label }}
  </v-chip>
</template>
