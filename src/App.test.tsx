// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
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

test('filters leads by source', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText('Источник обращения'), { target: { value: 'Instagram' } });

  expect(screen.getByText('София Патель')).toBeInTheDocument();
  expect(screen.queryByText('Марк Рид')).not.toBeInTheDocument();
});

test('shows an empty state and resets filters', () => {
  render(<App />);

  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'нет такой заявки' } });

  expect(screen.getByText('Ничего не найдено')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Сбросить фильтры' }));

  expect(screen.getByText('Елена Брукс')).toBeInTheDocument();
});

test('shows the lead source in the list', () => {
  render(<App />);

  expect(within(screen.getByRole('list')).getAllByText('Сайт')).toHaveLength(2);
});
