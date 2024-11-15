import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server'; // Using NextRequest and NextResponse
import prisma from '@/utils/utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const { amount } = await req.json(); // Read the request body
  const { id } = context.params;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
    });

    await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        intent_Id: paymentIntent.id,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id, // add this to pass ID to frontend if needed
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    // Return error response
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
