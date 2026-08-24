import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBarberById } from '../services/barberService'

function BarberProfile() {
  const { id } = useParams()
  const [barber, setBarber] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBarber() {
      const { data, error } = await getBarberById(id)
      if (!error) setBarber(data)
      setLoading(false)
    }
    fetchBarber()
  }, [id])

  if (loading) {
    return <p className="text-on-surface p-8 text-center">Loading...</p>
  }

  if (!barber) {
    return <p className="text-on-surface p-8 text-center">Barber not found.</p>
  }

  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="aspect-square rounded-xl overflow-hidden">
          <img
            src={barber.profile_image}
            alt={barber.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="font-display text-4xl text-on-surface mb-2">{barber.name}</h1>
          <p className="font-body text-primary mb-4">
            {barber.specialties?.join(', ')}
          </p>
          <p className="font-body text-on-surface-variant text-sm mb-6">
            {barber.years_experience} years experience
          </p>
          <p className="font-body text-on-surface-variant leading-relaxed mb-8">
            {barber.bio}
          </p>

          <Link
            to="/booking"
            className="inline-block bg-primary text-on-primary font-body font-semibold uppercase px-8 py-3 rounded-lg"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BarberProfile