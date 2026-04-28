type Properties = {
  activeKey?: string;
  controlled?: boolean;
  enableHashRouting?: boolean;
  id?: string;
  lazy?: boolean;
  onActiveTabChange?: (activeTab: string) => void;
  onTabClose?: (activeTab: string) => void;
  onVisibleTabsChange?: (visibleTabs: string[]) => void;
  persistState?: boolean;
  persistStateStorage?: StorageType;
  position?: TPosition;
  tabs: Tab[];
  visibleTabs?: string[];
};

type StorageType = "localStorage" | "sessionStorage";

type Tab = {
  children: React.ReactNode;
  closable?: boolean;
  icon?: string;
  key: string;
  label: string;
};

type TKeymap = {
  [key: string]: () => void;
};

type TOrientation = "horizontal" | "vertical";

type TPosition = "bottom" | "left" | "right" | "top";

export type { Properties, StorageType, Tab, TKeymap, TOrientation, TPosition };
