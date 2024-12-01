"use client"; 

import React from 'react';
import Header from '../components/Header';
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
        <h1 className={styles.title}>Uh Oh, This page cannot be found.</h1>
        <button className={styles.button} onClick={handleBtnClick}>Home</button>
      </div>
    </div>
  );
};

export default HomePage;
