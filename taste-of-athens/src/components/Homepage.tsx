"use client"; 

import React from 'react';
import { useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import styles from '../components/Homepage.module.css';
import { FaLocationDot } from "react-icons/fa6";

const HomePage = () => {
  const navigate = useNavigate();
  
  const handleSearchClick = () => {
    navigate('/list');
  };

  return (
    <div className={styles.homepage}>
      <Header />
      <h1 className={styles.title}>Restaurants & Ratings in Athens</h1>
      <p className={styles.para}>Find the best restaurants in Athens, Georgia!</p>

      <div className={styles.findRestaurants}>
        <FaLocationDot className={styles.locationIcon} size={30} />
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
