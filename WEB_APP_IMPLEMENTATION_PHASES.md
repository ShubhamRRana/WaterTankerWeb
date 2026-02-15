# Water Tanker Web App — Phased Implementation Guide

This document breaks down the web landing site build into phases. Complete each phase before moving to the next. Reference `WEB_APP_TECH_STACK.md` for tech stack and architecture details.

---

## Phase 1: Project Setup

**Goal:** Initialize the project, configure tooling, and establish the base layout.

### 1.1 Create Project

- [x] Create Vite + React + TypeScript project: `npm create vite@latest water-tanker-web -- --template react-ts`
- [x] Install dependencies: React Router, Tailwind CSS, React Hook Form, Zod, Lucide React
- [x] Configure Tailwind (colors: primary `#3e5c76`, accent `#fca311`, background `#f0ebd8`)

### 1.2 Project Structure

- [x] Create folders: `src/components/ui`, `src/components/layout`, `src/pages`, `src/utils`, `src/api`
- [x] Set up React Router with routes: `/`, `/privacy`, `/contact`
- [x] Create `App.tsx` with `Outlet` and basic layout shell

### 1.3 Environment

- [x] Create `.env.example` with `VITE_APP_STORE_URL`, `VITE_PLAY_STORE_URL`, `VITE_FORMSPREE_ID`
- [x] Create `.env` (add to `.gitignore` if not already)

### 1.4 Base Layout

- [x] Create `Header` component with logo/brand and nav links (Home, Privacy, Contact)
- [x] Create `Footer` component with copyright and nav links
- [x] Add favicon and apple-touch-icon to `public/`

**Phase 1 complete when:** Project runs locally, routes work, header/footer render on all pages.

---

## Phase 2: Landing Page

**Goal:** Build the main landing page with App Store and Play Store download links.

### 2.1 Landing Page Content

- [x] Create `Landing.tsx` page
- [x] Add hero section with app name and tagline
- [x] Add brief description of the Water Tanker app

### 2.2 Download Links

- [x] Add App Store button/badge linking to `import.meta.env.VITE_APP_STORE_URL`
- [x] Add Play Store button/badge linking to `import.meta.env.VITE_PLAY_STORE_URL`
- [x] Use official badge assets (download from Apple/Google) or styled buttons
- [x] Ensure links open in new tab (`target="_blank"`, `rel="noopener noreferrer"`)

**Implementation:** Local App Store badge (`public/app-store-badge.svg`), official Google Play badge URL. Fallback message when neither store URL is configured.

### 2.3 Responsive Design

- [x] Make landing page responsive (mobile, tablet, desktop)
- [x] Stack download buttons vertically on mobile, side-by-side on larger screens

**Phase 2 complete when:** Landing page displays correctly, store links work, layout is responsive.

---

## Phase 3: Privacy Policy Page

**Goal:** Create a dedicated privacy policy page for app store compliance.

### 3.1 Content Structure

- [x] Create `PrivacyPolicy.tsx` page
- [x] Add sections: Introduction, Data We Collect, How We Use Data, Third Parties, User Rights, Contact

### 3.2 Content

- [x] Write or paste privacy policy text (or use a template and customize)
- [x] Include contact email/address for privacy inquiries
- [x] Add "Last updated" date

### 3.3 Styling

- [x] Style for readability (max-width, line-height, headings)
- [x] Ensure mobile-friendly layout

**Phase 3 complete when:** Privacy policy page is live at `/privacy` with full content. ✓ **Phase 3 completed**

---

## Phase 4: Contact / Query Form

**Goal:** Implement the contact form with validation and form-to-email integration.

### 4.1 Form Service Setup

- [x] Choose form service (Formspree recommended for simplicity)
- [x] Create Formspree form, get form ID — see `FORMSPREE_SETUP.md` for step-by-step guide
- [x] Add `VITE_FORMSPREE_ID` to `.env` (already in `.env.example`; replace `your-form-id` with your Formspree form ID)

### 4.2 Form Component

- [x] Create `Contact.tsx` page with form
- [x] Fields: name, email, subject, message
- [x] Use React Hook Form + Zod for validation
- [x] Add loading state and success/error messages

### 4.3 Form Submission

- [x] On submit: POST to Formspree endpoint (or Netlify Forms if using Netlify)
- [x] Handle success: show thank-you message
- [x] Handle error: show error message, keep form data

### 4.4 Styling

- [x] Style form inputs and button to match site theme
- [x] Ensure form is accessible (labels, focus states)

**Phase 4 complete when:** Contact form validates, submits successfully, and emails are received.

---

## Phase 5: Polish & Deployment

**Goal:** Final touches and deploy to production.

### 5.1 Polish

- [x] Add loading states where needed
- [x] Ensure consistent spacing and typography
- [x] Test all links (store URLs, nav, footer)
- [x] Test form on mobile and desktop
- [x] Add meta tags for SEO (title, description)

**Phase 5.1 implementation notes:** Added `PageLoader` component and `Suspense` boundary for route loading; `loading="lazy"` on store badge images; `react-helmet-async` for per-page SEO (title, description, og:title); base typography and spacing utilities in `index.css` and `tailwind.config.js`. Run `npm run dev` and manually verify store URLs, nav/footer links, and form on mobile/desktop.

### 5.2 Deployment Prep

- [x] Choose hosting (Vercel or Netlify)
- [x] Set env vars in hosting dashboard (`VITE_APP_STORE_URL`, `VITE_PLAY_STORE_URL`, `VITE_FORMSPREE_ID`)
- [x] Ensure build succeeds: `npm run build`

**Phase 5.2 implementation notes:** Build verified with `npm run build`. Added `vercel.json` and `netlify.toml` for Vercel/Netlify. Created `DEPLOYMENT.md` with env var table and step-by-step hosting instructions. Set env vars in your chosen platform's dashboard before first deploy.

### 5.3 Deploy

- [ ] Connect repo to Vercel/Netlify
- [ ] Deploy and verify production URL
- [ ] Test production site (store links, form, privacy page)

**Phase 5 complete when:** Site is live, all features work in production.

---

## Phase Summary

| Phase | Focus | Key Deliverable |
|-------|-------|-----------------|
| 1 | Project setup | Running app with layout and routing |
| 2 | Landing page | Store download links live |
| 3 | Privacy policy | `/privacy` page with full content |
| 4 | Contact form | Working form with form-to-email |
| 5 | Polish & deploy | Production site live |

---

## Quick Reference

- **Tech stack:** See `WEB_APP_TECH_STACK.md`
- **Deployment:** See `DEPLOYMENT.md` for Vercel/Netlify setup
- **Store URLs:** Use placeholder URLs until app is published; update when live
- **Form service:** Formspree free tier = 50 submissions/month
