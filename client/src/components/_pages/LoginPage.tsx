import React from 'react';
import { LoginFormContainer } from 'components/_forms/LoginForm';
import { Redirect } from 'react-router-dom';
import { AuthCard } from 'components/AuthCard/AuthCard';
import { useAuth } from 'hooks/useAuth';

export const LoginPage: React.FC = () => {
  const authorized = useAuth();
  if (authorized) return <Redirect to="/feed" />;

  return (
    <AuthCard>
      <LoginFormContainer />
    </AuthCard>
  );
};
