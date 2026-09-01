import type { RuleFact } from '../types'

export const reserveRuleFacts: RuleFact[] = [
  {
    id: 'reserve-rap-count',
    label: 'Maximum scheduled RAPs',
    value: 4,
    unit: 'RAPs (A–D)',
    authority: 'aa-apfa-cba',
    sourceLabel: 'knowledge-sources/2024-CBA_121724.txt',
    sourceReference: '§12.G.1',
    asOf: '2024-12-17',
    status: 'implemented',
    notes: 'The agreement provides for no more than four Reserve Availability Periods.',
  },
  {
    id: 'reserve-rap-duration',
    label: 'Scheduled RAP availability window',
    value: 12,
    unit: 'hours',
    authority: 'aa-apfa-cba',
    sourceLabel: 'knowledge-sources/2024-CBA_121724.txt',
    sourceReference: '§12.G.2',
    asOf: '2024-12-17',
    status: 'implemented',
    notes:
      'A, B, and C start times are published by base and bid period. They must be treated as configuration, not universal constants.',
  },
  {
    id: 'reserve-rap-d-window',
    label: 'Scheduled RAP D window',
    value: '1400–0200',
    unit: 'HBT',
    authority: 'aa-apfa-cba',
    sourceLabel: 'knowledge-sources/2024-CBA_121724.txt',
    sourceReference: '§12.G.1',
    asOf: '2024-12-17',
    status: 'implemented',
    notes:
      'Last-day and operational-release conditions can change the displayed end of RAP D. Those conditions belong in the Reserve deep dive.',
  },
]
