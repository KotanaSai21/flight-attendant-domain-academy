import type { RuleFact } from '../types'

export const verificationRuleFacts: RuleFact[] = [
  {
    id: 'crew-base-directory',
    label: 'Current Flight Attendant crew-base directory',
    value: 'Verification required',
    authority: 'aa-process',
    sourceLabel: 'knowledge-sources/FA-Lifecycle-Overview.txt',
    sourceReference: 'Pages 11–12',
    asOf: '2024-12-17',
    status: 'verify-current',
    notes:
      'The internal overview lists eleven locations, including JFK and SFO. Confirm the current AA Flight Attendant base list before publishing exact base counts or maps.',
  },
]
