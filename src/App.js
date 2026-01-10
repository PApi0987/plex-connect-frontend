import React, { useState } from "react";
import "./styles.css";

const backendURL = "https://fake-plex-backend.com";

function App() {
  // Wallet & Transactions
  const [wallet, setWallet] = useState(5000);
  const [transactions, setTransactions] = useState([]);

  // UI States
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [modal, setModal] = useState(null); // "login" | "signup" | "settings"

  // Auth state
  const [user, setUser] = useState(null);
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

  // 🔑 LOGIN / SIGNUP MOCK
  const handleAuth = (type) => {
    if (type === "login") {
      if (!authData.email || !authData.password) return addNotification("Fill all fields");
      setUser({ name: "John Doe", email: authData.email });
      addNotification("✅ Logged in successfully");
    } else if (type === "signup") {
      if (!authData.name || !authData.email || !authData.password) return addNotification("Fill all fields");
      setUser({ name: authData.name, email: authData.email });
      addNotification("✅ Account created successfully");
    }
    setModal(null);
    setAuthData({ name: "", email: "", password: "" });
  };

  // 🔓 LOGOUT
  const logout = () => {
    setUser(null);
    addNotification("Logged out");
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Notifications */}
      <div className="notifications">
        {notifications.map(n => <div key={n.id} className="notification">{n.msg}</div>)}
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Plex</h2>
        <nav>
          <button onClick={() => setModal("settings")}>⋮ Settings</button>
          <button onClick={() => setDarkMode(prev => !prev)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <button onClick={() => setModal("login")}>Login</button>
              <button onClick={() => setModal("signup")}>Sign Up</button>
            </>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h1>✨ Plex Connect VTU</h1>
        </header>

        {user && (
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
                  <li key={i}>
                    {t.date} — <b>{t.service}</b> — ₦{t.amount}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {!user && (
          <div className="card">
            <h2>Welcome to Plex Connect</h2>
            <p>Please login or sign up to continue.</p>
          </div>
        )}

        {/* Floating Action Button */}
        {user && <button className="fab" onClick={() => fundWallet()}>💰 Top-up</button>}
      </div>

      {/* Modals */}
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
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
                <button onClick={logout}>Logout</button>
                <button onClick={() => setModal(null)}>Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
