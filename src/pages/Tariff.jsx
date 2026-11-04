import { CircleHelp } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import CorporateEnquiryForm from '../components/CorporateEnquiryForm.jsx'
import TariffHero from '../components/TariffHero.jsx'
import TariffSidebar from '../components/TariffSidebar.jsx'
import TariffTable from '../components/TariffTable.jsx'
import TariffTerms from '../components/TariffTerms.jsx'
import { tariffPages } from '../data/tariffData.js'

function getTariffFaqs(path) {
  const common = [
    ['Are the listed tariff amounts a confirmed quote?', 'No. The tables are reference information. Confirm the current fare, vehicle availability, route, and applicable terms with Selva Tours and Travels before making travel arrangements.'],
    ['Are tolls, parking, and permit charges included?', 'The published tariff terms list parking, toll, and interstate permit charges as extra. Confirm which charges apply to your specific trip.'],
  ]

  if (path === '/tariff/local-hours') {
    return [
      ['What is shown in the Coimbatore local taxi tariff?', 'The reference table lists 8-hour and 10-hour package options, included hours and kilometres, and vehicle-specific reference fares. Confirm the current details before booking.'],
      ...common,
    ]
  }

  if (path === '/tariff/outstation-day') {
    return [
      ['How is a day counted for the outstation day-basis tariff?', 'The published terms define one day as one calendar day, from midnight to midnight. Confirm the schedule and any applicable charges for your journey.'],
      ['When should I ask about the kilometre-basis tariff?', 'The published terms say trips averaging more than 300 km per day shift to the kilometre-basis tariff. Confirm which tariff applies to your itinerary.'],
      ...common,
    ]
  }

  if (path === '/tariff/outstation-km') {
    return [
      ['How is distance calculated for the kilometre-basis tariff?', 'The published terms state that total kilometre and time calculations are from office to office. Confirm the route and calculation with the business before travel.'],
      ...common,
    ]
  }

  return [
    ['Does a corporate cab enquiry confirm a booking or contract?', 'No. Sending an enquiry is a request to discuss requirements; it does not confirm vehicle availability, pricing, a contract, or a booking.'],
    ['What details should I include in a corporate cab enquiry?', 'Share your locations, passenger count, dates, schedule, and vehicle preferences so the business can review the request.'],
  ]
}

function CorporateContent() {
  return (
    <>
      <section className="corporate-contact-block" aria-labelledby="corporate-contact-title">
        <div className="tariff-content-heading">
          <p className="eyebrow">CORPORATE TRAVEL ENQUIRIES</p>
          <h2 id="corporate-contact-title">Travel arrangements for your organisation</h2>
          <p>Discuss employee transportation, business meeting journeys, and airport transfers where required. Tell us your locations, passenger count, dates, and schedule so we can review suitable options.</p>
        </div>
        <div className="corporate-contact-details">
          <p><strong>Vehicle options:</strong> vehicle type, model, and seating capacity are confirmed against your requirements and availability.</p>
          <p><strong>Quotation:</strong> request a customized quote for your travel needs. No corporate prices or service guarantees are published here.</p>
        </div>
        <p className="corporate-contact-followup">The reference corporate page provides a contact invitation but no verifiable corporate pricing or service details. This Selva page does not imply an existing corporate contract or booking confirmation.</p>
        <p className="corporate-contact-actions">
          <Link className="button button-outline" to="/contact?type=Other&category=Corporate%20Cab%20Bookings&message=I%20would%20like%20to%20request%20a%20customized%20corporate%20cab%20quotation.">Contact Us</Link>
        </p>
      </section>
      <CorporateEnquiryForm />
    </>
  )
}

function Tariff() {
  const { pathname } = useLocation()
  const page = tariffPages.find((item) => item.path === pathname) || tariffPages[0]
  const isCorporate = page.path === '/tariff/corporate'
  const faqs = getTariffFaqs(page.path)

  return (
    <div className="inner-page tariff-page">
      <TariffHero title={page.title} breadcrumb={page.breadcrumb} />
      <section className="tariff-page-content">
        <div className="page-width tariff-layout">
          <TariffSidebar />
          <main className="tariff-main-content">
            <p className="tariff-introduction">{page.introduction}</p>
            {isCorporate ? <CorporateContent /> : <TariffTable tariff={page} />}
            {!isCorporate && <TariffTerms tariff={page} />}
            <section className="faq-section" aria-labelledby="tariff-faq-title">
              <div className="faq-heading">
                <CircleHelp size={22} aria-hidden="true" />
                <div>
                  <p className="eyebrow">COMMON QUESTIONS</p>
                  <h2 id="tariff-faq-title">Taxi tariff FAQs</h2>
                </div>
              </div>
              {faqs.map(([question, answer]) => (
                <details className="faq-item" key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </section>
          </main>
        </div>
      </section>
    </div>
  )
}

export default Tariff
