import { render, screen } from '@testing-library/react';
import Contact from 'pages/contact';
import Cart from 'pages/cart';

test('renders contact page', () => {
  render(<Contact />);
  const linkElement = screen.getByText(/contact page/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders cart page', () => {
  render(<Cart />);
  const linkElement = screen.getByText(/cart page/i);
  expect(linkElement).toBeInTheDocument();
});

