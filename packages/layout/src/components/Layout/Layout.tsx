import { useMediaQuery } from "@prefabs.tech/react-ui";

import { LayoutProvider, useLayoutContext } from "../../context/LayoutProvider";

type LayoutProperties = {
  children?: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  fixed?: boolean;
  userMenuLocation?: "header" | "sidebar";
};

const LayoutComponent = ({
  children,
  className,
  collapsible = false,
  fixed,
  userMenuLocation,
}: LayoutProperties) => {
  const { menuDesktopOpen, menuMobileOpen } = useLayoutContext();
  const isLargeScreen = useMediaQuery("(min-width: 576px)");

  let classNames = "dz-layout";
  if (className) {
    classNames += ` ${className}`;
  }
  if (fixed) {
    classNames += " fixed";
  }
  if (collapsible) {
    classNames += " collapsible";
  }
  classNames = classNames.trimEnd();

  return (
    <div
      aria-expanded={isLargeScreen ? menuDesktopOpen : menuMobileOpen}
      className={classNames}
      data-user-menu-location={userMenuLocation}
    >
      {children}
    </div>
  );
};

export const Layout = ({
  children,
  className,
  collapsible = false,
  fixed,
  userMenuLocation,
}: LayoutProperties) => {
  return (
    <LayoutProvider>
      <LayoutComponent
        className={className}
        collapsible={collapsible}
        fixed={fixed}
        userMenuLocation={userMenuLocation}
      >
        {children}
      </LayoutComponent>
    </LayoutProvider>
  );
};
