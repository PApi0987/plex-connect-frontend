import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../contexts/AuthContext";

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

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <Container>
      <Sidebar />
      <Content>
        <h1>Profile</h1>
        <p>Name: {user.name}</p>
        <p>Email: example@email.com</p>
        <p>Phone: 08012345678</p>
      </Content>
    </Container>
  );
    }
