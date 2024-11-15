'use client';
import Wrapper from '@/Components/Wrapper';
import { useCartStore } from '@/utils/store';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const CartPage = () => {
  const { data: session } = useSession();
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();

  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const res = await fetch('http://localhost:3000/orders/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: totalPrice,
          products,
          status: 'Not Paid',
          userEmail: session?.user?.email,
        }),
      });
      const data = await res.json();
      router.push(`/payment/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper className="flex flex-col">
      <div className="mb-5 max-h-[80vw] overflow-auto">
        <table className="w-full border-collapse border border-gray-200 bg-white bg-opacity-30 text-center text-sm shadow-lg backdrop-blur-lg">
          <thead className="bg-gray-100 text-xl">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Price</th>
              <th className="p-4">Total</th>
              <th className="p-4">Option</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="flex flex-wrap items-center gap-4 p-4">
                  {item.img && (
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="rounded"
                    />
                  )}
                  <p>{item.title}</p>
                </td>
                <td className="p-4">{item.quantity}</td>
                <td className="p-4 font-bold">
                  {new Intl.NumberFormat('en-PK', {
                    style: 'currency',
                    currency: 'PKR',
                  }).format(item.price)}
                </td>
                <td className="p-4 font-bold">
                  {new Intl.NumberFormat('en-PK', {
                    style: 'currency',
                    currency: 'PKR',
                  }).format(item.price * item.quantity)}
                </td>
                <td className="p-4">{item.optionTitle}</td>
                <td className="p-4">
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            <tr className="text-xl">
              <td className="flex items-center gap-4 p-4 font-bold">Total</td>
              <td className="p-4 font-bold">{totalItems}</td>
              <td className="p-4 text-center font-bold">-</td>
              <td className="p-4 font-bold">
                {new Intl.NumberFormat('en-PK', {
                  style: 'currency',
                  currency: 'PKR',
                }).format(totalPrice)}
              </td>
              <td className="p-4 text-center font-bold">-</td>
              <td className="p-4 text-center font-bold">-</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PAYMENT SUMMARY */}
      <div className="overflow-auto rounded-lg border border-gray-200 bg-white bg-opacity-30 text-xl shadow-lg backdrop-blur-lg">
        <table className="w-full border-collapse text-left">
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="p-4">Subtotal ({totalItems} items)</td>
              <td className="p-4 text-right">
                {new Intl.NumberFormat('en-PK', {
                  style: 'currency',
                  currency: 'PKR',
                }).format(totalPrice)}
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-4">Service Cost</td>
              <td className="p-4 text-right">$0.00</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-4">Delivery Cost</td>
              <td className="p-4 text-right text-green-500">FREE!</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <hr className="my-2" />
              </td>
            </tr>
            <tr className="font-bold">
              <td className="p-4">TOTAL (INCL. VAT)</td>
              <td className="p-4 text-right">
                {new Intl.NumberFormat('en-PK', {
                  style: 'currency',
                  currency: 'PKR',
                }).format(totalPrice)}
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="mt-4 w-full rounded bg-blue-600 p-2 text-3xl text-white hover:bg-blue-700"
          onClick={handleCheckout}
        >
          CHECKOUT
        </button>
      </div>
    </Wrapper>
  );
};

export default CartPage;
