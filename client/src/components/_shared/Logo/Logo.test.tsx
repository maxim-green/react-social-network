import React from 'react';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Logo } from './Logo';

test('Component renders correctly', () => {
  render(<BrowserRouter><Logo /></BrowserRouter>);
  const logoComponent = screen.getByTestId('logo');
  expect(logoComponent).toBeInTheDocument();
  expect(logoComponent).toMatchSnapshot();
});
