import { Trans, useTranslation } from "@prefabs.tech/react-i18n";
import { AuthPage, Page } from "@prefabs.tech/react-ui";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

import { AuthLinks } from "@/components/AuthLinks";
import { DEFAULT_PATHS } from "@/constants";
import { useConfig } from "@/hooks";
import { forgotPassword } from "@/supertokens";
import { LinkType } from "@/types/types";

export const ForgotPassword = ({ centered = true }: { centered?: boolean }) => {
  const { t } = useTranslation("user");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const config = useConfig();

  const [searchParameters] = useSearchParams();
  const email = searchParameters.get("email") ?? undefined;

  const resendTime = config.features?.forgotPasswordResendTimeInSeconds || 30;

  const [resendTimer, setResendTimer] = useState<number>(resendTime);

  const links: Array<LinkType> = [
    {
      display: true,
      label: t("forgotPassword.links.login"),
      to: config.customPaths?.login || DEFAULT_PATHS.LOGIN,
    },
  ];

  useEffect(() => {
    if (!submitted || resendTimer === 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, resendTimer]);

  const formatTime = (seconds: number) => {
    const minute = Math.floor(seconds / 60).toString();
    const second = (seconds % 60).toString().padStart(2, "0");

    return `${minute}:${second}`;
  };

  const handleSubmit = async (email: string) => {
    setLoading(true);

    const result = await forgotPassword(email);

    setLoading(false);

    if (result?.status === "OK") {
      toast.success(`${t("forgotPassword.messages.success")}`);

      setResendTimer(resendTime);
      setSubmitted(true);
    }
  };

  return submitted ? (
    <Page
      centered={centered}
      className="forgot-password"
      title={t("forgotPassword.acknowledgement.title")}
    >
      <div className="acknowledgement-page-content">
        <p>
          {
            <Trans
              i18nKey={"forgotPassword.acknowledgement.message"}
              values={{ email }}
              components={{
                strong: <strong />,
              }}
              t={t}
            />
          }
        </p>

        <div className="resend-email">
          <span className="resend-disabled">
            {t("forgotPassword.acknowledgement.emailNotReceived")}
          </span>

          {resendTimer > 0 ? (
            <span className="inline-link disabled">
              {t("forgotPassword.acknowledgement.resendIn", {
                time: formatTime(resendTimer),
              })}
            </span>
          ) : (
            <span className="inline-link" onClick={() => setSubmitted(false)}>
              {t("forgotPassword.acknowledgement.resend")}
            </span>
          )}
        </div>
      </div>
      <AuthLinks className="forgot-password" links={links} />
    </Page>
  ) : (
    <AuthPage
      centered={centered}
      className="forgot-password"
      title={t("forgotPassword.title")}
    >
      <ForgotPasswordForm
        handleSubmit={handleSubmit}
        loading={loading}
        email={email}
      />
      <AuthLinks className="forgot-password" links={links} />
    </AuthPage>
  );
};
