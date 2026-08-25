export type SourceKind = 'contract' | 'apfa' | 'loa' | 'system'

export interface KnowledgeSource {
  kind: SourceKind
  label: string
  reference?: string
}

export interface DictionaryTerm {
  id: string
  term: string
  shortName?: string
  category: string
  definition: string
  businessPurpose: string
  whyItMatters: string
  whereUsed: string[]
  example: string
  related: string[]
  developerRelevance: string
  source: KnowledgeSource
}

export interface QuizQuestion {
  question: string
  options: string[]
  answerIndex: number
  explanation: string
}

export interface ModuleSection {
  key:
    | 'overview'
    | 'why'
    | 'process'
    | 'system'
    | 'data'
    | 'developer'
    | 'examples'
  title: string
  body: string // markdown; ```mermaid blocks supported
}

/** Loose-typed content block for free-form, interactive modules */
export interface ContentBlock {
  kind: 'hero' | 'header' | 'prose' | 'callout' | 'diagram' | 'terms' | 'flow' | 'steps' | 'compare' | 'illustration'
  title?: string
  text?: string
  body?: string // markdown
  code?: string // mermaid
  caption?: string
  tone?: 'info' | 'success' | 'warning' | 'error' | 'primary'
  icon?: string
  color?: string
  variant?: 'airport' | 'cabin' | 'network' | 'aircraft'
  items?: Array<{
    term?: string
    definition?: string
    id?: string // dictionary term id for deep-linking
    icon?: string
    label?: string
    detail?: string
    title?: string
    points?: string[]
    day?: string
    time?: string
    color?: string
  }>
}

export interface AcademyModule {
  id: string
  number: number
  title: string
  icon: string
  color: string
  tagline: string
  estimatedMinutes: number
  sections?: ModuleSection[]
  blocks?: ContentBlock[]
  quiz: QuizQuestion[]
  terms: string[] // dictionary term ids
  developerView?: {
    business: string
    systems: string[]
    inputs: string[]
    outputs: string[]
    technical: string
  }
}

export interface ScenarioStep {
  title: string
  detail: string
}

export interface Scenario {
  id: string
  icon: string
  title: string
  prompt: string
  audience: string
  steps: ScenarioStep[]
  outcome: string
  relatedTerms: string[]
  source: KnowledgeSource
}
