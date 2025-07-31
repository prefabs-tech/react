import { useTranslation } from "@prefabs.tech/react-i18n";

import { useConfig } from "@/hooks";

import { FacebookLogin, GoogleLogin } from "../SocialLogin";

export const SUPPORTED_SOCIAL_LOGIN_PROVIDERS = [
  "google" as const,
  "facebook" as const,
];

export type SocialLoginType = (typeof SUPPORTED_SOCIAL_LOGIN_PROVIDERS)[number];

export const SocialLogins = () => {
  const { t } = useTranslation("user");

  const config = useConfig();

  if (!config.socialLoginProviders?.length) {
    return null;
  }

  const renderGoogleLogin = () => {
    return (
      <GoogleLogin
        key={"google"}
        label={t("login.social.google")}
        redirectUrl={`${config.appDomain}/auth/callback/google`}
      />
    );
  };

  const renderFacebookLogin = () => {
    return (
      <FacebookLogin
        key={"facebook"}
        label={t("login.social.facebook")}
        redirectUrl={`${config.appDomain}/auth/callback/facebook`}
      />
    );
  };

  const providerMap = {
    facebook: renderFacebookLogin,
    google: renderGoogleLogin,
  };

  const renderSocialLoginProvider = (provider: SocialLoginType) => {
    const renderer = providerMap[provider];

    return renderer ? renderer() : null;
  };

  return (
    <div className="social-login-wrapper">
      {config.socialLoginProviders.map((provider) => {
        return renderSocialLoginProvider(provider);
      })}
    </div>
  );
};
