<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
  code: string
  caption?: string
}>()

const svg = ref('')
const failed = ref(false)
const loading = ref(true)

onMounted(async () => {
  try {
    const mermaid = (await import('mermaid')).default
    mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', theme: 'neutral' })
    const id = `mmd-${Math.random().toString(36).slice(2, 10)}`
    const { svg: out } = await mermaid.render(id, props.code)
    svg.value = out
  } catch {
    failed.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="diagram-wrap">
    <div v-if="loading" class="diagram-loading">
      <v-progress-circular indeterminate size="22" width="2" color="primary" />
      <span class="text-caption text-medium-emphasis ml-2">Rendering diagram…</span>
    </div>
    <div v-else-if="svg" class="mermaid-block" v-html="svg" />
    <pre v-else class="diagram-fallback">{{ code }}</pre>
    <div v-if="caption && svg" class="text-caption text-center text-medium-emphasis mt-2">
      {{ caption }}
    </div>
  </div>
</template>

<style scoped>
.diagram-wrap {
  margin: 0.5rem 0 1rem;
}
.diagram-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.diagram-fallback {
  background: #102a43;
  color: #d9e2ec;
  padding: 1rem;
  border-radius: 10px;
  font-size: 0.84em;
  overflow-x: auto;
}
</style>
