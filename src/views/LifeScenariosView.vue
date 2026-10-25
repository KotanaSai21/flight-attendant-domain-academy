<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { lifeScenarios } from '../data/lifeScenarios'
import type { StoryScene } from '../data/types'
import { useProgressStore } from '../stores/progress'
import SourceTag from '../components/SourceTag.vue'
import MonthlyLifeStory from '../components/MonthlyLifeStory.vue'

const route = useRoute()
const progress = useProgressStore()
const progressId = 'day-in-the-life'
const role = ref('All')
const activeScene = ref(0)
const visited = ref<number[]>([0])
const choices = ref<Record<number, number>>({})
const saveError = ref('')
const showEnding = ref(false)
const scenario = computed(() => lifeScenarios.find((item) => item.id === route.params.id))
const scenes = computed<StoryScene[]>(() => scenario.value?.storyScenes ?? scenario.value?.steps.map((step) => ({
  time: step.time, title: step.title, text: step.action,
})) ?? [])
const scene = computed(() => scenes.value[activeScene.value])
const feedback = computed(() => scene.value?.choice?.options[choices.value[activeScene.value]]?.reply)
const systemStories = computed(() => lifeScenarios.filter((item) => item.systemJourney && matchesRole(item.roles)))
const lifeStories = computed(() => lifeScenarios.filter((item) => !item.systemJourney && matchesRole(item.roles)))
const canFinish = computed(() => visited.value.length === scenes.value.length &&
  scenes.value.every((item, index) => !item.choice || choices.value[index] !== undefined))
const nextStory = computed(() => {
  const index = lifeScenarios.findIndex((item) => item.id === scenario.value?.id)
  return lifeScenarios[(index + 1) % lifeScenarios.length]
})

watch(() => route.params.id, () => {
  activeScene.value = 0
  visited.value = [0]
  choices.value = {}
  showEnding.value = false
  saveError.value = ''
})

function matchesRole(roles: string[]) {
  return role.value === 'All' || roles.includes(role.value)
}

function isComplete(id: string) {
  return progress.isSectionDone(progressId, id)
}

function goToScene(index: number) {
  activeScene.value = index
  showEnding.value = false
  if (!visited.value.includes(index)) visited.value.push(index)
}

function finish() {
  if (!scenario.value || !canFinish.value) return
  showEnding.value = true
  saveError.value = ''
  const wasComplete = isComplete(scenario.value.id)
  try {
    if (!wasComplete) progress.toggleSection(progressId, scenario.value.id)
    else progress.persist()
  } catch (error) {
    if (!wasComplete) delete progress.completedSections[`${progressId}:${scenario.value.id}`]
    console.error('Unable to save story progress', error)
    saveError.value = 'Progress could not be saved on this device. Allow browser storage and try again.'
  }
}
</script>

