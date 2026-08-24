import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-surface-container-lowest text-on-surface px-6 md:px-16 pt-24 pb-10 mt-12">
      <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <h2 className="font-display text-2xl text-primary uppercase mb-6">The Hairbra</h2>
          <p className="font-body text-on-surface-variant max-w-md mb-6 leading-relaxed">
            Elevating the standard of men's grooming through classic technique, modern
            precision, and an atmosphere of exclusive luxury.
          </p>
          <p className="font-body text-on-surface-variant text-sm mb-2">
            101 Long Street, Cape Town, 8001
          </p>
          <p className="font-body text-on-surface-variant text-sm mb-2">
            +27 21 123 4567
          </p>
          <p className="font-body text-on-surface-variant text-sm">
            info@thehairbra.co.za
          </p>
        </div>

        <div>
          <h4 className="font-body text-sm uppercase tracking-widest text-on-surface mb-6">
            Explore
          </h4>
          <ul className="space-y-3 font-body text-on-surface-variant text-sm">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/barbers" className="hover:text-primary">Barbers</Link></li>
            <li><Link to="/shop" className="hover:text-primary">Shop</Link></li>
            <li><Link to="/booking" className="hover:text-primary">Book Appointment</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-body text-sm uppercase tracking-widest text-on-surface mb-6">
            Legal
          </h4>
          <ul className="space-y-3 font-body text-on-surface-variant text-sm">
            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary">FAQ</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-surface-bright pt-6 text-center">
        <p className="font-body text-on-surface-variant text-xs uppercase tracking-widest">
          © 2026 The Hairbra. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer