<script setup lang="ts">
import { computed } from 'vue'
import { applicationFor, systemGuide, type SystemTiming } from '../data/schedulingCalendar'

const props = defineProps<{ system: SystemTiming; canPractice: boolean }>()
const emit = defineEmits<{ practice: [system: string]; step: [delta: number] }>()

const cycleLabel = computed(() => props.system.cycle === 'month' ? 'Monthly · September builds October'
  : props.system.cycle === 'day' ? 'Every day of the awarded month · Home Base Time'
    : `Linked option · follows ${props.system.via}`)
</script>

<template>
  <article class="detail" aria-live="polite" :aria-label="`${system.system} details`">
    <div class="detail-head">
      <div>
        <span class="text-caption cycle-chip">{{ cycleLabel }}</span>
        <h3 class="text-h5 font-weight-bold mt-2">{{ system.system }} <span class="text-subtitle-1 text-medium-emphasis">· {{ systemGuide[system.system].name }}</span></h3>
        <p class="text-body-2 text-medium-emphasis">For: {{ system.who }}</p>
      </div>
      <div class="d-flex ga-1">
        <v-btn icon="mdi-chevron-left" size="small" variant="text" aria-label="Previous system" @click="emit('step', -1)" />
        <v-btn icon="mdi-chevron-right" size="small" variant="text" aria-label="Next system" @click="emit('step', 1)" />
      </div>
    </div>

    <div class="detail-body mt-3">
      <div>
        <p class="simple">{{ system.does }}</p>
        <p v-if="applicationFor[system.system] !== system.system" class="text-body-2 mt-2">
          <v-icon size="16" icon="mdi-application-outline" /> Where you do it: <strong>{{ applicationFor[system.system] }}</strong>
        </p>
        <div class="when-grid mt-3">
          <div class="when opens"><span class="when-label"><v-icon size="16" icon="mdi-door-open" /> Opens</span><p>{{ system.starts }}</p></div>
          <div class="when closes"><span class="when-label"><v-icon size="16" icon="mdi-door-closed-lock" /> Cutoff</span><p>{{ system.ends }}</p></div>
          <div class="when result"><span class="when-label"><v-icon size="16" icon="mdi-check-decagram-outline" /> Results</span><p>{{ system.result }}</p></div>
        </div>
      </div>
      <div>
        <h4 class="text-subtitle-1 font-weight-bold">Scenario · {{ system.scenario.persona }}</h4>
        <ol class="story">
          <li v-for="item in system.scenario.steps" :key="item.when">
            <span class="story-when">{{ item.when }}</span>
            <span class="text-body-2">{{ item.text }}</span>
          </li>
        </ol>
        <p class="takeaway"><v-icon size="18" icon="mdi-lightbulb-on-outline" /> <span><strong>In short:</strong> {{ system.scenario.takeaway }}</span></p>
        <p class="does-not"><v-icon size="18" icon="mdi-alert-outline" /> <span><strong>Remember:</strong> {{ system.doesNot }}</span></p>
        <div class="d-flex flex-wrap ga-2 mt-4">
          <v-btn v-if="canPractice" color="primary" variant="flat" size="small" prepend-icon="mdi-play-circle-outline"
            @click="emit('practice', system.system)">Play this step in the month story</v-btn>
          <v-btn :to="`/learn/${system.lessonId}`" variant="tonal" color="primary" size="small" prepend-icon="mdi-school-outline">Open the lesson</v-btn>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.detail { border: 1px solid #0061ab; border-radius: 14px; padding: 20px; background: white; box-shadow: 0 6px 20px rgba(0, 48, 87, .08); margin-top: 8px; }
.detail-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
.cycle-chip { background: #eaf3fb; color: #003057; padding: 4px 10px; border-radius: 999px; font-weight: 600; }
.detail-body { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; }
.simple { border-left: 3px solid #0061ab; padding: 8px 12px; background: #f5f9fc; font-size: .9375rem; }
.when-grid { display: grid; gap: 6px; }
.when { border-radius: 8px; padding: 10px 12px; font-size: .8125rem; line-height: 1.5; display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 8px; align-items: start; }
.when p { margin: 0; }
.when-label { display: inline-flex; align-items: center; gap: 6px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; font-size: .6875rem; }
.opens { background: #e6f0f9; } .opens .when-label { color: #0061ab; }
.closes { background: #fbf1e3; } .closes .when-label { color: #8a5207; }
.result { background: #e5f2eb; } .result .when-label { color: #1c6343; }
.story { list-style: none; padding: 0; margin: 10px 0 0; }
.story li { position: relative; padding: 0 0 14px 24px; display: flex; flex-direction: column; gap: 2px; }
.story li::before { content: ''; position: absolute; left: 4px; top: 5px; width: 11px; height: 11px; border-radius: 50%; background: #0061ab; }
.story li:not(:last-child)::after { content: ''; position: absolute; left: 9px; top: 18px; bottom: 0; width: 2px; background: #cbd8e3; }
.story-when { font-size: .75rem; font-weight: 700; color: #0061ab; }
.takeaway, .does-not { display: flex; gap: 8px; align-items: flex-start; padding: 10px 12px; border-radius: 8px; font-size: .875rem; margin-top: 8px; }
.takeaway { background: #fff7e0; }
.does-not { background: #fbeef3; }
@media (max-width: 860px) { .detail-body { grid-template-columns: 1fr; gap: 16px; } }
@media (max-width: 480px) { .when { grid-template-columns: 1fr; gap: 2px; } }
</style>
