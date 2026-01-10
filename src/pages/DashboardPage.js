import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../AuthContext";
import { useTheme } from "../ThemeContext";

import SettingsMenu from "../components/SettingsMenu";
import FAB from "../components/FAB";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";

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

const WalletCard = styled.div`
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
`;

export default function DashboardPage() {
  const { logout, user } = useAuth();
  const { toggleTheme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  const handleTopUp = () => setModalOpen(true);

  return (
    <Container>
      <Sidebar />
      <Content>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Welcome, {user.name}</h1>
          <SettingsMenu logout={logout} />
        </div>

        <Button onClick={toggleTheme}>Toggle Theme</Button>

        <WalletCard>
          <h2>Wallet Balance</h2>
          <p>₦5,000</p>
        </WalletCard>

        <WalletCard>
          <h2>Quick Actions</h2>
          <Button>Buy Data</Button>
          <Button>Buy Airtime</Button>
          <Button>Electricity</Button>
          <Button>Cable TV</Button>
        </WalletCard>

        <WalletCard>
          <h2>Transaction History</h2>
          <ul>
            <li>📦 DATA - ₦500 - 10 Jan 2026</li>
            <li>💡 ELECTRICITY - ₦2,000 - 9 Jan 2026</li>
          </ul>
        </WalletCard>

        <FAB onClick={handleTopUp} />

        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <h2>Top Up Wallet</h2>
          <p>Choose your amount and payment method.</p>
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </Modal>
      </Content>
    </Container>
  );
}
