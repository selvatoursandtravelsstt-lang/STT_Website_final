import { ChevronRight, Home } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

function TariffHero({ title, breadcrumb }) {
  const { pathname } = useLocation()
  const tariffBackgroundClass = pathname === '/tariff/local-hours'
    ? ' tariff-hero--local-hours'
    : pathname === '/tariff/outstation-day'
      ? ' tariff-hero--outstation-day'
      : pathname === '/tariff/outstation-km'
        ? ' tariff-hero--outstation-km'
        : pathname === '/tariff/corporate'
          ? ' tariff-hero--corporate'
      : ''

  return (
    <section className={`tariff-hero${tariffBackgroundClass}`} aria-labelledby="tariff-page-title">
      <div className="page-width tariff-hero-content">
        <p className="eyebrow">TRAVEL OPTIONS FROM COIMBATORE</p>
        <h1 id="tariff-page-title">{title}</h1>
        <nav className="tariff-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/"><Home size={14} aria-hidden="true" /> Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link to="/tariff/local-hours">Tariff</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{breadcrumb}</span>
        </nav>
      </div>
    </section>
  )
}

export default TariffHero
