const commonFaqs = [
  ['Are the listed tariff amounts a confirmed quote?', 'No. The tables are reference information. Confirm the current fare, vehicle availability, route, and applicable terms with Selva Tours and Travels before making travel arrangements.'],
  ['Are tolls, parking, and permit charges included?', 'The published tariff terms list parking, toll, and interstate permit charges as extra. Confirm which charges apply to your specific trip.'],
]

export function getTariffFaqs(path) {
  if (path === '/tariff/local-hours') {
    return [
      ['What is shown in the Coimbatore local taxi tariff?', 'The reference table lists 8-hour and 10-hour package options, included hours and kilometres, and vehicle-specific reference fares. Confirm the current details before booking.'],
      ...commonFaqs,
    ]
  }

  if (path === '/tariff/outstation-day') {
    return [
      ['How is a day counted for the outstation day-basis tariff?', 'The published terms define one day as one calendar day, from midnight to midnight. Confirm the schedule and any applicable charges for your journey.'],
      ['When should I ask about the kilometre-basis tariff?', 'The published terms say trips averaging more than 300 km per day shift to the kilometre-basis tariff. Confirm which tariff applies to your itinerary.'],
      ...commonFaqs,
    ]
  }

  if (path === '/tariff/outstation-km') {
    return [
      ['How is distance calculated for the kilometre-basis tariff?', 'The published terms state that total kilometre and time calculations are from office to office. Confirm the route and calculation with the business before travel.'],
      ...commonFaqs,
    ]
  }

  return [
    ['Does a corporate cab enquiry confirm a booking or contract?', 'No. Sending an enquiry is a request to discuss requirements; it does not confirm vehicle availability, pricing, a contract, or a booking.'],
    ['What details should I include in a corporate cab enquiry?', 'Share your locations, passenger count, dates, schedule, and vehicle preferences so the business can review the request.'],
  ]
}
