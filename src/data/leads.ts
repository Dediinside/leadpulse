export const leadStatuses = ['new', 'contacted', 'qualified', 'won', 'lost'] as const;

export type LeadStatus = (typeof leadStatuses)[number];
export type LeadOwner = 'Алина' | 'Михаил' | 'София';

export type Lead = {
  id: string;
  customer: string;
  company: string;
  email: string;
  phone: string;
  source: 'Website' | 'Referral' | 'Instagram' | 'Email';
  message: string;
  status: LeadStatus;
  owner: LeadOwner | null;
  createdAt: string;
  responseDueAt: string;
  answeredAt: string | null;
};

const closedStatuses: LeadStatus[] = ['won', 'lost'];

export const getAttentionLeads = (leads: Lead[], now = new Date()): Lead[] =>
  leads.filter(
    (lead) =>
      !closedStatuses.includes(lead.status) &&
      !lead.answeredAt &&
      (!lead.owner || new Date(lead.responseDueAt) <= now),
  );

export const initialLeads: Lead[] = [
  {
    id: 'lp-001', customer: 'Елена Брукс', company: 'Брукс и партнёры', email: 'elena@brooks.co', phone: '+1 415 555 0128',
    source: 'Website', message: 'Нужна смета на ремонт кухни до начала августа.', status: 'new', owner: null,
    createdAt: '2026-07-20T08:15:00.000Z', responseDueAt: '2026-07-20T10:15:00.000Z', answeredAt: null,
  },
  {
    id: 'lp-002', customer: 'Марк Рид', company: 'Рид Проперти', email: 'marcus@reedpg.com', phone: '+1 646 555 0189',
    source: 'Referral', message: 'Нужен регулярный сервис для трёх апартаментов.', status: 'contacted', owner: 'Алина',
    createdAt: '2026-07-20T07:40:00.000Z', responseDueAt: '2026-07-20T09:40:00.000Z', answeredAt: '2026-07-20T08:05:00.000Z',
  },
  {
    id: 'lp-003', customer: 'София Патель', company: 'Патель Дентал', email: 'sofia@pateldental.com', phone: '+1 312 555 0134',
    source: 'Instagram', message: 'Можно обновить зону ресепшена без закрытия клиники?', status: 'qualified', owner: 'София',
    createdAt: '2026-07-19T16:20:00.000Z', responseDueAt: '2026-07-19T18:20:00.000Z', answeredAt: '2026-07-19T16:45:00.000Z',
  },
  {
    id: 'lp-004', customer: 'Ной Уильямс', company: 'Уильямс Хоум', email: 'noah@example.com', phone: '+1 917 555 0172',
    source: 'Email', message: 'Нужна смета на стеллажи для домашнего кабинета.', status: 'new', owner: 'Михаил',
    createdAt: '2026-07-20T08:50:00.000Z', responseDueAt: '2026-07-20T10:50:00.000Z', answeredAt: null,
  },
  {
    id: 'lp-005', customer: 'Амина Чен', company: 'Сидар Хаус', email: 'amina@cedarhouse.com', phone: '+1 206 555 0193',
    source: 'Website', message: 'Интересует садовая студия с компактной кухней.', status: 'won', owner: 'Алина',
    createdAt: '2026-07-14T09:00:00.000Z', responseDueAt: '2026-07-14T11:00:00.000Z', answeredAt: '2026-07-14T09:18:00.000Z',
  },
];
