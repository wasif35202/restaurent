import Image from 'next/image';
import { Product } from '@/types/dbTypesClient';
import Link from 'next/link';
import Wrapper from '@/Components/Wrapper';

const getData = async () => {
  const res = await fetch('http://localhost:3000/product/api/featured', {
    cache: 'no-store',
  });

  if (!res.ok) {
    const servererror = await res.json();
    throw new Error(servererror.message || 'Something went wrong!');
  }

  return res.json();
};
const Featured = async () => {
  const data: Product[] = await getData();
  return (
    <Wrapper className="flex flex-wrap justify-between gap-y-10">
      {data.map((product, index) => (
        <Link
          href={`/product/${product.id}`}
          key={index}
          className="flex flex-col items-center gap-5 border border-gray-200 bg-white bg-opacity-30 p-5 shadow-lg backdrop-blur-lg sm:w-[48%] md:w-[32%]"
        >
          <div className="w-[70%]">
            <Image
              src={product.img || '/default-image.jpg'}
              alt={product.title}
              width={1000}
              height={1000}
              className=""
            />
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
    </Wrapper>
  );
};

export default Featured; // Ensure this line is at the end of the component definition
