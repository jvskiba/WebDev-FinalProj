"use client";


import React, { useState } from 'react';
import styles from './Signin.module.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className={styles.signinPage}>
      <Header />
      <div className={styles.signinContainer}>
        <h1 >Sign In</h1>
        <form className={styles.signinForm}>
          <div>
            <label>Username:</label>
            <input
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className={styles.lockIcon} size={30} />
            <Link to="/forgotpassword" className={styles.links}> Forgot Password?</Link>
          </div>
          <button type="submit">Sign In</button>
          <p className={styles.paralink}>Don't have an account? <Link to="/register" className={styles.links}>Register Now!</Link></p>
        </form>
        <div>


        </div>
      </div>
    </div>
  );
};

export default Signin;