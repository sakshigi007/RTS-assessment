import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from './components/Navbar'
import Products from './components/Products'


export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Products />
      </div>
    </Router>
  );
}