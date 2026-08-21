import { Link } from 'react-router-dom'

const products = [
  { id: 1, name: 'Matte Clay Pomade', price: 180, image: '/Hair_Clay.jpg' },
  { id: 2, name: 'Signature Beard Oil', price: 220, image: '/Beard_Oil.jpg' },
  { id: 3, name: 'Charcoal Shampoo', price: 160, image: '/Shampoo.jpg' },
  { id: 4, name: 'Styling Cream', price: 190, image: '/styling_cream_jar_minimal.jpg' },
]

function Products() {
  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b border-surface-bright pb-4">
        <div>
            <p className="font-body text-primary text-xs uppercase tracking-widest mb-2">Shop</p>
          <h2 className="font-display text-4xl text-primary mb-2">Grooming Essentials</h2>
          <p className="font-body text-on-surface-variant">Curated products for the perfect finish.</p>
        </div>
        <Link
          to="/shop"
          className="hidden md:block font-body text-primary uppercase text-sm hover:opacity-80 transition-opacity"
        >
          Shop All →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link to="/shop" key={product.id} className="text-center group">
            <div className="bg-surface-container-low rounded-xl aspect-square mb-3 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <h4 className="font-body text-on-surface text-sm mb-1">{product.name}</h4>
            <p className="font-body text-primary">R{product.price}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Products