import { MessageCircle } from 'lucide-react'
import BookingActionLink from './BookingActionLink.jsx'
import { whatsappHref } from '../config/business.js'

function WhatsAppEnquiryButton({ category, vehicle, packageGroup, packageAmount, rateDetails = [], booking }) {
  const vehicleText = vehicle ? ` for ${vehicle}` : ''
  const formatAmount = (value) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
  const amountText = packageAmount === null || packageAmount === undefined
    ? 'Contact for Rates'
    : formatAmount(packageAmount)
  const rateText = rateDetails.map(([label, value]) => `${label}: ${value}`).join('. ')
  const message = [
    `Tariff category: ${category}`,
    `Vehicle: ${vehicle}`,
    packageGroup ? `Package: ${packageGroup}` : '',
    packageAmount === null || packageAmount === undefined ? '' : `Displayed reference amount: ${amountText}`,
    rateText,
    'Please confirm availability and Selva Tours and Travels’ current quote.',
  ].filter(Boolean).join('\n')
  const href = whatsappHref(message)

  return (
    <div className="tariff-enquiry-actions">
      <BookingActionLink className="button button-gold tariff-enquire-button" booking={booking} aria-label={`Enquire about ${category}${vehicleText}${packageGroup ? `, ${packageGroup}` : ''}`}>
        <span>Enquire</span>
        <span>Now</span>
      </BookingActionLink>
      {href && (
        <a className="tariff-whatsapp-link" href={href} target="_blank" rel="noreferrer" aria-label={`Enquire about ${category}${vehicleText} on WhatsApp`}>
          <MessageCircle size={14} aria-hidden="true" /> WhatsApp
        </a>
      )}
    </div>
  )
}

export default WhatsAppEnquiryButton
