import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

import Sidebar from "../components/Sidebar";
import FAB from "../components/FAB";
import Modal from "../components/Modal";
import SettingsMenu from "../components/SettingsMenu";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.primary};
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.buttonText};
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 10px;
  border: none;
  font-weight: bold;
`;

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { toggleTheme } = useTheme();

  const [wallet, setWallet] = useState(5000);
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [modal, setModal] = useState(null); // "topup" | "settings"

  // Notification helper
  const addNotification = (msg) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, msg }]);
    setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 4000);
  };

  // Wallet top-up
  const fundWallet = (amount = 2000) => {
    setWallet((prev) => prev + amount);
    addNotification(`Wallet funded: ₦${amount}`);
  };

  // Buy service
  const buyService = (service, amount) => {
    if (wallet < amount) {
      addNotification("❌ Insufficient wallet balance");
      return;
    }
    setWallet((prev) => prev - amount);
    setTransactions((prev) => [
      { service, amount, date: new Date().toLocaleString() },
      ...prev,
    ]);
    addNotification(`Purchased ${service}: ₦${amount}`);
  };

  return (
    <Container>
      <Sidebar />

      <Content>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Welcome, {user.name}</h1>
          <SettingsMenu logout={logout} />
        </div>

        <Button onClick={toggleTheme}>Toggle Theme</Button>

        <Card>
          <h2>Wallet Balance</h2>
          <p>₦{wallet}</p>
          <Button onClick={() => fundWallet()}>💳 Fund Wallet ₦2000</Button>
        </Card>

        <Card>
          <h2>Quick Actions</h2>
          <Button onClick={() => buyService("DATA", 490)}>📡 Buy Data</Button>
          <Button onClick={() => buyService("AIRTIME", 500)}>📞 Buy Airtime</Button>
          <Button onClick={() => buyService("CABLE", 1200)}>📺 Cable TV</Button>
          <Button onClick={() => buyService("ELECTRICITY", 2000)}>⚡ Electricity</Button>
        </Card>

        <Card>
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
        </Card>

        {/* Floating Action Button */}
        <FAB onClick={() => setModal("topup")} />

        {/* Notifications */}
        <div style={{ position: "fixed", top: 10, right: 10, zIndex: 1000 }}>
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                background: "#333",
                color: "#fff",
                padding: "10px 20px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              {n.msg}
            </div>
          ))}
        </div>

        {/* Modals */}
        {modal && (
          <Modal open={modal !== null} onClose={() => setModal(null)}>
            {modal === "topup" && (
              <>
                <h2>Top Up Wallet</h2>
                <p>Select amount to fund</p>
                <Button onClick={() => { fundWallet(1000); setModal(null); }}>₦1000</Button>
                <Button onClick={() => { fundWallet(2000); setModal(null); }}>₦2000</Button>
                <Button onClick={() => setModal(null)}>Close</Button>
              </>
            )}
          </Modal>
        )}
      </Content>
    </Container>
  );
}
