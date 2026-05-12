import React, { createContext } from "react";

import { AppConfig } from "../types";

interface Properties {
  appConfig: AppConfig;
  children: React.ReactNode;
}

const configContext = createContext<AppConfig | undefined>(undefined);

const ConfigProvider = ({ appConfig, children }: Properties) => {
  return (
    <configContext.Provider value={appConfig}>
      {children}
    </configContext.Provider>
  );
};

export default ConfigProvider;
export { configContext };
