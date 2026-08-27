import { supabase } from './supabase'

export async function getAllServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)

  return { data, error }
}