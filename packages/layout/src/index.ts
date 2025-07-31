import "./assets/css/index.css";

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
  ToggleMenuMobile,
  Version,
  StickyCollapsibleFooter,
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

import type { PrefabsTechReactLayoutConfig } from "./types";

declare module "@prefabs.tech/react-config" {
  export interface AppConfig {
    layout?: PrefabsTechReactLayoutConfig;
  }
}

export {
  // layouts
  SidebarHeaderLayout,
  HeaderLayout,
  SidebarOnlyLayout,

  // wrapper
  Layout,

  // components
  Copyright,
  Header,
  HeaderMenu,
  HeaderTitle,
  Logo,
  SidebarFooter,
  SidebarHeader,
  Sidebar,
  StickyCollapsibleFooter,
  ToggleMenuMobile,
  Version,

  // context
  LayoutContext,
  LayoutProvider,
  useLayoutContext,
};

export type { PrefabsTechReactLayoutConfig } from "./types";

export type {
  HeaderLayoutProperties,
  SidebarHeaderLayoutProperties,
  SidebarOnlyLayoutProperties,
};
