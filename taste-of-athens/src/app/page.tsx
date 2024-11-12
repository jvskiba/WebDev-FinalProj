"use client";

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import HomePage from '../components/Homepage';
import List from '../components/List';
import Register from '../components/Register';
import Reviews from '../components/Reviews';
import Signin from '../components/Signin';
import Info from '../components/Info'
import ReviewForm from '../components/ReviewForm'

function App() {
  return (
    <Router>
      <div>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/list" element={<List />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/resturants:restName" element={<Info />} />
            <Route path="/reviewForm" element={<ReviewForm />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;