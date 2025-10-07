import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { SocialLoginType } from "@/components/Login";

import type {
  HomeRoute,
  ProtectedRouteOverwrites,
  PublicRouteOverwrites,
} from "./routes";

export interface UserConfig {
  apiBaseUrl: string;
  appDomain: string;
  customPaths?: {
    [K in keyof (ProtectedRouteOverwrites & PublicRouteOverwrites)]?: string;
  };
  features?: {
    confirmPassword?: boolean;
    emailVerification?: boolean;
    forgotPassword?: boolean;
    signup?: boolean;
    signupFirstUser?: boolean;
    termsAndConditions?: {
      display: boolean;
      external?: boolean;
      showCheckbox?: boolean;
      url?: string;
    };
    updateEmail?: boolean;
    forgotPasswordResendTimeInSeconds?: number;
  };
  homeRoute?: HomeRoute;
  socialLoginProviders?: SocialLoginType[];
  supertokens: {
    appName: string;
    apiDomain: string;
    apiBasePath?: string;
    sessionConfig?: Session.UserInput;
    thirdPartyEmailPasswordConfig?: ThirdPartyEmailPassword.UserInput;
  };
  supportedRoles: string[];
}
