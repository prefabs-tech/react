import type { ReactNode } from "react";

import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Card, LoadingPage, Page } from "@prefabs.tech/react-ui";

import { useBackNavigation } from "../hooks/useBackNavigation";
import "../assets/css/cancelled-page.css";

interface CancelledPageProperties {
  actions?: ReactNode;
  children?: ReactNode;
  loading?: boolean;
  onBack?: () => void;
  subtitle?: ReactNode;
  title?: ReactNode;
}

const CancelledPage: React.FC<CancelledPageProperties> = ({
  actions,
  children,
  loading = false,
  onBack,
  subtitle,
  title,
}) => {
  const { t } = useTranslation("stripe");
  const { handleBack } = useBackNavigation(onBack);

  return (
    <Page centered className="cancelled-page">
      {!loading && (
        <Card>
          <svg className="crossmark" viewBox="0 0 52 52">
            <circle
              className="crossmark-circle"
              cx="26"
              cy="26"
              fill="none"
              r="25"
            />
            <path
              className="crossmark-line crossmark-line-left"
              d="M16 16 l20 20"
              fill="none"
            />
            <path
              className="crossmark-line crossmark-line-right"
              d="M36 16 l-20 20"
              fill="none"
            />
          </svg>

          {title || <h1 className="title">{t("payment.cancelled.heading")}</h1>}

          {subtitle}

          {children || (
            <div className="message">
              <p>{t("payment.cancelled.message")}</p>
            </div>
          )}

          {actions || (
            <Button
              label={t("payment.button.backToHome")}
              onClick={handleBack}
              severity="secondary"
              size="large"
            />
          )}
        </Card>
      )}

      {loading && <LoadingPage />}
    </Page>
  );
};

export default CancelledPage;
