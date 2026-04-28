import { NavGroup } from "./NavGroup";
import { NavItem } from "./NavItem";
import { NavGroupType, NavItemType } from "./types";

interface IProperties {
  displayIcon?: boolean;
  horizontal?: boolean;
  nav: NavGroupType | NavItemType;
}

export const Navigation = ({ displayIcon, horizontal, nav }: IProperties) => {
  return "submenu" in nav ? (
    <NavGroup
      displayIcon={displayIcon}
      horizontal={horizontal}
      navGroup={nav}
    />
  ) : (
    <NavItem displayIcon={displayIcon} navItem={nav} />
  );
};
