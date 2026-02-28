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

## Step 6: Email to support@tankerhub.in (Optional)

Submissions are stored in the database only until you enable the Edge Function. To send each submission to **support@tankerhub.in**:

### 6a. Resend setup

1. Sign up at [resend.com](https://resend.com) and create an **API key**.
2. (Recommended) Verify your domain in Resend so you can send from e.g. `noreply@tankerhub.in`. Until then, Resend’s default sender works for testing.

### 6b. Deploy the Edge Function

1. Install the [Supabase CLI](https://supabase.com/docs/guides/cli#installation) and log in: `supabase login`.
2. Link the project (from the project root):  
   `supabase link --project-ref YOUR_PROJECT_REF`  
   (Find **Project ref** in Dashboard → Project Settings → General.)
3. From the project root, deploy the function:  
   `supabase functions deploy send-contact-email`
4. In **Supabase Dashboard** → **Edge Functions** → **send-contact-email** → **Secrets**, add:
   - **RESEND_API_KEY** — your Resend API key (required).
   - **CONTACT_WEBHOOK_SECRET** — (optional) a random string; if set, the client must send the same value so only your app can trigger the function. Add the same value in your app env as `VITE_CONTACT_WEBHOOK_SECRET`.
   - **FROM_EMAIL** — (optional) e.g. `Water Tanker <noreply@support.tankerhub.in>`. If unset, uses Resend’s default sender.

After this, each contact form submit will still insert into `contact_submissions` and will also trigger the function to email **support@tankerhub.in** (with reply-to set to the sender’s email).

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **"Form service not configured"** | Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in `.env` |
| **403 / RLS policy violation** | Verify the `anon` insert policy exists on `contact_submissions` |
| **CORS errors** | Supabase allows cross-origin requests; ensure URL and key are correct |
| **Build fails** | Run `npm install` to ensure `@supabase/supabase-js` is installed |
| **Email not received / Edge Function error** | Deploy `send-contact-email` and set `RESEND_API_KEY` in Edge Function secrets. If you set `CONTACT_WEBHOOK_SECRET`, add the same value as `VITE_CONTACT_WEBHOOK_SECRET` in `.env`. |
| **"You can only send testing emails to your own email"** | The sender was `onboarding@resend.dev`. Use your verified domain: set **FROM_EMAIL** in Edge Function secrets to e.g. `Water Tanker <noreply@support.tankerhub.in>`, or redeploy so the default `noreply@support.tankerhub.in` is used. |

---

## Migration from Formspree

If you previously used Formspree:

- Remove `VITE_FORMSPREE_ID` from `.env` and hosting env vars
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` instead
- Delete or ignore `FORMSPREE_SETUP.md` (no longer used)
