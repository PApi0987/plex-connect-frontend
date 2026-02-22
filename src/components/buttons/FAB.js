import React from "react";
import styled, { keyframes } from "styled-components";

// Bounce animation for attention
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

// Floating Action Button
const FabButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 50%;
  width: 65px;
  height: 65px;
  font-size: 30px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0,0,0,0.35);
  animation: ${bounce} 1.2s infinite;
  transition: transform 0.2s, opacity 0.2s;

  &:hover {
    opacity: 0.9;
    transform: scale(1.1);
  }
`;

export default function FAB({ onClick, icon = "💰" }) {
  return <FabButton onClick={onClick}>{icon}</FabButton>;
}
