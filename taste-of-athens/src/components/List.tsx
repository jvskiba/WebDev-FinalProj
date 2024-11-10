// components/List.tsx
"use client";

import React from 'react';
import styles from './List.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';

interface Restaurant {
  name: string;
  image: string;
}

const restaurantData: Restaurant[] = [
  { name: 'South Kitchen + Bar', image: '/images/south-kitchen.jpg' },
  { name: 'The National', image: '/images/the-national.jpg' },
  { name: 'Hilltop Grille', image: '/images/hilltop-grille.jpg' },
  { name: 'Porterhouse Grill', image: '/images/porterhouse-grill.jpg' },
  { name: 'Flama Brazilian Steak House', image: '/images/flama-brazilian.jpg' },
  { name: 'Clocked', image: '/images/clocked.jpg' },
];

const List: React.FC = () => {
  const router = useRouter();

  const handleLearnMore = (name: string) => {
    router.push(`/info?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>Restaurants in Athens</h1>
      <div className={styles.grid}>
        {restaurantData.map((restaurant, index) => (
          <div key={index} className={styles.card}>
            <Image src={restaurant.image} alt={restaurant.name} className={styles.image} width={200} height={150} />
            <h2>{restaurant.name}</h2>
            <button
              className={styles.button}
              onClick={() => handleLearnMore(restaurant.name)}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
