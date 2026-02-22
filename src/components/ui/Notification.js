import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Slide-down + fade-in animation
const slideDown = keyframes`
  0% { transform: translateY(-20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

// Slide-up + fade-out animation
const slideUp = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-20px); opacity: 0; }
`;

// Notification container (stacked)
const NotificationsContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Individual notification
const NotificationBox = styled.div`
  background: ${({ type, theme }) =>
    type === "error"
      ? theme.error
      : type === "info"
      ? theme.info
      : theme.success};
  color: ${({ theme }) => theme.buttonText};
  padding: 12px 18px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  min-width: 220px;
  font-size: 14px;
  font-weight: 500;
  animation: ${slideDown} 0.3s ease-out, ${slideUp} 0.3s ease-out 3.5s forwards;
`;

export default function Notification({ message, type = "success", duration = 4000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <NotificationBox type={type}>{message}</NotificationBox>;
}

// Container wrapper for App.js
export const NotificationsWrapper = ({ notifications, removeNotification }) => {
  return (
    <NotificationsContainer>
      {notifications.map((n) => (
        <Notification
          key={n.id}
          message={n.msg}
          type={n.type || "success"}
          onClose={() => removeNotification(n.id)}
        />
      ))}
    </NotificationsContainer>
  );
};
