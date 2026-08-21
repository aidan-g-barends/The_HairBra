import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="text-center py-32 px-6 bg-surface-container-lowest">
      <h1 className="font-display text-5xl md:text-7xl text-on-surface mb-4">
        Look Sharp. <span className="text-primary">Feel Sharp.</span>
      </h1>
      <p className="font-body text-on-surface-variant max-w-xl mx-auto mb-8">
        Experience the pinnacle of men's grooming in an atmosphere of exclusive luxury.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/booking"
          className="bg-primary text-on-primary font-body font-semibold uppercase px-8 py-3 rounded-lg"
        >
          Book an Appointment
        </Link>
        <Link
          to="/shop"
          className="border border-primary text-primary font-body font-semibold uppercase px-8 py-3 rounded-lg"
        >
          Shop Products
        </Link>
      </div>
    </section>
  )
}

export default Hero