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
  const loadDependency = (id) => id.startsWith('.')
    ? loadPureDataModule(resolve(dirname(sourcePath), `${id}.ts`))
    : require(id)
  loadModule(moduleRecord.exports, loadDependency, moduleRecord, sourcePath, dirname(sourcePath))
  return moduleRecord.exports
}

const { dictionary } = loadPureDataModule('../src/data/dictionary.ts')
const { scenarios } = loadPureDataModule('../src/data/scenarios.ts')
const { lifeScenarios } = loadPureDataModule('../src/data/lifeScenarios.ts')
const { modules } = loadPureDataModule('../src/data/modules.ts')
const { monthlyPersonas, monthSnapshot, eventsForDay, chapterForEvents, scenarioEntryIndex } = loadPureDataModule('../src/data/monthlyStory.ts')
const { septemberMilestones, systemTimings, systemGuide, rotaSequences, calendarSnapshot, applicationFor, calendarReferences } = loadPureDataModule('../src/data/schedulingCalendar.ts')
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

const moduleIds = new Set(modules.map((module) => module.id))
const coveredModules = new Set()
const lifeIds = new Set()
const systemNames = ['TBS', 'LRD', 'PBS', 'GDFD', 'RTDO', 'TTS', 'ETB', 'UBL', 'Red Flag', 'ROTA', 'ROTD', 'Aggressive Reserve']
for (const [index, scenario] of lifeScenarios.entries()) {
  const label = scenario.id || `life scenario ${index + 1}`
  if (lifeIds.has(scenario.id)) errors.push(`${label}: duplicate life scenario id`)
  lifeIds.add(scenario.id)
  for (const field of ['id', 'title', 'icon', 'person', 'situation', 'goal', 'startingConditions', 'roleDifference', 'verifyCurrent']) {
    if (typeof scenario[field] !== 'string' || !scenario[field].trim()) errors.push(`${label}: missing ${field}`)
  }
  if (!scenario.roles?.length || scenario.roles.some((role) => !['Lineholder', 'Reserve'].includes(role))) {
    errors.push(`${label}: must identify valid flight attendant roles`)
  }
  if (!scenario.systems?.length || scenario.systems.some((system) => !system.trim())) errors.push(`${label}: missing systems`)
  let hasChoice = false
  if (scenario.systemJourney) {
    if (!systemNames.includes(scenario.systemJourney.system)) errors.push(`${label}: invalid journey system`)
    for (const field of ['learningGoal', 'timing']) {
      if (!scenario.systemJourney[field]?.trim()) errors.push(`${label}: missing system journey ${field}`)
    }
    if ((scenario.storyScenes?.length ?? 0) < 3 || scenario.storyScenes.length > 4) errors.push(`${label}: needs three or four simple story scenes`)
    let hasSystemLink = false
    for (const [sceneIndex, scene] of (scenario.storyScenes ?? []).entries()) {
      for (const field of ['time', 'title', 'text']) {
        if (!scene[field]?.trim()) errors.push(`${label}: scene ${sceneIndex + 1} missing ${field}`)
      }
      if ((scene.text?.trim().split(/\s+/).length ?? 0) > 90) errors.push(`${label}: scene ${sceneIndex + 1} exceeds 90 words`)
      if (scene.system) {
        hasSystemLink = true
        if (!moduleIds.has(scene.lessonId)) errors.push(`${label}: scene system must link to an existing lesson`)
      }
      if (scene.choice) {
        hasChoice = true
        if (!scene.choice.prompt?.trim() || (scene.choice.options?.length ?? 0) < 2) errors.push(`${label}: incomplete scene choice`)
        for (const option of scene.choice.options ?? []) {
          if (!option.label?.trim() || !option.reply?.trim()) errors.push(`${label}: choice needs a label and feedback`)
        }
      }
    }
    if (scenario.systemJourney && (!hasSystemLink || !hasChoice)) errors.push(`${label}: simple story needs a linked system scene and an interactive choice`)
  }
  if (!Array.isArray(scenario.steps) || scenario.steps.length < 3) errors.push(`${label}: must trace at least three steps`)
  for (const [stepIndex, step] of (scenario.steps ?? []).entries()) {
    if (scenario.systemJourney && !step.systemState?.trim()) errors.push(`${label}: step ${stepIndex + 1} missing system state`)
    for (const field of ['time', 'title', 'action', 'check']) {
      if (!step[field]?.trim()) errors.push(`${label}: step ${stepIndex + 1} missing ${field}`)
    }
  }
  const statuses = new Set((scenario.outcomes ?? []).map((outcome) => outcome.status))
  for (const status of ['success', 'pending', 'warning']) {
    if (!statuses.has(status)) errors.push(`${label}: missing ${status} outcome`)
  }
  for (const [outcomeIndex, outcome] of (scenario.outcomes ?? []).entries()) {
    for (const field of ['label', 'systemResult', 'nextAction', 'lifeImpact']) {
      if (!outcome[field]?.trim()) errors.push(`${label}: outcome ${outcomeIndex + 1} missing ${field}`)
    }
    if (!['success', 'pending', 'warning'].includes(outcome.status)) errors.push(`${label}: invalid outcome status`)
  }
  if (!scenario.lessonIds?.length) errors.push(`${label}: must connect to existing lessons`)
  for (const id of scenario.lessonIds ?? []) {
    if (!moduleIds.has(id)) errors.push(`${label}: lesson '${id}' does not exist`)
    coveredModules.add(id)
  }
  if (!scenario.relatedTerms?.length) errors.push(`${label}: must connect to dictionary terms`)
  for (const id of scenario.relatedTerms ?? []) {
    if (!ids.has(id)) errors.push(`${label}: related term '${id}' does not exist`)
  }
  if (!scenario.sources?.length) errors.push(`${label}: missing sources`)
  for (const source of scenario.sources ?? []) {
    if (!source.kind || !source.label?.trim()) errors.push(`${label}: incomplete source`)
    if (source.kind === 'apfa' && !source.url?.startsWith('https://www.apfa.org/')) errors.push(`${label}: APFA source must link to APFA`)
    if (source.kind === 'contract' && !source.reference?.trim()) errors.push(`${label}: contract source needs a reference`)
  }
  const question = scenario.question
  if (!question && !hasChoice) errors.push(`${label}: missing interactive choice or decision check`)
  if (question && (!question.question?.trim() || !question.explanation?.trim())) errors.push(`${label}: incomplete decision check`)
  if (question && (!Array.isArray(question.options) || question.options.length < 2 || question.options.some((option) => !option.trim()))) {
    errors.push(`${label}: decision must offer at least two complete options`)
  }
  if (question && (!Number.isInteger(question.answerIndex) || question.answerIndex < 0 || question.answerIndex >= (question.options?.length ?? 0))) {
    errors.push(`${label}: decision answerIndex is invalid`)
  }
}
for (const id of moduleIds) {
  if (!coveredModules.has(id)) errors.push(`Life scenarios: existing module '${id}' has no connected story`)
}
for (const role of ['Lineholder', 'Reserve']) {
  if (!lifeScenarios.some((scenario) => scenario.roles.includes(role))) errors.push(`Life scenarios: missing ${role} coverage`)
}
for (const system of systemNames) {
  if (!lifeScenarios.some((scenario) => scenario.systemJourney?.system === system)) errors.push(`System journeys: missing ${system}`)
}
for (const id of ['school-pickup', 'reserve-childcare', 'extra-income', 'family-graduation', 'plan-next-month', 'commute-international', 'disrupted-homecoming', 'cq-appointment', 'new-base-new-routine']) {
  if (!lifeScenarios.some((scenario) => scenario.id === id && !scenario.systemJourney)) errors.push(`Original life situation '${id}' must remain available`)
}

