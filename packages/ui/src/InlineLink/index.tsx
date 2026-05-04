import React from "react";
import { Link } from "react-router-dom";

interface Properties {
  className?: string;
  external?: boolean;
  label: React.ReactNode;
  target?: HTMLAnchorElement["target"];
  to: string;
  underlined?: boolean;
}

const InlineLink = ({
  className = "",
  external = false,
  label,
  target,
  to,
  underlined = false,
}: Properties) => {
  const linkClassName =
    `inline-link ${underlined ? "underlined" : ""} ${className}`
      .replace(/\s\s/, " ")
      .trim();

  if (external) {
    return (
      <a
        className={linkClassName}
        data-testid="external-link"
        href={to}
        rel="noopener noreferrer"
        target={target || "_blank"}
      >
        {label}
      </a>
    );
  }

  return (
    <Link className={linkClassName} data-testid="internal-link" to={to}>
      {label}
    </Link>
  );
};

export default InlineLink;
