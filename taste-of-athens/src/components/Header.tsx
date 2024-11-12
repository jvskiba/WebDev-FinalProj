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
         <div className = {styles.logoContainer}>
          <img src ="/images/logo.png" alt = "logo" className = {styles.logo}/>
        </div> 

   
        <ul className={styles.navList}>
          <li>
            <Link className={styles.navLink} href="/">Home</Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/booktable">Book Table</Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/list">Restaurants</Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/signin">Sign In</Link>
          </li>
          <div className={styles.searchContainer}>
        <input 
          type="text" 
          className={styles.searchInput} 
          value={searchTerm} 
          onChange={handleSearchChange} 
          placeholder="Search" 
        />
      </div>
       </ul>
        
      </nav>
    </header>
  );
};

export default Header;