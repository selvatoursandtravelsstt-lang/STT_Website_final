import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createBookingRecord, persistBooking } from '../utils/booking.js'

function BookingActionLink({ booking, children, className, ...linkProps }) {
  const [bookingRecord] = useState(() => createBookingRecord(booking))

  return (
    <Link
      {...linkProps}
      className={className}
      to="/booking-summary"
      state={{ booking: bookingRecord }}
      onClick={() => persistBooking(bookingRecord)}
    >
      {children}
    </Link>
  )
}

export default BookingActionLink