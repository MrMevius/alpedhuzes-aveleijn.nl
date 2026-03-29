import { Router } from 'express'
import { getConfiguredGoalEur, getFundraiserUrls, getProgressData } from '../services/progressService.js'

export const progressRouter = Router()

progressRouter.get('/', async (_req, res) => {
  try {
    const payload = await getProgressData()
    res.json(payload)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected progress API error'

    res.json({
      totalRaised: 0,
      goal: getConfiguredGoalEur(),
      percentage: 0,
      lastUpdated: new Date().toISOString(),
      sources: getFundraiserUrls().map((url) => ({
        url,
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
