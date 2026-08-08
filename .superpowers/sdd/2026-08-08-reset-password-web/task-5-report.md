# Task 5 Report: Supabase + production verification

**Status:** MANUAL — requires operator actions outside codebase

## Automated verification completed

- WaterTankerWeb `npm test` — 3/3 passing (Task 1)
- WaterTankerWeb `npm run build` — PASS (Task 2)
- water-customer-app `auth.password.test.ts` — 10/10 passing (Task 4)

## Operator checklist (required before production E2E)

### 1. Supabase allowlist

In Supabase Dashboard → Authentication → URL Configuration → Redirect URLs, add:

`https://tankerhub.in/auth/reset-password`

Optional: keep `wtccustomer://reset-password` for legacy deep links.

### 2. Vercel env vars (WaterTankerWeb)

Confirm production has:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 3. Deploy WaterTankerWeb

Push commits on `main` (currently ahead of origin) and confirm Vercel production deploy succeeds.

Commits to deploy:
- `51e57df` recovery token parser
- `f54b8f0` reset password page fix
- `5a2f0ec` deployment docs

### 4. Mobile app

Rebuild/redeploy customer app with updated default redirect (commit `c3d8a1f`), or ensure production `.env` sets:

`EXPO_PUBLIC_PASSWORD_RESET_REDIRECT_URL=https://tankerhub.in/auth/reset-password`

### 5. End-to-end test

1. Request password reset from mobile app
2. Confirm email link contains `redirect_to=https%3A%2F%2Ftankerhub.in%2Fauth%2Freset-password`
3. Click link → `/auth/reset-password` renders form
4. Set new password → success banner + app links
5. Sign in on mobile with new password

## Blockers

None in code. Production verification blocked on dashboard config + deploy.
