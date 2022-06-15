import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const HomePage = () => {
  const authorized = useAuth();
  if (authorized) {
    return <Redirect to="/feed" />;
  }
  return <Redirect to="/login" />;
};

export default HomePage;
