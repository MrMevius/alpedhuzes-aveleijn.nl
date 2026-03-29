export class InMemoryTtlStore<TValue> {
  private value: TValue | null = null
  private expiresAtMs = 0

  get(nowMs: number): TValue | null {
    if (!this.value) {
      return null
    }

    if (nowMs >= this.expiresAtMs) {
      return null
    }

    return this.value
  }

  getLastValue(): TValue | null {
    return this.value
  }

  set(value: TValue, ttlMs: number, nowMs: number): void {
    this.value = value
    this.expiresAtMs = nowMs + ttlMs
  }
}
