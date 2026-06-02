import { CheckCircle2, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { dates, doctors, getDoctor, getService, patientInterests, services, slots } from "../data/content";
import type { AppointmentFormState } from "../types";

const initialState = (): AppointmentFormState => {
  const query = window.location.hash.split("?")[1] ?? "";
  const params = new URLSearchParams(query);
  return {
    interest: params.get("interest") ?? undefined,
    service: params.get("service") ?? undefined,
    doctor: params.get("doctor") ?? undefined,
    date: params.get("date") ?? dates[1],
    time: params.get("time") ?? slots[1],
  };
};

export function AppointmentPage() {
  const [formState, setFormState] = useState<AppointmentFormState>(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedService = getService(formState.service);
  const selectedDoctor = getDoctor(formState.doctor);

  const updateFormState = (patch: AppointmentFormState) => {
    setFormState((current) => ({ ...current, ...patch }));
    setIsSubmitted(false);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="page-section appointment-page">
      <SectionHeader
        eyebrow="Запись"
        title="Выберите направление, врача и удобное время"
        text="Форма помогает быстро выбрать услугу, специалиста и ближайшее удобное время."
      />

      <div className="appointment-layout">
        <form className="appointment-form" onSubmit={submit}>
          <label>
            Что вас интересует?
            <select value={formState.interest ?? ""} onChange={(event) => updateFormState({ interest: event.target.value })}>
              <option value="">Выберите вариант</option>
              {patientInterests.map((interest) => (
                <option value={interest} key={interest}>
                  {interest}
                </option>
              ))}
            </select>
          </label>

          <label>
            Услуга
            <select value={formState.service ?? ""} onChange={(event) => updateFormState({ service: event.target.value })}>
              <option value="">Выберите услугу</option>
              {services.map((service) => (
                <option value={service.slug} key={service.slug}>
                  {service.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Врач
            <select value={formState.doctor ?? ""} onChange={(event) => updateFormState({ doctor: event.target.value })}>
              <option value="">Можно подобрать позже</option>
              {doctors.map((doctor) => (
                <option value={doctor.slug} key={doctor.slug}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </label>

          <div className="form-group">
            <span>Дата</span>
            <div className="segmented-grid">
              {dates.map((date) => (
                <button
                  className={formState.date === date ? "is-active" : ""}
                  type="button"
                  onClick={() => updateFormState({ date })}
                  key={date}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <span>Время</span>
            <div className="segmented-grid compact">
              {slots.map((time) => (
                <button
                  className={formState.time === time ? "is-active" : ""}
                  type="button"
                  onClick={() => updateFormState({ time })}
                  key={time}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <label>
              Имя
              <input
                value={formState.name ?? ""}
                onChange={(event) => updateFormState({ name: event.target.value })}
                placeholder="Как к вам обращаться"
              />
            </label>
            <label>
              Телефон
              <input
                value={formState.phone ?? ""}
                onChange={(event) => updateFormState({ phone: event.target.value })}
                placeholder="+7"
              />
            </label>
          </div>

          <label>
            Комментарий
            <textarea
              value={formState.comment ?? ""}
              onChange={(event) => updateFormState({ comment: event.target.value })}
              placeholder="Например: хочу совместить консультацию и УЗИ"
            />
          </label>

          <button className="button button-primary" type="submit">
            <Send size={18} />
            Оставить заявку
          </button>
        </form>

        <aside className="appointment-summary">
          <h2>Заявка на прием</h2>
          <div className="summary-list">
            <div>
              <span>Интерес</span>
              <strong>{formState.interest ?? "Не выбран"}</strong>
            </div>
            <div>
              <span>Услуга</span>
              <strong>{selectedService?.shortTitle ?? "Подберем на звонке"}</strong>
            </div>
            <div>
              <span>Врач</span>
              <strong>{selectedDoctor?.name ?? "Любой подходящий специалист"}</strong>
            </div>
            <div>
              <span>Слот</span>
              <strong>
                {formState.date}, {formState.time}
              </strong>
            </div>
          </div>
          <p>
            Администратор уточнит детали визита, подготовку к услуге и подтвердит удобное время.
          </p>
          {isSubmitted && (
            <div className="success-box">
              <CheckCircle2 size={20} />
              <span>Заявка подготовлена. Администратор свяжется для подтверждения.</span>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
