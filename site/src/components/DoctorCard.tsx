import { CalendarDays, Star } from "lucide-react";
import { assetPath } from "../lib/assets";
import type { Doctor } from "../types";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="doctor-card">
      <a className="doctor-photo" href={`#/doctors/${doctor.slug}`} aria-label={doctor.name}>
        <img src={assetPath(doctor.photo)} alt={doctor.name} />
      </a>
      <div className="doctor-content">
        <div className="rating-line">
          <Star size={16} fill="currentColor" />
          <span>
            {doctor.rating.toFixed(1)} · отзывы пациентов
          </span>
        </div>
        <h3>{doctor.name}</h3>
        <p>{doctor.roles.join(", ")}</p>
        <span className="experience">Опыт {doctor.experience}</span>
        <div className="chip-row">
          {doctor.strengths.slice(0, 2).map((item) => (
            <span className="chip" key={item}>
              {item}
            </span>
          ))}
        </div>
        <div className="doctor-actions">
          <a className="button button-secondary" href={`#/doctors/${doctor.slug}`}>
            Подробнее
          </a>
          <a className="icon-link" href={`#/appointment?doctor=${doctor.slug}`} aria-label={`Записаться к ${doctor.name}`}>
            <CalendarDays size={18} />
          </a>
        </div>
      </div>
    </article>
  );
}
