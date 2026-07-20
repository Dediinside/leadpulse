import { describe, expect, test } from 'vitest';
import { getAttentionLeads, type Lead } from './leads';

const lead = (overrides: Partial<Lead>): Lead => ({
  id: 'lead-1',
  customer: 'Avery Chen',
  company: 'Northstar Studio',
  email: 'avery@example.com',
  phone: '+1 555 014 220',
  source: 'Website',
  message: 'I need help with a kitchen renovation.',
  status: 'new',
  owner: null,
  createdAt: '2026-07-20T08:00:00.000Z',
  responseDueAt: '2026-07-20T11:00:00.000Z',
  answeredAt: null,
  ...overrides,
});

describe('getAttentionLeads', () => {
  test('returns overdue and unassigned open leads, but not closed leads', () => {
    const result = getAttentionLeads(
      [
        lead({ id: 'overdue', owner: 'Maya', responseDueAt: '2026-07-20T09:00:00.000Z' }),
        lead({ id: 'unassigned', responseDueAt: '2026-07-20T15:00:00.000Z' }),
        lead({ id: 'won', status: 'won', responseDueAt: '2026-07-20T09:00:00.000Z' }),
        lead({ id: 'answered', owner: 'Maya', answeredAt: '2026-07-20T08:30:00.000Z' }),
      ],
      new Date('2026-07-20T10:00:00.000Z'),
    );

    expect(result.map(({ id }) => id)).toEqual(['overdue', 'unassigned']);
  });
});
