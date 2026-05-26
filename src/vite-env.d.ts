/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_STORE_URL?: string
  readonly VITE_PLAY_STORE_URL?: string
  readonly VITE_ADMIN_PLAY_STORE_URL?: string
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_CONTACT_WEBHOOK_SECRET?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
