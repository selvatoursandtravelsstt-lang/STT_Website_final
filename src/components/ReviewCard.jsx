function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <div className="review-quote" aria-hidden="true">“</div>
      <blockquote>{review.quote}</blockquote>
      <div className="review-author">
        <span className="review-avatar">{review.initials}</span>
        <span><strong>{review.name}</strong><small>{review.trip}</small></span>
      </div>
    </article>
  )
}

export default ReviewCard
