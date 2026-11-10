import { useEffect, useState } from 'react'
import { ChevronDown, Clock3, Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { tourPackageDurations } from '../data/tourPackages.js'
import { business } from '../config/business.js'
import NavbarEnquireImage from './NavbarEnquireImage.jsx'

const links = [
  ['Home', '/'],
  ['About', '/about'],
]

const trailingLinks = [
  ['Gallery', '/gallery'],
  ['Contact Us', '/contact'],
]

const tariffLinks = [
  ['/tariff/local-hours', 'Local Tariff — Hours Basis'],
  ['/tariff/outstation-day', 'Outstation Tariff — Day Basis'],
  ['/tariff/outstation-km', 'Outstation Tariff — KM Basis'],
  ['/tariff/corporate', 'Corporate Cab Bookings'],
]

function NavbarContent({ pathname }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [expandedMobileDropdown, setExpandedMobileDropdown] = useState(null)

  const closeMenu = () => {
    setMenuOpen(false)
    setExpandedMobileDropdown(null)
  }

  useEffect(() => {
    const mobileBreakpoint = window.matchMedia('(max-width: 900px)')
    if (!menuOpen) return undefined

    const handleBreakpointChange = (event) => {
      if (!event.matches) {
        setMenuOpen(false)
        setExpandedMobileDropdown(null)
      }
    }

    mobileBreakpoint.addEventListener('change', handleBreakpointChange)

    return () => {
      mobileBreakpoint.removeEventListener('change', handleBreakpointChange)
    }
  }, [menuOpen])

  return (
    <>
      <header className="site-header">
      <div className="header-info-bar" onClick={closeMenu}>
        <div className="header-info-inner">
          <div className="header-info-items">
            <span className="header-info-item">
              <MapPin size={14} aria-hidden="true" />
              <span>{business.address}</span>
            </span>
            <span className="header-info-divider" aria-hidden="true" />
            <span className="header-info-item header-hours">
              <Clock3 size={14} aria-hidden="true" />
              <span>24 Hours Available</span>
            </span>
          </div>
          <div className="header-info-items header-info-contact">
            <span className="header-info-divider" aria-hidden="true" />
            <div className="header-info-item header-phone-group">
              <Phone size={14} aria-hidden="true" />
              <div className="header-phone-numbers">
                <a href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>{business.phone}</a>
                <span className="header-phone-separator" aria-hidden="true">•</span>
                <a href={`tel:${business.secondaryPhone.replace(/[^\d+]/g, '')}`}>{business.secondaryPhone}</a>
              </div>
            </div>
            <span className="header-info-divider" aria-hidden="true" />
            <a className="header-info-item" href={`mailto:${business.email}`}>
              <Mail size={14} aria-hidden="true" />
              <span>{business.email}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="nav-shell">
        <NavLink
          to="/"
          className="brand"
          aria-label="Selva Tours and Travels home"
          onClick={closeMenu}
        >
          <img
            src="/images/selva-logo.png"
            alt=""
            className="brand-emblem"
            width="1254"
            height="1254"
          />
          <img
            src="/images/selva-navbar-logo.png"
            alt="Selva Tours and Travels"
            className="brand-wordmark"
            width="2172"
            height="724"
          />
        </NavLink>

        <button
          className="menu-toggle"
          type="button"
          aria-label={
            menuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => {
            if (menuOpen) {
              closeMenu()
            } else {
              setMenuOpen(true)
            }
          }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav
          id="primary-navigation"
          className={`main-nav${menuOpen ? ' is-open' : ''}`}
          aria-label="Main navigation"
        >
          <div className="nav-links">
            {links.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            ))}

            <div
              className={`nav-dropdown${expandedMobileDropdown === 'tariff' ? ' is-expanded' : ''}`}
            >
              <NavLink
                to="/tariff/local-hours"
                className={`nav-link${
                  pathname.startsWith('/tariff') ? ' active' : ''
                }`}
                onClick={closeMenu}
                aria-haspopup="true"
              >
                Tariff
                <ChevronDown size={14} aria-hidden="true" />
              </NavLink>
              <button
                className="nav-link mobile-dropdown-toggle"
                type="button"
                aria-expanded={expandedMobileDropdown === 'tariff'}
                aria-controls="tariff-navigation-options"
                onClick={() => setExpandedMobileDropdown((current) => current === 'tariff' ? null : 'tariff')}
              >
                Tariff
                <ChevronDown size={14} aria-hidden="true" />
              </button>

              <div className="nav-dropdown-menu" id="tariff-navigation-options">
                {tariffLinks.map(([to, label]) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `nav-dropdown-link${isActive ? ' active' : ''}`
                    }
                    onClick={closeMenu}
                    end
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>

            <div
              className={`nav-dropdown tour-package-dropdown${expandedMobileDropdown === 'tour-packages' ? ' is-expanded' : ''}`}
            >
              <NavLink
                to="/tour-packages/one-day"
                end
                className={`nav-link${
                  pathname.startsWith('/tour-packages') ? ' active' : ''
                }`}
                onClick={closeMenu}
                aria-haspopup="true"
              >
                Tour Packages
                <ChevronDown size={14} aria-hidden="true" />
              </NavLink>
              <button
                className="nav-link mobile-dropdown-toggle"
                type="button"
                aria-expanded={expandedMobileDropdown === 'tour-packages'}
                aria-controls="tour-package-navigation-options"
                onClick={() => setExpandedMobileDropdown((current) => current === 'tour-packages' ? null : 'tour-packages')}
              >
                Tour Packages
                <ChevronDown size={14} aria-hidden="true" />
              </button>

              <div className="nav-dropdown-menu" id="tour-package-navigation-options">
                {tourPackageDurations.map(({ id, label }) => (
                  <NavLink
                    key={id}
                    to={`/tour-packages/${id}`}
                    className="nav-dropdown-link"
                    onClick={closeMenu}
                  >
                    {label} Tour Packages
                  </NavLink>
                ))}
              </div>
            </div>

            {trailingLinks.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            ))}
          </div>

          <NavLink
            className="nav-cta navbar-enquire-button"
            to="/contact"
            aria-label="Enquire now"
            onClick={closeMenu}
          >
            <NavbarEnquireImage />
          </NavLink>
        </nav>
      </div>
      </header>
      {menuOpen && (
        <button
          className="mobile-nav-backdrop"
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      )}
    </>
  )
}

function Navbar() {
  const location = useLocation()
  return <NavbarContent key={location.key} pathname={location.pathname} />
}

export default Navbar
