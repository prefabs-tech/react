import { Header, Layout, Sidebar } from "..";

import type {
  NavGroupDisplayMode,
  NavMenuItemType,
  NavMenuType,
} from "@prefabs.tech/react-ui";

export interface SidebarHeaderLayoutProperties {
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  customHeader?: React.ReactNode;
  customSidebar?: React.ReactNode;
  displayNavIcons?: boolean;
  headerAddon?: React.ReactNode;
  navigationMenu?: NavMenuType;
  noLocaleSwitcher?: boolean;
  title?: string | React.ReactNode;
  userMenu?: NavMenuItemType;
  userMenuMode?: NavGroupDisplayMode;
  userMenuLocation?: "sidebar" | "header";
  userMenuTrigger?: React.ReactNode;
}

export const SidebarHeaderLayout = ({
  children,
  className,
  collapsible = true,
  customHeader,
  customSidebar,
  displayNavIcons = true,
  headerAddon,
  navigationMenu,
  noLocaleSwitcher = false,
  title,
  userMenu,
  userMenuMode,
  userMenuLocation = "header",
  userMenuTrigger,
}: SidebarHeaderLayoutProperties) => {
  return (
    <Layout
      className={`dz-sidebar-header-layout ${className || ""}`.trimEnd()}
      collapsible={collapsible}
      userMenuLocation={userMenuLocation}
    >
      {customHeader || (
        <Header
          displayNavIcons={displayNavIcons}
          headerAddon={headerAddon}
          menu={userMenu}
          noLocaleSwitcher={noLocaleSwitcher}
          title={title}
        />
      )}
      {customSidebar || (
        <Sidebar
          collapsible={collapsible}
          displayNavIcons={displayNavIcons}
          navigationMenu={navigationMenu}
          noLocaleSwitcher={noLocaleSwitcher}
          userMenu={userMenu}
          userMenuMode={userMenuMode}
          trigger={userMenuTrigger}
        ></Sidebar>
      )}
      <main>{children}</main>
    </Layout>
  );
};
