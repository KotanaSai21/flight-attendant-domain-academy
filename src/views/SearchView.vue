<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useKnowledgeStore } from '../stores/knowledge'

const route = useRoute()
const router = useRouter()
const knowledge = useKnowledgeStore()

const query = ref(String(route.query.q ?? ''))
watch(
  () => route.query.q,
  (q) => {
    if (typeof q === 'string') query.value = q
  },
)

const hits = computed(() => knowledge.search(query.value))

function to(hit: { kind: string; id: string }) {
  switch (hit.kind) {
    case 'term':
      router.push({ name: 'dictionary', query: { term: hit.id } })
      break
    case 'module':
      router.push(`/learn/${hit.id}`)
      break
    case 'scenario':
      router.push('/simulator')
      break
  }
}

const iconFor = (kind: string) =>
  ({ term: 'mdi-book-open-variant', module: 'mdi-school-outline', scenario: 'mdi-play-circle-outline' })[kind] ??
  'mdi-magnify'

const colorFor = (kind: string) =>
  ({ term: 'secondary', module: 'primary', scenario: 'success' })[kind] ?? 'default'
</script>

<template>
  <v-container fluid class="pa-8" style="max-width: 900px">
    <h1 class="text-h4 font-weight-bold mb-1">Search the Domain</h1>
    <p class="text-body-2 text-medium-emphasis mb-6">
      Fuzzy search across dictionary terms, modules and scenarios. Try “Reserve”, “credit window”,
      “misaward”.
    </p>

    <v-text-field
      v-model="query"
      prepend-inner-icon="mdi-magnify"
      placeholder="Search…"
      variant="solo-filled"
      density="comfortable"
      hide-details
      clearable
      autofocus
    />

    <div v-if="query.trim()" class="mt-4 text-caption text-medium-emphasis">
      {{ hits.length }} result(s) for “{{ query }}”
    </div>

    <v-list class="mt-2" lines="three">
      <v-list-item
        v-for="(hit, i) in hits"
        :key="`${hit.kind}-${hit.id}`"
        rounded="lg"
        class="mb-2"
        border
        @click="to(hit)"
      >
        <template #prepend>
          <v-avatar :color="colorFor(hit.kind)">
            <v-icon :icon="iconFor(hit.kind)" color="white" />
          </v-avatar>
        </template>
        <v-list-item-title class="font-weight-bold">{{ hit.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ hit.subtitle }}</v-list-item-subtitle>
      </v-list-item>
      <div v-if="query.trim() && !hits.length" class="text-center py-10 text-medium-emphasis">
        No results. Try a shorter keyword.
      </div>
    </v-list>

    <!-- Related topics suggestion -->
    <div v-if="hits.length" class="mt-8">
      <div class="text-subtitle-1 font-weight-bold mb-2">Suggested learning</div>
      <v-chip
        size="small"
        class="ma-1"
        variant="tonal"
        color="primary"
        link
        @click="router.push({ name: 'search', query: { q: h.title.split(' ')[0] } })"
        v-for="h in hits.slice(0, 5)"
        :key="`rel-${h.id}`"
      >
        Explore “{{ h.title }}”
      </v-chip>
    </div>
  </v-container>
</template>
