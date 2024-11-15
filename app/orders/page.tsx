'use client';
import { useQuery } from 'react-query';
import Wrapper from '@/Components/Wrapper';
import LoadingSkeleton from '@/Components/LoadingSkeleton';
import { OrderType } from '@/types/dbTypesClient';
import Image from 'next/image';

export const fetchOrders = async () => {
  const response = await fetch('/orders/api', {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
};

const OrdersPage = () => {
  const {
    data: orders = [],
    error,
    isLoading,
  } = useQuery<OrderType[], Error>(
    'allOrders', // Query key
    fetchOrders // Fetching function from API route
  );

  // Handle loading state
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Handle error state
  if (error) {
    return <div>Error loading orders: {error.message}</div>;
  }

  return (
    <Wrapper className="my-5 overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b px-4 py-2 text-left">Order ID</th>
            <th className="border-b px-4 py-2 text-left">Products</th>
            <th className="border-b px-4 py-2 text-left">Price</th>
            <th className="border-b px-4 py-2 text-left">Created At</th>
            <th className="border-b px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">
                <ul>
                  {order.products.map((product, index) => (
                    <li key={index} className="mb-2">
                      <div>
                        <Image
                          src={product.img}
                          alt={product.title}
                          width={100}
                          height={100}
                          className="mr-2 inline-block h-12 w-12"
                        />
                        <span>{product.title}</span>
                      </div>
                      <div>
                        Option: {product.optionTitle} | Quantity:{' '}
                        {product.quantity} | Price:{' '}
                        {new Intl.NumberFormat('en-PK', {
                          style: 'currency',
                          currency: 'PKR',
                        }).format(product.price)}
                      </div>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2">
                {new Intl.NumberFormat('en-PK', {
                  style: 'currency',
                  currency: 'PKR',
                }).format(order.price)}
              </td>
              <td className="px-4 py-2">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default OrdersPage;
