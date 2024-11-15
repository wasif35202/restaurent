'use client';

import { Product } from '@/types/dbTypesClient';
import { useCartStore } from '@/utils/store';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';



const Price = ({ singleProduct }: { singleProduct: Product| null }) => {
  const [total, setTotal] = useState(singleProduct ? singleProduct.price : 0);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0); // Start from index 0

  const { addToCart } = useCartStore();

  useEffect(() => {
    if (singleProduct?.options && singleProduct.options.length > 0) {
      setTotal(
        quantity * (singleProduct.price || 0) + (singleProduct.options[selected]?.additionalPrice || 0)
      );
    } else {
      setTotal(quantity * (singleProduct?.price || 0));
    }
  }, [quantity, selected, singleProduct]);

  const handleCart = () => {
    if (singleProduct) {
      addToCart({
        id: singleProduct.id,
        title: singleProduct.title,
        img: singleProduct.img || 'image not found',
        price: total,
        ...(singleProduct.options?.length && {
          optionTitle: singleProduct.options[selected]?.title,
        }),
        quantity: quantity,
      });
      toast.success('Product added to cart');
    }
  };

  if (!singleProduct) {
    return <div>Loading...</div>; // Or any loading state you want
  }

  return (
    <div className="mx-auto flex flex-1 flex-col gap-10 border border-gray-200 bg-white bg-opacity-30 p-5 font-bold shadow-lg backdrop-blur-lg md:text-4xl lg:text-base xl:text-3xl">
      <h1 className="bg-opacity-30 text-center shadow-lg backdrop-blur-lg">
        SELECT
      </h1>

      <div className="flex items-center justify-center gap-2 flex-wrap ">
        {singleProduct.options &&
          singleProduct.options.map((option, index) => (
            <button
              key={option.title}
              className="min-w-[10rem] border-2 border-yellow-400 bg-opacity-30 p-2 shadow-lg backdrop-blur-lg"
              style={{
                background: selected === index ? 'rgb(250 204 21)' : 'white',
                color: selected === index ? 'white' : 'rgb(250 204 21)',
              }}
              onClick={() => setSelected(index)}
            >
              {option.title}
            </button>
          ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex items-center justify-between text-xl">
        <p className="bg-opacity-30 p-3 shadow-lg backdrop-blur-lg">Quantity</p>
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center gap-10 bg-opacity-30 font-bold shadow-lg backdrop-blur-lg">
            <button
              className="p-2"
              onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
            >
              {'-'}
            </button>
            <span>{quantity}</span>
            <button
              className="p-2"
              onClick={() => setQuantity(prev => (prev < 9 ? prev + 1 : 9))}
            >
              {'+'}
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xl">
        <p className="bg-opacity-30 p-2 shadow-lg backdrop-blur-lg">TOTAL:</p>
        <p className="bg-opacity-30 p-2 shadow-lg backdrop-blur-lg">${total}</p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleCart}
          className="min-w-30 bg-yellow-400 p-3 uppercase text-white shadow-lg ring-1 ring-yellow-400 backdrop-blur-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
