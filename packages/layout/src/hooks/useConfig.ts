import { configContext } from "@prefabs.tech/react-config";
import { useContext } from "react";

const useConfig = () => {
  const context = useContext(configContext);

  if (context === undefined) {
    throw new Error("ConfigProvider is required!");
  }

  return context;
};

export default useConfig;
