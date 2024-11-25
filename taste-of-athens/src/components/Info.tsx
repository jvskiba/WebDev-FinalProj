"use client";

// components/Info.tsx
import React from 'react';
import styles from './Info.module.css';
import Image from 'next/image';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';

interface RestaurantInfoProps {
  restaurantName: keyof typeof restaurantData;
}

interface Hour {
  label: string;
  description?: string;
  time: string;
}

const restaurantData = {
  'South Kitchen + Bar': {
    address: '247 E Washington St, Athens, GA 30601-4532',
    phone: '+1 706-395-6125',
    hours: [
      { label: 'Happy Hour', description: '(1/2 priced select cocktails)', time: '3:00 pm - 6:00 pm Monday through Thursday' },
      { label: 'Dinner', time: '4:00 pm - 10:00 pm Monday through Thursday and Sunday' },
      { label: 'Dinner', time: '4:00 pm - 11:00 pm Friday and Saturday' },
    ],
    image: '/images/south-kitchen.jpg',
  },
  'The National': {
    address: '232 W Hancock Ave, Athens, GA 30601',
    phone: '+1 706-549-3450',
    hours: [
      { label: 'Lunch', time: '11:30 am - 2:30 pm Monday through Friday' },
      { label: 'Dinner', time: '5:30 pm - 10:00 pm daily' },
    ],
    image: '/images/the-national.jpg',
  },
  'Hilltop Grille': {
    address: '2310 W Broad St, Athens, GA 30606',
    phone: '+1 706-353-7667',
    hours: [
      { label: 'Lunch', time: '11:00 am - 3:00 pm Monday through Friday' },
      { label: 'Dinner', time: '5:00 pm - 10:00 pm daily' },
    ],
    image: '/images/hilltop-grille.jpg',
  },
  'Porterhouse Grill': {
    address: '459 E Broad St, Athens, GA 30601',
    phone: '+1 706-369-0990',
    hours: [
      { label: 'Lunch', time: '11:00 am - 3:00 pm Monday through Friday' },
      { label: 'Dinner', time: '5:00 pm - 10:00 pm daily' },
    ],
    image: '/images/porterhouse-grill.jpg',
  },
  'Flama Brazilian Steak House': {
    address: '1550 Oglethorpe Ave, Athens, GA 30606',
    phone: '+1 706-850-8299',
    hours: [
      { label: 'Lunch', time: '11:00 am - 3:00 pm Monday through Friday' },
      { label: 'Dinner', time: '5:00 pm - 10:00 pm daily' },
    ],
    image: '/images/flama-brazilian.jpg',
  },
  'Clocked': {
    address: '259 W Washington St, Athens, GA 30601',
    phone: '+1 706-548-9175',
    hours: [
      { label: 'Lunch', time: '11:00 am - 3:00 pm Monday through Friday' },
      { label: 'Dinner', time: '5:00 pm - 10:00 pm daily' },
    ],
    image: '/images/clocked.jpg',
  },
  // Add other restaurants as needed
};

const Info: React.FC<RestaurantInfoProps> = ({ restaurantName }) => {
  const router = useRouter();

  const restaurant = restaurantData[restaurantName];

  const handleLeaveReview = (name: string) => {
    router.push(`/write-review?name=${encodeURIComponent(name)}`);
  };

  const handleViewReviews = (name: string) => {
    router.push(`/reviews?name=${encodeURIComponent(name)}`);
  };

  const handleBtnClick = () => {
    router.push('/comingSoon');
  };

  const handleMenu = (name: string) => {
    router.push(`/menu?name=${encodeURIComponent(name)}`);
  };

  const handleReservation = (name: string) => {
    router.push(`/reservation?name=${encodeURIComponent(name)}`);
  };

  if (!restaurant) {
    return <p>Restaurant not found.</p>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.name}>{restaurantName}</h1>
      <p className={styles.address}>{restaurant.address}</p>
      <a href={`tel:${restaurant.phone}`} className={styles.phone}>{restaurant.phone}</a>

      <div className={styles.details}>
        <Image
          src={restaurant.image}
          alt={`${restaurantName} image`}
          className={styles.image}
          width={200}
          height={150}
        />

        <div className={styles.hours}>
          {restaurant.hours.map((hour: Hour, index: number) => (
            <div key={index}>
              <p className={styles.hourLabel}>{hour.label}</p>
              {hour.description && <p className={styles.hourDescription}>{hour.description}</p>}
              <p>{hour.time}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => handleMenu(restaurantName)}>Memu</button>
        <button className={styles.button} onClick={() => handleReservation(restaurantName)}>Reservation</button>
        <button className={styles.button} onClick={() => handleLeaveReview(restaurantName)}>Write Review</button>
        <button className={styles.button} onClick={() => handleViewReviews(restaurantName)}>Reviews & Ratings</button>
      </div>
    </div>
  );
};

export default Info;
