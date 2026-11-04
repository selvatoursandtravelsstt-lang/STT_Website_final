import { Landmark } from 'lucide-react'
import PackageCard from '../components/PackageCard.jsx'
import ContactButtons from '../components/ContactButtons.jsx'
import { templePackages } from '../data/packages.js'

function TemplePackages() {
  return (
    <div className="inner-page">
      <section className="page-banner temple-banner">
        <div className="page-width page-banner-inner">
          <p className="eyebrow">PILGRIMAGE, AT YOUR PACE</p>
          <h1>Journeys shaped<br /><em>around what matters.</em></h1>
          <p>Explore sample temple visits in Tamil Nadu. Share your preferred route and timing so details can be discussed before you travel.</p>
        </div>
      </section>
      <section className="section page-width packages-page-section">
        <div className="package-disclaimer"><Landmark size={21} aria-hidden="true" /><p><strong>Illustrative routes</strong><br />Temple names shown are itinerary examples only. Confirm destinations, opening schedules, route, and travel availability before planning.</p></div>
        <div className="package-grid package-grid-large">{templePackages.map((item) => <PackageCard key={item.name} package={item} />)}</div>
      </section>
      <section className="temple-quote page-width"><div><p className="eyebrow">PLAN A VISIT</p><h2>Tell us where you’d like<br /><em>to pay a visit.</em></h2></div><ContactButtons message="Hello, I would like to enquire about a temple visit." /></section>
    </div>
  )
}

export default TemplePackages
