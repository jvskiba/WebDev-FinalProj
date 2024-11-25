"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Reservation from '@/components/Reservation';

const ReservationPage: React.FC = () => {
  const searchParams = useSearchParams();
  const restaurantName = searchParams.get('name');

  if (!restaurantName) {
    return <p>Restaurant not specified.</p>;
  }

  return <Reservation restaurantName={restaurantName} />;
};

export default ReservationPage;
