import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import BCRCalculator from './BCR_calculator/BCR_calculator';
import ConsumptionCalculator from './Consumption_based_calculator/Consumption_based_calc';
import Home from './Home/Home';
import Navbar from "./Navbar/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Get the root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Use createRoot instead of render
root.render(
  <Router>
    <Navbar /> {/* Navbar persists across all pages */}
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consumption-calculator" element={<ConsumptionCalculator />} />
        <Route path="/bcr-calculator" element={<BCRCalculator />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
