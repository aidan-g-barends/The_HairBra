async function mockPaymentProvider(amount) {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  const cardsThatFail = ['4000000000000002']

  return {
    success: true,
    transactionReference: `MOCK-${Date.now()}`,
    provider: 'mock',
    amount,
  }
}

export async function processPayment(amount, provider = 'mock') {
  if (provider === 'mock') {
    return mockPaymentProvider(amount)
  }

  throw new Error(`Unknown payment provider: ${provider}`)
}