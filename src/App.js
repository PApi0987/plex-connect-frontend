// src/App.js
import React, { useState } from "react";
import "./styles.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProviderWrapper, useTheme } from "./contexts/ThemeContext";

import Sidebar from "./components/Sidebar";
import FAB from "./components/FAB";
import Modal from "./components/Modal";
import SettingsMenu from "./components/SettingsMenu";

function AppContent() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // Wallet & Transactions
  const [wallet, setWallet] = useState(5000);
  const [transactions, setTransactions] = useState([]);

  // UI States
  const [notifications, setNotifications] = useState([]);
  const [modal, setModal] = useState(null); // "login" | "signup" | "settings"

  // Auth data for login/signup
  const [authData, setAuthData] = useState({ email: "", password: "", name: "" });

  // 🔔 Notifications
  const addNotification = (msg) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, msg }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  // 💳 FUND WALLET
  const fundWallet = (amount = 2000) => {
    setWallet(prev => prev + amount);
    addNotification(`Wallet funded: ₦${amount}`);
  };

  // 🔄 BUY SERVICE
  const buy = (service, amount) => {
    if (wallet < amount) {
      addNotification("❌ Insufficient wallet balance");
      return;
    }
    setWallet(prev => prev - amount);
    setTransactions(prev => [
      { service, amount, date: new Date().toLocaleString() },
      ...prev,
    ]);
    addNotification(`Purchased ${service}: ₦${amount}`);
  };

  // 🔑 LOGIN / SIGNUP
  const handleAuth = (type) => {
    if (type === "login") {
      if (!authData.email || !authData.password) return addNotification("Fill all fields");
      addNotification("✅ Logged in successfully");
    } else if (type === "signup") {
      if (!authData.name || !authData.email || !authData.password) return addNotification("Fill all fields");
      addNotification("✅ Account created successfully");
    }
    setModal(null);
    setAuthData({ email: "", password: "", name: "" });
  };

  return (
    <div className={`app ${isDark ? "dark-mode" : "light-mode"}`}>
      {/* Notifications */}
      <div className="notifications">
        {notifications.map(n => <div key={n.id} className="notification">{n.msg}</div>)}
      </div>

      {/* Sidebar */}
      <Sidebar
        onSettings={() => setModal("settings")}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h1>✨ Plex Connect VTU</h1>
        </header>

        {user ? (
          <>
            {/* Wallet */}
            <div className="card wallet-card">
              <h2>Wallet Balance</h2>
              <p className="wallet">₦{wallet}</p>
              <button onClick={() => fundWallet()}>💳 Fund Wallet ₦2000</button>
            </div>

            {/* Quick actions */}
            <div className="grid">
              <button onClick={() => buy("DATA", 490)}>📡 Buy Data</button>
              <button onClick={() => buy("AIRTIME", 500)}>📞 Buy Airtime</button>
              <button onClick={() => buy("CABLE", 1200)}>📺 Cable TV</button>
              <button onClick={() => buy("ELECTRICITY", 2000)}>⚡ Electricity</button>
            </div>

            {/* Transaction history */}
            <div className="card">
              <h2>Transaction History</h2>
              {transactions.length === 0 && <p>No transactions yet</p>}
              <ul>
                {transactions.map((t, i) => (
                  <li key={i}>{t.date} — <b>{t.service}</b> — ₦{t.amount}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="card">
            <h2>Welcome to Plex Connect</h2>
            <p>Please login or sign up to continue.</p>
          </div>
        )}

        {/* Floating Action Button */}
        {user && <FAB onClick={() => fundWallet()} />}
      </div>

      {/* Modals */}
      {modal && (
        <Modal open={!!modal} onClose={() => setModal(null)}>
          {modal === "login" && (
            <>
              <h2>Login</h2>
              <input
                type="email"
                placeholder="Email"
                value={authData.email}
                onChange={e => setAuthData({...authData, email: e.target.value})}
              />
              <input
                type="password"
                placeholder="Password"
                value={authData.password}
                onChange={e => setAuthData({...authData, password: e.target.value})}
              />
              <button onClick={() => handleAuth("login")}>Login</button>
            </>
          )}
          {modal === "signup" && (
            <>
              <h2>Sign Up</h2>
              <input
                type="text"
                placeholder="Full Name"
                value={authData.name}
                onChange={e => setAuthData({...authData, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email"
                value={authData.email}
                onChange={e => setAuthData({...authData, email: e.target.value})}
              />
              <input
                type="password"
                placeholder="Password"
                value={authData.password}
                onChange={e => setAuthData({...authData, password: e.target.value})}
              />
              <button onClick={() => handleAuth("signup")}>Sign Up</button>
            </>
          )}
          {modal === "settings" && (
            <>
              <h2>Settings</h2>
              <SettingsMenu logout={logout} />
              <button onClick={() => setModal(null)}>Close</button>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}

// Wrap App with AuthProvider and ThemeProviderWrapper
export default function App() {
  return (
    <AuthProvider>
      <ThemeProviderWrapper>
        <AppContent />
      </ThemeProviderWrapper>
    </AuthProvider>
  );
          }
