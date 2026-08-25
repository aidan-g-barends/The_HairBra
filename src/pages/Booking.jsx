import { useEffect, useState } from 'react'
import { getAllServices } from '../services/serviceService'
import { getAllBarbers } from '../services/barberService'
import { getAvailableSlots } from '../services/bookingService'

function Booking() {
  const [step, setStep] = useState(1)
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState(null)

  const [barbers, setBarbers] = useState([])
  const [barbersLoading, setBarbersLoading] = useState(true)
  const [selectedBarber, setSelectedBarber] = useState(null)

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState(null)
  const [slots, setSlots] = useState([])
  const [slotsLoading, setSlotsLoading] = useState(false)

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await getAllServices()
      if (!error) setServices(data)
      setLoading(false)
    }
    fetchServices()
  }, [])

  useEffect(() => {
    async function fetchBarbers() {
      const { data, error } = await getAllBarbers()
      if (!error) setBarbers(data)
      setBarbersLoading(false)
    }
    fetchBarbers()
  }, [])

  useEffect(() => {
    if (!selectedDate) return

    async function fetchSlots() {
      setSlotsLoading(true)
      setSelectedTime(null)
      const { slots } = await getAvailableSlots(selectedBarber?.id, selectedDate)
      setSlots(slots)
      setSlotsLoading(false)
    }
    fetchSlots()
  }, [selectedDate, selectedBarber])

  function handleSelectService(service) {
    setSelectedService(service)
    setStep(2)
  }

  function handleSelectBarber(barber) {
    setSelectedBarber(barber)
    setStep(3)
  }
  return (
    <div className="px-6 py-20 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl text-primary text-center mb-2">Book an Appointment</h1>
      <p className="font-body text-on-surface-variant text-center mb-12">
        Step {step} of 4
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
    <h2 className="font-display text-2xl text-on-surface mb-2">Select a Barber</h2>
    <p className="font-body text-on-surface-variant text-sm mb-6">
      {selectedService?.name} — R{selectedService?.price}
    </p>

    {barbersLoading ? (
      <p className="text-on-surface-variant">Loading barbers...</p>
    ) : (
      <div className="space-y-4">
        <button
          onClick={() => handleSelectBarber(null)}
          className="w-full text-left bg-surface-dim border border-surface-bright rounded-xl p-6 hover:border-primary transition-colors"
        >
          <h3 className="font-display text-lg text-on-surface">Any Available Barber</h3>
          <p className="font-body text-on-surface-variant text-sm">
            We'll match you with the earliest available chair.
          </p>
        </button>

        {barbers.map((barber) => (
          <button
            key={barber.id}
            onClick={() => handleSelectBarber(barber)}
            className="w-full text-left bg-surface-dim border border-surface-bright rounded-xl p-6 hover:border-primary transition-colors flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
              <img src={barber.profile_image} alt={barber.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-display text-lg text-on-surface">{barber.name}</h3>
              <p className="font-body text-on-surface-variant text-sm">
                {barber.specialties?.join(', ')}
              </p>
            </div>
          </button>
        ))}
      </div>
    )}

    <button
      onClick={() => setStep(1)}
      className="mt-6 text-on-surface-variant text-sm underline"
    >
      ← Back to services
    </button>
  </div>
)}

{step === 3 && (
  <div>
    <h2 className="font-display text-2xl text-on-surface mb-2">Select Date & Time</h2>
    <p className="font-body text-on-surface-variant text-sm mb-6">
      {selectedService?.name} with {selectedBarber?.name || 'Any Available Barber'}
    </p>

    <label className="block font-body text-on-surface text-sm mb-2">Date</label>
    <input
      type="date"
      value={selectedDate}
      min={new Date().toISOString().split('T')[0]}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="w-full p-3 bg-white text-black rounded-lg mb-8"
    />

    {selectedDate && (
      <>
        <label className="block font-body text-on-surface text-sm mb-3">Time</label>
        {slotsLoading ? (
          <p className="text-on-surface-variant">Checking availability...</p>
        ) : slots.length === 0 ? (
          <p className="text-on-surface-variant">No available slots for this date.</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
            {slots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`font-body text-sm py-3 rounded-lg border transition-colors ${
                  selectedTime === time
                    ? 'bg-primary text-on-primary border-primary'
                    : 'border-surface-bright text-on-surface hover:border-primary'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        )}
      </>
    )}

    <div className="flex gap-4">
      <button onClick={() => setStep(2)} className="text-on-surface-variant text-sm underline">
        ← Back to barbers
      </button>
      {selectedDate && selectedTime && (
        <button
          onClick={() => setStep(4)}
          className="bg-primary text-on-primary font-body font-semibold uppercase px-6 py-2.5 rounded-lg ml-auto"
        >
          Continue to Summary
        </button>
      )}
    </div>
  </div>
)}

{step === 4 && (
  <div>
    <h2 className="font-display text-2xl text-on-surface mb-6">Booking Summary</h2>

    <div className="bg-surface-dim border border-surface-bright rounded-xl p-6 mb-8 space-y-4">
      <div className="flex justify-between border-b border-surface-bright pb-4">
        <span className="font-body text-on-surface-variant">Service</span>
        <span className="font-body text-on-surface">{selectedService?.name}</span>
      </div>
      <div className="flex justify-between border-b border-surface-bright pb-4">
        <span className="font-body text-on-surface-variant">Barber</span>
        <span className="font-body text-on-surface">
          {selectedBarber?.name || 'Any Available'}
        </span>
      </div>
      <div className="flex justify-between border-b border-surface-bright pb-4">
        <span className="font-body text-on-surface-variant">Date</span>
        <span className="font-body text-on-surface">
          {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-ZA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>
      <div className="flex justify-between border-b border-surface-bright pb-4">
        <span className="font-body text-on-surface-variant">Time</span>
        <span className="font-body text-on-surface">{selectedTime}</span>
      </div>
      <div className="flex justify-between border-b border-surface-bright pb-4">
        <span className="font-body text-on-surface-variant">Service Price</span>
        <span className="font-body text-on-surface">R{selectedService?.price}</span>
      </div>
      <div className="flex justify-between border-b border-surface-bright pb-4">
        <span className="font-body text-on-surface-variant">Required Deposit</span>
        <span className="font-display text-lg text-primary">
          R{selectedService?.deposit_amount}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="font-body text-on-surface-variant">Remaining Balance</span>
        <span className="font-body text-on-surface">
          R{selectedService?.price - selectedService?.deposit_amount}
        </span>
      </div>
    </div>

    <div className="flex gap-4">
      <button onClick={() => setStep(3)} className="text-on-surface-variant text-sm underline">
        ← Back to date & time
      </button>
      <button
        className="bg-primary text-on-primary font-body font-semibold uppercase px-6 py-2.5 rounded-lg ml-auto"
      >
        Continue to Payment
      </button>
    </div>
  </div>
)}
    </div>
  )
}

export default Booking