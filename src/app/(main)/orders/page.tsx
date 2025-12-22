import { requireAuth } from "@/lib/auth-utils";
import { OrderSummary } from '@/features/order-summary/components/order-summary'

const products = [
  {
    id: 'diorShoes',
    name: 'DIOR KAWS B33',
    category: 'sneaker',
    size: '6',
    quantity: 1,
    price: 120,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/order-summary/image-12.png'
  },
  {
    id: 'riderBag',
    name: 'Mini Rider 2.0 bag',
    category: 'bag',
    size: 'M',
    quantity: 1,
    price: 300,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/order-summary/image-11.png'
  },
  {
    id: 'diorJacket',
    name: 'Dior Oblique Cardigan',
    category: 'jacket',
    size: 'M',
    quantity: 1,
    price: 89,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/order-summary/image-10.png'
  }
]

const OrderSummaryPage = async () => {
  const session = await requireAuth();

  return (
    <OrderSummary
      data={products}
      customerName={session.user.name}
      customerAddress='Street 91, Empire State, 350 Fifth Avenue, New York'
      customerMail={session.user.email}
      customerNote='This durable and portable insulated tumbler will keep your beverages at the perfect temperature for
                  hours.'
    />
  )
}

export default OrderSummaryPage
