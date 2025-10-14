import { Layout, Sidebar } from "@/components/Layout";
import { UserMenuModeType, UserMenuType } from "@/types";

import type { NavMenuType } from "@prefabs.tech/react-ui";

export interface SidebarOnlyLayoutProperties {
  className?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  customSidebar?: React.ReactNode;
  noLocaleSwitcher?: boolean;
  noSidebarHeader?: boolean;
  noSidebarFooter?: boolean;
  userMenu?: UserMenuType;
  userMenuMode?: UserMenuModeType;
}

export const SidebarOnlyLayout: React.FC<SidebarOnlyLayoutProperties> = ({
  className,
  children,
  collapsible,
  displayNavIcons,
  navigationMenu,
  customSidebar,
  noLocaleSwitcher,
  noSidebarHeader,
  noSidebarFooter,
  userMenu,
  userMenuMode,
}) => {
  return (
    <Layout className={`dz-sidebar-only-layout ${className || ""}`.trimEnd()}>
      {customSidebar || (
        <Sidebar
          collapsible={collapsible}
          displayNavIcons={displayNavIcons}
          navigationMenu={navigationMenu}
          noHeader={noSidebarHeader}
          noFooter={noSidebarFooter}
          noLocaleSwitcher={noLocaleSwitcher}
          userMenu={userMenu}
          userMenuMode={userMenuMode}
        ></Sidebar>
      )}
      <main>{children}</main>
    </Layout>
  );
};
