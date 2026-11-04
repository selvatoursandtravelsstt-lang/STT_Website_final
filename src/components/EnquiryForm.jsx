import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, MessageCircle } from 'lucide-react'
import { business, whatsappHref } from '../config/business.js'

const enquiryTypes = ['Local Taxi', 'Outstation Taxi', 'Tour Package', 'Airport Transfer', 'Other']
const emailJsConfig = {
  VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  VITE_EMAILJS_ADMIN_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID,
  VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
  VITE_EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

function EnquiryForm({ initialType = '', initialDestination = '', initialMessage = '', initialDate = '', initialTravellers = '' }) {
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [fallbackLink, setFallbackLink] = useState('')
  const [isSending, setIsSending] = useState(false)
  const completedSends = useRef(null)
  const isSendingRef = useRef(false)
  const lastSuccessfulSend = useRef(null)

  function getTemplateParams(form) {
    const data = new FormData(form)
    const phone = String(data.get('phone') || '').trim()
    const phoneDigits = phone.replace(/\D/g, '')
    const localPhone = phoneDigits.length === 12 && phoneDigits.startsWith('91') ? phoneDigits.slice(2) : phoneDigits
    if (!/^[6-9]\d{9}$/.test(localPhone)) {
      setError('Enter a valid Indian mobile number with 10 digits, optionally prefixed by +91.')
      setStatus('')
      setFallbackLink('')
      return null
    }

    return {
      user_name: String(data.get('name') || '').trim(),
      user_email: String(data.get('email') || '').trim(),
      user_phone: phone,
      enquiry_type: String(data.get('type') || ''),
      destination: String(data.get('destination') || '').trim(),
      travel_date: String(data.get('date') || ''),
      travellers: String(data.get('travellers') || ''),
      message: String(data.get('message') || '').trim(),
    }
  }

  function getWhatsAppMessage(params) {
    return [
      `Hello, I would like to make a travel enquiry with ${business.name}.`,
      `Name: ${params.user_name}`,
      `Phone: ${params.user_phone}`,
      `Email: ${params.user_email || 'Not provided'}`,
      `Enquiry type: ${params.enquiry_type}`,
      `Destination: ${params.destination}`,
      `Travel date: ${params.travel_date || 'Not specified'}`,
      `Travellers: ${params.travellers || 'Not specified'}`,
      `Message: ${params.message}`,
    ].join('\n')
  }

  function openDatePicker(event) {
    const dateInput = event.currentTarget
    if (typeof dateInput.showPicker === 'function') {
      dateInput.showPicker()
    } else {
      dateInput.focus()
    }
  }

  function handleWhatsApp(event) {
    const form = event.currentTarget.form
    if (!form.reportValidity()) return
    const params = getTemplateParams(form)
    if (!params) return

    const whatsAppLink = whatsappHref(getWhatsAppMessage(params))
    setError('')
    setFallbackLink('')
    if (whatsAppLink) {
      window.open(whatsAppLink, '_blank', 'noopener,noreferrer')
      setStatus('Your enquiry is ready in WhatsApp. If it did not open, use the link below.')
      setFallbackLink(whatsAppLink)
      return
    }
    setStatus('')
    setError('The WhatsApp number is not configured yet. Please contact the business directly.')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (isSendingRef.current) return

    const form = event.currentTarget
    if (!form.reportValidity()) return
    const params = getTemplateParams(form)
    if (!params) return

    if (!String(form.elements.email.value || '').trim()) {
      setError('Enter your email address to receive a confirmation, or use the WhatsApp option.')
      setStatus('')
      form.elements.email.focus()
      return
    }

    const missingConfig = Object.entries(emailJsConfig)
      .filter(([, value]) => !value)
      .map(([variableName]) => variableName)
    if (missingConfig.length) {
      setStatus('')
      setError(import.meta.env.DEV
        ? `EmailJS is not configured. Add these Vite variables and restart the dev server: ${missingConfig.join(', ')}`
        : 'Enquiry email is temporarily unavailable. Please try WhatsApp or contact us directly.')
      return
    }

    const signature = JSON.stringify(params)
    if (lastSuccessfulSend.current?.signature === signature && Date.now() - lastSuccessfulSend.current.timestamp < 30000) {
      setStatus('')
      setError('This enquiry was just submitted. Please wait before sending it again.')
      return
    }

    setError('')
    setFallbackLink('')
    setStatus('')
    isSendingRef.current = true
    setIsSending(true)

    if (completedSends.current?.signature !== signature) {
      completedSends.current = { signature, adminSent: false, autoreplySent: false }
    }

    try {
      if (!completedSends.current.adminSent) {
        try {
          await emailjs.send(emailJsConfig.VITE_EMAILJS_SERVICE_ID, emailJsConfig.VITE_EMAILJS_ADMIN_TEMPLATE_ID, params, emailJsConfig.VITE_EMAILJS_PUBLIC_KEY)
          completedSends.current.adminSent = true
        } catch (sendError) {
          console.error('[EmailJS] Admin notification request failed.', { status: sendError?.status })
          throw new Error('admin', { cause: sendError })
        }
      }

      if (!completedSends.current.autoreplySent) {
        try {
          await emailjs.send(emailJsConfig.VITE_EMAILJS_SERVICE_ID, emailJsConfig.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID, params, emailJsConfig.VITE_EMAILJS_PUBLIC_KEY)
          completedSends.current.autoreplySent = true
        } catch (sendError) {
          console.error('[EmailJS] Customer acknowledgement request failed.', { status: sendError?.status })
          throw new Error('autoreply', { cause: sendError })
        }
      }

      setStatus('Thank you! Your enquiry has been submitted. Our team will contact you shortly. Email requests were accepted; inbox delivery is not confirmed.')
      lastSuccessfulSend.current = { signature, timestamp: Date.now() }
      form.reset()
      completedSends.current = null
    } catch (sendError) {
      setStatus('')
      if (sendError.message === 'autoreply' && completedSends.current.adminSent) {
        setError('Your enquiry notification was accepted, but the confirmation email could not be sent. Retry to send the confirmation; your enquiry notification will not be resent.')
      } else {
        setError('We could not submit your enquiry by email. Your form details are saved here; please retry or use WhatsApp.')
      }
    } finally {
      isSendingRef.current = false
      setIsSending(false)
    }
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
      <div className="form-intro"><p className="eyebrow">SEND A TRAVEL ENQUIRY</p><h2>Send a Travel Enquiry</h2><p>Your enquiry will be sent to our team, and we’ll email you a confirmation.</p></div>
      <div className="form-grid">
        <label>Full Name <span aria-hidden="true">*</span><input name="name" autoComplete="name" required /></label>
        <label>Phone Number <span aria-hidden="true">*</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" aria-describedby="phone-hint" required /><small id="phone-hint">Enter an Indian mobile number.</small></label>
        <label>Email Address <small>(required for email confirmation)</small><input name="email" type="email" autoComplete="email" /></label>
        <label>Enquiry Type <span aria-hidden="true">*</span><select name="type" defaultValue={enquiryTypes.includes(initialType) ? initialType : ''} required><option value="" disabled>Select an enquiry type</option>{enquiryTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
        <label>Destination <span aria-hidden="true">*</span><input name="destination" defaultValue={initialDestination} required /></label>
        <label>Travel Date<input name="date" type="date" defaultValue={initialDate} onClick={openDatePicker} /></label>
        <label>Number of Travellers <span aria-hidden="true">*</span><input name="travellers" type="number" min="1" step="1" inputMode="numeric" defaultValue={initialTravellers} required /></label>
        <label className="form-message">Message<textarea name="message" rows="5" defaultValue={initialMessage} /></label>
      </div>
      {error && <p className="form-feedback form-error" role="alert">{error}</p>}
      {status && <p className="form-feedback form-success" role="status">{status} {fallbackLink && <a href={fallbackLink} target="_blank" rel="noreferrer">Open WhatsApp</a>}</p>}
      <button className="button button-gold form-submit" type="submit" disabled={isSending}>
        <Mail size={17} aria-hidden="true" /> {isSending ? 'Sending enquiry…' : 'Send enquiry'}
      </button>
      <button className="button button-outline form-submit" type="button" onClick={handleWhatsApp}>
        <MessageCircle size={17} aria-hidden="true" /> Send via WhatsApp
      </button>
      <p className="form-privacy-note">Your details are sent to Selva Tours and Travels to respond to your enquiry.</p>
    </form>
  )
}

export default EnquiryForm
