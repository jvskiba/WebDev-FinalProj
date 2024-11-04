"use client"; 

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import styles from '../components/Page.module.css';
//import { FaLocationDot } from "react-icons/f6";
import List from '../components/List';
//<FaLocationDot className={styles.locationIcon} size={30} />

const HomePage = () => {
  const router = useRouter();
  
  const handleSearchClick = () => {
    router.push('/list');
  };

  return (
    <div className={styles.homepage}>
      <Header />
      <h1 className={styles.title}>Restaurants & Ratings in Athens</h1>
      <p className={styles.para}>Find the best restaurants in Athens, Georgia!</p>

      <div className={styles.findRestaurants}>
        <span className={styles.label}>Find Restaurants</span>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleSearchClick}>Search</button>
        <button className={styles.button}>Book Now</button>
      </div>
    </div>
  );
};

export default HomePage;
