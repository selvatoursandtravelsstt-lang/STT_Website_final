import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function TourDurationLinks({ durations, currentDurationId, className = '', headingId = 'other-durations-heading' }) {
  return (
    <section className={`duration-other-links${className ? ` ${className}` : ''}`} aria-labelledby={headingId}>
      <div className="page-width">
        <p className="eyebrow">FIND ANOTHER DURATION</p>
        <h2 id={headingId}>Explore other tour durations</h2>
        <div className="duration-other-grid">
          {durations.filter(({ id }) => id !== currentDurationId).map((duration) => (
            <Link key={duration.id} to={`/tour-packages/${duration.id}`}>
              {duration.label} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TourDurationLinks
