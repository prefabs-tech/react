import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { DEFAULT_PATHS } from "@/constants";
import { useConfig, useEmailVerification, useUser } from "@/hooks";

export const ProtectedRoutesHandler: React.FC = () => {
  const location = useLocation();
  const config = useConfig();
  const { user } = useUser();
  const [emailVerificationEnabled, isEmailVerified] = useEmailVerification();

  const { homeRoute = "/", customPaths, features } = config;

  const loginPath = customPaths?.login || DEFAULT_PATHS.LOGIN;
  const profilePath = customPaths?.profile || DEFAULT_PATHS.PROFILE;
  const emailVerificationReminderPath =
    customPaths?.emailVerificationReminder ||
    DEFAULT_PATHS.EMAIL_VERIFICATION_REMINDER;
  const emailVerificationVerifyPath =
    customPaths?.emailVerificationVerify ||
    DEFAULT_PATHS.EMAIL_VERIFICATION_VERIFY;

  if (!user) {
    return (
      <Navigate
        to={`${loginPath}?redirect=${window.encodeURI(
          location.pathname + location.search,
        )}`}
      />
    );
  }

  const home = typeof homeRoute === "string" ? homeRoute : homeRoute(user);

  if (emailVerificationEnabled) {
    if (location.pathname === profilePath) {
      return <Outlet />;
    }

    if (
      [emailVerificationReminderPath, emailVerificationVerifyPath].includes(
        location.pathname,
      )
    ) {
      if (config.features?.updateEmail) {
        let component;

        switch (location.pathname) {
          case emailVerificationVerifyPath:
            component = <Outlet />;
            break;
          case emailVerificationReminderPath:
            component = !isEmailVerified ? <Outlet /> : <Navigate to={home} />;
            break;
          default:
            component = <Navigate to={home} />;
            break;
        }

        return component;
      } else {
        return !isEmailVerified ? <Outlet /> : <Navigate to={home} />;
      }
    }

    if (!isEmailVerified) {
      return <Navigate to={emailVerificationReminderPath} />;
    }
  }

  if (user.isProfileCompleted === false) {
    if ([profilePath].includes(location.pathname)) {
      return <Outlet />;
    }

    let profileRoute = profilePath;

    const { autoRedirect = true, autoRedirectTo = home } =
      features?.profileCompletion || {};

    if (autoRedirect) {
      profileRoute = `${profilePath}?redirect=${autoRedirectTo}`;
    }

    return <Navigate to={profileRoute} />;
  }

  return <Outlet />;
};
