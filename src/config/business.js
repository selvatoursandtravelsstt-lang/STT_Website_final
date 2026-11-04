export const business = {
  name: 'Selva Tours and Travels',
  shortName: 'Selva',
  logoPath: '',
  websiteUrl: 'https://selvatoursandtravels.com',
  location: 'Coimbatore, Tamil Nadu',
  phone: '+91 9894376366',
  whatsapp: '+91 9894376366',
  email: 'selvatoursandtravels.stt@gmail.com',
  address: 'No 5A/8, Subbathal Layout, 3rd Street, Rathinapuri, Coimbatore, Tamil Nadu – 641027, India',
  mapsUrl: '',
  operatingHours: '',
  corporateCabBookings: false,
  socialLinks: {},
}

export const isConfigured = (value) => Boolean(value && value.trim())

export const phoneHref = () => (isConfigured(business.phone) ? `tel:${business.phone.replace(/[^\d+]/g, '')}` : '')
export const emailHref = () => (isConfigured(business.email) ? `mailto:${business.email}` : '')
export const whatsappHref = (message = 'Hello, I would like to enquire about a tour.') => {
  if (!isConfigured(business.whatsapp)) return ''
  const number = business.whatsapp.replace(/\D/g, '')
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : ''
}
