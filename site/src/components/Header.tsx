import { Clock, Mail, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";
import { contacts } from "../data/content";
import { OmedicaLogo } from "./OmedicaLogo";

const links = [
  { href: "#/", label: "Главная" },
  { href: "#/services", label: "Услуги" },
  { href: "#/doctors", label: "Врачи" },
  { href: "#/appointment", label: "Запись" },
];

const phoneHref = (phone: string) => `tel:+${phone.replace(/\D/g, "")}`;

export function Header({ currentPath }: { currentPath: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="top-line">
        <div className="top-line__group">
          <a className="top-line__item address-link" href="#/appointment">
            <MapPin size={14} />
            <span>{contacts.shortAddress} · {contacts.metro}</span>
          </a>
          <span className="top-line__item">
            <Clock size={14} />
            <span>{contacts.hours}</span>
          </span>
        </div>
        <div className="top-line__group">
          <a className="top-line__item" href={`mailto:${contacts.email}`}>
            <Mail size={14} />
            <span>{contacts.email}</span>
          </a>
          <a className="top-line__item" href={contacts.socials.telegram} target="_blank" rel="noreferrer">
            <MessageCircle size={14} />
            <span>Telegram</span>
          </a>
        </div>
      </div>

      <div className="nav-shell">
        <a className="logo-link" href="#/" aria-label="ОМЕДИКА">
          <OmedicaLogo />
        </a>

        <nav className="desktop-nav" aria-label="Основная навигация">
          {links.map((link) => (
            <a
              key={link.href}
              className={currentPath === link.href.replace("#", "") ? "is-active" : ""}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="phone-link" aria-label="Телефоны медицинского центра">
            <Phone size={18} />
            <span>
              <a href={phoneHref(contacts.phone)}>{contacts.phone}</a>
              <a href={phoneHref(contacts.secondPhone)}>{contacts.secondPhone}</a>
            </span>
          </div>
          <a className="button button-primary" href="#/appointment">
            Записаться
          </a>
          <button
            className="icon-button mobile-menu-button"
            type="button"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="mobile-nav" aria-label="Мобильная навигация">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="mobile-nav__meta">
            <span>{contacts.address}</span>
            <span>{contacts.hours}</span>
            <a href={phoneHref(contacts.phone)}>{contacts.phone}</a>
            <a href={phoneHref(contacts.secondPhone)}>{contacts.secondPhone}</a>
            <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            <div className="social-links">
              <a href={contacts.socials.telegram} target="_blank" rel="noreferrer">Telegram</a>
              <a href={contacts.socials.vk} target="_blank" rel="noreferrer">VK</a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
