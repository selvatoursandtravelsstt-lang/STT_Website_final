import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { business, isConfigured, whatsappHref } from '../config/business.js'

const quickLinks = [
  ['Home', '/'],
  ['About', '/about'],
  ['Tour packages', '/tour-packages'],
  ['Gallery', '/gallery'],
  ['Tariff', '/tariff/local-hours'],
  ['Contact us', '/contact'],
]

function Footer() {
  const waLink = whatsappHref('Hello, I would like to enquire about travel.')
  return (
    <footer className="site-footer">
      <div className="footer-main page-width">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/images/selva-logo.png" alt="" width="1254" height="1254" loading="lazy" decoding="async" />
            <span className="footer-logo-copy">
              <span className="footer-logo-name">SELVA</span>
              <span className="footer-logo-tagline">TOURS &amp; TRAVELS</span>
            </span>
          </Link>
          <p>Local taxi enquiries, outstation travel, airport transfers, and tour planning from Coimbatore.</p>
          <span className="footer-location"><MapPin size={15} aria-hidden="true" /> {business.location}</span>
        </div>
        <div className="footer-links">
          <h2>Explore</h2>
          {quickLinks.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
        </div>
        <div className="footer-links">
          <h2>Travel ideas</h2>
          <Link to="/tariff/local-hours">Local tariff — hour basis</Link>
          <Link to="/tariff/outstation-day">Outstation tariff — day basis</Link>
          <Link to="/tariff/outstation-km">Outstation tariff — KM basis</Link>
          <Link to="/tariff/corporate">Corporate cab bookings</Link>
          {['Ooty', 'Kodaikanal', 'Munnar', 'Valparai'].map((destination) => <Link key={destination} to={`/contact?destination=${encodeURIComponent(destination)}`}>{destination}</Link>)}
        </div>
        <div className="footer-contact">
          <h2>Start a conversation</h2>
          <p>Tell us where you would like to go. We’ll help you explore the options.</p>
          {waLink ? <a href={waLink} target="_blank" rel="noreferrer">WhatsApp us</a> : <Link to="/contact">Contact Selva</Link>}
          {isConfigured(business.phone) ? <a href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>{business.phone}</a> : <span>Phone number to be confirmed</span>}
          {isConfigured(business.email) ? <a href={`mailto:${business.email}`}>{business.email}</a> : <span>Email address to be confirmed</span>}
          {!isConfigured(business.whatsapp) && <span>WhatsApp number to be confirmed</span>}
        </div>
      </div>
      <div className="footer-bottom page-width">
        <span>© {new Date().getFullYear()} {business.name}</span>
        <span>Based in Coimbatore, Tamil Nadu</span>
        <span className="footer-credit">Copyrights held by <a href="https://www.xenoratechnologies.in/" target="_blank" rel="noopener noreferrer">AEX Xenora Technologies</a></span>
      </div>
    </footer>
  )
}

export default Footer
