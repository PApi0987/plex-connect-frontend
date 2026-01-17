import React, { createContext, useContext, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider will wrap your app in index.js
export const AuthProvider = ({ children }) => {
  // ----- User & Auth -----
  const [user, setUser] = useState(null);

  // ----- Wallet & Transactions -----
  const [wallet, setWallet] = useState(5000);
  const [transactions, setTransactions] = useState([]);

  // ----- Notifications -----
  const [notifications, setNotifications] = useState([]);

  // 🔔 Add a notification
  const addNotification = (msg) => {
    const id = Date.now(); // unique id
    setNotifications(prev => [...prev, { id, msg }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  // 🔑 Login
  const login = (email, name = "John Doe") => {
    setUser({ email, name });
    addNotification("✅ Logged in successfully");
  };

  // 🔑 Signup
  const signup = (email, name) => {
    setUser({ email, name });
    addNotification("✅ Account created successfully");
  };

  // 🔓 Logout
  const logout = () => {
    setUser(null);
    addNotification("Logged out");
  };

  // 💳 Fund Wallet
  const fundWallet = (amount = 2000) => {
    setWallet(prev => prev + amount);
    addNotification(`Wallet funded: ₦${amount}`);
  };

  // 🔄 Buy service
  const buyService = (service, amount) => {
    if (wallet < amount) {
      addNotification("❌ Insufficient wallet balance");
      return false;
    }

    setWallet(prev => prev - amount);
    setTransactions(prev => [
      { service, amount, date: new Date().toLocaleString() },
      ...prev,
    ]);
    addNotification(`Purchased ${service}: ₦${amount}`);
    return true;
  };

  // Provide all state & functions to children
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        wallet,
        fundWallet,
        transactions,
        buyService,
        notifications,
        addNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for consuming AuthContext
export const useAuth = () => useContext(AuthContext);
