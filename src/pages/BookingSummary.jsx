import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import TariffTerms from '../components/TariffTerms.jsx'
import { persistBooking, readStoredBooking } from '../utils/booking.js'
import { tariffTerms } from '../data/tariffData.js'

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

function amountText(amount) {
  return Number.isFinite(amount) ? currency.format(amount) : 'Not listed'
}

function BookingSummary() {
  const location = useLocation()
  const navigate = useNavigate()
  const pickupTimeRef = useRef(null)
  const [booking, setBooking] = useState(() => location.state?.booking ?? readStoredBooking())

  useEffect(() => {
    if (booking) persistBooking(booking)
  }, [booking])

  if (!booking?.reference) {
    return (
      <section className="booking-summary-page page-width">
        <div className="booking-summary-empty">
          <p className="eyebrow">BOOKING SUMMARY</p>
          <h1>No selection to review</h1>
          <p>Choose a vehicle or tour package first to create a booking summary.</p>
          <div>
            <Link className="button button-gold" to="/tariff/local-hours">View Tariffs</Link>
            <Link className="button button-outline" to="/tour-packages/one-day">View Tour Packages</Link>
          </div>
        </div>
      </section>
    )
  }

  const journey = booking.journey ?? {}
  const listedAmount = Number.isFinite(booking.amount) ? booking.amount : null
  const taxAmount = Number.isFinite(booking.taxAmount)
    ? booking.taxAmount
    : Number.isFinite(booking.taxRate) && listedAmount !== null
      ? listedAmount * booking.taxRate / 100
      : null
  const totalAmount = listedAmount === null ? null : listedAmount + (taxAmount ?? 0)
  const selectedDetails = booking.vehicle ?? booking.package

  function updateJourney(field, value) {
    setBooking((current) => ({
      ...current,
      journey: { ...current.journey, [field]: value },
    }))
  }

  function openDatePicker(event) {
    const dateInput = event.currentTarget
    if (typeof dateInput.showPicker === 'function') {
      try {
        dateInput.showPicker()
      } catch {
        dateInput.focus()
      }
    } else {
      dateInput.focus()
    }
  }

  function openTimePicker(event) {
    if (event.currentTarget !== pickupTimeRef.current) event.preventDefault()
    const timeInput = pickupTimeRef.current
    if (!timeInput) return
    if (typeof timeInput.showPicker === 'function') {
      try {
        timeInput.showPicker()
      } catch {
        timeInput.focus()
      }
    } else {
      timeInput.focus()
    }
  }

  function enquire(event) {
    event.preventDefault()
    const selectedOption = booking.vehicle?.name
      ? `${booking.vehicle.name} for ${booking.package?.title || booking.title}`
      : booking.package?.title || booking.title
    const message = [
      `Booking reference: ${booking.reference}`,
      `Selected option: ${selectedOption}`,
      booking.vehicle ? `Fuel Type: ${booking.vehicle.fuelType}` : '',
      booking.vehicle ? `Passenger Capacity: ${booking.vehicle.capacity}` : '',
      `Service type: ${booking.serviceType || 'Tour Package'}`,
      `Package / tariff: ${booking.package?.title || booking.tariffTitle || booking.title}`,
      `Pick-up location: ${journey.pickupLocation}`,
      `Drop-off location: ${journey.dropoffLocation}`,
      `Pick-up date: ${journey.pickupDate}`,
      `Pick-up time: ${journey.pickupTime}`,
      `Number of travellers: ${journey.travellers}`,
      `Listed amount: ${amountText(listedAmount)}`,
      `GST / service tax: ${taxAmount === null ? 'Not specified in the published data' : currency.format(taxAmount)}`,
      `Displayed total: ${amountText(totalAmount)}`,
      booking.priceDetails?.length
        ? `Tariff details: ${booking.priceDetails.map(({ label, value }) => `${label}: ${value}`).join('; ')}`
        : '',
      '',
      'Additional message:',
    ].filter((line) => line !== undefined).join('\n')
    const params = new URLSearchParams({
      type: booking.serviceType || 'Tour Package',
      destination: journey.dropoffLocation,
      date: journey.pickupDate,
      travellers: journey.travellers,
      message,
    })

    persistBooking(booking)
    navigate(`/contact?${params.toString()}`)
  }

  return (
    <section className="booking-summary-page">
      <header className="booking-summary-hero">
        <video
          className="booking-summary-hero-video"
          src="/videos/munnar-hero-landscape.mp4"
          poster="/images/hero/munnar-hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex="-1"
        />
        <div className="booking-summary-hero-shade" aria-hidden="true" />
        <div className="page-width booking-summary-hero-content">
          <div className="booking-summary-heading">
            <Link className="booking-summary-back" to={booking.returnPath || '/tour-packages/one-day'}><ArrowLeft size={17} aria-hidden="true" /> Back to selection</Link>
            <p className="eyebrow">REVIEW YOUR SELECTION</p>
            <h1>Booking Summary</h1>
            <p>Review the selected option and add your journey details before sending an enquiry.</p>
          </div>
        </div>
      </header>

      <div className="page-width booking-summary-content">
      <form className="booking-summary-form" onSubmit={enquire}>
        <div className="booking-summary-grid">
          <article className="booking-summary-card booking-details-card">
            <div className="booking-summary-card-heading"><span>01</span><h2>Booking Details</h2></div>
            <dl className="booking-summary-reference"><div><dt>Booking reference</dt><dd>{booking.reference}</dd></div></dl>
            <dl className="booking-summary-pairs">
              <div><dt>Selected option</dt><dd>{booking.vehicle?.name ? `${booking.vehicle.name} · ${booking.package?.title || booking.title}` : booking.package?.title || booking.title}</dd></div>
              <div><dt>Service type</dt><dd>{booking.serviceType || 'Tour Package'}</dd></div>
              {booking.package?.duration && <div><dt>Duration</dt><dd>{booking.package.duration}</dd></div>}
              {booking.tariffPackage && <div><dt>Tariff package</dt><dd>{booking.tariffPackage}</dd></div>}
            </dl>
            <div className="booking-journey-fields">
              <label>Pick-up location<input required value={journey.pickupLocation || ''} onChange={(event) => updateJourney('pickupLocation', event.target.value)} placeholder="Enter pick-up location" /></label>
              <label>Drop-off location<input required value={journey.dropoffLocation || ''} onChange={(event) => updateJourney('dropoffLocation', event.target.value)} placeholder="Enter destination" /></label>
              <label>Pick-up date<input required type="date" value={journey.pickupDate || ''} onChange={(event) => updateJourney('pickupDate', event.target.value)} onClick={openDatePicker} /></label>
              <label>Pick-up time<div className="booking-time-control"><input ref={pickupTimeRef} required type="time" step="60" inputMode="numeric" value={journey.pickupTime || ''} onChange={(event) => updateJourney('pickupTime', event.target.value)} onClick={openTimePicker} /><button className="booking-time-picker" type="button" aria-label="Open pick-up time picker" onClick={openTimePicker}><Clock3 size={18} aria-hidden="true" /></button></div></label>
              <label>Number of travellers<input required type="number" min="1" step="1" value={journey.travellers || ''} onChange={(event) => updateJourney('travellers', event.target.value)} /></label>
            </div>
          </article>

          <article className="booking-summary-card selected-details-card">
            <div className="booking-summary-card-heading"><span>02</span><h2>{booking.vehicle ? 'Car Details' : 'Package Details'}</h2></div>
            {selectedDetails?.image && <img className="booking-selected-image" src={selectedDetails.image} alt={selectedDetails.imageAlt || selectedDetails.alt || selectedDetails.name || selectedDetails.title || 'Selected booking'} />}
            {booking.vehicle ? (
              <dl className="booking-summary-pairs">
                <div><dt>Vehicle</dt><dd>{booking.vehicle.name}</dd></div>
                <div><dt>Model</dt><dd>{booking.vehicle.model || 'Not listed'}</dd></div>
                <div><dt>Fuel Type</dt><dd>{booking.vehicle.fuelType || 'To be confirmed'}</dd></div>
                <div><dt>Features</dt><dd>{booking.vehicle.features || 'Not listed'}</dd></div>
                <div><dt>Passenger Capacity</dt><dd>{booking.vehicle.capacity || 'To be confirmed'}</dd></div>
                {booking.vehicle.category && <div><dt>Category</dt><dd>{booking.vehicle.category}</dd></div>}
                {booking.package?.destination && <div><dt>Destination</dt><dd>{booking.package.destination}</dd></div>}
                {booking.package?.route && <div><dt>Route</dt><dd>{booking.package.route}</dd></div>}
              </dl>
            ) : (
              <dl className="booking-summary-pairs">
                <div><dt>Destination</dt><dd>{booking.package?.destination || journey.dropoffLocation || 'Not listed'}</dd></div>
                {booking.package?.duration && <div><dt>Duration</dt><dd>{booking.package.duration}</dd></div>}
                {booking.package?.route && <div><dt>Route</dt><dd>{booking.package.route}</dd></div>}
                {booking.package?.itinerary?.length > 0 && <div><dt>Itinerary</dt><dd>{booking.package.itinerary.join(', ')}</dd></div>}
              </dl>
            )}
          </article>

          <article className="booking-summary-card booking-amount-card">
            <div className="booking-summary-card-heading"><span>03</span><h2>Amount Details</h2></div>
            <dl className="booking-summary-pairs">
              <div><dt>{booking.amountLabel || 'Listed amount'}</dt><dd>{amountText(listedAmount)}</dd></div>
              {booking.priceDetails?.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              <div><dt>GST / service tax</dt><dd>{taxAmount === null ? 'Not specified' : currency.format(taxAmount)}</dd></div>
            </dl>
            <div className="booking-total"><span>Total payable{taxAmount === null ? ' (before unspecified tax)' : ''}</span><strong>{amountText(totalAmount)}</strong></div>
            <p className="booking-price-note">Published tariffs are reference amounts. Tax treatment, additional charges, and the final quotation must be confirmed with Selva Tours and Travels.</p>
          </article>
          <TariffTerms
            className="tariff-terms booking-summary-terms"
            tariff={{ terms: tariffTerms }}
          />
        </div>

        <div className="booking-summary-actions">
          <p>Your selection is not a confirmed booking. Send an enquiry to confirm availability and the final quote.</p>
          <button className="button button-gold" type="submit">Enquire Now <ArrowRight size={17} aria-hidden="true" /></button>
        </div>
      </form>
        </div>
    </section>
  )
}

export default BookingSummary