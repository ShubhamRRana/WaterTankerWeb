import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Loader2, KeyRound, Mail } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Session } from '@supabase/supabase-js'

const requestSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
})

const setPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(72, 'Password must be 72 characters or less'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RequestFormValues = z.infer<typeof requestSchema>
type SetPasswordFormValues = z.infer<typeof setPasswordSchema>

const RESET_REDIRECT_URL =
  typeof window !== 'undefined'
    ? `${window.location.origin}/auth/reset-password`
    : 'https://tankerhub.in/auth/reset-password'

function ResetPassword() {
  const [session, setSession] = useState<Session | null>(null)
  const [sessionChecked, setSessionChecked] = useState(false)
  const [requestStatus, setRequestStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [requestMessage, setRequestMessage] = useState('')
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [updateMessage, setUpdateMessage] = useState('')

  const requestForm = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: { email: '' },
  })

  const setPasswordForm = useForm<SetPasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  useEffect(() => {
    const client = supabase
    if (!client) {
      setSessionChecked(true)
      return
    }

    const getInitialSession = async () => {
      const {
        data: { session: s },
      } = await client.auth.getSession()
      setSession(s ?? null)
      setSessionChecked(true)
    }

    getInitialSession()

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, s) => {
      setSession(s ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const onRequestSubmit = async (data: RequestFormValues) => {
    setRequestStatus('idle')
    setRequestMessage('')
    if (!supabase) {
      setRequestStatus('error')
      setRequestMessage('Authentication is not configured.')
      return
    }
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: RESET_REDIRECT_URL,
    })
    if (error) {
      setRequestStatus('error')
      setRequestMessage(error.message ?? 'Something went wrong. Please try again.')
      return
    }
    setRequestStatus('success')
    setRequestMessage('Check your email for a link to reset your password.')
    requestForm.reset()
  }

  const onSetPasswordSubmit = async (data: SetPasswordFormValues) => {
    setUpdateStatus('idle')
    setUpdateMessage('')
    if (!supabase) {
      setUpdateStatus('error')
      setUpdateMessage('Authentication is not configured.')
      return
    }
    const { error } = await supabase.auth.updateUser({ password: data.password })
    if (error) {
      setUpdateStatus('error')
      setUpdateMessage(error.message ?? 'Failed to update password. Please try again.')
      return
    }
    setUpdateStatus('success')
    setUpdateMessage('Your password has been updated. You can now sign in with your new password.')
    setPasswordForm.reset()
  }

  if (!sessionChecked) {
    return (
      <main className="flex-1 min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-2 text-primary/80">
          <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
          <span>Loading...</span>
        </div>
      </main>
    )
  }

  const showSetPassword = !!session

  return (
    <main className="flex-1 min-h-screen">
      <Helmet>
        <title>Reset Password — Water Tanker</title>
        <meta name="description" content="Reset your Water Tanker account password." />
        <meta property="og:title" content="Reset Password — Water Tanker" />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-xl">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
            Reset Password
          </h1>
          <p className="text-primary/80 text-sm sm:text-base leading-relaxed">
            {showSetPassword
              ? 'Enter your new password below.'
              : 'Enter your email and we’ll send you a link to reset your password.'}
          </p>
        </header>

        {showSetPassword ? (
          <form
            onSubmit={setPasswordForm.handleSubmit(onSetPasswordSubmit)}
            className="space-y-5"
            noValidate
          >
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary mb-1.5">
                New password
              </label>
              <div
                className="glow-input-wrapper"
                onMouseMove={(e) => {
                  e.currentTarget.style.setProperty('--glow-x', `${e.nativeEvent.offsetX}px`)
                  e.currentTarget.style.setProperty('--glow-y', `${e.nativeEvent.offsetY}px`)
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty('--glow-x', '-999px')
                  e.currentTarget.style.setProperty('--glow-y', '-999px')
                }}
              >
                <div className="glow-input-glow" aria-hidden />
                <input
                  id="password"
                  type="password"
                  {...setPasswordForm.register('password')}
                  className="input-field"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  disabled={setPasswordForm.formState.isSubmitting}
                  aria-invalid={!!setPasswordForm.formState.errors.password}
                />
              </div>
              {setPasswordForm.formState.errors.password && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {setPasswordForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-primary mb-1.5"
              >
                Confirm password
              </label>
              <div
                className="glow-input-wrapper"
                onMouseMove={(e) => {
                  e.currentTarget.style.setProperty('--glow-x', `${e.nativeEvent.offsetX}px`)
                  e.currentTarget.style.setProperty('--glow-y', `${e.nativeEvent.offsetY}px`)
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty('--glow-x', '-999px')
                  e.currentTarget.style.setProperty('--glow-y', '-999px')
                }}
              >
                <div className="glow-input-glow" aria-hidden />
                <input
                  id="confirmPassword"
                  type="password"
                  {...setPasswordForm.register('confirmPassword')}
                  className="input-field"
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  disabled={setPasswordForm.formState.isSubmitting}
                  aria-invalid={!!setPasswordForm.formState.errors.confirmPassword}
                />
              </div>
              {setPasswordForm.formState.errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {setPasswordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            {updateStatus === 'success' && (
              <div
                className="p-4 rounded-lg bg-green-100 text-green-800 border border-green-200"
                role="status"
                aria-live="polite"
              >
                {updateMessage}
              </div>
            )}
            {updateStatus === 'error' && (
              <div
                className="p-4 rounded-lg bg-red-50 text-red-800 border border-red-200"
                role="alert"
                aria-live="assertive"
              >
                {updateMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={setPasswordForm.formState.isSubmitting}
              className="btn-submit flex items-center justify-center gap-2"
            >
              {setPasswordForm.formState.isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                  Updating...
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" aria-hidden />
                  Update password
                </>
              )}
            </button>
          </form>
        ) : (
          <form
            onSubmit={requestForm.handleSubmit(onRequestSubmit)}
            className="space-y-5"
            noValidate
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5">
                Email
              </label>
              <div
                className="glow-input-wrapper"
                onMouseMove={(e) => {
                  e.currentTarget.style.setProperty('--glow-x', `${e.nativeEvent.offsetX}px`)
                  e.currentTarget.style.setProperty('--glow-y', `${e.nativeEvent.offsetY}px`)
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty('--glow-x', '-999px')
                  e.currentTarget.style.setProperty('--glow-y', '-999px')
                }}
              >
                <div className="glow-input-glow" aria-hidden />
                <input
                  id="email"
                  type="email"
                  {...requestForm.register('email')}
                  className="input-field"
                  placeholder="your@email.com"
                  autoComplete="email"
                  disabled={requestForm.formState.isSubmitting}
                  aria-invalid={!!requestForm.formState.errors.email}
                />
              </div>
              {requestForm.formState.errors.email && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {requestForm.formState.errors.email.message}
                </p>
              )}
            </div>

            {requestStatus === 'success' && (
              <div
                className="p-4 rounded-lg bg-green-100 text-green-800 border border-green-200"
                role="status"
                aria-live="polite"
              >
                {requestMessage}
              </div>
            )}
            {requestStatus === 'error' && (
              <div
                className="p-4 rounded-lg bg-red-50 text-red-800 border border-red-200"
                role="alert"
                aria-live="assertive"
              >
                {requestMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={requestForm.formState.isSubmitting}
              className="btn-submit flex items-center justify-center gap-2"
            >
              {requestForm.formState.isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" aria-hidden />
                  Send reset link
                </>
              )}
            </button>
          </form>
        )}

        <p className="mt-6 text-sm text-primary/70">
          <Link to="/" className="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
            Back to home
          </Link>
        </p>
      </div>
    </main>
  )
}

export default ResetPassword
