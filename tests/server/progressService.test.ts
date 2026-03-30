import { describe, expect, it } from 'vitest'
import { InMemoryTtlStore } from '../../server/services/cacheStore'
import { PROGRESS_CACHE_TTL_MS, createProgressService } from '../../server/services/progressService'
import type { ProgressApiResponse, ProgressFundraiserSource } from '../../server/types/progress'

const testSources: ProgressFundraiserSource[] = [
  { id: 'a', name: 'A', type: 'team', url: 'a' },
  { id: 'b', name: 'B', type: 'individual', url: 'b' }
]

describe('progress service caching and fallback', () => {
  it('loads default configured sources including Gertjan fundraiser', () => {
    const service = createProgressService()
    const sources = service.getFundraiserSources()

    expect(sources).toHaveLength(4)
    expect(sources.some((source) => source.url === 'https://inschrijving.opgevenisgeenoptie.nl/fundraisers/GertjanvandeWeerdhof')).toBe(true)
  })

  it('returns cached payload during ttl window', async () => {
    let now = Date.UTC(2026, 0, 1, 12, 0, 0)
    let scrapeValue = 100

    const service = createProgressService({
      fundraiserSources: [testSources[0] as ProgressFundraiserSource],
      nowMs: () => now,
      readGoalEur: () => 1000,
      scrapeAmountEur: async () => scrapeValue,
      cache: new InMemoryTtlStore<ProgressApiResponse>()
    })

    const first = await service.getProgressData()
    scrapeValue = 250
    now += 1_000
    const second = await service.getProgressData()

    expect(first.lastUpdated).toBe(second.lastUpdated)
    expect(second.totalRaised).toBe(100)
    expect(second.isStale).toBe(false)
    expect(second.cacheAgeSeconds).toBe(1)
  })

  it('serves last known good value as stale when refresh fails after ttl', async () => {
    let now = Date.UTC(2026, 0, 1, 12, 0, 0)
    let shouldFail = false

    const service = createProgressService({
      fundraiserSources: testSources,
      nowMs: () => now,
      readGoalEur: () => 1000,
      scrapeAmountEur: async () => {
        if (shouldFail) {
          throw new Error('forced scrape failure')
        }

        return 50
      },
      cache: new InMemoryTtlStore<ProgressApiResponse>()
    })

    const fresh = await service.getProgressData()
    expect(fresh.totalRaised).toBe(100)
    expect(fresh.isStale).toBe(false)

    shouldFail = true
    now += PROGRESS_CACHE_TTL_MS + 1
    const stale = await service.getProgressData()

    expect(stale.totalRaised).toBe(100)
    expect(stale.isStale).toBe(true)
    expect(stale.error).toContain('Scraping failed for all fundraiser sources')
    expect(stale.cacheAgeSeconds).toBe(3600)
  })

  it('returns empty stale fallback when no cached value exists and scraping fails', async () => {
    const service = createProgressService({
      fundraiserSources: [testSources[0] as ProgressFundraiserSource],
      nowMs: () => Date.UTC(2026, 0, 1, 12, 0, 0),
      readGoalEur: () => 500,
      scrapeAmountEur: async () => {
        throw new Error('network unavailable')
      },
      cache: new InMemoryTtlStore<ProgressApiResponse>()
    })

    const result = await service.getProgressData()

    expect(result.totalRaised).toBe(0)
    expect(result.goal).toBe(500)
    expect(result.isStale).toBe(true)
    expect(result.sources[0]?.id).toBe('a')
    expect(result.sources[0]?.type).toBe('team')
    expect(result.sources[0]?.status).toBe('error')
  })
})
