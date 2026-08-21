const reviews = [
  {
    id: 1,
    name: 'Thabo M.',
    text: 'Michael gave me one of the best fades I\'ve had. Booking online was quick and easy too.',
    rating: 5,
  },
  {
    id: 2,
    name: 'James K.',
    text: 'The whole experience feels premium from the moment you walk in. Highly recommend the Luxury Shave.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sipho N.',
    text: 'Consistent quality every visit. Julian always knows exactly what I want.',
    rating: 4,
  },
]

function Reviews() {
  return (
    <section className="px-6 py-20 max-w-5xl mx-auto text-center bg-surface-container-lowest">
        <p className="font-body text-primary text-xs uppercase tracking-widest mb-3">Testimonials</p>
      <h2 className="font-display text-4xl text-primary mb-12">What Our Clients Say</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-surface-dim border border-surface-bright rounded-xl p-6 text-left"
          >
            <p className="text-primary mb-3">{'⭐'.repeat(review.rating)}</p>
            <p className="font-body text-on-surface-variant mb-4">"{review.text}"</p>
            <p className="font-body text-on-surface text-sm">— {review.name}</p>
          </div>
        ))}
      </div>
            <button className="mt-12 border border-primary text-primary font-body uppercase text-sm px-8 py-3 rounded-lg hover:bg-surface-container-highest transition-colors">
        See More Reviews
      </button>
    </section>
  )
}

export default Reviews