import { Route } from "react-router-dom";

import { AuthSocialLoginCallback } from "@/components";
import { DEFAULT_PATHS } from "@/constants";
import { useConfig } from "@/hooks";
import { PublicRoutesProperties } from "@/types/routes";
import {
  AcceptInvitation,
  ForgotPassword,
  Login,
  ResetPassword,
  Signup,
  SignUpFirstUser,
} from "@/views";

export const getUserPublicRoutes = (options?: PublicRoutesProperties) => {
  const config = useConfig();

  const {
    acceptInvitation,
    authCallbackFacebook,
    authCallbackGoogle,
    forgotPassword,
    login,
    resetPassword,
    signup,
    signupFirstUser,
  } = options?.routes || {};

  const { customPaths } = config;

  const forgotPasswordEnabled = config.features?.forgotPassword !== false;
  const signupEnabled = config.features?.signup !== false;
  const signupFirstUserEnabled =
    !signupEnabled && config.features?.signupFirstUser !== false;
  const authCallbackFacebookEnabled =
    config.socialLoginProviders?.includes("facebook");
  const authCallbackGoogleEnabled =
    config.socialLoginProviders?.includes("google");

  const publicRoutes = [
    {
      element: login?.element || <Login />,
      path: customPaths?.login || DEFAULT_PATHS.LOGIN,
    },
    {
      disabled: !signupEnabled,
      element: signup?.element || <Signup />,
      path: customPaths?.signup || DEFAULT_PATHS.SIGNUP,
    },
    {
      disabled: !signupFirstUserEnabled,
      element: signupFirstUser?.element || <SignUpFirstUser />,
      path: customPaths?.signupFirstUser || DEFAULT_PATHS.SIGNUP_FIRST_USER,
    },
    {
      element: resetPassword?.element || <ResetPassword />,
      path: customPaths?.resetPassword || DEFAULT_PATHS.RESET_PASSWORD,
    },
    {
      disabled: !forgotPasswordEnabled,
      element: forgotPassword?.element || <ForgotPassword />,
      path: customPaths?.forgotPassword || DEFAULT_PATHS.FORGOT_PASSWORD,
    },
    {
      disabled: !authCallbackFacebookEnabled,
      element: authCallbackFacebook?.element || <AuthSocialLoginCallback />,
      path:
        customPaths?.authCallbackFacebook ||
        DEFAULT_PATHS.AUTH_CALLBACK_FACEBOOK,
    },
    {
      disabled: !authCallbackGoogleEnabled,
      element: authCallbackGoogle?.element || <AuthSocialLoginCallback />,
      path:
        customPaths?.authCallbackGoogle || DEFAULT_PATHS.AUTH_CALLBACK_GOOGLE,
    },
    {
      element: acceptInvitation?.element || <AcceptInvitation />,
      path: customPaths?.acceptInvitation || DEFAULT_PATHS.ACCEPT_INVITATION,
    },
  ];

  return (
    <>
      {publicRoutes.map((route) =>
        !route.disabled ? (
          <Route element={route.element} key={route.path} path={route.path} />
        ) : null,
      )}
    </>
  );
};
