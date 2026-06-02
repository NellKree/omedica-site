import { Filter } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { ServiceCard } from "../components/ServiceCard";
import { serviceCategories, services } from "../data/content";
import type { ServiceCategory } from "../types";

const getInitialCategory = (): ServiceCategory | "all" => {
  const search = window.location.hash.split("?")[1];
  const params = new URLSearchParams(search);
  const category = params.get("category") as ServiceCategory | null;
  if (category && serviceCategories.includes(category)) {
    return category;
  }
  return "all";
};

export function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all">(getInitialCategory);

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return services;
    return services.filter((service) => service.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="page-section">
      <SectionHeader
        eyebrow="Услуги"
        title="Выберите услугу или направление"
        text="Каталог собран по реальным направлениям клиники: женское здоровье, диагностика, дети и семья, реабилитация и общие услуги."
      />

      <div className="filter-bar" aria-label="Фильтр услуг">
        <span>
          <Filter size={18} />
          Категория
        </span>
        <button className={activeCategory === "all" ? "is-active" : ""} type="button" onClick={() => setActiveCategory("all")}>
          Все
        </button>
        {serviceCategories.map((category) => (
          <button
            className={activeCategory === category ? "is-active" : ""}
            type="button"
            onClick={() => setActiveCategory(category)}
            key={category}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="cards-grid">
        {filteredServices.map((service) => (
          <ServiceCard service={service} key={service.slug} />
        ))}
      </div>
    </section>
  );
}
