// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import App from './App';

afterEach(cleanup);

test('shows the attention count and lead names', () => {
  render(<App />);

  expect(screen.getByText('Требуют внимания')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('Елена Брукс')).toBeInTheDocument();
});

test('filters leads by customer name', () => {
  render(<App />);

  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'София' } });

  expect(screen.getByText('София Патель')).toBeInTheDocument();
  expect(screen.queryByText('Елена Брукс')).not.toBeInTheDocument();
});

test('filters leads by status', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText('Статус заявки'), { target: { value: 'qualified' } });

  expect(screen.getByText('София Патель')).toBeInTheDocument();
  expect(screen.queryByText('Марк Рид')).not.toBeInTheDocument();
});
