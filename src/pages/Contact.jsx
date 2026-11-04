import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { business, emailHref, isConfigured, phoneHref } from '../config/business.js'
import EnquiryForm from '../components/EnquiryForm.jsx'

const officeAddress = business.address
const encodedOfficeAddress = encodeURIComponent(officeAddress)
const mapEmbedUrl = `https://www.google.com/maps?q=${encodedOfficeAddress}&output=embed`
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedOfficeAddress}`

function Contact() {
  const [searchParams] = useSearchParams()
  const phone = phoneHref()
  const email = emailHref()
  const whatsAppNumber = (business.whatsapp || business.phone).replace(/\D/g, '')
  const wa = whatsAppNumber
    ? `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent('Hello, I would like to enquire about Selva Tours and Travels.')}`
    : ''
  const duration = searchParams.get('duration')
  const initialMessage = searchParams.get('message') || (duration ? `I would like to enquire about a ${duration}-day tour.` : '')
  const initialType = searchParams.get('type') || ''
  const initialDestination = searchParams.get('destination') || searchParams.get('category') || ''
  const initialDate = searchParams.get('date') || ''
  const initialTravellers = searchParams.get('travellers') || ''

  return (
    <div className="inner-page">
      <section className="section contact-information">
        <div className="page-width">
          <div className="contact-main">
          <p className="eyebrow contact-heading-label">CONTACT INFORMATION</p>
          <h1 className="contact-main-title">Let’s talk about your travel <span className="contact-heading-plans">plans.</span></h1>
          <p className="contact-intro">Reach Selva Tours and Travels in Coimbatore by phone, WhatsApp or email, or send a travel enquiry using the form below.</p>
          <div className="contact-details">
            <div className="contact-detail">
              <span><MapPin size={19} aria-hidden="true" /></span><div><small>LOCATION</small><strong>{business.location}</strong>{isConfigured(business.address) && <p>{business.address}</p>}
              {isConfigured(business.mapsUrl) && <a href={business.mapsUrl} target="_blank" rel="noreferrer">Open in Maps</a>}</div>
            </div>
            <div className="contact-detail">
              <span><Phone size={19} aria-hidden="true" /></span><div><small>PHONE</small><strong>{isConfigured(business.phone) ? business.phone : '+91 9894376366'}</strong>{phone && <a href={phone}>Call now</a>}</div>
            </div>
            <div className="contact-detail">
              <span><MessageCircle size={19} aria-hidden="true" /></span><div><small>WHATSAPP</small><strong>{isConfigured(business.whatsapp) ? business.whatsapp : '+91 9894376366'}</strong>{wa && <a href={wa} target="_blank" rel="noreferrer">Chat now</a>}</div>
            </div>
            <div className="contact-detail">
              <span><Mail size={19} aria-hidden="true" /></span><div><small>EMAIL</small><strong>{isConfigured(business.email) ? business.email : 'selvatoursandtravels.stt@gmail.com'}</strong>{email && <a href={email}>Send an email</a>}</div>
            </div>
            {isConfigured(business.operatingHours) && <div className="contact-detail">
              <span><Clock3 size={19} aria-hidden="true" /></span><div><small>BUSINESS HOURS</small><strong>{business.operatingHours}</strong></div>
            </div>}
          </div>
          <div className="contact-related-links"><Link to="/tariff">Taxi tariff options</Link><Link to="/tour-packages">Suggested destinations</Link></div>
          </div>
        </div>
      </section>

      <section className="contact-enquiry-band" aria-label="Travel enquiry and office location">
        <div className="contact-enquiry-layout page-width">
          <div className="contact-form-panel">
            <EnquiryForm initialType={initialType} initialDestination={initialDestination} initialMessage={initialMessage} initialDate={initialDate} initialTravellers={initialTravellers} />
          </div>
          <aside className="contact-map-panel">
            <div className="contact-map-heading">
              <p className="eyebrow">VISIT OUR OFFICE</p>
              <h2>Find us in Coimbatore</h2>
              <p>{officeAddress}</p>
            </div>
            <iframe
              className="contact-map-frame"
              src={mapEmbedUrl}
              title="Google Map showing Selva Tours and Travels at Rathinapuri, Coimbatore"
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a className="button button-outline contact-directions-button" href={directionsUrl} target="_blank" rel="noreferrer">
              Get Directions
            </a>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default Contact
