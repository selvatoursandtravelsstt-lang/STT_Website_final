import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { business, whatsappHref } from '../config/business.js'
import { tourPackageDurations } from '../data/tourPackages.js'

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const vehiclePriceFields = [
  ['rateCategory', 'Rate category'],
  ['distanceThresholdKm', 'Distance threshold'],
  ['rentPerDay', 'Rent per day'],
  ['ratePerKm', 'Rate per km'],
  ['fuelCostPerKm', 'Fuel cost per km'],
  ['driverBatta', 'Driver allowance / Batta'],
  ['additionalCharges', 'Additional charges'],
]

function displayPrice(value, key) {
  if (value === null || value === undefined || value === '') return 'Contact for pricing'
  if (Array.isArray(value)) return value.length ? value.join(', ') : 'Contact for pricing'
  if (typeof value === 'number' && key === 'distanceThresholdKm') return `${value} km`
  if (typeof value !== 'number') return value
  const amount = currency.format(value)
  return ['ratePerKm', 'fuelCostPerKm'].includes(key) ? `${amount}/km` : amount
}

function pricingSections(vehicle) {
  if (vehicle.pricingOptions?.length) return vehicle.pricingOptions
  const fields = vehiclePriceFields
    .filter(([key]) => vehicle[key] !== null && vehicle[key] !== undefined && vehicle[key] !== '')
    .map(([key, label]) => ({ key, label, value: vehicle[key] }))
  return fields.length ? [{ id: 'pricing-details', label: 'Pricing details', fields }] : []
}

function TripDetailsDialog({ trip, onClose }) {
  const dialogRef = useRef(null)
  const [selectedVehicleId, setSelectedVehicleId] = useState(() => trip?.vehicles[0]?.id ?? '')
  const duration = tourPackageDurations.find(({ id }) => id === trip?.duration)
  const selectedVehicle = trip?.vehicles.find(({ id }) => id === selectedVehicleId) ?? trip?.vehicles[0]
  const selectedPricingSections = selectedVehicle ? pricingSections(selectedVehicle) : []

  useEffect(() => {
    if (trip && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal()
    }
  }, [trip])

  const priceSummary = selectedPricingSections.flatMap(({ label, fields }) => [
    label,
    ...(fields ?? []).map(({ key, label: fieldLabel, value }) => `${fieldLabel}: ${displayPrice(value, key)}`),
  ]).join('\n') || 'Contact for pricing; confirm the pricing basis and all charges with the business.'
  const enquiryLink = selectedVehicle
    ? whatsappHref([
      `Hello, I would like to enquire about ${trip.title}.`,
      `Duration: ${duration?.label ?? trip.duration}.`,
      `Vehicle: ${selectedVehicle.name}.`,
      `Pricing details: ${priceSummary}`,
      'Please confirm the route, rates, and availability.',
    ].join('\n'))
    : ''
  const routeStops = trip?.title.split(/\s+[–-]\s+/).filter(Boolean) ?? []

  return (
    <dialog
      className="trip-dialog"
      ref={dialogRef}
      aria-labelledby="trip-dialog-title"
      onClose={onClose}
    >
      {trip && (
        <>
          <div className="trip-dialog-header">
            <div>
              <p className="eyebrow">{duration?.label} · ILLUSTRATIVE ROUTE</p>
              <h2 id="trip-dialog-title">{trip.title}</h2>
            </div>
            <button className="trip-dialog-close" type="button" aria-label="Close trip details" onClick={() => dialogRef.current?.close()}>
              <X size={23} aria-hidden="true" />
            </button>
          </div>
          <section className="trip-dialog-section" aria-labelledby="trip-itinerary-heading">
            <h3 id="trip-itinerary-heading">Route and itinerary</h3>
            <p className="trip-dialog-description">{routeStops.join(' → ') || trip.title}</p>
            {trip.itinerary?.length ? (
              <ol className="trip-itinerary-list">
                {trip.itinerary.map((stop) => <li key={stop}>{stop}</li>)}
              </ol>
            ) : (
              <p className="trip-itinerary-note">{trip.description} No stop-by-stop itinerary is available to display.</p>
            )}
          </section>
          <section className="trip-dialog-section" aria-labelledby="trip-vehicle-heading">
            <h3 id="trip-vehicle-heading">Vehicle categories</h3>
            {trip.vehicles.length ? (
              <>
                <div className="trip-vehicle-selector" role="group" aria-label="Select a vehicle category">
                  {trip.vehicles.map((vehicle) => (
                    <button
                      key={vehicle.id}
                      type="button"
                      className={vehicle.id === selectedVehicle?.id ? 'trip-vehicle-option is-selected' : 'trip-vehicle-option'}
                      aria-pressed={vehicle.id === selectedVehicle?.id}
                      onClick={() => setSelectedVehicleId(vehicle.id)}
                    >
                      {vehicle.name}
                    </button>
                  ))}
                </div>
                {selectedVehicle && (
                  <div className="trip-pricing-card" aria-live="polite">
                    <h4>{selectedVehicle.name}</h4>
                    {(selectedVehicle.model || selectedVehicle.seatingCapacity) && (
                      <p className="trip-vehicle-spec">
                        {[selectedVehicle.model, selectedVehicle.seatingCapacity && `${selectedVehicle.seatingCapacity} seats`].filter(Boolean).join(' · ')}
                      </p>
                    )}
                    {selectedPricingSections.length ? selectedPricingSections.map((option, index) => (
                      <section className="trip-pricing-option" key={option.id ?? `${option.label}-${index}`}>
                        <h5>{option.label}</h5>
                        <dl>
                          {(option.fields ?? []).map(({ key, label, value }, index) => (
                            <div key={`${key ?? label}-${index}`}><dt>{label}</dt><dd>{displayPrice(value, key)}</dd></div>
                          ))}
                        </dl>
                      </section>
                    )) : (
                      <div className="trip-pricing-option">
                        <h5>Pricing details</h5>
                        <dl><div><dt>Applicable rates and charges</dt><dd>Contact for pricing</dd></div></dl>
                      </div>
                    )}
                    {selectedVehicle.pricingNotes && <p className="trip-pricing-note">{selectedVehicle.pricingNotes}</p>}
                  </div>
                )}
              </>
            ) : <p className="trip-pricing-note">Vehicle options are not listed. Contact the business to discuss your requirements.</p>}
          </section>
          <section className="trip-dialog-section">
            <h3>Before you enquire</h3>
            <ul className="trip-terms">
              {trip.terms.map((term) => <li key={term}>{term}</li>)}
            </ul>
          </section>
          <div className="trip-dialog-actions">
            {enquiryLink ? (
              <a className="button button-gold" href={enquiryLink} target="_blank" rel="noreferrer">
                Enquire on WhatsApp
              </a>
            ) : (
              <>
                <button className="button button-gold" type="button" disabled>WhatsApp enquiry unavailable</button>
                <Link className="button button-outline" to={`/contact?type=Tour%20Package&destination=${encodeURIComponent(trip.title)}&duration=${duration?.days ?? ''}`}>
                  Contact us to enquire
                </Link>
              </>
            )}
            <p>{business.whatsapp.trim() ? 'Rates and availability must be confirmed with the business.' : 'WhatsApp contact is not configured. Please use the Contact Us page to enquire.'}</p>
          </div>
        </>
      )}
    </dialog>
  )
}

export default TripDetailsDialog