const monthlySystems = new Set()
function checkMonth(condition, message) {
  if (!condition) errors.push(`Monthly story: ${message}`)
}
function validateEvents(events, label) {
  for (const event of events ?? []) {
    checkMonth(event.id?.trim() && event.label?.trim() && event.detail?.trim(), `${label}: incomplete calendar event`)
    checkMonth(Number.isInteger(event.start) && Number.isInteger(event.end) &&
      event.start >= 1 && event.end >= event.start && event.end <= 31, `${label}: event dates outside October`)
    checkMonth(['flying', 'reserve', 'training', 'personal', 'request', 'off'].includes(event.kind), `${label}: invalid event kind`)
  }
}
for (const person of monthlyPersonas) {
  const previousChapters = new Map()
  let lastDay = 0
  validateEvents(person.initialEvents, person.id)
  for (const chapter of person.chapters) {
    checkMonth(!previousChapters.has(chapter.id), `${person.id}: duplicate chapter ${chapter.id}`)
    for (const field of ['date', 'title', 'text']) checkMonth(chapter[field]?.trim(), `${chapter.id}: missing ${field}`)
    if (chapter.day !== undefined) {
      checkMonth(chapter.day >= lastDay && chapter.day <= 31, `${chapter.id}: story dates go backward or out of month`)
      lastDay = chapter.day
    }
    validateEvents(chapter.change?.add, chapter.id)
    for (const system of chapter.systems ?? []) {
      monthlySystems.add(system.name)
      checkMonth(moduleIds.has(system.lessonId), `${chapter.id}: system link must reach an existing lesson`)
    }
    if (chapter.choice) {
      checkMonth(chapter.choice.options.length >= 2 && chapter.choice.prompt?.trim(), `${chapter.id}: incomplete choice`)
      const optionIds = new Set()
      for (const option of chapter.choice.options) {
        checkMonth(option.id?.trim() && option.label?.trim() && option.reply?.trim(), `${chapter.id}: incomplete choice option`)
        checkMonth(!optionIds.has(option.id), `${chapter.id}: duplicate choice option`)
        optionIds.add(option.id)
        validateEvents(option.change?.add, chapter.id)
      }
    }
    for (const branch of chapter.branches ?? []) {
      checkMonth(previousChapters.get(branch.from)?.choice?.options.some((option) => option.id === branch.option),
        `${chapter.id}: branch must reference a valid earlier choice`)
      checkMonth(branch.text?.trim(), `${chapter.id}: empty branch narrative`)
      validateEvents(branch.change?.add, chapter.id)
    }
    for (const prerequisite of chapter.requiresChoices ?? []) {
      checkMonth(Boolean(previousChapters.get(prerequisite)?.choice),
        `${chapter.id}: outcome prerequisites must reference earlier decisions`)
    }
    if (chapter.requiresEvent) {
      checkMonth(chapter.requiresEvent.id?.trim() && chapter.requiresEvent.otherwise?.trim(),
        `${chapter.id}: a conditional chapter needs an event and an explanation when it does not apply`)
    }
    previousChapters.set(chapter.id, chapter)
  }
  checkMonth(person.chapters.at(-1).day === 31, `${person.id}: narrative must reach month end`)
}
const calendarSystemNames = systemNames.map((name) => (name === 'RTDO' ? 'TTS (October)' : name))
for (const system of calendarSystemNames) checkMonth(monthlySystems.has(system), `missing ${system} from the continuous month`)

