import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

function DestinationCard({ destination }) {
  return (
    <article className="destination-card">
      <img src={destination.image} alt={destination.alt} loading="lazy" />
      <div className="destination-card-content">
        <p className="destination-location"><MapPin size={14} aria-hidden="true" /> Suggested destination</p>
        <h3>{destination.name}</h3>
        <p>{destination.description}</p>
        <Link className="text-link" to={`/contact?destination=${encodeURIComponent(destination.name)}`} aria-label={`Enquire about travel to ${destination.name}`}>
          Enquire about this destination
        </Link>
      </div>
    </article>
  )
}

export default DestinationCard
