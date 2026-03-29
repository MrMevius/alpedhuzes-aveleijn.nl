import fs from 'node:fs'
import path from 'node:path'
import { scrapeFundraiserAmountEur } from './fundraiserScraper.js'
import { InMemoryTtlStore } from './cacheStore.js'
import type { ProgressApiResponse, ProgressSourceResult } from '../types/progress.js'

export const PROGRESS_CACHE_TTL_MS = 60 * 60 * 1000

const defaultFundraiserUrls = [
  'https://inschrijving.opgevenisgeenoptie.nl/fundraisers/Aveleijnsamensterk1',
  'https://inschrijving.opgevenisgeenoptie.nl/fundraisers/aveleijnsamensterk2',
  'https://inschrijving.opgevenisgeenoptie.nl/fundraisers/pienkamp'
]

function clampPercentage(value: number): number {
  if (value < 0) {
    return 0
  }

  if (value > 100) {
    return 100
  }

  return value
}

function readGoalEurFromContent(): number {
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

type ScrapeAmountFn = (url: string) => Promise<number>

interface ProgressServiceDeps {
  fundraiserUrls: string[]
  scrapeAmountEur: ScrapeAmountFn
  readGoalEur: () => number
  nowMs: () => number
  cache: InMemoryTtlStore<ProgressApiResponse>
}

const defaultDeps: ProgressServiceDeps = {
  fundraiserUrls: defaultFundraiserUrls,
  scrapeAmountEur: scrapeFundraiserAmountEur,
  readGoalEur: readGoalEurFromContent,
  nowMs: () => Date.now(),
  cache: new InMemoryTtlStore<ProgressApiResponse>()
}

export interface ProgressService {
  getProgressData: () => Promise<ProgressApiResponse>
  getFundraiserUrls: () => string[]
  getConfiguredGoalEur: () => number
}

function buildResponse(
  nowIso: string,
  goal: number,
  sources: ProgressSourceResult[],
  stale: boolean,
  error?: string
): ProgressApiResponse {
  const totalRaised = Number(sources.reduce((sum, source) => sum + source.amountRaised, 0).toFixed(2))
  const denominator = goal > 0 ? goal : 1
  const percentage = clampPercentage(Math.round((totalRaised / denominator) * 100))

  return {
    totalRaised,
    goal,
    percentage,
    lastUpdated: nowIso,
    sources,
    cacheAgeSeconds: 0,
    isStale: stale,
    ...(error ? { error } : {})
  }
}

function buildEmptyFallback(
  nowIso: string,
  goal: number,
  fundraiserUrls: string[],
  error: string
): ProgressApiResponse {
  return {
    totalRaised: 0,
    goal,
    percentage: 0,
    lastUpdated: nowIso,
    sources: fundraiserUrls.map((url) => ({
      url,
      amountRaised: 0,
      status: 'error' as const,
      error: 'No cached value available'
    })),
    cacheAgeSeconds: 0,
    isStale: true,
    error
  }
}

function calculateCacheAgeSeconds(lastUpdatedIso: string, nowMs: number): number {
  const lastUpdatedMs = Date.parse(lastUpdatedIso)

  if (Number.isNaN(lastUpdatedMs)) {
    return 0
  }

  return Math.max(0, Math.floor((nowMs - lastUpdatedMs) / 1000))
}

function withCacheAge(payload: ProgressApiResponse, nowMs: number): ProgressApiResponse {
  return {
    ...payload,
    cacheAgeSeconds: calculateCacheAgeSeconds(payload.lastUpdated, nowMs)
  }
}

export function createProgressService(customDeps: Partial<ProgressServiceDeps> = {}): ProgressService {
  const deps = {
    ...defaultDeps,
    ...customDeps,
    fundraiserUrls: customDeps.fundraiserUrls ?? [...defaultDeps.fundraiserUrls]
  }

  async function scrapeAllSources(): Promise<ProgressSourceResult[]> {
    const results = await Promise.all(
      deps.fundraiserUrls.map(async (url) => {
        try {
          const amountRaised = await deps.scrapeAmountEur(url)
          return { url, amountRaised, status: 'ok' as const }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown scrape error'
          return { url, amountRaised: 0, status: 'error' as const, error: message }
        }
      })
    )

    const okCount = results.filter((source) => source.status === 'ok').length
    if (okCount === 0) {
      throw new Error('Scraping failed for all fundraiser sources')
    }

    return results
  }

  async function getProgressData(): Promise<ProgressApiResponse> {
    const nowMs = deps.nowMs()
    const nowIso = new Date(nowMs).toISOString()

    const cached = deps.cache.get(nowMs)
    if (cached) {
      return withCacheAge(cached, nowMs)
    }

    const goal = deps.readGoalEur()

    try {
      const sources = await scrapeAllSources()

      const freshResponse = buildResponse(nowIso, goal, sources, false)
      deps.cache.set(freshResponse, PROGRESS_CACHE_TTL_MS, nowMs)

      return freshResponse
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown aggregation error'
      const lastKnownGood = deps.cache.getLastValue()

      if (lastKnownGood) {
        return withCacheAge(
          {
          ...lastKnownGood,
          isStale: true,
          error: message
          },
          nowMs
        )
      }

      return buildEmptyFallback(nowIso, goal, deps.fundraiserUrls, message)
    }
  }

  return {
    getProgressData,
    getFundraiserUrls: () => [...deps.fundraiserUrls],
    getConfiguredGoalEur: () => deps.readGoalEur()
  }
}

const defaultProgressService = createProgressService()

export const getProgressData = defaultProgressService.getProgressData
export const getFundraiserUrls = defaultProgressService.getFundraiserUrls
export const getConfiguredGoalEur = defaultProgressService.getConfiguredGoalEur
