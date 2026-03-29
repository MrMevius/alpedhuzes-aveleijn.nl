import { parseCurrencyToNumber } from '../lib/numberParser.js'

const REQUEST_TIMEOUT_MS = 20000

function parseCandidateValue(rawValue?: string): number | null {
  if (!rawValue) {
    return null
  }

  try {
    return parseCurrencyToNumber(rawValue)
  } catch {
    return null
  }
}

function extractEuroValue(fragment: string): number | null {
  const match = fragment.match(/(?:€|&euro;)\s*(?:<[^>]+>\s*)*([0-9][0-9.,\s]{0,20})/i)
  return parseCandidateValue(match?.[1])
}

function extractByAmountRaisedBlock(html: string): number | null {
  const blockMatch = html.match(/<[^>]*class=["'][^"']*amountRaised[^"']*["'][^>]*>([\s\S]{0,1200})/i)
  if (!blockMatch?.[1]) {
    return null
  }

  return extractEuroValue(blockMatch[1])
}

function extractByMoneyStrong(html: string): number | null {
  const match = html.match(/<h3[^>]*class=["'][^"']*money[^"']*["'][^>]*>[\s\S]{0,120}?<strong>\s*(?:€|&euro;)?\s*([^<]+)<\/strong>/i)
  return parseCandidateValue(match?.[1])
}

function extractByLabelContext(html: string): number | null {
  const labelThenAmount = html.match(
    /(?:bedrag\s+opgehaald|opgehaald|raised)[\s\S]{0,120}(?:€|&euro;)\s*(?:<[^>]+>\s*)*([0-9][0-9.,\s]{0,20})/i
  )
  const parsedLabelThenAmount = parseCandidateValue(labelThenAmount?.[1])
  if (parsedLabelThenAmount !== null) {
    return parsedLabelThenAmount
  }

  const amountThenLabel = html.match(
    /(?:€|&euro;)\s*(?:<[^>]+>\s*)*([0-9][0-9.,\s]{0,20})[\s\S]{0,120}(?:bedrag\s+opgehaald|opgehaald|raised)/i
  )

  return parseCandidateValue(amountThenLabel?.[1])
}

function extractByScriptAmountKey(html: string): number | null {
  const match = html.match(/["'](?:amountRaised|amount_raised|raisedAmount)["']\s*:\s*["']?([0-9][0-9.,\s]{0,20})["']?/i)
  return parseCandidateValue(match?.[1])
}

export function parseFundraiserAmountEur(html: string): number {
  const byAmountRaised = extractByAmountRaisedBlock(html)
  if (typeof byAmountRaised === 'number') {
    return byAmountRaised
  }

  const byMoneyStrong = extractByMoneyStrong(html)
  if (typeof byMoneyStrong === 'number') {
    return byMoneyStrong
  }

  const byLabelContext = extractByLabelContext(html)
  if (typeof byLabelContext === 'number') {
    return byLabelContext
  }

  const byScriptAmountKey = extractByScriptAmountKey(html)
  if (typeof byScriptAmountKey === 'number') {
    return byScriptAmountKey
  }

  throw new Error('Unable to find fundraiser amount in HTML')
}

export async function scrapeFundraiserAmountEur(url: string): Promise<number> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'user-agent': 'alpedhuzes-aveleijn-progress-bot/1.0'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch fundraiser page (${response.status})`)
    }

    const html = await response.text()
    return parseFundraiserAmountEur(html)
  } finally {
    clearTimeout(timeout)
  }
}
