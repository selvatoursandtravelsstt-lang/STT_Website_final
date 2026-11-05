import { lazy, Suspense, useEffect } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import { business } from './config/business.js'
import { getPageMeta, getPageStructuredData } from './config/seo.js'
import './styles/navbar.css'
import './styles/home.css'
import './styles/about.css'
import './styles/packages.css'
import './styles/tariff.css'
import './styles/contact.css'
import './styles/brief.css'
import './styles/duration-packages.css'
import './styles/one-day-packages.css'
import './styles/gallery.css'
import './styles/booking-summary.css'

const About = lazy(() => import('./pages/About.jsx'))
const DurationPackagePage = lazy(() => import('./pages/DurationPackagePage.jsx'))
const Tariff = lazy(() => import('./pages/Tariff.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Gallery = lazy(() => import('./pages/Gallery.jsx'))
const BookingSummary = lazy(() => import('./pages/BookingSummary.jsx'))
const Reviews = lazy(() => import('./pages/Reviews.jsx'))

const siteUrl = business.websiteUrl.replace(/\/+$/, '')
function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    const [key, name] = attribute
    element.setAttribute(key, name)
    document.head.appendChild(element)
  }
  element.setAttribute('content', value)
}

function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const normalizedPathname = pathname.replace(/\/+$/, '') || '/'
    const page = getPageMeta(normalizedPathname)
    const canonicalUrl = `${siteUrl}${normalizedPathname === '/' ? '/' : normalizedPathname}`
    document.title = page.title
    setMeta('meta[name="description"]', ['name', 'description'], page.description)
    setMeta('meta[name="robots"]', ['name', 'robots'], page.robots || 'index, follow, max-image-preview:large')
    setMeta('meta[property="og:title"]', ['property', 'og:title'], page.title)
    setMeta('meta[property="og:description"]', ['property', 'og:description'], page.description)
    setMeta('meta[property="og:url"]', ['property', 'og:url'], canonicalUrl)
    setMeta('meta[property="og:image"]', ['property', 'og:image'], `${siteUrl}/images/selva-navbar-logo.png`)
    setMeta('meta[name="twitter:title"]', ['name', 'twitter:title'], page.title)
    setMeta('meta[name="twitter:description"]', ['name', 'twitter:description'], page.description)
    setMeta('meta[name="twitter:image"]', ['name', 'twitter:image'], `${siteUrl}/images/selva-navbar-logo.png`)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!page.notFound && !page.robots?.includes('noindex')) {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = canonicalUrl
    } else {
      canonical?.remove()
    }

    const schema = document.getElementById('site-structured-data')
    if (schema) schema.textContent = JSON.stringify(getPageStructuredData(normalizedPathname, page))
  }, [pathname])

  return null
}

function PageNotFound() {
  return (
    <div className="inner-page">
      <section className="page-banner">
        <div className="page-width page-banner-inner">
          <p className="eyebrow">404 · PAGE NOT FOUND</p>
          <h1>This page isn’t available.</h1>
          <p>Check the address or return to Selva Tours and Travels.</p>
          <Link className="button button-gold" to="/">Go to Home</Link>
        </div>
      </section>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <PageMeta />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tariff" element={<Navigate to="/tariff/local-hours" replace />} />
            <Route path="/tariff/local-hours" element={<Tariff />} />
            <Route path="/tariff/outstation-day" element={<Tariff />} />
            <Route path="/tariff/outstation-km" element={<Tariff />} />
            <Route path="/tariff/corporate" element={<Tariff />} />
            <Route path="/tour-packages" element={<Navigate to="/tour-packages/one-day" replace />} />
            <Route path="/tour-packages/:duration" element={<DurationPackagePage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/packages" element={<Navigate to="/tour-packages/one-day" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking-summary" element={<BookingSummary />} />
            <Route path="/not-found" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default App
