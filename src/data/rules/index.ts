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
  'fa-lifecycle': ['crew-base-directory', 'reserve-rap-count', 'reserve-rap-duration'],
  'fa-operations': ['trip-rig-ratio', 'duty-rig-ratio'],
  scheduling: ['pbs-purpose'],
  pbs: ['pbs-purpose'],
  bidding: ['pbs-purpose'],
  reserve: ['reserve-rap-count', 'reserve-rap-duration', 'reserve-rap-d-window'],
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
