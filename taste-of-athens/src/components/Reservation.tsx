'use client';

import React, { useState } from 'react';
import styles from './Reservation.module.css';
import Header from './Header';

interface RestaurantReservationProps {
  restaurantName: string;
}

interface RestaurantInfo {
  phone: string;
}

const restaurantData: { [key: string]: RestaurantInfo } = {
  'South Kitchen + Bar': {
    phone: '+1 706-395-6125',
  },
  'The National': {
    phone: '+1 706-549-3450',
  },
  'Hilltop Grille': {
    phone: '+1 706-353-7667',
  },
  'Porterhouse Grill': {
    phone: '+1 706-369-0990',
  },
  'Flama Brazilian Steak House': {
    phone: '+1 706-850-8299',
  },
  'Clocked': {
    phone: '+1 706-548-9175',
  },
};

const Reservation: React.FC<RestaurantReservationProps> = ({ restaurantName }) => {
  const [reservationTime, setReservationTime] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const restaurantInfo = restaurantData[restaurantName];

  if (!restaurantInfo) {
    return <p>Restaurant information not found.</p>;
  }

  const handleReservationSubmit = () => {
    if (!reservationTime || !numberOfPeople) {
      alert('Please fill out all fields before submitting.');
      return;
    }
    alert(`Reservation confirmed for ${numberOfPeople} people at ${reservationTime} at ${restaurantName}.`);
  };

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>Make a Reservation at {restaurantName}</h1>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <label className={styles.label}>
          Select Reservation Time:
          <input
            type="datetime-local"
            value={reservationTime}
            onChange={(e) => setReservationTime(e.target.value)}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Number of People:
          <input
            type="number"
            min="1"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            className={styles.input}
          />
        </label>

        <p className={styles.phone}>
          <strong>Restaurant Phone:</strong> <a href={`tel:${restaurantInfo.phone}`}>{restaurantInfo.phone}</a>
        </p>

        <button type="button" className={styles.button} onClick={handleReservationSubmit}>
          Confirm Reservation
        </button>
      </form>
    </div>
  );
};

export default Reservation;
