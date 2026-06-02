import { CalendarDays } from "lucide-react";
import { dates, slots } from "../data/content";

export function AppointmentWidget({
  title = "Ближайшие слоты",
  service,
  doctor,
}: {
  title?: string;
  service?: string;
  doctor?: string;
}) {
  return (
    <aside className="appointment-widget">
      <div className="widget-title">
        <CalendarDays size={20} />
        <h3>{title}</h3>
      </div>
      <div className="date-strip">
        {dates.map((date, index) => (
          <a
            className={index === 1 ? "date-pill is-active" : "date-pill"}
            href={`#/appointment?${service ? `service=${service}&` : ""}${doctor ? `doctor=${doctor}&` : ""}date=${encodeURIComponent(date)}`}
            key={date}
          >
            <strong>{date.split(" ")[0]}</strong>
            <span>{date.split(" ")[1]}</span>
          </a>
        ))}
      </div>
      <div className="slot-grid">
        {slots.map((slot) => (
          <a
            href={`#/appointment?${service ? `service=${service}&` : ""}${doctor ? `doctor=${doctor}&` : ""}time=${slot}`}
            key={slot}
          >
            {slot}
          </a>
        ))}
      </div>
      <p>Выберите дату и время, а администратор поможет подтвердить запись и подготовку к визиту.</p>
    </aside>
  );
}
