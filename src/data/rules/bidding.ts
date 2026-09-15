import type { RuleFact } from '../types'

export const biddingRuleFacts: RuleFact[] = [
  {
    id: 'pbs-purpose',
    label: 'Preferential Bidding System purpose',
    value: 'Creates Lineholder and Reserve lines of flying',
    authority: 'aa-apfa-cba',
    sourceLabel: 'knowledge-sources/2024-CBA_121724.txt',
    sourceReference: '§2.PP and §10.D.1',
    asOf: '2024-12-17',
    status: 'concept',
    notes:
      'This is AA/APFA contractual terminology. Other airlines may use different systems or processes.',
  },
  {
    id: 'scheduling-horizons',
    label: 'Scheduling processing horizons',
    value: 'PBS -> TTS/ETB/UBL -> ROTA/ROTD -> operation',
    authority: 'aa-apfa-cba',
    sourceLabel: 'knowledge-sources/2024-CBA-Redline-091224.txt',
    sourceReference: 'Sections 10.C-10.I',
    asOf: '2024-09-12',
    status: 'concept',
    notes: 'The systems operate at different planning horizons; the exact transaction and notification rules are governed by the applicable paragraph.',
  },
  {
    id: 'scheduling-guardrails',
    label: 'Scheduling legality guardrails',
    value: 'Duty, rest, block, days off, conflicts, and qualifications',
    authority: 'aa-apfa-cba',
    sourceLabel: 'knowledge-sources/2024-CBA-Redline-091224.txt',
    sourceReference: 'Sections 10.D.12-13 and 11.B-N',
    asOf: '2024-09-12',
    status: 'concept',
    notes: 'A schedule result is not valid solely because a transaction or assignment was requested; the result must satisfy applicable contractual and FAR limits.',
  },
  {
    id: 'reserve-processing',
    label: 'Reserve processing',
    value: 'ROTA for future awards/assignments; ROTD for daily processing',
    authority: 'aa-apfa-cba',
    sourceLabel: 'knowledge-sources/2024-CBA-Redline-091224.txt',
    sourceReference: 'Section 2.UU-VV and Section 12.I-K',
    asOf: '2024-09-12',
    status: 'concept',
    notes: 'Reserve processing uses availability, preferences, qualifications, seniority, and legality to cover open sequences and standby.',
  },
]
