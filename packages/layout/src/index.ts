import "./assets/css/index.css";

import type { PrefabsTechReactLayoutConfig } from "./types";

import {
  Copyright,
  Header,
  HeaderMenu,
  HeaderTitle,
  Layout,
  Logo,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  StickyCollapsibleFooter,
  ToggleMenuMobile,
  Version,
} from "./components/Layout";
import {
  LayoutContext,
  LayoutProvider,
  useLayoutContext,
} from "./context/LayoutProvider";
import {
  HeaderLayout,
  HeaderLayoutProperties,
  SidebarHeaderLayout,
  SidebarHeaderLayoutProperties,
  SidebarOnlyLayout,
  SidebarOnlyLayoutProperties,
} from "./layouts";

declare module "@prefabs.tech/react-config" {
  export interface AppConfig {
    layout?: PrefabsTechReactLayoutConfig;
  }
}

export {
  // components
  Copyright,
  Header,
  HeaderLayout,
  HeaderMenu,
  HeaderTitle,
  // wrapper
  Layout,
  // context
  LayoutContext,
  LayoutProvider,
  Logo,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  // layouts
  SidebarHeaderLayout,
  SidebarOnlyLayout,
  StickyCollapsibleFooter,
  ToggleMenuMobile,
  useLayoutContext,
  Version,
};

export type {
  PrefabsTechReactLayoutConfig,
  UserMenuModeType,
  UserMenuType,
} from "./types";

export type {
  HeaderLayoutProperties,
  SidebarHeaderLayoutProperties,
  SidebarOnlyLayoutProperties,
};
