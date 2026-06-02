import { useMemo, useState } from "react";
import { DoctorCard } from "../components/DoctorCard";
import { SectionHeader } from "../components/SectionHeader";
import { doctors, services } from "../data/content";

export function DoctorsPage() {
  const [activeService, setActiveService] = useState("all");

  const filteredDoctors = useMemo(() => {
    if (activeService === "all") return doctors;
    return doctors.filter((doctor) => doctor.services.includes(activeService));
  }, [activeService]);

  return (
    <section className="page-section">
      <SectionHeader
        eyebrow="Врачи"
        title="Выберите специалиста по задаче, опыту и стилю коммуникации"
        text="В карточках есть специализация, опыт, отзывы, сильные стороны врача и быстрый переход к записи."
      />

      <div className="filter-bar">
        <span>Направление</span>
        <button className={activeService === "all" ? "is-active" : ""} type="button" onClick={() => setActiveService("all")}>
          Все
        </button>
        {services.slice(0, 6).map((service) => (
          <button
            className={activeService === service.slug ? "is-active" : ""}
            type="button"
            onClick={() => setActiveService(service.slug)}
            key={service.slug}
          >
            {service.shortTitle}
          </button>
        ))}
      </div>

      <div className="doctor-grid">
        {filteredDoctors.map((doctor) => (
          <DoctorCard doctor={doctor} key={doctor.slug} />
        ))}
      </div>
    </section>
  );
}
