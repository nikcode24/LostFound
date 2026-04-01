import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Layout from "./components/Layout"; 
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Lost from "./pages/Lost";
import Found from "./pages/Found";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/Sign_Up";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>   {/*  Header + Footer applied everywhere */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/lost" element={<Lost />} />
          <Route path="/found" element={<Found />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;