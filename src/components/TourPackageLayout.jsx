import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MapPin, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import BookingActionLink from './BookingActionLink.jsx'
import TariffTerms from './TariffTerms.jsx'
import TourDurationLinks from './TourDurationLinks.jsx'
import { createVehicleSummary } from '../utils/booking.js'
import { tariffTerms } from '../data/tariffData.js'

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

function vehicleImageFor(category, vehicleName) {
  const vehicleType = `${category || ''} ${vehicleName || ''}`.toLowerCase()
  if (vehicleType.includes('swift dzire')) return '/images/cars/swift-dzire.png'
  if (vehicleType.includes('toyota etios')) return '/images/cars/toyota-etios.png'
  if (vehicleType.includes('indigo') || vehicleType.includes('zest')) return '/images/cars/indigo-zest.png'
  if (vehicleType.includes('verito') || vehicleType.includes('logan')) return '/images/cars/logan-verito.png'
  if (vehicleType.includes('xylo')) return '/images/cars/mahindra-xylo.png'
  if (vehicleType.includes('innova crysta')) return '/images/cars/innova-crysta.png'
  if (vehicleType.includes('innova')) return '/images/cars/innova.png'
  if (vehicleType.includes('tavera')) return '/images/cars/tavera.png'
  if (vehicleType.includes('traveller')) return '/images/cars/traveller-ac.png'
  if (vehicleType.includes('mini van')) return '/images/cars/traveller-placeholder.svg'
  if (vehicleType.includes('suv')) return '/images/cars/suv-placeholder.svg'
  return '/images/cars/sedan-placeholder.svg'
}

