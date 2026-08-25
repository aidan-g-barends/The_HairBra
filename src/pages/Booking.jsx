import { useEffect, useState } from 'react'
import { getAllServices } from '../services/serviceService'

function Booking() {
  const [step, setStep] = useState(1)
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState(null)

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await getAllServices()
      if (!error) setServices(data)
      setLoading(false)
    }
    fetchServices()
  }, [])

  function handleSelectService(service) {
    setSelectedService(service)
    setStep(2)
  }

  return (
    <div className="px-6 py-20 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl text-primary text-center mb-2">Book an Appointment</h1>
      <p className="font-body text-on-surface-variant text-center mb-12">
        Step {step} of 3
      </p>

      {step === 1 && (
        <div>
          <h2 className="font-display text-2xl text-on-surface mb-6">Select a Service</h2>

          {loading ? (
            <p className="text-on-surface-variant">Loading services...</p>
          ) : (
            <div className="space-y-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleSelectService(service)}
                  className="w-full text-left bg-surface-dim border border-surface-bright rounded-xl p-6 hover:border-primary transition-colors flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-display text-lg text-on-surface">{service.name}</h3>
                    <p className="font-body text-on-surface-variant text-sm">{service.description}</p>
                    <p className="font-body text-on-surface-variant text-xs uppercase tracking-wide mt-2">
                      {service.duration_minutes} min
                    </p>
                  </div>
                  <span className="font-display text-xl text-primary whitespace-nowrap ml-4">
                    R{service.price}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="text-on-surface">
            You selected: <strong className="text-primary">{selectedService?.name}</strong>
          </p>
          <button
            onClick={() => setStep(1)}
            className="mt-4 text-on-surface-variant text-sm underline"
          >
            ← Back to services
          </button>
        </div>
      )}
    </div>
  )
}

export default Booking