import fs from 'node:fs'
import path from 'node:path'
import type { ProgressFundraiserSource } from '../types/progress.js'

const DEFAULT_FUNDRAISER_SOURCES: ProgressFundraiserSource[] = [
  {
    id: 'aveleijnsamensterk1',
    name: 'Aveleijn Samen Sterk 1',
    type: 'team',
    url: 'https://inschrijving.opgevenisgeenoptie.nl/fundraisers/Aveleijnsamensterk1'
  },
  {
    id: 'aveleijnsamensterk2',
    name: 'Aveleijn Samen Sterk 2',
    type: 'team',
    url: 'https://inschrijving.opgevenisgeenoptie.nl/fundraisers/aveleijnsamensterk2'
  },
  {
    id: 'pienkamp',
    name: 'Pien Kamp',
    type: 'individual',
    url: 'https://inschrijving.opgevenisgeenoptie.nl/fundraisers/pienkamp'
  },
  {
    id: 'gertjanvandeweerdhof',
    name: 'Gertjan van de Weerdhof',
    type: 'individual',
    url: 'https://inschrijving.opgevenisgeenoptie.nl/fundraisers/GertjanvandeWeerdhof'
  }
]

function isSourceType(value: unknown): value is ProgressFundraiserSource['type'] {
  return value === 'team' || value === 'individual'
}

function fallbackSources(): ProgressFundraiserSource[] {
  return [...DEFAULT_FUNDRAISER_SOURCES]
}

export function readGoalEurFromContent(): number {
  try {
    const progressFilePath = path.resolve(process.cwd(), 'content/sections/progress.json')
    const raw = fs.readFileSync(progressFilePath, 'utf-8')
    const parsed = JSON.parse(raw) as { goalEur?: unknown }

    if (typeof parsed.goalEur === 'number' && Number.isFinite(parsed.goalEur)) {
      return parsed.goalEur
    }
  } catch {
    // Intentional fallback to zero when content file unavailable.
  }

  return 0
}

export function readFundraiserSourcesFromContent(): ProgressFundraiserSource[] {
  try {
    const sourcesFilePath = path.resolve(process.cwd(), 'content/sections/progress-sources.json')
    const raw = fs.readFileSync(sourcesFilePath, 'utf-8')
    const parsed = JSON.parse(raw) as { sources?: unknown }

    if (!Array.isArray(parsed.sources)) {
      return fallbackSources()
    }

    const sources = parsed.sources
      .map((entry) => {
        if (typeof entry !== 'object' || entry === null) {
          return null
        }

        const source = entry as Record<string, unknown>
        const id = typeof source.id === 'string' ? source.id.trim() : ''
        const name = typeof source.name === 'string' ? source.name.trim() : ''
        const type = source.type
        const url = typeof source.url === 'string' ? source.url.trim() : ''

        if (!id || !name || !isSourceType(type) || !url) {
          return null
        }

        return { id, name, type, url }
      })
      .filter((source): source is ProgressFundraiserSource => source !== null)

    return sources.length > 0 ? sources : fallbackSources()
  } catch {
    // Intentional fallback when source content file unavailable/invalid.
    return fallbackSources()
  }
}
