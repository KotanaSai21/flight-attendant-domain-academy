<script setup lang="ts">
import { computed, ref } from 'vue'

interface Marker {
  time: string
  label: string
  detail?: string
  color?: string
  icon?: string
}
interface Band {
  from: string
  to: string
  label: string
  color: string
}

const props = withDefaults(
  defineProps<{
    markers: Marker[]
    bands?: Band[]
    /** Shown under the axis, e.g. "All times Home Base Time". */
    note?: string
  }>(),
  { bands: () => [], note: undefined },
)

const toMinutes = (t: string) => {
  const digits = t.replace(/\D/g, '').padStart(4, '0')
  return Number(digits.slice(0, 2)) * 60 + Number(digits.slice(2, 4))
}
const pct = (minutes: number) => (minutes / 1440) * 100

/** A band whose end is before its start wraps midnight, so it renders as two segments. */
const bandSegments = computed(() =>
  props.bands.flatMap((band, i) => {
    const from = toMinutes(band.from)
    const to = toMinutes(band.to)
    const spans =
      to > from ? [[from, to]] : [[from, 1440], [0, to]]
    return spans.map(([start, end], j) => ({
      key: `${i}-${j}`,
      band,
      left: pct(start),
      width: pct(end - start),
      showLabel: j === 0,
    }))
  }),
)

const sorted = computed(() =>
  props.markers
    .map((m, i) => ({ ...m, i, minutes: toMinutes(m.time) }))
    .sort((a, b) => a.minutes - b.minutes),
)

const active = ref<number | null>(null)
const activeMarker = computed(() =>
  active.value === null ? null : sorted.value.find((m) => m.i === active.value) ?? null,
)

const hours = [0, 360, 720, 1080, 1440]
const hourLabel = (m: number) => (m === 1440 ? '2400' : String(m / 60).padStart(2, '0') + '00')
</script>

<template>
  <v-card variant="outlined" class="dayclock">
    <v-card-text class="pa-5 pb-3">
      <div class="track-wrap">
        <div class="track">
          <div
            v-for="seg in bandSegments"
            :key="seg.key"
            class="band"
            :style="{ left: `${seg.left}%`, width: `${seg.width}%`, background: seg.band.color }"
          >
            <span v-if="seg.showLabel && seg.width > 9" class="band-label">{{ seg.band.label }}</span>
          </div>

          <button
            v-for="m in sorted"
            :key="m.i"
            type="button"
            class="marker"
            :class="{ on: active === m.i, alt: m.i % 2 === 1, 'edge-l': pct(m.minutes) < 12, 'edge-r': pct(m.minutes) > 88 }"
            :style="{ left: `${pct(m.minutes)}%`, '--mk': m.color ?? '#003057' }"
            :aria-label="`${m.time} — ${m.label}`"
            @click="active = active === m.i ? null : m.i"
          >
            <span class="stem" />
            <span class="dot"><v-icon v-if="m.icon" :icon="m.icon" size="13" /></span>
            <span class="tag">
              <span class="tag-time">{{ m.time }}</span>
              <span class="tag-label">{{ m.label }}</span>
            </span>
          </button>
        </div>

        <div class="axis">
          <span v-for="h in hours" :key="h" class="tick" :style="{ left: `${pct(h)}%` }">{{ hourLabel(h) }}</span>
        </div>
      </div>

      <div v-if="note" class="text-caption text-medium-emphasis mt-2">
        <v-icon icon="mdi-information-outline" size="14" class="mr-1" />{{ note }}
      </div>

      <v-expand-transition>
        <v-sheet
          v-if="activeMarker"
          class="detail mt-4 pa-4 rounded-lg"
          :style="{ borderLeft: `4px solid ${activeMarker.color ?? '#003057'}` }"
        >
          <div class="d-flex align-center ga-2 mb-1">
            <v-chip size="x-small" variant="flat" :color="activeMarker.color">{{ activeMarker.time }}</v-chip>
            <span class="font-weight-bold">{{ activeMarker.label }}</span>
          </div>
          <p class="text-body-2 mb-0">{{ activeMarker.detail }}</p>
        </v-sheet>
        <div v-else class="text-caption text-medium-emphasis mt-4">
          <v-icon icon="mdi-cursor-default-click-outline" size="15" class="mr-1" />
          Select any marker to see what happens at that time.
        </div>
      </v-expand-transition>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.track-wrap {
  padding: 82px 0 6px;
  overflow-x: auto;
}
.track {
  position: relative;
  height: 26px;
  min-width: 620px;
  border-radius: 6px;
  background: #eef2f6;
}
.band {
  position: absolute;
  top: 0;
  height: 100%;
  opacity: 0.32;
}
.band-label {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #16232f;
  white-space: nowrap;
}
.marker {
  position: absolute;
  top: 0;
  width: 30px;
  height: 26px;
  transform: translateX(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 2;
}
.marker:focus-visible {
  outline: 2px solid var(--mk);
  outline-offset: 3px;
  border-radius: 4px;
}
.stem {
  position: absolute;
  left: 50%;
  bottom: 26px;
  width: 2px;
  height: 16px;
  background: var(--mk);
  transform: translateX(-50%);
  opacity: 0.55;
}
.marker.alt .stem {
  height: 34px;
}
.dot {
  position: absolute;
  left: 50%;
  top: 50%;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: var(--mk);
  color: #fff;
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.marker:hover .dot,
.marker.on .dot {
  transform: translate(-50%, -50%) scale(1.25);
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--mk) 24%, transparent);
}
.tag {
  position: absolute;
  left: 50%;
  bottom: 42px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.15;
  white-space: nowrap;
}
.marker.alt .tag {
  bottom: 60px;
}
/* Keep the first and last labels inside the track instead of centring them off the edge. */
.marker.edge-l .tag {
  left: 0;
  transform: none;
  align-items: flex-start;
  text-align: left;
}
.marker.edge-r .tag {
  left: auto;
  right: 0;
  transform: none;
  align-items: flex-end;
  text-align: right;
}
.marker.edge-l .tag-label {
  text-align: left;
}
.marker.edge-r .tag-label {
  text-align: right;
}
.tag-time {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--mk);
}
.tag-label {
  font-size: 0.66rem;
  color: #5c6b7a;
  max-width: 108px;
  white-space: normal;
  text-align: center;
}
.axis {
  position: relative;
  height: 18px;
  min-width: 620px;
  margin-top: 4px;
}
.tick {
  position: absolute;
  transform: translateX(-50%);
  font-size: 0.65rem;
  color: #8a99a8;
}
.detail {
  background: #f6f9fc;
}
@media (prefers-reduced-motion: reduce) {
  .dot {
    transition: none;
  }
}
</style>
