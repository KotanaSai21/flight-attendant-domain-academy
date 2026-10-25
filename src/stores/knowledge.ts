import { defineStore } from 'pinia'
import Fuse, { type IFuseOptions } from 'fuse.js'
import { dictionary } from '../data/dictionary'
import { modules } from '../data/modules'
import { scenarios } from '../data/scenarios'
import { lifeScenarios } from '../data/lifeScenarios'
import { monthlyPersonas } from '../data/monthlyStory'
import { septemberMilestones, systemTimings } from '../data/schedulingCalendar'
import type { AcademyModule, DictionaryTerm, Scenario } from '../data/types'

export interface SearchHit {
  kind: 'term' | 'module' | 'scenario' | 'life-scenario' | 'month-story' | 'scheduling-calendar'
  id: string
  title: string
  subtitle: string
  score: number
}

const opts: IFuseOptions<unknown> = {
  includeScore: true,
  threshold: 0.42,
  ignoreLocation: true,
  keys: [],
}

interface Doc {
  kind: SearchHit['kind']
  id: string
  title: string
  subtitle: string
  body: string
}

export const useKnowledgeStore = defineStore('knowledge', {
  state: () => ({
    docs: buildDocs(),
    fuse: new Fuse<Doc>(buildDocs(), { ...opts, keys: ['title', 'subtitle', 'body'] }),
  }),
  getters: {
    termById: () => (id: string) => dictionary.find((t) => t.id === id),
    relatedTerms: () => (termId: string): DictionaryTerm[] => {
      const t = dictionary.find((x) => x.id === termId)
      if (!t) return []
      return t.related.map((id) => dictionary.find((x) => x.id === id)).filter(
        (x): x is DictionaryTerm => Boolean(x),
      )
    },
    moduleById: () => (id: string) => modules.find((m) => m.id === id),
  },
  actions: {
    search(query: string): SearchHit[] {
      if (!query.trim()) return []
      const results = this.fuse.search(query.trim(), { limit: 25 })
      return results.map((r) => ({
        kind: r.item.kind,
        id: r.item.id,
        title: r.item.title,
        subtitle: r.item.subtitle,
        score: r.score ?? 1,
      }))
    },
    suggestNext(currentModuleId: string): AcademyModule[] {
      return modules.filter((m) => m.id !== currentModuleId).slice(0, 3)
    },
  },
})

function buildDocs(): Doc[] {
  const docs: Doc[] = [{
    kind: 'month-story',
    id: 'monthly-life',
    title: 'A month with Maya and Jordan',
    subtitle: 'A Day in the Life · Interactive monthly calendar · Lineholder and Reserve',
    body: monthlyPersonas.map((person) => [
      person.name, person.role, person.intro, person.home,
      ...person.chapters.map((chapter) => [
        chapter.title, chapter.text, ...(chapter.systems ?? []).map((system) => system.name),
        ...(chapter.branches ?? []).map((branch) => branch.text),
      ].join(' ')),
    ].join(' ')).join(' '),
  }]
  docs.push({
    kind: 'scheduling-calendar',
    id: 'scheduling-calendar',
    title: 'Scheduling Calendar',
    subtitle: 'September builds October · Two-month systems calendar · Lineholder and Reserve',
    body: septemberMilestones.map((step) => [step.label, step.detail].join(' ')).join(' ') +
      ' Interactive scenarios update October training, trips and reserve duty. System Timings: ' +
      systemTimings.map((system) => [system.system, system.starts, system.ends, system.does, system.result, system.doesNot,
        ...system.scenario.steps.map((step) => step.text), system.scenario.takeaway].join(' ')).join(' '),
  })
  for (const t of dictionary) {
    docs.push({
      kind: 'term',
      id: t.id,
      title: t.shortName ? `${t.term} (${t.shortName})` : t.term,
      subtitle: `Dictionary · ${t.category}`,
      body: [t.definition, t.businessPurpose, t.example, t.whereUsed.join(' ')].join(' '),
    })
  }
  for (const m of modules) {
    const sectionText = (m.sections ?? []).map((s) => s.body).join(' ').replace(/```[\s\S]*?```/g, '')
    const blockText = (m.blocks ?? [])
      .map((b) => [b.title, b.text, b.body, b.caption, ...(b.items ?? []).flatMap((i) => [i.term, i.definition, i.label, i.detail, ...(i.points ?? [])])].filter(Boolean).join(' '))
      .join(' ')
    docs.push({
      kind: 'module',
      id: m.id,
      title: `Module ${m.number}: ${m.title}`,
      subtitle: `Learning Center · ${m.tagline}`,
      body: `${sectionText} ${blockText}`,
    })
  }
  for (const s of scenarios) {
    docs.push({
      kind: 'scenario',
      id: s.id,
      title: s.title,
      subtitle: `Simulator · ${s.audience}`,
      body: [s.prompt, ...s.steps.map((st) => `${st.title} ${st.detail}`)].join(' '),
    })
  }
  for (const s of lifeScenarios) {
    docs.push({
      kind: 'life-scenario',
      id: s.id,
      title: s.title,
      subtitle: `A Day in the Life · ${s.systemJourney ? `${s.systemJourney.system} system journey · ` : ''}${s.roles.join(' / ')} · ${s.person}`,
      body: [
        s.situation, s.goal, s.startingConditions, ...s.systems,
        s.systemJourney?.learningGoal, s.systemJourney?.timing,
        ...s.steps.map((step) => `${step.time} ${step.title} ${step.action} ${step.check} ${step.systemState ?? ''}`),
        ...s.outcomes.map((outcome) => `${outcome.label} ${outcome.systemResult} ${outcome.nextAction} ${outcome.lifeImpact}`),
        ...(s.storyScenes ?? []).map((scene) => [scene.text, scene.system, scene.choice?.prompt, ...(scene.choice?.options.map((option) => `${option.label} ${option.reply}`) ?? [])].join(' ')),
        s.roleDifference, s.question?.question, s.question?.explanation,
      ].join(' '),
    })
  }
  return docs
}

export type { Scenario }
