import { createContext, useContext, useState } from "react";
import { ThemeProvider } from "styled-components";

const ThemeContext = createContext();

const lightTheme = {
  background: "#FFFFFF",
  primary: "#F5F5F5",
  accent: "#003366",
  text: "#333333",
  buttonText: "#FFFFFF"
};

const darkTheme = {
  background: "#000000",
  primary: "#003366",
  accent: "#555555",
  text: "#FFFFFF",
  buttonText: "#FFFFFF"
};

export const ThemeProviderWrapper = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDark }}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
