# LeadPulse MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, local-first lead-management product.

**Architecture:** A Vite React single page renders typed local lead data and derives dashboard metrics from client-side state. Browser storage persists user changes between sessions; no server is introduced.

**Tech Stack:** React, TypeScript, Vite, CSS, Vitest.

## Global Constraints

- Keep the MVP frontend-only and local-first.
- Use no component library or backend dependency.
- Keep every interaction keyboard accessible.

---

### Task 1: Create the application shell and domain model

**Files:**
- Create: `package.json`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/types.ts`, `src/data/leads.ts`, `src/styles.css`
- Test: `src/data/leads.test.ts`

**Interfaces:**
- Produces: `Lead`, `LeadStatus`, `LeadOwner`, `initialLeads`, and `getAttentionLeads(leads)`.

- [ ] Add a Vite React TypeScript application with a type-safe `Lead` model and twelve realistic seed leads.
- [ ] Test that attention leads include overdue and unassigned open leads, but exclude won and lost leads.
- [ ] Render the dashboard shell with summary metrics and verify `npm run test` passes.

### Task 2: Build the lead workspace

**Files:**
- Modify: `src/App.tsx`, `src/styles.css`
- Create: `src/components/LeadList.tsx`, `src/components/LeadDetail.tsx`, `src/components/AttentionQueue.tsx`
- Test: `src/components/LeadList.test.tsx`

**Interfaces:**
- Consumes: `Lead`, `LeadStatus`, `getAttentionLeads`.
- Produces: selectable lead rows and lead detail rendering.

- [ ] Add search, status filters, lead list, attention queue, and a detailed selected-lead panel.
- [ ] Test search and status filtering against rendered lead rows.
- [ ] Verify the workspace is usable with keyboard navigation and a narrow viewport.

### Task 3: Add purposeful lead updates and polish

**Files:**
- Modify: `src/App.tsx`, `src/styles.css`, `src/components/LeadDetail.tsx`
- Create: `src/lib/storage.ts`, `src/lib/storage.test.ts`

**Interfaces:**
- Produces: status, owner, and answered-state updates persisted under the `leadpulse:leads` browser-storage key.

- [ ] Implement status movement, owner assignment, and mark-as-answered actions.
- [ ] Test serializing and restoring leads from storage, including invalid saved data fallback.
- [ ] Apply responsive visual polish and run the complete test suite and production build.
