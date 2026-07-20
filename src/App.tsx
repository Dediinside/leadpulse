import { getAttentionLeads, initialLeads, leadStatuses, type LeadStatus } from './data/leads';

const statusLabel: Record<LeadStatus, string> = {
  new: 'Новая',
  contacted: 'В работе',
  qualified: 'Квалифицирована',
  won: 'Выиграна',
  lost: 'Не подошла',
};

const displayNow = new Date('2026-07-20T11:00:00.000Z');

export default function App() {
  const attention = getAttentionLeads(initialLeads, displayNow);
  const openLeads = initialLeads.filter(({ status }) => !['won', 'lost'].includes(status));
  const answeredToday = initialLeads.filter(({ answeredAt }) => answeredAt?.startsWith('2026-07-20')).length;

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#workspace" aria-label="Рабочая панель LeadPulse">
          <span className="brand-mark">LP</span>
          <span>LeadPulse</span>
        </a>
        <div className="topbar-meta">
          <span className="live-dot" aria-hidden="true" />
          Рабочая область
        </div>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">Понедельник · 20 июля</p>
          <h1 id="page-title">Ритм ответов.</h1>
          <p className="intro-copy">Держите каждое новое обращение в работе, пока клиент не передумал.</p>
        </div>
        <button className="primary-action" type="button">Добавить заявку <span aria-hidden="true">↗</span></button>
      </section>

      <section className="pulse" aria-label="Сводка по заявкам">
        <article className="metric attention-metric">
          <span className="metric-label">Требуют внимания</span>
          <strong>{attention.length}</strong>
          <span className="metric-caption">ответьте до потери интереса</span>
        </article>
        <article className="metric">
          <span className="metric-label">Открытые обращения</span>
          <strong>{openLeads.length}</strong>
          <span className="metric-caption">во всех этапах работы</span>
        </article>
        <article className="metric">
          <span className="metric-label">Ответили сегодня</span>
          <strong>{answeredToday}</strong>
          <span className="metric-caption">всё под контролем</span>
        </article>
      </section>

      <section className="workspace" id="workspace" aria-labelledby="inbox-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Входящие</p>
            <h2 id="inbox-heading">Последние заявки</h2>
          </div>
          <button className="text-action" type="button">Все заявки <span aria-hidden="true">→</span></button>
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
                <span className="owner">{lead.owner ?? 'Не назначен'}</span>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
