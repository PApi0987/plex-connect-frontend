// src/pages/dashboard/DashboardPage.js
import React from "react";
import styled from "styled-components";

// Styled components
const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 20px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const WalletBalance = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

  button {
    flex: 1 1 120px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.buttonText};
    transition: 0.2s all;
    &:hover {
      opacity: 0.9;
    }
  }
`;

const TransactionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;

  li {
    padding: 10px 0;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    display: flex;
    justify-content: space-between;
    font-size: 0.95rem;
  }
`;

export default function DashboardPage({ wallet, transactions, fundWallet, buyService }) {
  return (
    <DashboardWrapper>
      {/* Wallet Card */}
      <Card>
        <h2>Wallet Balance</h2>
        <WalletBalance>₦{wallet}</WalletBalance>
        <button onClick={() => fundWallet()}>💳 Fund Wallet ₦2000</button>
      </Card>

      {/* Quick Actions */}
      <Card>
        <h2>Quick Actions</h2>
        <QuickActions>
          <button onClick={() => buyService("DATA", 490)}>📡 Buy Data</button>
          <button onClick={() => buyService("AIRTIME", 500)}>📞 Buy Airtime</button>
          <button onClick={() => buyService("CABLE", 1200)}>📺 Cable TV</button>
          <button onClick={() => buyService("ELECTRICITY", 2000)}>⚡ Electricity</button>
        </QuickActions>
      </Card>

      {/* Transaction History */}
      <Card>
        <h2>Transaction History</h2>
        {transactions.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          <TransactionsList>
            {transactions.map((t, index) => (
              <li key={index}>
                <span>{t.date}</span>
                <span><b>{t.service}</b> — ₦{t.amount}</span>
              </li>
            ))}
          </TransactionsList>
        )}
      </Card>
    </DashboardWrapper>
  );
}
