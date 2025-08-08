import React, { memo } from "react";

export interface MenuItem {
  className?: string;
  disabled?: boolean;
  display?: boolean;
  key?: string;
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface MenuProperties {
  className?: string;
  menu: MenuItem[];
  renderOption?: (value: MenuItem) => JSX.Element;
  selectedKey?: string;
}

const Menu: React.FC<MenuProperties> = ({
  className,
  menu = [],
  renderOption,
  selectedKey,
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
        } = item;

        return display ? (
          <li
            key={key || `menu-item-${index}`}
            onClick={disabled ? undefined : onClick}
            className={`${className || ""} ${selectedKey === (key || `menu-item-${index}`) ? "selected" : ""}`.trim()}
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
