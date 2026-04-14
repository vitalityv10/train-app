import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserCard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="text-center p-4 shadow-sm rounded bg-white">
      <img
        src={user.photo}
        alt={user.name}
        style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 12 }}
      />
      <h5>{user.name}</h5>
      <p className="text-muted small">{user.email}</p>
      <Button variant="outline-danger" size="sm" onClick={handleLogout}>
        Вийти
      </Button>
    </div>
  );
}