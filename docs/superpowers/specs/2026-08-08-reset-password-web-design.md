# Reset Password Web Flow — Design Spec

**Date:** 2026-08-08  
**Status:** Approved  
**Repos:** `WaterTankerWeb`, `water-customer-app` (redirect URL only)

## Problem

Password reset emails redirect to `wtccustomer://reset-password` (mobile deep link). When users open the link in a browser, no web page loads — they see a blank or broken screen.

Example email verify URL:

```
https://<project>.supabase.co/auth/v1/verify?token=...&type=recovery&redirect_to=wtccustomer%3A%2F%2Freset-password
```

## Goal

After clicking the reset link in email, users land on `https://tankerhub.in/auth/reset-password`, set a new password via Supabase auth, and see a success state with links to open/download the mobile app.

## Architecture

1. Mobile app sends `resetPasswordForEmail` with `redirectTo: https://tankerhub.in/auth/reset-password`.
2. Supabase verifies the token and redirects to the web page with recovery session credentials (PKCE `?code=` or hash `#access_token=`).
3. `ResetPassword.tsx` establishes a Supabase session, renders a password form, calls `updateUser({ password })`, and shows success with app store links.
4. No active login session is required; the recovery session from the link is sufficient.

## Configuration

### Supabase Dashboard → Auth → URL Configuration

Add to **Redirect URLs**:

- `https://tankerhub.in/auth/reset-password`

Optional (keep for future deep-link use):

- `wtccustomer://reset-password`

### Vercel (WaterTankerWeb)

Required at build time:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Mobile app (`water-customer-app`)

Update default and documented value:

- `EXPO_PUBLIC_PASSWORD_RESET_REDIRECT_URL=https://tankerhub.in/auth/reset-password`

## WaterTankerWeb Changes

### Route

Existing route — no change:

- Path: `/auth/reset-password`
- File: `src/pages/ResetPassword.tsx`

### New utility: `src/utils/recoveryLink.ts`

Parse Supabase recovery tokens from URL hash:

```ts
interface RecoveryTokens {
  access_token: string
  refresh_token: string
  type: string
}

function parseRecoveryTokensFromUrl(url: string): RecoveryTokens | null
```

Same logic as `water-customer-app/src/utils/recoveryLink.ts`.

### `ResetPassword.tsx` behavior

**On load:**

1. If Supabase not configured → show error banner; do not leave status stuck at `idle`.
2. If `?code=` and `type=recovery` → `exchangeCodeForSession(code)`.
3. Else if hash contains `#access_token=...&type=recovery` → `setSession({ access_token, refresh_token })`.
4. Else if no recovery params → show error: invalid or expired link.
5. Remove all debug `fetch('http://127.0.0.1:7244/...')` instrumentation.

**Form:**

- Fields: new password, confirm password
- Validation: min 8 characters, passwords must match (Zod + react-hook-form)
- Submit: `supabase.auth.updateUser({ password })`

**Success (Option A — approved):**

- Green success banner
- Hide password form
- Show app download links via `CUSTOMER_APP_PLAY_URL` and `VITE_APP_STORE_URL` from `src/lib/appLinks.ts`
- No auto-redirect

**Errors:**

- Invalid/expired link → ask user to request a new reset from the mobile app
- Supabase not configured → temporarily unavailable message
- `updateUser` failure → show Supabase error message

### Documentation

Update `DEPLOYMENT.md`:

- Document reset redirect URL and Supabase allowlist requirement

## Mobile App Changes (minimal)

| File | Change |
|------|--------|
| `src/utils/recoveryLink.ts` | Default redirect URL → `https://tankerhub.in/auth/reset-password` |
| `.env.example` | Same default + updated comment |

No changes to `SetNewPasswordScreen`, auth store deep-link handling, or other auth flows.

## Out of Scope

- Web forgot-password page (remains mobile-only)
- New routes or login page on web
- Removing `wtccustomer://` deep-link support from mobile app
- Unrelated UI refactors

## Acceptance Criteria

1. Reset link lands on a real page at `https://tankerhub.in/auth/reset-password`, not a blank screen.
2. User can set a new password successfully.
3. Errors are handled with user-friendly messages.
4. Success shows app download/open links; no auto-redirect.
5. Code follows existing repo patterns; diff is minimal and production-ready.

## Testing

1. Request reset from mobile app → email contains `redirect_to=https://tankerhub.in/auth/reset-password`.
2. Click link → reset page renders with form.
3. Submit valid matching passwords → success banner + app links.
4. Sign in on mobile with new password → succeeds.
5. Expired/tampered link → friendly error.
6. Mismatched passwords → inline validation error.
