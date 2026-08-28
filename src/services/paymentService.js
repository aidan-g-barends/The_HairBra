import { loadStripe } from '@stripe/stripe-js'
import { supabase } from './supabase'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

async function mockPaymentProvider(amount) {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  return {
    success: true,
    transactionReference: `MOCK-${Date.now()}`,
    provider: 'mock',
    amount,
  }
}

export async function createStripePaymentIntent(amount) {
  const { data, error } = await supabase.functions.invoke('create-payment-intent', {
    body: { amount },
  })

  if (error) throw error
  return data.clientSecret
}

export async function getStripe() {
  return stripePromise
}

export async function processPayment(amount, provider = 'mock') {
  if (provider === 'mock') {
    return mockPaymentProvider(amount)
  }

  throw new Error(`Unknown payment provider: ${provider}`)
}