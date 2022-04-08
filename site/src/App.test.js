import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Add Property button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Add Property/i);
  expect(linkElement).toBeInTheDocument();
});