const maya = monthlyPersonas.find((person) => person.id === 'maya')
const jordan = monthlyPersonas.find((person) => person.id === 'jordan')
checkMonth(maya.home.includes('school-age son'), 'Maya must introduce Leo as her child')
const missedReport = maya.chapters.find((chapter) => chapter.id === 'birthday-delay')
checkMonth(missedReport.text.includes('Crew Scheduling/Tracking') &&
  missedReport.text.includes('not a TTS drop or an automatic day off') &&
  missedReport.timing.includes('attendance review') &&
  missedReport.text.includes('confirms revised duty instructions'),
  'missed-report scene must explain contact, confirmed next steps and circumstance-dependent consequences')
const moment = (person, id, choices = {}) => monthSnapshot(person, person.chapters.findIndex((chapter) => chapter.id === id), choices)
const hasEvent = (state, id) => state.events.some((event) => event.id === id)
checkMonth(!moment(maya, 'kitchen-table').published && !hasEvent(moment(maya, 'kitchen-table'), 'bos'),
  'future flying must not leak into the pre-award calendar')
checkMonth(moment(maya, 'month-award').published && hasEvent(moment(maya, 'month-award'), 'bos'),
  'publishing the award must add the actual trip')
for (const person of monthlyPersonas) {
  const firstOctober = person.chapters.findIndex((chapter) => chapter.day !== undefined)
  const octoberStart = monthSnapshot(person, firstOctober, {})
  checkMonth(person.chapters[firstOctober].day === 1 && octoberStart.published,
    `${person.id}: October 1 must start with the line already awarded in September`)
  checkMonth(octoberStart.events.some((event) => event.kind === (person.role === 'Lineholder' ? 'flying' : 'reserve')),
    `${person.id}: October 1 must show awarded trips or reserve obligations`)
}
const requestedTrade = moment(maya, 'trade-choice', { 'trade-choice': 'trade' })
checkMonth(hasEvent(requestedTrade, 'bos') && hasEvent(requestedTrade, 'trade-request') && !hasEvent(requestedTrade, 'replacement'),
  'saving a trade must keep original duty and show only a pending request')
const awardedTrade = moment(maya, 'trade-result', { 'trade-choice': 'trade' })
checkMonth(!hasEvent(awardedTrade, 'bos') && !hasEvent(awardedTrade, 'trade-request') &&
  hasEvent(awardedTrade, 'replacement') && hasEvent(awardedTrade, 'school'),
  'trade award must replace flying without erasing the personal event')
checkMonth(hasEvent(moment(maya, 'trade-result', { 'trade-choice': 'keep' }), 'bos'),
  'keeping the trip must not inherit the awarded-trade branch')
checkMonth(eventsForDay(moment(maya, 'birthday-delay', { 'repair-bill': 'home' }).events, 22)
  .some((event) => event.id === 'delay' && event.kind === 'flying'),
  'missed report must retain revised duty rather than silently create a day off')
checkMonth(eventsForDay(moment(maya, 'deadhead').events, 22)
  .some((event) => event.id === 'deadhead-home' && event.kind === 'flying'),
  'a confirmed deadhead must appear on the calendar rather than only in the narrative')
for (const dropChoices of [
  { 'drop-day-before': 'etb-day-before' },
  { 'drop-day-before': 'ubl-day-before' },
  { 'drop-day-before': 'keep-mia', 'same-day-drop': 'etb-same-day' },
]) {
  for (const pickup of ['home', 'pickup']) {
    const choices = { ...dropChoices, 'repair-bill': pickup }
    const afterMissedReport = moment(maya, 'birthday-delay', choices)
    checkMonth(!hasEvent(afterMissedReport, 'mia') && !hasEvent(afterMissedReport, 'delay') &&
      eventsForDay(afterMissedReport.events, 22).every((event) => event.kind === 'personal'),
      'a confirmed UBL/ETB drop must not recreate MIA flying or recovery duty on October 22')
    for (const id of ['birthday-delay', 'deadhead']) {
      const index = maya.chapters.findIndex((chapter) => chapter.id === id)
      const visible = chapterForEvents(maya.chapters[index], monthSnapshot(maya, index - 1, choices).events)
      checkMonth(visible.text === maya.chapters[index].requiresEvent.otherwise &&
        !visible.choice && !visible.change && !visible.branches.length && !visible.message,
        `${id}: released sequences must suppress the inapplicable narrative and changes`)
    }
    checkMonth(hasEvent(moment(maya, 'near-term-result', choices), 'premium-trip') === (pickup === 'pickup'),
      'dropping MIA must not erase or award an unrelated October 24 pickup request')
    checkMonth(!hasEvent(moment(maya, 'deadhead', choices), 'deadhead-home'),
      'a dropped MIA sequence must not gain a deadhead assignment')
  }
}
const sameDayDropIndex = maya.chapters.findIndex((chapter) => chapter.id === 'same-day-drop')
checkMonth(!chapterForEvents(maya.chapters[sameDayDropIndex],
  monthSnapshot(maya, sameDayDropIndex - 1, { 'drop-day-before': 'etb-day-before' }).events).choice,
  'same-day drop is inapplicable after a confirmed day-before drop')
