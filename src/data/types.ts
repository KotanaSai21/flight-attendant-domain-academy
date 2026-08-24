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

export interface AcademyModule {
  id: string
  number: number
  title: string
  icon: string
  color: string
  tagline: string
  estimatedMinutes: number
  sections: ModuleSection[]
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
