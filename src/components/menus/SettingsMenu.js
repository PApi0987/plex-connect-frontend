import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Animations
const fadeSlide = keyframes`
  from { opacity: 0; transform: translateY(-15px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Container
const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// Menu Button (⋮)
const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 26px;
  cursor: pointer;
  padding: 6px;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

// Dropdown menu
const Dropdown = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  right: 0;
  background: ${({ theme }) => theme.primary};
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  border-radius: 10px;
  overflow: hidden;
  min-width: 200px;
  z-index: 100;
  animation: ${fadeSlide} 0.25s ease-out;
`;

// Each item
const DropdownItem = styled.div`
  padding: 12px 18px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.buttonText};
    transform: translateX(5px);
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
      <MenuButton onClick={() => setOpen(prev => !prev)}>⋮</MenuButton>
      <Dropdown open={open}>
        <DropdownItem
          onClick={() => {
            navigate("/profile");
            setOpen(false);
          }}
        >
          Profile
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            navigate("/change-password");
            setOpen(false);
          }}
        >
          Change Password
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            logout();
            setOpen(false);
          }}
        >
          Logout
        </DropdownItem>
      </Dropdown>
    </MenuContainer>
  );
            }