function TourPackageLayout({ duration, packages, durations }) {
  const [selection, setSelection] = useState({ durationId: duration.id, packageId: packages[0]?.id ?? '' })
  const shouldScrollToDetails = useRef(false)
  const includesKeralaRoutes = packages.some(({ destination, title, route }) =>
    /munnar|thekkady|alleppey|alleppy|kochi|cochin|wayanad|guruvayur|athirappalli|varkala|kerala/i.test(`${destination} ${title} ${route}`),
  )
  const selectedPackageId = selection.durationId === duration.id ? selection.packageId : packages[0]?.id
  const selectedPackage = packages.find(({ id }) => id === selectedPackageId) ?? packages[0]
  const detailsId = selectedPackage ? `${duration.id}-package-${selectedPackage.id}` : undefined

  useEffect(() => {
    if (!shouldScrollToDetails.current || !detailsId) return

    shouldScrollToDetails.current = false
    document.getElementById(detailsId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [detailsId])

  const selectPackage = (packageId) => {
    if (packageId === selectedPackage?.id) {
      document.getElementById(detailsId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    shouldScrollToDetails.current = true
    setSelection({ durationId: duration.id, packageId })
  }

  return (
    <div className="inner-page one-day-package-page">
      <section className="page-banner one-day-package-banner">
        <div className="page-width page-banner-inner">
          <div className="one-day-package-banner-copy">
            <p className="eyebrow">{duration.label.toUpperCase()} JOURNEYS FROM COIMBATORE</p>
            <h1>{duration.days === 1 ? 'One-Day' : `${duration.days}-Day`} Tour Packages from Coimbatore</h1>
            <p>Browse suggested Coimbatore tour packages and routes from Coimbatore. {includesKeralaRoutes && 'Some options are Kerala tours from Coimbatore. '}Review vehicle tariffs and itinerary details; confirm availability and charges with Selva Tours and Travels.</p>
            <nav className="package-breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link><span aria-hidden="true">›</span>
              <Link to="/tour-packages">Tour Packages</Link><span aria-hidden="true">›</span>
              <span aria-current="page">{duration.label}</span>
            </nav>
          </div>
          <img
            className="one-day-package-banner-image"
            src="/images/travel-suitcase.png"
            alt="Travel suitcase with photographs, passport stamps, and travel keepsakes"
          />
        </div>
      </section>

      <section className="one-day-package-layout page-width" aria-label={`${duration.label} tour packages`}>
        <aside className="one-day-package-sidebar" aria-labelledby="one-day-package-list-heading">
          <div className="one-day-sidebar-heading">
            <p className="eyebrow">CHOOSE A ROUTE</p>
            <h2 id="one-day-package-list-heading">{duration.label} packages</h2>
          </div>
          <nav className="one-day-package-list" aria-label={`${duration.label} tour package selector`}>
            {packages.map((trip) => (
              <button
                className={trip.id === selectedPackage?.id ? 'one-day-package-option is-selected' : 'one-day-package-option'}
                key={trip.id}
                type="button"
                aria-pressed={trip.id === selectedPackage?.id}
                onClick={() => selectPackage(trip.id)}
              >
                <img src={trip.image} alt="" loading="lazy" />
                <span>{trip.title}</span>
              </button>
            ))}
          </nav>
          
        </aside>

        {selectedPackage && (
          <article id={detailsId} className="one-day-package-detail" aria-labelledby="one-day-selected-title" aria-live="polite">
            <div className="one-day-package-content">
              <div className="one-day-package-heading">
                <p className="eyebrow"><MapPin size={14} aria-hidden="true" /> {duration.label.toUpperCase()} · {selectedPackage.destination}</p>
                <h2 id="one-day-selected-title">{selectedPackage.title}</h2>
                <p className="one-day-package-route">{selectedPackage.route}</p>
              </div>
              <section className="one-day-detail-section one-day-tariff-section" aria-labelledby="one-day-tariff-heading">
                <div className="one-day-tariff-heading">
                  <div>
                    <p className="eyebrow"><Tag size={14} aria-hidden="true" /> REFERENCE TARIFF</p>
                    <h3 id="one-day-tariff-heading">Vehicle package amount</h3>
                  </div>
                  <span>Duration: {duration.label}</span>
                </div>
                <div className="one-day-tariff-scroll" tabIndex="0" aria-label="Scrollable vehicle tariff table">
                  <table className="one-day-tariff-table">
                    <caption className="visually-hidden">Vehicle package amounts for {selectedPackage.title}.</caption>
                    <colgroup>
                      <col className="one-day-col-image" />
                      <col className="one-day-col-vehicle" />
                      <col className="one-day-col-fare" />
                      <col className="one-day-col-action" />
                    </colgroup>
                    <thead>
                      <tr><th scope="col">Vehicle Image</th><th scope="col">Vehicle</th><th scope="col">Package Amount</th><th scope="col">Enquiry</th></tr>
                    </thead>
                    <tbody>
                      {selectedPackage.vehicleTariffs.map((vehicle) => (
                        <tr key={vehicle.id}>
                          <td data-label="Vehicle Image">
                            <img
                              className="one-day-tariff-vehicle-image"
                              src={vehicle.image || vehicleImageFor(vehicle.category, vehicle.name)}
                              alt={`${vehicle.name} vehicle`}
                              loading="lazy"
                            />
                          </td>
                          <th scope="row" data-label="Vehicle">
                            <span>{vehicle.name}</span>
                            <small>{vehicle.category}</small>
                          </th>
                          <td data-label="Package Amount">
                            {Number.isFinite(vehicle.amount)
                              ? currency.format(vehicle.amount)
                              : <span className="one-day-unclear-amount">Unclear source value: {vehicle.sourceAmount}</span>}
                            {vehicle.amountNote && <small className="one-day-amount-note">{vehicle.amountNote}</small>}
                          </td>
                          <td data-label="Enquiry">
                            <BookingActionLink
                              className="one-day-book-button"
                              aria-label={`Enquire about ${vehicle.name} for ${selectedPackage.title}`}
                              booking={{
                                title: selectedPackage.title,
                                serviceType: 'Tour Package',
                                package: {
                                  title: selectedPackage.title,
                                  destination: selectedPackage.destination,
                                  route: selectedPackage.route,
                                  duration: duration.label,
                                  itinerary: selectedPackage.itinerary,
                                  image: selectedPackage.image,
                                  imageAlt: selectedPackage.alt,
                                },
                                vehicle: createVehicleSummary(
                                  vehicle,
                                  vehicle.image || vehicleImageFor(vehicle.category, vehicle.name),
                                  `${vehicle.name} vehicle`,
                                ),
                                amount: vehicle.amount,
                                amountLabel: 'Reference package amount',
                                priceDetails: [{ label: 'Vehicle category', value: vehicle.category }],
                                returnPath: `/tour-packages/${duration.id}`,
                              }}
                            >
                              <span>Enquire</span>
                              <span>Now</span>
                            </BookingActionLink>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="one-day-detail-section" aria-labelledby="one-day-itinerary-heading">
                <h3 id="one-day-itinerary-heading">Sightseeing itinerary</h3>
                {selectedPackage.itinerary.length ? (
                  <ul className="one-day-itinerary">
                    {selectedPackage.itinerary.map((stop, index) => {
                      const isDayLabel = /^Day\s+\d+$/i.test(stop.trim())
                      return (
                        <li
                          key={`${index}-${stop}`}
                          className={isDayLabel ? 'one-day-itinerary-label' : 'one-day-itinerary-description'}
                        >
                          {stop}
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p className="one-day-reference-note">{selectedPackage.itineraryNote}</p>
                )}
              </section>

              <div className="one-day-inclusions-grid">
                <section className="one-day-detail-section">
                  <h3>Included charges listed by the reference</h3>
                  {selectedPackage.inclusions.length > 0 && (
                    <ul className="one-day-inclusions">
                      {selectedPackage.inclusions.map((inclusion) => <li key={inclusion}>{inclusion}</li>)}
                    </ul>
                  )}
                  {selectedPackage.inclusionText
                    ? <p className="one-day-reference-note">{selectedPackage.inclusionText}</p>
                    : selectedPackage.inclusions.length === 0 && <p className="one-day-reference-note">The reference does not specify included charges for this package.</p>}
                </section>
                <section className="one-day-detail-section">
                  <h3>Reference distances &amp; notes</h3>
                  {selectedPackage.mkt.length ? (
                    <ul className="one-day-inclusions">
                      {selectedPackage.mkt.map((value, index) => <li key={`${index}-${value}`}>{value}</li>)}
                    </ul>
                  ) : <p className="one-day-reference-note">No MKT or distance information is listed.</p>}
                  {selectedPackage.referenceNotes.map((note) => <p className="one-day-reference-note" key={note}>{note}</p>)}
                </section>
              </div>

              <div className="one-day-package-actions">
                <BookingActionLink
                  className="button button-gold"
                  booking={{
                    title: selectedPackage.title,
                    serviceType: 'Tour Package',
                    package: {
                      title: selectedPackage.title,
                      destination: selectedPackage.destination,
                      route: selectedPackage.route,
                      duration: duration.label,
                      itinerary: selectedPackage.itinerary,
                      image: selectedPackage.image,
                      imageAlt: selectedPackage.alt,
                    },
                    returnPath: `/tour-packages/${duration.id}`,
                  }}
                >
                  Enquire about this tour <ArrowRight size={16} aria-hidden="true" />
                </BookingActionLink>
                <p>Submitting an enquiry does not confirm a booking. STT will confirm arrangements directly.</p>
              </div>
            </div>
          </article>
        )}
      </section>

      <div className="page-width">
        <TariffTerms tariff={{ terms: tariffTerms }} />
      </div>

      <TourDurationLinks durations={durations} currentDurationId={duration.id} />
    </div>
  )
}

export default TourPackageLayout
