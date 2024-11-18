"use client"; 

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
    console.log(path);
    switch (path) {
      case '/':
        return 'green'; // Home page color
      case '/about':
        return 'blue'; // About page color
      case '/contact':
        return 'red'; // Contact page color
      default:
        return 'black';
    }
  };

  const tColor = getTextColor(location.pathname);
  const navigate = useNavigate();
  const handleLinkPress = (path: string) => {
    navigate(path);
  }

  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.navList}>
        <button className={styles.button} onClick={() => handleLinkPress('/')}>Home</button>
        <button className={styles.button} onClick={() => handleLinkPress('/list')}>Restaurants</button>
        <button className={styles.button} onClick={() => handleLinkPress('/signin')}>Sign In</button>
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            className={styles.searchInput} 
            value={searchTerm} 
            onChange={handleSearchChange} 
            color={tColor}
            placeholder="Search" 
          />
        </div>
        </div>    
      </nav>
    </header>
  );
};

export default Header;