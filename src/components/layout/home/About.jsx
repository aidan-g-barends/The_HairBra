function About() {
  const hours = [
    { day: 'Monday', time: '08:00 - 18:00' },
    { day: 'Tuesday', time: '08:00 - 18:00' },
    { day: 'Wednesday', time: '08:00 - 18:00' },
    { day: 'Thursday', time: '08:00 - 18:00' },
    { day: 'Friday', time: '08:00 - 18:00' },
    { day: 'Saturday', time: '09:00 - 16:00' },
    { day: 'Sunday', time: '09:00 - 14:00' },
  ]

  return (
    <section className="grid md:grid-cols-2 gap-8 px-6 py-20 max-w-5xl mx-auto">
      <div className="bg-surface-container p-8 rounded-xl border border-surface-bright">
        <h3 className="font-display text-2xl text-primary mb-4">Our Mission</h3>
        <p className="font-body text-on-surface-variant">
          At The Hairbra, we believe grooming is more than a necessity, it's a statement
          of intent. Our master barbers combine classic technique with modern precision to
          deliver unparalleled style and confidence. Step into our lounge and experience the
          standard of masculine elegance.
        </p>
      </div>

      <div className="bg-surface-container p-8 rounded-xl border border-surface-bright">
        <h3 className="font-display text-2xl text-primary mb-4">Opening Hours</h3>
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
  )
}

export default About