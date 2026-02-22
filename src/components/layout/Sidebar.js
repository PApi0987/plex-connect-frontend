// src/components/Sidebar.js
import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 220px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  &:hover {
    opacity: 0.9;
  }
`;

export default function Sidebar({ onSettings, onToggleTheme }) {
  return (
    <SidebarContainer>
      <h2>Plex</h2>
      <Button onClick={onSettings}>⋮ Settings</Button>
      <Button onClick={onToggleTheme}>Toggle Theme</Button>
    </SidebarContainer>
  );
}
