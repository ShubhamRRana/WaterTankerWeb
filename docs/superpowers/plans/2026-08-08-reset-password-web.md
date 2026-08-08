# Reset Password Web Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the blank-page password reset bug by redirecting recovery emails to `https://tankerhub.in/auth/reset-password` and completing the existing web reset page with full Supabase recovery handling and success UI.

**Architecture:** Mobile app passes web redirect URL to `resetPasswordForEmail`. Supabase redirects to WaterTankerWeb with recovery credentials. `ResetPassword.tsx` establishes session (PKCE or hash), updates password via `updateUser`, then shows success with app store links. Shared token parsing lives in `src/utils/recoveryLink.ts`.

**Tech Stack:** React 18, Vite 5, React Router 6, Supabase JS v2, react-hook-form, Zod, Tailwind CSS (WaterTankerWeb); Expo/React Native (mobile redirect URL only)

## Global Constraints

- Reuse existing WaterTankerWeb routing, component, and UI patterns; keep diff minimal.
- Do not change unrelated pages or auth flows.
- Reset page must work without an active logged-in session.
- Success path: stay on page with success message + app download links (no auto-redirect).
- Redirect URL: `https://tankerhub.in/auth/reset-password` (matches `/auth/success` pattern).
- Remove all debug `fetch('http://127.0.0.1:7244/...')` calls from ResetPassword.
- Supabase redirect URL must be allowlisted in dashboard before production test.

---

## File Map

| File | Responsibility |
|------|----------------|
| `WaterTankerWeb/src/utils/recoveryLink.ts` | Parse `#access_token=...&type=recovery` from redirect URL |
| `WaterTankerWeb/src/pages/ResetPassword.tsx` | Recovery session init, form, submit, success/error UI |
| `WaterTankerWeb/DEPLOYMENT.md` | Document redirect URL + Supabase allowlist |
| `water-customer-app/src/utils/recoveryLink.ts` | Update default `getPasswordResetRedirectUrl()` |
| `water-customer-app/.env.example` | Update documented default redirect URL |

---

### Task 1: Recovery token parser utility

**Files:**
- Create: `WaterTankerWeb/src/utils/recoveryLink.ts`
- Test: `WaterTankerWeb/src/utils/recoveryLink.test.ts`

**Interfaces:**
- Produces: `parseRecoveryTokensFromUrl(url: string): RecoveryTokens | null` where `RecoveryTokens = { access_token: string; refresh_token: string; type: string }`

- [ ] **Step 1: Add Vitest dev dependency**

Run in `E:\WaterTankerWeb`:

```bash
npm install -D vitest
```

Add to `package.json` scripts:

```json
"test": "vitest run"
```

- [ ] **Step 2: Write the failing test**

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

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test`  
Expected: FAIL — module `./recoveryLink` not found

- [ ] **Step 4: Implement parser**

Create `src/utils/recoveryLink.ts` (port from `water-customer-app/src/utils/recoveryLink.ts`, omit `getPasswordResetRedirectUrl`):

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

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test`  
Expected: PASS (3 tests)

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/utils/recoveryLink.ts src/utils/recoveryLink.test.ts
git commit -m "feat: add recovery token parser for password reset flow"
```

---

### Task 2: Complete ResetPassword page

**Files:**
- Modify: `WaterTankerWeb/src/pages/ResetPassword.tsx`
- Modify: `WaterTankerWeb/src/lib/appLinks.ts` (export App Store URL if not already exported)

**Interfaces:**
- Consumes: `parseRecoveryTokensFromUrl` from `../utils/recoveryLink`
- Consumes: `CUSTOMER_APP_PLAY_URL` from `../lib/appLinks`; `import.meta.env.VITE_APP_STORE_URL` for iOS link
- Produces: page states `initializing | ready | submitting | success | error`

- [ ] **Step 1: Remove debug instrumentation**

Delete all `// #region agent log` blocks and localhost `fetch(...)` calls from `ResetPassword.tsx`.

- [ ] **Step 2: Rewrite session initialization `useEffect`**

Replace the existing effect body with:

```ts
useEffect(() => {
  if (!isSupabaseConfigured()) {
    setStatus({
      state: 'error',
      message: 'Password reset is temporarily unavailable. Please contact support.',
    })
    return
  }

  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  const type = params.get('type')

  let cancelled = false

  const finish = (next: Status) => {
    if (!cancelled) setStatus(next)
  }

  const run = async () => {
    setStatus({ state: 'initializing' })

    if (code && type === 'recovery') {
      const { error } = await supabase!.auth.exchangeCodeForSession(code)
      if (error) {
        finish({
          state: 'error',
          message:
            'This password reset link is invalid or has expired. Please request a new one from the app.',
        })
        return
      }
      finish({ state: 'ready' })
      return
    }

    const tokens = parseRecoveryTokensFromUrl(window.location.href)
    if (tokens) {
      const { error } = await supabase!.auth.setSession({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      })
      if (error) {
        finish({
          state: 'error',
          message:
            'This password reset link is invalid or has expired. Please request a new one from the app.',
        })
        return
      }
      finish({ state: 'ready' })
      return
    }

    finish({
      state: 'error',
      message:
        'This password reset link is invalid or has expired. Please request a new one from the app.',
    })
  }

  void run()
  return () => {
    cancelled = true
  }
}, [])
```

