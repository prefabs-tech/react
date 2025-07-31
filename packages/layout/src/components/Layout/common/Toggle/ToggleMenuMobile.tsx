import { useMediaQuery } from "@prefabs.tech/react-ui";

import { useLayoutContext } from "../../../../context/LayoutProvider";

export const ToggleMenuMobile = () => {
  const {
    menuDesktopOpen,
    menuMobileOpen,
    setMenuDesktopOpen,
    setMenuMobileOpen,
  } = useLayoutContext();
  const isLargeScreen = useMediaQuery("(min-width: 576px)");

  const handleClick = () => {
    if (isLargeScreen) {
      setMenuDesktopOpen(!menuDesktopOpen);
    } else {
      setMenuMobileOpen(!menuMobileOpen);
    }
  };

  const renderIcon = () => {
    if (isLargeScreen) {
      return <i className={menuDesktopOpen ? "pi pi-bars" : "pi pi-bars"}></i>;
    }

    return <i className={menuMobileOpen ? "pi pi-times" : "pi pi-bars"}></i>;
  };

  return (
    <span className="dz-toggle-menu" onClick={() => handleClick()}>
      {renderIcon()}
    </span>
  );
};
