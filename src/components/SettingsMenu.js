// src/components/SettingsMenu.js
import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

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
  padding: 5px;
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const Dropdown = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  right: 0;
  background: ${({ theme }) => theme.primary};
  box-shadow: 0 0 10px ${({ theme }) => theme.accent};
  border-radius: 6px;
  overflow: hidden;
  min-width: 180px;
  z-index: 100;
  animation: ${fadeIn} 0.2s ease-out;
`;

const DropdownItem = styled.div`
  padding: 12px 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.buttonText};
  }
`;

export default function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef();

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <MenuContainer ref={menuRef}>
      <MenuButton onClick={() => setOpen((prev) => !prev)}>⋮</MenuButton>
      <Dropdown open={open}>
        <DropdownItem onClick={() => { navigate("/profile"); setOpen(false); }}>
          Profile
        </DropdownItem>
        <DropdownItem onClick={() => { navigate("/change-password"); setOpen(false); }}>
          Change Password
        </DropdownItem>
        <DropdownItem onClick={() => { logout(); setOpen(false); }}>
          Logout
        </DropdownItem>
      </Dropdown>
    </MenuContainer>
  );
                                                }
