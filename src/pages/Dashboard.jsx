import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getCustomerAppointments } from '../services/bookingService'
import { getCustomerOrders } from '../services/orderService'

function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    async function fetchData() {
      const [{ data: appts }, { data: ords }] = await Promise.all([
        getCustomerAppointments(user.id),
        getCustomerOrders(user.id),
      ])
      setAppointments(appts || [])
      setOrders(ords || [])
      setLoading(false)
    }
    fetchData()
  }, [user])

  if (authLoading) return <p className="text-on-surface p-8 text-center">Loading...</p>

  if (!user) {
    return (
      <div className="px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-on-surface mb-4">Please Log In</h1>
        <p className="font-body text-on-surface-variant mb-8">
          Log in to view your appointments and orders.
        </p>
        <Link
          to="/login"
          className="inline-block bg-primary text-on-primary font-body font-semibold uppercase px-8 py-3 rounded-lg"
        >
          Log In
        </Link>
      </div>
    )
  }

  const now = new Date().toISOString().split('T')[0]
  const upcoming = appointments.filter((a) => a.appointment_date >= now && a.status === 'CONFIRMED')
  const past = appointments.filter((a) => a.appointment_date < now || a.status !== 'CONFIRMED')

  return (
    <div className="px-6 py-20 max-w-4xl mx-auto">
      <h1 className="font-display text-4xl text-primary mb-2">My Dashboard</h1>
      <p className="font-body text-on-surface-variant mb-12">{user.email}</p>

      {loading ? (
        <p className="text-on-surface-variant">Loading your data...</p>
      ) : (
        <>
          <h2 className="font-display text-2xl text-on-surface mb-6">Upcoming Appointments</h2>
          {upcoming.length === 0 ? (
            <p className="font-body text-on-surface-variant mb-12">No upcoming appointments.</p>
          ) : (
            <div className="space-y-4 mb-12">
              {upcoming.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-surface-dim border border-surface-bright rounded-xl p-6 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-display text-lg text-on-surface">{appt.services?.name}</h3>
                    <p className="font-body text-on-surface-variant text-sm">
                      {appt.barbers?.name || 'Any Available'} — {appt.appointment_date} at {appt.start_time?.slice(0, 5)}
                    </p>
                  </div>
                  <span className="font-body text-primary text-xs uppercase px-3 py-1 border border-primary rounded-full">
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          <h2 className="font-display text-2xl text-on-surface mb-6">Past Appointments</h2>
          {past.length === 0 ? (
            <p className="font-body text-on-surface-variant mb-12">No past appointments.</p>
          ) : (
            <div className="space-y-4 mb-12">
              {past.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-surface-dim border border-surface-bright rounded-xl p-6 flex justify-between items-center opacity-70"
                >
                  <div>
                    <h3 className="font-display text-lg text-on-surface">{appt.services?.name}</h3>
                    <p className="font-body text-on-surface-variant text-sm">
                      {appt.barbers?.name || 'Any Available'} — {appt.appointment_date}
                    </p>
                  </div>
                  <span className="font-body text-on-surface-variant text-xs uppercase">
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          <h2 className="font-display text-2xl text-on-surface mb-6">Orders</h2>
          {orders.length === 0 ? (
            <p className="font-body text-on-surface-variant">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-surface-dim border border-surface-bright rounded-xl p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-display text-lg text-on-surface">{order.order_number}</h3>
                    <span className="font-body text-primary text-xs uppercase px-3 py-1 border border-primary rounded-full">
                      {order.order_status}
                    </span>
                  </div>
                  <p className="font-body text-on-surface-variant text-sm mb-2">
                    {order.order_items?.map((item) => item.products?.name).join(', ')}
                  </p>
                  <p className="font-display text-primary">R{order.total}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Dashboard