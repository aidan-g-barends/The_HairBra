import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart()

  const deliveryFee = subtotal > 0 ? 60 : 0
  const total = subtotal + deliveryFee

  if (items.length === 0) {
    return (
      <div className="px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-on-surface mb-4">Your Cart is Empty</h1>
        <p className="font-body text-on-surface-variant mb-8">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-primary text-on-primary font-body font-semibold uppercase px-8 py-3 rounded-lg"
        >
          Browse Shop
        </Link>
      </div>
    )
  }

  return (
    <section className="px-6 py-20 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl text-primary mb-10">Your Cart</h1>

      <div className="space-y-4 mb-10">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-surface-dim border border-surface-bright rounded-xl p-4 flex items-center gap-4"
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1">
              <h3 className="font-display text-lg text-on-surface">{item.name}</h3>
              <p className="font-body text-primary text-sm">R{item.price}</p>
            </div>

            <div className="flex items-center border border-surface-bright rounded-lg">
              <button
                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                className="px-3 py-1 text-on-surface hover:text-primary"
              >
                −
              </button>
              <span className="px-3 font-body text-on-surface">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1 text-on-surface hover:text-primary"
              >
                +
              </button>
            </div>

            <span className="font-display text-on-surface w-16 text-right">
              R{item.price * item.quantity}
            </span>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-400 text-sm hover:opacity-70"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="bg-surface-dim border border-surface-bright rounded-xl p-6 space-y-3">
        <div className="flex justify-between font-body text-on-surface-variant">
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

      <Link
        to="/checkout"
        className="block text-center mt-8 bg-primary text-on-primary font-body font-semibold uppercase px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
      >
        Proceed to Checkout
      </Link>
    </section>
  )
}

export default Cart