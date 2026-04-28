import { Route } from "react-router-dom";

import { DEFAULT_PATHS } from "@/constants";
import { useConfig, useEmailVerification, useUser } from "@/hooks";
import { ProtectedRoutesProperties } from "@/types/routes";
import {
  ChangePassword,
  EmailVerificationReminder,
  ProfileTabsPage,
  VerifyEmail,
} from "@/views";

export const getUserProtectedRoutes = (options?: ProtectedRoutesProperties) => {
  const config = useConfig();

  const { user } = useUser();

  const [emailVerificationEnabled] = useEmailVerification();

  const {
    changePassword,
    emailVerificationReminder,
    emailVerificationVerify,
    profile,
  } = options?.routes || {};

  const { customPaths } = config;

  const isSocialLogin = !!user?.thirdParty;

  const protectedRoutes = [
    {
      disabled: isSocialLogin,
      element: changePassword?.element || <ChangePassword />,
      path: customPaths?.changePassword || DEFAULT_PATHS.CHANGE_PASSWORD,
    },
    {
      disabled: !emailVerificationEnabled,
      element: emailVerificationReminder?.element || (
        <EmailVerificationReminder />
      ),
      path:
        customPaths?.emailVerificationReminder ||
        DEFAULT_PATHS.EMAIL_VERIFICATION_REMINDER,
    },
    {
      disabled: !emailVerificationEnabled,
      element: emailVerificationVerify?.element || <VerifyEmail />,
      path:
        customPaths?.emailVerificationVerify ||
        DEFAULT_PATHS.EMAIL_VERIFICATION_VERIFY,
    },
    {
      element: profile?.element || <ProfileTabsPage />,
      path: customPaths?.profile || DEFAULT_PATHS.PROFILE,
    },
  ];

  return (
    <>
      {protectedRoutes.map((route) =>
        !route.disabled ? (
          <Route element={route.element} key={route.path} path={route.path} />
        ) : null,
      )}
    </>
  );
};
