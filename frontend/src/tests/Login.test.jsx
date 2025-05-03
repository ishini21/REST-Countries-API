import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login'; // Make sure this path is correct
import axios from 'axios';
import { vi } from 'vitest';

// Mock axios with Vitest
vi.mock('axios');

// Test to check if login form renders correctly
test('renders login form', () => {
  render(<Login />);
  // Ensure email, password, and login button are present
  expect(screen.getByLabelText(/email/i)).toBeDefined();
  expect(screen.getByLabelText(/password/i)).toBeDefined();
  expect(screen.getByRole('button', { name: /login/i })).toBeDefined();
});

test('calls submit function when form is submitted', async () => {
  // Render the Login component first
  render(<Login />);

  // Mock the fetch call
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => ({ token: 'testtoken' }),
  });

  // Input values for email and password
  fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
    target: { value: 'password123' },
  });

  // Submit the form
  fireEvent.submit(screen.getByRole('button', { name: /login/i }));

  // Wait for fetch to be called
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:5000/api/auth/login',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
        }),
      })
    );
  });
});


