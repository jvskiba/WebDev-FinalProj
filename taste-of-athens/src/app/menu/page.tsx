"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Menu from '@/components/Menu';

const MenuPage: React.FC = () => {
  const searchParams = useSearchParams();
  const restaurantName = searchParams.get('name');

  if (!restaurantName) {
    return <p>Restaurant not specified.</p>;
  }

  return <Menu restaurantName={restaurantName} />;
};

export default MenuPage;
