import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllBarbers } from '../../../services/barberService'

function Barbers() {
  const [barbers, setBarbers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBarbers() {
      const { data, error } = await getAllBarbers()
      if (!error) setBarbers((data || []).slice(0, 4))
      setLoading(false)
    }
    fetchBarbers()
  }, [])

  if (loading) return null

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
                src={barber.profile_image}
                alt={barber.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            <div className="p-6">
              <h3 className="font-display text-xl text-on-surface mb-1">{barber.name}</h3>
              <p className="font-body text-primary text-sm mb-2">
                {barber.specialties?.join(', ')}
              </p>
              <p className="font-body text-on-surface-variant text-sm mb-4">
                {barber.years_experience} years experience
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