Add import:

```ts
import { parseRecoveryTokensFromUrl } from '../utils/recoveryLink'
import { CUSTOMER_APP_PLAY_URL } from '../lib/appLinks'
```

- [ ] **Step 3: Add success UI with app links**

After the existing success banner, add download links (only when `status.state === 'success'`):

```tsx
{status.state === 'success' && (
  <div className="mt-4 flex flex-col sm:flex-row gap-3">
    <a
      href={CUSTOMER_APP_PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
    >
      Get the app on Google Play
    </a>
    {import.meta.env.VITE_APP_STORE_URL ? (
      <a
        href={import.meta.env.VITE_APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-md border border-primary/30 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5"
      >
        Download on the App Store
      </a>
    ) : null}
  </div>
)}
```

- [ ] **Step 4: Hide form when not ready**

Wrap the `<form>` in a condition so it only renders when `status.state === 'ready' || status.state === 'submitting'`.

- [ ] **Step 5: Build to verify no TypeScript errors**

Run: `npm run build`  
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/pages/ResetPassword.tsx
git commit -m "fix: complete reset password recovery flow and success app links"
```

---

### Task 3: Update deployment docs

**Files:**
- Modify: `WaterTankerWeb/DEPLOYMENT.md`

- [ ] **Step 1: Add password reset section**

Under Environment Variables table, add a note row or subsection:

```markdown
### Password reset redirect

Add `https://tankerhub.in/auth/reset-password` to **Supabase Dashboard → Authentication → URL Configuration → Redirect URLs**.

The mobile app sends password recovery emails with this redirect. Vercel must have `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` set so the reset page can establish a session.
```

Add to Verify Production checklist:

```markdown
- [ ] Password reset link from app email opens `/auth/reset-password` and allows setting a new password
```

- [ ] **Step 2: Commit**

```bash
git add DEPLOYMENT.md
git commit -m "docs: document password reset redirect URL configuration"
```

---

### Task 4: Update mobile app redirect URL

**Files:**
- Modify: `water-customer-app/src/utils/recoveryLink.ts`
- Modify: `water-customer-app/.env.example`
- Test: `water-customer-app/src/__tests__/services/auth.password.test.ts` (update expected redirect if hardcoded)

**Interfaces:**
- Produces: `getPasswordResetRedirectUrl()` returns `https://tankerhub.in/auth/reset-password` when env unset

- [ ] **Step 1: Update default redirect in recoveryLink.ts**

Change fallback in `getPasswordResetRedirectUrl()`:

```ts
export function getPasswordResetRedirectUrl(): string {
  return (
    process.env.EXPO_PUBLIC_PASSWORD_RESET_REDIRECT_URL ||
    'https://tankerhub.in/auth/reset-password'
  )
}
```

- [ ] **Step 2: Update .env.example**

```env
# Password reset: web page where users set a new password after clicking the email link.
# Must be listed in Supabase Auth → URL Configuration → Redirect URLs.
EXPO_PUBLIC_PASSWORD_RESET_REDIRECT_URL=https://tankerhub.in/auth/reset-password
```

- [ ] **Step 3: Update auth.password.test.ts if redirect is asserted**

In `src/__tests__/services/auth.password.test.ts`, update the expected `redirectTo` in the `resetPasswordForEmail` assertion to `https://tankerhub.in/auth/reset-password`.

- [ ] **Step 4: Run mobile tests**

Run in `E:\water-customer-app`:

```bash
npm test -- src/__tests__/services/auth.password.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/recoveryLink.ts .env.example src/__tests__/services/auth.password.test.ts
git commit -m "fix: redirect password reset emails to tankerhub.in web page"
```

---

### Task 5: Supabase + production verification (manual)

**Files:** none (dashboard + deploy)

- [ ] **Step 1: Supabase allowlist**

In Supabase Dashboard → Authentication → URL Configuration, add:

`https://tankerhub.in/auth/reset-password`

- [ ] **Step 2: Deploy WaterTankerWeb**

Push WaterTankerWeb changes and confirm Vercel production deploy succeeds with Supabase env vars set.

- [ ] **Step 3: End-to-end test**

1. Set `EXPO_PUBLIC_PASSWORD_RESET_REDIRECT_URL=https://tankerhub.in/auth/reset-password` in mobile app `.env` (or rely on new default after rebuild).
2. Request password reset from mobile app.
3. Confirm email link contains `redirect_to=https%3A%2F%2Ftankerhub.in%2Fauth%2Freset-password`.
4. Click link → page loads with password form.
5. Set new password → success banner + app links appear.
6. Sign in on mobile with new password → succeeds.

---

## Plan Self-Review

| Spec requirement | Task |
|------------------|------|
| Web redirect URL | Task 4 |
| Route `/auth/reset-password` | Task 2 (existing route) |
| PKCE + hash recovery | Task 1 + Task 2 |
| Form validation + updateUser | Task 2 (existing, refined) |
| Success with app links, no redirect | Task 2 |
| Error handling | Task 2 |
| Remove debug logs | Task 2 |
| Supabase allowlist docs | Task 3 + Task 5 |
| Minimal mobile app diff | Task 4 |
| E2E testing | Task 5 |

No placeholders remain. Types consistent across tasks.
