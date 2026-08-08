# Task 1 Brief: Recovery token parser utility

**Repo:** `E:\WaterTankerWeb`

**Files:**
- Create: `src/utils/recoveryLink.ts`
- Test: `src/utils/recoveryLink.test.ts`

**Interfaces:**
- Produces: `parseRecoveryTokensFromUrl(url: string): RecoveryTokens | null` where `RecoveryTokens = { access_token: string; refresh_token: string; type: string }`

## Steps

### Step 1: Add Vitest dev dependency

Run in `E:\WaterTankerWeb`:

```bash
npm install -D vitest
```

Add to `package.json` scripts:

```json
"test": "vitest run"
```

### Step 2: Write the failing test

Create `src/utils/recoveryLink.test.ts`:

```ts
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
})
```

### Step 3: Run test to verify it fails

Run: `npm test`  
Expected: FAIL — module `./recoveryLink` not found

### Step 4: Implement parser

Create `src/utils/recoveryLink.ts`:

```ts
export interface RecoveryTokens {
  access_token: string
  refresh_token: string
  type: string
}

function parseFragmentParams(fragment: string): Record<string, string> {
  return fragment.split('&').reduce<Record<string, string>>((acc, pair) => {
    const [k, v] = pair.split('=')
    if (k && v) acc[decodeURIComponent(k)] = decodeURIComponent(v)
    return acc
  }, {})
}

export function parseRecoveryTokensFromUrl(url: string): RecoveryTokens | null {
  const hashIndex = url.indexOf('#')
  if (hashIndex === -1) return null

  const params = parseFragmentParams(url.slice(hashIndex + 1))
  if (params.access_token && params.refresh_token && params.type === 'recovery') {
    return {
      access_token: params.access_token,
      refresh_token: params.refresh_token,
      type: params.type,
    }
  }
  return null
}
```

### Step 5: Run test to verify it passes

Run: `npm test`  
Expected: PASS (3 tests)

### Step 6: Commit

```bash
git add package.json package-lock.json src/utils/recoveryLink.ts src/utils/recoveryLink.test.ts
git commit -m "feat: add recovery token parser for password reset flow"
```

## Global Constraints

- Reuse existing WaterTankerWeb patterns; keep diff minimal.
- Do not change unrelated pages or auth flows.
