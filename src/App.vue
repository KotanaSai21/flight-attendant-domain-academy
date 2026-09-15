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
  { icon: 'mdi-school-outline', title: 'Learn Scheduling', to: '/learn' },
  { icon: 'mdi-book-open-variant', title: 'Domain Dictionary', to: '/dictionary' },
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
            Content reflects the author's current understanding and should be independently verified.
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

    <v-main class="app-main">
      <v-alert class="mx-4 mt-4 mb-0" type="info" variant="tonal" density="comfortable">
        This academy reflects the author's current understanding of the subject and is provided for
        learning purposes.
      </v-alert>
      <router-view />
      <v-footer height="auto" class="app-footer text-caption text-medium-emphasis py-4" color="white" border>
        <v-container class="footer-content py-0">
          Flight Attendant Domain Academy — internal training platform. To contribute or report any
          issues, visit the
          <a href="https://github.com/KotanaSai21/flight-attendant-domain-academy" target="_blank" rel="noopener noreferrer">
            source repository on GitHub
          </a>.
        </v-container>
      </v-footer>
    </v-main>
  </v-app>
</template>

<style scoped>
.brand {
  background: linear-gradient(135deg, #eaf3fb 0%, #f5f7fa 100%);
}

.app-main {
  padding-bottom: 5rem !important;
}

.app-footer {
  position: fixed;
  bottom: 0;
  left: 272px;
  z-index: 1000;
}

.footer-content {
  max-width: 1100px;
  text-align: center;
}

@media (max-width: 959px) {
  .app-footer {
    left: 0;
  }
}
</style>