checkMonth(Boolean(chapterForEvents(maya.chapters[sameDayDropIndex],
  monthSnapshot(maya, sameDayDropIndex - 1, { 'same-day-drop': 'etb-same-day' }).events).choice),
  'the same-day choice must remain visible after selecting it; applicability uses the entering state')
for (const person of monthlyPersonas) {
  for (const [index, chapter] of person.chapters.entries()) {
    if (!chapter.requiresChoices?.length) continue
    const firstPrerequisite = person.chapters.findIndex((item) => chapter.requiresChoices.includes(item.id))
    checkMonth(scenarioEntryIndex(person, index, {}) === firstPrerequisite,
      `${person.id}/${chapter.id}: a fresh outcome selection must open its prerequisite decision`)
    const choices = Object.fromEntries(chapter.requiresChoices.map((id) => [id,
      person.chapters.find((item) => item.id === id).choice.options[0].id]))
    const choicesBefore = JSON.stringify(choices)
    const stateBefore = monthSnapshot(person, index, choices)
    const selectedIndex = scenarioEntryIndex(person, index, choices)
    checkMonth(selectedIndex === index && JSON.stringify(choices) === choicesBefore &&
      JSON.stringify(monthSnapshot(person, selectedIndex, choices)) === JSON.stringify(stateBefore),
      `${person.id}/${chapter.id}: selecting a completed outcome must preserve choices and its calendar`)
  }
}
checkMonth(scenarioEntryIndex(maya, -1, {}) === -1 && scenarioEntryIndex(maya, maya.chapters.length, {}) === -1,
  'scenario navigation must reject indices outside the story')
checkMonth(!hasEvent(moment(maya, 'first-trip', { 'trade-choice': 'trade', 'repair-bill': 'pickup' }), 'premium-trip'),
  'future choices must not affect an earlier story snapshot')
checkMonth(!hasEvent(moment(maya, 'month-close', { 'repair-bill': 'home' }), 'premium-trip') &&
  hasEvent(moment(maya, 'month-close', { 'repair-bill': 'pickup' }), 'premium-trip'),
  'extra-income decision must change the actual calendar')
const mayaPendingPickup = moment(maya, 'birthday-delay', { 'repair-bill': 'pickup' })
checkMonth(hasEvent(mayaPendingPickup, 'premium-request') && !hasEvent(mayaPendingPickup, 'premium-trip') &&
  missedReport.branches.find((branch) => branch.option === 'pickup').text.includes('not on UBL yet'),
  'October 22 pickup must remain pending for TTS, not appear as an early UBL request or award')
const nearTermPickup = maya.chapters.find((chapter) => chapter.id === 'near-term-result')
checkMonth(!/her (near-term )?pickup request/i.test(nearTermPickup.text),
  'the shared pickup-result introduction must also make sense when no pickup was requested')
checkMonth(nearTermPickup.branches.find((branch) => branch.option === 'pickup').text.includes('On October 23') &&
  nearTermPickup.branches.find((branch) => branch.option === 'pickup').text.includes('elected participation'),
  'Maya must enter UBL on the eligible date with participation elected')
const pendingOff = moment(jordan, 'appointment-request', { 'appointment-request': 'request' })
checkMonth(eventsForDay(pendingOff.events, 19).some((event) => event.kind === 'reserve') &&
  hasEvent(pendingOff, 'rtdo-request'), 'RTDO request must not prematurely release reserve duty')
const awardedOff = moment(jordan, 'appointment-result', { 'appointment-request': 'request' })
checkMonth(eventsForDay(awardedOff.events, 19).some((event) => event.id === 'swapped-off') &&
  !eventsForDay(awardedOff.events, 19).some((event) => event.kind === 'reserve') &&
  eventsForDay(awardedOff.events, 25).some((event) => event.id === 'swapped-duty'),
  'RTDO outcome must update both the new day off and the exchanged duty date')
