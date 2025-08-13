import { useTranslation } from "@prefabs.tech/react-i18n";
import { AuthPage, Message } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ResetPasswordForm } from "@/components";
import { DEFAULT_PATHS } from "@/constants";
import { resetPassword } from "@/supertokens";

import { useConfig } from "../hooks";

export const ResetPassword = ({ centered = true }: { centered?: boolean }) => {
  const { t } = useTranslation("user");
  const config = useConfig();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setIsError] = useState<null | "invalidToken" | "other">(null);

  const navigate = useNavigate();
  const loginPath = config.customPaths?.login || DEFAULT_PATHS.LOGIN;

  const handleSubmit = async (newPassword: string) => {
    setLoading(true);

    const result = await resetPassword(newPassword);

    setLoading(false);

    if (result?.status === "OK") {
      toast.success(`${t("resetPassword.messages.success")}`);
      navigate(loginPath);

      return;
    } else if (result?.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
      setIsError("invalidToken");
    } else {
      setIsError("other");
    }
  };

  const message =
    error === "invalidToken"
      ? t("resetPassword.messages.invalidToken")
      : t("errors.otherErrors", { ns: "errors" });

  return (
    <AuthPage
      className="reset-password"
      title={t("resetPassword.title")}
      centered={centered}
    >
      {error && (
        <Message
          message={message}
          onClose={() => {
            setIsError(null);
          }}
          severity="danger"
        />
      )}
      <ResetPasswordForm handleSubmit={handleSubmit} loading={loading} />
    </AuthPage>
  );
};
