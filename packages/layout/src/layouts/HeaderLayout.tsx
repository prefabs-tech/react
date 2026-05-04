import type { NavMenuType, UserMenuModeType } from "@prefabs.tech/react-ui";

import { Footer, Header, Layout, Sidebar } from "@/components/Layout";
import { UserMenuType } from "@/types";

export interface HeaderLayoutProperties {
  children?: React.ReactNode;
  className?: string;
  customFooter?: React.ReactNode;
  customHeader?: React.ReactNode;
  displayNavIcons?: boolean;
  fixed?: boolean;
  headerAddon?: React.ReactNode;
  menu?: UserMenuType;
  navigationMenu?: NavMenuType;
  noLocaleSwitcher?: boolean;
  noLogo?: boolean;
  noToggle?: boolean;
  title?: React.ReactNode | string;
  userMenuMode?: UserMenuModeType;
}

export const HeaderLayout: React.FC<HeaderLayoutProperties> = ({
  children,
  className,
  customFooter,
  customHeader,
  displayNavIcons,
  fixed = true,
  headerAddon,
  menu,
  navigationMenu,
  noLocaleSwitcher,
  noLogo,
  noToggle,
  title,
  userMenuMode,
}) => {
  return (
    <Layout
      className={`dz-header-layout ${className || ""}`.trimEnd()}
      fixed={fixed}
    >
      {customHeader || (
        <Header
          displayNavIcons={displayNavIcons}
          headerAddon={headerAddon}
          menu={menu}
          navigationMenu={navigationMenu}
          noLocaleSwitcher={noLocaleSwitcher}
          noLogo={noLogo}
          noToggle={noToggle}
          title={title}
          userMenuMode={userMenuMode}
        ></Header>
      )}
      <Sidebar
        displayNavIcons={displayNavIcons}
        navigationMenu={navigationMenu}
        noLocaleSwitcher={noLocaleSwitcher}
        userMenu={menu}
        userMenuMode={
          userMenuMode === "horizontal" ? "horizontal" : "collapsible-reverse"
        }
      ></Sidebar>
      <main>{children}</main>
      {customFooter || <Footer></Footer>}
    </Layout>
  );
};
