'use client';
import { useState } from 'react';
import Image from 'next/image';
import { BsCart4 } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { RiMenuLine } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import Link from 'next/link';
import { Signout } from '@/server-actions/auth/Signout';
import { useSession } from 'next-auth/react';
import Wrapper from '@/Components/Wrapper';

const Navbar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <Wrapper className="relative z-30 flex items-center gap-10 border border-gray-200 bg-white bg-opacity-30 shadow-lg backdrop-blur-lg lg:flex-wrap">
      <div className="w-20">
        <Image src="/logo.jpg" alt="" width={683} height={410} />
      </div>
      <ul className="hidden flex-1 flex-wrap items-center justify-start gap-5 lg:flex lg:text-2xl">
        <Link href="/">
          <li className="cursor-pointer">HOME</li>
        </Link>

        <Link href="/product/all">
          <li className="cursor-pointer">MENU</li>
        </Link>
        <Link href="/cart">
          <li className="flex cursor-pointer items-center gap-1">
            CART
            <BsCart4 />
          </li>
        </Link>
        <Link href="/orders">
          <li className="cursor-pointer">ORDERS</li>
        </Link>

        {session?.user.isAdmin && (
          <Link href="/admin/addproduct">
            <li className="cursor-pointer">ADMIN</li>
          </Link>
        )}
        {session ? (
          <form action={Signout}>
            <button type="submit" className="cursor-pointer">
              LOGOUT
            </button>
          </form>
        ) : (
          <Link href="/login">
            <li className="cursor-pointer">LOGIN</li>
          </Link>
        )}
      </ul>
      <form className="flex items-center bg-gray-100 p-1">
        <input
          className="bg-transparent p-1 focus:outline-none"
          type="text"
          placeholder="Search"
        />
        <button className="p-2">
          <FaSearch />{' '}
        </button>
      </form>
      {/* Mobile */}
      <div className="ml-auto flex items-center justify-center lg:hidden">
        {/* Overlay */}
        <div
          className={`fixed ${open ? 'left-0' : '-left-[105%]'} top-0 z-20 h-screen w-full bg-black/80`}
        ></div>
        {/* Side drawer */}
        <div
          className={`fixed top-0 z-30 flex h-screen w-1/2 min-w-[300px] items-start justify-center bg-white p-5 duration-300 ${open ? 'right-0' : 'right-[-105%]'}`}
        >
          <ul className="flex flex-col items-center gap-5 text-2xl font-bold">
            <li onClick={() => setOpen(false)} className="cursor-pointer">
              <IoMdClose size={50} />
            </li>
            <Link href="/">
              <li className="cursor-pointer">HOME</li>
            </Link>

            <Link href="/product/all">
              <li className="cursor-pointer">MENU</li>
            </Link>
            <Link href="/cart">
              <li className="flex cursor-pointer items-center gap-1">
                CART
                <BsCart4 />
              </li>
            </Link>
            <Link href="/orders">
              <li className="cursor-pointer">ORDERS</li>
            </Link>

            {session?.user.isAdmin && (
              <Link href="/admin/addproduct">
                <li className="cursor-pointer">ADMIN</li>
              </Link>
            )}
            {session ? (
              <form action={Signout}>
                <button type="submit" className="cursor-pointer">
                  LOGOUT
                </button>
              </form>
            ) : (
              <Link href="/login">
                <li className="cursor-pointer">LOGIN</li>
              </Link>
            )}
          </ul>
        </div>
        <button onClick={() => setOpen(true)} className="px-2 py-1 text-black">
          <RiMenuLine size={30} />
        </button>
      </div>
    </Wrapper>
  );
};

export default Navbar;
