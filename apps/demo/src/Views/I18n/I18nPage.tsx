import { useTranslation } from "@prefabs.tech/react-i18n";
import { Page } from "@prefabs.tech/react-ui";

export const I18nPage = () => {
  const [t] = useTranslation("app");

  return <Page title={t("pages.i18n.title")}></Page>;
};
