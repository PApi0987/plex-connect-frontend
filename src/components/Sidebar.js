import React from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

const SidebarContainer = styled.div`
  width: 220px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.buttonText};
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 0;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Sidebar({ onSettings, onToggleTheme }) {
  const { user, logout } = useAuth();

  return (
    <SidebarContainer>
      <h2>Plex</h2>
      {user && <p>Hello, {user.name}</p>}
      <Button onClick={onSettings}>⋮ Settings</Button>
      <Button onClick={onToggleTheme}>Toggle Theme</Button>
      {user ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <>
          <Button onClick={() => onSettings("login")}>Login</Button>
          <Button onClick={() => onSettings("signup")}>Sign Up</Button>
        </>
      )}
    </SidebarContainer>
  );
        }
