export interface ProgressFundraiserSource {
  id: string
  name: string
  type: 'team' | 'individual'
  url: string
}

export interface ProgressSourceResult {
  id: string
  name: string
  type: 'team' | 'individual'
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
