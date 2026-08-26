import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../services/productService'
import { useCart } from '../context/CartContext'

function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await getProductById(id)
      if (!error) setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  function handleAddToCart() {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return <p className="text-on-surface p-8 text-center">Loading...</p>
  }

  if (!product) {
    return <p className="text-on-surface p-8 text-center">Product not found.</p>
  }

  const outOfStock = product.stock_quantity === 0

  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square rounded-xl overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="font-body text-primary text-xs uppercase tracking-widest mb-3">
            {product.category}
          </p>
          <h1 className="font-display text-4xl text-on-surface mb-4">{product.name}</h1>
          <p className="font-display text-2xl text-primary mb-6">R{product.price}</p>

          <p className="font-body text-on-surface-variant leading-relaxed mb-8">
            {product.description}
          </p>

          {outOfStock ? (
            <p className="font-body text-red-400 uppercase text-sm mb-6">Out of Stock</p>
          ) : (
            <>
              <p className="font-body text-on-surface-variant text-sm mb-6">
                {product.stock_quantity} in stock
              </p>

              <div className="flex items-center gap-4 mb-8">
                <span className="font-body text-on-surface text-sm">Quantity</span>
                <div className="flex items-center border border-surface-bright rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 text-on-surface hover:text-primary"
                  >
                    −
                  </button>
                  <span className="px-4 font-body text-on-surface">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock_quantity, q + 1))}
                    className="px-4 py-2 text-on-surface hover:text-primary"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-primary text-on-primary font-body font-semibold uppercase px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                {added ? 'Added!' : 'Add to Cart'}
              </button>
            </>
          )}

          <Link
            to="/shop"
            className="inline-block mt-6 font-body text-on-surface-variant text-xs uppercase tracking-wide hover:text-primary transition-colors"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail