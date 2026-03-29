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
      totalEur: 0,
      totalEurRounded: 0,
      goalEur: getConfiguredGoalEur(),
      percentage: 0,
      isStale: true,
      updatedAt: new Date().toISOString(),
      lastSuccessAt: null,
      cacheTtlSeconds: 3600,
      sources: getFundraiserUrls().map((url) => ({
        url,
        amountEur: 0,
        status: 'error',
        error: message
      })),
      error: message
    })
  }
})
