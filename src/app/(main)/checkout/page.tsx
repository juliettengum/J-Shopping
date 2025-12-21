export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-muted-foreground text-lg">Review your order and complete payment.</p>
          <p className="text-muted-foreground mt-2">You will be redirected to Stripe for secure payment.</p>
          <p className="text-sm text-yellow-600 dark:text-yellow-500 mt-4">⚠️ Protected Route: Login required</p>
        </div>
      </div>
    </div>
  );
}

