import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  Clock,
  MapPin,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import { DoctorCard } from "../components/DoctorCard";
import { SectionHeader } from "../components/SectionHeader";
import { ServiceCard } from "../components/ServiceCard";
import { contacts, doctors, reviewInsights, reviewMetrics, reviewSources, reviewStrengths, services, trustStats } from "../data/content";
import { assetPath } from "../lib/assets";

export function HomePage() {
  const featuredServices = services.slice(0, 4);
  const familyServices = services.slice(2, 6);
  const featuredDoctors = doctors.slice(0, 3);
  const { lat, lng } = contacts.coordinates;
  const mapSrc = `https://yandex.ru/map-widget/v1/?ll=${lng}%2C${lat}&pt=${lng}%2C${lat}%2Cpm2rdm&z=17`;
  const yandexMapUrl = `https://yandex.ru/maps/?ll=${lng}%2C${lat}&pt=${lng}%2C${lat}%2Cpm2rdm&z=17`;

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <img src={assetPath("/images/clinic-room.webp")} alt="Врач объясняет пациентке план лечения в О'Медика" />
        </div>
        <div className="hero-copy">
          <span className="eyebrow">Медицинский центр у м. Академическая</span>
          <h1>О’Медика — клиника для взрослых и детей рядом с домом</h1>
          <p>
            Врачи, УЗИ, анализы, женское здоровье, педиатрия и реабилитация в одном медицинском центре на Бутлерова.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#/appointment">
              <CalendarDays size={18} />
              Записаться
            </a>
            <a className="button button-secondary" href="#/services">
              <ClipboardList size={18} />
              Выбрать направление
            </a>
          </div>
        </div>
      </section>

      <section className="section reputation-section">
        <div className="reputation-shell">
          <div className="reputation-summary">
            <span className="eyebrow">Отзывы пациентов</span>
            <h2>Отзывы помогают понять, как проходит прием</h2>
            <p>
              Пациенты чаще всего отмечают внимательное отношение, подробные объяснения врачей, комфорт в клинике,
              хорошее УЗИ и готовность рекомендовать центр близким.
            </p>
            <div className="rating-badge">
              <strong>4,7</strong>
              <span>
                <span className="rating-stars" aria-label="5 из 5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star size={17} fill="currentColor" key={index} />
                  ))}
                </span>
                средняя оценка по открытым площадкам
              </span>
            </div>
          </div>

          <div className="review-proof-panel">
            <div className="review-metrics-grid" aria-label="Метрики отзывов">
              {reviewMetrics.map((metric) => (
                <div className="review-metric" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
            <div className="source-grid" aria-label="Площадки с отзывами">
              {reviewSources.map((source) => (
                <div className="source-card" key={source.source}>
                  <strong>{source.value}</strong>
                  <span>{source.source}</span>
                  <small>{source.label}</small>
                </div>
              ))}
            </div>
            <div className="strength-row" aria-label="Чаще всего отмечают в позитивных отзывах">
              {reviewStrengths.map((strength) => (
                <span key={strength.label}>
                  <strong>{strength.value}</strong>
                  {strength.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="review-highlight-grid">
          {reviewInsights.slice(0, 3).map((review) => (
            <article className="review-highlight-card" key={review.quote}>
              <div className="rating-line">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star size={15} fill="currentColor" key={index} />
                ))}
              </div>
              <p>{review.quote}</p>
              <div className="chip-row">
                {review.tags.slice(0, 2).map((tag) => (
                  <span className="chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="review-meta">
                <span>{review.author ?? "Пациент"}</span>
                <span>{review.source}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader
          eyebrow="Услуги"
          title="Основные направления приема"
          text="Консультации врачей, УЗИ, анализы, женское здоровье, педиатрия и реабилитация в клинике рядом с метро Академическая."
        />
        <div className="cards-grid">
          {featuredServices.map((service) => (
            <ServiceCard service={service} key={service.slug} />
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div>
          <SectionHeader
            eyebrow="Почему нам доверяют"
            title="Врачи и диагностика рядом с домом"
            text="В одном центре можно записаться к врачу, сделать УЗИ, сдать анализы и получить рекомендации по результатам."
          />
          <div className="stats-grid">
            {trustStats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="proof-panel">
          <Sparkles size={24} />
          <h3>Внимательно, без лишней спешки</h3>
          <p>
            В отзывах пациенты чаще всего говорят о внимательности врачей, подробных объяснениях и комфортной атмосфере в клинике.
          </p>
          <ul>
            <li>приемы для взрослых и детей</li>
            <li>УЗИ, анализы и консультации в одном месте</li>
            <li>рядом с метро Академическая</li>
          </ul>
        </div>
      </section>

      <section className="section section-muted">
        <SectionHeader
          eyebrow="Направления"
          title="Медицина для повседневных и сложных вопросов"
          text="В клинике можно закрыть базовые задачи рядом с домом и получить помощь по более редким экспертным направлениям."
        />
        <div className="cards-grid">
          {familyServices.map((service) => (
            <ServiceCard service={service} key={service.slug} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader
          eyebrow="Врачи"
          title="Специалисты, к которым удобно прийти с конкретным вопросом"
          text="Подберите специалиста по направлению, опыту и тому, как врач помогает разобраться в ситуации после приема."
        />
        <div className="doctor-grid">
          {featuredDoctors.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor.slug} />
          ))}
        </div>
      </section>

      <section className="section map-section">
        <div className="map-layout">
          <div className="map-copy">
            <SectionHeader
              eyebrow="Контакты"
              title="О’Медика на Бутлерова, 9к2"
              text="Клиника находится в Калининском районе, рядом с метро Академическая. На карте отмечена точка у корпуса 9к2."
            />
            <div className="contact-cards">
              <div>
                <MapPin size={20} />
                <span>{contacts.address}</span>
                <small>{contacts.mapHint}</small>
              </div>
              <div>
                <Clock size={20} />
                <span className="hours-list">
                  {contacts.hoursDetailed.map((item) => (
                    <span key={item.days}>
                      <strong>{item.days}</strong>
                      <em>{item.time}</em>
                    </span>
                  ))}
                </span>
                <small>Работаем каждый день</small>
              </div>
              <div>
                <Phone size={20} />
                <span>{contacts.phone}</span>
                <small>{contacts.secondPhone}</small>
              </div>
            </div>
            <a className="button button-secondary" href={yandexMapUrl} target="_blank" rel="noreferrer">
              Открыть в Яндекс Картах
            </a>
          </div>
          <div className="map-frame" aria-label="Карта проезда к медицинскому центру О'Медика">
            <iframe
              src={mapSrc}
              title="О'Медика на карте"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a className="map-overlay" href={yandexMapUrl} target="_blank" rel="noreferrer">
              <span className="map-overlay__icon">
                <MapPin size={22} />
              </span>
              <span>
                <strong>О’Медика</strong>
                <small>ул. Бутлерова, 9к2</small>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div>
          <span className="eyebrow">Запись</span>
          <h2>Выберите услугу, врача и удобное время</h2>
          <p>{contacts.mapHint}. Запись помогает быстро подобрать направление, специалиста и ближайший свободный слот.</p>
        </div>
        <a className="button button-primary" href="#/appointment">
          Открыть запись <ArrowRight size={18} />
        </a>
      </section>
    </>
  );
}