for (const [day, designation] of [[17, 'Flex'], [18, 'Golden'], [19, 'Golden']]) {
  checkMonth(eventsForDay(awardedOff.events, day).some((event) => event.kind === 'off' && event.label.startsWith(designation)),
    `day-off trade: October ${day} must be ${designation} so Flex precedes Golden`)
}
for (const state of [moment(jordan, 'day-designations'), awardedOff]) {
  const offDays = Array.from({ length: 31 }, (_, index) => eventsForDay(state.events, index + 1))
    .flat().filter((event) => event.kind === 'off')
  checkMonth(offDays.filter((event) => event.label.startsWith('Golden')).length === 8 &&
    offDays.filter((event) => event.label.startsWith('Flex')).length === 4,
    'day-off trade must preserve eight Golden and four Flex Days')
}
const unchangedOff = moment(jordan, 'appointment-result', { 'appointment-request': 'reschedule' })
checkMonth(eventsForDay(unchangedOff.events, 17).some((event) => event.label === 'Golden') &&
  eventsForDay(unchangedOff.events, 19).some((event) => event.kind === 'reserve') &&
  eventsForDay(unchangedOff.events, 25).some((event) => event.label === 'Flex'),
  'declining the day-off trade must retain the original designations and duty')
const reservePickup = jordan.chapters.find((chapter) => chapter.id === 'extra-income').choice.options
  .find((option) => option.id === 'pickup')
checkMonth(reservePickup.reply.includes('late bid') && reservePickup.reply.includes('does not guarantee an award'),
  'Jordan must submit an eligible UBL late bid without treating submission as an award')
const reservePay = jordan.chapters.find((chapter) => chapter.id === 'month-close').branches
  .find((branch) => branch.option === 'pickup').text
checkMonth(reservePay.includes('150%') && reservePay.includes('pay-no-credit') &&
  reservePay.includes('does not add credit'),
  'Reserve day-off premium pickup must distinguish premium pay from reserve credit')
for (const person of [maya, jordan]) {
  const ending = person.chapters.find((chapter) => chapter.id === 'month-close')
  const decisionIds = person.id === 'maya' ? ['trade-choice', 'peer-offer'] : ['appointment-request']
  for (const decisionId of decisionIds) {
    const decision = person.chapters.find((chapter) => chapter.id === decisionId)
    for (const option of decision.choice.options) {
      const choices = { [decisionId]: option.id }
      const matching = ending.branches.filter((branch) => branch.from === decisionId &&
        branch.option === choices[branch.from])
      checkMonth(matching.length === 1 && matching[0].text.trim(),
        `${person.id}: ending must summarize the ${decisionId}/${option.id} choice`)
    }
  }
  checkMonth(!/a trade|he traded a day off/.test(ending.text),
    `${person.id}: unconditional ending must not claim an optional trade happened`)
}
const monthlyTts = systemTimings.find((system) => system.system === 'TTS (October)')
checkMonth(monthlyTts.keyDates.find((date) => date.role === 'opens').day === 20 &&
  monthlyTts.keyDates.find((date) => date.role === 'closes').day === 21 &&
  monthlyTts.keyDates.find((date) => date.role === 'closes').time === '23:00 HBT' &&
  monthlyTts.keyDates.find((date) => date.role === 'result').day === 22 &&
  monthlyTts.keyDates.find((date) => date.role === 'result').time === 'by 04:00 HBT',
  'October trip ballots must open September 20, first process September 21 and show results September 22')
checkMonth(monthlyTts.markers.some((marker) => marker.at === 24 && /Reserve day-off.*23:00 HBT/.test(marker.label)) &&
  /Reserve day-off results: September 25 by 04:00 HBT/.test(monthlyTts.result),
  'Reserve days-off processing must remain distinct from the first trip-trading run')
checkMonth(septemberMilestones.find((item) => item.day === 24).detail.includes('September 25 at 04:00 HBT'),
  'September milestone must distinguish the overnight Reserve day-off run from its next-morning results')
const etbTiming = systemTimings.find((system) => system.system === 'ETB')
checkMonth(/September 22 at 04:00 HBT/.test(etbTiming.starts),
  'October ETB transactions must not open before September 22 at 04:00 HBT')
checkMonth(etbTiming.result.includes('system approval') && etbTiming.result.includes('eligibility and legality') &&
  etbTiming.doesNot.includes('remain responsible') && etbTiming.glance.result.includes('system approval'),
  'ETB guidance must require system approval and checks, not agreement alone')
for (const person of [maya, jordan]) {
  const homeEnding = person.chapters.find((chapter) => chapter.id === 'month-close').branches
    .find((branch) => branch.option === 'home')
  checkMonth(homeEnding.text.includes('from this optional pickup'),
    `${person.id}: declining a pickup must not imply there is no other extra pay in the month`)
}
const rotaTiming = systemTimings.find((system) => system.system === 'ROTA')
const lrdTiming = systemTimings.find((system) => system.system === 'LRD')
checkMonth(['seniority', 'Reserve rotation', 'staffing needs', 'applicable rules']
  .every((text) => lrdTiming.does.includes(text)) &&
  lrdTiming.doesNot.includes('does not guarantee') &&
  systemGuide.LRD.simple.includes('confirmed status') &&
  septemberMilestones.find((item) => item.label === 'LRD opens').detail.includes('does not guarantee'),
  'LRD guidance must distinguish eligible preferences from confirmed status and explain outcome constraints')
