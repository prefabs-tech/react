import React from "react";

interface CardProperties {
  children: React.ReactNode;
  className?: string;
  outlined?: boolean;
}

export const Card: React.FC<CardProperties> = ({
  children,
  className = "",
  outlined = false,
}) => {
  return (
    <div
      className={`dz-card ${className}`.trim()}
      data-variant-outlined={outlined}
    >
      {children}
    </div>
  );
};
