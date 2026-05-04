import EmailVerification from "supertokens-web-js/recipe/emailverification";

interface IPromise {
  status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK" | undefined;
}

export const verifyEmail = async (): Promise<IPromise | undefined> => {
  const response = await EmailVerification.verifyEmail();

  return { status: response.status };
};
