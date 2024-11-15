'use client';
import Wrapper from '@/Components/Wrapper';

import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect, ChangeEvent, useMemo } from 'react';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import { Product } from '@/types/dbTypesClient';

const AllProductsPage = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'Low to High' | 'High to Low'>(
    'Low to High'
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 6;

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('http://localhost:3000/product/api/all', {
        cache: 'no-store',
      });

      if (!res.ok) {
        const servererror = await res.json();
        throw new Error(servererror.message || 'Something went wrong!');
      }
      setAllProducts(await res.json());
    };

    getData();
  }, []);

  const handleSearchChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, 300);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'Low to High' | 'High to Low');
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || product.catSlug === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allProducts, searchTerm, selectedCategory]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      return sortOrder === 'Low to High'
        ? a.price - b.price
        : b.price - a.price;
    });
  }, [filteredProducts, sortOrder]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const currentProducts = useMemo(() => {
    return sortedProducts.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    );
  }, [sortedProducts, currentPage, productsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Wrapper className="">
      <div className="flex flex-wrap items-center gap-10 border border-gray-200 bg-white bg-opacity-30 p-5 shadow-lg backdrop-blur-lg">
        <form className="flex items-center bg-gray-100 p-1">
          <input
            className="bg-transparent p-1 focus:outline-none"
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
          />
          <button type="button" className="p-2">
            <FaSearch />
          </button>
        </form>

        <label className="flex items-center justify-center gap-2">
          <div className="font-medium text-gray-700">Category</div>
          <div className="">
            <select
              name="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border border-gray-300 bg-white p-2 font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="all">All</option>
              <option value="pizzas">Pizza</option>
              <option value="burgers">Burger</option>
              <option value="pastas">Pasta</option>
            </select>
          </div>
        </label>
        <div className="flex items-center justify-center gap-2">
          <div className="font-medium text-gray-700">Price</div>
          <div>
            <select
              name="Sort"
              value={sortOrder}
              onChange={handleSortChange}
              className="border border-gray-300 bg-white p-2 font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="Low to High">Low to High</option>
              <option value="High to Low">High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap justify-between gap-y-10">
        {currentProducts.map(product => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="flex flex-col items-center gap-5 border border-gray-200 bg-white bg-opacity-30 p-5 shadow-lg backdrop-blur-lg sm:w-[48%] md:w-[32%] lg:w-[23%]"
          >
            <div className="w-[70%]">
              {product.img && (
                <Image
                  src={product.img}
                  alt={product.title}
                  width={1000}
                  height={1000}
                  placeholder="blur"
                  blurDataURL="/placeholder.png"
                />
              )}
            </div>
            <div className="flex flex-col items-start">
              <h1 className="mb-2 bg-white bg-opacity-30 p-1 shadow-lg backdrop-blur-lg">
                {product.title}
              </h1>

              <div className="mb-2 h-24 overflow-auto">
                <p>{product.desc}</p>
              </div>

              <h1 className="bg-white bg-opacity-30 p-1 shadow-lg backdrop-blur-lg">
                {new Intl.NumberFormat('en-PK', {
                  style: 'currency',
                  currency: 'PKR',
                }).format(product.price)}
              </h1>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap justify-center border border-gray-200 bg-white bg-opacity-30 p-5 shadow-lg backdrop-blur-lg">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-2 rounded border px-4 py-2 ${
              currentPage === index + 1
                ? 'bg-yellow-300 text-white'
                : 'bg-white text-black hover:bg-yellow-500'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </Wrapper>
  );
};

export default AllProductsPage;
