"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Reviews from '@/components/Reviews';

const ReviewsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  if (!name) {
    return <p>Restaurant not specified.</p>;
  }

  return <Reviews restaurantName={name} />;
};

export default ReviewsPage;
