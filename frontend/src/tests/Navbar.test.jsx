// src/tests/Navbar.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
// Mock localStorage
beforeEach(() => {
  localStorage.clear();
});

const renderNavbar = () =>
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

describe('Navbar Component', () => {
  test('renders title', () => {
    renderNavbar();
    expect(screen.getByText('GlobalSnapshot')).toBeInTheDocument();
  });

  test('shows Sign In and Sign Up when not logged in', () => {
    renderNavbar();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('shows user initial and dropdown when logged in', () => {
    localStorage.setItem(
      'user',
      JSON.stringify({ email: 'test@example.com' })
    );
    renderNavbar();

    const avatar = screen.getByTitle('test@example.com');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveTextContent('T');
  });

  test('opens and closes mobile menu', () => {
    renderNavbar();

    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    expect(menuButton).toBeInTheDocument();
    fireEvent.click(menuButton);

    // Expect mobile menu to open — write assertions if you render a mobile menu
  });

  test('logs out user and clears localStorage', () => {
    localStorage.setItem(
      'user',
      JSON.stringify({ email: 'user@example.com' })
    );
    renderNavbar();

    const avatar = screen.getByTitle('user@example.com');
    expect(avatar).toBeInTheDocument();

    fireEvent.click(avatar);

    const logoutButton = screen.getByText(/log out/i);
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('user')).toBeNull();
  });
});
