export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidSAPhone(phone) {
  const cleaned = phone.replace(/\s|-/g, '')
  return /^(\+27|0)[6-8][0-9]{8}$/.test(cleaned)
}

export function isValidPostalCode(code) {
  return /^[0-9]{4}$/.test(code.trim())
}