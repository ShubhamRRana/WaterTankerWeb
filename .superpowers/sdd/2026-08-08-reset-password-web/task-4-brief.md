# Task 4 Brief: Update mobile app redirect URL

**Repo:** `E:\water-customer-app`

**Files:**
- Modify: `src/utils/recoveryLink.ts`
- Modify: `.env.example`
- Modify: `src/__tests__/services/auth.password.test.ts` (update expected redirect if hardcoded)

**Interfaces:**
- Produces: `getPasswordResetRedirectUrl()` returns `https://tankerhub.in/auth/reset-password` when env unset

## Steps

### Step 1: Update default redirect in recoveryLink.ts

Change fallback in `getPasswordResetRedirectUrl()`:

```ts
export function getPasswordResetRedirectUrl(): string {
  return (
    process.env.EXPO_PUBLIC_PASSWORD_RESET_REDIRECT_URL ||
    'https://tankerhub.in/auth/reset-password'
  )
}
```

### Step 2: Update .env.example

```env
# Password reset: web page where users set a new password after clicking the email link.
# Must be listed in Supabase Auth → URL Configuration → Redirect URLs.
EXPO_PUBLIC_PASSWORD_RESET_REDIRECT_URL=https://tankerhub.in/auth/reset-password
```

### Step 3: Update auth.password.test.ts if redirect is asserted

In `src/__tests__/services/auth.password.test.ts`, update the expected `redirectTo` in the `resetPasswordForEmail` assertion to `https://tankerhub.in/auth/reset-password`.

### Step 4: Run mobile tests

Run in `E:\water-customer-app`:

```bash
npm test -- src/__tests__/services/auth.password.test.ts
```

Expected: PASS

### Step 5: Commit

```bash
git add src/utils/recoveryLink.ts .env.example src/__tests__/services/auth.password.test.ts
git commit -m "fix: redirect password reset emails to tankerhub.in web page"
```

## Global Constraints

- Minimal diff; do not change SetNewPasswordScreen, auth store, or other auth flows.
