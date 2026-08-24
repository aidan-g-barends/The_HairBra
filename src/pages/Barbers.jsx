import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllBarbers } from '../services/barberService'

function Barbers() {
  const [barbers, setBarbers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBarbers() {
      const { data, error } = await getAllBarbers()
      if (!error) setBarbers(data)
      setLoading(false)
    }
    fetchBarbers()
  }, [])

  if (loading) {
    return <p className="text-on-surface p-8 text-center">Loading barbers...</p>
  }

  return (
    <section className="px-6 py-20 max-w-5xl mx-auto text-center">
      <h1 className="font-display text-4xl text-primary mb-2">Our Barbers</h1>
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
                View Profile →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Barbers