import { useEffect, useState } from 'react'
import { getAllBarbers } from '../services/barberService'
import { createReview, getAllReviews } from '../services/bookingService'

function LeaveReview() {
  const [barbers, setBarbers] = useState([])
  const [reviews, setReviews] = useState([])
  const [loadingReviews, setLoadingReviews] = useState(true)

  const [selectedBarberId, setSelectedBarberId] = useState('')
  const [reviewerName, setReviewerName] = useState('')
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const [{ data: barberData }, { data: reviewData }] = await Promise.all([
        getAllBarbers(),
        getAllReviews(),
      ])
      setBarbers(barberData || [])
      setReviews(reviewData || [])
      setLoadingReviews(false)
    }
    fetchData()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    const { data, error } = await createReview({
      appointmentId: null,
      customerId: null,
      barberId: selectedBarberId,
      rating,
      review: `${reviewerName}: ${reviewText}`,
    })

    if (!error && data) {
      setReviews((current) => [{ ...data, barbers: barbers.find((b) => b.id === selectedBarberId) }, ...current])
      setSubmitted(true)
    }
  }

  function parseReview(review) {
    const separatorIndex = review.indexOf(':')
    if (separatorIndex === -1) return { name: 'Anonymous', text: review }
    return {
      name: review.slice(0, separatorIndex).trim(),
      text: review.slice(separatorIndex + 1).trim(),
    }
  }

  return (
    <div className="px-6 py-20 max-w-2xl mx-auto">
      <h1 className="font-display text-4xl text-primary text-center mb-2">Reviews</h1>
      <p className="font-body text-on-surface-variant text-center mb-12">
        See what our clients are saying, or share your own experience.
      </p>

      {submitted ? (
        <div className="text-center mb-16">
          <p className="font-display text-2xl text-primary mb-2">Thank You!</p>
          <p className="font-body text-on-surface-variant">Your review has been submitted below.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mb-16">
          <select
            value={selectedBarberId}
            onChange={(e) => setSelectedBarberId(e.target.value)}
            required
            className="w-full p-3 bg-white text-black rounded-lg"
          >
            <option value="">Select your barber</option>
            {barbers.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Your Name"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            required
            className="w-full p-3 bg-white text-black rounded-lg"
          />

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl ${star <= rating ? 'text-primary' : 'text-surface-bright'}`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            placeholder="Share your experience"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
            rows={4}
            className="w-full p-3 bg-white text-black rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-primary text-on-primary font-body font-semibold uppercase px-6 py-3 rounded-lg"
          >
            Submit Review
          </button>
        </form>
      )}

      <h2 className="font-display text-2xl text-on-surface mb-6">
        {reviews.length > 0 ? `${reviews.length} Reviews` : 'Reviews'}
      </h2>

      {loadingReviews ? (
        <p className="font-body text-on-surface-variant">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="font-body text-on-surface-variant">No reviews yet — be the first!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => {
            const { name, text } = parseReview(r.review || '')
            return (
              <div key={r.id} className="bg-surface-dim border border-surface-bright rounded-xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-display text-on-surface">{name}</p>
                  <p className="text-primary text-sm">{'★'.repeat(r.rating)}</p>
                </div>
                <p className="font-body text-on-surface-variant text-sm mb-2">{text}</p>
                <p className="font-body text-on-surface-variant text-xs uppercase tracking-wide">
                  {r.barbers?.name || 'Unknown Barber'}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LeaveReview