# JSHOPPING

## Project Summary

JShopping is an innovative e-commerce platform designed to offer a seamless shopping experience. Users can browse through a wide range of products across various categories on the homepage. With an intuitive search functionality, finding specific items or exploring different product categories is effortless.

## Technologies Used

* **Next.js 15+** (App Router with Server Actions) - Full-stack framework handling both frontend UI and backend API logic
* **Better Auth** - Modern authentication library with email/password and OAuth support
* **Neon** (Serverless Postgres) - Database hosting with automatic scaling
* **Drizzle ORM** - Type-safe database query builder
* **shadcn/ui + Tailwind CSS** - Pre-built UI components and utility-first CSS
* **TypeScript** - Type-safe JavaScript
* **Zod** - Schema validation for forms
* **React Hook Form** - Form state management
* **Stripe** - Payment processing integration (pending)
* **Next.js PWA** - Progressive Web App support (pending)
* **Render** - Deployment platform

## Features

### ✅ Implemented
1. **Authentication System**
   - Email/password registration and login with validation
   - Google OAuth integration
   - Protected routes (checkout, orders)
   - User session management
   - User menu with avatar (Google profile or generated)
   - Logout with loading state

2. **UI/UX**
   - Responsive design for mobile, tablet, and desktop
   - Light/dark mode theme switcher
   - Homepage with hero, categories, and products
   - Product catalog with search and filtering
   - Category pages with dynamic routing
   - Product details with image gallery
   - Shopping cart UI
   - Loading states and skeleton screens

3. **Database**
   - Drizzle ORM setup with Neon Postgres
   - User authentication tables (users, sessions, accounts, verification)
   - Mock data for products and categories

### 🚧 Pending Implementation
- Shopping cart functionality (add/remove items, update quantities)
- Stripe payment integration
- Order management and history
- Stock validation
- Search functionality
- PWA features

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
GOOGLE_CLIENT_ID='your_google_oauth_client_id'
GOOGLE_CLIENT_SECRET='your_google_oauth_client_secret'
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY='your_stripe_publishable_key'
STRIPE_SECRET_KEY='your_stripe_secret_key'
NEXT_PUBLIC_APP_URL='http://localhost:3000'
```

4. Generate and push database schema:
```bash
bunx drizzle-kit push
```

5. Start the development server:
```bash
npm run dev
# or
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

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
│   ├── app/
│   │   ├── (auth)/       # Authentication pages (login, signup)
│   │   └── (main)/       # Main app pages with header/footer
│   ├── components/
│   │   ├── auth/         # Auth forms and components
│   │   ├── layout/       # Header, Footer, Logo
│   │   ├── ui/           # shadcn/ui components
│   │   └── user-menu.tsx # User dropdown menu
│   ├── lib/
│   │   ├── auth.ts       # Better Auth configuration
│   │   ├── auth-client.ts # Client-side auth
│   │   └── auth-utils.ts  # Route protection utilities
│   ├── db/
│   │   ├── schema.ts     # Database schema (auth tables)
│   │   └── index.ts      # Drizzle client
│   ├── data/             # Mock data (categories, products)
│   ├── features/         # Feature-specific components
│   └── constants/        # App constants
├── public/               # Static assets
└── package.json
```

## License

MIT License

## GitHub Repository

[https://github.com/juliettengum/J-Shopping](https://github.com/juliettengum/J-Shopping)

## Deployment URL

Coming soon...
