<script setup lang="ts">
import { computed, ref } from 'vue'
import { systemGuide, systemTimings, toneLabels, type SystemTiming, type WindowBar, type WindowTone } from '../data/schedulingCalendar'
import SystemDetailCard from './SystemDetailCard.vue'

const props = defineProps<{ selected: string; practiceable: string[] }>()
const emit = defineEmits<{ 'update:selected': [system: string]; practice: [system: string] }>()

const monthSystems = systemTimings.filter((system) => system.cycle === 'month')
const daySystems = systemTimings.filter((system) => system.cycle === 'day')
const linkedSystems = systemTimings.filter((system) => system.cycle === 'linked')
const ordered = [...monthSystems, ...daySystems, ...linkedSystems]

const current = computed(() => systemTimings.find((system) => system.system === props.selected) ?? systemTimings[0])
const currentIndex = computed(() => ordered.indexOf(current.value))

const septemberDays = Array.from({ length: 30 }, (_, i) => i + 1)
// September 1, 2026 is a Tuesday.
const weekday = (day: number) => 'SMTWTFS'[(day + 1) % 7]
const hourTicks = [0, 3, 6, 9, 12, 15, 18, 21, 24]
const hh = (hour: number) => `${String(Math.floor(hour)).padStart(2, '0')}:${hour % 1 ? '30' : '00'}`

function barStyle(bar: WindowBar, cycle: SystemTiming['cycle']) {
  const [left, width] = cycle === 'month'
    ? [(bar.from - 1) / 30, (bar.to - bar.from + 1) / 30]
    : [bar.from / 24, (bar.to - bar.from) / 24]
  return { left: `${left * 100}%`, width: `${width * 100}%` }
}
const showLabel = (bar: WindowBar, cycle: SystemTiming['cycle']) =>
  (cycle === 'month' ? (bar.to - bar.from + 1) / 30 : (bar.to - bar.from) / 24) >= 0.12
const markerLeft = (at: number, cycle: SystemTiming['cycle']) =>
  `${(cycle === 'month' ? (at - 0.5) / 30 : at / 24) * 100}%`
const barTitle = (bar: WindowBar, cycle: SystemTiming['cycle']) => cycle === 'month'
  ? `${bar.label}: September ${bar.from}${bar.to !== bar.from ? `–${bar.to}` : ''}${bar.continues ? ' and continuing' : ''}`
  : `${bar.label}: ${hh(bar.from)}–${hh(bar.to)} HBT`

const legend = Object.entries(toneLabels) as Array<[WindowTone, string]>

const monthView = ref<'flow' | 'timeline'>('flow')
const byName = (name: string) => monthSystems.find((system) => system.system === name)!
const stages = [
  { week: 'Week 1 · Sep 1–7', title: 'Training & status', note: 'Run side by side', systems: [byName('TBS'), byName('LRD')],
    handoff: 'Your CQ date and Line/Reserve status go into PBS' },
  { week: 'Week 2 · Sep 8–15', title: 'Bid the month', note: 'Bid package Sep 8, then bidding', systems: [byName('PBS')],
    handoff: 'PBS processes every bid by seniority' },
  { week: 'Week 3 · Sep 16–23', title: 'Awards & designations', note: 'October line published', systems: [byName('GDFD')],
    milestone: { day: 18, text: 'October line published', sub: 'Lineholders: sequences. Reserves: reserve days + days off.' },
    handoff: 'Reserves label their days off' },
  { week: 'Week 4 · Sep 20–30', title: 'TTS opens for October', note: 'Lineholders trade trips · Reserves trade days off', systems: [byName('TTS (October)')],
    handoff: 'From October 1, the daily systems below take over' },
]
const dayOfWeek = (day: number) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][(day + 1) % 7]

function select(system: string) {
  emit('update:selected', system)
}
function step(delta: number) {
  const next = ordered[(currentIndex.value + delta + ordered.length) % ordered.length]
  select(next.system)
}
</script>

