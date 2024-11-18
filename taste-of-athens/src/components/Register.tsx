"use client"; 


import React, { useState } from 'react';
import styles from './Signin.module.css'; 
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
   <div className = {styles.signinPage}>
    <Header />
     <div className={styles.signinContainer}>
      <h1 >Register</h1>
      <form className={styles.signinForm}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
             <FaUser className = {styles.userIcon} size = {30} />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
           <FaLock className = {styles.lockIcon} size = {30} />
        </div> 
        <div>
          <label> Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
            <FaLock className = {styles.lockIcon} size = {30} />
        </div>  
        <button type="submit">Register</button>
        <p className = {styles.paralink}>Already have an account? <Link to="/signin" className={styles.links}>Sign In Now!</Link></p>
      </form>
      <div>
      
      
      </div>
    </div>
   </div>
  );
};

export default Register;