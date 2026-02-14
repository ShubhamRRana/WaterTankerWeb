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

- [ ] Create folders: `src/components/ui`, `src/components/layout`, `src/pages`, `src/utils`, `src/api`
- [ ] Set up React Router with routes: `/`, `/privacy`, `/contact`
- [ ] Create `App.tsx` with `Outlet` and basic layout shell

### 1.3 Environment

- [ ] Create `.env.example` with `VITE_APP_STORE_URL`, `VITE_PLAY_STORE_URL`, `VITE_FORMSPREE_ID`
- [ ] Create `.env` (add to `.gitignore` if not already)

### 1.4 Base Layout

- [ ] Create `Header` component with logo/brand and nav links (Home, Privacy, Contact)
- [ ] Create `Footer` component with copyright and nav links
- [ ] Add favicon and apple-touch-icon to `public/`

**Phase 1 complete when:** Project runs locally, routes work, header/footer render on all pages.

---

## Phase 2: Landing Page

**Goal:** Build the main landing page with App Store and Play Store download links.

### 2.1 Landing Page Content

- [ ] Create `Landing.tsx` page
- [ ] Add hero section with app name and tagline
- [ ] Add brief description of the Water Tanker app

### 2.2 Download Links

- [ ] Add App Store button/badge linking to `import.meta.env.VITE_APP_STORE_URL`
- [ ] Add Play Store button/badge linking to `import.meta.env.VITE_PLAY_STORE_URL`
- [ ] Use official badge assets (download from Apple/Google) or styled buttons
- [ ] Ensure links open in new tab (`target="_blank"`, `rel="noopener noreferrer"`)

### 2.3 Responsive Design

- [ ] Make landing page responsive (mobile, tablet, desktop)
- [ ] Stack download buttons vertically on mobile, side-by-side on larger screens

**Phase 2 complete when:** Landing page displays correctly, store links work, layout is responsive.

---

## Phase 3: Privacy Policy Page

**Goal:** Create a dedicated privacy policy page for app store compliance.

### 3.1 Content Structure

- [ ] Create `PrivacyPolicy.tsx` page
- [ ] Add sections: Introduction, Data We Collect, How We Use Data, Third Parties, User Rights, Contact

### 3.2 Content

- [ ] Write or paste privacy policy text (or use a template and customize)
- [ ] Include contact email/address for privacy inquiries
- [ ] Add "Last updated" date

### 3.3 Styling

- [ ] Style for readability (max-width, line-height, headings)
- [ ] Ensure mobile-friendly layout

**Phase 3 complete when:** Privacy policy page is live at `/privacy` with full content.

---

## Phase 4: Contact / Query Form

**Goal:** Implement the contact form with validation and form-to-email integration.

### 4.1 Form Service Setup

- [ ] Choose form service (Formspree recommended for simplicity)
- [ ] Create Formspree form, get form ID
- [ ] Add `VITE_FORMSPREE_ID` to `.env`

### 4.2 Form Component

- [ ] Create `Contact.tsx` page with form
- [ ] Fields: name, email, subject, message
- [ ] Use React Hook Form + Zod for validation
- [ ] Add loading state and success/error messages

### 4.3 Form Submission

- [ ] On submit: POST to Formspree endpoint (or Netlify Forms if using Netlify)
- [ ] Handle success: show thank-you message
- [ ] Handle error: show error message, keep form data

### 4.4 Styling

- [ ] Style form inputs and button to match site theme
- [ ] Ensure form is accessible (labels, focus states)

**Phase 4 complete when:** Contact form validates, submits successfully, and emails are received.

---

## Phase 5: Polish & Deployment

**Goal:** Final touches and deploy to production.

### 5.1 Polish

- [ ] Add loading states where needed
- [ ] Ensure consistent spacing and typography
- [ ] Test all links (store URLs, nav, footer)
- [ ] Test form on mobile and desktop
- [ ] Add meta tags for SEO (title, description)

### 5.2 Deployment Prep

- [ ] Choose hosting (Vercel or Netlify)
- [ ] Set env vars in hosting dashboard (`VITE_APP_STORE_URL`, `VITE_PLAY_STORE_URL`, `VITE_FORMSPREE_ID`)
- [ ] Ensure build succeeds: `npm run build`

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
- **Store URLs:** Use placeholder URLs until app is published; update when live
- **Form service:** Formspree free tier = 50 submissions/month
