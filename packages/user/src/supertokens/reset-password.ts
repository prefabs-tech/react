import { submitNewPassword } from "supertokens-web-js/recipe/thirdpartyemailpassword";

interface IPromise {
  status: string | undefined;
  message?: string;
}

export const resetPassword = async (
  newPassword: string,
): Promise<IPromise | undefined> => {
  let status: string | undefined;

  const data = {
    formFields: [
      {
        id: "password",
        value: newPassword,
      },
    ],
  };

  try {
    const response = await submitNewPassword(data);

    status = response.status;

    return { status };
  } catch (err) {
    let errorMessage = "Oops! Something went wrong.";

    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return { status: "ERROR", message: errorMessage };
  }
};
