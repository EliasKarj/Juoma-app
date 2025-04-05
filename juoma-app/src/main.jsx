import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import StatsPage from "./components/StatsPage.jsx";
import RulesEditor from "./components/RulesEditor.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename='/Juoma-app/'>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/rules" element={<RulesEditor />} />
    </Routes>
  </BrowserRouter>
);
