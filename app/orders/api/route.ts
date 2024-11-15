import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/utils';
import { auth } from '@/auth'; // Adjust the path as needed

export const GET = async () => {
  try {
    // Retrieve user session
    const session = await auth();

    let orders;

    if (session?.user?.email) {
      // If user is logged in, fetch orders specific to that user
      orders = await prisma.order.findMany({
        where: {
          userEmail: session.user.email,
        },
      });
    } 

    if (!orders || orders.length === 0) {
      return NextResponse.json(
        { message: 'Orders not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve orders.' },
      { status: 500 }
    );
  }
};


export const POST = async (req:NextRequest) => {


  try {
    const body=await req.json();
    const order= await prisma.order.create({
      data: body,
    });
    console.log('order', order)


    if (!order) {
      return NextResponse.json(
        { message: 'Orders cant be created.' },
        { status: 404 }
      );
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json(
      { message: 'Failed to create orders.' },
      { status: 500 }
    );
  }
};


