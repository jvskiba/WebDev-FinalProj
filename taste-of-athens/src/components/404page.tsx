"use client"; 

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import styles from '../components/404page.module.css';
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <Header />
      <h1 className={styles.title}>Page Coming Soon!</h1>
      <button className={styles.button} onClick={handleBtnClick}>Home</button>
    </div>
  );
};

export default HomePage;
