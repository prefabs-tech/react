import { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { UserConfig } from "./config";

export interface UserType extends EmailPasswordUserType {
  disabled?: boolean;
  givenName: string | null;
  isEmailVerified?: boolean;
  isProfileCompleted?: boolean;
  lastLoginAt: number;
  middleNames: string | null;
  roles: string[];
  signedUpAt: number;
  surname: string | null;
  thirdParty?: {
    id: string;
    userId: string;
  };
}

export interface UserMenuItemType {
  icon?: string;
  name: string;
  onClick?: () => void;
  route?: string;
}

export interface UserContextType {
  loading: boolean;
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  error: string | null;
  loading: boolean;
  user: UserType | undefined;
}

export interface SignInUpPromise {
  user: UserType;
  status: string;
}

export interface ErrorResponse {
  data: { message: string; status: "ERROR" };
}

export interface ExtendedUser extends UserType {
  appId?: number;
  isActiveUser: boolean;
  invitedBy: UserType & { isActiveUser: boolean };
}

export type LinkType = {
  className?: string;
  display?: boolean;
  label: string;
  to: string;
};

export type UserWrapperProperties = {
  config: UserConfig;
  children?: React.ReactNode;
};

export type UserSignupPayload = {
  formFields: Array<{
    id: "email" | "password";
    value: string;
  }>;
} & {
  [key: string]: Array<{ id: string; value: string | number | null }>;
};
