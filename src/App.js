import React, { useState } from "react";
import "./styles.css";

const backendURL = "https://plex-connect.onrender.com";

function App() {
  const [wallet, setWallet] = useState(5000);
  const [transactions, setTransactions] = useState([]);
  const [response, setResponse] = useState(null);

  const buy = async (endpoint, payload, service) => {
    if (wallet < payload.amount) {
      alert("Insufficient balance");
      return;
    }

    const res = await fetch(`${backendURL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    setResponse(data);

    if (data.status) {
      setWallet(wallet - payload.amount);
      setTransactions([
        {
          service,
          amount: payload.amount,
          date: new Date().toLocaleString()
        },
        ...transactions
      ]);
    }
  };

  return (
    <div className="container">
      <h1>Plex Connect VTU</h1>
      <p className="wallet">Wallet Balance: ₦{wallet}</p>

      <div className="grid">
        <button onClick={() =>
          buy("/api/vtu/data", {
            user_id: 1,
            bundle_id: 13,
            phone_number: "08012345678",
            amount: 490
          }, "DATA")
        }>Buy Data</button>

        <button onClick={() =>
          buy("/api/vtu/airtime", {
            user_id: 1,
            provider_id: 1,
            phone_number: "08012345678",
            amount: 500
          }, "AIRTIME")
        }>Buy Airtime</button>

        <button onClick={() =>
          buy("/api/vtu/cable", {
            user_id: 1,
            plan_id: 1,
            cardnumber: "12345678901",
            phone: "08012345678",
            amount: 1200
          }, "CABLE")
        }>Cable TV</button>

        <button onClick={() =>
          buy("/api/vtu/electricity", {
            user_id: 1,
            disco_id: 1,
            meter_number: "12345678901",
            meter_type: "prepaid",
            phone: "08012345678",
            amount: 2000
          }, "ELECTRICITY")
        }>Electricity</button>
      </div>

      <h2>Transaction History</h2>
      <ul>
        {transactions.map((t, i) => (
          <li key={i}>
            {t.date} — {t.service} — ₦{t.amount}
          </li>
        ))}
      </ul>

      {response && (
        <>
          <h2>API Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export default App;
