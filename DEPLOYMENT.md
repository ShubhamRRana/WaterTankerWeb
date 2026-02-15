# Deployment Guide

This guide covers deploying the Water Tanker Web App to Vercel or Netlify.

## Prerequisites

- Build succeeds locally: `npm run build`
- Git repository pushed to GitHub/GitLab/Bitbucket

## Environment Variables

Set these in your hosting dashboard before deploying:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_APP_STORE_URL` | App Store download URL | `https://apps.apple.com/app/your-app-id` |
| `VITE_PLAY_STORE_URL` | Play Store download URL | `https://play.google.com/store/apps/details?id=your.package.name` |
| `VITE_SUPABASE_URL` | Supabase project URL for contact form | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

> **Note:** Vite only exposes env vars prefixed with `VITE_`. These are baked into the build at deploy time.

---

## Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New** → **Project** and import your repo.
3. Vercel auto-detects Vite. Confirm:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variables under **Settings** → **Environment Variables**.
5. Deploy.

---

## Netlify

1. Go to [netlify.com](https://netlify.com) and sign in with GitHub.
2. Click **Add new site** → **Import an existing project**.
3. Connect your repo. Netlify uses `netlify.toml` for build settings.
4. Add environment variables under **Site settings** → **Environment variables**.
5. Deploy.

---

---

## Phase 5.3: Deploy (Step-by-Step)

### Option A: Vercel (Recommended)

1. **Connect repo**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click **Add New** → **Project**
   - Import the `WaterTankerWeb` (or your repo name) repository
   - Vercel auto-detects Vite; confirm Build Command: `npm run build`, Output: `dist`

2. **Add environment variables**
   - In project **Settings** → **Environment Variables**, add:
     - `VITE_APP_STORE_URL`, `VITE_PLAY_STORE_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

3. **Deploy**
   - Click **Deploy** (or push to `main` for auto-deploy)
   - Or run locally: `npx vercel --prod` (after `vercel link` if first time)

### Option B: Netlify

1. **Connect repo**
   - Go to [netlify.com](https://netlify.com) and sign in with GitHub
   - Click **Add new site** → **Import an existing project**
   - Connect your repo; `netlify.toml` provides build settings

2. **Add environment variables**
   - **Site settings** → **Environment variables** → add the four `VITE_*` vars

3. **Deploy**
   - Trigger deploy from Netlify dashboard or push to `main`

### Verify Production

- [ ] Store links work (App Store, Play Store)
- [ ] Contact form submits successfully
- [ ] Privacy policy page loads at `/privacy`
- [ ] All nav and footer links work
- [ ] Site is responsive on mobile
