import { DropdownMenu, NavGroup, NavItem } from "@prefabs.tech/react-ui";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { UserMenuModeType, UserMenuType } from "@/types";

interface IProperties {
  menu: UserMenuType;
  trigger?: React.ReactNode;
  userMenuMode?: UserMenuModeType;
}

export const UserMenu = ({ menu, trigger, userMenuMode }: IProperties) => {
  const { label: userMenuLabel, menu: userMenu = [] } = menu;

  const navigate = useNavigate();

  const refinedMenu = useMemo(
    () =>
      userMenu.map((_menu) => {
        return {
          ..._menu,
          icon: _menu.icon,
          label: _menu.label as string,
          onClick: () => {
            if ("onClick" in _menu) {
              _menu.onClick();
            }
            if ("route" in _menu) {
              navigate(_menu.route);
            }
          },
        };
      }),
    [userMenu],
  );

  const renderContent = () => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const template = (_menuItem: any) => {
      return (
        <span className="dz-user-menu-item">
          {_menuItem.icon && <i className={_menuItem.icon}></i>}
          {_menuItem.label}
        </span>
      );
    };

    switch (userMenuMode) {
      case "horizontal":
        return (
          <ul aria-orientation={userMenuMode} className="dz-user-menu">
            {userMenu.map((_menuItem, index) => {
              return (
                <li key={index}>
                  <NavItem navItem={_menuItem} />
                </li>
              );
            })}
          </ul>
        );
      case "popup":
        return (
          <DropdownMenu
            className="dz-user-menu"
            label={userMenuLabel}
            menu={refinedMenu || []}
            renderOption={template}
            trigger={trigger}
          />
        );
      default:
        return (
          <NavGroup
            className="dz-user-menu"
            displayMode={userMenuMode}
            navGroup={{
              label: userMenuLabel,
              submenu: userMenu,
            }}
          />
        );
    }
  };

  return userMenu.length ? renderContent() : null;
};
