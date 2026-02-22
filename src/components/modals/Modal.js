import React from "react";
import styled, { keyframes } from "styled-components";

// Fade-in background
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Slide-down modal animation
const slideDown = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Backdrop
const Backdrop = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.25s ease forwards;
`;

// Modal container
const ModalContent = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  padding: 30px 25px;
  border-radius: 14px;
  width: 95%;
  max-width: 450px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.35);
  animation: ${slideDown} 0.3s ease forwards;
  position: relative;
`;

// Close button
const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;

  &:hover {
    transform: scale(1.1);
    opacity: 0.9;
  }
`;

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
      </ModalContent>
    </Backdrop>
  );
}
