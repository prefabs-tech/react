import { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { UserConfig } from "./config";

export interface AuthState {
  error: null | string;
  loading: boolean;
  user: undefined | UserType;
}

export interface ErrorResponse {
  data: { message: string; status: "ERROR" };
}

export interface ExtendedUser extends UserType {
  appId?: number;
  invitedBy: UserType & { isActiveUser: boolean };
  isActiveUser: boolean;
}

export type LinkType = {
  className?: string;
  display?: boolean;
  label: string;
  to: string;
};

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignInUpPromise {
  status: string;
  user: UserType;
}

export interface UserContextType {
  loading: boolean;
  setUser: (user: null | UserType) => void;
  user: null | UserType;
}

export interface UserMenuItemType {
  icon?: string;
  name: string;
  onClick?: () => void;
  route?: string;
}

export type UserSignupPayload = {
  [key: string]: Array<{ id: string; value: null | number | string }>;
} & {
  formFields: Array<{
    id: "email" | "password";
    value: string;
  }>;
};

export interface UserType extends EmailPasswordUserType {
  disabled?: boolean;
  givenName: null | string;
  isEmailVerified?: boolean;
  isProfileCompleted?: boolean;
  lastLoginAt: number;
  middleNames: null | string;
  roles: string[];
  signedUpAt: number;
  surname: null | string;
  thirdParty?: {
    id: string;
    userId: string;
  };
}

export type UserWrapperProperties = {
  children?: React.ReactNode;
  config: UserConfig;
};
