import React from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  padding: 30px;
  border-radius: 12px;
  min-width: 300px;
  max-width: 400px;
`;

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <Backdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>{children}</ModalBox>
    </Backdrop>
  );
}
