import React, { useState } from "react";
import "./styles.css";

// 🔗 YOUR BACKEND URL (Render)
const backendURL = "https://plex-connect-backend.onrender.com";

function App() {
  const [wallet, setWallet] = useState(5000);
  const [transactions, setTransactions] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // =========================
  // 💳 FUND WALLET
  // =========================
  const fundWallet = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${backendURL}/api/wallet/fund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: 1,
          amount: 2000
        })
      });

      const data = await res.json();
      setResponse(data);

      if (data.status) {
        setWallet(data.wallet_balance);
        setTransactions(prev => [
          {
            service: "WALLET FUNDING",
            amount: 2000,
            date: new Date().toLocaleString()
          },
          ...prev
        ]);
      }
    } catch (err) {
      alert("Wallet funding failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // 🛒 BUY SERVICES (GENERAL)
  // =========================
  const buy = async (endpoint, payload, service) => {
    if (wallet < payload.amount) {
      alert("❌ Insufficient wallet balance");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${backendURL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      setResponse(data);

      if (data.status) {
        setWallet(prev => prev - payload.amount);
        setTransactions(prev => [
          {
            service,
            amount: payload.amount,
            date: new Date().toLocaleString()
          },
          ...prev
        ]);
      }
    } catch (err) {
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>✨ Plex Connect VTU</h1>

      <div className="card">
        <h2>Wallet Balance</h2>
        <p className="wallet">₦{wallet}</p>
        <button onClick={fundWallet} disabled={loading}>
          💳 Fund Wallet ₦2000
        </button>
      </div>

      <div className="grid">
        <button onClick={() =>
          buy("/api/vtu/data", {
            user_id: 1,
            bundle_id: 13,
            phone_number: "08012345678",
            amount: 490
          }, "DATA")
        }>📡 Buy Data</button>

        <button onClick={() =>
          buy("/api/vtu/airtime", {
            user_id: 1,
            provider_id: 1,
            phone_number: "08012345678",
            amount: 500
          }, "AIRTIME")
        }>📞 Buy Airtime</button>

        <button onClick={() =>
          buy("/api/vtu/cable", {
            user_id: 1,
            plan_id: 1,
            cardnumber: "12345678901",
            phone: "08012345678",
            amount: 1200
          }, "CABLE")
        }>📺 Cable TV</button>

        <button onClick={() =>
          buy("/api/vtu/electricity", {
            user_id: 1,
            disco_id: 1,
            meter_number: "12345678901",
            meter_type: "prepaid",
            phone: "08012345678",
            amount: 2000
          }, "ELECTRICITY")
        }>⚡ Electricity</button>
      </div>

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

      {response && (
        <div className="card">
          <h2>API Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
