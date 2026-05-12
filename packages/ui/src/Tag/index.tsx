import { forwardRef, ReactNode } from "react";

import { tagColors } from "./TagColors";

type TagProperties = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "class" | "color" | "style"
> & {
  className?: string;
  color?: string;
  fullWidth?: boolean;
  icon?: string;
  label?: string;
  renderContent?: () => ReactNode;
  rounded?: boolean;
  style?: React.CSSProperties;
};

export const Tag = forwardRef<HTMLSpanElement, TagProperties>(
  (
    {
      className = "",
      color = "default",
      fullWidth,
      icon,
      label,
      renderContent,
      rounded,
      style,
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
        className={`dz-tag ${className} ${rounded ? "rounded" : ""} ${
          fullWidth ? "full-width" : ""
        }`.trimEnd()}
        ref={reference}
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