<template>
  <MonthlyLifeStory v-if="!route.params.id" />
  <v-container v-else class="life-page pa-4 pa-sm-8">
    <template v-if="route.params.id === 'stories'">
      <v-btn :to="{ name: 'life-scenarios' }" variant="text" prepend-icon="mdi-arrow-left" class="mb-4">Back to the monthly story</v-btn>
      <header class="mb-7">
        <div class="text-overline text-primary">Learn through stories</div>
        <h1 class="text-h4 font-weight-bold mb-3">A Day in the Life</h1>
        <p class="text-body-1 text-medium-emphasis">Meet a flight attendant. Follow their day. See where each scheduling system fits.</p>
      </header>
      <div class="catalog-heading mb-5">
        <h2 class="text-h6 font-weight-bold">Choose a system story</h2>
        <v-select v-model="role" :items="['All', 'Lineholder', 'Reserve']" label="Flight attendant role"
          variant="outlined" density="compact" hide-details class="role-filter" />
      </div>
      <v-row>
        <v-col v-for="item in systemStories" :key="item.id" cols="12" sm="6" lg="4">
          <v-card :to="{ name: 'life-scenarios', params: { id: item.id } }" variant="outlined" hover class="story-card h-100">
            <v-card-text class="pa-5">
              <div class="d-flex align-center ga-2 mb-3 text-primary">
                <v-icon :icon="item.icon" size="22" />
                <span class="text-subtitle-2 font-weight-bold">{{ item.systemJourney?.system }}</span>
                <v-spacer />
                <v-icon v-if="isComplete(item.id)" icon="mdi-check-circle" color="success" size="20" aria-label="Completed" />
              </div>
              <h3 class="text-subtitle-1 font-weight-bold mb-2">{{ item.title }}</h3>
              <p class="text-body-2 text-medium-emphasis">{{ item.situation }}</p>
              <div class="text-caption mt-4">{{ item.roles.join(' / ') }} <span aria-hidden="true"> &middot; </span> {{ item.storyScenes?.length ?? item.steps.length }} scenes</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <details class="more-stories mt-7">
        <summary>More everyday situations ({{ lifeStories.length }})</summary>
        <div class="d-flex flex-column ga-2 mt-4">
          <router-link v-for="item in lifeStories" :key="item.id" :to="{ name: 'life-scenarios', params: { id: item.id } }">
            {{ item.title }}<span v-if="isComplete(item.id)"> &mdash; completed</span>
          </router-link>
        </div>
      </details>
      <p class="text-caption text-medium-emphasis mt-6">Illustrative stories, not live AA systems. Use current official guidance for work decisions.</p>
    </template>

    <template v-else-if="scenario && scene">
      <v-btn :to="{ name: 'life-scenarios', params: { id: 'stories' } }" variant="text" prepend-icon="mdi-arrow-left" class="mb-4">All shorter stories</v-btn>
      <article :aria-label="scenario.title">
        <header class="mb-5">
          <div class="text-overline text-primary">{{ scenario.systemJourney?.system ?? 'Everyday life' }} &middot; {{ scenario.roles.join(' / ') }}</div>
          <h1 class="text-h4 font-weight-bold mb-3">{{ scenario.title }}</h1>
          <p class="text-body-1 text-medium-emphasis">{{ scenario.situation }}</p>
        </header>

        <nav class="story-flow mb-5" aria-label="Story flow">
          <template v-for="(item, index) in scenes" :key="index">
            <span v-if="index" class="flow-arrow" aria-hidden="true">&rarr;</span>
            <button type="button" class="flow-node" :class="{ active: activeScene === index, visited: visited.includes(index) }"
              :aria-label="`Scene ${index + 1}: ${item.title}`" :aria-current="activeScene === index ? 'step' : undefined"
              @click="goToScene(index)">
              <span class="flow-number">{{ index + 1 }}</span>{{ item.system ?? (index === 0 ? 'Make a plan' : index === scenes.length - 1 ? 'See the result' : 'Life goes on') }}
            </button>
          </template>
        </nav>

        <v-card variant="outlined" class="scene-card">
          <v-card-text class="pa-5 pa-sm-7">
            <div :key="activeScene" aria-live="polite" aria-atomic="true">
              <div class="text-caption text-primary font-weight-bold mb-2">{{ scene.time }}</div>
              <h2 class="text-h5 font-weight-bold mb-4">{{ scene.title }}</h2>
              <p class="scene-text text-body-1">{{ scene.text }}</p>
            </div>
            <router-link v-if="scene.system && scene.lessonId" :to="`/learn/${scene.lessonId}`" class="system-link mt-4">
              <v-icon icon="mdi-open-in-new" size="16" /> How {{ scene.system }} works &amp; when it runs
            </router-link>
            <fieldset v-if="scene.choice" class="story-choice mt-6">
              <legend class="text-subtitle-1 font-weight-bold mb-3">{{ scene.choice.prompt }}</legend>
              <div class="d-flex flex-column ga-2">
                <button v-for="(option, index) in scene.choice.options" :key="option.label" type="button"
                  class="choice-button" :class="{ selected: choices[activeScene] === index }"
                  :aria-pressed="choices[activeScene] === index" @click="choices[activeScene] = index">{{ option.label }}</button>
              </div>
              <p v-if="feedback" class="choice-feedback mt-3 pa-3 rounded-lg" role="status">{{ feedback }}</p>
            </fieldset>
          </v-card-text>
        </v-card>
        <div class="scene-controls my-4">
          <v-btn variant="text" :disabled="activeScene === 0" @click="goToScene(activeScene - 1)">Back</v-btn>
          <span class="text-caption text-medium-emphasis">{{ activeScene + 1 }} / {{ scenes.length }}</span>
          <v-btn v-if="activeScene < scenes.length - 1" color="primary" :disabled="Boolean(scene.choice) && choices[activeScene] === undefined"
            append-icon="mdi-arrow-right" @click="goToScene(activeScene + 1)">Continue</v-btn>
          <v-btn v-else color="primary" :disabled="!canFinish" @click="finish">Finish story</v-btn>
        </div>
        <p v-if="activeScene === scenes.length - 1 && !canFinish" class="text-caption text-medium-emphasis">
          Visit each scene and try its choice to finish the story.
        </p>
        <section v-if="showEnding" class="story-ending pa-5 rounded-lg mt-5" aria-label="Story takeaway" aria-live="polite">
          <h2 class="text-h6 font-weight-bold mb-2">The simple takeaway</h2>
          <p class="mb-4">{{ scenario.goal }}</p>
          <v-btn :to="{ name: 'life-scenarios', params: { id: nextStory.id } }" color="primary" variant="text" append-icon="mdi-arrow-right">Next story</v-btn>
        </section>
        <v-alert v-if="saveError" type="error" variant="tonal" class="mt-4" role="alert">
          {{ saveError }} <v-btn variant="text" @click="finish">Retry saving</v-btn>
        </v-alert>

        <details :key="scenario.id" class="reference-details mt-7">
          <summary>Optional details &amp; sources</summary>
          <div class="pt-4">
            <p class="text-body-2 mb-3">{{ scenario.roleDifference }}</p>
            <p class="text-body-2 mb-3">{{ scenario.verifyCurrent }}</p>
            <details class="mb-4">
              <summary>Detailed checks &amp; alternate outcomes</summary>
              <ul class="pl-5 mt-3 text-body-2">
                <li v-for="step in scenario.steps" :key="step.title" class="mb-2">{{ step.check }}</li>
              </ul>
              <div v-for="result in scenario.outcomes" :key="result.label" class="text-body-2 mt-3">
                <strong>{{ result.label }}:</strong> {{ result.systemResult }} {{ result.nextAction }} {{ result.lifeImpact }}
              </div>
            </details>
            <div class="story-sources d-flex flex-wrap ga-2 mb-3">
              <SourceTag v-for="source in scenario.sources" :key="source.label" :source="source" />
            </div>
            <p class="text-caption text-medium-emphasis">Fictional learning examples, not AA screen replicas. Sources include the academy's 2024 CBA corpus and scheduling lessons.
              APFA links were located through public search; direct page retrieval was blocked. Check current official rules and implementation before applying them.</p>
          </div>
        </details>
      </article>
    </template>
    <v-alert v-else type="warning" variant="tonal">
      This story could not be found. <v-btn :to="{ name: 'life-scenarios' }" variant="text">Browse stories</v-btn>
    </v-alert>
  </v-container>
