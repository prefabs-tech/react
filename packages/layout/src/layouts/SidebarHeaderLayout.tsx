import type { NavMenuType } from "@prefabs.tech/react-ui";

import { UserMenuModeType, UserMenuType } from "@/types";

import { Header, Layout, Sidebar } from "..";

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
  title?: React.ReactNode | string;
  userMenu?: UserMenuType;
  userMenuLocation?: "header" | "sidebar";
  userMenuMode?: UserMenuModeType;
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
  userMenuLocation = "header",
  userMenuMode,
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
          userMenuMode={userMenuMode}
        />
      )}
      {customSidebar || (
        <Sidebar
          collapsible={collapsible}
          displayNavIcons={displayNavIcons}
          navigationMenu={navigationMenu}
          noLocaleSwitcher={noLocaleSwitcher}
          trigger={userMenuTrigger}
          userMenu={userMenu}
          userMenuMode={userMenuMode}
        ></Sidebar>
      )}
      <main>{children}</main>
    </Layout>
  );
};
