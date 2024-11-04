// app/info/page.tsx
"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Info from '../../components/Info';

const InfoPage: React.FC = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  if (!name) {
    return <p>Restaurant not specified.</p>;
  }

  return <Info restaurantName={name} />;
};

export default InfoPage;
