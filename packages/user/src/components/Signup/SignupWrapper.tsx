import { useTranslation } from "@prefabs.tech/react-i18n";
import { Message } from "@prefabs.tech/react-ui";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { DEFAULT_PATHS } from "@/constants";
import { signup } from "@/supertokens";
import { LinkType } from "@/types/types";

import type { LoginCredentials, SignInUpPromise } from "../../types";

import { useConfig, useUser } from "../../hooks";
import { AuthLinks } from "../AuthLinks";
import { SignupForm } from "./SignupForm";

interface IProperties {
  handleSubmit?: (formData: LoginCredentials) => void;
  loading?: boolean;
  onSignupFailed?: (error: Error) => void;
  onSignupSuccess?: (user: SignInUpPromise) => void;
  showForgotPasswordLink?: boolean;
  showLoginLink?: boolean;
  termsAndConditions?: React.ReactNode;
}

export const SignupWrapper: React.FC<IProperties> = ({
  handleSubmit,
  loading,
  onSignupFailed,
  onSignupSuccess,
  showForgotPasswordLink = true,
  showLoginLink = true,
  termsAndConditions,
}) => {
  const { t } = useTranslation("user");
  const [signupLoading, setSignupLoading] = useState<boolean>(false);
  const [signupError, setSignupError] = useState<
    "emailAlreadyExists" | "other" | null
  >(null);

  const { setUser } = useUser();
  const config = useConfig();

  const loginPath = config.customPaths?.login || DEFAULT_PATHS.LOGIN;
  const forgotPasswordPath =
    config.customPaths?.forgotPassword || DEFAULT_PATHS.FORGOT_PASSWORD;

  const links: Array<LinkType> = [
    {
      display: showLoginLink,
      label: t("signup.links.login"),
      to: loginPath,
    },
    {
      display:
        showForgotPasswordLink && config.features?.forgotPassword !== false,
      label: t("signup.links.forgotPassword"),
      to: forgotPasswordPath,
    },
  ];

  const handleSignupSubmit = async (formData: LoginCredentials) => {
    if (handleSubmit) {
      handleSubmit(formData);
    } else {
      setSignupLoading(true);

      const payload = {
        formFields: [
          {
            id: "email" as const,
            value: formData.email,
          },
          {
            id: "password" as const,
            value: formData.password,
          },
        ],
      };

      await signup(payload)
        .then(async (result) => {
          if (result?.user) {
            await setUser(result.user);

            onSignupSuccess && (await onSignupSuccess(result));

            toast.success(`${t("signup.messages.success")}`);
          }
        })
        .catch(async (error) => {
          onSignupFailed && (await onSignupFailed(error));

          if (error.message.includes("email already exists")) {
            setSignupError("emailAlreadyExists");

            return;
          }

          setSignupError("other");
        })
        .finally(() => {
          setSignupLoading(false);
        });
    }
  };

  const message =
    signupError === "emailAlreadyExists"
      ? t("errors.emailAlreadyExists", { ns: "errors" })
      : t("errors.otherErrors", { ns: "errors" });

  return (
    <>
      {signupError && (
        <Message
          message={message}
          onClose={() => {
            setSignupError(null);
          }}
          severity="danger"
        />
      )}
      <SignupForm
        handleSubmit={handleSignupSubmit}
        loading={handleSubmit ? loading : signupLoading}
        termsAndConditions={termsAndConditions}
      />
      <AuthLinks className="sign-up" links={links} />
    </>
  );
};
