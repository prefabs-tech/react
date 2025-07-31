import React from "react";

import { UserType } from "./types";

export type HomeRoute = string | ((user: UserType) => string);

export type RouteOverwrite = {
  element?: React.ReactNode;
};

export type ProtectedRouteOverwrites = {
  changePassword?: RouteOverwrite;
  emailVerificationReminder?: RouteOverwrite;
  emailVerificationVerify?: RouteOverwrite;
  profile?: RouteOverwrite;
};

export type PublicRouteOverwrites = {
  acceptInvitation?: RouteOverwrite;
  authCallbackFacebook?: RouteOverwrite;
  authCallbackGoogle?: RouteOverwrite;
  forgotPassword?: RouteOverwrite;
  login?: RouteOverwrite;
  resetPassword?: RouteOverwrite;
  signup?: RouteOverwrite;
  signupFirstUser?: RouteOverwrite;
};

export type ProtectedRoutesProperties = {
  routes?: ProtectedRouteOverwrites;
};

export type PublicRoutesProperties = {
  routes?: PublicRouteOverwrites;
};
