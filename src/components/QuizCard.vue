<script setup lang="ts">
import { computed, ref } from 'vue'
import type { QuizQuestion } from '../data/types'

const props = defineProps<{
  moduleId: string
  questions: QuizQuestion[]
}>()

const emit = defineEmits<{ (e: 'completed', percent: number): void }>()

const current = ref(0)
const selected = ref<number | null>(null)
const answered = ref<boolean[]>([])
const finished = ref(false)

const q = computed(() => props.questions[current.value])
const isLast = computed(() => current.value === props.questions.length - 1)
const score = computed(() => answered.value.filter(Boolean).length)

function submit() {
  if (selected.value === null) return
  answered.value[current.value] = selected.value === q.value.answerIndex
  if (isLast.value) {
    finished.value = true
    emit('completed', Math.round((score.value / props.questions.length) * 100))
  } else {
    current.value++
    selected.value = null
  }
}

function restart() {
  current.value = 0
  selected.value = null
  answered.value = []
  finished.value = false
}
</script>

<template>
  <v-card color="surface" variant="elevated" class="mt-4">
    <v-toolbar density="compact" color="primary">
      <v-toolbar-title class="text-subtitle-1">
        <v-icon icon="mdi-help-circle-outline" class="mr-2" />
        Knowledge Check · {{ questions.length }} questions
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text v-if="!finished">
      <div class="text-caption text-medium-emphasis mb-1">
        Question {{ current + 1 }} of {{ questions.length }}
      </div>
      <h3 class="text-h6 mb-3">{{ q.question }}</h3>
      <v-radio-group v-model="selected">
        <v-radio
          v-for="(opt, i) in q.options"
          :key="i"
          :value="i"
          :label="opt"
          hide-details
          density="comfortable"
        />
      </v-radio-group>
      <div class="d-flex justify-end mt-2">
        <v-btn color="primary" :disabled="selected === null" @click="submit">
          {{ isLast ? 'Finish' : 'Next' }}
          <v-icon end icon="mdi-arrow-right" />
        </v-btn>
      </div>
    </v-card-text>

    <v-card-text v-else>
      <div class="text-center py-4">
        <div class="text-h3 font-weight-bold mb-2">{{ Math.round((score / questions.length) * 100) }}%</div>
        <div class="text-body-1 mb-4">You answered {{ score }} of {{ questions.length }} correctly</div>
        <div v-for="(a, i) in answered" :key="i" class="text-left mb-2 d-flex align-start">
          <v-icon
            :icon="a ? 'mdi-check-circle' : 'mdi-close-circle'"
            :color="a ? 'success' : 'error'"
            class="mr-2 mt-1"
          />
          <div>
            <strong>{{ questions[i].question }}</strong><br />
            <span class="text-medium-emphasis">{{ questions[i].explanation }}</span>
          </div>
        </div>
        <v-btn class="mt-4" variant="tonal" color="primary" prepend-icon="mdi-refresh" @click="restart">
          Retake quiz
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
