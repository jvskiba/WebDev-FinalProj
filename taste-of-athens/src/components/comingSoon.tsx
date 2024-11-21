"use client"; 

import React from 'react';
import Header from './Header';
import styles from '../components/comingSoon.module.css';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter()

  const handleBtnClick = () => {
    router.push('/');
  };

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.signinContainer}>
        <h1 className={styles.title}>Page Coming Soon!</h1>
        <button className={styles.button} onClick={handleBtnClick}>Home</button>
      </div>
    </div>
  );
};

export default HomePage;
