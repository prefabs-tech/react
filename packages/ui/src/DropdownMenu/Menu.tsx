import React, { memo } from "react";

export interface MenuItem {
  className?: string;
  disabled?: boolean;
  display?: boolean;
  icon?: React.ReactNode;
  key?: string;
  label?: string;
  onClick?: () => void;
  severity?:
    | "alternate"
    | "danger"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | undefined;
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
          display = true,
          icon,
          key,
          label,
          onClick,
          severity,
        } = item;

        return display ? (
          <li
            aria-disabled={disabled}
            className={`${className || ""} ${highlightItem === (key || `menu-item-${index}`) ? "highlight" : ""} ${severity}`.trim()}
            key={key || `menu-item-${index}`}
            onClick={disabled ? undefined : onClick}
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
