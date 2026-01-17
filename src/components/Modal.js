import React from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: ${({ open }) => (open ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalBox = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  border-radius: 12px;
  min-width: 300px;
`;

export default function Modal({ open, onClose, children }) {
  return (
    <Backdrop open={open} onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        {children}
      </ModalBox>
    </Backdrop>
  );
    }
