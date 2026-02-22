import React from "react";
import styled from "styled-components";
import { FiSettings, FiSun, FiMoon } from "react-icons/fi"; // Icons

// Sidebar container
const SidebarContainer = styled.div`
  width: 240px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
  box-shadow: 2px 0 12px rgba(0,0,0,0.1);
  position: fixed;

  @media (max-width: 768px) {
    width: 60px;
    padding: 20px 10px;
  }
`;

// Header / Logo
const Logo = styled.h2`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

// Menu Button
const MenuButton = styled.button`
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.accentHover || theme.accent};
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    padding: 12px 10px;
    justify-content: center;
    font-size: 0; // hide text on small screens
  }
`;

export default function Sidebar({ onSettings, onToggleTheme, isDark }) {
  return (
    <SidebarContainer>
      <Logo>Plex</Logo>

      <MenuButton onClick={onSettings}>
        <FiSettings size={20} />
        <span>Settings</span>
      </MenuButton>

      <MenuButton onClick={onToggleTheme}>
        {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
        <span>Toggle Theme</span>
      </MenuButton>
    </SidebarContainer>
  );
}
