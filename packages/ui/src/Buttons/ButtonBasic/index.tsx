import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { Link } from "react-router-dom";

export interface IButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode | string;
  iconLeft?: ReactNode | string;
  iconRight?: ReactNode | string;
  label?: string;
  loading?: boolean;
  rounded?: boolean;
  severity?:
    | "alternate"
    | "danger"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  size?: "large" | "medium" | "small";
  to?: string;
  variant?: "filled" | "outlined" | "textOnly";
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
  rounded = false,
  severity = "primary",
  size = "medium",
  title,
  to,
  variant = "filled",
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
        className={buttonClassName}
        disabled={loading || disabled}
        onClick={onClick}
        role={role}
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
    <Link className="dz-button-link" to={to}>
      {renderButton("link")}
    </Link>
  ) : (
    renderButton("button")
  );
};
