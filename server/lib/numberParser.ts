function normalizeCurrencyInput(value: string): string {
  const stripped = value.replace(/[^\d,.-]/g, '').trim()

  if (!stripped) {
    return ''
  }

  const hasComma = stripped.includes(',')
  const hasDot = stripped.includes('.')

  if (hasComma && hasDot) {
    if (stripped.lastIndexOf(',') > stripped.lastIndexOf('.')) {
      return stripped.replace(/\./g, '').replace(',', '.')
    }

    return stripped.replace(/,/g, '')
  }

  if (hasComma) {
    const decimals = stripped.split(',').at(-1) ?? ''
    if (decimals.length === 3) {
      return stripped.replace(/,/g, '')
    }

    return stripped.replace(',', '.')
  }

  if (hasDot) {
    const decimals = stripped.split('.').at(-1) ?? ''
    if (decimals.length === 3) {
      return stripped.replace(/\./g, '')
    }
  }

  return stripped
}

export function parseCurrencyToNumber(value: string): number {
  const normalized = normalizeCurrencyInput(value)
  const parsed = Number.parseFloat(normalized)

  if (!Number.isFinite(parsed)) {
    throw new Error(`Unable to parse currency value: ${value}`)
  }

  return parsed
}
