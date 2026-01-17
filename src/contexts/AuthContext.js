import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Wallet & transactions
  const [wallet, setWallet] = useState(5000);
  const [transactions, setTransactions] = useState([]);

  // Notifications
  const [notifications, setNotifications] = useState([]);

  // 🔔 Add notification
  const addNotification = (msg) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, msg }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  // 💳 Fund wallet
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

  // 🔑 Auth functions
  const login = (name, email) => {
    setUser({ name, email });
    addNotification("✅ Logged in successfully");
  };

  const signup = (name, email) => {
    setUser({ name, email });
    addNotification("✅ Account created successfully");
  };

  const logout = () => {
    setUser(null);
    addNotification("Logged out");
  };

  return (
    <AuthContext.Provider value={{
      user,
      wallet,
      transactions,
      notifications,
      addNotification,
      fundWallet,
      buyService,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
