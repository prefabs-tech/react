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
    const response = await emailPasswordSignIn(data);

    if (response.status === "OK") {
      const user = response.user as UserType;
      const status = response.status;

      return { user, status };
    }

    if (response.status === "WRONG_CREDENTIALS_ERROR") {
      throw new Error("401");
    }

    throw new Error("otherErrors");
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "401") {
      throw error;
    }

    throw new Error("otherErrors");
  }
};
