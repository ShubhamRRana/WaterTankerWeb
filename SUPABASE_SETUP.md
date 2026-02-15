# Supabase Setup Guide — Contact Form

This guide walks you through setting up Supabase for the Water Tanker web contact form. Use the same Supabase project as your Water Tanker mobile app for a unified backend.

---

## Step 1: Use Your Existing Supabase Project

1. Log in to [supabase.com](https://supabase.com)
2. Open your **Water Tanker** project (or create one if needed)
3. Go to **Project Settings** → **API** to get:
   - **Project URL** (e.g. `https://xxxxx.supabase.co`)
   - **anon public** key (safe to use in frontend)

---

## Step 2: Create the Contact Submissions Table

In the Supabase **SQL Editor**, run:

```sql
-- Contact form submissions table
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table contact_submissions enable row level security;

-- Allow anonymous inserts (public contact form — no login required)
create policy "Allow anonymous inserts"
  on contact_submissions for insert
  to anon
  with check (true);

-- Restrict reads to authenticated users only (optional — protects submissions)
create policy "Only authenticated can read"
  on contact_submissions for select
  to authenticated
  using (true);
```

---

## Step 3: Configure the Project

1. Copy `.env.example` to `.env` if needed
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

3. Restart the dev server if it's running (`npm run dev`)

---

## Step 4: Form Fields

The contact form sends:

| Field   | Type   | Description        |
|---------|--------|--------------------|
| `name`  | text   | Sender's name      |
| `email` | text   | Sender's email     |
| `subject` | text | Message subject    |
| `message` | text | Message body       |

These map directly to the `contact_submissions` table columns.

---

## Step 5: View Submissions

- **Supabase Dashboard** → **Table Editor** → `contact_submissions`
- Or use SQL: `select * from contact_submissions order by created_at desc;`

---

## Step 6: Email Notifications (Optional)

Supabase does not send emails automatically. To get notified on new submissions:

1. **Supabase Edge Function** — Trigger on insert, call Resend/SendGrid/etc.
2. **Database webhook** — Use Supabase webhooks to POST to an external service
3. **Manual** — Check the dashboard periodically

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **"Form service not configured"** | Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in `.env` |
| **403 / RLS policy violation** | Verify the `anon` insert policy exists on `contact_submissions` |
| **CORS errors** | Supabase allows cross-origin requests; ensure URL and key are correct |
| **Build fails** | Run `npm install` to ensure `@supabase/supabase-js` is installed |

---

## Migration from Formspree

If you previously used Formspree:

- Remove `VITE_FORMSPREE_ID` from `.env` and hosting env vars
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` instead
- Delete or ignore `FORMSPREE_SETUP.md` (no longer used)
