export type NavGroupDisplayMode =
  | "collapsible"
  | "collapsible-reverse"
  | "expanded";

export type NavGroupType = {
  icon?: string;
  label: React.ReactNode | string;
  submenu: NavItemType[];
};

export type NavItemType = {
  className?: string;
  disabled?: boolean;
  display?: boolean;
  icon?: string;
  label: React.ReactNode | string;
} & ({ onClick: () => void } | { route: string });

export type NavMenuItemType = {
  className?: string;
  id?: string;
  label?: string;
  menu: Array<NavGroupType | NavItemType>;
};

export type NavMenuType = Array<NavMenuItemType> | NavMenuItemType;

export type UserMenuModeType = "horizontal" | "popup" | NavGroupDisplayMode;
