import { useTranslation } from "@prefabs.tech/react-i18n";
import { Divider, AuthPage } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { LoginWrapper, SocialLogins } from "../components/Login";
import { useConfig, useFirstUserSignup } from "../hooks";

import type { SignInUpPromise } from "../types";

interface IProperties {
  centered?: boolean;
  customDivider?: React.ReactNode;
  onLoginFailed?: (error: Error) => void;
  onLoginSuccess?: (user: SignInUpPromise) => void;
  orientation?: "horizontal" | "vertical";
  showForgotPasswordLink?: boolean;
  showSignupLink?: boolean;
  socialLoginFirst?: boolean;
  socialLoginOnly?: boolean;
}

export const Login: React.FC<IProperties> = ({
  centered = true,
  showForgotPasswordLink,
  showSignupLink,
  customDivider,
  onLoginFailed,
  onLoginSuccess,
  orientation = "vertical",
  socialLoginFirst = false,
  socialLoginOnly = false,
}) => {
  const { t } = useTranslation(["user", "errors"]);
  const config = useConfig();
  const navigate = useNavigate();

  const [redirecting] = useFirstUserSignup({
    config,
    autoRedirect: true,
    redirectFn: navigate,
  });

  let className = "login";

  if (!config.socialLoginProviders) {
    orientation = "vertical";
  }

  if (config.socialLoginProviders) {
    className = className + (socialLoginFirst ? " sso-first" : " sso-last");
  }

  const renderSocialLogins = () => {
    if (!config.socialLoginProviders?.length) {
      return null;
    }

    if (socialLoginOnly) {
      return <SocialLogins />;
    }

    return (
      <>
        {customDivider ? (
          customDivider
        ) : (
          <Divider
            orientation={orientation === "vertical" ? "horizontal" : "vertical"}
          />
        )}

        <SocialLogins />
      </>
    );
  };

  return (
    <AuthPage
      centered={centered}
      className={className}
      title={t("login.title")}
      loading={!!redirecting}
    >
      {socialLoginOnly ? null : (
        <LoginWrapper
          onLoginFailed={onLoginFailed}
          onLoginSuccess={onLoginSuccess}
          showForgotPasswordLink={showForgotPasswordLink}
          showSignupLink={showSignupLink}
        />
      )}
      {renderSocialLogins()}
    </AuthPage>
  );
};
