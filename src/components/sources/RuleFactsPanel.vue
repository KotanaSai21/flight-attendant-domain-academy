<script setup lang="ts">
import { computed } from 'vue'
import type { RuleFact } from '../../data/types'
import AuthorityBadge from './AuthorityBadge.vue'
import RuleStatusBadge from './RuleStatusBadge.vue'

const props = defineProps<{ facts: RuleFact[] }>()

const needsVerification = computed(() =>
  props.facts.filter(
    (fact) =>
      fact.status === 'verify-current' ||
      !fact.sourceLabel ||
      !fact.sourceReference ||
      !fact.asOf,
  ),
)
</script>

<template>
  <section aria-labelledby="rule-facts-title" class="mb-5">
    <v-card variant="outlined">
      <v-card-title id="rule-facts-title" class="d-flex align-center ga-2 flex-wrap">
        <v-icon icon="mdi-source-branch-check" color="primary" />
        <span class="text-subtitle-1 font-weight-bold">Source-backed facts used here</span>
        <v-chip size="x-small" variant="tonal">As-of dates shown</v-chip>
      </v-card-title>
      <v-divider />

      <v-card-text class="pa-5">
        <v-alert
          v-if="needsVerification.length"
          type="warning"
          variant="tonal"
          density="compact"
          class="mb-4"
          title="Verification required"
        >
          {{ needsVerification.length }} fact{{ needsVerification.length === 1 ? '' : 's' }} in this
          module may depend on newer operational or implementation information. The concept remains
          useful, but the exact value should be confirmed before it is treated as current policy.
        </v-alert>

        <v-row>
          <v-col v-for="fact in facts" :key="fact.id" cols="12" md="6">
            <v-card height="100%" variant="tonal" color="grey-lighten-5">
              <v-card-text class="pa-4">
                <div class="d-flex flex-wrap ga-2 mb-3">
                  <AuthorityBadge :authority="fact.authority" />
                  <RuleStatusBadge :status="fact.status" />
                </div>

                <div class="text-subtitle-2 font-weight-bold mb-1">{{ fact.label }}</div>
                <div class="text-h6 text-primary font-weight-bold mb-2">
                  {{ fact.value }}
                  <span v-if="fact.unit" class="text-body-2 font-weight-medium">{{ fact.unit }}</span>
                </div>
                <p v-if="fact.notes" class="text-body-2 text-medium-emphasis mb-3">
                  {{ fact.notes }}
                </p>

                <div class="text-caption text-medium-emphasis">
                  <v-icon icon="mdi-file-document-outline" size="14" class="mr-1" />
                  {{ fact.sourceLabel }}
                  <span v-if="fact.sourceReference"> · {{ fact.sourceReference }}</span>
                </div>
                <div class="text-caption text-medium-emphasis mt-1">
                  <v-icon icon="mdi-calendar-check-outline" size="14" class="mr-1" />
                  Source reviewed as of {{ fact.asOf || 'date unavailable' }}
                </div>
                <v-btn
                  v-if="fact.sourceUrl"
                  :href="fact.sourceUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  variant="text"
                  class="mt-2 px-0"
                  append-icon="mdi-open-in-new"
                >
                  Open source
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </section>
</template>
