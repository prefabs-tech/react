import { Provider, emailSchema } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React from "react";
import * as zod from "zod";

import { PasswordConfirmationSchema } from "../schemas";
import SignupFormFields from "./SignupFormFields";
import { useConfig } from "../../hooks";

import type { LoginCredentials } from "../../types";

interface Properties {
  email?: string;
  loading?: boolean;
  termsAndConditions?: React.ReactNode;
  handleSubmit: (credentials: LoginCredentials) => void;
}

export const SignupForm = ({
  email,
  loading,
  termsAndConditions,
  handleSubmit,
}: Properties) => {
  const { t, i18n } = useTranslation("user");
  const config = useConfig();
  const hasConfirmPasswordFeature = config?.features?.confirmPassword ?? false;

  let SignUpFormSchema = zod.object({
    email: emailSchema({
      invalid: t("validation.messages.validEmail"),
      required: t("validation.messages.email"),
    }),
    ...PasswordConfirmationSchema({
      passwordRequiredMessage: t("signup.messages.validation.password"),
      passwordValidationMessage: t(
        "signup.messages.validation.validationMessage",
      ),
      confirmPasswordRequiredMessage: t(
        "signup.messages.validation.confirmPassword",
      ),
      hasConfirmPasswordFeature,
    }),
    ...(config.features?.termsAndConditions?.display &&
    config.features.termsAndConditions.showCheckbox
      ? {
          termsAndConditions: zod.boolean().refine((value) => value === true, {
            message: t("signup.messages.validation.termsAndConditions"),
          }),
        }
      : {}),
  });

  if (hasConfirmPasswordFeature) {
    SignUpFormSchema = SignUpFormSchema.refine(
      (data) => {
        return data.password === data.confirmPassword;
      },
      {
        message: t("signup.messages.validation.mustMatch"),
        path: ["confirmPassword"],
      },
    ) as unknown as typeof SignUpFormSchema;
  }

  return (
    <Provider
      onSubmit={handleSubmit}
      defaultValues={{
        password: "",
        email: email || "",
        confirmPassword: "",
        termsAndConditions: false,
      }}
      validationSchema={SignUpFormSchema}
      validationTriggerKey={i18n.language}
    >
      <SignupFormFields
        disableEmailField={!!email}
        hasConfirmPasswordFeature={hasConfirmPasswordFeature}
        loading={loading}
        termsAndConditions={termsAndConditions}
      />
    </Provider>
  );
};
