import { useEffect, useState } from 'react'
import { ClipboardList, Map, MessageSquareText, ReceiptText } from 'lucide-react'
import { aboutStatistics } from '../data/aboutStatistics.js'

const benefits = [
  {
    icon: <ClipboardList aria-hidden="true" />,
    title: 'Personalised Travel Planning',
    text: 'Travel options tailored to your destination, dates, group size, and preferences.',
  },
  {
    icon: <ReceiptText aria-hidden="true" />,
    title: 'Clear Tariff Discussions',
    text: 'Understand travel costs, vehicle options, and additional charges before confirming.',
  },
  {
    icon: <Map aria-hidden="true" />,
    title: 'Flexible Travel Options',
    text: 'Explore local trips, outstation journeys, and tour packages suited to your plans.',
  },
  {
    icon: <MessageSquareText aria-hidden="true" />,
    title: 'Simple Enquiry Process',
    text: 'Share your travel plans, receive a quotation, and clarify details before booking.',
  },
]

function StatisticCard({ statistic }) {
  const [count, setCount] = useState(() => (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || !('IntersectionObserver' in window)
      ? statistic.value
      : 0
  ))

  useEffect(() => {
    if (typeof statistic.value !== 'number') return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) return undefined

    let frameId
    let observer
    const element = document.getElementById(`about-stat-${statistic.id}`)
    if (!element) return undefined

    observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return

      observer.disconnect()
      const start = performance.now()
      const duration = 900
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const easedProgress = 1 - ((1 - progress) ** 3)
        setCount(Math.round(statistic.value * easedProgress))
        if (progress < 1) frameId = window.requestAnimationFrame(animate)
      }

      frameId = window.requestAnimationFrame(animate)
    }, { threshold: 0.35 })

    observer.observe(element)
    return () => {
      observer?.disconnect()
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [statistic.id, statistic.value])

  return (
    <article className="about-stat-card" id={`about-stat-${statistic.id}`}>
      <p className="about-stat-value" aria-label={`${statistic.value}${statistic.suffix}`}>
        {count.toLocaleString()}{statistic.suffix}
      </p>
      <h3>{statistic.label}</h3>
    </article>
  )
}

function About() {
  return (
    <div className="inner-page about-page">
      <section className="about-introduction" aria-labelledby="about-title">
        <img
          className="about-introduction-background"
          src="/images/about/about-travel-bg.png"
          alt=""
          aria-hidden="true"
        />
        <div className="page-width about-introduction-grid">
          <div className="about-introduction-copy">
            <span className="about-eyebrow-space" aria-hidden="true" />
            <h1 id="about-title">About Selva Tours and Travels</h1>
            <span className="about-gold-rule" aria-hidden="true" />
            <div className="about-prose">
              <p>Every journey begins with a purpose, and at Selva Tours and Travels, we aim to make that journey easier to plan.</p>
              <p>Founded in 2024 by Arun Kumar, Selva Tours and Travels was established with the goal of helping travellers explore convenient travel options from Coimbatore. From local journeys to outstation trips and tour enquiries, our focus is on understanding each traveller&apos;s requirements and helping them plan accordingly.</p>
              <p>As a growing travel business, we believe that good service starts with clear communication, thoughtful planning, and an understanding of what each journey requires.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-founder-section" aria-label="About the founder">
        <div className="page-width about-founder">
          <span className="about-founder-mark" aria-hidden="true">AK</span>
          <div>
            <p className="about-founder-name">Arun Kumar</p>
            <p className="about-founder-role">Founder, Selva Tours and Travels</p>
          </div>
        </div>
      </section>

      <section className="about-statistics section" aria-labelledby="about-statistics-title">
        <div className="page-width">
          <div className="about-section-heading">
            <p className="eyebrow">A THOUGHTFUL START</p>
            <h2 id="about-statistics-title">Our Journey at a Glance</h2>
            <p>Since our establishment in 2024, we have been building Selva Tours and Travels around a simple goal: helping people plan their journeys with clarity and convenience.</p>
          </div>
          <div className="about-stat-grid">
            {aboutStatistics.map((statistic) => (
              <StatisticCard statistic={statistic} key={statistic.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="about-why-section section page-width" aria-labelledby="about-why-title">
        <div className="about-section-heading">
          <p className="eyebrow about-travel-eyebrow">
            MADE AROUND YOUR <span className="about-travel-highlight">Travel</span> NEEDS
          </p>
          <h2 id="about-why-title">Why Choose Selva Tours and Travels?</h2>
          <p>Personalised travel planning, transparent pricing, and flexible journeys designed around your needs.</p>
        </div>
        <div className="about-benefit-grid">
          {benefits.map((benefit) => (
            <article className="about-benefit-card" key={benefit.title}>
              <span className="about-benefit-icon">{benefit.icon}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
