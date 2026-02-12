import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { Link } from "react-router-dom";

export interface IButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | ReactNode;
  iconLeft?: string | ReactNode;
  iconRight?: string | ReactNode;
  label?: string;
  loading?: boolean;
  severity?:
    | "primary"
    | "secondary"
    | "alternate"
    | "success"
    | "danger"
    | "warning";
  size?: "small" | "medium" | "large";
  to?: string;
  variant?: "outlined" | "filled" | "textOnly";
  rounded?: boolean;
}

export const Button: FC<IButtonProperties> = ({
  children,
  className = "",
  disabled,
  iconLeft,
  iconRight,
  label,
  loading,
  onClick,
  severity = "primary",
  size = "medium",
  to,
  title,
  variant = "filled",
  rounded = false,
  ...otherProperties
}) => {
  const buttonClassName = [
    "dz-button",
    className,
    severity,
    variant === "textOnly" ? "text-only" : variant,
    size,
    !(label || children) && "icon-only",
    rounded && "rounded",
  ]
    .filter(Boolean)
    .join(" ");

  const renderIconLeft = () => {
    if (!iconLeft) {
      return null;
    }

    return (
      <span className="icon-left">
        {typeof iconLeft === "string" ? <i className={iconLeft} /> : iconLeft}
      </span>
    );
  };

  const renderLabel = () => {
    if (!label) {
      return null;
    }

    return <span className="label">{label}</span>;
  };

  const renderIconRight = () => {
    if (!iconRight) {
      return null;
    }

    return (
      <span className="icon-right">
        {typeof iconRight === "string" ? (
          <i className={iconRight} />
        ) : (
          iconRight
        )}
      </span>
    );
  };

  const renderButton = (role: string) => {
    return (
      <button
        role={role}
        className={buttonClassName}
        disabled={loading || disabled}
        onClick={onClick}
        title={title}
        {...otherProperties}
      >
        {renderIconLeft()}
        {children || renderLabel()}
        {renderIconRight()}
      </button>
    );
  };

  return to ? (
    <Link to={to} className="dz-button-link">
      {renderButton("link")}
    </Link>
  ) : (
    renderButton("button")
  );
};