checkMonth(jordan.chapters.find((chapter) => chapter.id === 'kitchen-table').text.includes('does not guarantee') &&
  jordan.chapters.find((chapter) => chapter.id === 'bid-month').text.includes('confirmed Reserve status'),
  'Jordan must verify confirmed Reserve status before PBS bidding rather than assume his LRD preference won')
const ublTiming = systemTimings.find((system) => system.system === 'UBL')
checkMonth(ublTiming.who.includes('late bid') && ublTiming.starts.includes('participation elected') &&
  ublTiming.scenario.steps[0].text.includes('elected UBL participation'),
  'UBL guidance must include eligible late bidders and explicit TTS-to-UBL elections')
checkMonth(/pickups, drops and certain trades/.test(ublTiming.does) &&
  /15:00 HBT the day before/.test(ublTiming.ends) && /daily and monthly limits/.test(ublTiming.ends) &&
  !/not a way to drop/.test(ublTiming.doesNot),
  'UBL must permit eligible drops/trades and state the day-before 15:00 drop deadline and coverage limits')
checkMonth(/originating today or tomorrow/.test(ublTiming.does) &&
  /Late bids use the same today\/tomorrow window; later departures remain for TTS/.test(ublTiming.does),
  'UBL late bids must not bypass the today/tomorrow origination horizon')
const rotdTiming = systemTimings.find((system) => system.system === 'ROTD')
checkMonth(systemGuide.ROTA.name === 'Reserve Open Time Assignment/Award' &&
  systemGuide.ROTD.name === 'Reserve Open Time Assignment/Award Daily',
  'reserve system labels must show their official full forms')
checkMonth(rotdTiming.practiceChapter === 'day-of-change',
  'ROTD practice must open the assignment scenario, not the earlier availability-only chapter')
checkMonth(['00:01', '05:00 HBT', 'after 11:00 HBT', 'may be held until 07:00 HBT']
  .every((text) => rotdTiming.ends.includes(text)),
  'ROTD timing must include the permitted overnight hold, not an unconditional 60-minute deadline')
const aggressiveTiming = systemTimings.find((system) => system.system === 'Aggressive Reserve')
checkMonth([aggressiveTiming.starts, aggressiveTiming.ends, aggressiveTiming.does,
  aggressiveTiming.scenario.takeaway, systemGuide['Aggressive Reserve'].simple]
  .every((text) => text.includes('ROTA / ROTD')),
  'Aggressive Reserve guidance must cover both ROTA and ROTD')
const aggressiveChapter = jordan.chapters.find((chapter) => chapter.id === 'volunteer')
checkMonth(aggressiveChapter.day === 10 && aggressiveChapter.text.includes('today’s ROTD') &&
  aggressiveChapter.text.includes('Tomorrow is a Golden Day') &&
  aggressiveChapter.choice.options.find((option) => option.id === 'volunteer').reply.includes('not a guaranteed'),
  'October 10 aggressive example must use eligible current-day ROTD preferences, not imply next-day availability')
const rotaAcknowledgement = jordan.chapters.find((chapter) => chapter.id === 'next-day-result').timing
for (const text of [rotaTiming.result, rotaAcknowledgement]) {
  checkMonth(/sequence/i.test(text) && text.includes('standby') && text.includes('RAP') &&
    text.includes('before 22:30 HBT') && text.includes('unavailable') && text.includes('one hour after release'),
    'ROTA guidance must cover all assignment types, acknowledgement and the on-sequence exception')
}
checkMonth(eventsForDay(moment(jordan, 'training').events, 14).filter((event) => event.kind !== 'personal').every((event) => event.kind === 'training'),
  'training must not be hidden by the simplified reserve block')
