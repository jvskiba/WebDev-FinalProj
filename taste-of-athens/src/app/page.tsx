"use client";

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import HomePage from '../components/Homepage';
import List from '../components/List';
import Info from '../components/Info';
import Register from '../components/Register';
import Reviews from '../components/Reviews';
import Signin from '../components/Signin';
import ReviewForm from '../components/ReviewForm';
import ModifyItem from '../components/ModifyItem';
import ComingSoon from '../components/404page';

function App() {
  return (
    <Router>
      <div>
        <title> Taste of Athens </title>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/list" element={<List />} />
            <Route path="/details" element={<Info />} />
            <Route path="/register" element={<Register />} /> 
            <Route path="/signin" element={<Signin />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/writeReview" element={<ReviewForm />} />
            <Route path="/modify-item/:id" element={<ModifyItem />}/>
            <Route path="/comingSoon" element={<ComingSoon />} />
            <Route path="*" element={<ComingSoon />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;