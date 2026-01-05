# JShopping - Modern E-Commerce Platform

A full-stack, production-ready e-commerce platform built with Next.js, Payload CMS, and Stripe payments.

## 🚀 Tech Stack

- **[Next.js 16.1.1](https://nextjs.org/)** - React framework with App Router & Turbopack
- **[Payload CMS 3.x](https://payloadcms.com/)** - Headless CMS for content management
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database (via Neon/Vercel)
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe ORM for auth tables
- **[Better Auth](https://better-auth.com/)** - Modern authentication library
- **[Stripe](https://stripe.com/)** - Payment processing with webhooks
- **[Vercel Blob](https://vercel.com/docs/storage/vercel-blob)** - Cloud storage for media uploads
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime & package manager

## ✨ Features

### 🎯 Complete E-Commerce Functionality
- ✅ Product catalog with categories
- ✅ Product search and filtering
- ✅ Shopping cart with persistent state
- ✅ Stripe checkout integration
- ✅ Order management and history
- ✅ Order tracking

### 🔐 Authentication & Security
- ✅ Email/password authentication
- ✅ Google OAuth integration
- ✅ Protected routes and sessions
- ✅ Secure user data handling

### 📦 Content Management
- ✅ Payload CMS admin panel (`/admin`)
- ✅ Image uploads with automatic resizing
- ✅ Auto-generated slugs for products/categories
- ✅ Media management with Vercel Blob
- ✅ Restricted admin access

### 💳 Payment Processing
- ✅ Stripe Checkout integration
- ✅ Webhook handling for order creation
- ✅ Payment status tracking
- ✅ Automatic stock updates

### 🎨 UI/UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Light/dark mode theme switcher
- ✅ Loading states and optimistic updates
- ✅ Modern, clean interface

## 📋 Prerequisites

- **Node.js 18+** or **Bun 1.0+**
- **PostgreSQL database** (Neon, Vercel Postgres, etc.)
- **Stripe account** for payments
- **Vercel account** (for Blob storage in production)

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/juliettengum/J-Shopping.git
cd J-Shopping
```

### 2. Install dependencies

```bash
bun install
# or
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# Payload CMS
PAYLOAD_SECRET="your-random-secret-minimum-32-characters"

# Better Auth
BETTER_AUTH_SECRET="your-auth-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Stripe (Test Keys)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # From Stripe CLI or Dashboard

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Vercel Blob (Production only)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..." # Optional for local dev
```

### 4. Set up the database

#### Create auth tables (Drizzle)
```bash
bun run scripts/run-auth-sql.ts
```

#### Initialize Payload CMS tables
```bash
bun run dev
# Payload will automatically create its tables on first run
```

### 5. Create an admin user

```bash
bun run admin:create
```

Default credentials (change in `scripts/create-admin.ts`):
- Email: `admin@jshopping.com`
- Password: `AdminAtJshopping.123`

### 6. Seed the database (optional)

```bash
bun run db:seed
```

This will create:
- 10 product categories with images
- 46 sample products with images
- All images uploaded to Vercel Blob (if token is set)

### 7. Set up Stripe webhooks (local development)

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhooks
```

Copy the webhook signing secret (`whsec_...`) to your `.env.local` file.

### 8. Start the development server

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Production Deployment

### Environment Variables (Production)

Add these to your hosting platform (Vercel, etc.):

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `PAYLOAD_SECRET` | Random secret (32+ chars) | Generate with `openssl rand -base64 32` |
| `BETTER_AUTH_SECRET` | Auth secret key | Random string |
| `BETTER_AUTH_URL` | Production URL | `https://yourdomain.com` |
| `STRIPE_SECRET_KEY` | Live Stripe secret key | `sk_live_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Live Stripe publishable key | `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | `whsec_...` (from Stripe Dashboard) |
| `NEXT_PUBLIC_APP_URL` | Production URL | `https://yourdomain.com` |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token | `vercel_blob_rw_...` |

### Vercel Blob Setup

1. Go to your Vercel project → **Storage** → **Create** → **Blob**
2. Name it (e.g., "jshopping-media")
3. Copy the `BLOB_READ_WRITE_TOKEN`
4. Add it to your environment variables
5. Redeploy

### Stripe Webhook Setup (Production)

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Enter: `https://yourdomain.com/api/stripe/webhooks`
4. Select event: `checkout.session.completed`
5. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 🧪 Testing Stripe Payments

Use these test card numbers:

| Card Type | Number | Details |
|-----------|--------|---------|
| **Visa** | `4242 4242 4242 4242` | Success |
| **Visa (debit)** | `4000 0566 5566 5556` | Success |
| **Mastercard** | `5555 5555 5555 4444` | Success |
| **Mastercard (2-series)** | `2223 0031 2200 3222` | Success |

- Use any **future expiration date**
- Use any **3-digit CVC**
- Use any **postal code**

[More test cards →](https://stripe.com/docs/testing#cards)

## 📁 Project Structure

```
j-shopping/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (app)/             # Main layout (header/footer)
│   │   │   ├── api/           # API routes (auth, Stripe webhooks)
│   │   │   ├── cart/          # Shopping cart page
│   │   │   ├── categories/    # Category pages
│   │   │   ├── checkout/      # Checkout flow
│   │   │   ├── orders/        # Order history
│   │   │   ├── products/      # Product pages
│   │   │   ├── login/         # Login page
│   │   │   └── signup/        # Signup page
│   │   └── admin/             # Payload CMS admin (auto-generated)
│   ├── actions/               # Server actions
│   │   ├── categories.ts      # Category data fetching
│   │   ├── products.ts        # Product data fetching
│   │   └── orders.ts          # Order data fetching
│   ├── collections/           # Payload CMS collections
│   │   ├── Users.ts           # Admin users
│   │   ├── Media.ts           # Media uploads
│   │   ├── Categories.ts      # Product categories
│   │   ├── Products.ts        # Products
│   │   ├── Orders.ts          # Orders
│   │   └── OrderItems.ts      # Order line items
│   ├── components/
│   │   ├── layout/            # Header, Footer, Logo
│   │   ├── ui/                # shadcn/ui components
│   │   └── ...                # Feature components
│   ├── db/
│   │   ├── schema.ts          # Drizzle schema (auth tables)
│   │   ├── seed.ts            # Database seeder
│   │   └── index.ts           # DB client
│   ├── features/              # Feature modules
│   │   ├── shopping-cart/     # Cart functionality
│   │   └── stripe/            # Stripe integration
│   ├── lib/
│   │   ├── auth.ts            # Better Auth config
│   │   ├── auth-client.ts     # Client auth utilities
│   │   ├── stripe.ts          # Stripe client
│   │   ├── payload.ts         # Payload Local API
│   │   └── utils.ts           # Utility functions
│   ├── payload.config.ts      # Payload CMS config
│   └── payload-types.ts       # Generated types
├── scripts/
│   ├── create-admin.ts        # Admin user creation
│   └── ...                    # Other utility scripts
├── public/                    # Static assets
│   └── media/                 # Local media uploads (dev only)
└── package.json
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun run build` | Build for production |
| `bun start` | Start production server |
| `bun run db:seed` | Seed database with sample data |
| `bun run admin:create` | Create admin user for Payload |
| `bun run db:push` | Push Drizzle schema to database |

## 📖 Key Concepts

### Hybrid Database Management

This project uses a **hybrid approach** for database management:

- **Drizzle ORM** manages authentication tables (Better Auth)
  - `user`, `session`, `account`, `verification`
- **Payload CMS** manages e-commerce tables
  - `categories`, `products`, `orders`, `order-items`, `media`, `users` (admin)

This allows Better Auth to handle customer authentication while Payload provides a powerful admin interface for content management.

### Media Storage Strategy

- **Local Development**: Files stored in `public/media/` directory
- **Production**: Files stored in Vercel Blob (cloud storage)
- **Benefits**: 
  - Fast local development
  - Persistent, scalable storage in production
  - Automatic image optimization and resizing

### Stripe Integration

- **Checkout Session**: Server-side creation for security
- **Webhook Handler**: Processes completed payments
- **Idempotency**: Prevents duplicate orders
- **Stock Management**: Automatic inventory updates

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License

MIT License

## 🔗 Links

- **GitHub Repository**: [https://github.com/juliettengum/J-Shopping](https://github.com/juliettengum/J-Shopping)
- **Payload CMS Docs**: [https://payloadcms.com/docs](https://payloadcms.com/docs)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Stripe Docs**: [https://stripe.com/docs](https://stripe.com/docs)

---

**Built with ❤️ using modern web technologies**
