import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import ContactButtons from './ContactButtons.jsx'

function PackageCard({ package: item }) {
  return (
    <article className="package-card">
      <div className="package-image">
        <img src={item.image} alt={item.alt} loading="lazy" />
        <span className="image-label">{item.destination}</span>
      </div>
      <div className="package-content">
        <p className="eyebrow">{item.duration}</p>
        <h3>{item.name}</h3>
        <p className="package-description">{item.description}</p>
        <div className="package-meta"><MapPin size={15} aria-hidden="true" /> {item.destination}</div>
        {item.attractions && <p className="package-detail"><strong>Highlights</strong> · {item.attractions.join(' · ')}</p>}
        {item.temples && <p className="package-detail"><strong>Temple</strong> · {item.temples.join(' · ')}</p>}
        {item.inclusions && <p className="package-detail"><strong>Planning</strong> · {item.inclusions}</p>}
        {item.exclusions && <p className="package-detail"><strong>Not included</strong> · {item.exclusions}</p>}
        <p className="sample-note">Illustrative itinerary · confirm availability and details</p>
        <div className="package-card-footer">
          <Link className="text-link" to="/contact">View details <ArrowRight size={16} aria-hidden="true" /></Link>
          <ContactButtons variant="compact" message={`Hello, I would like to enquire about the ${item.name} itinerary.`} />
        </div>
      </div>
    </article>
  )
}

export default PackageCard
