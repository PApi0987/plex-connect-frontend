import styled from "styled-components";
import { NavLink } from "react-router-dom";

const SidebarContainer = styled.div`
  width: 220px;
  background: ${({ theme }) => theme.primary};
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 60px;
  }
`;

const LinkItem = styled(NavLink)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  margin: 15px 0;
  display: block;
  &.active {
    font-weight: bold;
    color: ${({ theme }) => theme.accent};
  }
`;

export default function Sidebar() {
  return (
    <SidebarContainer>
      <h3>Menu</h3>
      <LinkItem to="/dashboard">Dashboard</LinkItem>
      <LinkItem to="/profile">Profile</LinkItem>
      <LinkItem to="/settings">Settings</LinkItem>
    </SidebarContainer>
  );
}
