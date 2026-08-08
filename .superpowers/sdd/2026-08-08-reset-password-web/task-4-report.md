# Task 4 Report: Update mobile app redirect URL

**Status:** Complete  
**Repo:** `E:\water-customer-app`  
**Date:** 2026-08-08

## Summary

Updated the password reset redirect URL in the mobile app from the in-app deep link (`wtccustomer://reset-password`) to the web reset page (`https://tankerhub.in/auth/reset-password`). Password reset emails now send users to the TankerHub web flow instead of opening the app directly.

## Changes

| File | Change |
|------|--------|
| `src/utils/recoveryLink.ts` | Default fallback in `getPasswordResetRedirectUrl()` set to `https://tankerhub.in/auth/reset-password` |
| `.env.example` | Updated `EXPO_PUBLIC_PASSWORD_RESET_REDIRECT_URL` and comments to document web redirect |
| `src/__tests__/services/auth.password.test.ts` | Updated `resetPasswordForEmail` assertion to expect `https://tankerhub.in/auth/reset-password` |

## Tests

```
npm test -- src/__tests__/services/auth.password.test.ts
```

**Result:** PASS — 10/10 tests passed (1 suite)

## Commit

```
c3d8a1f fix: redirect password reset emails to tankerhub.in web page
```

## Out of scope (unchanged)

- `SetNewPasswordScreen`, auth store, and other auth flows left untouched per brief
- `parseRecoveryTokensFromUrl` tests retained for deep-link parsing (still used if tokens arrive via URL hash)

## Follow-up / concerns

- Ensure `https://tankerhub.in/auth/reset-password` is listed in **Supabase Auth → URL Configuration → Redirect URLs** for the production project.
- Developers with local `.env` files may still have `wtccustomer://reset-password`; they should update to the web URL or rely on the new code default after pulling.
- Existing `.env` overrides take precedence over the new default; only unset env uses the web URL automatically.
