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
    return {
      ok: false,
      error:
        'Form service not configured. In .env, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Supabase project URL and anon key (Dashboard → Project Settings → API), then restart the dev server. See SUPABASE_SETUP.md.',
    }
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
      let message = fnError.message
      const errWithContext = fnError as { context?: Response }
      if (errWithContext.context && typeof (errWithContext.context as Response).json === 'function') {
        try {
          const body = await (errWithContext.context as Response).json() as { error?: string }
          if (body?.error) message = body.error
        } catch {
          // keep fnError.message if parsing fails
        }
      }
      if (message === 'Edge Function returned a non-2xx status code') {
        message =
          'Contact email service could not complete. Ensure the Edge Function is deployed and RESEND_API_KEY is set in Supabase. If you use CONTACT_WEBHOOK_SECRET, set the same value as VITE_CONTACT_WEBHOOK_SECRET in .env. See SUPABASE_SETUP.md.'
      }
      return { ok: false, error: message }
    }

    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error'
    return { ok: false, error: message }
  }
}
