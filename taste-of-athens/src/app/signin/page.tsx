"use client"; // Marks this file as a Client Component

import React from 'react';
import Signup from '../../components/Signin'; // Import the Signup component
import Header from '@/components/Header';
import Signin from '../../components/Signin';

const SigninPage = () => {
  return (
   
    <div >
      <Header/>
      <Signin />
    </div>
  );
};

export default SigninPage;