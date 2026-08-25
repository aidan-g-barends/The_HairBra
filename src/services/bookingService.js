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
  const allSlots = generateTimeSlots()

  if (!barberId) {
    return { slots: allSlots, error: null }
  }

  const { data, error } = await getBookedSlots(barberId, date)
  if (error) return { slots: [], error }

  const bookedTimes = data.map((a) => a.start_time.slice(0, 5))
  const availableSlots = allSlots.filter((slot) => !bookedTimes.includes(slot))

  return { slots: availableSlots, error: null }
}