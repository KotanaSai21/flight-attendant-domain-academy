<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { BiddingStage } from '../data/content/biddingJourney'
import { journeyPhases } from '../data/content/biddingJourney'

const props = withDefaults(
  defineProps<{
    stages: BiddingStage[]
    /** When set, these stage ids are spotlighted and the rest are dimmed. */
    highlight?: string[]
  }>(),
  { highlight: () => [] },
)

const AUTOPLAY_MS = 6000

const focused = computed(() => props.highlight ?? [])
const startIndex = computed(() => {
  const i = props.stages.findIndex((s) => focused.value.includes(s.id))
  return i < 0 ? 0 : i
})

const active = ref(startIndex.value)
const playing = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

watch(startIndex, (i) => {
  active.value = i
})

function pause() {
  if (timer) clearInterval(timer)
  timer = undefined
  playing.value = false
}

function play() {
  pause()
  playing.value = true
  timer = setInterval(() => {
    active.value = active.value >= props.stages.length - 1 ? 0 : active.value + 1
  }, AUTOPLAY_MS)
}

function go(i: number) {
  pause()
  active.value = i
}

function step(delta: number) {
  pause()
  const next = active.value + delta
  if (next >= 0 && next < props.stages.length) active.value = next
}

onBeforeUnmount(pause)

const stage = computed(() => props.stages[active.value])
const phase = computed(() => journeyPhases.find((p) => p.name === stage.value.phase))
const fillPercent = computed(() =>
  props.stages.length < 2 ? 100 : (active.value / (props.stages.length - 1)) * 100,
)
const isDimmed = (id: string) => focused.value.length > 0 && !focused.value.includes(id)
const isFocused = (id: string) => focused.value.length > 0 && focused.value.includes(id)
</script>

