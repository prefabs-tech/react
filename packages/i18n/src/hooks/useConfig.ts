import { configContext } from "@prefabs.tech/react-config";
import { useContext } from "react";

const useConfig = () => {
  const context = useContext(configContext);

  if (context === undefined) {
    throw new Error("UserProvider is required!");
  }

  return context;
};

export default useConfig;
