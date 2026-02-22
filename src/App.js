// src/App.js
import React, { useState } from "react";
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

import { NotificationsWrapper } from "./components/Notification";

function AppContent() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // ==========================
  // STATE
  // ==========================
  const [wallet, setWallet] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [modal, setModal] = useState(null); // "login" | "signup" | "settings"
  const [authData, setAuthData] = useState({ email: "", password: "", name: "" });

  // ==========================
  // NOTIFICATIONS
  // ==========================
  const addNotification = (msg, type = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, msg, type }]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // ==========================
  // WALLET & TRANSACTIONS
  // ==========================
  const fundWallet = (amount = 2000) => {
    if (!user) return addNotification("❌ Please login first", "error");
    setWallet((prev) => prev + amount);
    addNotification(`💰 Wallet funded: ₦${amount}`);
  };

  const buyService = (service, amount) => {
    if (!user) return addNotification("❌ Please login first", "error");
    if (wallet < amount) return addNotification("❌ Insufficient wallet balance", "error");

    const tx = { service, amount, date: new Date().toLocaleString() };
    setWallet((prev) => prev - amount);
    setTransactions((prev) => [tx, ...prev]);
    addNotification(`✅ Purchased ${service}: ₦${amount}`);
  };

  // ==========================
  // AUTH HANDLING
  // ==========================
  const handleAuth = (type) => {
    if (type === "login") {
      if (!authData.email || !authData.password) return addNotification("Fill all fields", "error");
      addNotification("✅ Logged in successfully");
    } else if (type === "signup") {
      if (!authData.name || !authData.email || !authData.password) return addNotification("Fill all fields", "error");
      addNotification("✅ Account created successfully");
    }
    setModal(null);
    setAuthData({ email: "", password: "", name: "" });
  };

  // ==========================
  // RENDER MODAL CONTENT
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
      <NotificationsWrapper notifications={notifications} removeNotification={removeNotification} />

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
