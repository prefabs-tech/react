type CombinedMenuRouteType = Array<MenuRouteType | NestedMenuRouteType>;

type MenuRouteType = {
  icon?: React.ReactNode;
  name: string;
  route: string;
};

type NestedMenuRouteType = Omit<MenuRouteType, "route"> & {
  route?: string;
  submenu: Array<MenuRouteType>;
};

export type { CombinedMenuRouteType, MenuRouteType, NestedMenuRouteType };
