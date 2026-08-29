<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ variant: 'airport' | 'cabin' | 'network' | 'aircraft' }>()

const scenes = {
  airport: {
    src: '/assets/ai-airport-operation.png',
    alt: 'AI-generated airport departure operation with an aircraft, cabin crew, gate activity, and ground support teams',
  },
  aircraft: {
    src: '/assets/ai-aircraft-cutaway.png',
    alt: 'AI-generated cutaway of a commercial aircraft showing the flight deck, cabin, doors, exits, galleys, wings, and tail',
  },
  cabin: {
    src: '/assets/ai-cabin-positions.png',
    alt: 'AI-generated cutaway cabin showing Flight Attendants positioned in different responsibility zones',
  },
  network: {
    src: '/assets/ai-hub-network.png',
    alt: 'AI-generated conceptual hub-and-spoke airline network across the United States',
  },
} as const

const scene = computed(() => scenes[props.variant])
</script>

<template>
  <figure class="scene-wrap ma-0">
    <img :src="scene.src" :alt="scene.alt" class="scene" loading="lazy" />
    <figcaption class="text-caption text-medium-emphasis mt-2 px-2">
      AI-generated conceptual illustration. Use the lesson text and authoritative operational sources for exact procedures and layouts.
    </figcaption>
    <div v-if="$slots.default" class="text-caption text-center text-medium-emphasis mt-2"><slot /></div>
  </figure>
</template>

<style scoped>
.scene-wrap {
  background: #fff;
  border: 1px solid #e3ebf3;
  border-radius: 14px;
  padding: 10px;
  box-shadow: 0 3px 14px rgba(0, 48, 87, 0.08);
}
.scene {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}
</style>
