import React from "react";

import { UserType } from "./types";

export type HomeRoute = ((user: UserType) => string) | string;

export type ProtectedRouteOverwrites = {
  changePassword?: RouteOverwrite;
  emailVerificationReminder?: RouteOverwrite;
  emailVerificationVerify?: RouteOverwrite;
  profile?: RouteOverwrite;
};

export type ProtectedRoutesProperties = {
  routes?: ProtectedRouteOverwrites;
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

export type PublicRoutesProperties = {
  routes?: PublicRouteOverwrites;
};

export type RouteOverwrite = {
  element?: React.ReactNode;
};
