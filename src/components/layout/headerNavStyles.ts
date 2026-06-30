/** Shared desktop nav link styles — underline transition like event-frontend */
export const headerNavLinkClass = (isActive: boolean) =>
  `border-b-2 py-1 text-sm font-medium uppercase tracking-wide transition-all duration-300 ${
    isActive
      ? "border-olive-gold text-olive-gold"
      : "border-transparent text-olive-text/80 hover:border-olive-gold/60 hover:text-olive-text"
  }`;
