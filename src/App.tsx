import { useState } from 'react';
import { getAttentionLeads, initialLeads, leadStatuses, type Lead, type LeadStatus } from './data/leads';

const statusLabel: Record<LeadStatus, string> = {
  new: 'Новая',
  contacted: 'В работе',
  qualified: 'Квалифицирована',
  won: 'Выиграна',
  lost: 'Не подошла',
};

const sourceLabel: Record<Lead['source'], string> = {
  Website: 'Сайт',
  Referral: 'Рекомендация',
  Instagram: 'Instagram',
  Email: 'Почта',
};

const displayNow = new Date('2026-07-20T11:00:00.000Z');

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<LeadStatus | 'all'>('all');
  const [source, setSource] = useState<Lead['source'] | 'all'>('all');
  const [withoutOwner, setWithoutOwner] = useState(false);
  const [attentionFirst, setAttentionFirst] = useState(false);
  const [openOnly, setOpenOnly] = useState(false);
  const attention = getAttentionLeads(initialLeads, displayNow);
  const openLeads = initialLeads.filter(({ status }) => !['won', 'lost'].includes(status));
  const answeredToday = initialLeads.filter(({ answeredAt }) => answeredAt?.startsWith('2026-07-20')).length;
  const visibleLeads = initialLeads.filter(({ customer, company, email, phone }) =>
    `${customer} ${company} ${email} ${phone}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
  ).filter(({ status: leadStatus }) => status === 'all' || leadStatus === status)
    .filter(({ source: leadSource }) => source === 'all' || leadSource === source)
    .filter(({ owner }) => !withoutOwner || !owner)
    .filter(({ status: leadStatus }) => !openOnly || !['won', 'lost'].includes(leadStatus));
  const sortedLeads = attentionFirst
    ? [...visibleLeads].sort((left, right) => Number(attention.some(({ id }) => id === right.id)) - Number(attention.some(({ id }) => id === left.id)))
    : visibleLeads;
  const hasFilters = Boolean(query || status !== 'all' || source !== 'all' || withoutOwner || attentionFirst || openOnly);

  const resetFilters = () => {
    setQuery('');
    setStatus('all');
    setSource('all');
    setWithoutOwner(false);
    setAttentionFirst(false);
    setOpenOnly(false);
  };

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
            <p className="lead-count">Найдено: {visibleLeads.length}</p>
          </div>
          <div className="lead-controls">
            <label className="search-field">
              <span className="sr-only">Поиск заявок</span>
              <input
                type="search"
                placeholder="Поиск по имени, компании, email или телефону"
                value={query}
                onChange={({ target }) => setQuery(target.value)}
              />
            </label>
            <label className="status-filter">
              <span className="sr-only">Статус заявки</span>
              <select value={status} onChange={({ target }) => setStatus(target.value as LeadStatus | 'all')}>
                <option value="all">Все статусы</option>
                {leadStatuses.map((item) => <option key={item} value={item}>{statusLabel[item]}</option>)}
              </select>
            </label>
            <label className="status-filter">
              <span className="sr-only">Источник обращения</span>
              <select value={source} onChange={({ target }) => setSource(target.value as Lead['source'] | 'all')}>
                <option value="all">Все источники</option>
                {Object.entries(sourceLabel).map(([item, label]) => <option key={item} value={item}>{label}</option>)}
              </select>
            </label>
            <label className="owner-filter">
              <input type="checkbox" checked={withoutOwner} onChange={({ target }) => setWithoutOwner(target.checked)} />
              Без ответственного
            </label>
            <label className="owner-filter">
              <input type="checkbox" checked={attentionFirst} onChange={({ target }) => setAttentionFirst(target.checked)} />
              Сначала требующие внимания
            </label>
            <label className="owner-filter">
              <input type="checkbox" checked={openOnly} onChange={({ target }) => setOpenOnly(target.checked)} />
              Только открытые
            </label>
            {hasFilters && <button className="text-action" type="button" onClick={resetFilters}>Сбросить фильтры</button>}
          </div>
        </div>
        <div className="lead-list" role="list">
          {sortedLeads.length > 0 ? sortedLeads.map((lead) => {
            const needsAttention = attention.some(({ id }) => id === lead.id);
            return (
              <article className="lead-row" key={lead.id} role="listitem">
                <div className={`pulse-pin ${needsAttention ? 'is-urgent' : ''}`} aria-hidden="true" />
                <div className="lead-identity">
                  <strong>{lead.customer}</strong>
                  <span>{lead.company}</span>
                </div>
                <p className="lead-message">{lead.message}</p>
                <span className="source">{sourceLabel[lead.source]}</span>
                <span className={`status status-${lead.status}`}>{statusLabel[lead.status]}</span>
                <span className="owner">{lead.owner ?? 'Не назначен'}</span>
              </article>
            );
          }) : (
            <div className="empty-state">
              <strong>Ничего не найдено</strong>
              <p>Измените параметры поиска или сбросьте фильтры.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
