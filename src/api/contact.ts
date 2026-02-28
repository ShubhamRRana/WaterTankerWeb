/**
 * Contact form API — Supabase integration
 * Inserts submissions into contact_submissions table and triggers email to support@tankerhub.in via Edge Function.
 */

import { supabase } from '../lib/supabase'

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function submitContactForm(data: ContactFormData): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) {
    return { ok: false, error: 'Form service not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env' }
  }

  try {
    const { error } = await supabase.from('contact_submissions').insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    })

    if (error) {
      return { ok: false, error: error.message }
    }

    const secret = import.meta.env.VITE_CONTACT_WEBHOOK_SECRET
    const { error: fnError } = await supabase.functions.invoke('send-contact-email', {
      body: data,
      headers: secret ? { 'x-contact-secret': secret } : undefined,
    })

    if (fnError) {
      return { ok: false, error: fnError.message }
    }

    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error'
    return { ok: false, error: message }
  }
}
