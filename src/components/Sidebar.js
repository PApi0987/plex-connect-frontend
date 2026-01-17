import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 220px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  text-align: left;
  margin: 10px 0;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

export default function Sidebar({ onSettingsClick }) {
  return (
    <SidebarContainer>
      <h2>Plex</h2>
      <NavButton onClick={onSettingsClick}>⋮ Settings</NavButton>
    </SidebarContainer>
  );
}
