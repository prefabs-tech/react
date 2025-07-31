import { useTranslation } from "@prefabs.tech/react-i18n";
import { AuthPage, Message } from "@prefabs.tech/react-ui";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getMe } from "@/api/user";
import { EMAIL_VERIFICATION } from "@/constants";
import { verifyEmail } from "@/supertokens";

import { UserContextType, useConfig, userContext } from "..";

export const VerifyEmail = ({ centered = true }: { centered?: boolean }) => {
  const [verifyEmailLoading, setVerifyEmailLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string | undefined>("");
  const [error, setError] = useState(false);
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);

  const { t } = useTranslation("user");
  const { user, setUser } = useContext(userContext) as UserContextType;
  const config = useConfig();

  useEffect(() => {
    if (user) {
      verifyEmail()
        .then(async (response) => {
          setStatus(response?.status);

          if (response && response.status === EMAIL_VERIFICATION.OK) {
            const userInfo = await getMe(config.apiBaseUrl);

            if (user.email !== userInfo.data.email) {
              toast.success(t("emailVerification.toastMessages.updateSuccess"));
              setIsEmailUpdated(true);
            } else {
              toast.success(t("emailVerification.toastMessages.success"));
              setIsEmailUpdated(false);
            }

            setUser(userInfo.data);
          }
        })
        .catch(() => {
          toast.error(`${t("emailVerification.toastMessages.error")}`);
          setStatus(EMAIL_VERIFICATION.ERROR);
        })
        .finally(() => {
          setVerifyEmailLoading(false);
        });
    }
  }, []);

  const renderMessage = () => {
    if (verifyEmailLoading) {
      return <p>{t("emailVerification.messages.verifyingEmail")}</p>;
    }

    let message = "";

    switch (status) {
      case EMAIL_VERIFICATION.OK:
        isEmailUpdated
          ? (message = t("emailVerification.toastMessages.updateSuccess"))
          : (message = t("emailVerification.toastMessages.success"));
        break;
      case EMAIL_VERIFICATION.EMAIL_VERIFICATION_INVALID_TOKEN_ERROR:
        message = t("emailVerification.messages.invalidToken");
        break;
      default:
        setError(true);
        message = t("emailVerification.messages.error");
    }

    return (
      <>
        {error ? (
          <Message
            enableClose={true}
            message={message}
            onClose={() => {
              setError(false);
            }}
            severity="danger"
          />
        ) : (
          <p>{message}</p>
        )}
      </>
    );
  };

  return (
    <AuthPage
      className="email-verification"
      title={t("emailVerification.verifyEmail")}
      loading={verifyEmailLoading}
      centered={centered}
    >
      {renderMessage()}
    </AuthPage>
  );
};
