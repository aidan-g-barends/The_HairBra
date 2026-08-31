# The Hairbra — Barbershop Booking & E-Commerce Platform

A full-stack demo application for a modern barbershop, built with React, Vite, Tailwind CSS, and Supabase. Customers can browse barbers, book appointments with real-time availability checking, shop for grooming products, and pay securely via Stripe — all without needing to create an account.

## Features

### Booking
- Multi-step appointment booking flow (service → barber → date/time → guest details → summary → payment)
- Real-time availability checking with double-booking prevention (enforced at the database level)
- Automatic filtering of past time slots for same-day bookings
- Deposit-based payment via Stripe (test mode)
- Guest checkout — no account required

### E-Commerce
- Product catalog with categories and stock status
- Shopping cart (session-based)
- Multi-step checkout (details → address → delivery method → payment)
- Real-time stock reduction on successful order
- South African phone number, email, and postal code validation

### Content
- Barber directory with individual profile pages
- About page with shop story, owner bio, and location
- Public review submission

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Supabase (PostgreSQL, Row Level Security, Edge Functions)
- **Payments:** Stripe (test mode) via a Supabase Edge Function
- **Deployment:** Vercel

## Architecture Notes

- The app is intentionally **guest-only** — no authentication system. This was a deliberate design decision to keep the booking and checkout flows frictionless, matching how most real-world local business booking sites work.
- Payment processing goes through a Supabase Edge Function, keeping the Stripe secret key server-side and out of the frontend bundle entirely.
- Row Level Security policies are applied to every table; guest-facing tables (appointments, orders, reviews) use permissive policies suited to a no-login demo, with notes in the codebase on what a production version would tighten further.

## Known Limitations / Future Improvements

- **Scheduled reminders:** Barber/customer reminder notifications (24hr, 30min, 15min before an appointment) are not yet implemented — would require Supabase scheduled functions (`pg_cron` or cron-triggered Edge Functions).
- **Real email/WhatsApp delivery:** Notifications are currently stored in the database and simulated, rather than actually sent — would require a service like Resend (email) or Twilio (WhatsApp).
- **"Any Available Barber" bookings** don't yet cross-check every barber's calendar — they show all slots without filtering based on collective availability.

## Local Setup

1. Clone the repo
2. `npm install`
3. Create a `.env` file with:

4. `npm run dev`

## Author

Built by Aidan Barends as a full-stack portfolio project.