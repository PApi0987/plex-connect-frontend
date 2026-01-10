import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../AuthContext";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Form = styled.form`
  background: ${({ theme }) => theme.primary};
  padding: 40px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.buttonText};
  font-weight: bold;
  cursor: pointer;
`;

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
    }
