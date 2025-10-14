import { DropdownMenu, NavGroup, NavItem } from "@prefabs.tech/react-ui";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { UserMenuModeType, UserMenuType } from "@/types";

interface IProperties {
  menu: UserMenuType;
  userMenuMode?: UserMenuModeType;
  trigger?: React.ReactNode;
}

export const UserMenu = ({ menu, userMenuMode, trigger }: IProperties) => {
  const { label: userMenuLabel, menu: userMenu = [] } = menu;

  const navigate = useNavigate();

  const refinedMenu = useMemo(
    () =>
      userMenu.map((_menu) => {
        return {
          ..._menu,
          label: _menu.label as string,
          icon: _menu.icon,
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
          <ul className="dz-user-menu" aria-orientation={userMenuMode}>
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
            renderOption={template}
            menu={refinedMenu || []}
            label={userMenuLabel}
            trigger={trigger}
          />
        );
      default:
        return (
          <NavGroup
            className="dz-user-menu"
            navGroup={{
              label: userMenuLabel,
              submenu: userMenu,
            }}
            displayMode={userMenuMode}
          />
        );
    }
  };

  return userMenu.length ? renderContent() : null;
};
