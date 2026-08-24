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
        <p className="font-body text-on-surface-variant max-w-lg mx-auto mb-12">
          Every barber at The Hairbra brings their own craft and specialty — book with the
          one who matches your style, or let us pair you with the earliest available chair.
        </p>

        <div className="flex justify-center gap-10 md:gap-16 flex-wrap">
          <div>
            <p className="font-display text-3xl text-primary">{barbers.length}</p>
            <p className="font-body text-on-surface-variant text-xs uppercase tracking-wide">Master Barbers</p>
          </div>
          <div>
            <p className="font-display text-3xl text-primary">
              {barbers.reduce((sum, b) => sum + (b.years_experience || 0), 0)}+
            </p>
            <p className="font-body text-on-surface-variant text-xs uppercase tracking-wide">Years Combined</p>
          </div>
          <div>
            <p className="font-display text-3xl text-primary">4.9</p>
            <p className="font-body text-on-surface-variant text-xs uppercase tracking-wide">Average Rating</p>
          </div>
          <div>
            <p className="font-display text-3xl text-primary">500+</p>
            <p className="font-body text-on-surface-variant text-xs uppercase tracking-wide">Happy Clients</p>
          </div>
        </div>
      </div>

      <section className="px-6 py-24 max-w-5xl mx-auto">
        {loading ? (
          <p className="text-on-surface-variant text-center">Loading barbers...</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-10">
            {barbers.map((barber) => (
              <div
                key={barber.id}
                className="bg-surface-dim border border-surface-bright rounded-xl overflow-hidden text-left hover:bg-surface-container transition-colors duration-300 flex flex-col sm:flex-row"
              >
                <div className="sm:w-2/5 aspect-square sm:aspect-auto overflow-hidden">
                  <img
                    src={barber.profile_image}
                    alt={barber.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-display text-2xl text-on-surface mb-1">{barber.name}</h3>
                  <p className="font-body text-primary text-sm mb-3">
                    {barber.specialties?.join(' · ')}
                  </p>
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-4 line-clamp-4">
                    {barber.bio}
                  </p>

                  <div className="flex gap-4 mb-5 mt-auto pt-4 border-t border-surface-bright">
                    <div>
                      <p className="font-display text-lg text-primary">{barber.years_experience}</p>
                      <p className="font-body text-on-surface-variant text-[11px] uppercase tracking-wide">Years</p>
                    </div>
                    <div>
                      <p className="font-display text-lg text-primary">4.9</p>
                      <p className="font-body text-on-surface-variant text-[11px] uppercase tracking-wide">Rating</p>
                    </div>
                    <div>
                      <p className="font-display text-lg text-primary">{barber.specialties?.length || 0}</p>
                      <p className="font-body text-on-surface-variant text-[11px] uppercase tracking-wide">Specialties</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={`/barbers/${barber.id}`}
                      className="font-body text-on-surface text-xs uppercase tracking-wide px-5 py-2.5 rounded-lg border border-surface-bright hover:border-primary hover:text-primary transition-colors"
                    >
                      View Profile
                    </Link>
                    <Link
                      to={`/barbers/${barber.id}`}
                      className="bg-primary text-on-primary font-body text-xs uppercase tracking-wide px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Book with {barber.name.split(' ')[0]}
                    </Link>
                  </div>
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