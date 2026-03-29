function asObject(value: unknown, context: string): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`${context} must be an object`)
  }

  return value as Record<string, unknown>
}

export function requiredString(value: unknown, context: string): string {
  if (typeof value !== 'string') {
    throw new Error(`${context} must be a string`)
  }

  return value
}

export function requiredNumber(value: unknown, context: string): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(`${context} must be a valid number`)
  }

  return value
}

export function requiredStringArray(value: unknown, context: string): string[] {
  if (!Array.isArray(value)) {
    throw new Error(`${context} must be an array`)
  }

  return value.map((entry, index) => requiredString(entry, `${context}[${index}]`))
}

export function requiredObjectArray(value: unknown, context: string): Record<string, unknown>[] {
  if (!Array.isArray(value)) {
    throw new Error(`${context} must be an array`)
  }

  return value.map((entry, index) => asObject(entry, `${context}[${index}]`))
}

export function optionalString(value: unknown, defaultValue = ''): string {
  if (value === undefined || value === null) {
    return defaultValue
  }

  if (typeof value !== 'string') {
    throw new Error('Optional value must be a string when provided')
  }

  return value
}

export function requiredObject(value: unknown, context: string): Record<string, unknown> {
  return asObject(value, context)
}
