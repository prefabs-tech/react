import { useTranslation } from "@prefabs.tech/react-i18n";
import { Page } from "@prefabs.tech/react-ui";

export const UserPage = () => {
  const [t] = useTranslation("app");

  return <Page title={t("pages.user.title")}></Page>;
};
