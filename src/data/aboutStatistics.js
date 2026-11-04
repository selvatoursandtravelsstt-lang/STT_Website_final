export const aboutStatistics = [ 
  { id: 'happy-tourists', value: 500, suffix: '+', label: 'Happy Tourists', verified: true },
  { id: 'safe-hygienic-vehicles', value: 10, suffix: '+', label: 'Safe & Hygienic Vehicles', verified: true },
  { id: 'customer-satisfaction', value: 100, suffix: '%', label: 'Customer Satisfaction', verified: true },
  { id: 'customizable-itineraries', value: 50, suffix: '+', label: 'Customizable Itineraries', verified: true },
].filter((statistic) => statistic.verified && typeof statistic.value === 'number')
