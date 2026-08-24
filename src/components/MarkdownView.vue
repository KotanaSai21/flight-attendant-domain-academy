<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps<{ markdown: string }>()

const md = new MarkdownIt({ html: false, linkify: true, breaks: true })
const container = ref<HTMLElement | null>(null)
let renderSeq = 0

const html = computed(() => {
  // Split out mermaid blocks; they render separately
  return md.render(props.markdown)
})

watch(
  () => props.markdown,
  async () => {
    const seq = ++renderSeq
    await nextTickRender()
    if (!container.value || seq !== renderSeq) return
    // Find code blocks whose language is mermaid and replace with rendered svg
    const blocks = Array.from(container.value.querySelectorAll('pre > code.language-mermaid'))
    if (!blocks.length) return
    const mermaid = (await import('mermaid')).default
    mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', theme: 'neutral' })
    for (let i = 0; i < blocks.length; i++) {
      const el = blocks[i] as HTMLElement
      const code = el.textContent ?? ''
      const holder = document.createElement('div')
      holder.className = 'mermaid-block'
      try {
        const { svg } = await mermaid.render(`mmd-${seq}-${i}`, code)
        holder.innerHTML = svg
        el.parentElement?.replaceWith(holder)
      } catch {
        holder.textContent = code
        el.parentElement?.replaceWith(holder)
      }
    }
  },
)

async function nextTickRender() {
  await Promise.resolve()
}
</script>

<template>
  <div ref="container" class="prose" v-html="html" />
</template>
