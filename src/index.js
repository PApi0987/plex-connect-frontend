// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// --- Context Providers ---
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProviderWrapper } from "./contexts/ThemeContext";

// --- Global Styles ---
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProviderWrapper>
          <App />
        </ThemeProviderWrapper>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
