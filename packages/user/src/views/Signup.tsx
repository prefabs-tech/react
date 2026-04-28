import { useTranslation } from "@prefabs.tech/react-i18n";
import { AuthPage } from "@prefabs.tech/react-ui";

import type { SignInUpPromise } from "../types";

import { SignupWrapper } from "..";

interface IProperties {
  centered?: boolean;
  onSignupFailed?: (error: Error) => void;
  onSignupSuccess?: (user: SignInUpPromise) => void;
  showForgotPasswordLink?: boolean;
  showLoginLink?: boolean;
  termsAndConditions?: React.ReactNode;
}

export const Signup: React.FC<IProperties> = ({
  centered = true,
  onSignupFailed,
  onSignupSuccess,
  showForgotPasswordLink,
  showLoginLink,
  termsAndConditions,
}) => {
  const { t } = useTranslation("user");

  return (
    <AuthPage centered={centered} className="signup" title={t("signup.title")}>
      <SignupWrapper
        onSignupFailed={onSignupFailed}
        onSignupSuccess={onSignupSuccess}
        showForgotPasswordLink={showForgotPasswordLink}
        showLoginLink={showLoginLink}
        termsAndConditions={termsAndConditions}
      />
    </AuthPage>
  );
};
