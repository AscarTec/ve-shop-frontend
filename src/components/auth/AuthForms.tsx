import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthFormsProps {
  mode: 'login' | 'register';
  setMode: (mode: 'login' | 'register') => void;
  onClose?: () => void;
}

const AuthForms: React.FC<AuthFormsProps> = ({ mode, setMode, onClose }) => {
  return mode === 'login' ? (
    <LoginForm onClose={onClose} onSwitchToRegister={() => setMode('register')} />
  ) : (
    <RegisterForm onClose={onClose} onSwitchToLogin={() => setMode('login')} />
  );
};

export default AuthForms;

