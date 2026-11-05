import { business } from './business.js'
import { tourPackageDurations } from '../data/tourPackages.js'
import { getTariffFaqs } from '../data/tariffFaqs.js'

const siteUrl = business.websiteUrl.replace(/\/+$/, '')

const pageMeta = {
  '/': {
    title: 'Coimbatore Tours & Travels | Taxi & Tour Packages | Selva',
    description: 'Find Coimbatore tours and travels, Coimbatore tour packages and tours from Coimbatore. Enquire about taxi, airport transfers and outstation travel with Selva.',
    breadcrumb: 'Home',
  },
  '/tariff': {
    title: 'Coimbatore Taxi Tariffs | Local & Outstation | Selva',
    description: 'Compare reference local taxi and outstation travel tariffs from Coimbatore. Contact Selva Tours and Travels to confirm current rates, vehicle availability and applicable charges.',
    breadcrumb: 'Taxi Tariffs',
  },
  '/tour-packages': {
    title: 'Coimbatore Tour Packages & Tours | Selva Tours',
    description: 'Browse suggested one-day and multi-day Coimbatore tour packages, with routes from Coimbatore to popular destinations. Confirm itineraries, rates and availability with Selva Tours and Travels.',
    breadcrumb: 'Tour Packages',
  },
  '/about': {
    title: 'About Selva Tours & Travels | Coimbatore Travel Agency',
    description: 'Meet Selva Tours and Travels, a travel agency in Coimbatore helping travellers enquire about local taxi trips, outstation journeys and tour planning.',
    breadcrumb: 'About Us',
  },
  '/tariff/local-hours': {
    title: 'Coimbatore Taxi Tariff | Local Hourly Rates | Selva',
    description: 'Review reference hourly rates for local Coimbatore taxi trips. Contact Selva Tours and Travels to confirm current fares, vehicle availability and extra charges.',
    breadcrumb: 'Local Taxi Tariff',
  },
  '/tariff/outstation-day': {
    title: 'Outstation Taxi from Coimbatore | Day Tariff | Selva',
    description: 'Review day-basis taxi rates for outstation travels from Coimbatore. Confirm routes, included kilometres and charges with Selva Tours and Travels.',
    breadcrumb: 'Outstation Taxi — Day Basis',
  },
  '/tariff/outstation-km': {
    title: 'Outstation Taxi from Coimbatore | Per-KM Tariff | Selva',
    description: 'Check per-kilometre reference tariffs for outstation trips from Coimbatore. Confirm rates, routes and extra charges with Selva Tours and Travels.',
    breadcrumb: 'Outstation Taxi — KM Basis',
  },
  '/tariff/corporate': {
    title: 'Corporate Cab Enquiries in Coimbatore | Selva Tours',
    description: 'Discuss employee transport, business travel and airport transfer requirements in Coimbatore. Request a corporate cab quotation from Selva Tours and Travels.',
    breadcrumb: 'Corporate Cab Enquiries',
  },
  '/contact': {
    title: 'Contact Selva Tours & Travels | Coimbatore Taxi',
    description: 'Contact Selva Tours and Travels in Coimbatore to enquire about taxi services, airport transfers, travels from Coimbatore and suggested tour packages.',
    breadcrumb: 'Contact Us',
  },
  '/gallery': {
    title: 'Travel Gallery | Selva Tours & Travels Coimbatore',
    description: 'Browse destination, vehicle and travel photographs associated with Selva Tours and Travels, a Coimbatore-based tours and travels business.',
    breadcrumb: 'Gallery',
  },
  '/reviews': {
    title: 'Customer Reviews | Selva Tours and Travels',
    description: 'Read genuine customer feedback about Selva Tours and Travels. Reviews will be published only with permission.',
    breadcrumb: 'Reviews',
    robots: 'noindex, follow',
  },
  '/booking-summary': {
    title: 'Booking Enquiry Summary | Selva Tours and Travels',
    description: 'Review the travel details selected for your enquiry with Selva Tours and Travels.',
    robots: 'noindex, nofollow',
  },
  '/not-found': {
    title: 'Page Not Found | Selva Tours and Travels',
    description: 'The page you requested could not be found.',
    robots: 'noindex, follow',
  },
}

