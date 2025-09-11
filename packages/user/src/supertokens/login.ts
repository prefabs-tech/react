import { emailPasswordSignIn } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import type { LoginCredentials, SignInUpPromise, UserType } from "../types";

export const login = async (
  credentials: LoginCredentials,
): Promise<SignInUpPromise | undefined> => {
  let user: UserType;
  let status: string;
  let response;

  const data = {
    formFields: [
      {
        id: "email",
        value: credentials.email,
      },
      {
        id: "password",
        value: credentials.password,
      },
    ],
  };

  try {
    response = await emailPasswordSignIn(data);
    // eslint-disable-next-line
  } catch (error: any) {
    if (error?.status === 401) {
      throw new Error("401");
    }

    throw new Error("otherErrors");
  }

  if (response.status === "OK") {
    user = response.user as UserType;
    status = response.status;

    return { user, status };
  } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
    throw new Error("401");
  } else {
    throw new Error("otherErrors");
  }
};
