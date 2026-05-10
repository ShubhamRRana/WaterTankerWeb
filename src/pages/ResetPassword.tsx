import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const schema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

type FormValues = z.infer<typeof schema>

type Status =
  | { state: 'idle' }
  | { state: 'initializing' }
  | { state: 'ready' }
  | { state: 'submitting' }
  | { state: 'success' }
  | { state: 'error'; message: string }

function ResetPassword() {
  const [status, setStatus] = useState<Status>({ state: 'idle' })
  const supabaseConfigured = isSupabaseConfigured()

  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/fa599e25-345a-436f-9f8b-6c607629643b', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': '329c12',
    },
    body: JSON.stringify({
      sessionId: '329c12',
      runId: 'pre-fix',
      hypothesisId: 'H1',
      location: 'src/pages/ResetPassword.tsx:33',
      message: 'ResetPassword render supabase configuration state',
      data: {
        supabaseConfigured,
        hasSupabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
        hasSupabaseAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {})
  // #endregion

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/fa599e25-345a-436f-9f8b-6c607629643b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Debug-Session-Id': '329c12',
        },
        body: JSON.stringify({
          sessionId: '329c12',
          runId: 'pre-fix',
          hypothesisId: 'H2',
          location: 'src/pages/ResetPassword.tsx:52',
          message: 'useEffect early exit because supabase not configured',
          data: {},
          timestamp: Date.now(),
        }),
      }).catch(() => {})
      // #endregion
      return
    }

    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const type = params.get('type')

    if (code && type === 'recovery') {
      let cancelled = false
      const run = async () => {
        setStatus({ state: 'initializing' })
        try {
          const { error } = await supabase!.auth.exchangeCodeForSession(code)
          if (cancelled) return
          if (error) {
            setStatus({
              state: 'error',
              message:
                'This password reset link is invalid or has expired. Please request a new one from the app.',
            })
            return
          }
          setStatus({ state: 'ready' })
        } catch {
          if (!cancelled) {
            setStatus({
              state: 'error',
              message:
                'Unable to verify your reset link right now. Please try again in a moment.',
            })
          }
        }
      }
      void run()
      return () => {
        cancelled = true
      }
    }

    setStatus({ state: 'ready' })
  }, [])

  const onSubmit = async (values: FormValues) => {
    if (!isSupabaseConfigured()) {
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/fa599e25-345a-436f-9f8b-6c607629643b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Debug-Session-Id': '329c12',
        },
        body: JSON.stringify({
          sessionId: '329c12',
          runId: 'pre-fix',
          hypothesisId: 'H3',
          location: 'src/pages/ResetPassword.tsx:94',
          message: 'onSubmit blocked because supabase not configured',
          data: {},
          timestamp: Date.now(),
        }),
      }).catch(() => {})
      // #endregion
      setStatus({
        state: 'error',
        message:
          'Password reset is temporarily unavailable. Please contact support.',
      })
      return
    }

    setStatus({ state: 'submitting' })
    try {
      const { error } = await supabase!.auth.updateUser({
        password: values.password,
      })

      if (error) {
        setStatus({
          state: 'error',
          message:
            error.message ||
            'Something went wrong while updating your password. Please try again.',
        })
        return
      }

      setStatus({ state: 'success' })
      reset()
    } catch {
      setStatus({
        state: 'error',
        message:
          'Something went wrong while updating your password. Please try again.',
      })
    }
  }

  const isDisabled =
    status.state === 'initializing' ||
    status.state === 'submitting' ||
    status.state === 'success'

  const pageTitle = 'Reset Password — Water Tanker'

  return (
    <main className="flex-1">
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Reset your TankerHub account password to continue using the mobile app."
        />
      </Helmet>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 max-w-lg">
        <h1 className="text-2xl sm:text-3xl font-semibold text-primary mb-2">
          Reset password
        </h1>
        <p className="text-primary/80 text-sm sm:text-base mb-8">
          Choose a new password for your TankerHub account. After updating,
          you can return to the mobile app and sign in again with your new
          password.
        </p>

        {status.state === 'initializing' && (
          <div className="mb-6 rounded-md bg-primary/5 px-4 py-3 text-sm text-primary">
            Verifying your reset link&hellip;
          </div>
        )}

        {status.state === 'error' && (
          <div className="mb-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
            {status.message}
          </div>
        )}

        {status.state === 'success' && (
          <div className="mb-6 rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Your password has been updated successfully. You can now return to
            the TankerHub mobile app and sign in again with your new password.
          </div>
        )}

        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-primary"
            >
              New password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              className="w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm sm:text-base shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              {...register('password')}
              disabled={isDisabled}
            />
            {errors.password && (
              <p className="text-xs sm:text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-primary"
            >
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm sm:text-base shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              {...register('confirmPassword')}
              disabled={isDisabled}
            />
            {errors.confirmPassword && (
              <p className="text-xs sm:text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm sm:text-base font-medium text-white shadow-sm transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-primary/60"
          >
            {status.state === 'submitting' ? 'Updating password…' : 'Submit'}
          </button>
        </form>

        <p className="mt-6 text-xs sm:text-sm text-primary/70">
          If you did not request a password reset, you can safely close this
          page.
        </p>
      </section>
    </main>
  )
}

export default ResetPassword

