export function NotFoundPage() {
  return (
    <section className="page-section not-found">
      <span className="eyebrow">404</span>
      <h1>Страница не найдена</h1>
      <p>Вернитесь к услугам, врачам или записи.</p>
      <div className="hero-actions">
        <a className="button button-primary" href="#/services">
          Услуги
        </a>
        <a className="button button-secondary" href="#/appointment">
          Запись
        </a>
      </div>
    </section>
  );
}
