import React from "react";
import styled from "styled-components";

const Button = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

export default function FAB({ onClick, children = "💰" }) {
  return <Button onClick={onClick}>{children}</Button>;
}
