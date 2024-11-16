import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/utils';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-10-28.acacia', // Use the required version
});


export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { amount } = await req.json();
    const  id  = (await params).id;

    // Validate amount
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Create the payment intent using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
    });

    // Update the order in the database with the payment intent ID
    await prisma.order.update({
      where: { id },
      data: { intent_Id: paymentIntent.id },
    });

    // Return the client secret and payment intent ID
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    // Log the error for debugging purposes
    console.error('Payment Intent Error:', error);

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
