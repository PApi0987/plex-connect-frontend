import { useState } from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  cursor: pointer;
`;

const Dropdown = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  right: 0;
  background: ${({ theme }) => theme.primary};
  box-shadow: 0 0 10px ${({ theme }) => theme.accent};
  border-radius: 6px;
  overflow: hidden;
  min-width: 150px;
  z-index: 100;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.buttonText};
  }
`;

export default function SettingsMenu({ logout }) {
  const [open, setOpen] = useState(false);
  return (
    <MenuContainer>
      <MenuButton onClick={() => setOpen(!open)}>⋮</MenuButton>
      <Dropdown open={open}>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Change Password</DropdownItem>
        <DropdownItem onClick={logout}>Logout</DropdownItem>
      </Dropdown>
    </MenuContainer>
  );
    }
