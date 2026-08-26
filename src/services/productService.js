import { supabase } from './supabase'

export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)

  return { data, error }
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  return { data, error }
}