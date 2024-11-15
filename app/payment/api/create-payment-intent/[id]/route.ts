import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server'; // Using NextRequest and NextResponse
import prisma from '@/utils/utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest,  { params }: { params: { id: string } }) {
  const { amount } = await req.json(); // Read the request body
const Params=await params
const {id}=Params
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
    });

    await prisma.order.update({
      where: {
        id:id,
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
}