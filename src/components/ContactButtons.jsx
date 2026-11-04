import { Mail, MessageCircle, Phone } from 'lucide-react'
import { business, isConfigured, phoneHref, whatsappHref } from '../config/business.js'

function ContactButtons({ variant = 'default', message, primaryLabel = 'WhatsApp enquiry', fallbackLabel = 'Enquire with us' }) {
  const whatsApp = whatsappHref(message)
  const tel = phoneHref()

  return (
    <div className={`contact-actions ${variant}`}>
      {whatsApp ? (
        <a className="button button-gold" href={whatsApp} target="_blank" rel="noreferrer">
          <MessageCircle size={17} aria-hidden="true" /> {primaryLabel}
        </a>
      ) : (
        <a className="button button-gold" href="/contact">
          <MessageCircle size={17} aria-hidden="true" /> {fallbackLabel}
        </a>
      )}
      {tel && (
        <a className="button button-outline" href={tel}>
          <Phone size={16} aria-hidden="true" /> Call now
        </a>
      )}
      {isConfigured(business.email) && (
        <a className="button button-outline" href={`mailto:${business.email}`}>
          <Mail size={16} aria-hidden="true" /> Email us
        </a>
      )}
    </div>
  )
}

export default ContactButtons
