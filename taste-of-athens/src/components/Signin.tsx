"use client";

import React, { useState } from 'react';
import styles from './Signin.module.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { doCredentialLogin } from "../userSignIn"

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //Create new user code
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Construct FormData from form
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      /*const response = await doCredentialLogin(formData);
      if (response?.ok) {
        console.log("Login successful!");
        // Redirect or handle success logic
      } else {
        console.error("Login failed:", response?.error);
        // Handle login failure (e.g., show an error message)
      }*/
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
          <button type="submit" >Sign In</button>
          <p className={styles.paralink}>Don't have an account? <Link to="/register" className={styles.links}>Register Now!</Link></p>
        </form>
        <div>


        </div>
      </div>
    </div>
  );
};

export default Signin;

/*


import { signIn, signOut } from "@/auth";

export async function doLogout() {
await signOut({ redirectTo: "/"});
}

export async function doCredentialLogin (formData: FormData): Promise<any> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
        const response = await signIn("credentials", { 
            email, password,
            redirect: false,
        });
        return response;
    } catch (err: any) {
        throw err;
    }
}


*/

/*
e.preventDefault();

    // only submit if user has entered a username and password
    if (username == '' && password == '') {
      alert('Please enter a username and password');
    }
    console.log("test");
    try {
      const response = await signIn("credentials", { 
        username, password,
        redirect: false,
      });
      setUsername(''); // reset username
      setPassword(''); // reset password

      navigate('/');
      return response; 
    } catch (err: any) {
      throw err;
    }
      */