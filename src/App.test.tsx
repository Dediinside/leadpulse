// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('shows the attention count and lead names', () => {
  render(<App />);

  expect(screen.getByText('Needs attention')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('Elena Brooks')).toBeInTheDocument();
});
