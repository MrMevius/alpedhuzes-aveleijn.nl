export interface ProgressSourceResult {
  url: string
  amountRaised: number
  status: 'ok' | 'error'
  error?: string
}

export interface ProgressApiResponse {
  totalRaised: number
  goal: number
  percentage: number
  lastUpdated: string
  sources: ProgressSourceResult[]
  cacheAgeSeconds: number
  isStale: boolean
  error?: string
}
