import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../services/productService'

function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await getAllProducts()
      if (!error) setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <div>
      <div className="text-center py-24 px-6 bg-surface-container-lowest border-b border-surface-bright">
        <p className="font-body text-primary text-xs uppercase tracking-widest mb-3">Shop</p>
        <h1 className="font-display text-5xl text-on-surface mb-4">Grooming Essentials</h1>
        <p className="font-body text-on-surface-variant max-w-lg mx-auto mb-12">
          Curated products for the perfect finish, chosen by our barbers.
        </p>

        <div className="flex justify-center gap-10 md:gap-16 flex-wrap">
          <div>
            <p className="font-display text-3xl text-primary">{products.length}</p>
            <p className="font-body text-on-surface-variant text-xs uppercase tracking-wide">Products</p>
          </div>
          <div>
            <p className="font-display text-3xl text-primary">Free</p>
            <p className="font-body text-on-surface-variant text-xs uppercase tracking-wide">Store Pickup</p>
          </div>
        </div>
      </div>

      <section className="px-6 py-20 max-w-5xl mx-auto">
        {loading ? (
          <p className="text-on-surface-variant text-center">Loading products...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                to={`/shop/product/${product.id}`}
                key={product.id}
                className="bg-surface-dim border border-surface-bright rounded-xl overflow-hidden hover:bg-surface-container transition-colors duration-300 group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="font-body text-primary text-xs uppercase tracking-wide mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-display text-lg text-on-surface mb-2">{product.name}</h3>
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-display text-xl text-primary">R{product.price}</span>
                    {product.stock_quantity === 0 ? (
                      <span className="font-body text-red-400 text-xs uppercase">Out of Stock</span>
                    ) : product.stock_quantity <= 5 ? (
                      <span className="font-body text-primary text-xs uppercase">Low Stock</span>
                    ) : (
                      <span className="font-body text-on-surface-variant text-xs uppercase">In Stock</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Shop