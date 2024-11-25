"use client"; 

import Image from 'next/image';
import React, { useState } from 'react'; 
import styles from './Header.module.css'; 
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { doLogout } from '../userSignIn';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState(''); 

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); 
  };

  // Function to determine text color based on the current route
  const getTextColor = (path: string) => {
    switch (path) {
      case '/':
        return styles.light;
      case '/signin':
        return styles.light;
      case '/signup':
        return styles.light;
      case '/register':
        return styles.light;
      case '/comingSoon':
          return styles.light;
      default:
        return styles.dark;
    }
  };

  const pathname = usePathname();
  const btnClass = getTextColor(pathname);
  const router = useRouter()
  const handleLinkPress = (path: string) => {
    router.push(path);
  }

  const { data: session } = useSession();

  return (
    <header className={styles.header}>
        <Image src="/images/logo.png" alt='Taste of Athens' width={100} height={100}
                className={styles.logo}/>
        <div className={styles.navList}>
          <button className={`${styles.button} ${btnClass}`} onClick={() => handleLinkPress('/')}>Home</button>
          <button className={`${styles.button} ${btnClass}`} onClick={() => handleLinkPress('/resturants')}>Restaurants</button>
          {!session ? <button className={`${styles.button} ${btnClass}`} onClick={() => handleLinkPress('/signin')}>Sign In</button>
            : <button className={`${styles.button} ${btnClass}`} onClick={doLogout}>Logout</button>}
          {!session ? <button className={`${styles.button} ${btnClass}`} onClick={() => handleLinkPress('/signup')}>Sign Up</button>
            : <button className={`${styles.button} ${btnClass} ${styles.greeting}`}>Welcome, {session.user.name}</button>}
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