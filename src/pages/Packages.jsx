import { ArrowRight, CircleHelp, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import ContactButtons from '../components/ContactButtons.jsx'
import DestinationCard from '../components/DestinationCard.jsx'
import { suggestedDestinations } from '../data/destinations.js'
import { tourPackageDurations } from '../data/tourPackages.js'

const tourCategories = [
  ['Family Tour Packages', 'Discuss a trip that works for your family and travel dates.'],
  ['Pilgrimage Tours', 'Ask about a route and schedule for a spiritual journey.'],
  ['Hill-Station Tours', 'Explore suggested hill destinations and travel options.'],
  ['Friends and Group Trips', 'Share your group size, route, and vehicle needs.'],
  ['Multi-Day Tours', 'Discuss a multi-day route with the business.'],
  ['Custom Tour Enquiries', 'Start with your destination and shape an enquiry around it.'],
]

const faqs = [
  ['What tour packages are available from Coimbatore?', 'Destinations shown on this page are suggestions. Contact the business to confirm current routes, availability, and arrangements.'],
  ['Do you offer one-day and multi-day tours?', 'You can enquire about different trip durations, from one day to longer journeys. Availability and details must be confirmed directly.'],
  ['Can I customise my itinerary?', 'Share your preferred destinations, dates, and stops to discuss possible itinerary options.'],
  ['How much does a tour package cost?', 'One-day package pages show vehicle rates for each route. Confirm the current STT quotation, vehicle availability, and applicable charges directly; longer-duration routes require a trip-specific quotation.'],
  ['Can families and groups enquire?', 'Yes, enquiries can include family or group travel requirements. Vehicle availability and suitability need to be confirmed.'],
  ['How do I contact you about a package?', 'Use the contact form or WhatsApp enquiry option, if configured, and mention your destination and travel dates.'],
]

function Packages() {
  return (
    <div className="inner-page">
      <section className="page-banner packages-banner">
        <div className="page-width page-banner-inner">
          <p className="eyebrow">TRAVEL IDEAS FROM COIMBATORE</p>
          <h1>Tour Packages<br /><em>from Coimbatore</em></h1>
          <p>Discover suggested destinations and route ideas from Coimbatore. Explore options by trip duration, then contact Selva Tours and Travels to confirm routes, itineraries, vehicle availability, and a quotation.</p>
          <div className="packages-banner-actions">
            <a className="button button-gold" href="#duration-options">Explore Tour Packages <ArrowRight size={16} aria-hidden="true" /></a>
            <ContactButtons message="Hello, I would like to plan a tour from Coimbatore." primaryLabel="Plan Your Trip on WhatsApp" fallbackLabel="Plan your trip" />
          </div>
        </div>
      </section>

      <section className="section page-width duration-section" id="duration-options">
        <div className="section-heading">
          <div><p className="eyebrow">EXPLORE PACKAGES BY DURATION</p><h2>How long would you <em>like to travel?</em></h2></div>
          <p>Choose a duration to view suggested routes. All routes, itineraries, rates, and availability must be confirmed with the business.</p>
        </div>
        <div className="duration-link-grid">
          {tourPackageDurations.map(({ id, label }) => (
            <Link className="duration-link-card" key={id} to={`/tour-packages/${id}`}>
              <span>{label} Tour Packages</span><ArrowRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="section suggested-destinations-section">
        <div className="page-width">
          <div className="section-heading"><div><p className="eyebrow">POPULAR DESTINATION IDEAS</p><h2>Places to <em>consider.</em></h2></div><p>These are suggested destinations, not confirmed bookable packages. Ask about current services and availability.</p></div>
          <div className="destination-grid">
            {suggestedDestinations.map((destination) => <DestinationCard key={destination.name} destination={destination} />)}
          </div>
        </div>
      </section>

      <section className="section page-width tour-categories-section">
        <div className="section-heading"><div><p className="eyebrow">TOUR CATEGORIES</p><h2>What kind of trip <em>is on your mind?</em></h2></div></div>
        <div className="tour-category-grid">
          {tourCategories.map(([title, text]) => <article key={title}><Compass size={21} aria-hidden="true" /><h3>{title}</h3><p>{text}</p><Link to={`/contact?type=Tour%20Package&category=${encodeURIComponent(title)}`} className="text-link">Make an enquiry <ArrowRight size={15} aria-hidden="true" /></Link></article>)}
        </div>
      </section>

      <section className="package-information-section">
        <div className="page-width">
          <div className="section-heading"><div><p className="eyebrow">PACKAGE INFORMATION</p><h2>Details to discuss <em>before confirming.</em></h2></div></div>
          <details className="package-information">
            <summary>What will be confirmed for a tour enquiry?</summary>
            <div className="package-information-grid">
              {[
                ['Suggested duration', 'Discussed for your travel dates and route.'],
                ['Destination or route', 'Based on your preferred places and trip requirements.'],
                ['Sightseeing suggestions', 'Discuss possible stops; no itinerary is confirmed until agreed.'],
                ['Vehicle options', 'Vehicle type and availability need direct confirmation.'],
                ['Price or quotation status', 'Request a trip-specific quote; no prices are published here.'],
                ['Included services', 'Confirm any inclusions directly before making arrangements.'],
                ['Excluded services', 'Confirm applicable exclusions and additional charges directly.'],
              ].map(([title, content]) => <div key={title}><strong>{title}</strong><p>{content}</p></div>)}
            </div>
            <Link className="button button-gold" to="/contact?type=Tour%20Package">Enquire about a tour <ArrowRight size={16} aria-hidden="true" /></Link>
          </details>
        </div>
      </section>

      <section className="section page-width tour-planning-section">
        <div className="section-heading"><div><p className="eyebrow">HOW TO PLAN A TOUR</p><h2>From idea to <em>arrangement.</em></h2></div></div>
        <ol className="steps-grid">
          <li><span>01</span><h3>Choose a destination</h3><p>Browse suggestions or share another place you have in mind.</p></li>
          <li><span>02</span><h3>Share dates and group size</h3><p>Tell us when you plan to travel and how many people are travelling.</p></li>
          <li><span>03</span><h3>Discuss itinerary and quotation</h3><p>Confirm possible routes, vehicle options, and applicable charges.</p></li>
          <li><span>04</span><h3>Confirm arrangements directly</h3><p>Availability and all trip arrangements are agreed with the business.</p></li>
        </ol>
      </section>

      <section className="section page-width packages-faq-section">
        <div className="faq-heading"><CircleHelp size={22} aria-hidden="true" /><div><p className="eyebrow">COMMON QUESTIONS</p><h2>Tour package FAQs</h2></div></div>
        {faqs.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}</summary><p>{answer}</p></details>)}
      </section>

      <section className="package-bottom-cta"><div className="page-width"><div><p className="eyebrow">HAVE A DESTINATION IN MIND?</p><h2>Let’s start with <em>your idea.</em></h2></div><ContactButtons message="Hello, I have a destination in mind and would like to enquire about a tour." primaryLabel="Plan your trip" fallbackLabel="Contact us" /></div></section>
    </div>
  )
}

export default Packages
