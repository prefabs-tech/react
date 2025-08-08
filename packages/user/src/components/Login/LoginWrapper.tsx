import { useTranslation } from "@prefabs.tech/react-i18n";
import { Message } from "@prefabs.tech/react-ui";
import { FC, useState } from "react";
import { toast } from "react-toastify";

import { DEFAULT_PATHS } from "@/constants";
import { login } from "@/supertokens";
import { LinkType } from "@/types/types";

import { LoginForm } from "./LoginForm";
import { useConfig, useUser } from "../../hooks";
import { verifySessionRoles } from "../../supertokens/helpers";
import { AuthLinks } from "../AuthLinks";

import type { LoginCredentials, SignInUpPromise } from "../../types";

interface IProperties {
  handleSubmit?: (credential: LoginCredentials) => void;
  onLoginFailed?: (error: Error) => void;
  onLoginSuccess?: (user: SignInUpPromise) => void;
  loading?: boolean;
  showForgotPasswordLink?: boolean;
  showSignupLink?: boolean;
}

export const LoginWrapper: FC<IProperties> = ({
  handleSubmit,
  onLoginFailed,
  onLoginSuccess,
  loading,
  showForgotPasswordLink = true,
  showSignupLink = true,
}) => {
  const { t } = useTranslation(["user", "errors"]);
  const { setUser } = useUser();
  const config = useConfig();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<
    null | "invalidCredentials" | "other"
  >(null);
  const [email, setEmail] = useState("");

  const baseForgotPasswordPath =
    config.customPaths?.forgotPassword || DEFAULT_PATHS.FORGOT_PASSWORD;

  const forgotPasswordUrl = email
    ? `${baseForgotPasswordPath}?email=${encodeURIComponent(email)}`
    : baseForgotPasswordPath;

  const links: Array<LinkType> = [
    {
      display: config.features?.signup !== false && showSignupLink,
      label: t("login.links.signup"),
      to: config.customPaths?.signup || DEFAULT_PATHS.SIGNUP,
    },
    {
      display:
        config.features?.forgotPassword !== false && showForgotPasswordLink,
      label: t("login.links.forgotPassword"),
      to: forgotPasswordUrl,
    },
  ];

  const handleLoginSubmit = async (credentials: LoginCredentials) => {
    if (handleSubmit) {
      handleSubmit(credentials);
    } else {
      setLoginLoading(true);

      await login(credentials)
        .then(async (result) => {
          if (result?.user) {
            if (config && (await verifySessionRoles(config.supportedRoles))) {
              setUser(result.user);

              onLoginSuccess && (await onLoginSuccess(result));

              toast.success(`${t("login.messages.success")}`);
            } else {
              toast.error(t("login.messages.permissionDenied"));
            }
          }
        })
        .catch(async (error) => {
          onLoginFailed && (await onLoginFailed(error));

          if (error.message === "401") {
            setLoginError("invalidCredentials");
          } else {
            setLoginError("other");
          }
        });

      setLoginLoading(false);
    }
  };

  const message =
    loginError === "invalidCredentials"
      ? t("errors.401", { ns: "errors" })
      : t("errors.otherErrors", { ns: "errors" });

  return (
    <>
      {loginError && (
        <Message
          enableClose={true}
          message={message}
          onClose={() => {
            setLoginError(null);
          }}
          severity="danger"
        />
      )}
      <LoginForm
        handleSubmit={handleLoginSubmit}
        loading={handleSubmit ? loading : loginLoading}
        onEmailChange={setEmail}
      />
      <AuthLinks className="login" links={links} />
    </>
  );
};
