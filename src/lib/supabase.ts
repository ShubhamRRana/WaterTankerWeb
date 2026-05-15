import { createClient } from '@supabase/supabase-js'

/** Normalize values from `.env` (quotes, BOM) so the client still initializes when formatting is off. */
function normalizeEnvValue(raw: string | undefined): string | undefined {
  if (raw === undefined) return undefined
  let v = raw.replace(/^\uFEFF/, '').trim()
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim()
  }
  return v || undefined
}

// Vite bakes env at build time; set vars in your host's build environment (e.g. Vercel) for production deploys.
const supabaseUrl = normalizeEnvValue(import.meta.env.VITE_SUPABASE_URL as string | undefined)
const supabaseAnonKey = normalizeEnvValue(import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)

function isSupabaseEnvReady(url: string | undefined, key: string | undefined): boolean {
  if (!url || !key) return false
  // Treat .env.example placeholders as unset so the contact form shows a clear message
  if (url.includes('your-project.supabase.co') || key === 'your-anon-key') return false
  return true
}

export const supabase = isSupabaseEnvReady(supabaseUrl, supabaseAnonKey)
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null

export const isSupabaseConfigured = (): boolean => !!supabase
