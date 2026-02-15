import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Helmet } from 'react-helmet-async'
import { Loader2 } from 'lucide-react'
import { submitContactForm, type ContactFormData } from '../api/contact'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject must be 200 characters or less'),
  message: z.string().min(1, 'Message is required').max(5000, 'Message must be 5000 characters or less'),
})

type ContactFormValues = z.infer<typeof contactSchema>

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  })

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState<string>('')

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitStatus('idle')
    setSubmitMessage('')

    const result = await submitContactForm(data as ContactFormData)

    if (result.ok) {
      setSubmitStatus('success')
      setSubmitMessage('Thank you! Your message has been sent. We\'ll get back to you soon.')
      reset()
    } else {
      setSubmitStatus('error')
      setSubmitMessage(result.error ?? 'Something went wrong. Please try again.')
    }
  }

  return (
    <main className="flex-1 min-h-screen">
      <Helmet>
        <title>Contact Us — Water Tanker</title>
        <meta name="description" content="Contact Water Tanker. Have a question or feedback? Send us a message and we'll get back to you." />
        <meta property="og:title" content="Contact Us — Water Tanker" />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-xl">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
            Contact Us
          </h1>
          <p className="text-primary/80 text-sm sm:text-base leading-relaxed">
            Have a question or feedback? Send us a message and we&apos;ll get back to you.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary mb-1.5">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="input-field"
              placeholder="Your name"
              autoComplete="name"
              disabled={isSubmitting}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="input-field"
              placeholder="your@email.com"
              autoComplete="email"
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-primary mb-1.5">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              {...register('subject')}
              className="input-field"
              placeholder="What is this about?"
              disabled={isSubmitting}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
            />
            {errors.subject && (
              <p id="subject-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-primary mb-1.5">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              {...register('message')}
              className="input-field resize-y min-h-[120px]"
              placeholder="Your message..."
              disabled={isSubmitting}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Success / Error messages */}
          {submitStatus === 'success' && (
            <div
              className="p-4 rounded-lg bg-green-100 text-green-800 border border-green-200"
              role="status"
              aria-live="polite"
            >
              {submitMessage}
            </div>
          )}
          {submitStatus === 'error' && (
            <div
              className="p-4 rounded-lg bg-red-50 text-red-800 border border-red-200"
              role="alert"
              aria-live="assertive"
            >
              {submitMessage}
            </div>
          )}

          {/* Submit button — accent color for CTA, theme-aligned focus states */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-submit"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </main>
  )
}

export default Contact
