import { useTranslation } from "@prefabs.tech/react-i18n";
import { Page } from "@prefabs.tech/react-ui";

export const LayoutPage = () => {
  const [t] = useTranslation("app");

  return <Page title={t("pages.layout.title")}></Page>;
};
