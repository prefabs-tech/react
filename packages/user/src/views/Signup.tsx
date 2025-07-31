import { useTranslation } from "@prefabs.tech/react-i18n";
import { AuthPage } from "@prefabs.tech/react-ui";

import { SignupWrapper } from "..";

import type { SignInUpPromise } from "../types";

interface IProperties {
  centered?: boolean;
  showForgotPasswordLink?: boolean;
  showLoginLink?: boolean;
  termsAndConditions?: React.ReactNode;
  onSignupFailed?: (error: Error) => void;
  onSignupSuccess?: (user: SignInUpPromise) => void;
}

export const Signup: React.FC<IProperties> = ({
  centered = true,
  showForgotPasswordLink,
  showLoginLink,
  termsAndConditions,
  onSignupFailed,
  onSignupSuccess,
}) => {
  const { t } = useTranslation("user");

  return (
    <AuthPage className="signup" title={t("signup.title")} centered={centered}>
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
