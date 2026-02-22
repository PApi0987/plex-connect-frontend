// src/pages/profile/ProfilePage.js
import React, { useState } from "react";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 10px ${({ theme }) => theme.accent}50;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 8px;
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
  margin-top: 15px;
  padding: 12px;
  width: 100%;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

export default function ProfilePage({ user, updateUser }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleSave = () => {
    if (!formData.name || !formData.email) return alert("Fill all fields");
    updateUser(formData);
  };

  return (
    <ProfileContainer>
      <h2>Profile</h2>
      <Card>
        <label>Name</label>
        <Input
          type="text"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />

        <label>Email</label>
        <Input
          type="email"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />

        <Button onClick={handleSave}>Save Changes</Button>
      </Card>
    </ProfileContainer>
  );
                    }
