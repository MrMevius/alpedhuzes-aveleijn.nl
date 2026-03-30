import { scrapeFundraiserAmountEur } from './fundraiserScraper.js'
import { InMemoryTtlStore } from './cacheStore.js'
import type { ProgressApiResponse, ProgressFundraiserSource, ProgressSourceResult } from '../types/progress.js'
import { readFundraiserSourcesFromContent, readGoalEurFromContent } from '../config/progressConfig.js'

export const PROGRESS_CACHE_TTL_MS = 60 * 60 * 1000

function clampPercentage(value: number): number {
  if (value < 0) {
    return 0
  }

  if (value > 100) {
    return 100
  }

  return value
}

type ScrapeAmountFn = (url: string) => Promise<number>

interface ProgressServiceDeps {
  fundraiserSources: ProgressFundraiserSource[]
  scrapeAmountEur: ScrapeAmountFn
  readGoalEur: () => number
  nowMs: () => number
  cache: InMemoryTtlStore<ProgressApiResponse>
}

const defaultDeps: ProgressServiceDeps = {
  fundraiserSources: readFundraiserSourcesFromContent(),
  scrapeAmountEur: scrapeFundraiserAmountEur,
  readGoalEur: readGoalEurFromContent,
  nowMs: () => Date.now(),
  cache: new InMemoryTtlStore<ProgressApiResponse>()
}

export interface ProgressService {
  getProgressData: () => Promise<ProgressApiResponse>
  getFundraiserSources: () => ProgressFundraiserSource[]
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
  fundraiserSources: ProgressFundraiserSource[],
  error: string
): ProgressApiResponse {
  return {
    totalRaised: 0,
    goal,
    percentage: 0,
    lastUpdated: nowIso,
    sources: fundraiserSources.map((source) => ({
      ...source,
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
  const configuredFundraiserSources = customDeps.fundraiserSources ?? [...defaultDeps.fundraiserSources]

  const deps = {
    ...defaultDeps,
    ...customDeps,
    fundraiserSources: configuredFundraiserSources
  }

  async function scrapeAllSources(): Promise<ProgressSourceResult[]> {
    const results = await Promise.all(
      deps.fundraiserSources.map(async (source) => {
        try {
          const amountRaised = await deps.scrapeAmountEur(source.url)
          return { ...source, amountRaised, status: 'ok' as const }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown scrape error'
          return { ...source, amountRaised: 0, status: 'error' as const, error: message }
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

      return buildEmptyFallback(nowIso, goal, deps.fundraiserSources, message)
    }
  }

  return {
    getProgressData,
    getFundraiserSources: () => [...deps.fundraiserSources],
    getFundraiserUrls: () => deps.fundraiserSources.map((source) => source.url),
    getConfiguredGoalEur: () => deps.readGoalEur()
  }
}

const defaultProgressService = createProgressService()

export const getProgressData = defaultProgressService.getProgressData
export const getFundraiserSources = defaultProgressService.getFundraiserSources
export const getFundraiserUrls = defaultProgressService.getFundraiserUrls
export const getConfiguredGoalEur = defaultProgressService.getConfiguredGoalEur
