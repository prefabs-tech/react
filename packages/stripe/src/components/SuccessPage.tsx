import type { ReactNode } from "react";

import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Card, LoadingPage, Page } from "@prefabs.tech/react-ui";

import { useBackNavigation } from "../hooks/useBackNavigation";

interface SuccessPageProperties {
  actions?: ReactNode;
  children?: ReactNode;
  loading?: boolean;
  onBack?: () => void;
  subtitle?: ReactNode;
  title?: ReactNode;
}

const SuccessPage: React.FC<SuccessPageProperties> = ({
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
    <Page centered className="success-page">
      {!loading && (
        <Card>
          <svg className="checkmark" viewBox="0 0 52 52">
            <circle
              className="checkmark-circle"
              cx="26"
              cy="26"
              fill="none"
              r="25"
            />
            <path
              className="checkmark-check"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
              fill="none"
            />
          </svg>

          {title || <h1 className="title">{t("payment.success.heading1")}</h1>}

          {subtitle || (
            <p className="subtitle">{t("payment.success.heading2")}</p>
          )}

          {children || (
            <div className="message">
              <p>{t("payment.success.message1")}</p>
              <p>{t("payment.success.message2")}</p>
            </div>
          )}

          {actions || (
            <Button
              label={t("payment.button.backToHome")}
              onClick={handleBack}
              severity="success"
              size="large"
            />
          )}
        </Card>
      )}

      {loading && <LoadingPage />}
    </Page>
  );
};

export default SuccessPage;
