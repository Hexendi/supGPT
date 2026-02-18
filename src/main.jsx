import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import App from "./App.jsx";

import BotAPI from "./assets/comp/BotAPI.jsx";
import "./index.css";




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router basename="/">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/bot" element={<BotAPI />} />
      </Routes>
    </Router>
  </StrictMode>
);