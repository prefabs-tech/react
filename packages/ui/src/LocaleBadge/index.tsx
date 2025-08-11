import React from "react";

interface LocaleBadgeProperties {
  locale: string;
}

const LocaleBadge: React.FC<LocaleBadgeProperties> = ({ locale }) => {
  const languageCode = locale.substring(0, 2);
  const country = locale.includes("-") ? locale.split("-")[1] : undefined;

  return (
    <span className="locale-badge">
      {languageCode}
      {country && <span className="country">{country}</span>}
    </span>
  );
};

export default LocaleBadge;
