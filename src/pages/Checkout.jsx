import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { createOrder, confirmOrderPayment, reduceStock, notifyOwnerOfOrder } from '../services/orderService'
import { processPayment } from '../services/paymentService'
import { isValidEmail, isValidSAPhone, isValidPostalCode } from '../utils/validation'

const deliveryOptions = [
  { id: 'courier', label: 'Courier', fee: 60, description: '2-3 business days' },
  { id: 'paxi', label: 'PAXI', fee: 40, description: '5-7 business days, collect at store' },
  { id: 'pickup', label: 'Store Pickup', fee: 0, description: 'Ready within 24 hours' },
]

function Checkout() {
  const { items, subtotal, clearCart } = useCart()

  const [step, setStep] = useState(1)

  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')

  const [address, setAddress] = useState({
    street: '',
    suburb: '',
    city: '',
    province: '',
    postalCode: '',
  })

  const [deliveryMethod, setDeliveryMethod] = useState(null)

  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [orderNumber, setOrderNumber] = useState(null)

  const emailValid = isValidEmail(guestEmail)
  const phoneValid = isValidSAPhone(guestPhone)
  const postalValid = isValidPostalCode(address.postalCode)

  const deliveryFee = deliveryMethod
    ? deliveryOptions.find((d) => d.id === deliveryMethod).fee
    : 0
  const total = subtotal + deliveryFee

  async function handlePlaceOrder() {
    setProcessing(true)
    setError('')

    const { data: order, error: createError } = await createOrder({
      customerId: null,
      guestName,
      guestEmail,
      guestPhone,
      items,
      subtotal,
      deliveryFee,
      deliveryMethod,
      shippingAddress: address,
    })

    if (createError) {
      setError('Something went wrong creating your order. Please try again.')
      setProcessing(false)
      return
    }

    const payment = await processPayment(total)

    if (!payment.success) {
      setError("We couldn't process your payment. Please try again.")
      setProcessing(false)
      return
    }

    await confirmOrderPayment(order.id, payment.transactionReference)
    await reduceStock(items)
    await notifyOwnerOfOrder(order.order_number, total)

    setOrderNumber(order.order_number)
    clearCart()
    setProcessing(false)
    setStep(5)
  }

  if (items.length === 0 && step !== 5) {
    return (
      <div className="px-6 py-24 text-center">
        <p className="font-body text-on-surface-variant">Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className="px-6 py-20 max-w-2xl mx-auto">
      <h1 className="font-display text-4xl text-primary text-center mb-2">Checkout</h1>
      {step < 5 && (
        <p className="font-body text-on-surface-variant text-center mb-12">
          Step {step} of 4
        </p>
      )}

      {step === 1 && (
        <div>
          <h2 className="font-display text-2xl text-on-surface mb-6">Your Details</h2>
          <div className="space-y-4 mb-2">
            <input
              type="text"
              placeholder="Full Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full p-3 bg-white text-black rounded-lg"
            />

            <div>
              <input
                type="email"
                placeholder="Email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full p-3 bg-white text-black rounded-lg"
              />
              {guestEmail && !emailValid && (
                <p className="text-red-400 text-xs mt-1">Please enter a valid email address.</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number (e.g. 082 123 4567)"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="w-full p-3 bg-white text-black rounded-lg"
              />
              {guestPhone && !phoneValid && (
                <p className="text-red-400 text-xs mt-1">Please enter a valid South African phone number.</p>
              )}
            </div>
          </div>
          {guestName && emailValid && phoneValid && (
            <button
              onClick={() => setStep(2)}
              className="mt-6 bg-primary text-on-primary font-body font-semibold uppercase px-6 py-2.5 rounded-lg"
            >
              Continue to Address
            </button>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-display text-2xl text-on-surface mb-6">Delivery Address</h2>
          <div className="space-y-4 mb-2">
            <input
              type="text"
              placeholder="Street Address"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              className="w-full p-3 bg-white text-black rounded-lg"
            />
            <input
              type="text"
              placeholder="Suburb"
              value={address.suburb}
              onChange={(e) => setAddress({ ...address, suburb: e.target.value })}
              className="w-full p-3 bg-white text-black rounded-lg"
            />
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="w-full p-3 bg-white text-black rounded-lg"
            />
            <input
              type="text"
              placeholder="Province"
              value={address.province}
              onChange={(e) => setAddress({ ...address, province: e.target.value })}
              className="w-full p-3 bg-white text-black rounded-lg"
            />
            <div>
              <input
                type="text"
                placeholder="Postal Code"
                value={address.postalCode}
                onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                className="w-full p-3 bg-white text-black rounded-lg"
              />
              {address.postalCode && !postalValid && (
                <p className="text-red-400 text-xs mt-1">Please enter a valid 4-digit postal code.</p>
              )}
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setStep(1)}
              className="font-body text-on-surface-variant text-xs uppercase tracking-wide hover:text-primary transition-colors"
            >
              ← Back
            </button>
            {address.street && address.suburb && address.city && address.province && postalValid && (
              <button
                onClick={() => setStep(3)}
                className="bg-primary text-on-primary font-body font-semibold uppercase px-6 py-2.5 rounded-lg ml-auto"
              >
                Continue to Delivery
              </button>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="font-display text-2xl text-on-surface mb-6">Delivery Method</h2>
          <div className="space-y-4 mb-8">
            {deliveryOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setDeliveryMethod(option.id)}
                className={`w-full text-left p-6 rounded-xl border transition-colors flex justify-between items-center ${
                  deliveryMethod === option.id
                    ? 'bg-primary/10 border-primary'
                    : 'bg-surface-dim border-surface-bright hover:border-primary'
                }`}
              >
                <div>
                  <h3 className="font-display text-lg text-on-surface">{option.label}</h3>
                  <p className="font-body text-on-surface-variant text-sm">{option.description}</p>
                </div>
                <span className="font-display text-primary">
                  {option.fee === 0 ? 'Free' : `R${option.fee}`}
                </span>
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setStep(2)}
              className="font-body text-on-surface-variant text-xs uppercase tracking-wide hover:text-primary transition-colors"
            >
              ← Back
            </button>
            {deliveryMethod && (
              <button
                onClick={() => setStep(4)}
                className="bg-primary text-on-primary font-body font-semibold uppercase px-6 py-2.5 rounded-lg ml-auto"
              >
                Continue to Payment
              </button>
            )}
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="font-display text-2xl text-on-surface mb-6">Review & Pay</h2>

          <div className="bg-surface-dim border border-surface-bright rounded-xl p-6 mb-8 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between font-body text-on-surface-variant text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>R{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-body text-on-surface-variant pt-3 border-t border-surface-bright">
              <span>Subtotal</span>
              <span>R{subtotal}</span>
            </div>
            <div className="flex justify-between font-body text-on-surface-variant">
              <span>Delivery</span>
              <span>R{deliveryFee}</span>
            </div>
            <div className="flex justify-between font-display text-xl text-primary pt-3 border-t border-surface-bright">
              <span>Total</span>
              <span>R{total}</span>
            </div>
          </div>

          {error && <p className="text-red-400 mb-4">{error}</p>}

          <div className="flex gap-4">
            <button
              onClick={() => setStep(3)}
              className="font-body text-on-surface-variant text-xs uppercase tracking-wide hover:text-primary transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={handlePlaceOrder}
              disabled={processing}
              className="bg-primary text-on-primary font-body font-semibold uppercase px-6 py-2.5 rounded-lg ml-auto disabled:opacity-50"
            >
              {processing ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="text-center">
          <h2 className="font-display text-4xl text-primary mb-4">Order Confirmed!</h2>
          <p className="font-body text-on-surface-variant mb-8">
            Your order has been received and is being processed.
          </p>
          <p className="font-body text-on-surface-variant text-sm mb-8">
            Order Number: <span className="text-primary">{orderNumber}</span>
          </p>
          
           <a href="/"
            className="inline-block bg-primary text-on-primary font-body font-semibold uppercase px-8 py-3 rounded-lg"
          >
            Return Home
          </a>
        </div>
      )}
    </div>
  )
}

export default Checkout