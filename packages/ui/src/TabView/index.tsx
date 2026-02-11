import React, { useEffect, useMemo, useState } from "react";

import { getStorage } from "../utils";
import { getOrientation } from "./utilities";

import type { Properties, Tab } from "./types";

const TabView: React.FC<Properties> = ({
  activeKey,
  controlled = false,
  enableHashRouting = false,
  id = "",
  lazy = true,
  persistState = true,
  persistStateStorage = "localStorage",
  position = "top",
  tabs,
  visibleTabs: _visibleTabs,
  onActiveTabChange,
  onVisibleTabsChange,
  onTabClose,
}) => {
  const [initialized, setInitialized] = useState(false);
  const [visibleTabs, setVisibleTabs] = useState(
    _visibleTabs?.length ? _visibleTabs : tabs.map((tab) => tab.key),
  );
  const [activeTab, setActiveTab] = useState(() => {
    if (activeKey) {
      return activeKey;
    }

    if (_visibleTabs?.length) {
      return _visibleTabs[0];
    }

    return tabs[0]?.key;
  });
  const currentActiveKey = !controlled ? activeTab : activeKey;
  const currentVisibleTabs = !controlled ? visibleTabs : _visibleTabs;

  const visibleTabsKey = useMemo(
    () =>
      currentVisibleTabs?.length ? currentVisibleTabs : tabs.map((t) => t.key),
    [currentVisibleTabs, tabs],
  );

  const filteredTabs = useMemo(() => {
    if (currentVisibleTabs?.length) {
      return currentVisibleTabs
        .map((key) => tabs.find((t) => t.key === key))
        .filter((tab): tab is Tab => !!tab);
    }

    return tabs;
  }, [currentVisibleTabs, tabs]);

  const storage = useMemo(
    () => getStorage(persistStateStorage),
    [persistStateStorage],
  );

  useEffect(() => {
    if (onVisibleTabsChange) {
      onVisibleTabsChange(visibleTabs);
    }
  }, [visibleTabs]);

  useEffect(() => {
    if (!controlled && onActiveTabChange) {
      onActiveTabChange(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    if (!controlled && !enableHashRouting && persistState && id) {
      const storedState = storage.getItem(id);

      if (storedState) {
        const parsedState = JSON.parse(storedState);
        setActiveTab(parsedState.activeTab);
        setVisibleTabs(parsedState.visibleTabs);
      }
    }

    if (enableHashRouting) {
      setHashTab();
      window.addEventListener("hashchange", setHashTab);
    }

    setInitialized(true);

    return () => {
      if (enableHashRouting) {
        window.removeEventListener("hashchange", setHashTab);
      }
    };
  }, []);

  useEffect(() => {
    if (!controlled && initialized && _visibleTabs?.length) {
      setVisibleTabs(_visibleTabs);
    }
  }, [_visibleTabs]);

  useEffect(() => {
    if (!controlled && initialized && activeKey) {
      setActiveTab(activeKey);
    }
  }, [activeKey]);

  useEffect(() => {
    if (!controlled && !enableHashRouting && persistState && id) {
      storage.setItem(
        id,
        JSON.stringify({
          activeTab: activeTab,
          visibleTabs: visibleTabs,
        }),
      );
    }
  }, [visibleTabs, activeTab, id, persistState, storage]);

  const setHashTab = () => {
    const hash = window.location.hash?.split("#").pop();

    if (!hash || hash?.includes("/")) {
      return;
    }

    const isValidTab = visibleTabsKey.includes(hash);

    const shouldUpdateTab = hash && hash !== currentActiveKey && isValidTab;

    if (shouldUpdateTab) {
      setActiveTab(hash);
    }
  };

  const handleTabSwitch = (key: string) => {
    if (currentActiveKey === key) {
      return;
    }

    if (controlled) {
      onActiveTabChange?.(key);
    } else {
      setActiveTab(key);

      if (enableHashRouting) {
        window.location.hash = key;
      }
    }
  };

  const handleTabClose = (key: string) => {
    if (controlled && onTabClose) {
      onTabClose(key);

      return;
    }

    const tabIndex = visibleTabs.findIndex((tab) => tab === key);
    const newVisibleTabs = visibleTabs.filter((tab) => tab !== key);

    let newActiveTab = "";
    if (tabIndex > 0) {
      newActiveTab = newVisibleTabs[tabIndex - 1];
    } else {
      newActiveTab = newVisibleTabs[0];
    }

    setActiveTab(newActiveTab);
    setVisibleTabs(newVisibleTabs);

    if (enableHashRouting) {
      window.location.hash = newActiveTab;
    }
  };

  if (!initialized) {
    return null;
  }

  return (
    <div className={`tabbed-panel ${position}`}>
      <div role="tablist" aria-orientation={getOrientation(position)}>
        {filteredTabs.map((item, index) => {
          const isActive = currentActiveKey === item.key;
          const title = item.label;
          const icon = item.icon;
          const key = index;

          return (
            <button
              onClick={() => handleTabSwitch(item.key)}
              key={key}
              role="tab"
              aria-label={title}
              aria-selected={isActive}
              tabIndex={0}
              className={isActive ? "active" : ""}
            >
              {icon && <i className={icon} />}
              <span title={title}>{title}</span>
              {item.closable ? (
                <i
                  onClick={(event) => {
                    event.stopPropagation();
                    handleTabClose(item.key);
                  }}
                  className="pi pi-times"
                ></i>
              ) : null}
            </button>
          );
        })}
      </div>
      <div role="tabpanel">
        {lazy ? (
          <div className="tab-panel-content">
            {filteredTabs.find((tab) => tab.key === currentActiveKey)?.children}
          </div>
        ) : (
          filteredTabs.map((tab) => (
            <div
              key={tab.key}
              className={`tab-panel-content ${
                tab.key === currentActiveKey ? "active" : "hidden"
              }`.trimEnd()}
            >
              {tab.children}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TabView;
