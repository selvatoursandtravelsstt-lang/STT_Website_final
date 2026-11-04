import { ArrowRight, CarFront } from 'lucide-react'
import { Link } from 'react-router-dom'

function TariffCard({ title, description }) {
  return (
    <article className="tariff-card">
      <span className="tariff-icon"><CarFront size={22} aria-hidden="true" /></span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <Link className="text-link" to="/contact">Request quote <ArrowRight size={15} aria-hidden="true" /></Link>
    </article>
  )
}

export default TariffCard
