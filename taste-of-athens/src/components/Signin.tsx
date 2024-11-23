"use client";

import React, { useState } from 'react';
import styles from './Signin.module.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Header from '../components/Header';
import { doCredentialLogin } from "../userSignIn"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Construct FormData from form
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await doCredentialLogin(formData);
      if (response?.ok) {
        console.log("Login successful!");
        setUsername(''); 
        setPassword('');
        router.push(`/`);
      } else {
        console.error("Login failed:", response?.error);
      }
    } catch (err) {
      console.error("An error occurred during login:", err);
    }
  };

  return (
    <div className={styles.signinPage}>
      <Header />
      <div className={styles.signinContainer}>
        <h1 >Sign In</h1>
        <form className={styles.signinForm} onSubmit={ handleSubmit }>
          <div>
            <label>Username:</label>
            <input
              name='username'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className={styles.userIcon} size={30} />
          </div>
          <div>
            <label>Password:</label>
            <input
              name='password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className={styles.lockIcon} size={30} />
            <Link href="/comingSoon" className={styles.links}> Forgot Password?</Link>
          </div>
          <button type="submit" >Sign In</button>
          <p className={styles.paralink}>Don't have an account? <Link href="/signup" className={styles.links}>Sign Up Now!</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signin;