<template>
  <v-card variant="elevated" elevation="3" class="roadmap overflow-hidden">
    <div class="roadmap-header pa-4 d-flex align-center flex-wrap ga-3">
      <v-icon icon="mdi-map-marker-path" color="white" />
      <div class="flex-grow-1">
        <div class="text-overline text-white" style="opacity: 0.8">The bidding month, in order</div>
        <div class="text-subtitle-1 font-weight-bold text-white">
          Stop {{ active + 1 }} of {{ stages.length }} · {{ stage.name }}
        </div>
      </div>
      <v-btn
        :prepend-icon="playing ? 'mdi-pause' : 'mdi-play'"
        variant="flat"
        color="white"
        size="small"
        @click="playing ? pause() : play()"
      >
        {{ playing ? 'Pause tour' : 'Play the month' }}
      </v-btn>
    </div>

    <div class="track-scroll pa-5 pb-2">
      <div class="track">
        <div class="track-line" />
        <div class="track-line-fill" :style="{ width: `${fillPercent}%` }" />
        <v-icon
          icon="mdi-airplane"
          class="track-plane"
          :style="{ left: `${fillPercent}%`, color: stage.color }"
        />
        <button
          v-for="(s, i) in stages"
          :key="s.id"
          type="button"
          class="stop"
          :class="{ active: i === active, visited: i < active, dim: isDimmed(s.id), focus: isFocused(s.id) }"
          :style="{ '--stop-color': s.color }"
          :aria-current="i === active ? 'step' : undefined"
          :aria-label="`${s.short} — ${s.name}`"
          @click="go(i)"
        >
          <span class="stop-dot"><v-icon :icon="s.icon" size="18" /></span>
          <span class="stop-code">{{ s.short }}</span>
          <span class="stop-when">{{ s.when }}</span>
        </button>
      </div>
    </div>

    <v-divider />

    <transition name="stage" mode="out-in">
      <v-card-text :key="stage.id" class="pa-5">
        <div class="d-flex align-center flex-wrap ga-2 mb-1">
          <v-chip size="small" variant="flat" :color="phase?.color" :prepend-icon="phase?.icon">
            {{ stage.phase }}
          </v-chip>
          <v-chip size="small" variant="tonal" prepend-icon="mdi-clock-outline">{{ stage.when }}</v-chip>
          <v-btn
            v-if="stage.termId"
            :to="{ name: 'dictionary', query: { term: stage.termId } }"
            size="x-small"
            variant="text"
            append-icon="mdi-arrow-top-right"
          >
            Dictionary
          </v-btn>
        </div>
        <h3 class="text-h6 font-weight-bold mb-4" :style="{ color: stage.color }">{{ stage.name }}</h3>

        <v-row dense>
          <v-col cols="12" md="4">
            <div class="fact">
              <div class="fact-label"><v-icon icon="mdi-calendar-start-outline" size="15" /> When it opens</div>
              <p class="fact-text">{{ stage.opens }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="fact">
              <div class="fact-label"><v-icon icon="mdi-account-check-outline" size="15" /> Who can use it</div>
              <p class="fact-text">{{ stage.who }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="fact">
              <div class="fact-label"><v-icon icon="mdi-target" size="15" /> Why it exists</div>
              <p class="fact-text">{{ stage.purpose }}</p>
            </div>
          </v-col>
        </v-row>

        <div class="mt-4 d-flex flex-column flex-md-row ga-4">
          <div class="flex-grow-1">
            <div class="fact-label mb-2"><v-icon icon="mdi-file-document-edit-outline" size="15" /> What it changes</div>
            <ul class="pl-5 ma-0">
              <li v-for="(c, i) in stage.changes" :key="i" class="text-body-2 mb-1">{{ c }}</li>
            </ul>
          </div>
          <v-sheet class="example pa-4 rounded-lg" :style="{ borderLeft: `4px solid ${stage.color}` }">
            <div class="fact-label mb-1"><v-icon icon="mdi-account-voice" size="15" /> In practice</div>
            <p class="text-body-2 mb-0">{{ stage.example }}</p>
          </v-sheet>
        </div>

        <div class="d-flex align-center justify-space-between mt-5">
          <v-btn variant="text" size="small" prepend-icon="mdi-chevron-left" :disabled="active === 0" @click="step(-1)">
            {{ active === 0 ? 'Start' : stages[active - 1].short }}
          </v-btn>
          <v-btn
            variant="tonal"
            size="small"
            append-icon="mdi-chevron-right"
            :disabled="active === stages.length - 1"
            @click="step(1)"
          >
            {{ active === stages.length - 1 ? 'End of month' : `Next: ${stages[active + 1].short}` }}
          </v-btn>
        </div>
      </v-card-text>
    </transition>
  </v-card>
</template>

<style scoped>
.roadmap-header {
  background: linear-gradient(120deg, #003057 0%, #0061ab 65%, #0078d2 100%);
}
.track-scroll {
  overflow-x: auto;
}
.track {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  min-width: 760px;
  padding-top: 6px;
}
.track-line,
.track-line-fill {
  position: absolute;
  top: 26px;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: 2px;
}
.track-line {
  background: #e0e7ee;
}
.track-line-fill {
  right: auto;
  background: linear-gradient(90deg, #5a2d82, #0078d2, #c01933);
  transition: width 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}
.track-plane {
  position: absolute;
  top: 2px;
  transform: translateX(-50%);
  transition: left 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 3;
}
.stop {
  position: relative;
  z-index: 2;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 2px;
  text-align: center;
  opacity: 0.65;
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.stop:hover {
  opacity: 1;
  transform: translateY(-2px);
}
.stop.visited {
  opacity: 0.95;
}
.stop.active {
  opacity: 1;
}
.stop.dim {
  opacity: 0.3;
}
.stop.dim.active {
  opacity: 1;
}
.stop.focus {
  opacity: 1;
}
.stop-dot {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 3px solid #fff;
  background: #b9c6d2;
  color: #fff;
  box-shadow: 0 0 0 2px #e0e7ee;
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}
.stop.visited .stop-dot,
.stop.active .stop-dot {
  background: var(--stop-color);
}
/* Spotlighted stops you have not reached yet read as an outlined ring. */
.stop.focus .stop-dot {
  background: #fff;
  color: var(--stop-color);
  box-shadow: 0 0 0 2px var(--stop-color);
}
.stop.focus.visited .stop-dot,
.stop.focus.active .stop-dot {
  background: var(--stop-color);
  color: #fff;
}
.stop.active .stop-dot {
  transform: scale(1.16);
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--stop-color) 22%, transparent);
}
.stop-code {
  font-size: 0.78rem;
  font-weight: 800;
  color: #003057;
  letter-spacing: 0.02em;
}
.stop.active .stop-code {
  color: var(--stop-color);
}
.stop-when {
  font-size: 0.66rem;
  line-height: 1.2;
  color: #6b7c8c;
  max-width: 92px;
}
.fact {
  height: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  background: #f4f8fb;
}
.fact-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #0061ab;
}
.fact-text {
  margin: 6px 0 0;
  font-size: 0.875rem;
  line-height: 1.55;
}
.example {
  background: #fbfaf6;
  flex: 1 1 40%;
}
.stage-enter-active,
.stage-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.stage-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.stage-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
@media (prefers-reduced-motion: reduce) {
  .track-line-fill,
  .track-plane,
  .stop,
  .stop-dot,
  .stage-enter-active,
  .stage-leave-active {
    transition: none;
  }
}
</style>
