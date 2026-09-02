<script setup lang="ts">
import { ref } from 'vue'
import { VueFlow, MarkerType, type Edge, type Node, type NodeMouseEvent } from '@vue-flow/core'
import { dictionary } from '../data/dictionary'
import type { DictionaryTerm } from '../data/types'

const props = withDefaults(defineProps<{ highlightedIds?: string[] }>(), {
  highlightedIds: () => [],
})

interface MapNode {
  id: string
  label: string
  icon: string
  termId?: string
  group: boolean
}

const nodesData: MapNode[] = [
  { id: 'fa', label: 'Flight Attendant Domain', icon: 'mdi-airplane', group: true },
  { id: 'fundamentals', label: 'Airline Fundamentals', icon: 'mdi-airplane-cog', group: true },
  { id: 'opschain', label: 'Operating Chain', icon: 'mdi-transit-connection-variant', termId: 'operations-chain', group: false },
  { id: 'phases', label: 'Flight Phases', icon: 'mdi-chart-timeline-variant', termId: 'flight-phases', group: false },
  { id: 'crewclock', label: 'Crew Clock', icon: 'mdi-timeline-clock-outline', termId: 'duty-period', group: false },
  { id: 'd0', label: 'D0', icon: 'mdi-clock-check-outline', termId: 'd0', group: false },
  { id: 'a14', label: 'A14', icon: 'mdi-airplane-clock', termId: 'a14', group: false },
  { id: 'cf', label: 'CF', icon: 'mdi-check-circle-outline', termId: 'completion-factor', group: false },
  { id: 'ccf', label: 'CCF', icon: 'mdi-tune-check', termId: 'controllable-completion-factor', group: false },
  { id: 'mbr', label: 'MBR', icon: 'mdi-bag-suitcase-outline', termId: 'mbr', group: false },
  { id: 'scheduling', label: 'Scheduling', icon: 'mdi-calendar-month', group: true },
  { id: 'pbs', label: 'PBS', icon: 'mdi-ballot', termId: 'pbs', group: false },
  { id: 'tts', label: 'TTS / UBL', icon: 'mdi-swap-horizontal', termId: 'tts', group: false },
  { id: 'etb', label: 'ETB', icon: 'mdi-view-dashboard-variant', termId: 'etb', group: false },
  { id: 'pairings', label: 'Pairings & Sequences', icon: 'mdi-route', termId: 'sequence', group: false },
  { id: 'lineholder', label: 'Lineholder', icon: 'mdi-calendar-check', termId: 'lineholder', group: false },
  { id: 'reserve', label: 'Reserve', icon: 'mdi-phone-incoming', group: true },
  { id: 'rap', label: 'RAP', icon: 'mdi-clock-outline', termId: 'rap', group: false },
  { id: 'rota', label: 'ROTA', icon: 'mdi-calendar-clock', termId: 'rota', group: false },
  { id: 'rotd', label: 'ROTD', icon: 'mdi-timer-sand', termId: 'rotd', group: false },
  { id: 'standby', label: 'Standby', icon: 'mdi-account-clock', termId: 'standby', group: false },
  { id: 'payroll', label: 'Payroll & Credit', icon: 'mdi-cash-multiple', group: true },
  { id: 'credit', label: 'Credited Hours', icon: 'mdi-counter', termId: 'credited-hours', group: false },
  { id: 'rig', label: 'Duty Rig', icon: 'mdi-trending-up', termId: 'duty-rig', group: false },
  { id: 'triprig', label: 'Trip RIG', icon: 'mdi-shield-crown-outline', termId: 'rig', group: false },
  { id: 'tafb', label: 'TAFB', icon: 'mdi-timer-sand', termId: 'tafb', group: false },
  { id: 'redflag', label: 'Red Flagging', icon: 'mdi-flag', termId: 'red-flagging', group: false },
  { id: 'training', label: 'Training', icon: 'mdi-school', group: true },
  { id: 'cq', label: 'CQ Training', icon: 'mdi-certificate-outline', termId: 'cq-training', group: false },
  { id: 'seniority', label: 'Seniority', icon: 'mdi-format-list-numbered', group: true },
  { id: 'occ', label: 'Occupational', icon: 'mdi-medal-outline', termId: 'seniority-occupational', group: false },
  { id: 'bump', label: 'Senior Bump', icon: 'mdi-arrow-up-bold-box-outline', termId: 'senior-bump', group: false },
  { id: 'crewmgmt', label: 'Crew Management', icon: 'mdi-sitemap', group: true },
  { id: 'transfer', label: 'Vacancies/Transfers', icon: 'mdi-home-switch-outline', termId: 'vacancy-transfer', group: false },
]

