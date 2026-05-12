import { ReactNode } from "react";

interface Properties {
  children?: ReactNode;
  subtitle?: string;
  title?: string;
}

export const Section: React.FC<Properties> = ({
  children,
  subtitle,
  title,
}) => {
  return (
    <section className="demo-section">
      {title && <h2>{title}</h2>}
      {subtitle && <small>{subtitle}</small>}
      <div className="demo-section-content">{children}</div>
    </section>
  );
};
