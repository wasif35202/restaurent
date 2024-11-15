// app/admin/layout.tsx
import React from 'react';
import Link from 'next/link';
import Wrapper from '@/Components/Wrapper';

export const metadata = {
  title: 'Admin Panel',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {/* Navbar */}
      <Wrapper className="flex items-center justify-between bg-gray-800 px-8 py-4 text-white">
        <div className="text-xl font-bold">Admin Panel</div>
        <div className="flex space-x-4">
          <Link href="/admin/addproduct" className="hover:underline">
            Add Product
          </Link>
          <Link href="/admin/users" className="hover:underline">
            Users
          </Link>
          <Link href="/admin/orders" className="hover:underline">
            Orders
          </Link>
        </div>
      </Wrapper>

      {children}
    </div>
  );
}
