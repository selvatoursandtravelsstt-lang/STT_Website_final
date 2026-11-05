import { business } from './business.js'
import { tourPackageDurations } from '../data/tourPackages.js'
import { getTariffFaqs } from '../data/tariffFaqs.js'

const siteUrl = business.websiteUrl.replace(/\/+$/, '')

const pageMeta = {
  '/': {
    title: 'Coimbatore Taxi & Tours | Selva Tours and Travels',
    description: 'Book local taxi services, airport transfers, outstation cabs and tour packages from Coimbatore with Selva Tours and Travels.',
    breadcrumb: 'Home',
  },
  '/tariff': {
    title: 'Taxi Tariffs in Coimbatore | Selva Tours',
    description: 'Explore local taxi and outstation cab tariff options from Coimbatore with Selva Tours and Travels.',
    breadcrumb: 'Taxi Tariffs',
  },
  '/tour-packages': {
    title: 'Tour Packages from Coimbatore | Selva Tours',
    description: 'Explore suggested one-day and multi-day tour routes from Coimbatore. Confirm itinerary, rates and availability with Selva Tours.',
    breadcrumb: 'Tour Packages',
  },
  '/about': {
    title: 'About Selva Tours and Travels | Coimbatore',
    description: 'Learn about Selva Tours and Travels, a Coimbatore travel business helping plan local taxi trips, outstation journeys and tours.',
    breadcrumb: 'About Us',
  },
  '/tariff/local-hours': {
    title: 'Local Taxi Tariff in Coimbatore | Selva Tours',
    description: 'Compare reference 8-hour and 10-hour local taxi packages in Coimbatore. Contact Selva Tours to confirm current rates and terms.',
    breadcrumb: 'Local Taxi Tariff',
  },
  '/tariff/outstation-day': {
    title: 'Outstation Taxi Tariff by Day | Selva Tours',
    description: 'Review day-basis reference tariffs for outstation taxi trips from Coimbatore. Confirm routes, current rates and charges before travel.',
    breadcrumb: 'Outstation Taxi — Day Basis',
  },
  '/tariff/outstation-km': {
    title: 'Outstation Taxi Tariff per KM | Selva Tours',
    description: 'Review kilometre-basis reference tariffs for outstation cabs from Coimbatore. Ask Selva Tours to confirm current rates and trip terms.',
    breadcrumb: 'Outstation Taxi — KM Basis',
  },
  '/tariff/corporate': {
    title: 'Corporate Cab Enquiries in Coimbatore | Selva',
    description: 'Discuss employee transport, business travel or airport transfer requirements and request a corporate cab quotation from Selva Tours.',
    breadcrumb: 'Corporate Cab Enquiries',
  },
  '/contact': {
    title: 'Contact Selva Tours and Travels | Coimbatore',
    description: 'Contact Selva Tours and Travels in Coimbatore to enquire about local taxis, airport transfers, outstation travel and tour planning.',
    breadcrumb: 'Contact Us',
  },
  '/gallery': {
    title: 'Travel Gallery | Selva Tours and Travels Coimbatore',
    description: 'View destination and travel images from Selva Tours and Travels, based in Coimbatore, Tamil Nadu.',
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
    return {
      title: `${duration.pageTitle} from Coimbatore | Selva Tours`,
      description: `Explore suggested ${duration.label.toLowerCase()} tour routes from Coimbatore. Confirm itinerary, vehicle availability and current prices with Selva Tours and Travels.`,
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
