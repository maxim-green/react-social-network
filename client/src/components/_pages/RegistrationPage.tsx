import React from 'react';
import { RegistrationForm } from 'components/_forms/RegistrationForm';
import { Redirect } from 'react-router-dom';
import { AuthCard } from 'components/AuthCard/AuthCard';
import { useAuth } from 'hooks/useAuth';

export const RegistrationPage: React.FC = () => {
  const authorized = useAuth();
  if (authorized) return <Redirect to="/profile" />;

  return (
    <AuthCard>
      <RegistrationForm />
    </AuthCard>
  );
};
