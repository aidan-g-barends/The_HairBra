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
    <div>
      <section className="px-6 py-20 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div className="aspect-[4/5] rounded-xl overflow-hidden">
          <img
            src={barber.profile_image}
            alt={barber.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="font-body text-primary text-xs uppercase tracking-widest mb-3">Master Barber</p>
          <h1 className="font-display text-5xl text-on-surface mb-4">{barber.name}</h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {barber.specialties?.map((spec) => (
              <span
                key={spec}
                className="font-body text-xs uppercase tracking-wide text-primary border border-primary/30 bg-primary/10 px-3 py-1.5 rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>

          <div className="flex gap-8 mb-8 pb-8 border-b border-surface-bright">
            <div>
              <p className="font-display text-2xl text-primary">{barber.years_experience}</p>
              <p className="font-body text-on-surface-variant text-xs uppercase tracking-wide">Years Experience</p>
            </div>
            <div>
              <p className="font-display text-2xl text-primary">4.9</p>
              <p className="font-body text-on-surface-variant text-xs uppercase tracking-wide">Average Rating</p>
            </div>
            <div>
              <p className="font-display text-2xl text-primary">100+</p>
              <p className="font-body text-on-surface-variant text-xs uppercase tracking-wide">Reviews</p>
            </div>
          </div>

          <h2 className="font-display text-xl text-on-surface mb-3">About {barber.name.split(' ')[0]}</h2>
          <p className="font-body text-on-surface-variant leading-relaxed mb-8">
            {barber.bio}
          </p>

          <Link
            to="/booking"
            className="inline-block bg-primary text-on-primary font-body font-semibold uppercase px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Book with {barber.name.split(' ')[0]}
          </Link>
        </div>
      </section>

      <section className="bg-surface-container-lowest border-t border-surface-bright px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl text-primary mb-8">What Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-surface-dim border border-surface-bright rounded-xl p-6">
              <p className="text-primary mb-3">⭐⭐⭐⭐⭐</p>
              <p className="font-body text-on-surface-variant mb-4">
                "Best fade I've had in years. {barber.name.split(' ')[0]} really listens to what you want."
              </p>
              <p className="font-body text-on-surface text-sm">— Thabo M.</p>
            </div>
            <div className="bg-surface-dim border border-surface-bright rounded-xl p-6">
              <p className="text-primary mb-3">⭐⭐⭐⭐⭐</p>
              <p className="font-body text-on-surface-variant mb-4">
                "Consistent quality every single visit. Always know exactly what I'm getting."
              </p>
              <p className="font-body text-on-surface text-sm">— James K.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BarberProfile