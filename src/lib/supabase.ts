import { createClient } from '@supabase/supabase-js'

// Vite bakes env at build time; ensure these are set in your hosting (e.g. Vercel) for production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export const isSupabaseConfigured = (): boolean => !!supabase