</template>

<style scoped>
.life-page { max-width: 1000px; }
.catalog-heading { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; }
.role-filter { flex: 0 1 230px; min-width: 200px; }
.story-card, .scene-card { border-color: #d4e0ea; background: white; }
.story-flow { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.flow-node { display: inline-flex; align-items: center; gap: 8px; padding: 9px 12px; border: 1px solid #c9d9e6; border-radius: 10px; font: inherit; font-size: .8rem; color: #003057; background: white; }
.flow-node.visited { background: #edf5fc; }
.flow-node.active { border-color: #0061ab; box-shadow: 0 0 0 1px #0061ab; }
.flow-number { display: grid; place-items: center; width: 22px; height: 22px; background: #0061ab; color: white; border-radius: 50%; }
.flow-arrow { color: #7794aa; }
.scene-text { line-height: 1.85; max-width: 760px; }
.system-link { display: inline-flex; align-items: center; gap: 6px; font-size: .85rem; color: #0061ab; }
.story-choice { border: 0; min-width: 0; }
.choice-button { text-align: left; padding: 12px 16px; border: 1px solid #c9d9e6; border-radius: 8px; background: #fff; color: #003057; font: inherit; }
.choice-button.selected { border-color: #0061ab; background: #edf5fc; }
.choice-feedback, .story-ending { background: #edf5fc; color: #003057; }
.scene-controls { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
summary { cursor: pointer; color: #0061ab; font-size: .9rem; padding: 8px 0; }
.reference-details { border-top: 1px solid #d4e0ea; }
.story-sources :deep(.v-chip) { max-width: 100%; height: auto; min-height: 20px; }
.story-sources :deep(.v-chip__content) { white-space: normal; overflow-wrap: anywhere; }
button:focus-visible, summary:focus-visible { outline: 3px solid #b75c09; outline-offset: 3px; }
@media (max-width: 450px) { .flow-arrow { display: none; } .flow-node { padding: 7px 9px; } }
</style>
