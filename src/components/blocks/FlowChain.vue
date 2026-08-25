<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const props = defineProps<{
  nodes: Array<{ label?: string; detail?: string; icon?: string; color?: string }>
  autoLabel?: string
}>()

const active = ref<number | null>(null)
const playing = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

function toggle(i: number) {
  active.value = active.value === i ? null : i
}

function play() {
  stop()
  playing.value = true
  active.value = 0
  timer = setInterval(() => {
    if (active.value === null || active.value >= props.nodes.length - 1) {
      stop()
    } else {
      active.value!++
    }
  }, 1400)
}

function stop() {
  playing.value = false
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onBeforeUnmount(stop)
</script>

<template>
  <div class="flowchain">
    <div class="d-flex align-center flex-wrap mb-3 ga-2">
      <v-btn
        size="small"
        color="primary"
        variant="tonal"
        :prepend-icon="playing ? 'mdi-stop' : 'mdi-play'"
        @click="playing ? stop() : play()"
      >
        {{ playing ? 'Stop' : (autoLabel ?? 'Play the flow') }}
      </v-btn>
      <span class="text-caption text-medium-emphasis">…or click any step to inspect it</span>
    </div>

    <div class="chain d-flex flex-wrap align-stretch">
      <template v-for="(n, i) in nodes" :key="i">
        <v-card
          class="chain-node"
          :class="{ active: active === i, opened: active === i }"
          :style="{ '--node-color': n.color ?? '#0061AB' }"
          hover
          @click="toggle(i)"
        >
          <div class="pa-3 d-flex flex-column align-center text-center" style="min-width: 118px">
            <v-icon :icon="n.icon ?? 'mdi-circle-outline'" :color="active === i ? 'white' : (n.color ?? '#0061AB')" size="26" class="mb-1" />
            <span class="text-caption font-weight-bold" style="line-height: 1.2">{{ n.label }}</span>
          </div>
          <div class="step-num">{{ i + 1 }}</div>
        </v-card>
        <div v-if="i < nodes.length - 1" class="arrow align-self-center" :class="{ pulse: playing && active === i }">
          <v-icon icon="mdi-chevron-double-right" size="22" color="primary" />
        </div>
      </template>
    </div>

    <v-expand-transition>
      <v-card v-if="active !== null" variant="tonal" color="primary" class="mt-4">
        <v-card-text class="d-flex ga-3 align-start">
          <v-icon :icon="nodes[active].icon ?? 'mdi-information'" size="26" class="mt-1" />
          <div>
            <div class="text-subtitle-1 font-weight-bold">{{ nodes[active].label }}</div>
            <div class="text-body-2">{{ nodes[active].detail }}</div>
          </div>
        </v-card-text>
      </v-card>
    </v-expand-transition>
  </div>
</template>

<style scoped>
.chain-node {
  cursor: pointer;
  border: 2px solid var(--node-color);
  border-radius: 12px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
  position: relative;
}
.chain-node:hover {
  transform: translateY(-3px);
}
.chain-node.active {
  background: var(--node-color);
  color: white;
  transform: translateY(-4px) scale(1.04);
  box-shadow: 0 8px 22px rgba(0, 48, 87, 0.28);
}
.chain-node.active :deep(.text-caption) {
  color: white !important;
}
.step-num {
  position: absolute;
  top: -9px;
  left: -9px;
  background: var(--node-color);
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}
.arrow.pulse :deep(.v-icon) {
  animation: nudge 0.6s ease infinite;
}
@keyframes nudge {
  0%, 100% { transform: translateX(0); opacity: 0.6; }
  50% { transform: translateX(5px); opacity: 1; }
}
</style>
