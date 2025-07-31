import { useTranslation } from "@prefabs.tech/react-i18n";
import { Page } from "@prefabs.tech/react-ui";

export const FormPage = () => {
  const [t] = useTranslation("app");

  return <Page title={t("pages.form.title")}></Page>;
};