<template>
  <div class="explorer">
    <div class="timelines">
      <section class="cycle" aria-labelledby="month-cycle-heading">
        <header class="cycle-header">
          <span class="cycle-step">1</span>
          <div class="flex-grow-1">
            <h2 id="month-cycle-heading" class="text-h6">Monthly build cycle · September 2026 builds October</h2>
            <p class="text-body-2 text-medium-emphasis">Once a month, four stages run in order. Each stage’s result feeds the next.</p>
          </div>
          <v-btn-toggle v-model="monthView" mandatory density="compact" color="primary" variant="outlined" divided aria-label="Monthly cycle view">
            <v-btn value="flow" size="small" prepend-icon="mdi-arrow-right-bold-box-outline">Flow</v-btn>
            <v-btn value="timeline" size="small" prepend-icon="mdi-chart-gantt">Timeline</v-btn>
          </v-btn-toggle>
        </header>

        <ol v-if="monthView === 'flow'" class="flow" aria-label="Monthly build stages">
          <li v-for="(stage, index) in stages" :key="stage.title" class="stage">
            <div class="stage-head">
              <span class="stage-week">{{ stage.week }}</span>
              <strong class="stage-title"><span class="stage-num">{{ index + 1 }}</span>{{ stage.title }}</strong>
              <span class="stage-note">{{ stage.note }}</span>
            </div>
            <div v-if="stage.milestone" class="milestone">
              <span class="cal-tile result"><small>Sep</small><b>{{ stage.milestone.day }}</b><em>{{ dayOfWeek(stage.milestone.day) }}</em></span>
              <span><strong>{{ stage.milestone.text }}</strong><span class="d-block text-caption">{{ stage.milestone.sub }}</span></span>
            </div>
            <button v-for="system in stage.systems" :key="system.system" type="button" class="flow-card"
              :aria-pressed="current.system === system.system" @click="select(system.system)">
              <span class="flow-card-top">
                <strong>{{ system.system }}</strong>
                <span :class="['who-chip', { reserve: system.audience === 'Reserve only' }]">{{ system.audience }}</span>
              </span>
              <span class="flow-name">{{ systemGuide[system.system].name }}</span>
              <span class="flow-simple">{{ systemGuide[system.system].simple }}</span>
              <span class="tiles">
                <span v-for="date in system.keyDates" :key="date.role" :class="['cal-tile', date.role, { approx: date.approx }]">
                  <small>{{ date.label }}</small>
                  <b>{{ date.day ? `Sep ${date.day}` : '—' }}</b>
                  <em>{{ date.time }}</em>
                </span>
              </span>
              <span class="flow-more">See scenario <v-icon size="14" icon="mdi-chevron-right" /></span>
            </button>
            <p class="handoff"><v-icon size="16" icon="mdi-arrow-right-bottom" /> {{ stage.handoff }}</p>
          </li>
        </ol>

        <template v-else>
        <div class="legend mb-3" aria-label="Timeline legend">
          <span v-for="[tone, label] in legend" :key="tone" class="legend-item"><i :class="['swatch', `tone-${tone}`]" />{{ label }}</span>
          <span class="legend-item"><i class="swatch marker-swatch" />Key time / cutoff (hover for detail)</span>
          <span class="legend-item"><i class="swatch dashed-swatch" />Illustrative window</span>
        </div>
        <div class="axis" aria-hidden="true">
          <span class="row-label-spacer" />
          <span class="track-axis month-axis">
            <span v-for="day in septemberDays" :key="day" :class="{ weekend: ['S'].includes(weekday(day)) }">
              <small>{{ weekday(day) }}</small>{{ day }}
            </span>
          </span>
        </div>
        <button v-for="system in monthSystems" :key="system.system" type="button" class="row"
          :aria-pressed="current.system === system.system" @click="select(system.system)">
          <span class="row-label">
            <strong>{{ system.system }}</strong> <span class="row-name">{{ systemGuide[system.system].name }}</span>
            <span class="glance"><b>Opens</b> {{ system.glance.opens }}</span>
            <span class="glance"><b>Closes</b> {{ system.glance.closes }}</span>
            <span class="glance"><b>Result</b> {{ system.glance.result }}</span>
          </span>
          <span class="track month-track">
            <span v-for="bar in system.bars" :key="bar.label" :title="barTitle(bar, 'month')"
              :class="['bar', `tone-${bar.tone}`, { dashed: bar.dashed, continues: bar.continues }]" :style="barStyle(bar, 'month')">
              <span v-if="showLabel(bar, 'month')">{{ bar.label }}</span>
            </span>
            <span v-for="marker in system.markers" :key="marker.label" class="marker" :title="`September ${marker.at}: ${marker.label}`"
              :style="{ left: markerLeft(marker.at, 'month') }" />
          </span>
        </button>
        </template>
        <SystemDetailCard v-if="current.cycle === 'month'" :system="current" :can-practice="practiceable.includes(current.system)"
          @practice="emit('practice', $event)" @step="step" />
      </section>

      <section class="cycle mt-6" aria-labelledby="day-cycle-heading">
        <header class="cycle-header">
          <span class="cycle-step">2</span>
          <div>
            <h2 id="day-cycle-heading" class="text-h6">Daily cycle · every day of the awarded month</h2>
            <p class="text-body-2 text-medium-emphasis">After awards publish, these systems repeat every 24 hours (Home Base Time). They change the month you already hold.</p>
          </div>
        </header>
        <div class="legend mb-3" aria-label="Daily legend">
          <span v-for="[tone, label] in legend" :key="tone" class="legend-item"><i :class="['swatch', `tone-${tone}`]" />{{ label }}</span>
          <span class="legend-item"><i class="swatch marker-swatch" />Key time / cutoff (hover for detail)</span>
        </div>
        <div class="axis" aria-hidden="true">
          <span class="row-label-spacer" />
          <span class="track-axis hour-axis">
            <span v-for="hour in hourTicks" :key="hour" :style="{ left: `${(hour / 24) * 100}%` }">{{ hh(hour) }}</span>
          </span>
        </div>
        <button v-for="system in daySystems" :key="system.system" type="button" class="row"
          :aria-pressed="current.system === system.system" @click="select(system.system)">
          <span class="row-label">
            <strong>{{ system.system }}</strong> <span class="row-name">{{ systemGuide[system.system].name }}</span>
            <span class="glance"><b>Opens</b> {{ system.glance.opens }}</span>
            <span class="glance"><b>Closes</b> {{ system.glance.closes }}</span>
            <span class="glance"><b>Result</b> {{ system.glance.result }}</span>
          </span>
          <span class="track day-track">
            <span v-for="bar in system.bars" :key="bar.label + bar.from" :title="barTitle(bar, 'day')"
              :class="['bar', `tone-${bar.tone}`, { dashed: bar.dashed }]" :style="barStyle(bar, 'day')">
              <span v-if="showLabel(bar, 'day')">{{ bar.label }}</span>
            </span>
            <span v-for="marker in system.markers" :key="marker.label" class="marker" :title="`${hh(marker.at)} HBT: ${marker.label}`"
              :style="{ left: markerLeft(marker.at, 'day') }" />
          </span>
        </button>
        <SystemDetailCard v-if="current.cycle === 'day'" :system="current" :can-practice="practiceable.includes(current.system)"
          @practice="emit('practice', $event)" @step="step" />
      </section>

      <section class="cycle mt-6" aria-labelledby="linked-heading">
        <header class="cycle-header">
          <span class="cycle-step">3</span>
          <div>
            <h2 id="linked-heading" class="text-h6">Linked options · no schedule of their own</h2>
            <p class="text-body-2 text-medium-emphasis">These are choices or labels attached to another system’s request. They open and close when that system does.</p>
          </div>
        </header>
        <div class="linked-grid">
          <button v-for="system in linkedSystems" :key="system.system" type="button" class="linked-card"
            :aria-pressed="current.system === system.system" @click="select(system.system)">
            <strong>{{ system.system }}</strong>
            <span class="text-body-2">{{ systemGuide[system.system].simple }}</span>
            <span class="via"><v-icon size="16" icon="mdi-link-variant" /> Rides on {{ system.via }}</span>
          </button>
        </div>
        <SystemDetailCard v-if="current.cycle === 'linked'" :system="current" :can-practice="practiceable.includes(current.system)"
          @practice="emit('practice', $event)" @step="step" />
      </section>
    </div>
  </div>
