import { useEffect, useRef, useState } from 'react'
import { Backpack, Landmark, Mountain, Umbrella, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import TourDurationLinks from '../components/TourDurationLinks.jsx'
import { tourPackageDurations } from '../data/tourPackages.js'

const testimonials = [
  {
    name: 'Bramma Giri M',
    reviewCount: '4 reviews',
    date: '3 weeks ago',
    image: '/images/testimonials/bramma-giri-m.svg',
    review: 'We had a very good experience during our trip to Ooty. Our driver, Moorthy, was very humble, polite, and helpful throughout the journey. His driving skills were excellent, and he made sure we travelled safely and comfortably. Overall, it was a wonderful experience, and we really appreciate his service. Highly recommended!',
  },
  {
    name: 'Karthik J',
    reviewCount: '2 reviews',
    date: 'a month ago',
    image: '/images/testimonials/karthik-j.svg',
    review: 'We came to Valparai for the first time and our experience was the best only because of our Guide and Driver Selva. He made our travel journey Amazing. He is very polite humble and you can blindly trust him. Thank you Selva for this amazing service.',
  },
  {
    name: 'Nivas Selvin',
    reviewCount: '4 reviews · 6 photos',
    date: 'a month ago',
    image: '/images/testimonials/nivas-selvin.svg',
    review: 'Comfort and safe must recommended for trip plan with A to Z i strongly recommended',
  },
]

const travelCategories = [
  { label: 'Adventure Tours', Icon: Backpack },
  { label: 'Beach Getaways', Icon: Umbrella },
  { label: 'Mountain Trips', Icon: Mountain },
  { label: 'Temple Tours', Icon: Landmark },
  { label: 'Group Packages', Icon: Users },
]

const destinationSlides = [
  { name: 'Ooty', image: '/images/destinations/ooty.webp' },
  { name: 'Mahabalipuram', image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Mamallapuram%2C_Shore_Temple%2C_India.jpg/960px-Mamallapuram%2C_Shore_Temple%2C_India.jpg' },
  { name: 'Munnar', image: '/images/destinations/munnar.webp' },
  { name: 'Alleppey (Alappuzha)', image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Alleppey_backwaters_view_%2C_Kerala_%2C_India_11.jpg/960px-Alleppey_backwaters_view_%2C_Kerala_%2C_India_11.jpg' },
  { name: 'Varkala', image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Varkala_Cliff_Beach_%28Kerala%2C_India%29.jpg/960px-Varkala_Cliff_Beach_%28Kerala%2C_India%29.jpg' },
  { name: 'Kodaikanal', image: '/images/destinations/kodaikanal.webp' },
]

function Home() {
  const [activeDestination, setActiveDestination] = useState(2)
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const heroVideoRef = useRef(null)
  const dragStart = useRef(null)
  const scrollTimer = useRef(null)
  const destinationInitialized = useRef(false)

  const loopSlides = [
    { ...destinationSlides[destinationSlides.length - 1], clone: 'last', sourceIndex: destinationSlides.length - 1 },
    ...destinationSlides.map((destination, sourceIndex) => ({ ...destination, sourceIndex })),
    { ...destinationSlides[0], clone: 'first', sourceIndex: 0 },
  ]

  const centerDestination = (physicalIndex, smooth = true) => {
    const card = cardRefs.current[physicalIndex]
    const track = trackRef.current
    if (!card || !track) return
    const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2
    track.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' })
  }

  const normalizeLoop = (physicalIndex, logicalIndex) => {
    window.requestAnimationFrame(() => {
      cardRefs.current[physicalIndex]?.classList.remove('is-looping-clone')
      setActiveDestination(logicalIndex)
      centerDestination(physicalIndex, false)
    })
  }

  const previousDestination = () => {
    const nextLogical = (activeDestination - 1 + destinationSlides.length) % destinationSlides.length
    if (activeDestination === 0) {
      centerDestination(0, true)
      window.setTimeout(() => normalizeLoop(destinationSlides.length, nextLogical), 390)
    } else {
      setActiveDestination(nextLogical)
      centerDestination(nextLogical + 1, true)
    }
  }

  const nextDestination = () => {
    const nextLogical = (activeDestination + 1) % destinationSlides.length
    if (activeDestination === destinationSlides.length - 1) {
      centerDestination(destinationSlides.length + 1, true)
      window.setTimeout(() => normalizeLoop(1, nextLogical), 390)
    } else {
      setActiveDestination(nextLogical)
      centerDestination(nextLogical + 1, true)
    }
  }

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      centerDestination(activeDestination + 1, destinationInitialized.current)
      destinationInitialized.current = true
    })
    return () => window.cancelAnimationFrame(frame)
  }, [activeDestination])

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePlayback = () => {
      if (reducedMotion.matches) video.pause()
      else video.play().catch(() => {})
    }

    updatePlayback()
    reducedMotion.addEventListener('change', updatePlayback)
    return () => reducedMotion.removeEventListener('change', updatePlayback)
  }, [])

  const handleTrackScroll = () => {
    window.clearTimeout(scrollTimer.current)
    scrollTimer.current = window.setTimeout(() => {
      const track = trackRef.current
      if (!track) return
      const trackCenter = track.scrollLeft + track.clientWidth / 2
      let nearestIndex = 1
      let nearestDistance = Number.POSITIVE_INFINITY
      cardRefs.current.forEach((card, index) => {
        if (!card) return
        const distance = Math.abs(card.offsetLeft + card.clientWidth / 2 - trackCenter)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestIndex = index
        }
      })

      const nearest = loopSlides[nearestIndex]
      if (!nearest) return
      if (nearest.clone === 'first') normalizeLoop(1, 0)
      else if (nearest.clone === 'last') normalizeLoop(destinationSlides.length, destinationSlides.length - 1)
      else {
        setActiveDestination(nearest.sourceIndex)
        centerDestination(nearestIndex)
      }
    }, 120)
  }

  const handleDragStart = (event) => {
    if (event.pointerType !== 'mouse' || event.target.closest('a, button')) return
    event.preventDefault()
    dragStart.current = { x: event.clientX, scrollLeft: event.currentTarget.scrollLeft, pointerId: event.pointerId }
    event.currentTarget.setPointerCapture?.(event.pointerId)
    event.currentTarget.classList.add('is-dragging')
  }

  const handleDragMove = (event) => {
    if (!dragStart.current) return
    event.currentTarget.scrollLeft = dragStart.current.scrollLeft - (event.clientX - dragStart.current.x)
  }

  const handleDragEnd = () => {
    if (!dragStart.current) return
    dragStart.current = null
    trackRef.current?.classList.remove('is-dragging')
    handleTrackScroll()
  }

  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-video-wrap" aria-hidden="true">
          <video
            ref={heroVideoRef}
            className="home-hero-video"
            src="/videos/munnar-hero-landscape.mp4"
            poster="/images/hero/munnar-hero-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <span className="home-hero-video-credit">@rajography</span>
        <div className="hero-content page-width">
          <h1 id="home-title">Your Trusted Travel Partner in Coimbatore</h1>
          <p className="hero-intro">Looking for Coimbatore tours and travels? Selva Tours and Travels is a travel agency in Coimbatore for local taxi, airport transfer and outstation enquiries. Explore Coimbatore tour packages and tours from Coimbatore.</p>
          <div className="hero-actions">
            <Link className="button button-gold" to="/tour-packages">Explore Tour Packages</Link>
            <Link className="button button-hero-outline" to="/contact">Contact Us</Link>
          </div>
        </div>
      </section>

      <section className="destination-slider-section home-duration-predecessor" aria-labelledby="destination-title">
        <div className="destination-slider-header">
          <h2 className="destination-heading" id="destination-title">
            <span className="destination-heading-top">TOP</span>
            <span className="destination-heading-name">Destination</span>
          </h2>
          <div className="destination-controls">
            <button type="button" onClick={previousDestination} aria-label="Previous destination">←</button>
            <button type="button" onClick={nextDestination} aria-label="Next destination">→</button>
          </div>
        </div>

        <div className="destination-track-wrap">
          <div
            className="destination-track"
            ref={trackRef}
            style={{ '--active-slide': activeDestination }}
            onScroll={handleTrackScroll}
            onPointerDown={handleDragStart}
            onPointerMove={handleDragMove}
            onPointerUp={handleDragEnd}
            onPointerCancel={handleDragEnd}
          >
            {loopSlides.map((destination, physicalIndex) => (
              <article
                ref={(card) => { cardRefs.current[physicalIndex] = card }}
                className={`destination-slide${destination.sourceIndex === activeDestination && !destination.clone ? ' is-active' : ''}`}
                key={`${destination.name}-${physicalIndex}`}
                data-source-index={destination.sourceIndex}
                onClick={() => {
                  setActiveDestination(destination.sourceIndex)
                  centerDestination(physicalIndex)
                }}
              >
                <img src={destination.image} alt={destination.name} loading="lazy" draggable="false" />
                <div className="destination-slide-shade" />
                <div className="destination-slide-copy">
                  <h3>{destination.name}</h3>
                  {destination.sourceIndex === activeDestination && !destination.clone && <Link to="/tour-packages">View More</Link>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TourDurationLinks durations={tourPackageDurations} className="home-duration-links" headingId="home-duration-heading" />

      <section className="home-about" aria-labelledby="know-more-title">
        <div className="page-width home-about-content">
          <p className="eyebrow">A LITTLE MORE ABOUT SELVA</p>
          <h2 id="know-more-title">Know More About Selva Tours and Travels</h2>
          <p>We understand that every traveller has different plans and preferences. Our goal is to help you explore travel options that suit your destination, schedule, and requirements. Learn more about Selva Tours and Travels, our approach to travel planning, and the services you can enquire about.</p>
          <Link className="button button-gold" to="/about">Know More About Us</Link>
        </div>
      </section>

      <section className="testimonials-section" aria-labelledby="testimonials-title">
        <div className="testimonials-heading">
          <span>Testimonials</span>
          <h2 id="testimonials-title">What Clients Say About Us</h2>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <article
              className={`testimonial-card ${
                index === 0 ? 'testimonial-card--left' : index === 1 ? 'testimonial-card--featured' : 'testimonial-card--right'
              }`}
              key={testimonial.name}
            >
              <div className="testimonial-person">
                <img src={testimonial.image} alt={`${testimonial.name} portrait`} loading="lazy" />
                <div>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.reviewCount}</p>
                </div>
                <div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
              </div>
              <p className="testimonial-date">{testimonial.date}</p>
              <p className="testimonial-review">“{testimonial.review}”</p>
              <span className="testimonial-mark" aria-hidden="true">“</span>
            </article>
          ))}
        </div>

        <div className="travel-category-row" aria-label="Travel categories">
          {travelCategories.map(({ label, Icon }) => (
            <div className="travel-category" key={label}>
              <Icon size={38} strokeWidth={1.5} aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
