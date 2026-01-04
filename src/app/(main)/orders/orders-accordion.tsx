"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Package, Calendar, DollarSign } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Order = {
  id: number;
  orderNumber: string;
  totalAmount: string;
  status: string;
  paymentStatus: string;
  shippingAddress: any;
  createdAt: Date;
  items: Array<{
    id: number;
    productName: string;
    productImage: string;
    quantity: number;
    unitPrice: string;
    subtotal: string;
  }>;
};

type OrdersAccordionProps = {
  orders: Order[];
  customerName: string;
  customerEmail: string;
};

export function OrdersAccordion({
  orders,
  customerName,
  customerEmail,
}: OrdersAccordionProps) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {orders.map((order, index) => (
        <Card key={order.id} className="overflow-hidden shadow-none">
          <AccordionItem value={order.orderNumber} className="border-none">
            <AccordionTrigger className="hover:no-underline px-6 py-4 hover:bg-muted/50">
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center gap-6 text-left">
                  <div>
                    <p className="font-semibold text-base">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right min-w-[100px]">
                    <p className="text-sm font-medium mb-1">Total</p>
                    <p className="font-semibold text-lg">
                      ${parseFloat(order.totalAmount).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right min-w-[100px]">
                    <p className="text-sm font-medium mb-1">Status</p>
                    <Badge
                      variant={
                        order.status === "delivered"
                          ? "default"
                          : order.status === "processing"
                          ? "secondary"
                          : "outline"
                      }
                      className="capitalize"
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-right min-w-[60px]">
                    <p className="text-sm font-medium mb-1">Items</p>
                    <p className="font-semibold">{order.items.length}</p>
                  </div>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-6 pb-6">
              <OrderDetails
                order={order}
                customerName={customerName}
                customerEmail={customerEmail}
              />
            </AccordionContent>
          </AccordionItem>
        </Card>
      ))}
    </Accordion>
  );
}

function OrderDetails({
  order,
  customerName,
  customerEmail,
}: {
  order: Order;
  customerName: string;
  customerEmail: string;
}) {
  const [showAllItems, setShowAllItems] = useState(false);
  const ITEMS_LIMIT = 8;
  const hasMoreItems = order.items.length > ITEMS_LIMIT;
  const displayedItems = showAllItems
    ? order.items
    : order.items.slice(0, ITEMS_LIMIT);

  const shippingAddress = order.shippingAddress
    ? `${order.shippingAddress.line1}${
        order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""
      }, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${
        order.shippingAddress.postalCode
      }, ${order.shippingAddress.country}`
    : "No address provided";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
      {/* Left Column - Shipping & Payment */}
      <div className="space-y-6">
        <Card className="shadow-none">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Shipping & Billing Info</h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Email Address</p>
                <p className="text-sm">{customerEmail}</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Shipping Address</p>
                <p className="text-sm">{shippingAddress}</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Name</p>
                <p className="text-sm">{customerName}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Payment Method</h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Payment</p>
                <p className="text-sm">Cash On Delivery</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Shipping</p>
                <p className="text-sm">Post Service(1-3 Work Day)</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Note</p>
                <p className="text-sm">Order: {order.orderNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Order Items */}
      <div className="lg:col-span-2">
        <Card className="shadow-none py-2.5">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Order Items</h3>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {displayedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 pb-4 border-b"
                >
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium line-clamp-1">
                      {item.productName}
                    </h4>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span>Size: -</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      ${parseFloat(item.unitPrice).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {hasMoreItems && (
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setShowAllItems(!showAllItems)}
              >
                {showAllItems
                  ? "Show Less"
                  : `Show All ${order.items.length} Items`}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
