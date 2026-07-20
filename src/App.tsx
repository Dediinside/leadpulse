import { getAttentionLeads, initialLeads, leadStatuses, type LeadStatus } from './data/leads';

const statusLabel: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  won: 'Won',
  lost: 'Lost',
};

const demoNow = new Date('2026-07-20T11:00:00.000Z');

export default function App() {
  const attention = getAttentionLeads(initialLeads, demoNow);
  const openLeads = initialLeads.filter(({ status }) => !['won', 'lost'].includes(status));
  const answeredToday = initialLeads.filter(({ answeredAt }) => answeredAt?.startsWith('2026-07-20')).length;

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#workspace" aria-label="LeadPulse dashboard">
          <span className="brand-mark">LP</span>
          <span>LeadPulse</span>
        </a>
        <div className="topbar-meta">
          <span className="live-dot" aria-hidden="true" />
          Demo workspace
        </div>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">Monday · 20 July</p>
          <h1 id="page-title">Your response rhythm.</h1>
          <p className="intro-copy">Stay close to every new conversation before it goes quiet.</p>
        </div>
        <button className="primary-action" type="button">Add lead <span aria-hidden="true">↗</span></button>
      </section>

      <section className="pulse" aria-label="Lead response summary">
        <article className="metric attention-metric">
          <span className="metric-label">Needs attention</span>
          <strong>{attention.length}</strong>
          <span className="metric-caption">respond before they cool off</span>
        </article>
        <article className="metric">
          <span className="metric-label">Open conversations</span>
          <strong>{openLeads.length}</strong>
          <span className="metric-caption">across your pipeline</span>
        </article>
        <article className="metric">
          <span className="metric-label">Answered today</span>
          <strong>{answeredToday}</strong>
          <span className="metric-caption">a calm start</span>
        </article>
      </section>

      <section className="workspace" id="workspace" aria-labelledby="inbox-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Inbox</p>
            <h2 id="inbox-heading">Latest leads</h2>
          </div>
          <button className="text-action" type="button">View all leads <span aria-hidden="true">→</span></button>
        </div>
        <div className="lead-list" role="list">
          {initialLeads.map((lead) => {
            const needsAttention = attention.some(({ id }) => id === lead.id);
            return (
              <article className="lead-row" key={lead.id} role="listitem">
                <div className={`pulse-pin ${needsAttention ? 'is-urgent' : ''}`} aria-hidden="true" />
                <div className="lead-identity">
                  <strong>{lead.customer}</strong>
                  <span>{lead.company}</span>
                </div>
                <p className="lead-message">{lead.message}</p>
                <span className={`status status-${lead.status}`}>{statusLabel[lead.status]}</span>
                <span className="owner">{lead.owner ?? 'Unassigned'}</span>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
