import { Layout, Header, Footer, Sidebar } from "@/components/Layout";

import type {
  NavMenuType,
  NavMenuItemType,
  UserMenuModeType,
  NavGroupDisplayMode,
} from "@prefabs.tech/react-ui";

export interface HeaderLayoutProperties {
  className?: string;
  children?: React.ReactNode;
  customFooter?: React.ReactNode;
  customHeader?: React.ReactNode;
  displayNavIcons?: boolean;
  fixed?: boolean;
  headerAddon?: React.ReactNode;
  navigationMenu?: NavMenuType;
  menu?: NavMenuItemType;
  noLocaleSwitcher?: boolean;
  noLogo?: boolean;
  noToggle?: boolean;
  title?: string | React.ReactNode;
  userMenuMode?: UserMenuModeType;
}

export const HeaderLayout: React.FC<HeaderLayoutProperties> = ({
  className,
  children,
  customFooter,
  customHeader,
  displayNavIcons,
  fixed = true,
  headerAddon,
  navigationMenu,
  menu,
  noLogo,
  noLocaleSwitcher,
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
          navigationMenu={navigationMenu}
          title={title}
          menu={menu}
          noLogo={noLogo}
          noLocaleSwitcher={noLocaleSwitcher}
          noToggle={noToggle}
          userMenuMode={userMenuMode}
        ></Header>
      )}
      <Sidebar
        displayNavIcons={displayNavIcons}
        navigationMenu={navigationMenu}
        noLocaleSwitcher={noLocaleSwitcher}
        userMenu={menu}
        userMenuMode="collapsible-reverse"
      ></Sidebar>
      <main>{children}</main>
      {customFooter || <Footer></Footer>}
    </Layout>
  );
};
