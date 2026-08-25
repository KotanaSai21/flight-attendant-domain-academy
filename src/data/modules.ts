import type { AcademyModule } from './types'
import { modulesPart1 } from './content/modules1'
import { modulesPart2 } from './content/modules2'
import { interactiveModules } from './content/modulesInteractive'

const byId = new Map<string, AcademyModule>()
for (const m of [...interactiveModules, ...modulesPart1, ...modulesPart2]) {
  if (!byId.has(m.id)) byId.set(m.id, m)
}

export const modules: AcademyModule[] = [...byId.values()].sort((a, b) => a.number - b.number)

export const moduleById = (id: string): AcademyModule | undefined =>
  modules.find((m) => m.id === id)
