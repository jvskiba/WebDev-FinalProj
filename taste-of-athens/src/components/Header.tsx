"use client"; 

import Image from 'next/image';
import React, { useState } from 'react'; 
import styles from './Header.module.css'; 
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState(''); 

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); 
  };

  //const location = useLocation();

  // Function to determine text color based on the current route
  const getTextColor = (path: string) => {
    switch (path) {
      case '/':
        return styles.light;
      case '/signin':
        return styles.light;
      case '/register':
        return styles.light;
      case '/resturants':
        return styles.dark;
      default:
        return styles.dark;
    }
  };

  const btnClass = getTextColor(location.pathname);
  const navigate = useNavigate();
  const handleLinkPress = (path: string) => {
    navigate(path);
  }

  return (
    <header className={styles.header}>
        <Image src="/images/logo.png" alt='Taste of Athens' width={150} height={500}
                className={styles.logo}/>
        <div className={styles.navList}>
          <button className={`${styles.button} ${btnClass}`} onClick={() => handleLinkPress('/')}>Home</button>
          <button className={`${styles.button} ${btnClass}`} onClick={() => handleLinkPress('/list')}>Restaurants</button>
          <button className={`${styles.button} ${btnClass}`} onClick={() => handleLinkPress('/signin')}>Sign In</button>
          <div className={styles.searchContainer}>
            <input 
              type="text" 
              className={`${styles.searchInput} ${btnClass}`}
              value={searchTerm} 
              onChange={handleSearchChange} 
              placeholder="Search" 
            />
          </div>
        </div>    
    </header>
  );
};

export default Header;