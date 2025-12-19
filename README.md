# JSHOPPING

## Project Summary

JShopping is an innovative e-commerce platform designed to offer a seamless shopping experience. Users can browse through a wide range of products across various categories on the homepage. With an intuitive search functionality, finding specific items or exploring different product categories is effortless.

## Technologies Used

* **Next.js 15+** (App Router with Server Actions) - Full-stack framework handling both frontend UI and backend API logic
* **Neon** (Serverless Postgres) - Database hosting with automatic scaling
* **Drizzle ORM** - Type-safe database query builder
* **shadcn/ui + Tailwind CSS** - Pre-built UI components and utility-first CSS
* **TypeScript** - Type-safe JavaScript
* **Stripe** - Payment processing integration
* **Next.js PWA** - Progressive Web App support for installable application
* **Render** - Deployment platform

## Features

1. Homepage displays all products and product categories
2. Search products by category
3. View detailed product information
4. Add/remove items to cart from homepage or product details page
5. Modify item quantities in cart
6. User authentication required for checkout
7. Stock validation - cannot exceed available quantity
8. Checkout requires at least one item in cart
9. Stripe payment integration with redirect flow
10. Order history for logged-in users
11. User registration and signup
12. Comprehensive error handling
13. Category filtering with product images and USD pricing
14. Responsive design for mobile and desktop

## Getting Started

### Prerequisites

* Node.js 18+ or Bun
* Neon Postgres database account
* Stripe account for payment processing

### Installation

1. Clone the repository:
```bash
git clone https://github.com/juliettengum/J-Shopping.git
cd J-Shopping
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Create a `.env.local` file in the root directory:
```env
DATABASE_URL='your_neon_postgres_connection_string'
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY='your_stripe_publishable_key'
STRIPE_SECRET_KEY='your_stripe_secret_key'
JWT_SECRET='your_jwt_secret_key'
NEXT_PUBLIC_APP_URL='http://localhost:3000'
```

4. Run database migrations:
```bash
npm run db:push
# or
bun run db:push
```

5. Seed the database (optional):
```bash
npm run db:seed
# or
bun run db:seed
```

6. Start the development server:
```bash
npm run dev
# or
bun dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Stripe Test Cards

For testing payments, use these test card numbers:

**VISA**
* 4242 4242 4242 4242
* 4000 0566 5566 5556

**MASTER CARD**
* 5555 5555 5555 4444
* 2223 0031 2200 3222

Use any future expiration date, any 3-digit CVC, and any postal code.

Source: [Stripe Test Docs](https://stripe.com/docs/testing#cards)

## Deployment

### Deploy to Render

1. Create a new Web Service on [Render](https://render.com/)
2. Connect your GitHub repository
3. Add environment variables:
```
DATABASE_URL='your_neon_postgres_connection_string'
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY='your_stripe_publishable_key'
STRIPE_SECRET_KEY='your_stripe_secret_key'
JWT_SECRET='your_jwt_secret_key'
NEXT_PUBLIC_APP_URL='your_render_app_url'
NODE_ENV=production
```
4. Deploy the application

## Project Structure

```
j-shopping/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── lib/              # Utility functions and configurations
│   ├── db/               # Database schema and queries
│   └── actions/          # Server actions
├── public/               # Static assets
└── package.json
```

## License

MIT License

## GitHub Repository

[https://github.com/juliettengum/J-Shopping](https://github.com/juliettengum/J-Shopping)

## Deployment URL

Coming soon...
