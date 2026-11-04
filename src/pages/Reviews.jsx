import { MessageCircle, Quote, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import ContactButtons from '../components/ContactButtons.jsx'

function Reviews() {
  return (
    <div className="inner-page">
      <section className="page-banner reviews-banner">
        <div className="page-width page-banner-inner">
          <p className="eyebrow">STORIES FROM THE ROAD</p>
          <h1>Good journeys are<br /><em>worth sharing.</em></h1>
          <p>We believe customer stories should be genuine and shared with permission. This space is ready for feedback as it becomes available.</p>
        </div>
      </section>
      <section className="section page-width reviews-content">
        <div className="review-empty">
          <span className="empty-quote"><Quote size={29} aria-hidden="true" /></span>
          <p className="eyebrow">A NOTE ON OUR REVIEWS</p>
          <h2>Real experiences.<br /><em>When they’re ready to share.</em></h2>
          <p>There are no customer testimonials published here yet. We won’t invent quotes, names, or ratings. When reviews are available and permission is granted, they’ll appear here.</p>
          <div className="review-trust-note"><ShieldCheck size={18} aria-hidden="true" /> Only genuine, permission-approved feedback will be featured.</div>
          <div className="empty-actions"><ContactButtons message="Hello, I would like to enquire about travel." /><Link className="text-link" to="/contact"><MessageCircle size={16} aria-hidden="true" /> Contact us</Link></div>
        </div>
      </section>
    </div>
  )
}

export default Reviews
