import React, { useState } from "react";
import "./styles.css";

// 🔗 FAKE BACKEND URL (for now)
const backendURL = "https://fake-plex-backend.com";

function App() {
  const [wallet, setWallet] = useState(5000);
  const [transactions, setTransactions] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // 💳 FUND WALLET
  const fundWallet = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1000));
      const amount = 2000;
      setWallet(prev => prev + amount);
      setTransactions(prev => [
        { service: "WALLET FUNDING", amount, date: new Date().toLocaleString() },
        ...prev,
      ]);
      addNotification(`Wallet funded: ₦${amount}`);
    } catch (err) {
      addNotification("Wallet funding failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 GENERIC BUY SERVICE
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

  // 🔔 Add notification
  const addNotification = (msg) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, msg }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000); // auto remove after 4s
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Notifications */}
      <div className="notifications">
        {notifications.map(n => (
          <div key={n.id} className="notification">{n.msg}</div>
        ))}
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Plex</h2>
        <nav>
          <button>Dashboard</button>
          <button>Transactions</button>
          <button>Profile</button>
          <button onClick={() => setDarkMode(prev => !prev)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </nav>
      </div>

      {/* Main */}
      <div className="main-content">
        <header>
          <h1>✨ Plex Connect VTU</h1>
        </header>

        {/* Wallet */}
        <div className="card wallet-card">
          <h2>Wallet Balance</h2>
          <p className="wallet">₦{wallet}</p>
          <button onClick={fundWallet} disabled={loading}>
            {loading ? "⏳ Processing..." : "💳 Fund Wallet ₦2000"}
          </button>
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

        {/* API Response */}
        {response && (
          <div className="card">
            <h2>API Response</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}

        {/* Floating Action Button */}
        <button className="fab" onClick={fundWallet}>💰 Quick Top-up</button>
      </div>
    </div>
  );
}

export default App;
