import React, { memo } from "react";

export interface MenuItem {
  className?: string;
  disabled?: boolean;
  display?: boolean;
  key?: string;
  label?: string;
  icon?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
}

export interface MenuProperties {
  className?: string;
  menu: MenuItem[];
  renderOption?: (value: MenuItem) => JSX.Element;
}

const Menu: React.FC<MenuProperties> = ({
  className,
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
          iconLeft,
          iconRight,
          onClick,
          display = true,
          key,
          label,
        } = item;

        const menuIcon = icon || iconLeft || iconRight;

        return display ? (
          <li
            key={key || `menu-item-${index}`}
            onClick={disabled ? undefined : onClick}
            className={className}
            aria-disabled={disabled}
          >
            {renderOption ? (
              renderOption(item)
            ) : (
              <span className="menu-item">
                {menuIcon ? (
                  typeof menuIcon === "string" ? (
                    <i className={menuIcon}></i>
                  ) : (
                    menuIcon
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
