// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";

axios.defaults.baseURL = process.env.REACT_APP_HOST || "http://localhost:5000";
axios.defaults.withCredentials = true; // includes cookies automatically

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
