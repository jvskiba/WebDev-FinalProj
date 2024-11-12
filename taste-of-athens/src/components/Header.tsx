"use client"; 

import Link from 'next/link';
import React, { useState } from 'react'; 
import styles from './Header.module.css'; 

const Header = () => {
  const [searchTerm, setSearchTerm] = useState(''); 

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); 
  };

  return (
    <header className={styles.header}>
      <nav>
         <div className = {styles.logoContainer}>
          <img src ="/images/logo.png" alt = "logo" className = {styles.logo}/>
        </div> 

   
        <ul className={styles.navList}>
          <li>
            <Link className={styles.navLink} href="/home">Home</Link>
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