"use client"; 


import React, { useState } from 'react';
import styles from './Signin.module.css'; 
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  //Create new user code
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    // only submit if user has entered a username and password and passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match");
    }
    if (username == '' && password == '') {
      alert('Please enter a username and password');
    }
        // create new user object
        const newUser = {
            username: username,
            password: password
        };
  
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
  
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
  
            setUsername(''); // reset username
            setPassword(''); // reset password
  
            navigate('/');
        } catch (error) {
            console.error('Error in Signup!', error);
        }
  };


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
        <button type="submit" onClick={handleSubmit}>Register</button>
        <p className = {styles.paralink}>Already have an account? <Link to="/signin" className={styles.links}>Sign In Now!</Link></p>
      </form>
      <div>
      
      
      </div>
    </div>
   </div>
  );
};

export default Register;