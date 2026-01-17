import React from "react";
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

const Card = styled.div`
  background: ${({ theme }) => theme.primary};
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
`;

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <Container>
      <Sidebar />
      <Content>
        <h1>Profile</h1>
        <Card>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> 08012345678</p>
        </Card>
      </Content>
    </Container>
  );
}
