import { NavLink, useInRouterContext } from "react-router-dom";

import { NavItemType } from "./types";

export type NavItemProperties = {
  displayIcon?: boolean;
  isGroupHeader?: boolean;
  navItem: NavItemType;
};

export const NavItem = ({
  displayIcon = true,
  isGroupHeader,
  navItem,
}: NavItemProperties) => {
  const hasRouterContext = useInRouterContext();

  const _className = `dz-nav-item ${isGroupHeader ? "dz-group-header" : ""} ${
    navItem.className || ""
  }`.trim();

  if ("display" in navItem && !navItem.display) {
    return null;
  }

  if (navItem.disabled) {
    return (
      <div aria-disabled={navItem.disabled} className={_className}>
        {displayIcon && navItem.icon && <i className={navItem.icon}></i>}
        <span>{navItem.label}</span>
      </div>
    );
  }

  if ("onClick" in navItem) {
    return (
      <div className={_className} onClick={navItem.onClick}>
        {displayIcon && navItem.icon && <i className={navItem.icon}></i>}
        <span>{navItem.label}</span>
        {isGroupHeader && (
          <i className="pi pi-angle-right dz-nav-group-toggle" />
        )}
      </div>
    );
  }

  const isNavLinkActive = (link: string) => {
    {
      const pathnameArray = window.location.pathname.split("/");
      const isActive =
        window.location.pathname.startsWith(link) ||
        (pathnameArray.length && pathnameArray.includes(link));

      return isActive;
    }
  };

  if (hasRouterContext) {
    return (
      <NavLink className={_className} end to={navItem.route || ""}>
        {displayIcon && navItem.icon && <i className={navItem.icon}></i>}
        <span>{navItem.label}</span>
      </NavLink>
    );
  }

  const isActive = isNavLinkActive(navItem.route || "");

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={isActive ? `${_className} active` : _className}
      href={navItem.route}
    >
      {displayIcon && navItem.icon && <i className={navItem.icon}></i>}
      {navItem.label}
    </a>
  );
};
