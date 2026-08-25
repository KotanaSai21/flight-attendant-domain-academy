import { defineStore } from 'pinia'
import Fuse, { type IFuseOptions } from 'fuse.js'
import { dictionary } from '../data/dictionary'
import { modules } from '../data/modules'
import { scenarios } from '../data/scenarios'
import type { AcademyModule, DictionaryTerm, Scenario } from '../data/types'

export interface SearchHit {
  kind: 'term' | 'module' | 'scenario'
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
  kind: 'term' | 'module' | 'scenario'
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
  const docs: Doc[] = []
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
  return docs
}

export type { Scenario }
