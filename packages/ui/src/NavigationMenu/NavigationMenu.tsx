import { Navigation } from "./Navigation";
import { NavMenuType, NavMenuItemType } from "./types";

export type NavigationMenuProperties = {
  displayIcons?: boolean;
  horizontal?: boolean;
  navigationMenu: NavMenuType;
};

export const NavigationMenu = ({
  displayIcons = true,
  horizontal = false,
  navigationMenu,
}: NavigationMenuProperties) => {
  const renderNavMenuItem = (
    { className, id, label, menu }: NavMenuItemType,
    index?: number,
  ) => {
    return (
      <div
        className={`dz-nav-menu ${className || ""}`.trim()}
        data-nav-menu-id={id}
        key={index}
      >
        {label && <span role="heading">{label}</span>}
        <ul>
          {menu.map((nav, _index) => {
            return (
              <li key={_index}>
                {
                  <Navigation
                    nav={nav}
                    horizontal={horizontal}
                    displayIcon={displayIcons}
                  />
                }
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const renderNavMenu = () => {
    if (!navigationMenu) {
      return null;
    }

    if (Array.isArray(navigationMenu)) {
      return navigationMenu.map((navMenuItem, index) =>
        renderNavMenuItem(navMenuItem, index),
      );
    }

    return renderNavMenuItem(navigationMenu);
  };

  return (
    <nav className="dz-navigation-menu" data-horizontal={horizontal}>
      {renderNavMenu()}
    </nav>
  );
};
