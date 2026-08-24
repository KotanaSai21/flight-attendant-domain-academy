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
    <v-navigation-drawer v-model="drawer" app permanent>
      <div class="pa-4 d-flex align-center">
        <v-icon icon="mdi-airplane" color="primary" size="28" class="mr-2" />
        <div>
          <div class="text-subtitle-1 font-weight-bold text-primary leading-tight">Domain Academy</div>
          <div class="text-caption text-medium-emphasis">AA Flight Attendant</div>
        </div>
      </div>
      <v-divider />
      <v-list density="comfortable" nav>
        <v-list-item
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          :active="route.path === item.to"
        />
      </v-list>
      <v-divider />
      <v-list-subheader class="text-caption">Learning Modules</v-list-subheader>
      <v-list density="compact" nav>
        <v-list-item
          v-for="m in modules"
          :key="m.id"
          :to="`/learn/${m.id}`"
          :title="`${m.number}. ${m.title}`"
          active-color="primary"
        >
          <template #prepend>
            <v-icon :icon="m.icon" size="18" :color="m.color" />
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat border>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-spacer />
      <div style="max-width: 480px" class="w-100 mr-4">
        <v-text-field
          v-model="query"
          placeholder="Search terms, modules, scenarios…  (e.g. Reserve, PBS)"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          variant="solo-filled"
          hide-details
          single-line
          clearable
          @keyup.enter="search()"
          @click:clear="query = ''"
        />
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
      <v-footer class="text-caption text-medium-emphasis mt-8" border>
        <span>
          Flight Attendant Domain Academy — internal training platform. Content grounded in the
          AA/APFA 2024 CBA & LOAs; external items tagged “Source: APFA Website”. Not a legal
          reference — always consult the contract.
        </span>
      </v-footer>
    </v-main>
  </v-app>
</template>
