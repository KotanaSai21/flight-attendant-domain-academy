<script setup lang="ts">
const steps = [
  {
    title: 'Sequence Review (APFA ↔ Company)',
    detail:
      'Prior month 1st / 3rd / 6th at 1200 DFW: initial delivery, APFA response, final review. Illegal sequences are rebuilt.',
    ref: '§10.B.4',
  },
  {
    title: 'Bid Package Published',
    detail:
      'No later than the 8th of the month prior at 1200 DFW, the final package appears in PBS: RAP lists, line ranges, projected lines min/mid/max per base, minimum Reserves, layover hotels, projected standby shifts.',
    ref: '§10.C.1–2',
  },
  {
    title: 'PBS Opens — Flight Attendants Bid',
    detail:
      'Lineholders and Reserves submit ranked preferences (patterns, trips, High/Low options). Senior Bump elections must be made before PBS opens.',
    ref: '§10.C, §12.A.3.c',
  },
  {
    title: 'PBS Processing',
    detail:
      'The engine processes in seniority order against frozen snapshots: coverage constraints first, then preferences. PPO simulations for full-month absences run alongside.',
    ref: '§10.D, §2.MM',
  },
  {
    title: 'Award Generated',
    detail:
      'Lines of Time (70–90 hrs standard) and Reserve lines post. Awards in seniority order; misawards (e.g., cancellations during bidding) route to remediation.',
    ref: '§10.D.15, §10.T',
  },
  {
    title: 'Schedule Published → TTS / UBL Open',
    detail:
      'Post-award reshaping begins: drops, pickups, trades validated against Credit Windows; denials can pass to UBL for daily-run retries. ETB trades continue real-time throughout.',
    ref: '§10.E–K, §2.G/GG',
  },
  {
    title: 'Operational Month Begins',
    detail:
      'ROTA covers known future gaps into the month; ROTD + Crew Scheduling own day-of assignments; payroll ledgers accumulate from first report to final release.',
    ref: '§12.K/J, §3',
  },
]
</script>

<template>
  <v-timeline side="end" align="start" density="comfortable" truncate-line="both">
    <v-timeline-item
      v-for="(s, i) in steps"
      :key="s.title"
      :dot-color="i === steps.length - 1 ? 'success' : 'primary'"
      size="small"
    >
      <v-card variant="tonal" class="mb-2">
        <v-card-text>
          <div class="d-flex align-center mb-1 flex-wrap">
            <span class="text-subtitle-1 font-weight-bold">{{ i + 1 }}. {{ s.title }}</span>
            <v-chip size="x-small" color="secondary" variant="outlined" class="ml-2">{{ s.ref }}</v-chip>
          </div>
          <p class="text-body-2 text-medium-emphasis mb-0">{{ s.detail }}</p>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
