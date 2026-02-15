# Water Tanker App — Web Landing Site: Tech Stack & Implementation Guide

This document describes the tech stack and architecture for a **simple web landing site** that supports the Water Tanker mobile app. The web app does **not** accept bookings — it exists solely to direct users to install the mobile app, display the privacy policy, and accept contact queries.

---

## 1. Overview

| Item | Description |
|------|-------------|
| **Goal** | Marketing/landing site: App Store / Play Store download links, Privacy Policy, and Contact/Query form. **No bookings from web.** |
| **App type** | Static/marketing site — responsive, minimal. |
| **Backend** | Supabase (same as mobile app). Contact form stores submissions in `contact_submissions` table. |
| **Auth** | None — all pages are public. |
| **Deployment** | Static hosting (Vercel, Netlify, or similar); HTTPS required. |

---

## 2. Recommended Tech Stack

### 2.1 Core

| Layer | Technology | Version / Notes |
|-------|------------|-----------------|
| **Framework** | React | 18.x |
| **Build tool** | Vite | 5.x (fast dev, optimized production build) |
| **Language** | TypeScript | 5.x |
| **Routing** | React Router | v6 |
| **Contact form** | Supabase | Inserts into `contact_submissions` table; same backend as mobile app. |
| **Forms** | React Hook Form | 7.x |
| **Validation** | Zod | 3.x |

### 2.2 UI & Styling

| Layer | Technology | Notes |
|-------|------------|--------|
| **Styling** | Tailwind CSS | Utility-first; align with mobile app colors (e.g. primary `#3e5c76`, accent `#fca311`). |
| **Optional UI kit** | shadcn/ui (Radix) | Accessible components for form inputs, buttons. |
| **Icons** | Lucide React or Heroicons | SVG; no native dependency. |

### 2.3 Dev & Quality

| Layer | Technology |
|-------|------------|
| **Linting** | ESLint (TypeScript + React) |
| **Formatting** | Prettier |
| **Testing** | Vitest (unit), React Testing Library (optional) |
| **Env** | Vite env vars (`VITE_*`) for store links and form endpoint (if needed) |

---

## 3. Project Structure (Suggested)

```
water-tanker-web/
├── .env.example
├── .env                    # Store URLs; form service endpoint (if used)
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── public/
│   ├── favicon.ico
│   └── apple-touch-icon.png
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── api/
    │   └── contact.ts       # Optional: fetch to form service endpoint
    ├── components/
    │   ├── ui/              # Buttons, inputs, cards
    │   └── layout/          # Header, footer (with store links, nav)
    ├── pages/
    │   ├── Landing.tsx      # App Store / Play Store download links
    │   ├── PrivacyPolicy.tsx
    │   └── Contact.tsx      # Query submission form
    ├── hooks/
    ├── utils/               # Form validation helpers
    └── routes.tsx           # React Router: /, /privacy, /contact
```

---

## 4. Contact Form — Supabase

The contact form uses **Supabase** (same project as the Water Tanker mobile app):

| Aspect | Details |
|--------|---------|
| **Table** | `contact_submissions` (name, email, subject, message, created_at) |
| **Auth** | Anonymous inserts allowed via RLS; no login required |
| **Viewing** | Supabase Dashboard → Table Editor, or SQL queries |

**Implementation:** `@supabase/supabase-js` client; `submitContactForm()` inserts into `contact_submissions`. See `SUPABASE_SETUP.md` for setup.

---

## 5. Features to Implement

**Note:** The web app does **not** accept bookings. All booking flows happen in the mobile app.

### 5.1 Landing Page (`/`)

- Entry point with prominent links to **App Store** and **Play Store** for installing the mobile app.
- Use env vars `VITE_APP_STORE_URL` and `VITE_PLAY_STORE_URL` for configurable URLs.
- Display official download badges (Apple App Store badge, Google Play badge).
- Header/footer with navigation to Privacy Policy and Contact.

### 5.2 Privacy Policy (`/privacy`)

- Static page describing data collection, usage, storage, and user rights.
- Required for app store compliance.
- Include sections: data collected, how it's used, third parties, user rights, contact info.

### 5.3 Contact / Query Form (`/contact`)

- Form fields: name, email, subject, message.
- Use React Hook Form + Zod for validation.
- On submit: insert into Supabase `contact_submissions` table.

---

## 6. Environment & Config

### 6.1 `.env.example` (Web)

```env
# App store links (for download badges on landing/footer)
VITE_APP_STORE_URL=https://apps.apple.com/app/your-app-id
VITE_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=your.package.name

# Supabase (for contact form) — see SUPABASE_SETUP.md
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 6.2 Constants

- `UI_CONFIG` (colors, spacing) — align with mobile app branding.

---

## 7. Security & Deployment

- **No backend**: Static site; form submissions handled by third-party service.
- **Env**: Never commit `.env`; use `VITE_*` for store links and optional form config.
- **HTTPS**: Required; Vercel/Netlify provide HTTPS by default.

---

## 8. Implementation Phases

| Phase | Scope | Deliverable |
|-------|--------|-------------|
| 1 | Project init, Supabase setup for contact form | Base setup |
| 2 | Landing page (App Store / Play Store links), Privacy Policy, Contact form | Full landing site live |

---

## 9. Checklist Before Development

- [ ] App Store and Play Store URLs configured in env.
- [ ] Supabase configured (URL + anon key); `contact_submissions` table created.
- [ ] Node.js 18+ and npm/pnpm installed.
- [ ] Hosting chosen (e.g. Vercel, Netlify).

---

## 10. Summary

| Item | Choice |
|------|--------|
| **Purpose** | Landing site only — no bookings; directs users to mobile app |
| **Stack** | React + TypeScript + Vite + React Router |
| **UI** | Tailwind CSS + (optional) shadcn/ui |
| **Backend** | Supabase — contact form stores in `contact_submissions` |
| **Pages** | Landing (store links), Privacy Policy, Contact/Query form |
| **Deploy** | Static build (Vercel/Netlify) with HTTPS |

The web app supports the mobile app by providing download links, privacy policy, and a way for users to submit queries.
