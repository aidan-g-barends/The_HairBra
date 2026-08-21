const services = [
  {
    id: 1,
    name: 'Classic Cut',
    description: 'A tailored haircut designed for your head shape and lifestyle, finished with a hot towel and premium styling.',
    duration: 45,
    price: 180,
  },
  {
    id: 2,
    name: 'Beard Trim',
    description: 'Precision shaping and trimming, conditioned with our signature beard oils for a healthy, sharp look.',
    duration: 30,
    price: 130,
  },
  {
    id: 3,
    name: 'Luxury Shave',
    description: 'The ultimate relaxation experience. Multiple hot towels, pre-shave oil, warm lather, and a straight razor finish.',
    duration: 60,
    price: 250,
  },
]

function Services() {
  return (
    <section className="px-6 py-20 max-w-5xl mx-auto text-center">
      <h2 className="font-display text-4xl text-primary mb-2">Signature Services</h2>
      <p className="font-body text-on-surface-variant mb-12">
        Meticulous craftsmanship for the modern gentleman.
      </p>

      <div className="grid md:grid-cols-3 gap-6 text-left">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-surface-dim border border-surface-bright rounded-xl p-8 hover:bg-surface-container transition-colors duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-display text-xl text-on-surface">{service.name}</h3>
              <span className="font-body text-primary bg-primary/10 px-3 py-1 rounded-full text-sm">
                R{service.price}
              </span>
            </div>
            <p className="font-body text-on-surface-variant mb-6">{service.description}</p>
            <span className="font-body text-on-surface-variant text-sm uppercase">
              {service.duration} Min
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services