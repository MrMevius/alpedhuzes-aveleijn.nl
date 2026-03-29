import { Router } from 'express'

export const healthRouter = Router()

healthRouter.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'alpedhuzes-aveleijn.nl',
    timestamp: new Date().toISOString()
  })
})
