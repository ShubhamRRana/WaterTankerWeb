# Task 3 Brief: Update deployment docs

**Repo:** `E:\WaterTankerWeb`

**Files:**
- Modify: `DEPLOYMENT.md`

## Steps

### Step 1: Add password reset section

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

### Step 2: Commit

```bash
git add DEPLOYMENT.md
git commit -m "docs: document password reset redirect URL configuration"
```

## Global Constraints

- Keep diff minimal; docs only.
