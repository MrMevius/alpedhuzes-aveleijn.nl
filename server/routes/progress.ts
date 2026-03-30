import { Router } from 'express'
import { readFundraiserSourcesFromContent, readGoalEurFromContent } from '../config/progressConfig.js'
import { getProgressData } from '../services/progressService.js'

export const progressRouter = Router()

progressRouter.get('/', async (_req, res) => {
  try {
    const payload = await getProgressData()
    res.json(payload)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected progress API error'

    res.json({
      totalRaised: 0,
      goal: readGoalEurFromContent(),
      percentage: 0,
      lastUpdated: new Date().toISOString(),
      sources: readFundraiserSourcesFromContent().map((source) => ({
        ...source,
        amountRaised: 0,
        status: 'error',
        error: message
      })),
      cacheAgeSeconds: 0,
      isStale: true,
      error: message
    })
  }
})
