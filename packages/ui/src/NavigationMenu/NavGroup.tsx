import { useCallback, useState } from "react";

import { Navigation } from "./Navigation";
import { NavItem } from "./NavItem";
import { NavGroupDisplayMode, NavGroupType } from "./types";

export type NavGroupProperties = {
  className?: string;
  displayIcon?: boolean;
  displayMode?: NavGroupDisplayMode;
  horizontal?: boolean;
  initialVisible?: boolean;
  navGroup: NavGroupType;
};

export const NavGroup = ({
  className = "",
  displayIcon = true,
  displayMode = "collapsible",
  horizontal,
  initialVisible = false,
  navGroup,
}: NavGroupProperties) => {
  const [showSubmenu, setShowSubmenu] = useState(initialVisible);

  const renderSubmenu = useCallback(() => {
    return (
      <ul className="dz-group-submenu">
        {navGroup.submenu &&
          navGroup.submenu.map((nav, _index) => {
            return (
              <li key={_index}>
                {
                  <Navigation
                    displayIcon={displayIcon}
                    horizontal={horizontal}
                    nav={nav}
                  />
                }
              </li>
            );
          })}
      </ul>
    );
  }, [displayIcon, horizontal, navGroup]);

  return (
    <div
      aria-expanded={showSubmenu || displayMode === "expanded"}
      className={`dz-nav-group ${displayMode} ${className}`.trim()}
    >
      <NavItem
        displayIcon={displayIcon}
        isGroupHeader
        navItem={{
          icon: navGroup.icon,
          label: navGroup.label,
          onClick: () =>
            displayMode !== "expanded" && setShowSubmenu(!showSubmenu),
        }}
      ></NavItem>
      {renderSubmenu()}
    </div>
  );
};
