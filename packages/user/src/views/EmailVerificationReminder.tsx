import { Trans, useTranslation } from "@prefabs.tech/react-i18n";
import { Page } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useUser } from "@/hooks";

import { EMAIL_VERIFICATION } from "../constants";
import { resendVerificationEmail } from "../supertokens/resend-email-verification";

export const EmailVerificationReminder = ({
  centered = true,
}: {
  centered?: boolean;
}) => {
  const [isAlreadyVerified, setIsAlreadyVerified] = useState<boolean>(false);

  const { t } = useTranslation("user");

  const { user } = useUser();

  const handleResend = () => {
    resendVerificationEmail()
      .then((status) => {
        if (status === EMAIL_VERIFICATION.OK) {
          toast.success(t("emailVerification.toastMessages.resendSuccess"));
        } else if (status === EMAIL_VERIFICATION.EMAIL_ALREADY_VERIFIED_ERROR) {
          toast.info(t("emailVerification.toastMessages.alreadyVerified"));

          setIsAlreadyVerified(true);
        }
      })
      .catch(() => {
        toast.error(t("emailVerification.toastMessages.error"));
      });
  };

  return (
    <Page
      centered={centered}
      className="email-verification-reminder"
      title={t("emailVerification.title")}
    >
      {isAlreadyVerified ? (
        <p>{t("emailVerification.messages.alreadyVerified")}</p>
      ) : (
        <>
          <p>
            {
              <Trans
                components={{
                  strong: <strong />,
                }}
                i18nKey={"emailVerification.messages.unverified"}
                t={t}
                values={{ email: user?.email }}
              />
            }
          </p>
          <p className="resend-email">
            {t("emailVerification.messages.resendEmailInfo")}{" "}
            <Link onClick={handleResend} to="#">
              {t("emailVerification.button.resendEmail")}
            </Link>
          </p>
        </>
      )}
    </Page>
  );
};
