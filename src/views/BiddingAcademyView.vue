<script setup lang="ts">
import BidTimeline from '../components/BidTimeline.vue'

const reserveFlow = [
  'Reserve line awarded in PBS (RAPs + Golden/Flex Days)',
  'Known gaps post to ROTA — future awards run seniority-first',
  'Golden-Day elections lock before Future processing (1500 HBT)',
  'Operational day begins inside RAP windows',
  'ROTD awards aggressive bids & standbys; known open time redistributes by noon HBT',
  'Call-out → legality checks → LMCO premium if short notice',
  'Fly / standby → credit + premiums post to ledgers',
]
</script>

<template>
  <v-container fluid class="pa-8" style="max-width: 1100px">
    <h1 class="text-h4 font-weight-bold mb-2">Bidding Academy</h1>
    <p class="text-body-1 text-medium-emphasis mb-8">
      The monthly bid cycle from sequence review to operational month, with the contract reference
      behind every step. Grounded in the 2024 CBA §10 and the Implementation Timeline LOA.
    </p>

    <div class="text-h6 font-weight-bold mb-3">Monthly Bid Cycle</div>
    <BidTimeline />

    <v-divider class="my-10" />

    <div class="text-h6 font-weight-bold mb-3">Reserve Processing Flow</div>
    <v-stepper-vertical>
      <template v-for="(step, i) in reserveFlow" :key="i">
        <v-stepper-vertical-item :complete="true" :title="`Step ${i + 1}`" :value="i + 1" elevation="1">
          <div class="text-body-1">{{ step }}</div>
        </v-stepper-vertical-item>
        <v-divider v-if="i < reserveFlow.length - 1" />
      </template>
    </v-stepper-vertical>

    <v-divider class="my-10" />

    <div class="text-h6 font-weight-bold mb-3">Implementation Complexity Watchlist</div>
    <p class="text-body-2 text-medium-emphasis mb-4">
      The Implementation LOA flagged these TTS/UBL features as high-complexity programming items with
      CIC-reviewed timelines — expect them to be active change zones:
    </p>
    <v-row>
      <v-col v-for="item in [
        'Add multiple sequences (2) in one transaction conditional on a drop',
        'TTS daily-limit exception for transactions improving a more negative day',
        'Electronic Reserve TTS/UBL transactions on days off',
        'Out-of-base UBL for Lineholders and Reserves',
        'Less-than-minimum call-out UBL for Lineholders',
        'UBL Trip Improvement originating same day',
      ]" :key="item" cols="12" md="6">
        <v-card variant="tonal" color="warning">
          <v-card-text class="d-flex align-center py-3">
            <v-icon icon="mdi-alert-circle-outline" class="mr-3" />
            <span class="text-body-2">{{ item }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card variant="outlined" class="mt-8 pa-5 d-flex align-center ga-4 flex-wrap">
      <SourceTag :source="{ kind: 'loa', label: 'Implementation Timeline LOA', reference: 'App. A' }" />
      <SourceTag :source="{ kind: 'contract', label: 'AA/APFA Contract', reference: '§10.C–D, §12.K/J' }" />
      <span class="text-caption text-medium-emphasis">
        External education resources: apfa.org/bidding (tagged “Source: APFA Website” when quoted).
      </span>
    </v-card>
  </v-container>
</template>
