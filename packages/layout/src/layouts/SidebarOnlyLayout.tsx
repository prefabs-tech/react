import type { NavMenuType } from "@prefabs.tech/react-ui";

import { Layout, Sidebar } from "@/components/Layout";
import { UserMenuModeType, UserMenuType } from "@/types";

export interface SidebarOnlyLayoutProperties {
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  customSidebar?: React.ReactNode;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  noLocaleSwitcher?: boolean;
  noSidebarFooter?: boolean;
  noSidebarHeader?: boolean;
  userMenu?: UserMenuType;
  userMenuMode?: UserMenuModeType;
}

export const SidebarOnlyLayout: React.FC<SidebarOnlyLayoutProperties> = ({
  children,
  className,
  collapsible,
  customSidebar,
  displayNavIcons,
  navigationMenu,
  noLocaleSwitcher,
  noSidebarFooter,
  noSidebarHeader,
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
          noFooter={noSidebarFooter}
          noHeader={noSidebarHeader}
          noLocaleSwitcher={noLocaleSwitcher}
          userMenu={userMenu}
          userMenuMode={userMenuMode}
        ></Sidebar>
      )}
      <main>{children}</main>
    </Layout>
  );
};
