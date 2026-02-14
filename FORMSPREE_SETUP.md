# Formspree Setup Guide

This guide walks you through setting up Formspree for the Water Tanker contact form.

## Step 1: Create a Formspree Account

1. Go to [formspree.io](https://formspree.io)
2. Sign up (free tier: 50 submissions/month)

## Step 2: Create a New Form

1. Log in to your Formspree dashboard
2. Click **"+ New Form"**
3. Name it (e.g., "Water Tanker Contact")
4. Add your email to receive submissions

## Step 3: Get Your Form ID

1. After creating the form, open it in the dashboard
2. Go to **Integration** (or **Settings**)
3. Find **"Your form's endpoint is"** — it looks like: `https://formspree.io/f/xxxxxxx`
4. Copy the form ID (the part after `/f/`, e.g., `myzkjveq`)

## Step 4: Configure the Project

1. Open `.env` in the project root
2. Replace `your-form-id` with your actual Formspree form ID:

```env
VITE_FORMSPREE_ID=myzkjveq
```

3. Restart the dev server if it's running (`npm run dev`)

## Step 5: Configure Form Fields (Optional)

In Formspree, you can map form fields. The contact form sends:

- `name` — Sender's name
- `email` — Sender's email
- `subject` — Message subject
- `message` — Message body

Formspree accepts any field names by default; no extra configuration needed.

## Troubleshooting

- **Submissions not received?** Check spam folder; verify form ID in `.env`
- **CORS errors?** Formspree allows cross-origin requests; ensure you're using the correct endpoint
- **Rate limit?** Free tier = 50 submissions/month; upgrade if needed
