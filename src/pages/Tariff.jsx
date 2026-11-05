import { CircleHelp } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import CorporateEnquiryForm from '../components/CorporateEnquiryForm.jsx'
import TariffHero from '../components/TariffHero.jsx'
import TariffSidebar from '../components/TariffSidebar.jsx'
import TariffTable from '../components/TariffTable.jsx'
import TariffTerms from '../components/TariffTerms.jsx'
import { tariffPages } from '../data/tariffData.js'
import { getTariffFaqs } from '../data/tariffFaqs.js'

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