export const indexableSeoRoutes = [
  '/',
  '/about',
  '/tariff/local-hours',
  '/tariff/outstation-day',
  '/tariff/outstation-km',
  '/tariff/corporate',
  ...tourPackageDurations.map(({ id }) => `/tour-packages/${id}`),
  '/gallery',
  '/contact',
]

export function getPageMeta(pathname) {
  const durationId = pathname.match(/^\/tour-packages\/([^/]+)$/)?.[1]
  const duration = tourPackageDurations.find(({ id }) => id === durationId)
  if (duration) {
    const durationTerm = duration.days === 1 ? 'one-day' : `${duration.days}-day`
    return {
      title: `Coimbatore Tour Packages: ${duration.label} | Selva`,
      description: `Browse suggested ${durationTerm} tours from Coimbatore, including Kerala tours from Coimbatore. Review routes and tariffs with Selva Tours and Travels.`,
      breadcrumb: `${duration.label} Tour Packages`,
    }
  }
  return pageMeta[pathname] || {
    title: 'Page Not Found | Selva Tours and Travels',
    description: 'The page you requested could not be found.',
    robots: 'noindex, follow',
    notFound: true,
  }
}

export function getPageStructuredData(pathname, page) {
  const businessId = `${siteUrl}/#business`
  const websiteId = `${siteUrl}/#website`
  const graph = [
    {
      '@type': ['Organization', 'TravelAgency'],
      '@id': businessId,
      name: business.name,
      url: `${siteUrl}/`,
      logo: `${siteUrl}/images/selva-logo.png`,
      telephone: business.phone,
      email: business.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No 5A/8, Subbathal Layout, 3rd Street, Rathinapuri',
        addressLocality: 'Coimbatore',
        addressRegion: 'Tamil Nadu',
        postalCode: '641027',
        addressCountry: 'IN',
      },
      areaServed: { '@type': 'City', name: 'Coimbatore' },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: business.name,
      url: `${siteUrl}/`,
      publisher: { '@id': businessId },
    },
    {
      '@type': 'Service',
      '@id': `${siteUrl}/#local-taxi-service`,
      name: 'Local taxi services in Coimbatore',
      serviceType: 'Local taxi services',
      provider: { '@id': businessId },
      areaServed: { '@type': 'City', name: 'Coimbatore' },
    },
    {
      '@type': 'Service',
      '@id': `${siteUrl}/#outstation-taxi-service`,
      name: 'Outstation taxi travel from Coimbatore',
      serviceType: 'Outstation taxi services',
      provider: { '@id': businessId },
      areaServed: { '@type': 'City', name: 'Coimbatore' },
    },
    {
      '@type': 'Service',
      '@id': `${siteUrl}/#tour-planning-service`,
      name: 'Tour planning enquiries from Coimbatore',
      serviceType: 'Tour planning',
      provider: { '@id': businessId },
      areaServed: { '@type': 'City', name: 'Coimbatore' },
    },
  ]

  if (!page.notFound && !page.robots?.includes('noindex')) {
    const canonicalUrl = `${siteUrl}${pathname === '/' ? '/' : pathname}`
    graph.push({
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': businessId },
    })

    if (pathname !== '/') {
      const items = [{ name: 'Home', url: `${siteUrl}/` }]
      if (pathname.startsWith('/tariff/')) {
        if (pathname !== '/tariff/local-hours') {
          items.push({ name: 'Taxi Tariffs', url: `${siteUrl}/tariff/local-hours` })
        }
      } else if (pathname.startsWith('/tour-packages/')) {
        items.push({ name: 'Tour Packages', url: `${siteUrl}/tour-packages` })
      }
      items.push({ name: page.breadcrumb, url: canonicalUrl })
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: items.map(({ name, url }, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name,
          item: url,
        })),
      })
    }

    if (pathname.startsWith('/tariff/')) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        url: canonicalUrl,
        mainEntity: getTariffFaqs(pathname).map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        })),
      })
    }
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
