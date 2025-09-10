import React, { memo } from "react";

export interface MenuItem {
  className?: string;
  disabled?: boolean;
  display?: boolean;
  key?: string;
  label?: string;
  icon?: React.ReactNode;
  severity?:
    | "primary"
    | "secondary"
    | "alternate"
    | "success"
    | "danger"
    | "warning"
    | undefined;
  onClick?: () => void;
}

export interface MenuProperties {
  className?: string;
  highlightItem?: string;
  menu: MenuItem[];
  renderOption?: (value: MenuItem) => JSX.Element;
}

const Menu: React.FC<MenuProperties> = ({
  className,
  highlightItem,
  menu = [],
  renderOption,
}) => {
  return (
    <ul className={`dropdown-menu-list ${className || ""}`.trimEnd()}>
      {menu.map((item, index) => {
        const {
          className,
          disabled,
          icon,
          onClick,
          display = true,
          key,
          label,
          severity,
        } = item;

        return display ? (
          <li
            key={key || `menu-item-${index}`}
            onClick={disabled ? undefined : onClick}
            className={`${className || ""} ${highlightItem === (key || `menu-item-${index}`) ? "highlight" : ""} ${severity}`.trim()}
            aria-disabled={disabled}
          >
            {renderOption ? (
              renderOption(item)
            ) : (
              <span className="menu-item">
                {icon ? (
                  typeof icon === "string" ? (
                    <i className={icon}></i>
                  ) : (
                    icon
                  )
                ) : null}
                {label}
              </span>
            )}
          </li>
        ) : null;
      })}
    </ul>
  );
};

export default memo(Menu);
