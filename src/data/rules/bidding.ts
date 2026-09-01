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
]
