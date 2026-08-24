import type { AcademyModule } from './types'
import { modulesPart1 } from './content/modules1'
import { modulesPart2 } from './content/modules2'

export const modules: AcademyModule[] = [...modulesPart1, ...modulesPart2].sort(
  (a, b) => a.number - b.number,
)

export const moduleById = (id: string): AcademyModule | undefined =>
  modules.find((m) => m.id === id)
