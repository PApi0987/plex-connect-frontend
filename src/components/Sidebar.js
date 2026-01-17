import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Sidebar({ onSettings, onToggleTheme }) {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();

  return (
    <div className="sidebar">
      <h2>Plex</h2>
      <nav>
        <button onClick={onSettings}>⋮ Settings</button>
        <button onClick={onToggleTheme}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>

        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <button onClick={() => onSettings("login")}>Login</button>
            <button onClick={() => onSettings("signup")}>Sign Up</button>
          </>
        )}
      </nav>
    </div>
  );
          }