const positions: Record<string, { x: number; y: number }> = {
  fa: { x: 420, y: 0 },
  fundamentals: { x: -180, y: 130 },
  opschain: { x: -300, y: 260 },
  phases: { x: -160, y: 260 },
  crewclock: { x: -20, y: 260 },
  d0: { x: -320, y: 390 },
  a14: { x: -220, y: 390 },
  cf: { x: -120, y: 390 },
  ccf: { x: -20, y: 390 },
  mbr: { x: 80, y: 390 },
  scheduling: { x: 120, y: 130 },
  reserve: { x: 470, y: 130 },
  payroll: { x: 800, y: 130 },
  training: { x: 1060, y: 130 },
  seniority: { x: 240, y: 330 },
  crewmgmt: { x: 640, y: 330 },
  pbs: { x: -60, y: 260 },
  tts: { x: 90, y: 260 },
  etb: { x: 230, y: 260 },
  pairings: { x: 370, y: 260 },
  lineholder: { x: 300, y: 390 },
  rap: { x: 400, y: 460 },
  rota: { x: 520, y: 460 },
  rotd: { x: 640, y: 460 },
  standby: { x: 760, y: 460 },
  credit: { x: 830, y: 260 },
  rig: { x: 950, y: 260 },
  triprig: { x: 930, y: 390 },
  tafb: { x: 1050, y: 390 },
  redflag: { x: 1070, y: 260 },
  cq: { x: 1060, y: 260 },
  occ: { x: 150, y: 460 },
  bump: { x: 300, y: 460 },
  transfer: { x: 640, y: 460 },
}
positions.cq = { x: 1060, y: 260 }
positions.transfer = { x: 620, y: 460 }
positions.standby = { x: 780, y: 460 }
positions.rig = { x: 900, y: 260 }

const nodes = ref<Node[]>(
  nodesData.map((n) => ({
    id: n.id,
    position: positions[n.id] ?? { x: Math.random() * 800, y: Math.random() * 500 },
    data: {
      label: `${n.label}`,
      icon: n.icon,
      termId: n.termId,
      isGroup: n.group,
    },
    type: 'domain',
    draggable: true,
  })),
)

const edges = ref<Edge[]>([
  ...['fundamentals', 'scheduling', 'reserve', 'payroll', 'training', 'seniority', 'crewmgmt'].map((t) => ({
    id: `fa-${t}`,
    source: 'fa',
    target: t,
    animated: true,
    markerEnd: MarkerType.ArrowClosed,
  })),
  ...['opschain', 'phases', 'crewclock', 'd0', 'a14', 'cf', 'ccf', 'mbr'].map((t) => ({
    id: `fund-${t}`,
    source: 'fundamentals',
    target: t,
    markerEnd: MarkerType.ArrowClosed,
  })),
  ...['pbs', 'tts', 'etb', 'pairings', 'lineholder'].map((t) => ({
    id: `sch-${t}`,
    source: 'scheduling',
    target: t,
    markerEnd: MarkerType.ArrowClosed,
  })),
  ...['rap', 'rota', 'rotd', 'standby'].map((t) => ({
    id: `rsv-${t}`,
    source: 'reserve',
    target: t,
    markerEnd: MarkerType.ArrowClosed,
  })),
  ...['credit', 'rig', 'triprig', 'tafb', 'redflag'].map((t) => ({
    id: `pay-${t}`,
    source: 'payroll',
    target: t,
    markerEnd: MarkerType.ArrowClosed,
  })),
  { id: 'trn-cq', source: 'training', target: 'cq', markerEnd: MarkerType.ArrowClosed },
  { id: 'sen-occ', source: 'seniority', target: 'occ', markerEnd: MarkerType.ArrowClosed },
  { id: 'sen-bump', source: 'seniority', target: 'bump', markerEnd: MarkerType.ArrowClosed },
  { id: 'cm-xfer', source: 'crewmgmt', target: 'transfer', markerEnd: MarkerType.ArrowClosed },
])

const emit = defineEmits<{ (e: 'select', term: DictionaryTerm | null): void }>()

function onNodeClick({ node }: NodeMouseEvent) {
  const termId = (node.data as { termId?: string }).termId
  if (!termId) {
    emit('select', null)
    return
  }
  const term = dictionary.find((t) => t.id === termId) ?? null
  emit('select', term)
}

function isHighlighted(id: string) {
  return props.highlightedIds.length === 0 || props.highlightedIds.includes(id)
}
</script>

<template>
  <div style="height: 640px" class="rounded-lg overflow-hidden border-thin">
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      :default-zoom="0.85"
      :min-zoom="0.3"
      :max-zoom="1.6"
      fit-view-on-init
      @node-click="onNodeClick"
    >
      <template #node-domain="nodeProps">
        <div class="map-node" :class="{ 'map-node--group': nodeProps.data.isGroup, 'map-node--highlighted': highlightedIds.length && isHighlighted(nodeProps.id), 'map-node--dimmed': highlightedIds.length && !isHighlighted(nodeProps.id) }">
          <v-icon :icon="nodeProps.data.icon" size="18" class="mr-1" />
          {{ nodeProps.data.label }}
        </div>
      </template>
    </VueFlow>
  </div>
</template>

<style scoped>
.map-node {
  background: white;
  border: 2px solid #0061ab;
  color: #003057;
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 13px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 48, 87, 0.15);
  cursor: pointer;
}
.map-node--group {
  border-color: #c01933;
  background: #fff5f6;
  font-weight: 700;
}
.map-node--highlighted {
  border-width: 3px;
  box-shadow: 0 0 0 5px rgba(0, 97, 171, .12), 0 6px 16px rgba(0, 48, 87, .22);
}
.map-node--dimmed {
  opacity: .26;
  filter: grayscale(.75);
}
.term-flash {
  animation: flash 1.5s ease;
}
@keyframes flash {
  0% {
    background-color: #fff3cd;
  }
  100% {
    background-color: transparent;
  }
}
</style>

