export interface ProgressSourceResult {
  url: string
  amountEur: number
  status: 'ok' | 'error'
  error?: string
}

export interface ProgressApiResponse {
  totalEur: number
  totalEurRounded: number
  goalEur: number
  percentage: number
  isStale: boolean
  updatedAt: string
  lastSuccessAt: string | null
  cacheTtlSeconds: number
  sources: ProgressSourceResult[]
  error?: string
}
