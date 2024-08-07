// Login.test.js

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers like .toBeInTheDocument
import Login from './components/Login';

describe('Login Component', () => {
  test('should display login form', async () => {
    // Arrange
    const { getByLabelText, getByText } = render(<Login />);

    // Act
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const loginButton = getByText(/login/i);

    // Assert
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('should allow user to input email and password', async () => {
    // Arrange
    const { getByLabelText } = render(<Login />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);

    // Act
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    // Assert
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password');
  });

  test('should handle form submission', async () => {
    // Arrange
    const mockSubmit = jest.fn();
    const { getByText } = render(<Login onSubmit={mockSubmit} />);
    const loginButton = getByText(/login/i);

    // Act
    fireEvent.click(loginButton);

    // Assert
    await waitFor(() => expect(mockSubmit).toHaveBeenCalledTimes(1));
  });

  test('should display error message for invalid credentials', async () => {
    // Arrange
    const mockSubmit = jest.fn(() => {
      throw new Error('Invalid email or password');
    });
    const { getByText } = render(<Login onSubmit={mockSubmit} />);
    const loginButton = getByText(/login/i);

    // Act
    fireEvent.click(loginButton);

    // Assert
    await waitFor(() => expect(getByText(/invalid email or password/i)).toBeInTheDocument());
  });
});
