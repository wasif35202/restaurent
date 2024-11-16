import Wrapper from '@/Components/Wrapper';
import { OrderType } from '@/types/dbTypesClient'; // Import OrderType

// Function to fetch orders
const getOrders = async () => {
  const res = await fetch('http://localhost:3000/admin/orders/api', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
};

const OrdersPage = async () => {
  let orders: OrderType[] = [];

  try {
    orders = await getOrders();
  } catch (error) {
    console.error('Failed to load orders:', error);
  }

  return (
    <Wrapper className="bg-gray-50 p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Orders</h1>
      {orders?.map(order => (
        <div key={order.id} className="mb-6 rounded-lg bg-white p-6 shadow">
          <p className="mb-4 text-lg font-semibold text-gray-800">
            <strong>Order ID:</strong> {order.id}
          </p>
          <p className="mb-4 text-sm text-gray-600">
            <strong>Price:</strong>{' '}
            {new Intl.NumberFormat('en-PK', {
              style: 'currency',
              currency: 'PKR',
            }).format(order.price)}
          </p>
          <p className="mb-4 text-sm text-gray-600">
            <strong>Status:</strong> {order.status}
          </p>

          {/* Display Products */}
          <p className="mb-4 text-sm text-gray-600">
            <strong>Products:</strong>{' '}
            {order.products.map((product, index) => (
              <span key={index} className="mr-2">
                {product.title}
              </span>
            ))}
          </p>

          {/* Display Created At Date */}
          <p className="mb-4 text-sm text-gray-600">
            <strong>Created At:</strong>{' '}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>

          {/* Optionally display Intent ID */}
          {order.intent_Id && (
            <p className="mb-4 text-sm text-gray-600">
              <strong>Intent ID:</strong> {order.intent_Id}
            </p>
          )}
        </div>
      ))}
    </Wrapper>
  );
};

export default OrdersPage;
