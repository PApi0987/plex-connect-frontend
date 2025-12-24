import React, { useState } from "react";

const backendURL = "https://plex-connect.onrender.com";

function App() {
  const [wallet, setWallet] = useState(5000);
  const [transactions, setTransactions] = useState([]);
  const [response, setResponse] = useState(null);

  const buyData = async () => {
    const payload = {
      user_id: 1,
      bundle_id: 13,
      phone_number: "08012345678",
      amount: 490
    };

    const res = await fetch(`${backendURL}/api/vtu/data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    setResponse(data);

    if (data.status) {
      setWallet(wallet - payload.amount);
      setTransactions([{ service: "DATA", amount: payload.amount }, ...transactions]);
    }
  };

  return (
    <div className="container">
      <h1>Plex Connect</h1>
      <p className="wallet">Wallet: ₦{wallet}</p>

      <button onClick={buyData}>Buy Data</button>

      <h2>Transactions</h2>
      <ul>
        {transactions.map((t, i) => (
          <li key={i}>{t.service} - ₦{t.amount}</li>
        ))}
      </ul>

      {response && (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