const beforeReplay = JSON.stringify(monthlyPersonas)
moment(maya, 'month-close', { 'trade-choice': 'trade', 'repair-bill': 'pickup' })
moment(maya, 'kitchen-table')
checkMonth(JSON.stringify(monthlyPersonas) === beforeReplay, 'calendar replay must not mutate shared story data')
let reviewedPaths = 0
for (const person of monthlyPersonas) {
  let paths = [{}]
  for (const [index, chapter] of person.chapters.entries()) {
    paths = paths.flatMap((choices) => {
      const previous = monthSnapshot(person, index - 1, choices)
      const visible = chapterForEvents(chapter, previous.events)
      checkMonth(scenarioEntryIndex(person, index, choices) === index,
        `${person.id}/${chapter.id}: a sequential walkthrough must not loop back to an earlier decision`)
      return visible.choice
        ? visible.choice.options.map((option) => ({ ...choices, [chapter.id]: option.id }))
        : [choices]
    })
  }
  reviewedPaths += paths.length
  for (const choices of paths) {
    const ending = monthSnapshot(person, person.chapters.length - 1, choices)
    checkMonth(!ending.events.some((event) => event.kind === 'request'),
      `${person.id}: completed story paths must resolve pending requests`)
    if (person.id === 'maya') {
      const dropped = ['ubl-day-before', 'etb-day-before'].includes(choices['drop-day-before']) || choices['same-day-drop'] === 'etb-same-day'
      checkMonth(hasEvent(ending, 'mia') === !dropped && hasEvent(ending, 'deadhead-home') === !dropped &&
        hasEvent(ending, 'delay') === !dropped && hasEvent(ending, 'premium-trip') === (choices['repair-bill'] === 'pickup'),
        'Maya: drop and premium-pickup decisions must remain independent across every complete path')
      checkMonth(hasEvent(ending, 'replacement') === (choices['trade-choice'] === 'trade') &&
        hasEvent(ending, 'peer-trip') === (choices['peer-offer'] === 'accept'),
        'Maya: later scenarios must preserve earlier confirmed trades')
    } else {
      checkMonth(hasEvent(ending, 'swapped-off') === (choices['appointment-request'] === 'request') &&
        hasEvent(ending, 'reserve-premium') === (choices['extra-income'] === 'pickup'),
        'Jordan: day-off trades and voluntary pickups must remain independent across every complete path')
    }
  }
}
for (const person of monthlyPersonas) {
  const award = person.chapters.find((chapter) => chapter.id === 'month-award')
  checkMonth(award.text.includes('PBS') && award.date.startsWith('September 20') && award.timing.includes('12:00 DFW') &&
    /preliminary/i.test(award.text) && award.text.includes('September 18'),
    `${person.id}: final October award must be September 20, distinct from the September 18 preliminary view`)
  const bid = person.chapters.find((chapter) => chapter.id === 'bid-month')
  checkMonth(bid.date.startsWith('September 10') && bid.text.includes('September 10') &&
    bid.timing.includes('September 15 at 12:00') && bid.timing.includes('DFW'),
    `${person.id}: monthly bid must identify its scene date, cutoff and time zone`)
  for (const chapter of person.chapters) {
    checkMonth(/^(September|October) \d{1,2}\b/.test(chapter.date),
      `${person.id}/${chapter.id}: each scene must have a specific date`)
    checkMonth(!chapter.publishesSchedule || chapter.date.startsWith('September 20'),
      `${person.id}/${chapter.id}: do not publish the final schedule at the preliminary award`)
  }
}
for (const [id, snippets] of [
  ['next-day-bid', ['15:00 HBT', '19:30 HBT']],
  ['next-day-result', ['22:30 HBT']],
  ['appointment-request', ['23:00 HBT', 'two days']],
  ['appointment-result', ['04:00 HBT']],
]) {
  const chapter = jordan.chapters.find((item) => item.id === id)
  for (const snippet of snippets) checkMonth(chapter.timing?.includes(snippet), `${id}: missing timing context ${snippet}`)
}

const milestoneDays = new Set()
checkMonth(applicationFor.RTDO === 'TTS' && applicationFor['TTS (October)'] === 'TTS' && applicationFor['Red Flag'] === 'TTS' &&
  applicationFor['Aggressive Reserve'] === 'ROTA / ROTD',
  'calendar: actions and conditions must map to applications, not appear as separate apps')
checkMonth(calendarReferences.length >= 3 && calendarReferences.every((source) => source.url.startsWith('https://www.apfa.org/')),
  'calendar: application mapping must retain APFA verification references')
