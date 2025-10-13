import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export type LayoutContextType = {
  menuDesktopOpen: boolean;
  menuMobileOpen: boolean;
  setMenuDesktopOpen: (value: boolean) => void;
  setMenuMobileOpen: (value: boolean) => void;
};

export const LayoutContext = createContext<LayoutContextType | null>(null);

type LayoutProviderProperties = {
  children?: React.ReactNode;
};

export const LayoutProvider = ({ children }: LayoutProviderProperties) => {
  const [menuDesktopOpen, setMenuDesktopOpen] = useState(true);
  const [menuMobileOpen, setMenuMobileOpen] = useState(false);

  // Close sidebar when route changes (only on mobile)
  const pathname = window.location.pathname;
  useEffect(() => {
    setMenuMobileOpen(false);
  }, [pathname]);

  return (
    <LayoutContext.Provider
      value={{
        menuDesktopOpen,
        menuMobileOpen,
        setMenuDesktopOpen,
        setMenuMobileOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);

  if (context === null) {
    throw new Error("LayoutProvider is required!");
  }

  return context;
};
