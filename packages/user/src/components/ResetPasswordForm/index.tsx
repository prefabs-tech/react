import { Provider } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React from "react";
import * as zod from "zod";

import { useConfig } from "@/hooks";

import { PasswordConfirmationSchema } from "../schemas";
import ResetPasswordFormFields from "./ResetPasswordFormFields";

interface Properties {
  handleSubmit: (newPassword: string) => void;
  loading?: boolean;
}

export const ResetPasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { i18n, t } = useTranslation("user");
  const config = useConfig();
  const hasConfirmPasswordFeature = config?.features?.confirmPassword ?? false;

  let ResetPasswordFormSchema = zod.object({
    ...PasswordConfirmationSchema({
      confirmPasswordRequiredMessage: t(
        "resetPassword.messages.validation.confirmPassword",
      ),
      hasConfirmPasswordFeature,
      passwordRequiredMessage: t(
        "resetPassword.messages.validation.newPassword",
      ),
      passwordValidationMessage: t(
        "resetPassword.messages.validation.validationMessage",
      ),
    }),
  });

  if (hasConfirmPasswordFeature) {
    ResetPasswordFormSchema = ResetPasswordFormSchema.refine(
      (data) => {
        return data.password === data.confirmPassword;
      },
      {
        message: t("resetPassword.messages.validation.mustMatch"),
        path: ["confirmPassword"],
      },
    ) as unknown as typeof ResetPasswordFormSchema;
  }

  return (
    <Provider
      onSubmit={(data) => handleSubmit(data.password)}
      validationSchema={ResetPasswordFormSchema}
      validationTriggerKey={i18n.language}
    >
      <ResetPasswordFormFields
        hasConfirmPasswordFeature={hasConfirmPasswordFeature}
        loading={loading}
      />
    </Provider>
  );
};
