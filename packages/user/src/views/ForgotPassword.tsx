import { Trans, useTranslation } from "@prefabs.tech/react-i18n";
import {
  AuthPage,
  formatDuration,
  Page,
  useTimer,
} from "@prefabs.tech/react-ui";
import { useState } from "react";
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
  const searchedEmail = searchParameters.get("email") ?? undefined;

  const [email, setEmail] = useState<string>(searchedEmail || "");

  const resendTime = config.features?.forgotPasswordResendTimeInSeconds ?? 30;

  const [timer, setTimer] = useTimer(resendTime);

  const links: Array<LinkType> = [
    {
      display: true,
      label: t("forgotPassword.links.login"),
      to: config.customPaths?.login || DEFAULT_PATHS.LOGIN,
    },
  ];

  const handleSubmit = async (email: string) => {
    setLoading(true);

    const result = await forgotPassword(email);

    setLoading(false);

    if (result?.status === "OK") {
      toast.success(`${t("forgotPassword.messages.success")}`);

      setTimer(resendTime);
      setSubmitted(true);
    }
  };

  const renderAcknowledgement = () => (
    <Page
      centered={centered}
      className="forgot-password acknowledgement"
      title={t("forgotPassword.acknowledgement.title")}
    >
      <div className="acknowledgement-content">
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

          {timer > 0 ? (
            <span className="inline-link disabled">
              {t("forgotPassword.acknowledgement.resendIn", {
                time: formatDuration(timer),
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
  );

  return submitted ? (
    renderAcknowledgement()
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
        setEmail={setEmail}
      />
      <AuthLinks className="forgot-password" links={links} />
    </AuthPage>
  );
};
