import Wrapper from '@/Components/Wrapper';
import { Product } from '@/types/dbTypesClient';
import Image from 'next/image';
import Price from '../Price';

const getData = async (id: string): Promise<Product> => {
  const res = await fetch(`http://localhost:3000/product/api/${id}`, {
    cache: 'no-store',
  });

  // Handle server response errors
  if (!res.ok) {
    const serverError = await res.json();
    throw new Error(serverError.message || 'Something went wrong!');
  }

  return res.json();
};

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  // Await params before destructuring
  const { id } = await params;

  const singleProduct: Product = await getData(id);

  return (
    <Wrapper className="mt-5 flex flex-wrap justify-between gap-10 border border-gray-200 bg-white bg-opacity-30 shadow-lg backdrop-blur-lg md:text-4xl xl:text-3xl">
      {/* IMAGE CONTAINER */}
      <div className="mx-auto flex min-w-[45%] flex-1 justify-center bg-opacity-30 p-5 shadow-lg backdrop-blur-lg">
        {singleProduct.img ? (
          <div className="flex w-2/3 flex-col items-center justify-center gap-5">
            <h1 className="font-bold uppercase">{singleProduct.title}</h1>
            <Image
              src={singleProduct.img}
              alt={singleProduct.title}
              height={1000}
              width={1000}
              className="object-cover" // Add object-cover for better image handling
            />
            <p className="">{singleProduct.desc}</p>
          </div>
        ) : (
          <p className="text-gray-500">No image available.</p>
        )}
      </div>

      <Price singleProduct={singleProduct} />
    </Wrapper>
  );
};

export default SingleProductPage;
