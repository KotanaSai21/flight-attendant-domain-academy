import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const ts = require('typescript')
const scriptDir = dirname(fileURLToPath(import.meta.url))

function loadPureDataModule(relativePath) {
  const sourcePath = resolve(scriptDir, relativePath)
  const source = readFileSync(sourcePath, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: sourcePath,
  }).outputText
  const moduleRecord = { exports: {} }
  const loadModule = new Function('exports', 'require', 'module', '__filename', '__dirname', compiled)
  loadModule(moduleRecord.exports, require, moduleRecord, sourcePath, dirname(sourcePath))
  return moduleRecord.exports
}

const { dictionary } = loadPureDataModule('../src/data/dictionary.ts')
const { scenarios } = loadPureDataModule('../src/data/scenarios.ts')
const errors = []
const ids = new Set()
const requiredTextFields = [
  'id',
  'term',
  'category',
  'definition',
  'businessPurpose',
  'whyItMatters',
  'example',
  'developerRelevance',
]

for (const [index, term] of dictionary.entries()) {
  const label = term.id || `entry ${index + 1}`
  if (ids.has(term.id)) errors.push(`${label}: duplicate id`)
  ids.add(term.id)

  for (const field of requiredTextFields) {
    if (typeof term[field] !== 'string' || !term[field].trim()) {
      errors.push(`${label}: missing ${field}`)
    }
  }
  if (!Array.isArray(term.whereUsed) || term.whereUsed.length === 0) {
    errors.push(`${label}: whereUsed must contain at least one context`)
  }
  if (!Array.isArray(term.related)) errors.push(`${label}: related must be an array`)
  if (!term.source?.kind || !term.source?.label) errors.push(`${label}: missing source metadata`)
}

for (const term of dictionary) {
  for (const relatedId of term.related) {
    if (!ids.has(relatedId)) errors.push(`${term.id}: related term '${relatedId}' does not exist`)
    if (relatedId === term.id) errors.push(`${term.id}: cannot relate to itself`)
  }
}

const scenarioIds = new Set()
for (const [index, scenario] of scenarios.entries()) {
  const label = scenario.id || `scenario ${index + 1}`
  if (scenarioIds.has(scenario.id)) errors.push(`${label}: duplicate scenario id`)
  scenarioIds.add(scenario.id)
  for (const field of ['id', 'title', 'prompt', 'audience', 'outcome']) {
    if (typeof scenario[field] !== 'string' || !scenario[field].trim()) errors.push(`${label}: missing ${field}`)
  }
  if (!Array.isArray(scenario.steps) || scenario.steps.length < 2) errors.push(`${label}: must contain at least two steps`)
  for (const [stepIndex, step] of (scenario.steps ?? []).entries()) {
    if (!step.title?.trim() || !step.detail?.trim()) errors.push(`${label}: incomplete step ${stepIndex + 1}`)
  }
  for (const relatedId of scenario.relatedTerms ?? []) {
    if (!ids.has(relatedId)) errors.push(`${label}: related term '${relatedId}' does not exist`)
  }
  const decision = scenario.decision
  if (!decision?.prompt?.trim() || !decision?.explanation?.trim()) errors.push(`${label}: missing decision content`)
  if (!Array.isArray(decision?.options) || decision.options.length < 2) errors.push(`${label}: decision must contain at least two options`)
  if (!Number.isInteger(decision?.answerIndex) || decision.answerIndex < 0 || decision.answerIndex >= decision.options.length) {
    errors.push(`${label}: decision answerIndex is invalid`)
  }
  for (const [optionIndex, option] of (decision?.options ?? []).entries()) {
    if (!option.label?.trim() || !option.detail?.trim()) errors.push(`${label}: incomplete decision option ${optionIndex + 1}`)
  }
  if (!scenario.source?.kind || !scenario.source?.label) errors.push(`${label}: missing source metadata`)
}

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} issue(s):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Content validation passed: ${dictionary.length} terms and ${scenarios.length} interactive scenarios are complete and connected.`)
