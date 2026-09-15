import type { RuleFact } from '../types'
import { biddingRuleFacts } from './bidding'
import { payRuleFacts } from './pay'
import { reserveRuleFacts } from './reserve'
import { verificationRuleFacts } from './verification'

export const ruleFacts: RuleFact[] = [
  ...biddingRuleFacts,
  ...reserveRuleFacts,
  ...payRuleFacts,
  ...verificationRuleFacts,
]

const ruleFactsById = new Map(ruleFacts.map((fact) => [fact.id, fact]))

const moduleRuleFactIds: Record<string, string[]> = {
  'bid-month-overview': ['scheduling-horizons', 'pbs-purpose', 'reserve-processing'],
  'build-the-month': ['pbs-purpose', 'scheduling-guardrails'],
  'reshape-the-month': ['scheduling-horizons'],
  'near-term-open-time': ['scheduling-horizons'],
  'reserve-coverage': [
    'reserve-processing',
    'reserve-rap-count',
    'reserve-rap-duration',
    'reserve-rap-d-window',
    'standby-duration-options',
    'aggressive-reserve-lmco-precedence',
    'roc-election-window',
  ],
  'fa-lifecycle': ['crew-base-directory', 'reserve-rap-count', 'reserve-rap-duration'],
  'fa-operations': ['trip-rig-ratio', 'duty-rig-ratio'],
  'crew-management': ['scheduling-horizons', 'reserve-processing'],
  payroll: [
    'lineholder-monthly-guarantee',
    'reserve-monthly-guarantee',
    'trip-rig-ratio',
    'duty-rig-ratio',
    'sit-rig-rule',
  ],
}

export function ruleFactById(id: string): RuleFact | undefined {
  return ruleFactsById.get(id)
}

export function ruleFactsForModule(moduleId: string): RuleFact[] {
  return (moduleRuleFactIds[moduleId] ?? [])
    .map(ruleFactById)
    .filter((fact): fact is RuleFact => Boolean(fact))
}
