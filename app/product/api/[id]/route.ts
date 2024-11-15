import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/utils';

export const GET = async (request: NextRequest) => {
 
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop(); 


  if (!id) {
    return NextResponse.json(
      { message: 'Product ID is required.' },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    // Check if the product exists
    if (!product) {
      return NextResponse.json(
        { message: 'Product not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve product.' },
      { status: 500 }
    );
  }
};
