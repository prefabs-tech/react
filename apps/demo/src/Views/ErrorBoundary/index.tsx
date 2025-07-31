import { useTranslation } from "@prefabs.tech/react-i18n";
import { Page } from "@prefabs.tech/react-ui";
import { useRouteError } from "react-router-dom";
import "./ErrorBoundary.css";

type RouteError = {
  statusText?: string;
  message?: string;
};

const ErrorBoundary = (): JSX.Element => {
  const { t } = useTranslation();
  const error = useRouteError() as RouteError;

  return (
    <Page>
      <div className="error-page">
        <h1>{t("errorBoundary.title")}</h1>
        <p>{t("errorBoundary.subtitle")}</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </Page>
  );
};

export default ErrorBoundary;