const timingNames = new Set()
for (const system of systemTimings) {
  checkMonth(systemGuide[system.system]?.name?.trim() && systemGuide[system.system]?.simple?.trim(),
    `calendar timings/${system.system}: missing beginner explanation`)
  checkMonth(!timingNames.has(system.system), `calendar timings: duplicate ${system.system}`)
  timingNames.add(system.system)
  for (const field of ['system', 'who', 'starts', 'ends', 'does', 'result']) {
    checkMonth(typeof system[field] === 'string' && system[field].trim(), `calendar timings/${system.system}: missing ${field}`)
  }
  for (const sequence of rotaSequences) {
    const bidIndex = jordan.chapters.findIndex((chapter) => chapter.id === 'next-day-bid')
    const resultIndex = jordan.chapters.findIndex((chapter) => chapter.id === 'next-day-result')
    const pending = calendarSnapshot(jordan, bidIndex, {}, sequence.id)
    const awarded = calendarSnapshot(jordan, resultIndex, {}, sequence.id)
    checkMonth(eventsForDay(pending.events, 7).some((event) => event.kind === 'reserve') &&
      !pending.events.some((event) => event.id === 'reserve-trip'),
      `ROTA practice/${sequence.id}: preference must not award flying early`)
    checkMonth(eventsForDay(awarded.events, 7).some((event) => event.label === sequence.label) &&
      eventsForDay(awarded.events, 8).some((event) => event.label === sequence.label) &&
      eventsForDay(awarded.events, 9).some((event) => event.kind === 'reserve'),
      `ROTA practice/${sequence.id}: confirmed sequence must update only its duty dates`)
    checkMonth(!calendarSnapshot(maya, maya.chapters.length - 1, {}, sequence.id).events.some((event) => event.label === sequence.label),
      `ROTA practice/${sequence.id}: reserve choice must not affect Maya`)
  }
  checkMonth(['Build October in September', 'Manage the awarded month'].includes(system.phase),
    `calendar timings/${system.system}: invalid phase`)
  checkMonth(['month', 'day', 'linked'].includes(system.cycle), `calendar timings/${system.system}: invalid cycle`)
  checkMonth(system.audience?.trim(), `calendar timings/${system.system}: missing audience`)
  if (system.cycle === 'month') {
    checkMonth(['opens', 'closes', 'result'].every((role) => system.keyDates?.some((date) => date.role === role && date.label?.trim() && date.time?.trim())) &&
      system.keyDates.every((date) => date.day === undefined || (Number.isInteger(date.day) && date.day >= 1 && date.day <= 30)),
      `calendar timings/${system.system}: monthly systems need opens/closes/result key dates within September`)
  }
  for (const field of ['opens', 'closes', 'result']) {
    checkMonth(system.glance?.[field]?.trim(), `calendar timings/${system.system}: missing glance ${field}`)
  }
  checkMonth(system.doesNot?.trim(), `calendar timings/${system.system}: missing doesNot`)
  checkMonth(system.scenario?.persona?.trim() && system.scenario?.takeaway?.trim() && system.scenario?.steps?.length >= 2 &&
    system.scenario.steps.every((item) => item.when?.trim() && item.text?.trim()),
    `calendar timings/${system.system}: scenario needs persona, takeaway and at least two steps`)
  if (system.cycle === 'linked') {
    checkMonth(system.via?.trim() && system.bars.length === 0, `calendar timings/${system.system}: linked options need via and no bars`)
  } else {
    const max = system.cycle === 'month' ? 30 : 24
    checkMonth(system.bars.length > 0, `calendar timings/${system.system}: missing timeline bars`)
    for (const bar of system.bars) {
      checkMonth(bar.label?.trim() && bar.from >= (system.cycle === 'month' ? 1 : 0) && bar.to <= max &&
        (system.cycle === 'month' ? bar.to >= bar.from : bar.to > bar.from),
        `calendar timings/${system.system}: bar "${bar.label}" out of range`)
    }
    for (const marker of system.markers) {
      checkMonth(marker.label?.trim() && marker.at >= 0 && marker.at <= max, `calendar timings/${system.system}: marker out of range`)
    }
  }
  checkMonth(moduleIds.has(system.lessonId), `calendar timings/${system.system}: invalid lesson`)
  if (system.practiceChapter) {
    checkMonth(monthlyPersonas.some((person) => person.chapters.some((chapter) =>
      chapter.id === system.practiceChapter && chapter.systems?.some((item) => item.name === system.system))),
      `calendar timings/${system.system}: practice link must target a matching scenario`)
  }
}
for (const name of calendarSystemNames) checkMonth(timingNames.has(name), `calendar timings: missing ${name}`)
checkMonth(!timingNames.has('RTDO'), 'calendar timings: reserve day-off trades run in TTS, not a separate RTDO system')
for (const milestone of septemberMilestones) {
  checkMonth(!milestoneDays.has(milestone.day), `calendar: duplicate September date ${milestone.day}`)
  milestoneDays.add(milestone.day)
  checkMonth(Number.isInteger(milestone.day) && milestone.day >= 1 && milestone.day <= 30 &&
    milestone.label?.trim() && milestone.detail?.trim(), 'calendar: incomplete September milestone')
}
for (const day of [1, 3, 6, 7, 8, 10, 15, 18, 20, 21, 22, 24, 27]) {
  checkMonth(milestoneDays.has(day), `calendar: missing September opening/cutoff/award milestone ${day}`)
}
const pbsTiming = systemTimings.find((system) => system.system === 'PBS')
checkMonth(pbsTiming.keyDates.find((date) => date.role === 'result').day === 20 &&
  pbsTiming.markers.some((marker) => marker.at === 18 && /preliminary/i.test(marker.label)) &&
  pbsTiming.markers.some((marker) => marker.at === 20 && /final/i.test(marker.label)),
  'PBS timeline must distinguish preliminary awards on September 18 from final publication on September 20')
checkMonth(/preliminary/i.test(septemberMilestones.find((item) => item.day === 18).label) &&
  /final/i.test(septemberMilestones.find((item) => item.day === 20).label) &&
  /First TTS trip run/.test(septemberMilestones.find((item) => item.day === 21).label) &&
  /ETB opens/.test(septemberMilestones.find((item) => item.day === 22).label),
  'calendar milestones must not conflate PBS publication, TTS ballot opening, the first run and ETB opening')
checkMonth(!monthSnapshot(maya, -1, {}).published &&
  monthSnapshot(maya, -1, {}).events.every((event) => event.kind === 'personal'),
  'calendar: before starting, October must contain personal plans only')
checkMonth(!hasEvent(moment(maya, 'bid-month'), 'atl') && hasEvent(moment(maya, 'bid-month'), 'cq'),
  'calendar: submitting PBS must keep awarded training but not show future awarded trips')

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} issue(s):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Content validation passed: ${dictionary.length} terms, ${scenarios.length} simulator scenarios, and ${lifeScenarios.length} life scenarios covering all ${moduleIds.size} modules are complete and connected.`)
console.log(`Monthly story validation passed: ${monthlyPersonas.length} personas, all scheduling systems linked, and calendar branch/replay checks passed.`)
console.log(`Scenario path review passed: ${reviewedPaths} complete choice paths, including skipped and retained duty scenarios.`)
