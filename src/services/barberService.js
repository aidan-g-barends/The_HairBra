import { supabase } from './supabase'

export async function getAllBarbers() {
  const { data, error } = await supabase
    .from('barbers')
    .select('*')
    .eq('active', true)

  return { data, error }
}

export async function getBarberById(id) {
  const { data, error } = await supabase
    .from('barbers')
    .select('*')
    .eq('id', id)
    .single()

  return { data, error }
}