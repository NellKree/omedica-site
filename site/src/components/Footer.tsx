import { Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contacts, patientLinks, services } from "../data/content";
import { OmedicaLogo } from "./OmedicaLogo";

const phoneHref = (phone: string) => `tel:+${phone.replace(/\D/g, "")}`;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <OmedicaLogo inverted />
          <p>
            Медицинский центр у м. Академическая: диагностика, врачи, семейные услуги и бережное сопровождение пациентов.
          </p>
          <div className="social-links">
            <a href={contacts.socials.telegram} target="_blank" rel="noreferrer">
              <MessageCircle size={16} />
              Telegram
            </a>
            <a href={contacts.socials.vk} target="_blank" rel="noreferrer">
              VK
            </a>
          </div>
        </div>

        <div>
          <h2>Услуги</h2>
          <ul>
            {services.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <a href={`#/services/${service.slug}`}>{service.shortTitle}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Пациентам</h2>
          <ul>
            {patientLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                  <ExternalLink size={13} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Контакты</h2>
          <ul className="contact-list">
            <li>
              <MapPin size={18} />
              <span>
                {contacts.address}
                <small>{contacts.mapHint}</small>
              </span>
            </li>
            <li>
              <Phone size={18} />
              <span>
                <a href={phoneHref(contacts.phone)}>{contacts.phone}</a>
                <a href={phoneHref(contacts.secondPhone)}>{contacts.secondPhone}</a>
              </span>
            </li>
            <li>
              <Mail size={18} />
              <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            </li>
            <li>
              <Clock size={18} />
              <span>
                {contacts.hoursDetailed.map((item) => (
                  <small key={item.days}>{item.days}: {item.time}</small>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-legal">
          <strong>{contacts.legal.company}</strong>
          <span>{contacts.legal.inn}</span>
          <span>{contacts.legal.ogrn}</span>
          <span>{contacts.legal.license}, {contacts.legal.issuedBy}</span>
        </div>
        <div className="footer-disclaimer">
          <span>Информация на сайте не является публичной офертой.</span>
          <span>Имеются противопоказания, необходима консультация специалиста.</span>
        </div>
      </div>
    </footer>
  );
}
