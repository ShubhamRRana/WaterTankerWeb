import { describe, it, expect } from 'vitest'
import { parseRecoveryTokensFromUrl } from './recoveryLink'

describe('parseRecoveryTokensFromUrl', () => {
  it('returns tokens from hash fragment', () => {
    const url =
      'https://tankerhub.in/auth/reset-password#access_token=abc&refresh_token=def&type=recovery'
    expect(parseRecoveryTokensFromUrl(url)).toEqual({
      access_token: 'abc',
      refresh_token: 'def',
      type: 'recovery',
    })
  })

  it('returns null when hash is missing', () => {
    expect(parseRecoveryTokensFromUrl('https://tankerhub.in/auth/reset-password')).toBeNull()
  })

  it('returns null when type is not recovery', () => {
    const url =
      'https://tankerhub.in/auth/reset-password#access_token=abc&refresh_token=def&type=signup'
    expect(parseRecoveryTokensFromUrl(url)).toBeNull()
  })

  it('returns null when the hash contains malformed percent encoding', () => {
    const url =
      'https://tankerhub.in/auth/reset-password#access_token=%E0%A4%A&refresh_token=def&type=recovery'
    expect(parseRecoveryTokensFromUrl(url)).toBeNull()
  })
})
