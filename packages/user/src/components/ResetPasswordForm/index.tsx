import { Provider } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React from "react";
import * as zod from "zod";

import ResetPasswordFormFields from "./ResetPasswordFormFields";
import { PasswordConfirmationSchema } from "../schemas";

interface Properties {
  handleSubmit: (newPassword: string) => void;
  loading?: boolean;
}

export const ResetPasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { t, i18n } = useTranslation("user");

  const ResetPasswordFormSchema = zod
    .object({
      ...PasswordConfirmationSchema({
        passwordRequiredMessage: t(
          "resetPassword.messages.validation.newPassword",
        ),
        passwordValidationMessage: t(
          "resetPassword.messages.validation.validationMessage",
        ),
        confirmPasswordRequiredMessage: t(
          "resetPassword.messages.validation.confirmPassword",
        ),
      }),
    })
    .refine(
      (data) => {
        return data.password === data.confirmPassword;
      },
      {
        message: t("resetPassword.messages.validation.mustMatch"),
        path: ["confirmPassword"],
      },
    );

  return (
    <Provider
      validationSchema={ResetPasswordFormSchema}
      onSubmit={(data) => handleSubmit(data.password)}
      validationTriggerKey={i18n.language}
    >
      <ResetPasswordFormFields loading={loading} />
    </Provider>
  );
};
