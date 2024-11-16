import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/utils';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = async (
  req: NextRequest, 
  { params}: { params: Promise<{ id: string }> }
  
) => {
  const { amount } = await req.json();
const  id  = (await params).id

  try {
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
    // Catch errors and return an appropriate message
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