</template>

<style scoped>

.timelines { min-width: 0; }
.legend { display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: .8125rem; }
.legend-item { display: inline-flex; align-items: center; gap: 6px; }
.swatch { display: inline-block; width: 22px; height: 12px; border-radius: 3px; }
.marker-swatch { width: 3px; height: 14px; background: #1b2a35; border-radius: 0; }

.cycle-header { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; }

.flow { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 28px; }
.stage { position: relative; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.stage:not(:last-child)::after { content: ''; position: absolute; right: -22px; top: 22px; border: 8px solid transparent; border-left: 10px solid #0061ab; }
.stage-head { display: flex; flex-direction: column; gap: 2px; padding-bottom: 8px; border-bottom: 3px solid #0061ab; }
.stage-week { font-size: .6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: #60717d; }
.stage-title { display: flex; align-items: center; gap: 8px; color: #003057; font-size: 1rem; }
.stage-num { width: 22px; height: 22px; border-radius: 50%; background: #0061ab; color: white; display: grid; place-items: center; font-size: .75rem; }
.stage-note { font-size: .75rem; color: #60717d; }
.milestone { display: flex; gap: 10px; align-items: center; padding: 10px; border-radius: 10px; background: #e5f2eb; font-size: .8125rem; }
.flow-card { display: flex; flex-direction: column; gap: 6px; text-align: left; padding: 12px; border: 1px solid #d3e0eb; border-radius: 12px; background: white; transition: border-color .15s, box-shadow .15s; }
.flow-card:hover { border-color: #0061ab; box-shadow: 0 4px 12px rgba(0, 48, 87, .08); }
.flow-card[aria-pressed="true"] { border: 2px solid #0061ab; background: #f3f8fd; }
.flow-card:focus-visible { outline: 3px solid #0061ab; outline-offset: 2px; }
.flow-card-top { display: flex; justify-content: space-between; align-items: center; gap: 6px; }
.flow-card-top strong { font-size: 1.125rem; color: #003057; }
.who-chip { font-size: .6875rem; font-weight: 600; padding: 2px 8px; border-radius: 999px; background: #eaf3fb; color: #0061ab; white-space: nowrap; }
.who-chip.reserve { background: #f1e8f6; color: #6d3f88; }
.flow-name { font-size: .75rem; color: #60717d; margin-top: -4px; }
.flow-simple { font-size: .8125rem; line-height: 1.4; }
.tiles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin-top: 4px; }
.cal-tile { display: flex; flex-direction: column; align-items: center; text-align: center; border-radius: 8px; overflow: hidden; border: 1px solid #d3e0eb; background: white; min-width: 0; }
.cal-tile small { width: 100%; font-size: .5625rem; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; padding: 2px 0; color: white; }
.cal-tile b { font-size: .9375rem; color: #1b2a35; padding-top: 2px; }
.cal-tile em { font-style: normal; font-size: .5625rem; color: #60717d; line-height: 1.2; padding: 0 3px 4px; }
.cal-tile.opens small { background: #0061ab; }
.cal-tile.closes small { background: #c27a12; }
.cal-tile.result small { background: #237953; }
.cal-tile.approx { border-style: dashed; }
.milestone .cal-tile { width: 52px; flex: none; }
.milestone .cal-tile b { font-size: 1.25rem; }
.flow-more { font-size: .75rem; font-weight: 600; color: #0061ab; display: inline-flex; align-items: center; }
.handoff { margin: auto 0 0; font-size: .75rem; color: #34444f; background: #f5f9fc; border-radius: 8px; padding: 8px 10px; display: flex; gap: 6px; align-items: flex-start; }
@media (max-width: 1200px) {
  .flow { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .stage:nth-child(2)::after { display: none; }
}
@media (max-width: 640px) {
  .flow { grid-template-columns: 1fr; }
  .stage:not(:last-child)::after { display: block; right: auto; left: 50%; top: auto; bottom: -24px; border: 9px solid transparent; border-top: 10px solid #0061ab; margin-left: -9px; }
}
.cycle-step { flex: none; width: 28px; height: 28px; border-radius: 50%; background: #003057; color: white; display: grid; place-items: center; font-weight: 700; font-size: .875rem; }

.axis, .row { display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 12px; }
.track-axis { position: relative; font-size: .6875rem; color: #60717d; }
.month-axis { display: grid; grid-template-columns: repeat(30, minmax(0, 1fr)); text-align: center; }
.month-axis span { display: flex; flex-direction: column; line-height: 1.2; }
.month-axis small { font-size: .5625rem; opacity: .75; }
.month-axis .weekend { color: #a44d76; }
.hour-axis { height: 18px; }
.hour-axis span { position: absolute; transform: translateX(-50%); }
.hour-axis span:first-child { transform: none; }
.hour-axis span:last-child { transform: translateX(-100%); }

.row { width: 100%; text-align: left; padding: 10px 8px; border-radius: 10px; border: 1px solid transparent; margin-top: 4px; align-items: center; }
.row:hover { background: #f5f9fc; }
.row[aria-pressed="true"] { background: #eaf3fb; border-color: #0061ab; }
.row:focus-visible, .linked-card:focus-visible { outline: 3px solid #0061ab; outline-offset: 2px; }
.row-label { display: flex; flex-direction: column; min-width: 0; font-size: .8125rem; line-height: 1.4; }
.row-label strong { font-size: 1rem; color: #003057; }
.row-name { color: #60717d; margin-bottom: 4px; }
.glance { display: grid; grid-template-columns: 50px minmax(0, 1fr); }
.glance b { color: #003057; font-weight: 600; }

.track { position: relative; height: 46px; border-radius: 6px; background-color: #f4f7fa; }
.month-track { background-image: linear-gradient(to right, #dfe7ee 1px, transparent 1px); background-size: calc(100% / 30) 100%; }
.day-track { background-image: linear-gradient(to right, #dfe7ee 1px, transparent 1px); background-size: calc(100% / 8) 100%; }
.bar { position: absolute; top: 14px; bottom: 6px; border-radius: 5px; display: flex; align-items: center; padding: 0 6px; overflow: hidden; font-size: .6875rem; font-weight: 600; white-space: nowrap; box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .08); }
.bar span { overflow: hidden; text-overflow: ellipsis; }
.bar.dashed { background: #d6e8f6 !important; color: #003057 !important; border: 2px dashed #0061ab; }
.bar.continues { border-top-right-radius: 0; border-bottom-right-radius: 0; clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%); }
.marker { position: absolute; top: 0; height: 12px; width: 3px; margin-left: -1.5px; background: #1b2a35; border-radius: 2px; z-index: 1; }
.marker::after { content: ''; position: absolute; left: -3px; bottom: -4px; border: 4.5px solid transparent; border-top: 5px solid #1b2a35; }
.dashed-swatch { background: #d6e8f6; border: 2px dashed #0061ab; }

.tone-prep { background: #cfe3f3; color: #003057; }
.tone-open { background: #0061ab; color: white; }
.tone-processing { background: #c27a12; color: white; }
.tone-result { background: #237953; color: white; }
.tone-paused { background: repeating-linear-gradient(135deg, #d5dce2 0 6px, #eef2f5 6px 12px); color: #34444f; }

.linked-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.linked-card { display: flex; flex-direction: column; gap: 6px; text-align: left; padding: 14px 16px; border: 1px solid #d3e0eb; border-radius: 10px; }
.linked-card[aria-pressed="true"] { border-color: #0061ab; background: #eaf3fb; }
.via { font-size: .8125rem; font-weight: 600; color: #0061ab; display: inline-flex; align-items: center; gap: 4px; }

@media (max-width: 760px) {
  .axis .row-label-spacer { display: none; }
  .axis, .row { grid-template-columns: 1fr; gap: 6px; }
  .month-axis small { display: none; }
  .month-axis span:nth-child(odd):not(:first-child) { visibility: hidden; }
  .linked-grid { grid-template-columns: 1fr; }
}
</style>
