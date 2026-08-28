import { supabase } from './supabase'

function generateTimeSlots() {
  const slots = []
  let hour = 9
  let minute = 0

  while (hour < 18) {
    const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
    slots.push(time)
    minute += 30
    if (minute === 60) {
      minute = 0
      hour += 1
    }
  }

  return slots
}

export async function getBookedSlots(barberId, date) {
  const { data, error } = await supabase
    .from('appointments')
    .select('start_time')
    .eq('barber_id', barberId)
    .eq('appointment_date', date)
    .neq('status', 'CANCELLED')

  return { data, error }
}

export async function getAvailableSlots(barberId, date) {
  let allSlots = generateTimeSlots()

  const todayStr = new Date().toISOString().split('T')[0]
  if (date === todayStr) {
    const now = new Date()
    const nowMinutes = now.getHours() * 60 + now.getMinutes()
    allSlots = allSlots.filter((slot) => {
      const [h, m] = slot.split(':').map(Number)
      return h * 60 + m > nowMinutes
    })
  }

  if (!barberId) {
    return { slots: allSlots, error: null }
  }

  const { data, error } = await getBookedSlots(barberId, date)
  if (error) return { slots: [], error }

  const bookedTimes = data.map((a) => a.start_time.slice(0, 5))
  const availableSlots = allSlots.filter((slot) => !bookedTimes.includes(slot))

  return { slots: availableSlots, error: null }
}

export async function createAppointment({
  customerId,
  guestName,
  guestEmail,
  guestPhone,
  barberId,
  serviceId,
  date,
  time,
  endTime,
  depositAmount,
}) {
  const { data, error } = await supabase
    .from('appointments')
    .insert({
      customer_id: customerId || null,
      guest_name: guestName || null,
      guest_email: guestEmail || null,
      guest_phone: guestPhone || null,
      barber_id: barberId,
      service_id: serviceId,
      appointment_date: date,
      start_time: time,
      end_time: endTime,
      status: 'PENDING_PAYMENT',
      deposit_amount: depositAmount,
      deposit_paid: false,
    })
    .select()
    .single()

  return { data, error }
}

export async function confirmAppointmentPayment(appointmentId, paymentReference) {
  const { data, error } = await supabase
    .from('appointments')
    .update({
      status: 'CONFIRMED',
      deposit_paid: true,
      payment_id: paymentReference,
    })
    .eq('id', appointmentId)
    .select()
    .single()

  return { data, error }
}

export async function notifyBarber(barberName, appointmentDetails) {
  const { error } = await supabase.from('notifications').insert({
    recipient_type: 'barber',
    recipient_label: barberName,
    type: 'new_appointment',
    title: 'New Appointment',
    message: `New booking: ${appointmentDetails}`,
  })

  return { error }
}

export async function notifyCustomer(customerLabel, appointmentDetails) {
  const { error } = await supabase.from('notifications').insert({
    recipient_type: 'customer',
    recipient_label: customerLabel,
    type: 'booking_confirmed',
    title: 'Booking Confirmed',
    message: `Your booking is confirmed: ${appointmentDetails}`,
  })

  return { error }
}

export async function getCustomerAppointments(customerId) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, barbers(name), services(name)')
    .eq('customer_id', customerId)
    .order('appointment_date', { ascending: false })

  return { data, error }
}

export async function getBarberReviews(barberId) {
  const { data, error } = await supabase
    .from('barber_reviews')
    .select('*, profiles(full_name)')
    .eq('barber_id', barberId)
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function createReview({ appointmentId, customerId, barberId, rating, review }) {
  const { data, error } = await supabase
    .from('barber_reviews')
    .insert({
      appointment_id: appointmentId,
      customer_id: customerId,
      barber_id: barberId,
      rating,
      review,
    })
    .select()
    .single()

  return { data, error }
}