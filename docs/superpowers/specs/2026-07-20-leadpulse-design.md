# LeadPulse design

## Goal

Create a polished lead-management product for a service team that keeps incoming client leads visible, assigned, and answered on time.

## First release

- A responsive single-page dashboard with a lead pipeline, lead details, search, filters, and an attention queue.
- Local seed data only; no authentication, billing, external messaging, or backend.
- Users can move leads between statuses, assign an owner, and mark a lead as answered. Changes persist in browser storage.

## Interface

- Dashboard summary: open, due soon, and overdue lead counts.
- Pipeline: New, Contacted, Qualified, Won, Lost.
- Lead detail: customer identity, contact details, source, message, owner, timestamps, and activity history.
- Attention queue: open leads that have no owner or whose response deadline has passed.

## Quality bar

- Russian copy, coherent realistic data, keyboard-accessible controls, and responsive layouts for desktop and mobile.
- No integrations are presented as connected when they are not implemented.
