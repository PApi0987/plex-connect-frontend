// src/App.js
import React, { useState, useEffect } from "react";
import "./styles.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProviderWrapper, useTheme } from "./contexts/ThemeContext";

import Sidebar from "./components/Sidebar";
import FAB from "./components/FAB";
import Modal from "./components/Modal";
import SettingsMenu from "./components/SettingsMenu";

import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";

function AppContent() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // ==========================
  // STATE MANAGEMENT
  // ==========================
  const [wallet, setWallet] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [modal, setModal] = useState(null); // "login" | "signup" | "settings"
  const [authData, setAuthData] = useState({ email: "", password: "", name: "" });

  // ==========================
  // NOTIFICATIONS
  // ==========================
  const addNotification = (msg) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, msg }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  // ==========================
  // WALLET & TRANSACTIONS
  // ==========================
  const fundWallet = async (amount = 2000) => {
    if (!user) return addNotification("❌ Please login first");
    // TODO: Replace with API call
    setWallet(prev => prev + amount);
    addNotification(`Wallet funded: ₦${amount}`);
  };

  const buyService = async (service, amount) => {
    if (!user) return addNotification("❌ Please login first");
    if (wallet < amount) return addNotification("❌ Insufficient wallet balance");

    // TODO: Replace with API call for VTU service
    setWallet(prev => prev - amount);
    const tx = { service, amount, date: new Date().toLocaleString() };
    setTransactions(prev => [tx, ...prev]);
    addNotification(`✅ Purchased ${service}: ₦${amount}`);
  };

  // ==========================
  // AUTH HANDLING
  // ==========================
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

  // ==========================
  // RENDER MODALS
  // ==========================
  const renderModalContent = () => {
    switch (modal) {
      case "login":
        return <LoginPage authData={authData} setAuthData={setAuthData} handleAuth={handleAuth} />;
      case "signup":
        return <LoginPage authData={authData} setAuthData={setAuthData} handleAuth={handleAuth} isSignup />;
      case "settings":
        return <SettingsMenu logout={logout} />;
      default:
        return null;
    }
  };

  // ==========================
  // MAIN RENDER
  // ==========================
  return (
    <div className={`app ${isDark ? "dark-mode" : "light-mode"}`}>
      {/* Notifications */}
      <div className="notifications">
        {notifications.map(n => <div key={n.id} className="notification">{n.msg}</div>)}
      </div>

      {/* Sidebar */}
      <Sidebar onSettings={() => setModal("settings")} onToggleTheme={toggleTheme} />

      {/* Main Content */}
      <div className="main-content">
        {user ? (
          <DashboardPage
            wallet={wallet}
            transactions={transactions}
            fundWallet={fundWallet}
            buyService={buyService}
          />
        ) : (
          <LoginPage authData={authData} setAuthData={setAuthData} handleAuth={handleAuth} />
        )}
      </div>

      {/* Floating Action Button */}
      {user && <FAB onClick={() => fundWallet()} />}

      {/* Modal */}
      {modal && (
        <Modal open={!!modal} onClose={() => setModal(null)}>
          {renderModalContent()}
          {modal === "settings" && <button onClick={() => setModal(null)}>Close</button>}
        </Modal>
      )}
    </div>
  );
}

// ==========================
// WRAP APP WITH PROVIDERS
// ==========================
export default function App() {
  return (
    <AuthProvider>
      <ThemeProviderWrapper>
        <AppContent />
      </ThemeProviderWrapper>
    </AuthProvider>
  );
  }
