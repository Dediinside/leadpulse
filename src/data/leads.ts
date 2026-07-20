export const leadStatuses = ['new', 'contacted', 'qualified', 'won', 'lost'] as const;

export type LeadStatus = (typeof leadStatuses)[number];
export type LeadOwner = 'Maya' | 'Jonah' | 'Rina';

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
    id: 'lp-001', customer: 'Elena Brooks', company: 'Brooks & Co.', email: 'elena@brooks.co', phone: '+1 415 555 0128',
    source: 'Website', message: 'Looking for a full kitchen renovation estimate before August.', status: 'new', owner: null,
    createdAt: '2026-07-20T08:15:00.000Z', responseDueAt: '2026-07-20T10:15:00.000Z', answeredAt: null,
  },
  {
    id: 'lp-002', customer: 'Marcus Reed', company: 'Reed Property Group', email: 'marcus@reedpg.com', phone: '+1 646 555 0189',
    source: 'Referral', message: 'We need recurring maintenance for three short-term rentals.', status: 'contacted', owner: 'Maya',
    createdAt: '2026-07-20T07:40:00.000Z', responseDueAt: '2026-07-20T09:40:00.000Z', answeredAt: '2026-07-20T08:05:00.000Z',
  },
  {
    id: 'lp-003', customer: 'Sofia Patel', company: 'Patel Dental', email: 'sofia@pateldental.com', phone: '+1 312 555 0134',
    source: 'Instagram', message: 'Can you refresh a reception area without closing the clinic?', status: 'qualified', owner: 'Rina',
    createdAt: '2026-07-19T16:20:00.000Z', responseDueAt: '2026-07-19T18:20:00.000Z', answeredAt: '2026-07-19T16:45:00.000Z',
  },
  {
    id: 'lp-004', customer: 'Noah Williams', company: 'Williams Home', email: 'noah@example.com', phone: '+1 917 555 0172',
    source: 'Email', message: 'Need a quote for custom shelving in a home office.', status: 'new', owner: 'Jonah',
    createdAt: '2026-07-20T08:50:00.000Z', responseDueAt: '2026-07-20T10:50:00.000Z', answeredAt: null,
  },
  {
    id: 'lp-005', customer: 'Amina Chen', company: 'Cedar House', email: 'amina@cedarhouse.com', phone: '+1 206 555 0193',
    source: 'Website', message: 'Interested in a garden studio with a compact kitchenette.', status: 'won', owner: 'Maya',
    createdAt: '2026-07-14T09:00:00.000Z', responseDueAt: '2026-07-14T11:00:00.000Z', answeredAt: '2026-07-14T09:18:00.000Z',
  },
];
