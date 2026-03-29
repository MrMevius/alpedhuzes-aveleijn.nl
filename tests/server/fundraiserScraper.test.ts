import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { parseFundraiserAmountEur } from '../../server/services/fundraiserScraper'

function readFixture(name: string): string {
  const fixturePath = path.resolve(process.cwd(), `tests/server/fixtures/${name}`)
  return fs.readFileSync(fixturePath, 'utf-8')
}

describe('parseFundraiserAmountEur', () => {
  it('parses amount from amountRaised h1 span pattern', () => {
    const html = readFixture('fundraiser-amountRaised.html')
    const value = parseFundraiserAmountEur(html)

    expect(value).toBe(16214.53)
  })

  it('parses amount from money strong fallback pattern', () => {
    const html = readFixture('fundraiser-moneyStrong.html')
    const value = parseFundraiserAmountEur(html)

    expect(value).toBe(20246)
  })

  it('parses amount from label-context fallback pattern', () => {
    const html = readFixture('fundraiser-labelContext.html')
    const value = parseFundraiserAmountEur(html)

    expect(value).toBe(12345.67)
  })

  it('throws for html without supported amount markers', () => {
    expect(() => parseFundraiserAmountEur('<html><body>No amounts</body></html>')).toThrow(
      'Unable to find fundraiser amount in HTML'
    )
  })
})
