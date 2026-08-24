const hours = [
  { day: 'Monday', time: '09:00 - 18:00' },
  { day: 'Tuesday', time: '09:00 - 18:00' },
  { day: 'Wednesday', time: '09:00 - 18:00' },
  { day: 'Thursday', time: '09:00 - 20:00' },
  { day: 'Friday', time: '09:00 - 20:00' },
  { day: 'Saturday', time: '08:00 - 17:00' },
  { day: 'Sunday', time: 'Closed' },
]

function About() {
  return (
    <div>
      {/* Header */}
      <div className="text-center py-24 px-6 bg-surface-container-lowest border-b border-surface-bright">
        <p className="font-body text-primary text-xs uppercase tracking-widest mb-3">Our Story</p>
        <h1 className="font-display text-5xl text-on-surface mb-4">About The Hairbra</h1>
        <p className="font-body text-on-surface-variant max-w-lg mx-auto">
          More than a barbershop — a standard of craft, care, and confidence for every
          client who sits in our chair.
        </p>
      </div>

      {/* Story */}
      <section className="px-6 py-24 max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display text-3xl text-primary mb-4">How It Started</h2>
          <p className="font-body text-on-surface-variant leading-relaxed mb-4">
            The Hairbra opened its doors in 2018 with a simple frustration turned into a
            mission: too many men were settling for rushed, forgettable haircuts. Our
            founder set out to build a space where precision barbering met genuine
            hospitality — no shortcuts, no assembly line, just craftsmanship.
          </p>
          <p className="font-body text-on-surface-variant leading-relaxed">
            What began as a single chair has grown into a full team of specialists, each
            bringing their own style while holding to the same standard: every client
            leaves looking — and feeling — sharper than when they walked in.
          </p>
        </div>
        <div className="aspect-square rounded-xl bg-surface-container-low" />
      </section>

      {/* Owner */}
      <section className="bg-surface-container-lowest border-y border-surface-bright px-6 py-24">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10 items-center">
          <div className="aspect-square rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
            <span className="font-display text-primary text-4xl">MR</span>
          </div>
          <div className="md:col-span-2">
            <p className="font-body text-primary text-xs uppercase tracking-widest mb-2">Founder & Owner</p>
            <h2 className="font-display text-3xl text-on-surface mb-4">Marcus Reign</h2>
            <p className="font-body text-on-surface-variant leading-relaxed mb-4">
              "I didn't want to open just another barbershop. I wanted to build the place
              I always wished existed — where the craft is taken seriously, and every
              client is treated like a regular from day one."
            </p>
            <p className="font-body text-on-surface-variant text-sm">
              15+ years behind the chair before founding The Hairbra.
            </p>
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="px-6 py-24 max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-3xl text-primary mb-6">Visit Us</h2>
          <p className="font-body text-on-surface-variant text-sm mb-2">
            101 Long Street, Cape Town, 8001
          </p>
          <p className="font-body text-on-surface-variant text-sm mb-2">
            +27 21 123 4567
          </p>
          <p className="font-body text-on-surface-variant text-sm mb-6">
            info@thehairbra.co.za
          </p>
          <div className="aspect-video rounded-xl bg-surface-container-low" />
        </div>

        <div>
          <h2 className="font-display text-3xl text-primary mb-6">Opening Hours</h2>
          <ul className="space-y-2">
            {hours.map((h) => (
              <li
                key={h.day}
                className="flex justify-between border-b border-surface-bright pb-2 font-body text-on-surface-variant"
              >
                <span className="text-on-surface">{h.day}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default About