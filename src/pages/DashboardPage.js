import { useAuth } from "../AuthContext";
import { useTheme } from "../ThemeContext";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
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

  return (
    <Container>
      <h1>Welcome, {user.name}</h1>
      <Button onClick={toggleTheme}>Toggle Theme</Button>
      <Button onClick={logout}>Logout</Button>

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
    </Container>
  );
    }
