import { parseCurrencyToNumber } from '../lib/numberParser.js'

const REQUEST_TIMEOUT_MS = 20000

function extractByAmountRaisedSpan(html: string): number | null {
  const match = html.match(/<div class="amountRaised[\s\S]*?<h1>\s*€\s*<span>([^<]+)<\/span>/i)
  if (!match?.[1]) {
    return null
  }

  return parseCurrencyToNumber(match[1])
}

function extractByMoneyStrong(html: string): number | null {
  const match = html.match(/<h3 class="money mt0">\s*<strong>\s*€\s*([^<]+)<\/strong>/i)
  if (!match?.[1]) {
    return null
  }

  return parseCurrencyToNumber(match[1])
}

export function parseFundraiserAmountEur(html: string): number {
  const byAmountRaised = extractByAmountRaisedSpan(html)
  if (typeof byAmountRaised === 'number') {
    return byAmountRaised
  }

  const byMoneyStrong = extractByMoneyStrong(html)
  if (typeof byMoneyStrong === 'number') {
    return byMoneyStrong
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
