import { useState } from 'react'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { getStripe, createStripePaymentIntent } from '../../services/paymentService'

function PaymentForm({ onSuccess, onError }) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })

    if (error) {
      onError(error.message)
      setProcessing(false)
      return
    }

    onSuccess(paymentIntent)
    setProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full mt-6 bg-primary text-on-primary font-body font-semibold uppercase px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  )
}

function StripePaymentForm({ amount, onSuccess, onError }) {
  const [clientSecret, setClientSecret] = useState(null)
  const [stripePromise] = useState(() => getStripe())

  useState(() => {
    createStripePaymentIntent(amount).then(setClientSecret)
  }, [])

  if (!clientSecret) {
    return <p className="text-on-surface-variant">Loading payment form...</p>
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm onSuccess={onSuccess} onError={onError} />
    </Elements>
  )
}

export default StripePaymentForm