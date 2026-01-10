import React, { useState, useEffect } from "react";
import "./styles.css";

// 🔗 FAKE BACKEND URL
const backendURL = "https://mock-api.plexconnect.fake";

function App() {
  const [wallet, setWallet] = useState(5000);
  const [transactions, setTransactions] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // 💳 FUND WALLET
  const fundWallet = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));

    const fakeResponse = {
      status: true,
      wallet_balance: wallet + 2000,
      message: "Wallet funded successfully (mock)",
    };

    setResponse(fakeResponse);
    setWallet(wallet + 2000);
    setTransactions(prev => [
      { service: "WALLET FUNDING", amount: 2000, date: new Date().toLocaleString() },
      ...prev,
    ]);
    setLoading(false);
  };

  // 🛒 BUY SERVICES
  const buy = async (service, amount) => {
    if (wallet < amount) return alert("❌ Insufficient wallet balance");
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));

    const fakeResponse = {
      status: true,
      wallet_balance: wallet - amount,
      message: `${service} purchased successfully (mock)`,
    };

    setResponse(fakeResponse);
    setWallet(wallet - amount);
    setTransactions(prev => [
      { service, amount, date: new Date().toLocaleString() },
      ...prev,
    ]);
    setLoading(false);
  };

  // 🌗 TOGGLE DARK/LIGHT MODE
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "app dark-mode" : "app light-mode"}>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Plex Connect</h2>
        <nav>
          <button>Dashboard</button>
          <button>Transactions</button>
          <button>Profile</button>
          <button onClick={toggleTheme}>
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </nav>
      </aside>

      {/* MAIN DASHBOARD */}
      <main className="main-content">
        <header>
          <h1>Welcome!</h1>
          <div className="settings">
            <button onClick={() => setShowSettings(!showSettings)}>⋮</button>
            {showSettings && (
              <div className="settings-menu">
                <button onClick={toggleTheme}>Toggle Theme</button>
                <button onClick={() => alert("Profile settings (mock)")} >Profile</button>
                <button onClick={() => alert("Logged out (mock)")} >Logout</button>
              </div>
            )}
          </div>
        </header>

        {/* WALLET CARD */}
        <div className="card wallet-card">
          <h2>Wallet Balance</h2>
          <p className="wallet">₦{wallet}</p>
          <button onClick={fundWallet} disabled={loading}>
            {loading ? "⏳ Processing..." : "💳 Fund Wallet ₦2000"}
          </button>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid">
          <button onClick={() => buy("DATA", 490)}>📡 Buy Data ₦490</button>
          <button onClick={() => buy("AIRTIME", 500)}>📞 Buy Airtime ₦500</button>
          <button onClick={() => buy("CABLE", 1200)}>📺 Cable TV ₦1200</button>
          <button onClick={() => buy("ELECTRICITY", 2000)}>⚡ Electricity ₦2000</button>
        </div>

        {/* TRANSACTION HISTORY */}
        <div className="card">
          <h2>Transaction History</h2>
          {transactions.length === 0 ? (
            <p>No transactions yet</p>
          ) : (
            <ul>
              {transactions.map((t, i) => (
                <li key={i}>
                  {t.date} — <b>{t.service}</b> — ₦{t.amount}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* API RESPONSE */}
        {response && (
          <div className="card">
            <h2>API Response</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
