import { ReactNode, forwardRef } from "react";

import { tagColors } from "./TagColors";

type TagProperties = {
  className?: string;
  color?: string;
  fullWidth?: boolean;
  icon?: string;
  label?: string;
  rounded?: boolean;
  style?: React.CSSProperties;
  renderContent?: () => ReactNode;
} & Omit<React.HTMLAttributes<HTMLSpanElement>, "style" | "class" | "color">;

export const Tag = forwardRef<HTMLSpanElement, TagProperties>(
  (
    {
      className = "",
      color = "default",
      fullWidth,
      icon,
      label,
      rounded,
      style,
      renderContent,
      ...properties
    },
    reference,
  ) => {
    const tagStyle = {
      ...style,
      backgroundColor: tagColors[color] || color,
    };

    return (
      <span
        ref={reference}
        className={`dz-tag ${className} ${rounded ? "rounded" : ""} ${
          fullWidth ? "full-width" : ""
        }`.trimEnd()}
        style={tagStyle}
        {...properties}
      >
        {renderContent ? (
          renderContent()
        ) : (
          <>
            {icon && <i className={icon}></i>}
            {label && label}
          </>
        )}
      </span>
    );
  },
);
