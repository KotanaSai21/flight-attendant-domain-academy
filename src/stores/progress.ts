import { defineStore } from 'pinia'

const STORAGE_KEY = 'fada-progress-v1'

interface ProgressState {
  completedSections: Record<string, boolean> // `${moduleId}:${sectionKey}`
  quizScores: Record<string, number> // moduleId -> percent
}

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as ProgressState
  } catch {
    /* corrupted storage falls through */
  }
  return { completedSections: {}, quizScores: {} }
}

export const useProgressStore = defineStore('progress', {
  state: (): ProgressState => load(),
  getters: {
    isSectionDone: (state) => (moduleId: string, key: string) =>
      Boolean(state.completedSections[`${moduleId}:${key}`]),
    moduleProgress(state) {
      return (moduleId: string, sectionCount: number): number => {
        const done = Object.keys(state.completedSections).filter((k) =>
          k.startsWith(`${moduleId}:`),
        ).length
        return sectionCount === 0 ? 0 : Math.round((done / sectionCount) * 100)
      }
    },
    overallProgress(): number {
      const scores = Object.values(this.quizScores)
      const avgQuiz = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
      return Math.round(avgQuiz)
    },
    readinessByDomain: (state) => {
      // Map modules to 6 domains for the radar chart
      void state
      return null
    },
  },
  actions: {
    toggleSection(moduleId: string, key: string) {
      const id = `${moduleId}:${key}`
      if (this.completedSections[id]) delete this.completedSections[id]
      else this.completedSections[id] = true
      this.persist()
    },
    setQuizScore(moduleId: string, percent: number) {
      const prev = this.quizScores[moduleId] ?? -1
      this.quizScores[moduleId] = Math.max(prev, percent)
      this.persist()
    },
    persist() {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          completedSections: this.completedSections,
          quizScores: this.quizScores,
        }),
      )
    },
  },
})
