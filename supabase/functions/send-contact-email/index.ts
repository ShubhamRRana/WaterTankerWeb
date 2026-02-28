/**
 * Supabase Edge Function: send-contact-email
 * Sends contact form submissions to support@tankerhub.in via Resend.
 *
 * Invoked after a row is inserted into contact_submissions (from client or DB webhook).
 * Requires: RESEND_API_KEY in Supabase Edge Function secrets.
 * Optional: CONTACT_WEBHOOK_SECRET to restrict who can call this function.
 */

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const CONTACT_WEBHOOK_SECRET = Deno.env.get('CONTACT_WEBHOOK_SECRET')
const TO_EMAIL = 'support@tankerhub.in'
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') ?? 'Water Tanker <noreply@support.tankerhub.in>'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-contact-secret',
}

interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

function htmlEmail(p: ContactPayload): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; line-height: 1.5; color: #333;">
  <h2 style="color: #0ea5e9;">New contact form submission</h2>
  <p><strong>From:</strong> ${escapeHtml(p.name)} &lt;${escapeHtml(p.email)}&gt;</p>
  <p><strong>Subject:</strong> ${escapeHtml(p.subject)}</p>
  <hr style="border: none; border-top: 1px solid #eee;" />
  <div style="white-space: pre-wrap;">${escapeHtml(p.message)}</div>
  <hr style="border: none; border-top: 1px solid #eee; margin-top: 1.5em;" />
  <p style="font-size: 0.85em; color: #666;">Sent via Water Tanker contact form.</p>
</body>
</html>
  `.trim()
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function handler(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }

  if (!RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'Email service not configured. Set RESEND_API_KEY in Edge Function secrets.' }),
      { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  }

  if (CONTACT_WEBHOOK_SECRET) {
    const secret = request.headers.get('x-contact-secret')
    if (secret !== CONTACT_WEBHOOK_SECRET) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }
  }

  let payload: ContactPayload
  try {
    const body = await request.json()
    if (body.record) {
      payload = body.record as ContactPayload
    } else if (body.name && body.email && body.subject && body.message) {
      payload = body as ContactPayload
    } else {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, subject, message' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }

  const { name, email, subject, message } = payload
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return new Response(
      JSON.stringify({ error: 'All fields are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject: `[Contact] ${subject}`,
      html: htmlEmail(payload),
    }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    return new Response(JSON.stringify({ error: data.message ?? data ?? 'Failed to send email' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  })
}

Deno.serve(handler)
