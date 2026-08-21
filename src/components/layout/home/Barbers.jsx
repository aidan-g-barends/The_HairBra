const barbers = [
  {
    id: 1,
    name: 'Michael Williams',
    specialty: 'Skin Fades & Tapers',
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 2,
    name: 'Julian Reyes',
    specialty: 'Beard Styling & Hot Towel Shaves',
    rating: 4.8,
    reviews: 94,
  },
  {
    id: 3,
    name: 'Sarah V.',
    specialty: 'Modern Textures & Scissor Work',
    rating: 5.0,
    reviews: 61,
  },
]

function Barbers() {
  return (
    <section className="px-6 py-20 max-w-5xl mx-auto text-center bg-surface-container-lowest">
      <h2 className="font-display text-4xl text-primary mb-2">Meet Our Barbers</h2>
      <p className="font-body text-on-surface-variant mb-12">
        Skilled professionals dedicated to their craft.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {barbers.map((barber) => (
          <div
            key={barber.id}
            className="bg-surface-dim border border-surface-bright rounded-xl p-8 text-left"
          >
            <h3 className="font-display text-xl text-on-surface mb-1">{barber.name}</h3>
            <p className="font-body text-primary text-sm mb-3">{barber.specialty}</p>
            <p className="font-body text-on-surface-variant text-sm">
              ⭐ {barber.rating} ({barber.reviews} reviews)
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Barbers