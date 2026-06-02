import { ArrowRight } from "lucide-react";
import { assetPath } from "../lib/assets";
import type { Service } from "../types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="service-card">
      <a className="service-image" href={`#/services/${service.slug}`} aria-label={service.title}>
        <img src={assetPath(service.image)} alt="" />
        <span>{service.category}</span>
      </a>
      <div className="card-body">
        <div className="card-title-row">
          <h3>{service.shortTitle}</h3>
          <strong>{service.priceFrom}</strong>
        </div>
        <p>{service.summary}</p>
        <div className="chip-row">
          {service.suitableFor.slice(0, 3).map((item) => (
            <span className="chip" key={item}>
              {item}
            </span>
          ))}
        </div>
        <a className="text-link" href={`#/services/${service.slug}`}>
          Подробнее <ArrowRight size={16} />
        </a>
      </div>
    </article>
  );
}
