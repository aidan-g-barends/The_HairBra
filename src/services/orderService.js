import { supabase } from './supabase'

function generateOrderNumber() {
  return `ORD-${Math.floor(10000 + Math.random() * 90000)}`
}

export async function createOrder({
  customerId,
  guestName,
  guestEmail,
  guestPhone,
  items,
  subtotal,
  deliveryFee,
  deliveryMethod,
  shippingAddress,
}) {
  const orderNumber = generateOrderNumber()
  const total = subtotal + deliveryFee

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_id: customerId || null,
      guest_name: guestName || null,
      guest_email: guestEmail || null,
      guest_phone: guestPhone || null,
      order_number: orderNumber,
      subtotal,
      delivery_fee: deliveryFee,
      total,
      delivery_method: deliveryMethod,
      shipping_address: shippingAddress,
      payment_status: 'PENDING',
      order_status: 'PENDING_PAYMENT',
    })
    .select()
    .single()

  if (orderError) return { data: null, error: orderError }

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    unit_price: item.price,
    total: item.price * item.quantity,
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems)

  if (itemsError) return { data: null, error: itemsError }

  return { data: order, error: null }
}

export async function confirmOrderPayment(orderId, paymentReference) {
  const { data, error } = await supabase
    .from('orders')
    .update({
      payment_status: 'PAID',
      order_status: 'ORDER_RECEIVED',
    })
    .eq('id', orderId)
    .select()
    .single()

  return { data, error }
}

export async function reduceStock(items) {
  for (const item of items) {
    const { data: product } = await supabase
      .from('products')
      .select('stock_quantity')
      .eq('id', item.id)
      .single()

    if (product) {
      const { error } = await supabase
        .from('products')
        .update({ stock_quantity: product.stock_quantity - item.quantity })
        .eq('id', item.id)

      if (error) {
        console.error('Failed to reduce stock for product', item.id, error)
      }
    }
  }
}

export async function notifyOwnerOfOrder(orderNumber, total) {
  const { error } = await supabase.from('notifications').insert({
    recipient_type: 'owner',
    recipient_label: 'Shop Owner',
    type: 'new_order',
    title: 'New Product Order',
    message: `Order ${orderNumber} received — total R${total}`,
  })

  return { error }
}