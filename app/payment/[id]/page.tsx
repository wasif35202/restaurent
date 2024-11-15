'use client';
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Wrapper from '@/Components/Wrapper';
import { useParams } from 'next/navigation';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PaymentPage() {
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState('');
  const [intentId, setIntentId] = useState('');

  useEffect(() => {
    fetch(`/api/create-payment-intent/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1000 }),
    })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret);
        setIntentId(data.paymentIntentId);
      });
  }, [id]);

  const appearance: { theme: 'stripe' | 'night' | 'flat' } = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Wrapper className="">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm id={intentId} />
        </Elements>
      )}
    </Wrapper>
  );
}
