export function OmedicaLogo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={inverted ? "brand-logo is-inverted" : "brand-logo"} aria-label="О'Медика">
      <span className="brand-logo__name">О’Медика</span>
      <span className="brand-logo__line" />
      <span className="brand-logo__caption">медицинский центр</span>
    </span>
  );
}
