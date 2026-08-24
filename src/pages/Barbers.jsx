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

  return (
    <div>
      <div className="text-center py-24 px-6 bg-surface-container-lowest border-b border-surface-bright">
        <p className="font-body text-primary text-xs uppercase tracking-widest mb-3">The Team</p>
        <h1 className="font-display text-5xl text-on-surface mb-4">Our Barbers</h1>
        <p className="font-body text-on-surface-variant max-w-lg mx-auto">
          Every barber at The Hairbra brings their own craft and specialty — book with the
          one who matches your style, or let us pair you with the earliest available chair.
        </p>
      </div>

      <section className="px-6 py-24 max-w-6xl mx-auto">
        {loading ? (
          <p className="text-on-surface-variant text-center">Loading barbers...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {barbers.map((barber) => (
              <div
                key={barber.id}
                className="bg-surface-dim border border-surface-bright rounded-xl overflow-hidden text-left hover:bg-surface-container transition-colors duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={barber.profile_image}
                    alt={barber.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                <div className="p-7">
                  <h3 className="font-display text-2xl text-on-surface mb-1">{barber.name}</h3>
                  <p className="font-body text-primary text-sm mb-3">
                    {barber.specialties?.join(', ')}
                  </p>
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-3 line-clamp-3">
                    {barber.bio}
                  </p>
                  <p className="font-body text-on-surface-variant text-xs uppercase tracking-wide mb-5">
                    {barber.years_experience} years experience
                  </p>

                  <Link
                    to={`/barbers/${barber.id}`}
                    className="inline-block bg-primary text-on-primary font-body text-xs uppercase tracking-wide px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Book with {barber.name.split(' ')[0]}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="bg-surface-container-lowest border-t border-surface-bright text-center py-20 px-6">
        <h2 className="font-display text-2xl text-on-surface mb-3">Can't decide?</h2>
        <p className="font-body text-on-surface-variant mb-6 max-w-md mx-auto">
          Book with the next available barber and we'll match you with whoever's free soonest.
        </p>
        <Link
          to="/booking"
          className="inline-block bg-primary text-on-primary font-body font-semibold uppercase px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Book Any Available Barber
        </Link>
      </div>
    </div>
  )
}

export default Barbers