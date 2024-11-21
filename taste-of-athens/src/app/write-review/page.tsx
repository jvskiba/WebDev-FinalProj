"use client";


import React from 'react';
import ReviewForm from '@/components/ReviewForm';
import { useSearchParams } from 'next/navigation';

interface RestaurantInfoProps {
    restaurantName: string;
}

const LeaveReview: React.FC<RestaurantInfoProps> = ({ restaurantName }) => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  if (!name) {
    return <p>Restaurant not specified.</p>;
  }
  

  return (
    <ReviewForm restaurantName={name} />
  );
}

export default LeaveReview;