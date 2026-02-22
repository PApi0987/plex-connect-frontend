// src/components/FAB.js
import React from "react";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

const FabButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 28px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  animation: ${bounce} 1s infinite;
  &:hover {
    opacity: 0.85;
  }
`;

export default function FAB({ onClick }) {
  return <FabButton onClick={onClick}>💰</FabButton>;
}
