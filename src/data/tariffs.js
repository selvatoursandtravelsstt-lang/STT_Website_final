export const tariffCategories = [
  {
    id: 'local-hour',
    title: 'Local Taxi Tariff — Hour Basis',
    description: 'Enquire about local city travel and hourly rentals in Coimbatore.',
    fields: ['Vehicle type', 'Number of hours', 'Included kilometres', 'Extra-hour charges', 'Extra-kilometre charges', 'Additional fees'],
  },
  {
    id: 'outstation-day',
    title: 'Outstation Taxi Tariff — Day Basis',
    description: 'Discuss daily rentals and sightseeing trips based on your route and schedule.',
    fields: ['Vehicle type', 'Daily rate', 'Included kilometres per day', 'Driver allowance', 'Additional kilometre charges', 'Applicable tolls and parking'],
  },
  {
    id: 'outstation-km',
    title: 'Outstation Taxi Tariff — KM Basis',
    description: 'Ask about long-distance, one-way, and round-trip travel, subject to availability.',
    fields: ['Vehicle type', 'Rate per kilometre', 'Minimum kilometre requirement', 'Driver allowance', 'Toll, parking, and permit charges', 'Trip-specific conditions'],
  },
]

export const vehicleCategories = [
  { type: 'Sedan', capacity: 'To Be Confirmed' },
  { type: 'SUV / MUV', capacity: 'To Be Confirmed' },
  { type: 'Premium MUV', capacity: 'To Be Confirmed' },
  { type: 'Tempo Traveller', capacity: 'To Be Confirmed' },
]
