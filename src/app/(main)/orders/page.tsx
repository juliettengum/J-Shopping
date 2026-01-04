import Link from "next/link";
import { Package } from "lucide-react";
import { requireAuth } from "@/lib/auth-utils";
import { getOrders, getOrderByNumber } from "@/actions/orders";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OrdersAccordion } from "./orders-accordion";

const OrdersPage = async () => {
  const session = await requireAuth();
  const orders = await getOrders();

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Package className="size-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              Start shopping to see your orders here
            </p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Fetch full details for all orders
  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const orderWithItems = await getOrderByNumber(order.orderNumber);
      return orderWithItems;
    })
  );

  const validOrders = ordersWithItems.filter((order) => order !== null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground mt-2">
          View and manage your order history
        </p>
      </div>

      <OrdersAccordion
        orders={validOrders}
        customerName={session.user.name}
        customerEmail={session.user.email}
      />
    </div>
  );
};

export default OrdersPage;
