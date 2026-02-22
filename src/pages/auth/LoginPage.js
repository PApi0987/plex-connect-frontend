// src/pages/auth/LoginPage.js
import React from "react";
import styled from "styled-components";

// Styled components
const AuthForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 5px ${({ theme }) => theme.accent};
  }
`;

const Button = styled.button`
  padding: 12px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s all;
  &:hover {
    opacity: 0.9;
  }
`;

export default function LoginPage({ authData, setAuthData, handleAuth, isSignup }) {
  return (
    <AuthForm>
      {isSignup && (
        <Input
          type="text"
          placeholder="Full Name"
          value={authData.name}
          onChange={e => setAuthData({...authData, name: e.target.value})}
        />
      )}
      <Input
        type="email"
        placeholder="Email"
        value={authData.email}
        onChange={e => setAuthData({...authData, email: e.target.value})}
      />
      <Input
        type="password"
        placeholder="Password"
        value={authData.password}
        onChange={e => setAuthData({...authData, password: e.target.value})}
      />
      <Button onClick={() => handleAuth(isSignup ? "signup" : "login")}>
        {isSignup ? "Sign Up" : "Login"}
      </Button>
    </AuthForm>
  );
}
