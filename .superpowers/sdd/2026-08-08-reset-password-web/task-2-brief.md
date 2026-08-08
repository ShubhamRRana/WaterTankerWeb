# Task 2 Brief: Complete ResetPassword page

**Repo:** `E:\WaterTankerWeb`

**Files:**
- Modify: `src/pages/ResetPassword.tsx`
- Modify: `src/lib/appLinks.ts` (only if App Store URL export needed — use `import.meta.env.VITE_APP_STORE_URL` directly per plan)

**Interfaces:**
- Consumes: `parseRecoveryTokensFromUrl` from `../utils/recoveryLink` (added in Task 1)
- Consumes: `CUSTOMER_APP_PLAY_URL` from `../lib/appLinks`; `import.meta.env.VITE_APP_STORE_URL` for iOS link
- Produces: page states `initializing | ready | submitting | success | error`

## Steps

### Step 1: Remove debug instrumentation

Delete all `// #region agent log` blocks and localhost `fetch(...)` calls from `ResetPassword.tsx`.

### Step 2: Rewrite session initialization `useEffect`

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

Add imports:

```ts
import { parseRecoveryTokensFromUrl } from '../utils/recoveryLink'
import { CUSTOMER_APP_PLAY_URL } from '../lib/appLinks'
```

### Step 3: Add success UI with app links

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

Note: merge with existing success banner block — avoid duplicating two separate `{status.state === 'success' && (...)}` blocks if possible; keep one success section with banner + links.

### Step 4: Hide form when not ready

Wrap the `<form>` in a condition so it only renders when `status.state === 'ready' || status.state === 'submitting'`.

### Step 5: Build to verify no TypeScript errors

Run: `npm run build`  
Expected: PASS

### Step 6: Commit

```bash
git add src/pages/ResetPassword.tsx
git commit -m "fix: complete reset password recovery flow and success app links"
```

## Global Constraints

- Reuse existing WaterTankerWeb patterns; keep diff minimal.
- Do not change unrelated pages or auth flows.
- Remove all debug `fetch('http://127.0.0.1:7244/...')` calls.
- Success: stay on page with success message + app download links (no auto-redirect).
