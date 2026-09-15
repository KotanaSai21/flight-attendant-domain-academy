<script setup lang="ts">
defineProps<{ items: Array<{ day?: string; time?: string; title?: string; detail?: string }> }>()
</script>

<template>
  <ol class="schedule-flow">
    <li v-for="(item, index) in items" :key="index" class="schedule-event">
      <div class="schedule-marker" aria-hidden="true">{{ index + 1 }}</div>
      <div class="schedule-when"><strong>{{ item.day }}</strong><span>{{ item.time }}</span></div>
      <div class="schedule-copy"><h3>{{ item.title }}</h3><p>{{ item.detail }}</p></div>
    </li>
  </ol>
</template>

<style scoped>
.schedule-flow { list-style: none; padding: 0; margin: 0; }
.schedule-event { position: relative; display: grid; grid-template-columns: 36px 150px minmax(0, 1fr); gap: 18px; padding: 0 0 24px; }
.schedule-event:not(:last-child)::before { content: ''; position: absolute; top: 32px; bottom: 0; left: 17px; width: 2px; background: #b7d4e8; }
.schedule-marker { display: grid; place-items: center; width: 36px; height: 36px; background: #0061ab; color: white; border-radius: 50%; font-weight: 700; z-index: 1; }
.schedule-when { display: flex; flex-direction: column; padding-top: 5px; color: #0061ab; }
.schedule-when span { font-size: .8rem; }
.schedule-copy { border: 1px solid #cfdfeb; border-radius: 12px; padding: 16px 20px; background: #f7fbfe; color: #19394f; }
.schedule-copy h3 { font-size: 1rem; margin-bottom: 6px; }
.schedule-copy p { font-size: .92rem; line-height: 1.6; margin: 0; }
@media (max-width: 600px) {
  .schedule-event { grid-template-columns: 36px minmax(0, 1fr); gap: 10px 14px; }
  .schedule-copy { grid-column: 2; padding: 14px; }
  .schedule-when { padding-top: 0; }
}
</style>
