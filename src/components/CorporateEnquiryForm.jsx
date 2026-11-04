import { useState } from 'react'
import { Mail, MessageCircle } from 'lucide-react'
import { business, emailHref, isConfigured, whatsappHref } from '../config/business.js'

function CorporateEnquiryForm() {
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [draftLink, setDraftLink] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return

    const data = new FormData(form)
    const phone = String(data.get('phone') || '').trim()
    const digits = phone.replace(/\D/g, '')
    const localPhone = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits
    if (!/^[6-9]\d{9}$/.test(localPhone)) {
      setError('Enter a valid Indian mobile number with 10 digits, optionally prefixed by +91.')
      setStatus('')
      setDraftLink('')
      return
    }

    const fields = [
      ['Company Name', 'company'],
      ['Contact Person', 'contactPerson'],
      ['Business Email', 'email'],
      ['Phone Number', 'phone'],
      ['Travel Requirement', 'requirement'],
      ['Number of Travellers', 'travellers'],
      ['Pickup Location', 'pickup'],
      ['Destination', 'destination'],
      ['Travel Dates or Schedule', 'schedule'],
      ['Additional Requirements', 'additional'],
    ]
    const message = [
      `Hello, I would like to discuss a corporate travel enquiry with ${business.name}.`,
      ...fields.map(([label, name]) => `${label}: ${String(data.get(name) || '').trim() || 'Not provided'}`),
    ].join('\n')
    const whatsAppLink = whatsappHref(message)

    setError('')
    if (whatsAppLink) {
      window.open(whatsAppLink, '_blank', 'noopener,noreferrer')
      setStatus('A WhatsApp draft is ready for you to review and send. It has not been submitted to a server.')
      setDraftLink(whatsAppLink)
      return
    }

    const configuredEmail = emailHref()
    if (configuredEmail) {
      const emailLink = `${configuredEmail}?subject=${encodeURIComponent('Corporate travel enquiry for Selva Tours and Travels')}&body=${encodeURIComponent(message)}`
      window.location.assign(emailLink)
      setStatus('An email draft is being opened for you to review and send. It has not been sent yet.')
      setDraftLink(emailLink)
      return
    }

    setStatus('')
    setDraftLink('')
    setError('A verified business WhatsApp number or email address must be added in the business configuration before this enquiry can be prepared.')
  }

  return (
    <form className="corporate-form" onSubmit={handleSubmit} noValidate>
      <div className="corporate-form-heading">
        <p className="eyebrow">CORPORATE ENQUIRY</p>
        <h2>Share your travel requirements</h2>
        <p>Your details will be prepared as a WhatsApp message or email draft. They are not submitted to a website server.</p>
      </div>
      <div className="corporate-form-grid">
        <label>Company Name <span aria-hidden="true">*</span><input name="company" autoComplete="organization" required /></label>
        <label>Contact Person <span aria-hidden="true">*</span><input name="contactPerson" autoComplete="name" required /></label>
        <label>Business Email <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required /></label>
        <label>Phone Number <span aria-hidden="true">*</span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" required /></label>
        <label className="corporate-form-wide">Travel Requirement <span aria-hidden="true">*</span><textarea name="requirement" rows="3" required /></label>
        <label>Number of Travellers<input name="travellers" type="number" min="1" step="1" inputMode="numeric" /></label>
        <label>Pickup Location<input name="pickup" autoComplete="street-address" /></label>
        <label>Destination<input name="destination" /></label>
        <label>Travel Dates or Schedule<input name="schedule" placeholder="Dates or preferred schedule" /></label>
        <label className="corporate-form-wide">Additional Requirements<textarea name="additional" rows="3" /></label>
      </div>
      {error && <p className="corporate-form-feedback is-error" role="alert">{error}</p>}
      {status && (
        <p className="corporate-form-feedback is-success" role="status">
          {status}{draftLink && <a href={draftLink} target="_blank" rel="noreferrer">{isConfigured(business.whatsapp) ? 'Open WhatsApp' : 'Open email draft'}</a>}
        </p>
      )}
      <button className="button button-gold corporate-submit" type="submit">
        {isConfigured(business.whatsapp) ? <MessageCircle size={16} aria-hidden="true" /> : <Mail size={16} aria-hidden="true" />}
        Prepare Corporate Enquiry
      </button>
      {!isConfigured(business.whatsapp) && !isConfigured(business.email) && (
        <p className="corporate-config-note">WhatsApp and email are not configured. Add verified contact details to the central business configuration to activate this enquiry form.</p>
      )}
    </form>
  )
}

export default CorporateEnquiryForm
