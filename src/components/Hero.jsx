import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const heroImages = [
  { src: '/images/hero/Aerial Coastal Waves with Blue Fishing Boat.webp', width: 1911, height: 768 },
  { src: '/images/hero/Misty Dawn Over Tea-Country Valleys.webp', width: 1910, height: 768 },
  { src: '/images/hero/Stormy Moorland Road and Rainbow.webp', width: 1920, height: 768 },
  { src: '/images/hero/Golden Hour Temple Tank Framed in Stone.webp', width: 1920, height: 768 },
]

function Hero() {
  const [slideshow, setSlideshow] = useState(() => ({
    activeImage: 0,
    loadedImages: new Set([0, 1]),
  }))

  useEffect(() => {
    const slideshow = window.setInterval(() => {
      setSlideshow((current) => {
        const next = (current.activeImage + 1) % heroImages.length
        const loadedImages = new Set(current.loadedImages)
        loadedImages.add((next + 1) % heroImages.length)
        return { activeImage: next, loadedImages }
      })
    }, 3000)

    return () => window.clearInterval(slideshow)
  }, [])

  return (
    <section className="home-hero">
      <div className="hero-image" role="img" aria-label="Scenic destinations across South India">
        {heroImages.map(({ src, width, height }, index) => slideshow.loadedImages.has(index) && (
          <img
            key={src}
            src={src}
            alt=""
            className={`hero-slide${index === slideshow.activeImage ? ' active' : ''}`}
            width={width}
            height={height}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'low'}
            decoding="async"
          />
        ))}
      </div>
      <div className="hero-shade" />
      <div className="hero-content page-width">
        <p className="hero-location"><MapPin size={15} aria-hidden="true" /> Based in Coimbatore, Tamil Nadu</p>
        <p className="hero-kicker">LOCAL &amp; OUTSTATION TRAVEL FROM COIMBATORE</p>
        <h1>Your Trusted<br /><em>Travel Partner in Coimbatore</em></h1>
        <p className="hero-intro">Discover comfortable and convenient travel with Selva Tours and Travels. From local taxi services and airport transfers to outstation trips and South India tour packages, we help you plan every journey with ease.</p>
        <div className="hero-actions">
          <Link className="button button-gold" to="/tour-packages">Explore tour packages</Link>
          <Link className="button button-hero-outline" to="/contact">Contact us</Link>
        </div>
      </div>
      <div className="hero-side-label" aria-hidden="true">COIMBATORE · TAMIL NADU</div>
    </section>
  )
}

export default Hero
