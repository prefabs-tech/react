import React, { createContext } from "react";

import { UserConfig } from "@/types/config";

interface Properties {
  children: React.ReactNode;
  config: UserConfig;
}

const configContext = createContext<undefined | UserConfig>(undefined);

const ConfigProvider = ({ children, config }: Properties) => {
  return (
    <configContext.Provider value={config}>{children}</configContext.Provider>
  );
};

export default ConfigProvider;

export { configContext };
