export function OmedicaLogo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={inverted ? "brand-logo is-inverted" : "brand-logo"} aria-label="ОМЕДИКА">
      <span className="brand-logo__name">ОМЕДИКА</span>
      <span className="brand-logo__line" />
      <span className="brand-logo__caption">медицинский центр</span>
    </span>
  );
}
