import { NavGroupDisplayMode, NavItemType } from "@prefabs.tech/react-ui";

export type UserMenuType = {
  label?: string;
  id?: string;
  className?: string;
  menu: Array<NavItemType>;
};

export type UserMenuModeType = NavGroupDisplayMode | "horizontal" | "popup";
