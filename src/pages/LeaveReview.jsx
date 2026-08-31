import { useEffect, useState } from 'react'
import { getAllBarbers } from '../services/barberService'
import { createReview } from '../services/bookingService'

function LeaveReview() {
  const [barbers, setBarbers] = useState([])
  const [selectedBarberId, setSelectedBarberId] = useState('')
  const [reviewerName, setReviewerName] = useState('')
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function fetchBarbers() {
      const { data } = await getAllBarbers()
      setBarbers(data || [])
    }
    fetchBarbers()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    const { error } = await createReview({
      appointmentId: null,
      customerId: null,
      barberId: selectedBarberId,
      rating,
      review: `${reviewerName}: ${reviewText}`,
    })

    if (!error) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-primary mb-4">Thank You!</h1>
        <p className="font-body text-on-surface-variant">Your review has been submitted.</p>
      </div>
    )
  }

  return (
    <div className="px-6 py-20 max-w-lg mx-auto">
      <h1 className="font-display text-4xl text-primary text-center mb-2">Leave a Review</h1>
      <p className="font-body text-on-surface-variant text-center mb-12">
        Tell us about your experience.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
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
    </div>
  )
}

export default LeaveReview