import { createClient } from '@supabase/supabase-js'

// Vite bakes env at build time; ensure these are set in your hosting (e.g. Vercel) for production
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim()
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim()

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
