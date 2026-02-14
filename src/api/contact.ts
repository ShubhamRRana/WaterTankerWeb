/**
 * Contact form API — Formspree integration
 * POSTs to https://formspree.io/f/{formId}
 */

const FORMSPREE_BASE = 'https://formspree.io/f'

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export function getFormspreeEndpoint(): string | null {
  const formId = import.meta.env.VITE_FORMSPREE_ID
  if (!formId || formId === 'your-form-id') return null
  return `${FORMSPREE_BASE}/${formId}`
}

export async function submitContactForm(data: ContactFormData): Promise<{ ok: boolean; error?: string }> {
  const endpoint = getFormspreeEndpoint()
  if (!endpoint) {
    return { ok: false, error: 'Form service not configured. Add VITE_FORMSPREE_ID to .env' }
  }

  try {
    const body = new URLSearchParams({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    })

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })

    if (!res.ok) {
      const text = await res.text()
      return { ok: false, error: text || `Request failed (${res.status})` }
    }

    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error'
    return { ok: false, error: message }
  }
}
