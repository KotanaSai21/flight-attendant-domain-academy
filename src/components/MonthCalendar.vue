<script setup lang="ts">
import { computed, ref } from 'vue'

interface DayCell {
  day: number
  label?: string
  detail?: string
  color?: string
  icon?: string
}

const props = withDefaults(
  defineProps<{
    days: DayCell[]
    daysInMonth?: number
    /** 0 = the 1st falls on Sunday, 1 = Monday, and so on. */
    startWeekday?: number
    legend?: Array<{ label: string; color: string }>
  }>(),
  { daysInMonth: 30, startWeekday: 0, legend: () => [] },
)

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const byDay = computed(() => new Map(props.days.map((d) => [d.day, d])))
const cells = computed(() => {
  const lead = Array.from({ length: props.startWeekday }, () => null)
  const real = Array.from({ length: props.daysInMonth }, (_, i) => byDay.value.get(i + 1) ?? { day: i + 1 })
  return [...lead, ...real]
})

const active = ref<number | null>(null)
const activeCell = computed(() => (active.value === null ? null : byDay.value.get(active.value) ?? null))

function select(cell: DayCell) {
  if (!cell.label) return
  active.value = active.value === cell.day ? null : cell.day
}
</script>

<template>
  <v-card variant="outlined" class="calendar">
    <v-card-text class="pa-4">
      <div class="grid head">
        <div v-for="(w, i) in weekdays" :key="i" class="weekday">{{ w }}</div>
      </div>
      <div class="grid">
        <template v-for="(cell, i) in cells" :key="i">
          <div v-if="!cell" class="cell blank" />
          <component
            :is="cell.label ? 'button' : 'div'"
            v-else
            :type="cell.label ? 'button' : undefined"
            class="cell"
            :class="{ marked: !!cell.label, on: active === cell.day }"
            :style="{ '--c': cell.color ?? '#0061AB' }"
            :aria-label="cell.label ? `${cell.day}: ${cell.label}` : undefined"
            @click="select(cell)"
          >
            <span class="num">{{ cell.day }}</span>
            <span v-if="cell.label" class="pill">
              <v-icon v-if="cell.icon" :icon="cell.icon" size="11" />
              {{ cell.label }}
            </span>
          </component>
        </template>
      </div>

      <div v-if="legend.length" class="d-flex flex-wrap ga-3 mt-3">
        <span v-for="(l, i) in legend" :key="i" class="legend-item">
          <span class="swatch" :style="{ background: l.color }" />{{ l.label }}
        </span>
      </div>

      <v-expand-transition>
        <v-sheet
          v-if="activeCell"
          class="detail mt-3 pa-3 rounded-lg"
          :style="{ borderLeft: `4px solid ${activeCell.color ?? '#0061AB'}` }"
        >
          <div class="font-weight-bold text-body-2 mb-1">
            Day {{ activeCell.day }} · {{ activeCell.label }}
          </div>
          <p class="text-body-2 mb-0">{{ activeCell.detail }}</p>
        </v-sheet>
      </v-expand-transition>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 5px;
}
.head {
  margin-bottom: 5px;
}
.weekday {
  text-align: center;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #8a99a8;
}
.cell {
  position: relative;
  min-height: 56px;
  padding: 4px 5px;
  border: 1px solid #e3eaf1;
  border-radius: 7px;
  background: #fff;
  text-align: left;
  font: inherit;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.cell.blank {
  border: none;
  background: none;
}
.cell.marked {
  cursor: pointer;
  border-color: color-mix(in srgb, var(--c) 45%, #e3eaf1);
  background: color-mix(in srgb, var(--c) 8%, #fff);
  transition: transform 0.16s ease, box-shadow 0.16s ease;
}
.cell.marked:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(0, 48, 87, 0.13);
}
.cell.on {
  box-shadow: 0 0 0 2px var(--c);
}
.num {
  font-size: 0.7rem;
  font-weight: 700;
  color: #8a99a8;
}
.cell.marked .num {
  color: var(--c);
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 0.62rem;
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
  background: var(--c);
  border-radius: 4px;
  padding: 2px 4px;
}
.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.72rem;
  color: #5c6b7a;
}
.swatch {
  width: 11px;
  height: 11px;
  border-radius: 3px;
}
.detail {
  background: #f6f9fc;
}
@media (max-width: 600px) {
  .cell {
    min-height: 46px;
  }
  .pill {
    font-size: 0.55rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  .cell.marked {
    transition: none;
  }
}
</style>
