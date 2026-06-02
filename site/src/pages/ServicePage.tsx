import { ArrowLeft, CheckCircle2, Clock, FileText, ShieldCheck } from "lucide-react";
import { AppointmentWidget } from "../components/AppointmentWidget";
import { DoctorCard } from "../components/DoctorCard";
import { Faq } from "../components/Faq";
import { SectionHeader } from "../components/SectionHeader";
import { doctorsForService, getService, reviewInsights } from "../data/content";
import { assetPath } from "../lib/assets";
import { NotFoundPage } from "./NotFoundPage";

export function ServicePage({ slug }: { slug: string }) {
  const service = getService(slug);

  if (!service) return <NotFoundPage />;

  const doctors = doctorsForService(service.slug);

  return (
    <>
      <section className="detail-hero">
        <a className="back-link" href="#/services">
          <ArrowLeft size={16} />
          Все услуги
        </a>
        <div className="detail-grid">
          <div className="detail-copy">
            <span className="eyebrow">{service.category}</span>
            <h1>{service.title}</h1>
            <p>{service.summary}</p>
            <div className="detail-meta">
              <span>
                <Clock size={18} />
                Первый шаг за 2 минуты
              </span>
              <span>
                <FileText size={18} />
                {service.priceFrom}
              </span>
              <span>
                <ShieldCheck size={18} />
                Без агрессивных назначений
              </span>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href={`#/appointment?service=${service.slug}`}>
                Записаться на услугу
              </a>
              <a className="button button-secondary" href="#/doctors">
                Выбрать врача
              </a>
            </div>
          </div>
          <div className="detail-image">
            <img src={assetPath(service.image)} alt="" />
          </div>
        </div>
      </section>

      <section className="section two-column">
        <div>
          <SectionHeader eyebrow="Когда обращаться" title="Поводы, с которыми стоит записаться" />
          <div className="reason-list">
            {service.suitableFor.map((item) => (
              <div className="reason-item" key={item}>
                <CheckCircle2 size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <SectionHeader eyebrow="Как проходит" title="Без лишней тревоги и медицинского тумана" />
          <div className="timeline">
            {service.steps.map((step, index) => (
              <div className="timeline-item" key={step}>
                <strong>{index + 1}</strong>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
        <AppointmentWidget service={service.slug} />
      </section>

      <section className="section section-muted">
        <SectionHeader eyebrow="Специалисты" title="Врачи по направлению" />
        <div className="doctor-grid">
          {doctors.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor.slug} />
          ))}
        </div>
      </section>

      <section className="section two-column">
        <div>
          <SectionHeader eyebrow="FAQ" title="Частые вопросы" />
          <Faq items={service.faqs} />
        </div>
        <div className="article-panel">
          <h3>Полезные материалы</h3>
          {service.relatedArticles.map((article) => (
            <a href="#/services" key={article}>
              {article}
            </a>
          ))}
        </div>
      </section>

      <section className="section review-section compact">
        <SectionHeader eyebrow="Отзывы" title="Что важно пациентам" />
        <div className="review-grid">
          {reviewInsights.slice(0, 2).map((review) => (
            <article className="review-card" key={review.quote}>
              <p>{review.quote}</p>
              <div className="review-meta">
                <span>{review.serviceOrDoctor}</span>
                <span>{review.source}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
