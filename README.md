# M50 Dublin — Next.js (English-only)

Next.js 14 + Tailwind scaffold with minimal UI components. Stripe is a placeholder.
## Quick start
```bash
npm install
npm run dev
```
Open http://localhost:3000

### Stripe (placeholder)
- The payment button triggers a placeholder alert.
- To enable Stripe Checkout, add an API route (`app/api/checkout/route.ts`) and call Stripe's SDK.
- Add `STRIPE_SECRET_KEY` & `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in `.env.local`.
# smok
