// src/contexts/ThemeContext.js
import React, { createContext, useContext, useState } from "react";
import { ThemeProvider } from "styled-components";

const ThemeContext = createContext();

// Define light and dark themes
const lightTheme = {
  background: "#f5f5f5",
  primary: "#ffffff",
  accent: "#003366",
  text: "#333333",
  buttonText: "#ffffff",
};

const darkTheme = {
  background: "#121212",
  primary: "#1f1f1f",
  accent: "#0d6efd",
  text: "#ffffff",
  buttonText: "#ffffff",
};

export const ThemeProviderWrapper = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
