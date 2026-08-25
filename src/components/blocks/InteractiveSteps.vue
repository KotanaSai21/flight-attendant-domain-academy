<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  items: Array<{ title?: string; detail?: string; icon?: string }>
}>()

const idx = ref(0)
const last = computed(() => props.items.length - 1)
const pct = computed(() => ((idx.value + 1) / props.items.length) * 100)

function next() {
  if (idx.value < last.value) idx.value++
}
function back() {
  if (idx.value > 0) idx.value--
}
</script>

<template>
  <v-card variant="elevated" elevation="3" class="walkthrough overflow-hidden">
    <v-progress-linear :model-value="pct" color="primary" height="5" />
    <v-card-text class="pa-6">
      <div class="text-caption text-medium-emphasis mb-2">
        STEP {{ idx + 1 }} OF {{ items.length }}
      </div>
      <transition name="stepfade" mode="out-in">
        <div :key="idx" class="d-flex ga-4 align-start">
          <v-avatar color="primary" size="52">
            <v-icon :icon="items[idx].icon ?? 'mdi-map-marker-right'" color="white" size="26" />
          </v-avatar>
          <div class="flex-grow-1">
            <div class="text-h6 font-weight-bold mb-1">{{ items[idx].title }}</div>
            <div class="text-body-1" style="line-height: 1.6">{{ items[idx].detail }}</div>
          </div>
        </div>
      </transition>

      <div class="d-flex align-center mt-6">
        <v-btn icon="mdi-chevron-left" variant="text" :disabled="idx === 0" @click="back" />
        <div class="d-flex ga-1 mx-2 flex-grow-1 justify-center flex-wrap">
          <v-btn
            v-for="(it, i) in items"
            :key="i"
            :icon="String(i + 1)"
            size="x-small"
            :variant="i === idx ? 'flat' : 'tonal'"
            :color="i === idx ? 'primary' : i < idx ? 'success' : 'grey'"
            @click="idx = i"
          />
        </div>
        <v-btn
          icon="mdi-chevron-right"
          variant="text"
          :disabled="idx === last"
          @click="next"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.stepfade-enter-active,
.stepfade-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}
.stepfade-enter-from {
  opacity: 0;
  transform: translateX(26px);
}
.stepfade-leave-to {
  opacity: 0;
  transform: translateX(-26px);
}
</style>
