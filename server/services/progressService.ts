import fs from 'node:fs'
import path from 'node:path'
import { scrapeFundraiserAmountEur } from './fundraiserScraper.js'
import { InMemoryTtlStore } from './cacheStore.js'
import type { ProgressApiResponse, ProgressSourceResult } from '../types/progress.js'

export const PROGRESS_CACHE_TTL_MS = 60 * 60 * 1000
export const PROGRESS_CACHE_TTL_SECONDS = 60 * 60
const DEFAULT_GOAL_EUR = 66666

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
    // Intentional fallback to default goal when content file unavailable.
  }

  return DEFAULT_GOAL_EUR
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
  goalEur: number,
  sources: ProgressSourceResult[],
  lastSuccessAt: string | null,
  stale: boolean,
  error?: string
): ProgressApiResponse {
  const totalEur = Number(sources.reduce((sum, source) => sum + source.amountEur, 0).toFixed(2))
  const totalEurRounded = Math.round(totalEur)
  const denominator = goalEur > 0 ? goalEur : 1
  const percentage = clampPercentage(Math.round((totalEur / denominator) * 100))

  return {
    totalEur,
    totalEurRounded,
    goalEur,
    percentage,
    isStale: stale,
    updatedAt: nowIso,
    lastSuccessAt,
    cacheTtlSeconds: PROGRESS_CACHE_TTL_SECONDS,
    sources,
    ...(error ? { error } : {})
  }
}

function buildEmptyFallback(
  nowIso: string,
  goalEur: number,
  fundraiserUrls: string[],
  lastSuccessAt: string | null,
  error: string
): ProgressApiResponse {
  return {
    totalEur: 0,
    totalEurRounded: 0,
    goalEur,
    percentage: 0,
    isStale: true,
    updatedAt: nowIso,
    lastSuccessAt,
    cacheTtlSeconds: PROGRESS_CACHE_TTL_SECONDS,
    sources: fundraiserUrls.map((url) => ({
      url,
      amountEur: 0,
      status: 'error' as const,
      error: 'No cached value available'
    })),
    error
  }
}

export function createProgressService(customDeps: Partial<ProgressServiceDeps> = {}): ProgressService {
  const deps = {
    ...defaultDeps,
    ...customDeps,
    fundraiserUrls: customDeps.fundraiserUrls ?? [...defaultDeps.fundraiserUrls]
  }

  let lastSuccessAt: string | null = null

  async function scrapeAllSources(): Promise<ProgressSourceResult[]> {
    const results = await Promise.all(
      deps.fundraiserUrls.map(async (url) => {
        try {
          const amountEur = await deps.scrapeAmountEur(url)
          return { url, amountEur, status: 'ok' as const }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown scrape error'
          return { url, amountEur: 0, status: 'error' as const, error: message }
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
      return cached
    }

    const goalEur = deps.readGoalEur()

    try {
      const sources = await scrapeAllSources()
      lastSuccessAt = nowIso

      const freshResponse = buildResponse(nowIso, goalEur, sources, lastSuccessAt, false)
      deps.cache.set(freshResponse, PROGRESS_CACHE_TTL_MS, nowMs)

      return freshResponse
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown aggregation error'
      const lastKnownGood = deps.cache.getLastValue()

      if (lastKnownGood) {
        return {
          ...lastKnownGood,
          isStale: true,
          updatedAt: nowIso,
          error: message
        }
      }

      return buildEmptyFallback(nowIso, goalEur, deps.fundraiserUrls, lastSuccessAt, message)
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
