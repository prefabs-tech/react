import { NavGroupDisplayMode, NavItemType } from "@prefabs.tech/react-ui";

export type UserMenuModeType = "horizontal" | "popup" | NavGroupDisplayMode;

export type UserMenuType = {
  className?: string;
  id?: string;
  label?: string;
  menu: Array<NavItemType>;
};
