import ConfigProvider from "./context/ConfigProvider";
import UserProvider from "./context/UserProvider";
import { registerTranslations } from "./i18n";
import { superTokens } from "./supertokens";
import { UserWrapperProperties } from "./types/types";

export const UserWrapper = ({ config, children }: UserWrapperProperties) => {
  registerTranslations();
  superTokens(config);

  return (
    <ConfigProvider config={config}>
      <UserProvider>{children}</UserProvider>
    </ConfigProvider>
  );
};
