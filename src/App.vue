<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { modules } from './data/modules'

const router = useRouter()
const route = useRoute()
const drawer = ref(true)
const query = ref('')

const nav = [
  { icon: 'mdi-home-outline', title: 'Home', to: '/' },
  { icon: 'mdi-school-outline', title: 'Learning Center', to: '/learn' },
  { icon: 'mdi-book-open-variant', title: 'Domain Dictionary', to: '/dictionary' },
  { icon: 'mdi-timeline-clock-outline', title: 'Bidding Academy', to: '/bidding' },
  { icon: 'mdi-play-circle-outline', title: 'Scenario Simulator', to: '/simulator' },
  { icon: 'mdi-hub-outline', title: 'Interactive Domain Map', to: '/map' },
]

function search() {
  router.push({ name: 'search', query: { q: query.value } })
}
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app permanent :width="272">
      <div class="brand pa-5 d-flex align-center">
        <v-avatar color="primary" size="40" class="mr-3">
          <v-icon icon="mdi-airplane" color="white" />
        </v-avatar>
        <div>
          <div class="text-subtitle-1 font-weight-bold text-primary">Domain Academy</div>
          <div class="text-caption text-medium-emphasis">AA Flight Attendant</div>
        </div>
      </div>
      <v-divider />
      <v-list density="comfortable" nav class="px-2">
        <v-list-item
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          rounded="lg"
          :active="route.path === item.to"
          color="primary"
          class="mb-1"
        />
      </v-list>
      <v-divider />
      <div class="text-caption text-medium-emphasis px-5 pt-3 pb-1 font-weight-medium">
        LEARNING MODULES
      </div>
      <v-list density="compact" nav class="px-2 pb-4">
        <v-list-item
          v-for="m in modules"
          :key="m.id"
          :to="`/learn/${m.id}`"
          :title="`${m.number}. ${m.title}`"
          rounded="lg"
          color="primary"
        >
          <template #prepend>
            <v-icon :icon="m.icon" size="18" :color="m.color" />
          </template>
        </v-list-item>
      </v-list>

      <template #append>
        <div class="pa-4 text-caption text-medium-emphasis border-thin">
          Sources: AA/APFA 2024 CBA · Implementation LOA · APFA
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar flat height="64" color="white" border>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="font-weight-bold text-primary d-none d-sm-block">
        Flight Attendant Domain Academy
      </v-toolbar-title>
      <v-spacer />
      <div style="max-width: 420px" class="w-100 mr-4">
        <v-text-field
          v-model="query"
          placeholder="Search terms, modules, scenarios…"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          variant="solo-filled"
          flat
          hide-details
          single-line
          clearable
          bg-color="grey-lighten-3"
          @keyup.enter="search()"
          @click:clear="query = ''"
        />
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
      <v-footer height="auto" class="text-caption text-medium-emphasis mt-10 py-4" color="white" border>
        <v-container fluid class="pa-0">
          Flight Attendant Domain Academy — internal training platform. Content grounded in the
          AA/APFA 2024 CBA & LOAs; external items tagged “Source: APFA Website”. Not a legal
          reference — always consult the contract.
        </v-container>
      </v-footer>
    </v-main>
  </v-app>
</template>

<style scoped>
.brand {
  background: linear-gradient(135deg, #eaf3fb 0%, #f5f7fa 100%);
}
</style>
