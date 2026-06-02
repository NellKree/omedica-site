import { ArrowLeft, GraduationCap, Star } from "lucide-react";
import { AppointmentWidget } from "../components/AppointmentWidget";
import { Faq } from "../components/Faq";
import { SectionHeader } from "../components/SectionHeader";
import { ServiceCard } from "../components/ServiceCard";
import { getDoctor, servicesForDoctor } from "../data/content";
import { assetPath } from "../lib/assets";
import { NotFoundPage } from "./NotFoundPage";

const doctorFaq = [
  {
    question: "Можно ли выбрать только консультацию?",
    answer: "Да. Сначала консультация, затем врач объясняет варианты и согласует с вами дальнейшие действия.",
  },
  {
    question: "Как подготовиться к приему?",
    answer: "Возьмите результаты прошлых обследований, список лекарств и вопросы, которые хотите обсудить.",
  },
];

export function DoctorPage({ slug }: { slug: string }) {
  const doctor = getDoctor(slug);

  if (!doctor) return <NotFoundPage />;

  const services = servicesForDoctor(doctor.slug);

  return (
    <>
      <section className="doctor-profile">
        <a className="back-link" href="#/doctors">
          <ArrowLeft size={16} />
          Все врачи
        </a>
        <div className="doctor-profile-grid">
          <div className="profile-photo">
            <img src={assetPath(doctor.photo)} alt={doctor.name} />
          </div>
          <div className="profile-copy">
            <div className="rating-line">
              <Star size={18} fill="currentColor" />
              <span>
                {doctor.rating.toFixed(1)} · отзывы пациентов
              </span>
            </div>
            <h1>{doctor.name}</h1>
            <p>{doctor.roles.join(", ")}. Опыт {doctor.experience}.</p>
            <blockquote>{doctor.quote}</blockquote>
            <div className="chip-row">
              {doctor.strengths.map((strength) => (
                <span className="chip" key={strength}>
                  {strength}
                </span>
              ))}
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href={`#/appointment?doctor=${doctor.slug}`}>
                Записаться к врачу
              </a>
              <a className="button button-secondary" href="#education">
                Образование
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section two-column">
        <div id="education">
          <SectionHeader eyebrow="Образование" title="Профессиональная база" />
          <div className="education-list">
            {doctor.education.map((item) => (
              <div className="education-item" key={item}>
                <GraduationCap size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <AppointmentWidget doctor={doctor.slug} />
      </section>

      <section className="section section-muted">
        <SectionHeader eyebrow="Услуги" title="С чем можно обратиться" />
        <div className="cards-grid">
          {services.map((service) => (
            <ServiceCard service={service} key={service.slug} />
          ))}
        </div>
      </section>

      <section className="section two-column">
        <div>
          <SectionHeader eyebrow="Отзывы" title="Что отмечают пациенты" />
          <div className="quote-panel">
            <p>{doctor.quote}</p>
            <span>Пациентам важны опыт врача, уважительный тон общения и понятные рекомендации после приема.</span>
          </div>
        </div>
        <div>
          <SectionHeader eyebrow="FAQ" title="Перед приемом" />
          <Faq items={doctorFaq} />
        </div>
      </section>
    </>
  );
}
