import { Link } from 'react-router-dom'

const barbers = [
  { id: 1, name: 'Michael Williams', specialty: 'Skin Fades & Tapers', rating: 4.9, reviews: 128, image: '/Barber1.jpg' },
  { id: 2, name: 'Julian Reyes', specialty: 'Beard Styling & Hot Towel Shaves', rating: 4.8, reviews: 94, image: '/Barber2.jpg' },
  { id: 3, name: 'Sarah V.', specialty: 'Modern Textures & Scissor Work', rating: 5.0, reviews: 61, image: '/Barber3.jpg' },
  { id: 4, name: 'David Okafor', specialty: 'Classic Cuts & Straight Razor', rating: 4.9, reviews: 87, image: '/Barber4.jpg' },
]

function Barbers() {
  return (
    <section className="px-6 py-20 max-w-5xl mx-auto text-center bg-surface-container-lowest">
        <p className="font-body text-primary text-xs uppercase tracking-widest mb-3">The Team</p>
      <h2 className="font-display text-4xl text-primary mb-2">Meet Our Barbers</h2>
      <p className="font-body text-on-surface-variant mb-12">
        Skilled professionals dedicated to their craft.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {barbers.map((barber) => (
          <div
            key={barber.id}
            className="bg-surface-dim border border-surface-bright rounded-xl overflow-hidden text-left hover:bg-surface-container transition-colors duration-300"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={barber.image}
                alt={barber.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            <div className="p-6">
              <h3 className="font-display text-xl text-on-surface mb-1">{barber.name}</h3>
              <p className="font-body text-primary text-sm mb-2">{barber.specialty}</p>
              <p className="font-body text-on-surface-variant text-sm mb-4">
                ⭐ {barber.rating} ({barber.reviews} reviews)
              </p>

              <Link
                to={`/barbers/${barber.id}`}
                className="font-body text-on-surface text-sm uppercase tracking-wide hover:text-primary transition-colors"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/barbers"
        className="inline-block mt-12 border border-primary text-primary font-body uppercase text-sm px-8 py-3 rounded-lg hover:bg-surface-container-highest transition-colors"
      >
        View All Barbers
      </Link>
    </section>
  )
}

export default Barbers