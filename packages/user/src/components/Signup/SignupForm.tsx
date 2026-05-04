import { emailSchema, Provider } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React from "react";
import * as zod from "zod";

import type { LoginCredentials } from "../../types";

import { useConfig } from "../../hooks";
import { PasswordConfirmationSchema } from "../schemas";
import SignupFormFields from "./SignupFormFields";

interface Properties {
  email?: string;
  handleSubmit: (credentials: LoginCredentials) => void;
  loading?: boolean;
  termsAndConditions?: React.ReactNode;
}

export const SignupForm = ({
  email,
  handleSubmit,
  loading,
  termsAndConditions,
}: Properties) => {
  const { i18n, t } = useTranslation("user");
  const config = useConfig();
  const hasConfirmPasswordFeature = config?.features?.confirmPassword ?? false;

  let SignUpFormSchema = zod.object({
    email: emailSchema({
      invalid: t("validation.messages.validEmail"),
      required: t("validation.messages.email"),
    }),
    ...PasswordConfirmationSchema({
      confirmPasswordRequiredMessage: t(
        "signup.messages.validation.confirmPassword",
      ),
      hasConfirmPasswordFeature,
      passwordRequiredMessage: t("signup.messages.validation.password"),
      passwordValidationMessage: t(
        "signup.messages.validation.validationMessage",
      ),
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
      defaultValues={{
        confirmPassword: "",
        email: email || "",
        password: "",
        termsAndConditions: false,
      }}
      onSubmit={handleSubmit}
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
